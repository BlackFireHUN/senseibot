const Discord = require('discord.js');
const config = require('./config.json');
const c = require('chalk');
const fs = require('fs');
const Canvas = require('canvas');
const music = require('discord.js-music-v11');
const mysql = require("mysql");

const prefix = config.prefix;

const bot = new Discord.Client();
require("./util/eventHandler")(bot)
music(bot, {
    prefix: '-',       // Prefix of '-'.
    global: true,     // Server-specific queues.
    maxQueueSize: 10,  // Maximum queue size of 10.
    clearInvoker: false, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
    channel: 'asd'   // Name of voice channel to join. If omitted, will instead join user's voice channel.
});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Nem Található parancs!");
        return;
    }

    console.log(`${jsfiles.length} parancs betöltve!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        bot.commands.set(props.help.name, props);

    });
});
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "sensei"
});

con.connect(err => {
	if(err) throw err;
	console.log("Csatlakozva az adatbázishoz!");
});

function generateXp() {
	let min = 20;
	let max = 30;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.login(config.token)

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.sendMessage("Nem használhatod ezt a parancsot privát üzenetben!");

    con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		let sql;

		if(rows.length < 1) {
			sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`;
		} else {
			let xp = rows[0].xp;
            sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;           
		}
		con.query(sql);
	});

	if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)) {
		message.delete();
		return;
	}

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args, con);

});


// üdvözlő üzenet! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

bot.on('guildMemberAdd',async (member) => {
	const channel = member.guild.channels.find(ch => ch.name === 'üdvözlünk');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#d9b500';    
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
    ctx.fillText('Üdv a szerveren,', canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(canvas.width / 2.5, canvas.height / 1.5);

    ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(member, attachment);
});
// üdvözlő üzenet vége! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
bot.on('message', message => {
    if (message.content === 'XD') {
    message.channel.send('XDD');
    }
  });
   bot.on('message', message => {
    if (message.content === 'Suki Suki Daisuki') {
    message.channel.send('hime!! hime!!');
    }
  });
  bot.on('message', message => {
    if (message.content === 'hime!! hime!!') {
    message.channel.send('kira kira rin ☆');
    }
  });
   bot.on('message', message => {
    if (message.content === 'kira kira rin ☆') {
    message.channel.send('kimi to minna ireba watashi tte zettai muteki');
    }
  });
    bot.on('message', message => {
    if (message.content === 'what?') {
    message.channel.send('Nani???4?');
    }
  });