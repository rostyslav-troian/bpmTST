Terrasoft.configuration.Structures["StructureExplorerMainViewModel"] = {innerHierarchyStack: ["StructureExplorerMainViewModel"]};
define('StructureExplorerMainViewModelStructure', ['StructureExplorerMainViewModelResources'], function(resources) {return {schemaUId:'7c70f4f8-1094-4f86-9bba-e2dabeb64abe',schemaCaption: "StructureExplorerMainViewModel", parentSchemaName: "", schemaName:'StructureExplorerMainViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("StructureExplorerMainViewModel", [
	"StructureExplorerUtilities",
	"MaskHelper",
	"EntityStructureHelper",
	"ConfigurationEnums",
	"StructureExplorerViewModelItem"
], function(StructureExplorerUtilities, MaskHelper, EntityStructureHelper, ConfigurationEnums) {
	/**
	 * Class for StructureExplorerMainViewModel.
	 */
	Ext.define("Terrasoft.configuration.StructureExplorerMainViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.StructureExplorerMainViewModel",

		sandbox: null,

		viewModelCollection: null,

		rootItemIdentifier: null,

		params: null,

		columns: {
			EntitySchemaColumn: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			EntitySchemaColumnList: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			ExpandVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			/**
			 * Sign that util panel with buttons is visible.
			 */
			IsUtilPanelVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			/**
			 * Sign that bottom panel is visible.
			 */
			IsBottomPanelVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			RemoveVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			ComboBoxListEnabled: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			entitySchema: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			caption: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "..."
			}
		},

		messages: {
			/**
			 * @message GetAdditionalColumns
			 */
			"GetAdditionalColumns": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		//region Methods: Private

		_initParameters: function() {
			var params = this.sandbox.publish("StructureExplorerInfo", null, [this.sandbox.id]);
			if (params === null) {
				params = {
					summaryColumnsOnly: false,
					useBackwards: true,
					firstColumnsOnly: false,
					expandLevel: -1
				};
			}
			params.sa = this.sandbox;
			var defDisplayId = Ext.isBoolean(params.displayId) ? params.displayId : !params.firstColumnsOnly;
			params.displayId = params.summaryColumnsOnly
				? false
				: defDisplayId;
			this.params = params;
		},

		_removeItemsByKey: function(index) {
			while (this.viewModelCollection.contains(index)) {
				this.fireEvent("removeItem", index);
				this.viewModelCollection.removeByKey(index).destroy();
				index++;
			}
		},

		_createItemViewModel: function() {
			const item = new Terrasoft.StructureExplorerViewModelItem({
				sandbox: this.sandbox
			});
			this._subscribeItemEvents(item);
			return item;
		},

		_subscribeItemEvents: function(item) {
			item.on("entityColumnItemChange", this.onEntityColumnItemChange, this);
			item.on("expandItem", this.onExpandItem, this);
			item.on("removeItem", this.onRemoveItem, this);
			item.on("closeItem", this.onCloseItem, this);
		},

		_unSubscribeItemEvents: function(item) {
			item.un("entityColumnItemChange", this.onEntityColumnItemChange, this);
			item.un("expandItem", this.onExpandItem, this);
			item.un("removeItem", this.onRemoveItem, this);
			item.un("closeItem", this.onCloseItem, this);
		},

		_removeItemsByViewModel: function(viewModel, offset) {
			var index = viewModel.get("elementKey") + offset;
			while (this.viewModelCollection.contains(index)) {
				var item = this.viewModelCollection.get(index);
				this._unSubscribeItemEvents(item);
				this.viewModelCollection.removeByKey(index).destroy();
				this.fireEvent("removeItem", index);
				index++;
			}
		},

		_updateAfterRemovingItem: function(itemViewModel) {
			itemViewModel.set("ExpandVisible", true);
			itemViewModel.set("RemoveVisible", false);
			itemViewModel.set("ComboBoxListEnabled", true);
			this.set("ComboBoxListEnabled", true);
			this.set("EntitySchemaColumn", null);
			var identifier;
			if (itemViewModel === this) {
				identifier = this.rootItemIdentifier;
			} else {
				var comboBoxValue = itemViewModel.get("EntitySchemaColumn");
				identifier = comboBoxValue;
			}
			this.setSourceItems(identifier);
		},

		_getLastViewModel: function() {
			var collection = this.viewModelCollection;
			var lastIndex = collection.getCount() - 1;
			if (lastIndex === -1) {
				return this;
			}
			return collection.get(lastIndex);
		},

		_getLastSelectedSchemaName: function() {
			var lastIndex = this.viewModelCollection.getCount() - 1;
			if (lastIndex === -1) {
				return this.rootItemIdentifier;
			}
			return this.viewModelCollection.get(lastIndex).get("EntitySchemaColumn");
		},

		_showFilterColumn: function(columnName) {
			var col = this.get("EntitySchemaColumnList").collection.items;
			for (var k = 0; k < col.length; k++) {
				if (col[k].columnName === columnName) {
					this.set("EntitySchemaColumn", col[k]);
					break;
				}
			}
		},

		_hasBackwardElements: function() {
			var pathItems = this.viewModelCollection.getItems();
			for (var i = 0; i < pathItems.length; i++) {
				var pathItem = pathItems[i].get("EntitySchemaColumn");
				if (pathItem && pathItem.isBackward) {
					return true;
				}
			}
			return false;
		},

		initRootItemIdentifier: function() {
			if (typeof this.params.schemaName !== "undefined") {
				this.rootItemIdentifier = {referenceSchemaName: this.params.schemaName};
			} else {
				var schemaName = this.sandbox.publish("GetStructureExplorerSchemaName", null, [this.sandbox.id]);
				if (schemaName) {
					this.rootItemIdentifier = {referenceSchemaName: schemaName};
				} else {
					var historyState = this.sandbox.publish("GetHistoryState");
					this.rootItemIdentifier = {referenceSchemaName: historyState.hash.entityName};
				}
			}
		},

		_showFilterTree: function(vModel, filterItems, position) {
			vModel.set("ExpandVisible", false);
			vModel.set("RemoveVisible", true);
			vModel.set("ComboBoxListEnabled", false);
			this.set("ComboBoxListEnabled", false);
			this.set("EntitySchemaColumn", null);
			var itemViewModel = this._createItemViewModel();
			var lastSelectedSchemaName = this._getLastSelectedSchemaName();
			this.setItemChildren(lastSelectedSchemaName, itemViewModel, function() {
				this.addItem(itemViewModel);
				var obj = itemViewModel.get("EntitySchemaColumnList").collection.items;
				for (var j = 0; j < obj.length; j++) {
					if (obj[j].columnName === filterItems[position]) {
						itemViewModel.set("EntitySchemaColumn", obj[j]);
						this.rootItemIdentifier.referenceSchemaName = obj[j].referenceSchemaName;
						break;
					}
				}
				position++;
				var isLastColumn = position === filterItems.length - 1;
				if (isLastColumn) {
					var lastColumnName = filterItems[position];
					this.setSourceItems(this._getLastSelectedSchemaName(), function() {
						this._showFilterColumn(lastColumnName);
					}, this);
				} else {
					this._showFilterTree(itemViewModel, filterItems, position);
				}
			}, this);
		},

		_getFilterPathArray: function(config) {
			var filterPath = this.params.columnPath.split(".");
			var primaryColumnIndex = filterPath.indexOf("Id", -1);
			if (primaryColumnIndex > -1) {
				filterPath.splice(primaryColumnIndex, 1);
			}
			if (config.isAggregative) {
				var aggregativeColumnName = this._getAggregationColumnName(config);
				if (aggregativeColumnName) {
					filterPath.push(aggregativeColumnName);
				}
			}
			return filterPath;
		},

		_getAggregationColumnName: function(config) {
			var aggregationColumnName;
			var aggregationType = config.leftExpressionAggregationType;
			var filterType = config.leftExpressionFilterType;
			if (aggregationType && aggregationType === Terrasoft.AggregationType.COUNT) {
				aggregationColumnName = ConfigurationEnums.AggregationFunction.COUNT;
			} else if (filterType && filterType === Terrasoft.FilterType.EXISTS) {
				aggregationColumnName = ConfigurationEnums.AggregationFunction.EXISTS;
			}
			return aggregationColumnName;
		},

		//endregion

		//region Methods: Public

		onEntityColumnItemChange: function(item, value) {
			if (this.viewModelCollection.getCount() === this.params.expandLevel) {
				item.set("ExpandVisible", false);
			}
			if (!value) {
				this.set("ComboBoxListEnabled", false);
			} else {
				this.setSourceItems(value, function() {
					this.set("ComboBoxListEnabled", true);
				}, this);
			}
			this.set("EntitySchemaColumn", null);
		},

		onCancelClick: function() {
			Terrasoft.StructureExplorerUtilities.closeModalBox();
		},

		/**
		 * Loads sorted list items.
		 * @param {Object} filter Filters.
		 * @param {Terrasoft.Collection} list The data for the drop-down list.
		 */
		getItems: function(filter, list) {
			var entitySchema = this.get("entitySchema");
			list.sortByFn(function(a, b) {
				var primaryColumnName = entitySchema && entitySchema.primaryColumnName;
				if (primaryColumnName) {
					if (a.columnName === primaryColumnName) {
						return 1;
					}
					if (b.columnName === primaryColumnName) {
						return -1;
					}
				}
				return a.order - b.order === 0
					? a.displayValue.localeCompare(b.displayValue)
					: a.order - b.order;
			});
			list.loadAll({});
		},

		onKeyDown: function(event) {
			if (event) {
				var key = event.getKey();
				if (key === event.ENTER && this.get("EntitySchemaColumn")) {
					this.select();
				}
			}
		},

		select: function() {
			var pathItems = this.viewModelCollection.getItems();
			var response = {
				path: [],
				metaPath: [],
				caption: [],
				isBackward: false
			};

			let backwardReferenceSchemaName = "";
			for (let i = 0; i < pathItems.length; i++) {
				const isPathItemValid = pathItems[i].validate();
				if (!isPathItemValid) {
					MaskHelper.HideBodyMask();
					return;
				}
				const pathItem = pathItems[i].get("EntitySchemaColumn");
				response.metaPath[response.metaPath.length] = pathItem.value;
				response.path[response.path.length] = pathItem.columnName;
				response.caption[response.caption.length] = pathItem.displayValue;
				if (pathItem.isBackward) {
					response.isBackward = true;
					backwardReferenceSchemaName = pathItem.referenceSchemaName;
					if (pathItems.length > 1) {
						response.hideFilter = true;
					}
				}
			}
			const isValid = this.validate();
			if (!isValid) {
				MaskHelper.HideBodyMask();
				return;
			}
			const columnValue = this.get("EntitySchemaColumn");
			if (columnValue) {
				if (columnValue.selectedConfig) {
					response.selectedConfig = columnValue.selectedConfig;
				}
				if (columnValue.isAggregative) {
					response.aggregationFunction = columnValue.aggregationFunction;
					response.isAggregative = true;
					response.leftExpressionCaption = response.caption.join(".");
					var lastPathElement = response.path[response.path.length - 1];
					var columnIsNotSelectedRegExp = new RegExp("]$", "ig");
					if (columnIsNotSelectedRegExp.test(lastPathElement)) {
						response.path.push("Id");
					}
				} else {
					response.metaPath[response.metaPath.length] = columnValue.value;
					response.path[response.path.length] = columnValue.columnName;
					response.caption[response.caption.length] = columnValue.displayValue;
					response.leftExpressionCaption = response.caption.join(".");
				}
				response.leftExpressionColumnPath = response.path.join(".");
				response.dataValueType = columnValue.dataValueType;
				if (columnValue.isLookup) {
					response.isLookup = columnValue.isLookup;
					response.referenceSchemaName = columnValue.referenceSchemaName;
				}
				if (!response.referenceSchemaName && backwardReferenceSchemaName) {
					response.referenceSchemaName = backwardReferenceSchemaName;
				}
			}
			this.sandbox.publish("ColumnSelected", this.modifySelectResponse(response), [this.sandbox.id]);
			StructureExplorerUtilities.Close();
		},

		/**
		 * Modifies structure explorer response.
		 * @protect
		 * @param {Object[]} response Structure explorer response.
		 */
		modifySelectResponse: function(response) {
			return response;
		},

		close: function() {
			this._removeItemsByKey(0);
			this.setSourceItems(this.rootItemIdentifier, function() {
				this.set("ExpandVisible", true);
				this.set("RemoveVisible", false);
				this.set("EntitySchemaColumn", null);
				this.set("ComboBoxListEnabled", true);
			}, this);
		},

		onRemoveItem: function(item) {
			this._removeItemsByViewModel(item, 0);
			var itemViewModel = this._getLastViewModel();
			this._updateAfterRemovingItem(itemViewModel);
		},

		onCloseItem: function(item) {
			this._removeItemsByViewModel(item, 1);
			this._updateAfterRemovingItem(item);
		},

		expand: function() {
			this.onExpandItem();
		},

		onExpandItem: function() {
			this.set("ExpandVisible", false);
			this.set("RemoveVisible", true);
			this.set("ComboBoxListEnabled", false);
			this.set("EntitySchemaColumn", null);
			var itemViewModel = this._createItemViewModel();
			var lastSelectedSchemaName = this._getLastSelectedSchemaName();
			this.setItemChildren(lastSelectedSchemaName, itemViewModel, function() {
				this.addItem(itemViewModel);
			}, this);
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.columns.EntitySchemaColumnList.value = new Terrasoft.Collection();
			this.viewModelCollection = new Terrasoft.BaseViewModelCollection();
			this.callParent(arguments);
			this.addEvents(
				"addItem",
				"removeItem"
			);
		},

		/**
		 * Initialize model.
		 * @protected
		 * @param {Function} [callback] Callback function.
		 * @param {Object} [scope] Execution context.
		 */
		init: function(callback, scope) {
			this.sandbox.registerMessages(this.messages);
			this._initParameters();
			this.columns.EntitySchemaColumn.isRequired = !this.params.allowEmptyResult;
			this.initRootItemIdentifier();
			var params = this.params;
			if (params.firstColumnsOnly) {
				this.set("ExpandVisible", false);
			}
			EntityStructureHelper.init(params);
			this.initRootSchema(function() {
				this.showFilters();
				callback.call(scope);
			}, this);
		},

		/**
		 * Init root schema.
		 * @protected
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		initRootSchema: function(callback, scope) {
			var params = this.params;
			var paramSchemaName = params.schemaName = this.rootItemIdentifier.referenceSchemaName;
			EntityStructureHelper.getItemCaption(this.rootItemIdentifier, function(name) {
				this.set("caption", name);
				if (Terrasoft[paramSchemaName]) {
					this.set("entitySchema", Terrasoft[paramSchemaName]);
				}
				this.setSourceItems(this.rootItemIdentifier, callback, scope);
			}, this);
		},

		/**
		 * Sets item children
		 * @protected
		 * @param {Object} identifier Identifier.
		 * @param {StructureExplorerViewModelItem} itemViewModel Item view model.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		setItemChildren: function(identifier, itemViewModel, callback, scope) {
			EntityStructureHelper.getChildren(identifier, function(items) {
				var list = itemViewModel.get("EntitySchemaColumnList");
				list.clear();
				list.collection.addAll(items);
				Ext.callback(callback, scope, [items]);
			}, scope || this);
		},

		/**
		 * Sets source items
		 * @protected
		 * @param {Object} identifier Identifier.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		setSourceItems: function(identifier, callback, scope) {
			EntityStructureHelper.getItems(identifier, function(items) {
				const entitySchema = this.get("entitySchema") || {};
				const additiionalColumns = this.sandbox.publish("GetAdditionalColumns",
					entitySchema.name, [this.sandbox.id]) || [];
				const list = this.get("EntitySchemaColumnList");
				list.clear();
				list.collection.addAll(items);
				list.collection.addAll(additiionalColumns);
				Ext.callback(callback, scope, [items]);
			}, this._hasBackwardElements(), this);
		},

		/**
		 * Shows filters.
		 * @protected
		 */
		showFilters: function() {
			var params = this.params;
			if (params.columnPath) {
				var filterPath = this._getFilterPathArray(params);
				if (filterPath.length > 1) {
					this._showFilterTree(this._getLastViewModel(), filterPath, 0);
				} else if (filterPath.length === 1) {
					this._showFilterColumn(filterPath[0]);
				}
			}
		},

		/**
		 * Adds item view model to collection.
		 * @protected
		 * @param {StructureExplorerViewModelItem} itemViewModel Item view model.
		 */
		addItem: function(itemViewModel) {
			var key = this.viewModelCollection.getCount();
			itemViewModel.set("elementKey", key);
			this.viewModelCollection.add(key, itemViewModel);
			this.fireEvent("addItem", itemViewModel);
		},

		/**
		 * Place focus on last input control.
		 * @protected
		 */
		focusLastInput: function() {
			var itemEdit = Ext.getCmp("itemComboBox");
			itemEdit.getEl().focus();
		}

		//endregion

	});

	return Terrasoft.StructureExplorerMainViewModel;
});


