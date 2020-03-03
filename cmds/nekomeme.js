const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/meme/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    const embed = new Discord.RichEmbed()
      .setImage(response.body.url)
      .setColor(`#000000`)
      .setURL(response.body.url);
    message.channel.send(embed);
  });
};

module.exports.help = {
  name: "nekomeme",
  aliases: ["", ""],
  usage: "nekomeme",
  description: "Sensei küld egy meme-t rektapi rol!",
  accessableby: "Mindenki"
};
