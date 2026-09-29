const INK = '#2d2a4a';

export default function CarSVG({ color = '#f9a8d4', boosting = false, boostKey = 0, size = 84 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size * 0.72 }}>
      {boosting && (
        <svg
          key={boostKey}
          className="rainbow-fire"
          style={{ position: 'absolute', left: -size * 0.55, top: size * 0.12, pointerEvents: 'none' }}
          width={size * 0.6}
          height={size * 0.5}
          viewBox="0 0 60 50"
        >
          <polygon points="60,10 20,25 60,40" fill="#f87171" opacity="0.9" />
          <polygon points="55,15 25,25 55,35" fill="#fbbf24" opacity="0.9" />
          <polygon points="48,20 30,25 48,30" fill="#60a5fa" opacity="0.9" />
        </svg>
      )}
      <svg className="car-bob" width={size} height={size * 0.72} viewBox="0 0 160 110">
        <ellipse cx="80" cy="98" rx="60" ry="8" fill="rgba(0,0,0,0.15)" />
        <rect x="20" y="52" width="120" height="34" rx="17" fill={color} stroke={INK} strokeWidth="4" />
        <path d="M50 52 L70 24 H108 L124 52 Z" fill={color} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M76 30 L70 50 H108 L104 30 Z" fill="#bae6fd" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <g className={boosting ? 'wheel-spin' : ''}>
          <circle cx="50" cy="88" r="16" fill="#3f3f46" stroke={INK} strokeWidth="4" />
          <circle cx="50" cy="88" r="6" fill="#facc15" stroke={INK} strokeWidth="2" />
          <line x1="50" y1="76" x2="50" y2="100" stroke="#6b7280" strokeWidth="2" />
          <line x1="38" y1="88" x2="62" y2="88" stroke="#6b7280" strokeWidth="2" />
        </g>
        <g className={boosting ? 'wheel-spin' : ''}>
          <circle cx="112" cy="88" r="16" fill="#3f3f46" stroke={INK} strokeWidth="4" />
          <circle cx="112" cy="88" r="6" fill="#facc15" stroke={INK} strokeWidth="2" />
          <line x1="112" y1="76" x2="112" y2="100" stroke="#6b7280" strokeWidth="2" />
          <line x1="100" y1="88" x2="124" y2="88" stroke="#6b7280" strokeWidth="2" />
        </g>
        <rect x="12" y="58" width="16" height="10" rx="4" fill="#e2e8f0" stroke={INK} strokeWidth="3" />
        <circle cx="132" cy="60" r="6" fill="#fde047" stroke={INK} strokeWidth="2.5" />
      </svg>
    </div>
  );
}
