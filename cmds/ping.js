module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send(`🏓 pingelés...`);
    msg.edit(`🏓 Pong\nVálaszidő: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI válaszidő: ${Math.round(bot.ping)}ms`);
}

module.exports.help = {
    name: "ping",
    aliases: ["",""],
    usage: "ping",
    description: "PONG! Megmondja az api és a bot válaszidejét!",
    accessableby: "Mindenki"
}