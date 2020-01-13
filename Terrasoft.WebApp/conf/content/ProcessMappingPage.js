Terrasoft.configuration.Structures["ProcessMappingPage"] = {innerHierarchyStack: ["ProcessMappingPage"]};
define('ProcessMappingPageStructure', ['ProcessMappingPageResources'], function(resources) {return {schemaUId:'04752e37-8cdc-40a6-8f73-0efec22738e1',schemaCaption: "ProcessMappingPage", parentSchemaName: "", schemaName:'ProcessMappingPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// TODO: remove feature toggling UseProcessFormulaServerValidation
define("ProcessMappingPage", ["terrasoft", "ProcessMappingPageResources", "ModalBox", "AcademyUtilities",
		"ckeditor-base", "EntitySchemaSelectMixin", "MappingPageTabUtilities"],
		function(Terrasoft, resources, ModalBox, AcademyUtilities) {
			return {
				mixins: {
					entitySchemaSelectMixin: "Terrasoft.EntitySchemaSelectMixin",
					mappingPageTabUtilities: "Terrasoft.MappingPageTabUtilities"
				},
				attributes: {
					/**
					 * Tabs collection.
					 */
					"TabsCollection": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					},
					/**
					 * Formula text.
					 */
					"FormulaText": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: ""
					},
					/**
					 * Formula value.
					 */
					"initFormulaConfig": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: ""
					},
					/**
					 * Selected text.
					 */
					"SelectedText": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Selected lookup schema.
					 */
					"LookupSchema": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Active tab name.
					 */
					"ActiveTabName": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Process schema instance.
					 */
					"ProcessSchema": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Lookup grid active row lookup value result.
					 */
					"ActiveRowLookupValueResult": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * The source type of value.
					 */
					"Source": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Parameter name.
					 */
					"ParameterName": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Name of the flow element, the parameter belongs to.
					 */
					"ElementName": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Id of the flow element, the parameter belongs to.
					 */
					"ElementUId": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Caption of the modalBox processMappingPage.
					 */
					"MappingPageModalBoxCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Indicates if lookup schema element is enabled.
					 * @protected
					 * @type {Boolean}
					 */
					"IsLookupEnabled": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					* Indicates if FormulaTextEdit element is enabled.
					* @protected
					* @type {Boolean}
					*/
					"FormulaTextEditVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Holds value specifying the tabs to open.
					 * @protected
					 * @type {Number}
					 */
					"Tabs": {
						dataValueType: Terrasoft.DataValueType.NUMBER,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				messages: {
					/**
					 * @message SetParametersInfo
					 * Sets parameters info.
					 */
					"SetParametersInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message LookupInfo
					 * For LookupUtilities.
					 */
					"LookupInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message ResultSelectedRows
					 * Returns selected rows.
					 */
					"ResultSelectedRows": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message ResultSelectedRows
					 * Returns active row.
					 */
					"ResultActiveRow": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetProcessSchema
					 * Returns process schema instance.
					 */
					"GetProcessSchema": {
						direction: Terrasoft.MessageDirectionType.PUBLISH,
						mode: Terrasoft.MessageMode.PTP
					}
				},
				details: /**SCHEMA_DETAILS*/{
				}/**SCHEMA_DETAILS*/,
				methods: {

					//region Methods: Protected

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.initMappingPageUISetting();
							this.initTabs();
							this.initProcessSchema();
							this.checkForSingleTab();
							this.initFormulaConfig(function() {
								this.initFormulaText(function() {
									this.addQuote();
									this.onPageInitialized(callback, scope);
								}, this);
							}, this);
						}.bind(this), scope || this]);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#onPageInitialized
					 * @overridden
					 */
					onPageInitialized: function(callback, scope) {
						Terrasoft.EntitySchemaManager.initialize(function() {
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Initializes formula config.
					 * @private
					 * @param {Object} formulaConfig Formula config.
					 */
					initFormulaConfig: function(callback, scope) {
						var pageConfig = this.get("PageConfig");
						var formulaConfig = pageConfig ? pageConfig.FormulaConfig : null;
						if (formulaConfig) {
							if ("source" in formulaConfig) {
								this.set("Source", formulaConfig.source);
							}
							if ("dataValueType" in formulaConfig) {
								this.set("DataValueType", formulaConfig.dataValueType);
							}
							if ("referenceSchemaUId" in formulaConfig) {
								this.set("ReferenceSchemaUId", formulaConfig.referenceSchemaUId);
							}
							if ("initialLookupSchemaUId" in formulaConfig) {
								this.initLookupValue(formulaConfig.initialLookupSchemaUId, callback, scope || this);
							} else {
								callback.call(scope || this);
							}
						} else {
							callback.call(scope || this);
						}
					},

					/**
					 * Initializes default lookup value.
					 * @private
					 * @param {String} initialLookupSchemaUId Schema uid.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Callback scope.
					 */
					initLookupValue: function(initialLookupSchemaUId, callback, scope) {
						if (initialLookupSchemaUId) {
							Terrasoft.EntitySchemaManager.getInstanceByUId(initialLookupSchemaUId, function(schema) {
								this.set("LookupSchema", {
									value: schema.uId,
									displayValue: schema.getCaption(),
									name: schema.getName()
								});
								callback.call(scope);
							}, this);
						} else {
							this.set("LookupSchema", null);
							callback.call(scope);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.loadProfile();
						this.initFormulaEdit();
						this.addHotkeys();
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
					 * @overridden
					 */
					getProfileKey: function() {
						return "ProcessMappingPage";
					},

					/**
					 * Returns flag that indicates if first and last symbol of current text is quote.
					 * @param {String} text Checked text.
					 * @return {Boolean} Flag that indicates if first and last symbol of current text is quote.
					 */
					hasDoubleQuote: function(text) {
						if (!text) {
							return false;
						}
						return text.match(/^"/) && text.match(/"$/);
					},

					/**
					 * Add quote if source value is constant.
					 * @protected
					 */
					addQuote: function() {
						var formula = this.get("FormulaText");
						if (this.hasDoubleQuote(formula)) {
							return;
						}
						var source = this.get("Source");
						var dataValueType = this.get("DataValueType");
						var isConst = (source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue);
						var notEmpty = !Ext.isEmpty(formula);
						var isText = Terrasoft.isTextDataValueType(dataValueType);
						if (isConst && notEmpty && isText) {
							formula = "\"" + formula + "\"";
							this.set("FormulaText", formula);
						}
					},

					/**
					 * Initialize ProcessSchema attribute.
					 * @private
					 */
					initProcessSchema: function() {
						var schema = this.sandbox.publish("GetProcessSchema");
						this.set("ProcessSchema", schema);
					},

					/**
					 * Initializes formula text by formula value.
					 * @private
					 * @param {Function} callback The callback function.
					 * @param {Object} scope The callback function scope.
					 */
					initFormulaText: function(callback, scope) {
						var value = this.get("FormulaValue");
						var source = this.get("Source");
						if (source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue) {
							var formulaText = Ext.isEmpty(value) ? "" : String(value);
							this.set("FormulaText", formulaText);
							callback.call(scope);
							return;
						}
						var schema = this.get("ProcessSchema");
						Terrasoft.FormulaParserUtils.getFormulaDisplayValue(value, schema,
								function(displayValue) {
									this.set("FormulaText", displayValue);
									callback.call(scope);
								}, this);
					},

					/**
					 * Handler for lookup selected row.
					 * @protected
					 * @virtual
					 * @param {Object} lookupValueResult Selected data.
					 * @param {Terrasoft.core.collections.Collection} lookupValueResult.selectedRows Selcted rows.
					 */
					onResultSelectedRows: function(lookupValueResult) {
						var selectedRows = lookupValueResult.selectedRows.getItems();
						if (selectedRows && selectedRows.length) {
							var selectedRow = selectedRows[0];
							var parameterValues = this.getParameterValues(selectedRow);
							var value = parameterValues.value;
							var displayValue = parameterValues.displayValue;
							var activeTab = this.get("ActiveTabName");
							var text;
							if (activeTab === "TabFunctionsMapping") {
								text = this.getFunctionWithSelectedText(value, displayValue);
							} else {
								displayValue = Terrasoft.ProcessSchemaDesignerUtilities.addParameterMask(displayValue);
								text = displayValue;
							}
							this.set("SelectedText", "");
							this.set("SelectedText", text);
						}
					},

					/**
					 * Proxy for onResultSelectedRow method. Handler of the ResultSelectedRows message.
					 * Checks if last selected row is equal to currently selected.
					 * @param {Object} lookupValueResult Selected data.
					 * @private
					 */
					onResultSelectedRowsProxy: function(lookupValueResult) {
						var isFormulaEditVisible = this.get("FormulaTextEditVisible");
						if (!isFormulaEditVisible) {
							this.onElementDoubleClick(lookupValueResult);
						} else {
							this.onResultSelectedRows(lookupValueResult);
						}
					},

					/**
					 * Method is called when row elements was selected by double click.
					 * @param {Object} lookupValueResult Selected data.
					 */
					onElementDoubleClick: function(lookupValueResult) {
						var selectedRows = lookupValueResult.selectedRows.getItems();
						var selectedRow = selectedRows[0];
						var lastActiveValue = this.get("ActiveRowLookupValueResult");
						var lastActiveRow = lastActiveValue ? lastActiveValue.selectedRows.first() : null;
						if (selectedRow && lastActiveRow === selectedRow) {
							this.onSaveClick();
						} else {
							this.onResultSelectedRows(lookupValueResult);
						}
					},

					/**
					 * Handler for lookup active row changed.
					 * @protected
					 * @virtual
					 * @param {Object} lookupValueResult Active row data.
					 * @param {Terrasoft.core.collections.Collection} lookupValueResult.selectedRows Active row.
					 */
					onResultActiveRow: function(lookupValueResult) {
						var displayValue = this.get("FormulaText");
						var isFormulaEditVisible = this.get("FormulaTextEditVisible");
						var activeRowLookupValueResult = displayValue && isFormulaEditVisible ? null : lookupValueResult;
						this.set("ActiveRowLookupValueResult", activeRowLookupValueResult);
					},

					/**
					 * Loads the tab module.
					 * @protected
					 * @virtual
					 * @param {Terrasoft.BaseViewModel} viewModel View model for loading data.
					 */
					loadModule: function(viewModel) {
						var sandbox = this.sandbox;
						var tabName = viewModel.get("Name");
						var pageId = sandbox.id + tabName;
						var tabContainerName = this.getTabContainerName(tabName);
						var pageConfig = this.get("PageConfig");
						var config = {
							id: pageId,
							renderTo: tabContainerName,
							instanceConfig: {
								parameters: {
									viewModelConfig: pageConfig
								}
							}
						};
						var configMethod = viewModel.get("LookupInfoConfigMethod");
						if (configMethod) {
							var lookupInfoConfig = this[configMethod]();
							if (!lookupInfoConfig) {
								return;
							}
							lookupInfoConfig = Ext.apply(lookupInfoConfig, config);
							lookupInfoConfig.filter = lookupInfoConfig.filter || this._getLookupFilter();
							this.subscribeLookupInfo(lookupInfoConfig);
						}
						var moduleName = viewModel.get("ModuleName");
						sandbox.loadModule(moduleName, config);
						sandbox.subscribe("ResultSelectedRows", this.onResultSelectedRowsProxy, this, [pageId]);
						sandbox.subscribe("ResultActiveRow", this.onResultActiveRow, this, [pageId]);
					},

					/**
					 * @inheritdoc Terrasoft.BaseObject#onDestroy
					 * @overridden
					 */
					onDestroy: function() {
						this.removeHotkeys();
						this.callParent(arguments);
					},

					//endregion

					//region Methods: Private

					/**
					 * Initialization of tabs.
					 * @private
					 */
					initTabs: function() {
						var columns = [
							{
								dataValueType: Terrasoft.DataValueType.TEXT,
								name: "Name",
								columnPath: "Name"
							},
							{
								dataValueType: Terrasoft.DataValueType.TEXT,
								name: "Caption",
								columnPath: "Caption"
							}
						];
						var collection = new Terrasoft.BaseViewModelCollection({
							entitySchema: new Terrasoft.BaseEntitySchema({
								columns: columns,
								primaryColumnName: "Name"
							})
						});
						var mappingType = this.get("MappingType");
						var tabs = this.getTabs(mappingType);
						collection.loadFromColumnValues(tabs);
						var tabsCollection = this.get("TabsCollection");
						tabsCollection.clear();
						tabsCollection.loadAll(collection);
					},

					/**
					 * Initialization User Interface setting of the mapping page.
					 * @private
					 */
					initMappingPageUISetting: function() {
						var mappingType = this.get("MappingType");
						if (mappingType > Terrasoft.MappingEnums.MappingType.ALL) {
							this.hideFormulaTextEdit();
						} else {
							this.showFormulaTextEdit();
						}
						this.setModalBoxCaption(mappingType);
					},

					/**
					 * Hides tabs contaner, if only 1 tab is shown.
					 * @private
					 */
					checkForSingleTab: function() {
						if (this.isSingleTab()) {
							this.hideTabText();
						} else {
							this.showTabText();
						}
					},

					/**
					 * Returns is mapping type enum single (no flags, number code equal to power of 2).
					 * @private
					 * @returns {boolean} Is enum single.
					 */
					isSingleTab: function() {
						var mappingType = this.get("MappingType");
						return mappingType !== Terrasoft.MappingEnums.MappingType.ALL && this.isPowerOfTwo(mappingType);
					},

					/**
					 * Checks whether number is power of two.
					 * @param {Number} number
					 * @returns {*|boolean}
					 */
					isPowerOfTwo: function(number) {
						return (number & (number - 1)) === 0;
					},

					/**
					 * Enabled visibility formula text edit of the mapping page.
					 * @private
					 */
					showFormulaTextEdit: function() {
						this.set("FormulaTextEditVisible", true);
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container" +
								" .controls-container-modal-page", "padding-top", "100px");
					},

					/**
					 * Disabled visibility formula text edit of the mapping page.
					 * @private
					 */
					hideFormulaTextEdit: function() {
						this.set("FormulaTextEditVisible", false);
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container" +
								" .controls-container-modal-page", "padding-top", "0px");
					},

					/**
					 * Enabled visibility of tabs panel of the mapping page.
					 * @private
					 */
					showTabText: function() {
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container " +
							".controls-container-modal-page .center-area-grid-container .ts-tabpanel",
							"visibility", "visible");
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container" +
							" .controls-container-modal-page .center-area-grid-container",
							"padding-top", "61px");
					},

					/**
					 * Disabled visibility of tabs panel of the mapping page.
					 * @private
					 */
					hideTabText: function() {
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container " +
							".controls-container-modal-page .center-area-grid-container .ts-tabpanel",
							"visibility", "hidden");
						this.updateStyleSheet(".formula-modal-box .modal-page-fixed-container" +
							" .controls-container-modal-page .center-area-grid-container",
							"padding-top", "10px");
					},

					/**
					 * Refreshes CSS cache and updates stylesheet.
					 * @private
					 * @param {String} cssSelector CSS selector.
					 * @param {String} cssProperty CSS property.
					 * @param {String} cssValue CSS value.
					 */
					updateStyleSheet: function(cssSelector, cssProperty, cssValue) {
						Terrasoft.refreshStyleSheetCache();
						Terrasoft.updateStyleSheet(cssSelector, cssProperty, cssValue);
					},

					/**
					 * Sets ModalBox caption.
					 * @private
					 * @param {Terrasoft.MappingEnums.MappingType} mappingType Mapping type.
					 */
					setModalBoxCaption: function(mappingType) {
						var caption;
						if (mappingType === Terrasoft.MappingEnums.MappingType.ALL) {
							caption = resources.localizableStrings.HeaderCaption;
						} else if (mappingType === Terrasoft.MappingEnums.MappingType.LOOKUP) {
							caption = resources.localizableStrings.HeaderCaptionLookupMapping;
						} else if (mappingType === Terrasoft.MappingEnums.MappingType.SYSTEM_SETTINGS) {
							caption = resources.localizableStrings.HeaderSysSettingsMappingCaption;
						}  else {
							caption = resources.localizableStrings.HeaderCaptionParametersMapping;
						}
						this.set("MappingPageModalBoxCaption", caption);
					},

					/**
					 * Handler for active tab change.
					 * @private
					 * @param {Terrasoft.BaseViewModel} activeTab Selected tab.
					 */
					onActiveTabChange: function(activeTab) {
						var activeTabName = activeTab.get("Name");
						var tabsCollection = this.get("TabsCollection");
						tabsCollection.eachKey(function(tabName, tab) {
							var tabContainerVisibleBinding = tab.get("Name");
							this.set(tabContainerVisibleBinding, false);
						}, this);
						this.set(activeTabName, true);
						var profile = this.getProfile();
						var key = this.getProfileKey();
						if (profile && key) {
							profile.activeTabName = activeTabName;
							this.set(this.getProfileColumnName(), profile);
							Terrasoft.utils.saveUserProfile(key, profile, false);
						}
						this.loadModule(activeTab);
					},

					/**
					 * Unloads tab module.
					 * @private
					 * @param {Terrasoft.BaseViewModel} viewModel Tab view model.
					 */
					unloadModule: function(viewModel) {
						var sandbox = this.sandbox;
						var tabName = viewModel.get("Name");
						var moduleId = sandbox.id + tabName;
						var tabContainerName = this.getTabContainerName(tabName);
						sandbox.unloadModule(moduleId, tabContainerName);
					},

					/**
					 * Returns tab container name.
					 * @private
					 * @param {String} tabName Tab name.
					 * @return {String} Tab container name.
					 */
					getTabContainerName: function(tabName) {
						return this.name + tabName + "ContainerContainer";
					},

					/**
					 * Closes modal box.
					 * @private
					 */
					close: function() {
						ModalBox.close();
					},

					/**
					 * Handler for save button click.
					 * @private
					 */
					onSaveClick: function() {
						var sandbox = this.sandbox;
						var bodyMaskId = Terrasoft.Mask.show();
						var modalBoxMaskId = Terrasoft.Mask.show({
							selector: "#" + this.renderTo,
							timeout: 0
						});
						this.getFormulaValue(function(result) {
							Terrasoft.Mask.hide(modalBoxMaskId);
							Terrasoft.Mask.hide(bodyMaskId);
							if (result.isValid) {
								var parameterInfo = this.getPreparedFormulaResult(result.value);
								sandbox.publish("SetParametersInfo", parameterInfo, [sandbox.id]);
							} else {
								if (result.errorMessage) {
									this.setValidationInfo("FormulaText", false, result.errorMessage);
								} else {
									this.showValidationInfo(result.unrecognized);
								}
							}
						}, this);
					},

					/**
					 * Shows validation message.
					 * @private
					 * @param {Array} unrecognizedMacros Array of unrecognized macros.
					 */
					showValidationInfo: function(unrecognizedMacros) {
						var message = "";
						Terrasoft.each(unrecognizedMacros, function(item) {
							message += item.message;
							message += ". ";
						}, this);
						this.setValidationInfo("FormulaText", false, message);
					},

					/**
					 * Returns formula value and display value.
					 * @private
					 * @param {String} value The formula source value.
					 * @return {Object} Selected data.
					 * @return {String} return.value Resulted value.
					 * @return {String} return.displayValue Resulted display value.
					 * @return {Number} return.source Resulted parameter value source.
					 * @return {GUID} return.referenceSchemaUId Resulted reference schema identifier.
					 */
					getPreparedFormulaResult: function(value) {
						var result = {
							value: value,
							isValid: true,
							displayValue: this.get("FormulaText"),
							source: Ext.isEmpty(value)
									? Terrasoft.ProcessSchemaParameterValueSource.None
									: Terrasoft.ProcessSchemaParameterValueSource.Script,
							dataValueType: this.get("DataValueType")
						};
						var lookupSchema = this.get("LookupSchema");
						if (lookupSchema) {
							result.referenceSchemaUId = lookupSchema.value;
						} else if (this.get("ReferenceSchemaUId")) {
							result.referenceSchemaUId = this.get("ReferenceSchemaUId");
						}
						return this.applyInvokerResultConfig(result);
					},

					/**
					 * Applies additional result items from page invoker.
					 * @protected
					 * @param {Object} result Regular page result.
					 * @returns {Object} Updated page result.
					 */
					applyInvokerResultConfig: function(result) {
						var invokerItemTag = this.get("InvokerItemTag");
						if (invokerItemTag) {
							result.invokerItemTag = invokerItemTag;
						}
						return result;
					},

					/**
					 * Returns formula value in business process engine format.
					 * @private
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					getFormulaValue: function(callback, scope) {
						var displayValue = this.get("FormulaText");
						var activeRowLookupValueResult = this.get("ActiveRowLookupValueResult");
						if (!displayValue && activeRowLookupValueResult) {
							this.onResultSelectedRows(activeRowLookupValueResult);
							displayValue = this.get("FormulaText");
						}
						var schema = this.get("ProcessSchema");
						var dataValueType = this.get("DataValueType");
						var parameterName = this.get("ParameterName");
						var elementName = this._getElementName();
						var config = {
							displayValue: displayValue,
							schema: schema,
							dataValueType: dataValueType,
							parameterName: parameterName,
							elementName: elementName
						};
						Terrasoft.FormulaParserUtils.validateValue(config, callback, scope);
					},

					/**
					 * Returns formula value in business process engine format.
					 * @private
					 * @returns {String} Name of the current element.
					 */
					_getElementName: function() {
						var schema = this.get("ProcessSchema");
						var elementName = this.get("ElementName");
						var elementUId = this.get("ElementUId");
						if (schema && schema.uId === elementUId) {
							elementName = "";
						}
						return elementName;
					},

					/**
					 * Returns parameter value.
					 * @private
					 * @param {Object} selectedRow Selected row.
					 * @param {String} selectedRow.value Selected row value.
					 * @param {String} selectedRow.displayValue Selected row display value.
					 * @param {String} [selectedRow.Code] Selected row code.
					 * @return {Object} Converted data.
					 * @return {String} [return.value] Converted value.
					 * @return {String} return.displayValue Converted display value.
					 */
					getParameterValues: function(selectedRow) {
						var result = {};
						var activeTab = this.get("ActiveTabName");
						if (activeTab === "TabSysSettingsMapping") {
							var sysSettingDisplayValueMacros = Terrasoft.FormulaMacros.prepareSysSettingDisplayValue(
								selectedRow.displayValue);
							result.displayValue = sysSettingDisplayValueMacros.getBody();
						} else if (activeTab === "TabValueMapping") {
							var schema = this.get("LookupSchema");
							var lookupValueMacros = Terrasoft.FormulaMacros.prepareLookupValue(schema.value,
								selectedRow.value);
							var lookupDisplayValueMacros = Terrasoft.FormulaMacros.prepareLookupDisplayValue(
								schema.displayValue, selectedRow.displayValue);
							result.value = lookupValueMacros.getBody();
							result.displayValue = lookupDisplayValueMacros.getBody();
						} else {
							result.value = selectedRow.value;
							result.displayValue = selectedRow.displayValue;
						}
						return result;
					},

					/**
					 * Returns display text for function with selected text in arguments.
					 * @private
					 * @param {String} value Function value.
					 * @param {String} displayValue Function display value.
					 * @return {String}
					 */
					getFunctionWithSelectedText: function(value, displayValue) {
						var result = displayValue;
						var selectedText = this.get("SelectedText");
						if (selectedText) {
							Terrasoft.each(Terrasoft.process.constants.FUNCTIONS, function(func) {
								if (func.value === value) {
									var functionTemplate = func.displayValue;
									result = Ext.String.format(functionTemplate, selectedText);
									return false;
								}
							}, this);
						}
						return result;
					},

					/**
					 * Returns system settings config for subscribe LookupInfo event.
					 * @private
					 * @return {Object} Config object.
					 */
					getConfigSysSettingsMapping: function() {
						return {
							columns: ["Code"],
							filter: this.getSysSettingsFilterGroup(),
							entityName: "VwSysSetting"
						};
					},

					/**
					 * Returns system settings filter group.
					 * @private
					 * @return {Terrasoft.FilterGroup} System setting filter group.
					 */
					getSysSettingsFilterGroup: function() {
						var filterGroup = Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filterGroup.add("DataValueTypeFilter", this.getSysSettingsDataValueTypeFilter());
						filterGroup.add("ReferenceSchemaUIdFilter", this.getSysSettingReferenceSchemaFilter());
						return filterGroup;
					},

					/**
					 * Returns system settings data value type filter.
					 * @private
					 * @return {Terrasoft.FilterGroup} System setting data value type filter.
					 */
					getSysSettingsDataValueTypeFilter: function() {
						var isInvokedByFormula = this.get("MappingType") === Terrasoft.MappingEnums.MappingType.ALL;
						var dataValueType = isInvokedByFormula ? null : this.get("DataValueType");
						var valueTypeGroup = Terrasoft.getSysSettingsValueTypeGroup(dataValueType);
						return Terrasoft.createColumnInFilterWithParameters("ValueTypeName", valueTypeGroup);
					},

					/**
					 * Returns system settings reference schema filter.
					 * @private
					 * @return {Terrasoft.FilterGroup} System setting reference schema filter.
					 */
					getSysSettingReferenceSchemaFilter: function() {
						var pageConfig = this.get("PageConfig");
						var referenceSchemaUId = pageConfig && pageConfig.referenceSchemaUId;
						var referenceSchemaArray = referenceSchemaUId ? [referenceSchemaUId] : [];
						return Terrasoft.createColumnInFilterWithParameters("ReferenceSchemaUId", referenceSchemaArray);
					},

					/**
					 * Returns lookup config for subscribe LookupInfo event.
					 * @private
					 * @return {Object} Config object.
					 */
					getConfigValueMapping: function() {
						var schema = this.get("LookupSchema");
						return schema ? {entityName: schema.name} : null;
					},

					/**
					 * Subscribes LookupInfo event.
					 * @private
					 * @param {Object} config Config object.
					 */
					subscribeLookupInfo: function(config) {
						var container = Ext.get(config.renderTo);
						var pageId = config.id;
						var sandbox = this.sandbox;
						sandbox.subscribe("LookupInfo", function() {
							var lookupInfoConfig = {
								entitySchemaName: config.entityName,
								multiSelect: false,
								fixedHeaderContainer: container,
								gridContainer: container
							};
							if (config.columns) {
								lookupInfoConfig.columns = config.columns;
							}
							if (config.filter) {
								lookupInfoConfig.filters = config.filter;
							}
							return lookupInfoConfig;
						}, [pageId]);
					},

					/**
					 * Select lookup schema event handler.
					 * @private
					 * @param {Object} lookup Selected schema.
					 */
					onChangeLookup: function(lookup) {
						var tabsCollection = this.get("TabsCollection");
						var isLookupTabActive = this.get("TabValueMapping");
						if (isLookupTabActive) {
							var viewModel = tabsCollection.get("TabValueMapping");
							this.set("LookupSchema", lookup);
							if (!lookup) {
								this.unloadModule(viewModel);
							} else {
								this.loadModule(viewModel);
							}
						}
					},

					/**
					 * Loads profile data.
					 * @private
					 */
					loadProfile: function() {
						var profile = this.getProfile();
						var activeTabName = "TabElementsMapping";
						if (this.isSingleTab()) {
							activeTabName = this.getFirstTabName();
						} else if (!Ext.isEmpty(profile.activeTabName)) {
							activeTabName = profile.activeTabName;
						}
						this.set("ActiveTabName", activeTabName);
					},

					/**
					 * Returns name of the first existing tab.
					 * @returns {*}
					 */
					getFirstTabName: function() {
						var tabsCollection = this.get("TabsCollection");
						var firstTab = tabsCollection.getByIndex(0);
						return firstTab.get("Name");
					},

					/**
					 * Focuses formula edit control and selects formula value.
					 * @private
					 */
					initFormulaEdit: function() {
						var formulaEditTextEdit = Ext.getCmp("ProcessMappingPageFormulaEditTextEdit");
						if (!formulaEditTextEdit) {
							return;
						}
						formulaEditTextEdit.onFocus();
						var el = formulaEditTextEdit.getEl();
						// TODO #CRM-22809
						if (el && el.dom) {
							el.dom.select();
						}
					},

					/**
					 * Returns modal box inner box element.
					 * @return {Object}
					 */
					getModalBoxEl: function() {
						var modalBoxInnerBoxEl = Ext.get(this.renderTo);
						return modalBoxInnerBoxEl && Ext.isFunction(modalBoxInnerBoxEl.parent)
								? modalBoxInnerBoxEl.parent()
								: null;
					},

					/**
					 * Initializes hotkeys.
					 * @private
					 */
					addHotkeys: function() {
						var modalBoxEl = this.getModalBoxEl();
						if (modalBoxEl) {
							modalBoxEl.on("keydown", this.onKeyDown, this);
						}
					},

					/**
					 * Removes hotkeys listeners.
					 * @private
					 */
					removeHotkeys: function() {
						var modalBoxEl = this.getModalBoxEl();
						if (modalBoxEl) {
							modalBoxEl.un("keydown", this.onKeyDown, this);
						}
					},

					/**
					 * Key down event handler.
					 * @private
					 * @param {Object} event Event object.
					 * @return {Boolean}
					 */
					onKeyDown: function(event) {
						if (event.ctrlKey && event.keyCode === event.ENTER) {
							event.stopPropagation();
							event.preventDefault();
							this.onSaveClick();
							return false;
						}
						if (event.ctrlKey && event.keyCode === event.F) {
							event.stopPropagation();
							event.preventDefault();
							return false;
						}
					},

					/**
					 * Handler for formula help button.
					 * @private
					 */
					onFormulaHelpButtonClick: function() {
						Terrasoft.BaseSchemaDesignerUtilities.openHelp(AcademyUtilities, this.name);
					},

					/**
					 * Returns lookup filter.
					 * @private
					 * @return {Terrasoft.FilterGroup|null}
					 */
					_getLookupFilter: function() {
						var lookupSerializableFilter = this.get("LookupSerializableFilter");
						return lookupSerializableFilter && Terrasoft.deserialize(lookupSerializableFilter) || null;
					}

					//endregion

				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "fixed-area-container",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["modal-page-fixed-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "fixed-area-container",
						"propertyName": "items",
						"name": "headContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["header"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "headContainer",
						"propertyName": "items",
						"name": "header-name-container",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["header-name-container", "header-name-container-full"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "header-name-container",
						"propertyName": "items",
						"name": "ModalBoxCaption",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "MappingPageModalBoxCaption"}
						}
					},
					{
						"operation": "insert",
						"parentName": "fixed-area-container",
						"propertyName": "items",
						"name": "close-icon",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
							"classes": {"wrapperClass": ["close-btn-user-class"]},
							"click": {"bindTo": "close"}
						}
					},
					{
						"operation": "insert",
						"parentName": "fixed-area-container",
						"propertyName": "items",
						"name": "utils-area-editPage",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["utils-container-modal-page"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "utils-area-editPage",
						"propertyName": "items",
						"name": "SaveButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
							"click": {"bindTo": "onSaveClick"},
							"classes": {"textClass": ["utils-buttons"]}
						}
					},
					{
						"operation": "insert",
						"parentName": "utils-area-editPage",
						"propertyName": "items",
						"name": "CancelButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
							"click": {"bindTo": "close"},
							"classes": {"textClass": ["utils-buttons"]}
						}
					},
					{
						"operation": "insert",
						"name": "FormulaHelpButton",
						"parentName": "fixed-area-container",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"markerValue": "FormulaHelpButton",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"controlConfig": {
								"caption": {
									"bindTo": "Resources.Strings.FormulaHelpButtonCaption"
								},
								"classes": {
									"wrapperClass": ["formula-help-button"],
									"textClass": ["formula-help-button-text", "base-edit-link"]
								},
								"click": {
									"bindTo": "onFormulaHelpButtonClick"
								},
								"visible": {
									"bindTo": "FormulaTextEditVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "fixed-area-container",
						"propertyName": "items",
						"name": "center-area-editPage",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["controls-container-modal-page"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "center-area-editPage",
						"name": "FormulaEdit",
						"propertyName": "items",
						"values": {
							"id": "ProcessMappingPageFormulaEditTextEdit",
							"className": "Terrasoft.FormulaInlineTextEdit",
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"dataValueType": Terrasoft.DataValueType.TEXT,
							"labelConfig": {
								"visible": false
							},
							"visible": {
								bindTo: "FormulaTextEditVisible"
							},
							"selectedText": {bindTo: "SelectedText"},
							"value": {bindTo: "FormulaText"},
							"placeholder": {"bindTo": "Resources.Strings.PlaceholderCaption"},
							"wrapClass": ["formula-edit-control"]
						}
					},
					{
						"operation": "insert",
						"parentName": "center-area-editPage",
						"propertyName": "items",
						"name": "center-area-grid-container",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["center-area-grid-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Tabs",
						"parentName": "center-area-grid-container",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.TAB_PANEL,
							"collection": {"bindTo": "TabsCollection"},
							"activeTabChange": {"bindTo": "onActiveTabChange"},
							"activeTabName": {"bindTo": "ActiveTabName"},
							"isScrollVisible": true,
							"tabs": []
						}
					},
					{
						"operation": "insert",
						"name": "TabElementsMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["tabs", "mapping-tab", "elements-mapping-tab"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabElementsMappingContainer",
						"parentName": "TabElementsMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "elements-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabParametersMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["tabs", "mapping-tab", "tab-parameters-mapping"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabParametersMappingContainer",
						"parentName": "TabParametersMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "parameters-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabSysSettingsMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["lookup-tab", "mapping-tab", "sys-settings-mapping-tab"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabSysSettingsMappingContainer",
						"parentName": "TabSysSettingsMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "sys-settings-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabValueMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["lookup-tab", "mapping-tab", "value-mapping-tab"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "TabValueMapping",
						"propertyName": "items",
						"name": "LookupSchema",
						"values": {
							"labelConfig": {
								"visible": false
							},
							"contentType": Terrasoft.ContentType.ENUM,
							"controlConfig": {
								"prepareList": {
									"bindTo": "prepareEntityList"
								},
								"change": {
									"bindTo": "onChangeLookup"
								},
								"placeholder": {
									"bindTo": "Resources.Strings.ValueMappingLookupSchemaPlaceholder"
								}
							},
							"wrapClass": ["value-mapping-lookup-schema"],
							"classes": {
								"labelClass": ["t-label-proc"]
							},
							"enabled": {
								"bindTo": "IsLookupEnabled"
							}
						}
					},
					{
						"operation": "insert",
						"name": "TabValueMappingContainer",
						"parentName": "TabValueMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "value-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabSystemVariablesMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["tabs", "mapping-tab", "sys-value-mapping-tab", "no-grid-caption"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabSystemVariablesMappingContainer",
						"parentName": "TabSystemVariablesMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "sys-value-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabFunctionsMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["tabs", "mapping-tab", "function-mapping-tab", "no-grid-caption"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabFunctionsMappingContainer",
						"parentName": "TabFunctionsMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "function-mapping-container"]
						}
					},
					{
						"operation": "insert",
						"name": "TabDateTimeMapping",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"wrapClass": ["tabs", "mapping-tab", "datetime-mapping-tab"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabDateTimeMappingContainer",
						"parentName": "TabDateTimeMapping",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["mapping-container", "datetime-mapping-container"]
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


