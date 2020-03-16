
module.exports.run = async (bot, message, args) => {
    const langCode = ISO6391.getCode(targetLang);
    if (langCode === '')
        return message.channel.send('Please provide a valid language!');

    // text needs to be less than 3000 length

    await message.channel.send(
        `Please enter the text you want to translate to ${targetLang}`
    );

    try {
        const filter = msg => msg.content.length > 0 && msg.content.length < 3000;
        var response = await message.channel.awaitMessages(filter, {
            max: 1,
            maxProcessed: 1,
            time: 90000,
            errors: ['time']
        });
        var text = response.first().content;
    } catch (e) {
        return message.channel.send('You did not enter any text!');
    }

    try {
        var res = await fetch(
            // Powered by Yandex.Translate http://translate.yandex.com/
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPI}&text=${encodeURI(
                text
            )}&lang=${langCode}`
        );
        const json = await res.json();
        message.channel.send(embedTranslation(json.text[0]));
    } catch (e) {
        console.error(e);
        return message.say(
            'Something went wrong when trying to translate the text'
        );
    }
};
module.exports.help = {
    name: "translate",
    aliases: ["unsilence", ""],
    usage: "translate",
    description: "Fordítás bármelyik yandex által ismert nyelvre!",
    accessableby: "Admin"
};
