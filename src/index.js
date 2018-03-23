module.exports = {
	   Client: require("./Client.js"),
	   version: require("../package.json").version,
	   WebSocket: require("./WebSockets/WebSocketConnection.js"),
	   WebhookClient: require("./WebhookClient.js"),
	   EmbedBuilder: require("./Classes/EmbedBuilder.js"),
	   Snowflake: require("./utils/Snowflake.js"),
	   Collection: require("./utils/Collection.js"),
	   logger: require("./utils/Logger.js"),
	   Constants: require("./Constants.js")
};