const { SlashCommandBuilder } = require("discord.js");
const generateReply = require("../../helpers/generateReply.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("1v1d3llz")
    .setDescription("Hồng Huy Hoàng"),
  async execute(interaction) {
    const contents = getContentByTopic("1v1d3llz");
    if (!contents || contents.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    let randomIndex = random(0, contents.length - 1);
    let content = contents[randomIndex];
    if (!interaction.client.allowLargeFileUpload) {
      while (content.attachment?.size > 25 * 1000 * 1000) {
        randomIndex = random(0, contents.length - 1);
        content = contents[randomIndex];
      }
    }

    await generateReply(interaction, content);
  },
};
