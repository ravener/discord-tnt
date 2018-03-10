// A better example to further show the library and make it
// easier to understand
const DiscordTNT = require("discord-tnt"); // require it
const client = new DiscordTNT.Client({ // create a client
	TOKEN:"Your Bot Token",
	GAME:"Some game",
	STATUS:"online",
	DEBUG:true
});
const prefix = "+" // pick a command prefix

client.on("ready", () => {
	console.log(`Logged in as ${client.self.username}`);
}); // on ready

client.on("messageCreate", message => { // on message
	if(message.author.bot) return; // ignore bots
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	// get arguments in an array
	const command = args.shift().toLowerCase();
	// get command
	const m = message.channel_id;
	// just a shortcut to channel id, trust me this makes
	// it more comfortable to send Messages.
	if(command === "ping") {
		client.sendMessage(`Pong! WebSocket Latency: ${client.ping}`); // client.ping is null at first time login
		// so don't panic if it didn't work, will work after
		// 40 seconds of login or something
		// an improvement is planned for this.
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
	} else return;
});

client.connect();