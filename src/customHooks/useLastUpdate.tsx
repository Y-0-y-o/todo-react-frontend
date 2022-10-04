import {useState, useRef, useEffect, useCallback} from "react";

type resetTimer = () => void;

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

// A custom Hook is a JavaScript function whose name starts with "use" and that may call other Hooks.
export default function useLastUpdate(startTimeInMillisecondsUTC: number): [string, Function] {
  if(startTimeInMillisecondsUTC > Date.now())
    throw new Error("useLastUpdate: Parameter must be a Date in the past!");

  const [theTimeThatPassed, setTheTimeThatPassed] = useState<string>("Just now")
  const timeoutRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(startTimeInMillisecondsUTC);

  const ageInterValFunction = useCallback(() => {
    const elapsedTime = Math.abs(Date.now() - startTimeRef.current);

    if((elapsedTime/second) < 10) {
      setTheTimeThatPassed("Just now");
    } else if((elapsedTime/second) < 60) {
      setTheTimeThatPassed(`${(elapsedTime/second).toFixed()} seconds ago`);
    } else if((elapsedTime/second) < 120) {
      setTheTimeThatPassed("1 minute ago");
    } else if((elapsedTime/minute) < 60) {
      setTheTimeThatPassed(`${(elapsedTime/minute).toFixed()} minutes ago`);
    } else if((elapsedTime/minute) < 120) {
      setTheTimeThatPassed("1 hour ago");
    } else if((elapsedTime/hour) < 24) {
      setTheTimeThatPassed(`${(elapsedTime/hour).toFixed()} hour ago`);
    } else if((elapsedTime/day) < 48) {
      setTheTimeThatPassed("1 day ago");
    } else {
      setTheTimeThatPassed(`${(elapsedTime/day).toFixed()} days ago`);
    }

    if(elapsedTime < minute) {
      timeoutRef.current = setTimeout(ageInterValFunction, 10*second);
    } else if(elapsedTime < hour) {
      timeoutRef.current = setTimeout(ageInterValFunction, minute);
    } else if(elapsedTime < day) {
      timeoutRef.current = setTimeout(ageInterValFunction, hour);
    }
  }, []);

  useEffect(() => {
    ageInterValFunction();
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, [ageInterValFunction])

  const resetTimer: resetTimer = () => {
    clearTimeout(timeoutRef.current);
    startTimeRef.current = Date.now();
    setTheTimeThatPassed("Just now");
    timeoutRef.current = setTimeout(ageInterValFunction, 10000);
  }

  return [ theTimeThatPassed, resetTimer ];
}
