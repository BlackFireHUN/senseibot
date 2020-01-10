const Discord = require('discord.js');
const c = require('chalk');

module.exports = async bot => {
        console.log(c.bgRed(`${bot.user.username} report: Ready to spy on ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`));
        try {
            let link = await bot.generateInvite(["ADMINISTRATOR"]);
            console.log(c.bgWhite(c.black(link)));
        } catch (e) {
            console.log(c.bgYellow(e.stack));
        }

    let statuses = [
        "-help",
        "animem.org",
        "A zene az jó"
    ]

    setInterval(() => {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
  
        }, 15000)
}