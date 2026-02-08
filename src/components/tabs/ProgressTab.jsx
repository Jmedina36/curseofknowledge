// ═══════════════════════════════════════════════════════════
// PROGRESS TAB — Stats, achievements, study analytics
// Phase 4 will implement full functionality
// ═══════════════════════════════════════════════════════════

import { useGameState } from '@/contexts/GameStateContext';
import { GAME_CONSTANTS } from '@/lib/gameConstants';
import AchievementsPanel from '@/components/AchievementsPanel';

const ProgressTab = () => {
  const {
    currentDay, curseLevel, skipCount, tasks, consecutiveDays,
    level, xp, essence, weapon, armor,
    heroes, graveyard, studyStats, miniBossCount, gauntletUnlocked,
  } = useGameState();

  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-yellow-900/40">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-2xl font-fantasy-decorative text-yellow-400 tracking-wider drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]">
          Chronicles of the Cursed
        </h2>
        <p className="text-gray-400 text-sm italic font-fantasy mt-1">"Your struggle against the eternal darkness..."</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/25 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-yellow-600/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/25 to-transparent" />
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Current Cycle Status */}
        <div className="bg-gradient-to-br from-red-950/50 to-black/30 rounded-xl p-5 border border-red-800/25">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-600/20" />
            <h3 className="text-xs font-fantasy tracking-[0.2em] text-red-400 uppercase">Current Cycle</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-600/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Day" value={`${currentDay}/7`} sub={GAME_CONSTANTS.DAY_NAMES[(currentDay - 1) % 7].name} borderColor="border-red-800/15" />
            <StatCard label="Curse Level" value={curseLevel} sub={curseLevel === 0 ? 'Pure' : curseLevel === 1 ? 'Cursed' : curseLevel === 2 ? 'Deep Curse' : 'Condemned'} borderColor="border-purple-800/15" valueColor="text-purple-400" />
            <StatCard label="Skip Count" value={skipCount} sub={skipCount >= 3 ? 'DANGER' : 'of 4 max'} borderColor="border-yellow-800/15" valueColor="text-yellow-400" />
            <StatCard label="Trials Today" value={`${tasks.filter(t => t.done).length}/${tasks.length}`} sub="completed" borderColor="border-cyan-800/15" valueColor="text-cyan-400" />
          </div>
        </div>

        {/* Lifetime Stats */}
        <div className="bg-gradient-to-br from-amber-950/30 to-black/30 rounded-xl p-5 border border-amber-800/25">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-600/20" />
            <h3 className="text-xs font-fantasy tracking-[0.2em] text-amber-400 uppercase">Lifetime</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-600/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Level" value={level} borderColor="border-amber-800/15" valueColor="text-amber-400" />
            <StatCard label="Total XP" value={xp} borderColor="border-yellow-800/15" valueColor="text-yellow-400" />
            <StatCard label="Essence" value={essence} borderColor="border-purple-800/15" valueColor="text-purple-400" />
            <StatCard label="Streak" value={`${consecutiveDays}d`} borderColor="border-green-800/15" valueColor="text-green-400" />
          </div>
        </div>

        {/* Achievements */}
        <AchievementsPanel
          heroes={heroes}
          graveyard={graveyard}
          level={level}
          xp={xp}
          essence={essence}
          consecutiveDays={consecutiveDays}
          studyStats={studyStats}
          miniBossCount={miniBossCount}
          weapon={weapon}
          armor={armor}
          gauntletUnlocked={gauntletUnlocked}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, borderColor = 'border-gray-800/15', valueColor = 'text-red-400' }) => (
  <div className={`bg-black/30 rounded-lg p-3 border ${borderColor}`}>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-fantasy">{label}</p>
    <p className={`text-2xl font-bold font-mono ${valueColor}`}>{value}</p>
    {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
  </div>
);

export default ProgressTab;
