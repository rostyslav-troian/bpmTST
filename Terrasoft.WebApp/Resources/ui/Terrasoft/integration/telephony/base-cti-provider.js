Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");

// region Class: BaseCtiProvider

/**
 * @abstract
 * Base class of the telephony provider.
 */
Ext.define("Terrasoft.integration.telephony.BaseCtiProvider", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseCtiProvider",

	// region Properties: Private

	/**
  * The telephony service address on the application server.
  * @private
  * @type {String}
  */
	msgUtilServiceUrl: Terrasoft.workspaceBaseUrl + "/ServiceModel/MsgUtilService.svc/",

	/**
  * The name of the method of entering the user's telephony session.
  * @private
  * @type {String}
  */
	loginMethodName: "LogInMsgServer",

	/**
  * The name of the method for storing information about the call.
  * @private
  * @type {String}
  */
	updateCallMethodName: "UpdateCall",

	// endregion

	// region Properties: Protected

	/**
  * The array of licenses required for integration.
  * @protected
  * @type {String[]}
  */
	licInfoKeys: [],

	// endregion

	// region Properties: Public

	/**
  * The settings object for the connection.
  * @type {Object}
  */
	initialConfig: null,

	//endregion

	//region Constructors: Public

	/**
  * Creates a provider object.
  */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(

			/**
    * @event rawMessage
    * Generalized event in the provider. It works at any event of the provider.
    * @param {Object} config Event parameters.
    */
			"rawMessage",

			/**
    * @event callStarted
    * Triggers when a new call starts.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"callStarted",

			/**
    * @event callFinished
    * Triggers after the call ends.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"callFinished",

			/**
    * @event callBusy
    * The Busy state (only TAPI) is triggered when the call is transferred.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"callBusy",

			/**
    * @event currentCallChanged
    * Activates when the main call changes (for example, the main call ends when consulting).
    * @param {Terrasoft.integration.telephony.Call} currentCall The new primary call.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"currentCallChanged",

			/**
    * @event callInfoChanged
    * Activates when the call data is changed by ID in the database.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"callInfoChanged",

			/**
    * @event commutationStarted
    * Activates after the call connection is established.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"commutationStarted",

			/**
    * @event hold
    * Triggers after placing the call on hold.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"hold",

			/**
    * @event unhold
    * Triggers after the call is dropped from the hold.
    * @param {Terrasoft.integration.telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"unhold",

			/**
    * @event callSaved
    * Triggers after creating / updating a call in the database.
    * @param {Terrasoft.Telephony.Call} call
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"callSaved",

			/**
    * @event activeCallSnapshot
    * Activates after updating the active calls list.
    * @param {Object} config Object containing the list of active calls.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"activeCallSnapshot",

			/**
    * @event lineStateChanged
    * Triggers after changing a set of available line or ring operations.
    * @param {Object} config Parameters of the event.
    * @param {Number} config.callFeaturesSet The available operations for the line.
    * @param {String} config.callId (optional) The call identifier for which the available
    * operations.
    * @param {Object} privateData (optional) Additional event parameters.
    *
    */
			"lineStateChanged",

			/**
    * @event agentStateChanged
    * Triggers after the agent status changes.
    * @param {Object} agentStateData An object that stores the status code and the agent state reason code.
    * @param {String} agentStateData.userState Agent State.
    * @param {String} agentStateData.userStateReasonCode (optional) Agent reason code for the agent.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"agentStateChanged",

			/**
    * @event error
    * Triggers when an error occurs.
    * @param {Object} config Parameters of the event.
    * @param {Terrasoft.MsgErrorType} config.errorType The type of the error.
    * @param {String} config.internalErrorCode The error code.
    * @param {String} config.data The error text.
    * @param {String} config.source The source of the error.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"error",

			/**
    * @event commandExecuted
    * Triggers when the sent command is processed.
    * @param {Object} config The result of the command.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"commandExecuted",

			/**
    * @event initialized
    * Fires when the provider is initialized.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"initialized",

			/**
   * @event callCentreStateChanged
   * Activates when the agent enters or exits the Call Center mode.
   * @param {Boolean} isActive Indicates that the agent is in the Call Center mode.
   * @param {Object} privateData (optional) Additional event parameters.
   */
			"callCentreStateChanged",

			/**
    * @event dtmfEntered
    * Works if Dtmf signals were sent to the line.
    * @param {String} digits Signals that have been sent to the line.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"dtmfEntered",

			/**
    * @event disconnected
    * Triggers when the provider is disconnected.
    * @param {String} failureCode The error code that caused the shutdown.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"disconnected",

			/**
    * @event webRtcStarted
    * Triggers when the webRtc session starts.
    * @param {String} sessionId The identifier of the webRtc session.
    * @param {Object} config Parameters of the event.
    * @param {String} config.webElementId The identifier of the dom element, to which audio and video
    * streams will be sent. The value must be set in the event handler.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"webRtcStarted",

			/**
    * @event webRtcVideoStarted
    *  Activates the webRtc session when the video stream starts.
    * @param {String} sessionId The identifier of the webRtc session.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"webRtcVideoStarted",

			/**
    * @event webRtcDestroyed
    * Triggers when the webRtc session ends.
    * @param {String} sessionId The identifier of the webRtc session.
    * @param {Object} privateData (optional) Additional event parameters.
    */
			"webRtcDestroyed"
		);
	},

	//endregion

	// region Methods: Private

	/**
  * Logs the message.
  * @private
  * @param {String} options.message Message..
  * @param {Terrasoft.LoggerType} options.loggerType (optional) The type of the message logger.
  * @param {Terrasoft.LogItemType} options.logItemType (optional) The type of the message for the logger.
  * @param {String} options.logName (optional) The name of the logger.
  */
	writeLog: function(options) {
		if (Ext.isEmpty(options)) {
			throw new Terrasoft.ArgumentNullOrEmptyException();
		}
		var message = options.message;
		if (Ext.isEmpty(message)) {
			return;
		}
		if (!Ext.isString(message)) {
			if (Ext.isFunction(message.toString)) {
				message = message.toString();
			} else {
				return;
			}
		}
		var loggerType = options.loggerType || Terrasoft.LoggerType.CLIENT;
		if (loggerType === Terrasoft.LoggerType.NONE) {
			return;
		}
		var clientLogger = Ext.global.console || {};
		var serverLogger = Terrasoft.Logger;
		var clientLogFn;
		var serverLogFn;
		switch (options.logItemType) {
			case Terrasoft.LogItemType.ERROR:
				clientLogFn = clientLogger.error;
				serverLogFn = serverLogger.error;
				break;
			case Terrasoft.LogItemType.INFO:
				clientLogFn = clientLogger.info;
				serverLogFn = serverLogger.info;
				break;
			default:
				clientLogFn = clientLogger.log;
				serverLogFn = serverLogger.debug;
				break;
		}
		var formatArgs = Array.prototype.slice.call(arguments, 1);
		var formattedMsg = Ext.String.format.apply(Ext.String, [message].concat(formatArgs));
		if (loggerType === Terrasoft.LoggerType.CLIENT || loggerType === Terrasoft.LoggerType.BOTH) {
			var dateFormat = "Y-m-d H:i:s,ms";
			var currentMoment = Ext.Date.format(new Date(), dateFormat);
			var clientLogMsg = Ext.String.format("{0} [{1}] {2}", currentMoment, options.logName, formattedMsg);
			//IE <= 9: console.log instanceof Function === false
			if (Ext.isDefined(clientLogger) && clientLogFn) {
				Function.prototype.call.call(clientLogFn, clientLogger, clientLogMsg);
			}
		}
		if (loggerType === Terrasoft.LoggerType.SERVER || loggerType === Terrasoft.LoggerType.BOTH) {
			serverLogFn.call(serverLogger, formattedMsg);
		}
	},

	/**
  * Sends a telephony message to the log.
  * @private
  * @param {String} message
  * @param {Terrasoft.LogItemType} logItemType Type of the message for the logger.
  */
	writeTelephonyLog: function(message, logItemType) {
		var loggerType = Terrasoft.LoggerType.CLIENT;
		if (!Ext.isEmpty(this.initialConfig) && !Ext.isEmpty(this.initialConfig.connectionConfig)) {
			loggerType = this.initialConfig.connectionConfig.loggerType;
		}
		var options = {
			loggerType: loggerType,
			logItemType: logItemType,
			logName: "Telephony",
			message: message
		};
		var args = [options].concat(Array.prototype.slice.call(arguments, 2));
		this.writeLog.apply(this, args);
	},

	/**
  * The method of entering the user's telephony session.
  * @private
  * @param {String} url address of the LogInMsgServer method on the application server.
  * @param {Object} jsonData parameters for logging into the session.
  * @param {Function} callback Callback function. Called in case of a successful login.
  */
	loginMsgService: function(url, jsonData, callback) {
		Terrasoft.AjaxProvider.request({
			url: url,
			scope: this,
			jsonData: jsonData,
			callback: function(request, success, response) {
				this.onLoginMsgService(request, success, response, callback);
			}
		});

	},

	/**
  * Called when entering the user's telephony session.
  * @private
  * @param {Object} request Instance of the request.
  * @param {Boolean} success Indicates a successful server response.
  * @param {Object} response Server response.
  * @param {Function} callback Callback function. Called in case of a successful login.
  * Otherwise, an error is generated.
  */
	onLoginMsgService: function(request, success, response, callback) {
		if (success && Terrasoft.isGUID(response.responseText.replace(/\"/g, ""))) {
			if (callback) {
				callback(this.initialConfig.connectionConfig);
			}
		} else {
			this.fireEvent("rawMessage", "LogInMsgService error");
			var errorInfo = {
				internalErrorCode: null,
				data: response.responseText,
				source: "App server",
				errorType: Terrasoft.MsgErrorType.AUTHENTICATION_ERROR
			};
			this.fireEvent("error", errorInfo);
		}
	},

	// endregion

	// region Methods: Protected

	/**
  * Saves information about the call in the database.
  * @protected
  * @param {Terrasoft.integration.telephony.Call} call
  * @param {Function} callback function.
  */
	updateDbCall: function(call, callback) {
		if (Ext.isEmpty(call)) {
			return;
		}
		var isCallChanged = call.updateOldData();
		if (!isCallChanged) {
			return;
		}
		var serializedCall = call.serialize();
		Terrasoft.AjaxProvider.request({
			url: this.msgUtilServiceUrl + this.updateCallMethodName,
			scope: this,
			callback: callback,
			jsonData: serializedCall
		});
	},

	// endregion

	// region Methods: Public

	/**
  * Initializes the connection.
  * @param {Object} config Connection parameters.
  */
	init: function(config) {
		this.initialConfig = config;
	},

	/**
  * Re-connects.
  */
	reConnect: function() {
		this.init(this.initialConfig);
	},

	/**
 * Sends an information message to the log.
 * @param {String} message
 */
	logInfo: function(message) {
		var formatArgs = Array.prototype.slice.call(arguments, 1);
		this.writeTelephonyLog.apply(this, [message, Terrasoft.LogItemType.INFO].concat(formatArgs));
	},

	/**
 * Sends an error message to the log.
 * @param {String} message
 */
	logError: function(message) {
		var formatArgs = Array.prototype.slice.call(arguments, 1);
		this.writeTelephonyLog.apply(this, [message, Terrasoft.LogItemType.ERROR].concat(formatArgs));
	},

	/**
 * Sends a debugging message to the log.
 * @param {String} message
 */
	log: function(message) {
		var formatArgs = Array.prototype.slice.call(arguments, 1);
		this.writeTelephonyLog.apply(this, [message, Terrasoft.LogItemType.DEBUG].concat(formatArgs));
	},

	/**
  * Closes the connection.
  * @method
  * @abstract
  */
	closeConnection: Terrasoft.abstractFn,

	/**
  * Make an outgoing call.
  * @method
  * @abstract
  * @param {String} targetAddress Number to dial.
  */
	makeCall: Terrasoft.abstractFn,

	/**
  * Picks up the receiver.
  * @method
  * @abstract
  */
	hookup: Terrasoft.abstractFn,

	/**
  * Responds to a call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  */
	answerCall: Terrasoft.abstractFn,

	/**
  * Puts the call on hold or removes it from hold.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  */
	holdCall: Terrasoft.abstractFn,

	/**
  * End the call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  */
	dropCall: Terrasoft.abstractFn,

	/**
  * Prepare the call for translation (Tapi).
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  */
	setupTransferCall: Terrasoft.abstractFn,

	/**
  * He makes a consultation call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  * @param {String} targetAddress Number to dial.
  */
	makeConsultCall: Terrasoft.abstractFn,

	/**
  * Transfers the call (conditionally).
  * @abstract
  * @param {Terrasoft.Telephony.Call} call The primary call.
  * @param {Terrasoft.Telephony.Call} consultationCall Consultation call.
  */
	transferCall: Terrasoft.abstractFn,

	/**
  * Cancels the conditional transfer of a call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} currentCall The current call.
  * @param {Terrasoft.Telephony.Call} consultCall Consultation call.
  */
	cancelTransfer: Terrasoft.abstractFn,

	/**
  * Transfers the call (unconditionally).
  * @abstract
  * @param {Terrasoft.Telephony.Call} call The call to transfer.
  * @param {String} targetAddress The number to transfer to.
  */
	blindTransferCall: Terrasoft.abstractFn,

	/**
  * Sets the state Do not disturb (Tapi).
  * @method
  * @abstract
  */
	setDnd: Terrasoft.abstractFn,

	/**
  * Prompts the line state.
  * @method
  * @abstract
  */
	queryLineState: Terrasoft.abstractFn,

	/**
  * Requests a collection of active calls.
  * @method
  * @abstract
  */
	queryActiveCallSnapshot: Terrasoft.abstractFn,

	/**
  * Sets the state to the operator.
  * @abstract
  * @param {String} code Status code.
  * @param {String} reason (optional) The reason for the change in state.
  * @param {Object} callback (optional) Callback function.
  */
	setUserState: Terrasoft.abstractFn,

	/**
  * Sets the post-processing state.
  * @abstract
  * @param {Boolean} isWrapUpActive Indicates the post-processing activity.
  * @param {Object} callback (optional) Callback function.
  */
	setWrapUpUserState: Terrasoft.abstractFn,

	/**
  * Sets the state of using the video during a call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call.
  * @param {Boolean} isVideoActive Indicates using the video during the call.
  * @param {Function} callback The callback function.
  * @param {Boolean} callback.isVideoActive A sign of using the video during the call.
  * The value is determined as a result of the method performed by the telephony provider.
  */
	setVideoState: Terrasoft.abstractFn,

	/**
  * Requests the state of the agent.
  * @method
  * @abstract
  */
	queryUserState: Terrasoft.abstractFn,

	/**
  * Sends the signal Dtmf.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  * @param {String} digits Signal symbols.
  */
	sendDtmf: Terrasoft.abstractFn,

	/**
  * Mutes call.
  * @abstract
  * @param {Terrasoft.Telephony.Call} call
  */
	mute: Terrasoft.abstractFn,

	/**
  * Requests records of call conversations.
  * @abstract
  * @param {String} callId Caller ID.
  * @param {Function} callback Callback function.
  * @param {String[]} callback.callRecords An array of references to call records.
  */
	queryCallRecords: Terrasoft.abstractFn,

	/**
  * Changes the status of the user in the Call Center.
  * @abstract
  * @param {Boolean} isActive The user's status in the Call Center.
  */
	changeCallCentreState: Terrasoft.abstractFn,

	/**
  * Gets the list of available provider operations.
  * @abstract
  * @return {Object} List of available provider operations.
  * @return {Number} return.callCapabilities Available operations with calls (a set of bitwise enumeration flags
  * {@link Terrasoft.CallFeaturesSet}).
  * @return {Number} return.agentCapabilities Available operations with the agent (a set of bitwise enumeration flags
  * {@link Terrasoft.AgentFeaturesSet}).
  */
	getCapabilities: Terrasoft.abstractFn

	// endregion

});

// endregion