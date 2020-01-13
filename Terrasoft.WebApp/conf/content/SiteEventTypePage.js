Terrasoft.configuration.Structures["SiteEventTypePage"] = {innerHierarchyStack: ["SiteEventTypePage"], structureParent: "BaseModulePageV2"};
define('SiteEventTypePageStructure', ['SiteEventTypePageResources'], function(resources) {return {schemaUId:'57f9df5b-d2f2-41e4-ab2c-d794e2bf36d3',schemaCaption: "SiteEventTypePage", parentSchemaName: "BaseModulePageV2", schemaName:'SiteEventTypePage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SiteEventTypePage", ["SiteEventTypePageResources", "EventTrackingEnums"],
function(resources, EventTrackingEnums) {
	return {
		entitySchemaName: "SiteEventType",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "WebsiteEventType",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "WebsiteEventType",
					"caption": {
						"bindTo": "Resources.Strings.WebsiteEventTypeCaption"
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IsActive",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "IsActive",
					"caption": {
						"bindTo": "Resources.Strings.IsActiveCaption"
					},
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0,
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"name": "GeneralInfoBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "GeneralInfoContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "SelectorType",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					},
					"bindTo": "SelectorType",
					"caption": {
						"bindTo": "Resources.Strings.SelectorTypeCaption"
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"enabled": true,
					"visible": {
						"bindTo": "SelectorTypeIsVisible"
					}
				},
				"parentName": "GeneralInfoContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Identifier",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Identifier",
					"caption": {
						"bindTo": "IdentifierCaption"
					},
					"tip": {
						"content": {"bindTo": "IdentifierHint"},
						"displayMode": Terrasoft.controls.TipEnums.displayMode.WIDE,
						"tools": []
					},
					"enabled": true
				},
				"parentName": "GeneralInfoContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			}
		]/**SCHEMA_DIFF*/,
		attributes: {
			"SelectorTypeIsVisible": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			"IdentifierCaption": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ""
			},
			/**
			 * Hint for event identifier hint
			 */
			"IdentifierHint": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ""
			}
		},
		methods: {
			/**
			 * The initialization function module.
			 * @overridden
			 */
			init: function() {
				this.on("change:SelectorType", this.onChangeSelectorType, this);
				this.on("change:WebsiteEventType", this.onChangeWebsiteEventType, this);
				this.callParent(arguments);
			},

			/**
			 * Sets identifier caption.
			 * @protected
			 */
			setIdentifierCaption: function() {
				var websiteEvent = this.get("WebsiteEventType");
				var isClickEventType = false;
				if (websiteEvent && websiteEvent.value === EventTrackingEnums.WebsiteEventType.CLICK) {
					this.set("SelectorTypeIsVisible", true);
					this.set("IdentifierCaption", resources.localizableStrings.IdentifierCaption);
					isClickEventType = true;
				} else {
					this.set("SelectorTypeIsVisible", false);
					this.set("IdentifierCaption", resources.localizableStrings.PageUrlCaption);
				}
				this.setIdentifierHint(isClickEventType);
			},

			/**
			 * Sets identifier hint.
			 * @protected
			 */
			setIdentifierHint: function(isClickEventType) {
				var websiteEvent = this.get("WebsiteEventType");
				if (websiteEvent && websiteEvent.value === EventTrackingEnums.WebsiteEventType.CLICK) {
					var selector = this.get("SelectorType");
					if (selector || isClickEventType) {
						if (selector && selector.value === EventTrackingEnums.SelectorType.BY_JQUERY_SELECTOR) {
							this.set("IdentifierHint", resources.localizableStrings.IdentifierSelectorHint);
						} else if (selector && selector.value === EventTrackingEnums.SelectorType.BY_CLASS) {
							this.set("IdentifierHint", resources.localizableStrings.IdentifierClassHint);
						} else {
							this.set("IdentifierHint", resources.localizableStrings.IdentifierIdHint);
						}
					}
				} else {
					this.set("IdentifierHint", resources.localizableStrings.PageUrlHint);
				}
			},

			/**
			 * SelectorType change event handler.
			 */
			onChangeSelectorType: function() {
				this.setIdentifierHint();
			},

			/**
			 * WebsiteEventType change event handler.
			 */
			onChangeWebsiteEventType: function() {
				this.setIdentifierCaption();
			}
		},
		rules: {},
		userCode: {}
	};
});


