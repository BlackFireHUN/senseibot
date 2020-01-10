const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('Hang csatornában kell lenned a parancs használatához!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send('Nem tudok csatlakozni a hangcsatornádhoz!');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('Nincs beszéd jogom a csatornádban!');
    }

    try {
        var connection = await voiceChannel.join();
    } catch (e) {
        console.error(e);
        return message.channel.send(e);
    }
    const dispatcher = connection.playStream(ytdl(args[0]))
    .on('end', () => {
        console.log('Zene végetért!');
        message.channel.send('Lejátszás véget ért!')
        voiceChannel.leave();
    })
    .on('error', error => {
        console.error(error)
    });
    dispatcher.setVolumeLogarithmic(0.5);
}

module.exports.help = {
    name: "play",
    aliases: ["",""],
    usage: "play [youtube link]",
    description: "Youtube videok hangját játsza le!",
    accessableby: "Mindenki"
}