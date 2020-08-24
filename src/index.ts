import { Message, MessageEmbed } from "discord.js";

import { Client } from "discord.js";
export const bot = new Client();
const ping = require("minecraft-server-util");

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "env", ".env") });

const token = process.env.TOKEN;

export const PREFIX = "g-";

const version = "1.0.0";

const active = new Map();

const ownerID = "itzJoJax#8445";

//commands
import play from "./COMMANDS/VOICE_CHAT/VCplay";
import leave from "./COMMANDS/VOICE_CHAT/VCleave";
import meme from "./COMMANDS/FUN/meme";
import dog from "./COMMANDS/FUN/dog";
import cat from "./COMMANDS/FUN/cat";
import weather from "./COMMANDS/USEFUL/weather";
import coin from "./COMMANDS/FUN/coin";
import penis from "./COMMANDS/FUN/penis";
import zerotwo from "./COMMANDS/FUN/zerotwo";
import evangelion from "./COMMANDS/FUN/evangelion";
import ui from "./COMMANDS/IMG_COMMANDS/userinfo";
import jail from "./COMMANDS/IMG_COMMANDS/jail";
import brazzers from "./COMMANDS/IMG_COMMANDS/brazzers";
import burn from "./COMMANDS/IMG_COMMANDS/burn";
import worthless from "./COMMANDS/IMG_COMMANDS/worthless";
import hug from "./COMMANDS/IMG_COMMANDS/hug";
import snap from "./COMMANDS/IMG_COMMANDS/snap";
import sendUserInfo from "./COMMANDS/USEFUL/userinfo";

const ops = {
    ownerID: ownerID,
    active: active
};

bot.on("ready", () => {
    console.log("Giorno GIovanna has joined the battle!");
    bot.user?.setActivity(`${bot.guilds.cache.size} server!`, {
        // status: "online",
        type: "WATCHING"
        // url: 'https://www.twitch.tv/giornogiovannabot'
    });
});

bot.on("guildMemberAdd", guildMember => {
    if (!guildMember.guild) return null;
    const channel: any = guildMember.guild.channels.cache.find(
        channel => channel.name === "🎊-ᴡᴇʟᴄᴏᴍᴇ-🎊"
    );
    if (!channel) return null;
    const mAdd = new MessageEmbed()
        .setTitle(
            `Benvenuto/a nel server @${guildMember.displayName} :id:  \`${guildMember.id}\``
        )
        .setDescription(
            `:wave:Ti invitiamo a leggere le #regole per evitare imprevisti!
    \n:robot:Per utilizzare il nostro bot personale digita \`g-help\`
    \n:busts_in_silhouette:Grazie a te ora siamo in \`#${guildMember.guild.memberCount}\` membri!
    \n:heartbeat:Buona permanenza!`
        )
        .setColor(guildMember.displayHexColor)
        .setFooter("created by itzjojax");

    const iconURL = guildMember.guild.iconURL();
    iconURL ? mAdd.setThumbnail(iconURL) : null;
    channel.send(mAdd);
});

bot.on("guildMemberRemove", guildMember => {
    if (!guildMember.guild) return null;
    const channel: any = guildMember.guild.channels.cache.find(
        channel => channel.name === "🎊-ᴡᴇʟᴄᴏᴍᴇ-🎊"
    );
    if (!channel) return null;
    const mLeave = new MessageEmbed()
        .setTitle(`\`${guildMember.displayName}\` ha lasciato il server`)
        .setDescription(
            `Ora siamo solo in \`${guildMember.guild.memberCount}\` \nCi mancherai... forse...`
        )
        .setColor(guildMember.displayHexColor)
        .setFooter("created by itzjojax");
    const iconURL = guildMember.guild.iconURL();
    iconURL ? mLeave.setThumbnail(iconURL) : null;
    channel.send(mLeave);
});

