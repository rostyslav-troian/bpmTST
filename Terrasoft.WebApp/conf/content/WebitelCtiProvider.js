Terrasoft.configuration.Structures["WebitelCtiProvider"] = {innerHierarchyStack: ["WebitelCtiProvider"]};
define("WebitelCtiProvider", ["ext-base", "terrasoft", "WebitelCtiProviderResources", "ServiceHelper",
		"WebitelModuleHelper"],
	function(Ext, Terrasoft, resources, ServiceHelper, WebitelModuleHelper) {
		Ext.ns("Terrasoft.integration");
		Ext.ns("Terrasoft.integration.telephony");
		Ext.ns("Terrasoft.integration.telephony.webitel");

		/**
		 * @class Terrasoft.integration.telephony.webitel.WebitelCtiProvider
		 * Class of Webitel provider.
		 */
		Ext.define("Terrasoft.integration.telephony.webitel.WebitelCtiProvider", {
			extend: "Terrasoft.BaseCtiProvider",
			alternateClassName: "Terrasoft.WebitelCtiProvider",
			singleton: true,

			// region Properties: Private

			/**
			 * Device identifier.
			 * @type {String}
			 */
			deviceId: "",

			/**
			 * Is connection to the telephony established.
			 * @type {Boolean}
			 */
			isConnected: false,

			/**
			 * Amount of connection attempts.
			 * @type {Number}
			 */
			connectionAttemptsCount: 5,

			/**
			 * Active call.
			 * @type {Terrasoft.Telephony.Call}
			 */
			activeCall: null,

			/**
			 * Regular expression that checks if string is http(s) link.
			 * @type {RegExp}
			 */
			httpRegExp: new RegExp("^http(s{0,1})://"),

			/**
			 * Sign that indicates that the end SIP device has an ability to accept the call.
			 * @type {Boolean}
			 */
			isSipAutoAnswerHeaderSupported: true,

			/**
			 * Use Web phone.
			 * @type {Boolean}
			 */
			useWebPhone: true,

			/**
			 * Use sound notification on incoming call.
			 * @type {Boolean}
			 */
			useNotificationSound: true,

			/**
			 * Sign that indicates should video be used.
			 * @type {Boolean}
			 */
			useVideo: false,

			/**
			 * Debugging mode.
			 * @type {Boolean}
			 */
			debugMode: false,

			/**
			 * Video displaying parameters.
			 * @type {Object}
			 */
			videoParams: {
				/** The minimum resolution width. */
				"minWidth": 320,
				/** The maximum resolution width. */
				"maxWidth": 1280,
				/** The minimal resolution height. */
				"minHeight": 180,
				/** The maximum resolution height. */
				"maxHeight": 720,
				/** The minimum frame rate. */
				"minFrameRate": 10,
				/** The maximum frame rate. */
				"maxFrameRate": 30
			},

			/**
			 * Consult call number.
			 * @type {String}
			 */
			consultCallNumber: null,

			/*jshint bitwise:false */
			/**
			 * List of available features after connecting.
			 * @type {Number}
			 */
			connectedCallFeaturesSet: Terrasoft.CallFeaturesSet.CAN_HOLD |
			Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
			Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER | Terrasoft.CallFeaturesSet.CAN_DROP |
			Terrasoft.CallFeaturesSet.CAN_DTMF,
			/*jshint bitwise:true */

			/**
			 * Webitel object.
			 * @type {Object}
			 */
			webitel: {},

			// endregion

			// region Properties: Protected

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#licInfoKeys
			 * @overridden
			 */
			licInfoKeys: ["WebitelCollaboration.Use"],

			/**
			 * Url to get incoming call notification file from system settings.
			 * @type {String}
			 */
			notificationSoundUrl: "/terrasoft.axd?s=nui-binary-syssetting&r=IncomingCallRingtone",

			// endregion

			// region Methods: Private

			/**
			 * Establishes connection with Webitel server.
			 * @param {Object} config Configuration of connection parameters.
			 * @private
			 */
			connect: function(config) {
				if (this.webitel && this.isConnected) {
					return;
				}
				Terrasoft.SysSettings.querySysSettings(["webitelConnectionString", "webitelWebrtcConnectionString"],
					function(settings) {
						config.url = config.webitelConnectionString || settings.webitelConnectionString;
						config.domain = WebitelModuleHelper.getHostName();
						config.webRtcServer = settings.webitelWebrtcConnectionString;
						var callback = function(responseObject) {
							require(["WebitelModule"], function() {
								var connection = responseObject.GetUserConnectionResult;
								var login = config.login || connection.login;
								if (!login) {
									this.logError(resources.localizableStrings.SettingsMissedMessage);
									return;
								}
								config.login = login + "@" + config.domain;
								config.password = config.password || connection.password;
								if (config.useWebPhone !== false) {
									require(["WebitelVerto"], function() {
										this.onConnected(config);
									}.bind(this));
								} else {
									this.onConnected(config);
								}
							}.bind(this));
						}.bind(this);
						var callConfig = {
							serviceName: "WUserConnectionService",
							methodName: "GetUserConnection",
							data: {
								userId: Terrasoft.SysValue.CURRENT_USER_CONTACT.value
							},
							callback: callback
						};
						ServiceHelper.callService(callConfig);
					}, this
				);
			},

			/**
			 * Processes devices absence error.
			 */
			processDevicesNotFoundError: function() {
				var message = this.useVideo
					? resources.localizableStrings.VideoDeviceNotFoundMessage
					: resources.localizableStrings.AudioDeviceNotFoundMessage;
				Terrasoft.utils.showInformation(message);
			},

			/**
			 * Processes call numbers information.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 * @param {Terrasoft.integration.telephony.Call} call Bpm'online call object.
			 */
			processCallNumbersInformation: function(webitelCall, call) {
				var isCallInfoChanged = false;
				var calledId = webitelCall.calleeNumber;
				if (call.calledId !== calledId){
					call.calledId = calledId;
					isCallInfoChanged = true;
				}
				var callerId = webitelCall.callerNumber;
				if (call.callerId !== callerId){
					call.callerId = callerId;
					isCallInfoChanged = true;
				}
				if (isCallInfoChanged) {
					this.fireEvent("callInfoChanged", call);
				}
			},

			/**
			 * Connection event handler.
			 * @private
			 */
			onConnect: function() {
				this.fireEvent("rawMessage", "Connected");
			},

			/**
			 * Success authorisation handler.
			 * @private
			 * @param {Object} status Current status of user.
			 */
			onUserLogin: Ext.emptyFn,

			/**
			 * Disconnection handler.
			 * @private
			 */
			onDisconnect: function() {
				this.isConnected = false;
				this.fireEvent("rawMessage", "Disconnected");
				this.fireEvent("disconnected", "Disconnected");
			},

			/**
			 * Webitel error handler.
			 * @param {Object} args Error data.
			 */
			onError: function(args) {
				this.log("======================================= Error =====================================");
				this.fireEvent("error", args);
				if ((args.errorType === Ext.global.WebitelErrorTypes.Call) &&
						(args.message === "DevicesNotFoundError")) {
					this.processDevicesNotFoundError();
				}
			},

			/**
			 * User status change handler.
			 * @param {Object} agent Users object.
			 */
			onUserStatusChange: function(agent) {
				if (agent.id !== this.deviceId) {
					return;
				}
				var agentState;
				if (!agent.online) {
					agentState = Ext.global.WebitelAccountStatusTypes.Unregistered;
					this.isConnected = false;
					if (!this.activeCall) {
						this.fireEvent("disconnected", "Offline");
					}
				} else {
					agentState = agent.state;
					if (!this.isConnected && (agentState !== Ext.global.WebitelAccountStatusTypes.Unregistered)) {
						this.isConnected = true;
						this.fireEvent("initialized", this);
					}
					var away = agent.away;
					if ((!Ext.isEmpty(away) && (away !== Ext.global.WebitelUserAwayCauseTypes.None))) {
						agentState = away;
					}
				}
				this.fireEvent("agentStateChanged", {userState: agentState});
			},

			/**
			 * New call event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onNewCall: function(webitelCall) {
				var callId = webitelCall.uuid;
				var activeCall = this.activeCall;
				var isConsultCall = !Ext.isEmpty(activeCall);
				var isIncomingCall = (webitelCall.direction === Ext.global.WebitelCallDirectionTypes.Inbound);
				if (activeCall && (this.consultCall || isIncomingCall)) {
					if (this.debugMode) {
						this.log("Hangup on new call: {0}", Ext.encode(webitelCall));
					}
					this.webitel.hangup(webitelCall.uuid, "USER_BUSY");
					return;
				}
				var call = Ext.create("Terrasoft.integration.telephony.Call");
				call.id = callId;
				call.direction = this.getDirection(webitelCall);
				call.deviceId = this.deviceId;
				call.calledId =  webitelCall.calleeNumber;
				call.callerId = webitelCall.callerNumber;
				call.otherLegUUID = webitelCall["other-leg-unique-id"];
				call.ctiProvider = this;
				call.timeStamp = new Date();
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
				call.state = Terrasoft.GeneralizedCallState.ALERTING;
				if (isConsultCall) {
					this.consultCall = call;
					activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_NOTHING;
					this.fireEvent("lineStateChanged", {
						callFeaturesSet: activeCall.callFeaturesSet,
						callId: activeCall.id
					});
				} else {
					/*jshint bitwise:false */
					call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP;
					if (call.direction === Terrasoft.CallDirection.IN &&
						(this.isSipAutoAnswerHeaderSupported || this.useWebPhone)) {
						call.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_ANSWER;
					}
					/*jshint bitwise:true */
					this.activeCall = call;
				}
				this.updateDbCall(call, this.onUpdateDbCall);
				this.fireEvent("callStarted", call);
				this.fireEvent("lineStateChanged", {
					callFeaturesSet: call.callFeaturesSet,
					callId: call.id
				});
				this.fireEvent("agentStateChanged", {userState: Ext.global.WebitelAccountStatusTypes.Busy});
			},

			/**
			 * Hangup event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onHangup: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				var callId = currentCall.id;
				if (this.consultCall && webitelCall.transferResult === "confirmed") {
					this.activeCall.redirectionId = this.consultCall.callerId;
					this.activeCall.redirectingId = this.consultCall.calledId;
				}
				var call;
				if (Ext.isEmpty(callId)) {
					call = this.activeCall;
					this.activeCall = null;
				} else {
					if (!Ext.isEmpty(this.activeCall) && this.activeCall.id === callId) {
						call = this.activeCall;
						this.activeCall = null;
					} else if (!Ext.isEmpty(this.consultCall) && this.consultCall.id === callId) {
						call = this.consultCall;
						this.consultCall = null;
						this.fireEvent("currentCallChanged", this.activeCall);
					}
				}
				if (Ext.isEmpty(call)) {
					this.fireEvent("lineStateChanged", {callFeaturesSet: Terrasoft.CallFeaturesSet.CAN_DIAL});
					return;
				}
				call.oldState = call.state;
				call.state = Terrasoft.GeneralizedCallState.NONE;
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DIAL;
				this.fireEvent("callFinished", call);
				if (!Ext.isEmpty(this.activeCall)) {
					var uuid = (this.activeCall.NewUUID) ? this.activeCall.NewUUID : this.activeCall.id;
					if (this.activeCall.state === Terrasoft.GeneralizedCallState.HOLDED) {
						this.webitel.unhold(uuid);
					}
				} else {
					if (!Ext.isEmpty(this.consultCall)) {
						this.activeCall = this.consultCall;
						this.consultCall = null;
						this.fireEvent("currentCallChanged", this.activeCall);
					} else {
						this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
					}
				}
				this.updateDbCall(call, this.onUpdateDbCall);
				if (call.NewUUID) {
					this.updateCallId(call.id, call.NewUUID);
				}
				if (!this.isConnected && !this.activeCall) {
					this.fireEvent("disconnected", "Acitve call finished after disconnect");
				}
			},

			/**
			 * Call accept event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onAcceptCall: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				var callId = currentCall.id;
				var call;
				var activeCallExists = !Ext.isEmpty(this.activeCall);
				if (activeCallExists && this.activeCall.id === callId) {
					call = this.activeCall;
				} else if (!Ext.isEmpty(this.consultCall) && this.consultCall.id === callId) {
					call = this.consultCall;
				}
				if (Ext.isEmpty(call)) {
					return;
				}
				/*jshint bitwise:false */
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_DROP |
					Terrasoft.CallFeaturesSet.CAN_HOLD |
					Terrasoft.CallFeaturesSet.CAN_DTMF;
				/*jshint bitwise:true */
				call.oldState = call.state;
				call.state = Terrasoft.GeneralizedCallState.CONNECTED;
				if (call.oldState === Terrasoft.GeneralizedCallState.ALERTING) {
					this.fireEvent("commutationStarted", call);
				}
				if (activeCallExists) {
					this.fireEvent("lineStateChanged", {callFeaturesSet: this.activeCall.callFeaturesSet});
				}
				this.updateDbCall(call, this.onUpdateDbCall);
			},

			/**
			 * Subscriber connection establishing event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call.
			 */
			onBridgeCall: function(webitelCall) {
				var activeCall = this.activeCall;
				if (!activeCall) {
					return;
				}
				var call = this.findCallById(webitelCall.uuid);
				if (!call) {
					return;
				}
				call.direction = this.getDirection(webitelCall);
				call.calledId =  webitelCall.calleeNumber;
				call.callerId = webitelCall.callerNumber;
				this.fireEvent("callInfoChanged", call);
				if (activeCall.id === call.id) {
					/*jshint bitwise:false */
					activeCall.callFeaturesSet |= Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
						Terrasoft.CallFeaturesSet.CAN_BLIND_TRANSFER;
					/*jshint bitwise:true */
					this.processCallNumbersInformation(webitelCall, activeCall);
				} else if (this.consultCall && this.consultCall.id === call.id) {
					activeCall.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_COMPLETE_TRANSFER;
				} else {
					return;
				}
				this.fireEvent("lineStateChanged", {callFeaturesSet: activeCall.callFeaturesSet});
			},

			/**
			 * On hold event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onHold: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				this.fireEvent("rawMessage", "onHoldStateChange: " + Terrasoft.encode("hold"));
				var call = this.findCallById(webitelCall.uuid);
				if (Ext.isEmpty(call)) {
					var message = "Holded activeCall is empty";
					this.logError("onHoldStateChange: {0}", message);
					return;
				}
				call.state = Terrasoft.GeneralizedCallState.HOLDED;
				this.activeCall.state = Terrasoft.GeneralizedCallState.HOLDED;
				/*jshint bitwise:false */
				call.callFeaturesSet = Terrasoft.CallFeaturesSet.CAN_UNHOLD |
				Terrasoft.CallFeaturesSet.CAN_MAKE_CONSULT_CALL |
				Terrasoft.CallFeaturesSet.CAN_DTMF;
				/*jshint bitwise:true */
				this.fireEvent("hold", call);
				this.updateDbCall(call, this.onUpdateDbCall);
				this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
			},

			/**
			 * On unhold event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call.
			 */
			onUnhold: function(webitelCall) {
				var currentCall = this.findCallById(webitelCall.uuid);
				if (!currentCall) {
					return;
				}
				this.fireEvent("rawMessage", "onHoldStateChange: " + Terrasoft.encode("hold"));
				var call = this.findCallById(webitelCall.uuid);
				if (Ext.isEmpty(call)) {
					var message = "Holded activeCall is empty";
					this.logError("onHoldStateChange: {0}", message);
					return;
				}
				call.state = Terrasoft.GeneralizedCallState.CONNECTED;
				call.callFeaturesSet = this.connectedCallFeaturesSet;
				this.fireEvent("unhold", call);
				this.updateDbCall(call, this.onUpdateDbCall);
				this.fireEvent("lineStateChanged", {callFeaturesSet: call.callFeaturesSet});
			},

			/**
			 * Call identifier change event handler.
			 * @private
			 * @param {Object} config Changed data.
			 */
			onUuidCall: function(config) {
				var call = this.findCallById(config.call.uuid);
				if (call) {
					this.updateCallId(call.id, config.newId);
				}
			},

			/**
			 * Browser call event handler.
			 * @private
			 * @param {Object} session Call session.
			 */
			onWebitelWebRTCCall: function(session) {
				if (session.getDirection() === "incoming") {
					session.answer(this.useVideo);
				}
			},

			/**
			 * DTMF dialing event handler.
			 * @private
			 * @param {Object} config DTMF dialing configuration.
			 */
			onDtmfCall: function(config) {
				this.log("---------------- ON DTMF CALL ------------------", true);
				this.log(config.digits, true);
				this.fireEvent("dtmfEntered", config.digits);
				this.log("-----------------------------------------------", true);
			},

			/**
			 * Call record start event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onStartRecordCall: function(webitelCall) {
				this.log("---------------- ON RECORD START CALL ------------------", true);
				this.log(webitelCall, true);
				this.log("-----------------------------------------------", true);
			},

			/**
			 * Call record stop event handler.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 */
			onStopRecordCall: function(webitelCall) {
				this.log("---------------- ON RECORD STOP CALL ------------------", true);
				this.log(webitelCall, true);
				this.log("-----------------------------------------------", true);
			},

			/**
			 * New webRTC session event handler.
			 * @private
			 * @param {Object} session webRtc session parameters.
			 */
			onNewWebRTCCall: function(session) {
				var config = {};
				this.fireEvent("webRtcStarted", session.callID, config);
				if (config.mediaElementId) {
					session.params.tag = config.mediaElementId;
				}
			},

			/**
			 * Start of video stream of webRtc session event handler.
			 * @param {Object} session webRtc session parameters.
			 */
			onVideoWebRTCCall: function(session) {
				if (!this.useVideo) {
					return;
				}
				this.fireEvent("webRtcVideoStarted", session.callID);
			},

			/**
			 * WebRTC session end event handler.
			 * @private
			 * @param {Object} session Stream parameters.
			 */
			onDestroyWebRTCCall: function(session) {
				this.fireEvent("webRtcDestroyed", session.callID);
			},

			/**
			 * Subscription to Webitel events.
			 * @private
			 */
			subscribeEvents: function() {
				var events = [
					{
						eventName: "onUserStatusChange",
						eventHandler: this.onUserStatusChange
					},
					{
						eventName: "onNewCall",
						eventHandler: this.onNewCall
					},
					{
						eventName: "onHangupCall",
						eventHandler: this.onHangup
					},
					{
						eventName: "onAcceptCall",
						eventHandler: this.onAcceptCall
					},
					{
						eventName: "onHoldCall",
						eventHandler: this.onHold
					},
					{
						eventName: "onUnholdCall",
						eventHandler: this.onUnhold
					},
					{
						eventName: "onBridgeCall",
						eventHandler: this.onBridgeCall
					},
					{
						eventName: "onUnBridgeCall",
						eventHandler: Terrasoft.emptyFn
					},
					{
						eventName: "onUuidCall",
						eventHandler: this.onUuidCall
					},
					{
						eventName: "onWebitelWebRTCCall",
						eventHandler: this.onWebitelWebRTCCall
					},
					{
						eventName: "onDtmfCall",
						eventHandler: this.onDtmfCall
					},
					{
						eventName: "onStartRecordCall",
						eventHandler: this.onStartRecordCall
					},
					{
						eventName: "onStopRecordCall",
						eventHandler: this.onStopRecordCall
					},
					{
						eventName: "onConnect",
						eventHandler: this.onConnect
					},
					{
						eventName: "onUserLogin",
						eventHandler: this.onUserLogin
					},
					{
						eventName: "onDisconnect",
						eventHandler: this.onDisconnect
					},
					{
						eventName: "onError",
						eventHandler: this.onError
					},
					{
						eventName: "onNewWebRTCCall",
						eventHandler: this.onNewWebRTCCall
					},
					{
						eventName: "onVideoWebRTCCall",
						eventHandler: this.onVideoWebRTCCall
					},
					{
						eventName: "onDestroyWebRTCCall",
						eventHandler: this.onDestroyWebRTCCall
					}
				];
				Terrasoft.each(events, function(event) {
					this.webitel[event.eventName](event.eventHandler.bind(this));
				}, this);
			},

			/**
			 * Telephony connection event handler.
			 * @private
			 * @param {Object} config Connection parameters.
			 */
			onConnected: function(config) {
				this.isSipAutoAnswerHeaderSupported = (config.isSipAutoAnswerHeaderSupported !== false);
				this.webitel = {};
				this.useWebPhone = Ext.isBoolean(config.useWebPhone) ? config.useWebPhone : true;
				this.useNotificationSound = Ext.isBoolean(config.useNotificationSound)
					? config.useNotificationSound
					: true;
				var webitelConfig = {
					server: config.url,
					account: config.login,
					secret: config.password,
					reconnect: this.connectionAttemptsCount,
					debug: config.debugMode || false,
					webrtc: false
				};
				this.useVideo = config.useVideo;
				if (this.useWebPhone) {
					webitelConfig.webrtc = {
						/*jshint camelcase:false */
						ws_servers: config.webRtcServer,
						/*jshint camelcase:true */
						login: config.login,
						webitelNumber: config.login.toString().split("@")[0],
						password: config.password,
						/*jshint camelcase:false */
						stun_servers: [],
						/*jshint camelcase:true */
						videoParams: this.videoParams
					};
					if (this.useNotificationSound) {
						webitelConfig.vertoRecordFile = Terrasoft.workspaceBaseUrl + this.notificationSoundUrl;
					}
				}
				this.webitel = new Ext.global.Webitel(webitelConfig);
				Ext.global.webitel = this.webitel;
				this.deviceId = config.login.toString().split("@")[0];
				this.isAutoLogin = config.isAutoLogin;
				this.debugMode = config.debugMode;
				this.webitel.ctiProvider = this;
				this.subscribeEvents();
				try {
					if (this.isAutoLogin) {
						this.webitel.connect();
					}
				} catch (e) {
					this.onConnectError({
						errorCode: e.message,
						errorMessage: e.message
					});
				}
			},

			/**
			 * Update call in the database event handler.
			 * @private
			 * @param {Object} request Request.
			 * @param {Boolean} success Sign of successful request.
			 * @param {Object} response Response.
			 */
			onUpdateDbCall: function(request, success, response) {
				var callDatabaseUid = Terrasoft.decode(response.responseText);
				if (success && Terrasoft.isGUID(callDatabaseUid)) {
					var call = Terrasoft.decode(request.jsonData);
					if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === call.id ||
						this.activeCall.NewUUID === call.id)) {
						call = this.activeCall;
					} else if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === call.id ||
						this.consultCall.NewUUID === call.id)) {
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
			 * Telephony connection error event handler.
			 * @private
			 * @param {Object} err Object, containing error description.
			 */
			onConnectError: function(err) {
				this.fireEvent("rawMessage", "onConnectError: " + Terrasoft.encode(err));
			},

			/**
			 * Performs call search by its identifier.
			 * @private
			 * @param {String} callId Call identifier.
			 * @returns {Terrasoft.Telephony.Call} Found call.
			 */
			findCallById: function(callId) {
				if (!Ext.isEmpty(this.consultCall) && (this.consultCall.id === callId ||
					this.consultCall.NewUUID === callId)) {
					return this.consultCall;
				} else if (!Ext.isEmpty(this.activeCall) && (this.activeCall.id === callId ||
					this.activeCall.NewUUID === callId)) {
					return this.activeCall;
				}
				return null;
			},

			/**
			 * Returns call direction.
			 * @private
			 * @param {Object} webitelCall Webitel call object.
			 * @returns {Terrasoft.CallDirection} Call direction identifier.
			 */
			getDirection: function(webitelCall) {
				return (webitelCall.direction === Ext.global.WebitelCallDirectionTypes.Inbound)
					? Terrasoft.CallDirection.IN
					: Terrasoft.CallDirection.OUT;
			},

			/**
			 * Updates call identifier in database.
			 * @private
			 * @param {String} callId Current identifier of the call.
			 * @param {String} newCallId New identifier of the call.
			 */
			updateCallId: function(callId, newCallId) {
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "Call"
				});
				update.setParameterValue("IntegrationId", newCallId, 1);
				update.filters.add("IntegrationId", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IntegrationId", callId));
				update.execute();
			},

			/**
			 * Returns sign that indicates possibility to use video for call.
			 * @param {String} opponentNumber Subscriber's number.
			 */
			getCanUseVideo: function(opponentNumber) {
				if (!this.useVideo) {
					return false;
				}
				return !(Ext.isString(opponentNumber) && Terrasoft.SysValue && Terrasoft.SysValue.CTI &&
					(opponentNumber.length > Terrasoft.SysValue.CTI.internalNumberLength));
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#reConnect
			 */
			reConnect: function() {
				if (this.webitel && !this.isConnected) {
					this.webitel.connect();
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#init
			 */
			init: function() {
				this.callParent(arguments);
				this.loginMsgService(this.msgUtilServiceUrl + this.loginMethodName, {
					"LicInfoKeys": this.licInfoKeys,
					"UserUId": Terrasoft.SysValue.CURRENT_USER.value
				}, this.connect.bind(this));
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#queryCallRecords
			 */
			queryCallRecords: function(callId, callback) {
				this.webitel.getRecordFileFromUUID(callId, function(result) {
					var response = result.response;
					if (!this.httpRegExp.test(response)) {
						this.logError(response);
						return;
					}
					callback([response]);
				}.bind(this));
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#makeCall
			 */
			makeCall: function(number) {
				var useVideo = this.getCanUseVideo(number);
				try {
					this.webitel.call(number, useVideo);
				} catch (e) {
					this.logError(e.message);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#answerCall
			 */
			answerCall: function(call) {
				var useVideo = this.getCanUseVideo(call.getAbonentNumber());
				this.webitel.answer(call.id, useVideo);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#dropCall
			 */
			dropCall: function(call) {
				this.webitel.hangup(call.id);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#makeConsultCall
			 */
			makeConsultCall: function(call, targetAddress) {
				if (call.state === Terrasoft.GeneralizedCallState.HOLDED) {
					this.webitel.attendedTransfer(call.id, targetAddress);
				} else {
					this.webitel.hold(call.id, function() {
						this.webitel.attendedTransfer(call.id, targetAddress);
					}.bind(this));
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#cancelTransfer
			 */
			cancelTransfer: function(currentCall, consultCall) {
				this.webitel.cancelTransfer(currentCall.id, consultCall.id);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#transferCall
			 */
			transferCall: function(currentCall, consultCall) {
				this.webitel.bridgeTransfer(currentCall.id, consultCall.id);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#holdCall
			 */
			holdCall: function(call) {
				this.webitel.toggleHold(call.id);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#blindTransferCall
			 */
			blindTransferCall: function(call, targetAddress) {
				var activeCall = this.activeCall;
				activeCall.redirectingId = activeCall.deviceId;
				activeCall.redirectionId = targetAddress;
				this.updateDbCall(activeCall, this.onUpdateDbCall);
				this.webitel.transfer(call.id, targetAddress);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#queryLineState
			 */
			queryLineState: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#queryActiveCallSnapshot
			 */
			queryActiveCallSnapshot: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#setUserState
			 * @param {String} code Status code.
			 * @param {String} reason (optional) The reason for the status change.
			 * @param {Object} callback (optional) Callback function.
			 * @param {Boolean} disableReconnect (optional) Do not perform the re-authorization attempt.
			 */
			setUserState: function(code, reason, callback, disableReconnect) {
				code = code ? code.toUpperCase() : "";
				if (!this.isConnected && (code !== Ext.global.WebitelAccountStatusTypes.Unregistered)) {
					if (disableReconnect) {
						if (callback) {
							callback();
							return;
						}
					}
					this.webitel.login(function() {
						this.setUserState(code, reason, callback, true);
					}.bind(this));
					return;
				}
				switch (code) {
					case Ext.global.WebitelAccountStatusTypes.Unregistered:
						if (!this.activeCall) {
							this.webitel.logout();
						}
						if (callback) {
							callback();
						}
						break;
					case Ext.global.WebitelAccountStatusTypes.Ready:
						this.webitel.ready(callback);
						break;
					default:
						this.webitel.busy(code, reason, callback);
						break;
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#queryUserState
			 */
			queryUserState: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#changeCallCentreState
			 */
			changeCallCentreState: Terrasoft.emptyFn,

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
				if (this.useVideo) {
					callCapabilities |= Terrasoft.CallFeaturesSet.CAN_VIDEO;
				}
				/*jshint bitwise:true */
				return {
					callCapabilities: callCapabilities,
					agentCapabilities: Terrasoft.AgentFeaturesSet.CAN_GET_CALL_RECORDS
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#sendDtmf
			 */
			sendDtmf: function(call, digit) {
				this.webitel.dtmf(call.id, digit);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#setVideoState
			 */
			setVideoState: function(call, isVideoActive, callback) {
				var videoAction = isVideoActive ? "on" : "off";
				this.webitel.setMuteVideo(call.id, videoAction);
				callback(isVideoActive);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCtiProvider#closeConnection
			 */
			closeConnection: function() {
				this.webitel.disconnect();
			}

			//endregion

		});
	}
);


