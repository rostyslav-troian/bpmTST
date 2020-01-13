Terrasoft.configuration.Structures["OrderSectionV2"] = {innerHierarchyStack: ["OrderSectionV2Order", "OrderSectionV2"], structureParent: "BaseSectionV2"};
define('OrderSectionV2OrderStructure', ['OrderSectionV2OrderResources'], function(resources) {return {schemaUId:'2a36e6fb-63c1-4b9a-beea-c1b3f8fe9250',schemaCaption: "OrderSectionV2", parentSchemaName: "BaseDataView", schemaName:'OrderSectionV2Order',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderSectionV2Structure', ['OrderSectionV2Resources'], function(resources) {return {schemaUId:'33e50cb7-e4bf-49f4-ba18-dd96d15e4952',schemaCaption: "OrderSectionV2", parentSchemaName: "OrderSectionV2Order", schemaName:'OrderSectionV2',parentSchemaUId:'2a36e6fb-63c1-4b9a-beea-c1b3f8fe9250',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OrderSectionV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OrderSectionV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OrderSectionV2Order", ["ProductSalesUtils", "BaseFiltersGenerateModule", "VisaHelper", "ReportUtilities",
	"css!VisaHelper"], function(ProductSalesUtils, BaseFiltersGenerateModule, VisaHelper) {
	return {
		entitySchemaName: "Order",
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
			 * ############# ############# ########### #######.
			 * @protected
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1055);
				this.callParent(arguments);
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
			},

			/**
			 * @inheritdoc BaseSectionV2#initFixedFiltersConfig
			 * @overridden
			 */
			initFixedFiltersConfig: function() {
				var fixedFilterConfig = {
					entitySchema: this.entitySchema,
					filters: [
						{
							name: "PeriodFilter",
							caption: this.get("Resources.Strings.PeriodFilterCaption"),
							dataValueType: this.Terrasoft.DataValueType.DATE,
							columnName: "Date",
							startDate: {
								defValue: this.Terrasoft.startOfWeek(new Date())
							},
							dueDate: {
								defValue: this.Terrasoft.endOfWeek(new Date())
							}
						},
						{
							name: "Owner",
							caption: this.get("Resources.Strings.OwnerFilterCaption"),
							dataValueType: this.Terrasoft.DataValueType.LOOKUP,
							defValue: this.Terrasoft.SysValue.CURRENT_USER_CONTACT,
							filter: BaseFiltersGenerateModule.OwnerFilter,
							columnName: "Owner"
						}
					]
				};
				this.set("FixedFilterConfig", fixedFilterConfig);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("OrderSectionV2", [], function() {
	return {
		entitySchemaName: "Order",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


