Terrasoft.configuration.Structures["CaseDeadlineCalculationSchemasEditPage"] = {innerHierarchyStack: ["CaseDeadlineCalculationSchemasEditPage"], structureParent: "BaseLookupPage"};
define('CaseDeadlineCalculationSchemasEditPageStructure', ['CaseDeadlineCalculationSchemasEditPageResources'], function(resources) {return {schemaUId:'a258fb19-fbd3-4ec6-868c-f1b0850f10e7',schemaCaption: "CaseDeadlineCalculationSchemasEditPage", parentSchemaName: "BaseLookupPage", schemaName:'CaseDeadlineCalculationSchemasEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseDeadlineCalculationSchemasEditPage", ["CaseDeadlineCalculationSchemasEditPageResources"],
	function() {
		return {
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			entitySchemaName: "DeadlineCalcSchemas",
			attributes: {
				"DefaultStatusDbValue" : {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},
				"IsDefaultStatusAlreadyChanged" : {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				"ChangeDefaultStatus": {
					dependencies: [{
						columns: ["Default"],
						methodName: "onDefaultChange"
					}]
				},
				"AlternativeRule": {
					lookupListConfig: {
						filter: function() {
							var id = this.get("Id");
							var filtersCollection = this.Terrasoft.createFilterGroup();
							var notSelfFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, "Id",
									id);
							filtersCollection.add("notSelfFilter", notSelfFilter);
							return filtersCollection;
						}
					}
				}
			},
			diff: [],

			methods: {

				/**
				 * Handles the change event of Default column.
				 * @private
				 */
				onDefaultChange: function() {
					if(!this.get("IsDefaultStatusAlreadyChanged")) {
						this.set("DefaultStatusDbValue", this.getPrevious("Default"));
						this.set("IsDefaultStatusAlreadyChanged", true);
					}
				},

				/**
				 * @inheritDoc BasePageV2#asyncValidate
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						Terrasoft.chain(
								this.validateLoop,
								this.validateDefaultStrategy,
								this.validateName,
								function(next) {
									callback.call(scope, response);
									next();
								}, this);
					}, this]);
				},

				/**
				 * Validate Default column value.
				 * @private
				 * @param {Function} callback - callback function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
				 */
				validateDefaultStrategy: function(callback) {
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Default)) {
						this.innerValidationCallback.call(this, {success: true}, callback);
					} else {
						var result = {success: true};
						if(this.get("DefaultStatusDbValue") && !this.get("Default")) {
							result = {
								message: this.get("Resources.Strings.RequiredDefaultCalcSchemaMessage"),
								success: false
							};
						}
						this.innerValidationCallback.call(this, result, callback);
					}
				},

				/**
				 * Validate Name column value.
				 * @private
				 * @param {Function} callback - callback function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
				 */
				validateName: function(callback) {
					var innerCallback = function(response) {
						if (this.validateResponse(response)) {
							this.innerValidationCallback.call(this, response, callback);
						}
					};
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Name)) {
						this.innerValidationCallback.call(this, {success: true}, callback);
					} else {
						this.nameHasDuplicatesValidate(innerCallback);
					}
				},

				/**
				 * Validate that two strategy not linked.
				 * @private
				 * @param {Function} callback - callback function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
				 */
				validateLoop: function(callback) {
					if (!this.changedValues || this.Ext.isEmpty(this.changedValues.AlternativeRule)) {
						this.innerValidationCallback.call(this, {success: true}, callback);
					} else {
						var id = this.get("Id");
						var alternativeRule = this.get("AlternativeRule");
						if (alternativeRule) {
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "DeadlineCalcSchemas"
							});
							esq.addColumn("AlternativeRule");
							esq.getEntity(alternativeRule.value, function(result) {
								if (result.success && id === result.entity.get("AlternativeRule").value) {
										result = {
											message: this.get("Resources.Strings.PairAlreadyUsedMessage"),
											success: false
										};
								}
								this.innerValidationCallback.call(this, result, callback);
							}, this);
						}
					}
				},

				/**
				 * Validate that name column value has no duplicates.
				 * @private
				 * @param {Function} callback -  function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
				 */
				nameHasDuplicatesValidate: function(callback) {
					var name = this.changedValues.Name;
					var id = this.get("Id");
					var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "DeadlineCalcSchemas"
					});
					query.addColumn("Id");
					var duplicatesFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Name", name);
					var notSelfFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
							"Id", id);
					var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					filterGroup.addItem(notSelfFilter);
					filterGroup.addItem(duplicatesFilter);
					query.filters.addItem(filterGroup);
					query.getEntityCollection(function(resultQuery) {
						this.getHasDuplicatesHandler(callback, resultQuery);
					}, this);
				},

				/**
				 * Handles entitySchemaQuery.getEntityCollection getHasDuplicates query response.
				 * @private
				 * @param {Function} callback - callback function.
				 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
				 * @param {String} result entitySchemaQuery result.
				 */
				getHasDuplicatesHandler: function(callback, result) {
					if (result.success && result.collection.getCount()) {
							result = {
								message: this.get("Resources.Strings.NameIsDuplicateMessage"),
								success: false
							};
					}
					callback.call(this, result);
				},

				/**
				 * Call next vaildation function
				 * @param {Object} response
				 * @param {Function} callback
				 */
				innerValidationCallback: function(response, callback) {
					if (this.validateResponse(response)) {
						callback.call(this, response);
					}
				}
			}
		};
	});


