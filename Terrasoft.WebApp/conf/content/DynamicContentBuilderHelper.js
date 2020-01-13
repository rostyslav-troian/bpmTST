Terrasoft.configuration.Structures["DynamicContentBuilderHelper"] = {innerHierarchyStack: ["DynamicContentBuilderHelper"]};
define("DynamicContentBuilderHelper", ["ContentBuilderHelper", "DynamicContentBlockViewModel",
	"DynamicContentMjBlockViewModel", "DynamicContentBlockGroupViewModel"], function() {

	/**
	 * @class Terrasoft.ContentExporters.DynamicContentBuilderHelper
	 */
	Ext.define("Terrasoft.ContentExporters.DynamicContentBuilderHelper", {
		extend: "Terrasoft.ContentBuilderHelper",
		alternateClassName: "Terrasoft.DynamicContentBuilderHelper",

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#blockGroupVmName
		 * @override
		 */
		blockGroupVmName: "Terrasoft.DynamicContentBlockGroupViewModel",

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#blockElementVmName
		 * @override
		 */
		blockElementVmName: "Terrasoft.DynamicContentBlockViewModel",

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#mjBlockElementVmName
		 * @override
		 */
		mjBlockElementVmName: "Terrasoft.DynamicContentMjBlockViewModel",

		/**
		 * List of parameters used in dynamic content for sheet.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		sheetElementDCProperties: ["Attributes"],

		/**
		 * List of parameters used in dynamic content for group of blocks.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		blockGroupDCProperties: ["Index"],

		/**
		 * List of parameters used in dynamic content for block.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		blockElementDCProperties: ["Index", "IsDefault", "Priority", "Caption", "Attributes"],

		/**
		 * Checks whether content block dynamic or not.
		 */
		_isDynamicBlock: function(blockConfig) {
			return blockConfig.Priority
				&& (blockConfig.IsDefault || (blockConfig.Attributes && blockConfig.Attributes.length > 0));
		},

		/**
		 * Initializes properties of content builder elements.
		 */
		initElementProperties: function() {
			this.sheetElementProperties = this.sheetElementProperties.concat(this.sheetElementDCProperties);
			this.blockGroupProperties = this.blockGroupProperties.concat(this.blockGroupDCProperties);
			this.blockElementProperties = this.blockElementProperties.concat(this.blockElementDCProperties);
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initElementProperties();
		},

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#blockToViewModel
		 * @override
		 */
		blockToViewModel: function(config) {
			if (!this._isDynamicBlock(config)) {
				config.Caption = null;
			}
			var viewModel = this.callParent(arguments);
			return viewModel;
		},

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#mjBlockToViewModel
		 * @override
		 */
		mjBlockToViewModel: function(config) {
			if (!this._isDynamicBlock(config)) {
				config.Caption = null;
			}
			var viewModel = this.callParent(arguments);
			return viewModel;
		},

		/**
		 * @inheritdoc Terrasoft.ContentBuilderHelper#blockGroupToViewModel
		 * @override
		 */
		blockGroupToViewModel: function(config) {
			var viewModel = this.callParent(arguments);
			var items = viewModel.$Items;
			var blocks = items.getItems();
			var minPriority = blocks.reduce(function(min, block) {
				return block.$Priority < min ? block.$Priority : min;
			}, blocks[0].$Priority);
			Terrasoft.each(items, function(block) {
				block.set("IsActive", !Ext.isEmpty(block.$Priority) && block.$Priority === minPriority);
			}, this);
			return viewModel;
		}
	});
});


