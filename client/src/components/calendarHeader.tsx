"use client";

import { monthOnly } from "@/shared/libs/dateTime";
import { useOnClickOutside } from "@/shared/libs/useOnClickOutside";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import clsx from "clsx";
import { useRef, useState } from "react";

const iconButton = "p-2 hover:bg-primary-tone rounded-full!";

const ddButton = "p-2 cursor-pointer hover:bg-stone flex items-center gap-2";

export default function CalendarHeader() {
  const [date, setDate] = useState(new Date());
  const [showTimespanDd, setShowTimespanDd] = useState(true);
  const timespanDdRef = useRef(null);

  useOnClickOutside(timespanDdRef, () => setShowTimespanDd(false));

  return (
    <div className="flex gap-3 bg-primary text-background items-center container py-1!">
      <Button className="btn-stroke-sm border-background border-1 hover:bg-primary-tone!">
        Today
      </Button>
      <Button className={iconButton}>
        <Icon name="chevLeft" size="sm" />
      </Button>
      <p>{monthOnly(date)}</p>
      <Button className={iconButton}>
        <Icon name="chevLeft" className="rotate-180" size="sm" />
      </Button>

      <Button className={clsx("ml-auto", iconButton)}>
        <Icon name="print" size="sm" />
      </Button>
      <div ref={timespanDdRef} className="relative">
        <Button
          onClick={() => setShowTimespanDd(!showTimespanDd)}
          className="flex items-center gap-1 btn-stroke-sm border-background border-1 hover:bg-primary-tone!"
        >
          Month <Icon name="chevLeft" className="rotate-270" size="sm" />
        </Button>

        {showTimespanDd && (
          <div className="absolute bg-white border-1 text-primary w-full translate-y-1 rounded-sm overflow-hidden">
            {timespanDd.map((item) => (
              <div key={item.text} className={clsx(ddButton, "not-last:border-b")}>
                <Icon name={item.icon} /> {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const timespanDd = [
  {
    text: "Week",
    icon: "week",
  },
  {
    text: "Month",
    icon: "month",
  },
  {
    text: "Year",
    icon: "year",
  },
];
