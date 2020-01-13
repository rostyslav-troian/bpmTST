Terrasoft.configuration.Structures["SiteEventDetailV2"] = {innerHierarchyStack: ["SiteEventDetailV2SiteEvent", "SiteEventDetailV2"], structureParent: "BaseGridDetailV2"};
define('SiteEventDetailV2SiteEventStructure', ['SiteEventDetailV2SiteEventResources'], function(resources) {return {schemaUId:'373720dd-4bff-4e34-80d3-a56243076fb8',schemaCaption: "Website event detail", parentSchemaName: "BaseGridDetailV2", schemaName:'SiteEventDetailV2SiteEvent',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SiteEventDetailV2Structure', ['SiteEventDetailV2Resources'], function(resources) {return {schemaUId:'512b952d-1bb4-4642-ab72-876a70332469',schemaCaption: "Website event detail", parentSchemaName: "SiteEventDetailV2SiteEvent", schemaName:'SiteEventDetailV2',parentSchemaUId:'373720dd-4bff-4e34-80d3-a56243076fb8',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SiteEventDetailV2SiteEvent",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SiteEventDetailV2SiteEventResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SiteEventDetailV2SiteEvent", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "SiteEvent",
			attributes: {},
			methods: {
				/**
				 * Initialize page detail.
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("MultiSelect", false);
				},

				/**
				 * Initialize detail property. Set detail collapsed by default.
				 * @protected
				 * @overridden
				 */
				initDetailOptions: function() {
					this.callParent();
					this.set("IsDetailCollapsed", true);
				},

				/**
				 * Open site event card.
				 * @protected
				 * @overridden
				 */
				openSiteEventCard: function() {
					var activeRow = this.getActiveRow();
					if (activeRow) {
						var primaryColumnValue = activeRow.get(activeRow.primaryColumnName);
						var typeColumnValue = this.getTypeColumnValue(activeRow);
						var editPages = this.get("EditPages");
						var editPage = editPages.get(typeColumnValue);
						var schemaName = editPage.get("SchemaName");
						var token = "CardModuleV2/" + schemaName + "/edit/" + primaryColumnValue;
						this.sandbox.publish("PushHistoryState", {hash: token});
					}
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "OpenButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.OpenButtonCaption"},
						"click": {"bindTo": "openSiteEventCard"},
						"visible": {"bindTo": "getEditRecordButtonEnabled"},
						"enabled": {"bindTo": "getEditRecordButtonEnabled"}
					},
					"index": 0
				},
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "ToolsButton",
					"parentName": "Detail",
					"propertyName": "menu",
					"values": {
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("SiteEventDetailV2",
    function() {
        return {
            attributes: {
                /**
                 * Is detail collapsed
                 * @type {Boolean}
                 */
                ToolsButtonVisible: {dataValueType: Terrasoft.DataValueType.BOOLEAN}
            },
            methods: {
                /**
                 * Init detail page.
                 * @protected
                 * @overridden
                 */
                init: function() {
                    this.callParent(arguments);
                    this.set("MultiSelect", false);
                },

	            /**
	             * Initialize detail property. Set detail collapsed by default.
	             * @protected
	             * @overridden
	             */
	            initDetailOptions: function() {
		            this.callParent();
		            this.set("IsDetailCollapsed", true);
	            },

                /**
                 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
                 * @overridden
                 */
                getDeleteRecordMenuItem: Terrasoft.emptyFn,

                /**
                 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
                 * @overridden
                 */
                getCopyRecordMenuItem: Terrasoft.emptyFn,

                /**
                 * Returns visibility button add.
                 * @protected
                 * @return {Boolean} Visibility button, add.
                 */
                getAddRecordButtonVisible: function() {
                    return false;
                },

                /**
                 * Returns visibility of the button with a menu was added.
                 * @protected
                 * @return {Boolean} Visibility button to add a menu.
                 */
                getAddTypedRecordButtonVisible: function() {
                    return false;
                },

                /**
                 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
                 * @overridden
                 */
                getSwitchGridModeMenuItem: Terrasoft.emptyFn,

                /**
                 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
                 * @overridden
                 */
                getEditRecordMenuItem: Terrasoft.emptyFn,
                /**
                 * Add filters and load grid data
                 * @protected
                 * @virtual
                 */
                loadGridData: function() {
                    var masterRecordId = this.get("MasterRecordId");
                    if (masterRecordId !== "") {
                        this.callParent();
                    } else {
                        var gridData = this.getGridData();
                        gridData.clear();
                        var emptyCollection = Ext.create("Terrasoft.Collection");
                        this.set("CanLoadMoreData", false);
                        this.initIsGridEmpty(emptyCollection);
                    }
                    return;
                },
                /**
                 * Handles colapse event for detail
                 * @protected
                 * @virtual
                 * @param {Boolean} isCollapsed Flag of detail is colapsed.
                 */
                onDetailCollapsedChanged: function(isCollapsed) {
                    this.set("ToolsButtonVisible", !isCollapsed);
                    this.callParent(arguments);
                }
            },
            diff: /**SCHEMA_DIFF*/[
                {
                    "operation": "merge",
                    "name": "OpenButton",
                    "parentName": "Detail",
                    "propertyName": "tools",
                    "values": {
                        "visible": false
                    },
                    "index": 0
                },
                {
                    "operation": "merge",
                    "name": "AddRecordButton",
                    "parentName": "Detail",
                    "propertyName": "tools",
                    "values": {
                        "visible": false
                    }
                },
                {
                    "operation": "merge",
                    "name": "ToolsButton",
                    "parentName": "Detail",
                    "propertyName": "menu",
                    "values": {
                        "visible": {"bindTo":"ToolsButtonVisible"}
                    }
                }
            ]/**SCHEMA_DIFF*/
        };
    }
);


