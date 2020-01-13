/**
 */
Ext.define("Terrasoft.configuration.BaseProcessSchemaElement", {
	extend: "Terrasoft.configuration.BaseProcessSchemaItem",
	alternateClassName: "Terrasoft.BaseProcessSchemaElement",

	//region Properties: Public

	/**
	 * Parent element identifier.
	 * @type {String}
	 */
	containerUId: null,

	/**
	 * Edit page schema name.
	 * @type {String}
	 */
	editPageSchemaName: Terrasoft.process.constants.DEFAULT_EDIT_PAGE_SCHEMA_NAME,

	//endregion

	//region Methods: Private

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var properties = this.callParent(arguments);
		return Ext.Array.push(properties, ["containerUId"]);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Loads process elements localizable values.
	 * @param {Object} localizableValues Localizable object resources.
	 * @protected
	 */
	loadLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		this.caption = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues.Caption
		});
	},

	/**
	 * Loads process elements localizable values by UIds.
	 * @param {Object} localizableValues Localizable object resources.
	 * @protected
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		var uid = this.uId;
		this.caption = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues[uid + ".caption"]
		});
	},

	/**
	 * Returns object with process element localizable resources.
	 * @param {Object} localizableValues Localizable object resources.
	 * @protected
	 */
	getLocalizableValues: function(localizableValues) {
		var uid = this.uId;
		localizableValues[uid + ".caption"] = this.getSerializableProperty(this.caption);
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns edit page schema name.
	 * @param {Function} callback Callback function
	 * @param {String} callback.editPageSchemaName Edit page schema name.
	 * @param {Object} scope Callback function scope.
	 * @protected
	 */
	getEditPageSchemaName: function(callback, scope) {
		callback.call(scope, this.editPageSchemaName);
	}

	//endregion

});
