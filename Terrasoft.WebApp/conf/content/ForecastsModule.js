Terrasoft.configuration.Structures["ForecastsModule"] = {innerHierarchyStack: ["ForecastsModule"]};
define("ForecastsModule", ["ext-base", "BaseSchemaModuleV2", "ForecastBuilder", "ForecastSection"],
	function() {

		/**
		 * @class Terrasoft.configuration.ForecastsModule
		 * Forecasts section module.
		 */
		Ext.define("Terrasoft.configuration.ForecastsModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.ForecastsModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			viewModelClassName: "Terrasoft.BaseForecastsViewModel",

			builderClassName: "Terrasoft.ForecastBuilder",

			viewConfigClass: "Terrasoft.ForecastsViewConfig",

			/**
			 * Returns forecasts section module profile key.
			 * @override
			 * @protected
			 * @return {String} Forecast module profile key.
			 */
			getProfileKey: function() {
				return "ForecastId";
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#initSchemaName
			 * @override
			 */
			initSchemaName: function() {
				if (Terrasoft.Features.getIsEnabled("ForecastV2")) {
					this.schemaName = "ForecastSection";
					this.entitySchemaName = "Forecast";
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Creates forecasts view model.
			 * @param {Object} viewModelClass View model class.
			 * @return {Terrasoft.BaseViewModel} Forecast view model instance.
			 */
			createViewModel: function(viewModelClass) {
				return this.Ext.create(viewModelClass, {
					Ext: this.Ext,
					sandbox: this.sandbox,
					Terrasoft: this.Terrasoft
				});
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#generateSchemaStructure
			 * @override
			 */
			generateSchemaStructure: function(callback, scope) {
				if (Terrasoft.Features.getIsEnabled("ForecastV2")) {
					this.callParent(arguments);
					return;
				}
				var builder = Ext.create(this.builderClassName, {
					viewModelClass: this.viewModelClassName,
					viewConfigClass: this.viewConfigClass
				});
				var config = {};
				builder.build(config, function(viewModelClass, view) {
					callback.call(scope, viewModelClass, view);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#destroy
			 * @override
			 */
			destroy: function() {
				this.callParent(arguments);
				this.renderContainer = null;
			}

		});
		return Terrasoft.ForecastsModule;
	});


