const conf = require("../config.json");
const prefix = conf.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "Nincs megfelelő jogod a parancs végrehajtásához!"
    );
  if (
    message.channel
      .permissionsFor(message.member)
      .hasPermission("MANAGE_MESSAGES")
  );

  let toMute =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!toMute)
    return message.channel.send(
      `Nem jelöltél meg felhasználót! Használat ${prefix}unmute @falhasználó !`
    );

  let role = message.guild.roles.find(r => r.name === "Tag");

  if (toMute.roles.has(role.id))
    return message.channel.send("Ez a felhasználó nincs némítva!");

  await toMute.addRole(role),
    message.channel.send(`Némítás kikapcsolva számára: ${toMute}`);
  console.log(`${message.author.username}: unmute: ${toMute} used`);
  return;
};
module.exports.help = {
  name: "unmute",
  aliases: ["unsilence", ""],
  usage: "unmute",
  description: "Adott némított felhasználó némításának levétele!",
  accessableby: "Admin"
};
