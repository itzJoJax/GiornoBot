const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = async (client, message, args) =>{

    const sides = ["Heads", "Cross"];
    const side = sides[Math.floor(Math.random() * sides.length)];

    const coin = new Discord.MessageEmbed()
    .setTitle('Coin Flip')
    .setDescription(`The Coin Landed On ${side}!`)
    .setColor(0x3F0477)
    .setFooter('created by itzjojax')

    message.channel.send(coin);
};