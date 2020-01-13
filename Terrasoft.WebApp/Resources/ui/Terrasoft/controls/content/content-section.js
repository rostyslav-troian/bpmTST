/**
 * Class of content builder block section.
 */
Ext.define("Terrasoft.controls.ContentSection", {
	extend: "Terrasoft.controls.AbstractContainer",
	alternateClassName: "Terrasoft.ContentSection",

	mixins: {
		contentBlock: "Terrasoft.mixins.ContentBlockMixin",
		selectable: "Terrasoft.mixins.SelectableContentBlock"
	},

	/**
	 * Content block name.
	 * @protected
	 * @type {String}
	 */
	itemName: "content-section",

	/**
	 * Flag to apply reverse order for inner items.
	 * @type {Boolean}
	 */
	reverseColumnOrder: null,

	/**
	 * Class name for reverse order.
	 * @type {String}
	 */
	reverseOrderClass: "section-reverse-order",

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		wrapClassName: ["content-section-wrap"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-section" class="{wrapClassName}" style="{wrapStyle}">` +
			`{%this.renderItems(out, values)%}` +
		`</div>`
	],

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		this.applyTplClasses(tplData);
		this.addSelectedClass(tplData);
		this.addReverseOrderClass(tplData);
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getItemConfig
	 * @override
	 */
	getItemConfig: function(itemModel) {
		var itemConfig = itemModel.getViewConfig();
		Ext.apply(itemConfig, this.mixins.contentBlock.getItemConfig.call(this, itemModel));
		itemConfig.tools = itemModel.getToolsConfig();
		return itemConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = {
			wrapEl: "#" + this.id + "-" + this.itemName
		};
		return selectors;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		return this.mixins.contentBlock.prepareBlockItems.call(this, items);
	},

	/**
	 * Handler on reverse order state change event.
	 * @protected
	 * @param {Boolean} reverseOrder New value of reverse state.
	 */
	setReverseOrder: function(reverseOrder) {
		if (this.reverseColumnOrder === reverseOrder) {
			return;
		}
		this.reverseColumnOrder = reverseOrder;
		var reverseOrderClass = this.reverseOrderClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl && reverseOrderClass && this.rendered) {
			if (reverseOrder) {
				wrapEl.addCls(reverseOrderClass);
			} else {
				wrapEl.removeCls(reverseOrderClass);
			}
		}
	},

	/**
	 * Adds css class for wrap element to apply reverse order.
	 * @protected
	 * @param {Object} tplData Data to render template.
	 */
	addReverseOrderClass: function(tplData) {
		if (this.reverseColumnOrder) {
			tplData.wrapClassName.push(this.reverseOrderClass);
		}
	},

	/**
	 * Handler of collection 'remove' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onDeleteItem: function(itemModel) {
		this.mixins.contentBlock.onDeleteItem.apply(this, [itemModel]);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onAddItem: function(itemModel, index, id) {
		var items = this.prepareItems([itemModel]);
		this.items.insert(index, id, items[0]);
	},

	/**
	 * Handler of collection 'clear' event.
	 * @protected
	 */
	clearItems: function() {
		this.mixins.contentBlock.clearItems.apply(this);
	},

	/**
	 * Handler of collection 'dataLoaded' event.
	 * @protected
	 * @param {Terrasoft.Collection} collection Collection.
	 */
	onCollectionDataLoaded: function(collection) {
		this.mixins.contentBlock.onCollectionDataLoaded.apply(this, [collection]);
	},

	/**
	 * Handler of collection 'itemChanged' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Changing element.
	 * @param {Object} config Event options.
	 */
	onUpdateItem: function(itemModel, config) {
		this.mixins.contentBlock.onUpdateItem.apply(this, [itemModel, config]);
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

	/**
	 * Applies section bind config to component bind config.
	 * @protected
	 * @param {Object} bindConfig Component bind config.
	 */
	applySectionBindConfig: function(bindConfig) {
		Ext.apply(bindConfig, {
			reverseColumnOrder: {
				changeEvent: "changed",
				changeMethod: "setReverseOrder"
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		this.applySelectedBindConfig(bindConfig);
		this.applySectionBindConfig(bindConfig);
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.mixins.bindable.bind.apply(this, arguments);
	}
});
