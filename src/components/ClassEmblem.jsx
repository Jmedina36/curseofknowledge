import React from 'react';

/**
 * Hand-crafted fantasy class sigils rendered as inline SVGs.
 * Dark fantasy aesthetic with intricate detail.
 * 
 * Warrior  — Greatsword with runed blade
 * Mage     — Arcane grimoire eye with orbiting runes
 * Rogue    — Single curved dagger with dripping poison
 * Paladin  — Holy shield with radiant cross
 * Ranger   — Recurve bow with nocked arrow
 */

const WarriorEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="w-axe-head" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="40%" stopColor="#9ca3af" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="w-axe-edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="w-shaft" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="50%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <linearGradient id="w-wrap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
    {/* Shaft — thick wooden haft */}
    <rect x="30" y="8" width="4" height="50" rx="2" fill="url(#w-shaft)" />
    {/* Shaft wood grain */}
    <line x1="31" y1="30" x2="31" y2="56" stroke="#b45309" strokeWidth="0.3" opacity="0.3" />
    <line x1="33" y1="28" x2="33" y2="54" stroke="#451a03" strokeWidth="0.3" opacity="0.3" />
    {/* Left axe head — massive curved blade */}
    <path d="M30 10C30 10 8 14 6 24C4 30 10 34 14 34C18 34 26 32 30 30Z" fill="url(#w-axe-head)" stroke="#9ca3af" strokeWidth="0.5" />
    {/* Left blade edge highlight */}
    <path d="M8 22C6 26 8 30 12 33" stroke="url(#w-axe-edge)" strokeWidth="0.8" fill="none" />
    {/* Left blade inner bevel */}
    <path d="M30 12C30 12 16 16 12 22C10 26 14 30 18 32C22 32 28 30 30 28Z" fill="none" stroke="#d1d5db" strokeWidth="0.4" opacity="0.3" />
    {/* Right axe head — massive curved blade */}
    <path d="M34 10C34 10 56 14 58 24C60 30 54 34 50 34C46 34 38 32 34 30Z" fill="url(#w-axe-head)" stroke="#9ca3af" strokeWidth="0.5" />
    {/* Right blade edge highlight */}
    <path d="M56 22C58 26 56 30 52 33" stroke="url(#w-axe-edge)" strokeWidth="0.8" fill="none" />
    {/* Right blade inner bevel */}
    <path d="M34 12C34 12 48 16 52 22C54 26 50 30 46 32C42 32 36 30 34 28Z" fill="none" stroke="#d1d5db" strokeWidth="0.4" opacity="0.3" />
    {/* Axe head socket — metal collar binding head to shaft */}
    <rect x="27" y="8" width="10" height="6" rx="1" fill="#4b5563" stroke="#6b7280" strokeWidth="0.5" />
    <path d="M28 9.5H36M28 12H36" stroke="#9ca3af" strokeWidth="0.4" opacity="0.4" />
    {/* Rune engravings on axe heads */}
    <path d="M18 22L20 18L22 22L20 24Z" fill="#ef4444" opacity="0.4" />
    <path d="M42 22L44 18L46 22L44 24Z" fill="#ef4444" opacity="0.4" />
    <path d="M12 26H16" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
    <path d="M48 26H52" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
    {/* Leather grip wrapping on shaft */}
    <rect x="28.5" y="36" width="7" height="14" rx="2" fill="url(#w-wrap)" />
    <path d="M29 37.5H35M29 39.5H35M29 41.5H35M29 43.5H35M29 45.5H35M29 47.5H35" stroke="#450a0a" strokeWidth="0.5" opacity="0.5" />
    {/* Pommel spike */}
    <path d="M30 56L32 62L34 56" fill="#4b5563" stroke="#6b7280" strokeWidth="0.5" />
    <circle cx="32" cy="57" r="1.5" fill="#7f1d1d" stroke="#fbbf24" strokeWidth="0.6" />
    <circle cx="32" cy="57" r="0.5" fill="#fbbf24" opacity="0.7" />
    {/* Subtle battle glow */}
    <circle cx="6" cy="24" r="4" fill="#ef4444" opacity="0.06" />
    <circle cx="58" cy="24" r="4" fill="#ef4444" opacity="0.06" />
  </svg>
);

const MageEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="m-core" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <radialGradient id="m-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
        <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="m-eye-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Outer ambient glow */}
    <circle cx="32" cy="32" r="30" fill="url(#m-glow)" />
    {/* Outer arcane circle */}
    <circle cx="32" cy="32" r="26" stroke="#7c3aed" strokeWidth="0.8" opacity="0.35" />
    {/* Inner dashed ritual circle */}
    <circle cx="32" cy="32" r="20" stroke="#a855f7" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 2" />
    {/* Six-pointed star — two overlapping triangles */}
    <path d="M32 8L44 40H20Z" fill="url(#m-core)" opacity="0.55" />
    <path d="M32 56L20 24H44Z" fill="url(#m-core)" opacity="0.55" />
    {/* Inner hexagon outline */}
    <path d="M32 16L44 24V40L32 48L20 40V24Z" stroke="#e9d5ff" strokeWidth="0.6" fill="none" opacity="0.3" />
    {/* Central all-seeing eye */}
    <circle cx="32" cy="32" r="8" fill="url(#m-eye-glow)" opacity="0.5" />
    <ellipse cx="32" cy="32" rx="7" ry="4.5" fill="#581c87" stroke="#a855f7" strokeWidth="0.8" opacity="0.9" />
    <circle cx="32" cy="32" r="3" fill="#c084fc" />
    <circle cx="32" cy="32" r="1.5" fill="#f3e8ff" />
    <circle cx="31" cy="31" r="0.6" fill="#ffffff" opacity="0.9" />
    {/* Eye lash accents */}
    <path d="M25 32L22 30" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />
    <path d="M25 34L22 36" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />
    <path d="M39 32L42 30" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />
    <path d="M39 34L42 36" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />
    {/* Orbiting rune symbols at cardinal points */}
    {/* Top rune */}
    <path d="M32 5L33.5 8L32 7L30.5 8Z" fill="#a855f7" opacity="0.7" />
    {/* Bottom rune */}
    <path d="M32 59L33.5 56L32 57L30.5 56Z" fill="#a855f7" opacity="0.7" />
    {/* Left rune */}
    <path d="M5 32L8 30.5L7 32L8 33.5Z" fill="#a855f7" opacity="0.6" />
    {/* Right rune */}
    <path d="M59 32L56 30.5L57 32L56 33.5Z" fill="#a855f7" opacity="0.6" />
    {/* Diagonal accent dots */}
    <circle cx="12" cy="12" r="1.2" fill="#c084fc" opacity="0.3" />
    <circle cx="52" cy="12" r="1.2" fill="#c084fc" opacity="0.3" />
    <circle cx="12" cy="52" r="1.2" fill="#c084fc" opacity="0.3" />
    <circle cx="52" cy="52" r="1.2" fill="#c084fc" opacity="0.3" />
  </svg>
);

const RogueEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="r-blade" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="50%" stopColor="#9ca3af" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <linearGradient id="r-blade-edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="r-poison" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#166534" />
      </linearGradient>
      <linearGradient id="r-grip" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>
    {/* Dagger blade — curved, elegant, single weapon */}
    <path d="M32 4C32 4 30 6 28 14C26 22 24 30 26 36C27 38 30 40 32 40C34 40 37 38 38 36C40 30 38 22 36 14C34 6 32 4 32 4Z" fill="url(#r-blade)" />
    {/* Blade edge highlight — left side */}
    <path d="M32 5C30 8 28 16 27 24C26 30 26.5 35 28 38" stroke="url(#r-blade-edge)" strokeWidth="0.6" fill="none" />
    {/* Blade center line */}
    <line x1="32" y1="8" x2="32" y2="36" stroke="#d1d5db" strokeWidth="0.4" opacity="0.3" />
    {/* Serrated edge detail near tip */}
    <path d="M30 8L29 10M31 6L30.5 7" stroke="#e5e7eb" strokeWidth="0.3" opacity="0.4" />
    {/* Poison coating on blade */}
    <path d="M30 12C29 16 28 22 27.5 28" stroke="url(#r-poison)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <path d="M34 14C35 18 36 22 36 26" stroke="url(#r-poison)" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />
    {/* Poison drips falling from blade */}
    <path d="M28 36C27 38 27.5 40 28 41" stroke="#4ade80" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <circle cx="28" cy="42.5" r="1.2" fill="#22c55e" opacity="0.4" />
    <circle cx="30" cy="44" r="0.8" fill="#22c55e" opacity="0.25" />
    {/* Crossguard — curved, ornate */}
    <path d="M18 40C18 38 24 37 30 40L34 40C40 37 46 38 46 40C46 42 40 43 34 41L30 41C24 43 18 42 18 40Z" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
    {/* Guard end jewels */}
    <circle cx="18" cy="40" r="2" fill="#1f2937" stroke="#22c55e" strokeWidth="0.8" />
    <circle cx="18" cy="40" r="0.8" fill="#4ade80" opacity="0.6" />
    <circle cx="46" cy="40" r="2" fill="#1f2937" stroke="#22c55e" strokeWidth="0.8" />
    <circle cx="46" cy="40" r="0.8" fill="#4ade80" opacity="0.6" />
    {/* Grip — leather wrapped */}
    <rect x="29.5" y="42" width="5" height="10" rx="1.5" fill="url(#r-grip)" />
    <path d="M30 43.5H34M30 45.5H34M30 47.5H34M30 49.5H34" stroke="#374151" strokeWidth="0.5" />
    {/* Pommel — skull motif */}
    <circle cx="32" cy="55" r="3.5" fill="#1f2937" stroke="#4b5563" strokeWidth="0.8" />
    {/* Skull eyes */}
    <circle cx="30.5" cy="54" r="1" fill="#22c55e" opacity="0.7" />
    <circle cx="33.5" cy="54" r="1" fill="#22c55e" opacity="0.7" />
    {/* Skull nose */}
    <path d="M32 55.5L31.5 56.5H32.5Z" fill="#4b5563" opacity="0.5" />
    {/* Skull jaw */}
    <path d="M30 57C31 58 33 58 34 57" stroke="#4b5563" strokeWidth="0.4" fill="none" opacity="0.5" />
    {/* Ambient poison mist */}
    <circle cx="24" cy="30" r="4" fill="#22c55e" opacity="0.04" />
    <circle cx="38" cy="24" r="3" fill="#22c55e" opacity="0.03" />
  </svg>
);

const PaladinEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="p-shield" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="p-cross" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="100%" stopColor="#fef3c7" />
      </linearGradient>
      <radialGradient id="p-glow" cx="0.5" cy="0.35" r="0.5">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Divine radiance — soft rays */}
    <circle cx="32" cy="30" r="30" fill="url(#p-glow)" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <line
        key={i}
        x1="32"
        y1="30"
        x2={32 + Math.cos((angle * Math.PI) / 180) * (i % 2 === 0 ? 30 : 22)}
        y2={30 + Math.sin((angle * Math.PI) / 180) * (i % 2 === 0 ? 30 : 22)}
        stroke="#fbbf24"
        strokeWidth={i % 2 === 0 ? "0.6" : "0.3"}
        opacity={i % 2 === 0 ? "0.15" : "0.1"}
      />
    ))}
    {/* Main shield — kite shield shape */}
    <path d="M32 6C32 6 12 12 12 28C12 44 32 60 32 60C32 60 52 44 52 28C52 12 32 6 32 6Z" fill="url(#p-shield)" stroke="#fde68a" strokeWidth="1.2" />
    {/* Inner shield border with trim */}
    <path d="M32 12C32 12 18 16 18 28C18 40 32 52 32 52C32 52 46 40 46 28C46 16 32 12 32 12Z" fill="none" stroke="#fef3c7" strokeWidth="0.7" opacity="0.45" />
    {/* Decorative shield quadrant lines */}
    <path d="M32 12V52" stroke="#fef3c7" strokeWidth="0.3" opacity="0.2" />
    <path d="M18 28H46" stroke="#fef3c7" strokeWidth="0.3" opacity="0.2" />
    {/* Holy cross — thick, ornate */}
    <rect x="29" y="14" width="6" height="36" rx="1" fill="url(#p-cross)" opacity="0.85" />
    <rect x="19" y="25" width="26" height="6" rx="1" fill="url(#p-cross)" opacity="0.85" />
    {/* Cross flare ends */}
    <path d="M28 14L32 9L36 14" fill="#fffbeb" opacity="0.5" />
    <path d="M19 24L15 28L19 32" fill="#fffbeb" opacity="0.5" />
    <path d="M45 24L49 28L45 32" fill="#fffbeb" opacity="0.5" />
    <path d="M28 50L32 55L36 50" fill="#fffbeb" opacity="0.4" />
    {/* Central sacred jewel */}
    <circle cx="32" cy="28" r="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" opacity="0.9" />
    <circle cx="32" cy="28" r="3" fill="#fffbeb" opacity="0.95" />
    <circle cx="32" cy="28" r="1.2" fill="#fbbf24" opacity="0.8" />
    {/* Corner jewels on cross */}
    <circle cx="32" cy="18" r="1.2" fill="#fde68a" opacity="0.6" />
    <circle cx="24" cy="28" r="1.2" fill="#fde68a" opacity="0.6" />
    <circle cx="40" cy="28" r="1.2" fill="#fde68a" opacity="0.6" />
    <circle cx="32" cy="44" r="1.2" fill="#fde68a" opacity="0.5" />
  </svg>
);

