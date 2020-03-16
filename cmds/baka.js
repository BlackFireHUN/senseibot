const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/baka/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);
    if (!cel) {
      message.reply(`hülye :triumph:`, { files: [response.body.url] });
    }

    if (cel) {
      message.reply(`szerint ${cel} hülye :triumph: `, {
        files: [response.body.url]
      });
    }
    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "baka",
  aliases: ["", ""],
  usage: "baka",
  description: "Ha lehülyéznél valakit vagy esetleg magad",
  accessableby: "Mindenki"
};
