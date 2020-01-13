Terrasoft.configuration.Structures["QualifyStatusInLeadDetailV2"] = {innerHierarchyStack: ["QualifyStatusInLeadDetailV2"], structureParent: "BaseGridDetailV2"};
define('QualifyStatusInLeadDetailV2Structure', ['QualifyStatusInLeadDetailV2Resources'], function(resources) {return {schemaUId:'fa1e226c-dc99-4d00-9536-8d107ddb23b5',schemaCaption: "Qualify status in lead detail", parentSchemaName: "BaseGridDetailV2", schemaName:'QualifyStatusInLeadDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QualifyStatusInLeadDetailV2", function() {
	return {
		entitySchemaName: "LeadInQualifyStatus",
		methods: {
			/**
			 * @inheritDoc Terrasoft.GridUtilitiesV2#getFilters
			 * @override
			 */
			getFilters: function() {
				const filters = this.callParent();
				filters.add("isDisplayedFilter",
					this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "QualifyStatus.IsDisplayed", true
					)
				);
				return filters;
			},

			/**
			 * @inheritDoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
			 * @override
			 */
			addRecordOperationsMenuItems: this.Terrasoft.emptyFn,

			/**
			 * @inheritDoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
			 * @override
			 */
			getAddRecordButtonVisible: function() {
				return false;
			},

			/**
			 * @inheritDoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
			 * @override
			 */
			getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

			/**
			 * @inheritDoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
			 * @override
			 */
			getFilterDefaultColumnName: function() {
				return "QualifyStatus";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"primaryDisplayColumnName": "QualifyStatus",
					"type": "listed"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


