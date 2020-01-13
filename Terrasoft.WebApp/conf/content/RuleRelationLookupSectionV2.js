Terrasoft.configuration.Structures["RuleRelationLookupSectionV2"] = {innerHierarchyStack: ["RuleRelationLookupSectionV2"], structureParent: "BaseLookupConfigurationSection"};
define('RuleRelationLookupSectionV2Structure', ['RuleRelationLookupSectionV2Resources'], function(resources) {return {schemaUId:'10587463-7fe7-472d-969c-80b0df66ea98',schemaCaption: "Connection rule section", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'RuleRelationLookupSectionV2',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RuleRelationLookupSectionV2", ["RuleRelationLookupSectionV2Resources", "ConfigurationEnums"],
	function(resources, ConfigurationEnums) {
		return {
			entitySchemaName: "RuleRelation",
			attributes: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			messages: {},
			methods: {
				/**
				 * ######### ######## ########## ######
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
					if (!schemaName) {
						return;
					}
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
						return Ext.String.format(headerTemplate, this.entitySchema.caption);
					}
				}
			}
		};
	});


