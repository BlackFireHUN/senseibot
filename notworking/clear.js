module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_MESSAGES"]))
    return message.channel.send(
      "Nincs megfelelő jogod a parancs végrehajtásához!"
    );
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.fetchMessages().then(
      function(list) {
        message.channel.BulkDelete(list);
      },
      function(err) {
        message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
      }
    );
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
