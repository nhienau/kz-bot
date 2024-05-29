require("dotenv").config();
const formatTimestamp = require("../helpers/formatTimestamp.js");
const updateResources = require("../helpers/updateResources.js");

module.exports = async function (message) {
  if (message.author.id !== process.env.OWNER_ID) {
    console.log(`[${formatTimestamp(new Date())}] !update: No permission`);
    return;
  }

  const { client } = message;
  updateResources(client);
};
