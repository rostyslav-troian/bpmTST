Terrasoft.configuration.Structures["AddressDestinationViewModel"] = {innerHierarchyStack: ["AddressDestinationViewModel"]};
define("AddressDestinationViewModel", ["ColumnTypedDestinationViewModel"], function() {
	Ext.define("Terrasoft.configuration.AddressDestinationViewModel", {
		alternateClassName: "Terrasoft.AddressDestinationViewModel",
		extend: "Terrasoft.ColumnTypedDestinationViewModel",

		//region Properties: Private

		/**
		 * Delimiter for schema name and column name.
		 * @private
		 * @type {String}
		 */
		separator: "\u2192",

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		getPath: function() {
			var template = "{0} ({1}) {2} {3}";
			var type = this.get("Type");
			return Ext.String.format(template,
				this.get("SchemaCaption"), type.displayValue, this.separator, this.get("ColumnCaption"));
		},

		/**
		 * Validates destination using destination information.
		 * @param {Object} destinationInfo Destination information.
		 * @param {String} destinationInfo.type Destination type.
		 * @param {Object} destinationInfo.destinationConfig Destination configuration.
		 * @return {Boolean} Validation result.
		 */
		validateDestination: function(destinationInfo) {
			var currentType = this.get("Type");
			var destinationType = destinationInfo.type;
			var typesMatch = (currentType.value === destinationType.value);
			var currentColumnName = this.get("ColumnName");
			var destinationConfig = destinationInfo.destinationConfig;
			var columnsMatch = (currentColumnName === destinationConfig.ColumnName);
			var currentSchemaUId = this.get("SchemaUId");
			var schemaUIdsMatch = (currentSchemaUId === destinationConfig.SchemaUId);
			return !(typesMatch && columnsMatch && schemaUIdsMatch);
		}

		//endregion
	});
});


