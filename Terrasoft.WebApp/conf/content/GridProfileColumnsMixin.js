Terrasoft.configuration.Structures["GridProfileColumnsMixin"] = {innerHierarchyStack: ["GridProfileColumnsMixin"]};
/**
 * @class Terrasoft.configuration.GridProfileColumnsMixin
 * Mixin which manages grid columns in the profile.
 */
define("GridProfileColumnsMixin", [], function() {
	Ext.define("Terrasoft.configuration.GridProfileColumnsMixin", {
		alternateClassName: "Terrasoft.GridProfileColumnsMixin",

		/**
		 * Sorting column in profile by column index.
		 * @param profile
		 * @param columnIndex
		 */
		sortColumnByIndex: function(profile, columnIndex) {
			if (Ext.Object.isEmpty(profile)) {
				return;
			}
			this._sortColumnInListed(profile, columnIndex);
		},

		/**
		 * Sorting column in profile by column tag (bindTo).
		 * @param {Object} profile
		 * @param {String} columnTag
		 */
		sortColumnByTag: function(profile, columnTag) {
			if (Ext.Object.isEmpty(profile)) {
				return;
			}
			const columnIndex = this._getColumnIndexByTag(profile, columnTag);
			this._sortColumnInListed(profile, columnIndex);
		},

		/**
		 * @private
		 * @param profile
		 * @param columnTag
		 * @return {Number}
		 */
		_getColumnIndexByTag: function(profile, columnTag) {
			const listedConfigJson = profile.listedConfig;
			if (!listedConfigJson) {
				return -1;
			}
			const listedConfig = JSON.parse(listedConfigJson);
			const findColumn = listedConfig.items.find(function(column) {
				const bindTo = column && column.bindTo;
				return bindTo === columnTag;
			});
			return Ext.Array.indexOf(listedConfig.items, findColumn);
		},

		/**
		 * @private
		 * @param {Object} profile
		 * @param {Object} profile.listedConfig
		 * @param columnIndex
		 */
		_sortColumnInListed: function(profile, columnIndex) {
			const listedConfigJson = profile.listedConfig;
			if (!listedConfigJson) {
				return;
			}
			const listedConfig = JSON.parse(listedConfigJson);
			const column = listedConfig.items[columnIndex];
			if (!column) {
				return;
			}
			const currentOrderDirection = parseInt(column.orderDirection, 10);
			listedConfig.items.forEach(function(column) {
				column.orderDirection = Terrasoft.emptyString;
				column.orderPosition = Terrasoft.emptyString;
			});
			if (column)  {
				column.orderDirection = currentOrderDirection === 1 ? 2: 1;
				column.orderPosition = 1;
			}
			profile.listedConfig = JSON.stringify(listedConfig);
		}
	});
	return {};
});


