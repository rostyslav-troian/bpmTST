Terrasoft.configuration.Structures["SysProcessUserTaskSection"] = {innerHierarchyStack: ["SysProcessUserTaskSection"], structureParent: "BaseSectionV2"};
define('SysProcessUserTaskSectionStructure', ['SysProcessUserTaskSectionResources'], function(resources) {return {schemaUId:'55b21851-38be-4186-b04b-ec80cd247cc6',schemaCaption: "Section page schema - \"Custom actions in process\"", parentSchemaName: "BaseSectionV2", schemaName:'SysProcessUserTaskSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysProcessUserTaskSection", ['GridUtilitiesV2'],
function() {
	return {
		entitySchemaName: 'SysProcessUserTask',
		contextHelpId: '1001',
		diff: /**SCHEMA_DIFF*/[{
			"operation": "remove",
			"name": "DataGridActiveRowCopyAction"
		}]/**SCHEMA_DIFF*/,
		messages: {},
		methods: {
			/**
			 * @overridden
			 * @return {Object} ############# ####### ## #########.
			 */
			getDefaultDataViews: function() {
				var gridDataView = {
					name: "GridDataView",
					active: true,
					caption: this.getDefaultGridDataViewCaption(),
					icon: this.getDefaultGridDataViewIcon()
				};
				return {
					"GridDataView": gridDataView
				};
			},
			/**
			 * @overridden
			 */
			getFilters: function() {
				var filters = this.callParent(arguments);
				var filterName = "IsQuickModel";
				if (!filters.contains(filterName)) {
					filters.add(filterName, Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "IsQuickModel", true));
				}
				return filters;
			}
		}
	};
});


