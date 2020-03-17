const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let mention = message.mentions.users.first();
    const links = ["http://cdn.blackfire.hu/img/rape/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        message.channel.startTyping(3);
        if (!mention) {
            message.reply(`Tag-elj be egy személyt :rolling_eyes: `);
        }
        if (mention) {
            message.reply(` **Hello rendőrség?** :thinking:`, { files: [response.body.url] });
        }
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "rape",
    aliases: ["", ""],
    usage: "rape @user",
    description: ";)",
    accessableby: "Mindenki"
};
