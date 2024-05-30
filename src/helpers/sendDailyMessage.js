const getContentByTopic = require("./getContentByTopic.js");
const random = require("./random.js");

module.exports = function (client, channelId) {
  const channel = client.channels.cache.get(channelId);
  const contents = getContentByTopic("morningmsg");

  if (!contents) {
    channel.send("Gồi, trời sáng các bạn ơi");
    return;
  }

  let randomIndex;
  let content;
  do {
    randomIndex = random(0, contents.length - 1);
    content = contents[randomIndex];
  } while (!content.attachment);

  if (!client.allowLargeFileUpload) {
    while (content.attachment?.size > 25 * 1000 * 1000) {
      randomIndex = random(0, contents.length - 1);
      content = contents[randomIndex];
    }
  }

  channel.send(content.attachment.url);
};
