const Discord = require('discord.js');
const bot = new Discord.Client();
const Canvas = require('canvas');
const colors = require('../../colors.json');

module.exports = async (client, message, args) =>{

    if(!args[1]) {
        var user = message.author;
    }else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[1]);
    }
    var member = message.guild.member(user);

    const canvas = Canvas.createCanvas(2048, 2048);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(user.avatarURL({format: "png", size: 2048}));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
    const brazzers = await Canvas.loadImage('https://www.vhv.rs/file/max/33/332662_brazzers-logo-png.png');
    ctx.drawImage(brazzers, 0, 1500, canvas.width, 524);

    const finale = new Discord.MessageAttachment(canvas.toBuffer(), "userjail.png");

    message.channel.send(finale);

}