import { useEffect, useRef, useState } from 'react';
import ItemIcon from './icons/ItemIcons.jsx';
import { CATCH_GOOD, CATCH_BAD } from '../data/gameData.js';

const CATCH_BAND_FROM_BOTTOM = 96;
const CATCH_HALF_WIDTH_PCT = 9;

function randomCatchItem() {
  const isGood = Math.random() < 0.62;
  const pool = isGood ? CATCH_GOOD : CATCH_BAD;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { kind: isGood ? 'good' : 'bad', itemId: pick.id };
}

export default function CatchGame({ team, duration, sounds, speak, onRoundEnd }) {
  const [phase, setPhase] = useState('countdown');
  const [countdownText, setCountdownText] = useState('3');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState([]);
  const [pulse, setPulse] = useState(null);

  const arenaRef = useRef(null);
  const basketXRef = useRef(50);
  const scoreRef = useRef(0);
  const itemIdRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const tickIntervalRef = useRef(null);
  const holdIntervalRef = useRef(null);

  useEffect(() => { basketXRef.current = basketX; }, [basketX]);

  useEffect(() => {
    let step = 3;
    setCountdownText('3');
    sounds.countdownBeep();
    const id = setInterval(() => {
      step -= 1;
      if (step > 0) {
        setCountdownText(String(step));
        sounds.countdownBeep();
      } else {
        setCountdownText('Bắt Đầu!');
        sounds.goBeep();
        clearInterval(id);
        setTimeout(() => setPhase('playing'), 400);
      }
    }, 700);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    speak('Hứng đồ dùng cần thiết, né đồ bẩn nhé!');

    spawnIntervalRef.current = setInterval(() => {
      const item = randomCatchItem();
      setItems((prev) => [...prev, {
        id: itemIdRef.current++,
        x: 8 + Math.random() * 84,
        y: -60,
        speed: 90 + Math.random() * 90,
        kind: item.kind,
        itemId: item.itemId,
      }]);
    }, 850);

    tickIntervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) return 0;
        if (t <= 6) sounds.tick();
        return t - 1;
      });
    }, 1000);

    lastTsRef.current = null;
    const frame = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      const arenaH = arenaRef.current ? arenaRef.current.clientHeight : 360;
      const bandY = arenaH - CATCH_BAND_FROM_BOTTOM;

      setItems((prev) => {
        const kept = [];
        for (const it of prev) {
          const ny = it.y + it.speed * dt;
          if (ny >= bandY && ny <= arenaH - 10) {
            const dx = Math.abs(it.x - basketXRef.current);
            if (dx <= CATCH_HALF_WIDTH_PCT) {
              if (it.kind === 'good') {
                scoreRef.current += 10;
                sounds.chime();
                sounds.whoosh();
                setPulse({ type: 'good', nonce: Math.random() });
              } else {
                scoreRef.current = Math.max(0, scoreRef.current - 5);
                sounds.wrongBuzz();
                sounds.tireSpin();
                setPulse({ type: 'bad', nonce: Math.random() });
              }
              setScore(scoreRef.current);
              continue;
            }
          }
          if (ny > arenaH + 30) continue;
          kept.push({ ...it, y: ny });
        }
        return kept;
      });

      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      clearInterval(spawnIntervalRef.current);
      clearInterval(tickIntervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, sounds, speak]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      setPhase('result');
      sounds.whistle();
    }
  }, [phase, timeLeft, sounds]);

  const moveBasketToClientX = (clientX) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(6, Math.min(94, pct)));
  };

  const startHold = (dir) => {
    stopHold();
    holdIntervalRef.current = setInterval(() => {
      setBasketX((x) => Math.max(6, Math.min(94, x + dir * 4)));
    }, 60);
  };
  const stopHold = () => {
    if (holdIntervalRef.current) { clearInterval(holdIntervalRef.current); holdIntervalRef.current = null; }
  };

  useEffect(() => () => stopHold(), []);

  if (phase === 'countdown') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl md:text-8xl font-extrabold anim-bounceIn" key={countdownText}>{countdownText}</div>
        <div className="text-lg font-semibold mt-4">Sẵn sàng hứng đồ tái chế, {team.label}!</div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="text-6xl mb-2">🏁</div>
        <div className="text-2xl font-extrabold mb-2">Hết giờ!</div>
        <div className="text-lg mb-6">{team.label} đã ghi được <span className="font-extrabold">{score}</span> điểm!</div>
        <button className="btn-cartoon bg-teal-300 text-lg px-8 py-3" onClick={() => onRoundEnd(score)}>
          Xong! Về Đường Đua ▶️
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-2">
        <div className={`text-2xl font-extrabold ${timeLeft <= 5 ? 'timer-danger' : ''}`}>⏱️ {timeLeft}</div>
        <div className="text-xl font-extrabold">⭐ {score} điểm</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="btn-cartoon bg-orange-300 text-3xl px-4 py-6 shrink-0"
          onPointerDown={() => startHold(-1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
        >◀️</button>

        <div
          ref={arenaRef}
          className="relative flex-1 rounded-2xl border-4 overflow-hidden"
          style={{ height: 360, background: 'linear-gradient(180deg,#e0f7ff,#ffffff)', borderColor: '#2d2a4a' }}
          onPointerDown={(e) => moveBasketToClientX(e.clientX)}
          onPointerMove={(e) => { if (e.buttons === 1 || e.pressure > 0) moveBasketToClientX(e.clientX); }}
        >
          {items.map((it) => (
            <div key={it.id} className="absolute anim-fallin" style={{ left: `${it.x}%`, top: it.y, transform: 'translateX(-50%)' }}>
              <ItemIcon id={it.itemId} size={54} />
            </div>
          ))}

          <div
            className={`absolute bottom-2 ${pulse && pulse.type === 'bad' ? 'anim-tirespin' : ''} ${pulse && pulse.type === 'good' ? 'anim-boost' : ''}`}
            style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
          >
            <BasketSVG boosted={pulse && pulse.type === 'good'} />
          </div>
        </div>

        <button
          className="btn-cartoon bg-orange-300 text-3xl px-4 py-6 shrink-0"
          onPointerDown={() => startHold(1)}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
        >▶️</button>
      </div>
    </div>
  );
}

function BasketSVG({ boosted }) {
  return (
    <svg width="90" height="70" viewBox="0 0 90 70">
      <path d="M12 24 L78 24 L68 62 Q66 66 62 66 H28 Q24 66 22 62 Z" fill="#4fd1c5" stroke="#2d2a4a" strokeWidth="4" />
      <line x1="20" y1="34" x2="70" y2="34" stroke="#0d9488" strokeWidth="2.5" opacity="0.6" />
      <line x1="22" y1="46" x2="68" y2="46" stroke="#0d9488" strokeWidth="2.5" opacity="0.6" />
      <path d="M18 24 Q45 4 72 24" fill="none" stroke="#2d2a4a" strokeWidth="4" />
      <text x="45" y="18" textAnchor="middle" fontSize="20">♻️</text>
      {boosted && <circle cx="45" cy="24" r="40" fill="none" stroke="#fde047" strokeWidth="3" opacity="0.6" />}
    </svg>
  );
}
