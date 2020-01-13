/**
 */
Ext.define("Terrasoft.manager.ProcessFormulaTaskSchema", {
	extend: "Terrasoft.ProcessScriptTaskSchema",
	alternateClassName: "Terrasoft.ProcessFormulaTaskSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 * @override
	 */
	managerItemUId: "d334d28f-b11a-477e-9ff0-0a95fa73d53b",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaFormulaTask",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @override
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.FormulaTaskCaption,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#name
	 * @override
	 */
	name: "FormulaTask",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @override
	 */
	smallImageName: "formulaTask_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @override
	 */
	largeImageName: "formulaTask_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "formulaTask_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "FormulaTaskPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessScriptTaskSchema#body
	 * @override
	 */
	body: "",

	/**
	 * @protected
	 * @type {String}
	 */
	resultParameterMetaPath: "",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#preventShowPropertiesWindowOnAdding
	 * @override
	 */
	preventShowPropertiesWindowOnAdding: false,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessScriptTaskSchema#onScriptTaskChanged
	 * @override
	 */
	onScriptTaskChanged: Terrasoft.emptyFn,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["resultParameterMetaPath"]);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#requireCompilation
	 * @override
	 */
	requireCompilation: function() {
		return false;
	}

	//endregion

});
