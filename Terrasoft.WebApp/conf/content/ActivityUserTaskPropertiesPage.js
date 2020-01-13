Terrasoft.configuration.Structures["ActivityUserTaskPropertiesPage"] = {innerHierarchyStack: ["ActivityUserTaskPropertiesPage"], structureParent: "BaseActivityUserTaskPropertiesPage"};
define('ActivityUserTaskPropertiesPageStructure', ['ActivityUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'f771cce5-2ce8-4784-8c8d-dcf67ff3ac5d',schemaCaption: "ActivityUserTaskPropertiesPage", parentSchemaName: "BaseActivityUserTaskPropertiesPage", schemaName:'ActivityUserTaskPropertiesPage',parentSchemaUId:'29d2ae27-fd0e-4847-acbc-58d964011393',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseActivityUserTaskPropertiesPage
 */
define("ActivityUserTaskPropertiesPage", ["terrasoft", "ConfigurationConstants", "Contact"],
	function(Terrasoft, ConfigurationConstants, Contact) {
		return {
			messages: {},
			mixins: {},
			attributes: {
				"ActivityCategory": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					doAutoSave: true,
					initMethod: "initActivityCategory"
				}
			},
			methods: {

				/**
				 * Initialize ActivityCategory attribute.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				initActivityCategory: function(parameter) {
					var value = parameter.getValue();
					var displayValue = parameter.getParameterDisplayValue();
					if (!value) {
						value = ConfigurationConstants.Activity.ActivityCategory.DoIt;
						displayValue = "";
					}
					this.setActivityCategory(value, displayValue);
					if (!displayValue) {
						this.loadLookupDisplayValue("ActivityCategory", value, function(result) {
							this.setActivityCategory(value, result.displayValue);
						});
					}
				},

				/**
				 * Sets ActivityCategory attribute lookup value.
				 * @private
				 * @param {String} value Value.
				 * @param {String} displayValue Display value.
				 */
				setActivityCategory: function(value, displayValue) {
					var activityCategory = {
						"value": value,
						"displayValue": displayValue
					};
					this.set("ActivityCategory", activityCategory);
				},

				/**
				 * Returns EntitySchemaQuery for schema ActivityCategory.
				 * @private
				 * @returns {Terrasoft.EntitySchemaQuery}
				 */
				getEntityActivityCategorySchemaQuery: function() {
					var type = ConfigurationConstants.Activity.Type;
					var rootSchemaName = "ActivityCategory";
					var cacheItemName = rootSchemaName + "_" + this.name;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: rootSchemaName,
						clientESQCacheParameters: {
							cacheItemName: cacheItemName
						}
					});
					esq.addColumn("Name");
					esq.filters.addItem(esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "ActivityType", type.Task));
					return esq;
				},

				/**
				 * Returns list of categories.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function context.
				 */
				getActivityCategoryList: function(callback, scope) {
					scope = scope || this;
					var activityCategory = this.Ext.create("Terrasoft.Collection");
					var esq = this.getEntityActivityCategorySchemaQuery();
					esq.getEntityCollection(function(result) {
						if (result.success) {
							var collection = result.collection;
							collection.each(function(item) {
								var id = item.get("Id");
								var name = item.get("Name");
								activityCategory.add(id, {
									value: id,
									displayValue: name
								});
							}, this);
							callback.call(scope, activityCategory);
						}
					}, this);
				},

				/**
				 * The event handler for preparing of the data drop-down of categories.
				 * @private
				 * @filter {Object} Filters for data preparation.
				 * @list {Terrasoft.Collection} The data for the drop-down list.
				 */
				onPrepareActivityCategoryList: function(filter, list) {
					if (Terrasoft.isEmptyObject(list)) {
						return;
					}
					list.clear();
					this.getActivityCategoryList(function(activityCategory) {
						list.loadAll(activityCategory);
					});
				},

				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
				 * @override
				 */
				getParameterReferenceSchemaUId: function() {
					return Contact.uId;
				},

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#getResultParameterAllValues
				 * @overridden
				 */
				getResultParameterAllValues: function(callback, scope) {
					var activityUserTask = this.get("ProcessElement");
					var activityCategoryParameter = activityUserTask.findParameterByName("ActivityCategory");
					var activityCategoryValue = ConfigurationConstants.Activity.ActivityCategory.DoIt;
					var parameterSourceValue = activityCategoryParameter.sourceValue;
					if (parameterSourceValue.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue) {
						activityCategoryValue = parameterSourceValue.value;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ActivityCategoryResultEntry"
					});
					esq.addColumn("ActivityResult.Id", "ActivityResultId");
					esq.addColumn("ActivityResult.Name", "ActivityResultName");
					var filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"ActivityCategory.Id", activityCategoryValue, Terrasoft.DataValueType.GUID);
					esq.filters.add("ActivityCategoryFilter", filter);
					esq.execute(function(result) {
						var resultParameterValues = {};
						if (result.success === true) {
							result.collection.each(function(item) {
								var id = item.get("ActivityResultId");
								var name = item.get("ActivityResultName");
								resultParameterValues[id] = name;
							});
						}
						callback.call(scope, resultParameterValues);
					});
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ActivityCategory",
					"parentName": "TitleTaskContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareActivityCategoryList"
							}
						},
						"caption": {"bindTo": "Resources.Strings.ActivityCategoryCaption"},
						"wrapClass": ["top-caption-control"]
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


