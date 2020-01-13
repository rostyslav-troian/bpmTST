Terrasoft.configuration.Structures["ExpressionEnums"] = {innerHierarchyStack: ["ExpressionEnums"]};
define("ExpressionEnums", [], function() {

	Ext.ns("Terrasoft.ExpressionEnums");

	/**
	 * Expression type.
	 * @enum [Terrasoft.ExpressionEnums.ExpressionType]
	 */
	Terrasoft.ExpressionEnums.ExpressionType = {
		CONSTANT: "ConstantBusinessRuleExpression",
		ATTRIBUTE: "AttributeBusinessRuleExpression",
		SYSSETTING: "SysSettingBusinessRuleExpression",
		SYSVALUE: "SysValueBusinessRuleExpression",
		COLUMN: "ColumnBusinessRuleExpression",
		PARAMETER: "ParameterBusinessRuleExpression",
		DATASOURCE: "DataSourceBusinessRuleExpression"
	};

});


