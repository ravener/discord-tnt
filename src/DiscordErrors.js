class DiscordTNTError extends Error {
	constructor(message) {
		super(message);
		this.name = "DiscordTNT Error";
		this.error = "DiscordTNT Error";
	}
}

class RateLimitException extends DiscordTNTError {
	constructor(message) {
	super(message);
	this.name = "RateLimitException";
	this.error = "RatelimitedException";
 }
}

class DiscordForbidden extends DiscordTNTError {
	constructor(message) {
		super(message);
		this.name = "DiscordForbidden";
		this.error = "Forbidden";
	}
}

class NotFound extends DiscordTNTError {
	constructor(message) {
		super(message);
		this.name = "NotFound";
		this.error = "NotFound";
	}
}

module.exports.RateLimitException = RateLimitException;
module.exports.NotFound = NotFound;
module.exports.DiscordForbidden = DiscordForbidden;