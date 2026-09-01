"use client";

export function PantherMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow behind */}
      <ellipse cx="200" cy="345" rx="110" ry="18" fill="url(#mascot-shadow)" opacity="0.35" />

      {/* === BODY === */}
      {/* Main torso - sleeker, more muscular */}
      <path
        d="M145 280 C145 230 165 185 200 170 C235 185 255 230 255 280 L248 318 C238 330 162 330 152 318 Z"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1.2"
        opacity="0.95"
      />

      {/* Chest / pectoral muscles */}
      <path
        d="M170 210 Q200 230 230 210 Q220 250 200 260 Q180 250 170 210 Z"
        fill="hsl(187, 85%, 53%)"
        opacity="0.08"
      />

      {/* Shoulder humps */}
      <ellipse cx="158" cy="220" rx="22" ry="16" fill="url(#body-grad)" opacity="0.7" />
      <ellipse cx="242" cy="220" rx="22" ry="16" fill="url(#body-grad)" opacity="0.7" />

      {/* === HEAD === */}
      {/* Skull - slightly wider, more angular */}
      <path
        d="M140 140 C140 95 165 75 200 75 C235 75 260 95 260 140 C260 170 245 185 230 190 L170 190 C155 185 140 170 140 140 Z"
        fill="url(#head-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1.2"
      />

      {/* Snout / muzzle - longer, panther-like */}
      <path
        d="M175 155 C175 145 185 138 200 138 C215 138 225 145 225 155 L222 170 C215 178 185 178 178 170 Z"
        fill="url(#snout-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* === EARS === */}
      {/* Left ear - pointed, angular */}
      <path d="M152 95 L132 45 L172 82 Z" fill="url(#ear-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.2" />
      <path d="M155 90 L140 52 L168 82 Z" fill="hsl(187, 85%, 53%)" opacity="0.2" />

      {/* Right ear */}
      <path d="M248 95 L268 45 L228 82 Z" fill="url(#ear-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.2" />
      <path d="M245 90 L260 52 L232 82 Z" fill="hsl(187, 85%, 53%)" opacity="0.2" />

      {/* === EYES === */}
      {/* Eye sockets - larger, more intense */}
      <ellipse cx="176" cy="125" rx="14" ry="11" fill="#040810" />
      <ellipse cx="224" cy="125" rx="14" ry="11" fill="#040810" />

      {/* Irises - glowing cyan */}
      <ellipse cx="178" cy="123" rx="7" ry="6" fill="hsl(187, 85%, 53%)" />
      <ellipse cx="226" cy="123" rx="7" ry="6" fill="hsl(187, 85%, 53%)" />

      {/* Pupils - slit */}
      <ellipse cx="178" cy="123" rx="2.5" ry="5.5" fill="#040810" />
      <ellipse cx="226" cy="123" rx="2.5" ry="5.5" fill="#040810" />

      {/* Eye highlights */}
      <circle cx="181" cy="120" r="2.5" fill="white" opacity="0.9" />
      <circle cx="229" cy="120" r="2.5" fill="white" opacity="0.9" />
      <circle cx="176" cy="125" r="1.2" fill="white" opacity="0.5" />
      <circle cx="224" cy="125" r="1.2" fill="white" opacity="0.5" />

      {/* Brow ridges - fierce */}
      <path d="M160 115 L176 110 L190 116" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M240 115 L224 110 L210 116" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* === NOSE === */}
      <path d="M194 150 L200 157 L206 150 Z" fill="hsl(187, 85%, 53%)" opacity="0.85" />
      <circle cx="196" cy="151" r="1" fill="hsl(187, 85%, 53%)" opacity="0.5" />
      <circle cx="204" cy="151" r="1" fill="hsl(187, 85%, 53%)" opacity="0.5" />

      {/* === MOUTH === */}
      <path d="M188 162 Q200 170 212 162" stroke="hsl(187, 85%, 53%)" strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* Slight frown / serious expression */}
      <path d="M190 164 Q200 160 210 164" stroke="hsl(187, 85%, 53%)" strokeWidth="0.8" fill="none" opacity="0.25" />

      {/* === NO WHISKERS - it's a panther === */}

      {/* === GRADUATION CAP === */}
      <rect x="165" y="70" width="70" height="8" rx="2" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <path d="M170 70 L200 52 L230 70 Z" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <line x1="228" y1="70" x2="242" y2="88" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />
      <circle cx="242" cy="90" r="3.5" fill="hsl(187, 85%, 53%)" />

      {/* === FRONT LEGS === */}
      {/* Left leg */}
      <path
        d="M155 280 L150 315 L155 330 C160 335 170 335 175 330 L178 315 L175 280"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Right leg */}
      <path
        d="M225 280 L222 315 L225 330 C230 335 240 335 245 330 L248 315 L245 280"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Paw pads */}
      <ellipse cx="162" cy="332" rx="14" ry="6" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.8" />
      <ellipse cx="235" cy="332" rx="14" ry="6" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="0.8" />

      {/* Toe details */}
      <circle cx="155" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="162" cy="328" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="169" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="228" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="235" cy="328" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />
      <circle cx="242" cy="330" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.15" />

      {/* === TAIL === */}
      <path
        d="M248 290 C275 278 305 255 318 225 C328 200 318 185 305 195 C295 203 300 220 310 215"
        stroke="url(#tail-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Tail tip glow */}
      <circle cx="310" cy="215" r="4" fill="hsl(187, 85%, 53%)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* === BODY MARKINGS === */}
      {/* Subtle muscle lines */}
      <path d="M175 240 Q200 250 225 240" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" fill="none" opacity="0.15" />
      <path d="M180 260 Q200 268 220 260" stroke="hsl(187, 85%, 53%)" strokeWidth="0.6" fill="none" opacity="0.12" />

      {/* === FLOATING SPARKLES === */}
      <circle cx="95" cy="110" r="3" fill="hsl(187, 85%, 53%)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="305" cy="95" r="2.5" fill="hsl(187, 85%, 53%)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="260" r="2" fill="#a78bfa" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="315" cy="290" r="3" fill="hsl(187, 85%, 53%)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="180" r="1.5" fill="white" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="160" r="2" fill="white" opacity="0.25">
        <animate attributeName="opacity" values="0.25;0.6;0.25" dur="3.2s" repeatCount="indefinite" />
      </circle>

      {/* Star shapes */}
      <path d="M80 170 l4-8 4 8 -8-4 8 0z" fill="hsl(187, 85%, 53%)" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M320 195 l3-6 3 6 -6-3 6 0z" fill="#a78bfa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
      </path>

      {/* === GRADIENTS === */}
      <defs>
        <linearGradient id="body-grad" x1="145" y1="170" x2="255" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="head-grad" x1="140" y1="75" x2="260" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1a5c72" />
          <stop offset="1" stopColor="#0c1a2a" />
        </linearGradient>
        <linearGradient id="snout-grad" x1="175" y1="138" x2="225" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1a5c72" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="ear-grad" x1="132" y1="45" x2="172" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0c1a2a" />
        </linearGradient>
        <linearGradient id="tail-grad" x1="248" y1="290" x2="318" y2="215" gradientUnits="userSpaceOnUse">
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
