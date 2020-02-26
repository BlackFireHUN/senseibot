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
    if (argsresult > 100) {
      return message.channel.send(
        `**${message.author.username}** a szint amit próbálsz beállítani unreális! próbálkozz kisebb szintel!`
      );
    } else {
      user.level = argsresult;
      message.channel.send(
        `**${target.username}** a szinted mostantol: ${user.level}`
      );
      fs.writeFile("./database.json", JSON.stringify(db), x => {
        if (x) console.error(x);
      });
    }
  } else {
    user.level = argsresult;
    message.channel.send(
      `**${target.username}** a szinted mostantol: ${user.level}`
    );
    fs.writeFile("./database.json", JSON.stringify(db), x => {
      if (x) console.error(x);
    });
  }
};

module.exports.help = {
  name: "setlevel",
  aliases: ["", ""],
  usage: "setlevel @felhasználó",
  description: "Egyedi szint beállítása!",
  accessableby: "Admin"
};
