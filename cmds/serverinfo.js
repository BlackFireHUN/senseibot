const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username,)
            .setDescription("Információ  a szerverröl!")
            .setColor("#0078ff")
            .addField("ID", message.guild.id)
            .addField("Létrehozva", message.guild.createdAt);
            console.log(`${message.author.username}: serverinfo used`);
        message.channel.send(embed);

        return;
}

module.exports.help = {
    name: "serverinfo",
    aliases: ["",""],
    usage: "",
    description: "",
    accessableby: "Mindenki"
}