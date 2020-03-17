const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/stare/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);
    if (!cel) {
      message.reply(` bámul! :upside_down:`, {
        files: [response.body.url]
      });
    }

    if (cel) {
      message.reply(` bámulja ${cel}-t :upside_down:`, {
        files: [response.body.url]
      });
    }
    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "stare",
  aliases: ["", ""],
  usage: "stare",
  description: "Ha bámulsz valakit és kimutatnád",
  accessableby: "Mindenki"
};
