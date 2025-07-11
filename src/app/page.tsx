"use client";

import { GlowingEffect } from "@/components/glowing-effect";
import { FlipCard } from "@/components/flip-card";


import React, { useState } from "react";

// Gojūon table order (rows)
const hiraganaRows = [
  [
    { hira: "あ", romaji: "a" },
    { hira: "い", romaji: "i" },
    { hira: "う", romaji: "u" },
    { hira: "え", romaji: "e" },
    { hira: "お", romaji: "o" },
  ],
  [
    { hira: "か", romaji: "ka" },
    { hira: "き", romaji: "ki" },
    { hira: "く", romaji: "ku" },
    { hira: "け", romaji: "ke" },
    { hira: "こ", romaji: "ko" },
  ],
  [
    { hira: "さ", romaji: "sa" },
    { hira: "し", romaji: "shi" },
    { hira: "す", romaji: "su" },
    { hira: "せ", romaji: "se" },
    { hira: "そ", romaji: "so" },
  ],
  [
    { hira: "た", romaji: "ta" },
    { hira: "ち", romaji: "chi" },
    { hira: "つ", romaji: "tsu" },
    { hira: "て", romaji: "te" },
    { hira: "と", romaji: "to" },
  ],
  [
    { hira: "な", romaji: "na" },
    { hira: "に", romaji: "ni" },
    { hira: "ぬ", romaji: "nu" },
    { hira: "ね", romaji: "ne" },
    { hira: "の", romaji: "no" },
  ],
  [
    { hira: "は", romaji: "ha" },
    { hira: "ひ", romaji: "hi" },
    { hira: "ふ", romaji: "fu" },
    { hira: "へ", romaji: "he" },
    { hira: "ほ", romaji: "ho" },
  ],
  [
    { hira: "ま", romaji: "ma" },
    { hira: "み", romaji: "mi" },
    { hira: "む", romaji: "mu" },
    { hira: "め", romaji: "me" },
    { hira: "も", romaji: "mo" },
  ],
  [
    { hira: "や", romaji: "ya" },
    null,
    { hira: "ゆ", romaji: "yu" },
    null,
    { hira: "よ", romaji: "yo" },
  ],
  [
    { hira: "ら", romaji: "ra" },
    { hira: "り", romaji: "ri" },
    { hira: "る", romaji: "ru" },
    { hira: "れ", romaji: "re" },
    { hira: "ろ", romaji: "ro" },
  ],
  [
    { hira: "わ", romaji: "wa" },
    null,
    { hira: "を", romaji: "wo" },
    null,
    { hira: "ん", romaji: "n" },
  ]
];

export default function Home() {
  const [allFlipped, setAllFlipped] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // 2D array for per-card flip state
  const [flippedStates, setFlippedStates] = useState(
    hiraganaRows.map(row => row.map(() => false))
  );

  // Apply dark mode to html tag
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Reset all per-card flips when toggling flip-all
  React.useEffect(() => {
    if (allFlipped) {
      setFlippedStates(hiraganaRows.map(row => row.map(() => true)));
    } else {
      setFlippedStates(hiraganaRows.map(row => row.map(() => false)));
    }
  }, [allFlipped]);

  // Handler for single card flip
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
      <h1 className="text-3xl font-bold mb-8">Hiragana Flip Cards</h1>
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setAllFlipped((f) => !f)}
        >
          {allFlipped ? "Show Hiragana" : "Show Romaji"}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          onClick={() => setDarkMode((d) => !d)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {hiraganaRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-row gap-2 justify-center">
            {row.map((cell, colIdx) =>
              cell ? (
                <div key={cell.hira} className="w-16 h-24 relative">
                  <GlowingEffect
                    spread={32}
                    glow={true}
                    disabled={false}
                    proximity={48}
                    inactiveZone={0.01}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FlipCard
                      front={<span className="text-3xl flex items-center justify-center h-full">{cell.hira}</span>}
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
    </main>
  );
}
