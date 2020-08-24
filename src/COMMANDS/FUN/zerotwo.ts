import { Client, Message, MessageEmbed } from "discord.js";

const randomPuppy = require("random-puppy");

export default async (client: Client, message: Message, args: string[]) => {
    const subReddits = ["zerotwo"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);

    const zerotwo = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`random zero two from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(zerotwo);
};
