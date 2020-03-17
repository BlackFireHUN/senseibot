const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const links = ["http://cdn.blackfire.hu/img/poke/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        let cel = args[0];
        message.channel.startTyping(3);
        if (!cel) {
            message.reply(`Tag-elj be egy személyt :rolling_eyes: `);
        }

        if (cel) {
            message.reply(` megbökte ${cel}-t :flushed:`, { files: [response.body.url] });
        }
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "poke",
    aliases: ["", ""],
    usage: "poke",
    description: "Megbökhetsz vele valakit!",
    accessableby: "Mindenki"
};
