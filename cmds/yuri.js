const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const links = [
      "http://cdn.blackfire.hu/img/yuri",
      "http://cdn.blackfire.hu/img/eroyuri"
    ];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
      const embed = new Discord.RichEmbed()
        .setImage(response.body.url)
        .setColor(`#000000`)
        .setURL(response.body.url);
      message.channel.send(embed);
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
