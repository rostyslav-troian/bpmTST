Terrasoft.configuration.Structures["BaseModulePageWithRightDetailContainer"] = {innerHierarchyStack: ["BaseModulePageWithRightDetailContainer"], structureParent: "BaseModulePageV2"};
define('BaseModulePageWithRightDetailContainerStructure', ['BaseModulePageWithRightDetailContainerResources'], function(resources) {return {schemaUId:'eeb774dd-d572-4587-9506-acc9d8124fe1',schemaCaption: "BaseModulePageWithRightDetailContainer", parentSchemaName: "BaseModulePageV2", schemaName:'BaseModulePageWithRightDetailContainer',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseModulePageWithRightDetailContainer", ["css!BaseModulePageWithRightDetailContainerCSS"],
	function() {
		return {
			attributes: {
				/**
				 * Stores the right panel active tab name.
				 */
				"ActiveRightTabName": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "CardContentContainer",
					"values": {
						"wrapClass": ["card-content-container-with-right-detail", "card-content-container"]
					}
				},
				{
					"operation": "insert",
					"name": "LeftCardContentContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"id": "LeftCardContentContainer",
						"selectors": {"wrapEl": "#LeftCardContentContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["left-card-content-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RightCardContentContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"id": "RightCardContentContainer",
						"selectors": {"wrapEl": "#RightCardContentContainer"},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["right-card-content-container"],
						"items": []
					}
				},
				{
					"operation": "move",
					"name": "HeaderContainer",
					"parentName": "LeftCardContentContainer",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "move",
					"name": "TabsContainer",
					"parentName": "LeftCardContentContainer",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "RightTabsContainer",
					"parentName": "RightCardContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "getRightTabsContainerVisible"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RightTabs",
					"parentName": "RightTabsContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.TAB_PANEL,
						"activeTabChange": {"bindTo": "activeRightTabChange"},
						"activeTabName": {"bindTo": "ActiveRightTabName"},
						"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
						"collection": {"bindTo": "RightTabsCollection"},
						"tabs": []
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#initTabs
				 * @overridden
				 */
				initTabs: function() {
					this.callParent(arguments);
					var defaultRightTabName = this.getDefaultRightTabName();
					if (!defaultRightTabName) {
						return;
					}
					this.setActiveRightTab(defaultRightTabName);
					this.set(defaultRightTabName, true);
				},

				/**
				 * Returns the right panel active tab default name.
				 * @protected
				 * @virtual
				 * @return {String} Right panel active tab default name.
				 */
				getDefaultRightTabName: function() {
					var tabsCollection = this.get("RightTabsCollection");
					if (tabsCollection.isEmpty()) {
						return "";
					}
					var firstTab = tabsCollection.getByIndex(0);
					var defaultTabName = firstTab.get("Name");
					return defaultTabName;
				},

				/**
				 * Sets right panel active tab.
				 * @protected
				 * @virtual
				 * @param {String} tabName Tab name.
				 */
				setActiveRightTab: function(tabName) {
					this.set("ActiveRightTabName", tabName);
				},

				/**
				 * RightTabs change event handler.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} activeTab ######### #######.
				 */
				activeRightTabChange: function(activeTab) {
					var activeTabName = activeTab.get("Name");
					var tabsCollection = this.get("RightTabsCollection");
					tabsCollection.eachKey(function(tabName, tab) {
						var tabContainerVisibleBinding = tab.get("Name");
						this.set(tabContainerVisibleBinding, false);
					}, this);
					this.set(activeTabName, true);
				},

				/**
				 * Gets the flag of visibility for right panel tabs container.
				 * return {Boolean} The flag of visibility for right panel tabs container.
				 */
				getRightTabsContainerVisible: function() {
					var rightTabsCollection = this.get("RightTabsCollection");
					return !rightTabsCollection.isEmpty();
				}
			}
		};
	}
);


