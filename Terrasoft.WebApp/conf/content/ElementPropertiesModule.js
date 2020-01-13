Terrasoft.configuration.Structures["ElementPropertiesModule"] = {innerHierarchyStack: ["ElementPropertiesModule"]};
define("ElementPropertiesModule", ["ConfigurationModuleV2"], function() {

	Ext.define("Terrasoft.ElementPropertiesModule", {
		extend: "Terrasoft.ConfigurationModule",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @override
		 */
		useHistoryState: false,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#isSchemaConfigInitialized
		 * @override
		 */
		isSchemaConfigInitialized: true,

		/**
		 * @inheritdoc Terrasoft.BaseModule#showMask
		 * @override
		 */
		showMask: true,

		/**
		 * Design schema.
		 * @protected
		 * @type {Terrasoft.PageDesignerSchema}
		 */
		designSchema: null,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function() {
			this.showLoadingMask();
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseModule#showLoadingMask
		 * @override
		 */
		showLoadingMask: function() {
			if (this.showMask && !this.maskId && this.renderToId) {
				this.maskId = Terrasoft.Mask.show({
					selector: Ext.String.format("#{0}", this.renderToId),
					clearMasks: true
				});
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseModule#render
		 * @override
		 */
		render: function() {
			this.callParent(arguments);
			this.hideLoadingMask();
		}

		// endregion

	});

	return Terrasoft.ElementPropertiesModule;

});


