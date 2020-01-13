Terrasoft.configuration.Structures["DcmApprovalUserTaskPropertiesPage"] = {innerHierarchyStack: ["DcmApprovalUserTaskPropertiesPage"], structureParent: "ApprovalUserTaskPropertiesPage"};
define('DcmApprovalUserTaskPropertiesPageStructure', ['DcmApprovalUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'f54fb188-5d79-4395-b2d9-80283cbede52',schemaCaption: "DcmApprovalUserTaskPropertiesPage", parentSchemaName: "ApprovalUserTaskPropertiesPage", schemaName:'DcmApprovalUserTaskPropertiesPage',parentSchemaUId:'575d8d4c-0b7c-48ca-8bb5-cb380e26294b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDcmSchemaElementPropertiesPage => ApprovalUserTaskPropertiesPage => ProcessFlowElementPropertiesPage
 * => BaseProcessSchemaElementPropertiesPage
 */
define("DcmApprovalUserTaskPropertiesPage", ["ConfigurationConstants", "DcmConstants", "ConfigurationItemGenerator"
], function(ConfigurationConstants) {
	return {

		/**
		 * Use base DCM schema (BaseDcmSchemaElementPropertiesPage)
		 * @type {Boolean}
		 */
		useBaseDcmSchema: true,

		attributes: {
			/**
			 * @inheritdoc Terrasoft.BaseDcmSchemaElementPropertiesPage#UseConditions
			 * @override
			 */
			"UseConditions": {
				"value": true
			}
		},

		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getParentEntitySchemaUId: function(callback, scope) {
				var element = this.get("DcmElement");
				var parentSchema = element.parentSchema;
				var entitySchema = parentSchema.entitySchema;
				this._getSectionByEntitySchema(entitySchema.uId, function(section) {
					var sectionId = section && section.getId();
					var sysModuleVisa = this.findSysModuleVisa(sectionId);
					var parentEntitySchemaUId = sysModuleVisa ? entitySchema.uId : null;
					callback.call(scope, parentEntitySchemaUId);
				}, this);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc ApprovalUserTaskPropertiesPage#initSection
			 * @override
			 */
			initSection: function() {
				var parentMethod = this.getParentMethod(this, arguments);
				if (!this.get("EntitySchemaUId")) {
					this._getParentEntitySchemaUId(function(parentEntitySchemaUId) {
						this.set("EntitySchemaUId", parentEntitySchemaUId);
						parentMethod();
					}, this);
				} else {
					parentMethod();
				}
			},

			/**
			 * @inheritdoc ApprovalUserTaskPropertiesPage#initRecordId
			 * @override
			 */
			initRecordId: function() {
				var parentMethod = this.getParentMethod(this, arguments);
				this._getParentEntitySchemaUId(function(parentEntitySchemaUId) {
					var isParentEntitySchema = this.get("EntitySchemaUId") === parentEntitySchemaUId;
					if (isParentEntitySchema) {
						var element = this.get("DcmElement");
						var parameter = element.getParameterByName("RecordId");
						if (!parameter.hasValue()) {
							parameter.referenceSchemaUId = this.get("EntitySchemaUId");
							element.parentSchema.setParameterDefaultValue(parameter);
						}
					}
					parentMethod();
				}, this);
			},

			/**
			 * @inheritdoc BaseDcmSchemaElementPropertiesPage#getDefaultRequiredType
			 * @override
			 */
			getDefaultRequiredType: function() {
				return Terrasoft.DcmConstants.ElementRequiredType.REQUIRED;
			},

			/**
			 * @inheritdoc BaseDcmSchemaElementPropertiesPage#getConditionsResultList
			 * @override
			 */
			getConditionsResultList: function() {
				return ConfigurationConstants.VisaStatus;
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


