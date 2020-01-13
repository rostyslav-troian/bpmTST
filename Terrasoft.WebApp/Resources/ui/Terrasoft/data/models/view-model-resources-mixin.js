Ext.define("Terrasoft.ViewModelResourcesMixin", {
	extend: "Terrasoft.core.BaseObject",

	//region Properties: Public

	/**
	 * Resources of view model.
	 * @type {Object}
	 */
	resources: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_setResourceColumns: function() {
		if (this.resources) {
			Terrasoft.each(this.resources.localizableStrings, function(value, name) {
				this._createResourceColumn(name, value, Terrasoft.DataValueType.TEXT);
			}, this);
			Terrasoft.each(this.resources.localizableImages, function(value, name) {
				this._createResourceColumn(name, value, Terrasoft.DataValueType.IMAGE);
			}, this);
		}
	},

	/**
	 * @private
	 */
	_createResourceColumn: function(name, value, dataValueType) {
		var column = {
			name: this._getResourceColumnPath(name, dataValueType),
			dataValueType: dataValueType,
			type: Terrasoft.ViewModelColumnType.RESOURCE_COLUMN,
			value: value
		};
		this.columns[column.name] = column;
	},

	/**
	 * @private
	 */
	_getResourceColumnPath: function(resourceName, dataValueType) {
		if (dataValueType === Terrasoft.DataValueType.TEXT) {
			return "Resources.Strings." + resourceName;
		}
		if (dataValueType === Terrasoft.DataValueType.IMAGE) {
			return "Resources.Images." + resourceName;
		}
	}

	//endregion

});
