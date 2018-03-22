// Currently useless.

/**
* Some utility methods to help at some point.
* @static
*/
class Utils {
	constructor() {
		throw new Error(`${this.constructor.name} is static`);
	}
	
	/**
	* Converts seconds to Milliseconds, useless function though but anyway.
	* @param {(String|Number)} seconds - The seconds to convert
	*/
	toMS(seconds) {
		return Number(seconds + '000');
	}
}