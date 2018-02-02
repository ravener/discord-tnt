const Constants = require("./constants.js");
const WebSocket = require("./WebSockets/WebSocketConnection.js");
const EventEmitter = require("events");
const Errors = require("./DiscordErrors.js")
const superagent = require("superagent");

/* Client class Main class for making a discord instance */
class Client extends EventEmitter {
	constructor(options = {}) {
		super();
		if(!options.TOKEN) throw new Error("No token found");
		this.TOKEN = options.TOKEN;
		if(!options.GAME) throw new Error("Game not specified");
		this.GAME = options.GAME;
		if(!options.STATUS) console.warn("No status set using default: online");
		this.STATUS = options.STATUS || "online";
		this.ws = null;
}
 sendMessage(channel, message) {
 	if(message.length > 2000) throw new RangeError("Messages must not exceed 2000 characters");
 	 superagent
 	 .post(`https://discordapp.com/api/v${Constants.API_VERSION}/channels/${channel}/messages`)
 	 .set("Authorization", "Bot " + this.TOKEN)
 	 .set("User-Agent", Constants.userAgent)
 	 .send({content: message})
 	 .then(res => {
 	 	 return;
 	 }).catch(err => console.error(err));
 }
connect() {
		this.ws = new WebSocket(this);
	}
}
 
