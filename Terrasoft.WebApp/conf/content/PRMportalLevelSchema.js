Terrasoft.configuration.Structures["PRMportalLevelSchema"] = {innerHierarchyStack: ["PRMportalLevelSchema"], structureParent: "BaseEntityPage"};
define('PRMportalLevelSchemaStructure', ['PRMportalLevelSchemaResources'], function(resources) {return {schemaUId:'04944f96-6bb9-4e33-b029-47094aa0db1b',schemaCaption: "PRMportalLevelSchema", parentSchemaName: "BaseEntityPage", schemaName:'PRMportalLevelSchema',parentSchemaUId:'81c2ebad-7f20-4e71-b0c6-941b1422ba62',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PRMportalLevelSchema", ["PRMEnums"], function() {
	return {
		entitySchemaName: "Partnership",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			/**
			 * Partnership current level.
			 * @type {Integer}
			 */
			"CurrentLevel": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partnership max current level.
			 * @type {Integer}
			 */
			"MaxCurrentLevel": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"value": 0
			},
			/**
			 * Partner type.
			 * @type: {Terrasoft.DataValueType.LOOKUP}
			 */
			"PartnerType": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP
			},
			/**
			 * Partner level.
			 * @type: {Terrasoft.DataValueType.LOOKUP}
			 */
			"PartnerLevel": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP
			}
		},
		methods: {

			/**
			 * Creates ESQ instance.
			 * @private
			 * @param {String} Schema name.
			 * @return {Terrasoft.EntitySchemaQuery} esq.
			 */
			createESQ: function(schemaName) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: schemaName
				});
				return esq;
			},

			/**
			 * Handles entitySchemaQuery.getEntityCollection getCurrentValues query response.
			 * @private
			 * @param {Object} response entitySchemaQuery response.
			 */
			getCurrentValuesHandler: function(response) {
				if (response && response.success) {
					var collection = response.collection;
					if (collection && collection.getCount() > 0) {
						var currentRecord = collection.getByIndex(0);
						this.set("PartnerType", currentRecord.get("PartnerType"));
						this.set("PartnerLevel", currentRecord.get("PartnerLevel"));
						this.setCurrentLevels(currentRecord.get("Number"));
					}
				}
			},

			/**
			 * Handles entitySchemaQuery.getEntityCollection PartnerLevel query response.
			 * @private
			 * @param {Int} Current level.
			 * @param {Object} response entitySchemaQuery response.
			 */
			getPartnerLevelHandler: function(currentLevel, response) {
				if (response && response.success) {
					var collection = response.collection;
					if (collection && collection.getCount() > 0) {
						var maxLevel = collection.getByIndex(0).get("MaxNumber");
						this.set("MaxCurrentLevel", maxLevel);
						this.set("CurrentLevel", currentLevel);
					}
				}
			},

			/**
			 * Gets current value for round bar.
			 * @protected
			 */
			getCurrentValues: function() {
				var esq = this.createESQ("Partnership");
				this.addQueryColumns(esq);
				esq.filters = this.getQueryFilters();
				esq.getEntityCollection(this.getCurrentValuesHandler, this);
			},

			/**
			 * Sets max available partnership level.
			 * @protected
			 * @param {Object} esq query.
			 */
			addQueryColumns: function(esq) {
				esq.addColumn("PartnerLevel.Number", "Number");
				esq.addColumn("PartnerLevel.PartnerType", "PartnerType");
				esq.addColumn("PartnerLevel");
			},

			/**
			 * Get filters for esq query
			 * @protected
			 */
			getQueryFilters: function() {
				var filterGroup = this.Terrasoft.createFilterGroup();
				filterGroup.add("ActiveFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "IsActive", true));
				return filterGroup;
			},

			/**
			 * Sets max and current partnership level.
			 * @protected
			 * @param {Int} Current level.
			 */
			setCurrentLevels: function(currentLevel) {
				var partnerType = this.get("PartnerType");
				if (partnerType) {
					var esq = this.createESQ("PartnerLevel");
					esq.addAggregationSchemaColumn("Number", Terrasoft.AggregationType.MAX, "MaxNumber");
					var typeFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"PartnerType", partnerType.value);
					esq.filters.addItem(typeFilter);
					esq.getEntityCollection(function(response) {
						this.getPartnerLevelHandler(currentLevel, response);
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.getCurrentValues();
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"propertyName": "items",
				"name": "MainMetricsContainer",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["main-widget-metrics-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MainMetricsContainer",
				"propertyName": "items",
				"name": "MetricsContainer",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["widget-metrics-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MetricsContainer",
				"propertyName": "items",
				"name": "CurrentLevelContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["widget-metric-item", "widget-days-in-funnel-container"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "CurrentLevelContainer",
				"propertyName": "items",
				"name": "CurrentLevelValue",
				"values": {
					"generator": "ConfigurationRoundProgressBarGenerator.generateProgressBar",
					"controlConfig": {
						"captionSuffix": "",
						"value": {"bindTo": "CurrentLevel"},
						"maxValue": {"bindTo": "MaxCurrentLevel"},
						"size": 105,
						"clockwise" : true,
						"borderWidth": 4,
						"classes": ["ts-font-light"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "CurrentLevelContainer",
				"propertyName": "items",
				"name": "CurrentLevelCaptionContainer",
				"values": {
					"items": [],
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["widget-metric-item", "widget-days-in-funnel-container"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "CurrentLevelCaptionContainer",
				"propertyName": "items",
				"name": "CurrentLevelCaption",
				"values": {
					"caption": {"bindTo": "Resources.Strings.CurrentLevelCaption"},
					"classes": {"labelClass": ["widget-metric-item-caption"]},
					"itemType": Terrasoft.ViewItemType.LABEL
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {}
	};
});


