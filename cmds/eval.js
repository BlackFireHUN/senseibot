const util = require("util");

const ownerid = "152615338213638144";
module.exports.run = async (bot, message, args) => {
    if(message.author.id == ownerid) {
        let toEval = args.join(" ")
        let evaluated = util.inspect(eval(toEval, { depth: 0 }));
        try {

            if(toEval){
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`*Lefuttatva ${hrDiff[0] > 0 ? `${hrDiff[0]}s `: ''}${hrDiff[1] / 1000000}ms alatt.*\`\`\`javascript\n${evaluated}\n\`\`\``, {maxLength: 1900 });
            } else{
                message.channel.send("HIBA! írj be js kódot.");
            }

        } catch(e) {
            message.channel.send(`HIBA: \`${e.message}\``);
        }
    } else {
        return message.reply("Nem használhatod ezt a parancsot!").Then(m => m.delete(10000))
    }
}

module.exports.help = {
    name: "eval",
    aliases: ["e",""],
    usage: "eval [kód]",
    description: "js kódot futtat le!",
    accessableby: "BlackFire"
}