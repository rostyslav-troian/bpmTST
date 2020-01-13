Terrasoft.configuration.Structures["LocalDuplicateSearchPageViewModel"] = {innerHierarchyStack: ["LocalDuplicateSearchPageViewModel"]};
define("LocalDuplicateSearchPageViewModel", [
	"sandbox", "LocalDuplicateSearchPageViewModelResources"
], function(sandbox, resources) {
	var entitySchemaName;

	Ext.define("Terrasoft.LocalDuplicatesViewModel", {
		extend: "Terrasoft.BaseViewModel",

		rowCountOnPage: 20,

		// region Properties: Private

		_foundDuplicatedIds: null,

		// endregion

		// region Methods: Private

		/**
		 * @return {Number} Grid rows count.
		 * @private
		 */
		_getGridCount: function() {
			var gridData = this.get("gridData");
			return (gridData && gridData.getCount()) || 0;
		},

		// endregion

		/**
		 * Returns duplicated ids to be loaded as next page of the grid.
		 * @return {Array} Ids duplicate.
		 * @protected
		 */
		getNextDuplicateRecordIds: function() {
			var arrayDuplicationId = this._foundDuplicatedIds || [];
			var startIndex = this._getGridCount();
			if (arrayDuplicationId.length) {
				return arrayDuplicationId.slice(startIndex, startIndex + this.rowCountOnPage);
			}
			return arrayDuplicationId;
		}
	});

	function generate(parentSandbox, name) {
		sandbox = parentSandbox;
		entitySchemaName = name;
		return {
			values: {
				checks: [],
				isNotDuplicate: null,
				gridData: Ext.create("Terrasoft.BaseViewModelCollection"),
				activeRow: null
			},
			methods: {
				load: load,
				okClick: okClick,
				cancelClick: cancelClick,
				getHeader: getHeader,
				onDuplicatesIdLoad: onDuplicatesIdLoad,
				onActiveRowAction: onActiveRowAction,
				getGridButtonsVisible: getGridButtonsVisible,
				needLoadData: needLoadData,
				initCanLoadMore: initCanLoadMore,
				applyFilters: applyFilters,
				getGridRowsCountMessage: getGridRowsCountMessage,
				addColumns: addColumns
			}
		};
	}

	function getGridButtonsVisible() {
		return true;
	}

	function onActiveRowAction(tag) {
		var isChecked = (tag === "IsNotDuplicate");
		var activeRow = this.get("activeRow");
		var gridData = this.get("gridData");
		if (activeRow && gridData) {
			var item = gridData.get(activeRow);
			item.set("isChecked", isChecked);
			var itemView = Ext.get("duplicateGrid-item-" + activeRow);
			if (isChecked) {
				itemView.addCls("no-duplicate");
			} else {
				itemView.removeCls("no-duplicate");
			}
		}
	}

	function needLoadData() {
		if (!this.get("CanLoadMoreData")) {
			return;
		}
		this.onDuplicatesIdLoad();
	}

	function initCanLoadMore(dataCollection) {
		var loadedCount = dataCollection && dataCollection.getCount();
		var totalCount = this._foundDuplicatedIds && this._foundDuplicatedIds.length || 0;
		this.set("CanLoadMoreData", totalCount > loadedCount, {silent: true});
	}

	function load(state) {
		this.ajaxProvider = Terrasoft.AjaxProvider;
		this.dataSend = state.dataSend;
		this.state = state;
		this.set("DescriptionCaption", "");
		if (Ext.isArray(this.state.list)) {
			this._foundDuplicatedIds = this.state.list;
			this.onDuplicatesIdLoad();
		} else {
			callServiceMethod.call(this, this.ajaxProvider, "Find" + entitySchemaName + "Duplicates", function(response) {
				this._foundDuplicatedIds = response["Find" + entitySchemaName + "DuplicatesResult"];
				this.onDuplicatesIdLoad();
			}, state.dataSend);
		}
		sandbox.publish("ChangeHeaderCaption", {
			caption: this.getHeader(),
			dataViews: Ext.create("Terrasoft.Collection"),
			hidePageCaption: true
		});
	}

	function onDuplicatesIdLoad() {
		if (this._foundDuplicatedIds && !this._foundDuplicatedIds.length) {
			return;
		}
		var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: entitySchemaName});
		this.addColumns(esq);
		this.applyFilters(esq);
		esq.getEntityCollection(function(response) {
			if (response.success) {
				var availableItems = response.collection;
				var collection = this.get("gridData");
				availableItems.each(function(item) {
					item.getGridButtonIsNotDuplicateVisible = function() {
						var isChecked = this.get("isChecked") || false;
						return !isChecked;
					};
					item.getGridButtonIsDuplicateVisible = function() {
						var isChecked = this.get("isChecked") || false;
						return isChecked;
					};
				}, this);
				collection.loadAll(availableItems);
				this.getGridRowsCountMessage();
				this.initCanLoadMore(collection);
			}
		}, this);
	}

	function addColumns(esq) {
		var additionalColumns = [];
		if (entitySchemaName === "Account") {
			additionalColumns = ["Phone", "AdditionalPhone", "Web"];
		} else {
			additionalColumns = ["MobilePhone", "HomePhone", "Email"];
		}
		esq.addColumn("Id");
		esq.addColumn("Name");
		esq.addColumn("Owner");
		Terrasoft.each(additionalColumns, function(column) {
			esq.addColumn(column);
		}, this);
	}

	function getGridRowsCountMessage() {
		var fullCollection = this._foundDuplicatedIds.length;
		var duplicateRecordsMessageTemplate = resources.localizableStrings.DuplicateRecordsMessageTemplate;
		var mainMessage = Ext.String.format(duplicateRecordsMessageTemplate, fullCollection);
		this.set("DescriptionCaption", mainMessage);
	}

	function applyFilters(esq) {
		var partCollection = this.getNextDuplicateRecordIds();
		esq.filters.addItem(Terrasoft.createColumnInFilterWithParameters("Id", partCollection));
	}

	function okClick() {
		var collection = [];
		var gridData = this.get("gridData");
		Terrasoft.each(gridData.getItems(), function(item) {
			var isChecked = item.get("isChecked") || false;
			if (isChecked) {
				collection.push(item.get("Id"));
			}
		}, this);
		var isNotDuplicate = (collection.length > 0);
		if (Terrasoft.Features.getIsEnabled("FindDuplicatesOnSave") && isNotDuplicate) {
			collection = gridData.getKeys();
		}
		sandbox.publish("FindDuplicatesResult", {
			isNotDuplicate: isNotDuplicate,
			collection: collection,
			config: this.dataSend
		}, [this.state.cardSandBoxId]);
		cancelClick();
	}

	function cancelClick() {
		sandbox.publish("BackHistoryState");
	}

	function getHeader() {
		return Ext.String.format(resources.localizableStrings.PageHeaderMask,
				resources.localizableStrings["PageHeader" + entitySchemaName]);
	}

	function callServiceMethod(ajaxProvider, methodName, callback, dataSend) {
		var data = dataSend || {};
		var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
		var requestUrl = workspaceBaseUrl + "/rest/SearchDuplicatesService/" + methodName;
		var request = ajaxProvider.request({
			url: requestUrl,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			jsonData: data,
			callback: function(request, success, response) {
				var responseObject = {};
				if (success) {
					responseObject = Terrasoft.decode(response.responseText);
				}
				callback.call(this, responseObject);
			},
			scope: this
		});
		return request;
	}

	return {
		generate: generate
	};
});


