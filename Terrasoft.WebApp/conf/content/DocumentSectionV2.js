Terrasoft.configuration.Structures["DocumentSectionV2"] = {innerHierarchyStack: ["DocumentSectionV2"], structureParent: "BaseSectionV2"};
define('DocumentSectionV2Structure', ['DocumentSectionV2Resources'], function(resources) {return {schemaUId:'4ddb288e-abd7-48c3-b74b-002b805aa25e',schemaCaption: "Section page schema - \"Documents\"", parentSchemaName: "BaseDataView", schemaName:'DocumentSectionV2',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DocumentSectionV2", ["VisaHelper", "BaseFiltersGenerateModule",	"DocumentSectionGridRowViewModel"],
	function(VisaHelper, BaseFiltersGenerateModule) {
		return {
			entitySchemaName: "Document",
			methods: {
				/**
				 * ############# ######## ############## ########### ####### ### ####### "#########"
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1005);
					this.callParent(arguments);
				},

				/**
				 * @overridden
				 * @inheritDoc BaseSectionV2#initFixedFiltersConfig
				 */
				initFixedFiltersConfig: function() {
					var fixedFilterConfig = {
						entitySchema: this.entitySchema,
						filters: [
							{
								name: "PeriodFilter",
								caption: this.get("Resources.Strings.PeriodFilterCaption"),
								dataValueType: Terrasoft.DataValueType.DATE,
								columnName: "Date",
								startDate: {},
								dueDate: {}
							},
							{
								name: "Owner",
								caption: this.get("Resources.Strings.OwnerFilterCaption"),
								dataValueType: Terrasoft.DataValueType.LOOKUP,
								filter: BaseFiltersGenerateModule.OwnerFilter,
								columnName: "Owner"
							}
						]
					};
					this.set("FixedFilterConfig", fixedFilterConfig);
				},

				/**
				 * @overridden
				 */
				getGridRowViewModelClassName: function() {
					return "Terrasoft.DocumentSectionGridRowViewModel";
				},

				/**
				 * overridden
				 */
				getReportFilters: function() {
					var filters = this.getFilters();
					var recordId = this.get("ActiveRow");
					if (recordId) {
						filters.clear();
						filters.name = "primaryColumnFilter";
						var filter = this.Terrasoft.createColumnInFilterWithParameters(
							this.entitySchema.primaryColumnName, [recordId]);
						filters.addItem(filter);
					}
					return filters;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


