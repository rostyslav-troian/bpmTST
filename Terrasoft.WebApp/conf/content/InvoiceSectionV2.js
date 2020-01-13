Terrasoft.configuration.Structures["InvoiceSectionV2"] = {innerHierarchyStack: ["InvoiceSectionV2"], structureParent: "BaseSectionV2"};
define('InvoiceSectionV2Structure', ['InvoiceSectionV2Resources'], function(resources) {return {schemaUId:'548685d1-2a48-4f86-9220-66723429d290',schemaCaption: "InvoiceSectionV2", parentSchemaName: "BaseDataView", schemaName:'InvoiceSectionV2',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("InvoiceSectionV2", ["ProductSalesUtils", "BaseFiltersGenerateModule", "VisaHelper", "RightUtilities",
	"ReportUtilities", "css!VisaHelper"], function(ProductSalesUtils, BaseFiltersGenerateModule, VisaHelper) {
		return {
			entitySchemaName: "Invoice",
			attributes: {
				/**
				 * ######### ###### #### "######### ## ###########"
				 */
				SendToVisaMenuItemCaption: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: VisaHelper.resources.localizableStrings.SendToVisaCaption
				}
			},
			methods: {
				/**
				 * ############# ######## ############## ########### ####### ### ####### "#####"
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1004);
					this.callParent(arguments);
				},

				/**
				 * @overridden
				 * @inheritDoc
				 */
				initFixedFiltersConfig: function() {
					var fixedFilterConfig = {
						entitySchema: this.entitySchema,
						filters: [
							{
								name: "PeriodFilter",
								caption: this.get("Resources.Strings.PeriodFilterCaption"),
								dataValueType: Terrasoft.DataValueType.DATE,
								columnName: "StartDate",
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
				 * ######## "######### ## ###########"
				 */
				sendToVisa: VisaHelper.SendToVisaMethod,

				/**
				 * ########## ######### ######## ####### # ###### ########### #######
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ####### # ######
				 * ########### #######
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {bindTo: "SendToVisaMenuItemCaption"},
						"Click": {bindTo: "sendToVisa"},
						"Enabled": {bindTo: "isSingleSelected"}
					}));
					return actionMenuItems;
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
						filters.logicalComparisonTypes = Terrasoft.LogicalOperatorType.AND;
						var filter = this.Terrasoft.createColumnInFilterWithParameters(
							this.entitySchema.primaryColumnName, [recordId]);
						filters.addItem(filter);
					}
					return filters;
				},

				/**
				 * ######### ###### ### ######## # #######
				 * @param {Object} config
				 * @overridden
				 * @returns {Boolean}
				 */
				openCardInChain: function(config) {
					if (config && !config.hasOwnProperty("OpenProductSelectionModule")) {
						return this.callParent(arguments);
					}
					return ProductSalesUtils.openProductSelectionModuleInChain(config, this.sandbox);
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


