Terrasoft.configuration.Structures["OpportunitySectionV2"] = {innerHierarchyStack: ["OpportunitySectionV2Opportunity", "OpportunitySectionV2"], structureParent: "BaseSectionV2"};
define('OpportunitySectionV2OpportunityStructure', ['OpportunitySectionV2OpportunityResources'], function(resources) {return {schemaUId:'28fa578b-e0d3-45f8-9e37-26194b760a83',schemaCaption: "OpportunitySectionV2", parentSchemaName: "BaseSectionV2", schemaName:'OpportunitySectionV2Opportunity',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunitySectionV2Structure', ['OpportunitySectionV2Resources'], function(resources) {return {schemaUId:'0dd31e4a-caaf-4d25-9ab3-78c387353f01',schemaCaption: "OpportunitySectionV2", parentSchemaName: "OpportunitySectionV2Opportunity", schemaName:'OpportunitySectionV2',parentSchemaUId:'28fa578b-e0d3-45f8-9e37-26194b760a83',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunitySectionV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunitySectionV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunitySectionV2Opportunity", ["VisaHelper", "LookupUtilities", "BaseFiltersGenerateModule", "css!VisaHelper"],
		function(VisaHelper, LookupUtilities, BaseFiltersGenerateModule) {
	return {
		entitySchemaName: "Opportunity",
		attributes: {
			"ResponsibleDepartment": {
				lookupListConfig: {columns: ["SalesDirector"]}
			}
		},
		methods: {

			/**
			 * ############# ######## ############## ########### ####### ### ####### "#######"
			 * @overridden
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1003);
				this.callParent(arguments);
			},

			/**
			 * ############## ############# #######.
			 * @protected
			 */
			initFixedFiltersConfig: function() {
				var fixedFilterConfig = {
					entitySchema: this.entitySchema,
					filters: [
						{
							name: "Owner",
							caption: this.get("Resources.Strings.OwnerFilterCaption"),
							dataValueType: Terrasoft.DataValueType.LOOKUP,
							filter: BaseFiltersGenerateModule.OwnerFilter,
							columnName: "Owner",
							defValue: this.Terrasoft.SysValue.CURRENT_USER_CONTACT
						}
					]
				};
				this.set("FixedFilterConfig", fixedFilterConfig);
			},

			/**
			 * ######### ######### #######
			 * @overridden
			 */
			getDefaultGridDataViewCaption: function() {
				return this.get("Resources.Strings.SectionCaption");
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getSectionActions
			 */
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: { bindTo: "Resources.Strings.SetOwnerActionCaption" },
					Click: {bindTo: "setOwner"},
					Enabled: {bindTo: "isSingleSelected"}
				}));
				return actionMenuItems;
			},

			/**
			 *
			 */
			setOwner: function() {
				var vwSysProcessFilters = Terrasoft.createFilterGroup();
				var activeRow = this.getActiveRow();
				var handler = function(args) {
					var selectedItems = args.selectedRows.getItems();
					if (!Ext.isEmpty(selectedItems)) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Opportunity" });
						update.filters.addItem(Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Id", activeRow.values.Id));
						update.setParameterValue("Owner", selectedItems[0].Id, Terrasoft.DataValueType.GUID);
						update.execute(function() {
							activeRow.loadEntity(activeRow.values.Id);
						}, this);
					}
				};
				vwSysProcessFilters.name = "vwSysProcessFiler";
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Opportunity"
				});
				esq.addColumn("ResponsibleDepartment.SysAdminUnit");
				var filters = this.Ext.create("Terrasoft.FilterGroup");
				filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Id", activeRow.values.Id));
				esq.filters = filters;
				esq.getEntityCollection(function(result) {
					var collection = result.collection;
					if (!this.Ext.isEmpty(collection)) {
						var item = collection.collection.items[0];
						var responsibleDepartment = item.values["ResponsibleDepartment.SysAdminUnit"].value;
						if (responsibleDepartment) {
							var responsibleDepartmentFilter = Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "[SysAdminUnit:Contact].[SysAdminUnitInRole:SysAdminUnit].SysAdminUnitRoleId",
									responsibleDepartment);
							vwSysProcessFilters.addItem(responsibleDepartmentFilter);
						}
					}
					vwSysProcessFilters.addItem(Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id"));
					var config = {
						entitySchemaName: "Contact",
						captionLookup: this.get("Resources.Strings.SetOwnerActionCaption"),
						multiSelect: false,
						columnName: "Name",
						filters: vwSysProcessFilters,
						hideActions: true
					};
					LookupUtilities.Open(this.sandbox, config, handler, this, null, false, false);
				}, this);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("OpportunitySectionV2", ["OpportunityOrderUtilities"],
	function() {
		return {
			mixins: {
				/**
				 * Order utilities mixin.
				 */
				OpportunityOrderUtilities: "Terrasoft.OpportunityOrderUtilities"
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CreateOrderFromOpportunityButton",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"index": 5,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "getButtonCaption"},
						"click": {"bindTo": "onCardAction"},
						"tag": "CreateOrderFromOpportunity",
						"enabled": {"bindTo": "canEntityBeOperated"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


