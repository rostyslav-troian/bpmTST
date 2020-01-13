Terrasoft.configuration.Structures["LookupColumnDestinationViewModel"] = {innerHierarchyStack: ["LookupColumnDestinationViewModel"]};
define("LookupColumnDestinationViewModel", ["ColumnDestinationViewModel"], function() {
	/**
	 * @class Terrasoft.configuration.LookupColumnDestinationViewModel
	 * Class is responsible to view lookup destination column path.
	 */
	Ext.define("Terrasoft.configuration.LookupColumnDestinationViewModel", {
		alternateClassName: "Terrasoft.LookupColumnDestinationViewModel",
		extend: "Terrasoft.ColumnDestinationViewModel",

		//region Properties: Private

		/**
		 * Delimiter for schema name and column name.
		 * @private
		 * @type {String}
		 */
		separator: "\u2192",

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc Terrasoft.ColumnDestinationViewModel#columns
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
			"ImportColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"ImportColumnCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Schema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},

		//endregion

		//region Methods: Private

		/**
		 * Initializes import column caption.
		 * @private
		 */
		initImportColumnCaption: function() {
			var property = Terrasoft.findWhere(this.get("Properties"), {Key: "ImportColumnCaption"});
			var importColumnCaption = property.Value;
			this.set("ImportColumnCaption", importColumnCaption);
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.ColumnDestinationViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initImportColumnCaption();
		},

		/**
		 * @inheritdoc Terrasoft.ColumnDestinationViewModel#getPath
		 * @overridden
		 */
		getPath: function() {
			var columnCaption = this.getColumnCaption();
			return Ext.String.format("{0} {1} {2}", columnCaption, this.separator, this.get("ImportColumnCaption"));
		}

		//endregion

	});
});


