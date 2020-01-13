Terrasoft.configuration.Structures["CallRecordUtilities"] = {innerHierarchyStack: ["CallRecordUtilities"]};
define("CallRecordUtilities", ["terrasoft", "CallRecordUtilitiesResources", "CtiConstants", "RightUtilities"],
	function(Terrasoft, resources, ctiConstants, RightUtilities) {

		/**
		 * @class Terrasoft.configuration.mixins.CallRecordUtilities
		 * Call record utilities mixin.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.CallRecordUtilities", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.CallRecordUtilities",

			//region Properties: Private

			/**
			 * Does user have "CanPlayRecordsInCalls" operation permission.
			 * @private
			 * @type {Boolean}
			 */
			canPlayRecordsInCalls: true,

			//endregion

			//region Methods: Private

			/**
			 * Stops record playing.
			 * @private
			 * @param {String} [primaryColumnValue] Call record primary column value. If not set - active row will be
			 * selected.
			 */
			stopPlaying: function(primaryColumnValue) {
				var rowViewModel = this.getRowViewModel(primaryColumnValue);
				if (!rowViewModel) {
					return;
				}
				var player = rowViewModel.getPlayer();
				if (player) {
					player.stop();
					if (player.getControlsEnabled()) {
						player.setControlsEnabled(false);
						rowViewModel.set("IsRecordPlayAvailable", true);
					}
				}
			},

			/**
			 * Gets user "CanPlayRecordsInCalls" operation permission.
			 * @private
			 */
			getCanPlayRecordsInCalls: function() {
				RightUtilities.checkCanExecuteOperation({
					operation: "CanPlayRecordsInCalls"
				}, function(сanPlayRecordsInCalls) {
					this.canPlayRecordsInCalls = сanPlayRecordsInCalls;
				}, this);
			},

			/**
			 * Checks if telephony is enabled.
			 * @private
			 * @return {Boolean} If enabled - true, otherwise - false.
			 */
			isTelephonyEnabled: function() {
				var ctiSettings = Terrasoft.SysValue.CTI;
				if (ctiSettings && !ctiSettings.isInitialized) {
					return true;
				}
				var connectionParams = ctiSettings && ctiSettings.connectionParams;
				return connectionParams && ctiSettings.canUseCti && connectionParams.disableCallCentre !== true;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Requests call record file urls.
			 * @protected
			 * @param {String} callId Call identifier.
			 * @param {Function} callback The callback function.
			 * @param {Boolean} callback.canGetCallRecords Indicates that recorded call files are available.
			 * @param {String[]} callback.callRecords Array of recorded call file urls.
			 */
			requestCallRecordUrl: function(callId, callback) {
				var args = {
					callId: callId,
					callback: callback
				};
				this.sandbox.publish("GetCallRecords", args, [ctiConstants.CallRecordsContextMessageId]);
			},

			/**
			 * Requests call records and prepares audio player in grid row.
			 * @protected
			 * @param {String} [primaryColumnValue] Call record primary column value. If not set - active row will be
			 * selected.
			 * @param {Boolean} [autoStartPlay] Indicates that after receiving call record player should start play it.
			 * @param {Function} [callback] The callback function.
			 * @param {Boolean} [callback.canGetCallRecords] Indicates that recorded call files are available.
			 * @param {String[]} [callback.callRecords] Array of recorded call file urls.
			 */
			prepareRowCallRecord: function(primaryColumnValue, autoStartPlay, callback) {
				if (!this.canPlayRecordsInCalls) {
					return;
				}
				var rowViewModel = this.getRowViewModel(primaryColumnValue);
				if (!rowViewModel) {
					return;
				}
				var callId = rowViewModel.get("IntegrationId");
				this.requestCallRecordUrl(callId, function(canGetCallRecords, callRecords) {
					rowViewModel.prepareAudioPlayer(autoStartPlay, canGetCallRecords, callRecords);
					if (callback) {
						callback(canGetCallRecords, callRecords);
					}
				}.bind(this));
			},

			/**
			 * Starts file downloading from url passed in callRecords array.
			 * @protected
			 * @param {String} fileName Name for the downloading file.
			 * @param {Boolean} canGetCallRecords Indicates that recorded call files are available.
			 * @param {String[]} callRecords Array of recorded call file urls.
			 */
			downloadCallRecordFile: function(fileName, canGetCallRecords, callRecords) {
				if (!canGetCallRecords || !Ext.isArray(callRecords) || (callRecords.length === 0)) {
					this.showInformationDialog(resources.localizableStrings.NoCallRecordsMessage);
					return;
				}
				var link = document.createElement("a");
				link.target = "_blank";
				document.body.appendChild(link);
				var fileIndex;
				callRecords.forEach(function(callRecord, index) {
					fileIndex = (index > 0) ? " (" + (index + 1) + ")" : "";
					link.download = fileName + fileIndex;
					link.href = callRecord;
					link.click();
				});
				document.body.removeChild(link);
			},

			/**
			 * Generates file name as following:
			 * <Date> <Time> <Operator_number> <Subscriber_number> <Operator> <Account> <Contact>.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} rowViewModel View model of the grid row.
			 * @return {String} File name.
			 */
			getCallFileName: function(rowViewModel) {
				var callData = [];
				var createdOn = rowViewModel.get("CreatedOn");
				var cultureSettings = Terrasoft.Resources.CultureSettings;
				callData.push(
					this.Ext.Date.format(createdOn, cultureSettings.dateFormat),
					this.Ext.Date.format(createdOn, cultureSettings.timeFormat)
				);
				var callerId = rowViewModel.get("CallerId");
				var calledId = rowViewModel.get("CalledId");
				var directionId = rowViewModel.get("Direction").value;
				if (directionId === ctiConstants.CallDirection.Incoming) {
					callData.push(callerId, calledId);
				} else {
					callData.push(calledId, callerId);
				}
				var createdBy = rowViewModel.get("CreatedBy");
				if (createdBy && createdBy.displayValue) {
					callData.push(createdBy.displayValue);
				}
				var account = rowViewModel.get("Account");
				if (account && account.displayValue) {
					callData.push(account.displayValue);
				}
				var contact = rowViewModel.get("Contact");
				if (contact && contact.displayValue) {
					callData.push(contact.displayValue);
				}
				return callData.join(" ");
			},

			/**
			 * Returns schema string resource.
			 * @protected
			 * @param {String} resourceName Resource name.
			 * @return {String} Schema string resource.
			 */
			getCallRecordUtilitiesStringResource: function(resourceName) {
				return resources.localizableStrings[resourceName];
			},

			/**
			 * Returns grid row view-model.
			 * @protected
			 * @param {String} [primaryColumnValue] Row primary column value.
			 * @return {Terrasoft.BaseViewModel} Grid row view-model.
			 */
			getRowViewModel: function(primaryColumnValue) {
				var rowId = primaryColumnValue || this.get("ActiveRow");
				var gridData = this.getGridData();
				var rowViewModelCollection = gridData.collection;
				return rowViewModelCollection.getByKey(rowId);
			},

			/**
			 * Requests call record file urls and starts downloading them.
			 * @protected
			 */
			requestAndDownloadCallRecord: function() {
				if (!this.canPlayRecordsInCalls) {
					return;
				}
				var rowViewModel = this.getRowViewModel();
				if (!rowViewModel) {
					return;
				}
				if (!this.isTelephonyEnabled()) {
					this.showInformationDialog(resources.localizableStrings.NoCallRecordsMessage);
					return;
				}
				var callId = rowViewModel.get("IntegrationId");
				var fileName = this.getCallFileName(rowViewModel);
				this.requestCallRecordUrl(callId, this.downloadCallRecordFile.bind(this, fileName));
			},

			/**
			 * Initializes mixin properties.
			 * @protected
			 */
			init: function() {
				this.getCanPlayRecordsInCalls();
			}

			//endregion

		});

		return Ext.create("Terrasoft.configuration.mixins.CallRecordUtilities");
	});


