const formatDate = (dateData: string | Date): string => {
  const monthNames: string[] = [
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

  const today: Date = new Date(dateData);
  let date: string = today.getDate().toString();
  if (date.length === 1) {
    date = `0${date}`;
  }
  return `${date} ${monthNames[today.getMonth()]}, ${today.getFullYear()}`;
};

const formatTime = (time: string | Date): string => {
  return new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const formatDateTime = (dateTime: string | Date): string => {
  return `${formatDate(dateTime)} - ${formatTime(dateTime)}`;
};

export { formatDate, formatTime, formatDateTime };
