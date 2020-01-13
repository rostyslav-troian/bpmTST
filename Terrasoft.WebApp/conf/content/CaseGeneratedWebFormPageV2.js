Terrasoft.configuration.Structures["CaseGeneratedWebFormPageV2"] = {innerHierarchyStack: ["CaseGeneratedWebFormPageV2"], structureParent: "BaseGeneratedWebFormPageV2"};
define('CaseGeneratedWebFormPageV2Structure', ['CaseGeneratedWebFormPageV2Resources'], function(resources) {return {schemaUId:'f1f8b2c7-a802-40e0-b43b-952080b8ffc0',schemaCaption: "Landing edit page for case", parentSchemaName: "BaseGeneratedWebFormPageV2", schemaName:'CaseGeneratedWebFormPageV2',parentSchemaUId:'424d9da7-8f97-4524-8089-e64620d8b3fa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseGeneratedWebFormPageV2", ["CaseGeneratedWebFormPageV2Resources"],
	function() {
		return {
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc BaseGeneratedWebFormPageV2#getScriptTemplateFromResources
				 * @overriden
				 */
				getScriptTemplateFromResources: function() {
					var scriptTemplate;
					if (this.getIsFeatureEnabled("OutboundCampaign")) {
						scriptTemplate = this.get("Resources.Strings.CaseScriptTemplate");
					} else {
						scriptTemplate = this.get("Resources.Strings.ScriptTemplate");
					}
					return scriptTemplate;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


