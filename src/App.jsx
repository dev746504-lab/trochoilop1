import { useState } from 'react';
import { TEAMS_INIT, FINISH_SCORE } from './data/gameData.js';
import { useAudio } from './hooks/useAudio.js';
import { useSpeech } from './hooks/useSpeech.js';
import Lobby from './components/Lobby.jsx';
import WhackAMole from './components/WhackAMole.jsx';
import CatchGame from './components/CatchGame.jsx';
import Podium from './components/Podium.jsx';
import HelpModal from './components/HelpModal.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const [teams, setTeams] = useState(() => TEAMS_INIT.map((t) => ({ ...t, score: 0 })));
  const [currentTeamId, setCurrentTeamId] = useState(TEAMS_INIT[0].id);
  const [screen, setScreen] = useState('lobby');
  const [catchDuration, setCatchDuration] = useState(30);
  const [boostPulse, setBoostPulse] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const { muted, mutedRef, speak, toggleMuted } = useSpeech();
  const sounds = useAudio(mutedRef);

  const currentTeam = teams.find((t) => t.id === currentTeamId);

  const handleStartApp = () => {
    sounds.ensureAudioUnlocked();
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
    setStarted(true);
    setTimeout(() => speak('Chào mừng các tổ đến với Đấu Trường Vệ Sĩ Sách Bút! Chọn tổ và bắt đầu chơi nào!'), 150);
  };

  const handleRoundEnd = (points) => {
    const newScore = (currentTeam?.score || 0) + points;
    setTeams((prev) => prev.map((t) => (t.id === currentTeamId ? { ...t, score: newScore } : t)));
    setBoostPulse({ teamId: currentTeamId, nonce: Math.random() });
    if (newScore >= FINISH_SCORE) {
      setTimeout(() => setScreen('podium'), 300);
    } else {
      setScreen('lobby');
    }
  };

  const handleReplayAll = () => {
    setTeams(TEAMS_INIT.map((t) => ({ ...t, score: 0 })));
    setScreen('lobby');
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="cartoon-panel p-8 md:p-12 text-center max-w-lg anim-bounceIn">
          <div className="text-6xl mb-2">🏎️♻️</div>
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Đấu Trường Vệ Sĩ Sách Bút<br />&amp; Đua Xe Tái Chế</h1>
          <p className="text-base md:text-lg mb-6">4 Tổ cùng thi đua bảo vệ đồ dùng học tập và đua xe tái chế nào!</p>
          <button onClick={handleStartApp} className="btn-cartoon bg-yellow-300 text-xl px-8 py-4">▶️ Bắt Đầu Chơi!</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 md:p-4">
      <header className="cartoon-panel p-2 md:p-3 mb-3 flex items-center gap-3 flex-wrap">
        <div className="text-lg md:text-xl font-extrabold flex-1">🏎️ Đấu Trường Vệ Sĩ Sách Bút &amp; Đua Xe Tái Chế</div>
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

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} speak={speak} />}

      <main className="max-w-5xl mx-auto">
        {screen === 'lobby' && (
          <Lobby
            teams={teams}
            currentTeamId={currentTeamId}
            onSelectTeam={setCurrentTeamId}
            catchDuration={catchDuration}
            onSetCatchDuration={setCatchDuration}
            onStartWhack={() => setScreen('whack')}
            onStartCatch={() => setScreen('catch')}
            onOpenPodium={() => setScreen('podium')}
            boostPulse={boostPulse}
          />
        )}

        {screen === 'whack' && (
          <div className="cartoon-panel p-3 md:p-5">
            <WhackAMole team={currentTeam} sounds={sounds} speak={speak} onRoundEnd={handleRoundEnd} />
          </div>
        )}

        {screen === 'catch' && (
          <div className="cartoon-panel p-3 md:p-5">
            <CatchGame team={currentTeam} duration={catchDuration} sounds={sounds} speak={speak} onRoundEnd={handleRoundEnd} />
          </div>
        )}

        {screen === 'podium' && (
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
      </main>
    </div>
  );
}
