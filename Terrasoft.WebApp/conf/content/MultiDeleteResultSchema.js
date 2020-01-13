Terrasoft.configuration.Structures["MultiDeleteResultSchema"] = {innerHierarchyStack: ["MultiDeleteResultSchema"]};
define('MultiDeleteResultSchemaStructure', ['MultiDeleteResultSchemaResources'], function(resources) {return {schemaUId:'0bcf5dc8-04d5-4d9c-9225-2ddfcd068211',schemaCaption: "MultiDeleteResultSchema", parentSchemaName: "", schemaName:'MultiDeleteResultSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MultiDeleteResultSchema", ["ConfigurationConstants"],
		function(ConfigurationConstants) {
			return {
				messages: {

					/**
					 * @message ListenMultiDeleteMessages
					 * Notification that listener for the multi delete messages has been initialized.
					 */
					"ListenMultiDeleteMessages": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message MultiDeleteStateChange
					 * Notification that has been changed the state of the deleted items.
					 */
					"MultiDeleteStateChange": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message MultiDeleteFinished
					 * Notification that the delete process has been finished.
					 */
					"MultiDeleteFinished": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message MultiDeleteStart
					 * Notification that the delete process has been started.
					 */
					"MultiDeleteStart": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message PushHistoryState
					 * Notification that the history state has been changed.
					 */
					"PushHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetHistoryState
					 * Message to get current history state.
					 */
					"GetHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}

				},
				attributes: {

					/**
					 * Identifier of the multi delete process.
					 */
					"OperationKey": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * Code for the view result button.
					 */
					"ShowDetailsCode": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: "showDetailsDialog"
					},

					/**
					 * Multi delete results page hash.
					 */
					"DeleteResultPageHash": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: "CardModuleV2/MultiDeleteResultPageV2/"
					},

					/**
					 * Code of the dialog clicked button.
					 */
					"DialogButtonReturnCode": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * Identification check of interval.
					 */
					"CheckIntervalIdentification": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * The interval (in seconds) idle body mask.
					 */
					"DisplayBodyMaskInterval": {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						value: 90
					}
				},
				methods: {
					/**
					 * Shows the information dialog with delete result.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 */
					showDeleteResult: function(config) {
						var isConfigSuitable = this.isConfigSuitableForDialog(config);
						if (isConfigSuitable) {
							var message = this.getDialogMessage(config);
							var buttons = this.getButtonsConfigs();
							this.showConfirmationDialog(message, this.onDialogButtonClick, buttons);
						}
					},

					/**
					 * @inheritDoc Terrasoft.BaseViewModel#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.subscribeMessages();
						this.sandbox.publish("ListenMultiDeleteMessages");
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
					 * @protected
					 * @overridden
					 */
					getGoogleTagManagerData: function() {
						var data = this.callParent(arguments);
						var dialogButtonReturnCode = this.get("DialogButtonReturnCode");
						if (!this.Ext.isEmpty(dialogButtonReturnCode)) {
							this.Ext.apply(data, {
								action: dialogButtonReturnCode
							});
						}
						return data;
					},

					/**
					 * Set into attribute new operation key.
					 * @param {String} config.operationKey New operation key.
					 * @protected
					 */
					setMultiDeleteStartInformation: function(config) {
						if (!config || !this.Terrasoft.isGUID(config.operationKey)) {
							throw new this.Terrasoft.NullOrEmptyException(
									this.get("Resources.Strings.EmptyConfig"));
						}
						var caption = this.get("Resources.Strings.PreparingData");
						this.showBodyMaskWithCaption(caption);
						this.set("OperationKey", config.operationKey);
					},

					/**
					 * Change state of the delete process.
					 * @param {Object} config Object with new state information.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 * @param {Number} config.operationKey Operation key of the delete process.
					 * @protected
					 */
					changeMultiDeleteState: function(config) {
						var totalCount = config.total;
						var processedCount = config.processed;
						this.showProcessMultiDelete(totalCount, processedCount);
						if (totalCount === processedCount) {
							this.finishedMultiDelete(config);
						}
					},

					/**
					 * Shows process of multi delete.
					 * @param {Number} total Total.
					 * @param {Number} processed Number of processed.
					 * @protected
					 */
					showProcessMultiDelete: function(total, processed) {
						var template = this.get("Resources.Strings.MaskCaptionTemplate");
						var caption = this.Ext.String.format(template, processed, total);
						this.showBodyMaskWithCaption(caption);
					},

					/**
					 * Finished delete operation.
					 * @param {Object} config Object with new state information.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 * @param {Number} config.operationKey Operation key of the delete process.
					 * @protected
					 */
					finishedMultiDelete: function(config) {
						if (!config || !config.operationKey) {
							throw new this.Terrasoft.NullOrEmptyException(
									this.get("Resources.Strings.EmptyConfig"));
						}
						this.hideBodyMask();
						this.sandbox.publish("MultiDeleteFinished", {
							operationKey: config.operationKey,
							success: config.skipped === 0
						});
						localStorage.removeItem(ConfigurationConstants.MultiDelete.MultiDeleteLocalStorageKey);
						this.showDeleteResult(config);
					},

					/**
					 * Handler for the information dialog click event.
					 * @param {String} returnCode Code of the clicked button.
					 * @protected
					 */
					onDialogButtonClick: function(returnCode) {
						this.set("DialogButtonReturnCode", returnCode);
						if (returnCode === this.get("ShowDetailsCode")) {
							this.showDetailDeleteResultPage();
						}
						this.sendGoogleTagManagerData();
					},

					/**
					 * Check that the received operation key match with current delete process operation key.
					 * @param {String} receivedOperationKey Received operation key.
					 * @return {Boolean} Is received operation key match with current delete process operation key.
					 * @private
					 */
					checkReceivedOperationKey: function(receivedOperationKey) {
						var currentOperationKey = this.get("OperationKey");
						return receivedOperationKey === currentOperationKey;
					},

					/**
					 * Subscribes for the messages.
					 * @private
					 */
					subscribeMessages: function() {
						this.sandbox.subscribe("MultiDeleteStart", this.setMultiDeleteStartInformation, this);
						this.sandbox.subscribe("MultiDeleteStateChange", this.onChangeMultiDeleteState, this);
					},

					/**
					 * Sets operation key attribute.
					 * @private
					 */
					setOperationKeyAttribute: function() {
						var operationKey = this.getLocalStorageOperationKey();
						if (operationKey) {
							this.setMultiDeleteStartInformation({
								operationKey: operationKey
							});
						}
					},

					/**
					 * Returns operation key from local storage.
					 * @return {Guid} Operation key.
					 * @private
					 */
					getLocalStorageOperationKey: function() {
						var operationKey = localStorage.getItem(ConfigurationConstants.
								MultiDelete.MultiDeleteLocalStorageKey);
						return operationKey;
					},

					/**
					 * Handler for the message about new multi delete state.
					 * @param {Object} config Object with new state information.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 * @param {Number} config.operationKey Operation key of the delete process.
					 * @private
					 */
					onChangeMultiDeleteState: function(config) {
						var isCurrentOperationKey = this.checkReceivedOperationKey(config.operationKey);
						if (isCurrentOperationKey) {
							this.changeMultiDeleteState(config);
						}
					},

					/**
					 * Checks the suitability of the config for the information dialog with delete result.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 * @return {Boolean} Result of the check.
					 * @private
					 */
					isConfigSuitableForDialog: function(config) {
						return config && (config.skipped > 0) && (config.processed > 0) && (config.total > 0);
					},

					/**
					 * Shows page with details of the delete.
					 * @private
					 */
					showDetailDeleteResultPage: function() {
						var hash = this.get("DeleteResultPageHash") + this.get("OperationKey");
						this.sandbox.publish("PushHistoryState", {
							hash: hash
						});
					},

					/**
					 * Returns array with the configuration objects for the buttons.
					 * @return {Array} Configuration objects for the buttons.
					 * @private
					 */
					getButtonsConfigs: function() {
						return [this.getDetailButtonConfig(), this.getCloseButtonConfig()];
					},

					/**
					 * Returns configuration object for the detail button.
					 * @return {Object} Configuration object for the detail button.
					 * @private
					 */
					getDetailButtonConfig: function() {
						var returnCode = this.get("ShowDetailsCode");
						var caption = this.get("Resources.Strings.DetailResult");
						return Terrasoft.getButtonConfig(returnCode, caption);
					},

					/**
					 * Returns configuration object for the close button.
					 * @return {Object} Configuration object for the close button.
					 * @private
					 */
					getCloseButtonConfig: function() {
						var button = this.Terrasoft.deepClone(this.Terrasoft.MessageBoxButtons.CLOSE);
						button.style = Terrasoft.controls.ButtonEnums.style.DEFAULT;
						return button;
					},

					/**
					 * Returns message for the confirmation dialog.
					 * @param {Object} config Object with new state information.
					 * @param {Number} config.total Count of the all items.
					 * @param {Number} config.processed Count of the processed items.
					 * @param {Number} config.skipped Count of the deleted items.
					 * @return {String} Message for the confirmation dialog.
					 * @private
					 */
					getDialogMessage: function(config) {
						var skippedCount = config.skipped;
						var totalCount = config.total;
						var deletedCount = totalCount - skippedCount;
						return skippedCount === totalCount
								? this.get("Resources.Strings.AllFieldItems")
								: this.Ext.String.format(
									this.get("Resources.Strings.MessageWithFailedItems"),
									deletedCount,
									totalCount,
									skippedCount
								);
					},

					/**
					 * Updates mask caption.
					 * @param {String} caption Caption value.
					 * @private
					 */
					showBodyMaskWithCaption: function(caption) {
						var config = {
							clearMasks: true,
							timeout: 0
						};
						if (!this.Ext.isEmpty(caption)) {
							config.caption = caption;
						}
						this.showBodyMask(config);
						this.checkDisplayIntervalBodyMask();
					},

					/**
					 * Checks the display interval the body mask.
					 * @private
					 */
					checkDisplayIntervalBodyMask: function() {
						var scope = this,
								intervalInSeconds = this.get("DisplayBodyMaskInterval"),
								interval = intervalInSeconds * 1000,
								intervalId = this.get("CheckIntervalIdentification");
						if (intervalId && !this.Ext.isEmpty(intervalId)) {
							clearTimeout(intervalId);
						}
						intervalId = setTimeout(function() {
							var operationKey = scope.getLocalStorageOperationKey();
							if (operationKey) {
								scope.showErrorTimeoutDialog.call(scope);
							}
						}, interval);
						this.set("CheckIntervalIdentification", intervalId);
					},

					/**
					 * Shows dialog with timeout error message.
					 * @private
					 */
					showErrorTimeoutDialog: function() {
						this.hideBodyMask();
						var errorMessage = this.get("Resources.Strings.ErrorTimeoutMessage");
						this.showInformationDialog(errorMessage);
					}
				}
			};
		});


