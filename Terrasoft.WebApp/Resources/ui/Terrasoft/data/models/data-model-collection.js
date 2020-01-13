/**
 */
Ext.define("Terrasoft.core.collections.DataModelCollection", {
	extend: "Terrasoft.core.collections.ObjectCollection",
	alternateClassName: "Terrasoft.DataModelCollection",

	/**
	 * Initialize data models config.
	 * @type {Object}
	 */
	dataModelsConfig: null,

	//region Methods: Public

	/**
	 * Initializes data model collection.
	 * @param {Object} config Configuration information.
	 * Example
	 *
	 *{
	 * Contact1: {
	 *   entitySchemaName: "Contact"
	 *   entitySchemaName: "Contact",
	 *   isPrimary: true
	 *  },
	 * Account: {
	 *   entitySchemaName: "Account"
	 *   entitySchemaName: "Account",
	 *   primaryColumnValue: {
	 *      bindTo: "Account"
	 *  }
	 * }
	 *}
	 *
	 * Example
	 *
	 * {
	 * Contact1: {
	 *   entitySchema: entitySchema
	 *  }
	 *
	 */
	init: function(config) {
		this.dataModelsConfig = Ext.clone(config);
		Terrasoft.each(config, function(dataModelConfig, dataModelName) {
			this._add(dataModelName, dataModelConfig);
		}, this);
	},

	/**
	 * Returned config attributes.
	 * @return {Object}.
	 */
	getAttributesConfig: function() {
		let attributes = {};
		this.each(function(dataModel) {
			attributes = Ext.apply(attributes, dataModel.getAttributesConfig());
		}, this);
		return attributes;
	},

	/**
	 * Finds primary data model.
	 * @return {Terrasoft.model.DataModel|null}
	 */
	findPrimary: function() {
		return this.findByPath("isPrimary", true);
	},

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_add: function(dataModelName, config) {
		const entitySchemaName = config.entitySchemaName;
		const entitySchema = config.entitySchema;
		if (entitySchemaName || entitySchema) {
			const model = new Terrasoft.EntityDataModel({
				schemaName: entitySchemaName,
				schema: entitySchema,
				name: dataModelName,
				primaryColumnValueConfig: config.primaryColumnValue,
				isPrimary: Boolean(config.isPrimary),
				isNew: true
			});
			this.add(dataModelName, model);
		}
	}

	//endregion

});
