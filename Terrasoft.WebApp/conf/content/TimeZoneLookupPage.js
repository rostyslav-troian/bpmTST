Terrasoft.configuration.Structures["TimeZoneLookupPage"] = {innerHierarchyStack: ["TimeZoneLookupPage"], structureParent: "BaseLookupConfigurationSection"};
define('TimeZoneLookupPageStructure', ['TimeZoneLookupPageResources'], function(resources) {return {schemaUId:'7c1d71ad-d368-421c-bff6-bc0d49e3913b',schemaCaption: "Lookup page for object \"Timezone\"", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'TimeZoneLookupPage',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TimeZoneLookupPage", ["TimeZoneLookupPageResources"],
	function() {
		return {
			entitySchemaName: "TimeZone",
			attributes: {
				"IsAddMode": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			mixins: {
				"ConfigurationGridUtilities": "Terrasoft.ConfigurationGridUtilities"
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "activeRowActionRemove",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "activeRowActionCopy",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeAddRecordButton",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "SeparateModeBackButton",
					"values": {
						"style": Terrasoft.controls.ButtonEnums.style.BLUE
					}
				}
			],/**SCHEMA_DIFF*/
			methods: {
				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getCellControlsConfig
				 * @overridden
				 */
				getCellControlsConfig: function(entitySchemaColumn) {
					var controlsConfig =
							this.mixins.ConfigurationGridUtilities.getCellControlsConfig.apply(this, arguments);
					if (!this.get("IsAddMode")) {
						var enabled = (entitySchemaColumn.name === "Name");
						this.Ext.apply(controlsConfig, {
							enabled: enabled
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
				}
			}
		};
	});


