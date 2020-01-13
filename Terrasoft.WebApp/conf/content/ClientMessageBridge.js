Terrasoft.configuration.Structures["ClientMessageBridge"] = {innerHierarchyStack: ["ClientMessageBridgeNUI", "ClientMessageBridge"], structureParent: "BaseMessageBridge"};
define('ClientMessageBridgeNUIStructure', ['ClientMessageBridgeNUIResources'], function(resources) {return {schemaUId:'ca65ff87-7f01-442e-a7bf-787c3db44ab1',schemaCaption: "ClientMessageBridge", parentSchemaName: "BaseMessageBridge", schemaName:'ClientMessageBridgeNUI',parentSchemaUId:'868cb80e-c909-4011-833c-570c28cedc28',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ClientMessageBridgeStructure', ['ClientMessageBridgeResources'], function(resources) {return {schemaUId:'45a760a1-142a-4eab-a305-b6b3f9d2671f',schemaCaption: "ClientMessageBridge", parentSchemaName: "ClientMessageBridgeNUI", schemaName:'ClientMessageBridge',parentSchemaUId:'ca65ff87-7f01-442e-a7bf-787c3db44ab1',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ClientMessageBridgeNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ClientMessageBridgeNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
/**
 * Parent: BaseMessageBridge
 */
define("ClientMessageBridgeNUI", [], function() {
	return {
		attributes: {
			/**
			 * Name for the local storage.
			 */
			"LocalStoreName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "SocketMsgHistory"
			},
			/**
			 * Instance of the Terrasoft.LocalStore.
			 */
			"LocalStore": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseMessageBridge#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				var localStore = this.Ext.create("Terrasoft.LocalStore", {
					storeName: this.get("LocalStoreName"),
					isCache: true
				});
				this.set("LocalStore", localStore);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMessageBridge#saveMessageToHistory
			 * @override
			 */
			saveMessageToHistory: function(sandboxMessageName, webSocketBody) {
				var localStore = this.get("LocalStore");
				var messageLocalStoreKey = this.getMessageLocalStoreKey(sandboxMessageName);
				var savedMessages = this.getMessagesFromHistory(sandboxMessageName);
				savedMessages.push({
					name: sandboxMessageName,
					msg: webSocketBody
				});
				localStore.setItem(messageLocalStoreKey, savedMessages);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMessageBridge#getMessagesFromHistory
			 * @override
			 */
			getMessagesFromHistory: function(sandboxMessageName) {
				var localStore = this.get("LocalStore");
				var messageLocalStoreKey = this.getMessageLocalStoreKey(sandboxMessageName);
				return localStore.getItem(messageLocalStoreKey) || [];
			},

			/**
			 * @inheritdoc Terrasoft.BaseMessageBridge#getMessagesFromHistory
			 * @override
			 */
			deleteSavedMessages: function(sandboxMessageName) {
				var localStore = this.get("LocalStore");
				var messageLocalStoreKey = this.getMessageLocalStoreKey(sandboxMessageName);
				localStore.removeItem(messageLocalStoreKey);
			},

			/**
			 * Returns local storage key for the sandbox message.
			 * @private
			 * @param sandboxMessageName Sandbox message name.
			 * @return {String} Local storage key for the sandbox message.
			 */
			getMessageLocalStoreKey: function(sandboxMessageName) {
				return sandboxMessageName + this.get("LocalStoreName");
			}
		}
	};
});

define("ClientMessageBridge", ["ConfigurationConstants"], function(ConfigurationConstants) {
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
			},

			/**
			 * @message NotificationInfo
			 * Notification that has been received information about notifications.
			 */
			"NotificationInfo": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateReminding
			 * Notification that has been changed count of the notifications.
			 */
			"UpdateReminding": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetRemindingCounters
			 * Notification that has been received information about notification counters.
			 */
			"GetRemindingCounters": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetRemindingCounters
			 * Notification that has been received information about reloading application.
			 */
			"ReloadApplication": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Flag that shows loaded or not the multi delete message listener.
			 */
			"IsMessagesListenerLoaded": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Last received config for the sandbox message.
			 */
			"LastSandboxConfig": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": {}
			},

			/**
			 * Notifications sender names.
			 */
			"NotificationsSenderNames": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": ["NotificationInfo", "UpdateReminding", "GetRemindingCounters", "ReloadApplication"]
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
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				var multiDeleteMessages = ConfigurationConstants.MultiDelete;
				var notificationsSenderNames = this.get("NotificationsSenderNames");
				this.addMessageConfig({
					sender: multiDeleteMessages.MultiDeleteWebsocketSender,
					messageName: multiDeleteMessages.MultiDeleteSandboxMessageName,
					isSaveHistory: false
				});
				this.Terrasoft.each(notificationsSenderNames, function(name) {
					this.addMessageConfig({
						sender: name,
						messageName: name,
						isSaveHistory: true
					});
				}.bind(this));
				this.sandbox.subscribe("ListenMultiDeleteMessages", this.onInitMessagesListener, this);
			},

			/**
			 * @inheritdoc Terrasoft.ClientMessageBridge#beforePublishMessage
			 * @override
			 */
			beforePublishMessage: function(sandboxMessageName, webSocketBody) {
				this.callParent(arguments);
				var multiDeleteSandboxMessageName = ConfigurationConstants.MultiDelete.MultiDeleteSandboxMessageName;
				var isMessagesListenerLoaded = this.get("IsMessagesListenerLoaded");
				if (sandboxMessageName === multiDeleteSandboxMessageName && !isMessagesListenerLoaded) {
					this.set("LastSandboxConfig", webSocketBody);
				}
			}
		}
	};
});


