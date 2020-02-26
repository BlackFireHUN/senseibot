const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle("BOT INFO")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00ae86)
    .setDescription("Információ a botrol")
    .setImage(
      "http://pm1.narvii.com/6331/ec99d22c8ea88fab58f1a3584b4b234fa2698563_hq.jpg"
    )
    .setFooter("© animem", message.author.avatarURL)
    .setThumbnail("https://avatarfiles.alphacoders.com/510/51031.jpg")
    .setTimestamp()
    .addField(
      "A bot teljes neve",
      `${bot.user.username}#${bot.user.discriminator}`
    )
    .addField("ID", bot.user.id)
    .addField("Létrehozva", bot.user.createdAt)
    .addField("Felhasználok száma", bot.users.size)
    .addField("Csatornák száma", bot.channels.size);

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
