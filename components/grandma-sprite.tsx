"use client";

interface GrandmaSpriteProps {
  countryCode?: string;
  isNight?: boolean;
}

export function GrandmaSprite({
  countryCode = "fi",
  isNight = false,
}: GrandmaSpriteProps) {
  const sleepy = isNight;
  const grandmaSize = 260;
  const padding = 20;

  if (countryCode === "sr") {
    return (
      <GrozdanaSprite
        sleepy={sleepy}
        grandmaSize={grandmaSize}
        padding={padding}
      />
    );
  }
  if (countryCode === "ka") {
    return (
      <KetevanSprite
        sleepy={sleepy}
        grandmaSize={grandmaSize}
        padding={padding}
      />
    );
  }
  return (
    <MariaSprite sleepy={sleepy} grandmaSize={grandmaSize} padding={padding} />
  );
}

function MariaSprite({
  sleepy,
  grandmaSize,
  padding,
}: {
  sleepy: boolean;
  grandmaSize: number;
  padding: number;
}) {
  return (
    <div
      className={`relative w-full h-full flex items-end justify-center pb-4 ${sleepy ? "breathe-sleep" : ""}`}
    >
      <svg
        viewBox={`0 0 ${grandmaSize + padding * 2} ${grandmaSize + padding * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[260px] max-h-[400px] drop-shadow-xl"
      >
        <defs>
          <radialGradient id="maria-lamp-glow" cx="50%" cy="30%" r="60%">
            <stop
              offset="0%"
              stopColor={sleepy ? "#e0e7ff" : "#fef3c7"}
              stopOpacity={sleepy ? "0.3" : "0.6"}
            />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx={140}
          cy={180}
          rx={120}
          ry={140}
          fill="url(#maria-lamp-glow)"
          opacity={sleepy ? 0.4 : 1}
          className={sleepy ? "breathe-sleep-glow" : ""}
        />

        <path
          d="M110 200 Q108 60 180 48 Q252 60 250 200"
          fill={sleepy ? "#6B2A2A" : "#8B3A3A"}
        />
        <path
          d="M110 200 Q108 60 180 48 Q252 60 250 200"
          fill="none"
          stroke={sleepy ? "#5A1A1A" : "#6B2A2A"}
          strokeWidth="1.5"
        />
        <path
          d="M110 200 Q100 100 120 80 Q140 100 130 200"
          fill={sleepy ? "#5A2424" : "#7A3434"}
        />
        <path
          d="M250 200 Q260 100 240 80 Q220 100 230 200"
          fill={sleepy ? "#5A2424" : "#7A3434"}
        />
        <path
          d="M110 200 L250 200 L240 260 L120 260 Z"
          fill={sleepy ? "#6B2A2A" : "#8B3A3A"}
        />
        <path
          d="M125 205 L235 205 L232 245 L128 245 Z"
          fill={sleepy ? "#7A3434" : "#A04A4A"}
        />

        <path
          d="M135 160 Q130 120 180 110 Q230 120 225 160 L225 240 L135 240 Z"
          fill={sleepy ? "#4A7B6A" : "#5B8C7A"}
          opacity={sleepy ? 0.7 : 1}
        />
        {[150, 170, 190, 210].map((y) => (
          <path
            key={y}
            d={`M140 ${y} Q150 ${y - 5} 160 ${y} Q170 ${y + 5} 180 ${y} Q190 ${y - 5} 200 ${y} Q210 ${y + 5} 220 ${y}`}
            stroke="#4A7B6A"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
        ))}

        <ellipse
          cx="180"
          cy="95"
          rx="30"
          ry="34"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />
        <ellipse cx="180" cy="64" rx="24" ry="16" fill="#D0C8C0" />
        <circle cx="180" cy="55" r="12" fill="#D0C8C0" />
        <path d="M156 72 Q168 58 180 56 Q192 58 204 72" fill="#D0C8C0" />
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
        <line
          x1="177"
          y1="96"
          x2="183"
          y2="96"
          stroke="#555"
          strokeWidth="1.5"
        />
        <line x1="159" y1="95" x2="152" y2="93" stroke="#555" strokeWidth="1" />
        <line x1="201" y1="95" x2="208" y2="93" stroke="#555" strokeWidth="1" />

        {sleepy ? (
          <>
            <path
              d="M163 96 Q167 94 171 96"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M187 96 Q191 94 195 96"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="167" cy="96" r="2" fill="#3D3029" />
            <circle cx="191" cy="96" r="2" fill="#3D3029" />
          </>
        )}

        <ellipse
          cx="158"
          cy="106"
          rx="5"
          ry="3"
          fill="#E8A0A0"
          opacity={sleepy ? 0.2 : 0.4}
        />
        <ellipse
          cx="202"
          cy="106"
          rx="5"
          ry="3"
          fill="#E8A0A0"
          opacity={sleepy ? 0.2 : 0.4}
        />
        <path
          d="M178 100 Q180 108 176 110"
          stroke="#E0B0A0"
          strokeWidth="1.5"
          fill="none"
        />

        {sleepy ? (
          <ellipse
            cx="180"
            cy="118"
            rx="6"
            ry="4"
            fill="#C07060"
            opacity="0.6"
          />
        ) : (
          <path
            d="M170 116 Q180 124 190 116"
            stroke="#C07060"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        )}

        <path
          d="M145 170 Q120 200 130 240 Q135 250 155 250"
          fill={sleepy ? "#4A7B6A" : "#5B8C7A"}
          opacity={sleepy ? 0.7 : 1}
        />
        <path
          d="M215 170 Q240 200 230 240 Q225 250 205 250"
          fill={sleepy ? "#4A7B6A" : "#5B8C7A"}
          opacity={sleepy ? 0.7 : 1}
        />
        <ellipse
          cx="148"
          cy="248"
          rx="8"
          ry="6"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />
        <ellipse
          cx="212"
          cy="248"
          rx="8"
          ry="6"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />

        <rect
          x="155"
          y="252"
          width="50"
          height="24"
          rx="2"
          fill="#7BA88A"
          opacity={sleepy ? 0.5 : 1}
        />

        {sleepy && (
          <>
            <text
              x="220"
              y="80"
              fontSize="12"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.7"
            >
              z
            </text>
            <text
              x="232"
              y="68"
              fontSize="16"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.5"
            >
              z
            </text>
            <text
              x="248"
              y="52"
              fontSize="22"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.3"
            >
              z
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function GrozdanaSprite({
  sleepy,
  grandmaSize,
  padding,
}: {
  sleepy: boolean;
  grandmaSize: number;
  padding: number;
}) {
  return (
    <div
      className={`relative w-full h-full flex items-end justify-center pb-4 ${sleepy ? "breathe-sleep" : ""}`}
    >
      <svg
        viewBox={`0 0 ${grandmaSize + padding * 2} ${grandmaSize + padding * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[260px] max-h-[400px] drop-shadow-xl"
      >
        <defs>
          <radialGradient id="grozdana-lamp-glow" cx="50%" cy="30%" r="60%">
            <stop
              offset="0%"
              stopColor={sleepy ? "#fef9c3" : "#fed7aa"}
              stopOpacity={sleepy ? "0.3" : "0.6"}
            />
            <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx={140}
          cy={180}
          rx={120}
          ry={140}
          fill="url(#grozdana-lamp-glow)"
          opacity={sleepy ? 0.4 : 1}
          className={sleepy ? "breathe-sleep-glow" : ""}
        />

        <path
          d="M110 200 Q108 55 180 43 Q252 55 250 200"
          fill={sleepy ? "#7B3A2A" : "#9C4A3A"}
        />
        <path
          d="M110 200 Q108 55 180 43 Q252 55 250 200"
          fill="none"
          stroke={sleepy ? "#6A2A1A" : "#8B3A2A"}
          strokeWidth="1.5"
        />
        <path
          d="M105 200 Q95 90 115 70 Q140 95 130 200"
          fill={sleepy ? "#6B3020" : "#8B4030"}
        />
        <path
          d="M255 200 Q265 90 245 70 Q220 95 230 200"
          fill={sleepy ? "#6B3020" : "#8B4030"}
        />
        <path
          d="M110 200 L250 200 L242 265 L118 265 Z"
          fill={sleepy ? "#7B3A2A" : "#9C4A3A"}
        />
        <path
          d="M125 205 L235 205 L232 250 L128 250 Z"
          fill={sleepy ? "#8B4A3A" : "#B05A4A"}
        />

        {/* Apron */}
        <path
          d="M140 175 L220 175 L225 260 L135 260 Z"
          fill={sleepy ? "#E8D8C8" : "#F5F0E8"}
          opacity={sleepy ? 0.6 : 0.9}
        />

        <path
          d="M135 160 Q130 115 180 105 Q230 115 225 160 L225 240 L135 240 Z"
          fill={sleepy ? "#C07050" : "#D48160"}
          opacity={sleepy ? 0.7 : 1}
        />
        {[150, 170, 190, 210].map((y) => (
          <path
            key={y}
            d={`M140 ${y} Q150 ${y - 4} 160 ${y} Q170 ${y + 4} 180 ${y} Q190 ${y - 4} 200 ${y} Q210 ${y + 4} 220 ${y}`}
            stroke="#B06040"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
        ))}

        {/* Fuller face */}
        <ellipse
          cx="180"
          cy="98"
          rx="32"
          ry="36"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />

        {/* Curly hair */}
        <ellipse cx="180" cy="64" rx="26" ry="18" fill="#8B7B6B" />
        <circle cx="168" cy="54" r="10" fill="#8B7B6B" />
        <circle cx="192" cy="54" r="10" fill="#8B7B6B" />
        <circle cx="180" cy="48" r="10" fill="#8B7B6B" />
        <path d="M152 72 Q168 56 180 52 Q192 56 208 72" fill="#8B7B6B" />
        <circle cx="158" cy="62" r="7" fill="#9B8B7B" opacity="0.5" />
        <circle cx="202" cy="62" r="7" fill="#9B8B7B" opacity="0.5" />

        <path
          d="M148 94 Q146 76 152 72 Q150 86 148 102"
          fill="#8B7B6B"
          opacity="0.7"
        />
        <path
          d="M212 94 Q214 76 208 72 Q210 86 212 102"
          fill="#8B7B6B"
          opacity="0.7"
        />

        {/* Glasses - slightly different style */}
        <circle
          cx="168"
          cy="98"
          r="10"
          fill="none"
          stroke="#8B4513"
          strokeWidth="1.8"
        />
        <circle
          cx="192"
          cy="98"
          r="10"
          fill="none"
          stroke="#8B4513"
          strokeWidth="1.8"
        />
        <line
          x1="178"
          y1="98"
          x2="182"
          y2="98"
          stroke="#8B4513"
          strokeWidth="1.8"
        />
        <line
          x1="158"
          y1="97"
          x2="150"
          y2="94"
          stroke="#8B4513"
          strokeWidth="1"
        />
        <line
          x1="202"
          y1="97"
          x2="210"
          y2="94"
          stroke="#8B4513"
          strokeWidth="1"
        />

        {sleepy ? (
          <>
            <path
              d="M163 98 Q167 96 171 98"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M187 98 Q191 96 195 98"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="167" cy="98" r="2.5" fill="#3D3029" />
            <circle cx="191" cy="98" r="2.5" fill="#3D3029" />
          </>
        )}

        {/* Rosy cheeks - bigger */}
        <ellipse
          cx="156"
          cy="110"
          rx="7"
          ry="4"
          fill="#E07070"
          opacity={sleepy ? 0.15 : 0.35}
        />
        <ellipse
          cx="204"
          cy="110"
          rx="7"
          ry="4"
          fill="#E07070"
          opacity={sleepy ? 0.15 : 0.35}
        />

        <path
          d="M178 104 Q180 112 176 114"
          stroke="#E0B0A0"
          strokeWidth="1.5"
          fill="none"
        />

        {sleepy ? (
          <ellipse
            cx="180"
            cy="122"
            rx="7"
            ry="5"
            fill="#C07060"
            opacity="0.6"
          />
        ) : (
          <path
            d="M168 120 Q180 130 192 120"
            stroke="#C07060"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        )}

        <path
          d="M142 170 Q115 200 125 245 Q132 255 155 255"
          fill={sleepy ? "#C07050" : "#D48160"}
          opacity={sleepy ? 0.7 : 1}
        />
        <path
          d="M218 170 Q245 200 235 245 Q228 255 205 255"
          fill={sleepy ? "#C07050" : "#D48160"}
          opacity={sleepy ? 0.7 : 1}
        />
        <ellipse
          cx="145"
          cy="252"
          rx="9"
          ry="7"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />
        <ellipse
          cx="215"
          cy="252"
          rx="9"
          ry="7"
          fill={sleepy ? "#E8C8B8" : "#F5D6C6"}
        />

        {/* Rolling pin accessory */}
        <rect
          x="200"
          y="248"
          width="40"
          height="8"
          rx="3"
          fill="#D4A67A"
          transform="rotate(-20 220 252)"
          opacity={sleepy ? 0.4 : 1}
        />
        <rect
          x="192"
          y="246"
          width="12"
          height="12"
          rx="6"
          fill="#B8845A"
          transform="rotate(-20 198 252)"
          opacity={sleepy ? 0.4 : 1}
        />
        <rect
          x="236"
          y="250"
          width="12"
          height="12"
          rx="6"
          fill="#B8845A"
          transform="rotate(-20 242 256)"
          opacity={sleepy ? 0.4 : 1}
        />

        {sleepy && (
          <>
            <text
              x="220"
              y="80"
              fontSize="14"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.7"
            >
              z
            </text>
            <text
              x="234"
              y="66"
              fontSize="18"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.5"
            >
              z
            </text>
            <text
              x="252"
              y="48"
              fontSize="24"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.3"
            >
              z
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function KetevanSprite({
  sleepy,
  grandmaSize,
  padding,
}: {
  sleepy: boolean;
  grandmaSize: number;
  padding: number;
}) {
  return (
    <div
      className={`relative w-full h-full flex items-end justify-center pb-4 ${sleepy ? "breathe-sleep" : ""}`}
    >
      <svg
        viewBox={`0 0 ${grandmaSize + padding * 2} ${grandmaSize + padding * 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[260px] max-h-[400px] drop-shadow-xl"
      >
        <defs>
          <radialGradient id="ketevan-lamp-glow" cx="50%" cy="30%" r="60%">
            <stop
              offset="0%"
              stopColor={sleepy ? "#fce7f3" : "#fef3c7"}
              stopOpacity={sleepy ? "0.3" : "0.6"}
            />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx={140}
          cy={180}
          rx={120}
          ry={140}
          fill="url(#ketevan-lamp-glow)"
          opacity={sleepy ? 0.4 : 1}
          className={sleepy ? "breathe-sleep-glow" : ""}
        />

        <path
          d="M110 200 Q108 58 180 46 Q252 58 250 200"
          fill={sleepy ? "#4A2060" : "#6B3080"}
        />
        <path
          d="M110 200 Q108 58 180 46 Q252 58 250 200"
          fill="none"
          stroke={sleepy ? "#3A1050" : "#5A2070"}
          strokeWidth="1.5"
        />
        <path
          d="M108 200 Q98 95 118 75 Q138 98 128 200"
          fill={sleepy ? "#3A1850" : "#5B2870"}
        />
        <path
          d="M252 200 Q262 95 242 75 Q222 98 232 200"
          fill={sleepy ? "#3A1850" : "#5B2870"}
        />
        <path
          d="M110 200 L250 200 L240 262 L120 262 Z"
          fill={sleepy ? "#4A2060" : "#6B3080"}
        />
        <path
          d="M125 205 L235 205 L232 248 L128 248 Z"
          fill={sleepy ? "#5A3070" : "#7B4090"}
        />

        {/* Embroidered dress pattern */}
        <path
          d="M135 160 Q130 115 180 105 Q230 115 225 160 L225 240 L135 240 Z"
          fill={sleepy ? "#7B2060" : "#9C3080"}
          opacity={sleepy ? 0.7 : 1}
        />
        <path
          d="M150 170 Q160 164 170 170 Q180 176 190 170 Q200 164 210 170"
          stroke="#D4A67A"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M150 185 Q160 179 170 185 Q180 191 190 185 Q200 179 210 185"
          stroke="#D4A67A"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M150 200 Q160 194 170 200 Q180 206 190 200 Q200 194 210 200"
          stroke="#D4A67A"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* Face */}
        <ellipse
          cx="180"
          cy="95"
          rx="30"
          ry="34"
          fill={sleepy ? "#E8C8B8" : "#F0D0C0"}
        />

        {/* Dark hair with ornament */}
        <ellipse cx="180" cy="62" rx="25" ry="17" fill="#1A1A2E" />
        <circle cx="180" cy="52" r="13" fill="#1A1A2E" />
        <path d="M155 70 Q168 54 180 52 Q192 54 205 70" fill="#1A1A2E" />
        <path
          d="M148 88 Q146 74 155 70 Q152 82 150 96"
          fill="#1A1A2E"
          opacity="0.8"
        />
        <path
          d="M212 88 Q214 74 205 70 Q208 82 210 96"
          fill="#1A1A2E"
          opacity="0.8"
        />

        {/* Hair flower ornament */}
        <circle cx="202" cy="56" r="6" fill="#E83050" />
        <circle cx="202" cy="56" r="3" fill="#FFD700" />
        <ellipse cx="196" cy="54" rx="3" ry="4" fill="#E83050" opacity="0.8" />
        <ellipse cx="208" cy="54" rx="3" ry="4" fill="#E83050" opacity="0.8" />
        <ellipse cx="202" cy="50" rx="4" ry="3" fill="#E83050" opacity="0.8" />
        <ellipse cx="202" cy="62" rx="4" ry="3" fill="#E83050" opacity="0.8" />

        {/* Glasses - gold */}
        <circle
          cx="168"
          cy="96"
          r="9"
          fill="none"
          stroke="#DAA520"
          strokeWidth="1.5"
        />
        <circle
          cx="192"
          cy="96"
          r="9"
          fill="none"
          stroke="#DAA520"
          strokeWidth="1.5"
        />
        <line
          x1="177"
          y1="96"
          x2="183"
          y2="96"
          stroke="#DAA520"
          strokeWidth="1.5"
        />
        <line
          x1="159"
          y1="95"
          x2="152"
          y2="92"
          stroke="#DAA520"
          strokeWidth="1"
        />
        <line
          x1="201"
          y1="95"
          x2="208"
          y2="92"
          stroke="#DAA520"
          strokeWidth="1"
        />

        {sleepy ? (
          <>
            <path
              d="M163 96 Q167 94 171 96"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M187 96 Q191 94 195 96"
              stroke="#3D3029"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="167" cy="96" r="2" fill="#3D3029" />
            <circle cx="191" cy="96" r="2" fill="#3D3029" />
          </>
        )}

        <ellipse
          cx="157"
          cy="106"
          rx="6"
          ry="3"
          fill="#E07070"
          opacity={sleepy ? 0.15 : 0.35}
        />
        <ellipse
          cx="203"
          cy="106"
          rx="6"
          ry="3"
          fill="#E07070"
          opacity={sleepy ? 0.15 : 0.35}
        />

        <path
          d="M178 100 Q180 108 176 110"
          stroke="#E0B0A0"
          strokeWidth="1.5"
          fill="none"
        />

        {sleepy ? (
          <ellipse
            cx="180"
            cy="118"
            rx="6"
            ry="4"
            fill="#C07060"
            opacity="0.6"
          />
        ) : (
          <path
            d="M170 116 Q180 126 190 116"
            stroke="#C07060"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        )}

        <path
          d="M142 170 Q115 200 125 242 Q132 252 155 252"
          fill={sleepy ? "#7B2060" : "#9C3080"}
          opacity={sleepy ? 0.7 : 1}
        />
        <path
          d="M218 170 Q245 200 235 242 Q228 252 205 252"
          fill={sleepy ? "#7B2060" : "#9C3080"}
          opacity={sleepy ? 0.7 : 1}
        />
        <ellipse
          cx="145"
          cy="250"
          rx="8"
          ry="6"
          fill={sleepy ? "#E8C8B8" : "#F0D0C0"}
        />
        <ellipse
          cx="215"
          cy="250"
          rx="8"
          ry="6"
          fill={sleepy ? "#E8C8B8" : "#F0D0C0"}
        />

        {/* Wine glass */}
        <g opacity={sleepy ? 0.3 : 1}>
          <path d="M202 244 L206 244 L208 232 L200 232 Z" fill="#D4A67A" />
          <ellipse cx="204" cy="230" rx="6" ry="2" fill="#D4A67A" />
          <path d="M199 230 Q204 222 209 230" fill="#8B2252" opacity="0.6" />
        </g>

        {/* Grapes cluster */}
        <g opacity={sleepy ? 0.3 : 0.8}>
          <circle cx="158" cy="239" r="4" fill="#6B3080" />
          <circle cx="164" cy="239" r="4" fill="#7B4090" />
          <circle cx="161" cy="235" r="4" fill="#6B3080" />
          <circle cx="155" cy="244" r="3.5" fill="#7B4090" />
          <circle cx="167" cy="244" r="3.5" fill="#6B3080" />
          <circle cx="161" cy="248" r="3.5" fill="#7B4090" />
        </g>

        {sleepy && (
          <>
            <text
              x="220"
              y="80"
              fontSize="12"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.7"
            >
              z
            </text>
            <text
              x="232"
              y="68"
              fontSize="16"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.5"
            >
              z
            </text>
            <text
              x="248"
              y="52"
              fontSize="22"
              fill="#93c5fd"
              fontWeight="bold"
              opacity="0.3"
            >
              z
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
