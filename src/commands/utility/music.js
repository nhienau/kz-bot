const { SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Gợi ý 1 bài nhạc bất kỳ"),
  async execute(interaction) {
    const contents = getContentByTopic("music");
    if (!contents || contents.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    let randomIndex = random(0, contents.length - 1);
    let content = contents[randomIndex];

    const embedObjectJSON = content.content
      .replaceAll("\n", "")
      .replaceAll("```", "");
    const embed = JSON.parse(embedObjectJSON);

    if (embed.title) {
      embed.title = ":musical_note: " + embed.title;
    }

    if (content.attachment) {
      embed.image = {
        url: content.attachment.url,
      };
    }

    await interaction.reply({ embeds: [embed] });
  },
};
