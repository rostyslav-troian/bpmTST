Terrasoft.configuration.Structures["PageDesignerViewGenerator"] = {innerHierarchyStack: ["PageDesignerViewGenerator"], structureParent: "ViewModelSchemaDesignerViewGenerator"};
define("PageDesignerViewGenerator", ["PageDesignerViewGeneratorResources", "ViewModelSchemaDesignerViewGenerator",
	"PageDesignerButtonsContainer", "PageDesignerButton", "css!PageDesignerButtonsContainer"
], function() {

	/**
	 * Page designer view generator.
	 */
	Ext.define("Terrasoft.configuration.PageDesignerViewGenerator", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator",
		alternateClassName: "Terrasoft.PageDesignerViewGenerator",

		// region Properties: Protected

		/**
		 * Flags that indicates whether designer is read only on not.
		 * @type {Boolean}
		 */
		isReadOnly: false,

		// endregion

		// region Methods: Private

		/**
		 * @private
		 */
		_getButtonReorderableContainerConfig: function() {
			var id = "ProcessActionButtons_ReorderableContainer";
			return {
				"className": "Terrasoft.PageDesignerButtonsContainer",
				"id": id,
				"groupName": id,
				"viewModelItems": "$ProcessActionButtons",
				"reorderableIndex": "$ButtonReorderableIndex",
				"mousedown": {"bindTo": "onProcessActionButtonsMouseDown"},
				"classes": {"wrapClassName": "button-reordable-container"}
			};
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator#generateContainer
		 * @override
		 */
		generateContainer: function(config) {
			if (config.name === "ProcessActionButtons") {
				config.excludeItemTypes = [Terrasoft.ViewItemType.BUTTON];
				var container = this.callParent([config]);
				var buttonContainer = this._getButtonReorderableContainerConfig();
				container.items.push(buttonContainer);
				return container;
			}
			return this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator#generateTabTools
		 * @override
		 */
		generateTabTools: function() {
			return this.isReadOnly ? [] : this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerViewGenerator#generateTabPanelTools
		 * @override
		 */
		generateTabPanelTools: function() {
			return this.isReadOnly ? [] : this.callParent(arguments);
		}

		// endregion

	});

	return Terrasoft.PageDesignerViewGenerator;

});


