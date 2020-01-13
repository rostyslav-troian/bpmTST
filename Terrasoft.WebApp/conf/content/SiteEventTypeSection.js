Terrasoft.configuration.Structures["SiteEventTypeSection"] = {innerHierarchyStack: ["SiteEventTypeSection"], structureParent: "BaseSectionV2"};
define('SiteEventTypeSectionStructure', ['SiteEventTypeSectionResources'], function(resources) {return {schemaUId:'8ed98a0c-f772-4e87-a57d-b3099c3c30da',schemaCaption: "Section - Website event types", parentSchemaName: "BaseSectionV2", schemaName:'SiteEventTypeSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SiteEventTypeSection", ["ModalBox", "GridUtilitiesV2", "TrackingCodeModuleV2", "SetupTrackingModuleV2"],
function(ModalBox) {
	return {
		entitySchemaName: "SiteEventType",
		contextHelpId: "1001",
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"name": "SetupTracking",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.SetupTrackingCaption"
					},
					"classes": {textClass: "actions-button-margin-right"},
					"click": {bindTo: "runSetupTracking"},
					"style": Terrasoft.controls.ButtonEnums.style.WHITE,
					"visible": true,
					"tips": []
				}
			},
			{
				"operation": "insert",
				"parentName": "SetupTracking",
				"propertyName": "tips",
				"name": "SetupTrackingTip",
				"values": {
					"content": {"bindTo": "Resources.Strings.SetupTrackingHint"},
					"tools": []
				}
			},
			{
				"operation": "insert",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"name": "ShowJsCode",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.ShowJsCodeCaption"
					},
					"classes": {textClass: "actions-button-margin-right"},
					"click": {bindTo: "showTrackingCode"},
					"style": Terrasoft.controls.ButtonEnums.style.WHITE,
					"visible": true
				}
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions"
			},
			{
				"operation": "merge",
				"name": "SeparateModeActionsButton",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "CombinedModeActionsButton",
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
				"propertyName": "items",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/,
		messages: {},
		methods: {
			/**
			 * Show modal window with tracking code
			 */
			showTrackingCode: function() {
				var moduleId = this.sandbox.id + "TrackingCodeModuleV2";
				var modalBoxConfig = {
					heightPixels: 400,
					widthPixels: 600
				};
				var renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}.bind(this));
				this.sandbox.loadModule("TrackingCodeModuleV2", {
					id: moduleId,
					renderTo: renderTo.id
				});
			},
			/**
			 * Show modal window with api key and starting tracking button
			 */
			runSetupTracking: function() {
				var moduleId = this.sandbox.id + "SetupTrackingModuleV2";
				var modalBoxConfig = {
					heightPixels: 240,
					widthPixels: 600
				};
				var renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}.bind(this));
				this.sandbox.loadModule("SetupTrackingModuleV2", {
					id: moduleId,
					renderTo: renderTo.id
				});
			}
		}
	};
});


