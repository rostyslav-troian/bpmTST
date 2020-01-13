Terrasoft.configuration.Structures["ExpressionEditDemo"] = {innerHierarchyStack: ["ExpressionEditDemo"]};
define("ExpressionEditDemo", ["ExpressionEditDemoResources", "terrasoft", "ext-base", "ExpressionEdit",
	"ExpressionEditVMMixin"],
	function(resources, Terrasoft, Ext) {

	Ext.define("Terrasoft.configuration.ExpressionEditDemoViewModel", {
		alternateClassName: "Terrasoft.ExpressionEditDemoViewModel",
		extend: "Terrasoft.BaseViewModel",

		mixins: {
			"ExpressionEditVMMixin": "Terrasoft.ExpressionEditVMMixin"
		}

	});

	Ext.define("Terrasoft.configuration.ExpressionEditDemo", {
		alternateClassName: "Terrasoft.ExpressionEditDemo",
		extend: "Terrasoft.BaseSchemaModule",
		init: function(callback) {
			if (callback) {
				callback.call(this);
			}
		},
		render: function(renderTo) {
			var view = Ext.create("Terrasoft.Container", {
				"id": "container",
				"items": [{
					"className": "Terrasoft.ExpressionEdit"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "TextExpressionType"},
					"dataValueType": {"bindTo": "TextDataValueType"},
					"value": {"bindTo": "TextValue"}
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "TextExpressionType"},
					"dataValueType": {"bindTo": "TextDataValueType"},
					"value": {"bindTo": "TextValue"},
					"placeholder": "Custom placeholder"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "TextExpressionType"},
					"dataValueType": {"bindTo": "TextDataValueType"},
					"value": {"bindTo": "TextValue"},
					"visible": false
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"dataValueType": Terrasoft.DataValueType.LONG_TEXT,
					"placeholder": "LONG_TEXT"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"dataValueType": Terrasoft.DataValueType.MEDIUM_TEXT,
					"placeholder": "MEDIUM_TEXT"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"dataValueType": Terrasoft.DataValueType.FLOAT3,
					"placeholder": "FLOAT3"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"dataValueType": Terrasoft.DataValueType.MONEY,
					"placeholder": "MONEY"
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "DateTimeExpressionType"},
					"dataValueType": {"bindTo": "DateTimeDataValueType"},
					"value": {"bindTo": "DateTimeValue"}
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "BooleanExpressionType"},
					"dataValueType": {"bindTo": "BooleanDataValueType"},
					"value": {"bindTo": "BooleanValue"}
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "LookupExpressionType"},
					"dataValueType": {"bindTo": "LookupDataValueType"},
					"referenceSchema": {"bindTo": "LookupReferenceSchema"},
					"value": {"bindTo": "LookupValue"},
					"prepareReferenceSchemaList": {"bindTo": "prepareReferenceSchemaList"},
					"prepareValueList": {"bindTo": "prepareLookupValueList"}
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "LookupExpressionType"},
					"dataValueType": {"bindTo": "LookupDataValueType"},
					"referenceSchema": {"bindTo": "LookupReferenceSchema"},
					"value": {"bindTo": "LookupValue"},
					"prepareReferenceSchemaList": {"bindTo": "prepareReferenceSchemaList"},
					"prepareValueList": {"bindTo": "prepareLookupValueList"},
					"typeVisible": false
				},
				{
					"className": "Terrasoft.ExpressionEdit",
					"expressionType": {"bindTo": "LookupExpressionType"},
					"dataValueType": {"bindTo": "LookupDataValueType"},
					"referenceSchema": {"bindTo": "LookupReferenceSchema"},
					"value": {"bindTo": "LookupValue"},
					"prepareReferenceSchemaList": {"bindTo": "prepareReferenceSchemaList"},
					"prepareValueList": {"bindTo": "prepareLookupValueList"},
					"typeEnabled": false
				}]
			});
			var viewModel = Ext.create("Terrasoft.ExpressionEditDemoViewModel", {
				"values": {
					"TextExpressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"TextDataValueType": Terrasoft.DataValueType.TEXT,
					"TextValue": "Text",

					"DateTimeExpressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"DateTimeDataValueType": Terrasoft.DataValueType.DATE_TIME,
					"DateTimeValue": new Date(),


					"BooleanExpressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"BooleanDataValueType": Terrasoft.DataValueType.BOOLEAN,
					"BooleanValue": true,

					"LookupExpressionType": Terrasoft.ExpressionEnums.ExpressionType.CONSTANT,
					"LookupDataValueType": Terrasoft.DataValueType.LOOKUP,
					"LookupReferenceSchema": null,
					"LookupValue": null
				},
				"methods": {
					prepareLookupValueList: function(filter, list) {
						var expressionType = this.get("LookupExpressionType");
						var referenceSchema = this.get("LookupReferenceSchema");
						var referenceSchemaName = referenceSchema && referenceSchema.name;
						this.mixins.ExpressionEditVMMixin.prepareValueList(filter, list, expressionType, referenceSchemaName);
					}
				}
			});
			view.bind(viewModel);
			view.render(renderTo);
		}
	});


	return Terrasoft.ExpressionEditDemo;
});

