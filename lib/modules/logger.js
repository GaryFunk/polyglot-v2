/*
Instantiate the logger for all modules
*/
const os = require('os')

var logLevel = 'info'
if (process.env.NODE_ENV === 'development') {
		logLevel = 'debug'
}

var winston = require('winston')
var tsFormat = () => (new Date()).toLocaleString()
var winston = new (winston.Logger)({
	transports: [
		// TODO: remove console before dist
		new (winston.transports.Console)({
			timestamp: tsFormat,
			level: logLevel,
			colorize: true,
			handleExceptions: true,
			humanReadableUnhandledException: true
		}),
		new (winston.transports.File)({
			filename: os.homedir() + '/.polyglot/log/debug.log',
			timestamp: tsFormat,
			level: logLevel,
			maxsize: 1000*1024,
			maxFiles: 10,
			handleExceptions: true,
			humanReadableUnhandledException: true,
			exitOnError: true,
			json: false
		})
	]
})
module.exports = winston
