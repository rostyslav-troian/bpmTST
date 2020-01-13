Terrasoft.configuration.Structures["ContentBuilderHelper"] = {innerHierarchyStack: ["ContentBuilderHelper"]};
define("ContentBuilderHelper", [
	"ContentBuilderEnumsModule",
	"ContentBlockViewModel",
	"ContentBlockGroupViewModel",
	"ContentTextElementViewModel",
	"ContentHTMLElementViewModel",
	"ContentImageElementViewModel",
	"ContentSeparatorElementViewModel",
	"ContentButtonElementViewModel"
], function(ContentBuilderEnums) {

	/**
	 * @class Terrasoft.ContentExporters.ContentBuilderHelper
	 * ##### ############## ################ ######### ########.
	 */
	Ext.define("Terrasoft.ContentExporters.ContentBuilderHelper", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ContentBuilderHelper",

		//region Properties: Protected

		isMjmlConfig: false,

		/**
		 * ###### ########## ### ######### ######.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		sheetElementProperties: ["ItemType", "Caption", "Items", "Width", "BackgroundColor", "SheetAlign", "BreakpointWidth"],

		/**
		 * List of parameters for group of blocks.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		blockGroupProperties: ["ItemType", "Items", "Styles"],

		/**
		 * Name of the block group view model.
		 * @protected
		 * @virtual
		 * @type {String}
		 */
		blockGroupVmName: "Terrasoft.ContentBlockGroupViewModel",

		/**
		 * List of parameters for block.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		blockElementProperties: ["ItemType", "Items", "Styles", "BackgroundImage", "Valign", "ReverseColumnOrder"],

		/**
		 * Name of the block view model.
		 * @protected
		 * @virtual
		 * @type {String}
		 */
		blockElementVmName: "Terrasoft.ContentBlockViewModel",

		/**
		 * ###### ########## ### ######### ###########.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		imageElementProperties: ["ItemType", "Column", "Row", "ColSpan", "RowSpan", "GroupName", "Link", "ImageConfig",
			"MobileImageConfig", "Styles", "ImageTitle", "Alt", "Align", "Width", "Height", "BackgroundImage"],

		/**
		 * ###### ########## ### ######### ######.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		textElementProperties: ["ItemType", "Column", "Row", "ColSpan", "RowSpan", "GroupName", "Content", "Styles",
			"LineHeight", "Align", "BackgroundImage"],

		/**
		 * ###### ########## ### ######### html ########.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		htmlElementProperties: ["ItemType", "Column", "Row", "ColSpan", "RowSpan", "GroupName", "Content", "Styles",
			"BackgroundImage"],

		/**
		 * List of content separator element properties.
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		separatorElementProperties: ["ItemType", "Column", "Row", "ColSpan", "RowSpan", "Styles", "Thickness", "Color",
			"Style", "BackgroundImage", "GroupName"],

		/**
		 * @protected
		 * @virtual
		 * @type {String[]}
		 */
		buttonElementProperties: [
			"ItemType",
			"Column",
			"Row",
			"ColSpan",
			"RowSpan",
			"GroupName",
			"Link",
			"ImageConfig",
			"Styles",
			"Alt",
			"Align",
			"HtmlText",
			"PlainText",
			"Type",
			"BackgroundImage",
			"Padding",
			"Target"
		],

		/**
		 * Sandbox.
		 * @protected
		 * @virtual
		 * @type {Object}
		 */
		sandbox: null,

		//endregion

		//region Methods: Protected

		/**
		 * ####### ###### ## ############# ########## ######### #######.
		 * @protected
		 * @virtual
		 * @param {Object} object ######## ######.
		 * @param {Object} config ############ ########.
		 * @param {String[]} config.expectedParameters ###### ########## ##########.
		 * @return {Object} ######, ######### ## ############# ########## ######### #######.
		 */
		sliceObject: function(object, config) {
			const expectedParameters = config.expectedParameters;
			const result = {};
			Terrasoft.each(expectedParameters, function(parameterName) {
				result[parameterName] = object[parameterName];
			}, this);
			return result;
		},

		/**
		 * ####### ###### ## ############# ########## ######## ######.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseModel} viewModel ######## ######.
		 * @param {Object} config ############ ########.
		 * @param {String[]} config.expectedParameters ###### ########## ##########.
		 * @return {Object} ######, ######### ## ############# ########## ######## ######.
		 */
		sliceViewModel: function(viewModel, config) {
			const expectedParameters = config.expectedParameters;
			const result = {};
			Terrasoft.each(expectedParameters, function(parameterName) {
				result[parameterName] = viewModel.get(parameterName);
			}, this);
			return result;
		},

		/**
		 * ####### ###### ########## ###### ### ######.
		 * @protected
		 * @virtual
		 * @param {Object} config ######### ######.
		 * @return {Object} ###### ##########.
		 */
		sheetToViewModel: function(config) {
			var itemsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
			var items = config.Items;
			if (!Ext.isEmpty(items)) {
				Terrasoft.each(items, function(item) {
					var exportedItem = this.itemToViewModel(item);
					var itemId = exportedItem.get("Id");
					itemsCollection.add(itemId, exportedItem);
				}, this);
			}
			config.Items = itemsCollection;
			config = this.sliceObject(config, {expectedParameters: this.sheetElementProperties});
			config.Id = Terrasoft.generateGUID();
			return config;
		},

		/**
		 * Creates view model of block group.
		 * @protected
		 * @virtual
		 * @param {Object} config Block group configuration.
		 * @return {Terrasoft.BaseViewModel} Block group view model.
		 */
		blockGroupToViewModel: function(config) {
			var groupId = Terrasoft.generateGUID();
			var itemsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
			var items = config.Items;
			if (Ext.isEmpty(items)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			Terrasoft.each(items, function(item) {
				var block = this.itemToViewModel(item);
				block.$GroupId = groupId;
				var itemId = block.$Id;
				itemsCollection.add(itemId, block);
			}, this);
			config.Items = itemsCollection;
			config = this.sliceObject(config, {expectedParameters: this.blockGroupProperties});
			config.Id = groupId;
			return Ext.create(this.blockGroupVmName, {values: config}, true);
		},

		/**
		 * ####### ###### ############# ##### ########.
		 * @protected
		 * @virtual
		 * @param {Object} config ######### ##### ########.
		 * @return {Terrasoft.BaseViewModel} ###### ############# ##### ########.
		 */
		blockToViewModel: function(config) {
			var itemsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
			var items = config.Items;
			if (Ext.isEmpty(items)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			Terrasoft.each(items, function(item) {
				var exportedItem = this.itemToViewModel(item);
				var itemId = exportedItem.get("Id");
				itemsCollection.add(itemId, exportedItem);
			}, this);
			config.Items = itemsCollection;
			config = this.sliceObject(config, {expectedParameters: this.blockElementProperties});
			config.Styles = config.Styles || {};
			config.Id = Terrasoft.generateGUID();
			return Ext.create(this.blockElementVmName, {values: config}, true);
		},

		/**
		 * ####### ###### ############# ######## #####.
		 * @protected
		 * @virtual
		 * @param {Object} config ######### ######## #####.
		 * @return {Terrasoft.BaseViewModel} ###### ############# ######## #####.
		 */
		textToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.textElementProperties});
			config.Styles = config.Styles || {};
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ContentTextElementViewModel", {values: config}, true);
		},

		/**
		 * Creates view model from html markup.
		 * @protected
		 * @virtual
		 * @param {Object} config HTML markup configuration object.
		 * @return {Terrasoft.BaseViewModel} HTML markup view model.
		 */
		htmlToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.htmlElementProperties});
			config.Styles = config.Styles || {};
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ContentHTMLElementViewModel", {
				values: config,
				sandbox: this.sandbox
			}, true);
		},

		/**
		 * Creates a view model of the button element.
		 * @protected
		 * @virtual
		 * @param {Object} config Button config.
		 * @return {Terrasoft.BaseViewModel}.
		 */
		buttonToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.buttonElementProperties});
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ContentButtonElementViewModel", {values: config}, true);
		},

		/**
		 * Creates a model representation of the image element.
		 * @protected
		 * @virtual
		 * @param {Object} config configuration of the image element.
		 * @return {Terrasoft.BaseViewModel} Model representation of the image element.
		 */
		imageToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.imageElementProperties});
			config.Styles = config.Styles || {};
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ContentImageElementViewModel", {values: config}, true);
		},

		/**
		 * Creates content separator view model.
		 * @param {Object} config View model config.
		 * @return {Terrasoft.ContentSeparatorElementViewModel}
		 */
		separatorToViewModel: function(config) {
			config = this.sliceObject(config, {expectedParameters: this.separatorElementProperties});
			config.Styles = config.Styles || {};
			config.Id = Terrasoft.generateGUID();
			return Ext.create("Terrasoft.ContentSeparatorElementViewModel", {values: config}, true);
		},

		/**
		 * ####### ###### ############# ######## ########.
		 * @protected
		 * @virtual
		 * @param {Object} config ######### ######## ########.
		 * @return {Terrasoft.BaseViewModel|Object} ###### ############# ######## ########.
		 */
		itemToViewModel: function(config) {
			var result = {};
			var itemType = config.ItemType;
			if (Ext.isEmpty(itemType)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			switch (itemType) {
				case "sheet":
					result = this.sheetToViewModel(config);
					break;
				case "blockgroup":
					result = this.blockGroupToViewModel(config);
					break;
				case "block":
					result = this.blockToViewModel(config);
					break;
				case "mjblock":
					result = this.mjBlockToViewModel(config);
					break;
				case "text":
					result = this.textToViewModel(config);
					break;
				case "html":
					result = this.htmlToViewModel(config);
					break;
				case "image":
					result = this.imageToViewModel(config);
					break;
				case "separator":
					result = this.separatorToViewModel(config);
					break;
				case "button":
					result = this.buttonToViewModel(config);
					break;
				default:
					throw Ext.create("Terrasoft.NotImplementedException");
			}
			return result;
		},

		/**
		 * ####### ###### ########## ## ###### ######.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### ######.
		 * @return {Object} ###### ##########.
		 */
		sheetToJSON: function(viewModel) {
			var result = this.sliceViewModel(viewModel, {expectedParameters: this.sheetElementProperties});
			var items = result.Items;
			var itemsCollection = [];
			if (Ext.isEmpty(items)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			items.each(function(item) {
				var importedItem = this.itemToJSON(item);
				itemsCollection.push(importedItem);
			}, this);
			result.Items = itemsCollection;
			return result;
		},

		/**
		 * Creates block group config from view model.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel Block group view model.
		 * @return {Object} Block group config.
		 */
		blockGroupToJSON: function(viewModel) {
			var result = this.sliceViewModel(viewModel, {expectedParameters: this.blockGroupProperties});
			var items = result.Items;
			var itemsCollection = [];
			if (Ext.isEmpty(items)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			items.each(function(item) {
				var importedItem = this.itemToJSON(item);
				itemsCollection.push(importedItem);
			}, this);
			result.Items = itemsCollection;
			return result;
		},

		/**
		 * ####### ###### ########## ## ###### #####.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### #####.
		 * @return {Object} ###### ##########.
		 */
		blockToJSON: function(viewModel) {
			var result = this.sliceViewModel(viewModel, {expectedParameters: this.blockElementProperties});
			var items = result.Items;
			var itemsCollection = [];
			if (Ext.isEmpty(items)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			items.each(function(item) {
				var importedItem = this.itemToJSON(item);
				itemsCollection.push(importedItem);
			}, this);
			result.Items = itemsCollection;
			return result;
		},

		/**
		 * ####### ###### ########## ## ###### ########## ########.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### ########## ########.
		 * @return {Object} ###### ##########.
		 */
		textToJSON: function(viewModel) {
			return this.sliceViewModel(viewModel, {expectedParameters: this.textElementProperties});
		},

		/**
		 * ####### ###### ########## ## ###### html ########.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### html ########.
		 * @return {Object} ###### ##########.
		 */
		htmlToJSON: function(viewModel) {
			return this.sliceViewModel(viewModel, {expectedParameters: this.htmlElementProperties});
		},

		/**
		 * ####### ###### ########## ## ###### ######## ###########.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### ######## ############.
		 * @return {Object} ###### ##########.
		 */
		imageToJSON: function(viewModel) {
			return this.sliceViewModel(viewModel, {expectedParameters: this.imageElementProperties});
		},

		/**
		 * Creates a settings object from the model element button.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModel} viewModel Button view model.
		 * @return {Object}.
		 */
		buttonToJSON: function(viewModel) {
			return this.sliceViewModel(viewModel, {expectedParameters: this.buttonElementProperties});
		},

		/**
		 * Create config for content separator element.
		 * @param {Terrasoft.ContentSeparatorElementViewModel} viewModel Separator view model.
		 * @return {Object} Element config.
		 */
		separatorToJSON: function(viewModel) {
			return this.sliceViewModel(viewModel, {expectedParameters: this.separatorElementProperties});
		},

		/**
		 * ####### ###### ########## ## ###### ########.
		 * @protected
		 * @virtual
		 * @param {Object} viewModel ###### ########.
		 * @return {Object} ###### ##########.
		 */
		itemToJSON: function(viewModel) {
			var result = {};
			var itemType = viewModel.get("ItemType");
			if (Ext.isEmpty(itemType)) {
				throw Ext.create("Terrasoft.NullOrEmptyException");
			}
			if (this.isMjmlConfig && typeof viewModel.serializeViewModel === "function") {
				return viewModel.serializeViewModel();
			}
			switch (itemType) {
				case "sheet":
					result = this.sheetToJSON(viewModel);
					break;
				case "blockgroup":
					result = this.blockGroupToJSON(viewModel);
					break;
				case "block":
					result = this.blockToJSON(viewModel);
					break;
				case "text":
					result = this.textToJSON(viewModel);
					break;
				case "html":
					result = this.htmlToJSON(viewModel);
					break;
				case "image":
					result = this.imageToJSON(viewModel);
					break;
				case "separator":
					result = this.separatorToJSON(viewModel);
					break;
				case "button":
					result = this.buttonToJSON(viewModel);
					break;
				default:
					throw Ext.create("Terrasoft.NotImplementedException");
			}
			return result;
		},

		//endregion

		//region Methods: Public

		/**
		 * ########### ############ ####### ######## # ### ###### #############.
		 * @virtual
		 * @param {Object} config #o########## ######## ########.
		 * @return {Terrasoft.BaseViewModel|Object} ###### ############# ########.
		 */
		toViewModel: function(config) {
			config = Terrasoft.deepClone(config);
			return this.itemToViewModel(config);
		},

		/**
		 * ########### ###### ############# ####### ######## # ### ############.
		 * @virtual
		 * @param {Terrasoft.BaseModel} viewModel ###### ############# ########.
		 * @return {Object} #o########## ######## ########.
		 */
		toJSON: function(viewModel) {
			return this.itemToJSON(viewModel);
		},

		/**
		 * Shows content builder designer in new window
		 * @param {String} recordId EmailTemplate record identifier.
		 */
		show: function(recordId) {
			var mode = ContentBuilderEnums.ContentBuilderMode.EMAILTEMPLATE;
			var url = ContentBuilderEnums.getContentBuilderUrl(mode, recordId);
			window.open(url);
		}

		//endregion

	});
});


