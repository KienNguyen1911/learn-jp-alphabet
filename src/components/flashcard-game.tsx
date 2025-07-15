import React, { useState } from "react";
import { FlipCard } from "@/components/flip-card";

// Flashcard type
export type Flashcard = { hira: string; romaji: string };

interface FlashcardGameProps {
  hiraganaFlat: Flashcard[];
  onClose: () => void;
}

export function FlashcardGame({ hiraganaFlat, onClose }: FlashcardGameProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [shownHiragana, setShownHiragana] = useState<string[]>([]);
  const [showRomaji, setShowRomaji] = useState(true);

  function getRandomFlashcards(arr: Flashcard[], count: number): Flashcard[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  React.useEffect(() => {
    // Pick first 5 random hiragana
    const firstBatch = getRandomFlashcards(hiraganaFlat, 5);
    setFlashcards(firstBatch);
    setShownHiragana(firstBatch.map(card => card.hira));
  }, [hiraganaFlat]);

  const nextBatch = () => {
    const remaining = hiraganaFlat.filter(card => !shownHiragana.includes(card.hira));
    if (remaining.length === 0) return;
    const batch = getRandomFlashcards(remaining, Math.min(5, remaining.length));
    setFlashcards(batch);
    setShownHiragana(prev => [...prev, ...batch.map(card => card.hira)]);
  };

  const total = shownHiragana.length;
  const finished = flashcards.length === 0 || shownHiragana.length === hiraganaFlat.length;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowRomaji((v) => !v)}
        >
          {showRomaji ? "Show Hiragana" : "Show Romaji"}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {!finished ? (
        <>
          <div className="grid grid-cols-5 gap-4 w-full max-w-2xl mx-auto">
            {flashcards.map((card) => (
              <div key={card.hira} className="flex flex-col items-center gap-2">
                <div className="w-20 h-28 mb-2">
                  <FlipCard
                    front={<span className="text-4xl flex items-center justify-center h-full">{showRomaji ? card.romaji : card.hira}</span>}
                    back={<span className="text-xl flex items-center justify-center h-full">{showRomaji ? card.hira : card.romaji}</span>}
                    className=""
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full max-w-md"
            onClick={nextBatch}
          >
            Next
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <h2 className="text-2xl font-bold">Game Finished!</h2>
          <div className="text-lg">All hiragana have been shown.</div>
          <div className="text-lg">Total flashcards: {total}</div>
          <button
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
