Terrasoft.configuration.Structures["ProductSectionV2"] = {innerHierarchyStack: ["ProductSectionV2ProductBase", "ProductSectionV2"], structureParent: "BaseSectionV2"};
define('ProductSectionV2ProductBaseStructure', ['ProductSectionV2ProductBaseResources'], function(resources) {return {schemaUId:'f067c01f-590c-48b3-ae22-48e56534cc66',schemaCaption: "Products section", parentSchemaName: "BaseSectionV2", schemaName:'ProductSectionV2ProductBase',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductSectionV2Structure', ['ProductSectionV2Resources'], function(resources) {return {schemaUId:'cfdbc0e2-e5c1-4bd9-98aa-e330fdecaddf',schemaCaption: "Products section", parentSchemaName: "ProductSectionV2ProductBase", schemaName:'ProductSectionV2',parentSchemaUId:'f067c01f-590c-48b3-ae22-48e56534cc66',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ProductSectionV2ProductBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ProductSectionV2ProductBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ProductSectionV2ProductBase", [],
	function() {
		return {
			entitySchemaName: "Product",
			methods: {
				/**
				 * ############# ############# ########### #######.
				 * @protected
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1056);
					this.callParent(arguments);
				},
				/**
				 * ########## ######### ############# ####### ## #########
				 * @protected
				 * @overriden
				 */
				getDefaultGridDataViewCaption: function() {
					var moduleStructure = Terrasoft.configuration.ModuleStructure[this.entitySchemaName];
					return (moduleStructure && moduleStructure.moduleCaption) ?
						moduleStructure.moduleCaption :
						this.get("Resources.Strings.PageCaption");
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});

define("ProductSectionV2", ["ProductManagementDistributionConstants"],
	function(DistributionConsts) {
		return {
			entitySchemaName: "Product",
			messages: {
				/**
				 * @message GetBackHistoryState
				 * Returns the path where to move after you press the button
				 * to close the folder level settings window.
				 */
				"GetBackHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			properties: {
				folderManagerViewModelClassName: "Terrasoft.ProductCatalogueFolderManagerViewModel"
			},
			methods: {
				/**
				 * Sets the variable current state history.
				 */
				setInitialHistoryState: function() {
					var initialHistoryState = this.sandbox.publish("GetHistoryState").hash.historyState;
					this.set("InitialHistoryState", initialHistoryState);
				},

				/**
				 * @inheritdoc Terrasoft.Configuration.BaseSectionV2#closeCard
				 * @overriden
				 */
				closeCard: function() {
					this.callParent(arguments);
					this.setInitialHistoryState();
				},

				/**
				 * @inheritdoc Terrasoft.Configuration.BaseSectionV2#subscribeSandboxEvents
				 * @overriden
				 */
				subscribeSandboxEvents: function() {
					this.callParent();
					this.setInitialHistoryState();
					this.sandbox.subscribe("GetBackHistoryState", function() {
						return this.get("InitialHistoryState");
					}, this, ["ProductTypeSectionV2", "ProductCatalogueLevelSectionV2"]);
				},

				/**
				 * Returns a collection of actions section.
				 * @protected
				 * @overridden
				 * @return {Terrasoft.BaseViewModelCollection} Collection of actions section.
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Type": "Terrasoft.MenuSeparator",
						"Caption": ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ConfigureProductCatalogue"},
						"Enabled": true,
						"Click": {"bindTo": "navigateToProductCatalogueLevelSection"}
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.ConfigureProductTypes"},
						"Enabled": true,
						"Click": {"bindTo": "navigateToProductTypeSection"}
					}));
					return actionMenuItems;
				},

				/**
				 * Implements the action "Setting up the product catalog"
				 * Go to the section Level product catalog.
				 * @protected
				 */
				navigateToProductCatalogueLevelSection: function() {
					this.sandbox.publish("PushHistoryState", {
						hash: "SectionModuleV2/ProductCatalogueLevelSectionV2"
					});
				},

				/**
				 * Implements the action "Setup type and filter products".
				 * Go to the section Product type.
				 * @protected
				 */
				navigateToProductTypeSection: function() {
					this.sandbox.publish("PushHistoryState", {
						hash: "SectionModuleV2/ProductTypeSectionV2"
					});
				},

				/**
				 * Returns setting group manager.
				 * @protected
				 * @overriden
				 */
				getFolderManagerConfig: function() {
					var config = this.callParent(arguments);
					config.catalogueRootRecordItem = {
						value: DistributionConsts.ProductFolder.RootCatalogueFolder.RootId,
						displayValue: this.get("Resources.Strings.ProductCatalogueRootCaption")
					};
					var filterValue = this.get("SectionFiltersValue");
					if (filterValue && filterValue.getCount() > 0 && filterValue.contains("FolderFilters")) {
						var folderFilter = filterValue.get("FolderFilters");
						config.activeFolderId = (folderFilter && folderFilter.length > 0) ?
							(folderFilter[0].folderId || folderFilter[0].value) : null;
					}
					return config;
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});


