export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
};

export const getToday = (): string => formatDate();

export const getMonthRange = (): { monthstart: string, monthend: string } => {
  const date = new Date();
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { monthstart: formatDate(startDay), monthend: formatDate(endDay) };
};

export const getWeekRange = (): { weekstart: string, weekend: string } => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  return { weekstart: formatDate(firstDayOfWeek), weekend: formatDate(lastDayOfWeek) };
};

export const dateFormatter = new Intl.DateTimeFormat("ko-KR", { year: 'numeric', month: "long", day: "numeric", weekday: "long" });