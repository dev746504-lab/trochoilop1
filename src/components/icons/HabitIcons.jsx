const INK = '#2d2a4a';

function TearBad() {
  return (
    <>
      <rect x="14" y="30" width="40" height="52" rx="4" fill="#93c5fd" stroke={INK} strokeWidth="3" />
      <path d="M14 46 L34 40 L28 58 L54 50" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M58 26 L86 40 L70 44 L78 58 L58 44 Z" fill="#e2e8f0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <line x1="20" y1="70" x2="46" y2="70" stroke={INK} strokeWidth="2" opacity="0.4" />
      <line x1="20" y1="76" x2="40" y2="76" stroke={INK} strokeWidth="2" opacity="0.4" />
    </>
  );
}
function InkBad() {
  return (
    <>
      <rect x="16" y="18" width="46" height="58" rx="4" fill="#fefce8" stroke={INK} strokeWidth="3" />
      <line x1="22" y1="30" x2="56" y2="30" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="22" y1="38" x2="56" y2="38" stroke="#cbd5e1" strokeWidth="2" />
      <path d="M30 46 Q38 40 46 50 Q54 58 44 62 Q34 66 30 58 Q26 52 30 46 Z" fill="#1e293b" />
      <circle cx="70" cy="70" r="9" fill="#1e293b" />
      <circle cx="82" cy="60" r="4" fill="#1e293b" />
    </>
  );
}
function RunRulerBad() {
  return (
    <>
      <circle cx="34" cy="22" r="9" fill="#ffd8a8" stroke={INK} strokeWidth="2.5" />
      <path d="M24 40 L34 32 L48 36 L60 26" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M34 32 L28 62 M34 32 L44 60" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="46" y="20" width="30" height="10" rx="2" fill="#facc15" stroke={INK} strokeWidth="2.5" transform="rotate(-24 46 20)" />
      <path d="M14 24 L22 24 M14 30 L20 30" stroke={INK} strokeWidth="2" opacity="0.5" />
      <text x="72" y="20" fontSize="22" fontWeight="800" fill="#ef4444">!</text>
    </>
  );
}
function ThrowBad() {
  return (
    <>
      <rect x="14" y="52" width="24" height="30" rx="3" fill="#fca5a5" stroke={INK} strokeWidth="3" transform="rotate(-12 26 67)" />
      <rect x="46" y="46" width="22" height="28" rx="3" fill="#93c5fd" stroke={INK} strokeWidth="3" transform="rotate(18 57 60)" />
      <rect x="34" y="18" width="10" height="34" rx="4" fill="#fbbf24" stroke={INK} strokeWidth="2.5" transform="rotate(35 39 35)" />
      <path d="M60 20 Q66 12 74 18" stroke={INK} strokeWidth="2" fill="none" strokeDasharray="2 3" />
      <path d="M20 30 Q26 22 34 26" stroke={INK} strokeWidth="2" fill="none" strokeDasharray="2 3" />
    </>
  );
}
function FoldCornerBad() {
  return (
    <>
      <rect x="18" y="14" width="52" height="66" rx="4" fill="#fef3c7" stroke={INK} strokeWidth="3" />
      <line x1="26" y1="30" x2="60" y2="30" stroke="#d6bd83" strokeWidth="2" />
      <line x1="26" y1="40" x2="60" y2="40" stroke="#d6bd83" strokeWidth="2" />
      <line x1="26" y1="50" x2="60" y2="50" stroke="#d6bd83" strokeWidth="2" />
      <path d="M50 60 L70 60 L70 80 Z" fill="#fde68a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </>
  );
}

