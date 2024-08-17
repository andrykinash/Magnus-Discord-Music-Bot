// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { key } = require('./config.json');
const fs = require('fs');
const music = require('@koenie06/discord.js-music');

// Create a new client instance
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

//-----------------------------------------------------------------------
//FOR MUSIC

/* This will run when a new song started to play */
music.event.on('playSong', (channel, songInfo, requester) => {
	channel.send({ content: `Started playing the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} | Requested by \`${requester.tag}\`` });
});

/* This will run when a new song has been added to the queue */
music.event.on('addSong', (channel, songInfo, requester) => {
	channel.send({ content: `Added the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} to the queue | Added by \`${requester.tag}\`` });
});

/* This will run when a song started playing from a playlist */
music.event.on('playList', async (channel, playlist, songInfo, requester) => {
    channel.send({
        content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
    });
});

/* This will run when a new playlist has been added to the queue */
music.event.on('addList', async (channel, playlist, requester) => {
    channel.send({
        content: `Added the playlist [${playlist.title}](${playlist.url}) with ${playlist.videos.length} amount of videos to the queue.
        Added by ${requester.tag} (${requester.id})`
    });
});

/* This will run when all the music has been played, and the bot disconnects. */
music.event.on('finish', (channel) => {
	channel.send({ content: `All music has been played, disconnecting..` });
});


//--------------------------------------------------------------------------------


/* Setting every command in the 'commands' folder into the client.commands Collection. */
// used for accessing commands in other files
client.commands = new Collection();

// readdirsync returns array of all files in directory that start with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) { // we sort through the array with a loop
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}



// When the client is ready, run this code (only once)
client.on('ready', async() => {
	console.log('Magnus has logged in!');
	client.user.setActivity("Squid Game",{ type:'WATCHING'});
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
	//command handler replacement of commandName
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Login to Discord with your client's token
client.login(key);
