Terrasoft.configuration.Structures["CtiLinkColumnUtility"] = {innerHierarchyStack: ["CtiLinkColumnUtility"]};
define("CtiLinkColumnUtility", [], function() {

		/**
		 * @class Terrasoft.configuration.CtiLinkColumnUtility.
		 * ##### ### ###### # ######### #### "######".
		 */
		Ext.define("Terrasoft.configuration.CtiLinkColumnUtility", {
			alternateClassName: "Terrasoft.CtiLinkColumnUtility",

			/**
			 * ###### ####### ## ########.
			 */
			linkColumns: {
				Contact: ["Phone", "MobilePhone", "HomePhone"],
				Account: ["Phone", "AdditionalPhone"]
			},

			/**
			 * #########, ######## ## #########.
			 * @private
			 * @return {Boolean} #### ######## - true, ##### - false.
			 */
			isTelephonyEnabled: function() {
				var ctiSettings = Terrasoft.SysValue.CTI;
				if (ctiSettings && !ctiSettings.isInitialized) {
					return true;
				}
				var connectionParams = ctiSettings && ctiSettings.connectionParams;
				return connectionParams && ctiSettings.canUseCti && connectionParams.disableCallCentre !== true;
			},

			/**
			 * ######### ######## ## ####### #######.
			 * @param {String} entitySchemaName ### #####.
			 * @param {String} columnPath ### #######.
			 * @return {Boolean} #######, ######## ## ####### #######.
			 */
			getIsLinkColumn: function(entitySchemaName, columnPath) {
				if (!this.isTelephonyEnabled() || Ext.isEmpty(this.linkColumns[entitySchemaName])) {
					return false;
				}
				return this.linkColumns[entitySchemaName].indexOf(columnPath) >= 0;
			},

			/**
			 * ####### URL ######.
			 * @param {String} entitySchemaName ### #####.
			 * @param {String} columnPath ### #######.
			 * @param {String} displayValue ############ ######## #######.
			 * @param {String} recordId Id ######.
			 * @returns {Object} URL ######.
			 */
			createLink: function(entitySchemaName, columnPath, displayValue, recordId) {
				if (!this.getIsLinkColumn.call(this, entitySchemaName, columnPath)) {
					return null;
				}
				var link = Ext.String.format("callTo: {0}/{1}/{2}", entitySchemaName,
					recordId, displayValue);
				return {
					caption: displayValue,
					target: "_self",
					title: displayValue,
					url: link
				};
			}
		});
		return Terrasoft.CtiLinkColumnUtility;
	});


