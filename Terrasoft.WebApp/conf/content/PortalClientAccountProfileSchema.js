Terrasoft.configuration.Structures["PortalClientAccountProfileSchema"] = {innerHierarchyStack: ["PortalClientAccountProfileSchema"], structureParent: "ClientAccountProfileSchema"};
define('PortalClientAccountProfileSchemaStructure', ['PortalClientAccountProfileSchemaResources'], function(resources) {return {schemaUId:'47eb52b3-dcfe-4f8d-93d2-73dd69629bb8',schemaCaption: "Account profile schema at portal", parentSchemaName: "ClientAccountProfileSchema", schemaName:'PortalClientAccountProfileSchema',parentSchemaUId:'55a794f0-d752-48a6-b387-6f362fadc3d7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalClientAccountProfileSchema", ["ProfileSchemaMixin"], function() {
		return {
			entitySchemaName: "Account",
			messages: {
				/**
				 * Message, which is emmited in PortalAccountMiniPage in saved entity event.
				 */
				"AccountSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin"
			},
			methods: {
				/**
				 * @inheritDoc BaseProfileSchema#getMiniPageConfig
				 * @override
				 */
				getMiniPageConfig: function() {
					const parentConfig = this.callParent(arguments);
					parentConfig.miniPageSchemaName = "PortalAccountMiniPage";
					parentConfig.operation = Terrasoft.ConfigurationEnums.CardOperation.EDIT;
					return parentConfig;
				},

				/**
				 * @inheritDoc BaseProfileSchema#onProfileHeaderClick
				 * @override
				 */
				onProfileHeaderClick: function(options) {
					const config = this.getMiniPageConfig(options);
					this.openMiniPage(config);
					return false;
				},

				/**
				 * @inheritDoc BaseProfileSchema#subscribeSandboxEvents
				 * @override
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this._subscribeUpdateProfile();
				},

				/**
				 * @private
				 */
				_subscribeUpdateProfile: function() {
					this.sandbox.subscribe("AccountSaved", this.updateProfile, this, [this.sandbox.id]);
				},

				/**
				 * Updates profile entity state after manipulation in mini page
				 * @protected
				 */
				updateProfile: function() {
					this.initEntity();
				},

				/**
				 * @inheritDoc BaseProfileSchema#onProfileLinkMouseOver
				 * @override
				 */
				onProfileLinkMouseOver: Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


