Terrasoft.configuration.Structures["SspEntitySchemaAccessListLookupSection"] = {innerHierarchyStack: ["SspEntitySchemaAccessListLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('SspEntitySchemaAccessListLookupSectionStructure', ['SspEntitySchemaAccessListLookupSectionResources'], function(resources) {return {schemaUId:'eb8f94b5-1443-4c58-bda8-3f8e6fbd04c6',schemaCaption: "SspEntitySchemaAccessListLookupSection", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'SspEntitySchemaAccessListLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspEntitySchemaAccessListLookupSection", ["ConfigurationGridUtilities"],
	function() {
		return {
			entitySchemaName: "VwSysSSPEntitySchemaAccessList",
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
			},
			attributes: {
				"IsAddMode": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilites#getCellControlsConfig
				 * @overridden
				 */
				getCellControlsConfig: function() {
					let controlsConfig =
						this.mixins.ConfigurationGridUtilities.getCellControlsConfig.apply(this, arguments);
					if (!this.get("IsAddMode")) {
						this.Ext.apply(controlsConfig, {
							enabled: false
						});
					}
					return controlsConfig;
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#createNewRow
				 * @overridden
				 */
				createNewRow: function() {
					this.set("IsAddMode", true);
					this.mixins.ConfigurationGridUtilities.createNewRow.apply(this, arguments);
					this.set("IsAddMode", false);
				},

				/**
				 * @inheritDoc Terrasoft.BaseSection#isSeparateModeActionsButtonVisible
				 * @overridden
				 */
				isSeparateModeActionsButtonVisible: function () {
					return false;
				},

				/**
				 * @inheritDoc BaseDataView#loadFiltersModule
				 * @overridden
				 */
				loadFiltersModule: this.Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "activeRowActionCopy"
				},
				{
					"operation": "remove",
					"name": "activeRowActionCard"
				}
			]/**SCHEMA_DIFF*/
		};
	});


