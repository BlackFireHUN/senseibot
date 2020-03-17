const conf = require("../config.json");
const prefix = conf.prefix;

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(
            "Nincs megfelelő jogod a parancs végrehajtásához!"
        );

    const user = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');

    if (!user) {
        try {

            if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Nem találok felhasználót ezzel az ID-val!');

            user = message.guild.members.get(args.slice(0, 1).join(' '));
            user = user.user;
        } catch (error) {
            return message.reply('Nem találok felhasználót ezzel az ID-val!');
        }
    }
    if (user === message.author) return message.channel.send('Nem bannolhatod magad!');
    if (!banReason) return message.reply('Nem adtál meg okot a banra!');
    if (!message.guild.member(user).bannable) return message.reply('A botnak nincs meg a megfelelő joga!');

    await message.guild.member(user).ban(banReason);

    const Discord = require('discord.js');
    const banConfirmationEmbed = new Discord.RichEmbed()
        .setColor('RED')
        .setDescription(`✅ ${user.tag} Sikeresen kitiltva`);
    message.channel.send({
        embed: banConfirmationEmbed
    });

    const privchannel = message.member.guild.channels.find(ch => ch.name === "bot-parancsok");
    const modlogChannelID = '681551031544578136';
    if (modlogChannelID.length !== 0) {
        if (!bot.channels.get(modlogChannelID)) return undefined;

        const banConfirmationEmbedModlog = new Discord.RichEmbed()
            .setAuthor(`Bannolta: **${message.author.username}#${message.author.discriminator}**`, message.author.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor('RED')
            .setTimestamp()
            .setDescription(`**CSELEKMÉNY**: Ban
        **FELHASZNÁLÓ**: ${user.username}#${user.discriminator} (${user.id})
        **INDOKLÁS**: ${banReason}`);
        privchannel.send({
            embed: banConfirmationEmbedModlog
        });
    }
};

module.exports.help = {
    name: "ban",
    aliases: ["", ""],
    usage: "ban <@felhasználó> indoklás",
    description: "Adott felhasználó kitiltása a szerverröl!",
    accessableby: "Admin"
};
