/**
 * @abstract
 */
Ext.define("Terrasoft.data.models.BaseEntitySchema", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BaseEntitySchema",

	/**
  * Description of model fields
  * @type {Object}
  */
	columns: null,

	/**
  * Name of the object schema
  * @type {String}
  */
	name: "",

	/**
  * Universal primary key identifier
  * @type {String}
  */
	primaryColumnName: "",

	/**
  * The column representing the primary key
  * @type {Object}
  */
	primaryColumn: null,

	/**
  * The name of the primary column to display
  * @type {String}
  */
	primaryDisplayColumnName: "",

	/**
  * Primary data display column
  * @type {Object}
  */
	primaryDisplayColumn: null,

	/**
  * Name of the hierarchical column
  * @type {String}
  */
	hierarchicalColumnName: "",

	/**
  * Hierarchical column
  * @type {Object}
  */
	hierarchicalColumn: null,

	/**
  * A sign that the schema is administered by records
  * @type {Boolean}
  */
	administratedByRecords: false,

	/**
	 * inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.primaryColumn = this.getColumnByName(this.primaryColumnName);
		this.primaryDisplayColumn = this.getColumnByName(this.primaryDisplayColumnName);
		this.hierarchicalColumn = this.getColumnByName(this.hierarchicalColumnName);
	},

	/**
  * Returns the object schema column object by name
  * @param {String} name Column Name
  * @return {Object} Column object
  */
	getColumnByName: function(name) {
		return this.columns[name];
	},

	/**
	 * Returns entity schema column by unique identifier.
	 * @param {String} columnUId Unique identifier.
	 * @throws {Terrasoft.ItemNotFoundException} Throws an exception
	 * if the column is not found in the schema.
	 * @return {Terrasoft.EntitySchemaColumn}
	 */
	getColumnByUId: function(columnUId) {
		var resultColumn = this.findColumnByUId(columnUId);
		if (!resultColumn) {
			var message = Terrasoft.getFormattedString(Terrasoft.Resources.BaseEntitySchema.ColumnNotFondException,
				columnUId, this.name);
			throw new Terrasoft.ItemNotFoundException({
				message: message
			});
		}
		return resultColumn;
	},

	/**
  * Checks whether there is a column called name in the schema
  * @param {String} name Column Name
  * @return {Boolean} Returns true if the column named name exists in the schema
  */
	isColumnExist: function(name) {
		return (name in this.columns);
	},

	/**
	 * Finds entity schema column by unique identifier.
	 * @param {String} columnUId Unique identifier.
	 * @return {*|Terrasoft.EntitySchemaColumn}
	 */
	findColumnByUId: function(columnUId) {
		return Terrasoft.findWhere(this.columns, {uId: columnUId});
	}

});
