export const formatDate = (date: Date = new Date()): string => {
  const kst = 9 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + kst);
  return localDate.toISOString().slice(0, 10).replace(/-/g, '');
};

export const getToday = (): string => formatDate();

export const getMonthRange = (): { monthstart: string, monthend: string } => {
  const startDay = new Date();
  const endOfMonth = new Date(Date.UTC(startDay.getFullYear(), startDay.getMonth() + 1, 0));
  const diffDays = (endOfMonth.getDate() - startDay.getDate());
  let endDay;

  if(diffDays < 7) {
    endDay = new Date(Date.UTC(startDay.getFullYear(), startDay.getMonth() + 2, 0));
  } else {
    endDay = endOfMonth;
  }

  return { monthstart: formatDate(startDay), monthend: formatDate(endDay) };
};

export const getWeekRange = (): { weekstart: string, weekend: string } => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000) + ((today.getDay() === 0 ? -6 : 1) * 24 * 60 * 60 * 1000));
  const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + (6 * 24 * 60 * 60 * 1000));
  return { weekstart: formatDate(firstDayOfWeek), weekend: formatDate(lastDayOfWeek) };
};

export const dateFormatter = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" });