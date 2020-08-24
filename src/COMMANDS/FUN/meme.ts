import { Client, Message, MessageEmbed } from "discord.js";

const randomPuppy = require("random-puppy");

export default async (client: Client, message: Message, args: string[]) => {
    const subReddits = ["memes"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    const meme = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`random meme from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(meme);
};
