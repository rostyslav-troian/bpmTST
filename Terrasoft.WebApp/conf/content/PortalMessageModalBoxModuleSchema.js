Terrasoft.configuration.Structures["PortalMessageModalBoxModuleSchema"] = {innerHierarchyStack: ["PortalMessageModalBoxModuleSchema"]};
define('PortalMessageModalBoxModuleSchemaStructure', ['PortalMessageModalBoxModuleSchemaResources'], function(resources) {return {schemaUId:'0b0c0e82-8078-477e-8ecb-100d8b57c230',schemaCaption: "PortalMessageModalBoxModuleSchema", parentSchemaName: "", schemaName:'PortalMessageModalBoxModuleSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalMessageModalBoxModuleSchema", ["ModalBox", "PortalMessageModalBoxModuleSchemaResources",
	"css!PortalMessageModalBoxModuleSchemaCSS"],
	function(ModalBox) {
		return {
			attributes: {
				/**
				 * Message to publish.
				 */
				"MessageText": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Module load parameters.
				 */
				"Parameters": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				}
			},
			messages: {
				/**
				 * @message PublishMessage
				 * Publish message via PortalMessagePublisherPage
				 */
				"PublishMessage": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function () {
					this.set("Parameters", arguments[1].parameters);
					this.callParent(arguments);
				},

				/**
				 * Gets "Publish" button caption from config if exists, else returns default button caption
				 * @returns {String}
				 */
				getPublishButtonCaption: function() {
					var buttonsConfig = this.get("Parameters").buttonsConfig;
					var configCaption = buttonsConfig && buttonsConfig.publishButton &&
							buttonsConfig.publishButton.caption;
					return configCaption || this.get("Resources.Strings.PublishButtonCaption");
				},

				/**
				 * Closes modal box.
				 * @private
				 */
				onCancelButtonClick: function() {
					ModalBox.close(true);
				},

				/**
				 * Publishes message with specified parameters.
				 * @protected
				 */
				onPublishButtonClick: function() {
					var messageText = Ext.util.Format.trim(this.get("MessageText"));
					if (!messageText) {
						return;
					}
					var parameters = this.get("Parameters");
					var publishParameters = {
						Message: messageText,
						TypeId: parameters.messageType
					};
					this.sandbox.publish("PublishMessage", publishParameters,
							this.getPortalMessagePublisherModuleIds());
					ModalBox.close(true);
				},

				/**
				 * Returns modules identifiers to publish messages.
				 * @private
				 * @param {String} moduleId of current module.
				 * @param {String} chain for concatenation.
				 * @param {String} indexOfCurrentModule character position from which current module starts.
				 * @returns {String}
				 */
				getPortalMessagePublisherInChainModuleId: function(moduleId, chain, indexOfCurrentModule) {
					return moduleId.substring(0, indexOfCurrentModule) + chain;
				},

				/**
				 * Returns modules identifiers to publish messages.
				 * @private
				 * @returns {String}
				 */
				getPortalMessagePublisherModuleIds: function() {
					var moduleId = this.sandbox.id;
					var moduleIdAd = moduleId;
					var moduleIdDcm = moduleId;
					var thisModuleName = "_" + this.sandbox.moduleName;
					var indexOfCurrentModule = moduleId.indexOf(thisModuleName, moduleId.lastIndexOf("_"));
					if (indexOfCurrentModule !== -1) {
						moduleIdAd = this.getPortalMessagePublisherInChainModuleId(moduleId,
								"_module_ActionsDashboardModule_PortalMessagePublisherModule", indexOfCurrentModule);
						moduleIdDcm = this.getPortalMessagePublisherInChainModuleId(moduleId,
								"_module_DcmActionsDashboardModule_PortalMessagePublisherModule", indexOfCurrentModule);
					}
				return [moduleIdAd, moduleIdDcm];
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "MainContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["portalMessageModalBox-mainContainer"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "HeaderCaption",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.HeaderCaption"
						},
						"classes": {
							"labelClass": ["portalMessageModalBox-headerCaption"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "MessageLabel",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"labelClass": ["portalMessageModalBox-messageTextLabel"]
						},
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.MessageCaption"
						},
						"isRequired": true
					}
				},
				{
					"operation": "insert",
					"name": "MessageText",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.TEXT,
						"bindTo": "MessageText",
						"labelConfig": {
							"visible": false,
							"caption": {
								"bindTo": "Resources.Strings.MessageCaption",
								"isRequired": true
							}
						},
						"controlConfig": {
							"className": "Terrasoft.controls.MemoEdit",
							"height": "100px",
							"classes": ["portalMessageModalBox-text-container"],
							"focused": true
						}
					}
				},
				{
					"operation": "insert",
					"name": "ButtonContainer",
					"parentName": "MainContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["portalMessageModalBox-button-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "PublishButton",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "getPublishButtonCaption"
						},
						"click": {"bindTo": "onPublishButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"classes": {"textClass": "portalMessageModalBox-button-group"}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.CancelButtonCaption"
						},
						"click": {"bindTo": "onCancelButtonClick"},
						"style": Terrasoft.controls.ButtonEnums.style.GRAY,
						"classes": {"textClass": "portalMessageModalBox-button-group"}
					}
				}
			]
		};
	});


