const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const getContentByTopic = require("../../helpers/getContentByTopic.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("video").setDescription("Video"),
  async execute(interaction) {
    await interaction.deferReply();
    const attachmentUrls = getContentByTopic("video");

    if (attachmentUrls.length === 0) {
      await interaction.editReply("Chưa có dữ liệu.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * (attachmentUrls.length - 1));
    const attachment = new AttachmentBuilder(attachmentUrls[randomIndex]);

    await interaction.channel.send({ files: [attachment] });
    await interaction.editReply(`<@${interaction.user.id}>`);
  },
};
