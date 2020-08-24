import { Client, Message } from "discord.js";

const search = require("youtube-search");

module.exports = (
    client: Client,
    message: Message,
    args: string[],
    ops: any
) => {
    search(args.join(" "), function (err: Error, res: any) {
        //Errori
        if (err) return message.channel.send("Sorry, something went wrong");

        //Video
        let videos = res.videos.slice(0, 10);

        //Output striga
        let resp = " ";
        for (var i in videos) {
            resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
        }

        //Info
        resp += `\n**Choose a number between \`1-${videos.lenght}\``;

        //Output
        message.channel.send(resp);

        //Collect
        const filter = (m: any) =>
            !isNaN(n.content) && m.content < videos.lenght + 1 && m.content > 0;
        //Accettare solo i numeri della lista
        const collector = message.channel.createMessageCollector(filter);

        //Aggiornare le variabili
        // Non funziona
        collector.videos = videos;

        //Listener
        collector.once("collect", function (n) {
            //play
            const commandFile = require("./play.js");
            // Non ho idea di cosa tu voglia fare ma questo codice fa paura
            commandFile.run(
                client,
                message,
                [this.videos[parseInt(m.content) - 1].url],
                ops
            );
        });
    });
};
