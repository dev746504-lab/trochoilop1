const INK = '#2d2a4a';

function TubeGood() {
  return (
    <>
      <rect x="26" y="14" width="48" height="72" rx="8" fill="#d9a066" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="14" rx="24" ry="8" fill="#e8c39e" stroke={INK} strokeWidth="3" />
      <path d="M30 34 Q50 40 70 34" stroke="#b5793a" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M30 54 Q50 60 70 54" stroke="#b5793a" strokeWidth="2" fill="none" opacity="0.6" />
    </>
  );
}
function BottleGood() {
  return (
    <>
      <path d="M32 16 h36 v14 l10 14 v42 a6 6 0 0 1 -6 6 H28 a6 6 0 0 1 -6 -6 V44 l10 -14 Z" fill="#a5e8f0" stroke={INK} strokeWidth="3" opacity="0.9" />
      <rect x="38" y="8" width="24" height="10" rx="3" fill="#60a5fa" stroke={INK} strokeWidth="3" />
      <line x1="26" y1="58" x2="74" y2="58" stroke="#ffffff" strokeWidth="2.5" opacity="0.7" />
    </>
  );
}
function CartonGood() {
  return (
    <>
      <rect x="16" y="30" width="68" height="56" rx="4" fill="#c68a4e" stroke={INK} strokeWidth="3" />
      <path d="M16 30 L34 14 H66 L84 30" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M16 30 L34 14 M84 30 L66 14" stroke="#8a5a2e" strokeWidth="2" />
      <line x1="24" y1="50" x2="76" y2="50" stroke="#8a5a2e" strokeWidth="2" opacity="0.5" />
      <line x1="24" y1="66" x2="76" y2="66" stroke="#8a5a2e" strokeWidth="2" opacity="0.5" />
    </>
  );
}
function PencilGood() {
  return (
    <g transform="rotate(45 50 50)">
      <rect x="38" y="12" width="24" height="52" rx="3" fill="#f59e0b" stroke={INK} strokeWidth="3" />
      <polygon points="38,64 62,64 50,84" fill="#e2b98a" stroke={INK} strokeWidth="3" />
      <polygon points="45,72 55,72 50,84" fill="#4b3621" />
      <rect x="38" y="12" width="24" height="10" fill="#f9d976" stroke={INK} strokeWidth="3" />
      <rect x="38" y="6" width="24" height="8" rx="2" fill="#fda4af" stroke={INK} strokeWidth="3" />
      <path d="M70 20 L76 14 M74 30 L82 28" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}
function PenGood() {
  return (
    <g transform="rotate(45 50 50)">
      <rect x="38" y="14" width="24" height="48" rx="8" fill="#3b82f6" stroke={INK} strokeWidth="3" />
      <rect x="41" y="6" width="18" height="12" rx="4" fill="#1e3a8a" stroke={INK} strokeWidth="3" />
      <rect x="40" y="26" width="20" height="8" fill="#93c5fd" />
    </g>
  );
}
function BookGood() {
  return (
    <>
      <rect x="18" y="18" width="64" height="64" rx="5" fill="#86efac" stroke={INK} strokeWidth="3" />
      <rect x="18" y="18" width="64" height="14" rx="5" fill="#22c55e" stroke={INK} strokeWidth="2.5" />
      <line x1="28" y1="48" x2="72" y2="48" stroke="#166534" strokeWidth="2" opacity="0.5" />
      <line x1="28" y1="60" x2="60" y2="60" stroke="#166534" strokeWidth="2" opacity="0.5" />
    </>
  );
}

function InkstainBad() {
  return (
    <>
      <path d="M40 30 Q52 20 64 34 Q78 44 66 58 Q72 72 54 74 Q36 78 30 62 Q20 54 28 42 Q30 32 40 30 Z" fill="#1e293b" stroke={INK} strokeWidth="2" />
      <circle cx="78" cy="66" r="6" fill="#1e293b" />
    </>
  );
}
function PaperplaneBad() {
  return (
    <>
      <path d="M14 50 L86 20 L54 86 L46 56 Z" fill="#e2e8f0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 56 L86 20 L54 86 Z" fill="#cbd5e1" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 50 L46 56" stroke={INK} strokeWidth="2" strokeDasharray="2 3" />
    </>
  );
}
function BrokenpencilBad() {
  return (
    <g transform="rotate(45 50 50)">
      <rect x="38" y="12" width="24" height="34" rx="3" fill="#f59e0b" stroke={INK} strokeWidth="3" />
      <path d="M38 46 L46 52 L38 58 L54 68 L46 74 L62 84" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="38" y="12" width="24" height="10" fill="#f9d976" stroke={INK} strokeWidth="3" />
    </g>
  );
}
function TrashBad() {
  return (
    <>
      <path d="M28 40 Q40 24 52 40 Q46 46 40 46 Q34 46 28 40 Z" fill="#fde047" stroke={INK} strokeWidth="2.5" />
      <path d="M60 50 L68 30 L74 32 L68 52 Z" fill="#e5e7eb" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="50" cy="66" rx="26" ry="14" fill="#a3e635" stroke={INK} strokeWidth="2.5" opacity="0.7" />
      <path d="M30 62 Q26 54 34 56 M66 64 Q72 58 70 68" stroke="#65a30d" strokeWidth="2" fill="none" />
    </>
  );
}

function PencilCaseGood() {
  return (
    <>
      <rect x="14" y="34" width="72" height="34" rx="14" fill="#a78bfa" stroke={INK} strokeWidth="3" />
      <path d="M14 44 Q50 30 86 44" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="70" cy="51" r="4" fill="#fde047" stroke={INK} strokeWidth="1.5" />
    </>
  );
}
function LabelGood() {
  return (
    <>
      <rect x="18" y="24" width="64" height="46" rx="6" fill="#fef08a" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="30" r="3" fill={INK} />
      <line x1="28" y1="42" x2="72" y2="42" stroke="#a16207" strokeWidth="2.5" />
      <line x1="28" y1="54" x2="60" y2="54" stroke="#a16207" strokeWidth="2.5" />
    </>
  );
}
function GumBad() {
  return (
    <>
      <ellipse cx="50" cy="55" rx="28" ry="22" fill="#f472b6" stroke={INK} strokeWidth="2.5" />
      <path d="M50 33 Q60 15 70 28 Q66 36 58 36" fill="#f9a8d4" stroke={INK} strokeWidth="2.5" />
      <circle cx="40" cy="50" r="6" fill="#fbcfe8" opacity="0.8" />
    </>
  );
}
function ClayBad() {
  return (
    <>
      <path d="M30 60 Q20 40 38 32 Q50 22 62 32 Q80 40 70 60 Q65 74 50 74 Q35 74 30 60 Z" fill="#fb923c" stroke={INK} strokeWidth="2.5" />
      <circle cx="42" cy="46" r="5" fill="#fdba74" />
      <circle cx="58" cy="52" r="4" fill="#fdba74" />
    </>
  );
}

const REGISTRY = {
  tube: TubeGood,
  bottle: BottleGood,
  carton: CartonGood,
  pencil: PencilGood,
  pen: PenGood,
  book: BookGood,
  inkstain: InkstainBad,
  paperplane: PaperplaneBad,
  brokenpencil: BrokenpencilBad,
  trash: TrashBad,
  pencilCase: PencilCaseGood,
  label: LabelGood,
  gum: GumBad,
  clay: ClayBad,
};

export default function ItemIcon({ id, size = 56 }) {
  const Cmp = REGISTRY[id];
  if (!Cmp) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <Cmp />
    </svg>
  );
}
