// ═══════════════════════════════════════════════════════════
// APP SHELL — Background, title, navigation, content area
// ═══════════════════════════════════════════════════════════

import { Sword, Calendar, Skull, Trophy } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';
import useGameSFX from '@/hooks/useGameSFX';
import HeroCard from '@/components/hero/HeroCard';
import QuestTab from '@/components/tabs/QuestTab';
import PlannerTab from '@/components/tabs/PlannerTab';
import ForgeTab from '@/components/tabs/ForgeTab';
import ProgressTab from '@/components/tabs/ProgressTab';
import LegacyTab from '@/components/tabs/LegacyTab';

const NAV_TABS = [
  { id: 'quest', icon: Sword, label: 'Quests' },
  { id: 'planner', icon: Calendar, label: 'Planner' },
  { id: 'study', icon: Calendar, label: 'Forge' },
  { id: 'legacy', icon: Skull, label: 'Legacy' },
  { id: 'progress', icon: Trophy, label: 'Progress' },
];

const TAB_COMPONENTS = {
  quest: QuestTab,
  planner: PlannerTab,
  study: ForgeTab,
  legacy: LegacyTab,
  progress: ProgressTab,
};

const AppShell = () => {
  const { hero, curseLevel, activeTab, setActiveTab, showDebug, setShowDebug } = useGameState();
  const sfx = useGameSFX();

  if (!hero) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl font-fantasy-decorative tracking-wider text-red-400 animate-pulse">
          Loading your fate...
        </div>
      </div>
    );
  }

  const ActiveTabComponent = TAB_COMPONENTS[activeTab] || QuestTab;

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-hidden ${
      curseLevel === 3 ? 'border-8 border-red-600 animate-pulse' : ''
    }`}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-black to-purple-950 opacity-60" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-80" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(75, 0, 130, 0.1) 0%, transparent 50%)',
          animation: 'pulse-glow 8s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto rounded-xl transition-all">
          {/* Header */}
          <header className="text-center mb-8">
            {/* Top flourish */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/50" />
              <span className="text-amber-500/60 text-xs font-fantasy tracking-[0.3em]">⚜ ━━━ ⚜</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/50" />
            </div>

            <h1
              className="text-5xl md:text-6xl font-black mb-2 tracking-wider font-fantasy-decorative title-reveal bg-gradient-to-b from-red-300 via-red-500 to-red-800 bg-clip-text text-transparent cursor-pointer"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6)) drop-shadow(0 0 40px rgba(139, 0, 0, 0.3))',
                letterSpacing: '0.15em',
              }}
              onClick={() => setShowDebug(prev => !prev)}
            >
              CURSE OF KNOWLEDGE
            </h1>

            {/* Red divider */}
            <div className="flex items-center justify-center gap-3 mt-1 mb-3">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-700/40 to-transparent" />
              <span className="text-red-600/50 text-[10px]">◆</span>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-700/40 to-transparent" />
            </div>

            <p className="text-gray-300 text-sm mb-4 italic font-fantasy tracking-wide">
              "Study or be consumed by the abyss..."
            </p>

            {/* Hero Card */}
            <HeroCard />
          </header>

          {/* Navigation */}
          <nav className="mb-6">
            <div className="flex items-center gap-3 mb-3 px-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
              <span className="text-yellow-500 text-xs font-fantasy tracking-[0.3em] uppercase">Navigation</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
            </div>

            <div className="flex gap-1.5 justify-center flex-wrap px-2">
              {NAV_TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => { sfx.playClick(); setActiveTab(t.id); }}
                  className={`group relative flex flex-col items-center gap-1 px-5 py-2.5 rounded-lg transition-all duration-300 font-fantasy text-sm tracking-wide ${
                    activeTab === t.id
                      ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-700/10 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.15)] border border-yellow-500/40'
                      : 'bg-black/40 text-yellow-200/70 hover:text-yellow-200 hover:bg-black/60 border border-transparent hover:border-yellow-900/30'
                  }`}
                >
                  {activeTab === t.id && (
                    <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  )}
                  <t.icon
                    size={18}
                    className={`transition-all duration-300 ${
                      activeTab === t.id ? 'drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]' : 'opacity-60 group-hover:opacity-80'
                    }`}
                  />
                  <span className={`transition-all duration-300 ${activeTab === t.id ? 'text-yellow-300' : ''}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-3 px-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent" />
              <div className="w-1.5 h-1.5 rotate-45 bg-yellow-600/30" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent" />
            </div>
          </nav>

          {/* Active Tab Content */}
          <ActiveTabComponent />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
