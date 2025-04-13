"use client";

import { weekdayStrings } from "@/shared/content/calendar";
import { getExtendedMonth, getCalendarWeek } from "@/shared/libs/dateTime";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface Props {
  date: Date;
}

export default function CalendarMonth({ date }: Props) {
  const [days, setDays] = useState<Date[] | null>(null);

  useEffect(() => {
    setDays(() => {
      const extendedMonth = getExtendedMonth(date);
      return [...extendedMonth];
    });
  }, [date]);

  return (
    <>
      <div className="grid grid-cols-7 place-items-center py-2 bg-stone text-sm border-b-2 border-primary-tone">
        {weekdayStrings.map(day => (
          <p key={day}>{day}</p>
        ))}
      </div>

      <div className="grid grid-cols-7 divide-x divide-y divide-stone-shade  border-stone-shade flex-1">
        {days &&
          days.map((day, index) => {
            const isFirstInRow = index % 7 === 0;
            const calendarWeek = getCalendarWeek(day);
            return (
              <div
                key={index}
                className={clsx(
                  "grid justify-around last:border-b p-1 bg-stone-tint border-stone-shade hover:bg-stone relative",
                  day.getMonth() !== days[6].getMonth() && "text-stone-shade"
                )}
              >
                {isFirstInRow && (
                  <div className="absolute top-0 left-0 bg-secondary text-background w-6 text-center rounded-br-md">
                    <p className="cursor-default text-sm">{calendarWeek}</p>
                  </div>
                )}
                <p className="cursor-pointer">{day.getDate()}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
