Terrasoft.configuration.Structures["CommunicationTypeByCommunicationDetailV2"] = {innerHierarchyStack: ["CommunicationTypeByCommunicationDetailV2"], structureParent: "ManyToManyRelationsDetail"};
define('CommunicationTypeByCommunicationDetailV2Structure', ['CommunicationTypeByCommunicationDetailV2Resources'], function(resources) {return {schemaUId:'c8d0383a-4c88-4817-8dbc-5cf9cf4cf22e',schemaCaption: "CommunicationTypeByCommunicationDetailV2", parentSchemaName: "ManyToManyRelationsDetail", schemaName:'CommunicationTypeByCommunicationDetailV2',parentSchemaUId:'cd7211de-18a9-4f6f-951c-e36055b849a2',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CommunicationTypeByCommunicationDetailV2", [],
	function() {
		return {
			entitySchemaName: "ComTypebyCommunication",

			attributes: {
				"MasterDetailColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "CommunicationType"
				},
				
				"RelatedDetailColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Communication"
				},
				
				"LookupEntityName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Communication"
				}
			},

			messages: {},
			methods: {},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


