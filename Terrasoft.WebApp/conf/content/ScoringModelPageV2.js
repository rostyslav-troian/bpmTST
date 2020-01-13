Terrasoft.configuration.Structures["ScoringModelPageV2"] = {innerHierarchyStack: ["ScoringModelPageV2"], structureParent: "BaseModulePageV2"};
define('ScoringModelPageV2Structure', ['ScoringModelPageV2Resources'], function(resources) {return {schemaUId:'73b13bcd-c228-4af5-bab3-2015caca1ba8',schemaCaption: "ScoringModelPageV2", parentSchemaName: "BaseModulePageV2", schemaName:'ScoringModelPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ScoringModelPageV2", ["ScoringModelPageV2Resources", "css!ScoringModuleCSS"], function(resources) {
	return {
		entitySchemaName: "ScoringModel",
		attributes: {
			/**
			 * Object of scoring model.
			 */
			ScoringObject: {
				lookupListConfig: {
					actionsMenuConfig: [],
					captionLookup: resources.localizableStrings.ScoringObjectLookupCaption,
					filter: function() {
						return this.getScoringObjectFilters();
					}
				},
				"onChange": "onScoringObjectChanged"
			},

			/**
			 * Columns of scoring object schema that are eligible as scoring parameter.
			 */
			ScoringObjectColumns: {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true
			},

			/**
			 * Parameter of scoring model.
			 */
			ScoringParameterColumn: {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {"bindTo": "Resources.Strings.ScoringParameterCaption"},
				"isRequired": false,
				"onChange": "onScoringParameterChanged"
			}
		},
		methods: {
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.clear();
				return actionMenuItems;
			},

			/**
			 * Returns group of filters for ScoringObject lookup.
			 * @return {Terrasoft.FilterGroup} Group of filters for ScoringObject lookup.
			 */
			getScoringObjectFilters: function() {
				var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				filterGroup.add("ScoringObjectIsInCurrentWorkspace",
					Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SysWorkspace.Id",
						Terrasoft.SysValue.CURRENT_WORKSPACE.value, Terrasoft.DataValueType.TEXT));
				filterGroup.add("ScoringObjectIsSectionObject",
					Terrasoft.createColumnIsNotNullFilter(
						"[SysModuleEntity:SysEntitySchemaUId:Id].[SysModuleEdit:SysModuleEntity:Id].CardSchemaUId"));
				return filterGroup;
			},

			/**
			 * @inheritdoc BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.initializeScoringParameterColumn();
			},

			/**
			 * Initializes ScoringParameterColumn property.
			 */
			initializeScoringParameterColumn: function() {
				var itemValue = this.get("ColumnUId");
				var itemDisplayValue = this.get("ColumnCaption");
				var scoringParameterColumn = this.getListValue(itemValue, itemDisplayValue);
				this.set("ScoringParameterColumn", scoringParameterColumn);
			},

			/**
			 * @inheritdoc BasePageV2#getPageHeaderCaption
			 * @overridden
			 */
			getPageHeaderCaption: function() {
				var scroingModelCaption = this.get("Resources.Strings.ScoringModelCaption");
				return Ext.String.format(scroingModelCaption, this.get("Name"));
			},

			/**
			 * Handles ScoringParameter change.
			 */
			onScoringParameterChanged: function() {
				var item = this.get("ScoringParameterColumn");
				if (item && item.value) {
					this.set("ColumnUId", item.value);
					this.set("ColumnCaption", item.displayValue);
				}
			},

			/**
			 * Loads values into  ScoringParameter combobox.
			 * @param {String} filterValue ComboboxEdit value.
			 * @param {Terrasoft.Collection} list List of comboboxEdit values.
			 */
			prepareScoringParameterColumn: function(filterValue, list) {
				if (list) {
					list.clear();
					var scoringObjectColumns = this.get("ScoringObjectColumns");
					list.loadAll(scoringObjectColumns);
				}
			},

			/**
			 * Returns name of object entity schema.
			 * @private
			 * @param (Object) entity Object.
			 * @return {String} Name of object schema.
			 */
			getObjectSchemaName: function(entity) {
				var scoringObjectSchemaName = "";
				if (entity && entity.value) {
					var scoringObjectUId = entity.value;
					var scoringObjectSchema = Terrasoft.EntitySchemaManager.getItem(scoringObjectUId);
					scoringObjectSchemaName = scoringObjectSchema.name;
				}
				return scoringObjectSchemaName;
			},

			/**
			 * Sets list of columns into ScoringObjectColumns property.
			 * @private
			 * @param {Array} columns Array of columns.
			 */
			onScoringObjectColumnsLoaded: function(columns) {
				var items = [];
				Terrasoft.each(columns, function(column) {
					if (column.usageType === 0 && Terrasoft.isNumberDataValueType(column.dataValueType)) {
						items.push(this.getListValue(column.uId, column.caption));
					}
				}, this);
				this.set("ScoringObjectColumns", this.convertArrayToObject(items));
			},

			/**
			 * Loads columns of scoring object and executes callback function.
			 * @private
			 * @param {String} schemaName Name of entity schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context of callback function.
			 */
			loadScoringObjectColumns: function(schemaName, callback, scope) {
				Terrasoft.require([schemaName], function(entitySchema) {
					var columns = entitySchema && entitySchema.columns;
					this.onScoringObjectColumnsLoaded(columns);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Initializes ScoringObjectColumns property.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context of callback function.
			 */
			initializeScoringObjectColumns: function(callback, scope) {
				var scoringObject = this.get("ScoringObject");
				var scoringObjectSchemaName = this.getObjectSchemaName(scoringObject);
				this.loadScoringObjectColumns(scoringObjectSchemaName, callback, scope);
			},

			/**
			 * Change handler for ScoringObject property.
			 * @protected
			 */
			onScoringObjectChanged: function() {
				this.set("ColumnUId", null);
				this.set("ColumnCaption", null);
				this.set("ScoringParameterColumn", null);
				this.initializeScoringObjectColumns();
			},

			/**
			 * @inheritdoc BasePageV2#getPageHeaderCaption
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initializeScoringObjectColumns(function() {
						this.initializeScoringParameterColumn();
						callback.call(scope);
					}, this);
				}, this]);
			},

			/**
			 * Converts arguments to lookup item.
			 * @private
			 * @param {Object} value Value of lookup.
			 * @param {String} displayValue DisplayValue of lookup.
			 * @return {Object} Lookup item.
			 */
			getListValue: function(value, displayValue) {
				return {
					value: value,
					displayValue: displayValue
				};
			},

			/**
			 * Converts array into object with properties named as values of array.
			 * @private
			 * @param {Array} array Input array.
			 * @return {Object} Result object.
			 */
			convertArrayToObject: function(array) {
				var object = {};
				Terrasoft.each(array, function(element) {
					object[element.value] = element;
				}, this);
				return object;
			}
		},
		details: {
			ScoringRules: {
				schemaName: "ScoringRuleDetailV2",
				filter: {
					detailColumn: "ScoringModel"
				},
				defaultValues: {
					ScoringModelObjectId: {
						masterColumn: "ScoringObject"
					}
				}
			}
		},
		modules: {
			"ContextHelpProfile": {
				"config": {
					"schemaName": "ContextHelpProfileSchema",
					"isSchemaConfigInitialized": true,
					"useHistoryState": false,
					"parameters": {
						"viewModelConfig": {
							"contextHelpId": 1586,
							"contextHelpDescription": resources.localizableStrings.ContextHelpDescription,
							"contextHelpIconConfig": resources.localizableImages.ContextHelpIcon
						}
					}
				}
			}
		},
		diff: [
			{
				"operation": "remove",
				"name": "HeaderContainer"
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "insert",
				"parentName": "LeftModulesContainer",
				"propertyName": "items",
				"name": "ContextHelpProfile",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"layout": {"row": 0, "column": 0, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "ScoringObject",
				"values": {
					"layout": {"row": 1, "column": 0, "colSpan": 24},
					"enabled": {"bindTo": "isNewMode"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "ScoringParameterColumn",
				"values": {
					"bindTo": "ScoringParameterColumn",
					"layout": {"row": 2, "column": 0, "colSpan": 24},
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"labelConfig": {
						"visible": true,
						"caption": {"bindTo": "Resources.Strings.ScoringParameterCaption"}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "prepareScoringParameterColumn"}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"name": "IsActive",
				"values": {
					"layout": {"row": 3, "column": 0, "colSpan": 24}
				}
			},
			{
				"operation": "insert",
				"name": "ScoringRuleTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ScoringRuleTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ScoringRuleTab",
				"propertyName": "items",
				"name": "ScoringRules",
				"values": {"itemType": Terrasoft.ViewItemType.DETAIL}
			}
		]
	};
});


