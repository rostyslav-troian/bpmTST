Ext.ns("Terrasoft.exporters.enums");

/** @enum
 * Type of exported item. */
Terrasoft.core.enums.ExportedItemType = {
	/** Canvas */
	SHEET: "sheet",
	/** Block group*/
	BLOCKGROUP: "blockgroup",
	/** Block */
	BLOCK: "block",
	/** Text */
	TEXT: "text",
	/** Picture */
	IMAGE: "image",
	/** HTML */
	HTML: "html",
	/** SEPARATOR **/
	SEPARATOR: "separator",
	/** BUTTON **/
	BUTTON: "button"
};

/**
 * Abbreviation for {@link Terrasoft.core.enums.ExportedItemType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.core.enums.ExportedItemType
 */
Terrasoft.ExportedItemType = Terrasoft.core.enums.ExportedItemType;

/**
 * @abstract
 */
Ext.define("Terrasoft.exporters.BaseContentExporter", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseContentExporter",

	/**
	 * It exports the canvas.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportSheet: Terrasoft.abstractFn,

	/**
	 * Exports the group of blocks.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportBlockGroup: Terrasoft.abstractFn,

	/**
	 * Exports the block.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportBlock: Terrasoft.abstractFn,

	/**
	 * Exports text.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportText: Terrasoft.abstractFn,

	/**
	 * Exports the image.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportImage: Terrasoft.abstractFn,

	/**
	 * Exports the button.
	 * @protected
	 * @abstract
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportButton: Terrasoft.abstractFn,

	/**
	 * Exports html.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportHtml: Terrasoft.abstractFn,

	/**
	 * Exports separator.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @return {*} The converted value.
	 */
	exportSeparator: Terrasoft.abstractFn,

	/**
	 * Returns block if it is single in template and item type equals expected item type.
	 * @protected
	 * @param {Object} source Content configuration.
	 * @param {Terrasoft.ExportedItemType} expectType Expected item type.
	 * @return {Object} Block config.
	 */
	findSingleBlockByType: function(source, expectType) {
		var config = source || {};
		if (expectType && config.ItemType === expectType) {
			return config;
		}
		if (config.Items && config.Items.length === 1) {
			return this.findSingleBlockByType(config.Items[0], expectType);
		}
		return null;
	},

	/**
	 * Returns HTML-block if it is single in template.
	 * @protected
	 * @param {Object} config Content configuration.
	 * @return {Object} HTML-block config.
	 */
	findSingleHtmlBlock: function(config) {
		var htmlBlock = null;
		var blockItem = this.findSingleBlockByType(config, this.ExportedItemType.BLOCK);
		if (blockItem) {
			htmlBlock = this.findSingleBlockByType(blockItem, this.ExportedItemType.HTML);
		}
		return htmlBlock;
	},

	/**
	 * Exports the element, depending on the type.
	 * @protected
	 * @param {Object} config The configuration of the element.
	 * @param {Terrasoft.ExportedItemType} config.ItemType The type of the item being exported.
	 * @return {*} The converted value.
	 */
	exportItem: function(config) {
		var itemType = config.ItemType;
		var result = null;
		switch (itemType) {
			case Terrasoft.ExportedItemType.SHEET:
				result = this.exportSheet(config);
				break;
			case Terrasoft.ExportedItemType.BLOCKGROUP:
				result = this.exportBlockGroup(config);
				break;
			case Terrasoft.ExportedItemType.BLOCK:
				result = this.exportBlock(config);
				break;
			case Terrasoft.ExportedItemType.TEXT:
				result = this.exportText(config);
				break;
			case Terrasoft.ExportedItemType.IMAGE:
				result = this.exportImage(config);
				break;
			case Terrasoft.ExportedItemType.HTML:
				result = this.exportHtml(config);
				break;
			case Terrasoft.ExportedItemType.SEPARATOR:
				result = this.exportSeparator(config);
				break;
			case Terrasoft.ExportedItemType.BUTTON:
				result = this.exportButton(config);
				break;
			default:
				throw Ext.create("Terrasoft.NotImplementedException");
		}
		return result;
	},

	/**
	 * Exports the content configuration to the required type.
	 * @param {Object} config Content configuration.
	 * @param {Terrasoft.ExportedItemType} config.ItemType The type of the item being exported.
	 * @return {*} The converted value.
	 */
	exportData: function(config) {
		var clonnedConfig = Terrasoft.deepClone(config);
		return this.exportItem(clonnedConfig);
	}

});
