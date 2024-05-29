const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = async function (interaction, content, overrideMessage) {
  const { content: message, attachment } = content;
  if (!attachment) {
    await interaction.reply(message);
  } else {
    const textContent = overrideMessage ?? (message === "" ? null : message);

    if (attachment.contentType.startsWith("image")) {
      if (textContent) {
        const embed = new EmbedBuilder()
          .setDescription(textContent)
          .setImage(attachment.url);
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply(attachment.url);
      }
    } else if (attachment.contentType.startsWith("video")) {
      const video = new AttachmentBuilder(attachment.url);
      await interaction.deferReply();
      await interaction.channel.send({ files: [video] });
      await interaction.editReply(textContent || `<@${interaction.user.id}>`);
    }
  }
};
