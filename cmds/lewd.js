module.exports.run = async (bot, message, args) => {
  let role = message.guild.roles.find(r => r.name === "lewd");

  if (message.member.roles.has(role.id))
    return message.channel.send("Már van hozzáférésed az nsfw csatornához!");

  await message.member.addRole(role),
    message.channel.send(`${message.author.username}: Jó szórakozást!`);

  return;
};

module.exports.help = {
  name: "lewd",
  aliases: ["", ""],
  usage: "lewd",
  description: "Hozzáférést nyersz az nsfw csatornához (18+)!",
  accessableby: "Mindenki"
};
