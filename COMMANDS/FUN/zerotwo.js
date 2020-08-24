const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = async (client, message, args) =>{
           
        const subReddits = ['zerotwo']
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const zerotwo = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setImage(img)
        .setTitle(`random zero two from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(zerotwo);
}
