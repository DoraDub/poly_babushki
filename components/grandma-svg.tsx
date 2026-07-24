export function GrandmotherSvg() {
  return (
    <svg
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-xl"
    >
      <defs>
        <radialGradient id="lamp-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lamp glow behind chair */}
      <ellipse cx="140" cy="180" rx="120" ry="140" fill="url(#lamp-glow)" />

      {/* Side table */}
      <rect x="24" y="300" width="60" height="8" rx="2" fill="#8B6914" />
      <rect x="48" y="308" width="8" height="80" rx="2" fill="#7A5E12" />
      <rect x="24" y="380" width="72" height="6" rx="2" fill="#8B6914" />

      {/* Lamp on side table */}
      <rect x="50" y="258" width="6" height="42" rx="2" fill="#B8860B" />
      <ellipse cx="53" cy="256" rx="4" ry="3" fill="#B8860B" />
      <path
        d="M32 272 L74 272 L68 240 L38 240 Z"
        fill="#fef3c7"
        opacity="0.9"
      />
      <path d="M38 256 L68 256" stroke="#d4a017" strokeWidth="1" />
      {/* Lamp light cone */}
      <path
        d="M38 272 L20 380 L86 380 L68 272 Z"
        fill="url(#lamp-glow)"
        opacity="0.3"
      />

      {/* Armchair back */}
      <path d="M110 200 Q108 60 180 48 Q252 60 250 200" fill="#8B3A3A" />
      <path
        d="M110 200 Q108 60 180 48 Q252 60 250 200"
        fill="none"
        stroke="#6B2A2A"
        strokeWidth="1.5"
      />

      {/* Armchair wings */}
      <path d="M110 200 Q100 100 120 80 Q140 100 130 200" fill="#7A3434" />
      <path d="M250 200 Q260 100 240 80 Q220 100 230 200" fill="#7A3434" />

      {/* Armchair seat */}
      <path d="M110 200 L250 200 L240 260 L120 260 Z" fill="#8B3A3A" />
      <path
        d="M110 200 L250 200 L240 260 L120 260 Z"
        fill="none"
        stroke="#6B2A2A"
        strokeWidth="1.5"
      />

      {/* Armchair armrests */}
      <path
        d="M100 200 Q90 210 95 240 Q100 250 120 250 L120 200 Z"
        fill="#7A3434"
      />
      <path
        d="M260 200 Q270 210 265 240 Q260 250 240 250 L240 200 Z"
        fill="#7A3434"
      />

      {/* Armchair cushion */}
      <path d="M125 205 L235 205 L232 245 L128 245 Z" fill="#A04A4A" rx="4" />
      <line
        x1="180"
        y1="205"
        x2="180"
        y2="245"
        stroke="#8B3A3A"
        strokeWidth="1"
      />

      {/* Small doily on armchair back */}
      <path
        d="M140 70 Q160 60 180 58 Q200 60 220 70"
        stroke="#f0e6d3"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
      <path
        d="M145 80 Q160 72 180 70 Q200 72 215 80"
        stroke="#f0e6d3"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />

      {/* Grandma body - knitted shawl */}
      <path
        d="M135 160 Q130 120 180 110 Q230 120 225 160 L225 240 L135 240 Z"
        fill="#5B8C7A"
      />
      {/* Shawl knitted texture */}
      <path
        d="M140 150 Q150 145 160 150 Q170 155 180 150 Q190 145 200 150 Q210 155 220 150"
        stroke="#4A7B6A"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M140 170 Q150 165 160 170 Q170 175 180 170 Q190 165 200 170 Q210 175 220 170"
        stroke="#4A7B6A"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M140 190 Q150 185 160 190 Q170 195 180 190 Q190 185 200 190 Q210 195 220 190"
        stroke="#4A7B6A"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M140 210 Q150 205 160 210 Q170 215 180 210 Q190 205 200 210 Q210 215 220 210"
        stroke="#4A7B6A"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      {/* Shawl border/fringe */}
      <path
        d="M135 235 L225 235"
        stroke="#4A7B6A"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />
      {/* Shawl tassels */}
      {[150, 160, 170, 180, 190, 200, 210].map((x) => (
        <line
          key={x}
          x1={x}
          y1={235}
          x2={x - 3}
          y2={248}
          stroke="#5B8C7A"
          strokeWidth="1"
        />
      ))}
      {[150, 160, 170, 180, 190, 200, 210].map((x) => (
        <line
          key={x + 100}
          x1={x}
          y1={235}
          x2={x + 3}
          y2={248}
          stroke="#5B8C7A"
          strokeWidth="1"
        />
      ))}

      {/* Grandma head */}
      <ellipse cx="180" cy="95" rx="30" ry="34" fill="#F5D6C6" />

      {/* Hair bun */}
      <ellipse cx="180" cy="64" rx="24" ry="16" fill="#D0C8C0" />
      <circle cx="180" cy="55" r="12" fill="#D0C8C0" />
      <path d="M156 72 Q168 58 180 56 Q192 58 204 72" fill="#D0C8C0" />

      {/* Hair sides */}
      <path
        d="M150 90 Q148 78 156 72 Q154 85 155 100"
        fill="#D0C8C0"
        opacity="0.7"
      />
      <path
        d="M210 90 Q212 78 204 72 Q206 85 205 100"
        fill="#D0C8C0"
        opacity="0.7"
      />

      {/* Glasses */}
      <circle
        cx="168"
        cy="96"
        r="9"
        fill="none"
        stroke="#555"
        strokeWidth="1.5"
      />
      <circle
        cx="192"
        cy="96"
        r="9"
        fill="none"
        stroke="#555"
        strokeWidth="1.5"
      />
      <line x1="177" y1="96" x2="183" y2="96" stroke="#555" strokeWidth="1.5" />
      <line x1="159" y1="95" x2="152" y2="93" stroke="#555" strokeWidth="1" />
      <line x1="201" y1="95" x2="208" y2="93" stroke="#555" strokeWidth="1" />

      {/* Eyes behind glasses */}
      <circle cx="167" cy="96" r="2" fill="#3D3029" />
      <circle cx="191" cy="96" r="2" fill="#3D3029" />

      {/* Rosy cheeks */}
      <ellipse cx="158" cy="106" rx="5" ry="3" fill="#E8A0A0" opacity="0.4" />
      <ellipse cx="202" cy="106" rx="5" ry="3" fill="#E8A0A0" opacity="0.4" />

      {/* Nose */}
      <path
        d="M178 100 Q180 108 176 110"
        stroke="#E0B0A0"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Smile */}
      <path
        d="M170 116 Q180 124 190 116"
        stroke="#C07060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Grandma arms */}
      <path d="M145 170 Q120 200 130 240 Q135 250 155 250" fill="#5B8C7A" />
      <path d="M215 170 Q240 200 230 240 Q225 250 205 250" fill="#5B8C7A" />

      {/* Hands */}
      <ellipse cx="148" cy="248" rx="8" ry="6" fill="#F5D6C6" />
      <ellipse cx="212" cy="248" rx="8" ry="6" fill="#F5D6C6" />

      {/* Knitting needles */}
      <line
        x1="138"
        y1="238"
        x2="172"
        y2="268"
        stroke="#C0A060"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="136" cy="236" r="3" fill="#C0A060" />
      <line
        x1="222"
        y1="238"
        x2="188"
        y2="268"
        stroke="#C0A060"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="224" cy="236" r="3" fill="#C0A060" />

      {/* Knitted piece in progress */}
      <rect x="155" y="252" width="50" height="24" rx="2" fill="#7BA88A" />
      <line
        x1="160"
        y1="255"
        x2="200"
        y2="255"
        stroke="#6B9880"
        strokeWidth="0.8"
      />
      <line
        x1="160"
        y1="260"
        x2="200"
        y2="260"
        stroke="#6B9880"
        strokeWidth="0.8"
      />
      <line
        x1="160"
        y1="265"
        x2="200"
        y2="265"
        stroke="#6B9880"
        strokeWidth="0.8"
      />
      <line
        x1="160"
        y1="270"
        x2="200"
        y2="270"
        stroke="#6B9880"
        strokeWidth="0.8"
      />

      {/* Yarn ball on floor */}
      <circle cx="110" cy="370" r="14" fill="#7BA88A" />
      <path
        d="M100 364 Q108 360 114 366 Q118 370 112 374"
        stroke="#6B9880"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M104 370 Q110 378 118 372"
        stroke="#6B9880"
        strokeWidth="1"
        fill="none"
      />
      {/* Yarn string to knitting */}
      <path
        d="M110 356 Q105 340 120 330 Q135 320 148 310 Q155 300 160 270"
        stroke="#7BA88A"
        strokeWidth="1"
        fill="none"
      />

      {/* Tea cup on side table */}
      <path d="M36 298 L42 298 L40 288 L34 288 Z" fill="#f0e6d3" />
      <ellipse cx="38" cy="298" rx="4" ry="1.5" fill="#f0e6d3" />
      <ellipse cx="38" cy="288" rx="6" ry="2" fill="#f0e6d3" />
      <path
        d="M44 290 Q48 292 44 296"
        stroke="#f0e6d3"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Steam */}
      <path
        d="M36 284 Q34 280 36 276"
        stroke="#d0c8c0"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M40 284 Q42 278 39 274"
        stroke="#d0c8c0"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
