import { Client, Message } from "discord.js";

export default async (client: Client, message: Message, args: string[]) => {
    const numPeni = "=".repeat(Math.floor(Math.random() * 9));

    const risposta = "8" + numPeni + "D";

    if (args[1])
        return message.channel.send(`:eggplant: **${args[1]}** ${risposta}`);
    else
        message.channel.send(
            `:eggplant: **${message.author.tag}** ${risposta}`
        );
};
