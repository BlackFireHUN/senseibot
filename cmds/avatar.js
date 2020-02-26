module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Avatár generálása...");
  let target = message.mentions.users.first() || message.author;

  message.channel.send({
    files: [
      {
        attachment: target.displayAvatarURL,
        name: "avatar.png"
      }
    ]
  });

  msg.delete();
};

module.exports.help = {
  name: "avatar",
  aliases: ["", ""],
  usage: "avatar @felhasználó",
  description: "Sensei elküldi az adott felhasználó avatárját!",
  accessableby: "Mindenki"
};
