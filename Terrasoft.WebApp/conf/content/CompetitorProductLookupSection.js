Terrasoft.configuration.Structures["CompetitorProductLookupSection"] = {innerHierarchyStack: ["CompetitorProductLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('CompetitorProductLookupSectionStructure', ['CompetitorProductLookupSectionResources'], function(resources) {return {schemaUId:'48e4b697-ffcf-4d85-9f1a-77e001c47f46',schemaCaption: "Lookup page - Competitor products", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'CompetitorProductLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CompetitorProductLookupSection", ["CompetitorProductLookupSectionResources", "ConfigurationEnums"],
	function(resources, ConfigurationEnums) {
		return {
			entitySchemaName: "CompetitorProduct",
			attributes: {
				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#UseSeparatedPageHeader
				 * @overridden
				 */
				"UseSeparatedPageHeader": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#UseSectionHeaderCaption
				 * @overridden
				 */
				"UseSectionHeaderCaption": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},
			messages: {},
			methods: {
				/**
				 * Opens the new record page.
				 * @param {String} typeColumnValue Value of column type.
				 * @protected
				 */
				addRecord: function(typeColumnValue) {
					if (!typeColumnValue) {
						var editPages = this.get("EditPages");
						if (editPages.getCount() > 1) {
							return false;
						}
						var tag = this.get("AddRecordButtonTag");
						typeColumnValue = tag || this.Terrasoft.GUID_EMPTY;
					}
					var schemaName = this.getEditPageSchemaName(typeColumnValue);
					this.openCardInChain({
						schemaName: schemaName,
						operation: ConfigurationEnums.CardStateV2.ADD,
						moduleId: this.getChainCardModuleSandboxId(typeColumnValue),
						instanceConfig: {
							useSeparatedPageHeader: this.get("UseSeparatedPageHeader")
						}
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getModuleCaption
				 * @overridden
				 */
				getModuleCaption: function() {
					var historyState = this.sandbox.publish("GetHistoryState");
					var state = historyState.state;
					if (state && state.caption) {
						return state.caption;
					}
					if (this.entitySchema) {
						var headerTemplate = this.get("Resources.Strings.HeaderCaption");
						return this.Ext.String.format(headerTemplate, this.entitySchema.caption);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


