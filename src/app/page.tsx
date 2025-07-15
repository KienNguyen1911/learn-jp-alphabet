"use client";


import { FloatingDock } from "@/components/floating-dock";
import { IconHome, IconAlphabetLatin, IconAlphabetGreek } from "@tabler/icons-react";
import Link from "next/link";


import React, { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  // On mount, read theme from localStorage
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme-mode");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // No theme-mode key, default to dark
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme-mode", "dark");
    }
  }, []);

  // When darkMode changes, update localStorage and html class
  React.useEffect(() => {
    localStorage.setItem("theme-mode", darkMode == true ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <FloatingDock
        items={[
          {
            title: "Home",
            icon: <IconHome className="w-6 h-6" />,
            href: "/",
          },
          {
            title: "Hiragana",
            icon: <IconAlphabetLatin className="w-6 h-6" />,
            href: "/hiragana",
          },
          {
            title: "Katakana",
            icon: <IconAlphabetGreek className="w-6 h-6" />,
            href: "/katakana",
          },
        ]}
        desktopClassName="fixed left-1/2 -translate-x-1/2 bottom-6 z-50"
        mobileClassName="fixed right-4 bottom-4 z-50"
      />

      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to LearnJP!</h1>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            LearnJP is your interactive platform for mastering Japanese alphabets. Explore Hiragana and Katakana with beautiful flip cards and engaging flashcard games.
          </p>
          <ul className="mb-6 text-left list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Practice Hiragana and Katakana with animated flip cards</li>
            <li>Test your memory with flashcard games</li>
            <li>Theme mode is saved for your next visit</li>
            <li>Navigate easily with the floating dock</li>
          </ul>
          <div className="flex flex-col gap-2 items-center">
            <button
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition mb-2"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <Link href="/hiragana" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Start Hiragana</Link>
            <Link href="/katakana" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">Start Katakana</Link>
          </div>
        </div>
      </main>
    </>
  );
}
