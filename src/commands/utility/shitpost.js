const { SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("shitpost")
    .setDescription("Shitpost, văn mẫu"),
  async execute(interaction) {
    const attachmentUrls = getContentByTopic("shitpost");

    if (attachmentUrls.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = random(0, attachmentUrls.length - 1);
    await interaction.reply(attachmentUrls[randomIndex]);
  },
};
