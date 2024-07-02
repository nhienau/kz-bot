require("dotenv").config();
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const listCommands = require("../../helpers/listCommands.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Danh sách các lệnh"),
  async execute(interaction) {
    const message = listCommands
      .map((command) => `\`/${command.name}\` - ${command.description}\n`)
      .join("");
    const embed = new EmbedBuilder().setDescription(message);
    await interaction.reply({ embeds: [embed] });
  },
};
