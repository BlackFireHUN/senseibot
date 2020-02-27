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
      `Nem jelöltél meg felhasználót! Használat ${prefix}mute @falhasználó !`
    );

  if (toMute.id === message.author.id)
    return message.channel.send("Nem némíthatod saját magad!");
  if (toMute.highestRole.position >= message.member.highestRole.position)
    return message.channel.send(
      "Nem némíthatsz valakit aki nagyobb jogokkal rendelkezik nálad."
    );
  let role = message.guild.roles.find(r => r.name === "Tag");

  if (!toMute.roles.has(role.id))
    return message.channel.send("Ez a felhasználó már némítva van!");

  await toMute.removeRole(role), message.channel.send(`Elnémítva: ${toMute}`);
  console.log(`${message.author.username}: mute: ${toMute} used`);
  return;
};

module.exports.help = {
  name: "mute",
  aliases: ["silence", ""],
  usage: "mute",
  description: "Adott felhasználó némítása!",
  accessableby: "Admin"
};
