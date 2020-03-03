const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const https = require("https");
  const xml2js = require("xml2js");
  try {
    // Currently there is something wrong with Commando nsfw detection... So better make sure this works
    if (message.channel.nsfw) {
      if (args[0] === undefined) {
        var argR = "";
      } else {
        var argR = args;
      }

      var url =
        "https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=" + argR;

      https
        .get(url, function(res) {
          var body = "";

          res.on("data", function(chunk) {
            body += chunk;
          });

          res.on("end", function() {
            var parser = new xml2js.Parser();
            parser.parseString(body, function(err, result) {
              var postCount = result.posts.$.count - 1;
              if (postCount > 100) {
                postCount = 100;
              }
              if (postCount > 0) {
                var picNum = Math.floor(Math.random() * postCount) + 0;
                var r34Pic = result.posts.post[picNum].$.file_url;
                // console.log(result.posts.post[picNum].$.file_url);
                let r34embed = new Discord.RichEmbed()
                  .setAuthor("Rule 34", bot.user.avatarURL)
                  .setColor("00ff00")
                  .setImage(r34Pic);
                message.channel.send(r34embed);
              } else {
                console.log("Nothing found:", argR);
                message.reply("Nincs találat!");
              }
            });
          });
        })
        .on("error", function(e) {
          console.log("Got an error: ", e);
        });
    } else {
      message.reply(
        `Ez a parancs csak nsfw nek jelőlt csatornákban használható!`
      );
    }
  } catch (e) {
    console.log(e);
  }

  function log(message) {
    fs.appendFileSync("log.txt", message, "UTF-8", { flags: "a+" });
  }
};

module.exports.help = {
  name: "r34",
  aliases: ["", ""],
  usage: "r34",
  description: "Sensei küld egy képet-et r34-röl >///<",
  accessableby: "Mindenki"
};
