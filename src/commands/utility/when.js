const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("when").setDescription("When?"),
  async execute(interaction) {
    await interaction.reply("Now.");
  },
};
