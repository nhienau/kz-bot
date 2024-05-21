const getContentByTopic = require("./getContentByTopic.js");
const random = require("../../helpers/random.js");

module.exports = function (client, channelId) {
  const channel = client.channels.cache.get(channelId);
  const attachmentUrls = getContentByTopic("morningmsg");
  const randomIndex = random(0, attachmentUrls.length - 1);

  channel.send(
    attachmentUrls.length === 0
      ? "Gồi, trời sáng các bạn ơi"
      : attachmentUrls[randomIndex]
  );
};
