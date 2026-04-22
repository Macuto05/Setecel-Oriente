'use client';

const STATES = [
  {
    name: 'Zulia',
    d: 'M50,255 L55,135 L75,82 L105,55 L135,45 L172,55 L205,75 L220,100 L238,118 L222,142 L236,168 L215,202 L192,222 L168,252 L138,270 L100,272 L65,260 Z',
    highlight: false,
    labelX: 118, labelY: 175,
  },
  {
    name: 'Falcón',
    d: 'M205,75 L268,45 L330,42 L362,58 L360,88 L320,100 L278,110 L240,110 L220,100 Z',
    highlight: false,
    labelX: 282, labelY: 75,
  },
  {
    name: 'Lara',
    d: 'M222,142 L278,110 L332,120 L350,148 L342,180 L308,200 L272,202 L245,188 Z',
    highlight: false,
    labelX: 286, labelY: 162,
  },
  {
    name: 'Yaracuy',
    d: 'M332,120 L368,102 L382,120 L374,150 L350,150 Z',
    highlight: false,
    labelX: 358, labelY: 133,
  },
  {
    name: 'Carabobo',
    d: 'M360,88 L398,72 L416,84 L414,108 L390,118 L365,110 Z',
    highlight: false,
    labelX: 388, labelY: 99,
  },
  {
    name: 'Aragua',
    d: 'M390,118 L420,108 L434,118 L438,138 L416,148 L394,140 Z',
    highlight: false,
    labelX: 415, labelY: 132,
  },
  {
    name: 'Vargas',
    d: 'M398,72 L440,62 L440,76 L406,82 Z',
    highlight: false,
    labelX: 420, labelY: 70,
  },
  {
    name: 'Miranda',
    d: 'M398,72 L440,62 L468,78 L462,118 L434,128 L416,118 L414,96 Z',
    highlight: false,
    labelX: 438, labelY: 96,
  },
  {
    name: 'Sucre',
    d: 'M468,78 L556,64 L596,82 L612,104 L586,120 L552,128 L500,132 L464,120 Z',
    highlight: false,
    labelX: 536, labelY: 100,
  },
  {
    name: 'Anzoátegui',
    d: 'M464,120 L586,106 L598,138 L590,232 L548,264 L494,268 L456,240 L450,190 Z',
    highlight: true,
    labelX: 518, labelY: 192,
  },
  {
    name: 'Monagas',
    d: 'M590,120 L710,144 L728,180 L712,250 L668,270 L602,268 L580,234 L592,168 Z',
    highlight: true,
    labelX: 648, labelY: 205,
  },
  {
    name: 'Delta\nAmacuro',
    d: 'M710,144 L768,134 L790,180 L784,268 L750,298 L720,270 L712,222 Z',
    highlight: false,
    labelX: 748, labelY: 212,
  },
  {
    name: 'Bolívar',
    d: 'M494,268 L548,264 L602,268 L668,270 L720,270 L750,298 L784,388 L770,490 L724,518 L650,540 L574,544 L500,520 L456,464 L450,374 Z',
    highlight: true,
    labelX: 598, labelY: 405,
  },
  {
    name: 'Guárico',
    d: 'M342,180 L458,170 L464,240 L456,308 L420,340 L364,340 L324,304 L314,274 L340,244 L350,212 Z',
    highlight: false,
    labelX: 388, labelY: 262,
  },
  {
    name: 'Cojedes',
    d: 'M350,150 L388,134 L400,154 L394,180 L370,184 L350,172 Z',
    highlight: false,
    labelX: 374, labelY: 162,
  },
  {
    name: 'Portuguesa',
    d: 'M272,202 L350,196 L360,234 L340,274 L296,284 L262,270 Z',
    highlight: false,
    labelX: 306, labelY: 240,
  },
  {
    name: 'Barinas',
    d: 'M168,268 L262,270 L296,284 L304,348 L274,380 L212,390 L165,360 Z',
    highlight: false,
    labelX: 228, labelY: 330,
  },
  {
    name: 'Trujillo',
    d: 'M218,198 L262,190 L272,218 L256,240 L225,235 Z',
    highlight: false,
    labelX: 244, labelY: 218,
  },
  {
    name: 'Mérida',
    d: 'M100,272 L140,270 L168,270 L165,360 L142,384 L108,370 L85,334 Z',
    highlight: false,
    labelX: 126, labelY: 325,
  },
  {
    name: 'Táchira',
    d: 'M50,260 L100,272 L108,370 L82,400 L55,384 L40,334 Z',
    highlight: false,
    labelX: 72, labelY: 335,
  },
  {
    name: 'Apure',
    d: 'M165,360 L274,380 L304,348 L330,358 L354,428 L350,498 L296,534 L236,550 L175,530 L128,484 L115,424 L142,384 Z',
    highlight: false,
    labelX: 230, labelY: 450,
  },
  {
    name: 'Amazonas',
    d: 'M296,534 L354,498 L450,468 L460,524 L440,594 L376,624 L294,614 L238,584 L236,550 Z',
    highlight: false,
    labelX: 345, labelY: 566,
  },
];

