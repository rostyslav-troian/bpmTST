Terrasoft.configuration.Structures["MenuUtilities"] = {innerHierarchyStack: ["MenuUtilities"]};
define("MenuUtilities", ["ext-base"], function(Ext) {
	/**
	 * @class Terrasoft.configuration.MenuUtilities
	 * ##### MenuUtilities ############ ### ######## ######### ####.
	 */
	var menuUtilitiesClass = Ext.define("Terrasoft.configuration.MenuUtilities", {
		alternateClassName: "Terrasoft.MenuUtilities",

		/**
		 * ######## ## ######### ### ######### ###### ####.
		 */
		defaultMenuItemVisibility: true,

		/**
		 * ########## ######### #### ## ########## ######### #######.
		 * @param {Object} menuItems ######### ####### ####.
		 * @param {Object} viewModel ######## ######### ######### ####### ####.
		 * @return {Boolean} ######### ####.
		 */
		getMenuVisible: function(menuItems, viewModel) {
			if (!menuItems || menuItems.isEmpty()) {
				return false;
			}
			var menuVisible = true;
			menuItems.each(function(menuItem) {
				menuVisible = this.getMenuItemVisible(menuItem, viewModel);
				return !menuVisible;
			}, this);
			return menuVisible;
		},

		/**
		 * ########## ######### ###### ####.
		 * @protected
		 * @param {Object} menuItem ##### ####.
		 * @param {Object} viewModel ######## ######### ######### ###### ####.
		 * @return {Boolean} ######### ###### ####.
		 */
		getMenuItemVisible: function(menuItem, viewModel) {
			var menuItemVisible = this.defaultMenuItemVisibility;
			var menuItemVisibleConfig = menuItem.get("Visible");
			if (Ext.isObject(menuItemVisibleConfig)) {
				var viewModelPropertyName = menuItemVisibleConfig.bindTo;
				menuItemVisible = this.getViewModelPropertyValue(viewModel, viewModelPropertyName, menuItem);
			} else {
				menuItemVisible = (Ext.isEmpty(menuItemVisibleConfig)
					? this.defaultMenuItemVisibility
					: menuItemVisibleConfig);
			}
			return menuItemVisible;
		},

		/**
		 * ########## ######### ###### ####, ######## ########.
		 * @private
		 * @param {Object} viewModel ######## ######### ######### ###### ####.
		 * @param {String} propertyName ######## ########.
		 * @param {Object} menuItem ##### ####.
		 * @return {Boolean} ######### ###### ####.
		 */
		getViewModelPropertyValue: function(viewModel, propertyName, menuItem) {
			var propertyValue = this.defaultMenuItemVisibility;
			if (Ext.isFunction(viewModel[propertyName])) {
				propertyValue = viewModel[propertyName](menuItem.get("Id"));
			} else {
				propertyValue = viewModel.get(propertyName);
			}
			return propertyValue;
		}

	});
	return Ext.create(menuUtilitiesClass);
});


