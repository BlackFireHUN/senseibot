const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle(`${bot.user.username} INFO`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00ae86)
    .setFooter("© animem", message.author.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setTimestamp()
    .addField(
      "A bot teljes neve",
      `${bot.user.username}#${bot.user.discriminator}`
    )
    .addField("ID", bot.user.id)
    .addField("Létrehozva", bot.user.createdAt)
    .addField("Felhasználok száma", bot.users.size)
    .addField("Csatornák száma", bot.channels.size)
    .addField(
      "Futási idő",
      moment.duration(bot.uptime).format("d[d ]h[h ]m[m ]s[s]"),
      true
    )
    .addField(
      "Memoria használat",
      `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      true
    )
    .addField("Ping", `${Math.round(bot.ping)}ms`, true);
  message.channel.send({ embed });

  return;
};

module.exports.help = {
  name: "botinfo",
  aliases: ["", ""],
  usage: "botinfo",
  description: "Néhány információ sensei röl!",
  accessableby: "Mindenki"
};
