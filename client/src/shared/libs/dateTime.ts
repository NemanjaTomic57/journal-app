export const dateTime = (dateTime: Date | string) => {
  const parsedDate = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = parsedDate.getFullYear();
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
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
