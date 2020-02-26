const weather = require("weather-js");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  weather.find({ search: args.join(" "), degreeType: "C" }, function(
    err,
    result
  ) {
    if (err) message.channel.send(err);
    if (result.length === 0) {
      message.channel.send("**Írj be egy létező várost.**");
      return;
    }

    var current = result[0].current;
    var location = result[0].location;

    const embed = new Discord.RichEmbed()
      .setTitle("Időjárás")
      .setAuthor(`Időjárás itt: ${current.observationpoint}`)
      .setColor(0x00ae86)
      .setDescription(`**${current.skytext}**`)
      .setThumbnail(current.imageUrl)
      .setFooter(`© Animem.org`, message.author.avatarURL)
      .addField("időzóna", `${location.timezone}`, true)
      .addField("Hőmérséklet", `${current.temperature} c°`, true)
      .addField("szél", current.winddisplay, true)
      .addField("páratartalom", `${current.humidity}%`, true)
      .setTimestamp();
    message.channel.send({ embed });
  });
};

module.exports.help = {
  name: "weather",
  aliases: ["", ""],
  usage: "weather [város]",
  description: "sensei elküldi a megadott városban az aktuális időjárást!",
  accessableby: "Mindenki"
};
