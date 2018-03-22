/**
* A simple logging class, this is used to log errors
* warnings and debug messages, the class is also
* exported so you can also use it.
* @static
*/
class Logger {
  constructor() {
    throw new Error("Logger class should not be initialized.");
  }
  
  /**
  * Log a debug message.
  * @param {String} msg - The message to log
  */
  static debug(msg) {
    console.log("\x1b[47m\x1b[30mDEBUG\x1b[0m \x1b[34m%s\x1b[0m", msg);
  }
  
  /**
  * Logs an error
  * @param {String} err - An Error to log.
  */
  static error(err) {
    console.error("\x1b[41mERROR\x1b[0m \x1b[31m%s\x1b[0m", err);
  }
  
  /**
  * Logs a warning.
  * @param {String} warning - The warning to warn
  */
  static warn(warning) {
    console.warn("\x1b[43m\x1b[30mWARNING\x1b[0m \x1b[33m%s\x1b[0m", warning);
  }
}

module.exports = Logger;