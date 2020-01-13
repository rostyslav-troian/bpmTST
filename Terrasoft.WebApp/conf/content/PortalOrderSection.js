Terrasoft.configuration.Structures["PortalOrderSection"] = {innerHierarchyStack: ["PortalOrderSection"], structureParent: "BaseSectionV2"};
define('PortalOrderSectionStructure', ['PortalOrderSectionResources'], function(resources) {return {schemaUId:'ee9518f0-20b1-4382-97d2-35e20d7dc10d',schemaCaption: "Portal order section", parentSchemaName: "BaseSectionV2", schemaName:'PortalOrderSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalOrderSection", [],
	function() {
		return {
			entitySchemaName: "Order",
			attributes: {},
			messages: {},
			mixins: {},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @override
				 */
				getDefaultDataViews: function() {
					const dataViews = this.callParent(arguments);
					delete dataViews.AnalyticsDataView;
					return dataViews;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


