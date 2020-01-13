Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.oktell");

//region Class: OktellCtiProvider

/**
 * The provider class to the Oktell message service.
 */
Ext.define("Terrasoft.integration.telephony.oktell.OktellCtiProvider", {
	extend: "Terrasoft.integration.telephony.BaseCtiProvider",
	alternateClassName: "Terrasoft.OktellCtiProvider",
	singleton: true,

	//region Properties: Private

	/**
	 * Our phone number.
	 * @type {String}
	 */
	deviceId: "",

	/**
	 * The active call object.
	 * @private
	 * @type {Terrasoft.integration.telephony.Call}
	 */
	activeCall: null,

	/**
	 * Object of consulting call.
	 * @private
	 * @type {Terrasoft.integration.telephony.Call}
	 */
	consultCall: null,

	/**
	 * A sign that the SIP end device supports the ability to answer a call.
	 * @private
	 * @type {Boolean}
	 */
	isSipAutoAnswerHeaderSupported: true,

	/**
	 * A flag that the user is a call center operator.
	 * @private
	 * @type {Boolean}
	 */
	isOperator: false,

	/**
	 * The default port for the server-based http Oktell service.
	 * @private
	 * @type {Number}
	 */
	oktellServerServiceDefaultPort: 4055,

	/*jshint bitwise:false */
	/**
	 * The set of default operations {@link Terrasoft.CallFeaturesSet} is in a call state.
	 * @private
	 * @type {Number}
	 */
	defaultTalkingStateCallFeatures: Terrasoft.CallFeaturesSet.CAN_HOLD | Terrasoft.CallFeaturesSet.CAN_DROP |
	Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL | Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER,
	/*jshint bitwise:true */

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#licInfoKeys
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	licInfoKeys: ["BPMonlineOktellConnector.Use"],

	//endregion

	//region Methods: Private

	/**
	 * Method of opening a connection.
	 * @private
	 * @param {Object} config connection parameters.
	 */
	connect: function(config) {
		this.isSipAutoAnswerHeaderSupported = (config.isSipAutoAnswerHeaderSupported !== false);
		this.isOperator = (config.isOperator !== false);
		this.subscribeOnOktellEvents();
		window.oktell.connect({
			url: config.url,
			login: config.login,
			password: config.password,
			debugMode: config.debugMode,
			webSocketSwfLocation: config.webSocketSwfLocation
		});
	},

	/**
	 * Method for subscribing to Oktell events.
	 * @private
	 */
	subscribeOnOktellEvents: function() {
		window.oktell.on("connect", this.onConnect, this);
		window.oktell.on("connectError", this.onConnectError, this);
		window.oktell.on("disconnect", this.onDisconnect, this);
		window.oktell.on("statusChange", this.onStatusChange, this);
		window.oktell.on("ringStart", this.onRingStart, this);
		window.oktell.on("ringStop", this.onRingStop, this);
		window.oktell.on("backRingStart", this.onBackRingStart, this);
		window.oktell.on("backRingStop", this.onBackRingStop, this);
		window.oktell.on("callStart", this.onCallStart, this);
		window.oktell.on("callStop", this.onCallStop, this);
		window.oktell.on("talkStart", this.onTalkStart, this);
		window.oktell.on("talkStop", this.onTalkStop, this);
		window.oktell.on("holdAbonentLeave", this.onHoldAbonentLeave, this);
		window.oktell.on("holdAbonentEnter", this.onHoldAbonentEnter, this);
		window.oktell.on("holdStateChange", this.onHoldStateChange, this);
		window.oktell.on("stateChange", this.onCallStateChange, this);
		window.oktell.on("abonentsChange", this.onAbonentsChange, this);
		window.oktell.onNativeEvent("flashstatechanged", this.onFlashStateChanged.bind(this));
		window.oktell.onNativeEvent("userstatechanged", this.onUserStateChanged.bind(this));
	},

	/**
	 * The method of unsubscribing from the Oktell events.
	 * @private
	 */
	unsubscribeFromOktellEvents: function() {
		window.oktell.off("connect");
		window.oktell.off("connectError");
		window.oktell.off("disconnect");
		window.oktell.off("statusChange");
		window.oktell.off("ringStart");
		window.oktell.off("ringStop");
		window.oktell.off("backRingStart");
		window.oktell.off("backRingStop");
		window.oktell.off("callStart");
		window.oktell.off("callStop");
		window.oktell.off("talkStart");
		window.oktell.off("talkStop");
		window.oktell.off("holdAbonentLeave");
		window.oktell.off("holdAbonentEnter");
		window.oktell.off("holdStateChange");
		window.oktell.off("stateChange");
		window.oktell.off("abonentsChange");
		window.oktell.offNativeEvent("flashstatechanged", this.onFlashStateChanged);
		window.oktell.offNativeEvent("userstatechanged", this.onUserStateChanged);
	},

	/**
	 * Create a call id for the caller information.
	 * @private
	 * @return {String} Call Id.
	 */
	getCallId: function(abonent) {
		var chainId = abonent.chainId;
		if (!abonent.phone) {
			return chainId;
		}
		var number = abonent.phone.replace(/[^\d]/g, "");
		if (!number) {
			return chainId + ":" + abonent.phone;
		}
		number = (parseInt(number, 10) !== 0) ? number.replace(/^0+/g, "") : "0";
		return chainId + ":" + number;
	},

	/**
	 * Select the call chainId from the call identifier.
	 * @private
	 * @param {String} callId Call id.
	 * @return {String} The identifier of the chain of commutation.
	 */
	extractChainId: function(callId) {
		if (Ext.isEmpty(callId)) {
			return null;
		}
		var callIdParts = callId.split(":");
		if (callIdParts.length < 2) {
			return null;
		}
		return callIdParts[0];
	},

	/**
	 * Gets the address of the server-side http Oktell service.
	 * @private
	 * @return {String} The address of the server-side http Oktell service.
	 */
	getOktellServerHttpUrl: function() {
		var connectionConfig = this.initialConfig.connectionConfig;
		var webSocketUrl = connectionConfig.url;
		if (Ext.isEmpty(webSocketUrl)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "connectionConfig.url"
			});
		}
		return webSocketUrl.replace(/^ws/, "http");
	},

	/**
	 * Gets a temporary password to execute requests from the server-side http Oktell service.
	 * @private
	 * @param {Function} callback Callback function.
	 * @param {String} callback.password Temporary password for querying the server-side http Oktell service.
	 */
	getOktellServerHttpTempPassword: function(callback) {
		window.oktell.exec("gettemphttppass", null, function(response) {
			if (response.result === true) {
				callback(response.password);
			} else {
				var errorInfo = {
					internalErrorCode: -1,
					data: Terrasoft.encode(response),
					source: "oktell.gettemphttppass",
					errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
				};
				this.fireEvent("error", errorInfo);
				callback();
			}
		}.bind(this));
	},

	/**
	 * Creates an active or consulting call.
	 * @private
	 * @param {Object} abonent The object oktell abonent
	 * @param {Terrasoft.CallDirection} direction Direction of the call.
	 * @param {boolean} isConsultCall Indicates a consulting call.
	 * @return {Terrasoft.integration.telephony.Call}
	 */
	createCall: function(abonent, direction, isConsultCall) {
		var call = Ext.create("Terrasoft.OktellCall");
		//TODO: ChainId ## ########. ######### ### ################# # ######### ######

		call.id = this.getCallId(abonent);
		call.chainId = abonent.chainId;
		call.direction = direction;
		call.deviceId = this.deviceId;
		if (direction === Terrasoft.CallDirection.IN) {
			call.callerId = abonent.phone;
			call.calledId = this.deviceId;
		} else {
			call.callerId = this.deviceId;
			call.calledId = abonent.phone;
		}
		call.ctiProvider = this;
		call.timeStamp = new Date();
		call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
		if (isConsultCall) {
			call.redirectingId = this.deviceId;
			call.redirectionId = direction === Terrasoft.CallDirection.OUT ? call.calledId : call.callerId;
			if (this.consultCall) {
				call.databaseUId = this.consultCall.databaseUId;
				this.fireEvent("callInfoChanged", call);
			}
			this.consultCall = call;
		} else {
			//TODO: ######## ###### ######### ###### ## ####### Oktell (getPhoneActions)

			call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP;
			this.activeCall = call;
		}
		if (direction === Terrasoft.CallDirection.IN && this.isSipAutoAnswerHeaderSupported) {
			/*jshint bitwise:false */
			call.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
			/*jshint bitwise:true */
		}
		call.state = Terrasoft.GeneralizedCallState.ALERTING;
		//TODO: ##########, ### ###### - ################ ## ######### ###### Oktell

		this.updateDbCall(call, this.onUpdateDbCall);
		return call;
	},

	/**
	 * Ends the active or consulting call.
	 * @private
	 * @param {String} callId Call id.
	 */
	finishCall: function(callId) {
		this.log("finishCall {0}", callId);
		var call;
		if (Ext.isEmpty(callId)) {
			call = this.activeCall;
			this.activeCall = null;
		} else {
			if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === callId) {
				call = this.activeCall;
				this.activeCall = null;
			} else if (this.getIsCurrentConsultCall(callId)) {
				call = this.consultCall;
				this.consultCall = null;
			}
		}
		if (Ext.isEmpty(call)) {
			return;
		}
		call.oldState = call.state;
		call.state = Terrasoft.GeneralizedCallState.NONE;
		call.timeStamp = new Date();
		this.fireEvent("callFinished", call);
		if (!Ext.isEmpty(this.activeCall)) {
			this.fireEvent("lineStateChanged", {callFeaturesSet: this.activeCall.callFeaturesSet});
		} else {
			if (!Ext.isEmpty(this.consultCall)) {
				// The initial call was completed, but we are in consultation mode
				this.activeCall = this.consultCall;
				this.consultCall = null;
			} else {
				this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
			}
		}
		this.updateDbCall(call, this.onUpdateDbCall);
	},

	/**
	 * Changes the status of the operator activity in the Call Center.
	 * @param {Boolean} isActive The flag of the activity of the operator in the Call Center.
	 * @private
	 */
	setCallCenterState: function(isActive) {
		window.oktell.exec("setuserstate", {
			"oncallcenter": isActive
		});
	},

	/**
	 * Returns a flag that the call is a current call.
	 * @private
	 * @param {String} callId Call id.
	 * @return {Boolean} A flag that the call is a current call.
	 */
	getIsCurrentConsultCall: function(callId) {
		if (!Ext.isEmpty(this.consultCall)) {
			var callChainId = this.extractChainId(callId);
			return (this.consultCall.chainId === callChainId);
		}
		return false;
	},

	/**
	 * Updates the consultation call after the conversation with the consultant.
	 * @private
	 * @param {String} number Consultant's telephone number.
	 */
	updateConsultCallOnTalkStarted: function(number) {
		if (this.consultCall.calledId !== number) {
			this.consultCall.calledId = number;
			this.consultCall.redirectionId = number;
			this.activeCall.redirectionId = number;
		}
		this.activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER;
	},

	/**
	 * Initializes the user status in the Call Center.
	 * @private
	 */
	initCallCenterState: function() {
		this.setCallCenterState(this.isOperator === true);
	},

	/**
	 * Returns the user's ability to make an outgoing call.
	 * @param {Terrasoft.OktellAgentState} userState User State Oktell.
	 * @return {Boolean}
	 */
	userCanDial: function(userState) {
		return [Terrasoft.OktellAgentState.READY, Terrasoft.OktellAgentState.BREAK].indexOf(userState) !== -1;
	},

	/**
	 * Handles the storage of information about the call to the database.
	 * @private
	 * @param {Object} request Instance of the request.
	 * @param {Boolean} success Indicates a successful server response.
	 * @param {Object} response Server response.
	 */
	onUpdateDbCall: function(request, success, response) {
		var callDatabaseUid = Terrasoft.decode(response.responseText);
		if (success && Terrasoft.isGUID(callDatabaseUid)) {
			var call = Terrasoft.decode(request.jsonData);
			if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === call.id) {
				call = this.activeCall;
			} else if (this.getIsCurrentConsultCall(call.id)) {
				call = this.consultCall;
			}
			call.databaseUId = callDatabaseUid;
			this.fireEvent("callSaved", call);
		} else {
			this.fireEvent("rawMessage", "Update Call error");
			var errorInfo = {
				internalErrorCode: null,
				data: response.responseText,
				source: "App server",
				errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
			};
			this.fireEvent("error", errorInfo);
		}
	},

	/**
	 * Handles the successful connection to the server event.
	 * @private
	 */
	onConnect: function() {
		this.deviceId = window.oktell.getMyInfo().number;
		this.initCallCenterState();
		this.setWrapUpUserState(false);
		this.fireEvent("rawMessage", "Connected");
		this.fireEvent("initialized");
	},

	/**
	 * Handles the connection error event with the server in the connect method.
	 * The error codes are the same as for the callback function of the connect method.
	 * Possible error codes
	 * internalErrorCode data
	 * 1200 cant connect to server
	 * 1205 error url
	 * 1204 using oktell desktop client
	 * 1202 error loginpass
	 * 1206 error loading version info
	 * 1207 error loading phone state
	 * 1209 error loading user state
	 * 1210 error loading user info
	 * 1211 login failure
	 * 1212 error connect using session
	 * 1213 no password or session
	 * 1214 max online users count reached, license limitation
	 * @private
	 * @param {Object} err Error code.
	 */
	onConnectError: function(err) {
		this.fireEvent("rawMessage", "onConnectError: " + Terrasoft.encode(err));
		var errorInfo = {
			internalErrorCode: err.errorCode,
			data: err.errorMessage,
			source: "Oktell server"
		};
		switch (err.errorCode) {
			case 1200:
				errorInfo.errorType = Terrasoft.MsgErrorType.CALL_CENTRE_NOT_AVAILABLE_ERROR;
				break;
			case 1202:
				errorInfo.errorType = Terrasoft.MsgErrorType.AUTHENTICATION_ERROR;
				break;
			default:
				errorInfo.errorType = Terrasoft.MsgErrorType.OPEN_CONNECTION_ERROR;
				break;
		}
		this.fireEvent("error", errorInfo);
	},

	/**
	 * Handles the connection closure event with the server.
	 * In the callback function, an object is given with a description of the cause of the connection failure.
	 * Possible causes
	 * code message
	 * 10 critical ws method not supported by this version of Oktell server
	 * 11 error loading version info
	 * 12 websocket connection closed
	 * 13 disconnected by user
	 * @private
	 * @param {Object} reason The cause for closing the connection.
	 */
	onDisconnect: function(reason) {
		this.fireEvent("rawMessage", "Disconnected");
		this.fireEvent("disconnected", reason);
		this.unsubscribeFromOktellEvents();
	},

	/**
	 * Handles the agent state change event.
	 * In the callback function, two string parameters are passed - the new and the past state.
	 * Possible statuses:
	 * ready  Ready for calls
	 * dnd   Do not disturb
	 * break  Break
	 * redirect Redirection
	 * @private
	 * @param {String} newStatus New status.
	 * @param {String} oldStatus Previous status.
	 */
	onStatusChange: function(newStatus, oldStatus) {
		this.fireEvent("rawMessage", "newStatus: " + newStatus + " oldStatus: " + oldStatus);
		this.fireEvent("agentStateChanged", {userState: newStatus});
	},

	/**
	 * Handles the events of the beginning of an incoming call.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onRingStart: function(abonents) {
		Terrasoft.Logger.info("onRingStart: start " + Terrasoft.encode(abonents) + " " + new Date());
		var abonent = abonents[0];
		if (!abonent.isExternal && !abonent.isUser) {
			return;
		}
		this.fireEvent("rawMessage", "onRingStart: " + Terrasoft.encode(abonents));
		var call = this.createCall(abonent, Terrasoft.CallDirection.IN, false);
		this.fireEvent("callStarted", call);
		this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
		Terrasoft.Logger.info("onRingStart: end " + Terrasoft.encode(abonents) + " " + new Date());
	},

	/**
	 * Handles the completion of an incoming call.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onRingStop: function(abonents) {
		Terrasoft.Logger.info("onRingStop: start " + Terrasoft.encode(abonents) + " " + new Date());
		this.fireEvent("rawMessage", "onRingStop: " + Terrasoft.encode(abonents));
		if (Ext.isEmpty(this.activeCall)) {
			return;
		}
		var state = window.oktell.getState();
		if (state === Terrasoft.OktellLineState.READY) {
			var callId = this.getCallId(abonents[0]);
			this.finishCall(callId);
		}
		Terrasoft.Logger.info("onRingStop: end " + Terrasoft.encode(abonents) + " " + new Date());
	},

	/**
	 * Handles the events of the callback.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects
	 */
	onBackRingStart: function(abonents) {
		this.fireEvent("rawMessage", "onBackRingStart: " + Terrasoft.encode(abonents));
	},

	/**
	 * Handles the callback completion event.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onBackRingStop: function(abonents) {
		this.fireEvent("rawMessage", "onBackRingStop: " + Terrasoft.encode(abonents));
	},

	/**
	 * Handles the outbound call start event.
	 * @private
	 * @param {Object} abonents An array of abonent objects (there is always 1 element for the current event).
	 */
	onCallStart: function(abonents) {
		Terrasoft.Logger.info("onCallStart: start " + Terrasoft.encode(abonents) + " " + new Date());
		this.fireEvent("rawMessage", "onCallStart: " + Terrasoft.encode(abonents));
		var abonent = abonents[0];
		var isConsultationCall = false;
		var activeCall = this.activeCall;
		if (!Ext.isEmpty(activeCall) && ((abonent.phone !== activeCall.callerId) &&
				(abonent.phone !== activeCall.calledId))) {
			isConsultationCall = true;
		}
		var call = this.createCall(abonent, Terrasoft.CallDirection.OUT, isConsultationCall);
		this.fireEvent("callStarted", call);
		this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
		Terrasoft.Logger.info("onCallStart: end " + Terrasoft.encode(abonents) + " " + new Date());
	},

	/**
	 * Handles the outgoing call end event.
	 * @private
	 * @param {Object} abonents An array of abonent objects (there is always 1 element for the current event).
	 */
	onCallStop: function(abonents) {
		this.fireEvent("rawMessage", "onCallStop: " + Terrasoft.encode(abonents));
		if (Ext.isEmpty(this.activeCall)) {
			return;
		}
		var state = window.oktell.getState();
		var callId;
		if (state === Terrasoft.OktellLineState.READY || state === Terrasoft.OktellLineState.RING) {
			callId = this.getCallId(abonents[0]);
			this.finishCall(callId);
		}
		var holdInfo = window.oktell.getHoldInfo();
		if (state === Terrasoft.OktellLineState.READY && holdInfo.hasHold) {
			// our call was disconnected, the Oktell setting of the phone is set to "Disconnect"
			window.oktell.hold();
		}
		if (state === Terrasoft.OktellLineState.TALK && !holdInfo.hasHold) {
			callId = this.getCallId(abonents[0]);
			if (this.getIsCurrentConsultCall(callId)) {
				// the consultation call was disconnected
				this.finishCall(callId);
			}
		}
	},
	/*jshint bitwise:false */
	/**
	 * Handles the start event.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onTalkStart: function(abonents) {
		Terrasoft.Logger.info("onTalkStart: start " + Terrasoft.encode(abonents) + " " + new Date());
		this.fireEvent("rawMessage", "onTalkStart: " + Terrasoft.encode(abonents));
		var abonent = abonents[0];
		var callId = this.getCallId(abonent);
		// the conversation starts without lifting the handset (for example, an auto-upgrade is set on the softphone)
		var activeCall = this.activeCall;
		if (Ext.isEmpty(activeCall)) {
			// emulate the incoming call
			// TODO: ########## ########### ######. ###### ## ####### abonents ### ####### ######

			this.onRingStart(abonents);
			activeCall = this.activeCall;
		} else if (Ext.isEmpty(this.consultCall) && (callId !== activeCall.id)) {
			// the advisory call on a softphone with autodetecting of a tube is made. Emulate the outgoing call
			this.onCallStart(abonents);
		}
		var activeCallExists = !Ext.isEmpty(activeCall);
		var call;
		if (activeCallExists && this.activeCall.id === callId) {
			call = activeCall;
		} else if (this.getIsCurrentConsultCall(callId)) {
			this.updateConsultCallOnTalkStarted(abonent.phone);
			call = this.consultCall;
		}
		if (Ext.isEmpty(call)) {
			return;
		}
		call.timeStamp = new Date();
		call.callFeaturesSet = this.defaultTalkingStateCallFeatures;
		call.oldState = call.state;
		call.state = Terrasoft.GeneralizedCallState.CONNECTED;
		if (call.oldState === Terrasoft.GeneralizedCallState.ALERTING) {
			this.fireEvent("commutationStarted", call);
		}
		if (activeCallExists) {
			this.fireEvent("lineStateChanged", {callFeaturesSet: this.activeCall.callFeaturesSet});
		}
		this.updateDbCall(call, this.onUpdateDbCall);
		Terrasoft.Logger.info("onTalkStart: end " + Terrasoft.encode(abonents) + " " + new Date());
	},

	/**
	 * Handles the end event of the conversation.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onTalkStop: function(abonents) {
		Terrasoft.Logger.info("onTalkStop: start " + Terrasoft.encode(abonents) + " " + new Date());
		this.fireEvent("rawMessage", "onTalkStop: " + Terrasoft.encode(abonents));
		var state = window.oktell.getState();
		var holdInfo = window.oktell.getHoldInfo();
		var abonent = abonents[0];
		var callId = (!Ext.isEmpty(abonent)) ? this.getCallId(abonent) : null;
		if (state === Terrasoft.OktellLineState.TALK) {
			if (!holdInfo.hasHold) {
				if (this.getIsCurrentConsultCall(callId)) {
					this.finishCall(callId);
				} else if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === callId) {
					// if we are the 3rd subscriber and ended the consultation call and there was a transfer to subscriber 1
					this.finishCall(callId);
				}
			}
		} else if (state === Terrasoft.OktellLineState.READY) {
			if (!holdInfo.hasHold) {
				this.finishCall(callId);
				if (!Ext.isEmpty(this.activeCall)) {
					this.finishCall();
				}
			}
		} else if (state === Terrasoft.OktellLineState.CALL && !holdInfo.hasHold) {
			this.finishCall(callId);
		} else if (!Ext.isEmpty(this.activeCall)) {
			if (!holdInfo.hasHold) {
				this.finishCall(callId);
			}
		}
		Terrasoft.Logger.info("onTalkStop: end " + Terrasoft.encode(abonents) + " " + new Date());
	},

	/**
	 * Handles the subscriber's exit event from the hold. In the callback function, an abonent object with information about the subscriber is transmitted.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onHoldAbonentLeave: function(abonents) {
		this.fireEvent("rawMessage", "onHoldAbonentLeave: " + Terrasoft.encode(abonents));
	},

	/**
	 * Handles the subscriber's entry event in hold. In the callback function, an abonent object with information about the subscriber is transmitted.
	 * @private
	 * @param {Object[]} abonents An array of abonent objects.
	 */
	onHoldAbonentEnter: function(abonents) {
		this.fireEvent("rawMessage", "onHoldAbonentEnter: " + Terrasoft.encode(abonents));
	},

	/**
	 * Handles the hold state change event. The callback function provides information on the hold
	 * (getHoldInfo).
	 * @private
	 * @param {Object} holdInfo The holdInfo object.
	 */
	onHoldStateChange: function(holdInfo) {
		this.fireEvent("rawMessage", "onHoldStateChange: " + Terrasoft.encode(holdInfo));
		//TODO: ######### ######### ####### - ### ################# ### #########?

		var call = this.activeCall;
		if (Ext.isEmpty(call)) {
			// the situation is possible if the subscriber has completed the call while being on hold
			var message = "Holded activeCall is empty";
			this.logError("onHoldStateChange: {0}", message);
			return;
		}
		call.timeStamp = new Date();
		if (holdInfo.hasHold) {
			if (call.state !== Terrasoft.GeneralizedCallState.HOLDED) {
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_UNHOLD;
				call.state = Terrasoft.GeneralizedCallState.HOLDED;
				this.fireEvent("hold", call);
			}
		} else {
			var lineState = window.oktell.getState();
			if (lineState === Terrasoft.OktellLineState.CALL) {
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP;
				call.state = Terrasoft.GeneralizedCallState.ALERTING;
			} else {
				call.callFeaturesSet = this.defaultTalkingStateCallFeatures;
				call.state = Terrasoft.GeneralizedCallState.CONNECTED;
			}
			this.fireEvent("unhold", call);
		}
		this.updateDbCall(call, this.onUpdateDbCall);
		this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
	},

	/**
	 * Handles a line status change event.
	 * @private
	 * @param {String} newState New status.
	 * @param {String} oldState Previous status.
	 */
	onCallStateChange: function(newState, oldState) {
		this.log("stateChange, newState = {0}, oldState= {1}", newState, oldState);
	},

	/**
	 * Handles a low-level event of a hold state change (flash).
	 * @private
	 * @param {Object} data Event parameters
	 */
	onFlashStateChanged: function(data) {
		this.fireEvent("rawMessage", "onFlashStateChanged: " + Terrasoft.encode(data));
		if (data.flashtypeid === Terrasoft.OktellFlashType.LOST) {
			// The subscriber, while on hold, ended the call
			var callToFinish;
			if (!Ext.isEmpty(this.activeCall) && this.activeCall.state === Terrasoft.GeneralizedCallState.HOLDED) {
				callToFinish = this.activeCall;
			} else if (!Ext.isEmpty(this.consultCall) &&
					this.consultCall.state === Terrasoft.GeneralizedCallState.HOLDED) {
				callToFinish = this.consultCall;
			}
			if (!Ext.isEmpty(callToFinish)) {
				this.fireEvent("unhold", callToFinish);
				this.updateDbCall(callToFinish, this.onUpdateDbCall);
				this.finishCall(callToFinish.id);
			}
		}
	},

	/**
	 * Handles a low-level event of a user status change.
	 * @private
	 * @param {Object} data Event parameters.
	 * @param {Boolean} data.oncallcenter The user is in the Call Center mode.
	 * @param {Terrasoft.OktellAgentState} data.userstate User status.
	 */
	onUserStateChanged: function(data) {
		this.fireEvent("rawMessage", "onUserStateChanged: " + Terrasoft.encode(data));
		var isCallCentreActive = data.oncallcenter;
		this.fireEvent("callCentreStateChanged", isCallCentreActive);
		if (this.userCanDial(data.userstate)) {
			this.onUserCanDial();
		}
	},

	/**
	 * Handles the user's ability to make outgoing calls.
	 * @private
	 */
	onUserCanDial: function() {
		var canDialFeature = Terrasoft.CallFeaturesSet.CAN_DIAL;
		if (this.activeCall) {
			this.activeCall.callFeaturesSet = canDialFeature;
		}
		if (this.consultCall) {
			this.consultCall.callFeaturesSet = canDialFeature;
		}
		if (!this.activeCall && !this.consultCall) {
			this.fireEvent("lineStateChanged", {callFeaturesSet: canDialFeature});
		}
	},

	/**
	 * Called when the current subscriber list is changed.
	 * @param {Object[]} abonents An array of subscribers.
	 */
	onAbonentsChange: function(abonents) {
		var abonentsCount = abonents.length;
		this.log("abonentsChange. Count = {0}", abonentsCount);
		var activeCall = this.activeCall;
		if (activeCall && (abonentsCount === 0)) {
			var holdInfo = window.oktell.getHoldInfo();
			var state = window.oktell.getState();
			if (!holdInfo.hasHold && (state === Terrasoft.OktellLineState.READY)) {
				var consultCall = this.consultCall;
				if (consultCall) {
					this.finishCall(consultCall.id);
				}
				this.finishCall(activeCall.id);
			}
		}
	},

	/**
	 * Load oktell module, if exist.
	 * @param {Function} callback Callback function.
	 */
	_loadOktellModuleIfExist: function(callback){
		require(["OktellModule"], function(module) {
			callback();
		},
		function(error) {
			callback();
		})
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var callback = function() {
			this.loginMsgService(this.msgUtilServiceUrl + this.loginMethodName, {
				"LicInfoKeys": this.licInfoKeys,
				"UserUId": Terrasoft.SysValue.CURRENT_USER.value
			}, this.connect.bind(this));
		}.bind(this);
		this._loadOktellModuleIfExist(callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#reConnect
	 */
	reConnect: function() {
		this.unsubscribeFromOktellEvents();
		this.connect(this.initialConfig.connectionConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection
	 */
	closeConnection: function() {
		window.oktell.disconnect();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeCall
	 */
	makeCall: function(targetAddress) {
		var self = this;
		window.oktell.call(targetAddress, "user", function(data) {
			if (data.result) {
				return;
			}
			/*
			data.errorCode	data.errorMessage
			2001	user state - disconnected
			2002	phone not connected
			2101	user has holded call and is talking now
			2102	user in conference now
			2103	phone state not valid for call
			2104	user state - busy
			2105	calling number is talking with us
			2106	bad number
			2107	error autocall method call
			2108	error user or phone state for call
			 */
			var errorInfo = {
				internalErrorCode: data.errorCode,
				data: data.errorMessage,
				source: "oktell.call",
				errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
			};
			self.fireEvent("error", errorInfo);
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#answerCall
	 */
	answerCall: function() {
		var self = this;
		window.oktell.answer(function(data) {
			if (data.result) {
				return;
			}
			/*
			data.errorCode	errorMessage
			2901	incorrect state
			2902	phone probably does not support intercom calls
			*/
			if (data.errorCode === 2902) {
				self.isSipAutoAnswerHeaderSupported = false;
			}
			var errorInfo = {
				internalErrorCode: data.errorCode,
				data: data.errorMessage,
				source: "oktell.answer",
				errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
			};
			self.fireEvent("error", errorInfo);
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#holdCall
	 */
	holdCall: function() {
		window.oktell.hold();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#dropCall
	 */
	dropCall: function(call) {
		var number = (call.direction === Terrasoft.CallDirection.OUT) ? call.calledId : call.callerId;
		window.oktell.endCall(number);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeConsultCall
	 */
	makeConsultCall: function(call, targetAddress) {
		window.oktell.call(targetAddress);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#transferCall
	 */
	transferCall: function() {
		window.oktell.endCall();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#cancelTransfer
	 */
	cancelTransfer: function(currentCall, consultCall) {
		this.dropCall(consultCall);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#blindTransferCall
	 */
	blindTransferCall: function(call, targetAddress) {
		var self = this;
		window.oktell.transfer(targetAddress, function(data) {
			if (data.result) {
				return;
			}
			/*
			data.errorCode	data.errorMessage
			2301	error transfer method call
			2302	bad user or phone state for transfer
			2303	nothing to transfer
			2304	bad number for transfer
			*/
			var errorInfo = {
				internalErrorCode: data.errorCode,
				data: data.errorMessage,
				source: "oktell.blindTransferCall",
				errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
			};
			self.fireEvent("error", errorInfo);
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setUserState
	 */
	setUserState: function(code, reason, callback) {
		window.oktell.setStatus(code, false, reason);
		if (Ext.isFunction(callback)) {
			callback.call(this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setWrapUpUserState
	 */
	setWrapUpUserState: function(isWrapUpActive, callback) {
		var userState = (isWrapUpActive)
				? Terrasoft.OktellAgentState.BUSY
				: Terrasoft.OktellAgentState.READY;
		if (Ext.isFunction(callback)) {
			var nativeEventCallback = function() {
				window.oktell.offNativeEvent("userstatechanged", nativeEventCallback);
				callback.call(this);
			}.bind(this);
			window.oktell.onNativeEvent("userstatechanged", nativeEventCallback);
		}
		window.oktell.exec("setuserstate", {userstateid: userState});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryUserState
	 */
	queryUserState: function() {
		var agentState = window.oktell.getStatus();
		this.fireEvent("agentStateChanged", {userState: agentState});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#sendDtmf
	 */
	sendDtmf: function(call, digit) {
		window.oktell.dtmf(digit);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryActiveCallSnapshot
	 */
	queryActiveCallSnapshot: function() {
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryLineState
	 */
	queryLineState: function() {
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#changeCallCentreState
	 */
	changeCallCentreState: function(isActive) {
		var oktellCommand = (isActive) ? "entercallcenter" : "exitcallcenter";
		window.oktell.exec(oktellCommand);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#getCapabilities
	 */
	getCapabilities: function() {
		/*jshint bitwise:false */
		var callCapabilities = Terrasoft.CallFeaturesSet.CAN_RECALL | Terrasoft.CallFeaturesSet.CAN_DIAL |
				Terrasoft.CallFeaturesSet.CAN_DROP |
				Terrasoft.CallFeaturesSet.CAN_HOLD | Terrasoft.CallFeaturesSet.CAN_UNHOLD |
				Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER |
				Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
				Terrasoft.CallFeaturesSet.CAN_DTMF;
		if (this.isSipAutoAnswerHeaderSupported) {
			callCapabilities |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
		}
		var agentCapabilities = Terrasoft.AgentFeaturesSet.CAN_WRAP_UP |
				Terrasoft.AgentFeaturesSet.HAS_CALL_CENTRE_MODE | Terrasoft.AgentFeaturesSet.CAN_GET_CALL_RECORDS;
		/*jshint bitwise:true */
		return {
			callCapabilities: callCapabilities,
			agentCapabilities: agentCapabilities
		};
	},

	/**
	 * @return {String} Gets the Oktell log as a string with a complete JSON for the message webserver.
	 */
	getLog: function() {
		return window.oktell.getLog();
	},

	/**
	 * Requests the addresses of the call reference records of the call.
	 * @param {String} callId Call id.
	 * @param {Function} callback A function that will be called when a response is received from the Oktell server. At the entrance
	 * gets an array of links to the conversation records.
	 * @param {Object} scope The context in which the callback function will be called.
	 */
	getRecordLinks: function(callId, callback, scope) {
		Terrasoft.Logger.info("getRecordLinks: start callId = " + callId + " " + new Date());
		var chainId = this.extractChainId(callId);
		Terrasoft.Logger.info("getRecordLinks: chainId = " + chainId + " " + new Date());
		if (Ext.isEmpty(chainId)) {
			return;
		}
		var self = this;
		window.oktell.exec("getpbxcalljournal", {
			"filter": {
				"idchain": chainId,
				"showcallcenter": true
			}
		}, function(getPbxCallJournalResult) {
			if (!getPbxCallJournalResult.result) {
				callback.call(scope || self, []);
				return;
			}
			var url = self.getOktellServerHttpUrl();
			Terrasoft.Logger.info("getRecordLinks: url = " + url + " " + new Date());
			var recordLinks = [];
			this.getOktellServerHttpTempPassword(function(tempPass) {
				Terrasoft.each(getPbxCallJournalResult.data, function(callInfo) {
					var recordLink = callInfo.recordlink;
					Terrasoft.Logger.info("getRecordLinks: recordLink = " + recordLink + " " + new Date());
					if (Ext.isEmpty(recordLink)) {
						return;
					}
					var recordUrl = Ext.String.format("{0}{1}?temppass={2}", url, recordLink, tempPass);
					Terrasoft.Logger.info("getRecordLinks: recordUrl = " + recordUrl + " " + new Date());
					recordLinks.push(recordUrl);
				}, self);
				callback.call(scope || self, recordLinks);
			}.bind(this));
		}.bind(this));
		Terrasoft.Logger.info("getRecordLinks: end callId = " + callId + " " + new Date());
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryCallRecords
	 */
	queryCallRecords: function(callId, callback) {
		this.getRecordLinks(callId, callback, this);
	}

	/*jshint bitwise:true */
	//endregion

});

//endregion
