/**
 * Class of content builder section column.
 */
Ext.define("Terrasoft.controls.ContentColumn", {
	extend: "Terrasoft.controls.ReorderableContainer",
	alternateClassName: "Terrasoft.ContentColumn",

	mixins: {
		contentBlock: "Terrasoft.mixins.ContentBlockMixin",
		selectable: "Terrasoft.mixins.SelectableContentBlock"
	},

	/**
	 * Content block name.
	 * @protected
	 * @type {String}
	 */
	itemName: "content-column",

	/**
	 * @inheritdoc Terrasoft.Reorderable#reorderableElTpl
	 * @override
	 */
	reorderableElTpl: "<div id=\"{0}\" class=\"{1}\"><div class=\"reorderable-arrow\"></div></div>",

	/**
	 * Template classes.
	 * @protected
	 * @type {Object}
	 */
	tplConfigClasses: {
		contentColumnWrap: ["content-column-wrap"],
		contentColumnPlaceholder: ["content-column-placeholder"],
		contentColumnPlaceholderWrap: ["content-column-placeholder-wrap"]
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		`<div id="{id}-content-column" class="{contentColumnWrap}" style="{wrapStyle}">
			<div class="content-column-element">
			<div id="{id}-inner-container" class="{innerContainerClassName}" style="{columnStyle}">` +
				`{%this.renderItems(out, values)%}` +
			`</div>
			</div>
			<div id="{id}-content-column-placeholder-wrap" class="{contentColumnPlaceholderWrap}">
				<div id="{id}" class="{contentColumnPlaceholder}">
					<span class="placeholder-image"></span>
					<br>
					<span>{placeholder}</span>
				</div>
			</div>
		</div>`
	],

	/**
	 * The text that will be displayed in the absence of elements.
	 * @protected
	 * @type {String}
	 */
	placeholder: null,

	/**
	 * Width style of current column (%).
	 * @protected
	 * @type {Number}
	 */
	width: null,

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents("elementSelectedChange");
	},

	/**
	 * Initialize DOM events.
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		this.subscribeItemsEvents();
	},

	/**
	 * Applies width style property to component styles.
	 * @protected
	 */
	applyColumnWidth: function() {
		this.styles.wrapStyle = Ext.apply(this.styles.wrapStyle || {}, {
			"width": this.width + "%"
		});
	},

	/**
	 * Applies selected config to component bind config.
	 * @protected
	 * @param {Object} bindConfig Component bind config.
	 */
	applyWidthBindConfig: function(bindConfig) {
		Ext.apply(bindConfig, {
			width: {
				changeEvent: "changed",
				changeMethod: "setWidth"
			}
		});
	},

	/**
	 * Sets width property to component.
	 * @protected
	 * @param {Number} width Column width (%).
	 */
	setWidth: function(width) {
		this.width = width;
		this.safeRerender();
	},

	/**
	 * Sets inline styles to column.
	 * @param {Object} styles Style attributes.
	 */
	setColumnStyle: function(styles) {
		if (Ext.isObject(styles)) {
			this.styles = Ext.apply(this.styles || {}, {
				columnStyle: styles
			});
			this.safeRerender();
		}
	},

	/**
	 * Adds selected class to component classes.
	 * @protected
	 * @param {Object} tplData Object of rendering template settings.
	 */
	addSelectedClass: function(tplData) {
		if (this.selected) {
			tplData.contentColumnWrap.push(this.selectedClass);
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		this.applyTplClasses(tplData);
		this.addSelectedClass(tplData);
		if (!this.items || this.items.getCount() === 0) {
			tplData.contentColumnPlaceholderWrap.push("visible");
		}
		tplData.placeholder = this.placeholder;
		this.applyColumnWidth();
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getSelectors
	 * @override
	 */
	getSelectors: function() {
		var selectors = {};
		Ext.apply(selectors, {
			wrapEl: Ext.String.format("#{0}-{1}", this.id, this.itemName),
			innerContainerEl: Ext.String.format("#{0}-inner-container", this.id),
			placeholderEl: Ext.String.format("#{0}-{1}-placeholder-wrap", this.id, this.itemName)
		});
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
	 * @inheritdoc Terrasoft.ReorderableContainer#getItemConfig
	 * @override
	 */
	getItemConfig: function(itemModel) {
		var itemConfig = this.callParent(arguments);
		Ext.apply(itemConfig, this.mixins.contentBlock.getItemConfig.call(this, itemModel));
		itemConfig.tools = itemModel.getToolsConfig();
		itemConfig.columnId = this.id;
		return itemConfig;
	},

	/**
	 * Sets placeholders visibility.
	 * @param {Boolean} visible Visibility value.
	 */
	setPlaceholderVisible: function(visible) {
		var placeholderEl = this.placeholderEl;
		if (placeholderEl) {
			if (visible) {
				this.placeholderEl.addCls("visible");
			} else {
				this.placeholderEl.removeCls("visible");
			}
		}
	},

	/**
	 * The event handler changes the collection of sheet elements.
	 * @protected
	 */
	onItemsChange: function() {
		this.setPlaceholderVisible(!this.items || this.items.getCount() === 0);
	},

	/**
	 * Handler of collection 'add' event.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} itemModel Collection element.
	 */
	onAddItem: function(itemModel, index) {
		this.insert(itemModel, index);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemAdd
	 * @override
	 */
	onItemAdd: function(index, item) {
		this.callParent(arguments);
		item.on("selectedChanged", this.onSelectedChanged, this);
		this.onItemsChange();
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#onItemRemove
	 * @override
	 */
	onItemRemove: function(item, key) {
		item.removed(this);
		this.unSubscribeItemMappedEvents(item);
		this.onItemsChange();
	},

	/**
	 * Handles child element select.
	 * @protected
	 */
	onSelectedChanged: function(selected, item) {
		if (selected) {
			this.fireEvent("elementSelectedChange", item.id);
		}
	},

	/**
	 * Subscribes for child items events.
	 * @protected
	 */
	subscribeItemsEvents: function() {
		this.items.each(function(item) {
			item.on("selectedChanged", this.onSelectedChanged, this);
		}, this);
	},

	/**
	 * Unsubscribes from child items events.
	 * @protected
	 */
	unSubscribeItemsEvents: function() {
		this.items.each(function(item) {
			item.un("selectedChanged", this.onSelectedChanged, this);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		if (model && property === "items") {
			var collection = model.get(binding.modelItem);
			this.mixins.contentBlock.subscribeCollection.call(this, collection);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (model && property === "items") {
			var collection = model.get(binding.modelItem);
			this.mixins.contentBlock.unSubscribeCollection.call(this, collection);
		}
	},

	/**
	 * Sets the placeholder value for the control.
	 * @param {String} placeholder The text that is displayed when the input field is empty.
	 */
	setPlaceholder: function(placeholder) {
		if (this.placeholder !== placeholder) {
			this.placeholder = placeholder;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		this.applyBlockBindConfig(bindConfig);
		this.applySelectedBindConfig(bindConfig);
		this.applyWidthBindConfig(bindConfig);
		Ext.apply(bindConfig, {
			columnStyle: {
				changeEvent: "changed",
				changeMethod: "setColumnStyle"
			},
			placeholder: {
				changeMethod: "setPlaceholder"
			}
		});
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#bind
	 * @override
	 */
	bind: function() {
		this.mixins.bindable.bind.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Droppable#getDropZoneInitDefaultConfig
	 * @override
	 */
	getDropZoneInitDefaultConfig: function() {
		return {
			columnId: this.id,
			itemType: "column"
		};
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#createZeroElement
	 * @override
	 */
	createZeroElement: function() {
		this.mixins.reorderable.createZeroElement.apply(this, arguments);
		var zeroElementId = this.getZeroElementId();
		var zeroElement = Ext.get(zeroElementId);
		zeroElement.initDDTarget(this.getGroupName(), {
			columnId: this.id,
			itemType: "element",
			id: this.id,
			isZero: true
		}, {});
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Droppable#clearDropZones
	 * @override
	 */
	clearDropZones: function() {
		const self = this;
		var ddIds = Ext.dd.DragDropManager.ids;
		var groupName = this.getGroupName();
		var groupElements = Ext.dd.DragDropManager.ids[groupName];
		var componentDropZoneIds = [];
		Ext.Object.each(groupElements, function(property, value){
			if (value.config.columnId === self.id) {
				componentDropZoneIds.push(property);
			}
		});
		Terrasoft.each(componentDropZoneIds, function(dropZoneId) {
			delete ddIds[groupName][dropZoneId];
			var group = ddIds[dropZoneId];
			group && delete ddIds[dropZoneId];
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#insertZeroElement
	 * @override
	 */
	insertZeroElement: function(where, zeroElementHtml) {
		this.innerContainerEl.insertHtml(where, zeroElementHtml);
	},

	/**
	 * @inheritdoc Terrasoft.controls.ReorderableContainer#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		if (!this.isVisible()) {
			this.clearDropZones();
			this.mixins.droppable.initDropZones.apply(this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.unSubscribeItemsEvents();
		this.callParent(arguments);
	}
});
