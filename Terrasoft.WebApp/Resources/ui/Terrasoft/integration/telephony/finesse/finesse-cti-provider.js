Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.finesse");

//region Class: FinesseCtiProvider

/**
 * The provider class to the Finesse service.
 */
Ext.define("Terrasoft.integration.telephony.finesse.FinesseCtiProvider", {
	extend: "Terrasoft.BaseCtiProvider",
	alternateClassName: "Terrasoft.FinesseCtiProvider",
	singleton: true,

	//region Properties: Private

	/**
	 * Our phone number.
	 * @private
	 * @type {String}
	 */
	deviceId: "",

	/**
	 * The array of licenses required for integration.
	 * @private
	 * @type {String[]}
	 */
	licInfoKeys: ["BPMonlineFinesseConnector.Use"],

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

	/**
	 * Cisco Finesse server domain.
	 * @private
	 * @type {String}
	 */
	domain: "",

	/**
	 * ID of the user agent.
	 * @private
	 * @type {String}
	 */
	agentId: "",

	/**
	 * user password.
	 * @private
	 * @type {String}
	 */
	password: "",

	/**
	 * The reason for the "Not ready" status by default.
	 * @private
	 * @type {String}
	 */
	defaultNotReadyReasonCode: "",

	/**
	 * The object of integration with Cisco Finesse via BOSH connection.
	 * @private
	 * @type {Object}
	 */
	boshClient: null,

	/**
	 * A flag that the Finesse user is detected by the jabber connection of Bosh.
	 * @type {Boolean}
	 */
	isBoshPresenceInit: false,

	/**
	 * Virtual directory for url redirect to Finesse server.
	 * @private
	 * @type {String}
	 */
	finessePath: "/finesse",

	/**
	 * The path to Finesse web services.
	 * @private
	 * @type {String}
	 */
	finesseApiPath: "/finesse/api",

	/**
	 * The value of the Content-Type header for non-GET queries to Finesse.
	 * @private
	 * @type {String}
	 */
	notGetFinesseRequestsContentType: "application/xml",

	/**
	 * The value of the Accept header for non-GET requests to Finesse.
	 * @private
	 * @type {String}
	 */
	notGetFinesseRequestsAccept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",

	/**
	 * Message when there is no jabberwerx library.
	 * @private
	 * @type {String}
	 */
	jabberLibNotFoundErrorMessage: "jabberwerx library not found.",

	/**
	 * Message template for Finesse error.
	 * @private
	 * @type {String}
	 */
	finesseErrorMessageTemplate: "Finesse error. Detail info: {0}",

	/**
	 * The error code of the wrong BOSH authorization.
	 * @private
	 * @type {String}
	 */
	jabberNotAuthorizedErrorCode: "not-authorized",

	/**
	 * The name of the jabber client.
	 * @private
	 * @type {String}
	 */
	jabberClientName: "cisco",

	/**
	 * Actibve calls.
	 * @private
	 * @type {Terrasoft.Collection}
	 */
	activeCalls: null,

	/**
	 * Id of the active call.
	 * @private
	 * @type {String}
	 */
	activeCallId: "",

	/**
	 * User status.
	 * @private
	 * @type {String}
	 */
	userState: "",

	/**
	 * The code of the reason of user status.
	 * @private
	 * @type {String}
	 */
	userStateReasonCode: "",

	/**
	 * The last reason code for the user status is "Not ready".
	 * @private
	 * @type {String}
	 */
	lastNotReadyStateReasonCode: "",

	/**
	 * The phone number of the user who initiated the transfer of the call to the current agent.
	 * @private
	 * @type {String}
	 */
	transferInitiator: "",

	/**
	 * The types of calls for which information about the number is determined using the mediaProperties property.
	 * @private
	 * @type {Terrasoft.FinesseCallType[]}
	 */
	callTypesWithMediaProperties: [Terrasoft.FinesseCallType.AGENT_INSIDE, Terrasoft.FinesseCallType.CONSULT],

	//endregion

	//region Methods: Private

	/*jshint camelcase: false */
	/**
	 * Converts an xml string to a json object.
	 * @param {String} xmlData Xml string for conversion.
	 * @return {Object} Converted json object.
	 */
	xmlToJson: function(xmlData) {
		var x2Js = new Ext.global.X2JS();
		return x2Js.xml_str2json(xmlData);
	},
	/*jshint camelcase: true */

	/*jshint camelcase: false */
	/**
	 * Converts the json object to an xml string.
	 * @param {Object} jsonObject Json-object for conversion.
	 * @return {String} String xml.
	 */
	jsonToXml: function(jsonObject) {
		var x2Js = new Ext.global.X2JS();
		return x2Js.json2xml_str(jsonObject);
	},
	/*jshint camelcase: true */

	/**
	 * Send ajax request to Finesse server.
	 * @private
	 * @param {String} url Path to the Finesse method.
	 * @param {String} method The http request method.
	 * @param {Function} onSuccess (optional) Callback function on successful execution of the request.
	 * @param {Function} onError (optional) Callback function if the request fails.
	 * @param {Object} scope (optional) The context for executing the callback functions.
	 * @param {Object} apiMethodConfig (optional) Json is the Api Finesse method object.
	 */
	sendFinesseRequest: function(url, method, onSuccess, onError, scope, apiMethodConfig) {
		var finesseUrl = this.finesseApiPath + url;
		var credentials = Ext.global.jabberwerx.util.crypto.b64Encode(this.agentId + ":" + this.password);
		var requestOptions = {
			url: finesseUrl,
			method: method,
			headers: {
				Authorization: "Basic " + credentials
			},
			success: onSuccess,
			failure: onError,
			scope: scope
		};
		if (method !== "GET") {
			requestOptions.headers["Content-Type"] = this.notGetFinesseRequestsContentType;
			requestOptions.headers.Accept = this.notGetFinesseRequestsAccept;
		}
		if (apiMethodConfig) {
			requestOptions.xmlData =  this.jsonToXml(apiMethodConfig);
		}
		Ext.Ajax.request(requestOptions);
	},

	/**
	 * Method of opening a connection.
	 * @private
	 * @param {Object} config Connection parameters.
	 */
	connect: function(config) {
		this.agentId = config.AgentID;
		this.password = config.Password;
		this.domain = config.Domain;
		this.deviceId = config.Extension;
		this.createBoshConnection();
	},

	/**
	 * Creates a connection to receive events via a BOSH connection.
	 * @private
	 */
	createBoshConnection: function() {
		var jabberwerx = Ext.global.jabberwerx;
		if (Ext.isEmpty(jabberwerx)) {
			this.logError(this.jabberLibNotFoundErrorMessage);
			Terrasoft.Logger.error(this.jabberLibNotFoundErrorMessage);
			return;
		}
		var boshClient = this.boshClient;
		if (!boshClient) {
			boshClient = new jabberwerx.Client(this.jabberClientName);
			this.boshClient = boshClient;
			boshClient.Scope = this;
			jabberwerx._config.unsecureAllowed = true;
			var scope = this;
			boshClient.event("clientStatusChanged").bind(function(event) {
				scope.onBoshStatusChanged(event);
			});
			boshClient.event("presenceReceived").bind(function(event) {
				scope.onBoshPresenceReceived(event);
			});
			boshClient.event("messageReceived").bindWhen(
					"event[xmlns=\"http://jabber.org/protocol/pubsub#event\"] items item notification",	function(event) {
						scope.onFinesseEvent(event);
					});
		} else if (!boshClient.isConnected()) {
			boshClient.cancelReconnect();
			boshClient.disconnect();
		}
		var jabberId = this.agentId + "@" + this.domain;
		var boshParameters = {
			httpBindingURL: this.finessePath + "/http-bind",
			errorCallback: function(error) {
				scope.onBoshClientError(error);
			},
			successCallback: function(boshClient) {
				scope.onBoshClientConnected(boshClient);
			}
		};
		boshClient.connect(jabberId, this.password, boshParameters);
	},

	/**
	 * It works when the connection status of BOSCH changes.
	 * @param {Object} event The jabber event object.
	 */
	onBoshStatusChanged: function(event) {
		switch (event.data.next) {
			case Terrasoft.BoshConnectionStatus.CONNECTED:
				this.log("Bosh client connected");
				this.checkToSendConnected();
				break;
			case Terrasoft.BoshConnectionStatus.DISCONNECTED:
				if (event.data.error) {
					this.logError("Bosh client disconnected. Reason: BOSH client error");
					Terrasoft.Logger.error("Bosh client disconnected. Reason: BOSH client error");
				} else {
					this.log("Bosh client disconnected successfully");
				}
				this.logoutFinesse();
				break;
			default:
				break;
		}
	},

	/**
	 * Activates when a user enters the jabber channel.
	 * @param {Object} event The jabber event object.
	 */
	onBoshPresenceReceived: function(event) {
		this.log("Jabber presence received.");
		var presence = event.data;
		var from = presence.getFrom();
		if (!this.isBoshPresenceInit) {
			var index = from.indexOf("@");
			if (index > 0) {
				var user = from.substr(0, index);
				if (user === "finesse") {
					this.isBoshPresenceInit = true;
				}
			}
			this.checkToSendConnected();
		}
	},

	/**
	 * Verifies that the bosh jabber client is connected and the user Finesse has been connected. If so, it sends an event about the successful connection to Finesse.
	 */
	checkToSendConnected: function() {
		if (this.boshClient.isConnected() && this.isBoshPresenceInit) {
			this.loginFinesse();
		}
	},

	/**
	 * The method of entering the user's telephony session.
	 * @private
	 * @param {String} url address of the LogInMsgServer method on the application server.
	 * @param {Object} jsonData parameters for logging into the session.
	 */
	loginMsgService: function(url, jsonData) {
		Terrasoft.AjaxProvider.request({
			url: url,
			scope: this,
			callback: this.onLoginMsgService,
			jsonData: jsonData
		});
	},

	/**
	 * Authorizes the user on the Finesse server.
	 */
	loginFinesse: function() {
		var url = "/User/" + this.agentId;
		var apiMethodConfig = {
			User: {
				extension: this.deviceId,
				state: Terrasoft.FinesseAgentState.LOGIN
			}
		};
		this.sendFinesseRequest(url, "PUT",
				function() {
					this.fireEvent("initialized");
				},
				function(response) {
					var message = Ext.String.format("onSignInErrorHandler({0})", Terrasoft.encode(response.responseText));
					this.fireEvent("rawMessage", message);
				},
				this, apiMethodConfig);
	},

	/**
	 * Exits from Finesse.
	 */
	logoutFinesse: function() {
		this.setFinesseAgentState(Terrasoft.FinesseAgentState.LOGOUT, "", function(response) {
			var disconnectReason = response ? response.responseText : "";
			this.fireEvent("disconnected", disconnectReason);
		});
	},

	/**
	 * Changes the user state of Finesse.
	 * @param {String} stateCode The code for the new state.
	 * @param {String} reasonCode The reason code for the state.
	 * @param {Function} callback (optional) Callback function.
	 */
	setFinesseAgentState: function(stateCode, reasonCode, callback) {
		var url = "/User/" + this.agentId;
		let user = {
			state: stateCode
		};
		if (!Ext.isEmpty(reasonCode) && reasonCode !== Terrasoft.FinesseAgentStateReason.UNKNOWN) {
			user.reasonCodeId = reasonCode;
		}
		var apiMethodConfig = {
			User: user
		};
		this.sendFinesseRequest(url, "PUT", function(response) {
			if (response.status === Terrasoft.HttpStatusCode.ACCEPTED) {
				this.log("setUserState success");
				this.userStateChanged(stateCode, reasonCode);
			}
			if (Ext.isFunction(callback)) {
				callback.call(this, response);
			}
		}, function(response) {
			this.logError("setUserState error. Response = {0}", Terrasoft.encode(response.responseText));
			Terrasoft.Logger.error("setUserState error. Response = {0}", Terrasoft.encode(response.responseText));
			if (Ext.isFunction(callback)) {
				callback.call(this, response);
			}
		}, this, apiMethodConfig);
	},

	/**
	 * Queries the status of the user Finesse.
	 */
	getFinesseAgentState: function() {
		var url = "/User/" + this.agentId;
		this.sendFinesseRequest(url, "GET", function(response) {
			if (Ext.isEmpty(response.responseXML)) {
				return;
			}
			var xmlData = response.responseXML.xml;
			if (Ext.isEmpty(xmlData)) {
				return;
			}
			var userInfo = this.xmlToJson(xmlData);
			if (userInfo && userInfo.User && !Ext.isEmpty(userInfo.User.state)) {
				this.userStateChanged(userInfo.User.state);
			}
		}, function(response) {
			this.logError("getUserState error. Response = {0}", Terrasoft.encode(response.responseText));
			Terrasoft.Logger.error("getUserState error. Response = {0}", Terrasoft.encode(response.responseText));
		}, this);
	},

	/**
	 * Make an outgoing Finesse call.
	 * @param {String} targetAddress The number to which the call is made.
	 * @param {Function} callback Callback function.
	 */
	makeFinesseCall: function(targetAddress, callback) {
		var url = "/User/" + this.agentId + "/Dialogs";
		var apiMethodConfig = {
			Dialog: {
				requestedAction: Terrasoft.FinesseDialogAction.MAKE_CALL,
				toAddress: targetAddress,
				fromAddress: this.deviceId
			}
		};
		this.sendFinesseRequest(url, "POST",
				function(response) {
					this.log("Make call successful.");
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				function(response) {
					this.logError("makeCall error. status = {0}", Terrasoft.encode(response.responseText));
					Terrasoft.Logger.error("makeCall error. status = {0}", Terrasoft.encode(response.responseText));
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				this,
				apiMethodConfig);
	},

	/**
	 * Make a consultation call Finesse.
	 * @param {String} callId Call id.
	 * @param {String} targetAddress The number to which the call is made.
	 * @param {Function} callback Callback function.
	 */
	makeFinesseConsultCall: function(callId, targetAddress, callback) {
		var url = "/Dialog/" + callId;
		var requestedAction = Terrasoft.FinesseDialogAction.CONSULT_CALL;
		var apiMethodConfig = {
			Dialog: {
				requestedAction: requestedAction,
				toAddress: targetAddress,
				targetMediaAddress: this.deviceId
			}
		};
		this.sendFinesseRequest(url, "PUT",
				function(response) {
					this.log("{0} action succeed.", requestedAction);
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				function(response) {
					this.logError("{0} action error. response: {1}.",
						requestedAction, Terrasoft.encode(response.responseText));
					Terrasoft.Logger.error("{0} action error. response: {1}.",
						requestedAction, Terrasoft.encode(response.responseText));
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				this,
				apiMethodConfig);
	},

	/**
	 * Make a quick transfer of the Finesse call.
	 * @param {String} callId Call id.
	 * @param {String} targetAddress The number to which the call is made.
	 * @param {Function} callback Callback function.
	 */
	makeBlindTransferCall: function(callId, targetAddress, callback) {
		var url = "/Dialog/" + callId;
		var requestedAction = Terrasoft.FinesseDialogAction.TRANSFER_SST;
		var apiMethodConfig = {
			Dialog: {
				requestedAction: requestedAction,
				toAddress: targetAddress,
				targetMediaAddress: this.deviceId
			}
		};
		this.sendFinesseRequest(url, "PUT",
				function(response) {
					this.log("{0} action succeed.", requestedAction);
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				function(response) {
					this.logError("{0} action error. response: {1}.",
							requestedAction, Terrasoft.encode(response.responseText));
					Terrasoft.Logger.error("{0} action error. response: {1}.",
							requestedAction, Terrasoft.encode(response.responseText));
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				this,
				apiMethodConfig);
	},

	/**
	 * Performs the Finesse action for an active call.
	 * @param {String} callId Call id.
	 * @param {Terrasoft.FinesseDialogAction} requestedAction Finesse action.
	 * @param {Function} callback Callback function.
	 */
	takeFinesseAction: function(callId, requestedAction, callback) {
		var url = "/Dialog/" + callId;
		var apiMethodConfig = {
			Dialog: {
				requestedAction: requestedAction,
				targetMediaAddress: this.deviceId
			}
		};
		this.sendFinesseRequest(url, "PUT",
				function(response) {
					this.log("{0} action succeed.", requestedAction);
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				function(response) {
					this.logError("{0} action error. response: {1}.",
							requestedAction, Terrasoft.encode(response.responseText));
					Terrasoft.Logger.error("{0} action error. response: {1}.",
							requestedAction, Terrasoft.encode(response.responseText));
					if (Ext.isFunction(callback)) {
						callback.call(this, response);
					}
				},
				this,
				apiMethodConfig);
	},

	/**
	 * Gets the available operation with a call from the possible Finesse actions.
	 * @private
	 * @param {Object} action The Finesse action.
	 * @return {Terrasoft.CallFeaturesSet} Available operation.
	 */
	getCallFeatureFromAction: function(action) {
		switch (action) {
			case Terrasoft.FinesseDialogAction.MAKE_CALL:
				return Terrasoft.CallFeaturesSet.CAN_DIAL;
			case Terrasoft.FinesseDialogAction.ANSWER:
				return Terrasoft.CallFeaturesSet.CAN_ANSWER;
			case Terrasoft.FinesseDialogAction.HOLD:
				return Terrasoft.CallFeaturesSet.CAN_HOLD;
			case Terrasoft.FinesseDialogAction.RETRIEVE:
				return Terrasoft.CallFeaturesSet.CAN_UNHOLD;
			case Terrasoft.FinesseDialogAction.DROP:
				return Terrasoft.CallFeaturesSet.CAN_DROP;
			case Terrasoft.FinesseDialogAction.SEND_DTMF:
				return Terrasoft.CallFeaturesSet.CAN_DTMF;
			case Terrasoft.FinesseDialogAction.CONSULT_CALL:
				return Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL;
			case Terrasoft.FinesseDialogAction.TRANSFER:
				return Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER;
			case Terrasoft.FinesseDialogAction.TRANSFER_SST:
				return Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER;
			default:
				return Terrasoft.CallFeaturesSet.CAN_NOTHING;
		}
	},

	/**
	 * Receives the call status by the state of the call in Finesse.
	 * @private
	 * @param {Object} state Call status in Finesse.
	 * @param {Object} stateCause The reason for the call status in Finesse.
	 * @return {Terrasoft.GeneralizedCallState} Call status.
	 */
	getCallStateFromFinesseState: function(state, stateCause) {
		var callState;
		switch (state) {
			case Terrasoft.FinesseDialogState.INITIATING:
				callState = Terrasoft.GeneralizedCallState.ALERTING;
				break;
			case Terrasoft.FinesseDialogState.INITIATED:
				callState = Terrasoft.GeneralizedCallState.ALERTING;
				break;
			case Terrasoft.FinesseDialogState.ALERTING:
				callState = Terrasoft.GeneralizedCallState.ALERTING;
				break;
			case Terrasoft.FinesseDialogState.ACTIVE:
				callState = Terrasoft.GeneralizedCallState.CONNECTED;
				break;
			case Terrasoft.FinesseDialogState.HELD:
				callState = Terrasoft.GeneralizedCallState.HOLDED;
				break;
			case Terrasoft.FinesseDialogState.FAILED:
				callState = (stateCause === Terrasoft.FinesseDialogStateCause.BUSY)
						? Terrasoft.GeneralizedCallState.BUSY
						: Terrasoft.GeneralizedCallState.ALERTING;
				break;
			default:
				callState = Terrasoft.GeneralizedCallState.NONE;
		}
		return callState;
	},

	/**
	 * Processes the Finesse dialog object.
	 * @private
	 * @param {Object} dialog The Finesse dialog object.
	 * @return {Terrasoft.integration.telephony.Call} Gets a callback object or null if the Finesse dialog object should be ignored.
	 */
	processFinesseDialog: function(dialog) {
		var activeCalls = this.activeCalls;
		var callId = dialog.id;
		var call = activeCalls.find(callId);
		if (!Ext.isEmpty(call)) {
			call.oldState = call.state;
		} else {
			if (dialog.state === Terrasoft.FinesseDialogState.DROPPED) {
				this.log(Terrasoft.Resources.Telephony.CommonMessages.FinesseDialogObjectIgnoredReasonDroppped);
				return null;
			}
			call = this.createNewCall(dialog);
			this.activeCalls.add(callId, call);
		}
		call.timeStamp = new Date();
		this.setCallParticipants(call, dialog);
		var oldCallFeaturesSet = call.callFeaturesSet;
		var callParticipants = (Ext.isArray(dialog.participants.Participant))
				? dialog.participants.Participant
				: [dialog.participants.Participant];
		var thisParticipantSearchResult = Terrasoft.findItem(callParticipants, {mediaAddress: this.deviceId});
		if (Ext.isEmpty(thisParticipantSearchResult)) {
			this.log(Terrasoft.Resources.Telephony.CommonMessages.FinesseDialogObjectIgnoredReasonParticipantMissing);
			return null;
		}
		call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
		var thisParticipant = thisParticipantSearchResult.item;
		var actions = thisParticipant.actions.action;
		if (!Ext.isEmpty(actions)) {
			actions = Ext.isArray(actions) ? actions : [actions];
			for (var i = 0; i < actions.length; i++) {
				/*jshint bitwise:false */
				call.callFeaturesSet |= this.getCallFeatureFromAction(actions[i]);
				/*jshint bitwise:true */
			}
		}
		if (oldCallFeaturesSet !== call.callFeaturesSet) {
			call.isCallFeaturesSetChanged = true;
		}
		var state = thisParticipant.state;
		var stateCause = thisParticipant.stateCause;
		call.state = this.getCallStateFromFinesseState(state, stateCause);
		if (state === Terrasoft.FinesseDialogState.FAILED) {
			call.stateCause = stateCause || "";
			this.userStateChanged(call.stateCause, null, call.callFeaturesSet);
		}
		if (state === Terrasoft.FinesseDialogState.DROPPED || state === Terrasoft.FinesseDialogState.WRAP_UP) {
			this.setRedirectionProperties(call, dialog);
			activeCalls.remove(call);
			if (activeCalls.isEmpty() && (state === Terrasoft.FinesseDialogState.DROPPED)) {
				/*jshint bitwise:false */
				call.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_DIAL;
				/*jshint bitwise:true */
			}
		}
		return call;
	},

	/**
	 * Creates a new call object.
	 * @private
	 * @param {Object} dialog The Finesse call object.
	 * @return {Terrasoft.integration.telephony.Call} The call object.
	 */
	createNewCall: function(dialog) {
		var callId = dialog.id;
		var call = Ext.create("Terrasoft.integration.telephony.Call");
		call.id = callId;
		call.deviceId = this.deviceId;
		call.ctiProvider = this;
		call.direction = this.getCallDirection(dialog);
		return call;
	},

	/**
	 * Defines whether the call was distributed to the operator via the automated call system (ACD).
	 * @private
	 * @param {Terrasoft.integration.telephony.finesse.FinesseCallType} callType Ring type Finesse.
	 * @return {Boolean}
	 */
	isAcdIn: function(callType) {
		return callType === Terrasoft.FinesseCallType.ACD_IN || callType === Terrasoft.FinesseCallType.PREROUTE_ACD_IN;
	},

	/**
	 * Returns the direction of the call.
	 * @private
	 * @param {Object} dialog The Finesse call object.
	 * @return {Terrasoft.CallDirection} callDirection Direction of the call.
	 */
	getCallDirection: function(dialog) {
		var mediaProperties = dialog.mediaProperties;
		var callType = mediaProperties.callType;
		if (this.isAcdIn(callType)) {
			return Terrasoft.CallDirection.IN;
		}
		var callDirection;
		if (callType !== Terrasoft.FinesseCallType.CONSULT_OFFERED &&
				callType !== Terrasoft.FinesseCallType.TRANSFER) {
			callDirection = (this.deviceId === dialog.toAddress || this.deviceId === mediaProperties.DNIS)
					? Terrasoft.CallDirection.IN
					: Terrasoft.CallDirection.OUT;
		} else {
			callDirection = Ext.isEmpty(dialog.toAddress)
					? Terrasoft.CallDirection.OUT
					: Terrasoft.CallDirection.IN;
		}
		return callDirection;
	},

	/**
	 * Sets who calls whom.
	 * @private
	 * @param {Terrasoft.integration.telephony.Call} call Object of the call.
	 * @param {Object} dialog Object of the Finesse call.
	 */
	setCallParticipants: function(call, dialog) {
		var oldCallInfo = {
			callerId: call.callerId,
			calledId: call.calledId
		};
		var mediaProperties = dialog.mediaProperties;
		var callType = mediaProperties.callType;
		if (Ext.isEmpty(call.callerId) || Ext.isEmpty(call.calledId)) {
			var isMediaPropertiesCalledId = (callType === Terrasoft.FinesseCallType.OUT) ||
					((this.callTypesWithMediaProperties.indexOf(callType) !== -1) &&
							(call.direction === Terrasoft.CallDirection.OUT));
			if (isMediaPropertiesCalledId && call.direction === Terrasoft.CallDirection.OUT) {
				call.callerId = this.deviceId;
				call.calledId = mediaProperties.dialedNumber;
			} else if (this.isAcdIn(callType)) {
				call.callerId = dialog.fromAddress;
				call.calledId = mediaProperties.DNIS || this.deviceId;
			} else if (callType !== Terrasoft.FinesseCallType.CONFERENCE) {
				call.callerId = dialog.fromAddress;
				call.calledId = dialog.toAddress;
			}
		}
		if (callType === Terrasoft.FinesseCallType.CONSULT_OFFERED || callType === Terrasoft.FinesseCallType.TRANSFER) {
			this.updateCallAfterConsultationFinished(call, dialog.participants.Participant);
		}
		call.isInfoChanged = (oldCallInfo.callerId !== call.callerId) || (oldCallInfo.calledId !== call.calledId);
	},

	/**
	 * Sets from whom and to whom the call was transferred.
	 * @private
	 * @param {Terrasoft.integration.telephony.Call} call The call object.
	 * @param {Object} dialog The Finesse call object.
	 */
	setRedirectionProperties: function(call, dialog) {
		var activeCalls = this.activeCalls;
		var mediaProperties = dialog.mediaProperties;
		var callType = mediaProperties.callType;
		if ((callType === Terrasoft.FinesseCallType.TRANSFER) && (activeCalls.getCount() === 2)) {
			var activeCallId = this.activeCallId;
			var isActiveCall = (call.id === activeCallId);
			var currentCall = isActiveCall ? call : activeCalls.find(activeCallId);
			var consultCall = isActiveCall ? activeCalls.getByIndex(1) : call;
			if (currentCall && consultCall) {
				currentCall.redirectingId = consultCall.calledId;
				currentCall.redirectionId = consultCall.callerId;
			}
		}
	},

	/**
	 * Updates the call data after the consultant calls the consultant.
	 * @private
	 * @param {Terrasoft.integration.telephony.Call} call The call object.
	 * @param {Object []} participants An array of participants in the conversation.
	 */
	updateCallAfterConsultationFinished: function(call, participants) {
		if (!Ext.isArray(participants) || participants.length !== 2) {
			return;
		}
		var deviceId = this.deviceId;
		var opponent = _.reject(participants, function(participant) {
			return participant.mediaAddress === deviceId;
		});
		var opponentNumber = (call.direction === Terrasoft.CallDirection.OUT) ? call.calledId : call.callerId;
		if (!Ext.isEmpty(opponent) && opponent.length === 1 && opponent[0].mediaAddress !== opponentNumber) {
			opponentNumber = opponent[0].mediaAddress;
			if (call.direction === Terrasoft.CallDirection.OUT) {
				call.calledId = opponentNumber;
			} else {
				call.callerId = opponentNumber;
			}
		}
	},

	/**
	 * Generates a call message based on the status change.
	 * @private
	 * @param {Terrasoft.integration.telephony.Call} call Call.
	 */
	fireCallEventByState: function(call) {
		var event;
		if (call.state !== call.oldState) {
			switch (call.state) {
				case Terrasoft.GeneralizedCallState.ALERTING:
					event = "callStarted";
					break;
				case Terrasoft.GeneralizedCallState.CONNECTED:
					event = "commutationStarted";
					break;
				case Terrasoft.GeneralizedCallState.HOLDED:
					event = "hold";
					break;
				case Terrasoft.GeneralizedCallState.NONE:
					event = "callFinished";
					break;
				default:
					break;
			}
		} else if (call.isInfoChanged) {
			event = "callInfoChanged";
		} else if (call.id === this.activeCallId && call.isCallFeaturesSetChanged) {
			this.fireLineStateChangedEvent(call.id, call.callFeaturesSet);
		}
		call.isInfoChanged = false;
		call.isCallFeaturesSetChanged = false;
		if (!Ext.isEmpty(event)) {
			this.fireCallEvent(call, event);
		}
	},

	/**
	 * Sends a message about changing the status of the call.
	 * @private
	 * @param {Terrasoft.integration.telephony.Call} call Call.
	 * @param {String} event Call event.
	 */
	fireCallEvent: function(call, event) {
		this.fireEvent(event, call);
	},

	/**
	 * Sends a message about the change of the line state.
	 * @private
	 * @param {String} callId Call id.
	 * @param {Terrasoft.CallFeaturesSet} callFeaturesSet The set of available operations on the call.
	 */
	fireLineStateChangedEvent: function(callId, callFeaturesSet) {
		this.fireEvent("lineStateChanged", {
			callId: callId,
			callFeaturesSet: callFeaturesSet
		});
	},

	/**
	 * Processing of the event when the BOSH connection is successfully created.
	 * @private
	 * @param {Object} boshClient The BOSH connection object.
	 */
	onBoshClientConnected: function(boshClient) {
		var scope = boshClient.Scope;
		scope.log("Bosh Client Connected");
		this.boshClient.sendPresence();
		scope.fireEvent("rawMessage", "Connected");
	},

	/**
	 * Processing of the event when a BOSH connection error occurs.
	 * @private
	 * @param {Object} error The error object is BOSH.
	 */
	onBoshClientError: function(error) {
		var errorXmlData = error.xml;
		var errorInfo = {
			internalErrorCode: errorXmlData,
			data: Terrasoft.Resources.Telephony.Exception.UnknownBoshException,
			source: "Finesse(Bosh)",
			errorType: Terrasoft.MsgErrorType.GENERAL_ERROR
		};
		if (!Ext.isEmpty(errorXmlData)) {
			var errorConfig = this.xmlToJson(errorXmlData);
			Terrasoft.each(errorConfig.error, function(item, index) {
				if (index === this.jabberNotAuthorizedErrorCode) {
					errorInfo.errorType = Terrasoft.MsgErrorType.AUTHENTICATION_ERROR;
					errorInfo.data = Terrasoft.Resources.Telephony.Exception.NotAuthorizedException;
				}
			}, this);
		}
		this.fireEvent("error", errorInfo);
	},

	/**
	 * Processing of the event when an event occurs on the Cisco Finesse server side.
	 * @private
	 * @param {Object} event Connection object BOSH.
	 */
	onFinesseEvent: function(event) {
		var eventTextContent = Ext.global.jQuery(event.selected).text();
		this.fireEvent("rawMessage", eventTextContent);
		var jsonEventContent = this.xmlToJson(eventTextContent);
		var eventContent = Terrasoft.decode(jsonEventContent);
		if (Ext.isEmpty(eventContent) || !eventContent.Update) {
			return;
		}
		var data = eventContent.Update.data;
		if (data.user && !Ext.isEmpty(data.user.state) && (this.agentId === data.user.loginId)) {
			this.userStateChanged(data.user.state, data.user.reasonCodeId);
		}
		if (!Ext.isEmpty(data.dialogs) || !Ext.isEmpty(data.dialog)) {
			this.dialogStateChanged(eventContent);
		}
		if (data.apiErrors) {
			var apiError = data.apiErrors.apiError;
			this.onFinesseError(apiError);
		}
	},

	/**
	 * Triggers when you add a new call to the active list.
	 * @private
	 */
	onActiveCallAdded: function() {
		if (this.activeCalls.getCount() === 1) {
			var activeCall = this.activeCalls.getByIndex(0);
			this.activeCallId = activeCall.id;
		}
	},

	/**
	 * Trggers when you delete a call from the active list.
	 * @private
	 */
	onActiveCallRemoved: function() {
		var activeCallsCount = this.activeCalls.getCount();
		if (activeCallsCount === 0) {
			this.activeCallId = "";
			this.fireEvent("lineStateChanged", {callFeaturesSet: Terrasoft.CallFeaturesSet.CAN_DIAL});
		} else if (Ext.isEmpty(this.activeCalls.find(this.activeCallId))) {
			var activeCall = this.activeCalls.getByIndex(0);
			this.activeCallId = activeCall.id;
		}
	},

	/**
	 * Triggers when you clear the active calls list.
	 * @private
	 */
	onActiveCallsCleared: function() {
		this.activeCallId = "";
	},

	/**
	 * Returns when saving information about a call to the database.
	 * @private
	 * @param {Object} request Instance of the request.
	 * @param {Boolean} success Indicates a successful server response.
	 * @param {Object} response Server response.
	 */
	onUpdateDbCall: function(request, success, response) {
		var callDatabaseUid = Terrasoft.decode(response.responseText);
		if (success && Terrasoft.isGUID(callDatabaseUid)) {
			var updateCall = Terrasoft.decode(request.jsonData);
			var callId = updateCall.id;
			var call = this.activeCalls.find(callId);
			if (!Ext.isEmpty(call)) {
				call.databaseUId = callDatabaseUid;
				this.fireEvent("callSaved", call);
			}
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
	 * Called when the user status is changed.
	 * @private
	 * @param {String} userState Agent status.
	 * @param {String} [userStateReasonCode] Agent reason code for the agent.
	 * @param {Number} callFeaturesSet Available call operations (a set of bitwise enumeration flags
	 * {@link Terrasoft.CallFeaturesSet}).
	 */
	userStateChanged: function(userState, userStateReasonCode, callFeaturesSet) {
		var stateChanged = (this.userState !== userState || this.userStateReasonCode !== userStateReasonCode);
		this.userState = userState;
		this.userStateReasonCode = userStateReasonCode;
		if (userState && stateChanged) {
			this.fireEvent("agentStateChanged", {
				userState: userState,
				userStateReasonCode: userStateReasonCode
			});
			this.lastNotReadyStateReasonCode = (userState === Terrasoft.FinesseAgentState.NOT_READY)
					? userStateReasonCode
					: this.lastNotReadyStateReasonCode;
			/*TODO: ##-62 ######### ############## ###### ## ######### ############/######.
   ######## ## ####### Finesse ###### ######### ######## ### ############, # ## ######### ## ###### NOT_READY.
   #### ###### ## #### ##### ##########, ## ############# #####, ####### #### ###### ######### ######## ####-
   ####### ## ##### ########## ### #######.*/
			if (this.activeCalls.getCount() === 0) {
				var currentCallFeaturesSet = (!Ext.isEmpty(callFeaturesSet))
						? callFeaturesSet
						: Terrasoft.CallFeaturesSet.CAN_NOTHING;
				var featureSet = (userState === Terrasoft.FinesseAgentState.NOT_READY)
						? Terrasoft.CallFeaturesSet.CAN_DIAL
						: currentCallFeaturesSet;
				this.fireEvent("lineStateChanged", {callFeaturesSet: featureSet});
			}
		}
	},

	/**
	 * Called when the call status changes.
	 * @private
	 * @param {Object} eventContent The event object of the Finesse library.
	 */
	dialogStateChanged: function(eventContent) {
		var dialog = eventContent.Update.data.dialog;
		if (!Ext.isEmpty(eventContent.Update.data.dialogs)) {
			var dialogs = eventContent.Update.data.dialogs;
			////TODO ########### ########## ######### #### #### #########  ####### (######## ################)

			dialog = Ext.isArray(dialogs) ? dialogs[0] : dialogs.Dialog;
		}
		if (Ext.isEmpty(dialog)) {
			return;
		}
		if (dialog.mediaType !== Terrasoft.FinesseDialogMediaType.VOICE) {
			return;
		}
		var call = this.processFinesseDialog(dialog);
		if (Ext.isEmpty(call)) {
			return;
		}
		this.updateDbCall(call, this.onUpdateDbCall);
		this.fireCallEventByState(call, dialog);
	},

	/**
	 * Processes an error from the Finesse server.
	 * @private
	 * @param {Object} apiError The Finesse error object.
	 */
	onFinesseError: function(apiError) {
		this.logError(this.finesseErrorMessageTemplate, Terrasoft.encode(apiError));
		Terrasoft.Logger.error(this.finesseErrorMessageTemplate, Terrasoft.encode(apiError));
		var errorInfo = {
			internalErrorCode: apiError.errorType,
			data: Terrasoft.Resources.Telephony.Exception.UnknownFinesseException,
			source: "Finesse",
			errorType: Terrasoft.MsgErrorType.GENERAL_ERROR
		};
		switch (apiError.errorType) {
			case Terrasoft.FinesseErrorType.DEVICE_BUSY:
				errorInfo.data = Terrasoft.Resources.Telephony.Exception.ExtensionBusyByAnotherUser;
				errorInfo.errorType = Terrasoft.MsgErrorType.OPEN_CONNECTION_ERROR;
				this.fireEvent("error", errorInfo);
				this.closeConnection();
				break;
			case Terrasoft.FinesseErrorType.INVALID_DEVICE:
				errorInfo.data = Terrasoft.Resources.Telephony.Exception.InvalidDevice;
				errorInfo.errorType = Terrasoft.MsgErrorType.OPEN_CONNECTION_ERROR;
				this.fireEvent("error", errorInfo);
				this.closeConnection();
				break;
			default:
				this.fireEvent("error", errorInfo);
				break;
		}
	},

	/**
	 * Handle the event when logging in to the user's telephony session.
	 * @private
	 * @param {Object} request Instance of the request.
	 * @param {Boolean} success Indicates a successful server response.
	 * @param {Object} response Server response
	 */
	onLoginMsgService: function(request, success, response) {
		if (success && Terrasoft.isGUID(response.responseText.replace(/\"/g, ""))) {
			var sysSettingCode = "SysMsgFinesseDefaulNotReadyReasonCode";
			Terrasoft.SysSettings.querySysSettings([sysSettingCode], function(settings) {
				this.defaultNotReadyReasonCode = settings.SysMsgFinesseDefaulNotReadyReasonCode;
				if (!Ext.isEmpty(this.defaultNotReadyReasonCode)) {
					this.connect(this.initialConfig.connectionConfig);
				} else {
					var errorMsg = Ext.String.format(
							Terrasoft.Resources.Telephony.Exception.DefaultNotReadyReasonCodeNotSetFromSysSettings,
							sysSettingCode);
					this.logError(errorMsg);
					Terrasoft.Logger.error(errorMsg);
				}
			}, this);
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

	/**
	 * Load Jabberwerx library, if exist.
	 * @param {Function} callback Callback function.
	 */
	_loadJabberwerxIfExist: function(callback){
		var callbackError = function(){
			callback();
		};
		require(["jQuery", "x2js"], function() {
			require(["jqueryMigrate"], function() {
				var originalDateToJsonFunc = Date.prototype.toJSON;
				require(["jabberwerx"], function() {
					Date.prototype.toJSON = originalDateToJsonFunc;
					callback();
				}, callbackError);
			}, callbackError);
		}, callbackError);
	},

	//endregion

	//region Methods: Public

	/**
	 * Creates a provider for the Finesse service.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.activeCalls = Ext.create("Terrasoft.Collection");
		this.activeCalls.on("add", this.onActiveCallAdded, this);
		this.activeCalls.on("remove", this.onActiveCallRemoved, this);
		this.activeCalls.on("clear", this.onActiveCallsCleared, this);
	},

	/**
	 * The method of initializing the connection.
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		var callback = function() {
			this.loginMsgService(this.msgUtilServiceUrl + this.loginMethodName, {
				"LicInfoKeys": this.licInfoKeys,
				"UserUId": Terrasoft.SysValue.CURRENT_USER.value
			});
		}.bind(this);
		this._loadJabberwerxIfExist(callback);
	},
	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection.
	 */
	closeConnection: function() {
		this.boshClient.disconnect();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeCall
	 */
	makeCall: function(targetAddress) {
		this.makeFinesseCall(targetAddress);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#answerCall
	 */
	answerCall: function(call) {
		this.takeFinesseAction(call.id, Terrasoft.FinesseDialogAction.ANSWER);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#holdCall
	 */
	holdCall: function(call) {
		var finesseAction = (call.state === Terrasoft.GeneralizedCallState.HOLDED)
				? Terrasoft.FinesseDialogAction.RETRIEVE
				: Terrasoft.FinesseDialogAction.HOLD;
		this.takeFinesseAction(call.id, finesseAction);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#dropCall
	 */
	dropCall: function(call) {
		this.takeFinesseAction(call.id, Terrasoft.FinesseDialogAction.DROP);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeConsultCall
	 */
	makeConsultCall: function(call, targetAddress) {
		this.makeFinesseConsultCall(call.id, targetAddress);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#transferCall
	 */
	transferCall: function(currentCall) {
		this.takeFinesseAction(currentCall.id, Terrasoft.FinesseDialogAction.TRANSFER);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#cancelTransfer
	 */
	cancelTransfer: function(currentCall, consultCall) {
		this.dropCall(consultCall);
		this.holdCall(currentCall);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#blindTransferCall
	 */
	blindTransferCall: function(call, targetAddress) {
		this.makeBlindTransferCall(call.id, targetAddress);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setUserState
	 */
	setUserState: function(code, reason, callback) {
		if (code === Terrasoft.FinesseAgentState.NOT_READY) {
			reason = (Ext.isEmpty(reason) || reason === Terrasoft.FinesseAgentStateReason.UNKNOWN)
					? this.defaultNotReadyReasonCode
					: reason;
		}
		this.setFinesseAgentState(code, reason, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setWrapUpUserState
	 */
	setWrapUpUserState: function(isWrapUpActive, callback) {
		if (!isWrapUpActive) {
			var stateCode, reasonCode;
			if (this.userState === Terrasoft.FinesseAgentState.WORK_READY) {
				stateCode = Terrasoft.FinesseAgentState.READY;
				reasonCode = null;
			} else if (this.userState === Terrasoft.FinesseAgentState.WORK) {
				stateCode = Terrasoft.FinesseAgentState.NOT_READY;
				reasonCode = this.lastNotReadyStateReasonCode;
			} else {
				if (Ext.isFunction(callback)) {
					callback.call(this);
				}
				return;
			}
			this.setUserState(stateCode, reasonCode, callback);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryUserState
	 */
	queryUserState: function() {
		this.getFinesseAgentState();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#sendDtmf
	 */
	sendDtmf: function() {
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryActiveCallSnapshot
	 */
	queryActiveCallSnapshot: function() {},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryLineState
	 */
	queryLineState: function() {},

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
		var agentCapabilities = Terrasoft.AgentFeaturesSet.CAN_NOTHING;
		/*jshint bitwise:true */
		return {
			callCapabilities: callCapabilities,
			agentCapabilities: agentCapabilities
		};
	}

	/*jshint bitwise:true */
	//endregion

});

//endregion