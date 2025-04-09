"use client";

import { getCalendarWeek, getDaysInMonth } from "@/shared/libs/dateTime";
import CalendarHeader from "./calendarHeader";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function CalendarBody() {
  const [date, setDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Date[] | null>(null);

  const getPrevDays = (currentDays: Date[]) => {
    // weekdays: 0 .. 6 = SUN .. SAT
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
    <div className="flex flex-col flex-1">
      <CalendarHeader date={date} setDate={setDate} />
      <div className="grid grid-cols-7 place-items-center py-2 bg-stone text-sm">
        <p>MON</p>
        <p>TUE</p>
        <p>WED</p>
        <p>THU</p>
        <p>FRI</p>
        <p>SAT</p>
        <p>SUN</p>
      </div>

      <div className="grid grid-cols-7 divide-x divide-y divide-stone-shade border-t border-stone-shade flex-1">
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
    </div>
  );
}
