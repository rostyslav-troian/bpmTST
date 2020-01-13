Terrasoft.configuration.Structures["EventTargetGeneratedWebFormPageV2"] = {innerHierarchyStack: ["EventTargetGeneratedWebFormPageV2"], structureParent: "BaseGeneratedWebFormPageV2"};
define('EventTargetGeneratedWebFormPageV2Structure', ['EventTargetGeneratedWebFormPageV2Resources'], function(resources) {return {schemaUId:'bc981abf-a794-44d2-be6a-8a9368bd8fd5',schemaCaption: "Landing edit page for event target", parentSchemaName: "BaseGeneratedWebFormPageV2", schemaName:'EventTargetGeneratedWebFormPageV2',parentSchemaUId:'424d9da7-8f97-4524-8089-e64620d8b3fa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventTargetGeneratedWebFormPageV2", ["EventTargetGeneratedWebFormPageV2Resources"],
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
						scriptTemplate = this.get("Resources.Strings.EventTargetScriptTemplate");
					} else {
						scriptTemplate = this.get("Resources.Strings.ScriptTemplate");
					}
					return scriptTemplate;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


