const Errors = require("../DiscordErrors.js");
const Constants = require("../Constants.js");
const WebSocket = require("ws");
const EventEmitter = require("events");
const Self = require("../Structures/Self.js");

/**
* Base class for websocket connection
* to discord gateway, Note that you do not need to
* do any of these, calling connect(); on your Client
* instance does all of this, they are here for
* documentation purposes.
* @constructor
* @param {Client} client - The client instance of the bot.
*/
class WebSocketConnection extends EventEmitter {
	constructor(client) {
   super();
   
   /**
   * The main client
   * @type {Client}
   */
		this.client = client;
		
		/**
		* Last event sequence, used in heartbeating and resume.
		* null if not connected.
		* @type {Number}
		*/
		this.lastEvent = null;
		
		/**
		* The client's session ID, used for resuming.
		* @type {String}
		*/
		this.sessionId = null;
		this.connect();
		
		/**
		* The time since last heartbeat was sent.
		* used for measuring websocket latency.
		*/
		this.lastHeartbeatSent = null;
		
		/**
		* Time since last heartbeat ack.
		* used for measuring websocket latency.
		*/
		this.lastHeartbeatAck = null;
}
	
	/**
	* Connects the bot, creating a websocket connection
	* you do not need to do any of these, calling connect
	* on your Client instance does everything for you.
	* @type {WebSocketConnection}
	*/
	connect() {
		if(this.client.isConnected) throw new Error("Attempt to connect while already connected.");
		try {
		 this.ws = new WebSocket("wss://gateway.discord.gg?encoding=json&v=6");
		 this.client.isConnected = true;
		 this.client.ws = this.ws;
		 this.registerEventListeners();
		 if(this.client.DEBUG) console.log("Connected to discord gateway");
	} catch(e) {
			console.error(`[GATEWAY] [ERROR] Connection Failed: ${e}`);
		}
	}

 /**
 * Send a json payload to discord websocket.
 * @param {Number} op - The OP code for this payload.
 * @param {String|Object} d - The data to send can be a simple string or a complex object.
 */
 send(op, d) {
 	 this.ws.send(JSON.stringify({op, d}));
 }

/**
* An object that's used for identifying.
* @returns {Object}
*/
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
           

/**
* A resume payload object used to resume missed events
* on reconnecting
* @returns {Object}
*/
 resume() {
 	return {
	 token: this.client.TOKEN,
	 session_id: this.sessionId,
	 seq: this.lastEvent || null
	}
};

/**
* Send a single heartbeat to discord websocket
* use heartbeat instead for setting an interval.
*/
  singleHeartbeat() {
   this.send(Constants.GatewayOpCodes.HEARTBEAT, this.lastEvent);
};

/**
* Set an interval to send heartbeats every while
* @param {Number} interval - The interval in milliseconds to send heartbeat
*/
 heartbeat(interval) {
	setInterval(() => {
		this.send(Constants.GatewayOpCodes.HEARTBEAT, this.lastEvent);
		this.lastHeartbeatSent = Date.now();
		if(this.client.DEBUG) console.log(`[GATEWAY] [EVENT] Sending heartbeat at sequence ${this.lastEvent}`);
	}, interval - 2000); // send heartbeat 2 seconds earlier just incase.
}

  /**
  * Checks if bot is ready, by looping through guilds
  * and checking if there is not unvailable guilds.
  * and client.self is instantiated.
  * @returns {Boolean}
  */
  checkIfReady() {
  	let unavailableGuilds = 0;
  	for(const x of this.client.guilds.values()) {
  		if(x.unavailble) unavailableGuilds++
  	}
  	if(unavailableGuilds === 0 && this.client.self !== null) return true;
  	return false;
  }
  
