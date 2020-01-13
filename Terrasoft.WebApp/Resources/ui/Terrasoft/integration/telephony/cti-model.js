Ext.ns("Terrasoft.integration");
Ext.ns("Terrasoft.integration.telephony");

//region Class: CtiModel

/**
 * Telephone line model object.
 */
Ext.define("Terrasoft.integration.telephony.CtiModel", {
	extend: "Terrasoft.BaseModel",
	alternateClassName: "Terrasoft.CtiModel",
	singleton: true,

	//region Properties: Private

	/**
  * The name of the method for retrieving phone integration settings.
  * @private
  * @type {String}
  */
	configGetterMethodName: "GetTelephonyConfig",

	//endregion

	//region Properties: Public

	/**
  * Phone integration function provider.
  * @type {Terrasoft.BaseCtiProvider}
  */
	ctiProvider: null,

	/**
  * Active calls operated by a telephone line.
  * @type {Terrasoft.Collection}
  */
	activeCalls: null,

	/**
  * Number of reconnection attempts.
  * @type {Number}
  */
	reconnectTryCount: 0,

	/**
  * Maximum number of reconnection attempts.
  * @type {Number}
  */
	maxReconnectTryCount: 200,

	/**
  * Id of the reconnection timer.
  * @type {Number}
  */
	reConnectTimerId: 0,

	/**
  * Columns.
  * @type {Object}
  */
	columns: {
		/**
   * Line status (set of available operations). See the enumeration {@link Terrasoft.CallFeaturesSet}.
   * @type {Number}
   */
		LineFeatures: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.INTEGER
		},
		/**
   * The basic call of the model.
   * @type {Terrasoft.Telephony.Call}
   */
		CurrentCall: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
		},
		/**
   * The last basic call of the model.
   * @type {Terrasoft.Telephony.Call}
   */
		LastCall: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
		},
		/**
   * The number of the main call subscriber.
   * @type {String}
   */
		CurrentCallNumber: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.TEXT
		},
		/**
   * Consultant call number.
   * @type {String}
   */
		ConsultCallNumber: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.TEXT
		},
		/**
   * Operator state code.
   * @type {String}
   */
		AgentState: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.TEXT
		},
		/**
   * Operator state reason code.
   * @type {String}
   */
		AgentStateReason: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.TEXT
		},
		/**
   * Indicates active connection to the phone integration.
   * @type {Boolean}
   */
		IsConnected: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN
		},
		/**
   * Indicates consultation call status.
   * @type {Boolean}
   */
		IsConsulting: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN
		},
		/**
   * Indicates that the agent is in the Call center mode.
   * @type {Boolean}
   */
		IsCallCentreActive: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN
		}
	},

	//endregion

	//region Methods: Private

	/**
  * Subscribes the model for cti-provider events.
  * @private
  */
	subscribeOnCtiProviderEvents: function() {
		var ctiProvider = this.ctiProvider;
		ctiProvider.on("initialized", this.onProviderInitialized, this);
		ctiProvider.on("disconnected", this.onProviderDisconnected, this);
		ctiProvider.on("callStarted", this.onProviderCallStarted, this);
		ctiProvider.on("callFinished", this.onProviderCallFinished, this);
		ctiProvider.on("commutationStarted", this.onProviderCommutationStarted, this);
		ctiProvider.on("callBusy", this.onProviderCallBusy, this);
		ctiProvider.on("hold", this.onProviderCallHold, this);
		ctiProvider.on("unhold", this.onProviderCallUnhold, this);
		ctiProvider.on("error", this.onProviderError, this);
		ctiProvider.on("lineStateChanged", this.onLineStateChanged, this);
		ctiProvider.on("agentStateChanged", this.onAgentStateChanged, this);
		ctiProvider.on("activeCallSnapshot", this.onActiveCallSnapshot, this);
		ctiProvider.on("callSaved", this.onCallSaved, this);
		ctiProvider.on("rawMessage", this.onProviderRawMsg, this);
		ctiProvider.on("currentCallChanged", this.onProviderCurrentCallChanged, this);
		ctiProvider.on("callCentreStateChanged", this.onProviderCallCentreStateChanged, this);
		ctiProvider.on("callInfoChanged", this.onProviderCallInfoChanged, this);
		ctiProvider.on("dtmfEntered", this.onProviderDtmfEntered, this);
		ctiProvider.on("webRtcStarted", this.onProviderWebRtcStarted, this);
		ctiProvider.on("webRtcVideoStarted", this.onProviderWebRtcVideoStarted, this);
		ctiProvider.on("webRtcDestroyed", this.onProviderWebRtcDestroyed, this);
	},

	/**
  * Get the caller's number by call.
  * @private
  * @param call {Terrasoft.Telephony.Call} Call.
  */
	getOpponentNumber: function(call) {
		return (call.direction === Terrasoft.CallDirection.IN) ? call.callerId : call.calledId;
	},

	/**
  * Update the model columns when updating the properties of the primary call.
  * @private
  * @param propertyName {String} Name of the call property.
  * @param propertyValue {Object} New value for the call property.
  */
	updateStateByCallProperty: function(propertyName, propertyValue) {
		var callDirection = this.get("CurrentCall").direction;
		switch (propertyName) {
			case "callFeaturesSet":
				this.set("LineFeatures", propertyValue);
				break;
			case "callerId":
				if (callDirection === Terrasoft.CallDirection.IN) {
					this.set("CurrentCallNumber", propertyValue);
				}
				break;
			case "calledId":
				if (callDirection === Terrasoft.CallDirection.OUT) {
					this.set("CurrentCallNumber", propertyValue);
				}
				break;
			default:
				break;
		}
	},

	/**
  * Update call properties that have changed compared to the new portion of the call.
  * @private
  * @param call {Terrasoft.integration.telephony.Call} A call that requires an update.
  * @param newCall {Terrasoft.integration.telephony.Call} A call coming from the phone integration provider.
  * @param needUpdateViewModel {Boolean} Indicates that the model columns must be updated.
  */
	updateCallProperties: function(call, newCall, needUpdateViewModel) {
		Terrasoft.each(newCall, function(element, index) {
			if (element !== call[index]) {
				call[index] = element;
				if (needUpdateViewModel) {
					this.updateStateByCallProperty(index, element);
				}
			}
		}, this);
	},

	/**
  * Update model properties for a consulting call.
  * @private
  * @param {Terrasoft.integration.telephony.Call} consultCall A call coming from a telephony provider.
  */
	updateConsultCallModelProperties: function(consultCall) {
		var opponentNumber = this.getOpponentNumber(consultCall);
		if (opponentNumber !== this.get("ConsultCallNumber")) {
			this.set("ConsultCallNumber", opponentNumber);
		}
	},

	/**
  * Update the main call.
  * @private
  * @param call {Terrasoft.integration.telephony.Call} A call coming from the phone integration provider.
  * @return {Terrasoft.integration.telephony.Call} Call from the collection of active calls.
  */
	updateCurrentCall: function(call) {
		var activeCall = this.activeCalls.find(call.id);
		var isNewCall = false;
		if (Ext.isEmpty(activeCall)) {
			activeCall = _.clone(call);
			activeCall.ctiProvider = this.ctiProvider;
			this.activeCalls.add(activeCall.id, activeCall);
			isNewCall = true;
		} else {
		}
		var currentCall = this.get("CurrentCall");
		if (!Ext.isObject(currentCall)) {
			this.set("CurrentCall", activeCall);
			this.set("LastCall", activeCall);
		} else {
			var isCurrentCall = (activeCall.id === currentCall.id);
			this.updateCallProperties(activeCall, call, isCurrentCall);
			if (!isCurrentCall) {
				if (isNewCall) {
					activeCall.parentCall = currentCall;
				}
				this.updateConsultCallModelProperties(activeCall);
			}
		}
		return activeCall;
	},

	/**
  * Check that the current call exists.
  * @private
  * @param currentCall {Terrasoft.integration.telephony.Call} The current call.
  */
	checkCurrentCallExists: function(currentCall) {
		if (Ext.isEmpty(currentCall)) {
			throw new Terrasoft.InvalidOperationException({
				message: Terrasoft.Resources.Telephony.Exception.CurrentCallNotExistsException
			});
		}
	},

	/**
  * Proxies the arguments of the provider event to the Cti-model event.
  * @private
  * @param {String} eventName The Cti-model event..
  * @param {Object} eventArguments Parameters of the provider event.
  */
	proxyEventArguments: function(eventName, eventArguments) {
		var args = Array.prototype.slice.call(eventArguments, 0);
		var eventArgs = [eventName].concat(args);
		this.safeFireEvent.apply(this, eventArgs);
	},

	/**
  * Generates an event similar to fireEvent, but handler exceptions are passed as an error event.
  * @private
  * @param {String} eventName Event.
  */
	safeFireEvent: function(eventName) {
		try {
			this.fireEventArgs(eventName, Array.prototype.slice.call(arguments, 1));
		} catch (e) {
			var errorInfo = {
				internalErrorCode: null,
				data: e.message,
				source: e.stack,
				errorType: Terrasoft.MsgErrorType.EVENT_HANDLER_ERROR
			};
			this.fireEvent("error", errorInfo);
			this.ctiProvider.logError("'{0}' event handler exception. {1}", eventName, e.message);
		}
	},

	/**
  * Updates the main call and proxy the arguments of the provider event to the Cti-model event.
  * @private
  * @param {String} eventName The Cti-model event.
  * @param {Object} eventArguments Parameters of the provider event.
  */
	processCallEvent: function(eventName, eventArguments) {
		var args = Array.prototype.slice.call(eventArguments, 0);
		var call = args[0];
		var activeCall = this.updateCurrentCall(call);
		args[0] = activeCall;
		this.proxyEventArguments(eventName, args);
	},

	/**
	 * Invokes reconnection timer.
	 * @private
	 */
	setReconnectTimer: function() {
		if ((this.reConnectTimerId === 0) && (this.reconnectTryCount < this.maxReconnectTryCount)) {
			var timerInterval = this.getReconnectTimerInterval(this.reconnectTryCount);
			this.log("Reconnect timer is set. Next reconnect will start after " + timerInterval + " seconds.");
			this.reConnectTimerId = setTimeout(this.onReconnectTimer.bind(this), timerInterval * 1000);
		}
	},

	/**
	 * Resets reconnection parameters.
	 * @private
	 */
	resetReconnectTimer: function() {
		this.reConnectTimerId = 0;
		this.reconnectTryCount = 0;
	},

	/**
	 * Handles provider event {@link Terrasoft.BaseCtiProvider#event-initialized}.
	 * @private
	 */
	onProviderInitialized: function() {
		this.set("IsConnected", true);
		this.proxyEventArguments("connected", arguments);
		if (this.activeCalls.getCount() === 0) {
			// TODO ######### ######### ###### ### ########## ####### ##### ######### ##### ############# ########

			this.set("LineFeatures", Terrasoft.CallFeaturesSet.CAN_DIAL);
		}
		this.ctiProvider.queryActiveCallSnapshot();
		this.resetReconnectTimer();
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-disconnected}.
  * @private
  */
	onProviderDisconnected: function() {
		this.set("IsConnected", false);
		this.proxyEventArguments("disconnected", arguments);
		this.set("LineFeatures", Terrasoft.CallFeaturesSet.CAN_NOTHING);
		this.activeCalls.clear();
		var args = arguments[1];
		if (Ext.isEmpty(args) || !args.ignoreTryReconnection) {
			this.setReconnectTimer();
		}
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callStarted}.
  * @private
  */
	onProviderCallStarted: function() {
		this.processCallEvent("callStarted", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callFinished}.
  * @private
  */
	onProviderCallFinished: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		var call = args[0];
		var activeCall = this.updateCurrentCall(call);
		args[0] = activeCall;
		this.activeCalls.remove(activeCall);
		// TODO ######## ######## ######, #### ### ######### ######## ######

		// TODO ########, ########## ######## ## ###### ###### ## ######### activeCalls, ## ## #####?

		this.proxyEventArguments("callFinished", args);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-commutationStarted}.
  * @private
  */
	onProviderCommutationStarted: function() {
		this.processCallEvent("commutationStarted", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callBusy}.
  * @private
  */
	onProviderCallBusy: function() {
		this.processCallEvent("callBusy", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#hold}
  * @private
  */
	onProviderCallHold: function() {
		this.processCallEvent("hold", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-unhold}.
  * @private
  */
	onProviderCallUnhold: function() {
		this.processCallEvent("unhold", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-error}.
  * @private
  */
	onProviderError: function(config) {
		if (config.data) {
			this.ctiProvider.logError(config.data);
		}
		this.proxyEventArguments("error", arguments);
		var isConnectError = (config.errorType === Terrasoft.MsgErrorType.OPEN_CONNECTION_ERROR) ||
			(config.errorType === Terrasoft.MsgErrorType.CALL_CENTRE_NOT_AVAILABLE_ERROR);
		if (isConnectError) {
			this.setReconnectTimer();
		}
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-activeCallSnapshot}.
  * @private
  */
	onActiveCallSnapshot: function(config) {
		this.activeCalls.clear();
		var activeCalls = config.ActiveCalls;
		var currentCall = (config.CurrentCall) ? Ext.create("Terrasoft.Telephony.Call", config.CurrentCall) : null;
		if (activeCalls) {
			Terrasoft.each(activeCalls, function(call) {
				var activeCall = Ext.create("Terrasoft.Telephony.Call", call);
				if (currentCall && call.id !== currentCall.id) {
					activeCall.parentCall = currentCall;
				}
				activeCall.ctiProvider = this.ctiProvider;
				this.activeCalls.add(activeCall.id, activeCall);
			}, this);
		}
		if (currentCall) {
			this.updateCurrentCall(currentCall);
		}
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callSaved}.
  * @private
  */
	onCallSaved: function(call) {
		this.ctiProvider.log("callSaved. id = {0}, databaseId = {1}", call.id, call.databaseUId);
		call.isSavedInDB = true;
		var activeCall = this.activeCalls.find(call.id);
		if (!Ext.isEmpty(activeCall)) {
			activeCall.isSavedInDB = true;
			activeCall.databaseUId = call.databaseUId;
		}
		this.proxyEventArguments("callSaved", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-rawMessage}.
  * @private
  */
	onProviderRawMsg: function(msg) {
		this.ctiProvider.log(Terrasoft.encode(msg));
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-currentCallChanged}.
  * @private
  */
	onProviderCurrentCallChanged: function(currentCall) {
		this.ctiProvider.log("currentCallChanged. id = {0}", currentCall.id);
		var activeCall = this.activeCalls.find(currentCall.id);
		if (Ext.isEmpty(activeCall)) {
			this.ctiProvider.logError("currentCallChanged. Call with id {0} was not found", currentCall.id);
			return;
		}
		this.set("CurrentCall", activeCall);
		this.set("LastCall", activeCall);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callCentreStateChanged}.
  * @private
  */
	onProviderCallCentreStateChanged: function(isActive) {
		var isCurrentCallCentreStatusActive = this.get("IsCallCentreActive");
		if (isActive !== isCurrentCallCentreStatusActive) {
			this.set("IsCallCentreActive", isActive);
		}
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-callInfoChanged}.
  * @private
  */
	onProviderCallInfoChanged: function(call) {
		var databaseUId = call.databaseUId;
		var activeCall = null;
		var activeCalls = this.activeCalls;
		activeCalls.each(function(item) {
			if (item.databaseUId === databaseUId) {
				activeCall = item;
				return false;
			}
			return true;
		}, this);
		if (Ext.isEmpty(activeCall)) {
			this.ctiProvider.logError("callInfoChanged. Call with databaseUId {0} was not found", databaseUId);
			return;
		}
		var newCallId = call.id;
		activeCall.id = newCallId;
		activeCalls.suspendEvents();
		try {
			activeCalls.remove(activeCall);
			activeCalls.add(newCallId, activeCall);
		} finally {
			activeCalls.resumeEvents();
		}
		this.updateCurrentCall(call);
	},

	/**
  * Triggers when the current call of the model changes (property CurrentCall).
  * @private
  * @param model {Backbone.Model} The model.
  * @param call {Terrasoft.integration.telephony.Call} The current call.
  */
	onCurrentCallChanged: function(model, call) {
		if (Ext.isEmpty(call)) {
			this.set("CurrentCallNumber", "");
			return;
		}
		Terrasoft.each(call, function(element, index) {
			this.updateStateByCallProperty(index, element);
		}, this);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-lineStateChanged}.
  * @private
  */
	onLineStateChanged: function(config) {
		if (!Ext.isObject(config)) {
			return;
		}
		var activeCall;
		var lineFeaturesSet = config.callFeaturesSet;
		if (!Ext.isEmpty(config.callId)) {
			activeCall = this.activeCalls.find(config.callId);
			if (Ext.isObject(activeCall)) {
				activeCall.callFeaturesSet = lineFeaturesSet;
			}
		} else {
			// if no callId is passed - then the state of the line of the current call is specified

			this.set("LineFeatures", lineFeaturesSet);
			this.ctiProvider.log("LineFeatures = {0}", lineFeaturesSet);
			return;
		}
		var currentCall = this.get("CurrentCall");
		if (Ext.isEmpty(currentCall) || (Ext.isObject(activeCall) && (activeCall.id === currentCall.id))) {
			this.set("LineFeatures", lineFeaturesSet);
		}
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-agentStateChanged}.
  * @private
  */
	onAgentStateChanged: function(agentStateData) {
		this.set("AgentState", agentStateData.userState);
		this.set("AgentStateReason", agentStateData.userStateReasonCode);
	},

	/**
  * Triggers when you add a new call to the active list.
  * @private
  */
	onActiveCallAdded: function() {
		var consultCall = this.findConsultCall();
		if (consultCall) {
			this.set("IsConsulting", true);
		}
	},

	/**
  * Trggers when you delete a call from the active list.
  * @private
  */
	onActiveCallRemoved: function() {
		var activeCallsCount = this.activeCalls.getCount();
		if (activeCallsCount === 0) {
			this.set("CurrentCall", null);
		} else if (activeCallsCount < 2) {
			this.set("IsConsulting", false);
			this.set("ConsultCallNumber", "");
			if (activeCallsCount === 1)  {
				var activeCall = this.activeCalls.getByIndex(0);
				this.set("LastCall", activeCall);
				this.set("CurrentCall", activeCall);
			}
		}
	},

	/**
  * Triggers when you clear the active calls list.
  * @private
  */
	onActiveCallsCleared: function() {
		this.set("IsConsulting", false);
		this.set("CurrentCall", null);
	},

	/**
  * Triggers on the DTMF dialing event.{@link Terrasoft.BaseCtiProvider#event-dtmfEntered}.
  * @private
  */
	onProviderDtmfEntered: function() {
		this.proxyEventArguments("dtmfEntered", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-webRtcStarted}.
  * @private
  */
	onProviderWebRtcStarted: function() {
		this.proxyEventArguments("webRtcStarted", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-webRtcVideoStarted}.
  * @private
  */
	onProviderWebRtcVideoStarted: function() {
		this.proxyEventArguments("webRtcVideoStarted", arguments);
	},

	/**
  * Processes the provider event {@link Terrasoft.BaseCtiProvider#event-webRtcDestroy}.
  * @private
  */
	onProviderWebRtcDestroyed: function() {
		this.proxyEventArguments("webRtcDestroyed", arguments);
	},

	/**
  * Handles the reconnection timer event.
  * @private
  */
	onReconnectTimer: function() {
		this.reConnectTimerId = 0;
		this.reconnectTryCount++;
		this.ctiProvider.reConnect();
	},

	//endregion

	//region Methods: Protected

	/**
  * Gets the reconnection timer interval.
  * @protected
  * @param {Number} reconnectCount Number of reconnections.
  * @return {Number} Reconnection interval in seconds.
  */
	getReconnectTimerInterval: function(reconnectCount) {
		return Math.round(5 + 2 * 180 / Math.PI * Math.atan(5 * reconnectCount * Math.PI / 180));
	},

	/**
  * Find a consulting call.
  * @protected
  * @return {Terrasoft.integration.telephony.Call} Consultation call from the collection of active calls.
  */
	findConsultCall: function() {
		var currentCall = this.get("CurrentCall");
		if (!Ext.isObject(currentCall)) {
			return null;
		}
		var consultCall = null;
		this.activeCalls.each(function(element) {
			// TODO ######## ############## ####### ### ########### ####, ### ###### - ################

			if (element.id !== currentCall.id) {
				consultCall = element;
				return false;
			}
			return true;
		});
		return consultCall;
	},

	//endregion

	//region Methods: Public

	/**
  * Creates a line model object.
  */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event disconnected
			 * Triggered when the connection with the telephony provider is lost.
			 */
			"disconnected",

			/**
    * @event connected
    * Triggers when a connection is established with the phone integration provider.
    */
			"connected",

			/**
    * @event callStarted
    * Triggers when you start a new call.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"callStarted",

			/**
    * @event callBusy
    * Triggers when the call is transferred Busy.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"callBusy",

			/**
    * @event commutationStarted
    * The bell rings after the connection is established.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"commutationStarted",

			/**
    * @event hold
    * Triggers after the call is put on hold.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"hold",

			/**
    * @event unhold
    * Triggers after the call is lifted from the hold.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"unhold",

			/**
    * @event callFinished
    * Triggers after the end of the call.
    * @param {Terrasoft.integration.telephony.Call} call
    */
			"callFinished",

			/**
    * @event error
    * It works when an error occurs.
    * @param {Object} config Error parameters.
    * @param {Terrasoft.MsgErrorType} config.errorType Error type
    * @param {String} config.internalErrorCode Error code.
    * @param {String} config.data Error text.
    * @param {String} config.source Error source.
    */
			"error",

			/**
    * @event callSaved
    * Triggers after creating / updating a call in the database.
    * @param {Terrasoft.Telephony.Call} call
    */
			"callSaved",

			/**
    * @event dtmfEntered
    * Triggers on the DTMF dialing event.
    * @param {String} dtmfDigit The character pressed when the DTMF dials.
    */
			"dtmfEntered",

			/**
			 * @event webRtcStarted
			 * @inheritdoc Terrasoft.BaseCtiProvider#event-webRtcStarted
			 */
			"webRtcStarted",

			/**
			 * @event webRtcVideoStarted
			 * @inheritdoc Terrasoft.BaseCtiProvider#event-webRtcVideoStarted
			 */
			"webRtcVideoStarted",

			/**
			 * @event webRtcDestroyed
			 * @inheritdoc Terrasoft.BaseCtiProvider#event-webRtcDestroyed
			 */
			"webRtcDestroyed"
		);
		this.activeCalls = Ext.create("Terrasoft.Collection");
		this.activeCalls.on("add", this.onActiveCallAdded, this);
		this.activeCalls.on("remove", this.onActiveCallRemoved, this);
		this.activeCalls.on("clear", this.onActiveCallsCleared, this);
		this.on("change:CurrentCall", this.onCurrentCallChanged, this);
	},

	/**
  * Initializes the model object.
  * @param {Object} config Configuration object.
  */
	init: function(config) {
		if (!Ext.isObject(config)) {
			return;
		}
		this.loadFromColumnValues(config.values, config.rowConfig);
		Ext.apply(this, config.methods);
		this.ctiProvider = config.ctiProvider;
	},

	/**
  * The method of initializing the connection.
  * @param {Object} [config] Connection parameters.
  * @param {Function} [callback] The function success flag is passed to the function and
  * error object in case of failure.
  * @param {Boolean} [callback.isSuccess] Indicates the success of the operation.
  * @param {Object} [callback.error] The error object.
  */
	connect: function(config, callback) {
		if (!Ext.isEmpty(config)) {
			this.subscribeOnCtiProviderEvents();
			this.ctiProvider.init(config);
			if (callback) {
				callback(true);
			}
			return;
		}
		Terrasoft.ServiceProvider.executeRequest(this.configGetterMethodName, "", function(response) {
			if (!response.success) {
				this.log(response);
				var connectionErrorInfo = {
					internalErrorCode: 13001,
					data: "Connection Failed",
					source: "CTI Model",
					errorType: Terrasoft.MsgErrorType.CONNECTION_CONFIG_ERROR
				};
				this.safeFireEvent("error", connectionErrorInfo);
				if (callback) {
					callback(false, connectionErrorInfo);
				}
			}
			var connectionConfig = {};
			if (response.connectionConfig) {
				connectionConfig = Terrasoft.decode(response.connectionConfig);
			}
			if (connectionConfig.disableCallCentre) {
				if (callback) {
					callback(false);
				}
				return;
			}
			this.log(response);
			config = {
				msgServiceUrl: response.msgServerAddress,
				library: response.assemblyName,
				connectionConfig: connectionConfig,
				sessionServiceParams: {
					UserUId: Terrasoft.SysValue.CURRENT_USER.value,
					UserContactUId: Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
					ServiceUrl: Terrasoft.workspaceBaseUrl
				}
			};
			this.subscribeOnCtiProviderEvents();
			this.ctiProvider.init(config);
			if (callback) {
				callback(true);
			}
		}, this);
	},

	/**
  * Make a call to the specified number.
  * @param {String} targetAddress Number to dial.
  */
	makeCall: function(targetAddress) {
		this.ctiProvider.log("makeCall({0})", targetAddress);
		if (Ext.isEmpty(targetAddress)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "targetAddress"
			});
		}
		this.ctiProvider.makeCall(targetAddress);
	},

	/**
  * Answer the current call.
  */
	answerCall: function() {
		this.ctiProvider.log("answerCall()");
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		currentCall.answer();
	},

	/**
  * End the current call.
  */
	dropCall: function() {
		this.ctiProvider.log("dropCall()");
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		currentCall.drop();
	},

	/**
  * Put the current call on hold or remove it from hold.

  */
	holdOrUnholdCall: function() {
		this.ctiProvider.log("holdOrUnholdCall()");
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		currentCall.hold();
	},

	/**
  * Make a consultation call to the specified number.
  * @param {String} targetAddress Phone number to dial.
  */
	makeConsultCall: function(targetAddress) {
		if (Ext.isEmpty(targetAddress)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "ConsultCallNumber"
			});
		}
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		this.ctiProvider.log("makeConsultCall({0})", targetAddress);
		currentCall.makeConsultCall(targetAddress);
	},

	/**
  * End the transfer of the current call.
  */
	transferCall: function() {
		var consultCall = this.findConsultCall();
		if (Ext.isEmpty(consultCall)) {
			throw new Terrasoft.InvalidOperationException({
				message: Terrasoft.Resources.Telephony.Exception.ConsultCallNotExistsException
			});
		}
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		this.ctiProvider.log("transfer(), consultCallId = {0}", consultCall.id);
		currentCall.transfer(consultCall);
	},

	/**
  * Cancel the transfer of the current call.
  */
	cancelTransfer: function() {
		var consultCall = this.findConsultCall();
		if (Ext.isEmpty(consultCall)) {
			throw new Terrasoft.InvalidOperationException({
				message: Terrasoft.Resources.Telephony.Exception.ConsultCallNotExistsException
			});
		}
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		this.ctiProvider.log("cancelTransfer(), consultCallId = {0}, currentCallId = {1}", consultCall.id,
			currentCall.id);
		this.ctiProvider.cancelTransfer(currentCall, consultCall);
	},

	/**
  * Translate the call unconditionally.
  * @param {String} targetAddress Phone number to transfer.
  */
	blindTransferCall: function(targetAddress) {
		this.ctiProvider.log("blindTransferCall(), targetAddress = {0}", targetAddress);
		if (Ext.isEmpty(targetAddress)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "ConsultCallNumber"
			});
		}
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		currentCall.blindTransfer(targetAddress);
	},

	/**
  * Send the current DTmf signal.
  * If the characters are successfully sent, the {@link Terrasoft.BaseCtiProvider # event-dtmfEntered} event will be received.
  * @param {String} digit Signal symbols.
  */
	sendDtmf: function(digit) {
		var currentCall = this.get("CurrentCall");
		this.checkCurrentCallExists(currentCall);
		this.ctiProvider.log("sendDtmf(), digit = {0}", digit);
		currentCall.sendDtmf(digit);
	},

	/**
  * Mutes current call.
  */
	mute: function() {
		var currentCall = this.get("CurrentCall");
		this.ctiProvider.log("mute(), currentCallId = {0}", currentCall.id);
		this.ctiProvider.mute(currentCall);
	},

	/**
  * Update the LineFeatures line status flags.
  */
	queryLineState: function() {
		this.ctiProvider.log("queryLineState()");
		this.ctiProvider.queryLineState();
	},

	/**
  * Request the status of the agent.
  */
	queryAgentState: function() {
		this.ctiProvider.log("queryAgentState()");
		this.ctiProvider.queryUserState();
	},

	/**
  * Set agent status.
  * @param {String} code Status code.
  * @param {String} reason (optional) The cause of the state change.
  * @param {Object} callback (optional) Callback function.
  */
	setAgentState: function(code, reason, callback) {
		var agentState = code || this.get("AgentState");
		var agentStateReason = reason || this.get("AgentStateReason");
		this.ctiProvider.log("setAgentState(), agentState = {0}", agentState);
		if (Ext.isEmpty(agentState)) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "AgentState"
			});
		}
		this.ctiProvider.setUserState(agentState, agentStateReason, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setWrapUpUserState
	 */
	setWrapUpUserState: function(isWrapUpActive, callback) {
		this.ctiProvider.setWrapUpUserState(isWrapUpActive, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#setVideoState
	 */
	setVideoState: function(call, isVideoActive, callback) {
		this.ctiProvider.setVideoState(call, isVideoActive, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#queryCallRecords
	 */
	queryCallRecords: function(callId, callback) {
		this.ctiProvider.queryCallRecords(callId, callback);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#changeCallCentreState
	 */
	changeCallCentreState: function(isActive) {
		this.ctiProvider.changeCallCentreState(isActive);
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#getCapabilities
	 */
	getProviderCapabilities: function() {
		var providerCapabilities = this.ctiProvider.getCapabilities();
		return providerCapabilities;
	},

	/**
	 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection
	 */
	closeConnection: function() {
		this.ctiProvider.log("closeConnection()");
		this.ctiProvider.closeConnection();
	},

	/*jshint bitwise:false */
	/**
  * Gets the ability to make a call at the current line state.
  * @return {Boolean}
  */
	getCanCall: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DIAL) !== 0;
	},

	/**
  * Gets the ability to answer the call.
  * @return {Boolean}
  */
	getCanAnswer: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_ANSWER) !== 0;
	},

	/**
  * Gets the ability to put or remove the main call.
  * @return {Boolean}
  */
	getCanHoldOrUnhold: function() {
		var features = this.get("LineFeatures");
		return ((features & Terrasoft.CallFeaturesSet.CAN_HOLD) !== 0 ||
				(features & Terrasoft.CallFeaturesSet.CAN_UNHOLD) !== 0);
	},

	/**
  * Gets the ability to put the main call on hold.
  * @return {Boolean}
  */
	getCanHold: function() {
		var features = this.get("LineFeatures");
		return ((features & Terrasoft.CallFeaturesSet.CAN_HOLD) !== 0);
	},

	/**
  * Gets the ability to mute the call.
  * @return {Boolean}
  */
	getCanMute: function() {
		var features = this.get("LineFeatures");
		return ((features & Terrasoft.CallFeaturesSet.CAN_MUTE) !== 0);
	},

	/**
  * @return {Boolean} Gets the ability to release the main call.
  */
	getCanUnhold: function() {
		var features = this.get("LineFeatures");
		return ((features & Terrasoft.CallFeaturesSet.CAN_UNHOLD) !== 0);
	},

	/**
  * Gets the option to end the call.
  * @return {Boolean}
  */
	getCanDrop: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
	},

	/**
  * Gets the opportunity to begin preparation for the transfer of the call.
  * @return {Boolean}
  */
	getCanSetupTransfer: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_SETUP_TRANSFER) !== 0;
	},

	/**
  * Gets the opportunity to make a consulting call.
  * @return {Boolean}
  */
	getCanMakeConsultCall: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL) !== 0;
	},

	/**
  * Gets the ability to end a call transfer.
  * @return {Boolean}
  */
	getCanTransfer: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER) !== 0;
	},

	/**
  * Gets the ability to cancel the transfer of a call.
  * @return {Boolean}
  */
	getCanCancelTransfer: function() {
		var canCompleteTransfer = (this.get("LineFeatures") &
			Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER) !== 0;
		var result = canCompleteTransfer || this.get("IsConsulting");
		return result;
	},

	/**
  * Gets the ability of an unconditional transfer of a call.
  * @return {Boolean}
  */
	getCanBlindTransfer: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER) !== 0;
	},

	/**
  * Gets the opportunity to make a consultation call or a blind translation.
  * @return {Boolean}
  */
	getCanMakeConsultCallOrBlindTransfer: function() {
		var result = this.getCanMakeConsultCall() || this.getCanBlindTransfer();
		return result;
	},

	/**
  * Gets the ability to send a Dtmf signal.
  * @return {Boolean}
  */
	getCanDtmf: function() {
		return (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DTMF) !== 0;
	},

	/**
  * Gets the ability to receive call records.
  * @return {Boolean} Returns true if you can receive call records, otherwise false.
  */
	getCanGetCallRecords: function() {
		var providerCapabilities = this.getProviderCapabilities();
		if (Ext.isEmpty(providerCapabilities) || Ext.isEmpty(providerCapabilities.agentCapabilities)) {
			return false;
		}
		return (providerCapabilities.agentCapabilities & Terrasoft.AgentFeaturesSet.CAN_GET_CALL_RECORDS) !== 0;
	},

	/**
  * @return {String} gets the number of the last subscriber.
  */
	getLastAbonentNumber: function() {
		var lastCall = this.get("LastCall");
		if (lastCall) {
			if (lastCall.parentCall) {
				return lastCall.parentCall.getAbonentNumber();
			} else {
				return lastCall.getAbonentNumber();
			}
		}
		return "";
	}
	/*jshint bitwise:true */

	//endregion

});

//endregion
