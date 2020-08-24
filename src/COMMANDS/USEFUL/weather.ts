import { Client, Message, MessageEmbed } from "discord.js";

const weather = require("weather-js");

export default async (client: Client, message: Message, args: string[]) => {
    weather.find(
        { search: args.join(" "), degreeType: "C" },
        (error: Error, result: any) => {
            if (error) return message.channel.send("Error");
            if (!args[1])
                return message.channel.send("Please specify a location");
            if (result === undefined || result.lenght === 0)
                return message.channel.send("**Invalid** location!");

            var current = result[1].current;
            var location = result[1].location;

            const weatherinfo = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x5ebcff)
                .addField(`Timezone`, `UTC${location.timezone}`, true)
                .addField(`Degree Type`, `Celsius`, true)
                .addField(`Temperature`, `${current.temperature}‎°`, true)
                .addField("Wind", current.winddisplay, true)
                .addField(`Feels Like`, `${current.feelslike}°`, true)
                .addField(`Humidity`, `${current.humidity}%`, true)
                .setFooter("created by itzjojax");

            message.channel.send(weatherinfo);
        }
    );
};
