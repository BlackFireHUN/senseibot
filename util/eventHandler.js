const reqEvent = (event) => require(`../events/${event}`)

module.exports = async (bot, con) => {
    bot.on("ready", function () { reqEvent("ready")(bot) });
    bot.on("reconnecting", () => reqEvent("reconnecting")(bot));
    bot.on("disconnect", () => reqEvent("disconnect")(bot));
    bot.on("warn", reqEvent("warn"));
    bot.on("error", reqEvent("error"));
    bot.on("message", () => reqEvent("log")(bot));
    bot.on("message", () => reqEvent("level")(bot, con));
}