const Errors = require("../DiscordErrors.js");
const Constants = require("../Constants.js");
const WebSocket = require("ws");
const EventEmitter = require("events");



class WebSocketConnection extends EventEmitter {
	constructor(client) {
		this.client = client;
		this.lastEvent = null;
		this.sessionId = null;
		this.connect();
}
	
	connect() {
		try {
		 this.ws = new WebSocket("wss://gateway.discord.gg?encoding=json&v=6");
	  this.registerEventListeners();
		console.log("Connected to discord gateway")
	} catch(e) {
			console.error(`[GATEWAY] [ERROR] Connection Failed: ${e}`);
		}
	}
	
 send(op, d) {
 	 this.ws.send(JSON.stringify({op, d}));
 } // so i can access ws sending easier way and also from client.js or anywhere.

// payload for identifying
 identify() {
 	        return {
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
               
            };
           

// Resume handling Soon tm
 resumePayload() {
 	return {
	 token: this.client.TOKEN,
	 session_id: this.sessionId,
	 seq: this.lastEvent || null
	}
};

  singleHeartbeat() {
   this.send(Constants.GatewayOpCodes.HEARTBEAT, this.lastEvent);
};

 heartbeat(interval) {
	setInterval(() => {
		this.ws.send(Constants.GatewayOpCodes.HEARTBEAT, this.lastEvent);
		console.log(`[GATEWAY] [EVENT] Sending heartbeat at sequence ${this.lastEvent}`);
	}, interval - 2000); // send heartbeat 2 seconds earlier just incase.
}


  

// event handling for websocket messages, more soon tm
 registerEventListeners() {
 	
 	 this.ws.on('open', function open() {
    	try { 
     this.send(Constants.GatewayOpCodes.IDENTIFY, this.identify());
     console.log(`[GATEWAY] [EVENT] Authenticated using token: ${this.client.token}`);
} catch(err) {
	  console.error(`[GATEWAY] [ERROR] ${err.etack}`);
 }
}
this.ws.on('message', gatewayMsg => {
  resp = JSON.parse(gatewayMsg);
  const op = resp.op;
  const type = resp.t;
  const seq = resp.s;
  const data = resp.d;
  
  if(seq) {
  	this.lastEvent = seq;
  }
  if(op === Constants.GatewayOpCodes.HELLO && data.heatbeat_interval) {
  	console.log(`[GATEWAY] [EVENT] Hello event, heartbeat interval: ${data.heartbeat_interval} ms`);
  	this.heartbeat(data.heartbeat_interval);
  }
  if(op === Constants.GatewayOpCodes.EVENT_DISPATCH && type === "READY" && data.session_id) {
  	this.sessionId = data.session_id;
  	console.log(`[GATEWAY] [EVENT] Ready session ID: ${data.session_id}`);
  	this.client.emit("ready", data); 
  }
  if(op === 11) {
  	console.log("[GATEWAY] [EVENT] Heartbeat Acknowledged")
  }
  
  if(op === Constants.GatewayOpCodes.EVENT_DISPATCH && type === "MESSAGE_CREATE" && data.content) {
  	this.client.emit("messageCreate", data);
  }
  if(op === Constants.GatewayOpCodes.INVALID_SESSION) {
  	this.lastEvent = null;
  	this.sessionId = null;
  	console.log(`[GATEWAY] [ERROR] Invalid Session: ${resp}`);
 }
});
this.ws.on("close", (code, reason) => {
	console.log(`[GATEWAY] [CLOSE] Code: ${code}, Reason: ${reason}.`);
});
this.ws.on("error", err => {
	console.error(`[GATEWAY] [ERROR] ${err}`);
  });
 }
 disconnect() {
 	this.ws.close();
 }
}

module.exports = WebSocketConnection;