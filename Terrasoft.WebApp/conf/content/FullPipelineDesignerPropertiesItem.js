Terrasoft.configuration.Structures["FullPipelineDesignerPropertiesItem"] = {innerHierarchyStack: ["FullPipelineDesignerPropertiesItem"]};
define('FullPipelineDesignerPropertiesItemStructure', ['FullPipelineDesignerPropertiesItemResources'], function(resources) {return {schemaUId:'c7f511fe-7b71-4c04-b7e8-de5fcd413227',schemaCaption: "Item with properties of full pipeline designer", parentSchemaName: "", schemaName:'FullPipelineDesignerPropertiesItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FullPipelineDesignerPropertiesItem", [], function() {
	return {
		messages: {

			/**
			 * @message GetFilterModuleConfig
			 * Returns settings for the filter unit.
			 */
			"GetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message OnFiltersChanged
			 * Subscription for the filter unit modification event.
			 */
			"OnFiltersChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetFilterModuleConfig
			 * Publishes filter config to filter module.
			 */
			"SetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message PostItemConfig
			 * Message of parameters changes.
			 */
			"PostItemConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Schema name
			 */
			"SchemaName": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},

			/**
			 * Filters
			 */
			"Filters": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			/**
			 * Loads filter module.
			 * @param {Object} viewConfig View config.
			 */
			loadFilterModule: function(viewConfig) {
				var moduleId = this.getFilterEditModuleId();
				this.sandbox.subscribe("OnFiltersChanged", this.publishFiltersChanged, this, [moduleId]);
				this.sandbox.subscribe("GetFilterModuleConfig", this.getFilterModuleConfig, this, [moduleId]);
				this.sandbox.loadModule("FilterEditModule", {
					renderTo: viewConfig.containerId,
					id: moduleId
				});
			},

			/**
			 * Returns filter module config.
			 * @return {Object} Filter config.
			 */
			getFilterModuleConfig: function() {
				return {
					rootSchemaName: this.$SchemaName,
					filters: this.$Filters
				};
			},

			/**
			 * Publishes filters changed.
			 * @param args
			 */
			publishFiltersChanged: function(args) {
				this.$Filters = args.filter.serialize();
				this.sandbox.publish("PostItemConfig", {
					schemaName: this.$SchemaName,
					serializedFilter: args.serializedFilter
				}, [this.sandbox.id]);
			},

			/**
			 * Returns filter module identifier.
			 * @return {String} Filter module identifier.
			 * @protected
			 */
			getFilterEditModuleId: function() {
				return this.sandbox.id + "_ExtendedFilterEditModule";
			},

			/**
			 * Returns filter group caption.
			 * @return {String} Filter group caption.
			 */
			getFilterGroupCaption: function() {
				const captionTemplate = this.get("Resources.Strings.FilterPropertiesLabel");
				const module = Terrasoft.ModuleUtils.getModuleStructureByName(this.$SchemaName);
				const schemaCaption = module.moduleCaption;
				return this.Ext.String.format(captionTemplate, schemaCaption.toLowerCase());
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FullPipelineDesignerItem",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FilterPropertiesGroup",
				"parentName": "FullPipelineDesignerItem",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"controlConfig": {
						"collapsed": false,
						"caption": {
							"bindTo": "getFilterGroupCaption"
						}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FilterProperties",
				"parentName": "FilterPropertiesGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"makeUniqueId": true,
					"itemType": Terrasoft.ViewItemType.MODULE,
					"afterrender": {"bindTo": "loadFilterModule"},
					"items": []
				}
			}
		]
	};
});


