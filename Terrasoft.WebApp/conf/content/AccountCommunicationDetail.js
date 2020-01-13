Terrasoft.configuration.Structures["AccountCommunicationDetail"] = {innerHierarchyStack: ["AccountCommunicationDetailNUI", "AccountCommunicationDetail"], structureParent: "BaseCommunicationDetail"};
define('AccountCommunicationDetailNUIStructure', ['AccountCommunicationDetailNUIResources'], function(resources) {return {schemaUId:'5d2fa11a-730f-408d-8c95-a925cb15ba50',schemaCaption: "Account communication options", parentSchemaName: "BaseCommunicationDetail", schemaName:'AccountCommunicationDetailNUI',parentSchemaUId:'ea5d6815-6645-4962-bde0-440932d31441',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountCommunicationDetailStructure', ['AccountCommunicationDetailResources'], function(resources) {return {schemaUId:'bdbcb6ab-afe2-4af3-be89-85e9dd67eb6d',schemaCaption: "Account communication options", parentSchemaName: "AccountCommunicationDetailNUI", schemaName:'AccountCommunicationDetail',parentSchemaUId:'5d2fa11a-730f-408d-8c95-a925cb15ba50',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountCommunicationDetailNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountCommunicationDetailNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountCommunicationDetailNUI", ["AccountCommunicationDetailResources", "terrasoft", "Contact",
		"ConfigurationEnums", "ConfigurationConstants"], function(resources, Terrasoft, Contact, ConfigurationEnums,
		ConfigurationConstants) {
	return {

		/**
		 * ### ########
		 */
		entitySchemaName: "AccountCommunication",
		messages: {
			/**
			 * @message ReloadCard
			 * Notify about the card is reload.
			 */
			"ReloadCard": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {
			/**
			 * ####### ######## ##### LinkedIn ## ####### ####
			 * @param {Object} esq ###### ####### #####
			 */
			initCommunicationTypesFilters: function(esq) {
				this.callParent(arguments);
				if (Contact.columns.LinkedIn.usageType === ConfigurationEnums.EntitySchemaColumnUsageType.None) {
					var linkedInFilter = Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL, "Id", ConfigurationConstants.CommunicationTypes.LinkedIn);
					esq.filters.addItem(linkedInFilter);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#onSaved
			 * @overridden
			 */
			onSaved: function() {
				this.callParent(arguments);
				this.sandbox.publish("ReloadCard", null, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#initMasterDetailColumnMapping
			 * @overridden
			 */
			initMasterDetailColumnMapping: function() {
				this.set("MasterDetailColumnMapping",[
					{
						"CommunicationType": ConfigurationConstants.CommunicationTypes.MainPhone,
						"MasterEntityColumn": "Phone"
					},
					{
						"CommunicationType": ConfigurationConstants.CommunicationTypes.AdditionalPhone,
						"MasterEntityColumn": "AdditionalPhone"
					},
					{
						"CommunicationType": ConfigurationConstants.CommunicationTypes.Fax,
						"MasterEntityColumn": "Fax"
					},
					{
						"CommunicationType": ConfigurationConstants.CommunicationTypes.Web,
						"MasterEntityColumn": "Web"
					}
				]);
			}
		}
	};
});

define("AccountCommunicationDetail", [], function() {
		return {
			attributes: {
				/**
				 * @inheritdoc Terrasoft.BaseCommunicationDetail#FacebookSearchSchemaName
				 * @overridden
				 */
				FacebookSearchSchemaName: {
					value: "AccountFacebookSearchSchema"
				}
			}
		}
	});


