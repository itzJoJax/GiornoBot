const Discord = require('discord.js')
    
bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    const userinfo = new Discord.MessageEmbed()
        .setTitle('User Information')
        .addField('User Name', message.author.username, true)
        .addField('User Rank', message.member.roles.highest, true)
        .addField('Server', message.guild.name, true)
        .setColor(0x3F0477)
        .setThumbnail(message.author.displayAvatarURL(), true)
        .setFooter('created by itzjojax')
    message.channel.send(userinfo);

});