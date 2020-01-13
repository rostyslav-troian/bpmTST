Terrasoft.configuration.Structures["PortalOpportunitySectionV2"] = {innerHierarchyStack: ["PortalOpportunitySectionV2"], structureParent: "BaseSectionV2"};
define('PortalOpportunitySectionV2Structure', ['PortalOpportunitySectionV2Resources'], function(resources) {return {schemaUId:'3b61e17c-8043-4032-ad58-d7bdaec668c2',schemaCaption: "PortalOpportunitySectionV2", parentSchemaName: "BaseSectionV2", schemaName:'PortalOpportunitySectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("PortalOpportunitySectionV2", [], function() {
	return {
		entitySchemaName: "Opportunity",
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


