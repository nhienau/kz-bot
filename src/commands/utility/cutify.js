const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("cutify")
    .setDescription("Giúp đoạn tin nhắn trở nên dễ thương hơn")
    .addStringOption((option) =>
      option.setName("message").setDescription("Message (optional)")
    ),
  async execute(interaction) {
    const contents = getContentByTopic("cutify");
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
      if (!message?.content) {
        await interaction.reply({
          content: "Không tìm thấy tin nhắn gần đây",
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      messageContent = message.content;
    }

    const randomIndex = random(0, contents.length - 1);
    const emojis = contents[randomIndex].content;
    const emojiArr = emojis.split("\n");
    const randomEmojiIndex = random(0, emojiArr.length - 1);
    const emoji = emojiArr[randomEmojiIndex];

    await interaction.reply(`${messageContent} ${emoji}`);
  },
};
