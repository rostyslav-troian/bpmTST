Terrasoft.configuration.Structures["DcmSchemaElementPropertiesPageBuilder"] = {innerHierarchyStack: ["DcmSchemaElementPropertiesPageBuilder"]};
define("DcmSchemaElementPropertiesPageBuilder", ["SchemaBuilderV2"], function() {
	/**
	 * @class Terrasoft.configuration.DcmSchemaElementPropertiesPageBuilder
	 * Class, which generates the view and view model for the DCM element properties page.
	 */
	Ext.define("Terrasoft.configuration.DcmSchemaElementPropertiesPageBuilder", {
		extend: "Terrasoft.SchemaBuilder",
		alternateClassName: "Terrasoft.DcmSchemaElementPropertiesPageBuilder",

		//region Properties: Private

		/**
		 * Use base schema property name.
		 * @private
		 * @type {String}
		 */
		useBaseSchemaPropertyName: "useBaseDcmSchema",

		/**
		 * Base schema property name.
		 * @private
		 * @type {String}
		 */
		baseDcmSchemaNamePropertyName: "baseDcmSchemaName",

		/**
		 * Base schema name.
		 * @private
		 * @type {String}
		 */
		baseDcmSchemaName: "BaseDcmSchemaElementPropertiesPage",

		//endregion

		//region Methods: Private

		/**
		 * Returns property values.
		 * @private
		 * @param {String} propertyName Property name.
		 * @param {Array} hierarchy Hierarchy of schemas.
		 * @return {*}
		 */
		_getHierarchyPropertyValues: function(propertyName, hierarchy) {
			var propertyValue = null;
			Terrasoft.each(hierarchy, function(schema) {
				if (Ext.isDefined(schema[propertyName])) {
					propertyValue = schema[propertyName];
				}
			}, this);
			return propertyValue;
		},

		/**
		 * Returns property index.
		 * @private
		 * @param {String} propertyName Property name.
		 * @param {*} propertyValue Property value.
		 * @param {Array} hierarchy Hierarchy of schemas.
		 * @return {int}
		 */
		_getHierarchyPropertyIndex: function(propertyName, propertyValue, hierarchy) {
			for (var i = 0, len = hierarchy.length; i !== len; i++) {
				var schema = hierarchy[i];
				if (schema[propertyName] === propertyValue) {
					return i;
				}
			}
			return -1;
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.SchemaBuilder#onSchemaHierarchyBuilt
		 * @override
		 */
		onSchemaHierarchyBuilt: function(initialHierarchy, initialConfig, callback, scope) {
			var index = this._getHierarchyPropertyIndex(this.useBaseSchemaPropertyName, true,
				initialHierarchy);
			if (index !== -1) {
				this.callParent([initialHierarchy, initialConfig, function(hierarchy, config) {
					var baseSchemaName = this._getHierarchyPropertyValues(this.baseDcmSchemaNamePropertyName, hierarchy)
						|| this.baseDcmSchemaName;
					var baseDcmSchemaConfig = {
						schemaName: baseSchemaName,
						profileKey: config.profileKey,
						hierarchyStack: [],
						isBaseSchema: true
					};
					var firstSchema = hierarchy[index];
					this.requireAllSchemaHierarchy(baseDcmSchemaConfig, function(baseHierarchy) {
						Terrasoft.each(baseHierarchy, function(baseSchema) {
							requirejs.undef(baseSchema.schemaName);
							baseSchema.schemaName += firstSchema.schemaName;
						}, this);
						Ext.Array.insert(hierarchy, index, baseHierarchy);
						Ext.callback(callback, scope, [hierarchy, config]);
					}, this);
				}, this]);
			} else {
				this.callParent(arguments);
			}
		}

		//endregion

	});

	return Terrasoft.DcmSchemaElementPropertiesPageBuilder;
});


