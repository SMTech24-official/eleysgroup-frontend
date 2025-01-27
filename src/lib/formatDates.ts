const getStartOrEndTime = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString();
};

const getDay = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString("en-us", { weekday: "short" });
};

const getDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
};

export { getStartOrEndTime, getDay, getDate };
