const fs = require("node:fs");

module.exports = function (keyword) {
  try {
    const filePath = `./assets/${keyword}.json`;
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (e) {
    return null;
  }
};
