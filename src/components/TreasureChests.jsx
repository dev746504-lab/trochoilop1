import { useState } from 'react';
import { TREASURES } from '../data/gameData.js';

export default function TreasureChests({ sounds, speak }) {
  const [openChests, setOpenChests] = useState({});

  const openChest = (chest) => {
    setOpenChests((prev) => ({ ...prev, [chest.id]: true }));
    sounds.chime();
    speak(chest.text);
  };

  return (
    <>
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
    </>
  );
}
