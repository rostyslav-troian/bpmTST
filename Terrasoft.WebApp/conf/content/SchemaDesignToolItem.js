Terrasoft.configuration.Structures["SchemaDesignToolItem"] = {innerHierarchyStack: ["SchemaDesignToolItem"]};
define("SchemaDesignToolItem", ["SchemaDesignToolItemResources"], function() {

	/**
	 * Terrasoft.SchemaDesignToolItem
	 */
	Ext.define("Terrasoft.SchemaDesignToolItem", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.configuration.SchemaDesignToolItem",

		/**
		 * Sandbox.
		 * @type {Object}
		 */
		sandbox: null,

		/**
		 * Data source view model.
		 * @type {Terrasoft.model.BaseViewModel}
		 */
		parentViewModel: null,

		/**
		 * Design item class name.
		 * @type {String}
		 */
		designItemClassName: null,

		/**
		 * Design item config.
		 * @type {Object}
		 */
		designItemConfig: null,

		/**
		 * Design item.
		 * @private
		 * @type {Terrasoft.GridLayoutEditItemModel}
		 */
		internalItem: null,

		/**
		 * Invalid drop handler.
		 * @protected
		 * @virtual
		 */
		onInvalidDrop: function() {
			this.fireEvent("change", this, {operation: "InvalidDrop"});
		},

		/**
		 * Drag over handler.
		 * @protected
		 * @virtual
		 */
		onDragOver: function(intersection) {
			Ext.apply(intersection, {
				colSpan: this.internalItem.get("colSpan"),
				rowSpan: this.internalItem.get("rowSpan"),
				operation: "DragOver"
			});
			this.fireEvent("change", this, intersection);
		},

		/**
		 * Success drag and drop handler.
		 * @protected
		 * @virtual
		 */
		onDragDrop: function(info) {
			Ext.apply(info, {operation: "DragDrop"});
			this.fireEvent("change", this, info);
		},

		/**
		 * Adds draggable group.
		 * @param {String} groupName Group name.
		 */
		addDraggableGroupName: function(groupName) {
			var draggableGroupNames = Terrasoft.deepClone(this.get("draggableGroupNames") || []);
			draggableGroupNames.push(groupName);
			this.set("draggableGroupNames", draggableGroupNames);
		},

		/**
		 * Creates design item from internal item.
		 * @param {Terrasoft.ViewModelSchemaDesignerSchema} designSchema Design schema.
		 * @param {Object} config Configuration object.
		 * @return {Array} Design item.
		 */
		createDesignItem: function(designSchema, config) {
			return this.internalItem.createDesignItem(designSchema, config);
		},

		/**
		 * Returns image config.
		 * @return {Array} Image config.
		 */
		getImageConfig: function() {
			return this.internalItem.getImageConfig();
		},

		/**
		 * Returns content.
		 * @return {Array} Content.
		 */
		getContent: function() {
			return this.internalItem.get("content");
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.internalItem = Ext.create(this.designItemClassName, this.getDesignItemConfg());
			this.set("itemId", this.internalItem.itemConfig && this.internalItem.itemConfig.name);
			this.set("content", this.getContent());
		},

		/**
		 * Handler for remove menu item click.
		 */
		onRemoveMenuItemClick: function() {
			this.fireEvent("change", this, {operation: "Remove"});
		},

		/**
		 * @protected
		 */
		getDesignItemConfg: function() {
			return this.designItemConfig;
		}

	});

	return Terrasoft.SchemaDesignToolItem;
});


