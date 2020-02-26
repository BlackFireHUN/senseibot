const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
  let target = message.mentions.users.first() || message.author;
  if (!db[target.id])
    db[target.id] = {
      xp: 0,
      level: 0
    };
  let userInfo = db[target.id];
  const embed = new Discord.RichEmbed()
    .setTitle("Információk a felhasználóról!")
    .setAuthor(target.username, target.avatarURL)
    .setColor(0x0078ff)

    .setFooter("© Animem.org", message.author.avatarURL)
    .setThumbnail(target.avatarURL)
    .setTimestamp()
    .addField(
      "Teljes felhasználónév",
      `${target.username}#${target.discriminator}`
    )
    .addField("ID", target.id)
    .addField("Regisztrált", target.createdAt)
    .addField("szint", userInfo.level)
    .addField("XP", userInfo.xp + "/100");

  message.channel.send(embed);
  console.log(`${message.author.username}: userinfo used`);
  return;
};

module.exports.help = {
  name: "userinfo",
  aliases: ["", ""],
  usage: "userinfo @felhasználó",
  description: "Sensei információkat küld az adott felhasználórol!",
  accessableby: "Mindenki"
};
