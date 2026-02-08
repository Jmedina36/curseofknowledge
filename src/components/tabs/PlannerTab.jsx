// ═══════════════════════════════════════════════════════════
// PLANNER TAB — Weekly schedule and monthly calendar
// Phase 4 will implement full functionality
// ═══════════════════════════════════════════════════════════

import { Calendar } from 'lucide-react';
import { useGameState } from '@/contexts/GameStateContext';

const PlannerTab = () => {
  const { weeklyPlan } = useGameState();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-blue-900/40">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-2xl font-fantasy-decorative text-blue-400 tracking-wider drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
          War Council
        </h2>
        <p className="text-gray-200 text-sm italic font-fantasy mt-1">"Plan your campaign, conquer the week..."</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600/25 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-blue-600/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600/25 to-transparent" />
      </div>

      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {days.map(day => {
            const items = weeklyPlan[day] || [];
            const isToday = day === todayName;
            return (
              <div
                key={day}
                className={`rounded-lg p-4 border transition-all ${
                  isToday
                    ? 'bg-blue-950/40 border-blue-600/40 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                    : 'bg-black/30 border-gray-800/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-fantasy text-sm tracking-wide ${isToday ? 'text-blue-300' : 'text-gray-200'}`}>
                    {day} {isToday && <span className="text-blue-400 text-[10px]">• Today</span>}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">{items.length} tasks</span>
                </div>
                {items.length > 0 ? (
                  <div className="space-y-1">
                    {items.map((item, i) => (
                      <p key={i} className={`text-xs ${item.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {item.completed ? '✓ ' : '• '}{item.title}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-gray-500 italic font-fantasy">No tasks planned</p>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4 font-fantasy italic">
          Full planner with add/edit/calendar coming in Phase 4
        </p>
      </div>
    </div>
  );
};

export default PlannerTab;
