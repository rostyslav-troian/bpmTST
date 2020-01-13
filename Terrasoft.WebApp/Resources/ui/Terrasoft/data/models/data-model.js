Ext.ns("Terrasoft.model");

Ext.define("Terrasoft.model.DataModel", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.DataModel",

	/**
	 * Data model name.
	 * @type {String}
	 */
	name: null,

	/**
	 * Schema name.
	 * @type {String}
	 */
	schemaName: null,

	//region Methods: Public

	/**
	 * Saves all changed.
	 * @abstract
	 */
	save: Terrasoft.abstractFn,

	/**
	 * Loads data.
	 * @abstract
	 */
	load: Terrasoft.abstractFn,

	/**
	 * Returned attributes config.
	 * @abstract
	 */
	getAttributesConfig: Terrasoft.abstractFn

});
