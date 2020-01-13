Terrasoft.configuration.Structures["OrderGeneratedWebFormPageV2"] = {innerHierarchyStack: ["OrderGeneratedWebFormPageV2"], structureParent: "BaseGeneratedWebFormPageV2"};
define('OrderGeneratedWebFormPageV2Structure', ['OrderGeneratedWebFormPageV2Resources'], function(resources) {return {schemaUId:'c3ed250e-bd3c-4b8a-b443-486965b9fcad',schemaCaption: "Landing edit page for order", parentSchemaName: "BaseGeneratedWebFormPageV2", schemaName:'OrderGeneratedWebFormPageV2',parentSchemaUId:'424d9da7-8f97-4524-8089-e64620d8b3fa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OrderGeneratedWebFormPageV2", ["OrderGeneratedWebFormPageV2Resources"],
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
						scriptTemplate = this.get("Resources.Strings.OrderScriptTemplate");
					} else {
						scriptTemplate = this.get("Resources.Strings.ScriptTemplate");
					}
					return scriptTemplate;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


