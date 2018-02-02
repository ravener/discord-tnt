module.exports = {
	Client: require("./Client.js"),
	version: require("../package.json").version,
	WebSocket: require("./WebSockets/WebSocketConnection.js"),
	WebhookClient: require("./WebhookClient.js"),
	EmbedBuilder: require("./classes/EmbedBuilder.js")
};
