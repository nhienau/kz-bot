const { EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const getContentByTopic = require("../helpers/getContentByTopic.js");

module.exports = function (message) {
  const { channelId, client, content: messageContent } = message;
  const channel = client.channels.cache.get(channelId);

  const args = messageContent
    .trim()
    .toLowerCase()
    .split(" ")
    .slice(1)
    .filter((word) => word !== "");
  const state = {
    on: true,
    off: false,
  };

  if (args.length == 0) {
    const allowLargeFile = getContentByTopic("largeFileConfig");

    const embed = new EmbedBuilder()
      .setTitle("Can upload large attachment file")
      .setDescription(allowLargeFile ? "Yes" : "No");
    channel.send({ embeds: [embed] });
  } else {
    const value = args[0].trim().toLowerCase();
    if (value !== "on" && value !== "off") {
      channel.send("Invalid option, should be either `on`/`off`");
      return;
    }
    client.allowLargeFileUpload = state[value];
    const filePath = `./assets/largeFileConfig.json`;
    try {
      fs.writeFileSync(filePath, JSON.stringify(state[value]));
    } catch (e) {
      console.error(e);
    }
    channel.send(`Turned ${value} large attachment file upload.`);
  }
};
