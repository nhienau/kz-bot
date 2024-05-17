module.exports = function (date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
    hourCycle: "h23",
  }).format(date);
};
