/**
 */
Ext.define("Terrasoft.data.queries.UpdatePackageSchemaDataRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.UpdatePackageSchemaDataRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName.
	 * @override
	 */
	contractName: "UpdatePackageSchemaDataRequest",

	/**
	 * Columns to update package data.
	 * @protected
	 * @type {Array}
	 */
	columns: null,

	/**
	 * Columns to force update package data.
	 * @protected
	 * @type {Array}
	 */
	forceUpdateColumns: null,

	/**
	 * Entity schema name.
	 * @protected
	 * @type {String}
	 */
	entitySchemaName: null,

	/**
	 * Record list.
	 * @protected
	 * @type {Array}
	 */
	recordList: null,

	/**
	 * Package UId.
	 * @protected
	 * @type {String}
	 */
	packageUId: null,

	/**
	 * Package schema data name.
	 * @protected
	 * @type {String}
	 */
	packageSchemaDataName: null,

	/**
	 * Entity schema.
	 * @protected
	 * @type {Terrasoft.BaseEntitySchema}
	 */
	entitySchema: null,

	// endregion

	// region Methods: Private

	/**
	 * Creates serialized server filters for package schema data.
	 * @private
	 * @return {Object} Server filters.
	 */
	//TODO: #CRM-31712
	_createSerializedServerFilters: function() {
		if (!Ext.isEmpty(this.entitySchema)) {
			var entitySchemaUId = this.entitySchema.uId;
			var primaryColumn = this.entitySchema.primaryColumn;
			var guidDataValueTypeUId = Terrasoft.convertToServerDataValueType(Terrasoft.DataValueType.GUID);
			var filterItems = this.recordList.map(function(itemId) {
				var parameterValue = Ext.String.format("\"{0}\"", itemId);
				return {
					_isFilter: true,
					_filterSchemaUId: entitySchemaUId,
					uId: Terrasoft.generateGUID(),
					leftExpression: {
						expressionType: "SchemaColumn",
						metaPath: primaryColumn.uId,
						caption: primaryColumn.caption,
						dataValueType: {
							id: guidDataValueTypeUId,
							name: "Guid",
							isNumeric: false,
							editor: {
								controlTypeName: "TextEdit",
								controlXType: "textedit"
							},
							useClientEncoding: false
						}
					},
					comparisonType: "Equal",
					rightExpression: {
						expressionType: "Parameter",
						dataValueType: {
							id: guidDataValueTypeUId,
							name: "Guid",
							isNumeric: false,
							editor: {
								controlTypeName: "TextEdit",
								controlXType: "textedit"
							},
							useClientEncoding: false
						},
						parameterValues: [{
							displayValue: parameterValue,
							parameterValue: parameterValue
						}]
					}
				};
			}, this);
			return JSON.stringify({
				_isFilter: false,
				uId: Terrasoft.generateGUID(),
				name: "FilterEdit",
				logicalOperation: "Or",
				items: filterItems
			});
		}
	},

	// endregion

	// region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate
	 * @override
	 */
	validate: function() {
		Terrasoft.each(["entitySchemaName", "packageSchemaDataName", "packageUId"], function(property) {
			if (Ext.isEmpty(this[property])) {
				throw new Terrasoft.NullOrEmptyException({
					message: property
				});
			}
		}, this);
		if (!Ext.isArray(this.recordList)) {
			throw new Terrasoft.UnsupportedTypeException({
				message: "recordList"
			});
		}
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		serializableObject.entitySchemaName = this.entitySchemaName;
		serializableObject.recordList = this.recordList;
		serializableObject.packageUId = this.packageUId;
		serializableObject.packageSchemaDataName = this.packageSchemaDataName;
		serializableObject.serializedFilters = this._createSerializedServerFilters();
		serializableObject.columns = this.columns;
		serializableObject.forceUpdateColumns = this.forceUpdateColumns;
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritDoc Terrasoft.BaseRequest#constructor
	 * @override
	 */
	constructor: function() {
		this.columns = [];
		this.callParent(arguments);
	}

	// endregion

});
