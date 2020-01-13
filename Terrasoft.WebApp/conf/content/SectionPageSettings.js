Terrasoft.configuration.Structures["SectionPageSettings"] = {innerHierarchyStack: ["SectionPageSettings"], structureParent: "BaseSectionPageSettings"};
define('SectionPageSettingsStructure', ['SectionPageSettingsResources'], function(resources) {return {schemaUId:'d2a61e8d-b526-4e96-bc98-98138373a01f',schemaCaption: "SectionPageSettings", parentSchemaName: "BaseSectionPageSettings", schemaName:'SectionPageSettings',parentSchemaUId:'b5b39934-086b-43fb-8cb1-b9a02bcbc96b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseSectionPageSettings
 */
define("SectionPageSettings", [
	"SectionPageSettingsResources",
], function(resources) {
	return {
		messages: {
			"SaveSectionVisaSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			// region Methods: Private
			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionPageSettings#onBeforeSectionPageWiazardOpen
			 * @override
			 */
			onBeforeSectionPageWiazardOpen: function(callback, scope) {
				this.sandbox.publish("SaveSectionVisaSettings", callback);
			}

			// endregion

			// region Methods: Public
			// endregion

		},
		diff: []
	};
});


