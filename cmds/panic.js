const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  const panic = JSON.parse(fs.readFileSync("./panic.json", "utf8"));
  let ownerid = "152615338213638144";
  let whatto = args[0];
  if (message.author.id !== ownerid) return message.channel.send("Nincs megfelelő jogod a parancs végrehajtásához!");

  if (!whatto) return message.channel.send(`sensei pánik beállítása: ${panic.panic}`);

  if (whatto === panic.panic) {
    message.channel.send(":thinking:");
  } else {
    var myOptions = {
      panic: whatto
    };
    var data = JSON.stringify(myOptions);

    fs.writeFile('./panic.json', data, function (err) {
      if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
      }
      console.log('Configuration saved successfully.')
    });
  }
};

module.exports.help = {
  name: "panic",
  aliases: ["", ""],
  usage: "panic",
  description: "pánik parancs",
  accessableby: "BlackFire"
};
