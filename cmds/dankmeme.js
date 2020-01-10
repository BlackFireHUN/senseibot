
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {
   const subReddits = ["dankmeme"];
   const random = subReddits[Math.floor(Math.random() * subReddits.length)];
   const img = await randomPuppy(random);
   const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setImage(img)
   .setTitle(`subreddit: ${random}`)
   .setURL(`https://reddit.com/r/${random}`)

   message.channel.send(embed);
}

module.exports.help = {
    name: "dankmeme",
    aliases: ["",""],
    usage: "dankmeme",
    description: "Sensei küld egy random dankmeme-t redditröl!",
    accessableby: "Mindenki"
}