"use client";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

type Message = {
  id: number;
  text: string;
};

const initialMessages: Message[] = [
  { id: 1, text: "Hey there!" },
  { id: 2, text: "Long press me 👇" },
  { id: 3, text: "What's up?" },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <div className="space-y-4 p-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}
