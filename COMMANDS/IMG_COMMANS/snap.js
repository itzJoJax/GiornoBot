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

    const canvas = Canvas.createCanvas(977, 2048);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage('https://i.imgflip.com/2k8hxg.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
    const logo = await Canvas.loadImage(user.avatarURL({format: "png", size: 2048}));
    ctx.drawImage(logo, 480, 115, 375, 375);

    const finale = new Discord.MessageAttachment(canvas.toBuffer(), "userjail.png");

    message.channel.send(finale);

}