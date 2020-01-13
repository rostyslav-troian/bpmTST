Terrasoft.configuration.Structures["AttributeInSiteEventPageV2"] = {innerHierarchyStack: ["AttributeInSiteEventPageV2SiteEvent", "AttributeInSiteEventPageV2"], structureParent: "BasePageV2"};
define('AttributeInSiteEventPageV2SiteEventStructure', ['AttributeInSiteEventPageV2SiteEventResources'], function(resources) {return {schemaUId:'950e283b-0c78-456e-bf53-46a66ad765a1',schemaCaption: "Attribute card - Website event", parentSchemaName: "BasePageV2", schemaName:'AttributeInSiteEventPageV2SiteEvent',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AttributeInSiteEventPageV2Structure', ['AttributeInSiteEventPageV2Resources'], function(resources) {return {schemaUId:'51a9f0de-d8c0-4727-b27e-29c756fba645',schemaCaption: "Attribute card - Website event", parentSchemaName: "AttributeInSiteEventPageV2SiteEvent", schemaName:'AttributeInSiteEventPageV2',parentSchemaUId:'950e283b-0c78-456e-bf53-46a66ad765a1',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AttributeInSiteEventPageV2SiteEvent",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AttributeInSiteEventPageV2SiteEventResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AttributeInSiteEventPageV2SiteEvent", ["SiteEventConstants", "BusinessRuleModule"],
	function(SiteEventConstants, BusinessRuleModule) {
		return {
			entitySchemaName: "AttributeInSiteEvent",
			attributes: {
				/**
				 * ####### #######.
				 * @type: {Terrasoft.DataValueType.LOOKUP}
				 */
				"SiteEventAttribute":
				{
					lookupListConfig: {
						columns: ["Type"]
					}
				}
			},
			methods: {
				/**
				 *  ########## ###### ######### ######## ########, #### ##### ## ################ ## #######.
				 *  ####### ##### ######## # ####### ######!
				 * @returns {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########.
				 */
				getActions: function() {
					var parentActions = this.callParent(arguments);
					if (parentActions && !this.getSchemaAdministratedByRecords()) {
						parentActions.clear();
					}
					return parentActions;
				},

				/**
				 * ########## ######### ####### ## #### ######## ########.
				 * @returns {boolean} ########## true.
				 */
				isColumnVisibleByType: function(attributeType) {
					var siteEventAttribute = this.get("SiteEventAttribute");
					var siteEventAttributeType = (siteEventAttribute && siteEventAttribute.Type &&
						siteEventAttribute.Type.value);
					return (siteEventAttributeType === SiteEventConstants.AttributeTypes[attributeType]);
				},

				/**
				 * ########## ######### ####### ########## ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isStringValueVisible: function() {
					return this.isColumnVisibleByType("StringType");
				},

				/**
				 * ########## ######### ####### ######### ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isIntValueVisible: function() {
					return this.isColumnVisibleByType("IntType");
				},

				/**
				 * ########## ######### ####### ######## ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isFloatValueVisible: function() {
					return this.isColumnVisibleByType("FloatType");
				},

				/**
				 * ########## ######### ####### ########### ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isBooleanValueVisible: function() {
					return this.isColumnVisibleByType("BooleanType");
				},

				/**
				 * ########## ######### ####### ######## ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isListItemValueVisible: function() {
					return this.isColumnVisibleByType("ListType");
				},

				/**
				 * ########## ######### ####### ######## ###### ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isProductValueVisible: function() {
					return this.isColumnVisibleByType("ProductType");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "ViewOptionsButton"
				},
				{
					"operation": "merge",
					"name": "Tabs",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "SiteEvent",
					"values": {
						"bindTo": "SiteEvent",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "SiteEventAttribute",
					"values": {
						"bindTo": "SiteEventAttribute",
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"name": "ColumnsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 0},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "ProductValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"contentType": Terrasoft.ContentType.LOOKUP,
						"visible": {
							"bindTo": "isProductValueVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "ListItemValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"contentType": Terrasoft.ContentType.ENUM,
						"bindTo": "ListItemValue",
						"visible": {
							"bindTo": "isListItemValueVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "StringValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"visible": {
							"bindTo": "isStringValueVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "IntValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"visible": {
							"bindTo": "isIntValueVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "FloatValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"visible": {
							"bindTo": "isFloatValueVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "BooleanValue",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ValueCaption"},
						"visible": {
							"bindTo": "isBooleanValueVisible"
						}
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"ListItemValue": {
					"FiltrationListItemValueBySiteEventAttribute": {
						ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
						autoClean: true,
						baseAttributePatch: "SiteEventAttribute",
						comparisonType: this.Terrasoft.ComparisonType.EQUAL,
						type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						attribute: "SiteEventAttribute"
					}
				}
			}
		};
	});

define("AttributeInSiteEventPageV2", [],
	function() {
		return {
			entitySchemaName: "AttributeInSiteEvent",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * ########## ######### ####### ######## #### ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isProductTypeVisible: function() {
					return this.isColumnVisibleByType("ProductTypeType");
				},

				/**
				 * ########## ######### ####### ######## ######### ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isProductCategoryVisible: function() {
					return this.isColumnVisibleByType("ProductCategoryType");
				},

				/**
				 * ########## ######### ####### ######## ######## ##### ######## ## #### ########.
				 * @returns {boolean} ########## true.
				 */
				isProductTrademarkVisible: function() {
					return this.isColumnVisibleByType("ProductTradeMarkType");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "ProductCategoryValue",
					"values": {
						"caption": { "bindTo": "Resources.Strings.ValueCaption" },
						"contentType": Terrasoft.ContentType.LOOKUP,
						visible: {
							"bindTo": "isProductCategoryVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "ProductTypeValue",
					"values": {
						"caption": { "bindTo": "Resources.Strings.ValueCaption" },
						"contentType": Terrasoft.ContentType.LOOKUP,
						visible: {
							"bindTo": "isProductTypeVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnsContainer",
					"propertyName": "items",
					"name": "ProductTradeMarkValue",
					"values": {
						"caption": { "bindTo": "Resources.Strings.ValueCaption" },
						"contentType": Terrasoft.ContentType.LOOKUP,
						visible: {
							"bindTo": "isProductTrademarkVisible"
						}
					}
				}
			]/**SCHEMA_DIFF*/
		}

	});


