//Commando per far quittare il bot

import { Client, Message } from "discord.js";

export default (client: Client, message: Message, args: string[]) => {
    if (!message.member || !message.guild?.me) return null;

    //autore del mess e connesso a un channel
    if (!message.member.voice.channel)
        return message.channel.send(
            "Please connect to a voice channel to use this command"
        );

    //check se il bot e connesso a un canale vocale
    if (!message.guild.me.voice.channel)
        return message.channel.send(
            "The bot isn't connected to a voice channel"
        );

    //check se l'autore e il bot sono nello stesso canale
    if (message.guild.me.voice.channel.id !== message.member.voice.channel.id)
        return message.channel.send(
            "The bot isn't connect to your same channel"
        );

    //leavvare il canale
    message.guild.me.voice.channel.leave();

    //Avviso del leave
    message.channel.send("Leaving Voice Channel...");
};