export default function VenezuelaMapSVG() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes setecel-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes setecel-wave {
          0%   { r: 5;  opacity: 0.9; }
          100% { r: 48; opacity: 0;   }
        }
        .hz-highlight {
          animation: setecel-pulse 3s ease-in-out infinite;
        }
        .hz-wave-1 { animation: setecel-wave 2.8s ease-out infinite 0s; }
        .hz-wave-2 { animation: setecel-wave 2.8s ease-out infinite 0.7s; }
        .hz-wave-3 { animation: setecel-wave 2.8s ease-out infinite 1.4s; }
      `}</style>

      <svg
        viewBox="0 0 840 660"
        className="w-full h-full"
        role="img"
        aria-label="Mapa de Venezuela — cobertura SETECEL en Anzoátegui, Monagas y Bolívar"
      >
        <defs>
          <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="highlight-fill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.65" />
          </radialGradient>
        </defs>

        {/* Background subtle glow behind highlighted region */}
        <ellipse cx="560" cy="340" rx="220" ry="180" fill="#1d4ed8" fillOpacity="0.06" />

        {/* All states */}
        {STATES.map((s) => (
          <g key={s.name}>
            <path
              d={s.d}
              fill={s.highlight ? 'url(#highlight-fill)' : '#112240'}
              stroke={s.highlight ? '#3b82f6' : '#1e3a5f'}
              strokeWidth={s.highlight ? 1.8 : 1}
              strokeLinejoin="round"
              filter={s.highlight ? 'url(#glow-blue)' : undefined}
              className={s.highlight ? 'hz-highlight' : undefined}
            />
          </g>
        ))}

        {/* Labels — highlighted states */}
        {STATES.filter(s => s.highlight).map((s) => (
          <text
            key={`label-${s.name}`}
            x={s.labelX}
            y={s.labelY}
            textAnchor="middle"
            fill="white"
            fontSize={s.name === 'Bolívar' ? 15 : 13}
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {s.name}
          </text>
        ))}

        {/* Labels — other visible states (only larger ones) */}
        {[
          { name: 'Zulia', x: 118, y: 175 },
          { name: 'Guárico', x: 388, y: 262 },
          { name: 'Apure', x: 230, y: 450 },
          { name: 'Falcón', x: 282, y: 68 },
          { name: 'Lara', x: 286, y: 162 },
          { name: 'Barinas', x: 228, y: 330 },
          { name: 'Mérida', x: 115, y: 325 },
          { name: 'Sucre', x: 530, y: 98 },
          { name: 'Amazonas', x: 345, y: 566 },
          { name: 'Portuguesa', x: 304, y: 240 },
          { name: 'Táchira', x: 66, y: 332 },
        ].map(({ name, x, y }) => (
          <text
            key={`dim-label-${name}`}
            x={x}
            y={y}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize="10"
            fontFamily="system-ui, sans-serif"
            style={{ pointerEvents: 'none' }}
          >
            {name}
          </text>
        ))}

        {/* Nueva Esparta island */}
        <ellipse cx="652" cy="58" rx="18" ry="10" fill="#112240" stroke="#1e3a5f" strokeWidth="1" />
        <text x="652" y="62" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="system-ui, sans-serif">N. Esparta</text>

        {/* Caripe transmitter dot + waves */}
        <g>
          <circle cx="592" cy="145" className="hz-wave-1" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="592" cy="145" className="hz-wave-2" fill="none" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="592" cy="145" className="hz-wave-3" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
          <circle cx="592" cy="145" r="5" fill="#3b82f6" filter="url(#glow-soft)" />
          <circle cx="592" cy="145" r="2.5" fill="white" />
        </g>

        {/* Caripe label */}
        <text x="608" y="140" fill="#60a5fa" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Caripe</text>
        <text x="608" y="152" fill="#60a5fa" fontSize="8.5" fontFamily="system-ui, sans-serif" opacity="0.8">Centro principal</text>
      </svg>
    </div>
  );
}
