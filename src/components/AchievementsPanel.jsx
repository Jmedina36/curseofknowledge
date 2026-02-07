import { useState, useEffect } from 'react';

const ACHIEVEMENT_TIERS = {
  common: {
    label: 'Common',
    border: 'border-gray-500',
    bg: 'bg-gray-800',
    glow: '',
    text: 'text-gray-300',
    badge: 'bg-gray-600 text-gray-200',
  },
  rare: {
    label: 'Rare',
    border: 'border-blue-500',
    bg: 'bg-blue-950/60',
    glow: 'shadow-blue-500/20',
    text: 'text-blue-300',
    badge: 'bg-blue-700 text-blue-100',
  },
  epic: {
    label: 'Epic',
    border: 'border-purple-500',
    bg: 'bg-purple-950/60',
    glow: 'shadow-purple-500/30',
    text: 'text-purple-300',
    badge: 'bg-purple-700 text-purple-100',
  },
  legendary: {
    label: 'Legendary',
    border: 'border-yellow-500',
    bg: 'bg-yellow-950/60',
    glow: 'shadow-yellow-500/40',
    text: 'text-yellow-300',
    badge: 'bg-yellow-700 text-yellow-100',
  },
};

const CATEGORIES = {
  study: { label: 'Study', color: 'text-cyan-400' },
  combat: { label: 'Combat', color: 'text-red-400' },
  persistence: { label: 'Persistence', color: 'text-green-400' },
  mastery: { label: 'Mastery', color: 'text-yellow-400' },
};

