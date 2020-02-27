const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const links = [
      "https://nekos.life/api/v2/img/classic",
      "https://nekos.life/api/v2/img/hentai",
      "https://nekos.life/api/v2/img/solo",
      "https://nekos.life/api/v2/img/tits",
      "https://nekos.life/api/v2/img/pussy_jpg",
      "https://nekos.life/api/v2/img/boobs",
      "https://nekos.life/api/v2/img/solog",
      "https://nekos.life/api/v2/img/anal",
      "https://nekos.life/api/v2/img/holoero",
      "https://nekos.life/api/v2/img/pwankg"
    ];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent
      .get("https://nekos.life/api/v2/img/hentai")
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
  name: "hentai",
  aliases: ["", ""],
  usage: "hentai",
  description: "Sensei küld egy hentai képet >///<",
  accessableby: "Mindenki"
};
