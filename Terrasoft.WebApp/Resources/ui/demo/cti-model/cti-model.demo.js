requirejs.config({
	paths: {
		oktell: "demo/cti-model/oktell",
		jquery: "demo/cti-model/jquery-1.9.1",
		jabberwerx: "demo/cti-model/jabberwerx",
		finesse: "demo/cti-model/finesse",
		x2js: "demo/cti-model/xml2json"
	},
	shim: {
		oktell: {
			exports: "Oktell"
		},
		jquery: {
			exports: "Jquery"
		},
		jabberwerx: {
			exports: "Jabberwerx"
		},
		x2js: {
			exports: "x2js"
		},
		finesse: {
			exports: "Finesse"
		}
	}
});
define(["ext-base", "terrasoft", "cti-model", "msg-service-cti-provider", "oktell-cti-provider", "oktell",
	"callway-cti-provider", "finesse-cti-provider", "jquery", "jabberwerx", "finesse", "x2js"],
		function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			var ctiModel = {};

			function prepareCtiProviders(comboBox) {
				var debugMode = false;
				var loggerType = Terrasoft.LoggerType.CLIENT;
				var ctiProviders = {
					"oktell": Terrasoft.OktellCtiProvider,
					"callway": Terrasoft.CallwayCtiProvider,
					"infinity": Terrasoft.MsgServiceCtiProvider,
					"ctios": Terrasoft.MsgServiceCtiProvider,
					"finesse": Terrasoft.FinesseCtiProvider
				};
				var ctiProviderConfigsList = new Terrasoft.Collection();
				ctiProviderConfigsList.add("oktell", {
					value: "oktell",
					displayValue: "Oktell",
					defaultConfig: {
						connectionConfig : {
							url : "ws://tsoktell2:4066",
							login: "A.Repko",
							password: "A.Repko",
							debugMode: debugMode,
							loggerType: loggerType,
							isSipAutoAnswerHeaderSupported: true,
							isOperator: true
						}
					}
				});
				ctiProviderConfigsList.add("callway", {
					value: "callway",
					displayValue: "Callway",
					defaultConfig: {
						msgServiceUrl : "ws://localhost:2013",
						connectionConfig : {
							operatorId : "210",
							isCallwayClient: true,
							routingRule: "local",
							ringBackCallerId: "asterisk",
							debugMode: debugMode,
							loggerType: loggerType
						}
					}
				});
				ctiProviderConfigsList.add("infinity", {
					value: "infinity",
					displayValue: "Infinity",
					defaultConfig: {
						msgServiceUrl : "ws://localhost:2013",
						library : "Terrasoft.Messaging.Infinity.InfinityConnectionFactory, " +
							"Terrasoft.Messaging.Infinity",
						connectionConfig : {
							Line : "323",
							Password : "",
							ConnectionString : "10.0.7.205:10020",
							ConnectionTimeout : 0,
							debugMode: debugMode,
							loggerType: loggerType
						},
						sessionServiceParams: {}
					}
				});
				ctiProviderConfigsList.add("ctios", {
					value: "ctios",
					displayValue: "Cisco Enteprise (CtiOs)",
					defaultConfig: {
						msgServiceUrl : "ws://localhost:2013",
						library : "Terrasoft.Messaging.Ctios.CtiosConnectionFactory, Terrasoft.Messaging.Ctios",
						connectionConfig : {
							CtiosA : "172.27.58.11", //"10.202.255.7"
							PortA : 42028,
							CtiosB : "172.27.58.11",
							PortB : 42028,
							Login: "8001",//8888
							Password: "87654321", //12345
							Instrument: "7802", //1020
							PeripheralID: 5000,
							loggerType: loggerType
						},
						sessionServiceParams: {}
					}
				});
				ctiProviderConfigsList.add("finesse", {
					value: "finesse",
					displayValue: "Cisco Finesse",
					defaultConfig: {
						msgServiceUrl : "ws://localhost:2013",
						connectionConfig : {
							Domain : "pcce-finesse1a.halykbank.nb",
							AgentID : "8001",
							Password : "87654321",
							Extension : "7802"
						},
						sessionServiceParams: {}
					}
				});
				comboBox.on("prepareList", function() {
					comboBox.loadList(ctiProviderConfigsList);
				});
				comboBox.on("change", function(value) {
					ctiModel.model.set("IsCisco", value && value.value === "ctios");
					if (Ext.isEmpty(value)) {
						return;
					}
					ctiModel.model.ctiProvider = ctiProviders[value.value];
					var initConfigText = Terrasoft.encode(value.defaultConfig);
					ctiModel.model.set("InitConfigText", initConfigText);
				});
				comboBox.setValue(ctiProviderConfigsList.get("finesse"));
			}

			function prepareModel() {
				window.Terrasoft.AjaxProvider.request = function(config) {
					var callback = config.callback;
					if (Ext.isFunction(callback)) {
						callback.call(config.scope, config, true, {
							responseText: "\"7e50fab1-b599-4b89-a9d6-9d53a027b9bb\"",
							status: 200
						});
					}
				};
				var model = window.model = ctiModel.model = Terrasoft.CtiModel;
				model.init({
					values: {
						CurrentCallNumber: "",
						ConsultCallNumber: "",
						LogValue: "",
						InitConfigText: "",
						IsConsulting: false,
						CallId: "",
						Digit: "",
						IsCisco: false
					},
					methods: {
						getInitConfig: function() {
							var initConfigText = this.get("InitConfigText");
							return Terrasoft.decode(initConfigText);
						},
						createConnection: function() {
							this.on("connected", this.onConnected, this);
							model.on("change:IsConnected", function(model, value) {
								var message = Ext.String.format("IsConnected = {0}", value);
								var logValue = model.get("LogValue") + message + "\n";
								model.set("LogValue", logValue);
								Ext.global.console.log(message);
							});
							this.on("callStarted", this.onCallStarted, this);
							this.on("callFinished", this.onCallFinished, this);
							this.on("error", this.onError, this);
							this.ctiProvider.on("rawMessage", this.onRawMsg, this);
							this.ctiProvider.on("dtmfEntered", this.onDtmfEntered, this);
							this.ctiProvider.on("callInfoChanged", this.onCallInfoChanged, this);
							var connectionConfig = this.getInitConfig();
							this.connect(connectionConfig);
						},
						onConnected: function() {
							var logValue = this.get("LogValue") + "Connected\n";
							this.set("LogValue", logValue);
							Ext.global.console.log("Connected");
							model.queryAgentState();
						},
						onRawMsg: function(data) {
							var logValue = this.get("LogValue") + Ext.String.format("RawMessage: '{0}'\n",
								Terrasoft.encode(data));
							this.set("LogValue", logValue);
						},
						onError: function(config) {
							var logValue = this.get("LogValue") + Ext.String.format("Error: '{0}'\n",
								Terrasoft.encode(config));
							this.set("LogValue", logValue);
							Ext.global.console.log(config);
						},
						onCallStarted: function(call) {
							var message = Ext.String.format("Call started. Call = {0}", call.serialize());
							var logValue = this.get("LogValue") + message + "\n";
							this.set("LogValue", logValue);
							this.ctiProvider.log(message);
						},
						onCallFinished: function(call) {
							var message = Ext.String.format("Call finished. Call = {0}", call.serialize());
							var logValue = this.get("LogValue") + message + "\n";
							this.set("LogValue", logValue);
							this.ctiProvider.log(message);
						},
						dial: function() {
							this.makeCall(this.get("CurrentCallNumber"));
						},
						execMakeConsultCall: function() {
							var targetAddress = this.get("ConsultCallNumber");
							this.makeConsultCall(targetAddress);
						},
						execBlindTransferCall: function() {
							var targetAddress = this.get("ConsultCallNumber");
							this.blindTransferCall(targetAddress);
						},
						setWrapUp: function() {
							this.setWrapUpUserState(true);
						},
						unsetWrapUp: function() {
							this.setWrapUpUserState(false);
						},
						getOktellLog: function() {
							var oktellLog = this.ctiProvider.getLog();
							var logValue = this.get("LogValue") + oktellLog + "\n";
							this.set("LogValue", logValue);
						},
						getRecordLinks: function() {
							var callId = this.get("CallId");
							this.ctiProvider.getRecordLinks(callId, function(links) {
								var message = Ext.encode(links);
								var logValue = this.get("LogValue") + message + "\n";
								this.set("LogValue", logValue);
								this.ctiProvider.log(message);
							}, this);
						},
						listenCall: function() {
							var callId = this.get("CallId");
							this.ctiProvider.listenCall(callId);
						},
						execSendDtmf: function() {
							var digit = this.get("DtmfDigit");
							this.sendDtmf(digit);
						},
						onDtmfEntered: function(digits) {
							var oldDigits = this.get("DtmfDigitsSent");
							this.set("DtmfDigitsSent", oldDigits + digits);
						},
						onCallInfoChanged: function(call, privateData) {
							if (Ext.isEmpty(privateData)) {
								return;
							}
							var logValue = this.get("LogValue") +
								Ext.String.format("CallInfoChanged. PrivateData = {0}\n",
									Terrasoft.encode(privateData));
							this.set("LogValue", logValue);
						},
						getCallCentreStateText: function() {
							var isCallCentreStatusActive = this.get("IsCallCentreActive");
							return (isCallCentreStatusActive) ? "Active" : "Not active";
						},
						enterCC: function() {
							this.changeCallCentreState(true);
						},
						exitCC: function() {
							this.changeCallCentreState(false);
						},
						setAcceptButtonEnabled: function() {
							return this.get("IsCisco")
								&& (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
						},
						setSkipButtonEnabled: function() {
							return this.get("IsCisco")
								&& (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
						},
						setRejectButtonEnabled: function() {
							return this.get("IsCisco")
								&& (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
						},
						setSkipCloseButtonEnabled: function() {
							return this.get("IsCisco")
								&& (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
						},
						setRejectCloseButtonEnabled: function() {
							return this.get("IsCisco")
								&& (this.get("LineFeatures") & Terrasoft.CallFeaturesSet.CAN_DROP) !== 0;
						},
						acceptCall: function() {
							var currentCall = this.get("CurrentCall");
							var commandInfoConfig = {
								callId: currentCall.id,
								baResponse: "Accept"
							};
							this.ctiProvider.postCommand(Terrasoft.CtiCommand.LIBRARY_SPECIFIC_SERVICE, {
								parameters: {
									serviceName: "SetEccResponse",
									serviceParams: Terrasoft.encode(Terrasoft.encode(commandInfoConfig))
								}
							});
						},
						skipCall: function() {
							var currentCall = this.get("CurrentCall");
							var commandInfoConfig = {
								callId: currentCall.id,
								baResponse: "Skip"
							};
							this.ctiProvider.postCommand(Terrasoft.CtiCommand.LIBRARY_SPECIFIC_SERVICE, {
								parameters: {
									serviceName: "SetEccResponse",
									serviceParams: Terrasoft.encode(Terrasoft.encode(commandInfoConfig))
								}
							});
						},
						rejectCall: function() {
							var currentCall = this.get("CurrentCall");
							var commandInfoConfig = {
								callId: currentCall.id,
								baResponse: "Reject"
							};
							this.ctiProvider.postCommand(Terrasoft.CtiCommand.LIBRARY_SPECIFIC_SERVICE, {
								parameters: {
									serviceName: "SetEccResponse",
									serviceParams: Terrasoft.encode(Terrasoft.encode(commandInfoConfig))
								}
							});
						},
						skipCloseCall: function() {
							var currentCall = this.get("CurrentCall");
							var commandInfoConfig = {
								callId: currentCall.id,
								baResponse: "Skip-Close"
							};
							this.ctiProvider.postCommand(Terrasoft.CtiCommand.LIBRARY_SPECIFIC_SERVICE, {
								parameters: {
									serviceName: "SetEccResponse",
									serviceParams: Terrasoft.encode(Terrasoft.encode(commandInfoConfig))
								}
							});
						},
						rejectCloseCall: function() {
							var currentCall = this.get("CurrentCall");
							var commandInfoConfig = {
								callId: currentCall.id,
								baResponse: "Reject-Close"
							};
							this.ctiProvider.postCommand(Terrasoft.CtiCommand.LIBRARY_SPECIFIC_SERVICE, {
								parameters: {
									serviceName: "SetEccResponse",
									serviceParams: Terrasoft.encode(Terrasoft.encode(commandInfoConfig))
								}
							});
						}
					},
					ctiProvider: Terrasoft.OktellCtiProvider
				});
			}

			function renderView() {
				var ctiProvidersComboBox = this.ctiProvidersComboBox = Ext.create("Terrasoft.ComboBoxEdit");
				ctiModel.view = Ext.create("Terrasoft.Container", {
					renderTo: renderTo,
					id: "content",
					selectors: {
						el: "#content",
						wrapEl: "#content"
					},
					items: [
						{
							className: "Terrasoft.Container",
							id: "content-left",
							selectors: {
								el: "#content-left",
								wrapEl: "#content-left"
							},
							items: [
								{
									className: "Terrasoft.Label",
									caption: "Cti Provider"
								},
								ctiProvidersComboBox,
								{
									className: "Terrasoft.Label",
									caption: "CurrentCallNumber"
								},
								{
									className: "Terrasoft.TextEdit",
									enabled: {
										bindTo: "getCanCall"
									},
									value: {
										bindTo: "CurrentCallNumber"
									},
									width: "100%"
								},
								// Call buttons
								{
									className: "Terrasoft.Button",
									caption: "Make call",
									enabled: {
										bindTo: "getCanCall"
									},
									click: {
										bindTo: "dial"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Answer",
									enabled: {
										bindTo: "getCanAnswer"
									},
									click: {
										bindTo: "answerCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "HoldCall",
									enabled: {
										bindTo: "getCanHoldOrUnhold"
									},
									pressed: {
										bindTo: "getCanUnhold"
									},
									click: {
										bindTo: "holdOrUnholdCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Drop",
									enabled: {
										bindTo: "getCanDrop"
									},
									click: {
										bindTo: "dropCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Make consult call",
									enabled: {
										bindTo: "getCanMakeConsultCall"
									},
									click: {
										bindTo: "execMakeConsultCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Complete Transfer",
									enabled: {
										bindTo: "getCanTransfer"
									},
									click: {
										bindTo: "transferCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Cancel Transfer",
									enabled: {
										bindTo: "getCanCancelTransfer"
									},
									click: {
										bindTo: "cancelTransfer"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Accept",
									enabled: {
										bindTo: "setAcceptButtonEnabled"
									},
									click: {
										bindTo: "acceptCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Skip",
									enabled: {
										bindTo: "setSkipButtonEnabled"
									},
									click: {
										bindTo: "skipCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Reject",
									enabled: {
										bindTo: "setRejectButtonEnabled"
									},
									click: {
										bindTo: "rejectCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Skip-Close",
									enabled: {
										bindTo: "setSkipCloseButtonEnabled"
									},
									click: {
										bindTo: "skipCloseCall"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Reject-Close",
									enabled: {
										bindTo: "setRejectCloseButtonEnabled"
									},
									click: {
										bindTo: "rejectCloseCall"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "ConsultCall Number",
									visible: {
										bindTo: "getCanMakeConsultCallOrBlindTransfer"
									}
								},
								{
									className: "Terrasoft.TextEdit",
									visible: {
										bindTo: "getCanMakeConsultCallOrBlindTransfer"
									},
									value: {
										bindTo: "ConsultCallNumber"
									},
									width: "100%"
								},
								{
									className: "Terrasoft.Label",
									caption: "",
									width: "100%"
								},
								// Agent state
								{
									className: "Terrasoft.Label",
									caption: "Agent state code"
								},
								{
									className: "Terrasoft.TextEdit",
									enabled: {
										bindTo: "IsConnected"
									},
									value: {
										bindTo: "AgentState"
									},
									width: "120px"
								},
								{
									className: "Terrasoft.Button",
									caption: "Set",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "setAgentState"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Query",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "queryAgentState"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "CC state"
								},
								{
									className: "Terrasoft.TextEdit",
									enabled: false,
									value: {
										bindTo: "getCallCentreStateText"
									},
									width: "120px"
								},
								{
									className: "Terrasoft.Button",
									caption: "Enter",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "enterCC"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Exit",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "exitCC"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "",
									visible: {
										bindTo: "getCanDtmf"
									},
									width: "100%"
								},
								{
									className: "Terrasoft.Label",
									visible: {
										bindTo: "getCanDtmf"
									},
									caption: "Dtmf char"
								},
								{
									className: "Terrasoft.TextEdit",
									visible: {
										bindTo: "getCanDtmf"
									},
									enabled: {
										bindTo: "getCanDtmf"
									},
									value: {
										bindTo: "DtmfDigit"
									},
									width: "40px"
								},
								{
									className: "Terrasoft.Button",
									caption: "Send Dtmf",
									visible: {
										bindTo: "getCanDtmf"
									},
									enabled: {
										bindTo: "getCanDtmf"
									},
									click: {
										bindTo: "execSendDtmf"
									}
								},
								{
									className: "Terrasoft.TextEdit",
									visible: {
										bindTo: "getCanDtmf"
									},
									enabled: {
										bindTo: "getCanDtmf"
									},
									value: {
										bindTo: "DtmfDigitsSent"
									},
									width: "40px"
								},
								{
									className: "Terrasoft.Label",
									caption: "",
									width: "100%"
								},
								// Additional commands
								{
									className: "Terrasoft.Label",
									caption: "Additional commands"
								},
								{
									className: "Terrasoft.Button",
									caption: "Close connection",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "closeConnection"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Query line state",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "queryLineState"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "WrapUp - true",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "setWrapUp"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "WrapUp - false",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "unsetWrapUp"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: "Blind transfer",
									enabled: {
										bindTo: "getCanBlindTransfer"
									},
									click: {
										bindTo: "execBlindTransferCall"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "",
									width: "100%"
								},
								{
									className: "Terrasoft.Label",
									caption: "Oktell specific commands"
								},
								{
									className: "Terrasoft.Button",
									caption: "Get Oktell Log",
									click: {
										bindTo: "getOktellLog"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "Call Id"
								},
								{
									className: "Terrasoft.TextEdit",
									enabled: {
										bindTo: "IsConnected"
									},
									value: {
										bindTo: "CallId"
									},
									width: "320px"
								},
								{
									className: "Terrasoft.Button",
									caption: "Get Record Links",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "getRecordLinks"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "",
									width: "100%"
								},
								{
									className: "Terrasoft.Label",
									caption: "Callway specific commands"
								},
								{
									className: "Terrasoft.Label",
									caption: "Call Id"
								},
								{
									className: "Terrasoft.TextEdit",
									enabled: {
										bindTo: "IsConnected"
									},
									value: {
										bindTo: "CallId"
									},
									width: "120px"
								},
								{
									className: "Terrasoft.Button",
									caption: "ListenCall",
									enabled: {
										bindTo: "IsConnected"
									},
									click: {
										bindTo: "listenCall"
									}
								}
							]
						},
						{
							className: "Terrasoft.Container",
							id: "content-right",
							selectors: {
								el: "#content-right",
								wrapEl: "#content-right"
							},
							items: [
								{
									className: "Terrasoft.Label",
									caption: "Connection properties"
								},
								{
									className: "Terrasoft.MemoEdit",
									value: {
										bindTo: "InitConfigText"
									},
									height: "76px"
								},
								{
									className: "Terrasoft.Button",
									caption: "Init connection",
									click: {
										bindTo: "createConnection"
									}
								},
								{
									className: "Terrasoft.Label",
									caption: "Log"
								},
								{
									className: "Terrasoft.MemoEdit",
									value: {
										bindTo: "LogValue"
									},
									height: "400px",
									width: "100%"
								}
							]
						}
					]
				});
				ctiModel.view.bind(ctiModel.model);
			}

			function initPage() {
				prepareCtiProviders(this.ctiProvidersComboBox);
			}

			prepareModel();
			renderView();
			initPage();
		}
	};
});
