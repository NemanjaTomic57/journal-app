"use client";

import { getMonthAndWeek, getMonthOnly } from "@/shared/libs/dateTime";
import { useOnClickOutside } from "@/shared/libs/useOnClickOutside";
import { timespanDd } from "@/shared/content/calendar";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const iconButton = "p-2 hover:bg-primary-tone rounded-full!";

const ddButton = "p-2 cursor-pointer hover:bg-stone flex items-center gap-2";

interface Props {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  timespan: string;
  setTimespan: Dispatch<SetStateAction<string>>;
}

export default function CalendarHeader({
  date,
  setDate,
  timespan,
  setTimespan,
}: Props) {
  const [showTimespanDd, setShowTimespanDd] = useState(false);
  const timespanDdRef = useRef(null);

  useOnClickOutside(timespanDdRef, () => setShowTimespanDd(false));

  const decrementDate = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      if (timespan === timespanDd[0].text) {
        newDate.setDate(newDate.getDate() - 7);
      } else if (timespan === timespanDd[1].text) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (timespan === timespanDd[2].text) {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      return newDate;
    });
  };

  const incrementDate = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      if (timespan === timespanDd[0].text) {
        newDate.setDate(newDate.getDate() + 7);
      } else if (timespan === timespanDd[1].text) {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (timespan === timespanDd[2].text) {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const updateTimespan = (text: string) => {
    setTimespan(text);
    setShowTimespanDd(false);
  };

  return (
    <div className="flex gap-3 bg-primary text-background items-center container py-1! text-sm">
      <Button
        onClick={() => setDate(new Date())}
        className="btn-stroke-sm border-background border-1 hover:bg-primary-tone!"
      >
        Today
      </Button>

      <div className="flex items-center gap-1">
        <Button onClick={decrementDate} className={iconButton}>
          <Icon name="chevLeft" size="sm" />
        </Button>

        {timespan === timespanDd[0].text && (
          <p className="w-[11rem] text-center">{getMonthAndWeek(date)}</p>
        )}

        {timespan === timespanDd[1].text && (
          <p className="w-[11rem] text-center">{getMonthOnly(date)}</p>
        )}

        {timespan === timespanDd[2].text && (
          <p className="w-[11rem] text-center">{date.getFullYear()}</p>
        )}

        <Button onClick={incrementDate} className={iconButton}>
          <Icon name="chevLeft" className="rotate-180" size="sm" />
        </Button>
      </div>

      <Button className={clsx("ml-auto", iconButton)}>
        <Icon name="print" size="sm" />
      </Button>

      <div ref={timespanDdRef} className="relative">
        <Button
          onClick={() => setShowTimespanDd(!showTimespanDd)}
          className="flex items-center gap-1 btn-stroke-sm border-background border-1 hover:bg-primary-tone! text-right"
        >
          {timespan} <Icon name="chevLeft" className="rotate-270" size="sm" />
        </Button>

        {showTimespanDd && (
          <div className="absolute bg-white border-1 text-primary w-full translate-y-1 rounded-sm overflow-hidden z-10">
            {timespanDd.map((item) => (
              <div
                key={item.text}
                onClick={() => updateTimespan(item.text)}
                className={clsx(
                  ddButton,
                  timespan === item.text && "bg-stone",
                  "not-last:border-b"
                )}
              >
                <Icon name={item.icon} /> {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