const buildAchievements = (props) => {
  const { heroes, graveyard, level, xp, essence, consecutiveDays, studyStats, miniBossCount, weapon, armor, gauntletUnlocked } = props;
  
  return [
    // -- STUDY --
    {
      id: 'first_task',
      name: 'First Steps',
      desc: 'Complete your first task',
      category: 'study',
      tier: 'common',
      check: studyStats.tasksCompletedToday >= 1 || heroes.length > 0 || xp > 0,
      progress: null,
    },
    {
      id: 'deep_focus',
      name: 'Deep Focus',
      desc: 'Complete a deep work session (25+ min)',
      category: 'study',
      tier: 'rare',
      check: studyStats.deepWorkSessions >= 1,
      progress: studyStats.deepWorkSessions >= 1 ? null : { current: studyStats.deepWorkSessions, max: 1 },
    },
    {
      id: 'early_riser',
      name: 'Early Riser',
      desc: 'Start your day before the late hour',
      category: 'study',
      tier: 'common',
      check: studyStats.earlyBirdDays >= 1,
      progress: null,
    },
    {
      id: 'dawn_warrior',
      name: 'Dawn Warrior',
      desc: 'Start early on 5 separate days',
      category: 'study',
      tier: 'epic',
      check: studyStats.earlyBirdDays >= 5,
      progress: studyStats.earlyBirdDays < 5 ? { current: studyStats.earlyBirdDays, max: 5 } : null,
    },
    {
      id: 'perfect_day',
      name: 'Perfect Day',
      desc: 'Complete every task in a single day',
      category: 'study',
      tier: 'rare',
      check: studyStats.perfectDays >= 1,
      progress: null,
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      desc: 'Achieve 5 perfect days',
      category: 'study',
      tier: 'legendary',
      check: studyStats.perfectDays >= 5,
      progress: studyStats.perfectDays < 5 ? { current: studyStats.perfectDays, max: 5 } : null,
    },

    // -- COMBAT --
    {
      id: 'first_blood',
      name: 'First Blood',
      desc: 'Win your first battle',
      category: 'combat',
      tier: 'common',
      check: xp >= 10 || heroes.length > 0,
      progress: null,
    },
    {
      id: 'elite_slayer',
      name: 'Elite Slayer',
      desc: 'Defeat an elite boss',
      category: 'combat',
      tier: 'rare',
      check: miniBossCount >= 1 || heroes.length > 0,
      progress: null,
    },
    {
      id: 'gauntlet_challenger',
      name: 'Gauntlet Challenger',
      desc: 'Unlock the Gauntlet trial',
      category: 'combat',
      tier: 'epic',
      check: gauntletUnlocked || heroes.length > 0,
      progress: null,
    },
    {
      id: 'armed_dangerous',
      name: 'Armed and Dangerous',
      desc: 'Reach +30 weapon and +30 armor',
      category: 'combat',
      tier: 'rare',
      check: weapon >= 30 && armor >= 30,
      progress: (weapon < 30 || armor < 30) ? { current: Math.min(weapon, armor), max: 30 } : null,
    },
    {
      id: 'walking_fortress',
      name: 'Walking Fortress',
      desc: 'Reach +100 combined weapon and armor',
      category: 'combat',
      tier: 'epic',
      check: (weapon + armor) >= 100,
      progress: (weapon + armor) < 100 ? { current: weapon + armor, max: 100 } : null,
    },

    // -- PERSISTENCE --
    {
      id: 'curse_breaker',
      name: 'Curse Breaker',
      desc: 'Complete a full 7-day cycle',
      category: 'persistence',
      tier: 'rare',
      check: heroes.length >= 1,
      progress: heroes.length < 1 ? { current: heroes.length, max: 1 } : null,
    },
    {
      id: 'flawless',
      name: 'Flawless Victory',
      desc: 'Complete a cycle with zero skips',
      category: 'persistence',
      tier: 'epic',
      check: heroes.some(h => h.skipCount === 0),
      progress: null,
    },
    {
      id: 'unbroken_7',
      name: 'Unbroken Spirit',
      desc: '7-day streak without skipping',
      category: 'persistence',
      tier: 'rare',
      check: consecutiveDays >= 7 || studyStats.longestStreak >= 7,
      progress: (consecutiveDays < 7 && studyStats.longestStreak < 7) ? { current: Math.max(consecutiveDays, studyStats.longestStreak), max: 7 } : null,
    },
    {
      id: 'iron_will',
      name: 'Iron Will',
      desc: '14-day streak without skipping',
      category: 'persistence',
      tier: 'epic',
      check: consecutiveDays >= 14 || studyStats.longestStreak >= 14,
      progress: (consecutiveDays < 14 && studyStats.longestStreak < 14) ? { current: Math.max(consecutiveDays, studyStats.longestStreak), max: 14 } : null,
    },
    {
      id: 'legend_born',
      name: 'Legend Born',
      desc: 'Liberate 3 heroes from the curse',
      category: 'persistence',
      tier: 'epic',
      check: heroes.length >= 3,
      progress: heroes.length < 3 ? { current: heroes.length, max: 3 } : null,
    },
    {
      id: 'eternal',
      name: 'The Eternal',
      desc: 'Liberate 10 heroes from the curse',
      category: 'persistence',
      tier: 'legendary',
      check: heroes.length >= 10,
      progress: heroes.length < 10 ? { current: heroes.length, max: 10 } : null,
    },

    // -- MASTERY --
    {
      id: 'veteran',
      name: 'Veteran Warrior',
      desc: 'Reach level 10',
      category: 'mastery',
      tier: 'rare',
      check: level >= 10,
      progress: level < 10 ? { current: level, max: 10 } : null,
    },
    {
      id: 'champion',
      name: 'Champion',
      desc: 'Reach level 25',
      category: 'mastery',
      tier: 'epic',
      check: level >= 25,
      progress: level < 25 ? { current: level, max: 25 } : null,
    },
    {
      id: 'soul_collector',
      name: 'Soul Collector',
      desc: 'Accumulate 500 essence',
      category: 'mastery',
      tier: 'rare',
      check: essence >= 500,
      progress: essence < 500 ? { current: essence, max: 500 } : null,
    },
    {
      id: 'soul_hoarder',
      name: 'Soul Hoarder',
      desc: 'Accumulate 2000 essence',
      category: 'mastery',
      tier: 'legendary',
      check: essence >= 2000,
      progress: essence < 2000 ? { current: essence, max: 2000 } : null,
    },
    {
      id: 'xp_hunter',
      name: 'XP Hunter',
      desc: 'Earn 1000 total XP',
      category: 'mastery',
      tier: 'rare',
      check: xp >= 1000,
      progress: xp < 1000 ? { current: xp, max: 1000 } : null,
    },
    {
      id: 'transcendent',
      name: 'Transcendent',
      desc: 'Earn 5000 total XP',
      category: 'mastery',
      tier: 'legendary',
      check: xp >= 5000,
      progress: xp < 5000 ? { current: xp, max: 5000 } : null,
    },
  ];
};

