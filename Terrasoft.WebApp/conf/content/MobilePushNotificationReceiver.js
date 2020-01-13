Terrasoft.configuration.Structures["MobilePushNotificationReceiver"] = {innerHierarchyStack: ["MobilePushNotificationReceiver"]};
/**
 * @class Terrasoft.configuration.PushNotificationReceiver
 * @abstract
 */
Ext.define("Terrasoft.configuration.PushNotificationReceiver", {
	extend: "Terrasoft.nativeApi.BasePushNotificationReceiver",
	alternateClassName: "Terrasoft.PushNotificationReceiver",

	/**
	 * Adds grid page to history state if there is no page has been opened.
	 * @protected
	 * @virtual
	 *
	 * @param {String} modelName Name of model
	 */
	openGridIfNeeded: function(modelName) {
		var mainController = Terrasoft.util.getMainController();
		var mainPageView = mainController.getView();
		var cardIsEmpty = mainPageView.getCardIsEmpty();
		if (cardIsEmpty) {
			mainPageView.setCardIsEmpty(false);
			mainPageView.selectByName(modelName, false, true);
			mainPageView.closeMenu();
			Terrasoft.util.openGridPage(modelName, {
				isStartPage: true,
				routeConfig: {
					skipLoading: true
				}
			});
		}
	},

	/**
	 * Opens page.
	 * @protected
	 * @virtual
	 * @param {String} modelName Name of model
	 * @param {String} recordId Id of recoed
	 */
	openPage: function(modelName, recordId) {
		var modelConfig = Terrasoft.ApplicationConfig.getModelConfig(modelName);
		var pageName = modelConfig && modelConfig[Terrasoft.PageTypes.Preview];
		if (!pageName) {
			Terrasoft.Logger.warn("PushNotificationReceiver.openPage: " +
				"Page for model '" + modelName + "' not found while opening page.");
			return;
		}
		this.openGridIfNeeded(modelName);
		Terrasoft.util.openPreviewPage(modelName, {
			recordId: recordId
		});
	},

	/**
	 * Checks, if record exists.
	 * @protected
	 * @virtual
	 * @param {String} modelName Name of model.
	 * @param {String} recordId Id of record.
	 * @param {Function} callback Callback function.
	 */
	checkRecordExistence: function(modelName, recordId, callback) {
		Terrasoft.StructureLoader.loadModelsWithDependencies({
			modelNames: [modelName],
			success: function() {
				var model = Ext.ClassManager.get(modelName);
				if (!model) {
					Terrasoft.Logger.warn("PushNotificationReceiver.checkRecordExistence: " +
						"Model with name '" + modelName + "' not found");
					return;
				}
				var queryConfig = Ext.create("Terrasoft.QueryConfig", {
					modelName: modelName,
					columns: [model.PrimaryColumnName]
				});
				model.load(recordId, {
					isCancelable: false,
					queryConfig: queryConfig,
					success: function(record) {
						var isExisted = !Ext.isEmpty(record);
						Ext.callback(callback, this, [isExisted]);
					},
					failure: function(record, operation) {
						var exception = operation.getError();
						Terrasoft.Logger.logException(Terrasoft.LogSeverityLevel.Error, exception);
						if (exception && exception instanceof Terrasoft.ODataItemNotFoundException) {
							Ext.callback(callback, this, [false]);
						}
					},
					scope: this
				});
			},
			scope: this
		});
	},

	/**
	 * Checks, if module available for opening preview page.
	 * @protected
	 * @virtual
	 * @param {String} moduleName Name of module.
	 * @return {Boolean} True, if available.
	 */
	checkIfModuleAvailable: function(moduleName) {
		var moduleConfig = Terrasoft.ApplicationConfig.getModuleConfig(moduleName);
		return moduleConfig && !moduleConfig.Hidden;
	},

	/**
	 * Called when notification has been tapped.
	 * @protected
	 * @virtual
	 * @param {Object} data Notification data.
	 */
	onTap: function(data) {
		if (Ext.isEmpty(data.entityName) || Ext.isEmpty(data.recordId)) {
			return;
		}
		if (!this.checkIfModuleAvailable(data.entityName)) {
			Terrasoft.MessageBox.showMessage(Terrasoft.LS["PushNotificationReceiver.ModuleIsNotAvailable"]);
		} else {
			this.checkRecordExistence(data.entityName, data.recordId, function(isExisted) {
				if (isExisted) {
					this.openPage(data.entityName, data.recordId);
				} else {
					var errorMessage = Terrasoft.ApplicationUtils.isOnlineMode() ?
						Terrasoft.LS["PushNotificationReceiver.RecordNotFound"] :
						Terrasoft.LS["PushNotificationReceiver.RecordNotLoaded"];
					Terrasoft.MessageBox.showMessage(errorMessage);
				}
			});
		}
	}

});

Terrasoft.PushNotification.setDefaultReceiver("Terrasoft.PushNotificationReceiver");


