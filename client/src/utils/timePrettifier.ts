export function TimePrettier(isoDate:Date) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const currentTime = new Date().getTime();
  const timestamp = new Date(isoDate).getTime();
  const interval = Math.abs(currentTime - timestamp);

  if (interval < msPerMinute) {
    return "just now";
  } else if (interval < msPerHour) {
    return Math.floor(interval / msPerMinute) + " mins ago";
  } else if (interval < msPerDay) {
    return Math.floor(interval / msPerHour) + " hours ago";
  } else if (interval < msPerWeek) {
    return Math.floor(interval / msPerDay) + " days ago";
  } else if (interval < msPerMonth) {
    return Math.floor(interval / msPerWeek) + " weeks ago";
  } else if (interval < msPerYear) {
    return Math.floor(interval / msPerMonth) + " months ago";
  } else {
    return Math.floor(interval / msPerYear) + " years ago";
  }
}