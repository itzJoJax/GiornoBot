//npm i ytdl-core
const ytdl = require('ytdl-core');
const Discord = require('discord.js')

module.exports = async (client, message, args, ops) => {

    //Vedere se si e in vocal
    if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use that command!')

    //vedere se ce unn url
    if (!args[1])return message.channel.send('Please insert a song url')

    //validare l'url
    let Validate= await ytdl.validateURL(args[1]);

    //vedere se e validato
    if (!Validate)return message.channel.send('Please input a **valid** url')

    //definire le info
    let info = await ytdl.getInfo(args[1]);

    //author guild chann
    let connection = await message.member.voice.channel.join();

    //dispatcher
    let dispatcher = await connection.play(ytdl(args[1], {filter : 'audioonly'}));

    //info playing
    message.channel.send(`Now playing ${info.title}`)
    
}