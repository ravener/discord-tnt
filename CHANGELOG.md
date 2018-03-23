**v1.1.4**
- Fix setPresence and setStatus FOR ACTUALLY REAL NOW.
- Fix Logger class exporting.


**v1.1.3**
- Fix setPresence and setStatus for real now.
- Fix WebSocket issue, now the heartbeat is never null, we send a small heartbeat upon connecting to calculate date instantly.
- EmbedBuilder#setFooter(text, iconURL) is out, other fields to be added soon.
- DiscordTNT.logger class added, what it does is log stuff in a colored style, this will be used by the library soon, it's also exprted so feel free to use it in your code too.

**v1.1.2**
- Fix websocket reconnection, hopefully now it truely handles disconnects, mostly the error with invalid session.
- Fixed Client#self.setStatus (Hopefully)

**v1.1.1**
- Remove support for uWs it won't even connect properly for some reason.
- Hopefully fixed Client#self.setPresence and setStatus.
- Game and status is now optional from client options, can be set through Client#self.setPresence and Client#self.setStatus
- Improve examples to better fit the new versions.

**v1.1.0**
- Wonder if i can downgrade, since i did versioning really wrong way, like increment it a lot.

**v1.5.2**
- DiscordTNT#Collection is now usable for everyone.
- uWs is now an optional dependency, it could do better performance on websocket connections however its optional. `npm i uws --save`
- New event Client#mention, emitted when someone mentions/pings your bot, the arguments from it is a message object which is same as Client#messageCreate


**v1.5.1**
- Fix Client#ping typo.
- Fix Client#ws disappearing randomly.
- Client#sendMessage now returns a Promise.
- Some quick fixes in README.
- New example in [examples](https://github.com/freetnt5852/discord-tnt/blob/master/examples) directory.
- Changelog will now use Markdown syntax for better style.
- Fix avatar URL for Client#self for default avatars.

v1.5.0
Breaking changes!
Changes:
Added Custom collection which extends Map!
Add JSDoc comments! documentation is now out yay.
Improve webhookclient, added jsdoc and now using promises.
Resume handling.
Now its possible to check ping/websocket latency with Client#ping.
Handling websocket closing.
Two new events: Client#resume and Client#disconnect
Triggers when websocket resumes connection and disconnects.
Document and fix EmbedBuilder.
Get date of a snowflake ID by DiscordTNT#Snowflake!
RestMethods out, will be used with the library for simplier access to request methods, though its documented and you can use it as well if you know what your doing, Client#rest.
Self structure is out in beta, Client#self has some methods for managing the logged in bot such as changing presence or status etc, The game and status options from the client will be removed in the next updates.
Changes are untested and may not work.

v1.0.0
Fresh Release doesn't work as exected, versioning won't go up often till its stable.