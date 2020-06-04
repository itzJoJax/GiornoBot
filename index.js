const Discord = require('discord.js');
const bot = new Discord.Client(); 
const ping = require('minecraft-server-util');

const token = 'NzExODM0MDg1NzM1MDA2MjI5.XsIz2A.haDWiS1LvpkSbx6Sh6QoGs1_S6Q';

const PREFIX = 'g-';

const base64Img = require('base64-img');

var version = '1.0.0';

const active = new Map();

const ownerID = 'itzJoJax#8445';

//commands
const play = require('./COMMANDS/VOICE_CHAT/VCplay.js')
const leave = require('./COMMANDS/VOICE_CHAT/VCleave.js')
const meme = require('./COMMANDS/FUN/meme.js') 
const dog = require('./COMMANDS/FUN/dog.js')
const cat = require('./COMMANDS/FUN/cat.js')

let ops = {
    ownerID: ownerID,
    active: active
}


bot.on('ready', () =>{
    console.log('Giorno GIovanna has joined the battle!');
    bot.user.setActivity('by itzJoJax#8445');
})

bot.on('guildMemberAdd', member =>{

    // console.log(member);
    const channel = member.guild.channels.cache.find(channel => channel.name === "🎊-ᴡᴇʟᴄᴏᴍᴇ-🎊")
    if(!channel)return null;
    const mAdd = new Discord.MessageEmbed()
    .setTitle(`${member.displayName} Benvenuto/a nel server!`)
    .addField(':wave:', 'Ti invitiamo a leggere le #regole per evitare imprevisti!')
    .addField(':robot:', 'Per utilizzare il nostro bot personale digita `g-help`')
    .addField(':busts_in_silhouette:', `Grazie a te ora siamo in \`${member.guild.memberCount}\``)
    .addField(':heartbeat:','Buona permanenza!')
    .setColor(0x3F0477)
    .setFooter('created by itzjojax')
    channel.send(mAdd)
});

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");  

    switch(args[0]){
        case 'userinfo':
            const userinfo = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('User Name', message.author.username, true)
            .addField('User Rank', message.member.roles.highest, true)
            .addField('Server', message.guild.name, true)
            .setColor(0x3F0477)
            .setThumbnail(message.author.displayAvatarURL(), true)
            .setFooter('created by itzjojax')
            message.channel.send(userinfo)
        break;

        case 'help':
        const help = new Discord.MessageEmbed()
            .setTitle(':inbox_tray:GiornoBot Commands:inbox_tray:')
            .addField(':rofl:Comandi divertenti', '`g-fun`', true)
            .addField('⭐️Comandi Utili','`g-utili`', true)
            .addField(':interrobang:Info', '`g-info`', true)
            .setColor(0x3F0477)
            .setFooter('created by itzjojax')
            .setThumbnail('https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg')
            .setImage('https://cdn.discordapp.com/attachments/702755387933458452/712367610158907432/ALLORA.gif')
            message.channel.send(help)
        break;

        case 'botinfo':
         const botinfo = new Discord.MessageEmbed()
            .setTitle('BotInfo')
            .addField('Bot Name','`GiornoBot`', true)
            .addField(':id: ID', '`711834085735006229`', true)
            .addField('Linguaggio','`JavaScript`', true)
            .addField('Developer', '`itzJoJax#8445`', true)
            .addField('Prefix', '`g-`', true)
            .addField(':sos: Help Command', '`g-help`', true)
            .setThumbnail('https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg')
            .setColor(0x3F0477)
            .setFooter('created by itzjojax')
            message.channel.send(botinfo)
        break;

        case 'fun':
            const fun = new Discord.MessageEmbed()
            .setTitle('Fun Commands')
            .addField('Meme', '`g-meme for a random meme`', true)
            .addField('Dog', '`g-dog for a random dog image`', true)
            .addField('Cat', '`g-cat for a random cat image`', true)
            .addField('SLAP', '`g-slap to SLAP someone in the face`', true)
            .setThumbnail('https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg')
            .setImage('https://cdn.discordapp.com/attachments/702755387933458452/712367610158907432/ALLORA.gif')
            .setColor(0x3F0477)
            .setFooter('created by itzjojax')
            message.channel.send(fun)
        break;

        case 'invite':
            const here = 'HERE';
            const invite = new Discord.MessageEmbed()
            .setTitle('Invite')
            .addField('Invite GiornoBot To Your Server','Click HERE to invite Giorno to your server')
            .setColor(0x3F0477)
            .setFooter('created by itzjojax')
            message.channel.send(invite)
        break;

        case 'serverinfo':{
            const serverinfo = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .addField('Founder', message.guild.owner, true)
            .addField('Members', message.guild.memberCount, true)
            .addField('Server Name', message.guild.name, true)
            .setColor(0x3F0477)
            .setFooter('created by itzjojax')
            message.channel.send(serverinfo)
        }break;

        case 'mc':{

            if(!args[1])return message.channel.send('Insert a minecraft server IP')
            if(!args[2])return message.channel.send('Insert a minecraft server PORT')

            ping(args[1], parseInt(args[2]) , (error, response) =>{
                if(error) throw error;
                var filepath = base64Img.imgSync(response.favicon,'./SERVER_THUMBNAIL', Date.parse(new Date()));
                const mc = new Discord.MessageEmbed()
                .setTitle('Server Status')
                .addField('Server IP', response.host)
                .addField('Server Version', response.version)
                .addField('Online Players', response.onlinePlayers)
                .addField('Max Players', response.maxPlayers)
                .setColor(0x3F0477)
                message.channel.send(mc)
            })
        }
            break;                

        case 'slap':{

            if(!message.guild){
                message.reply('You need to be in a server to use that command!')
            }else{

            if(!args[1])return message.channel.send('Tag someone to SLAP them')

            message.reply(`has SLAPPED ${ args[1] } in the face`)
            }
            break;
        }

        case 'clear':{
            if(!message.member.roles.cache.find(r => r.name === "ADMIN"))message.reply('You dont have permissions to use this command')
            else{
            if(!args[1])return message.reply('Insert Amount To Clear')
            message.channel.bulkDelete(args[1])
            }
            break;
        }

        case 'ping':{
            message.channel.send(`Pong! The bot ping is ${bot.ws.ping}ms`);

        }break;

        case 'play':{
            play(bot, message, args, active, ops)

        }break;


        case 'leave':{
            leave(bot, message, args)

        }break;


        case 'meme':{
            meme(bot, message, args)

        }break;

        case 'dog':{
            dog(bot, message, args)

        }break;

        case 'cat':{
            cat(bot, message, args)

        }break;

        }

    }

)

bot.login(token);