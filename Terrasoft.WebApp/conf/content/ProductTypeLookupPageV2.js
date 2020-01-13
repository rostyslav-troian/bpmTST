Terrasoft.configuration.Structures["ProductTypeLookupPageV2"] = {innerHierarchyStack: ["ProductTypeLookupPageV2"], structureParent: "BaseLookupConfigurationSection"};
define('ProductTypeLookupPageV2Structure', ['ProductTypeLookupPageV2Resources'], function(resources) {return {schemaUId:'aa4c6c57-e43f-4e66-84e7-879c6dcdaf22',schemaCaption: "Lookup page - Product types", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'ProductTypeLookupPageV2',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductTypeLookupPageV2", ["ProductTypeLookupPageV2Resources", "ConfigurationEnums"],
	function(resources, ConfigurationEnums) {
		return {
			entitySchemaName: "ProductType",
			attributes: {},
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