bot.on("message", (message: Message) => {
    if (!message.guild) return null;
    const args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "userinfo":
            return sendUserInfo(message);

        case "help":
            const help = new MessageEmbed()
                .setTitle(":inbox_tray:GiornoBot Commands:inbox_tray:")
                .addField(":rofl:Comandi divertenti", "`g-fun`", true)
                .addField("⭐️Comandi Utili", "`g-utili`", true)
                .addField(":interrobang:Info", "`g-info`", true)
                .setColor(0x3f0477)
                .setFooter("created by itzjojax")
                .setThumbnail(
                    "https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg"
                )
                .setImage(
                    "https://cdn.discordapp.com/attachments/702755387933458452/712367610158907432/ALLORA.gif"
                );
            message.channel.send(help);
            break;

        case "botinfo":
            const botinfo = new MessageEmbed()
                .setTitle("BotInfo")
                .addField("Bot Name", "`GiornoBot`", true)
                .addField(":id: ID", "`711834085735006229`", true)
                .addField("Linguaggio", "`JavaScript`", true)
                .addField("Developer", "`itzJoJax#8445`", true)
                .addField("Prefix", "`g-`", true)
                .addField(":sos: Help Command", "`g-help`", true)
                .setThumbnail(
                    "https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg"
                )
                .setColor(0x3f0477)
                .setFooter("created by itzjojax");
            message.channel.send(botinfo);
            break;

        case "fun":
            const fun = new MessageEmbed()
                .setTitle("Fun Commands")
                .addField("Meme", "`g-meme for a random meme`", true)
                .addField("Dog", "`g-dog for a random dog image`", true)
                .addField("Cat", "`g-cat for a random cat image`", true)
                .addField("SLAP", "`g-slap to SLAP someone in the face`", true)
                .setThumbnail(
                    "https://i.pinimg.com/originals/af/53/55/af5355d2e928deb428fd3961a317cca4.jpg"
                )
                .setImage(
                    "https://cdn.discordapp.com/attachments/702755387933458452/712367610158907432/ALLORA.gif"
                )
                .setColor(0x3f0477)
                .setFooter("created by itzjojax");
            message.channel.send(fun);
            break;

        case "invite":
            const invite = new MessageEmbed()
                .setTitle("Invite")
                .addField(
                    "Invite GiornoBot To Your Server",
                    "Click HERE to invite Giorno to your server"
                )
                .setColor(0x3f0477)
                .setFooter("created by itzjojax");
            message.channel.send(invite);
            break;

        case "serverinfo":
            {
                const gChannels = message.guild.channels.cache.size;
                const serverinfo = new MessageEmbed()
                    .setTitle(`${message.guild.name} | ${message.guild.id}`)
                    .addField(":crown:Founder", message.guild.owner, true)
                    .addField(
                        ":busts_in_silhouette:Members",
                        message.guild.memberCount,
                        true
                    )
                    .addField(":boom:Server Name", message.guild.name, true)
                    .addField(":id:Server ID", message.guild.id, true)
                    .addField("Channels", gChannels, true)
                    .setColor(0x3f0477)
                    .setFooter("created by itzjojax");
                const iconURL = message.guild.iconURL();
                iconURL ? serverinfo.setThumbnail(iconURL) : null;
                message.channel.send(serverinfo);
            }
            break;

        case "mcPing":
            {
                if (!args[1])
                    return message.channel.send("Insert a minecraft server IP");
                if (!args[2])
                    return message.channel.send(
                        "Insert a minecraft server PORT"
                    );

                ping(
                    args[1],
                    parseInt(args[2]),
                    (error: Error, response: any) => {
                        if (error) throw error;
                        const mc = new MessageEmbed()
                            .setTitle("Server Status")
                            .addField("Server IP", response.host)
                            .addField("Server Version", response.version)
                            .addField("Online Players", response.onlinePlayers)
                            .addField("Max Players", response.maxPlayers)
                            .setColor(0x3f0477);
                        message.channel.send(mc);
                    }
                );
            }
            break;

        case "slap": {
            if (!message.guild) {
                message.reply(
                    "You need to be in a server to use that command!"
                );
            } else {
                if (!args[1])
                    return message.channel.send("Tag someone to SLAP them");

                message.reply(`has SLAPPED ${args[1]} in the face`);
            }
            break;
        }

        case "clear": {
            if (!message.member?.roles.cache.find(r => r.name === "ADMIN"))
                message.reply("You dont have permissions to use this command");
            else {
                if (!args[1]) return message.reply("Insert Amount To Clear");
                message.channel.delete(args[1]);
            }
            break;
        }

        case "ping":
            return message.channel.send(
                `Pong! The bot ping is ${bot.ws.ping}ms`
            );

        case "play":
            return play(
                bot,
                message,
                args
                // active,
                // ops
            );

        case "leave":
            return leave(bot, message, args);

        case "meme":
            return meme(bot, message, args);

        case "dog":
            return dog(bot, message, args);

        case "cat":
            return cat(bot, message, args);

        case "weather":
            return weather(bot, message, args);

        case "edo":
            return message.channel.send("è nabbo", { tts: true });

        case "coinflip":
            return coin(bot, message, args);

        case "penis":
            return penis(bot, message, args);

        case "zerotwo":
            return zerotwo(bot, message, args);

        case "evangelion":
            return evangelion(bot, message, args);

        case "test":
            return console.log(message.guild);

        case "ui":
            return ui(bot, message, args);

        case "jail":
            return jail(bot, message, args);

        case "brazzers":
            return brazzers(bot, message, args);

        case "burn":
            return burn(bot, message, args);

        case "worthless":
            return worthless(bot, message, args);

        case "hug":
            return hug(bot, message, args);

        case "snap":
            return snap(bot, message, args);
    }
});

bot.login(token);
