const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const links = ["http://cdn.blackfire.hu/img/teehee/"];
  const random = links[Math.floor(Math.random() * links.length)];
  superagent.get(random).end((err, response) => {
    let cel = args[0];
    message.channel.startTyping(3);

    message.reply(
      `valami rosszat csinált és nevet rajta! :stuck_out_tongue_closed_eyes: `,
      { files: [response.body.url] }
    );

    message.channel.stopTyping(true);
  });
};

module.exports.help = {
  name: "teehee",
  aliases: ["", ""],
  usage: "teehee",
  description: "Ha valami rosszat tettél amin nevetsz",
  accessableby: "Mindenki"
};
