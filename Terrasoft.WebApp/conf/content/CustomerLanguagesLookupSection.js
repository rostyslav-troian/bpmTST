Terrasoft.configuration.Structures["CustomerLanguagesLookupSection"] = {innerHierarchyStack: ["CustomerLanguagesLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('CustomerLanguagesLookupSectionStructure', ['CustomerLanguagesLookupSectionResources'], function(resources) {return {schemaUId:'090f4ecb-498b-45e9-89fb-96444c955f3a',schemaCaption: "CustomerLanguagesLookupSection", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'CustomerLanguagesLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomerLanguagesLookupSection", [],
		function() {
			return {
				entitySchemaName: "SysLanguage",
				attributes: {
					"IsAddMode": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": false
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "SeparateModeAddRecordButton"
					}
				]/**SCHEMA_DIFF*/,
				mixins: {
					"ConfigurationGridUtilities": "Terrasoft.ConfigurationGridUtilities"
				},
				messages: {},
				methods: {

					/**
					 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getCellControlsConfig
					 * @overridden
					 */
					getCellControlsConfig: function(entitySchemaColumn) {
						var controlsConfig =
								this.mixins.ConfigurationGridUtilities.getCellControlsConfig.apply(this, arguments);
						if (!this.get("IsAddMode")) {
							var enabled = (entitySchemaColumn.name !== "Code");
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


