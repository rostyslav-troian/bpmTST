Terrasoft.configuration.Structures["TimelineFilterMenu"] = {innerHierarchyStack: ["TimelineFilterMenu"]};
define("TimelineFilterMenu", ["TimelineFilterMenuResources", "css!TimelineFilterMenu"], function(resources) {
	Ext.define("Terrasoft.controls.TimelineFilterMenu", {
		extend: "Terrasoft.Menu",
		alternateClassName: "Terrasoft.TimelineFilterMenu",

		// region Fields: Private

		/**
		 * Apply button.
		 * @private
		 * @type {Terrasoft.Button}
		 */
		_applyButtonControl: null,

		/**
		 * "All" menu item control.
		 * @private
		 * @type {Terrasoft.TimelineFilterMenuItem}
		 */
		_allMenuItemControl: null,

		// endregion

		// region Fields: Public

		/**
		 * Selected items.
		 * @type {Array}
		 */
		selectedItems: [],

		/**
		 * Apply button configuration.
		 * @type {Object}
		 */
		applyButtonConfig: null,

		// endregion

		// region Fields: Protected

		/**
		 * Default CSS class for menu tools.
		 * @type {String}
		 */
		defaultToolsClass: "timeline-filter-menu-tools",

		/**
		 * @inheritdoc Terrasoft.Menu#defaultUlClass
		 * @override
		 */
		defaultUlClass: "timeline-filter-menu menu-wrap menu",

		/**
		 * CSS class for menu tools.
		 * @protected
		 * @type {String}
		 */
		toolsClass: "",

		/**
		 * The default value for linking the 'imageUrl' property to the ViewModel column.
		 * @protected
		 * @type {String}
		 */
		defaultImageUrlName: "ImageUrl",

		/**
		 * The default value for linking the 'checked' property to the ViewModel column.
		 * @protected
		 * @type {String}
		 */
		defaultCheckedName: "Checked",

		/**
		 * The sign display "All" menu button.
		 * @protected
		 * @type {Boolean}
		 */
		useAllMenuItem: true,

		/**
		 * Items column container template.
		 * @protected
		 */
		itemsColumnContainerTemplate: "<div id = '{0}' class = 'items-column-container'>{1}</div>",

		/**
		 * Items list template.
		 * @protected
		 */
		itemsListTemplate: "<ul id = {0} class ='items-column-container-list'>{1}</ul>",

		/**
		 * Max items column length.
		 * @protected
		 */
		maxItemsColumnLength: 7,

		/**
		 * A template for marking the content of the menu.
		 * @type {Array}
		 */
		/*jshint white:false */
		/*jshint quotmark: false*/
		contentTpl: [
			'<ul id="{id}-list" class="{ulClass}" style="{ulStyle}">',
			'<tpl if="isRootMenu">',
			'<input id="{id}-focusEl" class="menu-focus-el">',
			'</tpl>',
			'<tpl if="isMenuLoading && isRootMenu">',
			'<li class="menu-loading">',
			'{%this.renderProgressSpinner(out, values)%}',
			'{loadingCaption}',
			'</li>',
			'<tpl else>',
			'<tpl if="useAllMenuItem">',
			'{%this.renderAllMenuItem(out, values)%}',
			'<li id="{id}-all-menu-separator" class="menu-separator">',
			'<div id="{id}-all-menu-separator-header" class="menu-separator-header menu-separator-no-caption"></div>',
			'</li>',
			'</tpl>',
			'{%this.renderItems(out, values)%}',
			'</tpl>',
			'<li id="{id}-apply-menu-button" class="{toolsClass}">',
			'{%this.renderApplyButton(out, values)%}',
			'</li>',
			'</ul>'
		],
		/*jshint white:true */
		/*jshint white:true */

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Menu#getItemsHtml
		 * @override
		 */
		getItemsHtml: function() {
			var items = this.items;
			var itemsCount = items.getCount();
			var columnsCount = Math.ceil(itemsCount / this.maxItemsColumnLength);
			var minColumnItemsCount = Math.floor(itemsCount / columnsCount);
			var restItemsCount = itemsCount - minColumnItemsCount * columnsCount
			var columnsLengthConfig = Array.apply(null, new Array(columnsCount)).map(function() {
				return minColumnItemsCount;
			});
			var columnIndex = 0;
			for (var j = 0; j < restItemsCount; j++) {
				columnsLengthConfig[columnIndex]++;
				columnIndex = (columnIndex + 1) < columnsCount ? columnIndex + 1 : 0;
			}
			var itemsHtml = [];
			var currentColumnItems = [];
			columnIndex = 0;
			items.each(function(item) {
				var columnLength = columnsLengthConfig[columnIndex];
				var html = item.generateHtml();
				currentColumnItems.push(html);
				if (currentColumnItems.length >= columnLength) {
					var columnItemHtml = Ext.String.format(this.itemsListTemplate,
						Terrasoft.generateGUID(), currentColumnItems.join(""));
					itemsHtml.push(columnItemHtml);
					currentColumnItems = [];
					columnIndex = (columnIndex + 1) < columnsCount ? columnIndex + 1 : 0;
				}
			}, this);
			var columnsContainerHtml = Ext.String.format(this.itemsColumnContainerTemplate,
				Terrasoft.generateGUID(), itemsHtml.join(""));
			return [columnsContainerHtml];
		},

		/**
		 * @inheritdoc Terrasoft.Menu#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			tplData.toolsClass = this.toolsClass ?
				this.defaultToolsClass + " " + this.toolsClass : this.defaultToolsClass;
			tplData.useAllMenuItem = this.useAllMenuItem;
			this.tplData = tplData;
			return tplData;
		},

		/**
		 * @inheritdoc Terrasoft.Menu#hide
		 * @override
		 */
		hide: function() {
			this.callParent(arguments);
			this.items.each(function(item) {
				if (Terrasoft.isInstanceOfClass(item, "Terrasoft.TimelineFilterMenuItem")) {
					var checked = this.selectedItems && Ext.Array.contains(this.selectedItems, item.id);
					item.setChecked(checked);
				}
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.Menu#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var menuBindConfig = {
				selectedItems: {
					changeEvent: "change",
					changeMethod: "onSelectionChange"
				}
			};
			Ext.apply(menuBindConfig, bindConfig);
			return menuBindConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Menu#init
		 * @override
		 */
		init: function() {
			this.createApplyButton();
			if (this.useAllMenuItem) {
				this.createAllMenuItem();
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Menu#renderContent
		 * @override
		 */
		renderContent: function(buffer, renderData) {
			var self = renderData.self;
			var contentTpl = new Ext.XTemplate(self.contentTpl);
			contentTpl.renderItems = self.renderItems;
			contentTpl.renderApplyButton = self.renderApplyButton;
			contentTpl.renderAllMenuItem = self.renderAllMenuItem;
			contentTpl.renderProgressSpinner = self.renderProgressSpinner;
			contentTpl.html = self.processTemplate(self.contentTpl, renderData);
			contentTpl.applyOut(renderData, buffer);
		},

		/**
		 * @inheritdoc Terrasoft.Menu#bind
		 * @override
		 */
		bind: function() {
			this.callParent(arguments);
			this._applyButtonControl.bind(this.model);
			if (this.useAllMenuItem) {
				this._allMenuItemControl.bind(this.model);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Menu#getMenuItemConfig
		 * @override
		 */
		getMenuItemConfig: function(itemModel) {
			var itemId = itemModel.get(this.defaultPrimaryColumnName);
			if (Ext.isEmpty(itemId)) {
				this.log(Terrasoft.Resources.Controls.Menu.MenuPrimaryColumnIsEmpty, Terrasoft.LogMessageType.WARNING);
			}
			var visible = itemModel.get(this.defaultVisibleName);
			var enabled = itemModel.get(this.defaultEnabledName);
			var menuItemConfig = {
				id: itemId,
				caption: itemModel.get(this.defaultCaptionName),
				imageConfig: itemModel.get(this.defaultImageConfigName),
				className: itemModel.get(this.defaultTypeName),
				tag: itemModel.get(this.defaultTagName),
				visible: !Ext.isEmpty(visible) ? visible : true,
				enabled: !Ext.isEmpty(enabled) ? enabled : true,
				markerValue: itemModel.get(this.defaultMarkerValueName),
				direction: itemModel.get(this.defaultDirectionName)
			};
			if (menuItemConfig.className === "Terrasoft.TimelineFilterMenuItem") {
				menuItemConfig.imageUrl = itemModel.get(this.defaultImageUrlName);
				menuItemConfig.checked = itemModel.get(this.defaultCheckedName);
			}
			var clickHandler = itemModel.get(this.defaultClickEventName);
			if (clickHandler) {
				menuItemConfig.handler = clickHandler;
			}
			return menuItemConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Menu#addItem
		 * @override
		 */
		addItem: function() {
			var itemToAdd = this.callParent(arguments);
			this.applySelectedItems();
			this.subscribeItemEvents(itemToAdd);
			this.isMenuLoading = true;
			this.updateAllMenuItemValue();
			this.isMenuLoading = false;
			return itemToAdd;
		},

		/**
		 * Returns default apply button configuration.
		 * @protected
		 * @return {Object} Button config.
		 */
		getDefaultApplyToolButtonConfig: function() {
			return {
				caption: resources.localizableStrings.DefaultApplyButtonCaption,
				style: Terrasoft.controls.ButtonEnums.style.BLUE
			};
		},

		/**
		 * Creates apply button control instance.
		 * @protected
		 */
		createApplyButton: function() {
			var config = this.applyButtonConfig || this.getDefaultApplyToolButtonConfig();
			this._applyButtonControl = Ext.create("Terrasoft.Button", config);
			this._applyButtonControl.added(this);
			this._applyButtonControl.on("click", this.applySelectedItems.bind(this));
		},

		/**
		 * Creates "All" menu item control instance.
		 * @protected
		 */
		createAllMenuItem: function() {
			this._allMenuItemControl = Ext.create("Terrasoft.TimelineFilterMenuItem", {
				id: this.id + "-AllMenuItem",
				caption: resources.localizableStrings.AllEntitiesMenuItemCaption,
				enabled: true,
				parentMenu: this,
				checked: true,
				baseMenuItemClass: "timeline-filter-menu-item timeline-filter-all-menu-item"
			});
			this._allMenuItemControl.added(this);
			this._allMenuItemControl.on("checkedchanged", this.onAllMenuItemChecked.bind(this));
		},

		/**
		 * Handles "All" menu item checked event.
		 * @protected
		 * @param {Boolean} checked Control value.
		 */
		onAllMenuItemChecked: function(checked) {
			if (!this.isMenuLoading) {
				this.isMenuLoading = true;
				this.items.each(function(item) {
					if (Terrasoft.isInstanceOfClass(item, "Terrasoft.TimelineFilterMenuItem")) {
						item.setChecked(checked);
					}
				}, this);
				this.isMenuLoading = false;
			}
		},

		/**
		 * Returns all items selection value.
		 * @protected
		 * @return {Boolean} All items selection value.
		 */
		isAllItemSelected: function() {
			var isAllItemSelected = true;
			this.items.each(function(item) {
				if (Terrasoft.isInstanceOfClass(item, "Terrasoft.TimelineFilterMenuItem") && !item.checked) {
					isAllItemSelected = false;
				}
			}, this);
			return isAllItemSelected;
		},

		/**
		 * Updates "All" menu item value.
		 * @protected
		 */
		updateAllMenuItemValue: function() {
			if (this.useAllMenuItem) {
				this._allMenuItemControl.setChecked(this.isAllItemSelected());
			}
		},

		/**
		 * Handles menu item checked event.
		 * @protected
		 */
		onMenuItemChecked: function() {
			if (!this.isMenuLoading) {
				this.isMenuLoading = true;
				this.updateAllMenuItemValue();
				this.isMenuLoading = false;
			}
		},

		/**
		 * Subscribes menu item events.
		 * @protected
		 * @param {Terrasoft.TimelineFilterMenuItem} item Menu item.
		 */
		subscribeItemEvents: function(item) {
			item.on("checkedchanged", this.onMenuItemChecked.bind(this));
		},

		/**
		 * @inheritdoc Terrasoft.Menu#afterRenderOrRerender
		 * @override
		 */
		afterRenderOrRerender: function() {
			this.callParent(arguments);
			if (this.useAllMenuItem && !this.isMenuLoading && this._allMenuItemControl.visible) {
				this._allMenuItemControl.fireEvent("afterrender", this, this.wrapEl);
			}
		},

		/**
		 * Handles apply button click event.
		 * @protected
		 */
		applySelectedItems: function() {
			var selectedItems = [];
			this.items.each(function(item) {
				if (Terrasoft.isInstanceOfClass(item, "Terrasoft.TimelineFilterMenuItem") && item.checked) {
					selectedItems.push(item.id);
				}
			});
			this.selectedItems = selectedItems;
			this.hide();
			this.fireEvent("change", selectedItems, this);
		},

		/**
		 * Handles selected items change event.
		 * @param {Array} values Selected item keys.
		 * @protected
		 */
		onSelectionChange: function(values) {
			this.selectedItems = values;
			this.items.each(function(item) {
				if (Terrasoft.isInstanceOfClass(item, "Terrasoft.TimelineFilterMenuItem")) {
					item.setChecked(Ext.Array.contains(values, item.id));
				}
			});
		},

		/**
		 * Used for rendering apply button control in base template.
		 * @protected
		 * @param {String[]} buffer HTML buffer.
		 * @param {Object} renderData Configuration object.
		 */
		renderApplyButton: function(buffer, renderData) {
			var self = renderData.self;
			var control = self._applyButtonControl;
			var html = control.generateHtml();
			Ext.DomHelper.generateMarkup(html, buffer);
		},

		/**
		 * Used for rendering "All" menu item control in base template.
		 * @protected
		 * @param {String[]} buffer HTML buffer.
		 * @param {Object} renderData Configuration object.
		 */
		renderAllMenuItem: function(buffer, renderData) {
			var self = renderData.self;
			var control = self._allMenuItemControl;
			var html = control.generateHtml();
			Ext.DomHelper.generateMarkup(html, buffer);
		}

		// endregion

	});
});


