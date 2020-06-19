const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = async (client, message, args) =>{

    const sides = ["testa", "croce"];
    const side = sides[Math.floor(Math.random() * sides.length)];

    const coin = new Discord.MessageEmbed()
    .setTitle('Coin Flip')
    .setDescription(`La Moneta E Caduta Su ${side}!`)
    .setColor(0x3F0477)
    .setFooter('created by itzjojax')

    message.channel.send(coin);
};