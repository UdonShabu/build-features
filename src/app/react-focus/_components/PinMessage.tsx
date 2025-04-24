"use client";
import { useState, useRef, useEffect } from "react";
import { Pin } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialMessages = [
  {
    id: 1,
    user: "John",
    text: "Hey there!",
    timestamp: "2025-04-22T09:00:00",
    pinned: true,
  },
  {
    id: 2,
    user: "Alice",
    text: "@John Hello!",
    timestamp: "2025-04-22T09:02:00",
    pinned: false,
  },
];

export default function PinMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      user: "John",
      text: input,
      timestamp: new Date().toISOString(),
      pinned: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const togglePinMessage = (id) => {
    setMessages((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m))
    );
  };

  const renderDayHeader = (timestamp) => {
    const date = new Date(timestamp).toDateString();
    return <div className="text-center text-gray-400 my-2">{date}</div>;
  };

  const pinnedMessages = messages.filter((m) => m.pinned);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {pinnedMessages.length > 0 && (
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur p-2 text-sm rounded-md mb-2 shadow-sm">
          {pinnedMessages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center gap-2 cursor-pointer truncate"
              onClick={() =>
                messageRefs.current[msg.id]?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              <Pin size={14} className="text-yellow-500" />
              <span className="truncate">{msg.text}</span>
            </div>
          ))}
        </div>
      )}

      {messages.map((msg, idx) => {
        const showDate =
          idx === 0 ||
          new Date(messages[idx].timestamp).toDateString() !==
            new Date(messages[idx - 1].timestamp).toDateString();

        const isUser = msg.user === "John";
        const sideClass = isUser ? "text-right" : "text-left";
        const bgClass = isUser ? "bg-blue-100" : "bg-gray-100";

        return (
          <div key={msg.id} ref={(el) => (messageRefs.current[msg.id] = el)}>
            {showDate && renderDayHeader(msg.timestamp)}
            <div className={`mb-2 ${sideClass}`}>
              <div
                className={`inline-block ${bgClass} p-2 rounded-xl max-w-xs`}
              >
                <p>{msg.text}</p>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                  <Pin
                    onClick={() => togglePinMessage(msg.id)}
                    className={`cursor-pointer ${
                      msg.pinned ? "text-yellow-500" : ""
                    }`}
                    size={14}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 flex gap-2">
        <input
          className="border rounded-md flex-grow p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
