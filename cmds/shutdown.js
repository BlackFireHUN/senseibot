module.exports.run = async (bot, message, args) => {
  const ownerid = "152615338213638144";
  if (message.author.id !== ownerid)
    return message.channel.send(
      "Nincs megfelelő jogod a parancs végrehajtásához!"
    );

  try {
    await message.channel.send(`${bot.user.username} leáll!`);
    process.exit();
  } catch (e) {
    message.channel.send(`HIBA: ${e.message}`);
  }
};

module.exports.help = {
  name: "shutdown",
  aliases: ["", ""],
  usage: "shutdown",
  description: "Leállítja a botot!",
  accessableby: "Admin"
};
