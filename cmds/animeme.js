const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
  const subReddits = ["Animemes"];
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];
  const img = await randomPuppy(random);
  const embed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setImage(img)
    .setTitle(`subreddit: ${random}`)
    .setURL(`https://reddit.com/r/${random}`);

  message.channel.send(embed);
};

module.exports.help = {
  name: "animeme",
  aliases: ["", ""],
  usage: "animeme",
  description: "Sensei küld egy random anime meme-t redditröl!",
  accessableby: "Mindenki"
};
