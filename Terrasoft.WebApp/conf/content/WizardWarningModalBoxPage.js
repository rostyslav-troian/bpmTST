Terrasoft.configuration.Structures["WizardWarningModalBoxPage"] = {innerHierarchyStack: ["WizardWarningModalBoxPage"], structureParent: "BaseModalBoxPage"};
define('WizardWarningModalBoxPageStructure', ['WizardWarningModalBoxPageResources'], function(resources) {return {schemaUId:'d7c04ce8-b4e0-4436-ae97-d771220e677a',schemaCaption: "WizardWarningModalBoxPage", parentSchemaName: "BaseModalBoxPage", schemaName:'WizardWarningModalBoxPage',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent BaseModalBoxPage
 */
define("WizardWarningModalBoxPage", ["CollapsibleContainer", "css!WizardWarningModalBoxPageCss"],
	function() {
		return {
			attributes: {
				/**
				 * Error message.
				 */
				"MessageText": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					size: 500,
					value: ""
				},
				/**
				 * Additional info to show in collapsible container.
				 */
				"AdditionalInfo": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					size: 500,
					value: ""
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.ModalBoxSchemaModule#init.
				 * @override
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						const moduleInfo = this.get("moduleInfo");
						this.set("MessageText", moduleInfo.messageText);
						this.set("AdditionalInfo", moduleInfo.additionalInfo);
						this.updateSize(1, 1);
						this.subscribeOnColumnChange("IsCollapsed", this.onCollapsedChanged, this);
						callback.call(scope);
					}, this]);
				},

				/**
				 * Handles item expand/collapse event.
				 * @protected
				 */
				onCollapsedChanged: function() {
					this.updateSize();
				},

				/**
				 * @inheritdoc Terrasoft.core.BaseObject#onDestroy.
				 * @override
				 */
				onDestroy: function() {
					this.unsubscribeOnColumnChange("IsCollapsed", this.onCollapsedChanged, this);
					this.callParent(arguments);
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HeaderContainer"
				},
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "WarningBodyContainer",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["wizard-warning-body-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "WarningButtonContainer",
					"index": 1,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["warning-modal-box-btn-container"]
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "WarningButtonContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "close"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"markerValue": "CloseButton",
						"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"}
					}
				},
				{
					"operation": "insert",
					"parentName": "WarningBodyContainer",
					"propertyName": "items",
					"name": "MessageText",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"isMultiline": true,
						"markerValue": "MessageText",
						"caption": {"bindTo": "MessageText"}
					}
				},
				{
					"operation": "insert",
					"parentName": "WarningBodyContainer",
					"propertyName": "items",
					"name": "MessageContainer",
					"values": {
						"className": "Terrasoft.CollapsibleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"controlConfig": {
							"auto": true,
							"visibilityHeight": 0,
							"collapsed": {
								"bindTo": "IsCollapsed"
							}
						},
						"items": [
							{
								"name": "AdditionalInfo",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"caption": {
									"bindTo": "AdditionalInfo"
								},
								"isMultiline": true
							}
						]
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


