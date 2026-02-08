// ═══════════════════════════════════════════════════════════
// QUEST TAB — Daily tasks, timers, combat encounters
// Phase 2 will implement full functionality
// ═══════════════════════════════════════════════════════════

import { Sword } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';
import { GAME_CONSTANTS } from '@/lib/gameConstants';

const QuestTab = () => {
  const { currentDay, hasStarted, tasks, log } = useGameState();
  const dayInfo = GAME_CONSTANTS.DAY_NAMES[(currentDay - 1) % 7];

  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-red-900/40">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-2xl font-fantasy-decorative text-red-400 tracking-wider drop-shadow-[0_0_12px_rgba(220,38,38,0.3)]">
          {dayInfo.name}
        </h2>
        <p className="text-gray-200 text-sm italic font-fantasy mt-1">"{dayInfo.theme}"</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-red-600/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-600/25 to-transparent" />
      </div>

      <div className="px-6 py-5">
        {!hasStarted ? (
          <div className="text-center py-12">
            <Sword size={48} className="mx-auto text-red-500/40 mb-4" />
            <p className="text-gray-200 font-fantasy tracking-wide mb-2">The day awaits...</p>
            <p className="text-xs text-gray-400 font-fantasy">
              Start Day functionality coming in Phase 2
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Task list placeholder */}
            {tasks.length === 0 ? (
              <div className="text-center py-8 bg-black/30 rounded-lg border border-red-900/20">
                <p className="text-gray-200 font-fantasy">No quests assigned...</p>
                <p className="text-xs text-gray-400 font-fantasy mt-1">Task management coming in Phase 2</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`rounded-lg p-3 border transition-all ${
                      task.done
                        ? 'bg-green-950/30 border-green-800/30 opacity-60'
                        : task.overdue
                        ? 'bg-red-950/30 border-red-700/30'
                        : 'bg-black/30 border-gray-800/20'
                    }`}
                  >
                    <p className={`text-sm font-fantasy ${task.done ? 'line-through text-gray-400' : 'text-white/90'}`}>
                      {task.done && '✓ '}{task.title}
                    </p>
                    <p className="text-[10px] text-gray-400 font-fantasy mt-0.5">
                      {task.priority} priority
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chronicle */}
        {log.length > 0 && (
          <div className="mt-5 bg-black/30 rounded-lg p-4 border border-gray-800/20">
            <h3 className="text-xs font-fantasy tracking-[0.2em] text-yellow-500 uppercase mb-3">Chronicle</h3>
            <div className="space-y-1">
              {log.map((entry, i) => (
                <p key={i} className="text-xs text-gray-300 font-fantasy">• {entry}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestTab;
