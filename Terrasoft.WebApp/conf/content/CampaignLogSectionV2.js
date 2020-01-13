Terrasoft.configuration.Structures["CampaignLogSectionV2"] = {innerHierarchyStack: ["CampaignLogSectionV2"], structureParent: "BaseSectionV2"};
define('CampaignLogSectionV2Structure', ['CampaignLogSectionV2Resources'], function(resources) {return {schemaUId:'6ff0c59e-770b-409d-9539-0459c82b812f',schemaCaption: "Section schema: \"Campaign logs\"", parentSchemaName: "BaseSectionV2", schemaName:'CampaignLogSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignLogSectionV2", [], function() {
	return {
		entitySchemaName: "VwCampaignLog",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowOpenAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			changeSelectedSideBarMenu: function() {
				var moduleName = "Campaign";
				var moduleConfig = Terrasoft.configuration.ModuleStructure[moduleName];
				if (moduleConfig) {
					var sectionSchema = moduleConfig.sectionSchema;
					var config = moduleConfig.sectionModule + "/";
					if (sectionSchema) {
						config += moduleConfig.sectionSchema + "/";
					}
					this.sandbox.publish("SelectedSideBarItemChanged", config, ["sectionMenuModule"]);
				}
			},

			/**
			 * Hides menu item "Open wizard".
			 * @inheritdoc BaseSectionV2#addSectionDesignerViewOptions
			 * @overridden
			 */
			addSectionDesignerViewOptions: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#isVisibleDeleteAction
			 * @overridden
			 */
			isVisibleDeleteAction: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#isVisibleDeleteAction
			 * @overridden
			 */
			getModuleCaption: function() {
				return this.get("Resources.Strings.Caption");
			}
		}
	};
});


