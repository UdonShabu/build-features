"use client";
import { useState, useRef } from "react";
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

  const handlePointerDown = () => {
    holdTimeout.current = setTimeout(() => setShowPicker(true), 600);
  };

  const handlePointerUp = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
  };

  const handleSelect = (emoji: string) => {
    setReaction(emoji);
    setShowPicker(false);
  };

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
        {showPicker && <ReactionPicker onSelect={handleSelect} />}
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
