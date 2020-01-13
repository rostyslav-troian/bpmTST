/**
 * Object for recording and sending to the server of client logs
 */
Ext.define('Terrasoft.core.Logger', {
	extend: 'Terrasoft.BaseObject',
	alternateClassName: 'Terrasoft.Logger',
	singleton: true,

	/**
  * Message package
  * @private
  * @type {Object}
  */
	logPackage: null,

	/**
  * Time to collect the package for sending to the server
  * @private
  * @type {Number}
  */
	throttleTime: 3000,

	/**
  * The name of the logger, which will be used on the server side when logging
  * @private
  * @type {String}
  */
	serverLoggerName: '',

	/**
  * Indicates if debug messages are enabled
  * @private
  * @type {Boolean}
  */
	debugEnabled: false,

	/**
  * Indicates if error messages are enabled
  * @private
  * @type {Boolean}
  */
	errorEnabled: false,

	/**
  * Indicates if information messages are enabled
  * @private
  * @type {Boolean}
  */
	infoEnabled: false,

	/**
  * Throttled function to send the package to the server
  * @private
  * @type {Function}
  */
	throttledFlushLogPackage: null,

	/**
  * The name of the Ajax method to pass the data packet to the server
  * @private
  * @type {String}
  */
	postMethodName: "PostClientLog",

	/**
  * Creates the logger object
  */
	constructor: function() {
		this.callParent(arguments);
		var loggerSettings = Terrasoft.LoggerSettings;
		this.init(loggerSettings, this.throttleTime);
	},

	/**
  * The method of initializing the parameters of the logger
  * @private
  * @param {Object} loggerSettings Logging method settings
  * @param {Number} throttleTime Time of package assembly
  */
	init: function(loggerSettings, throttleTime) {
		if (loggerSettings) {
			this.serverLoggerName = loggerSettings.loggerName;
			this.debugEnabled = loggerSettings.debugLogEnabled;
			this.errorEnabled = loggerSettings.errorLogEnabled;
			this.infoEnabled = loggerSettings.infoLogEnabled;
		}
		this.logPackage = {
			logItems: []
		};
		this.throttledFlushLogPackage = Terrasoft.throttle(this.flushLogPackage, throttleTime);
	},

	/**
  * Method for sending message package to the server
  * @private
  */
	flushLogPackage: function() {
		var logPackage = this.logPackage;
		if (logPackage.logItems.length !== 0) {
			Terrasoft.ServiceProvider.executeRequest(this.postMethodName, logPackage);
			logPackage.logItems.length = 0;
		}
	},

	/**
  * Places the message in a package for subsequent transfer to the server
  * @private
  * @param {String} msg Message to pass
  * @param {Terrasoft.LogItemType} logItemType Message type
  */
	queueLogItem: function(msg, logItemType) {
		var logItem = {
			loggerName: this.serverLoggerName,
			message: msg,
			messageType: logItemType
		};
		this.logPackage.logItems.push(logItem);
		this.throttledFlushLogPackage();
	},

	/**
  * Write debug message
  * @param {String} msg Message to pass
  */
	debug: function(msg) {
		if (this.debugEnabled) {
			this.queueLogItem(msg, Terrasoft.LogItemType.DEBUG);
		}
	},

	/**
  * Write error message
  * @param {String} msg Message to pass
  */
	error: function(msg) {
		if (this.errorEnabled) {
			this.queueLogItem(msg, Terrasoft.LogItemType.ERROR);
		}
	},

	/**
  * Write information message
  * @param {String} msg Message to pass
  */
	info: function(msg) {
		if (this.infoEnabled) {
			this.queueLogItem(msg, Terrasoft.LogItemType.INFO);
		}
	}

});