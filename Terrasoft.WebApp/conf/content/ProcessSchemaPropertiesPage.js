Terrasoft.configuration.Structures["ProcessSchemaPropertiesPage"] = {innerHierarchyStack: ["ProcessSchemaPropertiesPage"], structureParent: "BaseProcessSchemaPropertiesPage"};
define('ProcessSchemaPropertiesPageStructure', ['ProcessSchemaPropertiesPageResources'], function(resources) {return {schemaUId:'ea7fd0d0-74ad-43f4-8d8e-141b6825738e',schemaCaption: "Process properties page", parentSchemaName: "BaseProcessSchemaPropertiesPage", schemaName:'ProcessSchemaPropertiesPage',parentSchemaUId:'e3c8b7af-2c99-4da9-8a53-dc40df1911a8',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page schema for process properties.
 * Parent: BaseProcessSchemaPropertiesPage => ProcessFlowElementPropertiesPage => BaseProcessSchemaElementPropertiesPage
 */
define("ProcessSchemaPropertiesPage", ["terrasoft", "ProcessSchemaPropertiesPageResources",
	"SourceCodeEditEnums", "ProcessSchemaUsingViewModel", "ProcessMiniEditPageMixin", "ProcessModuleUtilities"],
	function(Terrasoft, resources, sourceCodeEditEnums) {
		return {
			messages: {
				/**
				 * @message GetValue
				 * Receive source code edit value.
				 */
				"GetValue": {
					"direction": Terrasoft.MessageDirectionType.PUBLISH,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message GetSourceCodeData
				 * Returns source code edit data. Such as source code value, caption, language etc. For more
				 * information see GetSourceCodeData message in SourceCodeEditPage schema.
				 */
				"GetSourceCodeData": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				},

				/**
				 * @message SourceCodeChanged
				 * Receive current source code edit value.
				 */
				"SourceCodeChanged": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				},
				/**
				 * @message SaveItem
				 * Save minipage item.
				 */
				"SaveItem": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message DiscardItem
				 * Discard minipage item.
				 */
				"DiscardItem": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * Can user change 'useForceCompile' property..
				 */
				"CanChangeUseForceCompile": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * Version.
				 */
				"version": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.VersionCaption
				},
				/**
				 * Flag that indicates when to use force compile.
				 */
				"useForceCompile": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.UseForceCompileCaption,
					onChange: "_onUseForceCompileChanged"
				},
				/**
				 * Tag.
				 */
				"tag": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.TagCaption
				},
				/**
				 * AddButton menu items collection.
				 */
				"AddButtonMenu": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					value: Ext.create("Terrasoft.BaseViewModelCollection")
				},
				/**
				 * Flag that indicates when enable Add parameter button.
				 */
				"AddParameterButtonEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},
				/**
				 * Using view models.
				 */
				"UsingViewModels": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true,
					value: this.Ext.create("Terrasoft.ObjectCollection")
				},
				/**
				 * Process schema methods.
				 */
				"methodsBody": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Compiled process schema methods.
				 */
				"compiledMethodsBody": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Flag that indicates whether compiled process methods is visible. Compiled process methods shows
				 * if it is defined before.
				 */
				"IsCompiledMethodsVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Indicates whether add element button is enabled.
				 */
				"IsAddUsingsButtonEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Caption of the process notification.
				 */
				"NotificationCaption": {
					dataValueType: Terrasoft.DataValueType.MAPPING,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption:  Terrasoft.Resources.ProcessSchemaDesigner.Parameters.NotificationCaption
				},

				/**
				 * Current active using item id.
				 */
				"ActiveUsingItemId": {
					dataValueType: Terrasoft.DataValueType.GUID
				}
			},
			modules: {
				"ProcessSchemaMethods": {
					"config": {
						"schemaName": "SourceCodeEditPage",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"showMask": true,
						"autoGeneratedContainerSuffix": "-process-schema-methods",
						"parameters": {
							"viewModelConfig": {
								"Tag": "methodsBody"
							}
						}
					}
				},
				"CompiledProcessSchemaMethods": {
					"config": {
						"schemaName": "SourceCodeEditPage",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"showMask": true,
						"autoGeneratedContainerSuffix": "-compile-process-schema-methods",
						"parameters": {
							"viewModelConfig": {
								"Tag": "compiledMethodsBody"
							}
						}
					}
				}
			},
			methods: {

				/**
				 * @private
				 */
				_onUseForceCompileChanged: function() {
					const processSchema = this.get("ProcessSchema");
					if (processSchema) {
						processSchema.setPropertyValue("useForceCompile", this.get("useForceCompile"));
						const shouldBeCompiled = processSchema.shouldBeCompiled();
						const isNoCompilation = this.isNoCompilationFeatureEnableConverter(shouldBeCompiled);
						this.set("CanChangeUseForceCompile", isNoCompilation);
					}
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getIsEditPageDefault.
				 * @overridden
				 */
				getIsEditPageDefault: function() {
					return true;
				},

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad.
				 * @overridden
				 */
				onElementDataLoad: function(process, callback, scope) {
					var defaultTabName = "ParametersTab";
					this.set("DefaultTabName", defaultTabName);
					this.setActiveTab(defaultTabName);
					this.set(defaultTabName, true);
					this.set("IsExtendedMode", true);
					this.callParent([process, function() {
						this.set("ProcessSchema", process);
						this.set("AllowCompileMode", process.shouldBeCompiled());
						this.set("version", process.version);
						this.set("useForceCompile", process.useForceCompile);
						this.set("tag", process.tag);
						this.set("methodsBody", process.methodsBody);
						this.initPropertySilent(process.notificationCaption);
						var compiledProcessMethodsSource = process.compiledMethodsBody;
						this.set("compiledMethodsBody", compiledProcessMethodsSource);
						if (compiledProcessMethodsSource !== "") {
							this.set("IsCompiledMethodsVisible", true);
						}
						this.initMethods();
						this.initUsings(process.usings);
						this.initAddButtonMenu();
						callback.call(scope);
					}, this]);
				},

				/**
				 * Subscribes for source code edit page module events.
				 * @protected
				 */
				initMethods: function() {
					Terrasoft.each(this.modules, this.subscribeModuleEvents, this);
				},

				/**
				 * Subscribes for module events.
				 * @protected
				 * @param {Object} moduleConfig Module configuration.
				 * @param {String} moduleName Module name.
				 */
				subscribeModuleEvents: function(moduleConfig, moduleName) {
					var moduleId = this.getModuleId(moduleName);
					this.sandbox.subscribe("GetSourceCodeData", this.onGetSourceCodeData, this, [moduleId]);
					this.sandbox.subscribe("SourceCodeChanged", this.onSourceCodeChanged, this, [moduleId]);
				},

				/**
				 * GetSourceCodeData message handler. Returns source code data.
				 * @param {String} tag Source code edit page tag.
				 * @protected
				 * @virtual
				 * @return {Object} Source code edit data.
				 * @return {String} return.sourceCode Source code value.
				 * @return {String} return.dataItemMarker Source code edit marker value.
				 * @return {String} return.name Source code edit name.
				 * @return {String} return.caption Source code edit caption to display in expand mode.
				 * @return {Boolean} return.showCaptionInCollapsedMode Flag to show caption.
				 * @return {String} return.language Source code edit language.
				 */
				onGetSourceCodeData: function(tag) {
					var processSchema = this.get("ProcessElement");
					var caption = "";
					if (tag === "methodsBody") {
						caption = this.get("Resources.Strings.ProcessMethodsCaption");
					} else {
						caption = this.get("Resources.Strings.CompiledProcessMethodsCaption");
					}
					return {
						sourceCode: this.get(tag),
						dataItemMarker: tag,
						name: processSchema.name,
						showCaptionInCollapsedMode: true,
						caption: caption,
						language: sourceCodeEditEnums.Language.CSHARP
					};
				},

				/**
				 * SourceCodeChanged message handler. Sets methods source value by tag.
				 * @param {Object} data Current source code value.
				 * @param {String} data.tag Source code edit page tag.
				 * @param {String} data.sourceCode Source code value.
				 */
				onSourceCodeChanged: function(data) {
					this.set(data.tag, data.sourceCode);
				},

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#createParameterViewModel
				 * @overridden
				 */
				createParameterViewModel: function(parameter) {
					var viewModel = this.callParent(arguments);
					var toolsButtonMenu = viewModel.get("ParameterEditToolsButtonMenu");
					var deleteMenuItem = this.getParameterEditToolsButtonDeleteMenuItem(parameter.name);
					toolsButtonMenu.add(deleteMenuItem);
					viewModel.set("Enabled", true);
					viewModel.onParameterDeleteClick = this.onParameterDeleteClick;
					return viewModel;
				},

				/**
				 * Restores process name value if name is not valid
				 * @private
				 */
				restoreNameValueIfNameNotValid: function() {
					if (this.getIsNewProcess()) {
						return;
					}
					var process = this.get("ProcessElement");
					var attributes = this.validationInfo.attributes;
					if (!attributes.name.isValid) {
						this.set("name", process.name);
					}
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues.
				 * @overridden
				 */
				saveValues: function() {
					this.restoreNameValueIfNameNotValid();
					this.callParent(arguments);
					var process = this.get("ProcessElement");
					process.setPropertyValue("version", this.get("version"));
					process.setPropertyValue("useForceCompile", this.get("useForceCompile"));
					process.setPropertyValue("tag", this.get("tag"));
					this.saveParameter(process.notificationCaption);
					Terrasoft.each(this.modules, function(moduleConfig, moduleName) {
						var moduleId = this.getModuleId(moduleName);
						var sandbox = this.sandbox;
						var sourceCodeData = sandbox.publish("GetValue", null, [moduleId]);
						if (sourceCodeData) {
							this.set(sourceCodeData.tag, sourceCodeData.value);
						}
					}, this);
					process.setPropertyValue("methodsBody", this.get("methodsBody"));
					process.setPropertyValue("compiledMethodsBody", this.get("compiledMethodsBody"));
					this.saveOpenEditPages();
					this.saveUsings(process);
				},

				/**
				 * Returns type menu item.
				 * @param {Object} type Type config.
				 * @param {Terrasoft.DataValueType} type.value Data type.
				 * @param {String} type.displayValue Data type caption.
				 * @return {Terrasoft.BaseViewModel}
				 */
				getTypeMenuItem: function(type) {
					return this.getButtonMenuItem({
						caption: type.displayValue,
						tag: Ext.encode(type.value),
						click: {"bindTo": "addParameterButtonClick"},
						imageConfig: this.getTypeImageConfig(type.value)
					});
				},

				/**
				 * Returns other type menu item.
				 * @param {Terrasoft.BaseViewModelCollection} items Sub menu items.
				 * @return {Terrasoft.BaseViewModel}
				 */
				getOtherTypeMenuItem: function(items) {
					return this.getButtonMenuItem({
						caption: resources.localizableStrings.OtherMenuItemCaption,
						imageConfig: this.getTypeImageConfig(),
						items: items
					});
				},

				/**
				 * Returns type image config.
				 * @param {Terrasoft.DataValueType} [dataValueType] Data type.
				 * @return {Object}
				 */
				getTypeImageConfig: function(dataValueType) {
					var url = Terrasoft.ProcessSchemaDesignerUtilities.getDataValueTypeImageUrl(dataValueType);
					return {
						source: Terrasoft.ImageSources.URL,
						url: url
					};
				},

				/**
				 * Initializes AddButton menu.
				 * @private
				 */
				initAddButtonMenu: function() {
					var menu = this.get("AddButtonMenu");
					menu.clear();
					var types = Terrasoft.data.constants.DataValueTypeConfig;
					menu.add(this.getTypeMenuItem({
						value: types.LONG_TEXT.value,
						displayValue: Terrasoft.Resources.DataValueType.TEXT
					}));
					menu.add(this.getTypeMenuItem({
						value: types.FLOAT2.value,
						displayValue: Terrasoft.Resources.DataValueType.FLOAT
					}));
					menu.add(this.getTypeMenuItem(types.INTEGER));
					menu.add(this.getTypeMenuItem(types.BOOLEAN));
					menu.add(this.getTypeMenuItem(types.LOOKUP));
					menu.add(this.getTypeMenuItem(types.DATE_TIME));
					var otherSubMenu = Ext.create("Terrasoft.BaseViewModelCollection", {
						items: [
							this.getTypeMenuItem(types.MONEY),
							this.getTypeMenuItem(types.DATE),
							this.getTypeMenuItem(types.TIME),
							this.getTypeMenuItem(types.ENTITY),
							this.getTypeMenuItem(types.ENTITY_COLLECTION),
							this.getTypeMenuItem(types.GUID)
						]
					});
					menu.add(this.getOtherTypeMenuItem(otherSubMenu));
				},

				/**
				 * Hides previous parameter before add new parameter.
				 * @private
				 */
				hidePreviousParameterBeforeAddNewParameter: function() {
					var previousParameterEditUId = this.get("ActiveParameterEditUId");
					if (previousParameterEditUId) {
						var parameters = this.get("Parameters");
						var parameter = parameters.get(previousParameterEditUId);
						parameter.set("Visible", true);
					}
					this.set("ActiveParameterEditUId", null);
				},

				/**
				 * Opens parameter edit page for new parameter.
				 * @private
				 * @param {Terrasoft.DataValueType} dataValueType Data type.
				 */
				addParameterButtonClick: function(dataValueType) {
					this.set("AddParameterButtonEnabled", false);
					this.set("IsEmptyParameters", false);
					this.hidePreviousParameterBeforeAddNewParameter();
					var sandbox = this.sandbox;
					var pageId = this.getParameterEditPageId();
					var parameterEditInfo = this.getNewParameterEditInfo(dataValueType);
					this.set("ActiveParameterEditUId", parameterEditInfo.parameters.UId);
					var tags = [pageId];
					sandbox.subscribe("GetParameterEditInfo", function() {
						return parameterEditInfo;
					}, this, tags);
					sandbox.subscribe("SaveParameterInfo", this.saveNewParameterInfo, this, tags);
					sandbox.subscribe("DiscardParameterInfoChanges", this.discardNewParameterInfoChanges, this, tags);
					var renderTo = "AddParameterContainer";
					var maskId = Terrasoft.Mask.show({
						selector: "#" + renderTo,
						timeout: 100,
						clearMasks: true
					});
					var config = {
						renderTo: renderTo,
						id: pageId,
						instanceConfig: {
							maskId: maskId
						}
					};
					sandbox.loadModule("ProcessSchemaParameterEditModule", config);
				},

				/**
				 * Discards new parameter info changes.
				 * @private
				 */
				discardNewParameterInfoChanges: function() {
					this.set("IsEmptyParameters", !this.getHasParameters());
					this.set("ActiveParameterEditUId", null);
					this.set("AddParameterButtonEnabled", true);
					var pageId = this.getParameterEditPageId();
					this.sandbox.unloadModule(pageId);
				},

				/**
				 * Determines whether the functionality of the process reminders is enabled.
				 * @private
				 * @return {Boolean} True, if functionality is enabled; otherwise - False.
				 */
				_getCanUseProcessRemindings: function() {
					return Terrasoft.Features.getIsEnabled("UseProcessRemindings");
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveActiveParameterEdit.
				 * @overridden
				 */
				saveActiveParameterEdit: function() {
					if (this.get("ActiveParameterEditUId")) {
						var pageId = this.getParameterEditPageId();
						var parameterSaved = this.sandbox.publish("SaveParameter", this, [pageId]);
						if (!parameterSaved) {
							this.discardNewParameterInfoChanges();
						}
					}
				},

				/**
				 * Generates unique parameter name or caption by prefix.
				 * @param {String} property Property name.
				 * @param {String} prefix Prefix name.
				 * @param {Terrasoft.core.collections.Collection} items Parameters collection.
				 * @return {String}
				 */
				generateParameterUniqueNameOrCaption: function(property, prefix, items) {
					var name = prefix + "1";
					var counter = 1;
					var filterFn = function(item) {
						return item.get(property) === name;
					};
					do {
						var filteredItems = items.filterByFn(filterFn, this);
						if (filteredItems.getCount() === 0) {
							return name;
						}
						counter++;
						name = prefix + counter;
					} while (true);
				},

				/**
				 * Returns new parameter info into edit page.
				 * @param {Terrasoft.DataValueType} dataValueType Data type.
				 * @return {Object}
				 */
				getNewParameterEditInfo: function(dataValueType) {
					dataValueType = Ext.decode(dataValueType);
					var parameters = this.get("Parameters");
					var namePrefix = Terrasoft.ProcessSchemaParameter.prototype.name;
					var name = this.generateParameterUniqueNameOrCaption("Name", namePrefix, parameters);
					var captionPrefix = Terrasoft.Resources.ProcessSchemaDesigner.Elements.ParameterCaption + " ";
					var caption = this.generateParameterUniqueNameOrCaption("Caption", captionPrefix, parameters);
					return {
						parameters: {
							UId: Terrasoft.generateGUID(),
							Name: name,
							Caption: caption,
							ParameterDataValueTypeConfig: {value: dataValueType},
							ShowSaveButton: true,
							IsEnabled: true,
							Parameters: parameters,
							packageUId: this.get("packageUId"),
							ProcessElement: this.getProcessElement(),
							Value: {
								value: "",
								displayValue: "",
								source: Terrasoft.ProcessSchemaParameterValueSource.None,
								dataValueType: dataValueType
							}
						}
					};
				},

				/**
				 * Saves new parameter info.
				 * @param {Object} parameterInfo Parameter info.
				 */
				saveNewParameterInfo: function(parameterInfo) {
					var process = this.get("ProcessElement");
					var parameters = this.get("Parameters");
					var name = parameterInfo.Name;
					var uId = Terrasoft.generateGUID();
					var referenceSchema = parameterInfo.ReferenceSchema;
					if (referenceSchema) {
						referenceSchema = referenceSchema.value;
					}
					var parameter = Ext.create("Terrasoft.ProcessSchemaParameter", {
						uId: uId,
						name: name,
						caption: new Terrasoft.LocalizableString(parameterInfo.Caption),
						dataValueType: parameterInfo.DataValueType.value,
						isRequired: parameterInfo.IsRequired,
						processFlowElementSchema: process,
						sourceValue: {displayValue: Ext.create("Terrasoft.LocalizableString")},
						createdInSchemaUId: process.uId
					});
					var value = parameterInfo.Value;
					value.referenceSchemaUId = referenceSchema;
					parameter.setMappingValue(value);
					var viewModel = this.createParameterViewModel(parameter);
					parameters.add(uId, viewModel);
					process.parameters.add(uId, parameter);
					this.set("ActiveParameterEditUId", null);
					this.set("AddParameterButtonEnabled", true);
					var pageId = this.getParameterEditPageId();
					this.sandbox.unloadModule(pageId);
				},

				/**
				 * Deletes selected parameter.
				 * @private
				 */
				onParameterDeleteClick: function() {
					var utils = Terrasoft.ProcessSchemaDesignerUtilities;
					var uId = this.get("UId");
					var process = this.get("ProcessElement");
					var parameter = process.parameters.get(uId);
					utils.validateAllLazyPropertiesAreLoaded(process, function(areLoaded) {
						if (areLoaded) {
							utils.validateParameterRemoval(process, parameter, function(canRemove) {
								if (canRemove) {
									this.parentCollection.removeByKey(uId);
									process.parameters.removeByKey(uId);
									this.fireEvent("change", {
										parameterName: "IsEmptyParameters",
										parameterValue: (process.parameters.getCount() === 0)
									});
								}
							}, this);
						}
					}, this);
				},

				/**
				 * Init 'Usings'.
				 * @private
				 * @param {Terrasoft.core.collections.Collection} usings Collection of using.
				 */
				initUsings: function(usings) {
					var viewModels = Ext.create("Terrasoft.Collection");
					usings.each(function(using) {
						var usingViewModel = this.createUsingViewModel({
							id: using.uId,
							name: using.name,
							alias: using.alias
						});
						viewModels.add(using.uId, usingViewModel);
					}, this);
					var usingViewModels = this.get("UsingViewModels");
					usingViewModels.clear();
					usingViewModels.loadAll(viewModels);
				},

				/**
				 * Creates 'Using' ViewModel.
				 * @private
				 * @param {Object} config Config for create view model.
				 * @param {String} config.id Unique identifier.
				 * @param {String} config.name Name.
				 * @param {String} [config.alias] Alias.
				 * @param {Boolean} [config.isNew] Flag of new element.
				 * @return {Terrasoft.ProcessSchemaUsingViewModel}
				 */
				createUsingViewModel: function(config) {
					var id = config.id;
					var alias = config.alias;
					if (alias === "null") {
						alias = "";
					}
					var name = config.name || "";
					var viewModel = Ext.create("Terrasoft.ProcessSchemaUsingViewModel", {
						values: {
							Id: id,
							Name: name,
							Alias: alias || "",
							IsNew: config.isNew,
							MarkerValue: name,
							ParameterEditToolsButtonMenu: this.getToolUsingButtonMenuList(id),
							ProcessElement: "ProcessElement",
							ParentModule: this
						}
					});
					viewModel.sandbox = this.sandbox;
					viewModel.on("change", this.onChildViewModelChange, this);
					return viewModel;
				},

				/**
				 * Generates a configuration 'using' representation element.
				 * @private
				 * @param {Object} viewConfig Link to the configuration element in the Container List.
				 */
				getUsingViewConfig: function(viewConfig) {
					var usingViewConfig = this.get("UsingViewConfig");
					if (usingViewConfig) {
						viewConfig.config = usingViewConfig;
						return;
					}
					viewConfig.config = this.generateUsingViewConfig();
					this.set("UsingViewConfig", viewConfig.config);
				},

				/**
				 * Generates a button representation element.
				 * @protected
				 * @return {Object} configuration element in the Container List.
				 */
				generateUsingViewConfig: function() {
					var parameterToolsButtonConfig = this.getParameterToolsButtonConfig("UsingsEditToolsButton");
					parameterToolsButtonConfig.markerValue = {
						bindTo: "MarkerValue"
					};
					return this.getContainerConfig("item", [], [
						this.getContainerConfig("item-view", ["parameter-ct", "t-button-container-proc"], [
							this.getContainerConfig("ParameterValueContainer", ["t-button-name-container-proc",
								"placeholderOpacity"
							], [
								this.getContainerConfig("ToolsContainer",
										["parameter-value-ct", "tools-container-wrapClass"], [
									this.getContainerConfig("LabelWrap", ["label-container-wrapClass"], [{
										id: "Caption",
										className: "Terrasoft.Label",
										caption: {
											bindTo: "Name"
										},
										classes: {
											labelClass: ["t-label-proc", "t-label-proc-param", "label-link"]
										},
										click: {
											bindTo: "onLoadMinEditPageClick"
										}
									}]),
									this.getContainerConfig("ToolsButtonWrap", ["tools-button-container-wrapClass"],
										[parameterToolsButtonConfig])
								])
							])
						], {
							bindTo: "Visible"
						}), this.getContainerConfig("item-edit", ["parameter-edit-ct"], [], {
							bindTo: "Visible",
							bindConfig: {
								converter: this.invertBooleanValue
							}
						})
					]);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getTabs
				 * @overridden
				 */
				getTabs: function() {
					var tabs = this.callParent();
					tabs.push(
						{
							Name: "MethodsTab",
							Caption: resources.localizableStrings.MethodsTabCaption,
							MarkerValue: "MethodsTab"
						}
					);
					return tabs;
				},

				/**
				 * Event handler Add button click.
				 * @private
				 */
				onAddUsingButtonClick: function() {
					var usingViewModels = this.get("UsingViewModels");
					var id = Terrasoft.generateGUID();
					var usingViewModel = this.createUsingViewModel({
						id: id,
						isNew: true
					});
					usingViewModels.add(id, usingViewModel);
					usingViewModel.onLoadMinEditPageClick();
					this.set("ActiveUsingEditViewModel", usingViewModel);
				},

				/**
				 * Gets menu list for selected item.
				 * @protected
				 * @param {String} itemId Item identifier.
				 * @return {Terrasoft.Collection}
				 */
				getToolUsingButtonMenuList: function(itemId) {
					var toolsButtonMenu = Ext.create("Terrasoft.Collection");
					toolsButtonMenu.add(
						this.getButtonMenuItem({
							"id": "EditMenu",
							"tag": itemId,
							"caption": this.get("Resources.Strings.EditMenuItemCaption"),
							"click": {"bindTo": "onLoadMinEditPageClick"}
						})
					);
					toolsButtonMenu.add(
						this.getButtonMenuItem({
							"id": "DeleteMenu",
							"tag": itemId,
							"caption": this.get("Resources.Strings.DeleteMenuItemCaption"),
							"click": {"bindTo": "onItemDeleteClick"}
						})
					);
					return toolsButtonMenu;
				},

				/**
				 * Saves using edit page if it is steel visible.
				 * @private
				 * @param {Terrasoft.model.ProcessSchemaUsingViewModel} usingViewModel Using view model.
				 */
				saveUsingEditPage: function(usingViewModel, force) {
					const isEditPageVisible = !usingViewModel.get("Visible");
					if (isEditPageVisible) {
						const pageId = usingViewModel.getProcessMiniEditPageId();
						const success = this.sandbox.publish("SaveItem", this, [pageId]);
						if (!success && force) {
							this.sandbox.publish("DiscardItem", this, [pageId]);
						}
						return success;
					}
					return true;
				},

				/**
				 * Processes tab change event.
				 * @override
				 * @param {Terrasoft.BaseViewModel} activeTab Selected tab.
				 */
				onActiveTabChange: function(activeTab) {
					this.callParent(arguments);
					this.saveOpenEditPages();
				},

				/**
				 * Saves opened edit pages: Usings and LocalizableStrings.
				 */
				saveOpenEditPages: function() {
					const schema = this.get("ProcessElement");
					this._saveOpenEditPage(schema, "Using");
				},

				/**
				 * Saves opened edit page.
				 * @private
				 * @param name {string} name of the page view model.
				 */
				_saveOpenEditPage: function(schema, subject) {
					const activeItemId = this.get("Active" + subject + "ItemId");
					if (activeItemId) {
						const viewModels = this.get(subject + "ViewModels");
						const activeViewModel = viewModels.get(activeItemId);
						const result = this["save" + subject + "EditPage"](activeViewModel, true);
						if (result) {
							this["update" + subject + "ByViewModel"](activeViewModel, schema);
						}
					}
				},

				/**
				 * Updates schema using by view model.
				 * @private
				 * @param {Terrasoft.model.ProcessSchemaUsingViewModel} usingViewModel Using view model.
				 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
				 * @return {Boolean} Returns true if schema using was changed, false otherwise.
				 */
				updateUsingByViewModel: function(usingViewModel, schema) {
					var name = usingViewModel.get("Name");
					if (!usingViewModel.changedValues || Ext.isEmpty(name)) {
						return false;
					}
					var usings = schema.usings;
					var id = usingViewModel.get("Id");
					var config = {
						name: name,
						alias: usingViewModel.get("Alias")
					};
					if (usings.contains(id)) {
						var using = usings.get(id);
						config.modifiedInSchemaUId = schema.uId;
						using.setValue(config);
					} else {
						config.uId = id;
						schema.addUsing(config);
					}
					return true;
				},

				/**
				 * Updates schema usings.
				 * @private
				 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
				 * @return {Boolean} Returns true if at least one schema usings was changed, false otherwise.
				 */
				updateUsings: function(schema) {
					var usingViewModels = this.get("UsingViewModels");
					var isChanged = false;
					usingViewModels.each(function(usingViewModel) {
						this.saveUsingEditPage(usingViewModel);
						isChanged = this.updateUsingByViewModel(usingViewModel, schema);
					}, this);
					return isChanged;
				},

				/**
				 * Removes 'Using' from collection Usings.
				 * @private
				 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
				 * @return {Boolean} Returns true if at least one schema usings was removed, false otherwise.
				 */
				removeUsings: function(schema) {
					var isRemoved = false;
					var usingViewModels = this.get("UsingViewModels");
					var usings = schema.usings;
					usings.each(function(using) {
						var key = using.uId;
						if (!usingViewModels.contains(key)) {
							usings.removeByKey(key);
							isRemoved = true;
						}
					}, this);
					return isRemoved;
				},

				/**
				 * Saves schema usings.
				 * @private
				 * @param {Terrasoft.manager.ProcessSchema} schema Process schema.
				 */
				saveUsings: function(schema) {
					var isUsingsRemoved = this.removeUsings(schema);
					var isUsingsChanged = this.updateUsings(schema);
					if (isUsingsChanged || isUsingsRemoved) {
						schema.fireEvent("changed", {
							usings: schema.usings
						}, this);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "ParameterEdit",
					"values": {
						"visible": true
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "version",
					"values": {
						"wrapClass": ["top-caption-control"],
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "tag",
					"values": {
						"wrapClass": ["top-caption-control"],
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "description",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"wrapClass": ["top-caption-control"],
						"caption": {"bindTo": "Resources.Strings.DescriptionCaption"},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "SysPackage",
					"values": {
						"enabled": {"bindTo": "IsSysPackageEnabled"},
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareSysPackageList"
							}
						},
						"wrapClass": ["top-caption-control"],
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "maxLoopCount",
					"values": {
						"wrapClass": ["top-caption-control"],
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "NotificationCaption",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24,
							"rowSpan": 1
						},
						"wrapClass": ["top-caption-control"],
						visible: {
							bindTo: "_getCanUseProcessRemindings"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "enabled",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24,
							"rowSpan": 1
						},
						"enabled": false
					}
				},
				{
					"operation": "merge",
					"name": "isLogging",
					"values": {
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "merge",
					"name": "serializeToDB",
					"values": {
						"layout": {
							"column": 0,
							"row": 9,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "useForceCompileContainer",
					"values": {
						"layout": {
							"column": 0,
							"row": 10,
							"colSpan": 24,
							"rowSpan": 1
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"classes": {
							"wrapClassName": ["not-compile", "checkbox-container"]
						},
						"visible": {
							"bindTo": "AllowCompileMode",
							"bindConfig": {
								"converter": "isNoCompilationFeatureEnableConverter"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "useForceCompileContainer",
					"propertyName": "items",
					"name": "useForceCompile",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"enabled": {
							"bindTo": "CanChangeUseForceCompile"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "useForceCompileContainer",
					"propertyName": "items",
					"name": "useForceCompileInfoButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": Terrasoft.Resources.ProcessSchemaDesigner.Messages.DenyMakeProcessCompile,
						"controlConfig": {
							"visible": {
								"bindTo": "CanChangeUseForceCompile",
								"bindConfig": {
									"converter": "invertBooleanValue"
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "isActualVersion",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"layout": {
							"column": 0,
							"row": 11,
							"colSpan": 24,
							"rowSpan": 1
						},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "useSystemSecurityContext",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"layout": {
							"column": 0,
							"row": 12,
							"colSpan": 24,
							"rowSpan": 1
						},
						"visible": {"bindTo": "FeatureDisableAdminRightsInScriptTaskEnabled"}
					}
				},
				{
					"operation": "insert",
					"name": "MethodsTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"wrapClass": ["tabs", "methods-tab"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "MethodsTab",
					"propertyName": "items",
					"name": "UsingsContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["using-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AddUsingButtonContainer",
					"parentName": "UsingsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["container-list-header"]
					}
				},
				{
					"operation": "insert",
					"name": "UsingsLabel",
					"parentName": "AddUsingButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.UsingsGroupCaption"
						},
						"classes": {
							"labelClass": ["t-title-label-proc t-title-button-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "UsingsButton",
					"parentName": "AddUsingButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"imageClass": ["button-background-no-repeat"],
							"wrapperClass": ["detail-tools-button-wrapper t-addbutton-proc"]
						},
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"click": {"bindTo": "onAddUsingButtonClick"},
						"enabled": {"bindTo": "IsAddUsingsButtonEnabled"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "UsingContainerList",
					"parentName": "UsingsContainer",
					"propertyName": "items",
					"values": {
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"onItemClick": {
							"bindTo": "onItemClick"
						},
						"collection": "UsingViewModels",
						"onGetItemConfig": "getUsingViewConfig",
						"rowCssSelector": ".usingContainer",
						"classes": {
							"wrapClassName": ["t-items-list-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "MethodsTab",
					"propertyName": "items",
					"name": "ProcessSchemaMethods",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {
							"wrapClassName": "process-methods process-methods-container"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "MethodsTab",
					"propertyName": "items",
					"name": "CompiledProcessSchemaMethods",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"visible": {
							"bindTo": "IsCompiledMethodsVisible"
						},
						"classes": {
							"wrapClassName": "process-methods compiled-process-methods-container"
						},
						"items": []
					}
				},
				{
					"operation": "remove",
					"name": "EditorsContainer"
				}
			]/**SCHEMA_DIFF*/
		};
	});


