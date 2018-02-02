/*
  Base class for interacting
  with discord webhooks
  this class isn't fully
  complete, but is meant
  to be usable without
  authentication with
  a bot account, all you
  need is webhook token
  and the id.
*/
const superagent = require("superagent");
const Constants = require("./src/Constants.js");



class WebhookClient {

	constructor(options = {}) {
		if(!options.TOKEN) throw new Error("Webhook token is missing");
		this.TOKEN = options.TOKEN;
		if(!options.ID) throw new Error("No webhook ID");
		this.ID = options.ID;
	}
	
	function send(content) {
   if(typeof content === 'object') {
    return content;
  } else {
     return {content: content};
  }
}
	sendMessage(msg) {
		superagent
		 .post(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .send(this.send(msg));
		 .then(res => return)
		 .catch(err => console.error(err));
	}
	/* destroys the webhook by deleting it */
	destroy() {
		superagent
		 .delete(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .then(res => return("Deleted webhook sucessfully"))
		 .catch(err => console.error(err));
	}
	setName(name) {
		superagent
		 .patch(`https://discordapp.com/api/v${Constants.API_VERSION}/webhooks/${this.ID}/${this.TOKEN}`)
		 .send({username: name})
		 .then(res => return(`Success, Name changed to ${name}`)).catch(err => console.error(err));
	}
}

module.exports = WebhookClient;