const { EmbedBuilder } = require("discord.js");
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
    const attachment = getContentByTopic("morningmsg");
    const embed = new EmbedBuilder().setTitle("Morning message").addFields(
      {
        name: "Running",
        value: client.scheduledMessage.running ? "Yes" : "No",
      },
      {
        name: "Attachment",
        value: attachment ? "Found" : "Not found",
      },
      {
        name: "Channel",
        value: `<#${process.env.MAIN_CHANNEL_ID}>`,
      }
    );
    channel.send({ embeds: [embed] });
  } else {
    const value = args[0].trim().toLowerCase();
    if (value !== "on" && value !== "off") {
      channel.send("Invalid option, should be either `on`/`off`");
      return;
    }
    state[value]
      ? client.scheduledMessage.start()
      : client.scheduledMessage.stop();
    channel.send(
      `The morning message has been turned ${Object.keys(state).find(
        (s) => state[s] === client.scheduledMessage.running
      )}.`
    );
  }
};
