module.exports.run = async (bot, message, args) => {
  let role = message.guild.roles.find(r => r.name === "lewd");

  if (!message.member.roles.has(role.id))
    return message.channel.send("Még nincs hozzáférésed az nsfw csatornához!");

  await message.member.removeRole(role),
    message.channel.send(`${message.author.username}: BAAAKA!`);

  return;
};

module.exports.help = {
  name: "nonlewd",
  aliases: ["", ""],
  usage: "nonlewd",
  description: "elveszted a hozzáférésed az nsfw csatornához!",
  accessableby: "Mindenki"
};
