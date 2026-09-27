import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import CarSVG from './icons/CarSVG.jsx';
import { TREASURES } from '../data/gameData.js';

const MEDALS = ['🥇', '🥈', '🥉', '🎖️'];

export default function Podium({ teams, onReplay, onClose, speak, sounds }) {
  const [openChests, setOpenChests] = useState({});
  const ranked = [...teams].sort((a, b) => b.score - a.score);

  useEffect(() => {
    sounds.fanfare();
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.4 } });
    const t1 = setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.3, x: 0.2 } }), 300);
    const t2 = setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.3, x: 0.8 } }), 500);
    speak('Chúc mừng các tổ! Cùng mở kho báu lợi ích của việc giữ gìn đồ dùng học tập nhé!');
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openChest = (chest) => {
    setOpenChests((prev) => ({ ...prev, [chest.id]: true }));
    sounds.chime();
    speak(chest.text);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-3xl md:text-4xl font-extrabold mb-4 text-center">🏆 Bục Vinh Danh 4 Tổ 🏆</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
        {ranked.map((team, i) => (
          <div key={team.id} className="cartoon-panel p-3 flex flex-col items-center anim-bounceIn" style={{ background: `${team.color}33`, animationDelay: `${i * 0.12}s` }}>
            <div className="text-4xl mb-1">{MEDALS[i] || '🎖️'}</div>
            <CarSVG color={team.color} size={64} />
            <div className="font-extrabold mt-1">{team.emoji} {team.label}</div>
            <div className="font-bold text-lg">{team.score} điểm</div>
          </div>
        ))}
      </div>

      <div className="text-xl md:text-2xl font-extrabold mb-3 text-center">🎁 Mở 3 Kho Báu Lợi Ích</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
        {TREASURES.map((chest) => {
          const open = !!openChests[chest.id];
          return (
            <button
              key={chest.id}
              onClick={() => openChest(chest)}
              className={`cartoon-panel p-4 flex flex-col items-center text-center ${open ? 'anim-chest' : 'anim-pulse'}`}
              style={{ background: open ? '#fef9c3' : '#ffffff' }}
            >
              <div className="text-5xl mb-2">{open ? chest.icon : '🎁'}</div>
              <div className="font-extrabold mb-1">{chest.title}</div>
              {open && <div className="text-sm font-semibold">{chest.text}</div>}
              {!open && <div className="text-sm text-gray-500">Chạm để mở!</div>}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <button className="btn-cartoon bg-gray-200 px-6 py-3 text-lg" onClick={onClose}>◀️ Quay Lại Đường Đua</button>
        <button className="btn-cartoon bg-red-300 px-6 py-3 text-lg" onClick={onReplay}>🔁 Chơi Lại Từ Đầu</button>
      </div>
    </div>
  );
}
