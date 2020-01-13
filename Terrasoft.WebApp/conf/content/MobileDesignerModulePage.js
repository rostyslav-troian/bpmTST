Terrasoft.configuration.Structures["MobileDesignerModulePage"] = {innerHierarchyStack: ["MobileDesignerModulePage"]};
define('MobileDesignerModulePageStructure', ['MobileDesignerModulePageResources'], function(resources) {return {schemaUId:'cb181d55-c0d3-44db-ba6e-e67096141a5e',schemaCaption: "MobileDesignerModulePage", parentSchemaName: "", schemaName:'MobileDesignerModulePage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class MobileDesignerModulePage
 * @public
 * ##### ########### ###### ######### ########## ##########
 */
define("MobileDesignerModulePage", ["terrasoft", "MobileDesignerModulePageResources"],
	function(Terrasoft) {
		return {
			messages: {

				/**
				 * ########## ######### ######### ######### ###### #########.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				"OnDesignerSaved": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				"OnDesignerCanceled": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				"BackHistoryState": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},

				"GetDesignerSettings" : {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				"PostDesignerSettings" : {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			attributes: {

				"SectionCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT
				}

			},
			methods: {

				/**
				 * ############## ######### ######## ######.
				 * @protected
				 * @virtual
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						var history = this.sandbox.publish("GetHistoryState");
						var historyState = history.state;
						var moduleConfig = this.moduleConfig = historyState.moduleConfig;
						this.changeDesignerCaption(moduleConfig.title);
						callback.call(scope);
					}, this]);
				},

				/**
				 * ############# ######### ###### #########.
				 * @protected
				 * @virtual
				 */
				changeDesignerCaption: function(caption) {
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: caption,
						moduleName: this.name
					});
				},

				/**
				 * ######### ######### # #########.
				 * @protected
				 * @virtual
				 */
				save: function() {
					var config = this.getDesignerSettings();
					this.sandbox.publish("OnDesignerSaved", config);
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * ######### ######## #########.
				 * @protected
				 * @virtual
				 */
				cancel: function() {
					this.sandbox.publish("OnDesignerCanceled");
					this.sandbox.publish("BackHistoryState");
				},


				/**
				 * ########## ######### ######### #########.
				 * @protected
				 * @virtual
				 */
				getDesignerSettings: function() {
					var designerSettings = this.sandbox.publish("PostDesignerSettings");
					return designerSettings;
				},

				/**
				 * ######### ########, ########### ##### ########### ########.
				 * @protected
				 * @virtual
				 */
				onRender: function() {
					this.sandbox.subscribe("GetDesignerSettings", function() {
						return this.moduleConfig.designerSettings;
					}, this);
					var designerModuleSchemaName = this.moduleConfig.designerModuleSchemaName;
					this.sandbox.loadModule(designerModuleSchemaName, {
						renderTo: "MobileDesignerFooterContainer",
						id: this.sandbox.id + designerModuleSchemaName
					});
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "MobileDesignerContainer",
					"values": {
						"id": "MobileDesignerContainer",
						"selectors": {
							"wrapEl": "#MobileDesignerContainer"
						},
						"classes": {
							"textClass": "center-panel"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "MobileDesignerHeaderContainer",
					"parentName": "MobileDesignerContainer",
					"propertyName": "items",
					"values": {
						"id": "MobileDesignerHeaderContainer",
						"selectors": {
							"wrapEl": "#MobileDesignerHeaderContainer"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "MobileDesignerHeaderContainer",
					"propertyName": "items",
					"name": "SaveButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.SaveButtonCaption"
						},
						"classes": {
							"textClass": "actions-button-margin-right"
						},
						"click": {
							"bindTo": "save"
						},
						"style": "green",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 2
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "MobileDesignerHeaderContainer",
					"propertyName": "items",
					"name": "CancelButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.CancelButtonCaption"
						},
						"classes": {
							"textClass": "actions-button-margin-right"
						},
						"click": {
							"bindTo": "cancel"
						},
						"style": "default",
						"layout": {
							"column": 4,
							"row": 0,
							"colSpan": 2
						}
					}
				},
				{
					"operation": "insert",
					"name": "MobileDesignerFooterContainer",
					"parentName": "MobileDesignerContainer",
					"propertyName": "items",
					"values": {
						"id": "MobileDesignerFooterContainer",
						"selectors": {
							"wrapEl": "#MobileDesignerFooterContainer"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				}
			]
		};
	});


