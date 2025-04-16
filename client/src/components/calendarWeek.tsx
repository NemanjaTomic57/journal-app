"use client";

import { weekdayStrings } from "@/shared/models/calendar";
import { getWeekdays } from "@/shared/libs/dateTime";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  date: Date;
}

export default function CalendarWeek({ date }: Props) {
  const [weekdays, setWeekdays] = useState<Date[]>([]);
  const timeslots = getTimeslots();

  useEffect(() => {
    const weekdays = getWeekdays(date);
    setWeekdays(weekdays);
  }, [date]);

  return (
    <div className="w-full bg-stone-tint flex-1 flex flex-col overflow-auto">
      <div
        className="grid border-b-2 border-primary-tone bg-stone"
        style={{
          gridTemplateColumns: "60px repeat(7, 1fr)",
        }}
      >
        <div></div>

        {weekdays.map((day, index) => (
          <div key={index} className="text-sm pb-4 p-1 uppercase font-normal">
            {weekdayStrings[index]}{" "}
            <span className="text-2xl">{day.getDate()}</span>
          </div>
        ))}
      </div>

      <div
        className="grid flex-1 overflow-auto"
        style={{
          gridTemplateColumns: "60px repeat(7, 1fr)",
        }}
      >
        {Array.from({ length: 8 }).map((_, colIdx) => (
          <div key={colIdx} className="border-r border-stone h-4"></div>
        ))}
        {timeslots.map((slot, rowIdx) => (
          <div key={rowIdx} className="contents">
            <div className="relative border-r border-stone">
              {slot.slice(3) === "00" && (
                <p className="absolute text-xs font-normal text-center w-full -translate-y-3">
                  {slot.slice(0, 2)}
                </p>
              )}
            </div>

            {Array.from({ length: 7 }).map((_, colIdx) => (
              <div
                key={colIdx}
                className={clsx(
                  "h-3 border-r border-stone",
                  rowIdx % 4 === 0 && "border-t"
                )}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const getTimeslots = () => {
  const hours = 24;
  const timeslots = [];

  for (let index = 0; index < hours * 4; index++) {
    const totalMinutes = index * 15;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const slot = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    timeslots.push(slot);
  }

  return timeslots;
};
