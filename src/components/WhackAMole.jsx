import { useEffect, useRef, useState } from 'react';
import HabitIcon from './icons/HabitIcons.jsx';
import { BAD_HABITS, GOOD_HABITS, WHACK_ROUND_SECONDS } from '../data/gameData.js';

const BAD_TO_GOOD = {
  tear: 'coverBook',
  ink: 'cleanBag',
  runRuler: 'capPen',
  throw: 'shelveBooks',
  foldCorner: 'coverBook',
  chewPen: 'useLidBox',
  scribbleDesk: 'cleanBag',
  dropCase: 'carryBagProperly',
};

const HOLE_COUNT = 6;
const SPAWN_DELAY_START = 1500;
const SPAWN_DELAY_END = 900;
const RETRACT_DELAY_START = 1500;
const RETRACT_DELAY_END = 1000;

function randomHabit() {
  const isBad = Math.random() < 0.5;
  const pool = isBad ? BAD_HABITS : GOOD_HABITS;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { kind: isBad ? 'bad' : 'good', itemId: pick.id, label: pick.label };
}

export default function WhackAMole({ team, sounds, speak, onRoundEnd }) {
  const [phase, setPhase] = useState('countdown');
  const [countdownText, setCountdownText] = useState('3');
  const [timeLeft, setTimeLeft] = useState(WHACK_ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [holes, setHoles] = useState(() => Array.from({ length: HOLE_COUNT }, () => ({ item: null, hitResultId: null })));

  const spawnTimeoutRef = useRef(null);
  const tickIntervalRef = useRef(null);
  const retractTimeouts = useRef({});
  const clearTimeouts = useRef({});
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(WHACK_ROUND_SECONDS);

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

  useEffect(() => {
    if (phase !== 'playing') return undefined;
    speak('Chạm nhanh để đập tan thói xấu và khen thưởng thiên thần giữ gìn nhé!');

    const scheduleSpawn = () => {
      const elapsedFrac = 1 - (timeLeftRef.current / WHACK_ROUND_SECONDS);
      const retractDelay = RETRACT_DELAY_START - elapsedFrac * (RETRACT_DELAY_START - RETRACT_DELAY_END);

      setHoles((prev) => {
        const emptyIdx = prev.map((h, i) => (h.item ? -1 : i)).filter((i) => i >= 0);
        if (emptyIdx.length === 0) return prev;
        const howMany = Math.min(emptyIdx.length, Math.random() < 0.5 ? 1 : 2);
        const chosen = [...emptyIdx].sort(() => Math.random() - 0.5).slice(0, howMany);
        const next = prev.slice();
        chosen.forEach((idx) => {
          const habit = randomHabit();
          next[idx] = { item: habit, hitResultId: null };
          retractTimeouts.current[idx] = setTimeout(() => {
            setHoles((cur) => {
              const copy = cur.slice();
              if (copy[idx].item === habit) copy[idx] = { item: null, hitResultId: null };
              return copy;
            });
            setCombo(0);
          }, retractDelay);
        });
        return next;
      });

      const nextDelay = SPAWN_DELAY_START - elapsedFrac * (SPAWN_DELAY_START - SPAWN_DELAY_END);
      spawnTimeoutRef.current = setTimeout(scheduleSpawn, nextDelay);
    };
    spawnTimeoutRef.current = setTimeout(scheduleSpawn, SPAWN_DELAY_START);

    tickIntervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          return 0;
        }
        if (t <= 6) sounds.tick();
        return t - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(spawnTimeoutRef.current);
      clearInterval(tickIntervalRef.current);
      Object.values(retractTimeouts.current).forEach(clearTimeout);
      Object.values(clearTimeouts.current).forEach(clearTimeout);
      retractTimeouts.current = {};
      clearTimeouts.current = {};
    };
  }, [phase, sounds, speak]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      setPhase('result');
      sounds.whistle();
    }
  }, [phase, timeLeft, sounds]);

  const handleHit = (idx) => {
    setHoles((prev) => {
      const hole = prev[idx];
      if (!hole.item) return prev;
      if (retractTimeouts.current[idx]) {
        clearTimeout(retractTimeouts.current[idx]);
        delete retractTimeouts.current[idx];
      }
      const { kind, itemId } = hole.item;
      const resultId = kind === 'bad' ? BAD_TO_GOOD[itemId] : itemId;
      scoreRef.current += 10;
      setScore(scoreRef.current);
      setCombo((c) => c + 1);
      if (kind === 'bad') sounds.pop(); else sounds.chime();

      const next = prev.slice();
      next[idx] = { item: hole.item, hitResultId: resultId };
      clearTimeouts.current[idx] = setTimeout(() => {
        setHoles((cur) => {
          const copy = cur.slice();
          copy[idx] = { item: null, hitResultId: null };
          return copy;
        });
      }, 500);
      return next;
    });
  };

  if (phase === 'countdown') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl md:text-8xl font-extrabold anim-bounceIn" key={countdownText}>{countdownText}</div>
        <div className="text-lg font-semibold mt-4">Chuẩn bị chạm thật nhanh nhé, {team.label}!</div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="text-6xl mb-2">🎉</div>
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
        {combo >= 3 && (
          <div key={combo} className="text-lg font-extrabold text-orange-500 anim-pop">🔥 Combo x{combo}!</div>
        )}
        <div className="text-xl font-extrabold">⭐ {score} điểm</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-2">
        {holes.map((hole, idx) => (
          <div key={idx} className="relative flex items-center justify-center" style={{ height: 130 }}>
            <div className="hole-mound absolute" style={{ width: 110, height: 46, bottom: 0 }} />
            <div className="absolute overflow-hidden flex items-end justify-center" style={{ width: 110, height: 110, bottom: 0 }}>
              {hole.item && (
                <button
                  onPointerDown={(e) => { e.preventDefault(); handleHit(idx); }}
                  data-mole={hole.hitResultId ? undefined : '1'}
                  className={`mole-rise cartoon-panel flex items-center justify-center ${hole.hitResultId ? 'anim-pop' : ''}`}
                  style={{
                    width: 90, height: 90, borderRadius: '50%',
                    background: hole.hitResultId ? '#dcfce7' : (hole.item.kind === 'bad' ? '#fecaca' : '#dcfce7'),
                    borderColor: hole.item.kind === 'bad' && !hole.hitResultId ? '#ef4444' : '#16a34a',
                    position: 'relative',
                  }}
                >
                  <HabitIcon id={hole.hitResultId || hole.item.itemId} size={64} />
                  {hole.hitResultId && (
                    <div className="sparkle-wipe absolute inset-0 rounded-full" style={{ background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.9), transparent)' }} />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
