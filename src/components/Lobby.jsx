import RaceTrack from './RaceTrack.jsx';
import TeamSelector from './TeamSelector.jsx';

export default function Lobby({
  teams, currentTeamId, onSelectTeam,
  catchDuration, onSetCatchDuration,
  onStartWhack, onStartCatch, onStartSorting, onOpenPodium,
  boostPulse,
}) {
  const currentTeam = teams.find((t) => t.id === currentTeamId);

  return (
    <div className="flex flex-col gap-4">
      <RaceTrack teams={teams} boostPulse={boostPulse} />

      <div className="cartoon-panel p-3 md:p-4">
        <div className="text-center font-extrabold text-lg mb-2">👉 Chọn Tổ Đang Chơi</div>
        <TeamSelector teams={teams} currentTeamId={currentTeamId} onSelect={onSelectTeam} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={onStartWhack}
          className="btn-cartoon anim-wiggle text-lg md:text-xl px-4 py-6 flex flex-col items-center gap-2"
          style={{ background: '#fca5a5' }}
        >
          <span className="text-4xl">🎯</span>
          Đập Tan Thói Xấu
          <span className="text-sm font-semibold opacity-80">({currentTeam?.label} đang chơi)</span>
        </button>

        <button
          onClick={onStartCatch}
          className="btn-cartoon anim-wiggle text-lg md:text-xl px-4 py-6 flex flex-col items-center gap-2"
          style={{ background: '#93c5fd', animationDelay: '.15s' }}
        >
          <span className="text-4xl">🚗</span>
          Siêu Xe Hứng Đồ
          <span className="text-sm font-semibold opacity-80">({currentTeam?.label} đang chơi)</span>
        </button>

        <button
          onClick={onStartSorting}
          className="btn-cartoon anim-wiggle text-lg md:text-xl px-4 py-6 flex flex-col items-center gap-2"
          style={{ background: '#86efac', animationDelay: '.3s' }}
        >
          <span className="text-4xl">🗂️</span>
          Phân Loại Đồ Dùng
          <span className="text-sm font-semibold opacity-80">({currentTeam?.label} đang chơi)</span>
        </button>
      </div>

      <div className="cartoon-panel p-3 flex items-center justify-center gap-3 flex-wrap">
        <span className="font-bold">⏱️ Thời gian Siêu Xe Hứng Đồ:</span>
        {[30, 45].map((d) => (
          <button
            key={d}
            onClick={() => onSetCatchDuration(d)}
            className={`btn-cartoon px-4 py-2 ${catchDuration === d ? 'bg-yellow-300' : 'bg-gray-100'}`}
          >
            {d} giây
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={onOpenPodium} className="btn-cartoon bg-purple-300 text-lg px-8 py-3">
          🏆 Tổng Kết Trao Cúp
        </button>
      </div>
    </div>
  );
}
