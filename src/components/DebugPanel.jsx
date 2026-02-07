import { useState } from 'react';

const DebugSection = ({ title, children }) => (
  <div className="mb-3">
    <h4 className="text-sm font-semibold text-purple-200 mb-2">{title}</h4>
    {children}
  </div>
);

const DebugButton = ({ onClick, color = 'gray', className = '', children }) => {
  const colorMap = {
    orange: 'bg-orange-700 hover:bg-orange-600',
    green: 'bg-green-700 hover:bg-green-600',
    yellow: 'bg-yellow-700 hover:bg-yellow-600',
    purple: 'bg-purple-700 hover:bg-purple-600',
    red: 'bg-red-700 hover:bg-red-600',
    blue: 'bg-blue-700 hover:bg-blue-600',
    gray: 'bg-gray-700 hover:bg-gray-600',
    darkRed: 'bg-red-900 hover:bg-red-800',
    darkYellow: 'bg-yellow-800 hover:bg-yellow-700',
    darkPurple: 'bg-purple-800 hover:bg-purple-700',
  };
  return (
    <button
      onClick={onClick}
      className={`${colorMap[color] || colorMap.gray} px-3 py-2 rounded text-sm transition-all ${className}`}
    >
      {children}
    </button>
  );
};

const DebugPanel = ({
  // State values
  hero,
  currentDay,
  hp,
  stamina,
  xp,
  essence,
  level,
  skipCount,
  curseLevel,
  cleansePots,
  healthPots,
  staminaPots,
  weapon,
  armor,
  gauntletUnlocked,
  gauntletMilestone,
  consecutiveDays,
  miniBossCount,
  battleType,
  classes,
  // Setters
  setHp,
  setStamina,
  setXp,
  setEssence,
  setLevel,
  setHealthPots,
  setStaminaPots,
  setCleansePots,
  setWeapon,
  setArmor,
  setSkipCount,
  setCurseLevel,
  setConsecutiveDays,
  setGauntletUnlocked,
  setGauntletMilestone,
  setHero,
  setLog,
  setGraveyard,
  setHeroes,
  setStudyStats,
  setCalendarTasks,
  setWeeklyPlan,
  setCurrentDay,
  setHasStarted,
  setCanCustomize,
  setTasks,
  setActiveTask,
  setTimer,
  setRunning,
  setShowPomodoro,
  setPomodoroTask,
  setShowBoss,
  setBattling,
  setLastPlayedDate,
  setMiniBossCount,
  setActiveTab,
  setWaveCount,
  setBattleType,
  // Functions
  getMaxHp,
  getMaxStamina,
  addLog,
  spawnRegularEnemy,
  spawnRandomMiniBoss,
  makeName,
  sfx,
  // Gauntlet spawn deps
  makeBossName,
  setBossName,
  setBossHp,
  setBossMax,
  setGauntletBaseHp,
  setBattleMode,
  setIsFinalBoss,
  setCanFlee,
  setVictoryLoot,
  setGauntletPhase,
  setInPhase1,
  setInPhase2,
  setInPhase3,
  setPhaseTransitioning,
  setPhase1TurnCounter,
  setPhase2TurnCounter,
  setPhase2DamageStacks,
  setPhase3TurnCounter,
  setLifeDrainCounter,
  setHasSpawnedPreviewAdd,
  setHasTriggeredPhase1Enrage,
  setTargetingAdds,
  setShadowAdds,
  setAoeWarning,
  setShowDodgeButton,
  setDodgeReady,
  setRecklessStacks,
  setEnragedTurns,
  setBossDebuffs,
  setEnemyDialogue,
  setPlayerTaunt,
  setEnemyTauntResponse,
  setShowTauntBoxes,
  setIsTauntAvailable,
  setHasTriggeredLowHpTaunt,
  setHasFled,
  // Constants
  GAME_CONSTANTS,
}) => {
  const [collapsed, setCollapsed] = useState({});

  const toggleSection = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SectionHeader = ({ id, title }) => (
    <button
      onClick={() => toggleSection(id)}
      className="flex items-center justify-between w-full text-sm font-semibold text-purple-200 mb-2 hover:text-purple-100 transition-colors"
    >
      <span>{title}</span>
      <span className="text-xs text-purple-400">{collapsed[id] ? '[+]' : '[-]'}</span>
    </button>
  );

  const spawnGauntletBoss = () => {
    setBattleType('final');
    const bossHealth = 300;
    const bossNameGenerated = makeBossName();
    setBossName(bossNameGenerated);
    setBossHp(bossHealth);
    setBossMax(bossHealth);
    setGauntletBaseHp(bossHealth);
    setShowBoss(true);
    setBattling(true);
    setBattleMode(true);
    sfx.playBattleStart('gauntlet');
    setIsFinalBoss(true);
    setCanFlee(false);
    setVictoryLoot([]);
    setGauntletPhase(1);
    setInPhase1(true);
    setInPhase2(false);
    setInPhase3(false);
    setPhaseTransitioning(false);
    setPhase1TurnCounter(0);
    setPhase2TurnCounter(0);
    setPhase2DamageStacks(0);
    setPhase3TurnCounter(0);
    setLifeDrainCounter(0);
    setHasSpawnedPreviewAdd(false);
    setHasTriggeredPhase1Enrage(false);
    setTargetingAdds(false);
    setShadowAdds([]);
    setAoeWarning(false);
    setShowDodgeButton(false);
    setDodgeReady(false);
    setRecklessStacks(0);
    setEnragedTurns(0);
    setBossDebuffs({ poisonTurns: 0, poisonDamage: 0, poisonedVulnerability: 0, marked: false, stunned: false });
    setEnemyDialogue('');
    setPlayerTaunt('');
    setEnemyTauntResponse('');
    setShowTauntBoxes(false);
    setIsTauntAvailable(false);
    setHasTriggeredLowHpTaunt(false);
    setHasFled(false);
    addLog(`DEBUG: ${bossNameGenerated} - THE UNDYING (Phase 1 of 3)`);
  };

  const fullReset = () => {
    if (window.confirm('FULL RESET - Delete EVERYTHING and start completely fresh? This cannot be undone!')) {
      const newHero = makeName();
      setHero(newHero);
      setCanCustomize(true);
      setCurrentDay(1);
      setHasStarted(false);
      setHp(GAME_CONSTANTS.MAX_HP);
      setStamina(GAME_CONSTANTS.MAX_STAMINA);
      setXp(0);
      setLevel(1);
      setHealthPots(0);
      setStaminaPots(0);
      setCleansePots(0);
      setWeapon(0);
      setArmor(0);
      setTasks([]);
      setActiveTask(null);
      setTimer(0);
      setRunning(false);
      setShowPomodoro(false);
      setPomodoroTask(null);
      setWeeklyPlan({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] });
      setCalendarTasks({});
      setShowBoss(false);
      setBattling(false);
      setLog([]);
      setGraveyard([]);
      setHeroes([]);
      setSkipCount(0);
      setConsecutiveDays(0);
      setLastPlayedDate(null);
      setMiniBossCount(0);
      setStudyStats({ totalMinutesToday: 0, totalMinutesWeek: 0, sessionsToday: 0, longestStreak: 0, currentStreak: 0, tasksCompletedToday: 0, deepWorkSessions: 0, earlyBirdDays: 0, perfectDays: 0, weeklyHistory: [] });
      localStorage.removeItem('fantasyStudyQuest');
      addLog('FULL RESET - Everything cleared!');
      setActiveTab('quest');
    }
  };

  return (
    <div className="bg-purple-950 bg-opacity-50 border border-purple-600/50 rounded-xl p-4 mb-6">
      <h3 className="text-lg font-bold text-purple-300 mb-4 text-center tracking-wide">Debug Panel</h3>

      {/* Stats & Resources */}
      <DebugSection title="">
        <SectionHeader id="stats" title="Stats and Resources" />
        {!collapsed.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <DebugButton color="orange" onClick={() => { setHp(30); addLog('Debug: HP set to 30'); }}>HP → 30</DebugButton>
            <DebugButton color="green" onClick={() => { setHp(getMaxHp()); addLog('Debug: Full heal'); }}>Full Heal</DebugButton>
            <DebugButton color="orange" onClick={() => { setStamina(10); addLog('Debug: Stamina set to 10'); }}>Stamina → 10</DebugButton>
            <DebugButton color="green" onClick={() => { setStamina(getMaxStamina()); addLog('Debug: Full stamina'); }}>Full Stamina</DebugButton>
            <DebugButton color="yellow" onClick={() => { setXp(x => x + 50); addLog('Debug: +50 XP'); }}>+50 XP</DebugButton>
            <DebugButton color="darkYellow" onClick={() => { setXp(x => x + 200); addLog('Debug: +200 XP'); }}>+200 XP</DebugButton>
            <DebugButton color="purple" onClick={() => { setEssence(e => e + 50); addLog('Debug: +50 Essence'); }}>+50 Essence</DebugButton>
            <DebugButton color="blue" onClick={() => { setLevel(l => l + 1); addLog('Debug: +1 Level'); }}>+1 Level</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Items & Equipment */}
      <DebugSection title="">
        <SectionHeader id="items" title="Items and Equipment" />
        {!collapsed.items && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <DebugButton color="green" onClick={() => { setHealthPots(h => h + 3); setStaminaPots(s => s + 3); addLog('Debug: +3 of each potion'); }}>+3 Potions (HP/SP)</DebugButton>
            <DebugButton color="purple" onClick={() => { setCleansePots(c => c + 1); addLog('Debug: +1 Cleanse Potion'); }}>+1 Cleanse Potion</DebugButton>
            <DebugButton color="blue" onClick={() => { setWeapon(w => w + 10); setArmor(a => a + 10); addLog('Debug: +10 weapon/armor'); }}>+10 Weapon/Armor</DebugButton>
            <DebugButton color="purple" onClick={() => { setWeapon(w => w + 50); setArmor(a => a + 50); addLog('Debug: +50 weapon/armor'); }}>+50 Weapon/Armor</DebugButton>
            <DebugButton color="gray" onClick={() => { setWeapon(0); setArmor(0); addLog('Debug: Gear stripped'); }}>Strip All Gear</DebugButton>
            <DebugButton color="gray" onClick={() => { setHealthPots(0); setStaminaPots(0); setCleansePots(0); addLog('Debug: Potions cleared'); }}>Clear All Potions</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Combat Encounters */}
      <DebugSection title="">
        <SectionHeader id="combat" title="Combat Encounters" />
        {!collapsed.combat && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <DebugButton color="orange" onClick={() => spawnRegularEnemy(false, 0, 1)}>Spawn Regular Enemy</DebugButton>
            <DebugButton color="red" onClick={() => {
              const numEnemies = Math.floor(Math.random() * 3) + 2;
              setWaveCount(numEnemies);
              addLog(`DEBUG WAVE: ${numEnemies} enemies`);
              spawnRegularEnemy(true, 1, numEnemies);
            }}>Spawn Wave (2-4)</DebugButton>
            <DebugButton color="red" onClick={() => {
              setBattleType('elite');
              spawnRandomMiniBoss(true);
            }}>Spawn Elite Boss</DebugButton>
            <DebugButton color="darkRed" onClick={spawnGauntletBoss}>Spawn Gauntlet Boss</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Progression & Mechanics */}
      <DebugSection title="">
        <SectionHeader id="progression" title="Progression and Mechanics" />
        {!collapsed.progression && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <DebugButton color="blue" onClick={() => {
              const currentIndex = classes.findIndex(c => c.name === hero.class.name);
              const nextIndex = (currentIndex + 1) % classes.length;
              setHero(prev => ({ ...prev, class: classes[nextIndex] }));
              addLog(`Debug: Changed to ${classes[nextIndex].name}`);
            }}>Cycle Class</DebugButton>
            <DebugButton color="darkRed" onClick={() => { setSkipCount(s => Math.min(3, s + 1)); addLog('Debug: +1 skip count'); }}>+1 Skip Count</DebugButton>
            <DebugButton color="green" onClick={() => { setSkipCount(0); addLog('Debug: Skips cleared'); }}>Clear Skips</DebugButton>
            <DebugButton color="green" onClick={() => { setConsecutiveDays(d => d + 1); addLog('Debug: +1 consecutive day'); }}>+1 Consecutive Day</DebugButton>
            <DebugButton color="purple" onClick={() => {
              setGauntletUnlocked(true);
              addLog('Debug: Gauntlet force-unlocked');
            }}>Unlock Gauntlet</DebugButton>
            <DebugButton color="gray" onClick={() => {
              setGauntletUnlocked(false);
              addLog('Debug: Gauntlet locked');
            }}>Lock Gauntlet</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Curse Level */}
      <DebugSection title="">
        <SectionHeader id="curse" title="Curse Level" />
        {!collapsed.curse && (
          <div className="grid grid-cols-4 gap-2">
            <DebugButton color="gray" onClick={() => { setCurseLevel(0); addLog('Debug: Curse cleared'); }}>Clear</DebugButton>
            <DebugButton color="darkPurple" onClick={() => { setCurseLevel(1); addLog('Debug: Cursed (Lvl 1)'); }}>Lvl 1</DebugButton>
            <DebugButton color="purple" onClick={() => { setCurseLevel(2); addLog('Debug: Deep Curse (Lvl 2)'); }}>Lvl 2</DebugButton>
            <DebugButton color="darkRed" onClick={() => { setCurseLevel(3); addLog('Debug: CONDEMNED (Lvl 3)'); }}>Lvl 3</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Sound Testing */}
      <DebugSection title="">
        <SectionHeader id="audio" title="Sound Testing" />
        {!collapsed.audio && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <DebugButton color="blue" onClick={() => sfx.playClick()}>UI Click</DebugButton>
            <DebugButton color="orange" onClick={() => sfx.playBattleStart('regular')}>Battle: Regular</DebugButton>
            <DebugButton color="red" onClick={() => sfx.playBattleStart('elite')}>Battle: Elite</DebugButton>
            <DebugButton color="darkRed" onClick={() => sfx.playBattleStart('gauntlet')}>Battle: Gauntlet</DebugButton>
            <DebugButton color="green" onClick={() => sfx.playHit()}>Hit SFX</DebugButton>
            <DebugButton color="yellow" onClick={() => sfx.playCrit()}>Crit SFX</DebugButton>
            <DebugButton color="purple" onClick={() => sfx.playDodge()}>Dodge SFX</DebugButton>
            <DebugButton color="gray" onClick={() => sfx.playVictory()}>Victory SFX</DebugButton>
          </div>
        )}
      </DebugSection>

      {/* Data Management */}
      <DebugSection title="">
        <SectionHeader id="data" title="Data Management" />
        {!collapsed.data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <DebugButton color="gray" onClick={() => { setLog([]); addLog('Debug: Chronicle cleared'); }}>Clear Chronicle</DebugButton>
              <DebugButton color="gray" onClick={() => { setGraveyard([]); setHeroes([]); addLog('Debug: Legacy tab cleared'); }}>Clear Legacy</DebugButton>
              <DebugButton color="purple" onClick={() => {
                if (window.confirm('Clear ALL achievements & history?')) {
                  setGraveyard([]); setHeroes([]);
                  setStudyStats({ totalMinutesToday: 0, totalMinutesWeek: 0, sessionsToday: 0, longestStreak: 0, currentStreak: 0, tasksCompletedToday: 0, deepWorkSessions: 0, earlyBirdDays: 0, perfectDays: 0, weeklyHistory: [] });
                  addLog('Debug: Achievements cleared');
                }
              }}>Clear Achievements</DebugButton>
              <DebugButton color="green" onClick={() => {
                if (window.confirm('Clear all calendar tasks?')) { setCalendarTasks({}); addLog('Debug: Calendar cleared'); }
              }}>Clear Calendar</DebugButton>
              <DebugButton color="blue" onClick={() => {
                if (window.confirm('Clear weekly planner?')) {
                  setWeeklyPlan({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] });
                  addLog('Debug: Planner cleared');
                }
              }}>Clear Planner</DebugButton>
              <DebugButton color="orange" onClick={() => {
                localStorage.removeItem('fantasyStudyQuest');
                alert('LocalStorage cleared! Refresh the page to start fresh.');
              }}>Clear LocalStorage</DebugButton>
            </div>
            <button
              onClick={fullReset}
              className="w-full mt-3 bg-red-900 hover:bg-red-800 px-4 py-3 rounded text-sm font-bold transition-all border border-red-500"
            >
              FULL RESET - Delete Everything
            </button>
          </>
        )}
      </DebugSection>

      {/* Status Line */}
      <p className="text-xs text-gray-400 mt-3 italic border-t border-purple-800/50 pt-3">
        {hero?.class?.name} | Day {currentDay} | Lvl {level} | HP {hp} | SP {stamina} | XP {xp} | Essence {essence} | Skips {skipCount} | Curse {curseLevel} | Streak {consecutiveDays}d | Gauntlet {gauntletUnlocked ? 'OPEN' : `locked (${gauntletMilestone} XP)`}
      </p>
    </div>
  );
};

export default DebugPanel;
