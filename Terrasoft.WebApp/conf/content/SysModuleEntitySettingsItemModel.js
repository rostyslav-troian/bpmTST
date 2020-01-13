Terrasoft.configuration.Structures["SysModuleEntitySettingsItemModel"] = {innerHierarchyStack: ["SysModuleEntitySettingsItemModel"]};
define("SysModuleEntitySettingsItemModel", ["ext-base", "terrasoft", "SysModuleEntitySettingsItemModelResources",
	"BaseSchemaViewModel", "LookupQuickAddMixin"
], function(Ext, Terrasoft, resources) {

	/**
	 * Class for SysModuleEntitySettings item model.
	 */
	Ext.define("Terrasoft.configuration.SysModuleEntitySettingsItemModel", {
		extend: "Terrasoft.configuration.BaseSchemaViewModel",
		alternateClassName: "Terrasoft.SysModuleEntitySettingsItemModel",

		/**
		 * Type column name
		 * @private
		 * @type {String}
		 */
		typeColumnName: "Type",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			var typeColumnName = this.getTypeColumnName();
			this.set(typeColumnName + "List", new Terrasoft.Collection());
			this.mixins.LookupQuickAddMixin.init.call(this);
		},

		/**
		 * @inheritdoc Terrasoft.LookupQuickAddMixin#isSilentCreation
		 * @override
		 */
		isSilentCreation: function() {
			return true;
		},

		/**
		 * Returns type column name
		 * @protected
		 * @return {String}
		 */
		getTypeColumnName: function() {
			return this.typeColumnName || "Type";
		},

		/**
		 * @inheritdoc Terrasoft.LookupQuickAddMixin#onLookupDataLoaded
		 * @override
		 */
		onLookupDataLoaded: function(config) {
			config.isLookupEdit = true;
			this.callParent(arguments);
			this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLookupChange
		 * @override
		 */
		onLookupChange: function(newValue, columnName) {
			var settingsModel = this.get("SettingsModel");
			if (newValue && newValue.isNewValue && settingsModel.getIsNewTypeEntitySchema()) {
				var value = settingsModel.addTypeRecordInDataManager(newValue.displayValue);
				this.set(columnName, value);
			} else {
				this.callParent([Terrasoft.deepClone(newValue), columnName]);
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#loadLookupData
		 * @override
		 */
		loadLookupData: function(filterValue, list, columnName, isLookupEdit, callback, scope) {
			var settingsModel = this.get("SettingsModel");
			if (settingsModel.getIsNewTypeEntitySchema()) {
				settingsModel.getTypeRecordsFromDataManager(filterValue, function(collection) {
					list.clear();
					var objects = {};
					var config = {
						collection: collection,
						filterValue: filterValue,
						objects: objects,
						columnName: columnName,
						isLookupEdit: isLookupEdit
					};
					this.onLookupDataLoaded(config);
					list.loadAll(objects);
				}, this);
			} else {
				if (!this.Ext.isFunction(callback)) {
					callback = null;
				}
				this.callParent([filterValue, list, columnName, isLookupEdit, callback, scope]);
			}
		},
		/**
		 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
		 * @override
		 */
		getLookupQuery: function(filterValue, columnName) {
			var esq = this.callParent(arguments);
			var settingsModel = this.get("SettingsModel");
			var gridData = settingsModel.getGridData();
			var useTypes = [];
			var currentId = this.get("Id");
			Terrasoft.each(gridData.getItems(), function(item) {
				var column = item.get(columnName);
				var columnValue = column ? column.value : null;
				if (columnValue && item.get("Id") !== currentId && !this.Ext.Array.contains(useTypes, columnValue)) {
					useTypes.push(columnValue);
				}
			}, this);
			var filter = Terrasoft.createColumnInFilterWithParameters("Id", useTypes);
			filter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
			esq.filters.add("notUsedValueFilter", filter);
			return esq;
		},

		/**
		 * @inheritdoc Terrasoft.LookupQuickAddMixin#getCantOpenPageMessage
		 * @override
		 */
		getCantOpenPageMessage: function() {
			return resources.localizableStrings.CanCreateOnlyInLookupSectionErrorMessage;
		},

		/**
		 * Method saved viewModel changes.
		 * @protected
		 * @param {Object} config Config.
		 * @param {Function} config.callback Callback method.
		 * @param {Object} config.scope Callback method context.
		 */
		save: function(config) {
			if (this.validate()) {
				var callback = config.callback;
				var scope = config.scope;
				this.set("EmptyAcceptedType", false);
				this.changedValues = {};
				this.set("IsChanged", false);
				this.isNew = false;
				if (callback) {
					callback.call(scope);
				}
			}
		}
	});
});


