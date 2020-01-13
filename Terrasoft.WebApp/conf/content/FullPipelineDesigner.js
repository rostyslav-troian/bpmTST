Terrasoft.configuration.Structures["FullPipelineDesigner"] = {innerHierarchyStack: ["FullPipelineDesigner"], structureParent: "BaseWidgetPreviewDesigner"};
define('FullPipelineDesignerStructure', ['FullPipelineDesignerResources'], function(resources) {return {schemaUId:'504466c2-5d07-4556-a96e-3c85abb04196',schemaCaption: "Full pipeline designer", parentSchemaName: "BaseWidgetPreviewDesigner", schemaName:'FullPipelineDesigner',parentSchemaUId:'cbe89c2d-78ba-4edf-9293-f13e4de50fea',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FullPipelineDesigner", ["DashboardEnums"], function() {
	return {
		messages: {

			/**
			 * @message GetChartConfig
			 * Message of parameter preparing for widget module.
			 */
			"GetChartConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message PostItemConfig
			 * Message of parameters changes.
			 */
			"PostItemConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message RefreshFullPipelineWidget
			 * Message of refresh pipe line widget.
			 */
			"RefreshFullPipelineWidget": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Style color of full pipeline widget.
			 */
			"StyleColor": {
				"value": Terrasoft.DashboardEnums.WidgetColor["widget-blue"],
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Entities for widget.
			 */
			"entities": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Collection of entities configuration.
			 */
			"EntityCollection": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {
			/**
			 * @inheritDoc Terrasoft.BaseWidgetPreviewDesigner#getWidgetRefreshMessage
			 * @override
			 */
			getWidgetRefreshMessage: function() {
				return "RefreshFullPipelineWidget";
			},

			/**
			 * @inheritDoc Terrasoft.BaseWidgetPreviewDesigner#getWidgetModuleName
			 * @override
			 */
			getWidgetModuleName: function() {
				return "FullPipelineModule";
			},

			/**
			 * @inheritDoc Terrasoft.BaseWidgetPreviewDesigner#getWidgetConfigMessage
			 * @override
			 */
			getWidgetConfigMessage: function() {
				return "GetChartConfig";
			},

			/**
			 * @inheritDoc Terrasoft.BaseWidgetPreviewDesigner#getWidgetModulePropertiesTranslator
			 * @override
			 */
			getWidgetModulePropertiesTranslator: function() {
				var properties = this.callParent(arguments);
				this.Ext.apply(properties, {
					"StyleColor": "styleColor",
					"entities": "entities"
				});
				return properties;
			},

			/**
			 * @inheritDoc Terrasoft.BaseWidgetPreviewDesigner#setWidgetModuleProperties
			 * @override
			 */
			setWidgetModuleProperties: function(widgetConfig, callback, scope) {
				this.callParent([
					widgetConfig, function() {
						if (this.Ext.isEmpty(this.$entities)) {
							this.$entities = this._getDefaultEntities();
						}
						this.fillEntityCollection();
						this.set("moduleLoaded", true);
						this.Ext.callback(callback, scope || this);
					}, scope || this
				]);
			},

			/**
			 * Fills the entity collection.
			 * @protected
			 */
			fillEntityCollection: function() {
				this.$EntityCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.Terrasoft.each(this.$entities, function(item) {
					const schemaName = item.schemaName;
					const id = "FullPipelinePropertiesItemModule" + schemaName;
					const model = this.Ext.create("Terrasoft.BaseViewModel", {
						values: item
					});
					model.Ext = this.Ext;
					model.Terrasoft = this.Terrasoft;
					model.sandbox = this.sandbox;
					model.id = id;
					model.renderPropertiesItem = this.renderPropertiesItem;
					this.$EntityCollection.add(schemaName, model);
					this.subscribePostItemConfigItems([id]);
				}, this);
			},

			/**
			 * Subscribes on item parameters changes message.
			 * @param {String[]} tags Tags for filtering messages
			 */
			subscribePostItemConfigItems: function(tags) {
				this.sandbox.subscribe("PostItemConfig", function(config) {
					this._applyItemFilters(config);
				}, this, tags);
			},

			/**
			 * Applies item filters.
			 * @param {Object} config Changed config.
			 * @private
			 */
			_applyItemFilters: function(config) {
				const entities = this.Terrasoft.deepClone(this.$entities);
				const findResult = this.Terrasoft.findItem(entities, {
					schemaName: config.schemaName
				});
				const foundItem = findResult && findResult.item;
				foundItem.filters = config.serializedFilter;
				this.set("entities", entities);
			},

			/**
			 * @private
			 */
			_getDefaultEntities: function() {
				return [
					{
						"schemaName": "Lead",
						"connectedWith": null,
						"calculatedOperations": [{"operation": "Amount", "targetColumnName": "Budget"}],
						"filters": null
					},
					{
						"schemaName": "Opportunity",
						"calculatedOperations": [{"operation": "Amount", "targetColumnName": "Budget"}],
						"connectedWith": {
							"type": 0,
							"schemaName": "Lead",
							"connectionSchemaName": "Lead",
							"parentSchemaColumnName": "Opportunity",
							"childSchemaColumnName": "Id"
						},
						"filters": null
					}
				];
			},

			/**
			 * Returns item view config.
			 * @param {Object} itemConfig Item config.
			 * @return {Object} Item view config.
			 */
			getItemViewConfig: function(itemConfig) {
				itemConfig.config = {
					id: "Item",
					className: "Terrasoft.Container",
					items: [],
					afterrender: {bindTo: "renderPropertiesItem"}
				};
				return itemConfig;
			},

			/**
			 * Renders properties item.
			 */
			renderPropertiesItem: function() {
				var schemaName = this.$schemaName;
				var renderTo =  this.Ext.String.format("Item-{0}-{1}", schemaName, this.sandbox.id);
				this.sandbox.loadModule("FullPipelinePropertiesItemModule", {
					renderTo: renderTo,
					id: this.id,
					instanceConfig: {
						parameters: {
							viewModelConfig: {
								SchemaName: schemaName,
								Filters: this.$filters
							}
						}
					}
				});
			}

		},
		diff: [
			{
				"operation": "insert",
				"name": "EntitiesContainer",
				"parentName": "WidgetProperties",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["widget-properties-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EntitiesList",
				"parentName": "EntitiesContainer",
				"propertyName": "items",
				"values": {
					"visible": Terrasoft.Features.getIsEnabled("FullPipelineDesigner"),
					"idProperty": "schemaName",
					"dataItemIdPrefix": "schema-properties",
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"collection": "EntityCollection",
					"onGetItemConfig": "getItemViewConfig"
				}
			}
		]
	};
});


