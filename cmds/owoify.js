const client = require("nekos.life");
const neko = new client();

module.exports.run = async (bot, message, args) => {
  let argsresult;
  let owo;
  argsresult = args.join(" ");
  owo = await neko.sfw.OwOify({ text: `${argsresult}` });
  message.channel.send(`${message.author.username}: ${owo.owo}`);
};

module.exports.help = {
  name: "owoify",
  aliases: ["", ""],
  usage: "owoify [szöveg]",
  description: 'sokkal "owo"-bá teszi az adott szöveget!',
  accessableby: "Mindenki"
};
