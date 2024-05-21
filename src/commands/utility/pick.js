const { SlashCommandBuilder } = require("discord.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick")
    .addStringOption((option) =>
      option
        .setName("choices")
        .setDescription('Choices, separated by comma (",")')
        .setMaxLength(200)
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("choices");
    const choices = message.split(",");
    const randomIndex = random(0, choices.length - 1);
    await interaction.reply(choices[randomIndex].trim());
  },
};
