const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvas = require("canvas");
import { background as canvasBackground } from "./background";
import { Client, Message } from "discord.js";

export default async (client: Client, message: Message, args: string[]) => {
    let user;

    if (!args[1]) {
        message.channel.send("Mention Someone to hug");
    } else {
        user = message.mentions.users.first() || bot.users.cache.get(args[1]);
    }

    const canvas = Canvas.createCanvas(2048, 2048);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(canvasBackground);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(1000, 1000, 2048, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const logo1 = await Canvas.loadImage(
        message.author.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(logo1, 800, 980, 250, 250);

    ctx.beginPath();
    ctx.arc(1000, 1000, 2048, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const logo2 = await Canvas.loadImage(
        message.author.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(logo2, 800, 400, 250, 250);

    ctx.beginPath();
    ctx.arc(1000, 1000, 2048, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const logo3 = await Canvas.loadImage(
        message.author.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(logo1, 800, 1500, 250, 250);

    ctx.beginPath();
    ctx.arc(650, 1600, 200, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const hugger = await Canvas.loadImage(
        user.avatarURL({ format: "png", size: 2048 })
    );
    ctx.drawImage(hugger, 450, 1400, 450, 450);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userjail.png"
    );

    message.channel.send(finale);
};
