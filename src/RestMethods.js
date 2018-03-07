const superagent = require("superagent");
const { userAgent: USER_AGENT, API_VERSION }  = require("./Constants.js");
const BASE_URL = `https://discordapp.com/api/v${API_VERSION}`;

/**
* A class that includes some useful methods for interacting
* with Discord API in easier way, the client instance will
* have a property named rest that has access to this class
* that will be used throughout the library for easier
* access to the request methods wherever we have access
* to client instance. its not recommended to use this class
* its meant to be used by the library, but ok i will still
* document it for those who might be interested.
* @constructor
* @param {Client} client - The main client instance.
* @example
* client.rest.post("/channels/ChannelID/messages", {content:"Hi sent using the client rest methods!"});
* // do a simple post request to that endpoint
*/
class RestMethods {
	constructor(client) {
		
		/**
		* The main client.
		* @type {Client}
		*/
		this.client = client;
	}
	
	/**
	* Gets a Discord API Endpoint.
	* @param {String} endpoint - The Endpoint to request.
	* @returns {Promise<Object>}
	*/
	get(endpoint) {
		return new Promise((resolve, reject) => {
			superagent
			 .get(BASE_URL + endpoint)
			 .set("Authorization", `Bot ${this.client.TOKEN}`)
			 .set("User-Agent", USER_AGENT)
			 .then(res => {
			 	return resolve(res.body);
			 }).catch(err => {
			 	return reject(err);
			 });
		});
	}
	
	/**
	* Do a POST Request to an endpoint.
	* @param {String} endpoint - The endpoint to request.
	* @param {Object} data - The data to send.
	* @returns {Promise<Object>}
	*/
	post(endpoint, data) {
		return new Promise((resolve, reject) => {
			superagent
			 .post(BASE_URL + endpoint)
			 .set("Authorization", `Bot ${this.client.TOKEN}`)
			 .set("User-Agent", USER_AGENT)
			 .send(data)
			 .then(res => {
			 	return resolve(res.body);
			 }).catch(err => {
			 	return reject(err);
			 });
		});
	}
	
	/**
	* Do a PUT Request to an endpoint.
	* @param {String} endpoint - The endpoint to request.
	* @param {Object} data - The data to send.
	* @returns {Promise<Object>}
	*/
	put(endpoint, data) {
		return new Promise((resolve, reject) => {
			superagent
			 .put(BASE_URL + endpoint)
			 .set("Authorization", `Bot ${this.client.TOKEN}`)
			 .set("User-Agent", USER_AGENT)
			 .send(data)
			 .then(res => {
			 	return resolve(res.body);
			 }).catch(err => {
			 	return reject(err);
			 });
		});
	}
	
	/**
	* Do a PATCH Request to an endpoint.
	* @param {String} endpoint - The endpoint to request.
	* @param {Object} data - The data to send.
	* @returns {Promise<Object>}
	*/
	patch(endpoint, data) {
		return new Promise((resolve, reject) => {
			superagent
			 .patch(BASE_URL + endpoint)
			 .set("Authorization", `Bot ${this.client.TOKEN}`)
			 .set("User-Agent", USER_AGENT)
			 .send(data)
			 .then(res => {
			 	return resolve(res.body);
			 }).catch(err => {
			 	return reject(err);
			 });
		});
	}
	
	/**
	* Do a DELETE Request to an endpoint.
	* @param {String} endpoint - The endpoint to request.
	* @param {Object} data - The data to send.
	* @returns {Promise<Object>}
	*/
	delete(endpoint, data) {
		return new Promise((resolve, reject) => {
			superagent
			 .delete(BASE_URL + endpoint)
			 .set("Authorization", `Bot ${this.client.TOKEN}`)
			 .set("User-Agent", USER_AGENT)
			 .then(res => {
			 	return resolve(res.body);
			 }).catch(err => {
			 	return reject(err);
			 });
		});
	}
}

module.exports = RestMethods;