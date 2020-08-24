const Discord = require('discord.js');

module.exports = async (client, message, args) =>{

    const peni = [
        "`8=D`",
        "`8==D`",
        "`8===D`",
        "`8====D`",
        "`8=====D`",
        "`8======D`",
        "`8=======D`",
        "`8========D`",
        "`8=========D`"];

    const risposta = peni[Math.floor(Math.random() * peni.length)];
    
    if(args[1])return message.channel.send(`:eggplant: **${args[1]}** ${risposta}`)

    else(message.channel.send(`:eggplant: **${message.author.tag}** ${risposta}`));

}
