const { SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("meme").setDescription("meme"),
  async execute(interaction) {
    const attachmentUrls = getContentByTopic("meme");

    if (attachmentUrls.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * (attachmentUrls.length - 1));
    await interaction.reply(attachmentUrls[randomIndex]);
  },
};
