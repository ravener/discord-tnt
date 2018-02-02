/* This file contains objects with some useful keys/properties to make it easy to reach some things */
module.exports.GATEWAY_VERSION = 6;
// Gateway version to connect.

module.exports.API_VERSION = 6;
// the api version in https://discordapp.com/api/v(version)

module.exports.VERSION = require("../package.json").version;
// Library version

module.exports.userAgent = `DiscordBot (https://github.com/freetnt5852/discord-tnt, ${require('../package.json').version})`;

// Gateway Op Codes
module.exports.GatewayOpCodes {
	EVENT_DISPATCH: 0, // Dispatches an event
	HEARTBEAT: 1, // Used for ping checking
	IDENTIFY: 2, // Used for client handshake
	STATUS_UPDATE: 3, // Used to update client status
	VOICE_UPDATE: 4, // Used to join/move/leave voice channels
	VOICE_PING: 5, // Used for voice ping checking
	RESUME: 6, // Used to resume a closed connection
	RECONNECT: 7, // Used to tell clients to reconnect to the gateway
	REQUEST_GUILD_MEMBERS: 8, // Used to request guild members
	INVALID_SESSION: 9, // Used to notify client they have an invalid session id
	HELLO: 10, // sent immediately after connecting, contains heartbeat and server debug information
	HEARTBEAT_ACK: 11 // sent immediately following a client heartbeat that was received
};
// Code descriptions from official discord api docs

// Voice OpCodes
module.exports.VoiceOpCodes = {
	IDENTIFY: 0, // Begin a voice websocket connection
	SELECT_PROTOCOL: 1, // Select the voice protocol
	READY: 2, // Complete the websocket handshake
	HEARTBEAT: 3, // Keep the websocket connection alive
	SESSION_DESCRIPTION: 4, // Describe the session
	SPEAKING: 5, // Indicate which users are speaking
	HEARTBEAT_ACK: 6, // Sent immediately following a recieved client heatbeat
	RESUME: 7, // Resume a connection
	HELLO: 8, // The continuous interval in milliseconds after which the client should send a heartbeat
	RESUMED: 9, // Acknowlegde Resume
	CLIENT_DISCONNECT: 13 // A client has disconnected from the voice channel
}; 

module.exports.COLORS = {
	RED: 0xFF0000,
	BLUE: 0x0000FF,
	YELLOW: 0xFFEB00
 // some colors, more coming soon, send a PR if you wanna do it, meant to reach colors easily for embeds..
}
// idk if i'll even use this, maybe in the futute.
module.exports.ENDPOINTS = {
 channel: (id) => `https://discordapp.com/api/v6/channels/${id}`,
 messages: (channelID) => `https://discordapp.com/api/v6/channels/${channelID}/messages`
}