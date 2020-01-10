module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Nincs megfelelő jogod a parancs végrehajtásához!");

    let argsresult;
    let mChannel = message.mentions.channels.first();

    message.delete();
    if(mChannel) {
        argsresult = args.slice(1).join(" ");
        mChannel.send(argsresult);
    } else {
        argsresult = args.join(" ");
        message.channel.send(argsresult);
    }
}

module.exports.help = {
    name: "say",
    aliases: ["announcement",""],
    usage: "say [mondanivaló]",
    description: "Elküldi az üzenetet amit megadtál!",
    accessableby: "Admin"
}