module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
    return message.channel.send(
      "Nincs megfelelő jogod a parancs végrehajtásához!"
    );
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.delete().catch(O_o => {});

    if (!args[0])
      return message.reply(
        "add meg a törölni kívánt üzenet mennyiségét! maximum 100!!"
      );
    if (100 < `${args[0]}`)
      return message.reply(
        "egyszerre törölhető üzenetek maximális száma 100 !!"
      );
    message.channel.bulkDelete(args[0]).then(() => {
      message
        .reply(`${args[0]} üzenet törölve!`)
        .then(message => message.delete(5000));
    });
  }
};

module.exports.help = {
  name: "clear",
  aliases: ["", ""],
  usage: "clear",
  description:
    "Kitörli az összes üzenetet az adott csatornában! megj: 14 napnál régebbi üzenetet nem tud törölni!",
  accessableby: "Admin"
};
