const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    const links = [
      "http://cdn.blackfire.hu/img/classic",
      "http://cdn.blackfire.hu/img/hentai",
      "http://cdn.blackfire.hu/img/solo",
      "http://cdn.blackfire.hu/img/tits",
      "http://cdn.blackfire.hu/img/pussy_jpg",
      "http://cdn.blackfire.hu/img/boobs",
      "http://cdn.blackfire.hu/img/solog",
      "http://cdn.blackfire.hu/img/anal",
      "http://cdn.blackfire.hu/img/holoero",
      "http://cdn.blackfire.hu/img/pwankg"
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
  name: "hentai",
  aliases: ["", ""],
  usage: "hentai",
  description: "Sensei küld egy hentai képet >///<",
  accessableby: "Mindenki"
};
