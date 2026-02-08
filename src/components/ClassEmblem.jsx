import React from 'react';

/**
 * Hand-crafted fantasy class sigils rendered as inline SVGs.
 * Each emblem is designed to evoke the class identity with
 * intricate linework and a dark-fantasy aesthetic.
 */

const WarriorEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crossed swords with central shield crest */}
    <defs>
      <linearGradient id="warrior-blade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f5f5f5" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
      <linearGradient id="warrior-hilt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
    {/* Left sword blade */}
    <path d="M16 8L32 36L28 38L12 12Z" fill="url(#warrior-blade)" opacity="0.9" />
    {/* Right sword blade */}
    <path d="M48 8L32 36L36 38L52 12Z" fill="url(#warrior-blade)" opacity="0.9" />
    {/* Left hilt */}
    <rect x="10" y="10" width="12" height="3" rx="1" transform="rotate(-30 16 12)" fill="url(#warrior-hilt)" />
    {/* Right hilt */}
    <rect x="42" y="10" width="12" height="3" rx="1" transform="rotate(30 48 12)" fill="url(#warrior-hilt)" />
    {/* Central shield */}
    <path d="M32 26C32 26 22 30 22 38C22 46 32 54 32 54C32 54 42 46 42 38C42 30 32 26 32 26Z" fill="#991b1b" stroke="#dc2626" strokeWidth="1.5" />
    {/* Shield inner cross */}
    <path d="M32 30V50M26 38H38" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    {/* Shield inner diamond */}
    <path d="M32 34L36 38L32 42L28 38Z" fill="#fbbf24" opacity="0.3" />
    {/* Decorative point tips */}
    <circle cx="16" cy="8" r="1.5" fill="#ef4444" opacity="0.6" />
    <circle cx="48" cy="8" r="1.5" fill="#ef4444" opacity="0.6" />
  </svg>
);

const MageEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Arcane star with orbiting runes */}
    <defs>
      <linearGradient id="mage-core" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <radialGradient id="mage-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Outer glow */}
    <circle cx="32" cy="32" r="28" fill="url(#mage-glow)" />
    {/* Arcane circle */}
    <circle cx="32" cy="32" r="22" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />
    <circle cx="32" cy="32" r="18" stroke="#a855f7" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
    {/* Six-pointed star */}
    <path d="M32 10L37 24H47L39 32L42 46L32 38L22 46L25 32L17 24H27Z" fill="url(#mage-core)" opacity="0.85" />
    {/* Inner inverted triangle */}
    <path d="M32 18L40 34H24Z" stroke="#e9d5ff" strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M32 46L24 30H40Z" stroke="#e9d5ff" strokeWidth="0.8" fill="none" opacity="0.5" />
    {/* Central eye */}
    <ellipse cx="32" cy="32" rx="4" ry="3" fill="#c084fc" opacity="0.9" />
    <circle cx="32" cy="32" r="1.5" fill="#f5f3ff" />
    {/* Orbiting rune dots */}
    <circle cx="32" cy="8" r="2" fill="#a855f7" opacity="0.7" />
    <circle cx="52" cy="22" r="1.5" fill="#a855f7" opacity="0.5" />
    <circle cx="52" cy="42" r="1.5" fill="#a855f7" opacity="0.5" />
    <circle cx="32" cy="56" r="2" fill="#a855f7" opacity="0.7" />
    <circle cx="12" cy="42" r="1.5" fill="#a855f7" opacity="0.5" />
    <circle cx="12" cy="22" r="1.5" fill="#a855f7" opacity="0.5" />
  </svg>
);

const RogueEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Twin daggers with poison drip and shadow */}
    <defs>
      <linearGradient id="rogue-blade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="rogue-poison" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    {/* Shadow circle */}
    <ellipse cx="32" cy="54" rx="14" ry="4" fill="#166534" opacity="0.15" />
    {/* Left dagger */}
    <path d="M24 10L28 38L24 40L20 38Z" fill="url(#rogue-blade)" opacity="0.9" />
    <path d="M24 10L22 12L24 16Z" fill="#e5e7eb" opacity="0.4" />
    {/* Left crossguard */}
    <rect x="17" y="38" width="14" height="2.5" rx="1" fill="#374151" />
    {/* Left grip */}
    <rect x="22" y="41" width="4" height="8" rx="1" fill="#1f2937" />
    <path d="M22 43H26M22 46H26" stroke="#4b5563" strokeWidth="0.5" />
    {/* Left pommel */}
    <circle cx="24" cy="51" r="2.5" fill="#374151" stroke="#15803d" strokeWidth="1" />
    {/* Right dagger */}
    <path d="M40 10L44 38L40 40L36 38Z" fill="url(#rogue-blade)" opacity="0.9" />
    <path d="M40 10L38 12L40 16Z" fill="#e5e7eb" opacity="0.4" />
    {/* Right crossguard */}
    <rect x="33" y="38" width="14" height="2.5" rx="1" fill="#374151" />
    {/* Right grip */}
    <rect x="38" y="41" width="4" height="8" rx="1" fill="#1f2937" />
    <path d="M38 43H42M38 46H42" stroke="#4b5563" strokeWidth="0.5" />
    {/* Right pommel */}
    <circle cx="40" cy="51" r="2.5" fill="#374151" stroke="#15803d" strokeWidth="1" />
    {/* Poison drips */}
    <path d="M26 20C26 20 27 24 26 26C25 28 26 30 26 30" stroke="url(#rogue-poison)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <circle cx="26" cy="32" r="1.5" fill="#22c55e" opacity="0.5" />
    <path d="M42 18C42 18 43 22 42 24" stroke="url(#rogue-poison)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Central skull mark */}
    <path d="M32 24C29 24 27 26 27 29C27 32 29 33 30 34H34C35 33 37 32 37 29C37 26 35 24 32 24Z" fill="#1f2937" stroke="#22c55e" strokeWidth="0.8" opacity="0.6" />
    <circle cx="30" cy="28" r="1" fill="#22c55e" opacity="0.7" />
    <circle cx="34" cy="28" r="1" fill="#22c55e" opacity="0.7" />
  </svg>
);

const PaladinEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Holy shield with divine radiance */}
    <defs>
      <linearGradient id="paladin-shield" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <radialGradient id="paladin-glow" cx="0.5" cy="0.4" r="0.5">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Divine radiance rays */}
    <circle cx="32" cy="30" r="28" fill="url(#paladin-glow)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1="32"
        y1="30"
        x2={32 + Math.cos((angle * Math.PI) / 180) * 30}
        y2={30 + Math.sin((angle * Math.PI) / 180) * 30}
        stroke="#fbbf24"
        strokeWidth="0.5"
        opacity="0.2"
      />
    ))}
    {/* Main shield shape */}
    <path d="M32 8C32 8 14 14 14 28C14 42 32 58 32 58C32 58 50 42 50 28C50 14 32 8 32 8Z" fill="url(#paladin-shield)" stroke="#fde68a" strokeWidth="1.5" opacity="0.9" />
    {/* Inner shield border */}
    <path d="M32 14C32 14 20 18 20 28C20 38 32 50 32 50C32 50 44 38 44 28C44 18 32 14 32 14Z" fill="none" stroke="#fde68a" strokeWidth="0.8" opacity="0.5" />
    {/* Holy cross */}
    <path d="M32 16V48" stroke="#fffbeb" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <path d="M22 30H42" stroke="#fffbeb" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    {/* Cross ends flare */}
    <path d="M30 16L32 12L34 16" fill="#fffbeb" opacity="0.6" />
    <path d="M22 28L18 30L22 32" fill="#fffbeb" opacity="0.6" />
    <path d="M42 28L46 30L42 32" fill="#fffbeb" opacity="0.6" />
    {/* Central jewel */}
    <circle cx="32" cy="30" r="4" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" />
    <circle cx="32" cy="30" r="2" fill="#fffbeb" opacity="0.9" />
    {/* Corner ornaments */}
    <circle cx="32" cy="20" r="1" fill="#fde68a" opacity="0.6" />
    <circle cx="26" cy="30" r="1" fill="#fde68a" opacity="0.6" />
    <circle cx="38" cy="30" r="1" fill="#fde68a" opacity="0.6" />
    <circle cx="32" cy="40" r="1" fill="#fde68a" opacity="0.6" />
  </svg>
);

const RangerEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bow with nocked arrow and nature elements */}
    <defs>
      <linearGradient id="ranger-bow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="ranger-arrow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4d4d8" />
        <stop offset="100%" stopColor="#71717a" />
      </linearGradient>
    </defs>
    {/* Bow arc */}
    <path d="M18 12C18 12 8 32 18 52" stroke="url(#ranger-bow)" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Bow grip wrapping */}
    <rect x="15" y="29" width="6" height="6" rx="1" fill="#451a03" />
    <path d="M16 30H20M16 32H20M16 34H20" stroke="#92400e" strokeWidth="0.5" />
    {/* Bowstring */}
    <path d="M18 12L32 32L18 52" stroke="#a8a29e" strokeWidth="0.8" />
    {/* Arrow shaft */}
    <line x1="16" y1="32" x2="54" y2="32" stroke="url(#ranger-arrow)" strokeWidth="1.5" />
    {/* Arrowhead */}
    <path d="M54 32L48 28L48 36Z" fill="#d97706" stroke="#f59e0b" strokeWidth="0.5" />
    {/* Arrow fletching */}
    <path d="M18 32L14 28L18 30" fill="#f59e0b" opacity="0.7" />
    <path d="M18 32L14 36L18 34" fill="#f59e0b" opacity="0.7" />
    {/* Nature vines on bow */}
    <path d="M16 16C14 18 12 20 14 22C16 24 14 26 16 28" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.5" />
    <path d="M16 36C14 38 12 40 14 42C16 44 14 46 16 48" stroke="#22c55e" strokeWidth="0.8" fill="none" opacity="0.5" />
    {/* Small leaves */}
    <ellipse cx="13" cy="20" rx="2" ry="1" fill="#22c55e" opacity="0.4" transform="rotate(-30 13 20)" />
    <ellipse cx="13" cy="44" rx="2" ry="1" fill="#22c55e" opacity="0.4" transform="rotate(30 13 44)" />
    {/* Wind trail behind arrow */}
    <path d="M44 30C46 30 48 31 50 30" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
    <path d="M42 34C44 34 46 33 48 34" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
    {/* Target eye on arrowhead */}
    <circle cx="52" cy="32" r="1" fill="#fef3c7" opacity="0.6" />
  </svg>
);

/**
 * ClassEmblem - Renders the appropriate class sigil SVG
 * @param {string} className - The hero class name (Warrior, Mage, Rogue, Paladin, Ranger)
 * @param {number} size - SVG size in pixels
 * @param {string} cssClass - Additional CSS classes
 */
const ClassEmblem = ({ heroClass, size = 48, className: cssClass = '' }) => {
  const emblems = {
    Warrior: WarriorEmblem,
    Mage: MageEmblem,
    Rogue: RogueEmblem,
    Paladin: PaladinEmblem,
    Ranger: RangerEmblem,
  };

  const EmblemComponent = emblems[heroClass] || WarriorEmblem;
  return <EmblemComponent size={size} className={cssClass} />;
};

export default ClassEmblem;
