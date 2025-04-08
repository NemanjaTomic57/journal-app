export const dateTime = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
};

export const monthOnly = (dateTime: Date | string) => {
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

export const dateOnly = (dateTime: Date | string) => {
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

export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
};
