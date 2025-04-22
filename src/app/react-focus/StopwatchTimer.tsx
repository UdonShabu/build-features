"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function StopwatchTimer() {
  const [time, setTime] = useState(0); // in seconds
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("stopwatch"); // "stopwatch" or "timer"
  const [duration, setDuration] = useState(60); // total time for timer mode
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (mode === "stopwatch") return prev + 1;

          if (prev <= 0) {
            setRunning(false); // triggers effect to clear interval
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  const handleReset = () => {
    setRunning(false);
    setTime(mode === "timer" ? duration : 0);
  };

  const handleModeSwitch = () => {
    const newMode = mode === "stopwatch" ? "timer" : "stopwatch";
    setMode(newMode);
    setRunning(false);
    setTime(newMode === "timer" ? duration : 0);
  };

  const totalTime = mode === "timer" ? duration : 60; // 60 for full circle progress in stopwatch mode
  const progress =
    Math.min(mode === "timer" ? time / totalTime : time / totalTime, 1) * 100;
  const strokeDasharray = 283; // 2 * Math.PI * r (r = 45)
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3b82f6"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
          {time}s
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <Button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="ghost" onClick={handleModeSwitch}>
          Switch to {mode === "stopwatch" ? "Timer" : "Stopwatch"}
        </Button>
      </div>
    </div>
  );
}
