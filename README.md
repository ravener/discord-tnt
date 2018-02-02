# DiscordTNT
Node.js Discord Library.
Wrote using WS lib for websocket connections and superagent lib for http requests.
soon to be improved.
# Warning
Lib is highly unstable and this readme links and things may not exist/work the readme is for future things. for now lib is under development, please open a pull request if you would like to contribute, this is mainly a practice and i can't gurantee a perfect lib but as i learn i'll be releasing new versions with Better things.

• Easy to use
• Covers most of discord api , Not yet tho
• Active developement
• Free and open to contribute/suggest a feature.

# Installtion
You can easy get the lib with npm, run:
```
npm i discord-tnt --save
```
its not in npm right now at the time of writing this if you want the lib use
```
npm i git://github.com/freetnt5852/DiscordTNT
```
this requires you to have git.

# Example usage
Here's a basic usage of the lib:
```js
const DiscordTNT = require("discord-tnt");
const client = new DiscordTNT.Client({
	TOKEN: "Your bot token",
	GAME: "set a playing status",
	STATUS:"online" 
});
// create a client instance and set token, game and status
// available options for status: online, dnd, idle, invisible
const prefix = "+" // many ways to set prefix pick your way

client.on('ready', ready => {
	console.log("Bot is online!");
	console.log(`Logged in as ${ready.user.username}`);
}); // ready event


client.on('messageCreate', message => {
	if(message.content.startsWith(prefix + "ping")) {
		client.sendMessage(message.channel_id, "Pong!");
	}
}); // register msg listener and check for msg content and reply

client.connect();
// log in the bot
```


# Useful links
Documentation: Coming soon.
[Discord Server](https://discord.gg/CkY2dpr)
More examples: Coming soon.

# License
Released under MIT License.

# Contributing
If you want to contribute please send a pull request with your changes and describe the changes, open an issue if you found a bug or suggesting an idea. Read CONTRIBUTING.md file for more info about contributing.