const months = [
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

const maybeAddZero = (v: number) => {
  return v < 10 ? `0${v}` : `${v}`;
};

export const monthNumberToString = (v: number) => {
  return months[v];
};

export const format = (date: Date) => {
  return `${date.getFullYear()}-${maybeAddZero(
    date.getMonth() + 1
  )}-${maybeAddZero(date.getDate())}`;
};
