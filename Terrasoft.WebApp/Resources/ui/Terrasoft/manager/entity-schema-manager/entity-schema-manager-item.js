/**
 */
Ext.define("Terrasoft.manager.EntitySchemaManagerItem", {
	extend: "Terrasoft.manager.BaseSchemaManagerItem",
	alternateClassName: "Terrasoft.EntitySchemaManagerItem",

	// region Properties: Protected

	/**
	 * The name of the schema instance class.
	 * @protected
	 * @property {String} instanceClassName
	 */
	instanceClassName: "Terrasoft.EntitySchema",

	/**
	 * The class name for the schema selection.
	 * @protected
	 * @property {String} requestClassName
	 */
	requestClassName: "Terrasoft.EntitySchemaRequest",

	/**
	 * Name of the Schema selection class for deletion.
	 * @protected
	 * @type {String}
	 */
	removeRequestClassName: "Terrasoft.EntitySchemaRemoveRequest",

	/**
	 * The name of the schema save request class.
	 * @protected
	 * @type {String}
	 */
	updateRequestClassName: "Terrasoft.EntitySchemaUpdateRequest",

	/**
	 * A flag of the need to update the structure of the database.
	 * @protected
	 * @type {Boolean}
	 */
	needUpdateStructure: null,

	/**
	 * A flag of the virtual schema.
	 * @protected
	 * @type {Boolean}
	 */
	isVirtual: null,

	// endregion

	// region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#onAfterSave
	 * @override
	 */
	onAfterSave: function() {
		this.needUpdateStructure = (this.status !== Terrasoft.ModificationStatus.NOT_MODIFIED);
		this.checkInstance();
		this.instance.undef();
		this.instance.define();
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Public

	/**
	 * The method returns a flag of the need to update the structure of the database.
	 * @return {String}
	 */
	getNeedUpdateStructure: function() {
		return this.needUpdateStructure;
	},

	/**
	 * The method returns a characteristic of the virtual schema.
	 * @return {Boolean}
	 */
	getIsVirtual: function() {
		return (this.isVirtual === true);
	},

	/**
	 * The method returns a hierarchy of schemas.
	 * @return {Array}
	 */
	getHierarchyInfo: function() {
		var info = [];
		var parentItem = Terrasoft.EntitySchemaManager.findItem(this.parentUId);
		if (parentItem) {
			info = info.concat(parentItem.getHierarchyInfo());
		}
		info.push({
			id: this.id,
			uId: this.uId,
			name: this.name,
			packageUId: this.packageUId
		});
		return info;
	}

	// endregion

});
