const conf = require("../config.json");
const prefix = conf.prefix;

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(
            "Nincs megfelelő jogod a parancs végrehajtásához!"
        );

    const user = message.mentions.users.first();
    const kickReason = args.slice(1).join(' ');

    if (!user) {
        try {

            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Nem találok felhasználót ezzel az ID-val!');

        } catch (error) {
            return message.reply('Nem találok felhasználót ezzel az ID-val!');
        }
    }
    if (user === message.author) return message.channel.send('Nem rúghatod ki magad!');
    if (!kickReason) return message.reply('Nem adtál meg okot a kirúgásra!');
    if (!message.guild.member(user).kickable) return message.reply('A botnak nincs meg a megfelelő joga!');

    await message.guild.member(user).kick(kickReason);

    const Discord = require('discord.js');
    const kickConfirmationEmbed = new Discord.RichEmbed()
        .setColor('RED')
        .setDescription(`✅ ${user.tag} Sikeresen kirúgva`);
    message.channel.send({
        embed: kickConfirmationEmbed
    });

    const privchannel = message.member.guild.channels.find(ch => ch.name === "bot-parancsok");
    const modlogChannelID = '681551031544578136';
    if (modlogChannelID.length !== 0) {
        if (!bot.channels.get(modlogChannelID)) return undefined;

        const kickConfirmationEmbedModlog = new Discord.RichEmbed()
            .setAuthor(`Kirúgta: **${message.author.username}#${message.author.discriminator}**`, message.author.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor('RED')
            .setTimestamp()
            .setDescription(`**CSELEKMÉNY**: Kick
        **FELHASZNÁLÓ**: ${user.username}#${user.discriminator} (${user.id})
        **INDOKLÁS**: ${kickReason}`);
        privchannel.send({
            embed: kickConfirmationEmbedModlog
        });
    }
};

module.exports.help = {
    name: "kick",
    aliases: ["", ""],
    usage: "kick <@felhasználó> indoklás",
    description: "Adott felhasználó kirúgása a szerverröl!",
    accessableby: "Admin"
};
