import { Message, MessageEmbed } from "discord.js";

const sendUserInfo = (message: Message) => {
    const userinfo = new MessageEmbed()
        .setTitle("User Information")
        .addField("User Name", message.author.username, true)
        .addField("User Rank", message.member?.roles.highest, true)
        .addField("Server", message.guild?.name, true)
        .setColor(0x3f0477)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter("created by itzjojax");
    message.channel.send(userinfo);
};

export default sendUserInfo;
