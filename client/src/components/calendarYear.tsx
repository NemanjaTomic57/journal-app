"use client";

import { getMonthOnly, getMonthsOfYear } from "@/shared/libs/dateTime";
import clsx from "clsx";

interface Props {
  date: Date;
}

export default function CalendarYear({ date }: Props) {
  const months = getMonthsOfYear(date);

  return (
    <div className="grid grid-cols-4 gap-10 p-10 overflow-auto bg-stone-tint">
      {months.map((month, monthIndex) => (
        <div key={monthIndex}>
          <p className="text-center p-1 bg-primary-tone text-background rounded-sm">{getMonthOnly(month[6])}</p>
          <div className="grid grid-cols-7 text-center gap-2 mt-4">
            <div className="contents font-bold">
              <p className="mb-2">M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
              <p>S</p>
            </div>

            {month.map((day, dayIndex) => (
              <div key={dayIndex}>
                <p className={clsx(month[6].getMonth() !== day.getMonth() && "text-stone-shade")}>{day.getDate()}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
