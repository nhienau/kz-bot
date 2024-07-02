const updateResources = require("../helpers/updateResources.js");

module.exports = async function (message) {
  const { client } = message;
  updateResources(client);
};
