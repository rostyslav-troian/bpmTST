Terrasoft.configuration.Structures["MultiDeleteMessageBridge"] = {innerHierarchyStack: ["MultiDeleteMessageBridge"], structureParent: "ClientMessageBridge"};
define('MultiDeleteMessageBridgeStructure', ['MultiDeleteMessageBridgeResources'], function(resources) {return {schemaUId:'aecd3558-cf99-40ac-ba4f-711847ebad26',schemaCaption: "MultiDeleteMessageBridge", parentSchemaName: "ClientMessageBridge", schemaName:'MultiDeleteMessageBridge',parentSchemaUId:'ca65ff87-7f01-442e-a7bf-787c3db44ab1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MultiDeleteMessageBridge", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			messages: {
				/**
				 * @message ListenMultiDeleteMessages
				 * Notification that module for processing multi delete has been initialized.
				 */
				"ListenMultiDeleteMessages": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message MultiDeleteStateChange
				 * Notification that has been changed the state of the deleted items.
				 */
				"MultiDeleteStateChange": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Flag that shows loaded or not the multi delete message listener.
				 */
				"IsMessagesListenerLoaded": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * Last received config for the sandbox message.
				 */
				"LastSandboxConfig": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: {}
				}
			},
			methods: {
				/**
				 * Handler for the message listener initialization.
				 * @private
				 */
				onInitMessagesListener: function() {
					var lastSandboxConfig = this.get("LastSandboxConfig");
					var messageName = ConfigurationConstants.MultiDelete.MultiDeleteSandboxMessageName;
					this.set("IsMessagesListenerLoaded", true);
					this.publishMessageResult(messageName, lastSandboxConfig);
				},

				/**
				 * Load MultiDeleteResultModule.
				 * @private
				 */
				loadMultiDeleteResultModule: function() {
					this.sandbox.loadModule("BaseSchemaModuleV2", {
						id: this.sandbox.id + "_multiDeleteResultModule",
						instanceConfig: {
							generateViewContainerId: false,
							useHistoryState: false,
							schemaName: "MultiDeleteResultSchema",
							isSchemaConfigInitialized: true
						}
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @overridden
				 */
				init: function() {
					var multiDeleteMessages = ConfigurationConstants.MultiDelete;
					this.callParent(arguments);
					this.addMessageConfig({
						sender: multiDeleteMessages.MultiDeleteWebsocketSender,
						messageName: multiDeleteMessages.MultiDeleteSandboxMessageName
					});
					this.sandbox.subscribe("ListenMultiDeleteMessages", this.onInitMessagesListener, this);
				},

				/**
				 * @inheritdoc Terrasoft.ClientMessageBridge#beforePublishMessage
				 * @overridden
				 */
				beforePublishMessage: function(sandboxMessageName, webSocketBody) {
					var messageName = ConfigurationConstants.MultiDelete.MultiDeleteSandboxMessageName;
					var isMessagesListenerLoaded = this.get("IsMessagesListenerLoaded");
					if (sandboxMessageName === messageName && !isMessagesListenerLoaded) {
						this.set("LastSandboxConfig", webSocketBody);
						this.loadMultiDeleteResultModule();
					}
				}

			}
		};
	});


