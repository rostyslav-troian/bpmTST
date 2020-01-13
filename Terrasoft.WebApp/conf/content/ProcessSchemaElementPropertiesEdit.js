﻿Terrasoft.configuration.Structures["ProcessSchemaElementPropertiesEdit"] = {innerHierarchyStack: ["ProcessSchemaElementPropertiesEdit"], structureParent: "ConfigurationModuleV2"};
define("ProcessSchemaElementPropertiesEdit", ["ConfigurationModuleV2", "css!CommonCSSV2", "ProcessModuleUtilities",
		"css!ProcessSchemaElementPropertiesEditCSS"],
	function() {

		/**
		 * @class Terrasoft.ProcessDesigner.ProcessSchemaElementPropertiesEdit
		 * Class properties editing card module.
		 */
		Ext.define("Terrasoft.ProcessDesigner.ProcessSchemaElementPropertiesEdit", {
			alternateClassName: "Terrasoft.ProcessSchemaElementPropertiesEdit",
			extend: "Terrasoft.ConfigurationModule",

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#isSchemaConfigInitialized
			 * @overridden
			 */
			isSchemaConfigInitialized: true,

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#useHistoryState
			 * @overridden
			 */
			useHistoryState: false,

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#autoGeneratedContainerSuffix
			 * @overridden
			 */
			autoGeneratedContainerSuffix: "-prSchElPropCt",

			/**
			 * Edit element tag.
			 * @private
			 */
			tag: null,

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
				var sandbox = this.sandbox;
				sandbox.registerMessages({
					"ReRenderPropertiesPage": {
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
						mode: Terrasoft.MessageMode.PTP
					}
				});
				sandbox.subscribe("ReRenderPropertiesPage", this.onReRenderPropertiesPage, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseModule#getViewModelConfig
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
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#getViewModelConfig
			 * @overridden
			 */
			getViewModelConfig: function() {
				var viewModelConfig = this.callParent(arguments);
				viewModelConfig.tag = this.tag;
				return viewModelConfig;
			},

			/**
			 * Performs rendering the page properties of the elements.
			 * @param {String} renderToId Link to the container in which to display the view.
			 */
			onReRenderPropertiesPage: function(renderToId) {
				var el = Ext.get(renderToId);
				this.render(el);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaModule#render
			 * @overridden
			 */
			render: function() {
				this.callParent(arguments);
				this.hideLoadingMask();
			}
		});

		return Terrasoft.ProcessSchemaElementPropertiesEdit;
	});


