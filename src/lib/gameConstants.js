// ═══════════════════════════════════════════════════════════
// GAME CONSTANTS — Curse of Knowledge
// Core game configuration, class definitions, and dialogue
// ═══════════════════════════════════════════════════════════

export const GAME_CONSTANTS = {
  LATE_START_PENALTY: 15,
  LATE_START_HOUR: 8,
  MAX_HP: 100,
  MAX_STAMINA: 100,
  BASE_ATTACK: 25,
  BASE_DEFENSE: 8,
  PLAYER_HP_PER_DAY: 10,
  PLAYER_SP_PER_DAY: 8,
  PLAYER_ATK_PER_DAY: 2,
  PLAYER_DEF_PER_DAY: 2,
  HEALTH_POTION_HEAL: 30,
  STAMINA_POTION_RESTORE: 50,
  STAMINA_PER_TASK: 20,
  CLEANSE_POTION_COST: 100,
  LOOT_RATES: {
    HEALTH_POTION: 0.25,
    STAMINA_POTION: 0.50,
    WEAPON: 0.75,
    ARMOR: 1.00,
  },
  MINI_BOSS_LOOT_RATES: {
    HEALTH_POTION: 0.25,
    STAMINA_POTION: 0.50,
    WEAPON: 0.75,
    ARMOR: 1.00,
  },
  XP_REWARDS: {
    easy: 10,
    medium: 25,
    hard: 50,
    miniBoss: 50,
    finalBoss: 100,
  },
  XP_PER_LEVEL: 100,
  XP_MULTIPLIERS: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  DAY_NAMES: [
    { name: 'Moonday', subtitle: 'Day of Beginnings', theme: 'A new cycle begins...' },
    { name: 'Tideday', subtitle: 'Day of Flow', theme: 'The curse stirs...' },
    { name: 'Fireday', subtitle: 'Day of Trials', theme: 'The pressure mounts...' },
    { name: 'Thornday', subtitle: 'Day of Struggle', theme: 'Darkness deepens...' },
    { name: 'Voidday', subtitle: 'Day of Despair', theme: 'The abyss beckons...' },
    { name: 'Doomday', subtitle: 'Day of Reckoning', theme: 'Almost there... or almost consumed?' },
    { name: 'Endday', subtitle: 'Day of Liberation', theme: 'Today you break free or die trying.' },
  ],
  MINI_BOSS_BASE: 150,
  MINI_BOSS_DAY_SCALING: 50,
  MINI_BOSS_ATK_BASE: 12,
  MINI_BOSS_ATK_SCALING: 2.0,
  FINAL_BOSS_BASE: 500,
  FINAL_BOSS_DAY_SCALING: 100,
  BOSS_ATTACK_BASE: 15,
  BOSS_ATTACK_DAY_SCALING: 2.8,
  BOSS_ATTACK_DELAY: 1000,
  LOG_MAX_ENTRIES: 8,
  SKIP_PENALTIES: [
    { hp: 20, message: 'The curse festers... -20 HP', levelLoss: 0, equipmentDebuff: 0, cursed: false },
    { hp: 30, message: 'The curse tightens its grip... -30 HP, -1 Level, Equipment weakened', levelLoss: 1, equipmentDebuff: 0.25, cursed: false },
    { hp: 50, message: 'YOU ARE CURSED. The abyss consumes you... -50 HP', levelLoss: 0, equipmentDebuff: 0, cursed: true },
    { hp: 0, message: 'YOU DIED. The curse has claimed your soul.', levelLoss: 0, equipmentDebuff: 0, death: true },
  ],
  SKIP_REDEMPTION_DAYS: 3,
  MAX_SKIPS_BEFORE_DEATH: 4,
  TOTAL_DAYS: 7,
  PRIORITY_XP_MULTIPLIERS: {
    urgent: 1.5,
    important: 1.25,
    routine: 1.0,
  },
  EARLY_BIRD_BONUS: 20,
  DEEP_WORK_BONUS: 30,
  PERFECT_DAY_BONUS: 50,
  SPECIAL_ATTACKS: {
    Warrior: { name: 'Reckless Strike', cost: 30, hpCost: 15, damageMultiplier: 4.0, effect: 'Massive damage but costs HP. Scales with level' },
    Mage: { name: 'Arcane Blast', cost: 40, damageMultiplier: 3.0, effect: 'Boss stunned - no counter-attack. Scales with level' },
    Rogue: { name: "Venom's Ruin", cost: 30, damageMultiplier: 1.6, effect: 'Scaling poison + 15% vulnerability on all attacks' },
    Paladin: { name: 'Divine Smite', cost: 30, damageMultiplier: 3.0, effect: 'Heals 20 + 10% max HP. Scales with level' },
    Ranger: { name: 'Marked Shot', cost: 35, damageMultiplier: 1.8, effect: '+35% damage on next attack. Scales with level' },
  },
};

