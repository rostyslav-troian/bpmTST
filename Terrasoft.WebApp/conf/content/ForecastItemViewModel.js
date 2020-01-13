Terrasoft.configuration.Structures["ForecastItemViewModel"] = {innerHierarchyStack: ["ForecastItemViewModel"]};
define("ForecastItemViewModel", ["ConfigurationEnums", "RightUtilities", "ForecastItemViewModelResources",
		"MiniPageUtilities"],
	function(ConfigurationEnums, RightUtilities, Resources) {
	Ext.define("Terrasoft.configuration.ForecastItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.ForecastItemViewModel",

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		columns: {
			ForecastId: { dataValueType: Terrasoft.DataValueType.TEXT },
			PeriodsId: { dataValueType: Terrasoft.DataValueType.TEXT },
			Command: { dataValueType: Terrasoft.DataValueType.TEXT },
			BaseUrl: { dataValueType: Terrasoft.DataValueType.TEXT },
			Images: { dataValueType: Terrasoft.DataValueType.COLLECTION },
			MaxDisplayedRecords: { dataValueType: Terrasoft.DataValueType.NUMBER }
		},

		mixins: {
			"MiniPageUtilities": "Terrasoft.MiniPageUtilities"
		},

		messages: {
			/**
			 * Sign forecast column saved.
			 */
			"ForecastColumnSaved": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 * @inheritDoc Terrasoft.BaseViewModel#constructor
		 * @protected
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.sandbox.registerMessages(this.messages);
			this.sandbox.subscribe("ForecastColumnSaved", function() {
				if (!Terrasoft.Features.getIsEnabled("ForecastSaveHierarchy")) {
					this.$Command = "load";
					return;
				}
				this.$Command = "refreshcolumns";
			}, this, [this._getModuleId()]);
			this.$Images = this._getImagesList();
		},

		/**
		 * @private
		 */
		_getImagesList: function() {
			return [{
				name: "empty-blank-slate",
				url: this.Terrasoft.ImageUrlBuilder.getUrl(Resources.localizableImages.EmptyBlankSlate)
			}];
		},

		/**
		 * Returns module identifier.
		 * @return {String} The module identifier.
		 * @private
		 */
		_getModuleId: function() {
			return this.sandbox.id + "_ForecastColumnDesignerMiniPage";
		},

		/**
		 * Handles command finished.
		 */
		onCommandFinished: function() {
			this.$Command = "";
		},

		/**
		 * Shows mini-page.
		 */
		showMiniPage: function(operation, recordId, valuePairs) {
			const miniPageConfig = {
				recordId: recordId,
				miniPageSchemaName: "ForecastColumnDesignerMiniPage",
				entitySchemaName: "ForecastColumn",
				valuePairs: valuePairs,
				operation: operation,
				showDelay: 0,
				moduleId: this._getModuleId(),
				viewGeneratorClassName: "Terrasoft.ViewGenerator"
			};
			this._showMiniPageWithCheckingRights(miniPageConfig);
		},

		/**
		 * @private
		 */
		_showMiniPageWithCheckingRights: function(miniPageConfig) {
			RightUtilities.checkCanEdit({
				schemaName: "ForecastSheet",
				primaryColumnValue: this.$ForecastId
			}, function(result) {
				if (this.Ext.isEmpty(result)) {
					this.openMiniPage(miniPageConfig);
				} else {
					this.showInformationDialog(result);
				}
			}, this);
		},

		/**
		 * Shows mini-page in adding mode.
		 */
		showAddColumnMiniPage: function() {
			const valuePairs = this._getDefaultValues();
			this.showMiniPage(ConfigurationEnums.CardStateV2.ADD, Terrasoft.generateGUID(), valuePairs);
		},

		/**
		 * Shows mini-page in editing mode.
		 * @param {Event} event Event data.
		 * @param {Object} columnData Column data.
		 */
		showEditColumnMiniPage: function(event, columnData) {
			const valuePairs = this._getDefaultValues();
			this.showMiniPage(ConfigurationEnums.CardStateV2.EDIT, columnData.code, valuePairs);
		},

		/**
		 * @private
		 */
		_getDefaultValues: function() {
			return [{
				"name": "Sheet",
				"value": this.$ForecastId
			}, {
				"name": "forecastSourceItemName",
				"value": this.$ForecastSourceItemName
			}];
		}

	});

	return Terrasoft.ForecastItemViewModel;

});


