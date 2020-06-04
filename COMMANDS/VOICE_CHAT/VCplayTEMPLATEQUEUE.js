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

    //active
    let data = ops.active.get(message.guild.id) || {};

    //aggiornare data
    if (!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    //add to queue
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[1],
        announceChannel: message.channel.id
    })

    //se non ce un dispatcher run play
    if (!data.dispatcher) play(client, ops, data);
    else{

        //indicare che e stato messo in coda il brano
        message.channel.send(`Added to Queue: ${info.title} | Requested by: ${message.author.id}`)

    } 

    //aggiornare la Map()
    ops.active.set(message.guild.id, data);
}

//definire play
async function play(client, ops, data){

    //Mandare mess 'Now playing'
    message.channel.send(data.queue[0].announceChannel).send(`Now playing ${data.queue[0].songTitle} | Requested By ${data.queue[0].requester}`)

    //update dispatcher data
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    //listener quando la song e finita
    data.dispatcher.once('finish', function(){

        //parte la funzione finish
        finish(client, ops, data);
    })

}

function finish(client, ops, dispatcher){

    //trova guild object dalla Map()
    let fetched = ops.active.get(dispatcher.guildID);

    //remove prima song in queue
    fetched.queue.shift();

    //check if queue e vuota
    if(fetched.queue.lenght > 0){

        //updatare la Map()
        ops.active.set(dispatcher.guildID, fetched);

        //runnare play() di nuovo con la nuova queue
        play(client, ops, fetched);

    }else{//questo runnera se la queue e vuota

        //ellimina guild da Map()
        ops.active.delete(dispatcher.guildID);

        //leavvare il canale vocale
        let vc = client.guilds.get(dispatcher.guildID).me.voice.channel;
        if (vc) vc.leave();
    }
}
