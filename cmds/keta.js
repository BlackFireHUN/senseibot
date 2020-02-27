const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent
      .get("https://nekos.life/api/v2/img/keta")
      .end((err, response) => {
        message.channel.send({ file: response.body.url });
      });
  } else {
    message.channel.send(
      "Ez a parancs csak nsfw nek jelőlt csatornákban használható!"
    );
  }
};

module.exports.help = {
  name: "keta",
  aliases: ["", ""],
  usage: "keta",
  description: "Sensei küld egy keta hentai képet >///<",
  accessableby: "Mindenki"
};
