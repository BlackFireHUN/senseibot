const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const links = ["http://cdn.blackfire.hu/img/slap/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        let cel = args[0];
        message.channel.startTyping(3);
        if (!cel) {
            message.reply(`felpofozza saját magát :scream:`, { files: [response.body.url] });
        }

        if (cel) {
            message.reply(` felpofozza ${cel}-t :open_mouth: `, { files: [response.body.url] });
        }
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "slap",
    aliases: ["", ""],
    usage: "slap",
    description: "Fel Pofozhatsz vele valakit vagy magad!",
    accessableby: "Mindenki"
};
