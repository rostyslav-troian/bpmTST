Terrasoft.configuration.Structures["EventSegmentDetailV2"] = {innerHierarchyStack: ["EventSegmentDetailV2"], structureParent: "BaseSegmentDetailV2"};
define('EventSegmentDetailV2Structure', ['EventSegmentDetailV2Resources'], function(resources) {return {schemaUId:'1184f3a2-97d9-4778-aeaa-ad09a6b48d1f',schemaCaption: "Detail - Event target audience segments", parentSchemaName: "BaseSegmentDetailV2", schemaName:'EventSegmentDetailV2',parentSchemaUId:'7c24723a-0a79-4256-8f81-2cb82423af8c',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventSegmentDetailV2", [],
		function() {
			return {
				entitySchemaName: "EventSegment",
				methods: {
					/**
					 * ############## ######.
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.set("ParentEntitySchemaName", "Event");
					}
				}
			};
		}
);


