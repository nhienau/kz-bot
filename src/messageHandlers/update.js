require("dotenv").config();
const fs = require("node:fs");
const formatTimestamp = require("../helpers/formatTimestamp.js");
const isValidChannelName = require("../helpers/isValidChannelName.js");

module.exports = async function (message) {
  if (message.author.id !== process.env.OWNER_ID) {
    console.log(`[${formatTimestamp(new Date())}] !update: No permission`);
    return;
  }

  const { channelId, client, content: messageContent } = message;
  const channel = await client.channels.fetch(channelId);

  if (!isValidChannelName(channel.name.toLowerCase())) {
    console.log(
      `[${formatTimestamp(
        new Date()
      )}] !update: Command cannot be used on channel "${channel.name}".`
    );
    return;
  }

  const commandParams = messageContent
    .trim()
    .toLowerCase()
    .split(" ")
    .slice(1)
    .filter((word) => word !== "");
  if (commandParams.length === 0) {
    console.log(
      `[${formatTimestamp(
        new Date()
      )}] !update: Missing option: "text"/"attachment"`
    );
    return;
  }

  const option = commandParams[0].trim().toLowerCase();
  if (option !== "text" && option !== "attachment") {
    console.log(
      `[${formatTimestamp(
        new Date()
      )}] !update: Invalid option, should be either "text"/"attachment"`
    );
    return;
  }
  const messages = await channel.messages.fetch({ limit: 100 });
  const contents =
    option === "text"
      ? messages
          .map((message) => message.content)
          .filter(
            (message) =>
              message !== "" &&
              !["!update", channel.name].some((keyword) =>
                message.includes(keyword)
              )
          )
      : messages
          .map((message) => message.attachments)
          .filter((attachment) => attachment.size > 0)
          .flatMap((map) =>
            Array.from(map.values()).map((obj) => obj.attachment)
          );
  if (contents.length === 0) {
    console.log(`[${formatTimestamp(new Date())}] !update: No contents found.`);
    return;
  }
  const fileName = channel.name.toLowerCase().replace(/ /g, "");
  const filePath = `./assets/${fileName}.json`;
  try {
    fs.writeFileSync(filePath, JSON.stringify(contents));
    console.log(
      `[${formatTimestamp(new Date())}] !update: Successfully written ${
        contents.length
      } content${contents.length == 1 ? "" : "s"} in "${
        channel.name
      }" to ${filePath}`
    );
  } catch (e) {
    console.error(e);
  }
};
