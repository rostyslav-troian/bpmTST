/**
 */
Ext.define("Terrasoft.manager.ProcessSchemaUserTask", {
	extend: "Terrasoft.ProcessActivitySchema",
	alternateClassName: "Terrasoft.ProcessSchemaUserTask",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 * @override
	 */
	managerItemUId: "1418e61a-82c3-403e-8221-01088f52c125",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	group: Terrasoft.FlowElementGroup.ServiceTask,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "UserTaskPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaUserTask",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @override
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.UserTaskCaption,

	/**
	 * Color of filling.
	 * @protected
	 * @type {String}
	 */
	fillColor: null,

	/**
	 * Action Schema ID.
	 * @type {String}
	 */
	schemaUId: Terrasoft.GUID_EMPTY,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 * @override
	 */
	name: "UserTask",

	/**
	 * Schema manager name.
	 * @protected
	 * @type {String}
	 */
	taskSchemaManagerName: "ProcessUserTaskSchemaManager",

	/**
	 * Script body, executed after Activity save.
	 * @protected
	 * @type {String}
	 */
	afterActivitySaveScript: "",

	/**
	 * Flag that indicates whether item require compile.
	 * @protected
	 * @type {Boolean}
	 */
	isCompilationRequired: false,

	//endregion

	//region Constructors: Public

	constructor: function() {
		this.schemaManagerName = this.taskSchemaManagerName;
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchema#initEvents
	 * @protected
	 * @override
	 */
	initEvents: function() {
		this.on("changed", this.onChanged, this);
	},

	/**
	 * Script task changed event handler. Checks changes of name and body properties. If this properties changed,
	 * register changes to process schema for compilation.
	 * @param {Object} changes Key-value pair of changes.
	 * @protected
	 */
	onChanged: function(changes) {
		if (changes.hasOwnProperty("afterActivitySaveScript") ||
			(changes.hasOwnProperty("realName") && !Ext.isEmpty(this.afterActivitySaveScript))) {
			var parentSchema = this.parentSchema;
			var itemChangeAction = Terrasoft.process.constants.ITEM_CHANGE_ACTION;
			this.isCompilationRequired = true;
			parentSchema.addSchemaChangedItem(this.uId, this.getDisplayValue(), itemChangeAction.MODIFY);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#requireCompilation
	 * @override
	 */
	requireCompilation: function() {
		return this.isCompilationRequired === true;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, [
			"fillColor",
			"schemaUId",
			"taskSchemaManagerName",
			"afterActivitySaveScript"
		]);
	}

	//endregion

});