export const HERO_TITLES = ['Novice', 'Seeker', 'Wanderer', 'Survivor', 'Warrior', 'Champion', 'Legend'];

export const CLASSES = [
  { name: 'Warrior', color: 'red', emblem: '⚔︎', gradient: ['from-red-900', 'from-red-800', 'from-red-700', 'from-red-600'], glow: ['shadow-red-900/50', 'shadow-red-700/60', 'shadow-red-600/70', 'shadow-red-500/80'] },
  { name: 'Mage', color: 'purple', emblem: '✦', gradient: ['from-purple-900', 'from-purple-800', 'from-purple-700', 'from-purple-600'], glow: ['shadow-purple-900/50', 'shadow-purple-700/60', 'shadow-purple-600/70', 'shadow-purple-500/80'] },
  { name: 'Rogue', color: 'emerald', emblem: '†', gradient: ['from-emerald-950', 'from-emerald-900', 'from-emerald-800', 'from-emerald-700'], glow: ['shadow-emerald-900/50', 'shadow-emerald-800/60', 'shadow-emerald-700/70', 'shadow-emerald-600/80'] },
  { name: 'Paladin', color: 'yellow', emblem: '✙', gradient: ['from-yellow-900', 'from-yellow-800', 'from-yellow-700', 'from-yellow-600'], glow: ['shadow-yellow-900/50', 'shadow-yellow-700/60', 'shadow-yellow-600/70', 'shadow-yellow-500/80'] },
  { name: 'Ranger', color: 'teal', emblem: '➶', gradient: ['from-teal-950', 'from-teal-900', 'from-teal-800', 'from-teal-700'], glow: ['shadow-teal-900/50', 'shadow-teal-800/60', 'shadow-teal-700/70', 'shadow-teal-600/80'] },
];

export const HERO_NAMES = {
  male: ['Azrael', 'Godfrey', 'Cyrus', 'Aldric', 'Roderick', 'Lancelot'],
  female: ['Elizabeth', 'Seraphina', 'Minerva', 'Aria', 'Eve', 'Maria', 'Michelle'],
};

export const HERO_LAST_NAMES = ['Ironheart', 'Stormborn', 'Lightbringer', 'Shadowend', 'Dawnseeker'];

export const BOSS_FIRST_NAMES = ['Malakar', 'Zarathos', 'Lilith', 'Nyxen', 'Azazel', 'Alastor', 'Barbatos', 'Furcas', 'Moloch', 'Xaphan'];
export const BOSS_LAST_NAMES = ['the Kind', 'the Blind', 'Deathbringer', 'the Wretched', 'the Fallen Angel', 'Rotten', 'Void Walker', 'the Forgotten', 'the Holy', 'Dread Lord', 'the Forsaken', 'the Tormentor'];

