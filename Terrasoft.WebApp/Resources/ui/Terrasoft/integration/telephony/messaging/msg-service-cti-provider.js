Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");
Ext.ns("Terrasoft.integration.telephony.messaging");

/**
 * The provider class to the message service
 */
Ext.define("Terrasoft.integration.telephony.messaging.MsgServiceCtiProvider", {
	extend: "Terrasoft.BaseCtiProvider",
	alternateClassName: "Terrasoft.MsgServiceCtiProvider",
	singleton: true,

	/**
	 * Address Terrasoft.Messaging.Service
	 * @type {String}
	 */
	serviceUrl: "",

	/**
	 * Service communication channel.
	 * @type {Terrasoft.WebSocketChannel}
	 */
	serviceChannel: null,

	/**
	 * The identifier of the telephony library
	 * @type {String}
	 */
	libraryInstanceUId: "",

	/**
	 * Connection Id
	 * @type {String}
	 */
	connectionUId: "",

	/**
	 * Internal handler for closing the connection. Initializes an attempt to reconnect to the server
	 * @private
	 */
	channelClosedHandler: function() {
		this.log("Messaging service channel closed");
		this.fireEvent("disconnected", this);
	},

	/**
	 * Message processor from the service
	 * @private
	 * @param {Object} msg The object with the service message
	 */
	processMsg: function(msg) {
		this.fireEvent("rawMessage", msg);
		if (!Ext.isObject(msg) || !Ext.isNumber(msg.eventType)) {
			return;
		}
		var msgEventInfo = Ext.create("Terrasoft.MsgEventInfo", msg);
		if (msgEventInfo.eventType === Terrasoft.MsgEventType.NONE) {
			return;
		}
		var content = msgEventInfo.content;
		var privateData = msgEventInfo.privateData;
		var call;
		switch (msgEventInfo.eventType) {
			case Terrasoft.MsgEventType.LIBRARY_INITIALIZED:
				this.libraryInstanceUId = content;
				this.initializeConnection(this.initialConfig);
				break;
			case Terrasoft.MsgEventType.CONNECTION_CREATED:
				this.connectionUId = msgEventInfo.connectionUId;
				this.fireEvent("initialized", privateData);
				break;
			case Terrasoft.MsgEventType.ERROR:
				this.fireEvent("error", Terrasoft.decode(content), privateData);
				break;
			case Terrasoft.MsgEventType.COMMAND_INFO:
				this.fireEvent("commandExecuted", content, privateData);
				break;
			case Terrasoft.MsgEventType.RING_STARTED:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("callStarted", call, privateData);
				break;
			case Terrasoft.MsgEventType.RING_FINISHED:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("callFinished", call, privateData);
				break;
			case Terrasoft.MsgEventType.COMMUTATION_STARTED:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("commutationStarted", call, privateData);
				break;
			case Terrasoft.MsgEventType.PUT_HOLD_ACTION:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("hold", call, privateData);
				break;
			case Terrasoft.MsgEventType.END_HOLD_ACTION:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("unhold", call, privateData);
				break;
			case Terrasoft.MsgEventType.ACTIVE_CALL_SNAPSHOT:
				this.fireEvent("activeCallSnapshot", Terrasoft.decode(content), privateData);
				break;
			case Terrasoft.MsgEventType.LINE_STATE_CHANGED:
				this.fireEvent("lineStateChanged", Terrasoft.decode(content), privateData);
				break;
			case Terrasoft.MsgEventType.AGENT_STATE_CHANGED:
				this.fireEvent("agentStateChanged", {userState: Terrasoft.decode(content)}, privateData);
				break;
			case Terrasoft.MsgEventType.ABONENT_BUSY:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("callBusy", call, privateData);
				break;
			case Terrasoft.MsgEventType.DISCONNECTED:
				var failureCode = Terrasoft.decode(content);
				this.fireEvent("disconnected", failureCode, privateData);
				break;
			case Terrasoft.MsgEventType.CALL_SAVED_IN_DB:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("callSaved", call, privateData);
				break;
			case Terrasoft.MsgEventType.CALL_INFO_CHANGED:
				call = Ext.create("Terrasoft.integration.telephony.Call", Terrasoft.decode(content));
				this.fireEvent("callInfoChanged", call, privateData);
				break;
			case Terrasoft.MsgEventType.DTMF_ENTERED:
				this.fireEvent("dtmfEntered", Terrasoft.decode(content), privateData);
				break;
			default:
				break;
		}
	},

	/**
	 * Internal handler of the message from source
	 * @private
	 * @param {Object} scope Execution context
	 * @param {String} msg Serialized server message object
	 */
	channelMsgHandler: function(scope, msg) {
		try {
			var jsonMsg = Ext.decode(msg);
			this.processMsg(jsonMsg);
		} catch (catchedException) {
			this.logError("Processing msg exception:" + catchedException);
		}
	},

	/**
	 * Internal handler of the connection open
	 * @private
	 */
	channelOpenedHandler: function() {
		this.log("Messaging service channel created");
		this.initializeLibrary(this.initialConfig);
	},

	/**
	 * Send a call command to the telephony provider
	 * @private
	 * @param {Terrasoft.Telephony.Call} call Call
	 * @param {Terrasoft.CtiCommand} command The telephony command
	 * @param {Object} parameters (optional) Parameters of the telephony command
	 */
	postCallCommand: function(call, command, parameters) {
		var config = {
			commandExecutor: call,
			parameters: parameters
		};
		this.postCommand(command, config);
	},

	/**
	 * Creates the provider object
	 */
	constructor: function() {
		this.callParent(arguments);
		this.serviceChannel = Ext.create("Terrasoft.WebSocketChannel", {
			serviceUrl: this.serviceUrl
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#init
	 * @override
	 */
	init: function(config) {
		this.callParent(arguments);
		var channel = this.serviceChannel;
		channel.serviceUrl = config.msgServiceUrl;
		channel.close();
		channel.init();
		channel.on(Terrasoft.EventName.ON_CONNECTION_INITIALIZED, this.channelOpenedHandler, this);
		channel.on(Terrasoft.EventName.ON_MESSAGE, this.channelMsgHandler, this);
		channel.on(Terrasoft.EventName.ON_CHANNEL_CLOSED, this.channelClosedHandler, this);

	},

	/**
	 * Method for sending a telephony command
	 * For example:
	 * postCommand (Terrasoft.CtiCommand.MAKE_CALL, {
  * commandExecutor: currentCall,
  * parameters: {targetAddress: "1234567"}
  *});
	 * @protected
	 * @abstract
	 * @param {Terrasoft.CtiCommand} command The telephony command
	 * @param {Object} config (optional) Command parameters
	 */
	postCommand: function(command, config) {
		if (this.serviceChannel.getConnectionState() !== Terrasoft.SocketConnectionState.OPEN) {
			var message = Terrasoft.Resources.Telephony.Exception.SocketConnectionChannelIsNotOpened;
			this.logError(message);
			throw new Terrasoft.InvalidObjectState(message);
		}
		config = config || {};
		var msgInfo = Ext.create("Terrasoft.MsgCommandInfo", {
			command: command,
			parameters: config.parameters,
			libraryInstanceUId: this.libraryInstanceUId,
			connectionUId: this.connectionUId,
			commandExecutor: config.commandExecutor
		});
		if (Ext.isObject(config.commandExecutor)) {
			msgInfo.commandExecutorId = config.commandExecutor.id;
			if (Ext.getClassName(config.commandExecutor) === Ext.getClassName(Terrasoft.integration.telephony.Call)) {
				msgInfo.commandExecutorType = Terrasoft.MessagingCommandExecutorType.CALL;
				msgInfo.commandExecutor = config.commandExecutor.serialize();
			}
		}
		var msg = msgInfo.serialize();
		this.serviceChannel.postMessage(msg);
		this.log(msg);
	},

	/**
	 * Integration Library Initialization Method
	 * @param {Object} config Connection Parameters
	 */
	initializeLibrary: function(config) {
		var commandConfig = {
			parameters: {
				"AssemblyName": config.library
			}
		};
		this.postCommand(Terrasoft.CtiCommand.LOAD_LIBRARY, commandConfig);
	},

	/**
	 * Integration Library Initialization Method
	 * @override
	 * @param {Object} config Connection Parameters
	 */
	initializeConnection: function(config) {
		var commandConfig = {
			parameters: {
				"connectionParams": Terrasoft.encode(config.connectionConfig),
				"sessionServiceParams": Terrasoft.encode(config.sessionServiceParams)
			}
		};
		this.postCommand(Terrasoft.CtiCommand.OPEN_CONNECTION, commandConfig);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection
	 */
	closeConnection: function() {
		this.postCommand(Terrasoft.CtiCommand.CLOSE_CONNECTION);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeCall
	 */
	makeCall: function(targetAddress) {
		this.postCommand(Terrasoft.CtiCommand.MAKE_CALL, {
			parameters: {targetAddress: targetAddress}
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#hookup
	 */
	hookup: function() {
		this.postCommand(Terrasoft.CtiCommand.HOOKUP);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#answerCall
	 */
	answerCall: function(call) {
		this.postCallCommand(call, Terrasoft.CtiCommand.ANSWER_CALL);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#holdCall
	 */
	holdCall: function(call) {
		this.postCallCommand(call, Terrasoft.CtiCommand.HOLD_CALL);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#dropCall
	 */
	dropCall: function(call) {
		this.postCallCommand(call, Terrasoft.CtiCommand.DROP_CALL);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setupTransferCall
	 */
	setupTransferCall: function(call) {
		this.postCallCommand(call, Terrasoft.CtiCommand.SETUP_TRANSFER_CALL);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#makeConsultCall
	 */
	makeConsultCall: function(call, targetAddress) {
		this.postCallCommand(call, Terrasoft.CtiCommand.MAKE_CONSULT_CALL, {targetAddress: targetAddress});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#transferCall
	 */
	transferCall: function(call, consultationCall) {
		var serializedConsultationCall = (Ext.getClassName(consultationCall) ===
			Ext.getClassName(Terrasoft.integration.telephony.Call)) ?
			consultationCall.serialize() : Terrasoft.encode(consultationCall);
		this.postCallCommand(call, Terrasoft.CtiCommand.TRANSFER_CALL, {
			consultationCall: serializedConsultationCall
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#cancelTransfer
	 */
	cancelTransfer: function(currentCall, consultCall) {
		var serializedCurrentCall = currentCall.serialize();
		var serializedConsultCall = consultCall.serialize();
		this.postCommand(Terrasoft.CtiCommand.CANCEL_TRANSFER, {
			parameters: {
				currentCall: serializedCurrentCall,
				consultCall: serializedConsultCall
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#blindTransferCall
	 */
	blindTransferCall: function(call, targetAddress) {
		this.postCallCommand(call, Terrasoft.CtiCommand.BLIND_TRANSFER_CALL, {targetAddress: targetAddress});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setDnd
	 */
	setDnd: function() {
		this.postCommand(Terrasoft.CtiCommand.SET_DND);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryLineState
	 */
	queryLineState: function() {
		this.postCommand(Terrasoft.CtiCommand.QUERY_LINE_STATE);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryActiveCallSnapshot
	 */
	queryActiveCallSnapshot: function() {
		this.postCommand(Terrasoft.CtiCommand.QUERY_ACTIVE_CALL_SNAPSHOT);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setUserState
	 */
	setUserState: function(code, reason, callback) {
		var parameters = {
			code: code,
			reason: reason || ""
		};
		this.postCommand(Terrasoft.CtiCommand.SET_MSG_USER_STATE, {
			parameters: parameters
		});
		if (Ext.isFunction(callback)) {
			callback.call(this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setWrapUpUserState
	 */
	setWrapUpUserState: function(isWrapUpActive, callback) {
		this.postCommand(Terrasoft.CtiCommand.SET_WRAP_UP_USER_STATE, {
			parameters: {isWrapUpActive: isWrapUpActive}
		});
		if (Ext.isFunction(callback)) {
			callback.call(this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryUserState
	 */
	queryUserState: function() {
		this.postCommand(Terrasoft.CtiCommand.QUERY_MSG_USER_STATE);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#sendDtmf
	 */
	sendDtmf: function(call, digits) {
		this.postCallCommand(call, Terrasoft.CtiCommand.SEND_DTMF, {digits: digits});
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#getCapabilities
	 */
	getCapabilities: function() {
		////TODO #263641 ### ####### ########## Messaging Service ########### ########### ######### ######## ##########

		/*jshint bitwise:false */
		var callCapabilities = Terrasoft.CallFeaturesSet.CAN_RECALL | Terrasoft.CallFeaturesSet.CAN_DIAL |
			Terrasoft.CallFeaturesSet.CAN_DROP | Terrasoft.CallFeaturesSet.CAN_ANSWER |
			Terrasoft.CallFeaturesSet.CAN_HOLD | Terrasoft.CallFeaturesSet.CAN_UNHOLD |
			Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER |
			Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
			Terrasoft.CallFeaturesSet.CAN_DTMF;
		/*jshint bitwise:true */
		var agentCapabilities = Terrasoft.AgentFeaturesSet.CAN_WRAP_UP;
		return {
			callCapabilities: callCapabilities,
			agentCapabilities: agentCapabilities
		};
	}

});