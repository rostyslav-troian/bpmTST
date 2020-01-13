/**
 */
Ext.define("Terrasoft.manager.EntitySchemaManager", {
	extend: "Terrasoft.manager.BaseSchemaManager",
	alternateClassName: "Terrasoft.EntitySchemaManager",
	singleton: true,

	//region Properties: Protected

	/**
	 * Manager class name.
	 * @protected
	 * @property {String} itemClassName
	 */
	itemClassName: "Terrasoft.EntitySchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @protected
	 * @override
	 */
	managerName: "EntitySchemaManager",

	/**
	 * Maximum entity schema name length.
	 * @protected
	 * @property {Number} maxEntitySchemaNameLength
	 */
	maxEntitySchemaNameLength: null,

	/**
	 * @inheritdoc BaseSchemaManager#entitySchemaName
	 * @protected
	 * @override
	 */
	entitySchemaName: "VwSysEntitySchemaInWorkspace",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#outdatedEventName
	 * @override
	 */
	outdatedEventName: "EntitySchema_Outdated",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#useNotification
	 * @override
	 */
	useNotification: true,

	//endregion

	//region Methods: Protected

	/**
	 * Updates schema position in array.
	 * @param {String[]} changedSchemaUIds Identifier array of changed entity schema manager elements.
	 * @param {Terrasoft.EntitySchema} changedSchema Changed entity schema.
	 * @return {String[]} Identifier array of changed entity schema manager elements.
	 */
	processSchemaSequence: function(changedSchemaUIds, changedSchema) {
		var changedSchemaUId = changedSchema.getPropertyValue("uId");
		var changedSchemaColumns = changedSchema.getPropertyValue("columns");
		var changedSchemaUIdIndex = changedSchemaUIds.indexOf(changedSchemaUId);
		var skipColumnNames = ["CreatedBy", "ModifiedBy"];
		changedSchemaColumns.each(function(column) {
			var columnName = column.getPropertyValue("name");
			if (!Terrasoft.contains(skipColumnNames, columnName)) {
				var columnDataValueType = column.getPropertyValue("dataValueType");
				var lookupDataValueTypes = [Terrasoft.DataValueType.LOOKUP, Terrasoft.DataValueType.IMAGELOOKUP];
				if (Terrasoft.contains(lookupDataValueTypes, columnDataValueType)) {
					var columnReferenceSchemaUId = column.getPropertyValue("referenceSchemaUId");
					var columnReferenceSchemaUIdIndex = changedSchemaUIds.indexOf(columnReferenceSchemaUId);
					if (columnReferenceSchemaUIdIndex > changedSchemaUIdIndex) {
						var element = changedSchemaUIds[columnReferenceSchemaUIdIndex];
						changedSchemaUIds.splice(columnReferenceSchemaUIdIndex, 1);
						changedSchemaUIds.unshift(element);
					}
				}
			}
		}, this);
		return changedSchemaUIds;
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#getSaveSequence.
	 * @protected
	 * @override
	 */
	getSaveSequence: function(changedItems, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.getInstances(changedItems, next, this);
			},
			function(next, changedInstances) {
				var changedItemsUIds = [];
				Terrasoft.each(changedItems, function(changedItem) {
					changedItemsUIds.push(changedItem.getUId());
				}, this);
				Terrasoft.each(changedInstances, function(changedInstance) {
					changedItemsUIds = this.processSchemaSequence(changedItemsUIds, changedInstance);
				}, this);
				var saveSchemaInstance = [];
				Terrasoft.each(changedItemsUIds, function(changedItemUId) {
					var getItemByUId = function(item) {
						return item.getUId() === changedItemUId;
					};
					saveSchemaInstance.push(Ext.Array.findBy(changedItems, getItemByUId, this));
				}, this);
				saveSchemaInstance = saveSchemaInstance.reverse();
				callback.call(scope, saveSchemaInstance);
			},
			this
		);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#getDesignSchemaRequestParameters.
	 * @protected
	 * @override
	 */
	getDesignSchemaRequestParameters: function() {
		return {
			contractName: "DesignEntitySchemaRequest",
			responseClassName: "Terrasoft.EntitySchemaResponse"
		};
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#constructor.
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		Ext.apply(this.propertyColumnNames, {
			needUpdateStructure: "NeedUpdateStructure",
			isVirtual: "IsVirtual"
		});
		this.maxEntitySchemaNameLength = Terrasoft.SysValue.MAX_ENTITY_SCHEMA_NAME_LENGTH;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManager#initItems
	 * @override
	 */
	initItems: function(items) {
		this.initServiceItems(items);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManager#queryItems
	 * @override
	 */
	queryItems: function(callback, scope) {
		var request = new Terrasoft.BaseRequest({
			contractName: "EntitySchemaManagerRequest"
		});
		return request.execute(callback, scope);
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns the maximum allowed length of the schema name of the object.
	 * @return {Number} The maximum allowed length for the schema name of the object.
	 */
	getMaxEntitySchemaNameLength: function() {
		this._checkInitialized();
		return this.maxEntitySchemaNameLength;
	},

	/**
	 * @private
	 */
	_getNeedUpdateManagerItems: function(packageUId) {
		return this.items.filterByFn((item) => {
			var result = item.getNeedUpdateStructure();
			return packageUId
				? result && (item.getPackageUId() === packageUId)
				: result;
		});
	},

	/**
	 * @private
	 */
	_getNeedUpdateStructureItems: function(config, callback, scope) {
		const packageUId = config && config.packageUId;
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: this.entitySchemaName
		});
		esq.addColumn("UId");
		esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
			this.sysWorkspaceColumnPath, Terrasoft.SysValue.CURRENT_WORKSPACE.value));
		if (packageUId) {
			esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "PackageUId", config.packageUId));
		}
		esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
			Terrasoft.ComparisonType.EQUAL, "NeedUpdateStructure", true));
		const items = this._getNeedUpdateManagerItems(packageUId);
		return esq.getEntityCollection(function(response) {
			response.collection.each((row) => {
				const uId = row.get("UId");
				const item = this.items.find(uId);
				if (item) {
					items.add(item);
				}
			});
			return Ext.callback(callback, scope, [items]);
		}, this);
	},

	/**
	 * @private
	 */
	_checkInitialized: function() {
		if (!this.isInitialized) {
			throw new Terrasoft.InvalidObjectState();
		}
	},

	/**
	 * Returns item caption.
	 * @private
	 * @param {Terrasoft.EntitySchemaManagerItem} item Entity schema item.
	 * @return Entity schema item caption.
	 */
	_getItemCaption: function(item) {
		return item.getCaption();
	},

	/**
	 * Returns item name.
	 * @private
	 * @param {Terrasoft.EntitySchemaManagerItem} item Entity schema item.
	 * @return Entity schema item name.
	 */
	_getItemName: function(item) {
		return item.getName();
	},

	/**
	 * Finds entity schema item by value.
	 * @private
	 * @param {Object} value Value.
	 * @param {Function} predicate Predicate function.
	 * @return {Terrasoft.EntitySchemaManagerItem|null} Entity schema item.
	 */
	_findItemByValue: function(value, predicate) {
		var filteredCollection = Terrasoft.EntitySchemaManager.items.filterByFn((item) =>
			(!item.getExtendParent() && (predicate(item) === value)));
		return filteredCollection.isEmpty() ? null : filteredCollection.getByIndex(0);
	},

	/**
	 * Updates the database structure for schema updates that require updates.
	 * @param {Object} config The configuration object.
	 * @param {String} config.packageUId Package ID.
	 * If the package ID is specified, then the package schema will be updated. Otherwise, end.
	 * @param {Function} next Callback function.
	 * @param {Object} scope The context for executing the next function.
	 * @return {Terrasoft.BaseResponse} Response to update the database structure.
	 */
	updateDBStructure: function(config, next, scope) {
		this._checkInitialized();
		this._getNeedUpdateStructureItems(config, function(needUpdateItems) {
			if (needUpdateItems.isEmpty()) {
				return Ext.callback(next, scope);
			}
			this.getSaveSequence(needUpdateItems.getItems(), function(sequence) {
				const items = [];
				Terrasoft.each(sequence, (item) => items.push(item.getUId()));
				return Terrasoft.SchemaDesignerUtilities.saveSchemaDBStructure(items, function(response) {
					needUpdateItems.each((item) => { item.needUpdateStructure = false; });
					return Ext.callback(next, scope, [response]);
				}, this);
			}, this);
		}, this);
	},

	/**
	 * Finds schema by caption in Terrasoft.EntitySchemaManager.items.
	 * If schema not found, returns null.
	 * @param {String} caption Schema display name.
	 * @return {Terrasoft.EntitySchemaManagerItem|null} Entity schema item.
	 */
	findItemByCaption: function(caption) {
		return this._findItemByValue(caption, this._getItemCaption);
	},

	/**
	 * Finds schema by name in Terrasoft.EntitySchemaManager.items.
	 * If schema not found, returns null.
	 * @param {String} name Schema name.
	 * @return {Terrasoft.EntitySchemaManagerItem|null} Entity schema item.
	 */
	findItemByName: function(name) {
		return this._findItemByValue(name, this._getItemName);
	},

	/**
	 * Returns schema of current package by schema UId.
	 * @param {String} schemaUId Parent schema UId.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	getCurrentPackageSchemaByUId: function(schemaUId, callback, scope) {
		Terrasoft.PackageManager.getCurrentPackageUId(function(packageUId) {
			this.getPackageSchemaInstanceBySchemaUId(schemaUId, packageUId, callback, scope);
		}, this);
	}

	//endregion

});
