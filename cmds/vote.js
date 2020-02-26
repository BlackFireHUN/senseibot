const Discord = require("discord.js");

const agree = "✅";
const disagree = "❎";
module.exports.run = async (bot, message, args) => {
  // message.channel.send(`Funkció ideiglenesen kikapcsolva!`);
  if (args[0].toLowerCase() === "hossz") {
    if (args[0].toLowerCase() === "hossz") {
      const ido = args.slice(1, 2).join(" ");

      const tovoteon = args.slice(2).join(" ");

      let msg = await message.channel.send(`Szavazás! '${tovoteon}'`);
      await msg.react(agree);
      await msg.react(disagree);

      const reactions = await msg.awaitReactions(
        reaction =>
          reaction.emoji.name === agree || reaction.emoji.name === disagree,
        { time: ido }
      );
      const embed = new Discord.RichEmbed()
        .setTitle("Szavazás vége!")
        .setColor(0x0078ff)
        .setDescription(`"${tovoteon}"`)
        .setFooter("© Animem.org")
        .setTimestamp()
        .addField(
          `${agree}: ${
            reactions.get(agree) ? reactions.get(agree).count - 1 : 0
          }`
        )
        .addField(
          `${disagree}: ${
            reactions.get(disagree) ? reactions.get(disagree).count - 1 : 0
          }`
        );

      await message.channel.send(embed);
      msg.delete();
    }
  } else {
    message.channel.send(
      "Add meg a szavazásra szánt időt. pl: vote hossz [idő ezredmásodpercben (1 mp = 1000 ms)] [szavazás témája]!"
    );
  }
};

module.exports.help = {
  name: "vote",
  aliases: ["", ""],
  usage:
    "vote hossz [idő ezredmásodpercben (1 mp = 1000 ms)] [szavazás témája]!",
  description: "szavazást hozhatsz létre!",
  accessableby: "Mindenki"
};
