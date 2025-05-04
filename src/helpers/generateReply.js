const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = async function (interaction, content, overrideMessage) {
  const { content: message, attachment } = content;
  if (!attachment) {
    const response = await interaction.reply({
      content: message,
      fetchReply: true,
    });
    return response;
  } else {
    const textContent = overrideMessage ?? (message === "" ? null : message);

    if (attachment.contentType.startsWith("image")) {
      if (textContent) {
        const embed = new EmbedBuilder()
          .setDescription(textContent)
          .setImage(attachment.url);
        const response = await interaction.reply({
          embeds: [embed],
          fetchReply: true,
        });
        return response;
      } else {
        const response = await interaction.reply({
          content: attachment.url,
          fetchReply: true,
        });
        return response;
      }
    } else if (attachment.contentType.startsWith("video")) {
      const video = new AttachmentBuilder(attachment.url);
      await interaction.deferReply();
      const response = await interaction.channel.send({
        content: textContent || `<@${interaction.user.id}>`,
        files: [video],
      });
      await interaction.deleteReply();
      return response;
    }
  }
};
