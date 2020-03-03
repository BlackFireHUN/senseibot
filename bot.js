const Discord = require("discord.js");
const config = require("./config.json");
const c = require("chalk");
const fs = require("fs");
const Canvas = require("canvas");
const superagent = require("superagent");
const moment = require("moment");
const ra = require("remove-accents");
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

const prefix = config.prefix;

const bot = new Discord.Client();

bot.chat = require("discord.js-chatbot");

bot.chat.ChatBot(bot, {
  cleverUser: "B8mZi7J24Zc3NVjC",
  cleverKey: "6VygFL9KLe4AqWwJ9F5SnQZGz6YsdwTi",
  // cleverNick will be the session the bot uses from cleverbot.io.
  // This can be whatever you like.
  cleverNick: "sensei",
  watchMention: true
});

require("./util/eventHandler")(bot);

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
  // if the user is not on db add the user and change his values to 0
  if (!db[message.author.id])
    db[message.author.id] = {
      xp: 0,
      level: 0
    };
  db[message.author.id].xp++;
  let userInfo = db[message.author.id];
  if (userInfo.xp > 100) {
    userInfo.level++;
    userInfo.xp = 0;
    parancschannel.send(
      `**${message.author.username}** Gratulálok! Szintet léptél! Szinted: **${userInfo.level}**`
    );
  }
  fs.writeFile("./database.json", JSON.stringify(db), x => {
    if (x) console.error(x);
  });

  if (
    config.FILTER_LIST.some(word =>
      message.content.toLowerCase().includes(word)
    )
  ) {
    message.delete();
    message.author.send("Ne beszélj csúnyán!");
    const randommondat = [
      "A szivárványok szépek!",
      "A zene az jó!",
      "Szeretem a pillangókat!"
    ];
    const random =
      randommondat[Math.floor(Math.random() * randommondat.length)];
    return message.channel.send(
      `**${message.author.username}** Ezt akarta mondani: ${random}`
    );
  }

  if (message.author.bot) return;
  if (message.channel.type === "dm")
    return message.channel.send(
      "Nem használhatod ezt a parancsot privát üzenetben!"
    );

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

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args, db, fs);
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
  let role = member.guild.roles.find(r => r.name === "Tag");
  member.addRole(role);

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
  channel.send(member, attachment);
});
// üdvözlő üzenet vége! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
bot.on("message", message => {
  if (message.content === "Suki Suki Daisuki") {
    message.channel.send("hime!! hime!!");
  }
});
bot.on("message", message => {
  if (message.content === "hime!! hime!!") {
    message.channel.send("kira kira rin ☆");
  }
});
bot.on("message", message => {
  if (message.content === "kira kira rin ☆") {
    message.channel.send("kimi to minna ireba watashi tte zettai muteki");
  }
});
bot.on("message", message => {
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
        `../../../home/admin/web/srv02.animedrive.hu/public_html/animemlog/${felhasznalo}_${felhasznaloid}.txt`,
        ra.remove(message),
        "utf8",
        { flags: "a+" }
      );
    }

    function fullchatlog(message) {
      fs.appendFileSync(
        `../../../home/admin/web/srv02.animedrive.hu/public_html/animemlog/${gn}_${gid}.txt`,
        ra.remove(message),
        "utf8",
        {
          flags: "a+"
        }
      );
    }
  }
});
bot.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

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
      `[${newMember.user.username}] belépett ide: [${newMember.guild.name}]  [${newMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[${newMember.user.username}] belépett ide: [${newMember.guild.name}]  [${newMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(
        `../../../home/admin/web/srv02.animedrive.hu/public_html/animemlog/voicechat.txt`,
        ra.remove(message),
        "utf8",
        {
          flags: "a+"
        }
      );
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
      `[${newMember.user.username}] kilépett innen: [${newMember.guild.name}]  [${oldMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[${newMember.user.username}] kilépett innen: [${newMember.guild.name}]  [${oldMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(
        `../../../home/admin/web/srv02.animedrive.hu/public_html/animemlog/voicechat.txt`,
        ra.remove(message),
        "utf8",
        {
          flags: "a+"
        }
      );
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
      `[${newMember.user.username}] atlepett ide: [${newMember.guild.name}] [${oldMember.voiceChannel.name}] --> [${newMember.voiceChannel.name}] ${datetime}`
    );
    fullchatlog(
      `[[${newMember.user.username}]] atlepett ide: [${newMember.guild.name}] [${oldMember.voiceChannel.name}] --> [${newMember.voiceChannel.name}] ${datetime}\r\n`
    );
    function fullchatlog(message) {
      fs.appendFileSync(
        `../../../home/admin/web/srv02.animedrive.hu/public_html/animemlog/voicechat.txt`,
        ra.remove(message),
        "utf8",
        {
          flags: "a+"
        }
      );
    }
  }
});
