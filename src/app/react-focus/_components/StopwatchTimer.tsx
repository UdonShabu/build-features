"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

enum TimeType {
  "stopwatch",
  "timer",
}
const TimeSecond = 5;

export default function StopwatchTimer() {
  const [time, setTime] = useState(5);
  const [mode, setMode] = useState<TimeType>(TimeType.timer);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (!running) {
      setRunning(true);

      intervalRef.current = setInterval(() => {
        countMethod();
      }, 1000);
    } else {
      stopRunning();
    }
  };

  const countMethod = () => {
    setTime((t) => {
      if (mode === TimeType.timer) {
        return t - 1;
      }
      return t + 1;
    });
  };

  const handleReset = () => {
    stopRunning();
    setTime(0);
  };

  const stopRunning = () => {
    setRunning(false);
    intervalRef.current && clearInterval(intervalRef.current);
  };

  const handleSwitchMode = () => {
    const newMode =
      mode === TimeType.timer ? TimeType.stopwatch : TimeType.timer;
    setMode(newMode);
    if (newMode === TimeType.timer) {
      setTime(TimeSecond);
    } else {
      setTime(0);
    }
  };

  useEffect(() => {
    if (time === 0) {
      stopRunning();
    }
  }, [time]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center space-y-5  ">
        <p>{time}s</p>
        <div className="flex justify-between">
          <Button
            onClick={handleStart}
            className="bg-transparent hover:bg-transparent text-black"
          >
            {running ? "Stop" : "Start"}
          </Button>
          <Button
            onClick={handleReset}
            className="bg-transparent hover:bg-transparent text-black"
          >
            Reset
          </Button>
        </div>
        <Button
          onClick={handleSwitchMode}
          className="cursor-pointer bg-red-400 hover:bg-red-500"
        >
          Switch to {mode === TimeType.timer ? "stopwatch" : "timer"}
        </Button>
      </div>
    </div>
  );
}
