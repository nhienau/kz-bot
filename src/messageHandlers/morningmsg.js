module.exports = function (message) {
  const { channelId, client, content: messageContent } = message;
  const channel = client.channels.cache.get(channelId);
  if (message.author.id !== process.env.OWNER_ID) {
    channel.send("No permission.");
    return;
  }

  const commandParams = messageContent
    .trim()
    .toLowerCase()
    .split(" ")
    .slice(1)
    .filter((word) => word !== "");
  const state = {
    on: true,
    off: false,
  };

  if (commandParams.length == 0) {
    client.scheduledMessage.running = !client.scheduledMessage.running;
  } else {
    const value = commandParams[0].trim().toLowerCase();
    if (value !== "on" && value !== "off") {
      channel.send("Invalid option, should be either `on`/`off`");
      return;
    }
    client.scheduledMessage.running = state[value];
  }

  channel.send(
    `The morning message has been turned ${Object.keys(state).find(
      (s) => state[s] === client.scheduledMessage.running
    )}.`
  );
};
