/* class for making Rich Embed Messages */

class EmbedBuilder {
	constructor(embed = {}) {
		this.title = embed.title; // Embed title
		this.description = embed.description; // Description
		this.color = embed.color; // Embed color
		this.fields = embed.fields || []; // array of fields.
	}


  setTitle(title) {
  	title = String(title);
  	if(title.length > 256) {
  		throw new RangeError("Embed title must not exceed 256 characters!");
  	}
  	this.title = title
  	return this // return embed object every set so its possible to chain multiple .set like .setTitle().setDescription() etc
  }
  
  setDescription(description) {
  	description = String(description);
  	if(description.length > 2048) { 
  	 throw new RangeError("Embed Description must not exceed 2048 characters!");
  	 }
  	this.description = description;
  	return this
  }
  /* Color is untested might not work
     dunno if this kind of integers
     work in embeds but we'll see
   */
  setColor(color) {
  	color = parseInt(color);
  	this.color = color;
  	return this;
  }
  
  addField(name, value, inline = false) {
  	if(typeof inline !== 'boolean') throw new Error("Inline can be a boolean only");
  	if(name.length > 256) throw new RangeError("Embed field values must not exceed 256 characters");
  	if(value.length > 1024) throw new RangeError("Embed field values must not exceed 1024 characters");
  	this.fields.push({name, value, inline});
  }
  
}

module.exports = EmbedBuilder;
