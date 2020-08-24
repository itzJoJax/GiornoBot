import { Client, Message } from "discord.js";

//npm i ytdl-core
const ytdl = require("ytdl-core");

export default async (
    client: Client,
    message: Message,
    args: string[],
    ops: any
) => {
    if (!message.member || !message.guild) return null;

    //Vedere se si e in vocal
    if (!message.member.voice.channel)
        return message.channel.send(
            "You need to be in a voice channel to use that command!"
        );

    //vedere se ce unn url
    if (!args[1]) return message.channel.send("Please insert a song url");

    //validare l'url
    let Validate = await ytdl.validateURL(args[1]);

    //vedere se e validato
    if (!Validate) return message.channel.send("Please input a **valid** url");

    //definire le info
    let info = await ytdl.getInfo(args[1]);

    //active
    let data = ops.active.get(message.guild.id) || {};

    //aggiornare data
    if (!data.connection)
        data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    //add to queue
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[1],
        announceChannel: message.channel.id
    });

    //se non ce un dispatcher run play
    if (!data.dispatcher) play(message, client, ops, data);
    else {
        //indicare che e stato messo in coda il brano
        message.channel.send(
            `Added to Queue: ${info.title} | Requested by: ${message.author.id}`
        );
    }

    //aggiornare la Map()
    ops.active.set(message.guild.id, data);
};

//definire play
async function play(message: Message, client: Client, ops: any, data: any) {
    //Mandare mess 'Now playing'
    await message.channel.send(data.queue[0].announceChannel);
    await message.channel.send(
        `Now playing ${data.queue[0].songTitle} | Requested By ${data.queue[0].requester}`
    );

    //update dispatcher data
    data.dispatcher = await data.connection.play(
        ytdl(data.queue[0].url, { filter: "audioonly" })
    );
    data.dispatcher.guildID = data.guildID;

    //listener quando la song e finita
    data.dispatcher.once("finish", function () {
        //parte la funzione finish
        finish(message, client, ops, data);
    });
}

function finish(message: Message, client: Client, ops: any, dispatcher: any) {
    //trova guild object dalla Map()
    const fetched = ops.active.get(dispatcher.guildID);

    //remove prima song in queue
    fetched.queue.shift();

    //check if queue e vuota
    if (fetched.queue.lenght > 0) {
        //updatare la Map()
        ops.active.set(dispatcher.guildID, fetched);

        //runnare play() di nuovo con la nuova queue
        play(message, client, ops, fetched);
    } else {
        //questo runnera se la queue e vuota

        //ellimina guild da Map()
        ops.active.delete(dispatcher.guildID);

        const voiceChannel = client.guilds.cache.find(
            e => e.id === dispatcher.guildID
        );

        //leavvare il canale vocale
        let vc = voiceChannel?.me?.voice.channel;
        if (vc) vc.leave();
    }
}
