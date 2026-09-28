import RaceTrack from './RaceTrack.jsx';

const GAME_ICON = { whack: '🎯', catch: '🚗' };

export default function ClassLobby({
  classTeam, boostPulse,
  playerName, onPlayerNameChange,
  catchDuration, onSetCatchDuration,
  onStartWhack, onStartCatch, onOpenCelebration,
  turnLog,
}) {
  const displayName = playerName.trim() || 'Bạn tình nguyện';

  return (
    <div className="flex flex-col gap-4">
      <RaceTrack teams={[classTeam]} boostPulse={boostPulse} />

      <div className="cartoon-panel p-3 md:p-4">
        <div className="text-center font-extrabold text-lg mb-2">🙋 Bạn Nào Lên Chơi Lượt Này?</div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          placeholder="Nhập tên bạn (không bắt buộc)..."
          maxLength={30}
          className="w-full text-center text-lg font-semibold rounded-2xl border-4 px-4 py-2"
          style={{ borderColor: '#2d2a4a' }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={onStartWhack}
          className="btn-cartoon anim-wiggle text-xl md:text-2xl px-6 py-8 flex flex-col items-center gap-2"
          style={{ background: '#fca5a5' }}
        >
          <span className="text-4xl">🎯</span>
          Đập Tan Thói Xấu - Bảo Vệ Đồ Dùng
          <span className="text-sm font-semibold opacity-80">({displayName} đang chơi)</span>
        </button>

        <button
          onClick={onStartCatch}
          className="btn-cartoon anim-wiggle text-xl md:text-2xl px-6 py-8 flex flex-col items-center gap-2"
          style={{ background: '#93c5fd', animationDelay: '.3s' }}
        >
          <span className="text-4xl">🚗</span>
          Siêu Xe Hứng Đồ Tái Chế
          <span className="text-sm font-semibold opacity-80">({displayName} đang chơi)</span>
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

      <div className="cartoon-panel p-3 md:p-4">
        <div className="text-center font-extrabold text-lg mb-2">📜 Nhật Ký Lượt Chơi</div>
        {turnLog.length === 0 ? (
          <div className="text-center text-gray-500">Chưa có bạn nào chơi. Lên chơi lượt đầu tiên nào!</div>
        ) : (
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar-thin">
            {turnLog.map((turn) => (
              <div key={turn.id} className="flex items-center gap-2 bg-sky-50 rounded-xl px-3 py-2 border-2 border-sky-200">
                <span>{GAME_ICON[turn.game] || ''}</span>
                <span className="flex-1 font-bold truncate">{turn.name}</span>
                <span className="font-extrabold">{turn.points >= 0 ? '+' : ''}{turn.points} điểm</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button onClick={onOpenCelebration} className="btn-cartoon bg-purple-300 text-lg px-8 py-3">
          🏆 Tổng Kết Cả Lớp
        </button>
      </div>
    </div>
  );
}
