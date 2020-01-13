Terrasoft.configuration.Structures["BaseMessageBridge"] = {innerHierarchyStack: ["BaseMessageBridge"]};
define('BaseMessageBridgeStructure', ['BaseMessageBridgeResources'], function(resources) {return {schemaUId:'868cb80e-c909-4011-833c-570c28cedc28',schemaCaption: "BaseMessageBridge", parentSchemaName: "", schemaName:'BaseMessageBridge',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMessageBridge", [],
	function() {
		return {
			messages: {
				/**
				 * @message SocketMessageReceived
				 * Notification that has been received message from WebSocket.
				 */
				"SocketMessageReceived": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Configs for the WebSocket messages.
				 * Example:
				 * [{sender: "sender key", messageName: "sandbox message name", isSaveHistory: true}]
				 */
				"WebSocketMessageConfigs": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				}
			},
			methods: {
				/**
				 * Handler for the WebSocket message.
				 * @param {Object} scope Scope.
				 * @param {Object} response Server response.
				 * @private
				 */
				onMessageReceived: function(scope, response) {
					if (!response) {
						throw new this.Terrasoft.NullOrEmptyException({
							message: this.get("Resources.Strings.EmptyResponseError")
						});
					}
					var serverChannelResponse = this.getServerChannelResponseObject(response);
					var webSocketMessage = serverChannelResponse.message;
					var sender = serverChannelResponse.getSender();
					webSocketMessage.Header = response.Header;
					this.publishSocketMessages(sender, webSocketMessage);
				},

				/**
				 * Publishes sandbox messages.
				 * @param {String} sender WebSocket sender name.
				 * @param {Object} webSocketMessage WebSocket message.
				 * @private
				 */
				publishSocketMessages: function(sender, webSocketMessage) {
					var messageConfigs = this.getMessageConfigs(sender);
					this.Terrasoft.each(messageConfigs, function(messageConfig) {
						var publishConfig = this.getPublishConfig(messageConfig);
						this.publishSocketMessage(messageConfig.messageName, webSocketMessage, publishConfig);
					}, this);
				},

				/**
				 * Returns publish configuration object.
				 * @param {Object} messageConfig Message configuration object.
				 * @return {Object} Publish configuration object.
				 * @private
				 */
				getPublishConfig: function(messageConfig) {
					return {
						isSaveHistory: messageConfig.isSaveHistory
					};
				},

				/**
				 * Returns server channel response object.
				 * @param {Object} response Response configuration.
				 * @return {Object} Server channel response object.
				 * @private
				 */
				getServerChannelResponseObject: function(response) {
					return this.Ext.create("Terrasoft.BaseServerChannelResponse", {
						message: response
					});
				},

				/**
				 * Publishes sandbox message with calling preprocessor and postprocessor.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @param {Object} webSocketMessage WebSocket message.
				 * @param {Object} publishConfig Publish configuration object.
				 * @private
				 */
				publishSocketMessage: function(sandboxMessageName, webSocketMessage, publishConfig) {
					this.beforePublishMessage(sandboxMessageName, webSocketMessage, publishConfig);
					var result = this.publishMessageResult(sandboxMessageName, webSocketMessage);
					this.afterPublishMessage(sandboxMessageName, webSocketMessage, result, publishConfig);
				},

				/**
				 * Returns message configs for the current WebSocket message.
				 * @param {String} senderName Sender name of the WebSocket message.
				 * @return {Array} Configuration objects for the WebSocket message.
				 * @private
				 */
				getMessageConfigs: function(senderName) {
					var configs = this.get("WebSocketMessageConfigs");
					var senderConfigs = configs.filter(function(item) {
						return item.sender === senderName;
					});
					if (this.Ext.isEmpty(senderConfigs)) {
						senderConfigs.push(this.getDefaultMessageConfig());
					}
					return senderConfigs;
				},

				/**
				 * Returns default message config.
				 * @return {Object} default message config.
				 * @private
				 */
				getDefaultMessageConfig: function() {
					return {messageName: "SocketMessageReceived"};
				},

				/**
				 * Add WebSocket message config to configs collection.
				 * @param {Object} config WebSocket Message config.
				 * Example:
				 * {sender: "sender key", messageName: "sandbox message name"}
				 * @protected
				 */
				addMessageConfig: function(config) {
					if (!config || !config.sender || !config.messageName) {
						throw new this.Terrasoft.NullOrEmptyException({
							message: this.get("Resources.Strings.EmptyConfigError")
						});
					}
					var configs = this.get("WebSocketMessageConfigs");
					configs.push(config);
				},

				/**
				 * Concatenates WebSocket message config collection with consisting
				 * of the elements in the WebSocket message collection.
				 * @param {Array} configs Message configs collection.
				 * Example:
				 * {sender: "sender key", messageName: "sandbox message name"}
				 * @protected
				 * @deprecated
				 */
				concatMessageConfigs: function(configs) {
					this.log(this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
						"concatMessageConfigs", "addMessageConfig"));
					if (!this.Ext.isArray(configs)) {
						throw new this.Terrasoft.UnsupportedTypeException();
					}
					var webSocketMessageConfigs = this.get("WebSocketMessageConfigs");
					this.set("WebSocketMessageConfigs", webSocketMessageConfigs.concat(configs));
				},

				/**
				 * Executing after message publishing.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @param {Object} webSocketBody WebSocket message.
				 * @param {*} result Result of the message send.
				 * @param {Object} publishConfig Publish configuration object.
				 * @protected
				 */
				afterPublishMessage: function(sandboxMessageName, webSocketBody, result, publishConfig) {
					var isSetSandboxMessageListener = this.getSandboxMessageListenerExists(sandboxMessageName);
					if (publishConfig.isSaveHistory && isSetSandboxMessageListener) {
						this.deleteSavedMessages(sandboxMessageName);
					}
				},

				/**
				 * Executing before message publishing.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @param {Object} webSocketBody WebSocket message.
				 * @param {Object} publishConfig Publish configuration object.
				 * @protected
				 */
				beforePublishMessage: function(sandboxMessageName, webSocketBody, publishConfig) {
					if (publishConfig.isSaveHistory) {
						var isSetSandboxMessageListener = this.getSandboxMessageListenerExists(sandboxMessageName);
						if (isSetSandboxMessageListener) {
							this.publishSavedMessages(sandboxMessageName);
						} else {
							this.saveMessageToHistory(sandboxMessageName, webSocketBody);
						}
					}
				},

				/**
				 * Publishes into sandbox saved messages.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @private
				 */
				publishSavedMessages: function(sandboxMessageName) {
					var savedMessages = this.getMessagesFromHistory(sandboxMessageName);
					this.Terrasoft.each(savedMessages, function(message) {
						this.publishSocketMessage(sandboxMessageName, message, false);
					}, this);
				},

				/**
				 * Publishes into sandbox response object and returns the result.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @param {Object} webSocketMessage WebSocket message.
				 * @return {*} Result of the sandbox message.
				 * @protected
				 */
				publishMessageResult: function(sandboxMessageName, webSocketMessage) {
					return this.sandbox.publish(sandboxMessageName, webSocketMessage);
				},

				/**
				 * Returns result of checking the existence of the sandbox message listener.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @return {Boolean} The result of checking the existence of the sandbox message listener.
				 * @protected
				 */
				getSandboxMessageListenerExists: function(sandboxMessageName) {
					return Boolean(this.sandbox.getEventDescriptor(sandboxMessageName));
				},

				/**
				 * @inheritDoc Terrasoft.BaseViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("WebSocketMessageConfigs", []);
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onMessageReceived, this);
				},

				/**
				 * Saves to the message history new message.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @param {*} webSocketBody WebSocket message.
				 * @protected
				 * @abstract
				 * @virtual
				 */
				saveMessageToHistory: this.Terrasoft.emptyFn,

				/**
				 * Deletes all saved messages by sandboxMessageName.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @protected
				 * @virtual
				 */
				deleteSavedMessages: this.Terrasoft.emptyFn,

				/**
				 * Returns an array of the saved messages.
				 * @param {String} sandboxMessageName Sandbox message name.
				 * @return {Array} Array of the saved messages.
				 * @protected
				 * @virtual
				 */
				getMessagesFromHistory: this.Terrasoft.emptyFn
			}
		};
	});


