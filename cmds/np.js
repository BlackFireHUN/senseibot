const Discord = require("discord.js");
const fs = require("fs");
const WebSocket = require("ws");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  const ownerid = "152615338213638144";
  if (message.author.id == ownerid) {
    let channel = message.channel;
    let heartbeatInterval;
    let ws;
    const musicchannel = bot.channels.get("682255181135609923");
    if (!musicchannel) return console.error("A hang csatorna nem található!");

    function heartbeat(interval) {
      heartbeatInterval = setInterval(() => {
        ws.send(JSON.stringify({ op: 9 }));
      }, interval);
    }

    ws = new WebSocket("wss://listen.moe/gateway_v2");

    ws.onopen = () => {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    };

    ws.onmessage = async message1 => {
      if (!message1.data.length) return;
      let radioJSON;
      try {
        radioJSON = JSON.parse(message1.data);
      } catch (error) {
        return;
      }
      switch (radioJSON.op) {
        case 0:
          ws.send(JSON.stringify({ op: 9 }));
          heartbeat(radioJSON.d.heartbeat);
          break;
        case 1:
          if (
            radioJSON.t !== "TRACK_UPDATE" &&
            radioJSON.t !== "TRACK_UPDATE_REQUEST" &&
            radioJSON.t !== "QUEUE_UPDATE" &&
            radioJSON.t !== "NOTIFICATION"
          )
            break;
          await musicchannel
            .join()
            .then(connection => {
              connection.playStream(`https://listen.moe/opus`, {
                bitrate: 128000
              });
              console.log("csatlakozva a hang csatornához!");
            })
            .catch(e => {
              // Oh no, it errored! Let's log it to console :)
              console.error(e);
            });
          const voiceConnection = bot.voiceConnections.find(
            val => val.channel.guild.id == message.guild.id
          );
          const dispatcher = voiceConnection.player.dispatcher;
          dispatcher.setVolume(15 / 200);
          let artist;
          if (typeof radioJSON.d.song.artists[0].hasOwnProperty("name")) {
            artist = radioJSON.d.song.artists["0"].name;
          } else {
            artist = "ismeretlen előadó";
          }
          let song = `${artist} - ${radioJSON.d.song.title}`;
          let embed = new Discord.RichEmbed()
            .setColor("#A65EA5")
            .setAuthor("SENSEI BOT")
            .setTimestamp()
            .addField("Most játszódik:", song);
          channel.send(embed);
          break;
        default:
          break;
      }
    };

    ws.onclose = error => {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
      if (ws) {
        ws.close();
        ws = null;
      }
      setTimeout(() => connect(), 5000);
    };
  } else {
    return message
      .reply("Nem használhatod ezt a parancsot!")
      .Then(m => m.delete(10000));
  }
};

module.exports.help = {
  name: "np",
  aliases: ["nowplaying", ""],
  usage: "np",
  description: "Sensei lejátszásához van... általában nem kell piszkálni!",
  accessableby: "Mindenki"
};
