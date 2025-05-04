const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");
const random = require("../../helpers/random.js");
const generateReply = require("../../helpers/generateReply.js");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("battle")
    .setDescription("Battle")
    .addStringOption((option) =>
      option.setName("player1").setDescription("Player 1")
    )
    .addStringOption((option) =>
      option.setName("player2").setDescription("Player 2")
    ),
  async execute(interaction) {
    async function generateBattleReply(content) {
      const response = await interaction.reply({
        content,
        fetchReply: true,
      });

      await response.react("👈");
      await response.react("👉");
    }

    const player1 = interaction.options.getString("player1");
    const player2 = interaction.options.getString("player2");

    if (
      (!player1 && player2?.length > 0) ||
      (player1?.length > 0 && !player2)
    ) {
      await interaction.reply({
        content: "Cần chỉ định đầy đủ tên 2 người chơi",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (player1?.length > 0 && player2?.length > 0) {
      await generateBattleReply(`${player1} vs ${player2} ai win`);
      return;
    }

    const contents = getContentByTopic("battle");
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

    const response = await generateReply(interaction, content);
    await response.react("👈");
    await response.react("👉");
  },
};
