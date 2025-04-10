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

  const week = getCalendarWeek(date)
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

export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1)
  );
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
