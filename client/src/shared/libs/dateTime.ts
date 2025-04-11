export const getDateTime = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
};

export const getMonthAndWeek = (date: Date) => {
  const parsedDate = date instanceof Date ? date : new Date(date);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const week = getCalendarWeek(date);
  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${month} ${year} (week ${week})`;
};

export const getMonthOnly = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${month} ${year}`;
};

export const getDateOnly = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();

  return `${day}.${month}.${year}`;
};

export const timeOnly = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getWeekdays = (date: Date) => {
  const day = date.getDay();

  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekdays.push(d);
  }

  return weekdays;
};

export const getCalendarWeek = (date: Date) => {
  var date = new Date(date);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  var week = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week.getTime()) / 86400000 -
        3 +
        ((week.getDay() + 6) % 7)) /
        7
    )
  );
};

export function getMonthsOfYear(date: Date) {
  const year = date.getFullYear();
  const months = [];

  for (let month = 0; month < 12; month++) {
    let days: Date[] = getExtendedMonth(new Date(year, month, 1));

    // Fill with additional days to reach 42 days (6 full weeks)
    if (days.length < 42) {
      const lastDate = days[days.length - 1];
      const extraDaysNeeded = 42 - days.length;

      for (let i = 1; i <= extraDaysNeeded; i++) {
        const nextDay = new Date(lastDate);
        nextDay.setDate(lastDate.getDate() + i);
        days.push(nextDay);
      }
    }

    months.push(days);
  }

  return months;
}

export const getExtendedMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get current month days
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentMonthDays = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );

  // Day of the week for the 1st of the month
  const firstDayOfWeek = currentMonthDays[0].getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const offsetStart = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Get preceding days from previous month
  const precedingDays =
    offsetStart > 0
      ? getRawMonthDays(new Date(year, month - 1)).slice(-offsetStart)
      : [];

  // Combine current + preceding
  const fullCalendar = [...precedingDays, ...currentMonthDays];

  // Add succeeding days to fill the last week
  const remainder = fullCalendar.length % 7;
  if (remainder !== 0) {
    const needed = 7 - remainder;
    const followingDays = getRawMonthDays(new Date(year, month + 1)).slice(
      0,
      needed
    );
    fullCalendar.push(...followingDays);
  }

  return fullCalendar;
};

// Only returns raw days of a month, no adjustments
const getRawMonthDays = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );
};
