const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/sad/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);

    message.reply(` szomorú! :disappointed: :no_mouth: `, {
      files: [response.body.url]
    });

    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "sad",
  aliases: ["", ""],
  usage: "sad",
  description: "Ha szomorú vagy!",
  accessableby: "Mindenki"
};
