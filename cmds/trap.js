const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get("http://cdn.blackfire.hu/img/trap").end((err, response) => {
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
  name: "trap",
  aliases: ["", ""],
  usage: "trap",
  description: "Sensei küld egy trap hentai képet >///<",
  accessableby: "Mindenki"
};
