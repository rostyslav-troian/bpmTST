Terrasoft.configuration.Structures["MobileActivityParticipantGridPageController"] = {innerHierarchyStack: ["MobileActivityParticipantGridPageController"]};
/* globals ActivityParticipant: false */
Ext.define("Terrasoft.configuration.controller.ActivityParticipantGridPage", {
	extend: "Terrasoft.controller.BaseGridPage",
	alternateClassName: "Terrasoft.configuration.ActivityParticipantGridPageController",

	statics: {
		Model: ActivityParticipant
	},

	config: {
		refs: {
			view: "#ActivityParticipantGridPage"
		}
	},

	//region Properties: Private

	/**
	 * @private
	 */
	picker: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	createContactsPicker: function(store, model) {
		var modelName = "Contact";
		var defaultImageUrl = Terrasoft.Configuration.getDefaultOwnerImage();
		var gridModelConfig = Terrasoft.sdk.LookupGridPage.getConfig(modelName);
		var moduleConfig = Terrasoft.ApplicationConfig.getModuleConfig(modelName);
		var title = moduleConfig && moduleConfig.Title;
		if (!title) {
			title = model.Caption;
		}
		return Ext.create("Terrasoft.LookupPicker", {
			component: {
				store: store,
				primaryColumn: model.PrimaryDisplayColumnName,
				subtitleColumns: gridModelConfig.subtitleColumns,
				imageColumn: gridModelConfig.imageColumn,
				defaultImage: defaultImageUrl,
				listeners: {
					scope: this,
					select: this.onPickerSelect
				}
			},
			toolbar: {
				clearButton: false
			},
			title: title,
			popup: true
		});
	},

	/**
	 * @private
	 */
	getContactPicker: function() {
		if (this.picker) {
			return this.picker;
		}
		var modelName = "Contact";
		var store = Ext.create("Terrasoft.store.BaseStore", {
			model: modelName
		});
		var model = Ext.ClassManager.get(modelName);
		var picker = this.picker = this.createContactsPicker(store, model);
		var filterPanel = picker.getFilterPanel();
		filterPanel.on("filterchange", this.onPickerFilterChange, this);
		filterPanel.addModule({
			xtype: Terrasoft.FilterModuleTypes.Search,
			filterColumnNames: [model.PrimaryDisplayColumnName],
			name: "LookupSearch",
			component: {
				markerValue: "lookupSearchFilter"
			}
		});
		var filters = filterPanel.getFilters();
		var queryConfig = this.getPickerQueryConfig();
		store.on("beforeload", this.onBeforeLoadPicker, this);
		store.loadPage(1, {
			filters: filters,
			queryConfig: queryConfig
		});
		return picker;
	},

	/**
	 * @private
	 */
	getPickerQueryConfig: function() {
		var lookupQueryConfig = Terrasoft.sdk.LookupGridPage.getQueryConfig("Contact");
		var queryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: "Contact",
			columns: lookupQueryConfig.getColumns()
		});
		queryConfig.addColumn("Name");
		return queryConfig;
	},

	/**
	 * @private
	 */
	failureHandler: function(exception) {
		Terrasoft.MessageBox.showException(exception);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	getIsExtendedFiltersEnabled: function() {
		return false;
	},
	
	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	shouldUseFolderFilters: function() {
		return false;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	executeAddAction: function() {
		var picker = this.getContactPicker();
		if (!picker.getParent()) {
			Ext.Viewport.add(picker);
		}
		picker.show();
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overriden
	 */
	onItemTap: function(el, index, target, record) {
		var recordId = record.get("Participant.Id");
		var selectedRecord = this.getSelectedRecord();
		var selectedRecordId = selectedRecord && selectedRecord.get("Participant.Id");
		var shouldOpenPreviewPage = (selectedRecordId !== recordId);
		if (shouldOpenPreviewPage) {
			this.openPreviewPage(recordId, "Contact");
		}
	},

	/**
	 * Called when filter in picker changed.
	 * @protected
	 * @virtual
	 */
	onPickerFilterChange: function() {
		var picker = this.picker;
		var filterPanel = picker.getFilterPanel();
		var filters = filterPanel.getFilters();
		var store = picker.getComponent().getStore();
		store.loadPage(1, {
			filters: filters,
			queryConfig: this.getPickerQueryConfig()
		});
	},

	/**
	 * Called when record is chosen in contacts picker.
	 * @protected
	 * @virtual
	 */
	onPickerSelect: function(grid, selectedRecord) {
		var pageConfig = this.getPageConfig();
		var detailConfig = pageConfig.detailConfig;
		var parentRecord = detailConfig.parentRecord;
		var newRecord = ActivityParticipant.create({
			Activity: parentRecord,
			Participant: selectedRecord
		});
		var saveQueryConfig = Ext.create("Terrasoft.QueryConfig", {
			modelName: "ActivityParticipant",
			columns: ["Activity", "Participant"]
		});
		newRecord.save({
			queryConfig: saveQueryConfig,
			success: function() {
				this.loadStore();
				Terrasoft.PageNavigator.markPreviousPagesAsDirty();
			},
			failure: this.failureHandler
		}, this);
	},
	
	/**
	 * Called before loading data in contacts picker.
	 * @protected
	 * @virtual
	 */
	onBeforeLoadPicker: function(store, operation) {
		var queryConfig = this.getPickerQueryConfig();
		operation.config.queryConfig = queryConfig;
	}

	//endregion

});


