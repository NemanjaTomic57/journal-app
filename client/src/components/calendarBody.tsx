"use client";

import { getDaysInMonth } from "@/shared/libs/dateTime";
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

    const nMissingDays = 7 - currentDays.length % 7;

    console.log(nMissingDays);

    switch (nMissingDays) {
      case 7:
        return [];
      default:
        return nextMonthsDays.slice(0, nMissingDays);
    }
  }

  useEffect(() => {
    setDays(() => {
      const currentDays = getDaysInMonth(date);
      const prevDays = getPrevDays(currentDays);
      const folDays = getFolDays([...prevDays, ...currentDays])
      return [...prevDays, ...currentDays, ...folDays];
    });
  }, [date]);

  return (
    <>
      <CalendarHeader date={date} setDate={setDate} />
      <div>
        <div className="grid grid-cols-7 place-items-center py-2 bg-stone-tint text-sm">
          <p>MON</p>
          <p>TUE</p>
          <p>WED</p>
          <p>THU</p>
          <p>FRI</p>
          <p>SAT</p>
          <p>SUN</p>
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-stone-shade border-t border-stone-shade">
          {days &&
            days.map((day, index) => (
              <div
                key={index}
                className={clsx(
                  "text-center aspect-5/4 last:border-b p-1 bg-stone-tint border-stone-shade",
                  day.getMonth() !== days[6].getMonth() && "text-stone-shade"
                )}
              >
                {day.getDate()}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
