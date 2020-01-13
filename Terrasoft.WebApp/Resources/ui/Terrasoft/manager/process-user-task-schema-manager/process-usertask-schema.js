/**
 */
Ext.define("Terrasoft.manager.ProcessUserTaskSchema", {
	extend: "Terrasoft.manager.ProcessActivitySchema",
	alternateClassName: "Terrasoft.ProcessUserTaskSchema",

	//region Properties: Protected

	/**
	 * The name of the server object of the contract.
	 * @protected
	 * @type {String}
	 */
	contractName: "ContractProcessUserTaskSchema",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaUserTask",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#portsSet
	 */
	portsSet: Terrasoft.diagram.enums.PortsSet.All,

	/**
	 * Is user action.
	 * @protected
	 * @type {Boolean}
	 */
	isUserTask: true,

	/**
	 * Schema meta data.
	 * @type {String}
	 */
	metaData: null,

	/**
	 * Fill color.
	 * @protected
	 * @type {String}
	 */
	fillColor: null,

	/**
	 * Action schema identifier.
	 * @protected
	 * @type {String}
	 */
	schemaUId: null,

	/**
	 * User task schema,
	 * @type {Terrasoft.UserTaskSchema}
	 * @protected
	 */
	schema: null,

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

	/**
	 * Task schema manager name.
	 * @protected
	 * @type {String}
	 */
	taskSchemaManagerName: "ProcessUserTaskSchemaManager",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @protected
	 */
	group: Terrasoft.FlowElementGroup.UserTask,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @protected
	 */
	smallImageName: "SmallSvgImage.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @protected
	 */
	largeImageName: "LargeSvgImage.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @protected
	 */
	titleImageName: "TitleSvgImage.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#editPageSchemaName
	 * @protected
	 */
	editPageSchemaName: "",

	/**
	 * Flow element schema manager.
	 * @protected
	 * @type {String}
	 */
	elementManagerName: "ProcessFlowElementSchemaManager",

	//endregion

	//region Constructors: Public

	constructor: function() {
		this.schemaManagerName = this.taskSchemaManagerName;
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Private

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getSmallImage
	 * @override
	 */
	getImageConfig: function(imageName) {
		return {
			source: Terrasoft.ImageSources.PROCESS_USERTASK_SCHEMA,
			params: {
				schemaName: this.findSchemaName(),
				resourceItemName: imageName
			}
		};
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

	/**
	 * Returns element schema name.
	 * @protected
	 * @return {String}
	 */
	findSchemaName: function() {
		var id = this.managerItemUId || this.uId;
		var elementManager = Terrasoft[this.elementManagerName];
		var item = elementManager.findItem(id);
		return item.name;
	},

	/**
	 * Returns edit page schema name.
	 * @protected
	 * @return {String} Edit page schema name.
	 */
	getEditPageSchemaName: function(callback, scope) {
		if (!this.editPageSchemaName && this.schema) {
			this.schema.getEditPageSchemaName(function(editPageSchemaName) {
				this.editPageSchemaName = editPageSchemaName;
				callback.call(scope, this.editPageSchemaName);
			}, this);
		} else {
			this.editPageSchemaName = this.editPageSchemaName ||
				Terrasoft.process.constants.DEFAULT_EDIT_PAGE_SCHEMA_NAME;
			callback.call(scope, this.editPageSchemaName);
		}
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, [
			"schemaUId",
			"taskSchemaManagerName",
			"afterActivitySaveScript"
		]);
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
	 * Sets user task schema.
	 * @param {Terrasoft.UserTaskSchema} schema
	 */
	setSchema: function(schema) {
		this.schema = schema;
		this.name = this.name || schema.name;
		this.managerItemUId = this.schemaUId = schema.uId;
		this.uId = this.uId || this.managerItemUId;
		this.caption.merge(schema.caption);
		this.typeCaption = this.getTypeCaption();
		this.description.merge(schema.description);
		this.serializeToDB = this.serializeToDB || schema.serializeToDB;
		this.isUserTask = schema.isUserTask;
		this.editPageSchemaName = schema.editPageSchemaName;
		this.color = schema.color;
		this.usageType = schema.usageType;
	}

	//endregion

});
