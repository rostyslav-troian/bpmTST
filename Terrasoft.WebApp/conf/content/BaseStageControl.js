Terrasoft.configuration.Structures["BaseStageControl"] = {innerHierarchyStack: ["BaseStageControl"]};
define("BaseStageControl", ["BaseStageControlItem", "css!BaseStageControl"], function() {
	/**
	 * Class for BaseStageControl
	 */
	Ext.define("Terrasoft.controls.BaseStageControl", {
		extend: "Terrasoft.controls.AbstractContainer",
		alternateClassName: "Terrasoft.BaseStageControl",

		/**
		 * Active stage.
		 * @private
		 * @type {String}
		 */
		activeStageId: null,

		/**
		 * Collection of stage viewModelItems.
		 * @type {Terrasoft.BaseViewModelCollection}
		 */
		stages: null,

		/**
		 * Name of class of stage items.
		 * @type {String}
		 */
		itemClassName: "Terrasoft.BaseStageControlItem",

		/**
		 * CSS class for wrapper.
		 * @type {String}
		 */
		wrapClass: "stage-wrapper",

		/**
		 * @inheritdoc Terrasoft.Component#classes
		 * @override
		 */
		classes: null,

		/**
		 * @inheritdoc Terrasoft.Component#tpl
		 * @override
		 */
		tpl: [
			"<div id=\"{id}-wrap\" class=\"{wrapClass}\">",
			"{%this.renderItems(out, values)%}",
			"</div>"
		],

		//region Methods: Private

		/**
		 * Initializes events for stage item menu view model.
		 * @private
		 * @param {Terrasoft.BaseViewModelCollection} menuViewModel View model for stage item menu.
		 * @param {Terrasoft.BaseViewModel} item Stage item view model.
		 */
		initMenuItems: function(menuViewModel, item) {
			item.onStageItemMenuClick = this.onStageItemMenuClick.bind(this, item);
			menuViewModel.each(function(menuItem) {
				menuItem.set("Click", {
					bindTo: "onStageItemMenuClick"
				});
				var tag = menuItem.get("Id") || Terrasoft.generateGUID();
				menuItem.set("Tag", tag);
				var menuMarkerAttribute = "MarkerValue";
				var menuMarker = menuItem.get(menuMarkerAttribute);
				if (Ext.isEmpty(menuMarker)) {
					menuItem.set(menuMarkerAttribute, menuItem.get("Caption"));
				}
			}, this);
		},

		/**
		 * Returns menu collection of stage item.
		 * @private
		 * @return {Terrasoft.BaseViewModelCollection}
		 */
		getItemMenu: function(item) {
			return item.get("Menu");
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#getTplData
		 * @override
		 */
		getTplData: function() {
			var tplData = this.callParent(arguments);
			var selectors = this.selectors;
			if (Ext.isEmpty(selectors)) {
				selectors = this.selectors = {};
			}
			selectors.wrapEl = "#" + this.id + "-wrap";
			var itemsTplData = {
				wrapClass: [this.wrapClass]
			};
			Ext.apply(itemsTplData, tplData, {});
			return itemsTplData;
		},

		/**
		 * @inheritdoc Terrasoft.AbstractContainer#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * Event after current stage change.
				 * @param {String} activeStage Current stage value.
				 * @param {Terrasoft.BaseStageControl} this
				 */
				"activeStageChanged",
				/**
				 * @event
				 * Event after click on active stage.
				 * @param {String} activeStage Current stage value.
				 * @param {String} newStage New stage value.
				 * @param {Terrasoft.BaseStageControl} this
				 */
				"activeStageClick"
			);
		},

		/**
		 * @inheritDoc Terrasoft.Bindable#subscribeForCollectionEvents
		 * @protected
		 */
		subscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.on("dataLoaded", this.onStagesChanged, this);
			collection.on("clear", this.onStagesCleared, this);
		},

		/**
		 * @inheritDoc Terrasoft.Bindable#unSubscribeForCollectionEvents
		 * @protected
		 */
		unSubscribeForCollectionEvents: function(binding, property, model) {
			this.callParent(arguments);
			var collection = model.get(binding.modelItem);
			collection.un("dataLoaded", this.onStagesChanged, this);
			collection.un("clear", this.onStagesCleared, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var buttonBindConfig = {
				stages: {
					changeMethod: "onStagesChanged"
				},
				activeStageId: {
					changeMethod: "onStageChanged"
				}
			};
			Ext.apply(buttonBindConfig, bindConfig);
			return buttonBindConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Component#reRender
		 * @override
		 */
		reRender: function() {
			this.items.clear();
			var stages = this.stages;
			if (stages) {
				stages.each(function(item, index, key) {
					var stageItem = this.generateItem(key, item);
					this.items.add(stageItem);
				}, this);
			}
			this.callParent(arguments);
		},

		/**
		 * Generates button for stage item.
		 * @protected
		 * @param {String} key Id of stage item.
		 * @param {Terrasoft.BaseViewModel} item Object that contains parameters of control template.
		 * @return {Terrasoft.BaseStageControlItem} Button element for stage.
		 */
		generateItem: function(key, item) {
			var controlItemClass = this.itemClassName;
			var itemConfig = {
				caption: {bindTo: "Caption"},
				color: {bindTo: "Color"},
				displayColor: {bindTo: "DisplayColor"},
				hoverColor: {bindTo: "HoverColor"},
				enabled: {bindTo: "Enabled"},
				isActive: {bindTo: "IsActive"},
				isPassed: {bindTo: "IsPassed"},
				markerValue: {bindTo: "Caption"}
			};
			this.applyMenuItems(item, itemConfig);
			var stageItem = Ext.create(controlItemClass, itemConfig);
			stageItem.bind(item);
			stageItem.setItemHoverStyles(this.wrapClass);
			stageItem.on("click", this.onStageItemClick.bind(this, item), this);
			return stageItem;
		},

		/**
		 * Appends menu config to stage item config if menu is defined and menu items exist.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Object that contains parameters of control template.
		 * @param {Object} itemConfig Stage control item view configuration.
		 */
		applyMenuItems: function(item, itemConfig) {
			var menu = this.getItemMenu(item);
			if (Ext.isEmpty(menu) || menu.getCount() === 0) {
				return;
			}
			this.initMenuItems(menu, item);
			Ext.apply(itemConfig, {menu: {items: {bindTo: "Menu"}}});
		},

		/**
		 * Returns stage item data using its view model.
		 * @param {Terrasoft.BaseViewModel} stageViewModel Stage item view model.
		 * @return {Object} Stage item data.
		 * @return {String} stageItem.id Stage primary value.
		 * @return {String} stageItem.caption Stage primary display value.
		 * @return {String} stageItem.isEnabled Stage enabled value.
		 */
		getStageItemData: function(stageViewModel) {
			var stageData = {
				id: stageViewModel.get("Id"),
				caption: stageViewModel.get("Caption"),
				isEnabled: stageViewModel.get("Enabled")
			};
			return stageData;
		},

		/**
		 * Handler for menu item click. Changes stage.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} item Stage item view model.
		 * @param {String} menuItemTag Menu item Tag attribute value.
		 * @return {Boolean} True if stage was changed.
		 */
		onStageItemMenuClick: function(item, menuItemTag) {
			var menu = this.getItemMenu(item);
			var menuItems = menu.filter(function(item) {
				return item.get("Tag") === menuItemTag;
			});
			if (menuItems.getCount() === 1) {
				var menuItem = menuItems.getByIndex(0);
				var stageData = this.getStageItemData(menuItem);
				return this.changeStage(stageData);
			}
		},

		/**
		 * Checks whether stage is changed.
		 * @protected
		 * @param {Object} stageItem stage button.
		 * @param {String} stageItem.id
		 * @return {Boolean} Returns true if state has changed
		 */
		getStageIsChanged: function(stageItem) {
			var value = stageItem.id;
			var oldStage = this.activeStageId;
			return value !== oldStage;
		},

		/**
		 * Changes value of current stage. Raises event activeStageClick, if result is true new value is set.
		 * After change raises event activeStageChanged.
		 * @protected
		 * @param {Object} stageItem Stage control element.
		 * @param {String} stageItem.id Stage primary value.
		 * @param {String} stageItem.caption Stage primary display value.
		 * @param {String} stageItem.isEnabled Stage enabled value.
		 * @return {Boolean} true - if value is changed.
		 */
		changeValue: function(stageItem) {
			var value = stageItem.id;
			var displayValue = stageItem.caption;
			var oldValue = this.activeStageId;
			var isChanged = this.getStageIsChanged(stageItem);
			if (isChanged && stageItem.isEnabled) {
				var canChange = this.fireEvent("activeStageClick", oldValue, value, this);
				canChange = Ext.isEmpty(canChange) ? true : canChange;
				if (canChange) {
					this.activeStageId = value;
					this.fireEvent("activeStageChanged", {
						value: value,
						displayValue: displayValue
					}, this);
					return true;
				}
			}
			return false;
		},

		/**
		 * Button click event handler.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} stageItem Stage control element.
		 * @return {Boolean} True if stage was changed.
		 */
		onStageItemClick: function(stageItem) {
			var menu = this.getItemMenu(stageItem);
			if (menu && menu.getCount() > 0) {
				return false;
			}
			var stageData = this.getStageItemData(stageItem);
			return this.changeStage(stageData);
		},

		/**
		 * Changes current stage and rerenders component.
		 * @param {Object} stageData New stage data.
		 * @param {String} stageData.id Stage primary value.
		 * @param {String} stageData.caption Stage primary display value.
		 * @param {String} stageData.isEnabled Stage enabled value.
		 * @return {Boolean} True if stage was changed.
		 */
		changeStage: function(stageData) {
			var isChanged = this.changeValue(stageData);
			this.safeRerender();
			return isChanged;
		},

		/**
		 * Active stage change handler.
		 * @protected
		 * @param {String} newActiveStage New activeStageId value.
		 */
		onStageChanged: function(newActiveStage) {
			this.activeStageId = newActiveStage;
			this.reRender();
		},

		/**
		 * ViewModel collection change handler.
		 * @param {Terrasoft.BaseViewModelCollection} collection Collection of viewModels.
		 * @protected
		 */
		onStagesChanged: function(collection) {
			if (collection) {
				this.reRender();
			}
		},

		/**
		 * ViewModel collection clear handler.
		 * @protected
		 */
		onStagesCleared: function() {
			this.reRender();
		},

		//endregion

		/**
		 * Returns link to DOM-element of component.
		 * @return {Ext.Element}
		 */
		getEl: function() {
			return this.el;
		}

	});
});