  /**
  * Triggers Ready event after checking if ready.
  * @emits Client#ready
  */
  triggerReady() {
  	if(this.checkIfReady()) {
  		this.client.emit("ready");
  	} else {
  		if(this.client.DEBUG) console.log("Couldn't trigger ready due to being not ready");
  		return false;
  	}
  }
  

/**
* All event listeners for websocket messages.
* plus disconnection and error listeners.
*/
 registerEventListeners() {
 	
 	 this.ws.on('open', () => {
 	 	if(this.sessionId) {
 	 		this.send(Constants.GatewayOpCodes.RESUME, this.resume());
 	 		
 	 	/**
 	 	* Emitted when the websocket reconnects and resumes.
 	 	* @event Client#resume
 	 	*/
 	 	this.client.emit("resume");
 	 	if(this.client.DEBUG) console.log(`Resumed Successfully with session id: ${this.sessionId} and token: ${this.client.TOKEN}`);
 	 } else {
     this.send(Constants.GatewayOpCodes.IDENTIFY, this.identify());
     if(this.client.DEBUG) console.log(`[GATEWAY] [EVENT] Authenticated using token: ${this.client.TOKEN}`);
   }
});
this.ws.on('message', gatewayMsg => {
  let resp = JSON.parse(gatewayMsg);
  let op = resp.op;
  let type = resp.t;
  let seq = resp.s;
  let data = resp.d;
  
  if(seq) this.lastEvent = seq;
  
  /**
  * Emitted on any websocket event, useful if you want to
  * customize the websocket messages and add extra events.
  * though its deprecated use it only if you know what you are doing
  * @event Client#ANY
  * @param {Number} op - The opcode of the event.
  * @param {String} type - The event type.
  * @param {Object} data - The data object from discord.
  * @deprecated
  * @example
  * client.on("ANY", (op, type, data) => {
  *  if(op === 0 && type === "MESSAGE_CREATE") {
  *    console.log(data.content);
  *    // logs all message contents.
  *    // just an example don't be a spy.
  *   }
  * });
  */
  this.client.emit("ANY", op, type, data);
  
  if(op === Constants.GatewayOpCodes.HELLO && data.heartbeat_interval) {
  if(this.client.DEBUG) console.log(`[GATEWAY] [EVENT] Hello event, heartbeat interval: ${data.heartbeat_interval} ms`);
  	this.heartbeat(data.heartbeat_interval);
  }
  if(op === Constants.GatewayOpCodes.EVENT_DISPATCH && type === "READY" && data.session_id) {
  	this.sessionId = data.session_id;
  	if(this.client.DEBUG) console.log(`[GATEWAY] [EVENT] Ready session ID: ${data.session_id}`);
  	this.client.self = new Self(this.client, data);
  	this.triggerReady();
  }
  if(op === 11) {
  	if(this.client.DEBUG) console.log("[GATEWAY] [EVENT] Heartbeat Acknowledged");
  	this.lastHeartbeatAck = Date.now();
  }
  
  if(op === Constants.GatewayOpCodes.EVENT_DISPATCH && type === "MESSAGE_CREATE" && data.content) {
  	
  	/**
   * Emitted when a message is created.
   * @event Client#messageCreate
   * @param {Object} message - The message object from discord.
   */
  	this.client.emit("messageCreate", data);
  }
  if(op === Constants.GatewayOpCodes.INVALID_SESSION) {
  	this.lastEvent = null;
  	this.sessionId = null;
  	if(this.client.DEBUG) console.log(`[GATEWAY] [ERROR] Invalid Session: ${resp}`);
 }
 if(op === Constants.GatewayOpCodes.EVENT_DISPATCH && type === "GUILD_CREATE") {
	 this.client.guilds.set(data.id, data);
     }
});
this.ws.on("close", (code, reason) => {
	if(this.client.DEBUG) console.log(`[GATEWAY] [CLOSE] Code: ${code}, Reason: ${reason}.`);
	this.client.isConnected = false;
	this.client.ws = null;
	
	/**
	* Emitted when websocket closes, normally you don't
	* have to do anything, the library will handle close and
	* reconnects for you, but this method is useful if you
	* want to add some custom function to be executed on
	* disconnect.
	* @event Client#disconnect
	* @param {Number} code - The websocket close code.
	*/
	this.client.emit("disconnect", code);
	if(code === 4004) {
		throw new Error("Disconnected from gateway due to invalid token please make sure your token is correct before trying again");
		process.exit(1);
}	else if(code === 4007) {
	if(this.client.DEBUG) console.log("Invalid session id, clearing session id and re opening a new connection...");
	this.lastEvent = null;
	this.sessionId = null;
	this.connect();
} else if(code === 4011) {
	console.log("Your Bot is in too many guilds and requires sharding, We are sorry but we don't support sharding yet check back later.");
	process.exit(1);
} else if(code === 4008) {
	console.warn("Disconnected for being ratelimited. reconnecting in 30 seconds");
	setTimeout(() => {
		this.connect();
	}, 30000);
} else {
	this.connect();
}
});
this.ws.on("error", err => {
	if(this.client.DEBUG) console.error(`[GATEWAY] [ERROR] ${err}`);
  });
 }
 
 /**
 * Closes the websocket connection.
 * changes value of isConnected in the Client to false.
 * and ws to null.
 */
 disconnect() {
 	this.ws.close();
 	this.client.isConnected = false;
 	this.client.ws = null;
 	if(this.client.DEBUG) console.log("Disconnect has been called. WebSocket is now disconnected.");
 }
}

module.exports = WebSocketConnection;