const search = require('youtube-search');

module.exports = (client, message, args, ops) => {

    search(args.join(' '), function(err, res){
        //Errori
        if(err)return message.channel.send('Sorry, something went wrong')

        //Video
        let videos = res.videos.slice(0, 10);

        //Output striga
        let resp = ' ';
        for (var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`
        }

        //Info
        resp += `\n**Choose a number between \`1-${videos.lenght}\``;

        //Output
        message.channel.send(resp);

        //Collect
        const filter = m => !isNaN(n.content) && m.content < videos.lenght+1 && m.content > 0;
        //Accettare solo i numeri della lista
        const collector = message.channel.createMessageCollector(filter);

        //Aggiornare le variabili
        collector.videos = videos;

        //Listener
        collector.once('collect', function(n){
            //play
            let commandFile = require('./play.js');
            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
        })
    })
}