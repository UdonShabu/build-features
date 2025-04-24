"use client";
import { motion } from "framer-motion";

type ReactionPickerProps = {
  onSelect: (emoji: string) => void;
};

const reactions = ["👍", "❤️", "😂"] as const;

export default function ReactionPicker({ onSelect }: ReactionPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute -top-10 left-2 flex gap-2 bg-white rounded-xl p-2 shadow-xl z-10"
    >
      {reactions.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-2xl hover:scale-125 transition-transform"
        >
          {emoji}
        </button>
      ))}
    </motion.div>
  );
}
