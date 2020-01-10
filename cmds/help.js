const Discord = require("discord.js");
const conf = require('../config.json');
const prefix = conf.prefix;

module.exports.run = async (bot, message, args) => {
   if(args[0] == "help") return message.channel.send(`elég a ${prefix}help is!`);

   if(args[0]){
    let command = args[0];
    if(bot.commands.has(command)) {
        command = bot.commands.get(command);

        var hembed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setAuthor(`${bot.user.username} Help`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`A prefix: ${prefix}\n\n**Parancs:** ${command.help.name}\n**Leírás:** ${command.help.description || "Leírás nem található!"}\n**Használat:** ${command.help.usage || "Használati útmutatás nem található!"}\n**Használhatja:** ${command.help.accessableby || "Mindenki"}`)           
        .setFooter("© Animem.org", message.author.avatarURL)
        message.channel.send(hembed)
    }}

    if(!args[0]) {
        message.delete();
        let dembed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username} Help`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`A prefix: ${prefix}\nAz elérhető parancsok:`)
        .addField("``ping`` ``vote`` ``userinfo`` ``serverinfo`` ``weather`` ``botinfo`` ``avatar`` ``clear`` ``reload`` ``shutdown`` ``eval`` ``say``")
        .setFooter("© Animem.org", message.author.avatarURL)
        message.author.send(dembed)
    }
}

module.exports.help = {
    name: "help",
    aliases: ["h","halp","commands"],
    usage: "",
    description: "",
    accessableby: "Mindenki"
}