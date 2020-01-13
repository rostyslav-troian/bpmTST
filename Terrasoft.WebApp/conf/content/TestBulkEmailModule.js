Terrasoft.configuration.Structures["TestBulkEmailModule"] = {innerHierarchyStack: ["TestBulkEmailModule"]};
define("TestBulkEmailModule", ["TestBulkEmailModuleResources", "LookupUtilities", "EmailHelperModule",
		"ModalBox", "MaskHelper", "SendTestEmailContentMixin"
	],
	function(resources, LookupUtilities, EmailHelperModule, modalbox, MaskHelper) {
		var Ext;
		var sandbox;
		var Terrasoft;
		var viewConfig;
		var viewModel;

		function createConstructor(context) {
			Ext = context.Ext;
			sandbox = context.sandbox;
			Terrasoft = context.Terrasoft;
			return Ext.define("TestBulkEmailModule", {
				init: init
			});
		}

		function init() {
			innerRender();
		}

		function innerRender() {
			MaskHelper.HideBodyMask();
			var renderTo = modalbox.show({
				minWidth: 10,
				maxWidth: 90,
				minHeight: 10,
				maxHeight: 90
			});
			viewModel = getViewModel();
			viewModel.init();
			viewModel.Ext = this.Ext;
			viewModel.sandbox = this.sandbox;
			viewModel.Terrasoft = this.Terrasoft;
			viewModel.set("headMessage", resources.localizableStrings.PageCaption);
			viewConfig = getView(renderTo);
			viewConfig.bind(viewModel);
			modalbox.setSize(600, 230);
		}

		/**
		 * ########## ###### ############ ######.
		 * @private
		 * @return {Object}
		 */
		var getViewModel = function() {
			return Ext.create("Terrasoft.BaseViewModel", {
				mixins: {
					SendTestEmailContentMixin: "Terrasoft.SendTestEmailContentMixin"
				},
				columns: {
					/**
					 * Bulk email.
					 */
					BulkEmail: {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						isLookup: true,
						caption: resources.localizableStrings.BulkEmailCaption,
						referenceSchemaName: "BulkEmail",
						isRequired: true
					},
					/**
					 * Contact.
					 */
					Contact: {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						isLookup: true,
						caption: resources.localizableStrings.ContactCaption,
						referenceSchemaName: "Contact"
					},
					/**
					 * EmailAddress
					 */
					EmailAddress: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						caption: resources.localizableStrings.EmailCaption,
						isRequired: true
					}
				},
				values: {
					BulkEmail: null,
					Contact: null,
					EmailAddress: "",
					maskId: null
				},
				methods: {

					/**
					 * Cancel click handler.
					 */
					onCancelClick: function() {
						this.close();
					},

					/**
					 * Closes module.
					 */
					close: function() {
						modalbox.close();
					},

					/**
					 * ######### ######### ### ######### #######.
					 * @param {String} columnName ### ####### ### #########.
					 * @param {Function} validatorFn ####### #########.
					 */
					addColumnValidator: function(columnName, validatorFn) {
						var columnValidationConfig = this.validationConfig[columnName] ||
							(this.validationConfig[columnName] = []);
						columnValidationConfig.push(validatorFn);
					},

					/**
					 * ####### ######### ########## Email.
					 * @return {Object} ########## ######### #########.
					 */
					checkEmailValidator: function() {
						var invalidMessage = "";
						var email = this.get("EmailAddress");
						if (!EmailHelperModule.isEmailValid(email)) {
							invalidMessage = resources.localizableStrings.IncorrectEmailMessage;
						}
						return {
							fullInvalidMessage: invalidMessage,
							invalidMessage: invalidMessage
						};
					},

					/**
					 * #############.
					 */
					init: function() {
						this.addColumnValidator("EmailAddress", this.checkEmailValidator);
						var moduleId = sandbox.id;
						var bulkEmail = sandbox.publish("GetBulkEmail", moduleId, [moduleId]);
						this.set("BulkEmail", bulkEmail);
						Terrasoft.SysSettings.querySysSettingsItem("TestSendingBulkEmailContact",
							function(sysSetting) {
								this.set("Contact", sysSetting);
							}, this);
					},

					/**
					 * ######### ######## ###########.
					 * @param {Object} args #########.
					 * @param {Object} tag ###.
					 */
					loadVocabulary: function(args, tag) {
						var config = {
							entitySchemaName: tag,
							multiSelect: false,
							columnName: tag,
							searchValue: args.searchValue
						};
						var callback = function(args) {
							var columnName = args.columnName;
							var collection = args.selectedRows;
							if (collection.getCount() > 0) {
								this.set(columnName, collection.getItems()[0]);
							}
						};
						LookupUtilities.Open(sandbox, config, callback, this, null, false, false);
					},

					//region Methods: Public

					/**
					 * Send button click handler.
					 */
					onSendClick: function() {
						this.send();
					}

					//endregion
				}
			});
		};

		/**
		 * ########## ############# ######.
		 * @private
		 * @return {Object}
		 */
		var getView = function(renderTo) {
			var labelConfig = Ext.create("Terrasoft.Label", {
				caption: {
					bindTo: "headMessage"
				},
				labelClass: "head-label-user-class"
			});
			var buttonsConfig = Ext.create("Terrasoft.Button", {
				imageConfig: resources.localizableImages.CloseIcon,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				classes: {
					wrapperClass: "close-btn-user-class"
				},
				selectors: {
					wrapEl: "#closeTestBulkEmailButton"
				},
				click: {
					bindTo: "close"
				}
			});

			var controlsConfig = Ext.create("Terrasoft.Container", {
				id: "mainContainer",
				selectors: {
					wrapEl: "#mainContainer"
				},
				items: [{
					className: "Terrasoft.Container",
					id: "TestBulkEmailModuleFieldsContainer",
					selectors: {
						wrapEl: "#TestBulkEmailModuleFieldsContainer"
					},
					classes: {
						wrapClassName: ["control-user-class", "control-width-15"]
					},
					items: [{
						className: "Terrasoft.Container",
						id: "TestBulkEmailModuleFieldsContainer_BulkEmailLabel",
						selectors: {
							wrapEl: "#TestBulkEmailModuleFieldsContainer_BulkEmailLabel"
						},
						classes: {
							wrapClassName: ["label-wrap"]
						},
						items: [{
							markerValue: "bulkEmailLabel",
							className: "Terrasoft.Label",
							caption: resources.localizableStrings.BulkEmailCaption
						}]
					}, {
						className: "Terrasoft.Container",
						id: "TestBulkEmailModuleFieldsContainer_BulkEmailControl",
						selectors: {
							wrapEl: "#TestBulkEmailModuleFieldsContainer_BulkEmailControl"
						},
						classes: {
							wrapClassName: ["control-wrap"]
						},
						items: [{
							markerValue: "bulkEmailLookupEdit",
							className: "Terrasoft.LookupEdit",
							enabled: false,
							value: {
								bindTo: "BulkEmail"
							},
							loadVocabulary: {
								bindTo: "loadVocabulary"
							},
							tag: "BulkEmail"
						}]
					}, {
						className: "Terrasoft.Container",
						id: "TestBulkEmailModuleFieldsContainer_EmailLabel",
						selectors: {
							wrapEl: "#TestBulkEmailModuleFieldsContainer_EmailLabel"
						},
						classes: {
							wrapClassName: ["label-wrap"]
						},
						items: [{
							markerValue: "EmailLabel",
							className: "Terrasoft.Label",
							caption: resources.localizableStrings.EmailCaption,
							isRequired: true
						}]
					}, {
						className: "Terrasoft.Container",
						id: "TestBulkEmailModuleFieldsContainer_EmailControl",
						selectors: {
							wrapEl: "#TestBulkEmailModuleFieldsContainer_EmailControl"
						},
						classes: {
							wrapClassName: ["control-wrap"]
						},
						items: [{
							markerValue: "emailEdit",
							className: "Terrasoft.TextEdit",
							value: {
								bindTo: "EmailAddress"
							}
						}]
					}]
				}, {
					className: "Terrasoft.Container",
					id: "buttonsContainer",
					selectors: {
						wrapEl: "#buttonsContainer"
					},
					classes: {
						wrapClassName: ["control-buttons"]
					},
					items: [{
							className: "Terrasoft.Button",
							markerValue: "sendButton",
							caption: resources.localizableStrings.SendButtonCaption,
							style: Terrasoft.controls.ButtonEnums.style.GREEN,
							click: {
								bindTo: "onSendClick"
							},
							classes: {
								textClass: ["actions-button-margin-right"]
							}
						},
						{
							className: "Terrasoft.Button",
							markerValue: "cancelButton",
							caption: resources.localizableStrings.CancelButtonCaption,
							click: {
								bindTo: "onCancelClick"
							},
							classes: {
								textClass: ["actions-button-margin-right"]
							}
						}
					]
				}]
			});

			return Ext.create("Terrasoft.Container", {
				id: "testBulkEmailContainer",
				selectors: {
					wrapEl: "#testBulkEmailContainer"
				},
				classes: {
					wrapClassName: ["main-container"]
				},
				renderTo: renderTo,
				items: [
					labelConfig,
					buttonsConfig,
					controlsConfig
				]
			});
		};

		return createConstructor;
	});


