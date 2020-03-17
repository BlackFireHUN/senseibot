const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/bite/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);

    if (!cel) {
      message.reply(` szeretné ha megharapnák! :scream:`, {
        files: [response.body.url]
      });
    }

    if (cel) {
      message.reply(` megharapja ${cel}-t :sweat_smile: `, {
        files: [response.body.url]
      });
    }

    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "bite",
  aliases: ["", ""],
  usage: "bite",
  description:
    "Ha szeretnéd hogy megharapjanak vagy meg akarsz valakit harapni",
  accessableby: "Mindenki"
};
