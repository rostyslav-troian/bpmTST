Terrasoft.configuration.Structures["CampaignSchemaViewerFilters"] = {innerHierarchyStack: ["CampaignSchemaViewerFilters"]};
define('CampaignSchemaViewerFiltersStructure', ['CampaignSchemaViewerFiltersResources'], function(resources) {return {schemaUId:'76b88491-f905-4b4b-b8dd-53d728262ec8',schemaCaption: "CampaignSchemaViewerFilters", parentSchemaName: "", schemaName:'CampaignSchemaViewerFilters',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_CONTROLS_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{attributes:[]},methods:{},schemaDifferences:function(){

}};});
define("CampaignSchemaViewerFilters", ["CampaignSchemaViewerFiltersResources", "StorageUtilities",
"QuickFilterModuleV2", "QuickFilterViewModelV2", "css!CampaignSchemaViewerFiltersCSS"
],
function(resources, StorageUtilities) {
	return {
		messages: {

			/**
			 * @message GetFixedFilterConfig
			 * Returns config for create period filter.
			 */
			"GetFixedFilterConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetModuleSchema
			 * Returns information about entity which works with filter.
			 */
			"GetModuleSchema": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateFilter
			 * Message handler filter events.
			 */
			"UpdateFilter": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetFixedFilter
			 * Requests a filter from Quick filter module.
			 */
			"GetFixedFilter": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message SchemaViewerFiltersChanged
			 * Sends a filters to CampaignSchemaViewer.
			 * Sended object has same format as GetAnalyticsConfig message.
			 */
			"AnalyticsFiltersChange": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ShowBadgesChange
			 * Sends config for badges to CampaignSchemaViewer.
			 * Sended object has format:
			 * badgesConfig: {
			 *		showComplete,
			 *		showNonComplete
			 * }
			 */
			"ShowBadgesChange": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetAnalyticsConfig
			 * Returns config for show analytics in CampaignSchemaViewer.
			 * Returned object has format:
			 * {
			 *	periodFilter: {
			 *		startDate,
			 *		dueDate
			 *	},
			 *	badgesConfig: {
			 *		showComplete,
			 *		showNonComplete
			 *	}
			 *}
			 */
			"GetAnalyticsConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}

		},
		attributes: {

			/**
			 * Current time filter.
			 */
			"AnalyticsFilters": {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {}
			},

			/**
			 * Flag that indicates visibility of the completed badges on schema.
			 */
			"ShowCompleteBadges": {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Flag that indicates visibility of the incompleted badges on schema.
			 */
			"ShowIncompleteBadges": {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Flag that indicates visibility of the processing badges on schema.
			 */
			"ShowProcessingBadges": {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Flag that indicates visibility of the error badges on schema.
			 */
			"ShowErrorBadges": {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Flag that indicates visibility of the suspended badges on schema.
			 */
			"ShowSuspendedBadges": {
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			}

		},
		methods: {

			// region Methods: Private

			/**
			 * Initialize AnalyticsFilters property default object.
			 * @private
			 */
			_initDefaultFilterObject: function() {
				this.$AnalyticsFilters = {
					periodFilter: {
						startDate: null,
						dueDate: null
					},
					badgesConfig: {
						showComplete: false,
						showNonComplete: false
					}
				};
			},

			/**
			 * Returns identifier of the QuickFilterModuleV2.
			 * @return {String} Unique identifier of QuickFilterModuleV2.
			 */
			_getQuickFilterModuleId: function() {
				return this.getModuleId("QuickFilterModuleV2");
			},

			/**
			 * Gets period filter from the fixed filter.
			 * @param {String} filterName Name of filter.
			 * @return {Object|null} Requested filter.
			 */
			_getFilterFromFixedFilter: function(filterName) {
				var quickFilterModuleId = this._getQuickFilterModuleId();
				var filters = this.sandbox.publish("GetFixedFilter", {
					filterName: filterName
				}, [quickFilterModuleId]);
				return this.Terrasoft.isEmptyObject(filters) ? null : filters;
			},

			/**
			 * Publishes message AnalyticsFiltersChange when defines startDate and dueDate in period filter.
			 * @private
			 */
			_publishPeriodFilterChange: function() {
				if (this.Terrasoft.isEmptyObject(this.$AnalyticsFilters)) {
					return;
				}
				this.sandbox.publish("AnalyticsFiltersChange", this.$AnalyticsFilters, [this.sandbox.id]);
			},

			/**
			 * Converts startDate in periodFilter to start of day value and
			 * converts dueDate in periodFilter to end of day value.
			 * @private
			 */
			_normalizePeriodFilters: function() {
				var periodFilter = this.$AnalyticsFilters.periodFilter;
				if (Ext.isDate(periodFilter.startDate)) {
					this.$AnalyticsFilters.periodFilter.startDate = this.Terrasoft.startOfDay(periodFilter.startDate);
				}
				if (Ext.isDate(periodFilter.dueDate)) {
					this.$AnalyticsFilters.periodFilter.dueDate = this.Terrasoft.endOfDay(periodFilter.dueDate);
				}
			},

			_isRecurringAllowed: function() {
				return Terrasoft.Features.getIsEnabled("RecurringCampaigns");
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.initUserFilters();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this._initDefaultFilterObject();
				this.subscribeSandboxEvents();
			},

			/**
			 * Subscribes on sandbox events.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				var sandbox = this.sandbox;
				var quickFilterModuleId = this._getQuickFilterModuleId();
				sandbox.subscribe("GetFixedFilterConfig", this.getFixedFiltersConfig, this, [quickFilterModuleId]);
				sandbox.subscribe("GetModuleSchema", this.getEntityForFixedFilter, this, [quickFilterModuleId]);
				sandbox.subscribe("UpdateFilter", this.onFilterUpdate, this, [quickFilterModuleId]);
				sandbox.subscribe("GetAnalyticsConfig", this.getAnalyticsConfig, this, [this.sandbox.id]);
				this.on("change:ShowCompleteBadges", this.showCompleteBadgesChanged, this);
				this.on("change:ShowIncompleteBadges", this.showNonCompleteBadgesChanged, this);
				this.on("change:ShowProcessingBadges", this.showProcessingBadgesChanged, this);
				this.on("change:ShowErrorBadges", this.showErrorBadgesChanged, this);
				this.on("change:ShowSuspendedBadges", this.showSuspendedBadgesChanged, this);
			},

			/**
			 * Inits user filters setting and rise event SchemaViewerFiltersChanged.
			 * @protected
			 */
			initUserFilters: function() {
				var profileKey = this.getProfileKey();
				var sessionFilters = StorageUtilities.getItem("AnalyticsFilters", profileKey);
				if (this.isEmpty(sessionFilters)) {
					var profileFilters = this.getProfileFilters();
					if (!this.Terrasoft.isEmptyObject(profileFilters)) {
						this.$AnalyticsFilters = this.Terrasoft.deepClone(profileFilters);
					}
				} else {
					this.$AnalyticsFilters = this.Terrasoft.deepClone(sessionFilters);
				}
				if (this.$AnalyticsFilters.hasOwnProperty("badgesConfig")) {
					this.$ShowCompleteBadges = this.$AnalyticsFilters.badgesConfig.showComplete;
					this.$ShowIncompleteBadges = this.$AnalyticsFilters.badgesConfig.showNonComplete;
					this.$ShowProcessingBadges = this.$AnalyticsFilters.badgesConfig.showProcessing;
					this.$ShowErrorBadges = this.$AnalyticsFilters.badgesConfig.showError;
					this.$ShowSuspendedBadges = this.$AnalyticsFilters.badgesConfig.showSuspended;
				}
				this._publishPeriodFilterChange();
			},

			/**
			 * Returns filters from stored profile.
			 * @protected
			 * @return {Object} Profile filters.
			 */
			getProfileFilters: function() {
				var profile = this.getProfile();
				var profileFilters = profile.analyticsFilters || {};
				if (profile && profile.analyticsFilters && profile.analyticsFilters.periodFilter) {
					var periodFilter = profile.analyticsFilters.periodFilter;
					periodFilter.startDate = periodFilter.startDate ? new Date(periodFilter.startDate) : null;
					periodFilter.dueDate = periodFilter.dueDate ? new Date(periodFilter.dueDate) : null;
					profileFilters = profile.analyticsFilters;
				}
				return profileFilters;
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#getProfileKey
			 * @override
			 */
			getProfileKey: function() {
				return this.$CardSchemaName + this.$CampaignId + "AnalyticsFilters";
			},

			/**
			 * Returns entity for create fixed filter.
			 * @protected
			 * @return {Terrasoft.BaseEntitySchema} Entity.
			 */
			getEntityForFixedFilter: function() {
				return this.Ext.create("Terrasoft.BaseEntitySchema", {
					columns: {
						"StartDate": {},
						"DueDate": {}
					}
				});
			},

			/**
			 * Handles changes of period filter changes.
			 * @protected
			 */
			onFilterUpdate: function() {
				var periodFilter = this._getFilterFromFixedFilter("PeriodFilter");
				if (this.Terrasoft.isEqual(periodFilter, this.$AnalyticsFilters.periodFilter)) {
					return;
				}
				this.$AnalyticsFilters.periodFilter = periodFilter;
				this._normalizePeriodFilters();
				this._publishPeriodFilterChange();
				this.saveFilters();
			},

			/**
			 * Returns object that contains analytics filters parameters.
			 * @returns {Object} Config for analytics in CampaignSchemaViewer.
			 */
			getAnalyticsConfig: function() {
				return this.$AnalyticsFilters;
			},

			/**
			 * Handles changes of ShowCompleteBadges checkbox.
			 * @protected
			 */
			showCompleteBadgesChanged: function() {
				this.$AnalyticsFilters.badgesConfig.showComplete = this.$ShowCompleteBadges;
				this.sandbox.publish("ShowBadgesChange", this.$AnalyticsFilters.badgesConfig, [this.sandbox.id]);
				this.saveFilters();
			},

			/**
			 * Handles changes of ShowIncompleteBadges checkbox.
			 * @protected
			 */
			showNonCompleteBadgesChanged: function() {
				this.$AnalyticsFilters.badgesConfig.showNonComplete = this.$ShowIncompleteBadges;
				this.sandbox.publish("ShowBadgesChange", this.$AnalyticsFilters.badgesConfig, [this.sandbox.id]);
				this.saveFilters();
			},

			/**
			 * Handles changes of ShowProcessingBadges checkbox.
			 * @protected
			 */
			showProcessingBadgesChanged: function() {
				this.$AnalyticsFilters.badgesConfig.showProcessing = this.$ShowProcessingBadges;
				this.sandbox.publish("ShowBadgesChange", this.$AnalyticsFilters.badgesConfig, [this.sandbox.id]);
				this.saveFilters();
			},

			/**
			 * Handles changes of ShowErrorBadges checkbox.
			 * @protected
			 */
			showErrorBadgesChanged: function() {
				this.$AnalyticsFilters.badgesConfig.showError = this.$ShowErrorBadges;
				this.sandbox.publish("ShowBadgesChange", this.$AnalyticsFilters.badgesConfig, [this.sandbox.id]);
				this.saveFilters();
			},

			/**
			 * Handles changes of ShowSuspendedBadges checkbox.
			 * @protected
			 */
			showSuspendedBadgesChanged: function() {
				this.$AnalyticsFilters.badgesConfig.showSuspended = this.$ShowSuspendedBadges;
				this.sandbox.publish("ShowBadgesChange", this.$AnalyticsFilters.badgesConfig, [this.sandbox.id]);
				this.saveFilters();
			},

			/**
			 * Saves a filter to local storage and profile.
			 * @protected
			 */
			saveFilters: function() {
				var profileKey = this.getProfileKey();
				var analyticsFilters = this.Terrasoft.deepClone(this.$AnalyticsFilters);
				this.Terrasoft.saveUserProfile(profileKey, {
					analyticsFilters: analyticsFilters
				}, false);
				StorageUtilities.setItem(analyticsFilters, "AnalyticsFilters", profileKey);
			},

			/**
			 * Returns default config of fixed filter for QuickFilterModuleV2.
			 * @protected
			 * @return {Object} Filter config.
			 */
			getFixedFiltersConfig: function() {
				var periodFilter = this.$AnalyticsFilters.periodFilter || {};
				return {
					entitySchema: this.entitySchema,
					filters: [{
						name: "PeriodFilter",
						dataValueType: this.Terrasoft.DataValueType.DATE,
						startDate: {
							columnName: "StartDate",
							defValue: periodFilter.startDate || null
						},
						dueDate: {
							columnName: "DueDate",
							defValue: periodFilter.dueDate || null
						},
						dayButtonVisible: true,
						weekButtonVisible: true
					}]
				};
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"name": "SchemaViewerFiltersGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SchemaViewerFiltersContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["schema-viewer-filters-container filters-container-wrapClass"]
					},
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}

				},
				"parentName": "SchemaViewerFiltersGridLayout",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "SchemaViewerFixedFiltersModule",
				"parentName": "SchemaViewerFiltersContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["schema-viewer-fixed-filter-module"]
					},
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "QuickFilterModuleV2",
					"instanceConfig": {
						"moduleConfig": {
							"FixedFilters": {
								"viewConfigModuleName": "FixedFilterViewV2",
								"viewModelConfigModuleName": "FixedFilterViewModelV2",
								"configPropertyName": "fixedFilterConfig"
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SchemaViewerBadgesContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["schema-viewer-filters-container filters-container-wrapClass"]
					},
					"items": [],
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					}

				},
				"parentName": "SchemaViewerFiltersGridLayout",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowCompleteBadges",
				"values": {
					"labelConfig": {"visible": false},
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"classes": {
						"wrapClassName": ["show-complete-badge"]
					}
				},
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowCompleteBadgeLabel",
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["show-badge-label"]
					},
					"caption": {
						"bindTo": "Resources.Strings.ShowCompleteBadgeCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ShowIncompleteBadges",
				"values": {
					"labelConfig": {"visible": false},
					"classes": {
						"wrapClassName": ["show-badge"]
					},
					"dataValueType": Terrasoft.DataValueType.BOOLEAN
				},
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowIncompletedLabelOnSchemaLabel",
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["show-badge-label"]
					},
					"caption": {
						"bindTo": "Resources.Strings.ShowIncompleteBadgeCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ShowProcessingBadges",
				"values": {
					"labelConfig": {"visible": false},
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"classes": {
						"wrapClassName": ["show-processing-badge"]
					}
				},
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowProcessingBadgeLabel",
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["show-badge-label"]
					},
					"caption": {
						"bindTo": "Resources.Strings.ShowProcessingBadgeCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ShowErrorBadges",
				"values": {
					"labelConfig": {"visible": false},
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"classes": {
						"wrapClassName": ["show-error-badge"]
					}
				},
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowErrorBadgeLabel",
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["show-badge-label"]
					},
					"caption": {
						"bindTo": "Resources.Strings.ShowErrorBadgeCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ShowSuspendedBadges",
				"values": {
					"labelConfig": {"visible": false},
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"classes": {
						"wrapClassName": ["show-suspended-badge"]
					},
					"visible": "$_isRecurringAllowed"
				},
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ShowSuspendedBadgeLabel",
				"parentName": "SchemaViewerBadgesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["show-badge-label"]
					},
					"caption": "$Resources.Strings.ShowSuspendedBadgeCaption",
					"visible": "$_isRecurringAllowed"
				}
			}
		] /**SCHEMA_DIFF*/
	};
}
);


