module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("Nincs megfelelő jogod a parancs végrehajtásához!");
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.fetchMessages()
            .then(function(list){
                message.channel.bulkDelete(list);
            }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
    }
}

module.exports.help = {
    name: "clear",
    aliases: ["",""],
    usage: "clear",
    description: "Kitörli az összes üzenetet az adott csatornában!",
    accessableby: "Admin"
}