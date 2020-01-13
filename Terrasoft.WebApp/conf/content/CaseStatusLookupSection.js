Terrasoft.configuration.Structures["CaseStatusLookupSection"] = {innerHierarchyStack: ["CaseStatusLookupSection"], structureParent: "BaseLookupConfigurationSection"};
define('CaseStatusLookupSectionStructure', ['CaseStatusLookupSectionResources'], function(resources) {return {schemaUId:'e231aa20-bc42-4ec3-a54b-77ee6df3c2cc',schemaCaption: "Lookup section page schema - Case status", parentSchemaName: "BaseLookupConfigurationSection", schemaName:'CaseStatusLookupSection',parentSchemaUId:'c8c39e3b-de05-4d01-814a-45c7981e139f',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseStatusLookupSection", ["CaseStatusLookupSectionResources", "ConfigurationEnums", "CasePageUtilitiesV2"],
	function(resources, ConfigurationEnums) {
		return {
			entitySchemaName: "CaseStatus",
			attributes: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			messages: {},
			mixins: {
				/**
				 * @class CasePageUtilitiesV2 implements quick save cards in one click.
				 */
				CasePageUtilitiesV2: "Terrasoft.CasePageUtilitiesV2"
			},
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
						moduleId: this.getChainCardModuleSandboxId(typeColumnValue)
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
				},
				/**
				 * Update CaseStatusCache on change value
				 * @overridden
				 */
				onActiveRowChange: function() {
					this.getCaseNextStatuses();
					this.callParent(arguments);
				}
			}
		};
	});


