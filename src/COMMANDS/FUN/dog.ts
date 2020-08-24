import { Client, Message, MessageEmbed } from "discord.js";

const randomPuppy = require("random-puppy");

export default async (client: Client, message: Message, args: string[]) => {
    const subReddits = ["dogs"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    const dog = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`random dog from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(dog);
};
