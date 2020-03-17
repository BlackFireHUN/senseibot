const Discord = require("discord.js");
const conf = require("../config.json");
const prefix = conf.prefix;

module.exports.run = async (bot, message, args) => {
  if (args[0] == "help")
    return message.channel.send(`elég a ${prefix}help is!`);

  if (args[0]) {
    let command = args[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);

      var hembed = new Discord.RichEmbed()
        .setColor(0x00ae86)
        .setAuthor(`${bot.user.username} Help`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(
          `A prefix: ${prefix}\n\n**Parancs:** ${
          command.help.name
          }\n**Leírás:** ${command.help.description ||
          "Leírás nem található!"}\n**Használat:** ${command.help.usage ||
          "Használati útmutatás nem található!"}\n**Használhatja:** ${command
            .help.accessableby || "Mindenki"}`
        )
        .setFooter("© Animem.org", message.author.avatarURL);
      message.channel.send(hembed);
    }
  }

  if (!args[0]) {
    message.delete();
    let dembed = new Discord.RichEmbed()
      .setAuthor(`${bot.user.username} Help`)
      .setThumbnail(bot.user.displayAvatarURL)
      .setColor(0x00ae86)
      .setTimestamp()
      .setDescription(`A prefix: ${prefix}`)
      .addField(
        "Az elérhető parancsok:",
        "``ping`` ``vote`` ``userinfo`` ``serverinfo`` ``weather`` ``botinfo`` ``avatar`` ``clear`` ``say`` ``dankmeme`` ``meme`` ``animeme`` ``nekomeme`` ``owoify`` ``ship`` ``cuddle`` ``sad`` ``bite`` ``stare`` ``teehee`` ``wasted`` ``mute`` ``unmute`` ``reload`` ``setlevel`` ``lewd`` ``nsfw`` ``hentai`` ``hneko`` ``yuri`` ``trap`` ``keta`` ``r34``"
      )
      .addField("Music modul segítség:", "``mhelp``")
      .setFooter("© Animem.org", message.guild.iconURL);
    message.author.send(dembed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ["h", "halp", "commands"],
  usage: "help parancs neve",
  description: "alapvető segítség a parancsok használatárol!",
  accessableby: "Mindenki"
};
