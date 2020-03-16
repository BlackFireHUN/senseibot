const Discord = require('discord.js');
const mysql = require('mysql');
const config = require("../config.json");

module.exports = bot => {
    bot.once("message", async message => {
        if (message.channel.type == "dm") return;
        // declare stuff thet needs to be logged (expect content... that will be declared later)
        let channelname = message.channel.name;
        let channelid = message.channel.id;
        let msgID = message.id;
        let gid = message.guild.id;
        let gn = message.guild.name;
        let userid = message.author.id;
        let username = message.author.username;
        let displayname = message.guild.member(message.author).displayName;
        let currentdate = new Date();
        let datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let msgtype = "text";
        let msgtxt = message.content;
        let fajlist = "null";
        // Text message logs
        if (message.channel.type === "text") {
            if (message.author.bot) return;
            if (message.attachments.size > 0) {
                var Attachment = (message.attachments).array();
                fajlist = Attachment.map(fajlok => `${fajlok.url}`).join(' ')

                if (!msgtxt) {
                    msgtxt = "null";
                } else {
                    msgtxt = msgtxt;
                }
            }

            var con = mysql.createConnection({
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database
            });
            con.connect(function (err) {
                if (err) throw err;
                var log = { datetime: datetime, guildname: gn, guildid: gid, channelname: channelname, channelid: channelid, username: username, displayname: displayname, userid: userid, msgcontent: msgtxt, attachment: fajlist, msgid: msgID, msgtype: msgtype };
                try {
                    con.query('INSERT INTO textlog SET ?', log, function (err) {
                        if (err) console.log(err);
                    });
                } catch (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
                    } else {
                        //handleHttpErrors(err.message);
                    }
                }
                return con.end();
            });
        }

    });
}