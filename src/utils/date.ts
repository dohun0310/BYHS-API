const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}${month}${day}`;
};

export const getToday = (date: Date = new Date()): string => { return formatDate(date); };

export const getMonthRange = (date: Date): { monthstart: string, monthend: string } => {
  const startDay = new Date(date);
  const currentMonth = startDay.getMonth();
  const currentYear = startDay.getFullYear();
  let endDay;

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  if (startDay.getDate() > lastDayOfMonth.getDate() - 7) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    endDay = new Date(nextYear, nextMonth + 1, 0);
  } else {
    endDay = lastDayOfMonth;
  }

  return { monthstart: formatDate(startDay), monthend: formatDate(endDay) };
};

export const getWeekRange = (date: Date): { weekstart: string, weekend: string } => {
  const today = new Date(date);
  const dayOfWeek = today.getDay();
  let endDay;

  if (dayOfWeek >= 4) {
    endDay = new Date(today);
    endDay.setDate(today.getDate() + (12 - dayOfWeek));
  } else {
    endDay = new Date(today);
    endDay.setDate(today.getDate() + (5 - dayOfWeek));
  }

  return { weekstart: formatDate(today), weekend: formatDate(endDay) };
};