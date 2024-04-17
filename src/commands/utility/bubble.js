const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("bubble")
    .setDescription("Speech bubble"),
  async execute(interaction) {
    const imgUrls = getContentByTopic("bubble");

    if (imgUrls.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * (imgUrls.length - 1));
    const messages = await interaction.channel.messages.fetch({ limit: 15 });
    const message = messages.find(
      (message) => !message.author.bot && message.content !== ""
    );
    if (!message) {
      await interaction.reply(imgUrls[randomIndex]);
      return;
    }
    const messageContent = message.content;
    const embed = new EmbedBuilder()
      .setDescription(messageContent)
      .setImage(imgUrls[randomIndex]);
    await interaction.reply({ embeds: [embed] });
  },
};