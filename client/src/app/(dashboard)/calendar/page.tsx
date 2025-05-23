"use client";

import { useState } from "react";
import { timespanDdItems } from "@/shared/models/calendar";
import CalendarHeader from "@/components/calendarHeader";
import CalendarMonth from "@/components/calendarMonth";
import CalendarWeek from "@/components/calendarWeek";
import CalendarYear from "@/components/calendarYear";

export default function Page() {
  const [date, setDate] = useState<Date>(new Date());
  const [activeTimespan, setActiveTimespan] = useState<string>(
    timespanDdItems[1].text
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <CalendarHeader
        date={date}
        setDate={setDate}
        timespan={activeTimespan}
        setTimespan={setActiveTimespan}
      />

      {activeTimespan == timespanDdItems[0].text && <CalendarWeek date={date} />}

      {activeTimespan == timespanDdItems[1].text && <CalendarMonth date={date} />}

      {activeTimespan == timespanDdItems[2].text && <CalendarYear date={date} />}
    </div>
  );
}
