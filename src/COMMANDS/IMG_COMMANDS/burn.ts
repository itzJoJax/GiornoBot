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
        "https://preview.redd.it/o438jj1iv4p01.png?auto=webp&s=2ab4e295c8a5c4e6c063b72b5fcd4f2f466ca45b"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const logo = await Canvas.loadImage(
        user.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(logo, 180, 260, 600, 524);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userjail.png"
    );

    message.channel.send(finale);
};
