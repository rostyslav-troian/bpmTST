Terrasoft.configuration.Structures["DynamicContentBlockViewModel"] = {innerHierarchyStack: ["DynamicContentBlockViewModel"]};
define("DynamicContentBlockViewModel", ["DynamicContentBlockViewModelResources", "ContentBlockViewModel",
		"DynamicContentGroupMenu"],
	function(resources) {

		/**
		 * @class Terrasoft.controls.DynamicContentBlockViewModel
		 */
		Ext.define("Terrasoft.DynamicContentBlockViewModel", {
			extend: "Terrasoft.ContentBlockViewModel",

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#className
			 * @override
			 */
			className: "Terrasoft.DynamicContentBlock",

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#initResourcesValues
			 * @override
			 */
			initResourcesValues: function(resourcesObj) {
				Ext.apply(resourcesObj.localizableImages, resources.localizableImages);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
			 * @override
			 */
			getViewConfig: function() {
				var viewConfig = this.callParent();
				Ext.apply(viewConfig, {
					"isActive": "$IsActive",
					"caption": "$Caption",
					"groupMenu": this.getGroupMenuConfig()
				});
				return viewConfig;
			},

			/**
			 * Returns group menu config.
			 * @protected
			 * @return {Object} Group menu properties.
			 */
			getGroupMenuConfig: function() {
				return {
					className: "Terrasoft.Button",
					id: this.$Id + "-groupmenu-el",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					markerValue: "group-menu-button",
					imageConfig: "$Resources.Images.DynamicContent",
					classes: {wrapperClass: "block-group-menu-button"},
					menuClass: "Terrasoft.DynamicContentGroupMenu",
					menu: {"items": {"bindTo": "getMenuItems"}}
				};
			},

			/**
			 * Returns instance of group menu item.
			 * @protected
			 * @param {Terrasoft.ContentBlock} block The instance of content block.
			 * @return {Terrasoft.BaseViewModel} Group menu item.
			 */
			getDynamicContentMenuItem: function(block) {
				var menuItem = Ext.create("Terrasoft.BaseViewModel", {
					"values": {
						"Id": block.$Id,
						"Type": "Terrasoft.MenuItem",
						"Caption": block.$Caption,
						"Priority": block.$Priority,
						"Enabled": block.$Id !== this.$Id,
						"Handler": this.onBlockGroupMenuItemClick.bind(this)
					}
				});
				return menuItem;
			},

			/**
			 * Returns collection of group menu items.
			 * @protected
			 * @return {Terrasoft.BaseViewModelCollection} Group menu items.
			 */
			getMenuItems: function() {
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				if (this.$GroupId) {
					Terrasoft.each(this.parentCollection, function(block) {
						var item = this.getDynamicContentMenuItem(block);
						collection.addItem(item, item.$Id);
					}, this);
					collection.sort("$Priority", Terrasoft.OrderDirection.ASC);
				}
				return collection;
			},

			/**
			 * Handles click on item of block group menu.
			 * @protected
			 * @param {Terrasoft.Menu} menu The instance of menu.
			 * @param {Terrasoft.MenuItem} item The instance of clicked menu item.
			 */
			onBlockGroupMenuItemClick: function(menu, item) {
				this.fireEvent("change", this, {
					event: "dynamicblockchanged",
					arguments: {Id: item.id, GroupId: this.$GroupId}
				});
			}

			//endregion

		});

		return Terrasoft.DynamicContentBlockViewModel;
	}
);


