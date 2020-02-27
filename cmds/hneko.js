const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const links = [
      "https://nekos.life/api/v2/img/lewd",
      "https://nekos.life/api/v2/img/nsfw_neko_gif",
      "https://nekos.life/api/v2/img/eron",
      "https://nekos.life/api/lewd/neko"
    ];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent
      .get("https://nekos.life/api/v2/img/lewd")
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
  name: "hneko",
  aliases: ["", ""],
  usage: "hneko",
  description: "Sensei küld egy neko hentai képet-et >///<",
  accessableby: "Mindenki"
};
