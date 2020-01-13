/**
 */
Ext.define("Terrasoft.mixins.ToolsMixin", {
	alternateClassName: "Terrasoft.ToolsMixin",
	extend: "Terrasoft.BaseObject",

	/**
	 * Template rendering tool.
	 * @protected
	 * @type {String}
	 */
	toolRenderTplName: "<@tool>",

	/**
	 * Toolbar items collection.
	 * @protected
	 * @type {Ext.util.MixedCollection}
	 */
	tools: null,

	/**
	 * Initialize tools
	 * @protected
	 */
	init: function() {
		if (!(this instanceof Terrasoft.AbstractContainer)) {
			throw new Terrasoft.exceptions.UnsupportedTypeException();
		}
		var tools = this.tools;
		var collection = this.tools = new Ext.util.MixedCollection(false, this.getComponentId);
		collection.on("add", this.onToolAdd, this);
		collection.on("remove", this.onToolRemove, this);
		this.addToolItem(tools);
	},

	/**
	 * Handler of adding item to the collection.
	 * @protected
	 * @param {Number} index Added item index.
	 * @param {Terrasoft.Component} tool Added item.
	 */
	onToolAdd: function(index, tool) {
		tool.added(this);
	},

	/**
	 * Handler of removing tools item.
	 * @protected
	 * @param {Terrasoft.Component} tool Remove item.
	 */
	onToolRemove: function(tool) {
		tool.removed(this);
		this.safeRerender();
	},

	/**
	 * Applies tools selector.
	 * @protected
	 * @param {Object} selectors Selectors.
	 */
	applyToolsElSelector: function(selectors) {
		Ext.apply(selectors, {
			toolsEl: "#" + this.id + "-tools"
		});
	},

	/**
	 * Returns a reference to the DOM-element which items will be displayed.
	 * @protected
	 * @return {Ext.dom.Element}
	 */
	getToolsRenderToEl: function() {
		return this.toolsEl;
	},

	/**
	 * The method performs preprocessing template rendering control.
	 * @protected
	 * @param {String} template Template.
	 * @return {String}
	 */
	processToolItemTemplate: function(template) {
		var toolRegex = new RegExp(this.toolRenderTplName, "gim");
		return template.replace(toolRegex, "{%this.renderTool(out, values, xindex - 1)%}");
	},

	/**
	 * The method prepares the parameter object for rendering control.
	 * @param {Object} renderData Template parameters object.
	 * @protected
	 * @override
	 */
	initRenderData: function(renderData) {
		renderData.tools = this.tools;
		renderData.renderTools = this.renderTools;
		renderData.renderTool = this.renderTool;
	},

	getToolsRenderTemplateTree: function() {
		var toolsTree = [];
		var tools = this.tools;
		if (!tools) {
			return toolsTree;
		}
		for (var i = 0, length = tools.length; i < length; i++) {
			var item = tools.getAt(i);
			var html = item.generateHtml();
			toolsTree.push(html);
		}
		return toolsTree;
	},

	/**
	 * Renders tools.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Object} renderData Template parameters object.
	 */
	renderTools: function(buffer, renderData) {
		var self = renderData.self;
		var toolsTree = self.getToolsRenderTemplateTree();
		Ext.DomHelper.generateMarkup(toolsTree, buffer);
	},

	/**
	 * Generates HTML-markup for input tools element and stores it in a buffer.
	 * @protected
	 * @param {String[]} buffer Recording buffer for HTML.
	 * @param {Terrasoft.Component} item Tools item.
	 */
	renderTool: function(buffer, item) {
		var html = item.generateHtml();
		buffer.push(html);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.destroyTools();
		this.callParent(arguments);
	},

	/**
	 * Destroys tools, unsubscribes from the DOM events, cleans DOM from the elements,
	 * cleans tool collection {@link #tools}.
	 * @protected
	 */
	destroyTools: function() {
		this.destroyItemsCollection(this.tools);
		this.tools = null;
	},

	/**
	 * Bind all the elements of the model
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bind: function(model) {
		this.tools.each(function(item) {
			item.bind(model);
		});
	},

	/**
	 * Adds component or component array to tool panel.
	 * @param {Object|Terrasoft.Component} tool Tool item.
	 */
	addToolItem: function(tool) {
		this.addToCollection(tool, this.tools);
	},

	/**
	 * The method adds the component (array components) in the collection of toolbox items from
	 * a specified position.
	 * @protected
	 * @param {Object|Terrasoft.Component} item Insert item.
	 * @param {Number} index Index.
	 */
	insertToolItem: function(item, index) {
		this.insertIntoCollection(item, index, this.tools);
	},

	/**
	 * Removes item from toolbar items collection.
	 * @param {Object|Terrasoft.Component} item Removing item.
	 */
	removeToolItem: function(item) {
		this.removeFromCollection(item, this.tools);
	},

	/**
	 * Returns item position in tool panel.
	 * @param {Object|Terrasoft.Component} item Tool item.
	 * @return {Number} Tool item position.
	 */
	indexOfToolItem: function(item) {
		return this.indexOfCollection(item, this.tools);
	}

});
