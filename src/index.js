module.exports = {
	Client: require("./src/Client.js"),
	version: require("./package.json").version,
	WebSocket: require("./src/WebSockets/WebSocketConnection.js"),
	WebhookClient: require("./src/WebhookClient.js"),
	EmbedBuilder: require("./classes/EmbedBuilder.js")
};