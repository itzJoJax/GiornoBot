import { Client, Message } from "discord.js";

const randomPuppy = require("random-puppy");

import { MessageEmbed } from "discord.js";

export default async (client: Client, message: Message, args: string[]) => {
    const subReddits = ["cats"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    const cat = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`random cat from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(cat);
};
