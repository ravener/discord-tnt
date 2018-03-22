
/**
* class for making Rich Embed Messages
* @constructor
* @param {Object} embed - The embed object its recommended to use the setters instead as it makes it easier.
* the setters also return the instance itself so its possible to chain multiple setters.
*/
class EmbedBuilder {
	constructor(embed = {}) {
		
		/**
		* Embed Title
		* @type {String}
		*/
		this.title = embed.title;
		
		/**
		* The embed description
		* @type {String}
		*/
		this.description = embed.description;
		
		/**
		* The color of the embed
		* @type {Number}
		*/
		this.color = embed.color;
		
		/**
		* Embed fields in an array.
		* @type {Array}
		*/
		this.fields = embed.fields || [];
		
		/**
		* The Embed Footer
		* @type {Object}
		*/
		this.footer = {
		  text: embed.footer.text,
		  icon_url: embed.footer.iconURL
		}
	}

  /**
  * Sets the embed title.
  * @param {String} title - The embed title to set, must not exceed 256 characters or an error is thrown.
  * @returns {EmbedBuilder}
  */
  setTitle(title) {
  	title = String(title);
  	if(title.length > 256) {
  		throw new RangeError("Embed title must not exceed 256 characters!");
  	}
  	this.title = title
  	return this; // return embed object every set so its possible to chain multiple .set like .setTitle().setDescription() etc
  }
  
  /**
  * Set the embed description.
  * @param {String} description - The description to set, must not exceed 2048 Characters or an error is thrown.
  * @returns {EmbedBuilder}
  */
  setDescription(description) {
  	description = String(description);
  	if(description.length > 2048) { 
  	 throw new RangeError("Embed Description must not exceed 2048 characters!");
  	 }
  	this.description = description;
  	return this;
  }
  /**
  * Set the embed color
  * @param {Number} color - the Embed's color in bitwise integer.
  * @returns {EmbedBuilder}
  * @example
  * .setColor(0x00FF00) // sets color to green.
  */
  setColor(color) {
  	color = parseInt(color);
  	this.color = color;
  	return this;
  }
  
  /**
  * Add a field, the field is then pushed to fields array.
  * fields must not exceed 25 fields or an error is thrown.
  * @param {String} name - The field's name, must not exceed 256 characters or an error is thrown.
  * @param {String} value - The field's value, must not exceed 1024 Characters or an error is thrown.
  * @param {Boolean} inline=false - Wether the field must have an inline or not.
  * @returns {EmbedBuilder}
  */
  addField(name, value, inline = false) {
  	if(typeof inline !== 'boolean') throw new TypeError("Inline can be a boolean only");
  	if(name.length > 256) throw new RangeError("Embed field values must not exceed 256 characters");
  	if(value.length > 1024) throw new RangeError("Embed field values must not exceed 1024 characters");
  	if(this.fields.length > 25) throw new RangeError("Fields can only be upto 25 fields");
  	this.fields.push({name, value, inline});
  	return this;
  }
  
  /**
  * Sets the Embed footer.
  * @param {String} text - The text for footer to set.
  * @param {String} iconURL - Icon URL for footer. optional
  * @returns {EmbedBuilder}
  */
  setFooter(text, iconURL) {
    this.footer.text = text;
    this.footer.icon_url = iconURL;
    return this;
  }
  
}

module.exports = EmbedBuilder;