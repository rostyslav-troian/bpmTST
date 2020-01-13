/**
 */
Ext.define("Terrasoft.manager.ProcessScriptTaskSchema", {
	extend: "Terrasoft.ProcessActivitySchema",
	alternateClassName: "Terrasoft.ProcessScriptTaskSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "0e490dda-e140-4441-b600-6f5c64d024df",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaScriptTask",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.ScriptTaskCaption,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#name
	 */
	name: "ScriptTask",

	/**
	 * Is user task option.
	 * @protected
	 * @type {Boolean}
	 */
	isUserTask: false,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.ServiceTask,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "scriptTask_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "scriptTask_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "scriptTask_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#portsSet
	 */
	portsSet: Terrasoft.diagram.enums.PortsSet.All,

	/**
	 * Fill color.
	 * @protected
	 * @type {String}
	 */
	fillColor: null,

	/**
	 * Content.
	 * @protected
	 * @type {String}
	 */
	body: "return true;",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#preventShowPropertiesWindowOnAdding
	 */
	preventShowPropertiesWindowOnAdding: true,

	/**
	 * Feature, use a script to an interpreted engine processes.
	 * @protected
	 * @type {Boolean}
	 */
	useFlowEngineScriptVersion: false,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "ScriptTaskPropertiesPage",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchema#initEvents
	 * @protected
	 * @override
	 */
	initEvents: function() {
		this.on("changed", this.onScriptTaskChanged, this);
	},

	/**
	 * Script task changed event handler. Checks changes of name and body properties. If this properties changed,
	 * register changes to process schema for compilation.
	 * @param {Object} changes Key-value pair of changes.
	 * @protected
	 */
	onScriptTaskChanged: function(changes) {
		var parentSchema = this.parentSchema;
		var itemChangeAction = Terrasoft.process.constants.ITEM_CHANGE_ACTION;
		if (changes.hasOwnProperty("body") || changes.hasOwnProperty("realName")) {
			parentSchema.addSchemaChangedItem(this.uId, this.getDisplayValue(), itemChangeAction.MODIFY);
		}
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["body", "fillColor", "useFlowEngineScriptVersion"]);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#requireCompilation
	 * @override
	 */
	requireCompilation: function() {
		return true;
	}

	//endregion
});
