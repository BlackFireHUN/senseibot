const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;
    const embed = new Discord.RichEmbed()
  .setTitle("Információk a felhasználóról!")
  .setAuthor(target.username, target.avatarURL)
  .setColor(0x0078ff)

  .setFooter("© Animem.org", message.author.avatarURL)
  .setThumbnail(target.avatarURL)
  .setTimestamp()
  .addField("Teljes felhasználónév", `${target.username}#${target.discriminator}`)
  .addField("ID", target.id)
  .addField("Regisztrált", target.createdAt);
                 
        message.channel.send(embed);
        console.log(`${message.author.username}: userinfo used`);
        return;
}

module.exports.help = {
    name: "userinfo",
    aliases: ["",""],
    usage: "",
    description: "",
    accessableby: "Mindenki"
}