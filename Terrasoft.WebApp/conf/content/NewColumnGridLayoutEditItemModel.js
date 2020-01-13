Terrasoft.configuration.Structures["NewColumnGridLayoutEditItemModel"] = {innerHierarchyStack: ["NewColumnGridLayoutEditItemModel"]};
define("NewColumnGridLayoutEditItemModel", ["ColumnGridLayoutEditItemModel"], function() {

	Ext.define("Terrasoft.configuration.NewColumnGridLayoutEditItemModel", {
		extend: "Terrasoft.ColumnGridLayoutEditItemModel",
		alternateClassName: "Terrasoft.NewColumnGridLayoutEditItemModel",

		// region Methods: Private

		/**
		 * @private
		 */
		_getNamePrefix: function() {
			var schemaNamePrefix = Terrasoft.ClientUnitSchemaManager.schemaNamePrefix;
			var columnName = Ext.String.capitalize(this.column.name.toLowerCase());
			var prefix = schemaNamePrefix ? (schemaNamePrefix + columnName) : columnName;
			return prefix;
		},

		/**
		 * @private
		 */
		_generateName: function(designerSchema) {
			var names = [];
			var dataModels = designerSchema.$DataModels;
			dataModels.each(function(dataModel) {
				var schema = dataModel.get("Schema");
				var datModelColumnNames = schema.columns.mapArray(function(column) {
					return column.name.toLowerCase();
				}, this);
				Terrasoft.append(names, datModelColumnNames);
			}, this);
			var prefix = this._getNamePrefix();
			return Terrasoft.getUniqueValue(names, prefix);
		},

		/**
		 * @private
		 */
		_generateCaption: function(name) {
			var prefix = this._getNamePrefix();
			var nameSuffix = name.substr(prefix.length);
			var sourceCaption = this.column.caption;
			var caption = new sourceCaption.self();
			Terrasoft.each(sourceCaption.cultureValues, function(value, culture) {
				caption.setCultureValue(culture, value + " " + nameSuffix);
			}, this);
			return caption;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ColumnGridLayoutEditItemModel#getDesignSchemaColumn
		 * @override
		 * @param {Terrasoft.ViewModelSchemaDesignerSchema} designSchema Design schema.
		 */
		getDesignEntitySchemaColumn: function(designSchema) {
			var column = this.column;
			var uId = Terrasoft.generateGUID();
			var name = this._generateName(designSchema);
			var caption = this._generateCaption(name);
			return new column.self({
				uId: uId,
				caption: caption,
				name: name,
				dataValueType: column.dataValueType,
				status: Terrasoft.ModificationStatus.NEW
			});
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#addToDesignSchema
		 * @override
		 */
		addToDesignSchema: function(config) {
			var designSchema = this.designSchema;
			designSchema.set("ActionLayoutName", config.layoutName);
			designSchema.set("ActionLayoutItem", this);
			designSchema.set("ActionLayoutCreate", true);
			this.openDesigner();
		}

		// endregion

	});

	return Terrasoft.NewColumnGridLayoutEditItemModel;
});


