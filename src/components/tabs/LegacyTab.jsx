// ═══════════════════════════════════════════════════════════
// LEGACY TAB — Fallen heroes and liberated champions
// Phase 4 will implement full functionality
// ═══════════════════════════════════════════════════════════

import { useGameState } from '@/contexts/GameStateContext';
import ClassEmblem from '@/components/ClassEmblem';

const LegacyTab = () => {
  const { graveyard, heroes } = useGameState();

  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-gray-700/40">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-2xl font-fantasy-decorative text-gray-300 tracking-wider drop-shadow-[0_0_12px_rgba(156,163,175,0.3)]">
          Hall of Echoes
        </h2>
        <p className="text-gray-400 text-sm italic font-fantasy mt-1">"Those who came before..."</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/25 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-gray-600/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/25 to-transparent" />
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Liberated Heroes */}
        {heroes.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-600/20" />
              <h3 className="text-xs font-fantasy tracking-[0.2em] text-green-400 uppercase">Liberated</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-600/20" />
            </div>
            <div className="space-y-2">
              {heroes.map((h, i) => (
                <div key={i} className="bg-green-950/20 rounded-lg p-3 border border-green-800/20 flex items-center gap-3">
                  <ClassEmblem heroClass={h.class?.name || 'Warrior'} size={32} />
                  <div>
                    <p className="text-sm text-green-200 font-fantasy">{h.name}</p>
                    <p className="text-[10px] text-green-400/80">
                      {h.class?.name || 'Unknown'} • Level {h.lvl || h.level || '?'} • {h.tasks || 0}/{h.total || 0} tasks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graveyard */}
        {graveyard.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-red-600/20" />
              <h3 className="text-xs font-fantasy tracking-[0.2em] text-red-400 uppercase">Fallen</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-red-600/20" />
            </div>
            <div className="space-y-2">
              {graveyard.map((h, i) => (
                <div key={i} className="bg-red-950/20 rounded-lg p-3 border border-red-800/20 flex items-center gap-3">
                  <ClassEmblem heroClass={h.class?.name || 'Warrior'} size={32} />
                  <div>
                    <p className="text-sm text-red-200 font-fantasy">{h.name}</p>
                    <p className="text-[10px] text-red-400/80">
                      {h.class?.name || 'Unknown'} • Day {h.day || '?'} • Level {h.lvl || '?'} • {h.skipCount || 0} skips
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {heroes.length === 0 && graveyard.length === 0 && (
          <div className="text-center py-12 bg-black/30 rounded-lg border border-gray-800/20">
            <p className="text-gray-200 font-fantasy mb-2">The hall stands silent...</p>
            <p className="text-xs text-gray-400 font-fantasy">No heroes have yet passed through these gates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegacyTab;
