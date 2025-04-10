"use client";

import { weekdayStrings } from "@/shared/data/calendar";
import { getDaysInMonth, getCalendarWeek } from "@/shared/libs/dateTime";
import clsx from "clsx";
import { useState, useEffect } from "react";

interface Props {
  date: Date;
}

export default function CalendarMonth({ date }: Props) {
  const [days, setDays] = useState<Date[] | null>(null);

  const getPrevDays = (currentDays: Date[]) => {
    const weekday = currentDays[0].getDay();
    const lastMonth = new Date(date);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthsDays = getDaysInMonth(lastMonth);

    switch (weekday) {
      case 1:
        return [];
      case 0:
        return lastMonthsDays.slice(-5);
      default:
        return lastMonthsDays.slice(-(weekday - 1));
    }
  };

  const getFolDays = (currentDays: Date[]) => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthsDays = getDaysInMonth(nextMonth);

    const nMissingDays = 7 - (currentDays.length % 7);

    console.log(nMissingDays);

    switch (nMissingDays) {
      case 7:
        return [];
      default:
        return nextMonthsDays.slice(0, nMissingDays);
    }
  };

  useEffect(() => {
    setDays(() => {
      const currentDays = getDaysInMonth(date);
      const prevDays = getPrevDays(currentDays);
      const folDays = getFolDays([...prevDays, ...currentDays]);
      return [...prevDays, ...currentDays, ...folDays];
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