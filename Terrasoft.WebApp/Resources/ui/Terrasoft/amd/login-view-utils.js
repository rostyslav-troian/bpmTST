define("login-view-utils", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		/**
		 * Creates login table container.
		 * @param {String} idName container id.
		 */
		createTableContainer: function(idName) {
			return Ext.create("Terrasoft.Container", {
				id: idName,
				selectors: {
					wrapEl: "#" + idName
				},
				classes: {
					wrapClassName: ["login-table-container"]
				}
			});
		},
		/**
		 * Creates login container for row of inputs and messages.
		 * @param {String} idName container id.
		 */
		createRowContainer: function(idName) {
			return Ext.create("Terrasoft.Container", {
				id: idName,
				selectors: {
					wrapEl: "#" + idName
				},
				classes: {
					wrapClassName: ["login-row-container"]
				}
			});
		},
		/**
		 * Creates login container for inputs and messages.
		 * @param {String} idName container id.
		 */
		createCellContainer: function(idName) {
			return Ext.create("Terrasoft.Container", {
				id: idName,
				selectors: {
					wrapEl: "#" + idName
				},
				classes: {
					wrapClassName: ["login-cell-container"]
				}
			});
		},
		/**
		 * Creates label with login page styles.
		 * @param {String} caption label text.
		 */
		createLabel: function(caption) {
			return Ext.create("Terrasoft.Label", {
				caption: caption,
				classes: {
					labelClass: ["login-info-label"]
				}
			});
		}
	}
});
