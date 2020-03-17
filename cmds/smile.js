const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const links = ["http://cdn.blackfire.hu/img/smile/"];
    const random = links[Math.floor(Math.random() * links.length)];
    superagent.get(random).end((err, response) => {
        let cel = args[0];
        message.channel.startTyping(3);
        message.reply(`mosolyog! :smile:`, { files: [response.body.url] });
        message.channel.stopTyping(true);
    });
};

module.exports.help = {
    name: "smile",
    aliases: ["", ""],
    usage: "smile",
    description: "Ha mosolyogsz!",
    accessableby: "Mindenki"
};
