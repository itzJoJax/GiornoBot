import { Client, Message } from "discord.js";

const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvas = require("canvas");

export default async (client: Client, message: Message, args: string[]) => {
    let user;

    if (!args[1]) {
        user = message.author;
    } else {
        user = message.mentions.users.first() || bot.users.cache.get(args[1]);
    }

    const canvas = Canvas.createCanvas(2048, 2048);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
        user.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const brazzers = await Canvas.loadImage(
        "https://www.vhv.rs/file/max/33/332662_brazzers-logo-png.png"
    );
    ctx.drawImage(brazzers, 0, 1500, canvas.width, 524);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userjail.png"
    );

    message.channel.send(finale);
};
