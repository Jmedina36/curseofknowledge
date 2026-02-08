import React from 'react';

/**
 * Corner rune ornaments and parchment texture overlay for the hero card.
 * Accepts a `colorClass` prop to tint runes to the hero's class color.
 * Color classes: red, purple, emerald, yellow, teal
 */

const runeColors = {
  red: { stroke: 'rgba(220, 38, 38, 0.45)', fill: 'rgba(220, 38, 38, 0.12)' },
  purple: { stroke: 'rgba(168, 85, 247, 0.45)', fill: 'rgba(168, 85, 247, 0.12)' },
  emerald: { stroke: 'rgba(16, 185, 129, 0.45)', fill: 'rgba(16, 185, 129, 0.12)' },
  yellow: { stroke: 'rgba(234, 179, 8, 0.45)', fill: 'rgba(234, 179, 8, 0.12)' },
  teal: { stroke: 'rgba(20, 184, 166, 0.45)', fill: 'rgba(20, 184, 166, 0.12)' },
  orange: { stroke: 'rgba(249, 115, 22, 0.45)', fill: 'rgba(249, 115, 22, 0.12)' },
  cyan: { stroke: 'rgba(34, 211, 238, 0.45)', fill: 'rgba(34, 211, 238, 0.12)' },
};

const CornerRune = ({ position, color }) => {
  const { stroke, fill } = runeColors[color] || runeColors.red;

  // Rotation transform per corner
  const rotations = {
    'top-left': 'rotate(0)',
    'top-right': 'rotate(90)',
    'bottom-right': 'rotate(180)',
    'bottom-left': 'rotate(270)',
  };

  // Positioning classes
  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };

  return (
    <div className={`absolute ${posClasses[position]} pointer-events-none z-20`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: rotations[position] }}
      >
        {/* Outer corner bracket */}
        <path
          d="M4 20 L4 4 L20 4"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner corner bracket */}
        <path
          d="M8 16 L8 8 L16 8"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Diamond rune */}
        <path
          d="M12 4 L16 8 L12 12 L8 8 Z"
          stroke={stroke}
          strokeWidth="0.8"
          fill={fill}
          opacity="0.8"
        />
        {/* Dot accent */}
        <circle cx="4" cy="4" r="1.5" fill={stroke} opacity="0.7" />
        {/* Small cross rune */}
        <line x1="20" y1="6" x2="20" y2="10" stroke={stroke} strokeWidth="0.6" opacity="0.4" />
        <line x1="18" y1="8" x2="22" y2="8" stroke={stroke} strokeWidth="0.6" opacity="0.4" />
      </svg>
    </div>
  );
};

const HeroCardDecorations = ({ colorClass = 'red' }) => {
  // Fallback for legacy color keys
  const color = colorClass === 'green' ? 'emerald' : colorClass === 'amber' ? 'teal' : colorClass;

  return (
    <>

      {/* Aged edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)',
        }}
      />


      {/* Corner rune ornaments */}
      <CornerRune position="top-left" color={color} />
      <CornerRune position="top-right" color={color} />
      <CornerRune position="bottom-right" color={color} />
      <CornerRune position="bottom-left" color={color} />
    </>
  );
};

export default HeroCardDecorations;
