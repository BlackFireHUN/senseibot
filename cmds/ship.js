const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const Jimp = require("jimp");
module.exports.run = async (client, message, args) => {
  let replies = [
    `Sosem fog működni`,
    `Kevés esély van rá hogy működjön`,
    `👀`,
    `Működhet`,
    `Talán Működhet`,
    `Nagy esély van rá hogy működjön`,
    `Működni fog <3`,
    `Jó párosítás <3`,
    `TÖKÉLETES PÁROSÍTÁS ❤`
  ];
  let result = Math.floor(Math.random() * replies.length);
  let mUser = message.mentions.users.first();
  let mUser2 = message.mentions.users.last();
  if (!mUser) return message.reply(`Tagelj meg két személyt!`);
  let elsofel = mUser.username.slice(0, 3);
  let masdodikfel = mUser2.username.slice(0, 3);
  let shipnev = elsofel + masdodikfel;
  let shipnev2 = shipnev.toLowerCase();
  message.channel.startTyping(200);
  const mUserA = mUser.avatarURL;
  var imagetobase = `./kepek/ship/Shipping.png`;
  Jimp.read(mUser.avatarURL, function(err, imagetouse) {
    if (err) throw err;
    imagetouse
      .quality(60)
      .resize(173, 173)
      .write("./kepek/ship/imagetouse.jpg");
    Jimp.read(mUser2.avatarURL, function(err, imagetouse2) {
      if (err) throw err;
      imagetouse2
        .quality(60)
        .resize(173, 173)
        .write("./kepek/ship/imagetouse2.jpg");
      Jimp.read(imagetobase, function(err, mydude) {
        if (err) throw err;
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function(font) {
          mydude.quality(60);
          mydude.print(font, 1, 80, mUser.username);
          mydude.print(font, 281, 80, mUser2.username);
          mydude.composite(imagetouse, 1, 102);
          mydude.composite(imagetouse2, 281, 102);
          mydude.write("./kepek/ship/senseishipkep.jpg");
          mydude.getBuffer(`image/jpeg`, (err, buf) => {
            if (err) return err;
            message.channel.send(
              `${replies[result]}, ship nevük: **${shipnev2}** `,
              { files: [{ attachment: buf, name: `senseishipkep.jpg` }] }
            );
          });
        });
      });
    });
  });
  message.channel.stopTyping(true);
};

module.exports.help = {
  name: "ship",
  aliases: ["", ""],
  usage: `${config.prefix}ship 1.személy 2.személy`,
  description: "Jelölj meg kettő személyt akit shippelni akarsz",
  accessableby: "Mindenki"
};
