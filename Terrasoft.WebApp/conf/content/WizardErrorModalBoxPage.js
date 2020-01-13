Terrasoft.configuration.Structures["WizardErrorModalBoxPage"] = {innerHierarchyStack: ["WizardErrorModalBoxPage"], structureParent: "BaseModalBoxPage"};
define('WizardErrorModalBoxPageStructure', ['WizardErrorModalBoxPageResources'], function(resources) {return {schemaUId:'4ced5d6a-1d25-4e58-af7e-cc2cab3930fc',schemaCaption: "WizardErrorModalBoxPage", parentSchemaName: "BaseModalBoxPage", schemaName:'WizardErrorModalBoxPage',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent BaseModalBoxPage
 */
define("WizardErrorModalBoxPage", ["RightUtilities", "NetworkUtilities", "css!WizardErrorModalBoxPageCss"],
	function(RightUtilities, NetworkUtilities) {
		return {
			messages: {
				/**
				 * @message NavigateToAllowedStep
				 */
				"NavigateToAllowedStep": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {
				/**
				 * Error message.
				 */
				"ErrorMessageText": {
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
						this.set("ErrorMessageText", moduleInfo.errorMessageText);
						this.updateSize(1, 1);
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.ModalBoxSchemaModule#onRender.
				 * @override
				 */
				onRender: function() {
					this.callParent(arguments);
					this.updateSize();
				},

				/**
				 * Opens "Current Package" system setting page.
				 * @protected
				 */
				openSystemSettings: function() {
					Terrasoft.SysSettings.querySysSettingsRaw(["CurrentPackageId"], function(result) {
						const row = result.values.CurrentPackageId;
						NetworkUtilities.openCardWindow({
							cardSchemaName: "SysSettingPage",
							primaryColumnValue: row.id,
							operation: "edit"
						});
					}, this);
				},

				/**
				 * Opens configuration if current user has sufficient rights.
				 * @protected
				 */
				openAdvancedSettings: function() {
					window.open("../WorkspaceExplorerModule.aspx");
				},

				/**
				 * Handler for the "OK" button.
				 * @protected
				 */
				closeButtonClick: function() {
					this.sandbox.publish("NavigateToAllowedStep", null, [this.sandbox.id]);
					this.close();
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
					"name": "ErrorMessageText",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"markerValue": "ErrorMessageText",
						"caption": {"bindTo": "ErrorMessageText"},
						"isMultiline": true
					}
				},
				{
					"operation": "insert",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"name": "ButtonContainer",
					"index": 1,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["error-modal-box-btn-container"]
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "closeButtonClick"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"markerValue": "CloseButton",
						"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"}
					}
				},
				{
					"operation": "insert",
					"name": "ChangeCurrentPackage",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "openSystemSettings"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"markerValue": "ChangeCurrentPackageButton",
						"caption": {"bindTo": "Resources.Strings.ChangeCurrentPackageMessage"}
					}
				},
				{
					"operation": "insert",
					"name": "OpenAdvancedSettings",
					"parentName": "ButtonContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "openAdvancedSettings"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"markerValue": "OpenAdvancedSettingsButton",
						"caption": {"bindTo": "Resources.Strings.OpenAdvancedSettingsMessage"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


