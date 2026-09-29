import { useEffect, useRef, useState } from 'react';
import ItemIcon from './icons/ItemIcons.jsx';
import { CATCH_GOOD, CATCH_BAD, SORTING_ROUND_SECONDS } from '../data/gameData.js';

const FALL_DURATION_START = 3000;
const FALL_DURATION_END = 1800;
const SPAWN_GAP = 350;

function randomSortItem() {
  const isGood = Math.random() < 0.5;
  const pool = isGood ? CATCH_GOOD : CATCH_BAD;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { kind: isGood ? 'good' : 'bad', itemId: pick.id };
}

export default function SortingGame({ team, sounds, speak, onRoundEnd }) {
  const [phase, setPhase] = useState('countdown');
  const [countdownText, setCountdownText] = useState('3');
  const [timeLeft, setTimeLeft] = useState(SORTING_ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [landed, setLanded] = useState(false);
  const [flash, setFlash] = useState(null);

  const scoreRef = useRef(0);
  const timeLeftRef = useRef(SORTING_ROUND_SECONDS);
  const activeItemRef = useRef(null);
  const itemIdRef = useRef(0);
  const fallTimeoutRef = useRef(null);
  const landTimeoutRef = useRef(null);
  const tickIntervalRef = useRef(null);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);

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

  const spawnItem = () => {
    const item = randomSortItem();
    const elapsedFrac = 1 - (timeLeftRef.current / SORTING_ROUND_SECONDS);
    const fallDuration = FALL_DURATION_START - elapsedFrac * (FALL_DURATION_START - FALL_DURATION_END);
    const next = { id: itemIdRef.current++, kind: item.kind, itemId: item.itemId, fallDuration };
    activeItemRef.current = next;
    setActiveItem(next);
    setLanded(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setLanded(true)));
    fallTimeoutRef.current = setTimeout(() => resolve(null), fallDuration);
  };

  const resolve = (side) => {
    const item = activeItemRef.current;
    if (!item) return;
    clearTimeout(fallTimeoutRef.current);
    activeItemRef.current = null;
    setActiveItem(null);

    if (side) {
      const correctSide = item.kind === 'good' ? 'left' : 'right';
      if (side === correctSide) {
        scoreRef.current += 10;
        sounds.chime();
        setFlash({ side, ok: true, nonce: Math.random() });
      } else {
        scoreRef.current = Math.max(0, scoreRef.current - 5);
        sounds.wrongBuzz();
        setFlash({ side, ok: false, nonce: Math.random() });
      }
      setScore(scoreRef.current);
    }

    landTimeoutRef.current = setTimeout(() => {
      if (timeLeftRef.current > 0) spawnItem();
    }, SPAWN_GAP);
  };

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    speak('Chạm bên trái nếu đồ nên giữ gìn, chạm bên phải nếu đó là thói xấu nhé!');
    spawnItem();

    tickIntervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) return 0;
        if (t <= 6) sounds.tick();
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(tickIntervalRef.current);
      clearTimeout(fallTimeoutRef.current);
      clearTimeout(landTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sounds, speak]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      setPhase('result');
      sounds.whistle();
    }
  }, [phase, timeLeft, sounds]);

  if (phase === 'countdown') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl md:text-8xl font-extrabold anim-bounceIn" key={countdownText}>{countdownText}</div>
        <div className="text-lg font-semibold mt-4">Sẵn sàng phân loại thật nhanh, {team.label}!</div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="text-6xl mb-2">🗂️</div>
        <div className="text-2xl font-extrabold mb-2">Hết giờ!</div>
        <div className="text-lg mb-6">{team.label} đã ghi được <span className="font-extrabold">{score}</span> điểm!</div>
        <button className="btn-cartoon bg-teal-300 text-lg px-8 py-3" onClick={() => onRoundEnd(score)}>
          Xong! Về Đường Đua ▶️
        </button>
      </div>
    );
  }

  const arenaHeight = 360;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-2">
        <div className={`text-2xl font-extrabold ${timeLeft <= 5 ? 'timer-danger' : ''}`}>⏱️ {timeLeft}</div>
        <div className="text-xl font-extrabold">⭐ {score} điểm</div>
      </div>

      <div className="relative rounded-2xl border-4 overflow-hidden flex" style={{ height: arenaHeight, borderColor: '#2d2a4a' }}>
        <button
          onPointerDown={() => resolve('left')}
          className={`flex-1 flex flex-col items-center justify-end pb-4 ${flash && flash.side === 'left' ? (flash.ok ? 'anim-boost' : 'anim-shake') : ''}`}
          style={{ background: 'linear-gradient(180deg,#dcfce7,#bbf7d0)' }}
        >
          <span className="text-4xl mb-1">♻️</span>
          <span className="font-extrabold text-lg">Giữ Gìn</span>
        </button>
        <div className="w-1 self-stretch" style={{ background: '#2d2a4a' }} />
        <button
          onPointerDown={() => resolve('right')}
          className={`flex-1 flex flex-col items-center justify-end pb-4 ${flash && flash.side === 'right' ? (flash.ok ? 'anim-boost' : 'anim-shake') : ''}`}
          style={{ background: 'linear-gradient(180deg,#fee2e2,#fecaca)' }}
        >
          <span className="text-4xl mb-1">😖</span>
          <span className="font-extrabold text-lg">Thói Xấu</span>
        </button>

        {activeItem && (
          <div
            className="absolute"
            style={{
              left: '50%',
              top: landed ? arenaHeight - 90 : -70,
              transform: 'translateX(-50%)',
              transition: `top ${activeItem.fallDuration}ms linear`,
              pointerEvents: 'none',
              filter: activeItem.kind === 'good' ? 'drop-shadow(0 -10px 8px rgba(34,197,94,0.5))' : 'drop-shadow(0 -10px 8px rgba(239,68,68,0.5))',
            }}
          >
            <ItemIcon id={activeItem.itemId} size={58} />
          </div>
        )}
      </div>
    </div>
  );
}
