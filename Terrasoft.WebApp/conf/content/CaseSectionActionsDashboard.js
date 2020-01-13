Terrasoft.configuration.Structures["CaseSectionActionsDashboard"] = {innerHierarchyStack: ["CaseSectionActionsDashboard"], structureParent: "SectionActionsDashboard"};
define('CaseSectionActionsDashboardStructure', ['CaseSectionActionsDashboardResources'], function(resources) {return {schemaUId:'444afcc6-b5d3-4116-b09b-8cace50730ff',schemaCaption: "CaseSectionActionsDashboard", parentSchemaName: "SectionActionsDashboard", schemaName:'CaseSectionActionsDashboard',parentSchemaUId:'d2bb0841-0efc-4750-92b4-9dca1072e886',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseSectionActionsDashboard", ["PortalMessagePublisherExtensions"], function() {
	return {
		mixins: {
			/**
			 * @class PortalMessagePublisherExtensions extends tabs and publishers configs.
			 */
			PortalMessagePublisherExtensions: "Terrasoft.PortalMessagePublisherExtensions"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#getExtendedConfig
			 * @overridden
			 */
			getExtendedConfig: function() {
				var config = this.callParent(arguments);
				this.mixins.PortalMessagePublisherExtensions.extendTabsConfig.call(this, config);
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#getSectionPublishers
			 * @overridden
			 */
			getSectionPublishers: function() {
				var publishers = this.callParent(arguments);
				this.mixins.PortalMessagePublisherExtensions.extendSectionPublishers.call(this, publishers);
				return publishers;
			},

			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#saveMasterEntity
			 * @overridden
			 */
			saveMasterEntity: function(config) {
				var activeTabName = this.get("ActiveTabName");
				if (activeTabName === "PortalMessageTab" && this.isNewMode()) {
					this.setCaseSymptoms(config.scope.get("Message"));
				}
				this.callParent(arguments);
			},

			/**
			 * Set case symptoms from portal message.
			 * @param {string} message from portal channel
			 * @private
			 */
			setCaseSymptoms: function(message) {
				var symptoms = this.getMasterEntityParameterValue("Symptoms");
				if (this.Ext.isEmpty(symptoms)) {
					var formatter = this.Ext.util.Format;
					this.setMasterEntityParameterValue("Symptoms",
						this.Terrasoft.decodeHtmlEntities(formatter.stripTags(message)));
				}
			},

			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#initDcmActions
			 * @overridden
			 */
			initDcmActions: function() {
				this.callParent(arguments);
				const dcmSchema = this.get("DcmSchema");
				this.setMasterEntityParameterValue("DcmSchema", {
					stages: dcmSchema.stages,
					stageConnections: dcmSchema.stageConnections
				}, { silent: false });
			},

			/**
			 * @inheritdoc Terrasoft.SectionActionsDashboard#onGetRecordInfoForPublisher
			 * @overridden
			 */
			onGetRecordInfoForPublisher: function() {
				var info = this.callParent(arguments);
				if (info && info.relationSchemaName === "Case") {
					info.additionalInfo.status = this.getMasterEntityParameterValue("Status");
				}
				return info;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PortalMessageTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PortalMessageTabContainer",
				"parentName": "PortalMessageTab",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["portal-message-content"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PortalMessageModule",
				"parentName": "PortalMessageTab",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["portal-message-module", "message-module"]
					},
					"itemType": this.Terrasoft.ViewItemType.MODULE,
					"moduleName": "PortalMessagePublisherModule",
					"afterrender": {
						"bindTo": "onMessageModuleRendered"
					},
					"afterrerender": {
						"bindTo": "onMessageModuleRendered"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


