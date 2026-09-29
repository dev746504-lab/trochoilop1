import { useRef, useState } from 'react';
import { TEAMS_INIT, FINISH_SCORE, CLASS_FINISH_SCORE, CLASS_TEAM_TEMPLATE } from './data/gameData.js';
import { useAudio } from './hooks/useAudio.js';
import { useSpeech } from './hooks/useSpeech.js';
import Lobby from './components/Lobby.jsx';
import ClassLobby from './components/ClassLobby.jsx';
import WhackAMole from './components/WhackAMole.jsx';
import CatchGame from './components/CatchGame.jsx';
import SortingGame from './components/SortingGame.jsx';
import Podium from './components/Podium.jsx';
import HelpModal from './components/HelpModal.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(null); // 'teams' | 'class'

  // ---- Teams mode state ----
  const [teams, setTeams] = useState(() => TEAMS_INIT.map((t) => ({ ...t, score: 0 })));
  const [currentTeamId, setCurrentTeamId] = useState(TEAMS_INIT[0].id);

  // ---- Class mode state ----
  const [classScore, setClassScore] = useState(0);
  const [turnLog, setTurnLog] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const turnIdRef = useRef(0);

  const [screen, setScreen] = useState('lobby');
  const [catchDuration, setCatchDuration] = useState(30);
  const [boostPulse, setBoostPulse] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [pendingGame, setPendingGame] = useState(null); // 'whack' | 'catch' | 'sorting', remembers which game a class-mode turn was

  const { muted, mutedRef, speak, toggleMuted } = useSpeech();
  const sounds = useAudio(mutedRef);

  const currentTeam = teams.find((t) => t.id === currentTeamId);
  const classDisplayName = playerName.trim() || 'Bạn tình nguyện';
  const classTeam = { ...CLASS_TEAM_TEMPLATE, label: classDisplayName, score: classScore };

  const handleChooseMode = (chosenMode) => {
    sounds.ensureAudioUnlocked();
    setMode(chosenMode);
    setStarted(true);
  };

  const handleChangeMode = () => {
    setStarted(false);
    setMode(null);
    setScreen('lobby');
    setTeams(TEAMS_INIT.map((t) => ({ ...t, score: 0 })));
    setClassScore(0);
    setTurnLog([]);
    setPlayerName('');
  };

  const handleStartWhack = () => { setPendingGame('whack'); setScreen('whack'); };
  const handleStartCatch = () => { setPendingGame('catch'); setScreen('catch'); };
  const handleStartSorting = () => { setPendingGame('sorting'); setScreen('sorting'); };

  const handleRoundEnd = (points) => {
    if (mode === 'teams') {
      const newScore = (currentTeam?.score || 0) + points;
      setTeams((prev) => prev.map((t) => (t.id === currentTeamId ? { ...t, score: newScore } : t)));
      setBoostPulse({ teamId: currentTeamId, nonce: Math.random() });
      if (newScore >= FINISH_SCORE) {
        setTimeout(() => setScreen('podium'), 300);
      } else {
        setScreen('lobby');
      }
      return;
    }

    // class mode
    const newScore = classScore + points;
    setClassScore(newScore);
    setTurnLog((prev) => [{ id: turnIdRef.current++, name: classDisplayName, points, game: pendingGame }, ...prev]);
    setPlayerName('');
    setBoostPulse({ teamId: 'class', nonce: Math.random() });
    if (newScore >= CLASS_FINISH_SCORE) {
      setTimeout(() => setScreen('podium'), 300);
    } else {
      setScreen('lobby');
    }
  };

  const handleReplayAll = () => {
    if (mode === 'teams') {
      setTeams(TEAMS_INIT.map((t) => ({ ...t, score: 0 })));
    } else {
      setClassScore(0);
      setTurnLog([]);
      setPlayerName('');
    }
    setScreen('lobby');
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="cartoon-panel p-8 md:p-12 text-center max-w-xl anim-bounceIn">
          <div className="text-6xl mb-2">🏎️♻️</div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Đấu Trường Vệ Sĩ Sách Bút<br />&amp; Đua Xe Tái Chế</h1>
          <p className="text-base md:text-lg mb-6">Chọn cách chơi phù hợp với lớp mình nhé!</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={() => handleChooseMode('teams')} className="btn-cartoon bg-yellow-300 text-lg px-6 py-5 flex flex-col items-center gap-1">
              <span className="text-3xl">👥</span>
              Chơi Theo Tổ
              <span className="text-xs font-semibold opacity-70">4 tổ thi đua đua xe</span>
            </button>
            <button onClick={() => handleChooseMode('class')} className="btn-cartoon bg-sky-300 text-lg px-6 py-5 flex flex-col items-center gap-1">
              <span className="text-3xl">🙋</span>
              Cả Lớp Cùng Chơi
              <span className="text-xs font-semibold opacity-70">không chia tổ, từng bạn lần lượt lên chơi</span>
            </button>
          </div>
          <a href="/" className="btn-cartoon inline-block no-underline bg-orange-200 px-5 py-3 mt-4" title="Về trang chủ">
            🏠 Trang Chủ
          </a>
        </div>
      </div>
    );
  }

  const activeTeam = mode === 'teams' ? currentTeam : classTeam;

  return (
    <div className="min-h-screen p-2 md:p-4">
      <header className="cartoon-panel p-2 md:p-3 mb-3 flex items-center gap-3 flex-wrap">
        <div className="text-lg md:text-xl font-extrabold flex-1">🏎️ Đấu Trường Vệ Sĩ Sách Bút &amp; Đua Xe Tái Chế</div>
        <a href="/" className="btn-cartoon inline-block no-underline bg-orange-200 px-3 py-2 text-sm md:text-base" title="Về trang chủ">
          🏠 Trang Chủ
        </a>
        <button onClick={handleChangeMode} className="btn-cartoon bg-orange-200 px-3 py-2 text-sm md:text-base" title="Đổi cách chơi">
          🔁 Đổi Cách Chơi
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="btn-cartoon bg-lime-300 px-3 py-2 text-sm md:text-base"
          title="Hướng dẫn chơi"
        >
          ❓ Hướng Dẫn
        </button>
        <button
          onClick={toggleMuted}
          className={`btn-cartoon bg-sky-200 px-3 py-2 text-lg ${muted ? 'mute-off' : ''}`}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </header>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <main className="max-w-5xl mx-auto">
        {screen === 'lobby' && mode === 'teams' && (
          <Lobby
            teams={teams}
            currentTeamId={currentTeamId}
            onSelectTeam={setCurrentTeamId}
            catchDuration={catchDuration}
            onSetCatchDuration={setCatchDuration}
            onStartWhack={handleStartWhack}
            onStartCatch={handleStartCatch}
            onStartSorting={handleStartSorting}
            onOpenPodium={() => setScreen('podium')}
            boostPulse={boostPulse}
          />
        )}

        {screen === 'lobby' && mode === 'class' && (
          <ClassLobby
            classTeam={classTeam}
            boostPulse={boostPulse}
            playerName={playerName}
            onPlayerNameChange={setPlayerName}
            catchDuration={catchDuration}
            onSetCatchDuration={setCatchDuration}
            onStartWhack={handleStartWhack}
            onStartCatch={handleStartCatch}
            onStartSorting={handleStartSorting}
            onOpenCelebration={() => setScreen('podium')}
            turnLog={turnLog}
          />
        )}

        {screen === 'whack' && (
          <div className="cartoon-panel p-3 md:p-5">
            <WhackAMole team={activeTeam} sounds={sounds} speak={speak} onRoundEnd={handleRoundEnd} />
          </div>
        )}

        {screen === 'catch' && (
          <div className="cartoon-panel p-3 md:p-5">
            <CatchGame team={activeTeam} duration={catchDuration} sounds={sounds} speak={speak} onRoundEnd={handleRoundEnd} />
          </div>
        )}

        {screen === 'sorting' && (
          <div className="cartoon-panel p-3 md:p-5">
            <SortingGame team={activeTeam} sounds={sounds} speak={speak} onRoundEnd={handleRoundEnd} />
          </div>
        )}

        {screen === 'podium' && mode === 'teams' && (
          <div className="cartoon-panel p-3 md:p-5">
            <Podium
              teams={teams}
              sounds={sounds}
              speak={speak}
              onReplay={handleReplayAll}
              onClose={() => setScreen('lobby')}
            />
          </div>
        )}

        {screen === 'podium' && mode === 'class' && (
          <div className="cartoon-panel p-3 md:p-5">
            <Podium
              teams={[classTeam]}
              turnLog={turnLog}
              title="🏆 Cả Lớp Đã Hoàn Thành Mục Tiêu! 🏆"
              closeLabel="◀️ Quay Lại"
              celebrateSpeech="Chúc mừng cả lớp mình! Cùng mở kho báu lợi ích của việc giữ gìn đồ dùng học tập nhé!"
              sounds={sounds}
              speak={speak}
              onReplay={handleReplayAll}
              onClose={() => setScreen('lobby')}
            />
          </div>
        )}
      </main>
    </div>
  );
}
