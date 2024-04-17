module.exports = function (str) {
  const validChannelNames = [
    "1v1d3llz",
    "bach",
    "bubble",
    "kz",
    "meme",
    "shitpost",
    "video",
  ];
  const result = validChannelNames.filter((name) => str.includes(name));
  return result.length === 1;
};
