const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const ownerid = "152615338213638144";
  if (message.author.id == ownerid) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  } else {
    return message
      .reply("Nem használhatod ezt a parancsot!")
      .Then(m => m.delete(10000));
  }
};

module.exports.help = {
  name: "leave",
  aliases: ["", ""],
  usage: "leave",
  description:
    "Sensei lejátszásának leállításához van... általában nem kell piszkálni!",
  accessableby: "BlackFire"
};
