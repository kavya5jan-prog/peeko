import { useState, useEffect } from "react";

const INITIAL_SECONDS = 24 * 60 * 60;
let sharedSecondsLeft = INITIAL_SECONDS;
let isStarted = false;
let intervalId: NodeJS.Timeout | null = null;
let listeners: Array<(seconds: number) => void> = [];

function startGlobalTimer() {
  if (isStarted) return;
  isStarted = true;

  intervalId = setInterval(() => {
    sharedSecondsLeft = sharedSecondsLeft > 0 ? sharedSecondsLeft - 1 : 0;
    listeners.forEach((listener) => listener(sharedSecondsLeft));

    if (sharedSecondsLeft <= 0 && intervalId) {
      clearInterval(intervalId);
    }
  }, 1000);
}

export function useOfferTimer() {
  const [secondsLeft, setSecondsLeft] = useState(sharedSecondsLeft);

  useEffect(() => {
    if (!isStarted && sharedSecondsLeft > 0) {
      startGlobalTimer();
    }

    listeners.push(setSecondsLeft);
    setSecondsLeft(sharedSecondsLeft); // initial sync

    return () => {
      listeners = listeners.filter((l) => l !== setSecondsLeft);
    };
  }, []);

  return secondsLeft;
}
