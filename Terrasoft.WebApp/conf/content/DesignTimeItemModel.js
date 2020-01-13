Terrasoft.configuration.Structures["DesignTimeItemModel"] = {innerHierarchyStack: ["DesignTimeItemModel"]};
define("DesignTimeItemModel", ["DesignTimeItemModelResources", "DesignTimeItemModel"], function(resources) {

	/**
	 * Class of DesignTimeItemModel.
	 */
	Ext.define("Terrasoft.configuration.DesignTimeItemModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.DesignTimeItemModel",

		// region Properties: Public

		/**
		 * Design schema.
		 * @type {Terrasoft.ViewModelSchemaDesignerSchema}
		 */
		designSchema: null,

		// endregion

		// region Methods: Abstract

		/**
		 * Returns the image configuration for current data type.
		 * @abstract
		 * @return {Object} Image configuration.
		 */
		getImageConfig: Terrasoft.abstractFn,

		/**
		 * Returns caption for element.
		 * @abstract
		 * @return {Object} Caption for element.
		 */
		getCaption: Terrasoft.abstractFn,

		/**
		 * Creates design item from self.
		 * @abstract
		 * @param {Terrasoft.ViewModelSchemaDesignerSchema} designSchema Design schema.
		 * @param {Object} config Configuration object.
		 * @return {Terrasoft.DesignTimeItemModel}
		 */
		createDesignItem: Terrasoft.abstractFn,

		/**
		 * Adds design item to design schema.
		 * @abstract
		 * @param {Object} config Configuration object.
		 */
		addToDesignSchema: Terrasoft.abstractFn,

		/**
		 * Edits design item.
		 * @abstract
		 * @param {Object} config Configuration object.
		 */
		edit: Terrasoft.abstractFn,

		/**
		 * Removes design item from design schema.
		 * @abstract
		 * @param {Object} config Configuration object.
		 */
		removeFromDesignSchema: Terrasoft.abstractFn,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
			this.onContentChange();
			if (this.isDesignState()) {
				this.registerMessages();
			}
		},

		/**
		 * Returns the drag action code for type of data.
		 * @protected
		 * @return {Object} Drag action code.
		 */
		getDragActionCode: function() {
			return Terrasoft.DragAction.ALL;
		},

		/**
		 * Initializes model resources values from resources object.
		 * @protected
		 * @param {Object} resourcesObj Resources object.
		 */
		initResourcesValues: function(resourcesObj) {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * Returns array of classes for current item.
		 * @protected
		 * @return {String[]} Array of CSS classes.
		 */
		getItemClasses: function() {
			return [];
		},

		/**
		 * Initializes caption for element.
		 * @protected
		 */
		initCaption: function() {
			this.set("content", this.getCaption());
		},

		/**
		 * Initializes item CSS classes.
		 * @protected
		 */
		initStyles: function() {
			this.set("wrapClasses", this.getItemClasses());
		},

		/**
		 * Initializes drag action code for data type.
		 * @protected
		 */
		initDragActionCode: function() {
			this.set("DragActionsCode", this.getDragActionCode());
		},

		/**
		 * Column changes handler.
		 * @protected
		 */
		onContentChange: function() {
			this.initCaption();
			this.initDragActionCode();
			this.initStyles();
		},

		/**
		 * Returns configuration button visibility.
		 * @protected
		 * @return {Boolean} true - if field can be changed, false - in other case.
		 */
		getConfigurationButtonVisible: function() {
			return true;
		},

		/**
		 * Returns true if item created for designing.
		 * @protected
		 * @return {Boolean} True if item created for designing
		 */
		isDesignState: function() {
			return !Ext.isEmpty(this.designSchema);
		},

		/**
		 * Returns remove button visibility.
		 * @protected
		 * @return {Boolean} true - if field can be deleted, false - in other case.
		 */
		getRemoveButtonVisible: function() {
			return true;
		},

		/**
		 * Registers design item messages in design schema.
		 * @protected
		 */
		registerMessages: function() {
			Terrasoft.each(this.getMessages(), function(messageConfig) {
				this.designSchema.registerApplictionComponentItemMessage(messageConfig);
			}, this);
		},

		/**
		 * Returns design item message config.
		 * @protected
		 * @return {Array} Design item message config.
		 */
		getMessages: function() {
			return [];
		}

		// endregion

	});

	return Terrasoft.DesignTimeItemModel;
});


