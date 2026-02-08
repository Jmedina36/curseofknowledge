// ═══════════════════════════════════════════════════════════
// HERO CARD — Identity display with stats and XP
// ═══════════════════════════════════════════════════════════

import { Heart, Zap, Sword, Shield, Skull } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';
import { GAME_CONSTANTS, getCardStyle } from '@/lib/gameConstants';
import ClassEmblem from '@/components/ClassEmblem';
import HeroCardDecorations from '@/components/HeroCardDecorations';

const HeroCard = () => {
  const {
    hero, currentDay, level, hp, stamina, xp,
    weapon, armor, skipCount, curseLevel, consecutiveDays,
    isDayActive, timeUntilMidnight, canCustomize,
    cleansePots, healthPots, staminaPots,
    getMaxHp, getMaxStamina, getBaseAttack, getBaseDefense, getXpProgress,
    setCanCustomize,
  } = useGameState();

  if (!hero) return null;

  const cardStyle = getCardStyle(hero.class, currentDay);
  const xpProgress = getXpProgress();
  const maxHp = getMaxHp();
  const maxStamina = getMaxStamina();

  return (
    <div
      className={`bg-gradient-to-br ${cardStyle.bg} rounded-xl max-w-2xl mx-auto relative overflow-hidden ${cardStyle.glow}`}
      style={{ border: cardStyle.border }}
    >
      <HeroCardDecorations colorClass={hero.class.color} />

      {/* Watermark emblem */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none">
        <ClassEmblem heroClass={hero.class.name} size={280} />
      </div>

      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

      <div className="relative z-10">
        {/* Hero Identity */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]">
              <ClassEmblem heroClass={hero.class.name} size={56} />
            </div>
            <div className="text-right">
              <p className="text-xs text-white/90 uppercase tracking-[0.2em] font-fantasy">
                {GAME_CONSTANTS.DAY_NAMES[(new Date().getDay() + 6) % 7].name}
              </p>
              <p className="text-sm text-white/90">
                {timeUntilMidnight && isDayActive && <span className="text-red-400">({timeUntilMidnight}) </span>}
                {!isDayActive && <span className="text-gray-200">💤 </span>}
                Day {currentDay} {!isDayActive && <span className="text-gray-200 text-xs">• Dormant</span>}
              </p>
              <p className="text-2xl font-bold text-white font-fantasy tracking-wide">Lvl {level}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white leading-tight font-fantasy-decorative tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              {hero.name}
            </p>
            <p className="text-base text-white/85 font-fantasy tracking-wide">
              {hero.title} {hero.class.name}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-yellow-500/30" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* XP Bar */}
        <div className="px-6 py-4">
          <div className="bg-black/30 rounded-lg p-3 border border-white/10">
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span className="font-fantasy text-xs tracking-[0.15em] uppercase text-yellow-400">Experience</span>
              <span className="font-mono text-xs text-white/80">
                {xpProgress.current} / {xpProgress.needed}
              </span>
            </div>
            <div className="bg-black/50 rounded-full h-3 overflow-hidden border border-yellow-900/20">
              <div
                className="bg-gradient-to-r from-yellow-600 to-amber-400 h-3 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                style={{ width: `${(xpProgress.current / xpProgress.needed) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-white/70 mt-1.5 text-right font-fantasy">
              {xpProgress.remaining} XP to next level
            </p>
          </div>
        </div>

        {/* Warnings */}
        {(skipCount > 0 || curseLevel > 0) && (
          <div className="px-6 pb-2 space-y-3">
            {skipCount > 0 && (
              <div className={`rounded-lg p-3 border ${
                skipCount >= 3 ? 'bg-red-950/60 border-red-500/50 animate-pulse' :
                skipCount >= 2 ? 'bg-red-950/40 border-red-700/40' :
                'bg-red-950/20 border-red-800/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skull className="text-red-500/80" size={18} />
                    <span className="font-fantasy text-xs tracking-wider text-red-400 uppercase">
                      {skipCount === 3 ? 'Final Warning' : 'Curse Progress'}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-red-400/80 font-mono">{skipCount}/4</span>
                </div>
                {skipCount === 3 && (
                  <p className="text-xs text-red-300 mt-2 italic font-fantasy">One more skip and you die. No mercy.</p>
                )}
                {consecutiveDays > 0 && skipCount > 0 && (
                  <p className="text-xs text-green-400 mt-2 font-fantasy">
                    Redemption: {consecutiveDays}/{GAME_CONSTANTS.SKIP_REDEMPTION_DAYS} days
                  </p>
                )}
              </div>
            )}

            {curseLevel > 0 && (
              <div className={`rounded-lg p-3 border animate-pulse ${
                curseLevel === 3 ? 'bg-red-950/60 border-red-500/40' :
                curseLevel === 2 ? 'bg-purple-950/50 border-purple-500/40' :
                'bg-purple-950/30 border-purple-600/30'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{curseLevel === 3 ? '☠️' : ''}</span>
                  <div>
                    <p className={`font-fantasy text-xs tracking-wider uppercase ${
                      curseLevel === 3 ? 'text-red-300' : 'text-purple-300'
                    }`}>
                      {curseLevel === 3 ? 'Condemned' : curseLevel === 2 ? 'Deeply Cursed' : 'Cursed'}
                    </p>
                    <p className={`text-[10px] ${curseLevel === 3 ? 'text-red-400' : 'text-purple-400'}`}>
                      {curseLevel === 3 ? '90% XP penalty • One failure from death' :
                       curseLevel === 2 ? '75% XP penalty • Enemies hit harder' :
                       '50% XP penalty'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Combat Stats Label */}
        <div className="flex items-center gap-3 px-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-white/60 text-[10px] font-fantasy tracking-[0.3em] uppercase">Combat Stats</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Stats Grid */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-black/30 rounded-lg p-3 border border-red-800/20 hover:border-red-700/30 transition-all">
              <div className="flex items-center justify-center mb-1.5"><Heart size={18} className="text-red-400/80" /></div>
              <p className="text-lg font-bold text-white text-center font-mono">{hp}/{maxHp}</p>
              <div className="bg-black/50 rounded-full h-1.5 overflow-hidden mt-1.5 border border-red-900/10">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${
                  (hp / maxHp) > 0.5 ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_6px_rgba(220,38,38,0.3)]' :
                  (hp / maxHp) > 0.25 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                  'bg-gradient-to-r from-red-700 to-red-500 animate-pulse'
                }`} style={{ width: `${(hp / maxHp) * 100}%` }} />
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-3 border border-cyan-800/20 hover:border-cyan-700/30 transition-all">
              <div className="flex items-center justify-center mb-1.5"><Zap size={18} className="text-cyan-400/80" /></div>
              <p className="text-lg font-bold text-white text-center font-mono">{stamina}/{maxStamina}</p>
              <div className="bg-black/50 rounded-full h-1.5 overflow-hidden mt-1.5 border border-cyan-900/10">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_6px_rgba(34,211,238,0.2)]" style={{ width: `${(stamina / maxStamina) * 100}%` }} />
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-3 border border-orange-800/20 hover:border-orange-700/30 transition-all">
              <div className="flex items-center justify-center mb-1.5"><Sword size={18} className="text-orange-400/80" /></div>
              <p className="text-lg font-bold text-white text-center font-mono">{getBaseAttack() + weapon + (level - 1) * 2}</p>
              <p className="text-[10px] text-white/70 text-center font-fantasy tracking-wide">damage per hit</p>
            </div>

            <div className="bg-black/30 rounded-lg p-3 border border-amber-800/20 hover:border-amber-700/30 transition-all">
              <div className="flex items-center justify-center mb-1.5"><Shield size={18} className="text-amber-400/80" /></div>
              <p className="text-lg font-bold text-white text-center font-mono">
                {Math.floor(((getBaseDefense() + armor) / ((getBaseDefense() + armor) + 50)) * 100)}%
              </p>
              <p className="text-[10px] text-white/70 text-center font-fantasy tracking-wide">damage resist</p>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="flex items-center gap-3 px-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="w-1 h-1 rotate-45 bg-white/15" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-2.5">
            <button className="bg-gradient-to-b from-red-800/50 to-red-950/50 hover:from-red-700/60 hover:to-red-900/60 px-4 py-3 rounded-lg transition-all font-fantasy tracking-wide text-red-200 border border-red-700/30 hover:border-red-600/30 shadow-[0_0_10px_rgba(220,38,38,0.08)] flex items-center justify-center gap-2">
              Inventory
            </button>
            <button className="bg-gradient-to-b from-orange-800/50 to-orange-950/50 hover:from-orange-700/60 hover:to-orange-900/60 px-4 py-3 rounded-lg transition-all font-fantasy tracking-wide text-orange-200 border border-orange-700/30 hover:border-orange-600/30 shadow-[0_0_10px_rgba(234,88,12,0.08)] flex items-center justify-center gap-2">
              Merchant
            </button>
          </div>
        </div>

        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>
    </div>
  );
};

export default HeroCard;
