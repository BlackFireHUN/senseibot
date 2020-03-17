module.exports.run = async (bot, message, args) => {
  let role = message.guild.roles.find(r => r.name === "lewd");

  if (message.member.roles.has(role.id)) {
    await message.member.removeRole(role);
    return message.channel.send(
      `${message.author.username}: Már nem vagy lewd? A jogod már biztosan nincs meg :(`
    );
  }
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
