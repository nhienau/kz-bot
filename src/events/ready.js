const { Events, ActivityType } = require("discord.js");
const cron = require("cron");
const formatTimestamp = require("../helpers/formatTimestamp.js");
const sendDailyMessage = require("../helpers/sendDailyMessage.js");
const updateResources = require("../helpers/updateResources.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "/help", type: ActivityType.Playing }],
      status: "online",
    });
    console.log(
      `[${formatTimestamp(new Date())}] ${client.user.tag} is online.`
    );

    client.scheduledMessage = cron.CronJob.from({
      cronTime: "0 0 6 * * *",
      onTick: sendDailyMessage.bind(null, client, process.env.MAIN_CHANNEL_ID),
      start: true,
      timeZone: "Asia/Bangkok",
    });

    client.updateResources = cron.CronJob.from({
      cronTime: "0 30 7,19 * * *",
      onTick: updateResources.bind(null, client),
      start: true,
      timeZone: "Asia/Bangkok",
    });
  },
};
