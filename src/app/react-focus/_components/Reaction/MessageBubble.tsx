"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactionPicker from "./ReactionPicker";

type Message = {
  id: number;
  text: string;
};

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  // Handle long press
  const handlePointerDown = () => {
    holdTimeout.current = setTimeout(() => setShowPicker(true), 600);
  };
  const handlePointerUp = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
  };

  // Handle reaction select
  const handleSelect = (emoji: string) => {
    setReaction(emoji);
    setShowPicker(false);
  };

  // 🔍 Detect outside click
  useEffect(() => {
    if (!showPicker) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  return (
    <div className="relative">
      <div
        className="bg-gray-200 px-4 py-2 rounded-xl inline-block cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {message.text}
      </div>

      <AnimatePresence>
        {showPicker && (
          <div ref={pickerRef}>
            <ReactionPicker onSelect={handleSelect} />
          </div>
        )}
      </AnimatePresence>

      {reaction && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl mt-1 ml-2"
        >
          {reaction}
        </motion.div>
      )}
    </div>
  );
}
