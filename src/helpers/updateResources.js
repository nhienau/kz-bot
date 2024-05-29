const fs = require("node:fs");
const fetchMessages = require("./fetchMessages.js");

module.exports = function (client) {
  const fileContent = fs.readFileSync("./assets/resourcesConfig.json");
  const config = JSON.parse(fileContent);

  config.forEach(async (cmd) => {
    const content = [];
    for (const channelId of cmd.channels) {
      const result = await fetchMessages(client, channelId);
      if (result.length === 0) {
        continue;
      } else {
        content.push(...result);
      }
    }
    const filePath = `./assets/${cmd.command}.json`;
    fs.writeFileSync(filePath, JSON.stringify(content));
  });
};
