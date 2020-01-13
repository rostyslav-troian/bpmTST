Terrasoft.configuration.Structures["ColumnDestinationViewModel"] = {innerHierarchyStack: ["ColumnDestinationViewModel"]};
define("ColumnDestinationViewModel", ["ColumnDestinationViewModelResources"], function(resources) {
	Ext.define("Terrasoft.configuration.ColumnDestinationViewModel", {
		alternateClassName: "Terrasoft.ColumnDestinationViewModel",
		extend: "Terrasoft.BaseViewModel",

		//region Properties: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		columns: {
			"Id": {
				dataValueType: Terrasoft.DataValueType.GUID
			},
			"IsKey": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			"ColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"ColumnValueName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Schema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * Destination deleting event.
				 */
				"delete"
			);
		},

		/**
		 * Returns column destination path.
		 * @virtual
		 * @return {String} Column destination path.
		 */
		getPath: function() {
			return this.getColumnCaption();
		},

		/**
		 * Returns column caption.
		 * @return {String} Column caption.
		 */
		getColumnCaption: function() {
			var columnName = this.get("ColumnName");
			var schema = this.get("Schema");
			if (!schema) {
				return columnName;
			}
			var column = schema.getColumnByName(columnName);
			return column.caption;
		},

		/**
		 * Returns reference schema name.
		 * @param {Object} rootSchema Root schema.
		 * @return {String}
		 */
		getReferenceSchemaName: function(rootSchema) {
			var referenceSchemaName = Terrasoft.findWhere(this.get("Properties"), {Key: "ReferenceSchemaName"});
			var schemaName;
			if (referenceSchemaName) {
				schemaName = referenceSchemaName.Value;
			} else {
				var columnName = this.get("ColumnName");
				var column = rootSchema.getColumnByName(columnName);
				if (column) {
					schemaName = column.referenceSchemaName;
				} else {
					schemaName = this.get("RootSchema") ? this.get("RootSchema").name : "";
				}
			}
			return schemaName;
		},

		/**
		 * Handles delete button click.
		 */
		onDeleteButtonClick: function() {
			this.fireEvent("delete", this);
		},

		/**
		 * Returns default image configuration.
		 * @return {Object} config Image configuration.
		 * @return {String} config.source Image resource type.
		 * @return {String} config.url Source image url.
		 */
		getDefaultImageConfig: function() {
			return {
				source: Terrasoft.ImageSources.URL,
				url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultImage)
			};
		},

		/**
		 * Returns serializable object.
		 * @return {Object} object Serializable object.
		 * @return {String} object.columnName Column name.
		 * @return {String} object.columnValueName Column value name.
		 * @return {String} object.schemaUId Schema unique identifier.
		 * @return {Array}  object.properties Destination properties.
		 */
		getSerializableObject: function() {
			return {
				isKey: this.get("IsKey"),
				columnName: this.get("ColumnName"),
				columnValueName: this.get("ColumnValueName"),
				schemaUId: this.get("SchemaUId"),
				properties: this.get("Properties")
			};
		},

		/**
		 * Returns destination validation result.
		 * @return {Boolean} Validation result.
		 */
		validateDestination: function() {
			return true;
		},

		/**
		 * Returns destination index validation result.
		 * @return {Boolean} Validation result.
		 */
		validateDestinationIndex: function() {
			return true;
		}

		//endregion
	});
});


