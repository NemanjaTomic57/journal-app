"use client";

import { getMonthAndWeek, getMonthOnly } from "@/shared/libs/dateTime";
import { timespanDdItems } from "@/shared/models/calendar";
import Button from "@/shared/ui/button";
import Icon from "@/shared/ui/icon";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import DdSm, { DropdownItem } from "@/shared/ui/ddSm";

const iconButton = "p-2 hover:bg-primary-tone rounded-full!";

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
  const decrementDate = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      if (timespan === timespanDdItems[0].text) {
        newDate.setDate(newDate.getDate() - 7);
      } else if (timespan === timespanDdItems[1].text) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (timespan === timespanDdItems[2].text) {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
      return newDate;
    });
  };

  const incrementDate = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      if (timespan === timespanDdItems[0].text) {
        newDate.setDate(newDate.getDate() + 7);
      } else if (timespan === timespanDdItems[1].text) {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (timespan === timespanDdItems[2].text) {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }
      return newDate;
    });
  };

  const updateTimespan = (item: DropdownItem) => {
    setTimespan(item.text);
  };

  return (
    <div className="flex gap-3 bg-primary text-background items-center container py-1! text-sm">
      <Button
        onClick={() => setDate(new Date())}
        className="btn-sm border-background border-1 hover:bg-primary-tone!"
      >
        Today
      </Button>

      <div className="flex items-center gap-1">
        <Button onClick={decrementDate} className={iconButton}>
          <Icon name="chevLeft" size="sm" />
        </Button>

        {timespan === timespanDdItems[0].text && (
          <p className="w-[11rem] text-center">{getMonthAndWeek(date)}</p>
        )}

        {timespan === timespanDdItems[1].text && (
          <p className="w-[11rem] text-center">{getMonthOnly(date)}</p>
        )}

        {timespan === timespanDdItems[2].text && (
          <p className="w-[11rem] text-center">{date.getFullYear()}</p>
        )}

        <Button onClick={incrementDate} className={iconButton}>
          <Icon name="chevLeft" className="rotate-180" size="sm" />
        </Button>
      </div>

      <Button className={clsx("ml-auto", iconButton)}>
        <Icon name="print" size="sm" />
      </Button>

      <DdSm
        buttonText={timespan}
        className="border-background border-1 hover:bg-primary-tone! text-right"
        items={timespanDdItems}
        onSelect={updateTimespan}
      />
    </div>
  );
}
