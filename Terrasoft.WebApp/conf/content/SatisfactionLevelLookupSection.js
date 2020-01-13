Terrasoft.configuration.Structures["SatisfactionLevelLookupSection"] = {innerHierarchyStack: ["SatisfactionLevelLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('SatisfactionLevelLookupSectionStructure', ['SatisfactionLevelLookupSectionResources'], function(resources) {return {schemaUId:'14d34173-2b82-4b3e-9f4e-f10d8f6343b9',schemaCaption: "SatisfactionLevelLookupSection", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'SatisfactionLevelLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SatisfactionLevelLookupSection", ["ConfigurationGridUtilities"],
	function() {
		return {
			entitySchemaName: "SatisfactionLevel",
			attributes: {},
			messages: {},
			mixins: {
				/**
				 * @class ConfigurationGridUtilities provides utilities for grid.
				 */
				ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
			},
			methods: {

				/**
				 * Sets the absolute value.
				 * @private
				 * @param {Object} row Current row.
				 * @param {Number} value Point value.
				 */
				validatePointValue: function(row, value) {
					row.set("Point", Math.abs(value));
				},

				/**
				 * @inheritdoc ConfigurationGridUtilities#saveRowChanges
				 * overriden
				 */
				saveRowChanges: function(row) {
					var changedValues = row && row.changedValues;
					if (changedValues && changedValues.hasOwnProperty("Point")) {
						this.validatePointValue(row, changedValues.Point);
					}
					this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "activeRowActionCopy"
				}
			]/**SCHEMA_DIFF*/
		};
	});


