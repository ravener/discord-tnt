# DiscordTNT
Node.js Discord Library.
Wrote using WS library for websocket connections and superagent library for http requests.
soon to be improved.
# Warning
Lib is highly unstable and this readme links and things may not exist/work the readme is for future things. for now lib is under development, please open a pull request if you would like to contribute, this is mainly a practice and i can't gurantee a perfect lib but as i learn i'll be releasing new versions with Better things.

- Easy to use
- Covers most of discord api , Not yet tho
- Active developement
- Free and open to contribute/suggest a feature.

# Installation
Run this in a command prompt in your project's directory
```
npm i freetnt5852/discord-tnt --save
```
this requires you to have git.
will be in npm later once confirmed to be stable.

# Example usage
Here's a basic usage of the library:
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
- [Documentation](https://freetnt5852.github.io/discord-tnt)
- [Discord Server](https://discord.gg/CkY2dpr)
- [More Examples](https://github.com/freetnt5852/discord-tnt/blob/master/examples)

# License
Released under MIT License.
see [License](https://github.com/freetnt5852/discord-tnt/blob/master/LICENSE) file for more info

# Contributing
If you want to contribute please send a pull request with your changes and describe the changes, open an issue if you found a bug or suggesting an idea. Read [CONTRIBUTING.md](https://github.com/freetnt5852/discord-tnt/blob/master/.github/CONTRIBUTING.md) file for more info about contributing.