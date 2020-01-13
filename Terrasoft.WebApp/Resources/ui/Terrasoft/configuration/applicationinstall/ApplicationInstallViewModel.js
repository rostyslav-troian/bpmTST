Ext.define("Terrasoft.core.configuration.ApplicationInstallViewModel", {
	alternateClassName: "Terrasoft.ApplicationInstallViewModel",
	extend: "Terrasoft.BaseViewModel",

	columns: {
		"IsSelectFilePanelVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: true
		},
		"IsApplicationInstallSuccessPanelVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsErrorPanelVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsMaskVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsDownloadLogButtonVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsRestoreBackupButtonVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsRestorationButtonsVisible": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"MaskCaption": {
			dataValueType: Terrasoft.DataValueType.TEXT,
			value: ""
		},
		"ErrorMessage": {
			dataValueType: Terrasoft.DataValueType.TEXT,
			value: ""
		},
		"ErrorDetails": {
			dataValueType: Terrasoft.DataValueType.TEXT,
			value: ""
		},
		"MessagePanelHeading": {
			dataValueType: Terrasoft.DataValueType.TEXT,
			value: ""
		},
		"MessagePanelDetails": {
			dataValueType: Terrasoft.DataValueType.TEXT,
			value: ""
		},
		"IsShowLicenseDetail": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsShowLicenseErrorDetail": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsShowLicenseDemoDetail": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsShowFreeAppDetail": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"IsShowDefaultAppDetail": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		"NeedRestartApp": {
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		}
	},
	resources: Terrasoft.Resources.ApplicationInstallationPage,

	/**
	 * Selected package file.
	 * @property {File}
	 */
	file: null,

	/**
	 * Configuration for panels representation.
	 * @private
	 * @property {Object}
	 */
	panels: {},

	/**
	 * Creates view model.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.init();
	},

	/**
	 * Initializes package installation view model.
	 */
	init: function() {
		this.panels = {
			SelectFile: ["IsSelectFilePanelVisible"],
			CreatingBackup: {
				flags: ["IsMessagePanelVisible"],
				message: {
					header: this.resources.Messages.CreatingBackup
				}
			},
			InstallingApplication: {
				flags: ["IsMessagePanelVisible"],
				message: {
					header: this.resources.Messages.InstallingApplication
				}
			},
			InstallingLicense: {
				flags: ["IsMessagePanelVisible"],
				message: {
					header: this.resources.Messages.InstallingLicense
				}
			},
			ApplicationInstalled: ["IsApplicationInstallSuccessPanelVisible"],
			DownloadFileError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.FileDownloadingFailed,
					details: this.resources.Messages.FileDownloadingFailedDescription
				}
			},
			InsufficientRightError: {
				flags: ["IsErrorPanelVisible"],
				message: {
					header: this.resources.Messages.InsufficientRightFailed
				}
			},
			GetMetaDataInfoError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.GetMetaDataInfoFailed
				}
			},
			GetFileLinkInfoError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.GetFileLinkInfoFailed
				}
			},
			UploadFileError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.FileUploadingFailed
				}
			},
			BackupPackagesError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.BackupFailed
				}
			},
			RestoreFromBackup: {
				flags: ["IsMessagePanelVisible"],
				message: {
					header: this.resources.Messages.RestoringFromBackup
				}
			},
			RestoredFromBackupSuccessful: {
				flags: ["IsRestoreBackupSuccessPanelVisible", "IsRestorationButtonsVisible"],
				message: {
					header: this.resources.Messages.RestoredFromBackupSuccessful,
					details: this.resources.Messages.ContinueWork
				}
			},
			RestorationFromBackupFailed: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.RestorationFromBackupFailed
				}
			},
			ApplicationInstallationError: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible", "IsRestoreBackupButtonVisible"],
				message: {
					header: this.resources.Messages.ApplicationInstallationFailed
				}
			},
			ValidationFailed: {
				flags: ["IsErrorPanelVisible", "IsDownloadLogButtonVisible"],
				message: {
					header: this.resources.Messages.ValidationFailed
				}
			}
		};
		this.initDownloadApplicationInfo();
	},

	_getFileName: function() {
		return this.appMarketplaceLink ? this.fileName : this.file.name;
	},

	_sanitize: function(name){
		return name.replace(/\.[^.]+$/, "");
	},

	_getCode: function() {
		var fileName = this._getFileName();
		return this.appMarketplaceLink ? this.applicationId : this._sanitize(fileName);
	},

	/**
	 * Initializes application info.
	 */
	initDownloadApplicationInfo: function() {
		var queryString = window.location.search.substr(1);
		var queryParams = (queryString).split("&");
		for (var i = 0; i < queryParams.length; i++) {
			var keyValuePair = queryParams[i].split("=");
			if (keyValuePair[0].toUpperCase() === "APPID") {
				this.applicationId = keyValuePair[1];
			}
			if (keyValuePair[0].toUpperCase() === "ONSITE") {
				this.isOnSite = keyValuePair[1];
			}
		}
		if (this.applicationId) {
			this.getMetaInfoUrl(this.applicationId);
		}
	},

	getMetaInfoUrl: function(applicationId) {
		var request = Ext.create("Terrasoft.ApplicationInstallRequest", {
			fileName: this.applicationUrl,
			serviceName: "AppInstallerService.svc",
			serviceMethod: "GetAppMetaInfoServiceUrl"
		});
		request.execute(function(response) {
			if (response.success) {
				var getAppMetaInfoUrl = response.url;
				this.setApplicationInfo(applicationId, getAppMetaInfoUrl);
			}
		}, this);
	},

	/**
	 * Install application info.
	 */
	setApplicationInfo: function(applicationId, url) {
		var urlValue = url + "?appId=" + applicationId;
		var jsonDataValue = Ext.encode({"appId": applicationId});
		var options = {
			url: urlValue,
			method: "GET",
			scope: this,
			callback: function(request, success, response) {
				if (success) {
					try {
						var getAppMetaInfoResult = Terrasoft.decode(response.responseText);
						if (getAppMetaInfoResult.FileLink === "") {
							this.setColumnValue("GetFileLinkInfoFailedError", true);
							this.showErrorPanel(this.panels.GetFileLinkInfoError);
						}
						this.applicationUrl = getAppMetaInfoResult.FileLink;
						this.set("applicationName", getAppMetaInfoResult.Name);
						this.appName = getAppMetaInfoResult.Name;
						this.set("applicationMaintainer", getAppMetaInfoResult.Maintainer);
						this.appMaintainer = getAppMetaInfoResult.Maintainer;
						var lastUpdate = getAppMetaInfoResult.LastUpdate;
						var date = new Date(parseInt(lastUpdate, 10));
						var options = {
							year: "numeric",
							month: "short",
							day: "numeric"
						};
						var stringDate = date
							.toLocaleString(Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue.substring(0, 2), options);
						this.set("applicationUpdateDate", stringDate);
						this.set("applicationCostValue", getAppMetaInfoResult.DistributionType);
						this.appSupportEmail = getAppMetaInfoResult.SupportEmail;
						this.appLastUpdate = lastUpdate;
						this.appMarketplaceLink = getAppMetaInfoResult.MarketplaceLink;
						this.appFileLink = getAppMetaInfoResult.FileLink;
						this.appHelpLink = getAppMetaInfoResult.HelpLink;
						this.appOrderLink = getAppMetaInfoResult.OrderLink;
						this.isLicenseRequired = getAppMetaInfoResult.IsLicenseRequired || false;
						var appUrl = this.applicationUrl;
						this.fileName = appUrl.substring(appUrl.lastIndexOf("/") + 1, appUrl.length);
						this.applicationId = applicationId;
						this.appLicName = getAppMetaInfoResult.AppLicName;
						var messagesResources = Terrasoft.Resources.ApplicationInstallationPage.Messages;
						var mailToText = messagesResources.MailToText.replace("{0}", this.appName);
						this.mailToFullText = "mailto:" + messagesResources.Email + "?subject=" + mailToText +
							"&body=" + mailToText;
						this.setColumnValue("mailToFullText", this.mailToFullText);
					} catch (e) {
						this.setColumnValue("GetMetaDataInfoFailedError", true);
						this.showErrorPanel(this.panels.GetMetaDataInfoError);
					}
				} else {
					this.setColumnValue("GetMetaDataInfoFailedError", true);
					this.showErrorPanel(this.panels.GetMetaDataInfoError);
				}
			},
			jsonData: jsonDataValue
		};
		if (window.loginTimeout) {
			options.timeout = window.loginTimeout;
		}
		Terrasoft.AjaxProvider.request(options);
	},

	/**
	 * Creates url for package installation service with specified method name.
	 * @param {String} methodName Name of the service's method.
	 * @private
	 */
	createServiceUrl: function(methodName) {
		var serviceUrl = "ServiceModel/PackageInstallerService.svc";
		return Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, serviceUrl, methodName);
	},

	/**
	 * Shows mask on select file panel.
	 * @private
	 */
	showMask: function() {
		this.setColumnValue("IsMaskVisible", true);
	},

	/**
	 * Hides mask on select file panel.
	 * @private
	 */
	hideMask: function() {
		this.setColumnValue("IsMaskVisible", false);
	},

	/**
	 * Shows panel with error information.
	 * @private
	 * @param {Object} panelConfig Object which configures object representation.
	 */
	showErrorPanel: function(panelConfig) {
		var errorDetails = panelConfig.message.details || this.resources.Messages.ContinueWork;
		this.setColumnValue("ErrorMessage", panelConfig.message.header);
		this.setColumnValue("ErrorDetails", errorDetails);
		this.showPanel(panelConfig);
	},

	/**
	 * Displays special message panel on page using configuration object.
	 * @param {Object} panelConfig Configuration object.
	 */
	showMessagePanel: function(panelConfig) {
		var messageDetails = panelConfig.message.details || this.resources.Messages.WaitUntilComplete;
		this.setColumnValue("MessagePanelHeading", panelConfig.message.header);
		this.setColumnValue("MessagePanelDetails", messageDetails);
		this.showPanel(panelConfig);
	},

	/**
	 * Hides all panels on page.
	 */
	hideAllPanels: function() {
		Terrasoft.each(this.panels, function(config) {
			var flags = this.getPanelFlags(config);
			Terrasoft.each(flags, function(flag) {
				this.setColumnValue(flag, false);
			}.bind(this));
		}.bind(this));
	},

	/**
	 * Displays panel on page using configuration object.
	 * @private
	 * @param {Object} panelConfig Configuration object.
	 */
	showPanel: function(panelConfig) {
		this.hideAllPanels();
		var flags = this.getPanelFlags(panelConfig);
		Terrasoft.each(flags, function(flag) {
			this.setColumnValue(flag, true);
		}.bind(this));
	},

	/**
	 * Returns panel flags from panel config.
	 * @private
	 * @param {Object} panelConfig Panel configuration object.
	 * @returns {String[]}
	 */
	getPanelFlags: function(panelConfig) {
		return Ext.isObject(panelConfig) ? panelConfig.flags : panelConfig;
	},

	/**
	 * Get is demo mode
	 * @private
	 * @param {Function} callback Next callback function.
	 */
	_getIsDemoMode: function(callback) {
		var request = Ext.create("Terrasoft.ApplicationInstallRequest", {
			fileName: this.applicationUrl,
			serviceName: "AppInstallerService.svc",
			serviceMethod: "GetIsDemoMode"
		});
		this.showMask();
		request.execute(function(response) {
			this.hideMask();
			this.isDemoMode = response.value;
			callback.call(this);
		}, this);
	},

	/**
	 * Download file to server.
	 * @private
	 * @param {Function} callback Download completed callback.
	 */
	_download: function(callback) {
		var request = Ext.create("Terrasoft.ApplicationInstallRequest", {
			fileName: this.applicationUrl,
			serviceName: "AppInstallerService.svc",
			serviceMethod: "DownloadApp"
		});
		this.showMask();
		request.execute(function(response) {
			this.hideMask();
			callback.call(this, response);
		}, this);
	},

	/**
	 * Processing result of file downloading.
	 * @private
	 * @param {Function} callback Next function callback.
	 * @param {Object} response Response of the download operation.
	 */
	_processFileDownloadedResponse: function(callback, response) {
		if (response.success) {
			this.hideMask();
			this.AppInfo = this._getDownloadedAppInfo();
			callback();
		} else if (response.errorInfo.errorCode === "Forbidden") {
			this.setColumnValue("IsShowDefaultAppDetail", true);
			this.showErrorPanel(this.panels.InsufficientRightError);
		} else {
			this.setColumnValue("IsShowDefaultAppDetail", true);
			this.showErrorPanel(this.panels.DownloadFileError);
		}
	},

	_getDownloadedAppInfo: function() {
		return {
			"Name": this.appName,
			"Code": this.applicationId,
			"ZipPackageName": unescape(this.fileName),
			"Maintainer": this.appMaintainer,
			"SupportEmail": this.appSupportEmail,
			"LastUpdateString": this.appLastUpdate,
			"MarketplaceLink": this.appMarketplaceLink,
			"FileLink": this.appFileLink,
			"HelpLink": this.appHelpLink,
			"OrderLink": this.appOrderLink,
			"IsLicenseRequired": this.isLicenseRequired
		};
	},

	/**
	 * Uploads file to server.
	 * @private
	 * @param {Function} callback Upload completed callback.
	 */
	_upload: function(callback) {
		var url = this.createServiceUrl("UploadPackage");
		var fileUploadConfig = {
			url: url,
			files: {files: [this.file]},
			chunkSize: 0.5 * FileAPI.MB,
			chunkUploadRetry: 0
		};
		Terrasoft.fileUpload(fileUploadConfig, callback, this);
	},

	/**
	 * Processing result of file uploading.
	 * @private
	 * @param {Function} next Next function callback.
	 * @param {String} error Error happened during uploading.
	 */
	_processFileUploadedErrorMessage: function(next, error) {
		if (error) {
			if (error === "Forbidden") {
				this.setColumnValue("IsShowDefaultAppDetail", true);
				this.showErrorPanel(this.panels.InsufficientRightError);
			} else {
				this.setColumnValue("IsShowDefaultAppDetail", true);
				this.showErrorPanel(this.panels.UploadFileError);
			}
		} else {
			this.hideMask();
			this.AppInfo = this._getUploadedAppInfo();
			next();
		}
	},

	_getUploadedAppInfo: function() {
		var fileName = this._sanitize(this.file.name);
		return {
			"Name": fileName,
			"Code": fileName,
			"ZipPackageName": this.file.name
		};
	},


	_validate: function(callback) {
		this.showMask();
		var jsonDataValue = {
			"Code": unescape(this._getCode()),
			"ZipPackageName": unescape(this._getFileName())
		};
		var options = {
			url: "../ServiceModel/PackageInstallerService.svc/Validate",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			callback: callback,
			jsonData: jsonDataValue,
			timeout: 60 * 60 * 1000
		};
		Terrasoft.AjaxProvider.request(options);
	},

	_processValidationResult: function(callback, result, success, response) {
		if (success && JSON.parse(response.responseText).success) {
			callback();
		} else {
			this.hideMask();
			this.showErrorPanel(this.panels.ValidationFailed);
		}
	},

	_createBackup: function(callback) {
		this.hideMask();
		this.showMessagePanel(this.panels.CreatingBackup);
		this.showMask();
		var code = this._getCode();
		var jsonDataValue = {
			"Code": unescape(code),
			"ZipPackageName": unescape(this._getFileName())
		};
		var options = {
			url: "../ServiceModel/PackageInstallerService.svc/CreateBackup",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			callback: callback,
			jsonData: jsonDataValue,
			timeout: 60 * 60 * 1000
		};
		Terrasoft.AjaxProvider.request(options);
	},

	/**
	 * Installs application.
	 * @private
	 * @param {Function} callback Next function callback.
	 * @param {Terrasoft.BaseResponse} result Result of backup creation.
	 * @param success
	 * @param response
	 */
	_installApplication: function(callback, result, success, response) {
		var responseSuccess = JSON.parse(response.responseText).success;
		if (success && responseSuccess) {
			this.hideMask();
			this.showMessagePanel(this.panels.InstallingApplication);
			this.showMask();
			var options = {
				url: "../ServiceModel/AppInstallerService.svc/InstallAppFromFile",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				scope: this,
				callback: callback,
				jsonData: this.AppInfo,
				timeout: 60 * 60 * 1000
			};
			Terrasoft.AjaxProvider.request(options);
		} else {
			this.showErrorPanel(this.panels.BackupPackagesError);
		}
	},

	/**
	 * Processing result of file installation.
	 * @private
	 * @param {Function} callback Next function callback.
	 * @param {Terrasoft.BaseResponse} result Result of package installation.
	 * @param success
	 * @param response
	 */
	_processInstallationResult: function(callback, result, success, response) {
		this.hideMask();
		if (success) {
			var responseJson = JSON.parse(response.responseText);
			var responseSuccess = responseJson.success;
			if (responseSuccess) {
				this.$NeedRestart = responseJson.needRestartApp;
				callback.call(this);
				return;
			}
		}
		this.setColumnValue("IsShowDefaultAppDetail", true);
		this.showErrorPanel(this.panels.ApplicationInstallationError);
	},

	/**
	 * Requests application licence.
	 * @private
	 * @param {Function} callback Next function callback.
	 */
	_licenseApplication: function(callback) {
		if (this.isOnSite === "1" || this.isDemoMode || !this.isLicenseRequired) {
			callback.apply(this, arguments);
			return;
		}
		this.showPanel(this.panels.InstallingLicense);
		this.showMask();
		var jsonDataValue = this.AppInfo;
		Ext.apply(jsonDataValue, {
			"Name": this.fileName,
			"Code": this.appLicName,
			"ZipPackageName": this.fileName,
		});
		var options = {
			url: "../ServiceModel/AppInstallerService.svc/OrderAppLicense",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			scope: this,
			callback: callback,
			jsonData: jsonDataValue,
			timeout: 60 * 60 * 1000
		};
		Terrasoft.AjaxProvider.request(options);
	},

	/**
	 * Processing result of file license installation.
	 * @private
	 * @param {Function} callback Next function callback.
	 * @param {Terrasoft.BaseResponse} result Result of license installation.
	 */
	_processLicenseInstallation: function(callback, result, success) {
		this.showPanel(this.panels.ApplicationInstalled);
		this.hideMask();
		if (!this.isLicenseRequired) {
			this.setColumnValue("IsShowFreeAppDetail", true);
		} else if (this.isDemoMode) {
			this.setColumnValue("IsShowLicenseDemoDetail", true);
		} else if (!success || this.isOnSite === "1") {
			this.setColumnValue("IsShowLicenseErrorDetail", true);
		} else {
			this.setColumnValue("IsShowLicenseDetail", true);
		}
		callback.apply(this, arguments);
	},

	/**
	 * Restart web application.
	 * @private
	 * @param {Function} callback Next function callback.
	 */
	_restartApp: function(callback) {
		if (this.$NeedRestart === true) {
			this.showMask();
			var options = {
				url: "../ServiceModel/AppInstallerService.svc/RestartApp",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				scope: this,
				callback: callback,
				jsonData: this.AppInfo,
				timeout: 60 * 60 * 1000
			};
			Terrasoft.AjaxProvider.request(options);
		}
	},

	/**
	 * Processing result of web application restart.
	 * @private
	 * @param {Function} callback Next function callback.
	 * @param {Terrasoft.BaseResponse} result Result of license installation.
	 * @param success
	 * @param response
	 */
	_processingRestartApp: function(callback, result, success, response) {
		this.hideMask();
		if (success) {
			var responseJson = JSON.parse(response.responseText);
			var responseSuccess = responseJson.success;
			if (responseSuccess) {
				return;
			}
		}
		this.showErrorPanel(this.panels.ApplicationInstallationError);
	},

	_onFileApplicationInstallation: function (callback) {
		this.hideMask();
		this.setColumnValue("IsShowDefaultAppDetail", true);
		this.showPanel(this.panels.ApplicationInstalled);
		callback.apply(this, arguments);
	},

	/**
	 * Handler for upload package file selection event.
	 * @param Array files
	 */
	onFilesSelected: function(files) {
		this.file = files[0];
		this.$NeedRestart = false;
		Terrasoft.chain(
			this._upload,
			this._processFileUploadedErrorMessage,
			this._validate,
			this._processValidationResult,
			this._createBackup,
			this._installApplication,
			this._processInstallationResult,
			this._onFileApplicationInstallation,
			this._restartApp,
			this._processingRestartApp,
			this
		);
	},

	/**
	 * Handler for Install button event.
	 */
	onInstalledButtonClick: function() {
		this.$NeedRestart = false;
		Terrasoft.chain(
			this._getIsDemoMode,
			this._download,
			this._processFileDownloadedResponse,
			this._validate,
			this._processValidationResult,
			this._createBackup,
			this._installApplication,
			this._processInstallationResult,
			this._licenseApplication,
			this._processLicenseInstallation,
			this._restartApp,
			this._processingRestartApp,
			this
		);
	},

	/**
	 * Handler for cancel button event.
	 */
	onCancelButtonClick: function() {
		window.location = "ViewModule.aspx#SectionModuleV2/InstalledAppSection";
	},

	/**
	 * Handler for package installation log download button click.
	 */
	onDownloadLogClick: function() {
		var downloadLink = this.createServiceUrl("GetLogFile");
		Terrasoft.download(downloadLink);
	},

	/**
	 * Handler for backup restoration button click.
	 */
	onRestoreBackupClick: function() {
		var appName = "";
		if (this.file) {
			appName = this._sanitize(this.file.name);
		} else if (this.applicationId) {
			appName = this.applicationId;
		}
		var request = Ext.create("Terrasoft.ApplicationInstallRequest", {
			fileName: unescape(appName),
			serviceName: "PackageInstallerService.svc",
			serviceMethod: "RestoreFromBackup"
		});
		this.hideMask();
		this.showMessagePanel(this.panels.RestoreFromBackup);
		this.showMask();
		request.execute(function(result) {
			this.hideMask();
			if (result.success) {
				this.showMessagePanel(this.panels.RestoredFromBackupSuccessful);
			} else {
				this.showErrorPanel(this.panels.RestorationFromBackupFailed);
			}
		}.bind(this));
	}
});