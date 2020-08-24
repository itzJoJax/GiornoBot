import { Client, Message, MessageEmbed } from "discord.js";

export default async (client: Client, message: Message, args: string[]) => {
    const sides = ["Heads", "Cross"];
    const side = sides[Math.floor(Math.random() * sides.length)];

    const coin = new MessageEmbed()
        .setTitle("Coin Flip")
        .setDescription(`The Coin Landed On ${side}!`)
        .setColor(0x3f0477)
        .setFooter("created by itzjojax");

    message.channel.send(coin);
};
