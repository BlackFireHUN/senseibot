const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Információ  a szerverröl!")
    .setColor("#0078ff")
    .addField("ID", message.guild.id)
    .addField("Létrehozva", message.guild.createdAt)
    .addField("Felhasználok száma", bot.users.size)
    .addField("Csatornák száma", bot.channels.size);
  console.log(`${message.author.username}: serverinfo used`);
  message.channel.send(embed);

  return;
};

module.exports.help = {
  name: "serverinfo",
  aliases: ["", ""],
  usage: "serverinfo",
  description: "sensei elküld néhány infot a szerverröl!",
  accessableby: "Mindenki"
};
