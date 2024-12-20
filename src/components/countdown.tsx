"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
  inTable?: boolean;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const translations: {
  [key in keyof TimeLeft]: { normal: string; table: string };
} = {
  days: { normal: "nap", table: "nap" },
  hours: { normal: "óra", table: "ó" },
  minutes: { normal: "perc", table: "p" },
  seconds: { normal: "másodperc", table: "mp" },
};

export function Countdown({ targetDate, inTable }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  (Object.keys(timeLeft) as (keyof TimeLeft)[]).forEach((interval) => {
    if (!timeLeft[interval] || (inTable && interval === "seconds")) {
      return;
    }

    let displayValue = timeLeft[interval];
    if (inTable && interval === "hours" && displayValue.startsWith("0")) {
      displayValue = displayValue.substring(1);
    }

    timerComponents.push(
      <span key={interval}>
        <span
          style={{
            fontWeight: inTable ? "700" : "400",
            fontSize: inTable ? "1em" : "2em",
          }}
        >
          {displayValue}
        </span>
        <span
          style={{
            marginLeft: "2px",
            marginRight: "4px",
            fontSize: inTable ? "1em" : "0.5em",
          }}
        >
          {translations[interval][inTable ? "table" : "normal"]}
        </span>{" "}
      </span>,
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Lejárt az idő!</span>}
    </div>
  );
}
