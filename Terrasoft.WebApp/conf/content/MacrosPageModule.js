Terrasoft.configuration.Structures["MacrosPageModule"] = {innerHierarchyStack: ["MacrosPageModule"]};
define("MacrosPageModule", ["ext-base", "terrasoft", "CardViewGenerator", "CardViewModelGenerator", "LookupUtilities",
		"Macros", "sandbox", "MacrosPageModuleResources", "StorageUtilities", "ConfigurationConstants"],
	function(Ext, Terrasoft, CardViewGenerator, CardViewModelGenerator, LookupUtilities, Macros, sandbox, resources,
			storageUtilities, ConfigurationConstants) {

		var macrosList;
		var commandList;
		var mainParamList;
		var additionalParamList;
		var allList;
		var ajaxProvider;
		var container;
		var action;
		var recordId;
		var bindings = {};
		var viewModel;
		var viewConfig;
		var isMainParamTypeInitialized = false;
		var info = [
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "Id",
				columnPath: "Id",
				visible: false,
				viewVisible: false
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "Name",
				columnPath: "Name",
				dataValueType: Terrasoft.DataValueType.TEXT,
				visible: true
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "Command",
				columnPath: "Command",
				dataValueType: Terrasoft.DataValueType.ENUM,
				customConfig: {
					visible: {
						bindTo: "isCommandVisible"
					},
					change: {
						bindTo: "commandChanged"
					},
					prepareList: {
						bindTo: "loadCommandList"
					}
				}
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "MainParam",
				columnPath: "MainParam",
				dataValueType: Terrasoft.DataValueType.ENUM,
				captionLabelCustomConfig: {
					caption: {
						bindTo: "mainParamCaption"
					}
				},
				customConfig: {
					visible: {
						bindTo: "isMainParamVisible"
					},
					change: {
						bindTo: "mainParamChanged"
					},
					prepareList: {
						bindTo: "loadMainParamList"
					}
				}
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "MainParamType",
				columnPath: "MainParamType",
				dataValueType: Terrasoft.DataValueType.ENUM,
				customConfig: {
					list: {
						bindTo: "MainParamTypeList"
					},
					visible: {
						bindTo: "isMainParamTypeComboBoxVisible"
					},
					change: {
						bindTo: "mainParamTypeChanged"
					},
					prepareList: {
						bindTo: "loadMainParamTypeList"
					}
				}
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "AdditionalParam",
				columnPath: "AdditionalParam",
				dataValueType: Terrasoft.DataValueType.ENUM,
				customConfig: {
					visible: {
						bindTo: "isAdditionalParamVisible"
					},
					prepareList: {
						bindTo: "loadAdditionalParamList"
					}
				}
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "AdditionalParamValue",
				columnPath: "AdditionalParamValue",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				captionLabelCustomConfig: {
					id: "additional-param-lookup-value",
					caption: {
						bindTo: "additionalParamValueCaption"
					}
				},
				customConfig: {
					minSearchCharsCount: 0,
					visible: {
						bindTo: "isAdditionalParamLookupValueVisible"
					},
					prepareList: {
						bindTo: "loadAdditionalParamValueList"
					},
					list: {
						bindTo: "AdditionalParamValueList"
					},
					loadVocabulary: {
						bindTo: "loadVocabulary"
					},
					tag: "AdditionalParamValue"
				}
			},
			{
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "AdditionalParamValue",
				columnPath: "AdditionalParamValue",
				dataValueType: Terrasoft.DataValueType.TEXT,
				captionLabelCustomConfig: {
					caption: {
						bindTo: "additionalParamValueCaption"
					}
				},
				customConfig: {
					visible: {
						bindTo: "isAdditionalParamValueVisible"
					}
				}
			}
		];

		var buttonsConfig = {
			className: "Terrasoft.Container",
			id: "header-container",
			classes: {
				wrapClassName: ["header-container"]
			},
			selectors: {
				wrapEl: "#header-container"
			},
			items: [
				{
					className: "Terrasoft.Container",
					id: "caption-header-container",
					classes: {
						wrapClassName: ["caption-header-container"]
					},
					selectors: {
						wrapEl: "#caption-header-container"
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: {
								bindTo: "pageCaption"
							},
							classes: {
								labelClass: ["page-caption-label"]
							},
							width: "100%",
							visible: false
						}
					]
				},
				{
					className: "Terrasoft.Container",
					id: "main-buttons-container",
					classes: {
						wrapClassName: ["main-buttons-container"]
					},
					selectors: {
						wrapEl: "#main-buttons-container"
					},
					items: [
						{
							className: "Terrasoft.Button",
							style: Terrasoft.controls.ButtonEnums.style.GREEN,
							caption: resources.localizableStrings.SaveButtonCaption,
							click: {bindTo: "save"},
							classes: {textClass: ["button-margin-right"]}
						},
						{
							className: "Terrasoft.Button",
							caption: resources.localizableStrings.CancelButtonCaption,
							classes: {textClass: ["button-margin-right"]},
							click: {bindTo: "cancel"}
						}
					]
				}
			]
		};

		function callServiceMethod(methodName, callback, dataSend) {
			var data = dataSend || {};
			var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/CommandLineService/" + methodName;
			var request = ajaxProvider.request({
				url: requestUrl,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				jsonData: data,
				callback: function(request, success, response) {
					var responseObject = {};
					if (success) {
						responseObject = Terrasoft.decode(response.responseText);
					}
					callback.call(this, responseObject);
				},
				scope: this
			});
			return request;
		}

		function createViewConfig(mainContainerConfig) {
			CardViewGenerator.generateView(mainContainerConfig, info, bindings, action, Macros);
		}

		function createMainViewConfig() {
			var view = {
				id: "macros-main-container",
				selectors: {
					el: "#macros-main-container",
					wrapEl: "#macros-main-container"
				},
				markerValue: {bindTo: "getMainContainerMarkerValue"},
				items: []
			};
			var mainContainerConfig = {
				className: "Terrasoft.Container",
				id: "macros-edit-container",
				selectors: {
					wrapEl: "#macros-edit-container"
				},
				items: []
			};
			view.items.push(buttonsConfig);
			createViewConfig(mainContainerConfig);
			view.items.push(mainContainerConfig);
			return view;
		}

		function createViewModelConfig() {
			var viewModel = {
				entitySchema: Macros,
				columns: {
					Name: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						isLookup: false,
						isRequired: true
					},
					Command: {
						dataValueType: Terrasoft.DataValueType.ENUM,
						isRequired: true,
						isLookup: true,
						referenceSchemaName: "Command"
					}
				},
				values: {
					Id: null,
					Name: null,
					Command: null,
					CommandList: new Terrasoft.Collection(),
					CommandsLoaded: false,
					MainParam: null,
					MainParamList: new Terrasoft.Collection(),
					AdditionalParam: null,
					AdditionalParamList: new Terrasoft.Collection(),
					AdditionalParamValue: null,
					AdditionalParamValueList: new Terrasoft.Collection(),
					MainParamType: null,
					MainParamTypeList: new Terrasoft.Collection(),
					mainParamCaption: "",
					additionalParamValueCaption: "",
					isCommandVisible: true,
					isMainParamVisible: false,
					isAdditionalParamVisible: false,
					isAdditionalParamLookupValueVisible: false,
					isAdditionalParamValueVisible: false,
					isMainParamTypeComboBoxVisible: false
				},
				methods: {
					loadVocabulary: function(args, tag) {
						var entitySchemaName, columnName, columns;
						if (tag === "AdditionalParamValue") {
							var command = this.get("Command");
							var mainParam = this.get("MainParam");
							var addParam = this.get("AdditionalParam");
							var mainParamSchema = mainParamList.get(mainParam.value).SubjectSchemaName;
							var addParamSchema = additionalParamList.get(addParam.value).AdditionalParamSchemaName;
							var commandCode = commandList.get(command.value).CommandCode;
							switch (commandCode) {
								case "search":
									entitySchemaName = mainParamSchema;
									columnName = "AdditionalParamValue";
									break;
								/* jshint ignore:start */
								case "goto":
									columns = ["FolderType", "SearchData"];
								/* jshint ignore:end */
								case "startbp":
									entitySchemaName = addParamSchema;
									columnName = "AdditionalParamValue";
									break;
								default:
									break;
							}
						} else {
							entitySchemaName = columnName = tag;
						}
						var config = {
							entitySchemaName: entitySchemaName,
							multiSelect: false,
							columnName: columnName,
							columns: columns,
							searchValue: args.searchValue,
							filters: this.getLookupQueryFilters.call(this, entitySchemaName)
						};
						var handler = function(args) {
							var columnName = args.columnName;
							var collection = args.selectedRows;
							if (collection.getCount() > 0) {
								var item = collection.getByIndex(0);
								if (item.FolderType) {
									item.filter = item.SearchData;
									delete item.SearchData;
								}
								this.set(columnName, item);
							}
						};
						LookupUtilities.Open(sandbox, config, handler, this, container);
					},
					cancel: function() {
						sandbox.publish("BackHistoryState");
					},
					save: function() {
						if (this.validate()) {
							var scope = this;
							Terrasoft.EntitySchemaQuery.clearCache("Macros_AdditionalMacrosParamValues");
							callServiceMethod("ClearCache", function() {
									var callback = function() {
										storageUtilities.clearStorage(
											storageUtilities.ClearStorageModes.GROUP, "CommandLineStorage");
										sandbox.publish("ChangeCommandList");
										sandbox.publish("BackHistoryState");
									};
									scope.saveMacros(callback, scope);
								},
								{
									"cacheArray": ["VwCommandActionCache", "CommandParamsCache"]
								});
						}
					},

					/**
					 * Saves macro.
					 * @param {Function} callback Callback-function.
					 * @param {Object} scope Context of the callback.
					 */
					saveMacros: function(callback, scope) {
						var name = this.get("Name");
						var command = this.get("Command");
						var mainParam = this.get("MainParam");
						var additionalParam = this.get("AdditionalParam");
						var additionalParamAttribute = this.get("AdditionalParamValue");
						var mainParamType = this.get("MainParamType");
						var commandValue = command ? command.value : Terrasoft.GUID_EMPTY;
						var mainParamValue = mainParam ? mainParam.value : Terrasoft.GUID_EMPTY;
						var additionalParamValue = additionalParam ? additionalParam.value : Terrasoft.GUID_EMPTY;
						var mainParamTypeValue = mainParamType ? mainParamType.value : "";
						var queryClassName = this.getQueryClassName(action);
						var macroConfig = {
							queryClassName: queryClassName,
							name: name,
							commandValue: commandValue,
							mainParamValue: mainParamValue,
							additionalParamValue: additionalParamValue,
							additionalParamAttribute: additionalParamAttribute,
							mainParamTypeValue: mainParamTypeValue
						};
						var query = this.getSaveMacroQuery(macroConfig);
						query.execute(callback, scope);
					},

					/**
					 * Returns query class name by action name.
					 * @private
					 * @param {String} action Action name.
					 * @return {String} Query class name.
					 */
					getQueryClassName: function(action) {
						var queryClassName;
						if (action === "add" || action === "copy") {
							queryClassName = "Terrasoft.InsertQuery";
						} else if (action === "edit") {
							queryClassName = "Terrasoft.UpdateQuery";
						}
						return queryClassName;
					},

					/**
					 * Returns save macro query.
					 * @private
					 * @param {Object} macroConfig Macro configuration.
					 * @param {String} macroConfig.queryClassName Query class name.
					 * @param {String} macroConfig.name Macro name.
					 * @param {String} macroConfig.commandValue Macro command.
					 * @param {String} macroConfig.mainParamValue Macro main parameter.
					 * @param {String} macroConfig.mainParamTypeValue Macro main parameter type.
					 * @param {String} macroConfig.additionalParamValue Macro additional parameter.
					 * @param {Object} macroConfig.additionalParamAttribute Macro additional parameter attribute.
					 * @return {Object} Save macro query.
					 */
					getSaveMacroQuery: function(macroConfig) {
						var query = Ext.create(macroConfig.queryClassName, {
							rootSchemaName: "Macros"
						});
						query.setParameterValue("Name", macroConfig.name, Terrasoft.DataValueType.TEXT);
						query.setParameterValue("Command", macroConfig.commandValue, Terrasoft.DataValueType.GUID);
						query.setParameterValue("MainParam", macroConfig.mainParamValue, Terrasoft.DataValueType.GUID);
						if (macroConfig.additionalParamValue !== Terrasoft.GUID_EMPTY) {
							query.setParameterValue("AdditionalParam", macroConfig.additionalParamValue,
								Terrasoft.DataValueType.GUID);
							var additionalParamAttributeValue =
								this.getAdditionalParamAttributeValue(macroConfig.additionalParamAttribute);
							query.setParameterValue("AdditionalParamValue", additionalParamAttributeValue,
								Terrasoft.DataValueType.TEXT);
						}
						query.setParameterValue("MainParamType", macroConfig.mainParamTypeValue,
							Terrasoft.DataValueType.TEXT);
						if (action === "edit") {
							var filters = query.filters;
							var idFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Id", recordId);
							filters.add("IdFilter", idFilter);
						}
						return query;
					},

					/**
					 * Returns additional parameter attribute value.
					 * @private
					 * @param {Object} additionalParamAttribute Macro additional parameter attribute.
					 * @param {String} additionalParamAttribute.value Additional parameter attribute value.
					 * @param {String} additionalParamAttribute.displayValue Additional parameter attribute value.
					 * @param {String} additionalParamAttribute.FolderType Additional parameter attribute folder type.
					 * @return {String} Additional parameter attribute value.
					 */
					getAdditionalParamAttributeValue: function(additionalParamAttribute) {
						var additionalParamAttributeValue = "";
						if (additionalParamAttribute) {
							if (additionalParamAttribute.value) {
								additionalParamAttributeValue = additionalParamAttribute.value + ";" +
									additionalParamAttribute.displayValue;
								if (additionalParamAttribute.FolderType) {
									additionalParamAttribute.folderType = additionalParamAttribute.FolderType;
									additionalParamAttributeValue += ";" + Ext.JSON.encode(additionalParamAttribute);
								}
							} else {
								additionalParamAttributeValue = additionalParamAttribute;
							}
						}
						return additionalParamAttributeValue;
					},

					commandChanged: function(item) {
						this.clearControlsGroup("command");
						if (item) {
							this.set("isMainParamVisible", true);
							var command = commandList.get(item.value);
							if (command.CommandCode === "goto") {
								this.set("mainParamCaption", resources.localizableStrings.SectionCaption);
							} else if (command.CommandCode === "startbp") {
								this.set("Command", item);
								this.loadMainParamList("", this.get("MainParamList"));
							} else {
								this.set("mainParamCaption", resources.localizableStrings.ObjectCaption);
							}
						}
					},
					mainParamChanged: function(item) {
						this.clearControlsGroup("mainParam");
						if (item) {
							var command = this.get("Command");
							var commandCode = commandList.get(command.value).CommandCode;
							switch (commandCode) {
								case "create":
									this.set("MainParam", item);
									this.set("isAdditionalParamValueVisible", true);
									this.loadAdditionalParamList("", this.get("AdditionalParamList"));
									this.set("additionalParamValueCaption", this.get("AdditionalParam").displayValue);
									break;
								case "search":
								case "goto":
								case "startbp":
									this.set("MainParam", item);
									var additionalParameters = this.getAdditionalParamsByMainParam(item.value);
									if (additionalParameters.getCount() === 0) {
										return;
									}
									this.set("isAdditionalParamLookupValueVisible", true);
									this.loadAdditionalParamList("", this.get("AdditionalParamList"));
									this.set("additionalParamValueCaption", this.get("AdditionalParam").displayValue);
									break;
								default :
									break;
							}
							if (mainParamList.contains(item.value) && commandCode === "create") {
								var columnType = mainParamList.get(item.value).ColumnType;
								if (Terrasoft.isGUID(columnType) &&
									columnType !== Terrasoft.GUID_EMPTY) {
									this.set("isMainParamTypeComboBoxVisible", true);
								} else {
									this.set("isMainParamTypeComboBoxVisible", false);
									this.set("MainParamType", null);
								}
							}
						}
					},
					mainParamTypeChanged: function(item) {
						if (!item || isMainParamTypeInitialized) {
							return;
						}
						isMainParamTypeInitialized = true;
						var viewModel = this;
						var mainParamValue = mainParamList.get(this.get("MainParam").value);
						callServiceMethod("GetMainParamTypeList", function(response) {
								var responseArray = response.GetMainParamTypeListResult;
								if (responseArray) {
									for (var i = 0; i < responseArray.length; i++) {
										var value = responseArray[i].Key;
										var displayValue = responseArray[i].Value;
										if (value === item) {
											viewModel.set("MainParamType", {value: item, displayValue: displayValue});
											return;
										}
									}
								}
							},
							{
								"subjectSchemaUId": mainParamValue.SubjectSchemaUId,
								"columnUId": mainParamValue.ColumnType
							});
					},
					getLookupQueryFilters: function(tag) {
						var filterGroup = Terrasoft.createFilterGroup();
						var idArray, value, filter;
						switch (tag) {
							case "MainParam":
								filterGroup.name = "primaryColumnFilter";
								value = this.get("Command");
								idArray = this.getFilteredArray(tag, value.value);
								filter = Terrasoft.createColumnInFilterWithParameters("Id", idArray);
								filterGroup.addItem(filter);
								break;
							case "AdditionalParam":
								filterGroup.name = "primaryColumnFilter";
								value = this.get("MainParam");
								idArray = this.getFilteredArray(tag, value.value);
								filter = Terrasoft.createColumnInFilterWithParameters("Id", idArray);
								filterGroup.addItem(filter);
								break;
							case "VwSysProcess":
								filterGroup.name = "contactFiler";
								filter = Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
									Terrasoft.SysValue.CURRENT_WORKSPACE.value);
								var businessProcessTagFilter = Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "TagProperty",
									ConfigurationConstants.SysProcess.BusinessProcessTag);
								filterGroup.addItem(filter);
								filterGroup.addItem(businessProcessTagFilter);
								break;
							default :
								break;
						}
						return filterGroup;
					},
					getFilteredArray: function(paramName, id) {
						var result = [];
						var tempCollection, filterFn;
						id = id.toLowerCase();
						switch (paramName) {
							case "Command":
								allList.each(function(item) {
									if (result.indexOf(item.CommandId) === -1) {
										result.push(item.CommandId);
									}
								});
								break;
							case "MainParam":
								filterFn = function(item) {
									var commandIdMatch = (id === item.CommandId.toLowerCase());
									var schemaNameMatch = (item.MainParamSubjectSchemaName !== Macros.name);
									return (commandIdMatch && schemaNameMatch);
								};
								tempCollection = allList.filter(filterFn);
								tempCollection.each(function(item) {
									if (result.indexOf(item.MainParamId) === -1) {
										result.push(item.MainParamId);
									}
								});
								break;
							case "AdditionalParam":
								filterFn = function(item) {
									return (id === item.MainParamId.toLowerCase());
								};
								tempCollection = allList.filter(filterFn);
								tempCollection.each(function(item) {
									if (result.indexOf(item.AdditionalParamId) === -1) {
										result.push(item.AdditionalParamId);
									}
								});
								break;
							default:
								break;
						}
						return result;
					},

					/**
					 * ########## ######## ########## DOM-######## ######.
					 * @return {String}
					 */
					getMainContainerMarkerValue: function() {
						if (this.get("CommandsLoaded")) {
							return "data-ready";
						}
					},
					loadCommandList: function(filter, list) {
						list.clear();
						var obj = {};
						commandList.eachKey(function(key, item) {
							obj[key] = {value: key, displayValue: item.CommandName};
						});
						list.loadAll(obj);
					},
					loadMainParamList: function(filter, list) {
						list.clear();
						var obj = {};
						var command = this.get("Command");
						if (!command) {
							return;
						}
						var array = this.getFilteredArray("MainParam", command.value);
						var predicate = function(item, key) {
							return array.indexOf(key) >= 0;
						};
						var tempList = mainParamList.filter(predicate);
						tempList.eachKey(function(key, item) {
							obj[key] = {value: key, displayValue: item.MainParamName};
						});
						if (tempList.getCount() === 1) {
							this.set("MainParam", obj[tempList.getKeys()[0]]);
							this.set("isMainParamVisible", false);
						}
						list.loadAll(obj);
					},
					loadMainParamTypeList: function(filter, list) {
						list.clear();
						var obj = {};
						var mainParamValue = mainParamList.get(this.get("MainParam").value);
						callServiceMethod("GetMainParamTypeList", function(response) {
								var responseArray = response.GetMainParamTypeListResult;
								var collectionList = list;
								if (responseArray) {
									for (var i = 0; i < responseArray.length; i++) {
										var value = responseArray[i].Key;
										var displayValue = responseArray[i].Value;
										obj[value] = {value: value, displayValue: displayValue};
									}
									collectionList.loadAll(obj);
								}
							},
							{
								"subjectSchemaUId": mainParamValue.SubjectSchemaUId,
								"columnUId": mainParamValue.ColumnType
							});
					},
					/**
					 *Returns list of additional parameters, filtered by main parameter value
					 * @private
					 * @param {string} mainParamValue
					 * @returns {Terrasoft.Collection}
					 */
					getAdditionalParamsByMainParam: function(mainParamValue) {
						var array = this.getFilteredArray("AdditionalParam", mainParamValue);
						var predicate = function(item, key) {
							return array.indexOf(key) >= 0;
						};
						return additionalParamList.filter(predicate);
					},
					/**
					 *Load additional parameters list by main parameter value
					 * @param {String} filter Filter.
					 * @param {Terrasoft.Collection} list Drop-down List.
                     */
					loadAdditionalParamList: function(filter, list) {
						list.clear();
						var obj = {};
						var mainParam = this.get("MainParam");
						if (!mainParam) {
							this.set("AdditionalParam", null);
							return;
						}
						var tempList = new Terrasoft.Collection();
						var additionalParameters = this.getAdditionalParamsByMainParam(mainParam.value);
						tempList.loadAll(additionalParameters);
						tempList.eachKey(function(key, item) {
							obj[key] = {value: key, displayValue: item.AdditionalParamName};
						});
						list.loadAll(obj);
						if (tempList.getCount() === 1) {
							this.set("AdditionalParam", obj[tempList.getKeys()[0]]);
						}
					},

					/**
					 * ######### ###### ############## ########## ################ #######,
					 * ############### ## ######## ######.
					 * @protected
					 * @param {String} searchQuery ######## ######.
					 * @param {Object} list ###### ############## ########## ################ #######.
					 */
					loadAdditionalParamValueList: function(searchQuery, list) {
						var loadCustomListConfig, addParam;
						var commandCode = commandList.get(this.get("Command").value).CommandCode;
						var customListFilterGroup = Terrasoft.createFilterGroup();
						customListFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						list.clear();
						switch (commandCode) {
							case "search":
								var mainParam = mainParamList.get(this.get("MainParam").value);
								loadCustomListConfig = this.getMainParamLoadingConfig(mainParam);
								break;
							case "goto":
								addParam = additionalParamList.get(this.get("AdditionalParam").value);
								loadCustomListConfig = this.getAdditionalParamLoadingConfig(addParam);
								loadCustomListConfig.loadFolderList = true;
								break;
							case "startbp":
								addParam = additionalParamList.get(this.get("AdditionalParam").value);
								loadCustomListConfig = this.getAdditionalParamLoadingConfig(addParam);
								var businessProcessFilter = this.getLookupQueryFilters("VwSysProcess");
								customListFilterGroup.addItem(businessProcessFilter);
								break;
							default:
								break;
						}
						var primaryDisplayColumnFilter = this.getPrimaryDisplayColumnFilter(
							loadCustomListConfig.primaryDisplayColumnName, searchQuery);
						customListFilterGroup.addItem(primaryDisplayColumnFilter);
						this.loadCustomList(loadCustomListConfig, list, customListFilterGroup);
					},

					/**
					 * ######### ############ ### ######## ############## ########## #######.
					 * @private
					 * @param {Object} addParam ############ ############### #########.
					 * @param {String} addParam.AdditionalParamSchemaName ######## #####.
					 * @param {String} addParam.AdditionalParamSchemaName ######## ######### #######.
					 * @param {String} addParam.AdditionalParamSchemaPDCName ######## ######### ### ########### #######.
					 * @return {Object} ############ ### ######## ############## ########## #######.
					 */
					getAdditionalParamLoadingConfig: function(addParam) {
						return {
							schemaName: addParam.AdditionalParamSchemaName,
							primaryColumnName: addParam.AdditionalParamSchemaPCName,
							primaryDisplayColumnName: addParam.AdditionalParamSchemaPDCName
						};
					},

					/**
					 * ######### ############ ### ######## ######## ########## #######.
					 * @private
					 * @param {Object} mainParam ############ ######### #########.
					 * @param {String} mainParam.SubjectSchemaName ######## #####.
					 * @param {String} mainParam.PrimaryColumnName ######## ######### #######.
					 * @param {String} mainParam.PrimaryDisplayColumnName ######## ######### ### ########### #######.
					 * @return {Object} ############ ### ######## ######## ########## #######.
					 */
					getMainParamLoadingConfig: function(mainParam) {
						return {
							schemaName: mainParam.SubjectSchemaName,
							primaryColumnName: mainParam.PrimaryColumnName,
							primaryDisplayColumnName: mainParam.PrimaryDisplayColumnName
						};
					},

					/**
					 * ########## ###### ## ######### ### ########### #######.
					 * @private
					 * @param {String} primaryDisplayColumnName ######## ######### ### ########### #######.
					 * @param {String} searchQuery ######## ### ##########.
					 * @return {Object} ###### ## ######### ### ########### #######.
					 */
					getPrimaryDisplayColumnFilter: function(primaryDisplayColumnName, searchQuery) {
						return Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.START_WITH, primaryDisplayColumnName, searchQuery);
					},

					/**
					 * @obsolete
					 */
					getEntitySchemaQuery: function() {
						this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
							"getEntitySchemaQuery", ""));
						var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "Macros"
						});
						Terrasoft.each(info, function(column) {
							if (column.columnPath && !entitySchemaQuery.columns.contains(column.columnPath)) {
								entitySchemaQuery.addColumn(column.columnPath, column.name);
							}
						}, this);
						return entitySchemaQuery;
					},

					setColumnValues: function(entity) {
						Terrasoft.each(entity.columns, function(column) {
							if (column.columnPath === "AdditionalParamValue") {
								var value = entity.get(column.columnPath);
								var values = value.split(";");
								if (values.length === 2) {
									value = {
										value: values[0],
										displayValue: values[1]
									};
								} else if (values.length === 3) {
									value = Terrasoft.deserialize(values[2]);
								}
								this.set("AdditionalParamValue", value);
							} else {
								if (action !== "copy" || !(column.columnPath === "Id" ||
									column.columnPath === "Name")) {
									this.set(column.columnPath, entity.get(column.columnPath));
								}
							}
						}, this);
					},

					/**
					 * ############# ####### ###### ############# ############ ## ######### ######## ######.
					 * @param {Boolean} value ##### ########.
					 */
					setCommandsLoaded: function(value) {
						this.set("CommandsLoaded", value);
					},
					clearControlsGroup: function(tag) {
						this.set("MainParamType", null);
						this.set("AdditionalParam", null);
						this.set("AdditionalParamValue", null);
						this.set("isAdditionalParamVisible", false);
						this.set("isAdditionalParamValueVisible", false);
						switch (tag) {
							case "command":
								this.set("MainParam", null);
								this.set("isMainParamVisible", false);
								break;
							case "mainParam":
								this.set("isMainParamTypeComboBoxVisible", false);
								this.set("isAdditionalParamLookupValueVisible", false);
								break;
							default:
								break;
						}
					},

					/**
					 * Loads database data into collection using filters.
					 * @private
					 * @param {Object} config Collection loading configuration.
					 * @param {String} config.schemaName Schema name.
					 * @param {String} config.primaryColumnName Primary column name.
					 * @param {String} config.primaryDisplayColumnName Primary display column name.
					 * @param {String} config.loadFolderList If folder list is loaded.
					 * @param {Object} list Collection.
					 * @param {Object} queryFilter Query filters.
					 */
					loadCustomList: function(config, list, queryFilter) {
						var schemaName = config.schemaName;
						var primaryColumnName = config.primaryColumnName;
						var primaryDisplayColumnName = config.primaryDisplayColumnName;
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: schemaName
						});
						esq.addColumn(primaryColumnName);
						esq.addColumn(primaryDisplayColumnName);
						var searchDataColumnName = "SearchData";
						var folderTypeColumnName = "FolderType";
						var loadFolderList = config.loadFolderList;
						if (loadFolderList) {
							esq.addColumn(searchDataColumnName);
							esq.addColumn(folderTypeColumnName);
						}
						esq.filters.add(queryFilter);
						esq.getEntityCollection(function(result) {
							var obj = {};
							var entities = result.collection;
							entities.each(function(entity) {
								var key = entity.get(primaryColumnName);
								var displayValue = entity.get(primaryDisplayColumnName);
								var item = {
									value: key,
									displayValue: displayValue
								};
								if (loadFolderList) {
									Ext.apply(item, {
										FolderType: entity.get(folderTypeColumnName),
										filter: entity.get(searchDataColumnName)
									});
								}
								obj[key] = item;
							});
							list.loadAll(obj);
						}, this);
					}
				},
				validationConfig: {
					Name: [
						function(value) {
							var invalidMessage = "";
							if (!value) {
								return {invalidMessage: invalidMessage};
							}
							var tempList = macrosList.filter(function(item, key) {
								return key.toLowerCase() === value.toLowerCase() && !(action === "edit" &&
									recordId === item);
							});
							if (tempList.getCount() > 0) {
								invalidMessage = resources.localizableStrings.MacrosAlredyExist;
							}
							return {invalidMessage: invalidMessage};
						}
					]
				}
			};
			return viewModel;
		}

		function loadMacrosList() {
			callServiceMethod("GetCommandList", function(response) {
				var responseArray = response.GetCommandListResult;
				if (responseArray) {
					for (var i = 0; i < responseArray.length; i++) {
						if (!macrosList.contains(responseArray[i].CommandCaption)) {
							macrosList.add(responseArray[i].CommandCaption, responseArray[i].RealId);
						}
					}
				}
			});
		}

		function initMainHeader() {
			viewModel.set("pageCaption", resources.localizableStrings.AddPageCaption);
			if (action === "edit") {
				viewModel.set("pageCaption", resources.localizableStrings.EditPageCaption);
			}
			var headerCaption = viewModel.get("pageCaption");
			sandbox.publish("ChangeHeaderCaption", {
				caption: headerCaption,
				dataViews: Ext.create("Terrasoft.Collection")
			});
			sandbox.subscribe("NeedHeaderCaption", function() {
				sandbox.publish("InitDataViews", {caption: headerCaption});
			}, viewModel);
		}

		function init() {
			var state = sandbox.publish("GetHistoryState");
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId === sandbox.id) {
				return;
			}
			commandList = new Terrasoft.Collection();
			mainParamList = new Terrasoft.Collection();
			additionalParamList = new Terrasoft.Collection();
			macrosList = new Terrasoft.Collection();
			allList = new Terrasoft.Collection();
			ajaxProvider = Terrasoft.AjaxProvider;
			callServiceMethod("GetFixedCommandList", function(response) {
				var responseArray = response.GetFixedCommandListResult;
				if (responseArray) {
					for (var i = 0; i < responseArray.length; i++) {
						allList.add(responseArray[i].Id, responseArray[i]);
						var commandId = responseArray[i].CommandId;
						var mainParamId = responseArray[i].MainParamId;
						var additionalParamId = responseArray[i].AdditionalParamId;
						additionalParamId =
							Terrasoft.isEmpty(additionalParamId) || additionalParamId === Terrasoft.GUID_EMPTY
								? null
								: additionalParamId;
						if (!commandList.contains(commandId)) {
							commandList.add(commandId, {
								CommandName: responseArray[i].CommandName,
								CommandCode: responseArray[i].CommandCode
							});
						}
						if (!mainParamList.contains(mainParamId)) {
							mainParamList.add(mainParamId, {
								MainParamName: responseArray[i].MainParamName,
								ColumnType: responseArray[i].ColumnTypeId,
								SubjectSchemaUId: responseArray[i].MainParamSubjectSchemaUId,
								SubjectSchemaName: responseArray[i].MainParamSubjectSchemaName,
								PrimaryColumnName: responseArray[i].MainParamSubjectSchemaPCName,
								PrimaryDisplayColumnName: responseArray[i].MainParamSubjectSchemaPDCName
							});
						}
						if (additionalParamId && !additionalParamList.contains(additionalParamId)) {
							additionalParamList.add(additionalParamId, {
								AdditionalParamName: responseArray[i].AdditionalParamName,
								AdditionalParamSchemaName: responseArray[i].AdditionalParamSchemaName,
								AdditionalParamSchemaPCName: responseArray[i].AdditionalParamSchemaPCName,
								AdditionalParamSchemaPDCName: responseArray[i].AdditionalParamSchemaPDCName
							});
						}
					}
					if (action === "edit" || action === "copy") {
						viewModel.loadEntity(recordId);
					}
					viewModel.setCommandsLoaded(true);
				}
			});
			loadMacrosList();
			var newState = Terrasoft.deepClone(currentState);
			newState.moduleId = sandbox.id;
			sandbox.publish("ReplaceHistoryState", {
				stateObj: newState,
				pageTitle: null,
				hash: currentHash.historyState,
				silent: true
			});
		}

		function render(renderTo) {
			var historyState = sandbox.publish("GetHistoryState");
			var hash = historyState.hash;
			action = hash.entityName || "add";
			recordId = hash.operationType || "";
			container = renderTo;
			var generatedViewConfig, view;
			if (viewModel) {
				generatedViewConfig = Terrasoft.deepClone(viewConfig);
				view = Ext.create("Terrasoft.Container", generatedViewConfig);
				view.bind(viewModel);
				view.render(renderTo);
				return;
			}
			viewConfig = createMainViewConfig();
			generatedViewConfig = Terrasoft.deepClone(viewConfig);
			view = Ext.create("Terrasoft.Container", generatedViewConfig);
			viewModel = Ext.create("Terrasoft.BaseViewModel", createViewModelConfig());
			view.bind(viewModel);
			view.render(renderTo);
			initMainHeader();
		}

		return {
			init: init,
			render: render
		};
	});


