const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/bad/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);
    if (!cel) {
      message.reply(`megüti magát mert rosszat csinált!`, {
        files: [response.body.url]
      });
    }

    if (cel) {
      message.reply(`megüti ${cel}-t mert rosszat csinált!`, {
        files: [response.body.url]
      });
    }
    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "bad",
  aliases: ["", ""],
  usage: "bad",
  description: "Ha valaki rosszat csinált megütheted akár magad is!",
  accessableby: "Mindenki"
};
