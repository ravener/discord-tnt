

/**
* A Custom collection, which extends map and adds extra
* functionality to it.
* @extends {Map}
*/
class Collection extends Map {
	constructor(iterable) {
		super(iterable);
	}
	
	/**
	* Makes an array out of the collection's values.
	* @returns {Array}
	*/
	array() {
		return Array.from(this.values());
	}
	
	/**
	* Makes an array of Collection's keys.
	* @returns {Array}
	*/
	keyArray() {
		return Array.from(this.keys());
	}
	
	/**
	* Grabs first value of a collection.
	*/
	first() {
		return this.values().next().value;
	}
	
	/**
	* Grabs first key of a collection.
	*/
	firstKey() {
		return this.keys().next().value;
	}
	
	/**
	* Grabs last value of a collection.
	*/
	last() {
		let arr = this.array();
		return arr[arr.length - 1];
	}
	
	/**
	* Grabs the last key of a collection.
	*/
	lastKey() {
		let arr = this.keyArray();
		return arr[arr.length - 1];
	}
	
	/**
	* Returns a random value of a collection.
	*/
	random() {
		let arr = this.array();
		return arr[Math.floor(Math.random() * arr.length)];
	}
	
	/**
	* Returns a random key from the collection.
	*/
	randomKey() {
		let arr = this.keyArray();
		return arr[Math.floor(Math.random() * arr.length)];
	}
	
	/**
	* Finds a value from a property.
	* @param {String} property - The property to search in.
	* @param {String} value - The value to find.
	* @example
	* client.guilds.find("name", "CodeGrok");
	* // find a server by name CodeGrok.
	*/
	find(property, value) {
		for(const x of this.values()) {
			if(x[property] === value) return x;
		}
	}
	
	/**
	* Clones the collection with all same key and values,
	* @returns {Collection}
	*/
	clone() {
		return new this.constructor(this);
	}
}

module.exports = Collection;
