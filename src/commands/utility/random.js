const { SlashCommandBuilder } = require("discord.js");
const random = require("../../helpers/random.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Pick a random number between a given range")
    .addIntegerOption((option) =>
      option.setName("min").setDescription("Minimum value").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("max").setDescription("Maximum value").setRequired(true)
    ),
  async execute(interaction) {
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");

    if (max < min) {
      await interaction.reply(`Minimum value must be less than maximum value!`);
      return;
    }

    await interaction.reply(`${random(min, max)}`);
  },
};
