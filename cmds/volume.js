const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
    let vol = args.join(" ");
    const voiceConnection = bot.voiceConnections.find(
      val => val.channel.guild.id == message.guild.id
    );
    if (voiceConnection === null)
      return message.channel.send("Nem játszok le semmit éppen!");
    const dispatcher = voiceConnection.player.dispatcher;
    const currentvol = dispatcher.volume * 100;
    if (!vol) {
      let embed = new Discord.RichEmbed()
        .setDescription(`**jelenlegi hangerő:** ${currentvol}%`)
        .setColor("#A65EA5");
      return message.channel.send(embed);
    }
    if (vol > 100 || vol < 10) {
      let embed = new Discord.RichEmbed()
        .setDescription(`**Ezt a hangerőt nem tudom beállítani!**`)
        .setColor("#A65EA5");
      return message.channel.send(embed);
    }

    let embed = new Discord.RichEmbed()
      .setDescription(`**Hangerő beállítva erre:** ${vol}`)
      .setColor("#A65EA5");
    dispatcher.setVolume(vol / 100);
    message.channel.send(embed);
  } else {
    let vol = args.join(" ");
    const voiceConnection = bot.voiceConnections.find(
      val => val.channel.guild.id == message.guild.id
    );
    if (voiceConnection === null)
      return message.channel.send("Nem játszok le semmit éppen!");
    const dispatcher = voiceConnection.player.dispatcher;
    const currentvol = dispatcher.volume * 100;
    if (!vol) {
      let embed = new Discord.RichEmbed()
        .setDescription(`**jelenlegi hangerő:** ${currentvol}%`)
        .setColor("#A65EA5");
      return message.channel.send(embed);
    }
    if (vol > 200 || vol < 0) {
      let embed = new Discord.RichEmbed()
        .setDescription(`**Ezt a hangerőt nem tudom beállítani!**`)
        .setColor("#A65EA5");
      return message.channel.send(embed);
    }

    let embed = new Discord.RichEmbed()
      .setDescription(`**Hangerő beállítva erre:** ${vol}`)
      .setColor("#A65EA5");
    dispatcher.setVolume(vol / 100);
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "volume",
  aliases: ["", ""],
  usage: "volume",
  description: "Sensei hangerejét állíthatod!",
  accessableby: "Mindenki"
};
