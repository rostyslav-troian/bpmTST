Terrasoft.configuration.Structures["BaseDesigner"] = {innerHierarchyStack: ["BaseDesigner"]};
define('BaseDesignerStructure', ['BaseDesignerResources'], function(resources) {return {schemaUId:'24eee2b0-3ed3-4b62-aa3b-62ca6886ef59',schemaCaption: "Designer base class", parentSchemaName: "", schemaName:'BaseDesigner',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class BaseDesigner
 * @public
 * Base designer class module.
 */
define("BaseDesigner", ["terrasoft", "BaseDesignerResources"],
	function(Terrasoft) {
		return {
			messages: {

				/**
				 * @message ChangeHeaderCaption
				 * Notification that the header caption was changed.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message OnDesignerSaved
				 * Notification that designer finished saving.
				 */
				"OnDesignerSaved": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message OnDesignerCanceled
				 * Notification that that designer was closed.
				 */
				"OnDesignerCanceled": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message BackHistoryState
				 * Notification that state was returned to previous.
				 */
				"BackHistoryState": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			attributes: {

				/**
				 * Section caption.
				 * @private
				 * @type {String}
				 */
				"SectionCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT
				}

			},
			methods: {

				/**
				 * Initializes the initial state of the model.
				 * @protected
				 * @virtual
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				init: function(callback, scope) {
					this.initSectionCaption();
					this.callParent([function() {
						this.changeDesignerCaption();
						callback.call(scope);
					}, this]);
				},

				/**
				 * Initializes section caption.
				 * @protected
				 * @virtual
				 */
				initSectionCaption: function() {
					var history = this.sandbox.publish("GetHistoryState");
					if (history) {
						var historyState = history.state;
						this.settings = historyState.settings;
						var title = historyState.title;
						if (title) {
							this.set("SectionCaption", title);
						}
					}
				},

				/**
				 * Sets the designer module caption.
				 * @protected
				 * @virtual
				 */
				changeDesignerCaption: function() {
					var designerCaption = this.get("Resources.Strings.DesignerCaption");
					var sectionCaption = this.get("SectionCaption");
					if (!Ext.isEmpty(sectionCaption)) {
						designerCaption += Ext.String.format(" \"{0}\"", sectionCaption);
					}
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: designerCaption,
						moduleName: this.name
					});
				},

				/**
				 * Saves designer change.
				 * @protected
				 * @virtual
				 */
				save: function() {
					var config = this.getDesignerConfig();
					this.sandbox.publish("OnDesignerSaved", config);
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Closes designer page.
				 * @protected
				 * @virtual
				 */
				cancel: function() {
					this.sandbox.publish("OnDesignerCanceled");
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * Returns designer configuration.
				 * @protected
				 * @virtual
				 */
				getDesignerConfig: Ext.emptyFn,

				/**
				 * Returns array of grid element values.
				 * @param {Terrasoft.Collection} collection Collection.
				 * @return {Array} Returns array of grid element values.
				 */
				getItemConfigsByCollection: function(collection) {
					var result = [];
					collection.eachKey(function(itemId, item) {
						var itemConfig = {};
						var values = item.values;
						for (var propertyKey in values) {
							itemConfig[propertyKey] = item.get(propertyKey);
						}
						result.push(itemConfig);
					}, this);
					return result;
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "BaseDesignerContainer",
					"values": {
						"id": "BaseDesignerContainer",
						"selectors": {
							"wrapEl": "#BaseDesignerContainer"
						},
						"classes": {
							"textClass": "center-panel"
						},
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BaseDesignerHeaderContainer",
					"parentName": "BaseDesignerContainer",
					"propertyName": "items",
					"values": {
						"id": "BaseDesignerHeaderContainer",
						"selectors": {
							"wrapEl": "#BaseDesignerHeaderContainer"
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
					"parentName": "BaseDesignerHeaderContainer",
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
					"parentName": "BaseDesignerHeaderContainer",
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
					"name": "BaseDesignerFooterContainer",
					"parentName": "BaseDesignerContainer",
					"propertyName": "items",
					"values": {
						"id": "BaseDesignerFooterContainer",
						"selectors": {
							"wrapEl": "#BaseDesignerFooterContainer"
						},
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"items": []
					}
				}
			]
		};
	});


