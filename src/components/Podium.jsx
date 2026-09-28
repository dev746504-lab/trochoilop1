import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import CarSVG from './icons/CarSVG.jsx';
import TreasureChests from './TreasureChests.jsx';

const MEDALS = ['🥇', '🥈', '🥉', '🎖️'];
const GAME_ICON = { whack: '🎯', catch: '🚗' };

export default function Podium({
  teams, onReplay, onClose, speak, sounds,
  title = '🏆 Bục Vinh Danh 4 Tổ 🏆',
  closeLabel = '◀️ Quay Lại Đường Đua',
  celebrateSpeech = 'Chúc mừng các tổ! Cùng mở kho báu lợi ích của việc giữ gìn đồ dùng học tập nhé!',
  turnLog,
}) {
  const ranked = [...teams].sort((a, b) => b.score - a.score);
  const topTurns = turnLog ? [...turnLog].sort((a, b) => b.points - a.points).slice(0, 5) : null;

  useEffect(() => {
    sounds.fanfare();
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.4 } });
    const t1 = setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.3, x: 0.2 } }), 300);
    const t2 = setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.3, x: 0.8 } }), 500);
    speak(celebrateSpeech);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-3xl md:text-4xl font-extrabold mb-4 text-center">{title}</div>

      <div className={`grid gap-4 w-full mb-8 ${ranked.length === 1 ? 'max-w-xs grid-cols-1' : 'max-w-4xl grid-cols-2 md:grid-cols-4'}`}>
        {ranked.map((team, i) => (
          <div key={team.id} className="cartoon-panel p-3 flex flex-col items-center anim-bounceIn" style={{ background: `${team.color}33`, animationDelay: `${i * 0.12}s` }}>
            {ranked.length > 1 && <div className="text-4xl mb-1">{MEDALS[i] || '🎖️'}</div>}
            <CarSVG color={team.color} size={ranked.length === 1 ? 84 : 64} />
            <div className="font-extrabold mt-1">{team.emoji} {team.label}</div>
            <div className="font-bold text-lg">{team.score} điểm</div>
          </div>
        ))}
      </div>

      {topTurns && topTurns.length > 0 && (
        <div className="cartoon-panel p-3 md:p-4 w-full max-w-xl mb-8">
          <div className="text-xl font-extrabold mb-2 text-center">🌟 Top Lượt Chơi Xuất Sắc</div>
          <div className="flex flex-col gap-2">
            {topTurns.map((turn, i) => (
              <div key={turn.id} className="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2 border-2 border-amber-200">
                <span className="text-xl w-7 text-center">{MEDALS[i] || '🎖️'}</span>
                <span className="flex-1 font-bold truncate">{turn.name}</span>
                <span>{GAME_ICON[turn.game] || ''}</span>
                <span className="font-extrabold">{turn.points} điểm</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <TreasureChests sounds={sounds} speak={speak} />

      <div className="flex gap-3 flex-wrap justify-center">
        <button className="btn-cartoon bg-gray-200 px-6 py-3 text-lg" onClick={onClose}>{closeLabel}</button>
        <button className="btn-cartoon bg-red-300 px-6 py-3 text-lg" onClick={onReplay}>🔁 Chơi Lại Từ Đầu</button>
      </div>
    </div>
  );
}
