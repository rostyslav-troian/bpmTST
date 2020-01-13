Terrasoft.configuration.Structures["ForecastAngularModule"] = {innerHierarchyStack: ["ForecastAngularModule"]};
define("ForecastAngularModule", ["ForecastApp", "css!ForecastAngularModule", "BpmForecast", "MiniPageUtilities",
	"ForecastItemViewModel"], function() {
		Ext.define("Terrasoft.configuration.ForecastAngularModule", {
			extend: "Terrasoft.configuration.BaseModule",
			alternateClassName: "Terrasoft.ForecastAngularModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			view: null,
			model: null,

			messages: {
				/**
				 * @message GetForecastConfig
				 * Returns forecast config.
				 */
				"GetForecastConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message RefreshForecast
				 * Refresh forecast.
				 */
				"RefreshForecast": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message RefreshForecastColumns
				 * Refresh forecast columns.
				 */
				"RefreshForecastColumns": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseModule#init
			 * @override
			 */
			init: function() {
				this.sandbox.registerMessages(this.messages);
				this.subscribeMessages();
				const config = this.sandbox.publish("GetForecastConfig", null, [this.sandbox.id]);
				this.model = Ext.create("Terrasoft.ForecastItemViewModel", {
					sandbox: this.sandbox,
					Ext: this.Ext,
					Terrasoft: this.Terrasoft
				});
				if (!config) {
					return;
				}
				this.model.$BaseUrl = Terrasoft.workspaceBaseUrl;
				this.model.$ForecastId = config.forecastId;
				this.model.$PeriodsId = config.periodsId;
				this.model.$ForecastSourceItemName = config.forecastSourceItemName;
				this.model.$MaxDisplayedRecords = config.maxDisplayedRecords;
				this.model.$Command = "";
				this.callParent(arguments);
			},

			/**
			 * Refresh forecast data.
			 * @param {Boolean} overdueData Overdue forecast data.
			 */
			refreshForecast: function(overdueData) {
				this._updatePeriods();
				if (overdueData && Terrasoft.Features.getIsEnabled("ForecastSaveHierarchy")) {
					this.model.$Command = "overduedata";
				} else {
					this._loadData();
				}
			},

			/**
			 * Refresh forecast columns.
			 */
			refreshForecastColumns: function() {
				this._updatePeriods();
				this.model.$Command = "refreshcolumns";
			},

			/**
			 * @private
			 */
			_updatePeriods: function() {
				const config = this.sandbox.publish("GetForecastConfig", null, [this.sandbox.id]);
				this.model.$PeriodsId = config.periodsId;
			},

			/**
			 * @private
			 */
			_loadData: function() {
				this.model.$Command = "load";
			},

			/**
			 * Renders forecast application.
			 * @param {Object} renderTo Element to rendering.
			 * @private
			 */
			_renderForecast: function(renderTo) {
				this.view = Ext.create("Terrasoft.BpmForecast", {
					forecastId: { "bindTo": "ForecastId" },
					periodsId: { "bindTo": "PeriodsId" },
					command: { "bindTo": "Command" },
					commandFinished: { "bindTo": "onCommandFinished" },
					addColumnClicked: { "bindTo": "showAddColumnMiniPage" },
					editColumnClicked: { "bindTo": "showEditColumnMiniPage" },
					baseUrl: { "bindTo": "BaseUrl" },
					imagesList: { "bindTo": "Images" },
					maxDisplayedRecords: { "bindTo": "MaxDisplayedRecords" },
					parentComponent: renderTo.id
				});
				this.view.bind(this.model);
				this.view.render(renderTo);
			},

			/**
			 * @inheritDoc Terrasoft.BaseModule#render
			 * @override
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				if (!renderTo.dom) {
					renderTo = Ext.get(renderTo.id);
				}
				this._renderForecast(renderTo);
				this._loadData();
			},

			/**
			 * Subscribes to messages of the module.
			 * @private
			 */
			subscribeMessages: function() {
				this.sandbox.subscribe("RefreshForecast", this.refreshForecast, this, [this.sandbox.id]);
				this.sandbox.subscribe("RefreshForecastColumns", this.refreshForecastColumns, this, [this.sandbox.id]);
			},

			/**
			 * @inheritDoc Terrasoft.BaseModule#destroy
			 * @override
			 */
			destroy: function() {
				if (this.view) {
					this.view.destroy();
				}
				if (this.model) {
					this.model.destroy();
				}
				this.callParent(arguments);
			}

		});

		return Terrasoft.ForecastAngularModule;

	});


