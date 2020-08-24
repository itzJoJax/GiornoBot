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

    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
        user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const jail = await Canvas.loadImage(
        "https://lh3.googleusercontent.com/proxy/DRaNZk-_BMnCeAQJEe66-5HLFjY51DvWOO7yIkbNhh1mV7r_cexRPax9w793ufWuu0Lai-HWuYgsXvSBNE4OedwA_FQxslCkWBJpnjihvUfZScs9MQ"
    );
    ctx.drawImage(jail, 0, 0, canvas.width, canvas.height);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userjail.png"
    );

    message.channel.send(finale);
};
