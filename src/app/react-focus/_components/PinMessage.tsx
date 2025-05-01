"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  user: string;
  timestamp: string;
  pinned: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hey! Are we still on for tonight?",
    user: "alice",
    timestamp: new Date("2025-04-30T18:45:00Z").toISOString(),
    pinned: false,
  },
  {
    id: 2,
    text: "Yes, see you at 8!",
    user: "bob",
    timestamp: new Date("2025-04-30T18:47:15Z").toISOString(),
    pinned: false,
  },
];

export default function PinMessage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;

    const updatedMessage = {
      id: Date.now(),
      text: text,
      user: "bob",
      timestamp: new Date().toISOString(), // ✅ current time
      pinned: false,
    };

    setMessages((msgs) => [...msgs, updatedMessage]);
    setText("");

    // Add this to your messages list (if needed)
    // setMessages(prev => [...prev, updatedMessage]);
  };

  return (
    <div className="mx-auto container space-y-6">
      <Accordion
        type="single"
        collapsible
        className="bg-gray-200 rounded-full px-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ul className="space-y-5">
        {messages.map((msg) => (
          <li key={msg.id} className="relative">
            {msg.user === "alice" ? (
              <p className="bg-gray-200 p-4 rounded-full w-56">{msg.text} </p>
            ) : (
              <p className="bg-amber-200 p-4 rounded-full w-56 ml-auto">
                {msg.text}
              </p>
            )}
          </li>
        ))}
      </ul>

      <section className="flex">
        <input
          placeholder="msg.."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-4 w-full rounded-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <Button
          onClick={sendMessage}
          className="h-[56px] w-[90px] hover:bg-amber-300 bg-amber-400
         rounded-full absolute right-0"
        >
          Send{" "}
        </Button>
      </section>
    </div>
  );
}

// function HoldMenu() {
//   return (
//     <div
//       className={cn(
//         "bg-gray-100 p-2 rounded-md absolute",
//         "transition-transform",
//         isShown ? "scale-100" : "scale-0"
//       )}
//     >
//       nani
//     </div>
//   );
// }
