module.exports.run = async (bot, message, args, db, fs) => {
    if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
        return message.channel.send(
            "Nincs megfelelő jogod a parancs végrehajtásához!"
        );
    let target = message.mentions.users.first() || message.author;
    let user = db[target.id];
    let argsresul;
    let argsresult;
    const ownerid = "152615338213638144";

    if (!db[target.id])
        db[target.id] = {
            xp: 0,
            level: 0
        };

    argsresul = args.join(" ");
    argsresult = argsresul.split(" ").pop();

    if (message.author.id !== ownerid) {
        if (argsresult > 1000) {
            return message.channel.send(
                `**${message.author.username}** a xp amit próbálsz hozzáadni unreális! próbálkozz kisebb számmal!`
            );
        } else {
            let intxp = parseInt(user.xp);
            let intarg = parseInt(argsresult);
            let count = intxp + intarg;
            if (count > 100) {
                let fixed = argsresult / 100;
                let numb = fixed.toFixed(2);
                let numb2 = fixed.toFixed();
                let strnumb = +numb.toString().slice(-2);
                let intnumb = parseInt(strnumb)
                let intlevel = parseInt(user.level);

                let countxp = intxp + intnumb;
                if (countxp > 100) {
                    let xptolevel = countxp / 100;
                    let numb3 = xptolevel.toFixed(2);
                    let numb4 = xptolevel.toFixed();
                    let strnumb2 = +numb3.toString().slice(-2);
                    let intnumb2 = parseInt(strnumb2)
                    let intnumb3 = parseInt(numb2)
                    let intnumb4 = parseInt(numb4)

                    var newlevel = intlevel + intnumb3 + intnumb4;
                    var newxp = intnumb2;
                } else {
                    let intnumb3 = parseInt(numb2)
                    var newlevel = intlevel + intnumb3;
                    var newxp = intnumb;
                }
                user.level = newlevel;
                user.xp = newxp;
            } else {
                user.xp = count;
            }

            message.channel.send(
                `**${target.username}** a szinted mostantol: **${user.level}** és **${user.xp}** xp-d van!`
            );
            fs.writeFile("./database.json", JSON.stringify(db), x => {
                if (x) console.error(x);
            });
        }
    } else {
        let intxp = parseInt(user.xp);
        let intarg = parseInt(argsresult);
        let count = intxp + intarg;
        if (count > 100) {
            let fixed = argsresult / 100;
            let numb = fixed.toFixed(2);
            let numb2 = fixed.toFixed();
            let strnumb = +numb.toString().slice(-2);
            let intnumb = parseInt(strnumb)
            let intlevel = parseInt(user.level);

            let countxp = intxp + intnumb;
            if (countxp > 100) {
                let xptolevel = countxp / 100;
                let numb3 = xptolevel.toFixed(2);
                let numb4 = xptolevel.toFixed();
                let strnumb2 = +numb3.toString().slice(-2);
                let intnumb2 = parseInt(strnumb2)
                let intnumb3 = parseInt(numb2)
                let intnumb4 = parseInt(numb4)

                var newlevel = intlevel + intnumb3 + intnumb4;
                var newxp = intnumb2;
            } else {
                let intnumb3 = parseInt(numb2)
                var newlevel = intlevel + intnumb3;
                var newxp = intnumb;
            }
            user.level = newlevel;
            user.xp = newxp;
        } else {
            user.xp = count;
        }

        message.channel.send(
            `**${target.username}** a szinted mostantol: **${user.level}** és **${user.xp}** xp-d van!`
        );
        fs.writeFile("./database.json", JSON.stringify(db), x => {
            if (x) console.error(x);
        });
    }
};

module.exports.help = {
    name: "givexp",
    aliases: ["", ""],
    usage: "givexp @felhasználó",
    description: "xp hozzáadása",
    accessableby: "Admin"
};
