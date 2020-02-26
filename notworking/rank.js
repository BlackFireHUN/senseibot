const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports.run = async (bot, message, args, con) => {
  let target =
    message.mentions.users.first() ||
    message.guild.members.get(args[1]) ||
    message.author;

  let szint;
  con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if (err) throw err;

    if (!rows[0])
      return message.channel.send("Ennek a felhasználonak nincs xp-je.");

    let xp = rows[0].xp;
    if (xp >= 1 && xp < 1000) {
      szint = "1";
    } else if (xp >= 1000 && xp < 2000) {
      szint = "2";
    } else if (xp >= 2000 && xp < 3000) {
      szint = "3";
    } else if (xp >= 3000 && xp < 4000) {
      szint = "4";
    } else if (xp >= 4000 && xp < 5000) {
      szint = "5";
    } else if (xp >= 5000 && xp < 6000) {
      szint = "6";
    } else if (xp >= 6000 && xp < 7000) {
      szint = "7";
    } else if (xp >= 7000 && xp < 8000) {
      szint = "8";
    } else if (xp >= 8000 && xp < 9000) {
      szint = "9";
    } else if (xp >= 9000 && xp < 10000) {
      szint = "10";
    } else if (xp >= 10000 && xp < 11000) {
      szint = "11";
    } else if (xp >= 11000 && xp < 12000) {
      szint = "12";
    } else if (xp >= 12000 && xp < 13000) {
      szint = "13";
    } else if (xp >= 13000 && xp < 14000) {
      szint = "14";
    } else if (xp >= 14000 && xp < 15000) {
      szint = "15";
    }
  });
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    let fontSize = 70;

    do {
      ctx.font = `${(fontSize -= 10)}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);
    return ctx.font;
  };

  const channel = message.guild.channels.find(ch => ch.name === "parancsok");
  if (!channel) return;

  const member = message.author;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("./wallpaper.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#d9b500";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Szint: ${szint}`, canvas.width / 2.5, canvas.height / 3.5);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(canvas.width / 2.5, canvas.height / 1.5);

  ctx.font = applyText(canvas, member.username);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(member.username, canvas.width / 2.5, canvas.height / 1.8);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Helyezés: soon TM`, canvas.width / 2.5, canvas.height / 1.5);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.displayAvatarURL);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  channel.send(`<@${member.id}>`, attachment);
};

module.exports.help = {
  name: "rank",
  aliases: ["level", ""],
  usage: "rank",
  description: "Megmutatja a rankod és szinted",
  accessableby: "Mindenki"
};
