const Constants = require("./Constants.js");
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
		if(!options.STATUS) console.warn("[CLIENT] [WARN] No status set using default: online");
		this.STATUS = options.STATUS || "online";
		this.ws = null;
		this.isConnected = false;
                this.guilds = new Map();
}
 sendMessage(channel, message) {
 	if(message.length > 2000) throw new RangeError("Messages must not exceed 2000 characters");
 	 superagent
 	 .post(`https://discordapp.com/api/v${Constants.API_VERSION}/channels/${channel}/messages`)
 	 .set("Authorization", "Bot " + this.TOKEN)
 	 .set("User-Agent", Constants.userAgent)
 	 .send({content: message})
 	 .then(res => {
 	 	 return res.body;
 	 }).catch(err => console.error(err));
 }
connect() {
	try {
		this.ws = new WebSocket(this);
		this.isConnected = true;
	} catch(e) {
		console.error(`[CLIENT] [ERROR] ${e.stack}`);
  	}
    }
}
 
module.exports = Client;
