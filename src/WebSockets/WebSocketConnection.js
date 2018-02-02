const Errors = require("../DiscordErrors.js");
const Constants = require("./src/Constants.js");
const WebSocket = require("ws");
const EventEmitter = require("events");



class WebSocketConnection extends EventEmitter {
	constructor(client) {
		this.client = client;
		this.ws = new WebSocket('wss://gateway.discord.gg?encoding=json&v=6');
		this.lastEvent = null;
		this.sessionId = null;

	}
	
 send(op, d) {
 	 this.ws.send(JSON.stringify({op: op, d: d}));
 } // so i can access ws sending from client.js

// payload for identifying
// kinda spammy in this file but deal with it.
 let payload = {
            "op":Constants.GatewayOpCodes.IDENTIFY,
            "d":{
                "token":this.client.TOKEN, 
                    'properties': {
                        '$properties':process.platform, 
                        '$browser':'DiscordTNT', 
                        '$device':'DiscordTNT'
                        },
                'compress':false, 
                'large_threshold': 250,
                "presence": {
                    "game": {
                        "name": this.client.GAME,
                        "type": 0
                    },
                    "status": this.client.STATUS,
                    "since": Date.now(),
                    "afk": false
                    }
                }
            }

// Resume handling Soon tm
let resumePayload = {
	token: this.client.TOKEN,
	session_id: this.sessionId,
	seq: this.lastEvent || null
}
// payload for hearbeating
let ping_payload {
	op: Constants.GatewayOpCodes.HEARTBEAT,
	d: lastEvent || null
};

// when websocket connected succesfully.
this.ws.on('open', function open() {
	try { 
  this.ws.send(JSON.stringify(payload));
  console.log(`Connected to Discord gateway! using token: ${this.client.token}`);
} catch(err) {
	console.error(err);
 }
}
  

// event handling for websocket messages, more soon tm
this.ws.on('message', gatewayMsg => {
  resp = JSON.parse(gatewayMsg);
  const op = resp.op;
  const type = resp.t;
  const seq = resp.s;
  const data = resp.d;

  if(op === Constants.GatewayOpCodes.HELLO && data.heatbeat_interval) {
  	setInterval(() => {
  		this.ws.send(ping_payload);
  	}, data.heartbeat_interval - 2000); // send heartbeat 2 seconds earlier just incase.
  }
  if(type === "READY" && data.session_id) {
  	this.sessionId = data.session_id;
  	this.client.emit("ready", data);
  }
  if(seq) {
  	this.lastEvent = seq;
  }
  if(type === "MESSAGE_CREATE" && data.content) {
  	this.client.emit("messageCreate", data);
  }
  if(op === Constants.GatewayOpCodes.INVALID_SESSION) {
  	this.lastEvent = null;
  	this.sessionId = null;
 }
});
this.ws.on("close", (code, reason) => {
	console.warn(`Gateway connection closed with code ${code} and reason: ${reason}.`);
});
this.ws.on("error", err => {
	console.error(`WebSocket Error: ${err}`);
});
}

module.exports = WebSocketConnection;
