Terrasoft.configuration.Structures["SysLogoSettingsModule"] = {innerHierarchyStack: ["SysLogoSettingsModule"]};
define("SysLogoSettingsModule", ["SysLogoSettingsModuleResources", "MaskHelper", "SecurityUtilities", "BaseModule",
		"ContextHelpMixin"],
	function(resources, maskHelper) {

		/**
		 * @class Terrasoft.SysLogoSettingsModule
		 * ##### ###### ############## ######### ######## ############# ######### ##########.
		 */
		return Ext.define("Terrasoft.configuration.SysLogoSettingsModule", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.SysLogoSettingsModule",
			mixins: {
				SecurityUtilitiesMixin: "Terrasoft.SecurityUtilitiesMixin",

				/**
				 * @class ContextHelpMixin ######### ########### ###### # ####### ######## #######.
				 */
				ContextHelpMixin: "Terrasoft.ContextHelpMixin"
			},

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ####### ####, ### ###### ############### ##########.
			 * @private
			 * @type {Boolean}
			 */
			isAsync: true,

			/**
			 * ###### ####-########## ######### ########. ### ### ######## - ### ### ######### #########, # ######## -
			 * #### ########## (###, #########, ########).
			 * @private
			 * @type {Object}
			 */
			logoSysSettingsCfg: null,

			/**
			 * ############# ######### # ######### ######## ######### ######## # ############# ########## ##########,
			 * ##### ####, ####### ###### ############# ######.
			 * @param {Function} callback #######, ####### ##### ####### ## ##########
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback
			 * @virtual
			 */
			init: function(callback, scope) {
				this.callParent(arguments);
				this.checkAvailability(function() {
					var localizableStrings = resources.localizableStrings;
					var headerCaption = localizableStrings.HeaderCaption;
					this.sandbox.publish("ChangeHeaderCaption", {
						isMainMenu: false,
						caption: headerCaption,
						dataViews: this.Ext.create("Terrasoft.Collection")
					});
					this.sandbox.subscribe("NeedHeaderCaption", function() {
						this.sandbox.publish("InitDataViews", {
							isMainMenu: false,
							caption: headerCaption,
							dataViews: this.Ext.create("Terrasoft.Collection")
						});
					}, this);
					this.initHistoryState();
					this.initContextHelp();
					var logoSysSettingsNames = [
						"LogoImage",
						"MenuLogoImage",
						"HeaderLogoImage"
					];
					this.logoSysSettingsCfg = {};
					this.Terrasoft.SysSettings.querySysSettings(logoSysSettingsNames, function(sysSettings) {
						this.Terrasoft.each(sysSettings, function(sysSettingValue, sysSettingName) {
							this.logoSysSettingsCfg[sysSettingName] = {
								code: sysSettingName,
								value: sysSettingValue,
								caption: localizableStrings[sysSettingName + "Caption"] || sysSettingName
							};
						}, this);
						this.viewModel = this.createViewModel();
						callback.call(scope);
					}, this);
				});
			},

			/**
			 * ########## ######## ######## ###### ## ####### ###### #### # ############ ### ############# ####### ###
			 * ########
			 * @protected
			 * @virtual
			 * @return {String|null} ######## ########.
			 */
			getSecurityOperationName: function() {
				return "CanManageLogo";
			},

			/**
			 * ############# ######### ######## ########### ########## ################ ########.
			 * @protected
			 * @virtual
			 * @param {String} operationName ### ################ ########.
			 * @param {Boolean} result ######### ######## ########### ########## ################ ########.
			 */
			setCanExecuteOperationResult: Terrasoft.emptyFn,

			/**
			 * ####### ############# ######, ########## ### # ########## # ######### ######## ###### ############# #
			 * #############.
			 * @param {Ext.Element} renderTo #########, # ####### ########## ######.
			 */
			render: function(renderTo) {
				var view = this.generateView();
				view.bind(this.viewModel);
				view.render(renderTo);
				maskHelper.HideBodyMask();
			},

			/**
			 * ####### ###### ############# #######.
			 * @return {Terrasoft.BaseViewModel} ###### ############# ######.
			 */
			createViewModel: function() {
				var Ext = this.Ext;
				var Terrasoft = this.Terrasoft;
				var sandbox = this.sandbox;
				var columns = {};
				var columnValues = {};
				var localizableStrings = resources.localizableStrings;
				var logoSysSettingsCfg = this.logoSysSettingsCfg;
				Terrasoft.each(logoSysSettingsCfg, function(logoSysSettingConfig) {
					var sysSettingCode = logoSysSettingConfig.code;
					var sysSettingValue = logoSysSettingConfig.value;
					columns[sysSettingCode] = {
						dataValueType: Terrasoft.DataValueType.BLOB
					};
					columnValues[sysSettingCode] = sysSettingValue;
					var defaultSysSettingValueColumnName = "default" + sysSettingCode;
					columns[defaultSysSettingValueColumnName] = {
						dataValueType: Terrasoft.DataValueType.BLOB
					};
					columnValues[defaultSysSettingValueColumnName] = sysSettingValue;
					var sysSettingValueSysImageIdColumnName = sysSettingCode + "_sysImageId";
					columns[sysSettingValueSysImageIdColumnName] = {
						dataValueType: Terrasoft.DataValueType.TEXT
					};
					columnValues[sysSettingValueSysImageIdColumnName] = null;
				}, this);
				columns.MarkerValue = {
					dataValueType: Terrasoft.DataValueType.TEXT
				};
				columnValues.MarkerValue = "sys-logo-settings";
				return Ext.create("Terrasoft.BaseViewModel", {
					columns: columns,
					values: columnValues,
					validationConfig: {},
					methods: {

						/**
						 * ########## ####### ####, ############# ## ###### ########## ######### ########.
						 * @return {Boolean}
						 */
						getSaveButtonVisible: function() {
							var changedSysSettings = this.getChangedSysSettings();
							var changedSysSettingsNames = Terrasoft.keys(changedSysSettings);
							return (changedSysSettingsNames.length > 0);
						},

						/**
						 * ########## ####### ######### ###### "#######".
						 * @return {Boolean}
						 */
						getCloseButtonVisible: function() {
							var changedSysSettings = this.getChangedSysSettings();
							var changedSysSettingsNames = Terrasoft.keys(changedSysSettings);
							return changedSysSettingsNames.length === 0;
						},

						/**
						 * ########## ###### # ########### ######### ###########. ### ######## ####### -
						 * ### ######### #########, # ######## ######## - ##### ######## #########. #### ########
						 * ######### ######### ## ########, # ####### ## ##### ################ ########.
						 * @return {Object}
						 */
						getChangedSysSettings: function() {
							var changedSysSettings = {};
							Terrasoft.each(logoSysSettingsCfg, function(logoSysSettingConfig) {
								var sysSettingCode = logoSysSettingConfig.code;
								var value = this.get(sysSettingCode);
								var defValue = this.get("default" + sysSettingCode);
								if (value !== defValue) {
									changedSysSettings[sysSettingCode] = value;
								}
							}, this);
							return changedSysSettings;
						},

						/**
						 * ########## ####### ## ###### ########## ######### ######### ########. ########## ######
						 * ## ###### ### ########## ######### ########. #### ###### ## #### ########## ######,
						 * ##### ########## ############### #########.
						 */
						onSaveClick: function() {
							this.set("MarkerValue", "saving");
							var postData = {
								sysSettingsValues: this.getChangedSysSettings()
							};
							Terrasoft.SysSettings.postSysSettingsValues(postData, function(result) {
								if (!result.success) {
									this.showInformationDialog(localizableStrings.ServerErrorMessage, Ext.emptyFn);
									return;
								}
								this.onSysSettingsSaved(result.saveResult);
							}, this);
						},

						/**
						 * ########## ###### ####### ## ###### ########### ######### ########. #### ########## ######
						 * ######, ############ ########### ############### ######### # ##### ######## #######
						 * ## ########## ########, ##### ########## ######### # ########### # ############# #########.
						 * @param {Object} saveResult ######### ###### ####### ## ###### ########## ######.
						 */
						onSysSettingsSaved: function(saveResult) {
							var saveErrors = [];
							Terrasoft.each(saveResult, function(saveResult, sysSettingCode) {
								if (saveResult !== true) {
									saveErrors.push(sysSettingCode);
								}
							}, this);
							if (saveErrors.length !== 0) {
								this.set("MarkerValue", "sys-logo-settings");
								var sysSettingsCaptions = [""];
								Terrasoft.each(saveErrors, function(sysSettingCode) {
									sysSettingsCaptions.push(logoSysSettingsCfg[sysSettingCode].caption);
								}, this);
								var saveErrorMessage = localizableStrings.SaveErrorMessage.replace(/\\n/g, "\n");
								var errorMessage = Terrasoft.getFormattedString(saveErrorMessage,
									sysSettingsCaptions.join("\n- "));
								this.showInformationDialog(errorMessage, Ext.emptyFn);
							} else {
								window.location.reload();
							}
						},

						/**
						 * ############### ######## ######### ######## # ######### ## #########, ## ## ##### ##########.
						 */
						restoreInitialLogoSysSettings: function() {
							Terrasoft.each(logoSysSettingsCfg, function(logoSysSettingConfig) {
								var sysSettingCode = logoSysSettingConfig.code;
								var value = this.get(sysSettingCode);
								var initValue = this.get("default" + sysSettingCode);
								if (value !== initValue) {
									this.updateSysSettingValue({
										code: sysSettingCode,
										value: initValue,
										imageId: null
									});
								}
							}, this);
						},

						/**
						 * ########## ####### ####### ## ###### "######".
						 */
						onCancelClick: function() {
							this.restoreInitialLogoSysSettings();
						},

						/**
						 * ########## ####### ## ###### ######. ######### ####### ## ########## ########.
						 */
						onCloseClick: function() {
							sandbox.publish("BackHistoryState");
						},

						/**
						 * ########## Url # ####### data-url, ### ########### ######## ######## ###########
						 * ######### ######## ############# #########.
						 * @param {String} sysSettingCode ### ######### #########.
						 * @return {String} Url # ####### data-url.
						 */
						getImageSrc: function(sysSettingCode) {
							return this.getSysSettingImageSrc({
								code: sysSettingCode,
								value: this.get(sysSettingCode),
								sysImageId: this.get(sysSettingCode + "_sysImageId")
							});
						},

						/**
						 * @member Terrasoft
						 * @inheritdoc Terrasoft.SysLogoSettingsModule.getSysSettingUrlValue
						 */
						getSysSettingImageSrc: this.getSysSettingUrlValue,

						/**
						 * ########## ####### ######### ######## ######### #########.
						 * @param {File} file #### # ############, ####### ### ###### #############.
						 * @param {String} sysSettingCode ### ######### #########.
						 */
						onImageChange: function(file, sysSettingCode) {
							if (file) {
								var self = this;
								FileAPI.readAsBinaryString(file, function(e) {
									var eventType = e.type;
									if (eventType === "load") {
										self.onBinaryStringRead(sysSettingCode, file, e.result);
									} else if (eventType === "error") {
										throw new Terrasoft.UnknownException({
											message: e.error
										});
									}
								});
							} else {
								this.updateSysSettingValue({
									code: sysSettingCode,
									value: this.get("default" + sysSettingCode),
									imageId: null
								});
							}
						},

						/**
						 * ########## ####### ###### ##### # ######## ######. ##### ######### ######## ###### #
						 * ###### base64 # ######### ######## # ###### #############. ### IE, ############# ###########
						 * ######## ########### ##### ## ###### # ####### SysImage.
						 * @param {String} sysSettingCode ### ######### #########.
						 * @param {File} imageFile ########### #### # ############.
						 * @param {String} binaryString ###### # ############ ######### ####### #####.
						 */
						onBinaryStringRead: function(sysSettingCode, imageFile, binaryString) {
							var sysSettingValue = btoa(binaryString);
							if (Ext.isIE) {
								Terrasoft.ImageApi.upload({
									onComplete: this.onFileUpload.bind(this, sysSettingCode, sysSettingValue),
									onError: function(imageId, error) {
										if (error) {
											throw new Terrasoft.UnknownException({
												message: error
											});
										}
									},
									scope: this,
									file: imageFile
								});
							} else {
								this.set(sysSettingCode, sysSettingValue);
							}
						},

						/**
						 * ########## ####### ######## ##### ## ###### # ####### SysImage. ##### ######### #####
						 * ######## # ###### #############.
						 * @param {String} sysSettingCode ### ######### #########.
						 * @param {String} sysSettingValue ######## ######### ######### # ####### base64.
						 * @param {String} imageId ############# ###### # ########### ############ # ####### SysImage.
						 */
						onFileUpload: function(sysSettingCode, sysSettingValue, imageId) {
							this.updateSysSettingValue({
								code: sysSettingCode,
								value: sysSettingValue,
								imageId: imageId
							});
						},

						/**
						 * ##### ######### ###### ######### ######### # ###### #############.
						 * @param {Object} sysSettingConfig ############ ######### #########.
						 * @param {String} sysSettingConfig.code ### ######### #########.
						 * @param {String} sysSettingConfig.value ######## ######### #########.
						 * @param {String} sysSettingConfig.imageId ############# ###### # ########### ############
						 * # ####### SysImage.
						 */
						updateSysSettingValue: function(sysSettingConfig) {
							var sysSettingCode = sysSettingConfig.code;
							this.set(sysSettingCode + "_sysImageId", sysSettingConfig.imageId, {
								silent: true
							});
							this.set(sysSettingCode, sysSettingConfig.value);
						}

					}
				});
			},

			/**
			 * ########## URL-##### ### ######## ## ########## ############. URL ########### # ####### data-url
			 * ### #### ######### ##### IE. ### IE ########### ####### URL ## ######## ############ # #######
			 * ######## ######### ########. #### ####### ######## imageId, URL ######### ## ######## ###########
			 * # ####### SysImage.
			 * @param {Object} sysSettingConfig ################ ###### ############# ########.
			 * @param {String} sysSettingConfig.code ### ######### #########.
			 * @param {String} sysSettingConfig.value ######## ######### ########.
			 * @param {String} sysSettingConfig.sysImageId ############# ###### # ####### SysImage. ###### ### IE.
			 * @return {String} URL ########.
			 */
			getSysSettingUrlValue: function(sysSettingConfig) {
				var urlBuilderConfig;
				if (Ext.isIE) {
					var sysImageId = sysSettingConfig.sysImageId;
					if (sysImageId) {
						urlBuilderConfig = {
							source: Terrasoft.ImageSources.SYS_IMAGE,
							params: {
								primaryColumnValue: sysImageId
							}
						};
					} else {
						urlBuilderConfig = {
							source: Terrasoft.ImageSources.SYS_SETTING,
							params: {
								r: sysSettingConfig.code
							}
						};
					}
				} else {
					const imageDataUrl = Terrasoft.ImageUrlBuilder.getDataUrlByBase64(sysSettingConfig.value);
					urlBuilderConfig = {
						source: Terrasoft.ImageSources.URL,
						url: imageDataUrl
					};
				}
				return Terrasoft.ImageUrlBuilder.getUrl(urlBuilderConfig);
			},

			/**
			 * ########## ############# ######
			 * @return {Terrasoft.Container} ############# ######.
			 */
			generateView: function() {
				var Ext = this.Ext;
				var logoSettingsViewConfig = this.generateLogoSettingsViewConfig();
				var localizableStrings = resources.localizableStrings;
				return Ext.create("Terrasoft.Container", {
					id: "sys-logo-settings",
					classes: {
						wrapClassName: ["sys-logo-settings"]
					},
					markerValue: {"bindTo": "MarkerValue"},
					items: [
						{
							className: "Terrasoft.Container",
							id: "buttons-container",
							items: [
								{
									className: "Terrasoft.Button",
									id: "save-button",
									markerValue: "save-button",
									caption: localizableStrings.SaveButtonCaption,
									style: Terrasoft.controls.ButtonEnums.style.GREEN,
									click: {
										bindTo: "onSaveClick"
									},
									classes: {
										textClass: ["save-button"]
									},
									visible: {
										bindTo: "getSaveButtonVisible"
									}
								},
								{
									className: "Terrasoft.Button",
									id: "cancel-button",
									markerValue: "cancel-button",
									caption: localizableStrings.CancelButtonCaption,
									click: {
										bindTo: "onCancelClick"
									},
									visible: {
										bindTo: "getSaveButtonVisible"
									}
								},
								{
									className: "Terrasoft.Button",
									id: "close-button",
									markerValue: "close-button",
									caption: localizableStrings.CloseButtonCaption,
									style: Terrasoft.controls.ButtonEnums.style.BLUE,
									click: {
										bindTo: "onCloseClick"
									},
									visible: {
										bindTo: "getCloseButtonVisible"
									}
								}
							]
						},
						logoSettingsViewConfig
					]
				});
			},

			/**
			 * ########## ############# ### ####### ############## ######### ######## ############# #########.
			 * @return {Object} ################ ###### ####### ############## ######### ########.
			 */
			generateLogoSettingsViewConfig: function() {
				var logoSysSettingsCfg = this.logoSysSettingsCfg;
				var gridLayoutItemsConfig = [];
				var labelColumn = 0;
				var row = 0;
				var rowSpan = 3;
				var imageEditColumn = 4;
				var imageEditColumnSpan = 10;
				var labelColumnSpan = imageEditColumn;
				this.Terrasoft.each(logoSysSettingsCfg, function(sysSettingConfig) {
					gridLayoutItemsConfig.push({
						column: labelColumn,
						row: row,
						colSpan: labelColumnSpan,
						rowSpan: rowSpan,
						item: this.getLabelViewConfig(sysSettingConfig)
					});
					gridLayoutItemsConfig.push({
						column: imageEditColumn,
						row: row,
						colSpan: imageEditColumnSpan,
						rowSpan: rowSpan,
						item: this.getImageEditViewConfig(sysSettingConfig)
					});
					row += rowSpan + 1;
				}, this);
				return {
					className: "Terrasoft.GridLayout",
					id: "sys-logo-settings-content",
					items: gridLayoutItemsConfig
				};
			},

			/**
			 * ########## ############# ### ######## ########## Terrasoft.Label, ### ######### ######### #########.
			 * @param {Object} sysSettingConfig ####-########## ######### ########.
			 * @return {Object} ################ ###### ######## ########## Terrasoft.Label.
			 */
			getLabelViewConfig: function(sysSettingConfig) {
				var sysSettingCode = sysSettingConfig.code;
				return {
					className: "Terrasoft.Container",
					id: sysSettingConfig.code + "-label-wrap",
					classes: {
						wrapClassName: ["logo-label-wrap"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							id: sysSettingCode + "-label",
							caption: sysSettingConfig.caption
						}
					]
				};
			},

			/**
			 * ########## ############# ### ######## ########## Terrasoft.ImageEdit,
			 * ### ############## ######### #########.
			 * @param {Object} sysSettingConfig ####-########## ######### ########.
			 * @return {Object} ################ ###### ######## ########## Terrasoft.ImageEdit.
			 */
			getImageEditViewConfig: function(sysSettingConfig) {
				var sysSettingCode = sysSettingConfig.code;
				var imageUrl = this.getSysSettingUrlValue({
					code: sysSettingCode,
					value: sysSettingConfig.value
				});
				return {
					className: "Terrasoft.Container",
					id: sysSettingCode + "-img-wrap",
					items: [
						{
							className: "Terrasoft.ImageEdit",
							id: sysSettingCode + "-img",
							markerValue: sysSettingCode,
							defaultImageSrc: imageUrl,
							tag: sysSettingCode,
							imageSrc: {
								bindTo: "getImageSrc"
							},
							change: {
								bindTo: "onImageChange"
							},
							width: "auto",
							height: "100%"
						}
					]
				};
			},

			/**
			 * ######## ######### ####### # ####### #########, #### ### ############# ###### ########## ## ########.
			 * @protected
			 * @virtual
			 */
			initHistoryState: function() {
				var sandbox = this.sandbox;
				var state = sandbox.publish("GetHistoryState");
				var currentHash = state.hash;
				var currentState = state.state || {};
				if (currentState.moduleId === sandbox.id) {
					return;
				}
				var newState = this.prepareHistoryState(currentState);
				sandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentHash.historyState,
					silent: true
				});
			},

			/**
			 * ############## ##### ######### ########.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ##### ######### ########.
			 */
			prepareHistoryState: function(currentState) {
				var newState = this.Terrasoft.deepClone(currentState);
				newState.moduleId = this.sandbox.id;
				return newState;
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @overridden
			 * @param {Object} config ######### ########### ######.
			 */
			destroy: function(config) {
				if (config.keepAlive !== true) {
					if (this.viewModel) {
						this.viewModel.destroy();
						this.viewModel = null;
					}
					this.callParent(arguments);
				}
			}

		});
	}
);


