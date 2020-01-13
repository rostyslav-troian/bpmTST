Terrasoft.configuration.Structures["DataManagerGridUtilities"] = {innerHierarchyStack: ["DataManagerGridUtilities"]};
define('DataManagerGridUtilitiesStructure', ['DataManagerGridUtilitiesResources'], function(resources) {return {schemaUId:'9ec79052-66f7-4e33-85f0-4d0171cb51b0',schemaCaption: "DataManagerGridUtilities", parentSchemaName: "", schemaName:'DataManagerGridUtilities',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DataManagerGridUtilities", ["terrasoft"], function(Terrasoft) {
	Ext.define("Terrasoft.configuration.mixins.DataManagerGridUtilities", {
		alternateClassName: "Terrasoft.DataManagerGridUtilities",

		/**
		 * Number of loaded data pages.
		 * @private
		 * @type {Number}
		 */
		_loadedPagesCount: 1,

		/**
		 * Returns current max page records count according to pages loaded.
		 * @private
		 * @returns {number}
		 */
		_getMaxPageRecordsCount: function() {
			var pageSize = this.get("RowCount");
			return this._loadedPagesCount * pageSize;
		},

		/**
		 * Changes records collection size to match the max page records count.
		 * @private
		 * @param records {Terrasoft.Collection} Records collection.
		 * @returns {Terrasoft.Collection} Max page records collection size.
		 */
		_takeMaxPageRecordsCount: function(records) {
			var result = records;
			var recordsCount = records.getCount();
			var maxRecordsCount = this._getMaxPageRecordsCount();
			if (recordsCount > maxRecordsCount) {
				result = records.take(maxRecordsCount);
			}
			return result;
		},

		/**
		 * Selects records into collection of view model items.
		 * @private
		 * @param records {Terrasoft.Collection} Object manager items collection.
		 * @returns {Terrasoft.Collection} Object manager view model items collection.
		 */
		_selectToViewModel: function(records) {
			return records.select(function(item) {
				return item.viewModel;
			}, this);
		},

		/**
		 * Removes manager items that marked as deleted.
		 * @private
		 * @param records {Terrasoft.Collection} Records collection.
		 * @returns {Terrasoft.Collection} Collection without deleted manager items.
		 */
		_filterDeletedRecords: function(records) {
			return records.filterByFn(function(item) {
				return !item.isDeleted;
			});
		},

		/**
		 * Updates load more button visibility.
		 * @private
		 * @param recordsCount {Number} New records count.
		 */
		_updateLoadMoreButtonVisibility: function(recordsCount) {
			var maxCount = this._getMaxPageRecordsCount();
			var isButtonVisible = recordsCount > maxCount;
			this.set("CanLoadMoreData", isButtonVisible);
		},

		/**
		 * Returns detail entity schema.
		 * @protected
		 * @abstract
		 * @returns {String} Detail entity schema name.
		 */
		getEntitySchemaName: Terrasoft.abstractFn,

		/**
		 * Loads grid data from data manager through given entity schema name.
		 */
		loadGridData: function() {
			var records = Terrasoft.DataManager.getEntitySchemaData(this.getEntitySchemaName());
			if (records && !records.isEmpty()) {
				records = this._filterDeletedRecords(records);
				records = this.filterRecordsCollection(records);
				this._updateLoadMoreButtonVisibility(records.getCount());
				records = this._takeMaxPageRecordsCount(records);
				records = this._selectToViewModel(records);
				records = this.prepareRecordsCollection(records);
				this.set("IsGridEmpty", records.isEmpty());
				var gridData = this.getGridData();
				gridData.clear();
				gridData.loadAll(records);
			} else {
				this.set("IsGridEmpty", true);
			}
		},

		/**
		 * Filters records collection.
		 * @virtual
		 * @param records {Terrasoft.Collection} Records collection.
		 * @returns {Terrasoft.Collection} Prepared records collection.
		 */
		filterRecordsCollection: function(records) {
			return records;
		},

		/**
		 * Prepares records collection before loading into grid.
		 * @virtual
		 * @param records {Terrasoft.Collection} Records collection.
		 * @returns {Terrasoft.Collection} Prepared records collection.
		 */
		prepareRecordsCollection: function(records) {
			return records;
		},

		/**
		 * Loads one more records page into grid.
		 */
		loadMore: function() {
			this._loadedPagesCount += 1;
			this.reloadGridData();
		}
	});
	return Ext.create("Terrasoft.configuration.mixins.DataManagerGridUtilities");
});


