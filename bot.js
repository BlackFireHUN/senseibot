const Discord = require("discord.js");
const config = require("./config.json");
const c = require("chalk");
const fs = require("fs");
const Canvas = require("canvas");
const superagent = require("superagent");
var mysql = require('mysql');
const moment = require("moment");
const ra = require("remove-accents");
const prefix = config.prefix;

const bot = new Discord.Client();

var con = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});
con.connect(async function (err) {
  if (err) throw err;
  console.log("connected to database");
});

require("./util/eventHandler")(bot, con);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("Nem Található parancs!");
    return;
  }

  console.log(`${jsfiles.length} parancs betöltve!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.login(config.token);


bot.on("message", async message => {
  const parancschannel = bot.channels.find(ch => ch.name === "bot-parancsok");
  if (
    config.FILTER_LIST.some(word =>
      message.content.toLowerCase().includes(word)
    )
  ) {
    if (message.channel.id === "643093978799013901") return;
    if (message.channel.id === "643172205903085578") return;
    if (message.channel.id === "645514122959650826") return;
    if (message.channel.id === "643854113733607435") return;
    if (message.channel.id === "643563061692727296") return;
    if (message.channel.id === "681597174932701216") return;
    if (message.channel.id === "681610982468223022") return;
    message.delete();
    message.author.send("Ne beszélj csúnyán!");
    userInfo.xp = 0;
    const randommondat = [
      "A szivárványok szépek!",
      "A zene az jó!",
      "Szeretem a pillangókat!",
      "BlackFire nem lány!"
    ];
    const random =
      randommondat[Math.floor(Math.random() * randommondat.length)];
    return message.channel.send(
      `**${message.author.username}** Ezt akarta mondani: ${random}`
    );
  }

  if (message.author.bot) return;


  if (
    /(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content) &&
    !message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])
  ) {
    message.delete();
    message.author.send("Nem küldhetsz Discord invite linkeket!");
    return;
  }

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);


  if (message.channel.type == "dm") {
    if (command.startsWith(prefix)) {
      return message.channel.send("Nem használhatod ezt a parancsot privát üzenetben!");
    } else {
      return message.channel.send("Ne zaklass! kösz!");
    }
  }


  if (!command.startsWith(prefix)) return;
  const panic = JSON.parse(fs.readFileSync("./panic.json", "utf8"));
  if (panic.panic === "1" && message.author.id != "152615338213638144") return message.channel.send(`${bot.user.username} pánik módban van! Csak BlackFire használhatja jelenleg!`);
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args, fs, con);
});

// üdvözlő üzenet! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");

  let fontSize = 70;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};

bot.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find(ch => ch.name === "üdvözlünk");
  const privchannel = member.guild.channels.find(ch => ch.name === "spy");

  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  var files = fs.readdirSync("./imgs/");
  /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
  let chosenFile = files[Math.floor(Math.random() * files.length)];

  const background = await Canvas.loadImage(`./imgs/${chosenFile}`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#d9b500";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Üdv a szerveren,", canvas.width / 2.5, canvas.height / 3.5);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(canvas.width / 2.5, canvas.height / 1.5);

  ctx.font = applyText(canvas, member.displayName);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  privchannel.send(`${member.user.username}: ${member.user.createdAt}`);
  var message = "Olvasd el a **szabályokat** a szerver eléréséhez!";
  let embedtodm = new Discord.RichEmbed()
    .setAuthor(`Üdv, ${member.user.username}`, bot.user.avatarURL)
    .setColor("00ff00")
    .addField("Üdv az animem-en!", "Olvasd el a **szabályokat** hogy hozzáférj a szerverhez!")
    .addField("Segítség!", "Segítséget a **helpdesk** csatornában kérhetsz!")
    .addField("Egyéb: ", "Az adminok nem fognak válaszolni a privát üzenetekre!")
    .setImage('http://blackfire.hu/dl/final.png');
  member.send(embedtodm);

  await channel.send(member, attachment);
  channel.send("Olvasd el a **szabályokat** hogy hozzáférj a szerverhez!");


});
// üdvözlő üzenet vége! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
bot.on("message", message => {
  if (message.content === "Suki Suki Daisuki") {
    message.channel.send("hime!! hime!!");
  }

  if (message.content === "hime!! hime!!") {
    message.channel.send("kira kira rin ☆");
  }

  if (message.content === "kira kira rin ☆") {
    message.channel.send("kimi to minna ireba watashi tte zettai muteki");
  }

  if (message.content === "what?") {
    message.channel.send("Nani???4?");
  }
});
bot.on("message", message => {
  if (message.content.toLowerCase() === "baka") {
    superagent
      .get("https://nekos.life/api/v2/img/baka")
      .end((err, response) => {
        message.channel.send({ file: response.body.url });
      });
  }
});
bot.on("message", async message => {
  if (message.channel.type === "text") {
    //if(message.guild.id === "szerverid") return;
    if (message.channel.id === "643093978799013901") return;
    if (message.channel.id === "643172205903085578") return;
    if (message.channel.id === "645514122959650826") return;
    if (message.channel.id === "643854113733607435") return;
    if (message.channel.id === "643563061692727296") return;
    if (message.channel.id === "681597174932701216") return;
    if (message.channel.id === "681610982468223022") return;

    let szoba = message.channel.name;
    let szobaid = message.channel.id;
    const Mtime = moment().format("LLLL"); //creates time stamp
    const msgID = message.id;
    const gn = message.guild.name.replace(
      /[^a-zA-Z0-9íőúéáűöüóöÍŐÚÉÁŰÖÜÓÖ ]/g,
      " "
    );
    const gid = message.guild.id;
    let felhasznalo = message.author.username.replace(
      /[^a-zA-Z0-9íőúéáűöüóöÍŐÚÉÁŰÖÜÓÖ ]/g,
      " "
    );
    let felhasznaloid = message.author.id;
    var Attachment = message.attachments.array();
    fullchatlog(
      `${Mtime}: ${gn}  ${szoba} (szoba ID:${szobaid}) ${felhasznalo}(ID:${felhasznaloid}): ${message.content}  \r\n`
    );
    fullchatloguser(
      `${Mtime}: ${gn}  ${szoba} (szoba ID:${szobaid}) ${felhasznalo}(ID:${felhasznaloid}): ${message.content}  \r\n`
    );

    function fullchatloguser(message) {
      fs.appendFileSync(
        `./log/${felhasznalo}_${felhasznaloid}.txt`,
        ra.remove(message),
        "utf8",
        { flags: "a+" }
      );
    }

    function fullchatlog(message) {
      fs.appendFileSync(`./log/${gn}_${gid}.txt`, ra.remove(message), "utf8", {
        flags: "a+"
      });
    }
  }
});
bot.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  var res = newMember.user.username.replace(/[^\x00-\x7F]/g, "");


  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    var currentdate = new Date();
    var datetime =
      "Date Time: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    // User Joins a voice channel
    console.log(
      `[${res}] belépett ide: [${newMember.guild.name}]  [${newMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[${res}] belépett ide: [${newMember.guild.name}]  [${newMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(`./log/voicechat.txt`, ra.remove(message), "utf8", {
        flags: "a+"
      });
    }
  } else if (newUserChannel === undefined) {
    var currentdate = new Date();
    var datetime =
      "Date Time: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    // User leaves a voice channel
    console.log(
      `[${res}] kilépett innen: [${newMember.guild.name}]  [${oldMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[${res}] kilépett innen: [${newMember.guild.name}]  [${oldMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(`./log/voicechat.txt`, ra.remove(message), "utf8", {
        flags: "a+"
      });
    }
  } else {
    var currentdate = new Date();
    var datetime =
      "Date Time: " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    //user moved
    if (oldMember.voiceChannel.name === newMember.voiceChannel.name) return;
    console.log(
      `[${res}] atlepett ide: [${newMember.guild.name}] [${oldMember.voiceChannel.name}] --> [${newMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[[${res}]] atlepett ide: [${newMember.guild.name}] [${oldMember.voiceChannel.name}] --> [${newMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(`./log/voicechat.txt`, ra.remove(message), "utf8", {
        flags: "a+"
      });
    }
  }
});
