/**
 * Class of query for selection of system settings data
 */
Ext.define("Terrasoft.data.queries.SysSettingQuery", {
	alternateClassName: "Terrasoft.SysSettingQuery",
	extend: "Terrasoft.EntitySchemaQuery",

	/**
	 * @inheritdoc Terrasoft.EntitySchemaQuery#rowViewModelClassName.
	 * @protected
	 * @override
	 */
	rowViewModelClassName: "Terrasoft.SysSettingViewModel"

});