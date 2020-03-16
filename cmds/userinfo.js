const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
  let target = message.mentions.users.first() || message.author;
  con.query('SELECT * FROM levelsys where id = ?', target.id, function (err, rows) {
    if (err) throw err;
    let xp = rows[0].xp;
    let lvl = rows[0].level;
  });
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
  //.addField("szint", level)
  //.addField("XP", xp);
  console.log(`${message.author.username}: userinfo used`);
  message.channel.send(embed);
  return;
};
module.exports.help = {
  name: "userinfo",
  aliases: ["", ""],
  usage: "userinfo @felhasználó",
  description: "Sensei információkat küld az adott felhasználórol!",
  accessableby: "Mindenki"
};
