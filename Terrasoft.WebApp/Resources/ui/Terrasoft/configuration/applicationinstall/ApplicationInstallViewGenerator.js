/**
 * Generates view component for application installation page.
 */
Ext.define("Terrasoft.core.configuration.Applicationinstall.ApplicationInstallViewGenerator", {
	alternateClassName: "Terrasoft.ApplicationInstallViewGenerator",
	extend: "Terrasoft.BaseObject",

	/**
	 * Localized resources.
	 * @property {Object}
	 */
	resources: null,

	/**
	 * Creates view generator.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.init();
	},

	/**
	 * Initializes package installation view generator.
	 */
	init: function() {
		if (!this.resources) {
			this.resources = {
				"UploadButtonCaption": Terrasoft.Resources.ApplicationInstallationPage.Buttons.UploadFileButton,
				"InstallButtonCaption": Terrasoft.Resources.ApplicationInstallationPage.Buttons.InstallButton,
				"CloseButtonCaption": Terrasoft.Resources.ApplicationInstallationPage.Buttons.CloseButton,
				"CancelButtonCaption": Terrasoft.Resources.ApplicationInstallationPage.Buttons.CancelButton,
				"SaveLogButtonCaption": Terrasoft.Resources.ApplicationInstallationPage.Buttons.SaveLogButton,
				"RestoreBackupButtonCaption":
				Terrasoft.Resources.ApplicationInstallationPage.Buttons.RestoreBackupButton,
				"NameCaption": Terrasoft.Resources.ApplicationInstallationPage.Name,
				"MaintainerCaption": Terrasoft.Resources.ApplicationInstallationPage.Maintainer,
				"UpdateDateCaption": Terrasoft.Resources.ApplicationInstallationPage.UpdateDate,
				"CostCaption": Terrasoft.Resources.ApplicationInstallationPage.Cost,
				"SectionTitle": Terrasoft.Resources.ApplicationInstallationPage.PageTitle,
				"AttentionLabel": Terrasoft.Resources.ApplicationInstallationPage.AttentionLabel,
				"SelectFileCaption": Terrasoft.Resources.ApplicationInstallationPage.SelectFileCaption,
				"SelectFileDescription": Terrasoft.Resources.ApplicationInstallationPage.SelectFileDescription,
				"ChooseAnotherPackage": Terrasoft.Resources.ApplicationInstallationPage.Messages.ChooseAnotherPackage,
				"ApplicationSuccessfullyInstalled":
				Terrasoft.Resources.ApplicationInstallationPage.Messages.ApplicationSuccessfullyInstalled,
				"ApplicationSuccessfullyInstalledDescription":
				Terrasoft.Resources.ApplicationInstallationPage.Messages.ApplicationSuccessfullyInstalledDescription,
				"FreeAppSuccessfullyInstalledDescription":
				Terrasoft.Resources.ApplicationInstallationPage.Messages.FreeAppSuccessfullyInstalledDescription,
				"NotInstallLicense": Terrasoft.Resources.ApplicationInstallationPage.Messages.LicenseNotInstalled,
				"NotInstallLicenseMailTo": Terrasoft.Resources.ApplicationInstallationPage.Messages.LicenseNotInstalledMailTo,
				"InstallLicense": Terrasoft.Resources.ApplicationInstallationPage.Messages.LicenseInstalled,
				"InstallDemoLicense": Terrasoft.Resources.ApplicationInstallationPage.Messages.DemoInstalled,
				"MailToText": Terrasoft.Resources.ApplicationInstallationPage.Messages.MailToText,
				"Email": Terrasoft.Resources.ApplicationInstallationPage.Messages.Email,
				"GetFileLinkInfoFailedDescription":
				Terrasoft.Resources.ApplicationInstallationPage.Messages.GetFileLinkInfoFailedDescription,
				"GetMetaDataInfoFailedDescription":
				Terrasoft.Resources.ApplicationInstallationPage.Messages.GetMetaDataInfoFailedDescription,
				"MarketplaceLogoImageUrl": Terrasoft.Resources.ApplicationInstallationPage.MarketplaceLogoImageUrl
			};
		}

	},

	/**
	 * Generates config for panel on the top of the page.
	 * @private
	 * @returns {Object}
	 */
	generateHeadPanel: function() {
		return {
			className: "Terrasoft.Container",
			classes: {
				wrapClassName: ["panel", "head-panel"]
			},
			items: [
				{
					className: "Terrasoft.Container",
					items: [
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("SectionTitle"),
							classes: {
								labelClass: ["section-title", "heading"]
							}
						},
						{
							className: "Terrasoft.Button",
							markerValue: "CloseButton",
							caption: this.getLocalizableString("CloseButtonCaption"),
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							click: {"bindTo": "onCancelButtonClick"}
						}
					]
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["main-header-logo-image"]
					},
					styles: {
						wrapStyles: {
							"background-image": "url($1)".replace("$1", this.getHeaderLogoUrl())
						}
					}
				}
			]
		};
	},

	isGetAppParameters: function() {
		var urlVar = window.location.search;
		var arrayVar = [];
		arrayVar = (urlVar.substr(1)).split("&");
		if (arrayVar[0] === "") {
			return false;
		}
		return true;
	},

	/**
	 * Generates config for central panel.
	 * @private
	 * @returns {Object}
	 */
	generateCentralPanel: function() {
		if (this.isGetAppParameters()) {
			return {
				className: "Terrasoft.Container",
				classes: {
					wrapClassName: ["panel", "central-panel"]
				},
				items: [
					this.generateDownloadPanel(),
					this.generateApplicationInstallSuccessPanel(),
					this.generateRestoreBackupSuccessPanel(),
					this.generateErrorPanel(),
					this.generateMessagePanel()
				]
			};
		} else {
			return {
				className: "Terrasoft.Container",
				classes: {
					wrapClassName: ["panel", "central-panel"]
				},
				items: [
					this.generateFileSelectPanel(),
					this.generateApplicationInstallSuccessPanel(),
					this.generateRestoreBackupSuccessPanel(),
					this.generateErrorPanel(),
					this.generateMessagePanel()
				]
			};
		}
	},

	/**
	 * Generates config for file selection region.
	 * @private
	 * @returns {Object}
	 */
	generateDownloadPanel: function() {
		return {
			className: "Terrasoft.Container",
			maskVisible: {"bindTo": "IsMaskVisible"},
			id: "select-file-panel",
			markerValue: "FileSelectPanel",
			classes: {
				wrapClassName: ["message-download-panel"]
			},
			visible: {"bindTo": "IsSelectFilePanelVisible"},
			items: [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["install-app-image"]
					},
					styles: {
						wrapStyles: {
							"background-image": "url($1)"
								.replace("$1", this.resources.MarketplaceLogoImageUrl)
						}
					}
				},
				{
					className: "Terrasoft.Container",
					id: "application-leftright-panels",
					markerValue: "ApplicationLeftRightPanels",
					classes: {
						wrapClassName: ["applicationLeftRight-panels"]
					},
					visible: {"bindTo": "IsSelectFilePanelVisible"},
					items: [
						{
							className: "Terrasoft.Container",
							id: "application-left-panel",
							markerValue: "ApplicationLeftPanel",
							classes: {
								wrapClassName: ["applicationLeft-panel"]
							},
							visible: {"bindTo": "IsSelectFilePanelVisible"},
							items: [
								{
									className: "Terrasoft.Label",
									caption: this.getLocalizableString("NameCaption"),
									classes: {
										labelClass: ["msg-panel-caption"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: this.getLocalizableString("MaintainerCaption"),
									classes: {
										labelClass: ["msg-panel-caption"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: this.getLocalizableString("UpdateDateCaption"),
									classes: {
										labelClass: ["msg-panel-caption"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: this.getLocalizableString("CostCaption"),
									classes: {
										labelClass: ["msg-panel-caption"]
									}
								}
							]
						},
						{
							className: "Terrasoft.Container",
							id: "application-right-panel",
							markerValue: "ApplicationRightPanel",
							classes: {
								wrapClassName: ["applicationRight-panel"]
							},
							visible: {"bindTo": "IsSelectFilePanelVisible"},
							items: [
								{
									className: "Terrasoft.Label",
									caption: {"bindTo": "applicationName"},
									classes: {
										labelClass: ["msg-panel-right"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: {"bindTo": "applicationMaintainer"},
									classes: {
										labelClass: ["msg-panel-right"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: {"bindTo": "applicationUpdateDate"},
									classes: {
										labelClass: ["msg-panel-right"]
									}
								},
								{
									className: "Terrasoft.Label",
									caption: {"bindTo": "applicationCostValue"},
									classes: {
										labelClass: ["msg-panel-right"]
									}
								}
							]
						}
					]
				},
				{
					className: "Terrasoft.Container",
					id: "buttons-panel",
					markerValue: "ApplicationButtonsPanel",
					classes: {
						wrapClassName: ["buttons-panel"]
					},
					visible: {"bindTo": "IsSelectFilePanelVisible"},
					items: [
						{
							className: "Terrasoft.Button",
							markerValue: "CancelButton",
							caption: this.getLocalizableString("CancelButtonCaption"),
							style: Terrasoft.controls.ButtonEnums.style.WHITE,
							click: {"bindTo": "onCancelButtonClick"}
						},
						{
							className: "Terrasoft.Button",
							caption: this.getLocalizableString("InstallButtonCaption"),
							markerValue: "InstallButton",
							fileUploadMultiSelect: false,
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							click: {"bindTo": "onInstalledButtonClick"}
						}
					]
				}
			]
		};
	},

	/**
	 * Generates config for file selection region.
	 * @private
	 * @returns {Object}
	 */
	generateFileSelectPanel: function() {
		return {
			className: "Terrasoft.Container",
			maskVisible: {"bindTo": "IsMaskVisible"},
			id: "select-file-panel",
			markerValue: "FileSelectPanel",
			classes: {
				wrapClassName: ["message-upload-panel"]
			},
			visible: {"bindTo": "IsSelectFilePanelVisible"},
			items: [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["select-file-image"]
					},
					styles: {
						wrapStyles: {
							"background-image": "url($1)".replace("$1", this.getImageUrl("install_blankslate.svg"))
						}
					}
				},
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("SelectFileCaption"),
					classes: {
						labelClass: ["msg-panel-heading", "heading"]
					}
				},
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("SelectFileDescription"),
					classes: {
						labelClass: ["msg-uploadPanel-text"]
					}
				},
				{
					className: "Terrasoft.Button",
					caption: this.getLocalizableString("UploadButtonCaption"),
					markerValue: "UploadFileButton",
					fileUpload: true,
					fileTypeFilter: ["application/zip", "application/gzip"],
					filesSelected: {"bindTo": "onFilesSelected"},
					fileUploadMultiSelect: false,
					style: Terrasoft.controls.ButtonEnums.style.GREEN
				}
			]
		};
	},

	/**
	 * Generates successful package installation message panel.
	 * @private
	 * @returns {Object}
	 */
	generateApplicationInstallSuccessPanel: function() {
		return {
			className: "Terrasoft.Container",
			id: "install-success-panel",
			classes: {
				wrapClassName: ["message-download-panel"]
			},
			markerValue: "ApplicationInstallSuccessPanel",
			visible: {"bindTo": "IsApplicationInstallSuccessPanelVisible"},
			items: [
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["install-success-image"]
					},
					styles: {
						wrapStyles: {
							"background-image": "url($1)".replace("$1", this.getImageUrl("installed.svg"))
						}
					}
				},
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("ApplicationSuccessfullyInstalled"),
					classes: {
						labelClass: ["msg-panel-heading", "heading"]
					}
				},
				{
					className: "Terrasoft.Container",
					id: "buttons-log-panel",
					markerValue: "ApplicationButtonsPanel",
					classes: {
						wrapClassName: ["buttons-log-panel"]
					},
					visible: {"bindTo": "IsApplicationInstallSuccessPanelVisible"},
					items: [
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("ApplicationSuccessfullyInstalledDescription"),
							visible: {"bindTo": "IsShowDefaultAppDetail"}
						},
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("FreeAppSuccessfullyInstalledDescription"),
							visible: {"bindTo": "IsShowFreeAppDetail"}
						},
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("NotInstallLicense"),
							visible: {"bindTo": "IsShowLicenseErrorDetail"}
						},
						{
							className: "Terrasoft.Hyperlink",
							caption: this.getLocalizableString("NotInstallLicenseMailTo"),
							href: {"bindTo": "mailToFullText"},
							target: "_self",
							visible: {"bindTo": "IsShowLicenseErrorDetail"}
						},
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("InstallLicense"),
							visible: {"bindTo": "IsShowLicenseDetail"}
						},
						{
							className: "Terrasoft.Label",
							caption: this.getLocalizableString("InstallDemoLicense"),
							visible: {"bindTo": "IsShowLicenseDemoDetail"}
						},
						{
							className: "Terrasoft.Container",
							items: [
								{
									className: "Terrasoft.Button",
									caption: this.getLocalizableString("SaveLogButtonCaption"),
									click: {"bindTo": "onDownloadLogClick"},
									style: Terrasoft.controls.ButtonEnums.style.DEFAULT
								}
							]
						}
					]
				}
			]
		};
	},

	/**
	 * Generates error panel.
	 * @private
	 * @returns {Object}
	 */
	generateErrorPanel: function() {
		return {
			className: "Terrasoft.Container",
			id: "error-panel",
			classes: {
				wrapClassName: ["message-download-panel"]
			},
			markerValue: "ErrorPanel",
			visible: {"bindTo": "IsErrorPanelVisible"},
			items: [
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "ErrorMessage"},
					isMultiline: true,
					classes: {
						labelClass: ["msg-panel-heading", "heading"]
					}
				},
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("GetFileLinkInfoFailedDescription"),
					classes: {
						labelClass: ["msg-panel-text"]
					},
					visible: {"bindTo": "GetFileLinkInfoFailedError"}
				},
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("GetMetaDataInfoFailedDescription"),
					classes: {
						labelClass: ["msg-panel-text"]
					},
					visible: {"bindTo": "GetMetaDataInfoFailedError"}
				},
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "ErrorDetails"},
					classes: {
						labelClass: ["msg-panel-text"]
					},
					visible: {"bindTo": "IsShowDefaultAppDetail"}
				},
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["error-buttons"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							visible: {"bindTo": "IsRestoreBackupButtonVisible"},
							caption: this.getLocalizableString("RestoreBackupButtonCaption"),
							click: {"bindTo": "onRestoreBackupClick"},
							style: Terrasoft.controls.ButtonEnums.style.BLUE
						},
						{
							className: "Terrasoft.Button",
							visible: {"bindTo": "IsDownloadLogButtonVisible"},
							markerValue: "DownloadLogButton",
							caption: this.getLocalizableString("SaveLogButtonCaption"),
							click: {"bindTo": "onDownloadLogClick"},
							style: Terrasoft.controls.ButtonEnums.style.DEFAULT
						}
					]
				}
			]
		};
	},

	/**
	 * Generates restore backup success panel.
	 * @private
	 * @returns {Object}
	 */
	generateRestoreBackupSuccessPanel: function() {
		return {
			className: "Terrasoft.Container",
			id: "restore-backup-panel",
			maskVisible: {"bindTo": "IsMaskVisible"},
			classes: {
				wrapClassName: ["message-download-panel"]
			},
			markerValue: "RestoreBackupSuccessPanel",
			visible: {"bindTo": "IsRestoreBackupSuccessPanelVisible"},
			items: [
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "MessagePanelHeading"},
					classes: {
						labelClass: ["msg-panel-heading", "heading"]
					}
				},
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "MessagePanelDetails"},
					isMultiline: true,
					classes: {
						labelClass: ["msg-panel-text"]
					}
				},
				{
					className: "Terrasoft.Container",
					visible: {"bindTo": "IsRestorationButtonsVisible"},
					classes: {
						wrapClassName: ["error-buttons"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							caption: this.getLocalizableString("SaveLogButtonCaption"),
							click: {"bindTo": "onDownloadLogClick"},
							style: Terrasoft.controls.ButtonEnums.style.BLUE
						}
					]
				}
			]
		};
	},

	/**
	 * Generates message panel.
	 * @private
	 * @returns {Object}
	 */
	generateMessagePanel: function() {
		return {
			className: "Terrasoft.Container",
			id: "message-download-panel",
			maskVisible: {"bindTo": "IsMaskVisible"},
			markerValue: "MessagePanel",
			classes: {
				wrapClassName: ["message-progress-panel"]
			},
			visible: {"bindTo": "IsMessagePanelVisible"},
			items: [
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "MessagePanelHeading"},
					classes: {
						labelClass: ["msg-panel-heading", "heading"]
					}
				},
				{
					className: "Terrasoft.Label",
					caption: {"bindTo": "MessagePanelDetails"},
					isMultiline: true,
					classes: {
						labelClass: ["msg-progressPanel-text"]
					}
				},
				{
					className: "Terrasoft.Container",
					visible: {"bindTo": "IsRestorationButtonsVisible"},
					classes: {
						wrapClassName: ["error-buttons"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							caption: this.getLocalizableString("SaveLogButtonCaption"),
							click: {"bindTo": "onDownloadLogClick"},
							style: Terrasoft.controls.ButtonEnums.style.BLUE
						}
					]
				}
			]
		};
	},

	/**
	 * Generates config for installation descriptions panel.
	 * @private
	 * @returns {Object}
	 */
	generateInstallationDescriptionsPanel: function() {
		return {
			className: "Terrasoft.Container",
			classes: {
				wrapClassName: ["panel", "right-panel"]
			},
			items: [
				{
					className: "Terrasoft.Label",
					caption: this.getLocalizableString("AttentionLabel"),
					classes: {
						labelClass: ["attention-label", "heading"]
					}
				}
			].concat(this.generateAttentionLabels())
		};
	},

	/**
	 * Generates configs for attention information on the right side.
	 * @private
	 * @returns {Object[]}
	 */
	generateAttentionLabels: function() {
		var attentionText = Terrasoft.Resources.ApplicationInstallationPage.AttentionText;
		var createLabel = function(caption) {
			return {
				className: "Terrasoft.Label",
				caption: caption,
				classes: {
					labelClass: ["attention-text"]
				}
			};
		};
		return attentionText.split("|").map(createLabel);
	},

	/**
	 * Returns generated url for header logo image.
	 * @private
	 * @returns {String}
	 */
	getHeaderLogoUrl: function() {
		var config = {
			params: {r: "HeaderLogoImage"},
			source: Terrasoft.ImageSources.SYS_SETTING
		};
		return Terrasoft.ImageUrlBuilder.getUrl(config);
	},

	/**
	 * Returns generated url for image from resource manager.
	 * @private
	 * @param {String} imageName Name of image's file.
	 * @returns {String}
	 *
	 */
	getImageUrl: function(imageName) {
		return Terrasoft.ImageUrlBuilder.getUrl({
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: "Terrasoft.Nui",
				resourceItemName: "ApplicationInstallationPage." + imageName
			}
		});
	},

	/**
	 * Returns localized resource. If it's not present then returns resource name itself.
	 * @private
	 * @param {String} resourceName Name of the resource.
	 * @returns {String}
	 */
	getLocalizableString: function(resourceName) {
		return this.resources[resourceName] || resourceName;
	},

	/**
	 * Generates complete view component for package installation page.
	 * @returns {Terrasoft.Component}
	 */
	generateView: function() {
		return Ext.create("Terrasoft.Container", {
			classes: {
				wrapClassName: "container-main"
			},
			markerValue: "AppInstallPage",
			items: [
				this.generateHeadPanel(),
				{
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["container-bottom"]
					},
					items: [
						this.generateCentralPanel(),
						this.generateInstallationDescriptionsPanel()
					]
				}
			]
		});
	}
});