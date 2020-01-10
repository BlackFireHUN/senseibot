module.exports.run = async (bot, message, args) => {
    if (!message.member.voiceChannel) return message.channel.send('Nem vagyok hangcsatornában!');
    message.member.voiceChannel.leave();
    return;
}

module.exports.help = {
    name: "stop",
    aliases: ["begone","leave"],
    usage: "stop",
    description: "Leállítja a youtube videó hangjának lejátszását!!",
    accessableby: "Mindenki"
}