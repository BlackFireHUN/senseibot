const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const links = ["http://cdn.blackfire.hu/img/pat/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        let cel = args[0];
        message.channel.startTyping(3);
        if (!cel) {
            message.reply(`kér egy simit! :sob:`, { files: [response.body.url] });
        }

        if (cel) {
            message.reply(`megsimogatja ${cel}-t :heart:`, { files: [response.body.url] });
        }
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "pat",
    aliases: ["", ""],
    usage: "pat",
    description: "Simi-simi!",
    accessableby: "Mindenki"
};
