const Discord = require('discord.js');
const mysql = require('mysql');
const config = require("../config.json");

module.exports = async (bot, con) => {
    bot.once("message", async (message) => {
        if (message.author.bot) return;
        // declare stuff thet needs to be logged (expect content... that will be declared later)
        let userid = message.author.id;
        let username = message.author.username;
        let parancschannel = bot.channels.find(ch => ch.name === "bot-parancsok");
        let xp;
        let level;

        function genXP() {
            let min = 5;
            let max = 20;

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        con.query('SELECT * FROM levelsys where id = ?', userid, function (err, rows) {
            if (err) throw err;

            let sql;

            if (rows.length < 1) {
                sql = `INSERT INTO levelsys (id, level, xp, background) VALUES ('${userid}', 0, ${genXP()}, 'DEFAULT')`;
            } else {
                xp = rows[0].xp;
                sql = `UPDATE levelsys SET xp = ${xp + genXP()} WHERE id = '${userid}'`;
            }
            con.query(sql)
        });
        /* Text message logs
        if (message.channel.type === "text") {
            if (message.author.bot) return;


            con.connect(async function (err) {
                if (err) throw err;
                try {
                    await con.query('INSERT INTO levelsys (id, level, xp, background) SELECT * FROM (SELECT \'' + userid + '\', \'0\', \'1\', \'DEFAULT\' ) AS tmp WHERE NOT EXISTS (SELECT id FROM levelsys WHERE id = ' + userid + ') LIMIT 1;', function (err, result) {
                        if (err) console.log(err);
                    });
                    await con.query('SELECT * FROM levelsys where id = ?', userid, function (err, result, fields) {
                        if (err) console.log(err);
                        // console.log(result);
                        // console.log(fields);
                        xp = result[0].xp;
                        level = result[0].level;
                        console.log('xp before: ' + xp);
                        console.log('level before: ' + level);
                    });
                    await con.query('UPDATE levelsys SET xp = xp + 1 WHERE id = ?', userid, function (err, result, fields) {
                        if (err) console.log(err);
                        // console.log(result);
                        // console.log(fields);
                        console.log('ok');
                    });
                    console.log('xp outside: ' + xp);
                } catch (err) {
                    if (err) return console.log(err);
                }
                console.log("levelsys lefutott!")
            });
        }
    */
    });

}