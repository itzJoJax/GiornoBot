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

    const canvas = Canvas.createCanvas(977, 2048);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
        "https://i.imgflip.com/2k8hxg.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const logo = await Canvas.loadImage(
        user.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(logo, 480, 115, 375, 375);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userjail.png"
    );

    message.channel.send(finale);
};
