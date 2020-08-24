const Discord = require("discord.js");

import { bot } from "../../index";
import { Message } from "discord.js";

bot.on("message", (message: Message) => {
    const userinfo = new Discord.MessageEmbed()
        .setTitle("User Information")
        .addField("User Name", message.author.username, true)
        .addField("User Rank", message.member?.roles.highest, true)
        .addField("Server", message.guild?.name, true)
        .setColor(0x3f0477)
        .setThumbnail(message.author.displayAvatarURL(), true)
        .setFooter("created by itzjojax");
    message.channel.send(userinfo);
});
