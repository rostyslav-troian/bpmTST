Terrasoft.configuration.Structures["BaseDashboardItemViewModel"] = {innerHierarchyStack: ["BaseDashboardItemViewModel"]};
define("BaseDashboardItemViewModel", ["BaseDashboardItemViewModelResources", "MaskHelper", "MiniPageUtilities"],
	function(resources, MaskHelper) {
		Ext.define("Terrasoft.configuration.BaseDashboardItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.BaseDashboardItemViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			mixins: {
				/**
				 * @class MiniPageUtilities Mixin, used for open Mini Pages
				 */
				MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities"
			},

			columns: {
				/**
				 * The text of the header caption.
				 */
				"Caption": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				/**
				 * The text of the "Execute" button caption.
				 */
				"ExecuteButtonCaption": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				/**
				 * The text of the "Cancel" button caption.
				 */
				"CancelButtonCaption": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				/**
				 * Indicates state of the Visible parameter of "ExecuteButton.
				 */
				"ExecuteButtonVisible": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Indicates state of the Visible parameter of "CancelButton.
				 */
				"CancelButtonVisible": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Date of the item.
				 */
				"Date": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.DATE_TIME
				},
				/**
				 * Text representation of the Date.
				 */
				"DateText": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				/**
				 * Owner of the item.
				 */
				"Owner": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				/**
				 * Url on the icon.
				 */
				"IconSrc": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				/**
				 * Process element execution data.
				 */
				"ExecutionData": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				/**
				 * Process element required step flag.
				 */
				"IsRequired": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				}
			},

			/**
			 * Executes item.
			 */
			execute: Ext.emptyFn,

			/**
			 * Cancel item execution.
			 */
			cancel: Ext.emptyFn,

			/**
			 * On render handler.
			 */
			onRender: Ext.emptyFn,

			/**
			 * Caption click handler.
			 */
			onCaptionClick: function() {
				this.execute();
			},

			/**
			 * Execute button click handler.
			 */
			onExecuteButtonClick: function() {
				this.execute();
			},

			/**
			 * Shows MiniPage.
			 * @protected
			 * @param {Object} [config] Config for opening MiniPage.
			 * @return {Object} MiniPage config.
			 */
			showMiniPage: function(config) {
				var id = this.get("Id");
				var miniPageConfig = {
					recordId: id,
					columnName: "Id",
					isFixed: true,
					targetId: this.getContainerId(id),
					entitySchemaName: this.get("EntitySchemaName"),
					showDelay: 0
				};
				if (config) {
					this.Ext.apply(miniPageConfig, config);
				}
				this.openMiniPage(miniPageConfig);
				return miniPageConfig;
			},

			/**
			 * Returns container id.
			 * @private
			 * @param {String} id Entity id.
			 * @return {String} Container id.
			 */
			getContainerId: function(id) {
				return "ItemContainer-" + id + "-View";
			},

			/**
			 * Cancel button click handler.
			 */
			onCancelButtonClick: function() {
				this.cancel();
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.bindDependencies();
			},

			/**
			 * Initialize ViewModel.
			 */
			init: function() {
				this.initializeProperties();
			},

			/**
			 * Initialize ViewModel properties.
			 */
			initializeProperties: function() {
				this.initIconSrc();
				this.initCancelButtonCaption();
				this.initExecuteButtonCaption();
				this.initCancelButtonVisibility();
				this.initExecuteButtonVisibility();
			},

			/**
			 * Initializes "IconSrc" property.
			 */
			initIconSrc: Ext.emptyFn,

			/**
			 * Initializes "CancelButtonCaption" property.
			 */
			initCancelButtonCaption: function() {
				this.set("CancelButtonCaption", resources.localizableStrings.CancelButtonCaption);
			},

			/**
			 * Initializes "ExecuteButtonCaption" property.
			 */
			initExecuteButtonCaption: function() {
				this.set("ExecuteButtonCaption", resources.localizableStrings.ExecuteButtonCaption);
			},

			/**
			 * Initializes "CancelButtonVisible" property.
			 */
			initCancelButtonVisibility: function() {
				this.set("CancelButtonVisible", false);
			},

			/**
			 * Initializes "ExecuteButtonVisible" property.
			 */
			initExecuteButtonVisibility: function() {
				this.set("ExecuteButtonVisible", true);
			},

			/**
			 * Returns uri of the icon.
			 * @return {String}
			 */
			getIconSrc: function() {
				var src = this.get("IconSrc");
				if (!Ext.isEmpty(src)) {
					return Terrasoft.ImageUrlBuilder.getUrl(src);
				}
			},

			/**
			 * Returns config of the column dependencies.
			 * @return {Object} Config.
			 */
			getColumnsDependenciesConfig: function() {
				return {
					"DateText": [{
						columns: ["Date"],
						methodName: "onDateChanged"
					}]
				};
			},

			/**
			 * Bind column dependencies.
			 */
			bindDependencies: function() {
				var config = this.getColumnsDependenciesConfig();
				Terrasoft.each(config, function(dependencies) {
					Terrasoft.each(dependencies, function(dependency) {
						Terrasoft.each(dependency.columns, function(column) {
							var method = this[dependency.methodName];
							this.on("change:" + column, method.bind(this, column));
						}, this);
					}, this);
				}, this);
			},

			/**
			 * Handles "change" event of the "Date" column.
			 */
			onDateChanged: function() {
				var date = this.get("Date");
				if (date) {
					var dateText = Ext.Date.format(date, Terrasoft.Resources.CultureSettings.dateFormat);
					this.set("DateText", dateText);
				}
			},

			/**
			 * Displays the mask.
			 * @protected
			 * @param {Object} config Config of the mask.
			 */
			showBodyMask: function(config) {
				MaskHelper.ShowBodyMask(config);
			},

			/**
			 * Hides mask.
			 * protected
			 * @param {Object} config Config of the mask.
			 */
			hideBodyMask: function(config) {
				MaskHelper.HideBodyMask(config);
			},

			/**
			 * Returns value of the column.
			 * @param {String} columnName Name of the column.
			 * @return {*} Value.
			 */
			getLookupColumnValue: function(columnName) {
				var columnValue = this.get(columnName);
				return columnValue && columnValue.value;
			},

			/**
			 * Returns item process element identifier.
			 * @virtual
			 * @return {String}
			 */
			getProcessElementUId: Terrasoft.emptyFn,

			/**
			 * Set view model process execution data.
			 * @virtual
			 * @param {Object} data Process element execution data.
			 */
			setExecutionData: function(data) {
				this.set("ExecutionData", data);
			}
		});
	});


