Terrasoft.configuration.Structures["OrganizationDetail"] = {innerHierarchyStack: ["OrganizationDetail"], structureParent: "BaseGridDetailV2"};
define('OrganizationDetailStructure', ['OrganizationDetailResources'], function(resources) {return {schemaUId:'2556f6fa-f8f7-4975-bb3f-acda8630e010',schemaCaption: "Organization detail", parentSchemaName: "BaseGridDetailV2", schemaName:'OrganizationDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("OrganizationDetail", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "VwSspAdminUnit",
			attributes: {},
			methods: {
				/**
				 * @inheritdoc BaseGridDetailV2#getFilters
				 * @overridden
				 */
				getFilters: function () {
					var filters = this.callParent(arguments);
					filters.add("OrganizationFilter", Terrasoft.createColumnIsNotNullFilter("PortalAccount"));
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitType.Value",
						ConfigurationConstants.SysAdminUnit.Type.Organisation));
					return filters;
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#addDetailWizardMenuItems
				 * @override
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @override
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @override
				 */
				getFilterDefaultColumnName: function() {
					return "Account";
				},

				/**
				 * @inheritDoc Terrasoft.GridUtilitiesV2#addColumnLink
				 * @override
				 */
				addColumnLink: function(item, column) {
					var columnPath = column.columnPath;
					if (columnPath === item.primaryDisplayColumnName) {
						item["on" + columnPath + "LinkClick"] = function() {
							var value = this.get(columnPath);
							return {
								caption: value,
								target: "_self",
								title: value,
								url: window.location.hash
							};
						};
					} else {
						this.callParent(arguments);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


