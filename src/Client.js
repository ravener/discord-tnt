const Constants = require("./Constants.js");
const WebSocket = require("./WebSockets/WebSocketConnection.js");
const EventEmitter = require("events");
const Errors = require("./DiscordErrors.js")
const superagent = require("superagent");
const Collection = require("./utils/Collection.js");
const RestMethods = require("./RestMethods.js");

/**
* Client class Main class for making a discord instance
* @constructor
* @param {Object} options - options for the client
* @param {String} options.TOKEN - The bot's token
* @param {String} options.GAME - The playing status for the bot
* @param {String} options.STATUS=online - Status for the bot can be online idle dnd offline invisible.
* @param {Boolean} options.afk=false - Wether the client is afk or not.
* @param {Boolean} options.DEBUG=false - Wether to enable debug or not, debug will log lot of events and information, it is recommended to turn it on if you would like to report bugs.
*/
class Client extends EventEmitter {
	constructor(options = {}) {
		super();
		if(!options.TOKEN) throw new Error("No token found");
		
		/**
		* The bot's TOKEN must be kept private always.
		* @type {String}
		*/
		this.TOKEN = options.TOKEN;
		
		/**
		* The bot's playing status.
		* @type {String}
		*/
		this.game = options.GAME || null;
		
		/**
		* The bot's status.
		* @type {String}
		*/
		this.STATUS = options.STATUS || "online";
		
		/**
		* If debug is enabled or not.
		* @type {Boolean}
		*/
		this.DEBUG = options.DEBUG || false;
		
		/**
		* The client's Rest instance. for doing easy requests.
		* @type {RestMethods}
		*/
		this.rest = new RestMethods(this)
		
		/**
		* The websocket class, null if not connected.
		* @type {WebSocketConnection}
		*/
		this.ws = null;
		
		/**
		* If the client is connected or not
		* @type {Boolean}
		*/
		this.isConnected = false;
		
		/**
		* All guilds the bot is in, Empty Collection if not connected.
		* @type {Collection}
		*/
   this.guilds = new Collection();
   
   /**
   * All users the bot can see. Empty for now this will
   * be implented later.
   * @type {Collection}
   */
   this.users = new Collection();
   
   /**
   * All channels bot can see, empty for now this will be
   * implented later
   * @type {Collection}
   */
   this.channels = new Collection();
   
   /**
   * The logged in user, null if not connected.
   * @type {Self}
   */
   this.self = null;
   
   /**
   * Wether bot is afk or not
   * @type {Boolean}
   */
   this.afk = options.afk || false;
}

 /**
 * Send a message to a channel, bot must have SEND_MESSAGES permission.
 * @param {string} channel - The channel's ID to send message to.
 * @param {string} message - The text message to send.
 * @returns {Promise<Object>} Object containing basic message data from discord.
 */
 sendMessage(channel, message) {
 	if(message.length > 2000) throw new RangeError("Messages must not exceed 2000 characters");
 	 return new Promise((resolve, reject) => {
 	 superagent
 	 .post(`https://discordapp.com/api/v${Constants.API_VERSION}/channels/${channel}/messages`)
 	 .set("Authorization", "Bot " + this.TOKEN)
 	 .set("User-Agent", Constants.userAgent)
 	 .send({content: message})
 	 .then(res => {
 	 	 return resolve(res.body);
 	 }).catch(err => reject(err));
 	});
 }
 
 /**
 * Send an embed to a channel.
 * @param {String} channel - The channel's ID to send embed to.
 * @param {EmbedBuilder|Object} embed - The embed data to send, can be an embed object or an EmbedBuilder instance.
 * @returns {Promise<Object>} The basic message data from discord.
 */
 sendEmbed(channel, embed) {
 	return new Promise((resolve, reject) => {
 	 this.rest.post(`/channels/${channel}/messages`, {embed})
 	 .then(res => {
 	 	return resolve(res);
 	 }).catch(err => {
 	 	return reject(err);
 	 });
 	});
 }

/**
* Connect the client, creates a WebSocketConnection instance
* That connects the client and does the job.
* @type {WebSocketConnection}
*/
connect() {
	if(this.isConnected) throw new Error("Attempt to connect while already connected.");
	try {
		this.ws = new WebSocket(this);
	} catch(e) {
		console.error(`[CLIENT] [ERROR] ${e.stack}`);
  	}
 }
 
 /**
 * A getter used to check the websocket's ping.
 * @returns {Number}
 */
 get ping() {
 	if(!this.ws) throw new Error("Attemp to check ping while not connected to websocket.");
 	 return this.ws.lastHeartbeatAck - this.ws.lastHeartbeatSent;
 }
 
 /**
 * Logs out the bot, disconnected the websocket connection.
 */
 disconnect() {
 	this.ws.close();
 }
}
 
module.exports = Client;