Terrasoft.configuration.Structures["PriorityInSupportLevelDetailV2"] = {innerHierarchyStack: ["PriorityInSupportLevelDetailV2"], structureParent: "BaseGridDetailV2"};
define('PriorityInSupportLevelDetailV2Structure', ['PriorityInSupportLevelDetailV2Resources'], function(resources) {return {schemaUId:'538554e7-50b1-45a0-a248-5de5a1053e52',schemaCaption: "PriorityInSupportLevelDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'PriorityInSupportLevelDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PriorityInSupportLevelDetailV2", ["ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilities"], function() {
	return {
		entitySchemaName: "PriorityInSupportLevel",
		attributes: {
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		details: {},
		diff: [
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generatActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"activeRowActions": [
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "save",
							"markerValue": "save",
							"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "cancel",
							"markerValue": "cancel",
							"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "remove",
							"markerValue": "remove",
							"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
						}
					],
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"multiSelect": false
				}
			}
		],
		mixins: {
			ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
		},
		methods: {
			/**
			 * Run base saveRowChanges from mixin.
			 * @private
			 */
			runSaveRowChanges: function(args) {
				this.mixins.ConfigurationGridUtilites.saveRowChanges.apply(this, args);
			},

			/**
			 * Show message-box.
			 * @param {String} message - message name.
			 * @private
			 */
			showMessageBox: function(message) {
				this.Terrasoft.utils.showInformation(this.get("Resources.Strings." + message + ""));
			},

			/**
			 * Validate handler.
			 * @private
			 * @param {Array} args - arguments from saveRowChanges.
			 * @param {object} resultQuery - result from getEntityCollection.
			 */
			validateCasePriorityHandler: function(args, resultQuery) {
				if (resultQuery.success && resultQuery.collection.getItems()[0].get("Count") > 0) {
					this.showMessageBox("CasePriorityIsExist");
				} else {
					this.runSaveRowChanges(args);
				}
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
			 * @overridden
			 */
			saveRowChanges: function(row) {
				var args = arguments;
				if (!Ext.isObject(row)) {
					this.runSaveRowChanges(args);
				} else {
					if (Ext.isEmpty(row.get("CasePriority"))) {
						this.showMessageBox("CasePriorityIsNotFilling");
						return;
					}
					if (this.IsResponseOrReactionEmpty(row)) {
						this.validationForUniquenessCasePriorityName(args, row,
								this.validateCasePriorityHandler);
					} else {
						this.showMessageBox("ResponseOrReactionFillingFalse");
					}
				}
			},

			/**
			 * Validate that casePriority column value has no duplicates.
			 * @private
			 * @param {Function} callback -  function this.validateCasePriorityHandler.
			 * @param {Array} args - arguments from saveRowChanges.
			 * @param {object} activeRow - active row object.
			 */
			validationForUniquenessCasePriorityName: function(args, activeRow, callback) {
				var id = activeRow.get("Id");
				var casePriority = activeRow.get("CasePriority").value;
				var supportLevel = activeRow.get("SupportLevel").value;
				var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "PriorityInSupportLevel"
				});
				query.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
				var duplicatesFilter = query.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CasePriority", casePriority);
				var duplicatesSupportLevelFilter = query.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SupportLevel", supportLevel);
				var notSelfFilter = query.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL, "Id", id);
				var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				filterGroup.addItem(notSelfFilter);
				filterGroup.addItem(duplicatesFilter);
				filterGroup.addItem(duplicatesSupportLevelFilter);
				query.filters.addItem(filterGroup);
				query.getEntityCollection(function(resultQuery) {
					callback.call(this, args, resultQuery);
				}, this);
			},

			/**
			 * Validate that response or reaction filling.
			 * @private
			 * @param {object} activeRow - active row object.
			 */
			IsResponseOrReactionEmpty: function(activeRow) {
				var reactionTime = activeRow.get("ReactionTimeUnit");
				var reactionValue = activeRow.get("ReactionTimeValue");
				var solutionTime = activeRow.get("SolutionTimeUnit");
				var solutionValue = activeRow.get("SolutionTimeValue");
				return (reactionValue > 0 && reactionTime) || (solutionValue > 0 && solutionTime);
			}
		}
	};
});


