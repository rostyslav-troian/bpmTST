Terrasoft.configuration.Structures["PortalPartnershipSection"] = {innerHierarchyStack: ["PortalPartnershipSection"], structureParent: "BaseDataView"};
define('PortalPartnershipSectionStructure', ['PortalPartnershipSectionResources'], function(resources) {return {schemaUId:'f4110466-f6dd-45c7-b337-4500825e1702',schemaCaption: "Section schema: \"Portal Partnership\"", parentSchemaName: "BaseDataView", schemaName:'PortalPartnershipSection',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalPartnershipSection", [], function() {
	return {
		entitySchemaName: "Partnership",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			/**
			 * @inheritDoc BaseDataView#UseTagModule
			 */
			"UseTagModule": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * @inheritDoc BaseDataView#UseFolderFilter
			 */
			"UseFolderFilter": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseDataView#initQueryFilters
			 * @override
			 */
			initQueryFilters: function (esq) {
				const activePartnershipFilter =
					Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "IsActive", true);
				esq.filters.add("ActivePartnershipFilter", activePartnershipFilter);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseDataView#getDefaultEmptyGridMessageProperties
			 * @override
			 */
			getDefaultEmptyGridMessageProperties: function() {
				let emptyMessageConfig = this.callParent(arguments);
				delete emptyMessageConfig.recommendation;
				delete emptyMessageConfig.useStaticFolderHelpUrl;
				return emptyMessageConfig;
			},

			/**
			 * @inheritDoc Terrasoft.BaseSection#isSeparateModeActionsButtonVisible
			 * @overridden
			 */
			isSeparateModeActionsButtonVisible: function () {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @override
			 */
			init: function () {
				this.callParent(arguments);
				this.$IsAddRecordButtonVisible = false;
			},

			/**
			 * @inheritDoc BaseDataView#loadFiltersModule
			 * @overridden
			 */
			loadFiltersModule: this.Terrasoft.emptyFn
		}
	};
});