const RangerEmblem = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="rn-bow-upper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="rn-bow-lower" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="rn-arrow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#78716c" />
        <stop offset="50%" stopColor="#a8a29e" />
        <stop offset="100%" stopColor="#d6d3d1" />
      </linearGradient>
      <linearGradient id="rn-head" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    {/* Bow — elegant recurve, vertically centered */}
    {/* Upper limb */}
    <path d="M22 32C22 32 18 26 16 20C14 14 16 8 20 6" stroke="url(#rn-bow-upper)" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Upper recurve tip */}
    <path d="M20 6C20 6 22 4 24 5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Lower limb */}
    <path d="M22 32C22 32 18 38 16 44C14 50 16 56 20 58" stroke="url(#rn-bow-lower)" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Lower recurve tip */}
    <path d="M20 58C20 58 22 60 24 59" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Bow wood grain detail */}
    <path d="M19 12C18 16 17 20 18 24" stroke="#b45309" strokeWidth="0.4" opacity="0.3" fill="none" />
    <path d="M19 40C18 44 17 48 18 52" stroke="#78350f" strokeWidth="0.4" opacity="0.3" fill="none" />
    {/* Grip wrapping */}
    <rect x="19" y="28.5" width="5" height="7" rx="2" fill="#451a03" />
    <path d="M20 29.5H23M20 31H23M20 32.5H23M20 34H23" stroke="#78350f" strokeWidth="0.5" opacity="0.6" />
    {/* Bowstring */}
    <path d="M24 5L32 32L24 59" stroke="#d6d3d1" strokeWidth="0.7" opacity="0.7" />
    {/* Arrow shaft — resting on bow, pointing right */}
    <line x1="20" y1="32" x2="56" y2="32" stroke="url(#rn-arrow)" strokeWidth="1.5" />
    {/* Arrowhead — broadhead style */}
    <path d="M56 32L50 27L52 32L50 37Z" fill="url(#rn-head)" stroke="#f59e0b" strokeWidth="0.4" />
    {/* Arrowhead center line */}
    <line x1="52" y1="32" x2="56" y2="32" stroke="#fef3c7" strokeWidth="0.4" opacity="0.5" />
    {/* Fletching — three feathers */}
    <path d="M22 32L16 27L20 31" fill="#d97706" opacity="0.8" />
    <path d="M22 32L16 37L20 33" fill="#b45309" opacity="0.8" />
    <path d="M21 32L16 32" stroke="#f59e0b" strokeWidth="0.6" opacity="0.4" />
    {/* Nature accents — vine wrapping on upper limb */}
    <path d="M18 10C16 12 15 14 17 16C19 18 17 20 18 22" stroke="#22c55e" strokeWidth="0.7" fill="none" opacity="0.4" />
    {/* Leaves */}
    <ellipse cx="15.5" cy="13" rx="2.5" ry="1" fill="#22c55e" opacity="0.35" transform="rotate(-40 15.5 13)" />
    <ellipse cx="17" cy="19" rx="2" ry="0.8" fill="#22c55e" opacity="0.3" transform="rotate(20 17 19)" />
    {/* Lower vine */}
    <path d="M18 42C16 44 15 46 17 48" stroke="#22c55e" strokeWidth="0.6" fill="none" opacity="0.3" />
    <ellipse cx="15.5" cy="45" rx="2" ry="0.8" fill="#22c55e" opacity="0.25" transform="rotate(40 15.5 45)" />
    {/* Motion lines from arrowhead */}
    <path d="M48 29.5C50 29.5 52 30 54 29" stroke="#f59e0b" strokeWidth="0.4" opacity="0.2" />
    <path d="M48 34.5C50 34.5 52 34 54 35" stroke="#f59e0b" strokeWidth="0.4" opacity="0.2" />
  </svg>
);

/**
 * ClassEmblem - Renders the appropriate class sigil SVG
 * @param {string} heroClass - The hero class name (Warrior, Mage, Rogue, Paladin, Ranger)
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
