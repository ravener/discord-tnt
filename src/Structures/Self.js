
/**
* Class to interact with the logged in bot
* things like access your bot's name, change presence and status, etc
* you do not need to create an instance of this
* use the .self property in your client instance.
* @constructor
* @param {Client} client - Main client class.
* @param {Object} data - The data from discord.
*/

class Self {
	constructor(client, data) {
		
		/**
		* The main client instance.
		* @type {Client}
		*/
		Object.defineProperty(this, 'client', { value: client});
		
		/**
		* The raw object data.
		* @type {Object}
		*/
		Object.defineProperty(this, 'data', { value: data });
		
		/**
		* The bot's username.
		* @type {String}
		*/
		this.username = data.user.username;
		
		/**
		* The bot's 4 digit disciminator.
		* @type {String}
		*/
		this.discriminator = data.user.discriminator;
		
		/**
		* The bot's Snowflake ID.
		* @type {String}
		*/
		this.id = data.user.id;
		
		/**
		* The bot's avatar hash.
		* @type {String}
		*/
		this.avatar = data.user.avatar || null;
		// possible chance the bot doesn't have an avatar.
		
		/**
		* The bot's avatar URL.
		* @type {String}
		*/
		this.avatarURL = this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png?size=2048` : `https://cdn.discordapp.com/embed/avatars/${this.discriminator % 5}.png`;
	}
	
	/**
	* Sets the bot's presence.
	* @param {String} message - The message to show in presence.
	* @param {Number} type - The bot's presence type, can be a number between 0 and 3.
	*/
  setPresence(message, type=0) {
  	if(parseInt(type) > 3) throw new Error("Type must be a number between 0 and 3");
  	this.client.ws.send(3, {
  		game: {
  			name: message,
  			type: parseInt(type)
  		},
  		status: this.client.STATUS,
  		since: Date.now(),
  		afk: this.client.afk;
  	});
  }
  
  /**
  * Sets bot's status.
  * @param {String} status - The status to set can be online, dnd, invisible, idle or offline.
  * @param {Boolean} afk=false - Wether to be afk or not.
  */
  setStatus(status, afk=false) {
  	let allowed = ['online', 'offline','idle','dnd','invisible'];
  	if(!allowed.includes(status.toLowerCase())) throw new Error("Status can only be online, idle, dnd, offline and invisible");
  	this.client.ws.send(3, {
  		status:status.toLowerCase(),
  		afk: Boolean(afk),
  		since: Date.now()
  	});
  }
}

module.exports = Self;