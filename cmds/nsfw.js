const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent
      .get("https://nekobot.xyz/api/image")
      .query({ type: "hentai" })
      .end((err, response) => {
        message.channel.send({ file: response.body.message });
      });
  } else {
    message.channel.send(
      "Ez a parancs csak nsfw nek jelőlt csatornákban használható!"
    );
  }
};

module.exports.help = {
  name: "nsfw",
  aliases: ["", ""],
  usage: "nsfw",
  description: "Sensei küld egy hentai képet >///<",
  accessableby: "Mindenki"
};
