# NOTE
This library is discontinued as this project was just me playing around. These days I found better ways to do this. Therefore, a new rewrite is in progress but there's no ETA yet.

# DiscordTNT
Node.js Discord Library.
Wrote using WS library for websocket connections and superagent library for http requests.
under development.

## Warning
The Library is highly unstable for now library is under development, please open a pull request if you would like to contribute, this is mainly a practice and I can't gurantee a perfect library but as I learn I'll be releasing new versions with better things.

- Easy to use
- Covers most of discord api , Not yet tho
- Active development
- Free and open to contribute/suggest a feature.

## Installation
Run this in a command prompt in your project's directory
```
npm i freetnt5852/discord-tnt --save
```
this requires you to have git.
will be in npm later once confirmed to be stable.

## Example usage
Here's a basic usage of the library:
```js
const DiscordTNT = require("discord-tnt");
// create a client instance.
const client = new DiscordTNT.Client({TOKEN:"Your Bot TOKEN"}); // Look at docs for other options the client accepts.

const prefix = "+" // many ways to set prefix pick your way

client.on('ready', () => {
	console.log("Bot is online!");
	console.log(`Logged in as ${client.self.username}`);
	client.setPresence("with NodeJS");
}); // ready event


client.on('messageCreate', message => {
	if(message.content.startsWith(prefix + "ping")) {
		client.sendMessage(message.channel_id, "Pong!");
	}
}); // register msg listener and check for msg content and reply

client.connect();
// log in the bot
```
## Webhooks
DiscordTNT Supports lightweight webhook usage without using a real bot token and authenticating stuff, here's an example usage of webhooks:
```js
const DiscordTNT = require("discord-tnt");
const client = new DiscordTNT.WebhookClient({
	TOKEN:"Webhook Token",
	ID:"Webhook ID"
});

client.sendMessage("Hello, World!"); // send text message.
client.setName("Cool Webhook"); // change name
client.destroy(); // Deletes webhook forever, goodbye.
```

## Useful links
- [Documentation](https://freetnt5852.github.io/discord-tnt)
- [Discord Server](https://discord.gg/CkY2dpr)
- [More Examples](https://github.com/freetnt5852/discord-tnt/blob/master/examples)

## License
Released under MIT License.
see [License](https://github.com/freetnt5852/discord-tnt/blob/master/LICENSE) file for more info

# Contributing
If you want to contribute please send a pull request with your changes and describe the changes, open an issue if you found a bug or suggesting an idea. Read [CONTRIBUTING.md](https://github.com/freetnt5852/discord-tnt/blob/master/.github/CONTRIBUTING.md) file for more info about contributing.