const AchievementCard = ({ achievement, isNew }) => {
  const unlocked = achievement.check;
  const tier = ACHIEVEMENT_TIERS[achievement.tier];
  const category = CATEGORIES[achievement.category];

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-500
        ${unlocked
          ? `${tier.border} ${tier.bg} shadow-lg ${tier.glow}`
          : 'border-gray-700/50 bg-gray-900/40 opacity-60'
        }
        ${unlocked && isNew ? 'achievement-new' : ''}
      `}
    >
      {/* Shimmer overlay for unlocked */}
      {unlocked && (
        <div className="absolute inset-0 pointer-events-none achievement-shimmer" />
      )}

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
            {achievement.name}
          </h4>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${unlocked ? tier.badge : 'bg-gray-700 text-gray-500'}`}>
              {tier.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs mb-2 ${unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
          {achievement.desc}
        </p>

        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] uppercase tracking-wider ${unlocked ? category.color : 'text-gray-600'}`}>
            {category.label}
          </span>
          
          {/* Status */}
          {unlocked ? (
            <span className={`text-xs font-bold ${tier.text}`}>
              UNLOCKED
            </span>
          ) : achievement.progress ? (
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-gray-500 h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (achievement.progress.current / achievement.progress.max) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500">
                {achievement.progress.current}/{achievement.progress.max}
              </span>
            </div>
          ) : (
            <span className="text-xs text-gray-600">LOCKED</span>
          )}
        </div>
      </div>
    </div>
  );
};

const AchievementsPanel = ({
  heroes,
  graveyard,
  level,
  xp,
  essence,
  consecutiveDays,
  studyStats,
  miniBossCount,
  weapon,
  armor,
  gauntletUnlocked,
}) => {
  const [filter, setFilter] = useState('all');
  const [newlyUnlocked, setNewlyUnlocked] = useState(new Set());
  const [prevUnlocked, setPrevUnlocked] = useState(null);

  const achievements = buildAchievements({
    heroes, graveyard, level, xp, essence, consecutiveDays, studyStats, miniBossCount, weapon, armor, gauntletUnlocked,
  });

  // Track newly unlocked achievements
  useEffect(() => {
    const currentUnlocked = new Set(achievements.filter(a => a.check).map(a => a.id));
    if (prevUnlocked !== null) {
      const fresh = new Set();
      currentUnlocked.forEach(id => {
        if (!prevUnlocked.has(id)) fresh.add(id);
      });
      if (fresh.size > 0) {
        setNewlyUnlocked(fresh);
        setTimeout(() => setNewlyUnlocked(new Set()), 3000);
      }
    }
    setPrevUnlocked(currentUnlocked);
  }, [heroes.length, level, xp, essence, consecutiveDays, studyStats.perfectDays, studyStats.earlyBirdDays, studyStats.deepWorkSessions, weapon, armor, miniBossCount, gauntletUnlocked]);

  const filtered = filter === 'all' ? achievements : achievements.filter(a => a.category === filter);
  const unlockedCount = achievements.filter(a => a.check).length;
  const totalCount = achievements.length;

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'study', label: 'Study' },
    { key: 'combat', label: 'Combat' },
    { key: 'persistence', label: 'Persistence' },
    { key: 'mastery', label: 'Mastery' },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-950/80 to-gray-950/80 rounded-xl p-6 border-2 border-purple-600/50">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-purple-200 tracking-wide">Trials Conquered</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-600/50" />
          <span className="text-sm text-purple-400 font-semibold">{unlockedCount} / {totalCount}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-600/50" />
        </div>
        {/* Overall progress bar */}
        <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full h-2 mt-3">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 transition-all duration-1000"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
              filter === cat.key
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Show unlocked first, then locked */}
        {[...filtered].sort((a, b) => {
          if (a.check && !b.check) return -1;
          if (!a.check && b.check) return 1;
          return 0;
        }).map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isNew={newlyUnlocked.has(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPanel;
