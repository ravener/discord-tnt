/* Eval command example.
* WARNING: EVAL can run any javascript code ANYTHING on your computer
* which is dangerous, from stealing files to purging the hard drive
* for safety do not give access to anyone else except yourself
* we will add a simple check for that
*/

const DiscordTNT = require("discord-tnt");
const client = new Discord.Client({
 TOKEN:"YOUR BOT TOKEN",
 GAME: "with Eval",
 STATUS:"online"
 });
const prefix = "+";
 
client.on("ready", ready => {
  console.log(`Logged in as ${ready.user.username}`);
});
  
client.on("messageCreate", message => {
 const m = message.channel_id; // for shorter access
 if(message.content.startsWith(prefix + "eval")) {
  if(message.author.id !== "Your id") return;
  let code = message.content.split(" ").slice(1);
  try {
   let evaled = eval(code.join(" "));
   client.sendMessage(m, `\`\`\`js\n${evaled}\`\`\``);
  } catch(e) {
   client.sendMessage(m, `\`\`\`${e}\`\`\``);
  }
 }
});

client.connect();
