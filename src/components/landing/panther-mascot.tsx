"use client";

export function PantherMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow beneath */}
      <ellipse cx="250" cy="355" rx="140" ry="16" fill="url(#mascot-shadow)" opacity="0.3" />

      {/* === BODY (side view - sleek panther) === */}
      {/* Main torso */}
      <path
        d="M120 260 C120 210 150 175 200 165 L300 165 C340 175 360 210 360 260 L355 300 C350 315 340 322 330 322 L150 322 C140 322 130 315 125 300 Z"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1.2"
        opacity="0.95"
      />

      {/* Belly highlight */}
      <path
        d="M155 280 Q240 295 330 280 Q320 310 240 318 Q160 310 155 280 Z"
        fill="hsl(187, 85%, 53%)"
        opacity="0.06"
      />

      {/* Shoulder muscle */}
      <ellipse cx="160" cy="225" rx="30" ry="22" fill="url(#body-grad)" opacity="0.6" />
      {/* Hip muscle */}
      <ellipse cx="330" cy="230" rx="28" ry="20" fill="url(#body-grad)" opacity="0.5" />

      {/* === HEAD (side view - facing left) === */}
      <path
        d="M60 160 C60 120 80 95 115 88 C145 82 160 90 165 105 L168 145 C170 160 165 175 155 182 L110 195 C85 200 65 190 60 170 Z"
        fill="url(#head-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1.2"
      />

      {/* Snout (side - protruding) */}
      <path
        d="M60 155 L42 162 C38 165 38 172 42 175 L60 180 L75 175 C70 170 65 162 60 155 Z"
        fill="url(#snout-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* Nose */}
      <path d="M42 164 L36 169 L42 173 Z" fill="hsl(187, 85%, 53%)" opacity="0.9" />

      {/* === EAR (side - one visible, pointed) === */}
      <path d="M120 92 L105 42 L145 78 Z" fill="url(#ear-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.2" />
      <path d="M123 88 L112 50 L140 78 Z" fill="hsl(187, 85%, 53%)" opacity="0.2" />

      {/* === EYE (side view - one large, intense) === */}
      <ellipse cx="105" cy="130" rx="16" ry="13" fill="#040810" />
      <ellipse cx="103" cy="128" rx="9" ry="8" fill="hsl(187, 85%, 53%)" />
      {/* Slit pupil */}
      <ellipse cx="101" cy="128" rx="3" ry="7.5" fill="#040810" />
      {/* Highlights */}
      <circle cx="107" cy="124" r="3" fill="white" opacity="0.9" />
      <circle cx="99" cy="131" r="1.5" fill="white" opacity="0.5" />
      {/* Brow */}
      <path d="M82 118 L105 112 L125 120" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* === MOUTH LINE === */}
      <path d="M42 175 Q55 182 75 178" stroke="hsl(187, 85%, 53%)" strokeWidth="1" fill="none" opacity="0.4" />

      {/* === GRADUATION CAP === */}
      <rect x="88" y="72" width="65" height="8" rx="2" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <path d="M93 72 L120 55 L148 72 Z" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <line x1="145" y1="72" x2="158" y2="90" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />
      <circle cx="158" cy="92" r="3.5" fill="hsl(187, 85%, 53%)" />

      {/* === FRONT LEGS (side view) === */}
      {/* Near front leg */}
      <path
        d="M160 290 L155 318 C155 325 160 330 168 330 L178 330 C185 330 188 325 188 318 L185 290"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Paw */}
      <ellipse cx="170" cy="332" rx="16" ry="6" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.8" />
      <circle cx="163" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="170" cy="328" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="177" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />

      {/* Far front leg (behind) */}
      <path
        d="M185 295 L182 318 C182 324 186 328 192 328 L200 328 C206 328 208 324 208 318 L205 295"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <ellipse cx="195" cy="330" rx="14" ry="5" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" opacity="0.6" />

      {/* === HIND LEGS (side view) === */}
      {/* Near hind leg - muscular thigh */}
      <path
        d="M310 280 L305 310 C303 320 308 330 318 330 L330 330 C340 330 343 320 340 310 L338 280"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1"
        opacity="0.9"
      />
      <ellipse cx="322" cy="332" rx="16" ry="6" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.8" />
      <circle cx="315" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="322" cy="328" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="329" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />

      {/* Far hind leg */}
      <path
        d="M280 290 L278 312 C276 322 280 328 288 328 L298 328 C306 328 308 322 306 312 L304 290"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="0.8"
        opacity="0.55"
      />
      <ellipse cx="292" cy="330" rx="14" ry="5" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" opacity="0.55" />

      {/* === TAIL (long, elegant, curved upward) === */}
      <path
        d="M355 250 C380 240 400 220 410 195 C418 175 415 160 405 155 C398 152 392 158 395 168 C398 178 408 175 412 165"
        stroke="url(#tail-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Tail tip glow */}
      <circle cx="412" cy="165" r="4" fill="hsl(187, 85%, 53%)" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.7;0.35" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* === BODY MUSCLE LINES === */}
      <path d="M180 230 Q240 240 320 230" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" fill="none" opacity="0.12" />
      <path d="M175 260 Q240 268 325 260" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" fill="none" opacity="0.1" />

      {/* === FLOATING SPARKLES === */}
      <circle cx="30" cy="130" r="3" fill="hsl(187, 85%, 53%)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="440" cy="110" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="280" r="2" fill="#a78bfa" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="450" cy="270" r="3" fill="hsl(187, 85%, 53%)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="200" r="1.5" fill="white" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="420" cy="200" r="2" fill="white" opacity="0.25">
        <animate attributeName="opacity" values="0.25;0.6;0.25" dur="3.2s" repeatCount="indefinite" />
      </circle>

      {/* Star shapes */}
      <path d="M20 180 l4-8 4 8 -8-4 8 0z" fill="hsl(187, 85%, 53%)" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M455 160 l3-6 3 6 -6-3 6 0z" fill="#a78bfa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
      </path>

      {/* === GRADIENTS === */}
      <defs>
        <linearGradient id="body-grad" x1="120" y1="165" x2="360" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="head-grad" x1="60" y1="88" x2="168" y2="195" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1a5c72" />
          <stop offset="1" stopColor="#0c1a2a" />
        </linearGradient>
        <linearGradient id="snout-grad" x1="36" y1="155" x2="75" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1a5c72" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="ear-grad" x1="105" y1="42" x2="145" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0c1a2a" />
        </linearGradient>
        <linearGradient id="tail-grad" x1="355" y1="250" x2="412" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="hsl(187, 85%, 53%)" stopOpacity="0.6" />
          <stop offset="1" stopColor="hsl(187, 85%, 53%)" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="mascot-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="hsl(187, 85%, 53%)" stopOpacity="0.25" />
          <stop offset="1" stopColor="hsl(187, 85%, 53%)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
