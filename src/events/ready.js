require("dotenv").config();
const { Events, ActivityType } = require("discord.js");
const cron = require("cron");
const sendDailyMessage = require("../helpers/sendDailyMessage.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "/help", type: ActivityType.Playing }],
      status: "online",
    });
    console.log(`${client.user.tag} is online.`);

    client.scheduledMessage = new cron.CronJob(
      "0 0 6 * * *",
      sendDailyMessage.bind(null, client, process.env.MAIN_CHANNEL_ID)
    );
    client.scheduledMessage.start();
  },
};
