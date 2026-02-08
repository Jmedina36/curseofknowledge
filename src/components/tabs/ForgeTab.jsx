// ═══════════════════════════════════════════════════════════
// FORGE TAB — Flashcard decks and study tools
// Phase 4 will implement full functionality
// ═══════════════════════════════════════════════════════════

import { useGameState } from '@/contexts/GameStateContext';

const ForgeTab = () => {
  const { flashcardDecks } = useGameState();

  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-purple-900/40">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-2xl font-fantasy-decorative text-purple-400 tracking-wider drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          Knowledge Forge
        </h2>
        <p className="text-gray-200 text-sm italic font-fantasy mt-1">"Sharpen your mind, temper your wisdom..."</p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-600/25 to-transparent" />
        <div className="w-1.5 h-1.5 rotate-45 bg-purple-600/30" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-600/25 to-transparent" />
      </div>

      <div className="px-6 py-5">
        <div className="flex justify-between items-center mb-5">
          <p className="text-sm text-gray-300 font-fantasy tracking-wide">
            Your Decks: <span className="font-bold text-purple-400">{flashcardDecks.length}</span>
          </p>
        </div>

        {flashcardDecks.length === 0 ? (
          <div className="text-center py-12 bg-black/30 rounded-lg border border-purple-900/20">
            <p className="text-gray-200 mb-2 font-fantasy">The forge stands empty...</p>
            <p className="text-xs text-gray-300 font-fantasy">Deck management coming in Phase 4</p>
          </div>
        ) : (
          <div className="space-y-3">
            {flashcardDecks.map((deck, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-4 border border-purple-800/25">
                <h3 className="text-lg font-fantasy tracking-wide text-purple-300">{deck.name}</h3>
                <p className="text-xs text-gray-200 font-fantasy">
                  {deck.cards.length} card{deck.cards.length !== 1 ? 's' : ''} •{' '}
                  {deck.cards.filter(c => c.mastered).length} mastered
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgeTab;