function CleanBagGood() {
  return (
    <>
      <path d="M26 40 Q26 20 50 20 Q74 20 74 40 L74 78 Q74 86 66 86 L34 86 Q26 86 26 78 Z" fill="#38bdf8" stroke={INK} strokeWidth="3" />
      <rect x="40" y="16" width="20" height="14" rx="6" fill="none" stroke={INK} strokeWidth="3" />
      <rect x="34" y="50" width="32" height="22" rx="4" fill="#0ea5e9" stroke={INK} strokeWidth="2.5" />
      <path d="M14 30 L20 36 L14 42" stroke="#fde047" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M82 24 L88 18 M82 34 L90 34" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
      <path d="M78 50 L84 44 L90 50 L84 56 Z" fill="#fde047" />
    </>
  );
}
function PenHolderGood() {
  return (
    <>
      <path d="M24 46 L76 46 L70 82 Q70 86 66 86 L34 86 Q30 86 30 82 Z" fill="#fca5a5" stroke={INK} strokeWidth="3" />
      <g transform="rotate(-8 34 20)">
        <rect x="30" y="14" width="8" height="40" rx="3" fill="#3b82f6" stroke={INK} strokeWidth="2" />
      </g>
      <g transform="rotate(4 50 16)">
        <rect x="46" y="10" width="8" height="44" rx="3" fill="#f59e0b" stroke={INK} strokeWidth="2" />
      </g>
      <g transform="rotate(14 66 22)">
        <rect x="62" y="16" width="8" height="38" rx="3" fill="#ec4899" stroke={INK} strokeWidth="2" />
      </g>
    </>
  );
}
function CoverBookGood() {
  return (
    <>
      <rect x="18" y="16" width="52" height="66" rx="4" fill="#86efac" stroke={INK} strokeWidth="3" />
      <rect x="18" y="16" width="52" height="14" rx="4" fill="#22c55e" stroke={INK} strokeWidth="2" />
      <rect x="60" y="34" width="22" height="14" rx="3" fill="#fef08a" stroke={INK} strokeWidth="2.5" transform="rotate(8 71 41)" />
      <line x1="26" y1="50" x2="54" y2="50" stroke="#166534" strokeWidth="2" opacity="0.5" />
      <line x1="26" y1="60" x2="54" y2="60" stroke="#166534" strokeWidth="2" opacity="0.5" />
    </>
  );
}
function CapPenGood() {
  return (
    <>
      <rect x="20" y="34" width="44" height="10" rx="3" fill="#facc15" stroke={INK} strokeWidth="2.5" />
      <path d="M14 30 L14 48 L4 39 Z" fill="#facc15" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <g transform="rotate(35 70 60)">
        <rect x="62" y="46" width="10" height="34" rx="4" fill="#3b82f6" stroke={INK} strokeWidth="2.5" />
        <rect x="62" y="40" width="10" height="8" rx="2" fill="#1e3a8a" stroke={INK} strokeWidth="2" />
      </g>
      <path d="M78 30 L82 24 M84 34 L90 32 M78 42 L84 44" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}
function ShelveBooksGood() {
  return (
    <>
      <rect x="12" y="70" width="76" height="8" rx="2" fill="#a16207" stroke={INK} strokeWidth="2.5" />
      <rect x="12" y="20" width="8" height="58" rx="2" fill="#a16207" stroke={INK} strokeWidth="2.5" />
      <rect x="80" y="20" width="8" height="58" rx="2" fill="#a16207" stroke={INK} strokeWidth="2.5" />
      <rect x="24" y="30" width="10" height="40" fill="#ef4444" stroke={INK} strokeWidth="2" />
      <rect x="36" y="30" width="10" height="40" fill="#3b82f6" stroke={INK} strokeWidth="2" />
      <rect x="48" y="30" width="10" height="40" fill="#22c55e" stroke={INK} strokeWidth="2" />
      <rect x="60" y="30" width="10" height="40" fill="#f59e0b" stroke={INK} strokeWidth="2" />
    </>
  );
}

const REGISTRY = {
  tear: TearBad,
  ink: InkBad,
  runRuler: RunRulerBad,
  throw: ThrowBad,
  foldCorner: FoldCornerBad,
  cleanBag: CleanBagGood,
  penHolder: PenHolderGood,
  coverBook: CoverBookGood,
  capPen: CapPenGood,
  shelveBooks: ShelveBooksGood,
};

export default function HabitIcon({ id, size = 64 }) {
  const Cmp = REGISTRY[id];
  if (!Cmp) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <Cmp />
    </svg>
  );
}
