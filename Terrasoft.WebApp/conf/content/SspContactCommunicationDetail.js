Terrasoft.configuration.Structures["SspContactCommunicationDetail"] = {innerHierarchyStack: ["SspContactCommunicationDetail"], structureParent: "ContactCommunicationDetail"};
define('SspContactCommunicationDetailStructure', ['SspContactCommunicationDetailResources'], function(resources) {return {schemaUId:'4dd2454b-625d-4efe-b7d3-ca8aeac76429',schemaCaption: "Contact communication options on portal", parentSchemaName: "ContactCommunicationDetail", schemaName:'SspContactCommunicationDetail',parentSchemaUId:'244c946e-cd0c-4452-9858-bba3c04858d1',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspContactCommunicationDetail", [], function() {
		return {
			entitySchemaName: "ContactCommunication",
			messages: {},
			attributes: {},
			methods: {

				/**
				* @inheritdoc Terrasoft.BaseCommunicationDetail#getToolsMenuItems
				* @override
				*/
				getToolsMenuItems: function() {
					let communicationTypes = this.$CommunicationTypes;
					communicationTypes = communicationTypes.filterByFn(function(item) { 
						return item.$Name !== "Facebook";
					}, this);
					this.$CommunicationTypes =  communicationTypes.filterByFn(function(item) { 
						return item.$Name !== "Twitter";
					}, this);
					return this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "FacebookButton",
					"parentName": "SocialNetworksContainer",
					"propertyName": "items"
				},
				{
					"operation": "remove",
					"name": "TwitterButton",
					"parentName": "SocialNetworksContainer",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/
		};
	});

