Terrasoft.configuration.Structures["AccountPageMixin"] = {innerHierarchyStack: ["AccountPageMixin"]};
define("AccountPageMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.AccountPageMixin
	 * Implements common business logic for AccountPageV2 and AccountMiniPage.
	 */
	Ext.define("Terrasoft.configuration.mixins.AccountPageMixin", {
		alternateClassName: "Terrasoft.AccountPageMixin",

		/**
		 * Adds row to contact career.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} data New row parameters.
		 * @param {Object} scope Callback function context.
		 */
		addContactCareer: function(callback, data, scope) {
			var recordId = this.get("Id");
			var insert = this.Ext.create("Terrasoft.InsertQuery", {
				"rootSchemaName": "ContactCareer"
			});
			insert.setParameterValue("Contact", data.contactId, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("Account", recordId, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("Primary", data.isPrimary, Terrasoft.DataValueType.BOOLEAN);
			insert.setParameterValue("Current", data.isCurrent, Terrasoft.DataValueType.BOOLEAN);
			insert.execute(function(result) {
				if (result.success) {
					this.Ext.callback(callback, scope || this, [result]);
				} else {
					this.Ext.callback(callback, scope || this);
				}
			}, this);
		},

		/**
		 * Gets primary contact account from database.
		 * @protected
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		getPrimaryContactAccount: function(callback, scope) {
			var primaryContact = this.get("PrimaryContact");
			var esq = this.Ext.create(Terrasoft.EntitySchemaQuery, {
				rootSchemaName: "Contact"
			});
			esq.addColumn("Account");
			esq.enablePrimaryColumnFilter(primaryContact.value);
			esq.execute(function(response) {
				if (response.success) {
					var contact = response.collection.getByIndex(0);
					this.Ext.callback(callback, scope, [contact.get("Account")]);
				} else {
					this.Ext.callback(callback, scope);
				}
			}, this);
		}
	});
});

