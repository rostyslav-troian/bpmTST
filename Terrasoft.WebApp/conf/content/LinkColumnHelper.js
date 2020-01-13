Terrasoft.configuration.Structures["LinkColumnHelper"] = {innerHierarchyStack: ["LinkColumnHelper"]};
define("LinkColumnHelper", [], function() {

		/**
		 * ######### ######## ## ####### #######.
		 * @param {String} entitySchemaName ### #####.
		 * @param {String} columnName ### #######.
		 * @returns {boolean} #######, ######## ## ####### #######.
		 */
		var getIsLinkColumn = function(entitySchemaName, columnName) {
			for (var linkColumnUtility in Terrasoft.LinkColumnUtilities) {
				var columnUtility = Terrasoft.LinkColumnUtilities[linkColumnUtility];
				if (!Ext.isObject(columnUtility)) {
					continue;
				}
				if (!Ext.isFunction(columnUtility.getIsLinkColumn)) {
					continue;
				}
				if (columnUtility.getIsLinkColumn.call(columnUtility, entitySchemaName, columnName)) {
					return true;
				}
			}
			return false;
		};

		/**
		 * ####### URL ######.
		 * @param {String} entitySchemaName ### #####.
		 * @param {String} columnPath ### #######.
		 * @param {String} displayValue ############ ######## #######.
		 * @param {String} recordId Id ######.
		 * @returns {Object} URL ######.
		 */
		var createLink = function(entitySchemaName, columnPath, displayValue, recordId) {
			for (var linkColumnUtility in Terrasoft.LinkColumnUtilities) {
				var columnUtility = Terrasoft.LinkColumnUtilities[linkColumnUtility];
				if (!Ext.isObject(columnUtility)) {
					continue;
				}
				if ((!Ext.isFunction(columnUtility.getIsLinkColumn)) || (!Ext.isFunction(columnUtility.createLink))) {
					continue;
				}
				if (!columnUtility.getIsLinkColumn.call(columnUtility, entitySchemaName, columnPath)) {
					continue;
				}
				return columnUtility.createLink.call(columnUtility, entitySchemaName,
					columnPath, displayValue, recordId);
			}
			return null;
		};

		return {
			getIsLinkColumn: getIsLinkColumn,
			createLink: createLink
		};
	}
);


