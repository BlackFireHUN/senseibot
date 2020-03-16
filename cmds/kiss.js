const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let mention = message.mentions.users.first();
    const link = "http://cdn.blackfire.hu/img/kiss/";
    let ownerid = '152615338213638144';
    let neyid = '466379091285901314';
    superagent.get(link).end((err, response) => {
        if (!mention) {
            message.reply(` kér egy puszit/csókot :flushed:`, { files: [response.body.url] });
        } else if (mention.id != neyid) {
            message.reply(` ad egy puszit/csókot ${mention}-nak/nek :kissing_heart: `, { files: [response.body.url] });
        } else if (mention.id == neyid) {
            if (message.author.id == ownerid) {
                message.reply(` ad egy puszit/csókot ${mention}-nak/nek :kissing_heart:`, { files: [response.body.url] });
            } else if (message.author.id != ownerid) {
                message.reply(`Őt nem tudod megpuszilni/csókolni :stuck_out_tongue:`);
            }
        }
    });
};

module.exports.help = {
    name: "kiss",
    aliases: ["", ""],
    usage: "kiss",
    description: "Puszit kérhetsz vagy adhatsz vele!",
    accessableby: "Mindenki"
};
