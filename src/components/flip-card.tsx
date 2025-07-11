import * as React from "react";
import { useState, useEffect } from "react";

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  flipped?: boolean;
  onClick?: () => void;
}

export function FlipCard({ front, back, className, flipped: flippedProp, onClick }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isControlled = typeof flippedProp === "boolean";
  const showFlipped = isControlled ? flippedProp : flipped;

  // Reset local state when switching from controlled to uncontrolled
  useEffect(() => {
    if (!isControlled) setFlipped(false);
  }, [isControlled]);

  return (
    <div
      className={`relative w-full h-full perspective ${className || ""}`}
      onClick={e => {
        if (onClick) {
          onClick();
        } else if (!isControlled) {
          setFlipped(f => !f);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 [transform-style:preserve-3d] border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 ${
          showFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center text-black dark:text-white">
          {front}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 flex items-center justify-center text-black dark:text-white">
          {back}
        </div>
      </div>
    </div>
  );
}
