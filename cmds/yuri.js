const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const links = [
      "https://nekos.life/api/v2/img/yuri",
      "https://nekos.life/api/v2/img/eroyuri"
    ];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
      message.channel.send({ file: response.body.url });
    });
  } else {
    message.channel.send(
      "Ez a parancs csak nsfw nek jelőlt csatornákban használható!"
    );
  }
};

module.exports.help = {
  name: "yuri",
  aliases: ["", ""],
  usage: "yuri",
  description: "Sensei küld egy yuri hentai képet >///<",
  accessableby: "Mindenki"
};
