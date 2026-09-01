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
      <ellipse cx="200" cy="340" rx="120" ry="20" fill="url(#mascot-shadow)" opacity="0.4" />

      {/* Body */}
      <path
        d="M140 280 C140 220 160 180 200 160 C240 180 260 220 260 280 L250 320 C240 335 160 335 150 320 Z"
        fill="url(#body-grad)"
        stroke="hsl(187, 85%, 53%)"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Head */}
      <ellipse cx="200" cy="140" rx="65" ry="55" fill="url(#head-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />

      {/* Ears */}
      <path d="M155 100 L140 60 L175 90 Z" fill="url(#ear-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />
      <path d="M245 100 L260 60 L225 90 Z" fill="url(#ear-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />

      {/* Inner ears */}
      <path d="M158 95 L148 68 L170 90 Z" fill="hsl(187, 85%, 53%)" opacity="0.3" />
      <path d="M242 95 L252 68 L230 90 Z" fill="hsl(187, 85%, 53%)" opacity="0.3" />

      {/* Eyes */}
      <ellipse cx="178" cy="135" rx="12" ry="10" fill="#06080f" />
      <ellipse cx="222" cy="135" rx="12" ry="10" fill="#06080f" />
      <ellipse cx="180" cy="133" rx="5" ry="4" fill="hsl(187, 85%, 53%)" />
      <ellipse cx="224" cy="133" rx="5" ry="4" fill="hsl(187, 85%, 53%)" />
      {/* Eye highlights */}
      <circle cx="182" cy="131" r="2" fill="white" opacity="0.9" />
      <circle cx="226" cy="131" r="2" fill="white" opacity="0.9" />

      {/* Nose */}
      <path d="M195 148 L200 153 L205 148 Z" fill="hsl(187, 85%, 53%)" opacity="0.8" />

      {/* Mouth */}
      <path d="M190 158 Q200 166 210 158" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Whiskers */}
      <line x1="145" y1="145" x2="175" y2="150" stroke="hsl(187, 85%, 53%)" strokeWidth="1" opacity="0.4" />
      <line x1="142" y1="155" x2="174" y2="155" stroke="hsl(187, 85%, 53%)" strokeWidth="1" opacity="0.4" />
      <line x1="225" y1="150" x2="255" y2="145" stroke="hsl(187, 85%, 53%)" strokeWidth="1" opacity="0.4" />
      <line x1="226" y1="155" x2="258" y2="155" stroke="hsl(187, 85%, 53%)" strokeWidth="1" opacity="0.4" />

      {/* Graduation cap */}
      <rect x="165" y="88" width="70" height="8" rx="2" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <path d="M170 88 L200 72 L230 88 Z" fill="#1e293b" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <line x1="228" y1="88" x2="240" y2="105" stroke="hsl(187, 85%, 53%)" strokeWidth="1.5" />
      <circle cx="240" cy="107" r="3" fill="hsl(187, 85%, 53%)" />

      {/* Tail */}
      <path
        d="M250 290 C280 280 310 260 320 230 C330 200 310 190 300 210"
        stroke="url(#tail-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Paws */}
      <ellipse cx="165" cy="325" rx="18" ry="10" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />
      <ellipse cx="235" cy="325" rx="18" ry="10" fill="url(#body-grad)" stroke="hsl(187, 85%, 53%)" strokeWidth="1" />

      {/* Chest marking */}
      <path d="M180 200 Q200 220 220 200 Q210 230 200 240 Q190 230 180 200 Z" fill="hsl(187, 85%, 53%)" opacity="0.15" />

      {/* Floating sparkles around mascot */}
      <circle cx="100" cy="120" r="3" fill="hsl(187, 85%, 53%)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="100" r="2" fill="hsl(187, 85%, 53%)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="250" r="2" fill="#a78bfa" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="310" cy="280" r="3" fill="hsl(187, 85%, 53%)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* Star shapes */}
      <path d="M85 180 l4-8 4 8 -8-4 8 0z" fill="hsl(187, 85%, 53%)" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M315 200 l3-6 3 6 -6-3 6 0z" fill="#a78bfa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
      </path>

      <defs>
        <linearGradient id="body-grad" x1="140" y1="160" x2="260" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0c1a2a" />
        </linearGradient>
        <linearGradient id="head-grad" x1="135" y1="85" x2="265" y2="195" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="ear-grad" x1="140" y1="60" x2="175" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#164e63" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="tail-grad" x1="250" y1="290" x2="320" y2="210" gradientUnits="userSpaceOnUse">
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
