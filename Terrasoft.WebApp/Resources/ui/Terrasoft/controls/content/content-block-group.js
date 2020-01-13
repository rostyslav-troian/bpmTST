/**
 * Class of content builder group of blocks.
 */
Ext.define("Terrasoft.controls.ContentBlockGroup", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.ContentBlockGroup",

	mixins: {
		draggable: "Terrasoft.mixins.DraggableContentBlock",
		selectable: "Terrasoft.mixins.SelectableContentBlock",
		contentBlock: "Terrasoft.mixins.ContentBlockMixin"
	},

	//region Properties: Protected

	itemName: "content-block-group",

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		wrapClassName: ["content-block-group-wrap"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		"<div id=\"{id}-content-block-group\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
			"{%this.renderItems(out, values)%}",
			"<tpl if=\"hasTools\">",
				"<div id=\"{id}-content-block-tools\" class=\"{toolsWrapClasses}\">",
					"<tpl for=\"tools\">",
						"{%this.renderTool(out, values)%}",
					"</tpl>",
				"</div>",
			"</tpl>",
		"</div>"
	],

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initTools();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initRenderData
	 * @override
	 */
	initRenderData: function(renderData) {
		this.callParent(arguments);
		this.addToolsToRenderData(renderData);
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		this.applyToolsSelector(this.selectors);
		this.applyTplClasses(tplData);
		this.applyToolsTplData(tplData);
		this.addSelectedClass(tplData);
		return tplData;
	},

	/**
	 * Initialize DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.mixins.selectable.subscribeForDomEvents.apply(this);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getRenderToEl
	 * @override
	 */
	getRenderToEl: function(item) {
		if (this.tools.indexOf(item) !== -1) {
			return this.toolsEl;
		}
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		return this.mixins.contentBlock.prepareBlockItems.call(this, items);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onItemAdd: function() {
		this.callParent(arguments);
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		var collection = model.get(binding.modelItem);
		this.subscribeCollection(collection);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (model) {
			var collection = model.get(binding.modelItem);
			this.unSubscribeCollection(collection);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.mixins.draggable.addDraggableEvents.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		this.applySelectedBindConfig(bindConfig);
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#indexOf
	 * @override
	 */
	indexOf: function(item) {
		var itemIndex = this.callParent(arguments);
		if (itemIndex === -1) {
			itemIndex = this.indexOfToolItem(item);
		}
		return itemIndex;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.mixins.bindable.bind.apply(this, arguments);
		this.mixins.selectable.bindTools.apply(this);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.selectable.destroyTools.apply(this);
		this.mixins.draggable.onDestroy.apply(this, arguments);
		this.removeDropZone();
		this.callParent(arguments);
	}

	//endregion

});
