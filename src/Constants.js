/* This file contains objects with some useful keys/properties to make it easy to reach some things */
module.exports.GATEWAY_VERSION = 6;
// Gateway version to connect.

module.exports.API_VERSION = 6;
// the api version in https://discordapp.com/api/v(version)

module.exports.VERSION = require("../package.json").version;
// Library version

module.exports.userAgent = `DiscordBot (https://github.com/freetnt5852/discord-tnt, ${require('../package.json').version})`;
// User-Agent for http requests.


// Gateway Op Codes
module.exports.GatewayOpCodes = {
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
// Voice won't be implemented at the moment
// maybe one day in the future.
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

let PERMISSIONS = {
  CREATE_INSTANT_INVITE: 0x00000001, // Allows creation of instant invites
  KICK_MEMBERS: 0x00000002, // Allows kicking members
  BAN_MEMBERS: 0x00000004, // Allows banning members
  ADMINISTRATOR: 0x00000008, // Allows all permissions and bypasses channel permission overwrites
  MANAGE_CHANNELS: 0x00000010, // Allows management and editing of channels
  MANAGE_GUILD: 0x00000020, // Allows management and editing of the guild
  ADD_REACTIONS: 0x00000040, // Allows for the addition of reactions to messages
  VIEW_AUDIT_LOG: 0x00000080, // Allows for viewing of audit logs
  VIEW_CHANNEL: 0x00000400, // Allows guild members to view a channel, which includes reading messages in text channels
  SEND_MESSAGES: 0x00000800, // Allows for sending messages in a channel
  SEND_TTS_MESSAGES: 0x00001000, // Allows for sending of `/tts` messages
  MANAGE_MESSAGES: 0x00002000, // Allows for deletion of other users messages
  EMBED_LINKS: 0x00004000, // Links sent by users with this permission will be auto-embedded
  ATTACH_FILES: 0x00008000, // Allows for uploading images and files
  READ_MESSAGE_HISTORY: 0x00010000, // Allows for reading of message history
  MENTION_EVERYONE: 0x00020000, // Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel
  USE_EXTERNAL_EMOJIS: 0x00040000, // Allows the usage of custom emojis from other servers
  CONNECT: 0x00100000, // allows for joining of a voice channel
  SPEAK: 0x00200000, // Allows for speaking in a voice channel
  MUTE_MEMBERS: 0x00400000, // Allows for muting members in a voice channel
  DEAFEN_MEMBERS: 0x00800000, // Allows for deafening of members in a voice channel
  MOVE_MEMBERS: 0x01000000, // Allows for moving of members between voice channels
  USE_VAD: 0x02000000, // Allows for using voice-activity-detection in a voice channel
  CHANGE_NICKNAME: 0x04000000, // Allows for modification of own nickname
  MANAGE_NICKNAMES: 0x08000000, // Allows for modification of other users nicknames
  MANAGE_ROLES: 0x10000000, // Allows management and editing of roles
  MANAGE_WEBHOOKS: 0x20000000, // Allows management and editing of webhooks
  MANAGE_EMOJIS: 0x40000000 // Allows management and editing of emojis
};
let arr = Object.values(PERMISSIONS);
PERMISSIONS.ALL = arr.reduce((x, y) => x | y);
module.exports.PERMISSIONS = PERMISSIONS;

module.exports.MESSAGE_TYPES = {
  DEFAULT: 0,
  RECIPIENT_ADD: 1,
  RECIPIENT_REMOVE: 2 ,
  CALL: 3,
  CHANNEL_NAME_CHANGE: 4,
  CHANNEL_ICON_CHANGE: 5,
  CHANNEL_PINNED_MESSAGE: 6,
  GUILD_MEMBER_JOIN: 7
};
 

module.exports.COLORS = {
	RED: 0xFF0000,
	BLUE: 0x0000FF,
	YELLOW: 0xFFEB00
 // some colors, more coming soon, send a PR if you wanna do it, meant to reach colors easily for embeds etc..
 // i'll find better values for colors later and add a
 // way to use them in embeds.
}

module.exports.CDN_ENDPOINTS = {
	avatar: (userID, hash) => {
		return `https://cdn.discordapp.com/avatars/${userID}/${hash}.${hash.startsWith('a_') ? 'gif' : 'png'}?size=2048`
	},
	emoji: (id) => {
		return `https://cdn.discordapp.com/emojis/${id}`;
	}
};



// idk if i'll even use this, maybe in the future.
module.exports.ENDPOINTS = {
 channel: (id) => `https://discordapp.com/api/v6/channels/${id}`,
 messages: (channelID) => `https://discordapp.com/api/v6/channels/${channelID}/messages`
}