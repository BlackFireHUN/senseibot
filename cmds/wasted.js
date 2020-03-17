const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/wasted/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);
    if (!cel) {
      message.reply(` elcseszte :face_palm: `, {
        files: [response.body.url]
      });
    }

    if (cel) {
      message.reply(` szerint ${cel} elcseszte :face_palm:  `, {
        files: [response.body.url]
      });
    }

    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "wasted",
  aliases: ["", ""],
  usage: "wasted @mention",
  description: "Ha valami el lett cseszve!",
  accessableby: "Mindenki"
};
