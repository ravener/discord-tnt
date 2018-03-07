/**
* Snowflake class for some methods
* on finding the date of an ID
* @static
*/
class Snowflake {
	constructor() {
		throw new Error(`${this.constructor.name} is static and should not be called with new`);
	}
	
	/**
	* Gets a date object out of an ID
	* @param  {(String|Number)} id - The id in string or number to get date of it.
	*/
	static getDate(id) {
		return new Date(id / 4194304 + 1420070400000);
	}
	
	/**
	* Gets an epoch timestamp of an ID, can be used in
	* new Date() or any other purpose.
	* if you want to get a date object, try getDate();
	* @param {(String|Number)} id - The id in number or string to convert.
	*/
	static getTimestamp(id) {
		return id / 4194304 + 1420070400000;
	}
}

module.exports = Snowflake;
