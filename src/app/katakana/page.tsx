"use client";

import { FlipCard } from "@/components/flip-card";
import { FlashcardGame } from "@/components/flashcard-game";
import { GlowingEffect } from "@/components/glowing-effect";
import React, { useState } from "react";

const katakanaRows = [
  [
    { kata: "ア", romaji: "a", hira: "" },
    { kata: "イ", romaji: "i", hira: "" },
    { kata: "ウ", romaji: "u", hira: "" },
    { kata: "エ", romaji: "e", hira: "" },
    { kata: "オ", romaji: "o", hira: "" },
  ],
  [
    { kata: "カ", romaji: "ka", hira: "" },
    { kata: "キ", romaji: "ki", hira: "" },
    { kata: "ク", romaji: "ku", hira: "" },
    { kata: "ケ", romaji: "ke", hira: "" },
    { kata: "コ", romaji: "ko", hira: "" },
  ],
  [
    { kata: "サ", romaji: "sa", hira: "" },
    { kata: "シ", romaji: "shi", hira: "" },
    { kata: "ス", romaji: "su", hira: "" },
    { kata: "セ", romaji: "se", hira: "" },
    { kata: "ソ", romaji: "so", hira: "" },
  ],
  [
    { kata: "タ", romaji: "ta", hira: "" },
    { kata: "チ", romaji: "chi", hira: "" },
    { kata: "ツ", romaji: "tsu", hira: "" },
    { kata: "テ", romaji: "te", hira: "" },
    { kata: "ト", romaji: "to", hira: "" },
  ],
  [
    { kata: "ナ", romaji: "na", hira: "" },
    { kata: "ニ", romaji: "ni", hira: "" },
    { kata: "ヌ", romaji: "nu", hira: "" },
    { kata: "ネ", romaji: "ne", hira: "" },
    { kata: "ノ", romaji: "no", hira: "" },
  ],
  [
    { kata: "ハ", romaji: "ha", hira: "" },
    { kata: "ヒ", romaji: "hi", hira: "" },
    { kata: "フ", romaji: "fu", hira: "" },
    { kata: "ヘ", romaji: "he", hira: "" },
    { kata: "ホ", romaji: "ho", hira: "" },
  ],
  [
    { kata: "マ", romaji: "ma", hira: "" },
    { kata: "ミ", romaji: "mi", hira: "" },
    { kata: "ム", romaji: "mu", hira: "" },
    { kata: "メ", romaji: "me", hira: "" },
    { kata: "モ", romaji: "mo", hira: "" },
  ],
  [
    { kata: "ヤ", romaji: "ya", hira: "" },
    null,
    { kata: "ユ", romaji: "yu", hira: "" },
    null,
    { kata: "ヨ", romaji: "yo", hira: "" },
  ],
  [
    { kata: "ラ", romaji: "ra", hira: "" },
    { kata: "リ", romaji: "ri", hira: "" },
    { kata: "ル", romaji: "ru", hira: "" },
    { kata: "レ", romaji: "re", hira: "" },
    { kata: "ロ", romaji: "ro", hira: "" },
  ],
  [
    { kata: "ワ", romaji: "wa", hira: "" },
    null,
    { kata: "ヲ", romaji: "wo", hira: "" },
    null,
    { kata: "ン", romaji: "n", hira: "" },
  ]
];

export default function KatakanaPage() {
  const [allFlipped, setAllFlipped] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [flippedStates, setFlippedStates] = useState(
    katakanaRows.map(row => row.map(() => false))
  );
  // Map katakanaFlat to Flashcard type expected by FlashcardGame
  const katakanaFlat = katakanaRows
    .flat()
    .filter((x): x is { kata: string; romaji: string; hira: string } => x !== null)
    .map(({ kata, romaji }) => ({ hira: kata, romaji }));

  React.useEffect(() => {
    if (allFlipped) {
      setFlippedStates(katakanaRows.map(row => row.map(() => true)));
    } else {
      setFlippedStates(katakanaRows.map(row => row.map(() => false)));
    }
  }, [allFlipped]);

  const handleSingleFlip = (rowIdx: number, colIdx: number) => {
    setFlippedStates(prev =>
      prev.map((row, r) =>
        row.map((flipped, c) =>
          r === rowIdx && c === colIdx ? !flipped : flipped
        )
      )
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Katakana Flashcard Game</h1>
      <div className="flex gap-4 mb-6">
        {!gameMode && (
          <>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setAllFlipped((f) => !f)}
            >
              {allFlipped ? "Show Katakana" : "Show Romaji"}
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => setGameMode(true)}
            >
              Start Flashcard Game
            </button>
          </>
        )}
      </div>
      {!gameMode ? (
        <div className="flex flex-col gap-2">
          {katakanaRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-row gap-2 justify-center">
              {row.map((cell, colIdx) =>
                cell ? (
                  <div key={cell.kata} className="w-16 h-24 relative">
                    <GlowingEffect
                      spread={32}
                      glow={true}
                      disabled={false}
                      proximity={48}
                      inactiveZone={0.01}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FlipCard
                        front={<span className="text-3xl flex items-center justify-center h-full">{cell.kata}</span>}
                        back={<span className="text-xl flex items-center justify-center h-full">{cell.romaji}</span>}
                        flipped={flippedStates[rowIdx][colIdx]}
                        className=""
                        onClick={() => handleSingleFlip(rowIdx, colIdx)}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={colIdx} className="w-16 h-24" />
                )
              )}
            </div>
          ))}
        </div>
      ) : (
        <FlashcardGame
          hiraganaFlat={katakanaFlat}
          onClose={() => setGameMode(false)}
        />
      )}
    </main>
  );
}
