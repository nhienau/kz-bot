const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("bubble")
    .setDescription("Speech bubble")
    .addStringOption((option) =>
      option.setName("message").setDescription("Message (optional)")
    ),
  async execute(interaction) {
    const imgUrls = getContentByTopic("bubble");
    const optionalMessage = interaction.options.getString("message");

    if (imgUrls.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = random(0, imgUrls.length - 1);

    let messageContent;
    if (optionalMessage) {
      messageContent = optionalMessage;
    } else {
      const messages = await interaction.channel.messages.fetch({ limit: 15 });
      const message = messages.find(
        (message) => !message.author.bot && message.content !== ""
      );
      if (!message) {
        await interaction.reply(imgUrls[randomIndex]);
        return;
      }
      messageContent = message.content;
    }
    const embed = new EmbedBuilder()
      .setDescription(messageContent)
      .setImage(imgUrls[randomIndex]);
    await interaction.reply({ embeds: [embed] });
  },
};
