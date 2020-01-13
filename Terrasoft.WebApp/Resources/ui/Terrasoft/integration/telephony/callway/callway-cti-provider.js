Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.callway");

//region Class: CallwayCtiProvider

/**
 * The provider class to the Callway message service.
 */
Ext.define("Terrasoft.integration.telephony.callway.CallwayCtiProvider", {
	extend: "Terrasoft.BaseCtiProvider",
	alternateClassName: "Terrasoft.CallwayCtiProvider",
	singleton: true,

	/**
  * The phone number of the agent.
  * @type {String}
  */
	extension: "",

	/**
  * Outbound dialing rule.
  * @type {String}
  */
	routingRule: "",

	/**
  * Use an internal Callway client.
  * @type {Boolean}
  */
	isCallwayClient: true,

	/**
  * The number from which the RingBack calls come.
  * @type {String}
  */
	ringBackCallerId: "",

	//region Properties: Private

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
  * Address Terrasoft.Messaging.Service.
  * @type {String}
  */
	serviceUrl: "",

	/**
  * Communication channel with the service.
  * @type {Terrasoft.WebSocketChannel}
  */
	serviceChannel: null,

	/**
  * The Id of the telephony library.
  * @type {String}
  */
	libraryInstanceUId: "",

	/**
  * Connection Id.
  * @type {String}
  */
	connectionUId: "",

	/**
  * The name of the assembly of the Callway message library.
  * @private
  * @type {String}
  */
	callwayMsgLibraryAssemblyName: "Terrasoft.Messaging.Callway.CallwayManager, Terrasoft.Messaging.Callway",

	/**
  * List of ringBack (callback) calls IDs.
  * @private
  * @type {Terrasoft.Collection}
  */
	ringBackCallIds: null,

	/*jshint bitwise:false */
	/**
  * Available operations of the connected call.
  * @private
  * @type {Number}
  */
	connectedCallFeaturesSet: Terrasoft.CallFeaturesSet.CAN_HOLD |
		Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
		Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_DROP |
		Terrasoft.CallFeaturesSet.CAN_DTMF,
	/*jshint bitwise:true */

	//endregion

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#licInfoKeys
	 * @protected
	 * @override
	 * @type {String[]}
	 */
	licInfoKeys: ["MessagingService.Use", "BPMonlineCallwayConnector.Use"],

	// endregion

	//region Constructors: Public

	/**
  * Creates a provider object.
  */
	constructor: function() {
		this.callParent(arguments);
		this.serviceChannel = Ext.create("Terrasoft.WebSocketChannel", {
			serviceUrl: this.serviceUrl
		});
		this.ringBackCallIds = Ext.create("Terrasoft.Collection");
	},

	//endregion

	//region Methods: Private

	/**
  * Method of opening a connection.
  * @private
  * @param {Object} config Connection parameters.
  */
	connect: function(config) {
		var channel = this.serviceChannel;
		channel.serviceUrl = config.msgServiceUrl;
		channel.init();
		channel.on(Terrasoft.EventName.ON_CONNECTION_INITIALIZED, this.channelOpenedHandler, this);
		channel.on(Terrasoft.EventName.ON_MESSAGE, this.channelMsgHandler, this);
		channel.on(Terrasoft.EventName.ON_CHANNEL_CLOSED, this.channelClosedHandler, this);
	},

	/**
  * Internal handler for closing the connection. Initializes an attempt to reconnect to the server.
  * @private
  */
	channelClosedHandler: function() {
		this.log("Messaging service channel closed");
		this.fireEvent("disconnected", this);
	},

	/**
  * Internal message handler from source.
  * @private
  * @param {Object} scope The execution context.
  * @param {String} message A serialized server message object.
  */
	channelMsgHandler: function(scope, message) {
		try {
			var jsonMsg = Ext.decode(message);
			this.processMsg(jsonMsg);
		} catch (catchedException) {
			this.logError("Processing message exception:" + catchedException);
		}
	},

	/**
  * Internal handler for opening a connection.
  * @private
  */
	channelOpenedHandler: function() {
		this.log("Messaging service channel created");
		this.initializeLibrary(this.initialConfig);
	},

	/**
  * Method for initializing the integration library.
  * @private
  */
	initializeLibrary: function() {
		var commandConfig = {
			parameters: {
				"AssemblyName": this.callwayMsgLibraryAssemblyName
			}
		};
		this.postMessagingCommand(Terrasoft.CtiCommand.LOAD_LIBRARY, commandConfig);
	},

	/**
  * Method for initializing the integration library.
  * @private
  * @param {Object} config connection parameters.
  */
	initializeConnection: function(config) {
		var connectionConfig = config.connectionConfig;
		var commandConfig = {
			parameters: {
				"connectionParams": Terrasoft.encode(connectionConfig),
				"sessionServiceParams": Terrasoft.encode(config.sessionServiceParams)
			}
		};
		this.extension = connectionConfig.operatorId;
		this.routingRule = connectionConfig.routingRule;
		this.ringBackCallerId = connectionConfig.ringBackCallerId;
		if (!Ext.isEmpty(connectionConfig.isCallwayClient)) {
			this.isCallwayClient = connectionConfig.isCallwayClient;
		}
		this.postMessagingCommand(Terrasoft.CtiCommand.OPEN_CONNECTION, commandConfig);
	},

	/**
  * The message processor from the service.
  * @private
  * @param {Object} message Object with service message
  */
	processMsg: function(message) {
		this.fireEvent("rawMessage", message);
		if (!Ext.isObject(message) || !Ext.isNumber(message.eventType)) {
			return;
		}
		var msgEventInfo = Ext.create("Terrasoft.MsgEventInfo", message);
		var content = msgEventInfo.content;
		switch (msgEventInfo.eventType) {
			case Terrasoft.MsgEventType.LIBRARY_INITIALIZED:
				this.libraryInstanceUId = content;
				this.initializeConnection(this.initialConfig);
				break;
			case Terrasoft.MsgEventType.CONNECTION_CREATED:
				this.connectionUId = msgEventInfo.connectionUId;
				this.fireEvent("initialized");
				this.queryOperatorState();
				break;
			case Terrasoft.MsgEventType.ERROR:
				this.fireEvent("error", Terrasoft.decode(content));
				break;
			case Terrasoft.MsgEventType.DISCONNECTED:
				var failureCode = Terrasoft.decode(content);
				this.fireEvent("disconnected", failureCode);
				break;
			case Terrasoft.MsgEventType.RAW_DATA:
				this.processCallwayEvent(Terrasoft.decode(content));
				break;
			default:
				break;
		}
	},

	/**
  * Method of packing the Callway command.
  * @private
  * @param {Object} config Command parameters for Callway.
  * @return {String} A packed message from the Callway command.
  */
	packCallwayCommand: function(config) {
		if (Ext.isEmpty(config) || Ext.Object.isEmpty(config)) {
			return "";
		}
		var message = "";
		Terrasoft.each(config, function(element, index) {
			message += Ext.String.format("{0}: {1}\r\n", index, element);
		}, this);
		message += "\r\n";
		return message;
	},

	/**
  * Method for unpacking the Callway event.
  * @private
  * @param {String} message The message of the Callway event.
  * @return {Object} Unpacked parameters for the Callway event.
  */
	unpackCallwayMessage: function(message) {
		var config = {};
		var eventRows = message.split("\r\n");
		for (var i = 0, eventRowsLength = eventRows.length; i <= eventRowsLength; i++) {
			var eventRow = eventRows[i];
			if (Ext.isEmpty(eventRow)) {
				continue;
			}
			var eventRowItems = eventRows[i].split(": ");
			if (eventRowItems.length < 2) {
				continue;
			}
			var paramName = eventRowItems[0];
			var paramValue = eventRowItems[1];
			config[paramName] = paramValue;
		}
		return config;
	},

	/**
  * Method for sending a Callway message.
  * @private
  * @param {Object} config Parameters of the command.
  */
	postCallwayMessage: function(config) {
		var message = this.packCallwayCommand(config);
		var commandConfig = {
			parameters: {
				"data": message
			}
		};
		this.postMessagingCommand(Terrasoft.CtiCommand.POST_RAW_DATA, commandConfig);
	},

	/**
  * The method for sending the message service command.
  * @param {Terrasoft.CtiCommand} command The telephony command.
  * @param {Object} config (optional) Parameters of the command.
  */
	postMessagingCommand: function(command, config) {
		if (this.serviceChannel.getConnectionState() !== Terrasoft.SocketConnectionState.OPEN) {
			var errorMessage = Terrasoft.Resources.Telephony.Exception.SocketConnectionChannelIsNotOpened;
			this.logError(errorMessage);
			throw new Terrasoft.InvalidObjectState(errorMessage);
		}
		config = config || {};
		var msgInfo = Ext.create("Terrasoft.MsgCommandInfo", {
			command: command,
			parameters: config.parameters,
			libraryInstanceUId: this.libraryInstanceUId,
			connectionUId: this.connectionUId,
			commandExecutor: config.commandExecutor
		});
		var message = msgInfo.serialize();
		this.serviceChannel.postMessage(message);
		this.log(message);
	},

	/**
  * Callway event handling method.
  * @private
  * @param {String} message The message of the Callway event.
  */
	processCallwayEvent: function(message) {
		var eventConfig = this.unpackCallwayMessage(message);
		switch (eventConfig.Message) {
			case Terrasoft.CallwayEventType.NEW_CALL:
				this.onNewCall(eventConfig);
				break;
			case Terrasoft.CallwayEventType.CALL_STATE_CHANGED:
				this.onCallStateChanged(eventConfig);
				break;
			case Terrasoft.CallwayEventType.OPERATOR_STATE:
				this.onOperatorState(eventConfig);
				break;
			case Terrasoft.CallwayEventType.AUTHORIZED:
				this.onAuthorized(eventConfig);
				break;
			default:
				break;
		}
	},

	/**
  * Make a call to the specified number (only the Callway client).
  * @private
  * @param {String} targetAddress The number to dial.
  */
	internalMakeCall: function(targetAddress) {
		var commandConfig = {
			Message: "MakeCall",
			OperatorId: this.extension,
			Number: targetAddress
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
  * Make a call to the specified number on the specified operator.
  * @private
  * @param {String} targetAddress The number to dial.
  */
	originate: function(targetAddress) {
		var commandConfig = {
			Message: "Originate",
			NumberA: this.extension,
			NumberB: targetAddress,
			RoutingRule: this.routingRule
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
  * Requests the status of the statement. As a result, the onOperatorState event will be returned.
  * @param {String} operatorId (optional) Operator identifier. If not specified, the current statement.
  * @private
  */
	queryOperatorState: function(operatorId) {
		var commandConfig = {
			Message: "GetOperatorState",
			OperatorId: operatorId || this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
  * Returns the current call object by ID.
  * @private
  * @param {String} callId Call id.
  * @return {Terrasoft.integration.telephony.Call} The current call.
  */
	findCurrentCallById: function(callId) {
		if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === callId)) {
			return this.consultCall;
		} else if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === callId)) {
			return this.activeCall;
		}
		return null;
	},

	/**
  * Returns the direction of the call.
  * @private
  * @param {Terrasoft.CallwayCallDirection} callwayDirection The direction of the Call of the Callway protocol.
  * @param {String} phoneNumber The phone number of the person to whom the call is directed.
  * @return {Terrasoft.CallDirection} Direction of the call.
  */
	getCallDirection: function(callwayDirection, phoneNumber) {
		var direction;
		if (callwayDirection === Terrasoft.CallwayCallDirection.INCOMING) {
			direction = Terrasoft.CallDirection.IN;
		} else if (callwayDirection === Terrasoft.CallwayCallDirection.OUTGOING) {
			direction = Terrasoft.CallDirection.OUT;
		} else {
			direction = (phoneNumber !== this.extension) ? Terrasoft.CallDirection.IN : Terrasoft.CallDirection.OUT;
		}
		this.log(direction);
		return direction;
	},

	/**
  * Returns when entering the user's telephony session.
  * @private
  * @param {Object} request Instance of the request.
  * @param {Boolean} success Indicates a successful server response.
  * @param {Object} response Server response.
  */
	onLoginMsgService: function(request, success, response) {
		var sessionId = Terrasoft.decode(response.responseText);
		if (success && Terrasoft.isGUID(sessionId)) {
			this.connect(this.initialConfig);
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
  * Activates when the user logs in to Integration with Callway.
  * @private
  * @param {Terrasoft.CallwayAuthorizationResult} config.AuthorizationResult Authorization result.
  */
	onAuthorized: function(config) {
		var authorizationResult = config.AuthorizationResult;
		if (authorizationResult === Terrasoft.CallwayAuthorizationResult.SUCCESS) {
			return;
		}
		var errorInfo = {
			internalErrorCode: authorizationResult,
			data: Ext.String.format("AuthorizationResult: {0}", authorizationResult),
			errorType: Terrasoft.MsgErrorType.AUTHENTICATION_ERROR,
			source: "Callway server"
		};
		this.fireEvent("error", errorInfo);
		this.closeConnection();
	},

	/**
  * Returns when saving information about a call to the database.
  * @private
  * @param {Object} request Instance of the request.
  * @param {Boolean} success Indicates a successful server response.
  * @param {Object} response Server response.
  */
	onUpdateDbCall: function(request, success, response) {
		var callDatabaseUId = Terrasoft.decode(response.responseText);
		if (success && Terrasoft.isGUID(callDatabaseUId)) {
			var call = Terrasoft.decode(request.jsonData);
			var callId = call.id;
			if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === callId) {
				call = this.activeCall;
			} else if (!Ext.isEmpty(this.consultCall) && this.consultCall.id === callId) {
				call = this.consultCall;
			}
			call.databaseUId = callDatabaseUId;
			this.fireEvent("callSaved", call);
		} else {
			this.fireEvent("rawMessage", "Update Call error");
			var errorInfo = {
				internalErrorCode: null,
				data: callDatabaseUId,
				source: "App server",
				errorType: Terrasoft.MsgErrorType.COMMAND_ERROR
			};
			this.fireEvent("error", errorInfo);
		}
	},

	/**
  * The call was distributed to the operator.
  * @private
  * @param {String} config.OperatorId The operator's internal number.
  * @param {String} config.Number The subscriber's number.
  * @param {Terrasoft.CallwayCallDirection} config.Direction Direction of the call.
  * @param {String} config.QueueId The ID of the queue.
  * @param {String} config.IVRId (optional) IVR branch.
  * @param {String} config.UniqueId Call id.
  * @param {String} config.RoutingRule The routing rule.
  */
	onNewCall: function(config) {
		var callId = config.UniqueId;
		if (config.Number === this.ringBackCallerId) {
			if (!this.ringBackCallIds.contains(callId)) {
				this.ringBackCallIds.add(callId, callId);
			}
			return;
		}
		var isConsultCall = !Ext.isEmpty(this.activeCall);
		var direction = this.getCallDirection(config.Direction, config.Number);
		var call = this.findCurrentCallById(callId) || Ext.create("Terrasoft.integration.telephony.Call");
		call.id = callId;
		call.direction = direction;
		call.deviceId = this.extension;
		if (direction === Terrasoft.CallDirection.IN) {
			call.callerId = config.Number;
			call.calledId = this.extension;
		} else {
			call.callerId = this.extension;
			call.calledId = config.Number;
		}
		call.ctiProvider = this;
		call.timeStamp = new Date();
		call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP;
		if (this.isCallwayClient && (direction === Terrasoft.CallDirection.IN)) {
			/*jshint bitwise:false */
			call.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
			/*jshint bitwise:true */
		}
		call.state = Terrasoft.GeneralizedCallState.ALERTING;
		if (isConsultCall) {
			call.redirectingId = this.extension;
			call.redirectionId = (direction === Terrasoft.CallDirection.OUT) ? call.calledId : call.callerId;
			this.consultCall = call;
			this.fireEvent("lineStateChanged", {
				callFeaturesSet: Terrasoft.CallFeaturesSet.CAN_NOTHING
			});
		} else {
			this.activeCall = call;
		}
		this.fireEvent("callStarted", call);
		this.fireEvent("lineStateChanged", {
			callFeaturesSet: call.callFeaturesSet,
			callId: call.id
		});
		this.updateDbCall(call, this.onUpdateDbCall);
	},

	/**
  * The call changed the status.
  * @private
  * @param {String} config.OperatorId The operator's internal number.
  * @param {String} config.UniqueId Call id.
  * @param {Terrasoft.CallwayCallState} config.State Call status.
  */
	onCallStateChanged: function(config) {
		var callId = config.UniqueId;
		if (this.ringBackCallIds.contains(callId)) {
			if (config.State === Terrasoft.CallwayCallState.HANGUP) {
				this.ringBackCallIds.removeByKey(callId);
			}
			return;
		}
		var call = this.findCurrentCallById(callId);
		if (Ext.isEmpty(call)) {
			this.logError("Event for unknown call. Event config:" + Terrasoft.encode(config));
			return;
		}
		switch (config.State) {
			case Terrasoft.CallwayCallState.BRIDGE:
				this.onCallConnected(call);
				break;
			case Terrasoft.CallwayCallState.HANGUP:
				this.onCallHangup(call);
				break;
			case Terrasoft.CallwayCallState.HOLD:
				this.onCallHold(call);
				break;
			case Terrasoft.CallwayCallState.UNHOLD:
				this.onCallUnhold(call);
				break;
			default:
				break;
		}
		this.fireEvent("lineStateChanged", {
			callFeaturesSet: call.callFeaturesSet,
			callId: callId
		});
		this.updateDbCall(call, this.onUpdateDbCall);
	},

	/**
  * The connection with the subscriber is established.
  * @private
  * @param {Terrasoft.Telephony.Call} call Call.
  */
	onCallConnected: function(call) {
		var callId = call.id;
		var isConsultCall = false;
		if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === callId)) {
			isConsultCall = true;
		}
		call.state = Terrasoft.GeneralizedCallState.CONNECTED;
		call.callFeaturesSet = this.connectedCallFeaturesSet;
		this.fireEvent("commutationStarted", call);
		if (isConsultCall) {
			var activeCall = this.activeCall;
			activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER;
			this.fireEvent("lineStateChanged", {
				callFeaturesSet: activeCall.callFeaturesSet,
				callId: activeCall.id
			});
		}
	},

	/**
  * The connection to the subscriber has been terminated.
  * @private
  * @param {Terrasoft.Telephony.Call} call Call.
  */
	onCallHangup: function(call) {
		var callId = call.id;
		var consultCall = this.consultCall;
		if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === callId)) {
			if (!Ext.isEmpty(consultCall)) {
				this.activeCall = consultCall;
				this.consultCall = null;
				this.fireEvent("currentCallChanged", this.activeCall);
			} else {
				this.activeCall = null;
			}
		} else if (!Ext.isEmpty(consultCall) && (consultCall.id === callId)) {
			this.consultCall = null;
			//TODO #250399 ######## ######## ###### # ######### (##### Callway ####### Hold/Unhold)
		}
		call.state = Terrasoft.GeneralizedCallState.NONE;
		call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DIAL;
		this.fireEvent("callFinished", call);
		var activeCall = this.activeCall;
		if (!Ext.isEmpty(activeCall)) {
			activeCall.callFeaturesSet = this.connectedCallFeaturesSet;
			this.fireEvent("lineStateChanged", {
				callFeaturesSet: activeCall.callFeaturesSet,
				callId: activeCall.id
			});
		}
	},

	/**
  * The call is put on hold.
  * @private
  * @param {Terrasoft.Telephony.Call} call Call.
  */
	onCallHold: function(call) {
		call.state = Terrasoft.GeneralizedCallState.HOLDED;
		/*jshint bitwise:false */
		call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_UNHOLD |
			Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL;
		/*jshint bitwise:true */
		this.fireEvent("hold", call);
	},

	/**
  * The call is no longer on hold.
  * @private
  * @param {Terrasoft.Telephony.Call} call Call.
  */
	onCallUnhold: function(call) {
		call.state = Terrasoft.GeneralizedCallState.CONNECTED;
		call.callFeaturesSet = this.connectedCallFeaturesSet;
		this.fireEvent("unhold", call);
	},

	/**
  * The operator has changed status.
  * @private
  * @param {String} config.State The status of the statement.
  * @param {String} config.OperatorId The operator's internal number.
  */
	onOperatorState: function(config) {
		this.fireEvent("agentStateChanged", {
			userState: config.State
		});
	},

	//endregion

	//region Methods: Public

	/**
  * The method of initializing the connection.
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.loginMsgService(this.msgUtilServiceUrl + this.loginMethodName, {
			"LicInfoKeys": this.licInfoKeys,
			"UserUId": Terrasoft.SysValue.CURRENT_USER.value
		}, this.connect.bind(this));

	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection
	 */
	closeConnection: function() {
		this.postMessagingCommand(Terrasoft.CtiCommand.CLOSE_CONNECTION);
	},

	/**
  * Authorizes the integration user on the Callway server.
  * @private
  * @param {String} login Login.
  * @param {String} password Password.
  */
	authorize: function(login, password) {
		var commandConfig = {
			Message: "AuthorizationRequest",
			Login: login,
			Password: password
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeCall
	 */
	makeCall: function(targetAddress) {
		if (this.isCallwayClient) {
			this.internalMakeCall(targetAddress);
		} else {
			this.originate(targetAddress);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#answerCall
	 */
	answerCall: function(call) {
		var commandConfig = {
			Message: "Answer",
			UniqueId: call.id,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#holdCall
	 */
	holdCall: function(call) {
		var messageName = (call.state === Terrasoft.GeneralizedCallState.HOLDED) ? "UnHold" : "Hold";
		var commandConfig = {
			Message: messageName,
			UniqueId: call.id,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#dropCall
	 */
	dropCall: function(call) {
		var commandConfig = {
			Message: "Drop",
			UniqueId: call.id,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeConsultCall
	 */
	makeConsultCall: function(call, targetAddress) {
		this.makeCall(targetAddress);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#transferCall
	 */
	transferCall: function() {
		if (Ext.isEmpty(this.activeCall) || Ext.isEmpty(this.consultCall)) {
			throw new Terrasoft.InvalidObjectState();
		}
		var commandConfig = {
			Message: "TransferToCall",
			UniqueIdA: this.activeCall.id,
			UniqueIdB: this.consultCall.id,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
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
		var commandConfig = {
			Message: "Transfer",
			UniqueId: call.id,
			Number: targetAddress,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setUserState
	 */
	setUserState: function(code, callback) {
		var commandConfig = {
			Message: "SetOperatorState",
			State: code,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
		if (Ext.isFunction(callback)) {
			callback.call(this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setWrapUpUserState
	 */
	setWrapUpUserState: function(isWrapUpActive, callback) {
		var busyState = "Busy";
		var readyState = "Available";
		var state = (isWrapUpActive) ? busyState : readyState;
		this.setUserState(state, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryUserState
	 */
	queryUserState: function() {
		this.queryOperatorState();
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#sendDtmf
	 */
	sendDtmf: function(call, digit) {
		var commandConfig = {
			Message: "DialDTMF",
			UniqueId: call.id,
			Digit: digit,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
	},

	/**
  * Listen to the conversation record. The call to the operator's number is initiated and the conversation record is played.
  * @param {String} callId Call id.
  */
	listenCall: function(callId) {
		var commandConfig = {
			Message: "ListenCall",
			UniqueId: callId,
			OperatorId: this.extension
		};
		this.postCallwayMessage(commandConfig);
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
		if (this.isCallwayClient) {
			callCapabilities |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
		}
		/*jshint bitwise:true */
		var agentCapabilities = Terrasoft.AgentFeaturesSet.CAN_WRAP_UP;
		return {
			callCapabilities: callCapabilities,
			agentCapabilities: agentCapabilities
		};
	}

	//endregion

});

//endregion
