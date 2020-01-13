/**
 */
Ext.define("Terrasoft.manager.EntitySchema", {
	extend: "Terrasoft.manager.BaseSchema",
	alternateClassName: "Terrasoft.EntitySchema",

	//region Properties: Protected

	/**
	 * Server contract name.
	 * @protected
	 * @type {String}
	 */
	contractName: "EntitySchema",

	/**
	 * Serialized parameters.
	 * @protected
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "realUId", "name", "caption", "description", "extendParent", "packageUId",
		"parentUId", "isVirtual", "isDBView", "isTrackChangesInDB", "administratedByOperations",
		"administratedByColumns", "administratedByRecords", "useMasterRecordRights", "masterRecordSchemaName",
		"columns", "primaryColumnUId", "primaryDisplayColumnUId", "hierarchyColumnUId"],

	/**
	 * Unique identifier of parent schema.
	 * @protected
	 * @type {String}
	 */
	parentUId: null,

	/**
	 * Virtual entity mark.
	 * @protected
	 * @type {Boolean}
	 */
	isVirtual: null,

	/**
	 * Database view mark.
	 * @protected
	 * @type {Boolean}
	 */
	isDBView: null,

	/**
	 * Database tracking changes mark.
	 * @protected
	 * @type {Boolean}
	 */
	isTrackChangesInDB: null,

	/**
	 * A flag is whether the entity is administered by operations.
	 * @protected
	 * @type {Boolean}
	 */
	administratedByOperations: null,

	/**
	 * A flag is whether the entity is administered by columns.
	 * @protected
	 * @type {Boolean}
	 */
	administratedByColumns: null,

	/**
	 * A flag whether the entity is administered by records.
	 * @protected
	 * @type {Boolean}
	 */
	administratedByRecords: null,

	/**
	 * Sign that current entity uses master record rights.
	 * @protected
	 * @type {Boolean}
	 */
	useMasterRecordRights: null,

	/**
	 * Master record entity schema name.
	 * @protected
	 * @type {String}
	 */
	masterRecordSchemaName: null,

	/**
	 * List of columns of the entity.
	 * @protected
	 * @type {Terrasoft.core.collections.ObjectCollection}
	 */
	columns: null,

	/**
	 * The name of the column class.
	 * @protected
	 * @property {String} columnClassName
	 */
	columnClassName: "Terrasoft.EntitySchemaColumn",

	/**
	 * Primary column identifier.
	 * @protected
	 * @type {String}
	 */
	primaryColumnUId: null,

	/**
	 * Primary column identifier to display.
	 * @protected
	 * @type {String}
	 */
	primaryDisplayColumnUId: null,

	/**
	 * The identifier of the hierarchical column.
	 * @protected
	 * @type {String}
	 */
	hierarchyColumnUId: null,

	/**
	 * Primary column.
	 * @protected
	 * @type {Terrasoft.EntitySchemaColumn}
	 */
	primaryColumn: null,

	/**
	 * Primary column for display.
	 * @protected
	 * @type {Terrasoft.EntitySchemaColumn}
	 */
	primaryDisplayColumn: null,

	/**
	 * Hierarchical column.
	 * @protected
	 * @type {Terrasoft.EntitySchemaColumn}
	 */
	hierarchyColumn: null,

	//endregion

	//region Methods: Public

	/**
	 * Initializes the elements of the entity.
	 * @param config A configuration object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.columns = new Terrasoft.ObjectCollection();
		if (config.columns) {
			Terrasoft.each(config.columns.Items, function(columnConfig) {
				var column = this.createColumn(Ext.apply({}, columnConfig, {
					status: Terrasoft.ModificationStatus.NOT_MODIFIED
				}));
				this.addColumn(column);
				this.setSystemColumn(column);
			}, this);
		}
	},

	onColumnChange: function(columnChanges, column) {
		var changes = {
			columns: [columnChanges],
			column: column
		};
		this.fireEvent("changed", changes, this);
	},

	/**
	 * The function of creating a column.
	 * @param {Object} config The column settings object.
	 * @return {Terrasoft.EntitySchemaColumn} Created column.
	 */
	createColumn: function(config) {
		return Ext.create(this.columnClassName, Ext.apply({}, config, {
			status: Terrasoft.ModificationStatus.NEW
		}));
	},

	/**
	 * The function of adding a column.
	 * @throws {Terrasoft.NullOrEmptyException}
	 * throws an exception {@link Terrasoft.NullOrEmptyException} if the parameter is empty.
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * throws an exception {@link Terrasoft.UnsupportedTypeException} if not of the appropriate type.
	 * @param {Terrasoft.EntitySchemaColumn} column Column.
	 * @return {Terrasoft.EntitySchemaColumn} Added column.
	 */
	addColumn: function(column) {
		if (!column) {
			throw new Terrasoft.NullOrEmptyException();
		}
		Terrasoft.validateObjectClass(column, this.columnClassName);
		var currentColumnUId = column.getPropertyValue("uId");
		var newGuid = Terrasoft.generateGUID();
		var columnUId = (Ext.isEmpty(currentColumnUId)) ? newGuid : currentColumnUId;
		column.setPropertyValue("uId", columnUId);
		var newColumn = this.columns.add(columnUId, column);
		newColumn.on("changed", this.onColumnChange, this);
		if (column.getStatus() === Terrasoft.ModificationStatus.NEW) {
			var columnName = column.getPropertyValue("name");
			this.fireEvent("changed", {
				newColumns: [columnName]
			}, this);
		}
		return newColumn;
	},

	/**
	 * Deletes the column by ID.
	 * @param {String} uId The element Id.
	 */
	removeColumnByUId: function(uId) {
		var column = this.getColumnByUId(uId);
		column.setRemoved();
	},

	/**
	 * Searches the column for the identifier.
	 * @param {String} uId Column ID.
	 * @return {Terrasoft.EntitySchemaColumn} Column.
	 */
	findColumnByUId: function(uId) {
		return this.columns.find(uId);
	},

	/**
	 * Returns the column by ID.
	 * @throws {Terrasoft.ItemNotFoundException}
	 * throws an exception {@link Terrasoft.ItemNotFoundException} if an element with such an identifier is not found.
	 * @param {String} uId Column ID.
	 * @return {Terrasoft.EntitySchemaColumn} Column.
	 */
	getColumnByUId: function(uId) {
		return this.columns.get(uId);
	},

	/**
	 * Changes or sets parent schema.
	 * @param {String|Object} config Configuration object or parent schema unique id.
	 * @param {String} [config.uId] Parent schema unique id.
	 * @param {String} [config.packageUId] Package unique id.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	setParent: function(config, callback, scope) {
		var uId = null;
		var packageUId = null;
		if (Ext.isObject(config)) {
			uId = config.uId;
			packageUId = config.packageUId;
		} else {
			uId = config;
		}
		if (uId) {
			Terrasoft.EntitySchemaManager.validateSchemaAsParent(uId);
			this.clear();
			Terrasoft.EntitySchemaManager.findItemByUId(uId, function(item) {
				packageUId = packageUId || item.packageUId;
				item.getPackageInstance(packageUId, function(instance) {
					var serializableObject = {};
					instance.serializationInfo = instance.serializationInfo || {};
					instance.getSerializableObject(serializableObject);
					serializableObject.parentUId = serializableObject.uId;
					serializableObject.uId = this.uId;
					serializableObject.realUId = this.realUId;
					serializableObject.caption = this.caption ||
						Terrasoft.decodeLocalizableString(serializableObject.caption);
					serializableObject.description = this.description ||
						Terrasoft.decodeLocalizableString(serializableObject.description);
					serializableObject.administratedByRecords = this.administratedByRecords;
					serializableObject.administratedByColumns = this.administratedByColumns;
					serializableObject.administratedByOperations = this.administratedByOperations;
					serializableObject.useMasterRecordRights = this.useMasterRecordRights;
					serializableObject.masterRecordSchemaName = this.masterRecordSchemaName;
					delete serializableObject.name;
					delete serializableObject.isVirtual;
					delete serializableObject.extendParent;
					delete serializableObject.packageUId;
					Terrasoft.each(serializableObject.columns.items, function(column) {
						column.caption = Terrasoft.decodeLocalizableString(column.caption);
						column.description = Terrasoft.decodeLocalizableString(column.description);
						column.isInherited = true;
						column.status = Terrasoft.ModificationStatus.NOT_MODIFIED;
					}, this);
					this.serializationInfo = this.serializationInfo || {};
					var itemColumns = this.getSerializableProperty(this.columns);
					serializableObject.columns.Items = Ext.apply(serializableObject.columns.items, itemColumns.items);
					this.constructor(serializableObject);
					this.fireEvent("changed", serializableObject, this);
					callback.call(scope);
				}, this);
			}, this);
		} else {
			this.clear();
			this.setPropertyValue("parentUId", null);
			callback.call(scope);
		}
	},

	/**
	 * Defines entity schema.
	 */
	define: function() {
		var schemaName = this.name;
		var primaryColumn = this.primaryColumn;
		var primaryDisplayColumn = this.primaryDisplayColumn;
		var schemaCaption = this.getLczValue(this.caption);
		var columns = this.getEntitySchemaColumnList();
		var className = Ext.String.format("Terrasoft.data.models.{0}", schemaName);
		var alternateClassName = Ext.String.format("Terrasoft.{0}", schemaName);
		Ext.define(className, {
			"extend": "Terrasoft.BaseEntitySchema",
			"alternateClassName": alternateClassName,
			"singleton": true,
			"uId": this._getBaseUId(),
			"name": schemaName,
			"caption": schemaCaption,
			"administratedByRecords": this.administratedByRecords,
			"administratedByOperations": this.administratedByOperations,
			"useMasterRecordRights": this.useMasterRecordRights,
			"masterRecordSchemaName": this.masterRecordSchemaName,
			"primaryColumnName": primaryColumn && primaryColumn.name,
			"primaryDisplayColumnName": primaryDisplayColumn && primaryDisplayColumn.name,
			"columns": columns
		});
		define(schemaName, ["terrasoft"], function(Terrasoft) {
			return Terrasoft[schemaName];
		});
	},

	/**
	 * Discards schema definition.
	 */
	undef: function() {
		requirejs.undef(this.name);
	},

	// endregion

	//region Methods: Protected

	/**
	 * Copies properties for serialization to serializable object. Implements mixin interface.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serializable object.
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.columns = this.getSerializableProperty(this.columns);
	},

	/**
	 * Sets system columns.
	 * @protected
	 * @param {Terrasoft.EntitySchemaColumn} column Column.
	 */
	setSystemColumn: function(column) {
		if (column.uId === this.primaryColumnUId) {
			this.primaryColumn = column;
		}
		if (column.uId === this.primaryDisplayColumnUId) {
			this.primaryDisplayColumn = column;
		}
		if (column.uId === this.hierarchyColumnUId) {
			this.hierarchyColumn = column;
		}
	},

	/**
	 * Clear schema.
	 * @protected
	 */
	clear: function() {
		if (this.columns) {
			var inheritedColumns = this.columns.filterByFn(function(column) {
				return column.getPropertyValue("isInherited");
			}, this);
			inheritedColumns.eachKey(function(columnKey, inheritedColumn) {
				this.columns.removeByKey(columnKey);
				inheritedColumn.destroy();
				switch (columnKey) {
					case this.primaryColumnUId:
						this.primaryColumnUId = null;
						this.primaryColumn = null;
						break;
					case this.primaryDisplayColumnUId:
						this.primaryDisplayColumnUId = null;
						this.primaryDisplayColumn = null;
						break;
					case this.hierarchyColumnUId:
						this.hierarchyColumnUId = null;
						this.hierarchyColumn = null;
						break;
				}
			}, this);
		}
	},

	/**
	 * Returns localizable value.
	 * @protected
	 * @param {Object|String} columnValue Source value.
	 * @return {String} Localizable value.
	 */
	getLczValue: function(columnValue) {
		return (columnValue || "").toString();
	},

	/**
	 * Returns reference schema column list.
	 * @protected
	 * @return {Object} Reference schema column list.
	 */
	getEntitySchemaColumnList: function() {
		const response = {};
		if (this.columns) {
			this.columns.each((column) => {
				const name = column.name;
				const dataValueType = column.dataValueType;
				const caption = this.getLczValue(column.caption);
				const columnReferenceSchemaUId = column.referenceSchemaUId;
				const isLookup = Terrasoft.isLookupDataValueType(dataValueType);
				const entitySchemaColumn = {
					uId: column.uId,
					name: name,
					caption: caption,
					dataValueType: dataValueType,
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					usageType: column.usageType,
					isInherited: column.isInherited,
					columnPath: column.name,
					isLookup: isLookup
				};
				response[name] = entitySchemaColumn;
				if (isLookup && columnReferenceSchemaUId) {
					entitySchemaColumn.referenceSchemaUId = columnReferenceSchemaUId;
					const managerItem = Terrasoft.EntitySchemaManager.getItem(columnReferenceSchemaUId);
					const referenceSchemaName = managerItem.name;
					entitySchemaColumn.referenceSchema = {name: referenceSchemaName};
					entitySchemaColumn.referenceSchemaName = referenceSchemaName;
				}
			});
		}
		return response;
	},

	/**
	 * Returns caption path from given meta path.
	 * @param {String} metaPath Meta path.
	 * @param {Function} callback Callback.
	 * @param {Object} scope Callback scope.
	 */
	getColumnCaptionPathByMetaPath: function(metaPath, callback, scope) {
		Terrasoft.SchemaDesignerUtilities.getColumnCaptionPathByMetaPath(metaPath, callback, scope);
	},

	/**
	 * Returns meta path from given caption path.
	 * @param {String} captionPath Caption path.
	 * @param {Function} callback Callback.
	 * @param {Object} scope Callback scope.
	 */
	getColumnMetaPathByCaptionPath: function(captionPath, callback, scope) {
		var caption = this.getCaption();
		captionPath = caption + "." + captionPath;
		Terrasoft.SchemaDesignerUtilities.getColumnMetaPathByCaptionPath(captionPath, callback, scope);
	},

	/**
	 * Filters columns by data value type and reference schema if need.
	 * @param {Object} filter Filtration object.
	 * @param {Terrasoft.DataValueType} filter.dataValueType Data value type.
	 * @param {String} filter.referenceSchemaUId Reference schema uid.
	 * @return {Terrasoft.Collection} Filtered columns.
	 */
	findColumnsByType: function(filter) {
		if (!filter) {
			return this.columns;
		}
		var filterFn;
		if (filter.dataValueType !== Terrasoft.DataValueType.LOOKUP) {
			filterFn = function(column) {
				return column.dataValueType === filter.dataValueType;
			};
		} else {
			filterFn = function(column) {
				return column.dataValueType === filter.dataValueType && column.referenceSchemaUId === filter.referenceSchemaUId;
			};
		}
		return this.columns.filterByFn(filterFn, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchema#isNew
	 * @override
	 */
	isNew: function() {
		var item = Terrasoft.EntitySchemaManager.findRootSchemaItemByName(this.name);
		return item && item.isNew();
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchema#canDesignSchema
	 * @override
	 */
	canDesignSchema: function() {
		return !this.isDBView;
	},

	// endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_getBaseUId: function() {
		const baseSchema = Terrasoft.EntitySchemaManager.items.findByFn(function(item) {
			return item.extendParent === false && item.name === this.name;
		}, this);
		const baseSchemaUId = baseSchema && baseSchema.uId;
		return baseSchemaUId || this.uId;
	}

	// endregion

});
