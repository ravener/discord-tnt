// A better example to further show the library and make it
// easier to understand
const DiscordTNT = require("discord-tnt"); // require it
const client = new DiscordTNT.Client({ // create a client
	TOKEN:"Your Bot Token",
	DEBUG:true
});
const prefix = "+" // pick a command prefix

// On Ready.
client.on("ready", () => {
	console.log(`Logged in as ${client.self.username}`);
	client.self.setPresence("You", 3) // set a presence
	// types can be from 0 to 3,
	// 0 - Playing, 1 - Streaming, 2 - Listening, 3 - Wathing
	// in this case we are setting it to "Watching You"
	
	client.setStatus("dnd");
	// Set status to Do Not Disturb.
});

client.on("messageCreate", message => { // on message
	if(message.author.bot) return; // ignore bots
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	// get arguments in an array
	const command = args.shift().toLowerCase();
	// get command
	const m = message.channel_id;
	// just a shortcut to channel id, trust me this makes
	// it more comfortable to send Messages.
	// an update is planned to make it even more comfortable.
	if(command === "ping") {
		client.sendMessage(`Pong! WebSocket Latency: ${client.ping}`);
	} else if(command === "eval") {
		const code = args.join(" ");
		try {
			const evaled = eval(code);
			client.sendMessage(m, `\`\`\`js\n${evaled}\`\`\``);
		} catch(e) {
			client.sendMessage(m, `\`\`\`${e}\`\`\``);
		}
	} else if(command === "say") {
		client.sendMessage(m, args.join(" "));
	}
});

// Mention listener gets triggered when someone @mention the bot.
client.on("mention", msg => {
	client.sendMessage(msg.channel_id, "Prefix is `+`");
});

// Connect the bot
client.connect();