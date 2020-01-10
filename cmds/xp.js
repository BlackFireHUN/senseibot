module.exports.run = async (bot, message, args, con) => {
	let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

	con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
		if(err) throw err;

		if(!rows[0]) return message.channel.send("Ennek a felhasználonak nincs xp-je.");
		
		let xp = rows[0].xp;
		message.channel.send(xp);
	});
}

module.exports.help = {
    name: "xp",
    aliases: ["",""],
    usage: "xp",
    description: "Kiírja az xp-d!",
    accessableby: "Mindenki"
}