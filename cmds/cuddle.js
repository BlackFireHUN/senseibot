const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let mention = message.mentions.users.first();
  const link = "http://cdn.blackfire.hu/img/cuddle/";
  let ownerid = '152615338213638144';
  let neyid = '466379091285901314';
  superagent.get(link).end((err, response) => {
    if (!mention) {
      message.reply(`szeretné ha valaki hozzábújna! :sob:`, { files: [response.body.url] });
    } else if (mention.id != neyid) {
      message.reply(` hozzábújik ${mention}-hoz/hez :heart: `, { files: [response.body.url] });
    } else if (mention.id == neyid) {
      if (message.author.id == ownerid) {
        message.reply(` hozzábújik ${mention}-hoz/hez :heart::heart::heart:  `, { files: [response.body.url] });
      } else if (message.author.id != ownerid) {
        message.reply(` nem tudsz hozzábújni :stuck_out_tongue:`);
      }
    }
  });
};

module.exports.help = {
  name: "cuddle",
  aliases: ["", ""],
  usage: "cuddle",
  description: "Ha valakihez odaszeretnél bújni",
  accessableby: "Mindenki"
};
