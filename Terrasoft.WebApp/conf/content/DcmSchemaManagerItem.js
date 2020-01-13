Terrasoft.configuration.Structures["DcmSchemaManagerItem"] = {innerHierarchyStack: ["DcmSchemaManagerItem"]};
define("DcmSchemaManagerItem", ["ext-base", "terrasoft", "DcmSchema"], function(Ext, Terrasoft) {

	/**
	 * Dcm schema manager class.
	 */
	Ext.define("Terrasoft.manager.DcmSchemaManagerItem", {
		extend: "Terrasoft.manager.BaseSchemaManagerItem",
		alternateClassName: "Terrasoft.DcmSchemaManagerItem",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#instanceClassName
		 * @overridden
		 */
		instanceClassName: "Terrasoft.DcmSchema",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#requestClassName
		 * @overridden
		 */
		requestClassName: "Terrasoft.DcmSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#removeRequestClassName
		 * @overridden
		 */
		removeRequestClassName: "Terrasoft.DcmSchemaRemoveRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#updateRequestClassName
		 * @overridden
		 */
		updateRequestClassName: "Terrasoft.DcmSchemaUpdateRequest",

		/**
		 * Stage column uId.
		 * @protected
		 * @type {String}
		 */
		stageColumnUId: null,

		/**
		 * Entity schema uId.
		 * @protected
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * Flag that indicates whether, dcm schema is active.
		 * @protected
		 * @type {Boolean}
		 */
		isActive: false,

		/**
		 * Filters of dcm schema.
		 * @protected
		 * @type {Object[]}
		 */
		filters: null,

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#onAfterSave
		 * @override
		 */
		onAfterSave: function(response) {
			if (response.schemaName) {
				this.instance.name = response.schemaName;
			}
			this.callParent(arguments);
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManagerItem#getInstance
		 * @overridden
		 */
		getInstance: function(callback, scope) {
			this.getInstanceWithResponse(callback, scope);
		},

		/**
		 * Returns stage column uId.
		 * @return {String}
		 */
		getStageColumnUId: function() {
			return this.stageColumnUId;
		},

		/**
		 * Returns entity schema uId.
		 * @return {String}
		 */
		getEntitySchemaUId: function() {
			return this.entitySchemaUId;
		},

		/**
		 * Returns flag that indicates whether, dcm schema is active.
		 * @return {Boolean}
		 */
		getIsActive: function() {
			return this.isActive;
		},

		/**
		 * Returns dcm schema filters.
		 * @return {Object[]}
		 * @deprecated
		 */
		getFilters: function() {
			var filters = Ext.JSON.decode(this.filters, true);
			return filters || [];
		},

		/**
		 * Returns dcm schema filters.
		 * @return {Terrasoft.FilterGroup}
		 */
		getFilterGroup: function() {
			return Ext.isEmpty(this.filters)
				? Ext.create("Terrasoft.FilterGroup")
				: Terrasoft.deserialize(this.filters);
		}

		// endregion

	});

	return Terrasoft.DcmSchemaManagerItem;
});


