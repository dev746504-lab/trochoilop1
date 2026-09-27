import CarSVG from './icons/CarSVG.jsx';
import { FINISH_SCORE } from '../data/gameData.js';

export default function RaceTrack({ teams, boostPulse }) {
  return (
    <div className="cartoon-panel p-3 md:p-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="flex flex-col gap-2">
        {teams.map((team) => {
          const pct = Math.max(0, Math.min(100, (team.score / FINISH_SCORE) * 100));
          const isBoosting = boostPulse && boostPulse.teamId === team.id;
          return (
            <div key={team.id} className="flex items-center gap-2">
              <div className="w-24 md:w-28 shrink-0 font-extrabold text-sm md:text-base flex items-center gap-1">
                <span>{team.emoji}</span>
                <span className="truncate">{team.label}</span>
              </div>
              <div className="relative flex-1 h-14 md:h-16 rounded-full border-4 overflow-visible" style={{ borderColor: '#2d2a4a', background: '#e0f2fe' }}>
                <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: '100%', background: 'repeating-linear-gradient(90deg,#f1f5f9,#f1f5f9 18px,#e2e8f0 18px,#e2e8f0 36px)' }} />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-2xl md:text-3xl">🏁</div>
                <div
                  className="absolute top-1/2 transition-all duration-700 ease-out"
                  style={{ left: `calc(${pct}% - ${pct > 90 ? 40 : 0}px)`, transform: 'translateY(-50%)' }}
                >
                  <CarSVG color={team.color} boosting={isBoosting} boostKey={isBoosting ? boostPulse.nonce : 0} size={62} />
                </div>
              </div>
              <div className="w-14 shrink-0 text-right font-extrabold text-base md:text-lg">{team.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
