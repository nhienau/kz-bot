const { SlashCommandBuilder } = require("discord.js");
const generateReply = require("../../helpers/generateReply.js");
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
    const contents = getContentByTopic("bubble");
    const optionalMessage = interaction.options.getString("message");

    if (!contents || contents.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    let messageContent;
    if (optionalMessage) {
      messageContent = optionalMessage;
    } else {
      const messages = await interaction.channel.messages.fetch({ limit: 15 });
      const message = messages.find(
        (message) => !message.author.bot && message.content !== ""
      );
      messageContent = message.content;
    }

    let randomIndex;
    let content;
    do {
      randomIndex = random(0, contents.length - 1);
      content = contents[randomIndex];
    } while (!content.attachment);

    if (!interaction.client.allowLargeFileUpload) {
      while (content.attachment?.size > 25 * 1000 * 1000) {
        randomIndex = random(0, contents.length - 1);
        content = contents[randomIndex];
      }
    }

    await generateReply(interaction, content, messageContent);
  },
};
