// ═══════════════════════════════════════════════════════════
// GAME STATE CONTEXT — Curse of Knowledge
// Centralized game state with localStorage persistence
// ═══════════════════════════════════════════════════════════

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  GAME_CONSTANTS,
  HERO_TITLES,
  CLASSES,
  makeName,
  DEFAULT_STUDY_STATS,
  DEFAULT_WEEKLY_PLAN,
} from '@/lib/gameConstants';

const GameStateContext = createContext(null);

export const useGameState = () => {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error('useGameState must be used within GameStateProvider');
  return ctx;
};

const STORAGE_KEY = 'fantasyStudyQuest';

export const GameStateProvider = ({ children }) => {
  // ─── Hero ───
  const [hero, setHero] = useState(null);
  const [canCustomize, setCanCustomize] = useState(true);

  // ─── Day / Progression ───
  const [currentDay, setCurrentDay] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDayActive, setIsDayActive] = useState(false);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);
  const [lastRealDay, setLastRealDay] = useState(null);
  const [timeUntilMidnight, setTimeUntilMidnight] = useState('');

  // ─── Core Stats ───
  const [hp, setHp] = useState(GAME_CONSTANTS.MAX_HP);
  const [stamina, setStamina] = useState(GAME_CONSTANTS.MAX_STAMINA);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [essence, setEssence] = useState(0);

  // ─── Equipment ───
  const [weapon, setWeapon] = useState(0);
  const [armor, setArmor] = useState(0);
  const [healthPots, setHealthPots] = useState(0);
  const [staminaPots, setStaminaPots] = useState(0);
  const [cleansePots, setCleansePots] = useState(0);

  // ─── Tasks ───
  const [tasks, setTasks] = useState([]);

  // ─── Planner ───
  const [weeklyPlan, setWeeklyPlan] = useState(DEFAULT_WEEKLY_PLAN);
  const [calendarTasks, setCalendarTasks] = useState({});

  // ─── Study Tools ───
  const [flashcardDecks, setFlashcardDecks] = useState([]);

  // ─── Legacy / History ───
  const [graveyard, setGraveyard] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [log, setLog] = useState([]);

  // ─── Curse & Streaks ───
  const [skipCount, setSkipCount] = useState(0);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [curseLevel, setCurseLevel] = useState(0);
  const [eliteBossDefeatedToday, setEliteBossDefeatedToday] = useState(false);
  const [miniBossCount, setMiniBossCount] = useState(0);

  // ─── Gauntlet ───
  const [gauntletMilestone, setGauntletMilestone] = useState(1000);
  const [gauntletUnlocked, setGauntletUnlocked] = useState(false);

  // ─── Study Stats ───
  const [studyStats, setStudyStats] = useState(DEFAULT_STUDY_STATS);

  // ─── Navigation ───
  const [activeTab, setActiveTab] = useState('quest');

  // ─── Debug ───
  const [showDebug, setShowDebug] = useState(false);

  // ═══ Computed Values ═══
  const getMaxHp = useCallback(() => {
    const baseHp = GAME_CONSTANTS.MAX_HP + (currentDay - 1) * GAME_CONSTANTS.PLAYER_HP_PER_DAY;
    const levelBonus = level * 10;
    return baseHp + levelBonus;
  }, [currentDay, level]);

  const getMaxStamina = useCallback(() => {
    return GAME_CONSTANTS.MAX_STAMINA + (currentDay - 1) * GAME_CONSTANTS.PLAYER_SP_PER_DAY;
  }, [currentDay]);

  const getBaseAttack = useCallback(() => {
    return GAME_CONSTANTS.BASE_ATTACK + (currentDay - 1) * GAME_CONSTANTS.PLAYER_ATK_PER_DAY;
  }, [currentDay]);

  const getBaseDefense = useCallback(() => {
    return GAME_CONSTANTS.BASE_DEFENSE + (currentDay - 1) * GAME_CONSTANTS.PLAYER_DEF_PER_DAY;
  }, [currentDay]);

  const getXpProgress = useCallback(() => {
    let xpSpent = 0;
    for (let i = 1; i < level; i++) {
      xpSpent += Math.floor(GAME_CONSTANTS.XP_PER_LEVEL * Math.pow(1.3, i - 1));
    }
    const currentLevelXp = xp - xpSpent;
    const xpNeeded = Math.floor(GAME_CONSTANTS.XP_PER_LEVEL * Math.pow(1.3, level - 1));
    return { current: currentLevelXp, needed: xpNeeded, remaining: xpNeeded - currentLevelXp };
  }, [xp, level]);

  // ═══ Core Actions ═══
  const addLog = useCallback((msg) => {
    setLog(prev => [...prev, msg].slice(-GAME_CONSTANTS.LOG_MAX_ENTRIES));
  }, []);

  const die = useCallback(() => {
    if (hp === GAME_CONSTANTS.MAX_HP && currentDay === 1 && level === 1) return;

    const completedTasks = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;

    setGraveyard(prev => [...prev, {
      ...hero,
      day: currentDay,
      lvl: level,
      xp: xp,
      tasks: completedTasks,
      total: totalTasks,
      skipCount: skipCount,
    }]);

    addLog('You have fallen...');

    const newHero = makeName();
    setHero(newHero);
    setCanCustomize(true);
    setCurrentDay(1);
    setHp(GAME_CONSTANTS.MAX_HP);
    setStamina(GAME_CONSTANTS.MAX_STAMINA);
    setXp(0);
    setLevel(1);
    setHealthPots(0);
    setStaminaPots(0);
    setCleansePots(0);
    setWeapon(0);
    setArmor(0);
    setStudyStats(prev => ({
      totalMinutesToday: 0,
      totalMinutesWeek: 0,
      sessionsToday: 0,
      longestStreak: prev.longestStreak,
      currentStreak: 0,
      tasksCompletedToday: 0,
      deepWorkSessions: 0,
      earlyBirdDays: prev.earlyBirdDays,
      perfectDays: prev.perfectDays,
      weeklyHistory: [],
    }));
    setTasks([]);
    setHasStarted(false);
    setSkipCount(0);
    setConsecutiveDays(0);
    setLastPlayedDate(null);
    setMiniBossCount(0);

    setTimeout(() => setActiveTab('legacy'), 1000);
  }, [hero, currentDay, level, xp, hp, tasks, skipCount, addLog]);

  // ═══ localStorage Load ═══
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.hero) setHero(data.hero);
        if (data.currentDay) setCurrentDay(data.currentDay);
        if (data.hasStarted !== undefined) setHasStarted(data.hasStarted);
        if (data.isDayActive !== undefined) setIsDayActive(data.isDayActive);
        if (data.hp !== undefined) setHp(data.hp);
        if (data.stamina !== undefined) setStamina(data.stamina);
        if (data.xp !== undefined) setXp(data.xp);
        if (data.level !== undefined) setLevel(data.level);
        if (data.essence !== undefined) setEssence(data.essence);
        if (data.weapon !== undefined) setWeapon(data.weapon);
        if (data.armor !== undefined) setArmor(data.armor);
        if (data.healthPots !== undefined) setHealthPots(data.healthPots);
        if (data.staminaPots !== undefined) setStaminaPots(data.staminaPots);
        if (data.cleansePots !== undefined) setCleansePots(data.cleansePots);
        if (data.tasks) setTasks(data.tasks);
        if (data.weeklyPlan) setWeeklyPlan(data.weeklyPlan);
        if (data.calendarTasks) setCalendarTasks(data.calendarTasks);
        if (data.flashcardDecks) setFlashcardDecks(data.flashcardDecks);
        if (data.graveyard) setGraveyard(data.graveyard);
        if (data.heroes) setHeroes(data.heroes);
        if (data.skipCount !== undefined) setSkipCount(data.skipCount);
        if (data.consecutiveDays !== undefined) setConsecutiveDays(data.consecutiveDays);
        if (data.curseLevel !== undefined) setCurseLevel(data.curseLevel);
        if (data.eliteBossDefeatedToday !== undefined) setEliteBossDefeatedToday(data.eliteBossDefeatedToday);
        if (data.lastPlayedDate) setLastPlayedDate(data.lastPlayedDate);
        if (data.lastRealDay) setLastRealDay(data.lastRealDay);
        if (data.gauntletMilestone !== undefined) setGauntletMilestone(data.gauntletMilestone);
        if (data.gauntletUnlocked !== undefined) setGauntletUnlocked(data.gauntletUnlocked);
        if (data.studyStats) setStudyStats(data.studyStats);
      } catch (e) {
        console.error('Failed to load save:', e);
        setHero(makeName());
      }
    } else {
      setHero(makeName());
    }
  }, []);

  // ═══ localStorage Save ═══
  useEffect(() => {
    if (!hero) return;
    const saveData = {
      hero, currentDay, hp, stamina, xp, essence, level,
      healthPots, staminaPots, cleansePots, weapon, armor,
      tasks, flashcardDecks, graveyard, heroes, hasStarted,
      skipCount, consecutiveDays, lastPlayedDate, curseLevel,
      eliteBossDefeatedToday, lastRealDay, studyStats,
      weeklyPlan, calendarTasks, gauntletMilestone, gauntletUnlocked,
      isDayActive,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
  }, [
    hero, currentDay, hp, stamina, xp, essence, level,
    healthPots, staminaPots, cleansePots, weapon, armor,
    tasks, flashcardDecks, graveyard, heroes, hasStarted,
    skipCount, consecutiveDays, lastPlayedDate, curseLevel,
    eliteBossDefeatedToday, lastRealDay, studyStats,
    weeklyPlan, calendarTasks, gauntletMilestone, gauntletUnlocked,
    isDayActive,
  ]);

  // ═══ XP → Level Up ═══
  useEffect(() => {
    let xpNeeded = 0;
    let newLevel = 1;
    let currentXp = xp;

    while (currentXp >= xpNeeded) {
      xpNeeded = Math.floor(GAME_CONSTANTS.XP_PER_LEVEL * Math.pow(1.3, newLevel - 1));
      if (currentXp >= xpNeeded) {
        newLevel++;
        currentXp -= xpNeeded;
      } else {
        break;
      }
    }

    if (newLevel > level) {
      setLevel(newLevel);
      addLog(`LEVEL UP! Now level ${newLevel}`);
      setHp(h => Math.min(getMaxHp(), h + 20));
    }
  }, [xp, level, addLog, getMaxHp]);

  // ═══ Gauntlet Unlock Check ═══
  useEffect(() => {
    if (xp >= gauntletMilestone && !gauntletUnlocked) {
      setGauntletUnlocked(true);
      addLog('THE GAUNTLET UNLOCKED! Face the trial when ready...');
    }
  }, [xp, gauntletMilestone, gauntletUnlocked, addLog]);

  // ═══ Midnight Countdown ═══
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilMidnight(hours < 1 ? `${minutes}m ${seconds}s` : '');
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // ═══ Day Change Detection ═══
  useEffect(() => {
    const checkDayChange = () => {
      const today = new Date().toDateString();

      if (lastRealDay && lastRealDay !== today) {
        if (!isDayActive) {
          // Dormant day - no advancement
        } else {
          const nextDay = currentDay + 1;

          if (!eliteBossDefeatedToday) {
            addLog('ELITE BOSS LOCKED — Midnight passed, opportunity missed');
            const newCurseLevel = curseLevel + 1;
            setCurseLevel(newCurseLevel);

            if (newCurseLevel >= 4) {
              addLog('THE CURSE CONSUMES YOU. Four failures... the abyss claims your soul.');
              setTimeout(() => die(), 2000);
              return;
            }

            const cursePenalties = [
              { hp: 20, msg: 'CURSED. The curse takes root... -20 HP' },
              { hp: 40, msg: 'DEEPLY CURSED. The curse tightens its grip... -40 HP' },
              { hp: 60, msg: 'CONDEMNED. One more failure... and the abyss claims you. -60 HP' },
            ];
            const penalty = cursePenalties[newCurseLevel - 1];
            setHp(h => Math.max(1, h - penalty.hp));
            addLog(penalty.msg);
          } else {
            if (curseLevel > 0) {
              setCurseLevel(0);
              addLog("THE CURSE BREAKS! Yesterday's trial complete.");
            }
          }

          setEliteBossDefeatedToday(false);
          setCurrentDay(nextDay);
          setHero(prev => ({
            ...prev,
            day: nextDay,
            title: HERO_TITLES[(nextDay - 1) % HERO_TITLES.length],
            survived: prev.survived + 1,
          }));

          const completedCount = tasks.filter(t => t.done).length;
          const incompleteCount = tasks.filter(t => !t.done).length;
          setTasks(prevTasks =>
            prevTasks.filter(t => !t.done).map(t => ({ ...t, overdue: true }))
          );
          if (completedCount > 0) addLog(`Cleared ${completedCount} completed task${completedCount > 1 ? 's' : ''}`);
          if (incompleteCount > 0) addLog(`${incompleteCount} incomplete task${incompleteCount > 1 ? 's' : ''} marked OVERDUE`);
          addLog('MIDNIGHT PASSED — Day auto-advanced');
          addLog(`Now on Day ${nextDay} (Dormant)`);
          setIsDayActive(false);
        }
      }
      setLastRealDay(today);
    };

    checkDayChange();
    const interval = setInterval(checkDayChange, 60000);
    return () => clearInterval(interval);
  }, [lastRealDay, currentDay, eliteBossDefeatedToday, curseLevel, isDayActive, tasks, addLog, die]);

  // ═══ Context Value ═══
  const value = {
    // Hero
    hero, setHero, canCustomize, setCanCustomize,
    // Day
    currentDay, setCurrentDay, hasStarted, setHasStarted,
    isDayActive, setIsDayActive, lastPlayedDate, setLastPlayedDate,
    lastRealDay, setLastRealDay, timeUntilMidnight,
    // Stats
    hp, setHp, stamina, setStamina, xp, setXp,
    level, setLevel, essence, setEssence,
    // Equipment
    weapon, setWeapon, armor, setArmor,
    healthPots, setHealthPots, staminaPots, setStaminaPots,
    cleansePots, setCleansePots,
    // Tasks
    tasks, setTasks,
    // Planner
    weeklyPlan, setWeeklyPlan, calendarTasks, setCalendarTasks,
    // Study
    flashcardDecks, setFlashcardDecks,
    // Legacy
    graveyard, setGraveyard, heroes, setHeroes, log, setLog,
    // Curse & Streaks
    skipCount, setSkipCount, consecutiveDays, setConsecutiveDays,
    curseLevel, setCurseLevel,
    eliteBossDefeatedToday, setEliteBossDefeatedToday,
    miniBossCount, setMiniBossCount,
    // Gauntlet
    gauntletMilestone, setGauntletMilestone,
    gauntletUnlocked, setGauntletUnlocked,
    // Study Stats
    studyStats, setStudyStats,
    // Navigation
    activeTab, setActiveTab,
    // Debug
    showDebug, setShowDebug,
    // Computed
    getMaxHp, getMaxStamina, getBaseAttack, getBaseDefense, getXpProgress,
    // Actions
    addLog, die,
    // Constants access
    classes: CLASSES,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
