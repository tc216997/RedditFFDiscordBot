﻿const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config");
const commands = require('./lib/commands');


bot.on("message", msg => {
    // Let's get the first word to get any command namespace.
    let messageCommand = msg.content.substr(0, msg.content.indexOf(" "));
    let messageArgs = msg.content.substr(msg.content.indexOf(" ") + 1);
    let validCommand = commands.hasOwnProperty(msg.content.split(' ')[0]);
    // Let's filter through these now.
    // TODO: Make this not a terrible switch situation.
    /*
    switch (messageCommand) {
        case ".8ball":
            utilities.eightBall().then(function (chosen) {
                msg.channel.sendMessage(chosen);
            });
            break;
        case ".choose":
            utilities.chooseOne(messageArgs).then(function (chosen) {
                msg.channel.sendMessage(chosen);
            });
            break;
        case ".next5":
            espn.next5(messageArgs).then(function (schedule) {
                msg.channel.sendMessage(schedule.message);
            }).catch(function (err) {
                msg.channel.sendMessage(err);
            });
            break;
        case ".roto":
            rotoworld.getPlayer(messageArgs).then(function (player) {
                if (!player) {
                    msg.channel.sendMessage('No player found. Check the spelling of the player\'s name.');
                } else {
                    msg.channel.sendMessage(player.message);
                }
            }).catch(function (err) {
                msg.channel.sendMessage(err);
            });
            break;
    }
    */

    // tc216997 -> alternative for the terrible switch?
    if (msg.content.startsWith('.') && validCommand) {
      //get command
      let messageCommand = msg.content.split(' ')[0];
      let messageArgs = msg.content.substr(msg.content.indexOf(" ")+1, msg.content.length);
      commands[messageCommand](messageArgs).then(response => {
        console.log(typeof response)
        if (typeof response === 'object') {
          msg.channel.sendMessage(response.message);
        } else {
          msg.channel.sendMessage(response);
        }
      });
    }
});

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.login(config.DiscordAPIToken);