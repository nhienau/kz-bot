const { SlashCommandBuilder } = require("discord.js");
const generateReply = require("../../helpers/generateReply.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("raisehand")
    .setDescription("Giơ tay phát biểu")
    .addUserOption((option) =>
      option.setName("user").setDescription("Người giơ tay phát biểu")
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const targetId = target?.id ?? process.env.DIEP_ID;

    const contents = getContentByTopic("raisehand");
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

    const pronouns = [
      "chủ tịch",
      "sv",
      "wibi alimi",
      "main anime",
      "trẩu",
      "bé gái",
    ];
    let randomPronounIndex = random(0, pronouns.length - 1);

    const textContent = `Anh em trật tự để ${pronouns[randomPronounIndex]} ${
      targetId ? `<@${targetId}>` : "Diệp"
    } phát biểu ý kiến!`;

    await generateReply(interaction, content, textContent);
  },
};
