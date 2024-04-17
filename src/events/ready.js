const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "/help", type: ActivityType.Playing }],
      status: "online",
    });
    console.log(`${client.user.tag} is online.`);
  },
};
