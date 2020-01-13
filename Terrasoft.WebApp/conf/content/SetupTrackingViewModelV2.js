Terrasoft.configuration.Structures["SetupTrackingViewModelV2"] = {innerHierarchyStack: ["SetupTrackingViewModelV2"]};
define("SetupTrackingViewModelV2", ["ModalBox", "ServiceHelper", "SetupTrackingViewModelV2Resources",
		"EventTrackingEnums", "MaskHelper"],
	function(ModalBox, ServiceHelper, resources, EventTrackingEnums) {
		Ext.define("Terrasoft.configuration.SetupTrackingViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.SetupTrackingViewModel",
			Ext: null,
			sandbox: null,
			Terrasoft: null,
			columns: {
				/**
				 * The text of website js script.
				 */
				"ApiKey": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					value: ""
				}
			},

			/**
			 * On render handler.
			 */
			onRender: Ext.emptyFn,

			/**
			 * Close page.
			 */
			close: function() {
				if (ModalBox.getInnerBox()) {
					ModalBox.close(true);
				}
			},

			/**
			 * Cancel button click handler.
			 */
			onCancelButtonClick: function() {
				this.close();
			},
			/**
			 * Click event for button "Start".
			 */
			onStartButtonClick: function() {
				var scope = this;
				var maskId = Terrasoft.Mask.show({
					caption: resources.localizableStrings.MaskMessage,
					selector: ".ts-modalbox"
				});
				var apiKey = scope.get("ApiKey");
				var data = {
					apiKey: apiKey
				};
				ServiceHelper.callService("EventTrackingService", "StartTracking",
					function(response) {
						Terrasoft.Mask.hide(maskId);
						if (response && typeof response.StartTrackingResult !== "undefined") {
							switch (response.StartTrackingResult) {
								case EventTrackingEnums.StartTrackingResult.OK:
									scope.showInformationDialog(
										resources.localizableStrings.ServiceResponseOk,
										function() {
											this.close();
										});
									break;
								case EventTrackingEnums.StartTrackingResult.APIKEY_NOT_FOUND :
									scope.showInformationDialog(
										resources.localizableStrings.ServiceResponseApiKeyNotFound,
										function() {});
									break;
								case  EventTrackingEnums.StartTrackingResult.FAIL:
									scope.showInformationDialog(
										resources.localizableStrings.ServiceResponseFailMessage,
										function() {});
									break;
								case  EventTrackingEnums.StartTrackingResult.SYSSETTING_IS_EMPTY:
									scope.showInformationDialog(
										resources.localizableStrings.ServiceResponseSysSettingIsEmpty,
										function() {});
									break;
								case  EventTrackingEnums.StartTrackingResult.SERVICEURL_IS_EMPTY:
									scope.showInformationDialog(
										resources.localizableStrings.ServiceResponseServiceUrlIsEmpty,
										function() {});
									break;
							}
						} else {
							scope.showInformationDialog(
								resources.localizableStrings.StartTrackingServiceResponseFailMessage);
						}
					}, data, scope);
			},
			/**
			 * Initialize text of website js script.
			 */
			initApiKeyText: function() {
				this.Terrasoft.SysSettings.querySysSettingsItem("EventTrackingApiKey", function(value) {
					this.set("ApiKey", value);
				}, this);
			},

			/**
			 * Initialize model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.initApiKeyText();
				callback.call(scope || this);
			}
		});
	});


