
const superagent = require("superagent");
const Constants = require("./Constants.js");


/**
* Base class for interacting with discord webhooks
* this class isn't fully complete, but is meant
* to be usable without authentication with
* a bot account, all you need is webhook token and the id.
* @constructor
* @param {Object} options - The options for the client.
* @param {String} options.TOKEN - The webhook's TOKEN.
* @param {String} options.ID - The webhook's ID
*/
class WebhookClient {

	constructor(options = {}) {
		if(!options.TOKEN) throw new Error("Webhook token is missing");
		this.TOKEN = options.TOKEN;
		if(!options.ID) throw new Error("No webhook ID");
		this.ID = options.ID;
	}
	
	/**
	* Send a text message with the webhook.
	* @param {String} msg - The message to send.
	*/
	sendMessage(msg) {
		return new Promise((resolve, reject) => {
		superagent
		 .post(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .send({content: msg})
		 .then(resolve)
		 .catch(err => reject(err));
		});
	}
	
	/* destroys the webhook by deleting it */
	destroy() {
		superagent
		 .delete(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .catch(err => console.error(err));
	}
	setName(name) {
		return new Promise((resolve, reject) => {
		superagent
		 .patch(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .send({name: name})
		 .then(res => resolve(res))
		 .catch(err => reject(err));
		});
	}
}

module.exports = WebhookClient;