const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");
const shuffle = require("../../helpers/shuffle.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("top5")
    .setDescription(
      "Đưa ra một bảng xếp hạng ngẫu nhiên (không nhất thiết là top 5)"
    ),
  async execute(interaction) {
    const contents = getContentByTopic("top5");

    if (!contents || contents.length === 0) {
      await interaction.reply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = random(0, contents.length - 1);
    const { content } = contents[randomIndex];
    const contentArr = content.split("\n");
    const title = contentArr[0];
    const items = contentArr.slice(1);
    const shuffledItems = shuffle(items);

    const indexesArr =
      items.length === 6
        ? ["Top 5", "Top 4", "Top 3", "Top 2", "Honorable mention", "Top 1"]
        : Array.from(
            { length: items.length },
            (_, index) => `Top ${items.length - index}`
          );

    const itemsStr = shuffledItems
      .map((el, i) => `${indexesArr[i]}: ${el}`)
      .join("\n");

    await interaction.reply(`${title}\n${itemsStr}`);
  },
};
