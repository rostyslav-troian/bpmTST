Terrasoft.configuration.Structures["ColumnSettings"] = {innerHierarchyStack: ["ColumnSettings"]};
define("ColumnSettings", ["ColumnSettingsResources", "BaseSchemaModuleV2", "ColumnSettingsViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.ColumnSettings
		 * Class for setting up properties of the grid columns.
		 */
		Ext.define("Terrasoft.configuration.ColumnSettings", {
			alternateClassName: "Terrasoft.ColumnSettings",
			extend: "Terrasoft.BaseSchemaModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ###### ############# ###### ######### #######
			 * @private
			 * @type {Object}
			 */
			viewModel: null,

			/**
			 * ####, ####### ######### ################## ## #########
			 * @private
			 * @type {Boolean}
			 */
			isProviderInitialized: false,

			/**
			 * ####, ####### ######### ################### ## ### ######
			 * @private
			 * @type {Boolean}
			 */
			isInitialized: false,

			/**
			 * ######## ########
			 * @private
			 * @type {Object}
			 */
			filterManager: null,

			/**
			 * entitySchemaProvider
			 * @private
			 * @type {Object}
			 */
			entitySchemaProvider: null,

			/**
			 * ############ ##### ########
			 * @private
			 * @type {String}
			 */
			schemaName: "",

			/**
			 * ############ #######
			 * @private
			 * @type {Object}
			 */
			columnInfo: null,

			/**
			 * Is nested column settings tag. True when need render not in chain.
			 * @protected
			 * @type {Boolean}
			 */
			isNestedColumnSettingModule: false,

			/**
			 * Does previous page caption should be hidden.
			 * @private
			 * @type {Boolean}
			 */
			hidePageCaption: false,

			/**
			 * @private
			 */
			_columnTypeConfig: {
				titleType: {
					value: "title",
					displayValue: resources.localizableStrings.CaptionCaption
				},
				textType: {
					value: "text",
					displayValue: resources.localizableStrings.TextCaption
				},
				linkType: {
					value: "link",
					displayValue: resources.localizableStrings.LinkCaption
				},
				iconType: {
					value: "icon",
					displayValue: resources.localizableStrings.IconCaption
				},
				defaultType: {
					value: "text",
					displayValue: resources.localizableStrings.TextCaption
				}
			},

			/**
			 * ####### ############# ###### ###### ######### #######.
			 * @param {Ext.Element} renderTo ####### ######### ### #########.
			 * @return {Container|*} ########## ############# ###### ###### ######### #######.
			 */
			createView: function(renderTo) {
				const view = this.Ext.create("Terrasoft.Container", {
					renderTo: renderTo,
					id: "columnSettingsContainer",
					selectors: {
						el: "#columnSettingsContainer",
						wrapEl: "#columnSettingsContainer"
					},
					classes: {
						wrapClassName: ["column-settings-container"]
					},
					items: [
						{
							className: "Terrasoft.Container",
							id: "topSettings",
							selectors: {
								wrapEl: "#topSettings"
							},
							classes: {
								wrapClassName: ["top-settings-container"]
							},
							items: [
								{
									id: "SaveButton",
									tag: "SaveButton",
									className: "Terrasoft.Button",
									style: Terrasoft.controls.ButtonEnums.style.GREEN,
									caption: resources.localizableStrings.SaveButtonCaption,
									click: {
										bindTo: "saveButtonClick"
									}
								},
								{
									id: "CancelButton",
									className: "Terrasoft.Button",
									style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
									caption: resources.localizableStrings.CancelButtonCaption,
									classes: {
										textClass: ["cancel-button"]
									},
									click: {
										bindTo: "cancelButtonClick"
									}
								}
							]
						},
						{
							className: "Terrasoft.Container",
							id: "columnPropertiesSettingsContainer",
							selectors: {
								wrapEl: "#columnPropertiesSettingsContainer"
							},
							classes: {
								wrapClassName: ["column-properties-settings-container"]
							},
							items: [
								{
									className: "Terrasoft.Container",
									id: "leftColumnSettingsContainer",
									selectors: {
										wrapEl: "#leftColumnSettingsContainer"
									},
									classes: {
										wrapClassName: ["left-column-settings-container"]
									},
									items: [
										{
											className: "Terrasoft.Label",
											caption: resources.localizableStrings.ColumnCaption,
											classes: {
												labelClass: ["column-caption-label"]
											}
										},
										{
											className: "Terrasoft.Container",
											id: "columnCaptionContainer",
											selectors: {
												wrapEl: "#columnCaptionContainer"
											},
											items: [
												{
													id: "columnCaptionLabel",
													className: "Terrasoft.Label",
													caption: {
														bindTo: "columnCaption"
													},
													classes: {
														labelClass: ["column-caption-label-value"]
													}
												}
											]
										},
										{
											className: "Terrasoft.Label",
											caption: resources.localizableStrings.TitleCaption,
											classes: {
												labelClass: ["title-label"]
											}
										},
										{
											id: "titleEdit",
											className: "Terrasoft.TextEdit",
											markerValue: resources.localizableStrings.TitleCaption,
											value: {bindTo: "titleValue"}
										},
										{
											className: "Terrasoft.Container",
											id: "hideTitleSettings",
											selectors: {
												wrapEl: "#hideTitleSettings"
											},
											classes: {
												wrapClassName: ["hide-title-settings-container"]
											},
											visible: {bindTo: "isTiled"},
											items: [
												{
													id: "isCaptionHiddenEdit",
													className: "Terrasoft.CheckBoxEdit",
													checked: {bindTo: "isCaptionHidden"}
												},
												{
													id: "hideCaptionLabel",
													className: "Terrasoft.Label",
													caption: resources.localizableStrings.HideTitleCaption,
													inputId: "isCaptionHiddenEdit-el",
													classes: {
														labelClass: ["hide-title-label"]
													}
												}
											]
										},
										{
											className: "Terrasoft.Container",
											id: "functionSettings",
											selectors: {
												wrapEl: "#functionSettings"
											},
											classes: {
												wrapClassName: ["hide-title-settings-container"]
											},
											visible: {bindTo: "isAggregatedColumn"},
											items: [
												{
													id: "functionLabel",
													className: "Terrasoft.Label",
													caption: resources.localizableStrings.FunctionCaption,
													width: "100%"
												},
												{
													className: "Terrasoft.Container",
													id: "sumRadioSettings",
													selectors: {
														wrapEl: "#sumRadioSettings"
													},
													classes: {
														wrapClassName: ["sum-radio-settings-container"]
													},
													visible: {bindTo: "sumContainerRadioButton"},
													items: [
														{
															id: "sumRadioButton",
															className: "Terrasoft.RadioButton",
															enabled: true,
															tag: Terrasoft.AggregationType.SUM,
															checked: {bindTo: "functionButtonsGroup"}
														},
														{
															id: "sumFunctionLabel",
															className: "Terrasoft.Label",
															caption: resources.localizableStrings.SumFunctionCaption,
															width: "auto",
															classes: {
																labelClass: ["function-label"]
															},
															inputId: "sumRadioButton-el"
														}
													]
												},
												{
													className: "Terrasoft.Container",
													id: "maxRadioSettings",
													selectors: {
														wrapEl: "#maxRadioSettings"
													},
													classes: {
														wrapClassName: ["max-radio-settings-container"]
													},
													visible: {bindTo: "maxContainerRadioButton"},
													items: [
														{
															id: "maxRadioButton",
															className: "Terrasoft.RadioButton",
															enabled: true,
															tag: Terrasoft.AggregationType.MAX,
															checked: {bindTo: "functionButtonsGroup"}
														},
														{
															id: "maxFunctionLabel",
															className: "Terrasoft.Label",
															caption: resources.localizableStrings.MaxFunctionCaption,
															width: "auto",
															classes: {
																labelClass: ["function-label"]
															},
															inputId: "maxRadioButton-el"
														}
													]
												},
												{
													className: "Terrasoft.Container",
													id: "minRadioSettings",
													selectors: {
														wrapEl: "#minRadioSettings"
													},
													classes: {
														wrapClassName: ["min-radio-settings-container"]
													},
													visible: {bindTo: "minContainerRadioButton"},
													items: [
														{
															id: "minRadioButton",
															className: "Terrasoft.RadioButton",
															enabled: true,
															tag: Terrasoft.AggregationType.MIN,
															checked: {bindTo: "functionButtonsGroup"}
														},
														{
															id: "minFunctionLabel",
															className: "Terrasoft.Label",
															caption: resources.localizableStrings.MinFunctionCaption,
															width: "auto",
															classes: {
																labelClass: ["function-label"]
															},
															inputId: "minRadioButton-el"
														}
													]
												},
												{
													className: "Terrasoft.Container",
													id: "avgRadioSettings",
													selectors: {
														wrapEl: "#avgRadioSettings"
													},
													classes: {
														wrapClassName: ["avg-radio-settings-container"]
													},
													visible: {bindTo: "avgContainerRadioButton"},
													items: [
														{
															id: "avgRadioButton",
															className: "Terrasoft.RadioButton",
															enabled: true,
															tag: Terrasoft.AggregationType.AVG,
															checked: {bindTo: "functionButtonsGroup"}
														},
														{
															id: "avgFunctionLabel",
															className: "Terrasoft.Label",
															caption: resources.localizableStrings.AvgFunctionCaption,
															width: "auto",
															classes: {
																labelClass: ["function-label"]
															},
															inputId: "avgRadioButton-el"
														}
													]
												}
											]
										},
										{
											className: "Terrasoft.ControlGroup",
											caption: resources.localizableStrings.TypeCaption,
											collapsed: true,
											bottomLine: false,
											visible: {bindTo: "isColumnTypeVisible"},
											items: [
												{
													className: "Terrasoft.Label",
													caption: resources.localizableStrings.ColumnTypeCaption,
													classes: {
														labelClass: ["text-size-label"]
													}
												},
												{
													id: "columnTypeEdit",
													className: "Terrasoft.ComboBoxEdit",
													value: {bindTo: "selectedColumnType"},
													list: {bindTo: "columnTypes"},
													prepareList: {bindTo: "getColumnTypes"}
												}
											]
										}
									]
								},
								{
									className: "Terrasoft.Container",
									id: "rightColumnSettingsContainer",
									selectors: {
										wrapEl: "#rightColumnSettingsContainer"
									},
									classes: {
										wrapClassName: ["right-column-settings-container"]
									},
									visible: {bindTo: "isBackward"},
									items: [
										{
											className: "Terrasoft.ControlGroup",
											caption: resources.localizableStrings.FilterCaption,
											collapsed: false,
											bottomLine: false,
											items: [
												{
													className: "Terrasoft.Container",
													id: "FilterProperties",
													selectors: {
														wrapEl: "#FilterProperties"
													}
												}
											]
										}
									]
								}
							]
						}
					]
				});
				return view;
			},

			/**
			 * Creates an instance of the view model of the module for setting column properties.
			 * @return {BaseViewModel|*} Instance of the view model.
			 */
			createViewModel: function() {
				const viewModel = this.Ext.create("Terrasoft.ColumnSettingsViewModel", {
					values: {
						/**
						 * ############ #######
						 * @private
						 * @type {Object}
						 */
						columnInfo: null,

						/**
						 * ######### #######
						 * @private
						 * @type {String}
						 */
						columnCaption: "",

						/**
						 * ######## #######
						 * @private
						 * @type {String}
						 */
						titleValue: "",

						/**
						 * ######### ##### #######
						 * @private
						 * @type {Terrasoft.Collection}
						 */
						columnTypes: new Terrasoft.Collection(),

						/**
						 * ######### ### #######
						 * @private
						 * @type {Object}
						 */
						selectedColumnType: null,

						/**
						 * ####, ######### ## ############ ## ### #######
						 * @private
						 * @type {Boolean}
						 */
						isAggregatedColumn: false,

						/**
						 * ### ######### ###### #######
						 * @private
						 * @type {Object}
						 */
						functionButtonsGroup: Terrasoft.AggregationType.SUM,

						/**
						 * ####, ####### ######### ######## ## #######
						 * # ######## ######### ######### ######### #######
						 * @private
						 * @type {Boolean}
						 */
						isCaptionHidden: false,

						/**
						 * ######## ########
						 * @private
						 * @type {Object}
						 */
						filterManager: null,

						/**
						 * ####, ####### ######### ###### #### ######
						 * @private
						 * @type {Boolean}
						 */
						isTiled: true,

						/**
						 * ######### ######### ########
						 * @private
						 * @type {Object}
						 */
						selectedFilters: null,

						/**
						 * ####, ####### ######### ######## ## ####### ########## sumContainerRadioButton
						 * @private
						 * @type {Boolean}
						 */
						sumContainerRadioButton: false,

						/**
						 *####, ####### #########  ######## ## ####### ########## maxContainerRadioButton
						 * @private
						 * @type {Boolean}
						 */
						maxContainerRadioButton: false,

						/**
						 *####, ####### ######### ######## ## ####### ########## minContainerRadioButton
						 * @private
						 * @type {Boolean}
						 */
						minContainerRadioButton: false,

						/**
						 * ####, ####### ######### ######## ## ####### ########## avgContainerRadioButton
						 * @private
						 * @type {Boolean}
						 */
						avgContainerRadioButton: false,

						/**
						 * A flag that indicates whether the column type settings are visible.
						 * @private
						 * @type {Boolean}
						 */
						isColumnTypeVisible: true,

						/**
						 * Sandbox
						 * @private
						 * @type {Object}
						 */
						sandbox: null,

						/**
						 * A flag that indicates whether the link type is available.
						 * @private
						 * @type {Boolean}
						 */
						useLinkType: false
					},
					resources: resources
				});
				return viewModel;
			},

			/**
			 * ############# ######### ######## ###### ######### #######.
			 * @param {Function} callback ####### ######### ######.
			 */
			init: function(callback) {
				const state = this.sandbox.publish("GetHistoryState");
				const currentHash = state.hash;
				const currentState = state.state || {};
				if (currentState.moduleId === this.sandbox.id) {
					return;
				}
				this.sandbox.publish("ReplaceHistoryState", {
					stateObj: {
						moduleId: this.sandbox.id
					},
					pageTitle: null,
					hash: currentHash.historyState,
					silent: true
				});
				this.columnInfo = this.sandbox.publish("ColumnSettingsInfo", null, [this.sandbox.id]);
				this.schemaName = this._getSchemaName(this.columnInfo);
				Ext.callback(callback, this);
			},

			/**
			 * Initializes the page title in the top pane.
			 */
			initHeaderCaption: function() {
				if (this.isNestedColumnSettingModule) {
					return;
				}
				const headerCaption = resources.localizableStrings.PageCaption + this.columnInfo.leftExpressionCaption;
				this.sandbox.publish("InitDataViews", {
					caption: headerCaption,
					hidePageCaption: this.hidePageCaption
				});
			},

			/**
			 * @private
			 */
			_getSchemaName: function(columnInfo) {
				return columnInfo && (columnInfo.lastReferenceSchemaName || columnInfo.schemaName ||
					columnInfo.referenceSchemaName);
			},

			/**
			 * @private
			 */
			_setSelectedColumnType: function() {
				let titleType;
				switch (this.columnInfo.columnType) {
					case "title":
						titleType = this._columnTypeConfig.titleType;
						break;
					case "text":
						titleType = this._columnTypeConfig.textType;
						break;
					case "link":
						titleType = this._columnTypeConfig.linkType;
						break;
					case "icon":
						titleType = this._columnTypeConfig.iconType;
						break;
					default:
						titleType = this._columnTypeConfig.defaultType;
						break;
				}
				this.viewModel.set("selectedColumnType", titleType);
			},

			/**
			 * @private
			 */
			_setInitialModelState: function() {
				this.viewModel.set("sandbox", this.sandbox);
				this.viewModel.set("filterManager", this.filterManager);
				this.viewModel.set("columnCaption", this.columnInfo.metaCaptionPath
					? this.columnInfo.metaCaptionPath
					: this.columnInfo.leftExpressionCaption);
				this.viewModel.set("titleValue", this.columnInfo.leftExpressionCaption);
				this._setSelectedColumnType();
				this.viewModel.set("isTiled", this.columnInfo.isTiled);
				this.viewModel.set("columnInfo", this.columnInfo);
				this.viewModel.set("isAggregatedColumn", this.columnInfo.isBackward &&
						this.columnInfo.aggregationType !== Terrasoft.AggregationType.COUNT &&
						this.columnInfo.aggregationFunction !== "count");
				this.viewModel.set("isBackward", this.columnInfo.isBackward && !this.columnInfo.hideFilter);
				this.viewModel.set("isCaptionHidden", !_.isUndefined(this.columnInfo.isCaptionHidden)
					? this.columnInfo.isCaptionHidden
					: false);
				if (this.columnInfo.aggregationType) {
					this.viewModel.set("functionButtonsGroup", this.columnInfo.aggregationType);
				} else if (this.columnInfo.isBackward && this.columnInfo.aggregationFunction === "count") {
					this.viewModel.set("functionButtonsGroup", Terrasoft.AggregationType.COUNT);
				}
				this.viewModel.set("referenceSchemaName", this.columnInfo.referenceSchemaName);
				this.viewModel.set("schemaName", this.columnInfo.schemaName);
				this.viewModel.set("lastReferenceSchemaName", this.columnInfo.lastReferenceSchemaName);
				this.viewModel.set("isNestedColumnSettingModule", this.isNestedColumnSettingModule);
				this.viewModel.set("isColumnTypeVisible", this.isColumnTypeVisible);
				this.viewModel.set("hidePageCaption", this.hidePageCaption);
			},

			/**
			 * @private
			 */
			_initViewModel: function() {
				this.initHeaderCaption();
				this.viewModel = this.createViewModel();
				this._setInitialModelState();
				this.isInitialized = true;
				this.viewModel.showRadioButtons();
			},

			/**
			 * ########## ############# # ######### renderTo.
			 * @param {Ext.Element} renderTo ###### ## #########, # ####### ##### ############ #############.
			 */
			render: function(renderTo) {
				if (!this.isProviderInitialized) {
					this.initializeProvider(renderTo);
					return;
				}
				const container = this.renderContainer = this.entitySchemaProvider.renderTo = renderTo;
				const view = this.createView(container);
				this.loadFilterModule();
				view.bind(this.viewModel);
			},

			/**
			 * @private
			 */
			_registerFilterEditModuleMessages: function() {
				this.sandbox.registerMessages({
					"OnFiltersChanged": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"GetFilterModuleConfig": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				});
			},

			/**
			 * @private
			 */
			_getFilterEditModuleId: function() {
				return this.sandbox.id + "_ExtendedFilterEditModule";
			},

			/**
			 * @private
			 */
			_subscribeToFilterMessages: function(moduleId) {
				this.sandbox.subscribe("OnFiltersChanged", function(args) {
					this.viewModel.set("filterData", args.serializedFilter);
					const filter = Terrasoft.deserialize(args.serializedFilter);
					this.filterManager.setFilters(filter || this.Ext.create("Terrasoft.FilterGroup"));
				}, this, [moduleId]);
				this.sandbox.subscribe("GetFilterModuleConfig", function() {
					const columnInfo = this.columnInfo;
					var rootSchemaName = this._getSchemaName(columnInfo);
					return {
						rootSchemaName: rootSchemaName,
						filters: columnInfo && columnInfo.serializedFilter
					};
				}, this, [moduleId]);
			},

			/**
			 * ##### ######## ###### ##########.
			 * @protected
			 * @virtual
			 */
			loadFilterModule: function() {
				if (!this.isInitialized) {
					this._initViewModel();
				}
				if (this.viewModel.get("filterModuleLoaded")) {
					return;
				}
				this._registerFilterEditModuleMessages();
				const moduleId = this._getFilterEditModuleId();
				this._subscribeToFilterMessages(moduleId);
				this.sandbox.loadModule("FilterEditModule", {
					renderTo: "FilterProperties",
					id: moduleId
				});
				this.viewModel.set("filterModuleLoaded", true);
			},

			/**
			 * ####### ### ######## ## ####### # ########## ######.
			 * @override
			 * @param {Object} config ######### ########### ######.
			 */
			destroy: function destroy(config) {
				if (config.keepAlive) {
					return;
				}
				if (this.entitySchemaProvider && !this.entitySchemaProvider.destroyed) {
					this.entitySchemaProvider.destroy();
				}
				this.entitySchemaProvider = null;
				requirejs.undef("EntitySchemaFilterProviderModule");
			},

			/**
			 * ############## EntitySchemaFilterProvider.
			 * @param {Ext.Element} renderTo ####### ######### ### #########.
			 */
			initializeProvider: function initializeProvider(renderTo) {
				const filter = Terrasoft.deserialize(this.columnInfo.serializedFilter);
				const map = {};
				map.EntitySchemaFilterProviderModule = {
					sandbox: "sandbox_" + this.sandbox.id,
					"ext-base": "ext_" + this.Ext.id
				};
				requirejs.config({
					map: map
				});
				this.Terrasoft.require(["EntitySchemaFilterProviderModule"],
					function(EntitySchemaFilterProviderModule) {
						this.entitySchemaProvider = new EntitySchemaFilterProviderModule({
							rootSchemaName: this.schemaName
						});
						this.filterManager = this.Ext.create("Terrasoft.FilterManager", {
							provider: this.entitySchemaProvider
						});
						this.filterManager.setFilters(filter || this.Ext.create("Terrasoft.FilterGroup"));
						this.isProviderInitialized = true;
						this.render(renderTo);
					}, this);
			}
		});
		return Terrasoft.ColumnSettings;
	});


