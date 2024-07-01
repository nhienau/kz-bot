module.exports = async function (client, channelId) {
  const channel = await client.channels.fetch(channelId);
  const messages = await channel.messages.fetch({ limit: 100 });
  return messages
    .filter((message) => !message.system)
    .map((message) => {
      const { content, attachments } = message;
      const attachmentEntries = Array.from(attachments.values());

      return attachmentEntries.length === 0
        ? { content }
        : attachmentEntries.map((att) => {
            const { attachment: url, size, contentType } = att;

            return {
              content,
              attachment: {
                url,
                size,
                contentType,
              },
            };
          });
    })
    .flat();
};
