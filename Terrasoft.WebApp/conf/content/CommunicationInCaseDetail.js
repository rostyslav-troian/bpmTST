Terrasoft.configuration.Structures["CommunicationInCaseDetail"] = {innerHierarchyStack: ["CommunicationInCaseDetail"], structureParent: "ContactCommunicationDetail"};
define('CommunicationInCaseDetailStructure', ['CommunicationInCaseDetailResources'], function(resources) {return {schemaUId:'ce795e84-b098-493c-bcf2-8bb48143311e',schemaCaption: "Detail schema - Communication options in case", parentSchemaName: "ContactCommunicationDetail", schemaName:'CommunicationInCaseDetail',parentSchemaUId:'244c946e-cd0c-4452-9858-bba3c04858d1',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CommunicationInCaseDetail", [], function() {
	return {
		entitySchemaName: "ContactCommunication",
		methods: {
			/**
			 * @inheritDoc ContactCommunicationDetail#getEntityRestrictions
			 * @protected
			 * @overridden
			 */
			getEntityRestrictions: function(callback, scope) {
				var isContactEmpty = !this.isContactNotEmpty();
				if(isContactEmpty || this.get("IsDetailCollapsed")) {
					if(isContactEmpty) {
						this.set("IsDataLoaded", true);
					}
					callback.call(scope);
					return;
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc ContactCommunicationDetail#getSaveRestrictionsQuery
			 * @protected
			 * @overridden
			 */
			getSaveRestrictionsQuery: function() {
				if (!this.isContactNotEmpty()) {
					return null;
				}
				this.callParent(arguments);
			},

			/**
			 * Checks whether contact exists.
			 * @return {Boolean} ####### ####### ########.
			 */
			isContactNotEmpty: function() {
				return this.get("MasterRecordId") ? true : false;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SocialNetworksContainer"
			},
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"enabled": {
						"bindTo": "isContactNotEmpty"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


