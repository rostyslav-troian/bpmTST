Terrasoft.configuration.Structures["QueueGridUtilities"] = {innerHierarchyStack: ["QueueGridUtilities"]};
define("QueueGridUtilities", ["terrasoft", "GridUtilitiesV2", "QueueGridRowViewModel"],
	function() {
	/**
	 * @class Terrasoft.configuration.mixins.QueueGridUtilities
	 * ###### ##### ####### QueuePage
	 */
	Ext.define("Terrasoft.configuration.mixins.QueueGridUtilities", {
		alternateClassName: "Terrasoft.QueueGridUtilities",
		extend: "Terrasoft.GridUtilities",

		//region Methods: Private

		/**
		 * ############ ####### ####### ####### ## #######.
		 * @private
		 * @param {Object} columnsSettingsProfile ####### # ############ #########.
		 * @param {String} template ###### ########### ######### ###### ####### #####.
		 * @param {String} columnPath ##### ######## ####### #####.
		 */
		replaceColumnTemplateConfig: function(columnsSettingsProfile, template, columnPath) {
			columnsSettingsProfile.DataGrid.listedConfig =
				columnsSettingsProfile.DataGrid.listedConfig.replace(template, columnPath);
			columnsSettingsProfile.DataGrid.tiledConfig =
				columnsSettingsProfile.DataGrid.tiledConfig.replace(template, columnPath);
		},

		/**
		 * ######### ###### ## #### ######### #########.
		 * @private
		 * @param {Terrasoft.FilterGroup} filters ####### #######.
		 */
		addNextProcessingDateFilters: function(filters) {
			var nextProcessingDateFilters = new this.Terrasoft.createFilterGroup();
			nextProcessingDateFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
			var nextProcessingColumnName = "NextProcessingDate";
			nextProcessingDateFilters.add("NextProcessingDateFilter", this.Terrasoft.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.LESS_OR_EQUAL, nextProcessingColumnName, new Date()));
			nextProcessingDateFilters.add("IsNullNextProcessingDateFilter",
				this.Terrasoft.createColumnIsNullFilter(nextProcessingColumnName));
			filters.add("NextProcessingDateFilters", nextProcessingDateFilters);
		},

		/**
		 * ######### ####### ## #########.
		 * @private
		 * @param {Terrasoft.FilterGroup} filters ####### #######.
		 */
		addOperatorFilters: function(filters) {
			var currentUserContactId = this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value;
			var availableItemsFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
			availableItemsFilterGroup.addItem(this.Terrasoft.createColumnIsNullFilter("Operator"));
			availableItemsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "Queue.[QueueOperator:Queue].Operator", currentUserContactId));
			availableItemsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "Queue.[QueueOperator:Queue].Active", true));
			var myOrAvailableItemsFilterGroup = this.Ext.create("Terrasoft.FilterGroup", {
				logicalOperation: this.Terrasoft.LogicalOperatorType.OR
			});
			myOrAvailableItemsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
				this.Terrasoft.ComparisonType.EQUAL, "Operator", currentUserContactId));
			myOrAvailableItemsFilterGroup.addItem(availableItemsFilterGroup);
			filters.addItem(myOrAvailableItemsFilterGroup);
		},

		/**
		 * ######### ####### ### ######## #######.
		 * @private
		 * @param {Terrasoft.FilterGroup} filters ####### #######.
		 */
		addCloseQueueFilters: function(filters) {
			var isClosedQueue = this.get("IsClosedQueue");
			if (!isClosedQueue) {
				return;
			}
			filters.add("CurrentOperatorFilter", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Operator", Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.GridUtilities#setColumnsProfile
		 * @overridden
		 */
		setColumnsProfile: function(viewColumnsSettingsProfile) {
			var columnsSettingsProfile = this.get("Profile");
			viewColumnsSettingsProfile = this.modifySettingsProfile(viewColumnsSettingsProfile);
			var propertyName = this.getDataGridName();
			var columnsSettingsProfileKey = columnsSettingsProfile[propertyName].key;
			Terrasoft.utils.saveUserProfile(columnsSettingsProfileKey,
				viewColumnsSettingsProfile, false);
			this.set("Profile", viewColumnsSettingsProfile);
		},

		/**
		 * @inheritdoc GridUtilitiesV2#onGridDataLoaded
		 * @overridden
		 */
		onGridDataLoaded: function() {
			this.callParent(arguments);
			this.setNextRecordButtonVisibility();
		},

		/**
		 * @inheritdoc GridUtilitiesV2#getGridRowViewModelConfig
		 * @overridden
		 */
		getGridRowViewModelConfig: function() {
			var config = this.callParent(arguments);
			return Ext.merge(config, {
				values: {
					"IsSupervisorMode": this.get("IsSupervisorMode"),
					"IsDetailMode": this.get("IsDetailMode")
				}
			});
		},

		/**
		 * @inheritdoc GridUtilitiesV2#getGridRowViewModelClassName
		 * @overridden
		 */
		getGridRowViewModelClassName: function() {
			return "Terrasoft.QueueGridRowViewModel";
		},

		/**
		 * @inheritdoc GridUtilitiesV2#getGridSettingsInfo
		 * @overridden
		 */
		getGridSettingsInfo: function() {
			var settingsInfo = this.callParent(arguments);
			return Ext.apply(settingsInfo, {
				isSingleTypeMode: false
			});
		},

		/**
		 * @inheritdoc GridUtilitiesV2#sortColumn
		 * @overridden
		 */
		sortColumn: function() {
			if (!this.get("IsDetailMode")) {
				return;
			}
			this.callParent(arguments);
		},

		/**
		 * ######### ####### ######## # ######### ######## ######## ####### ####### ####.
		 * @protected
		 * @param {Terrasoft.FilterGroup} filters ####### #######.
		 * @param {Object} config ################ ######.
		 */
		addQueueFilters: function(filters, config) {
			filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
				"[Queue:Id:QueueId].QueueEntitySchema", this.get("EntitySchemaUId")));
			var queueId = this.get("QueueId");
			if (!Ext.isEmpty(queueId)) {
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Queue", queueId));
			}
			var isSupervisorMode = this.get("IsSupervisorMode");
			if (!isSupervisorMode) {
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Status.IsFinal", false));
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[Queue:Id:QueueId].Status.IsInitial", false));
				filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[Queue:Id:QueueId].Status.IsFinal", false));
				this.addNextProcessingDateFilters(filters);
				this.addOperatorFilters(filters);
				if (!config || !config.skipOperatorFilter) {
					this.addCloseQueueFilters(filters);
				}
			}
		},

		/**
		 * ############ ####### ####### #######.
		 * @protected
		 * @param {Object} columnsSettingsProfile ####### # ############ #########.
		 */
		modifySettingsProfile: function(columnsSettingsProfile) {
			var schemaName = this.get("EntitySchemaName");
			var columnPath = this.Ext.String.format("\"[{0}:Id:EntityRecordId].", schemaName);
			this.replaceColumnTemplateConfig(columnsSettingsProfile, /\"EntityRecord\./g, columnPath);
			var primaryDisplayColumnName = this.get("EntitySchemaPrimaryDisplayColumnName");
			columnPath = this.Ext.String.format("\"[{0}:Id:EntityRecordId].{1}\"", schemaName,
				primaryDisplayColumnName);
			this.replaceColumnTemplateConfig(columnsSettingsProfile, /\"EntityRecord\"/g, columnPath);
			return columnsSettingsProfile;
		},

		//endregion

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.GridUtilities#getFilters
		 * @overridden
		 */
		getFilters: function() {
			var filters = this.callParent();
			this.addQueueFilters(filters);
			return filters;
		}

		//endregion

	});
	return Ext.create("Terrasoft.QueueGridUtilities");
});


