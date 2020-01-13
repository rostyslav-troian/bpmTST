Terrasoft.configuration.Structures["ProcessMiniEditPageModule"] = {innerHierarchyStack: ["ProcessMiniEditPageModule"]};
define("ProcessMiniEditPageModule", ["BaseSchemaModuleV2"],
	function() {

		/**
		 * @class Terrasoft.ProcessDesigner.ProcessMiniEditPageModule
		 */
		Ext.define("Terrasoft.ProcessDesigner.ProcessMiniEditPageModule", {
			alternateClassName: "Terrasoft.ProcessMiniEditPageModule",
			extend: "Terrasoft.BaseSchemaModule",

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#isSchemaConfigInitialized
			 * @overridden
			 */
			isSchemaConfigInitialized: true,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#useHistoryState
			 * @overridden
			 */
			useHistoryState: false,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#generateViewContainerId
			 * @overridden
			 */
			generateViewContainerId: false,

			/**
			 * @inheritdoc Terrasoft.BaseModule#render
			 * @overridden
			 */
			showMask: true,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#init
			 * @overridden
			 */
			init: function() {
				this.showLoadingMask();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.configuration.BaseModule#getViewModelConfig
			 * @overridden
			 */
			showLoadingMask: function() {
				if (this.maskId) {
					return;
				}
				if (this.showMask && this.renderToId) {
					this.maskId = Terrasoft.Mask.show({
						selector: Ext.String.format("#{0}", this.renderToId),
						clearMasks: true
					});
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#render
			 * @overridden
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				this.hideLoadingMask();
				var container = this.Ext.get(renderTo);
				var el = container.dom;
				if (!this.isElementInViewport(el)) {
					el.scrollIntoView(false);
				}
			},

			/**
			 * Indicates whether element is visible entirely or not.
			 * @param {Object} el Dom element.
			 * @return {Boolean}
			 */
			isElementInViewport: function(el) {
				var rect = el.getBoundingClientRect();
				var height = window.innerHeight || document.documentElement.clientHeight;
				var width = window.innerWidth || document.documentElement.clientWidth;
				var result = rect.top >= 0 && rect.left >= 0 && rect.bottom <= height && rect.right <= width;
				return result;
			}
		});

		return Terrasoft.ProcessMiniEditPageModule;
	});


