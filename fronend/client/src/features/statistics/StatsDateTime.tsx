export const StatsDateTime = (date: any) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const dateparse = Date.parse(date);
  const dateMillisecs = new Date(dateparse);
  const day = dateMillisecs.getDate();
  const month = dateMillisecs.getMonth();
  const year = dateMillisecs.getFullYear();
  const h = ('0' + dateMillisecs.getHours()).slice(-2);
  const min = ('0' + dateMillisecs.getMinutes()).slice(-2);
  const sec = ('0' + dateMillisecs.getSeconds()).slice(-2);

  return `${monthName[month]} ${day}, ${year} ${h}:${min}:${sec}`;
}




