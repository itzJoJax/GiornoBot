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

    const background = await Canvas.loadImage('https://preview.redd.it/o438jj1iv4p01.png?auto=webp&s=2ab4e295c8a5c4e6c063b72b5fcd4f2f466ca45b');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 
    const logo = await Canvas.loadImage(user.avatarURL({format: "png", size: 2048}));
    ctx.drawImage(logo, 180, 260, 600, 524);

    const finale = new Discord.MessageAttachment(canvas.toBuffer(), "userjail.png");

    message.channel.send(finale);

}