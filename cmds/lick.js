const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const links = ["http://cdn.blackfire.hu/img/lick/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        let cel = args[0];
        message.channel.startTyping(3);
        if (!cel) {
            message.reply(` Tag-elj be egy személyt :rolling_eyes: `);
        }

        if (cel) {
            message.reply(` megnyalta ${cel}-t :flushed:`, { files: [response.body.url] });
        }
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "lick",
    aliases: ["", ""],
    usage: "lick",
    description: "Ha megnyalnál valakit!",
    accessableby: "Mindenki"
};
