module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nincs megfelelő jogod a parancs végrehajtásához!");

    if(!args[0]) return message.channel.send("Add meg az újratölteni kivánt parancsot!");

    let commandName = args[0].toLowerCase();
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const props = require(`./${commandName}.js`)
        bot.commands.set(commandName, props)
    } catch(e) {
        return message.channel.send(`Nem lehet újratölteni: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`A parancs: \`${args[0].toUpperCase()}\` újratöltve!`)
}

module.exports.help = {
    name: "reload",
    aliases: ["",""],
    usage: "reload [parancs]",
    description: "Újra tölti az adott parancsot!",
    accessableby: "Admin"
}