// ─── Card styling logic ───
const CARD_BORDER_WIDTHS = ['3px solid', '3px solid', '3px solid', '4px solid', '4px solid', '5px solid', '5px solid'];
const CARD_BORDER_COLORS = {
  red: ['#8B0000', '#8B0000', '#B22222', '#DC143C', '#DC143C', '#FF4500', '#FF4500'],
  purple: ['#4B0082', '#4B0082', '#6A0DAD', '#8B008B', '#8B008B', '#9370DB', '#9370DB'],
  emerald: ['#022c22', '#022c22', '#064e3b', '#065f46', '#065f46', '#059669', '#059669'],
  yellow: ['#B8860B', '#B8860B', '#DAA520', '#FFD700', '#FFD700', '#FFEC8B', '#FFEC8B'],
  teal: ['#042f2e', '#042f2e', '#115e59', '#0f766e', '#0f766e', '#14b8a6', '#14b8a6'],
};
const CARD_TO_COLORS = {
  red: ['to-red-800', 'to-red-800', 'to-red-700', 'to-red-600', 'to-red-600', 'to-orange-500', 'to-orange-500'],
  purple: ['to-purple-800', 'to-purple-800', 'to-purple-700', 'to-indigo-600', 'to-indigo-600', 'to-pink-500', 'to-pink-500'],
  emerald: ['to-emerald-800', 'to-emerald-800', 'to-emerald-700', 'to-emerald-600', 'to-emerald-600', 'to-green-500', 'to-green-500'],
  yellow: ['to-yellow-800', 'to-yellow-800', 'to-yellow-700', 'to-amber-600', 'to-amber-600', 'to-orange-400', 'to-orange-400'],
  teal: ['to-teal-800', 'to-teal-800', 'to-teal-700', 'to-teal-600', 'to-teal-600', 'to-cyan-500', 'to-cyan-500'],
};

export const getCardStyle = (heroClass, day) => {
  const d = day - 1;
  const pulse = day === 7 ? ' animate-pulse' : '';
  const colorKey = heroClass.color === 'green' ? 'emerald' : heroClass.color === 'amber' ? 'teal' : heroClass.color;

  return {
    border: `${CARD_BORDER_WIDTHS[d]} ${(CARD_BORDER_COLORS[colorKey] || CARD_BORDER_COLORS.red)[d]}`,
    bg: `${heroClass.gradient[Math.min(d, 3)]} ${(CARD_TO_COLORS[colorKey] || CARD_TO_COLORS.red)[d]}`,
    glow: `shadow-xl ${heroClass.glow[Math.min(d, 3)]}${pulse}`,
    emblem: heroClass.emblem,
  };
};

// ─── Hero generation helpers ───
export const makeName = () => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const heroClass = CLASSES[Math.floor(Math.random() * CLASSES.length)];
  const first = HERO_NAMES[gender][Math.floor(Math.random() * HERO_NAMES[gender].length)];
  const last = HERO_LAST_NAMES[Math.floor(Math.random() * HERO_LAST_NAMES.length)];
  return {
    name: `${first} ${last}`,
    gender,
    title: HERO_TITLES[0],
    day: 1,
    survived: 0,
    class: heroClass,
  };
};

export const makeBossName = () => {
  const first = BOSS_FIRST_NAMES[Math.floor(Math.random() * BOSS_FIRST_NAMES.length)];
  const last = BOSS_LAST_NAMES[Math.floor(Math.random() * BOSS_LAST_NAMES.length)];
  return `${first} ${last}`;
};

// ─── Default state values ───
export const DEFAULT_STUDY_STATS = {
  totalMinutesToday: 0,
  totalMinutesWeek: 0,
  sessionsToday: 0,
  longestStreak: 0,
  currentStreak: 0,
  tasksCompletedToday: 0,
  deepWorkSessions: 0,
  earlyBirdDays: 0,
  perfectDays: 0,
  weeklyHistory: [],
};

export const DEFAULT_WEEKLY_PLAN = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};
