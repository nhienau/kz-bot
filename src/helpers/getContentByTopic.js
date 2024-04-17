const fs = require("node:fs");
const path = require("node:path");

module.exports = function (keyword) {
  const contents = [];
  const assetsPath = path.join(__dirname, "../../assets");
  const contentFiles = fs
    .readdirSync(assetsPath)
    .filter((file) => file.toLowerCase().includes(keyword));

  for (const file of contentFiles) {
    const filePath = path.join(assetsPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const content = JSON.parse(fileContent);
    contents.push(...content);
  }

  return contents;
};
