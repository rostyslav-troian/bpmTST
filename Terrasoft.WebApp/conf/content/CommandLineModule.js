Terrasoft.configuration.Structures["CommandLineModule"] = {innerHierarchyStack: ["CommandLineModule"]};
define("CommandLineModule", ["CommandLineModuleResources", "StorageUtilities", "ProcessModuleUtilities",
		"performancecountermanager", "ConfigurationConstants", "TooltipUtilities", "ViewGeneratorV2",
		"GlobalSearchModule"],
		function(resources, storageUtilities, ProcessModuleUtilities, performanceCounterManager,
		ConfigurationConstants) {
	Ext.define("Terrasoft.configuration.CommandLineModuleViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.CommandLineModuleViewModel",
		mixins: {
			TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities"
		},

		//region Methods: Public

		/**
		 * Clears command line input data.
		 */
		clearData: function() {
			if (this.get("SaveQueryString")) {
				return;
			}
			this.set("selectedValue", "");
			this.set("selectedItem", null);
			this.set("commandInsertValue", null);
		},

		/**
		 * Value changed event handler.
		 * @param {Object} [item] Item.
		 * @param {String} [item.value] Item value.
		 */
		valueChanged: function(item) {
			if (Terrasoft.isEmptyObject(item) || !item.value) {
				return;
			}
			var value = item.value;
			var valuePart = value.substr(0, 4);
			if (valuePart === "comm" && this.$commands.contains(value)) {
				this.set("selectedItem", this.$commands.get(value));
				this.set("commandSelectionText", "");
			}
			if (valuePart === "hint" && this.$hintList.contains(value)) {
				this.set("commandSelectionText", "");
			}
		},

		/**
		 * Typed value changed event handler.
		 * @param {String} [item] Item.
		 */
		onChangeTypedValue: function(item) {
			this.set("commandSelectionText", "");
			var selectItem = this.get("selectedItem");
			this.set("selectedValue", null);
			if (item && selectItem) {
				if (item.toLowerCase().indexOf(selectItem.Caption.toLowerCase()) === -1) {
					this.set("selectedItem", null);
					selectItem = this.get("selectedItem");
				}
			}
			var filter = item;
			if (!selectItem) {
				var filteredCommandList = this.$commands.filter(
					function(item) {
						if (item.Caption.toLowerCase().indexOf(filter.toLowerCase().trim()) === 0 &&
								item.Caption.length === filter.length) {
							return true;
						}
					}
				);
				if (filteredCommandList.getCount() === 1) {
					selectItem = filteredCommandList.getByIndex(0);
					this.set("selectedItem", selectItem);
				}
			}
		},

		/**
		 * Loads command list from select item.
		 * @param {Object} selectItem Selected item.
		 * @param {String} selectItem.Id Selected item identifier.
		 * @param {String} selectItem.Caption Selected item caption.
		 * @param {Object} filter Filter.
		 */
		loadCommandListFromSelectItem: function(selectItem, filter) {
			var obj = {};
			obj["comm" + selectItem.Id] = {
				value: "comm" + selectItem.Id,
				displayValue: selectItem.Caption
			};
			var suggestString = "";
			var newSuggestion = selectItem.Caption;
			if (newSuggestion.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
				suggestString = newSuggestion.substring(filter.length, newSuggestion.length);
			}
			this.set("commandSelectionText", suggestString);
			this.get("commandList").clear();
			this.get("commandList").loadAll(obj);
		}

		//endregion

	});

	/**
	 * GlobalSearchConfigServiceUrl sys setting value.
	 * @type {String}
	 */
	var globalSearchConfigServiceUrl = "";

	/**
	 * GlobalSearchUrl sys setting value.
	 * @type {String}
	 */
	var globalSearchUrl = "";

	function createConstructor(context) {
		var topCount = 10;
		var Ext = context.Ext;
		var sandbox = context.sandbox;
		var Terrasoft = context.Terrasoft;

		/**
		 * Checks whether is default command item.
		 * @private
		 * @param {Object} item Command line list item.
		 * @param {String} item.Code Item code.
		 * @param {Number} item.HintType Hint type.
		 * @param {String} item.SubjectName Subject name.
		 * @param {String} schemaName Schema name.
		 * @return {Boolean}
		 */
		function getIsDefaultCommandItem(item, schemaName) {
			return (item.Code === "search" && item.HintType === ConfigurationConstants.CommandLineHintType.Command
				&& item.SubjectName === schemaName);
		}

		function getIsGlobalSearchEnabled() {
			return Terrasoft.Features.getIsEnabled("GlobalSearch") &&
					!Ext.isEmpty(globalSearchConfigServiceUrl) &&
					!Ext.isEmpty(globalSearchUrl);
		}

		/**
		 * Safe adds to list.
		 * @private
		 * @param {Terrasoft.Collection} list List for adding.
		 * @param {Terrasoft.Collection} tempList Temporary list.
		 */
		function safeAddToList(list, tempList) {
			if (!tempList.isEmpty()) {
				var keys = tempList.getKeys();
				var items = tempList.getItems();
				list.add(keys[0], items[0]);
			}
		}

		/**
		 * Gets default command list.
		 * @param {Terrasoft.Collection} commandList Command list.
		 * @param {String} currentSchemaName Current schema name.
		 * @return {Terrasoft.Collection}
		 */
		function getDefaultCList(commandList, currentSchemaName) {
			var list = new Terrasoft.Collection();
			var tempList = commandList.filter(function(item) {
				return getIsDefaultCommandItem(item, currentSchemaName);
			});
			safeAddToList(list, tempList);
			var isGlobalSearchEnabled = getIsGlobalSearchEnabled();
			if (currentSchemaName !== "Contact" && !isGlobalSearchEnabled) {
				tempList = commandList.filter(function(item) {
					return getIsDefaultCommandItem(item, "Contact");
				});
				safeAddToList(list, tempList);
			}
			if (currentSchemaName !== "Account" && !isGlobalSearchEnabled) {
				tempList = commandList.filter(function(item) {
					return getIsDefaultCommandItem(item, "Account");
				});
				safeAddToList(list, tempList);
			}
			return list;
		}

		/**
		 * Returns entity schema parameters, registered in Terrasoft.configuration.ModuleStructure.
		 * @param {String} entitySchemaName Entity schema name.
		 * @return {Object|null} Entity schema parameters, registered in Terrasoft.configuration.ModuleStructure.
		 */
		function tryGetModule(entitySchemaName) {
			var result = null;
			var key = entitySchemaName === "SocialMessage" ? "ESNFeed" : entitySchemaName;
			Terrasoft.each(Terrasoft.configuration.ModuleStructure, function(item) {
				if (item && item.entitySchemaName && item.entitySchemaName === key) {
					result = item;
				}
			}, this);
			return result;
		}

		/**
		 * Returns entity schema section or page url.
		 * @param {String} entitySchemaName Entity schema name.
		 * @param {String} urlType Url type. Can be set as "section" or "card".
		 * @param {String} columnTypeCode Entity type parameter. Can be set as page shema name or type id.
		 * @param {String} mode Page mode.
		 * @return {String} Url.
		 */
		function tryGetUrl(entitySchemaName, urlType, columnTypeCode, mode) {
			var url = "";
			switch (urlType) {
				case "section":
					url = getSectionUrl({entitySchemaName: entitySchemaName});
					break;
				case "card":
					url = getCardUrl({
						entitySchemaName: entitySchemaName,
						cardType: columnTypeCode,
						mode: mode
					});
					break;
				default :
					break;
			}
			return url;
		}

		/**
		 * Returns entity schema page url.
		 * @param {Object} config Config with parameters for url creation.
		 * @param {String} config.entitySchemaName Entity schema name.
		 * @param {String} config.cardType Entity type parameter. Can be set as page shema name or type id.
		 * @param {String} config.mode Page mode.
		 * @return {String} Page url.
		 */
		function getCardUrl(config) {
			var module = tryGetModule(config.entitySchemaName);
			if (module.cardSchema) {
				var cardSchemaParams = getCardSchemaParams(config, module);
				var cardSchemaName = cardSchemaParams.cardSchema || module.cardSchema;
				var url = Ext.String.format("{0}/{1}/{2}", module.cardModule, cardSchemaName, config.mode);
				var cardType = config.cardType;
				if (cardType && cardType === cardSchemaParams.name) {
					url += Ext.String.format("/{0}/{1}", cardType, cardSchemaParams.UId);
				}
				return url;
			} else {
				return getSectionUrl(config);
			}
		}

		/**
		 * Returns page parameters, registered in Terrasoft.configuration.ModuleStructure.
		 * @param {Object} config Search config.
		 * @param {String} config.cardType Entity type parameter. Can be set as page shema name or type id.
		 * @param {Object} module Entity schema parameters, registered in Terrasoft.configuration.ModuleStructure.
		 * @return {Object} Page parameters.
		 */
		function getCardSchemaParams(config, module) {
			var attribute = module.attribute;
			var cardType = config.cardType;
			if (cardType && attribute) {
				var pages = module.pages;
				for (var i = 0; i < pages.length; i++) {
					var page = pages[i];
					if (page.name === cardType || page.UId === cardType) {
						return page;
					}
				}
			}
			return module;
		}

		/**
		 * Returns entity schema section url.
		 * @param {Object} config Config with parameters for url creation.
		 * @param {String} config.entitySchemaName Entity schema name.
		 * @return {String} Section url.
		 */
		function getSectionUrl(config) {
			var module = tryGetModule(config.entitySchemaName);
			var url = module.sectionModule + "/";
			if (module.sectionSchema) {
				url += module.sectionSchema + "/";
			}
			return url;
		}

		/**
		 * Returns configuration to open the page.
		 * @param {String} schemaName Schema name.
		 * @param {Object} config Information about the object, which page will be opened.
		 * @return {Terrasoft.BaseViewModel}
		 */
		function getOpenCardConfig(schemaName, config) {
			var moduleStructure = Terrasoft.configuration.ModuleStructure[schemaName];
			var values = {
				TypeColumnName: "",
				TypeColumnValue: Terrasoft.GUID_EMPTY,
				EditPageName: moduleStructure.cardSchema
			};
			var attribute = moduleStructure.attribute;
			var columnTypeCode = config.columnTypeCode;
			if (columnTypeCode && attribute) {
				var pages = moduleStructure.pages;
				Terrasoft.each(pages, function(page) {
					if (page.name === columnTypeCode) {
						if (page.cardSchema) {
							values.EditPageName = page.cardSchema;
						}
						values.TypeColumnName = attribute;
						values.TypeColumnValue = page.UId;
						return false;
					}
				}, this);
			}
			var primaryDisplayColumnValue = config.value;
			var primaryDisplayColumnName = config.columnName;
			if (primaryDisplayColumnName && primaryDisplayColumnValue) {
				values.PrimaryDisplayColumnName = primaryDisplayColumnName;
				values.PrimaryDisplayColumnValue = primaryDisplayColumnValue;
			}
			return Ext.create("Terrasoft.BaseViewModel", {values: values});
		}

		/**
		 * Execute selected command.
		 * @param {String} command Command name.
		 * @param {String} mainParam Main command parameter.
		 * @param {Object} addParam Additional command parameter.
		 * @param {Object} Function context.
		 */
		function executeCommand(command, mainParam, addParam, scope) {
			switch (command) {
				case "goto":
					executeGoToCommand({
						mainParam: mainParam,
						addParam: addParam
					});
					break;
				case "search":
					executeSearchCommand({
						mainParam: mainParam,
						addParam: addParam
					});
					break;
				case "globalSearch":
					executeGlobalSearchCommand({
						mainParam: mainParam,
						addParam: addParam
					}, scope);
					break;
				case "create":
					executeCreateCommand({
						mainParam: mainParam,
						addParam: addParam
					});
					break;
				case "startbp":
					if (addParam.value && addParam.valueId) {
						executeProcess(addParam.valueId);
					}
					break;
				default:
					break;
			}
		}

		/**
		 * Returns section session filters key.
		 * @param  {String} entityName Section entity name.
		 * @return {String} Section session filters key.
		 */
		function getSectionSessionFiltersKey(entityName) {
			var sessionFiltersKey = entityName + "SectionV2";
			var moduleStructure = Terrasoft.configuration.ModuleStructure[entityName];
			if (moduleStructure && moduleStructure.sectionSchema) {
				sessionFiltersKey = moduleStructure.sectionSchema;
			}
			return sessionFiltersKey;
		}

		/**
		 * Execute navigate to entity command.
		 * @param {Object} config Config for url creation.
		 * @param {String} config.mainParam Entity name.
		 * @param {Object} config.addParam Config for navigate command.
		 */
		function executeGoToCommand(config) {
			var mainParam = config.mainParam;
			var addParam = config.addParam;
			var newState, state, currentState, filterState;
			var url = tryGetUrl(mainParam, "section");
			if (addParam.value && addParam.valueId) {
				var filtersStorage = Terrasoft.configuration.Storage.Filters =
					Terrasoft.configuration.Storage.Filters || {};
				var sessionFiltersKey = getSectionSessionFiltersKey(mainParam);
				var sessionStorageFilters = filtersStorage[sessionFiltersKey] =
					filtersStorage[sessionFiltersKey] || {};
				var filter = Terrasoft.deserialize(addParam.value);
				sessionStorageFilters.FolderFilters = [filter];
				state = sandbox.publish("GetHistoryState");
				currentState = state.state || {};
				newState = Terrasoft.deepClone(currentState);
				newState.filterState = filterState;
				sandbox.publish("PushHistoryState", {
					hash: url,
					stateObj: newState
				});
			} else {
				sandbox.publish("PushHistoryState", {hash: url});
			}
		}

		function executeGlobalSearchCommand(config, scope) {
			var query = config.addParam.value;
			var searchModuleId = Ext.String.format("{0}_GlobalSearch", sandbox.id);
			var searchModuleHash = "GlobalSearchModule/GlobalSearchResultPage";
			var searchParams = {
				query: query
			};
			Ext.apply(searchParams, getAdditionalSearchParams(searchModuleHash));
			var stateObj = {
				SearchParams: searchParams,
				moduleId: searchModuleId
			};
			sandbox.publish("PushHistoryState", {
				hash: searchModuleHash,
				stateObj: stateObj
			});
			if (scope) {
				scope.set("SaveQueryString", true);
			}
		}

		/**
		 * Returns additional search params.
		 * @private
		 * @param {String} moduleHash Module hash.
		 * @return {Object} Additional search params.
		 */
		function getAdditionalSearchParams(moduleHash) {
			var historyState = sandbox.publish("GetHistoryState");
			var historyStateHash = historyState && historyState.hash;
			var currentHash = Ext.isObject(historyStateHash) ? historyStateHash.historyState : historyStateHash;
			var moduleIsLoaded = currentHash === moduleHash;
			if (moduleIsLoaded) {
				return getModuleLoadedSearchParams(historyState);
			} else {
				return getModuleNotLoadedSearchParams(historyState);
			}
		}

		/**
		 * Returns not loaded module search params.
		 * @private
		 * @param {Object} historyState History state.
		 * @return {Object} Not loaded module search params.
		 */
		function getModuleNotLoadedSearchParams(historyState) {
			return {
				sectionEntityName: getCurrentEntityName(historyState),
				currentPage: historyState && historyState.hash &&
					(historyState.hash.entityName || historyState.hash.moduleName)
			};
		}

		/**
		 * Returns loaded module search params.
		 * @private
		 * @param {Object} historyState History state.
		 * @return {Object} Loaded module search params.
		 */
		function getModuleLoadedSearchParams(historyState) {
			var state = historyState.state;
			var searchParams = state && state.SearchParams;
			var stateSchemaName = state && state.schemaName;
			return {
				sectionEntityName: (searchParams && searchParams.sectionEntityName) ||
					Terrasoft.ModuleUtils.getEntityNameBySchemaName(stateSchemaName),
				currentPage: (searchParams && searchParams.currentPage) || stateSchemaName
			};
		}

		/**
		 * Returns current entity name.
		 * @private
		 * @param {Object} historyState History state.
		 * @return {String} Current entity name.
		 */
		function getCurrentEntityName(historyState) {
			var hashEntityName = historyState && historyState.hash && historyState.hash.entityName;
			return Terrasoft.ModuleUtils.getEntityNameBySchemaName(hashEntityName);
		}

		/**
		 * Execute search entity command.
		 * @param {Object} config Config for url creation.
		 * @param {String} config.mainParam Entity name.
		 * @param {Object} config.addParam Config for search command.
		 */
		function executeSearchCommand(config) {
			var mainParam = config.mainParam;
			var addParam = config.addParam;
			var newState, state, currentState, filterState, url;
			if (addParam.valueId) {
				var typeId = addParam.typeId;
				url = tryGetUrl(mainParam, "card", typeId, "edit") + "/" + addParam.valueId;
				sandbox.publish("PushHistoryState", {hash: url});
			} else if (addParam.value) {
				url = tryGetUrl(mainParam, "section");
				filterState = {};
				filterState.ignoreFixedFilters = true;
				filterState.ignoreFolderFilters = true;
				filterState.customFilterState = {};
				filterState.customFilterState[addParam.columnName] = {
					value: addParam.value,
					displayValue: addParam.value
				};
				state = sandbox.publish("GetHistoryState");
				currentState = state.state || {};
				newState = Terrasoft.deepClone(currentState);
				newState.activeTab = "mainView";
				newState.filterState = filterState;
				newState.searchState = true;
				newState.moduleId = "ViewModule_SectionModule";
				var tryFilterCurrentSection = sandbox.publish("FilterCurrentSection", {
					value: addParam.value,
					displayValue: addParam.value,
					schemaName: addParam.noSchema ? "" : mainParam
				});
				if (!tryFilterCurrentSection) {
					var storage = Terrasoft.configuration.Storage.Filters =
						Terrasoft.configuration.Storage.Filters || {};
					var sessionFiltersKey = getSectionSessionFiltersKey(mainParam);
					var sessionFilters = storage[sessionFiltersKey] = storage[sessionFiltersKey] || {};
					sessionFilters.CustomFilters = {
						value: addParam.value,
						displayValue: addParam.value,
						primaryDisplayColumn: true
					};
					sandbox.publish("PushHistoryState", {
						hash: url,
						stateObj: newState
					});
				}
			} else {
				url = tryGetUrl(mainParam, "section");
				sandbox.publish("PushHistoryState", {hash: url});
			}
		}

		/**
		 * Execute create entity command.
		 * @param {Object} config Config for url creation.
		 * @param {String} config.mainParam Entity name.
		 * @param {Object} config.addParam Config for create command.
		 */
		function executeCreateCommand(config) {
			var mainParam = config.mainParam;
			var addParam = config.addParam;
			var newState, state, currentState;
			if (mainParam === "Macros") {
				var url = "MacrosPageModule";
				state = sandbox.publish("GetHistoryState");
				currentState = state.state || {};
				newState = Terrasoft.deepClone(currentState);
				var defaultValues = {};
				if (addParam.columnName) {
					defaultValues[addParam.columnName] = addParam.value;
				}
				newState.defaultValues = defaultValues;
				var obj = {
					hash: url,
					stateObj: newState
				};
				sandbox.publish("PushHistoryState", obj);
			} else {
				var addCardConfig = getOpenCardConfig(mainParam, addParam);
				addCardConfig.set("Tag", sandbox.id);
				addCardConfig.set("EntitySchemaName", mainParam);
				require(["SysModuleEditManageModule"], function(module) {
					if (module) {
						module.Run({
							sandbox: sandbox,
							item: addCardConfig
						});
					}
				});
			}
		}

		/**
		 * Returns tip view.
		 * @param {Object} config Configuration to generatate tip view.
		 * @return {Object}
		 */
		function generateTip(config) {
			var viewGenerator = Ext.create("Terrasoft.ViewGenerator");
			var tip = viewGenerator.generatePartial(Ext.merge({
				itemType: Terrasoft.ViewItemType.TIP
			}, config), {
				schemaName: "CommandLineModule",
				schema: {},
				viewModelClass: Ext.ClassManager.get("Terrasoft.CommandLineModuleViewModel")
			})[0];
			return tip;
		}

		/**
		 * Creates view configuration.
		 * @return {Terrasoft.Container}
		 */
		function createViewConfig() {
			var commandLineTip = generateTip({
				content: resources.localizableStrings.CommandLineTip,
				className: "Terrasoft.ContextTip",
				contextIdList: ["0", "IntroPage"],
				behaviour: {
					displayEvent: Terrasoft.controls.TipEnums.displayEvent.NONE
				}
			});
			return {
				className: "Terrasoft.Container",
				id: "commandLineContainer",
				selectors: {
					el: "#commandLineContainer",
					wrapEl: "#commandLineContainer"
				},
				items: [
					{
						className: "Terrasoft.CommandLine",
						bigSize: true,
						placeholder: resources.localizableStrings.WhatCanIDoForYou,
						value: {bindTo: "selectedValue"},
						list: {bindTo: "commandList"},
						typedValueChanged: {bindTo: "getCommandList"},
						changeTypedValue: {bindTo: "onChangeTypedValue"},
						typedValue: {bindTo: "commandInsertValue"},
						selectionText: {bindTo: "commandSelectionText"},
						commandLineExecute: {bindTo: "executeCommand"},
						focus: {bindTo: "initCommandList"},
						change: {bindTo: "valueChanged"},
						markerValue: "command-line",
						minSearchCharsCount: 3,
						searchDelay: 350,
						width: "100%",
						tips: [
							{
								tip: {
									content: resources.localizableStrings.GoButtonHint,
									markerValue: resources.localizableStrings.GoButtonHint,
									style: Terrasoft.controls.TipEnums.style.GREEN,
									displayMode: Terrasoft.controls.TipEnums.displayMode.NARROW
								},
								settings: {
									displayEvent: Terrasoft.controls.TipEnums.displayEvent.HOVER,
									alignEl: "rightIconWrapperEl"
								}
							},
							commandLineTip
						]
					}
				]
			};
		}

		/**
		 * Creates view model.
		 * @return {Terrasoft.CommandLineModuleViewModel}
		 */
		function createViewModel() {
			var historyState = sandbox.publish("GetHistoryState");
			var state = historyState && historyState.state;
			var searchParams = state && state.SearchParams;
			var selectedValue = (searchParams && searchParams.query) ? { displayValue: searchParams.query } : null;
			var viewModel = Ext.create("Terrasoft.CommandLineModuleViewModel", {
				values: {
					selectedValue: selectedValue,
					commandInsertValue: null,
					commandSelectionText: "",
					selectedItem: null,
					commandList: new Terrasoft.Collection(),
					hintList: new Terrasoft.Collection(),
					commands: new Terrasoft.Collection(),
					commandsCollection: new Terrasoft.Collection(),
					mainParamCollection: new Terrasoft.Collection()
				}
			});
			return viewModel;
		}

		function callServiceMethod(ajaxProvider, methodName, callback, dataSend) {
			var data = dataSend || {};
			var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/CommandLineService/" + methodName;
			ajaxProvider = ajaxProvider || Terrasoft.AjaxProvider;
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

		function executeProcess(processName) {
			ProcessModuleUtilities.executeProcess({
				sysProcessName: processName
			});
		}

		function init() {
			Terrasoft.SysSettings.querySysSetting(["GlobalSearchConfigServiceUrl", "GlobalSearchUrl"],
				function(values) {
					if (values) {
						globalSearchConfigServiceUrl = values.GlobalSearchConfigServiceUrl;
						globalSearchUrl = values.GlobalSearchUrl;
					}
				}, this);
		}

		/**
		 * Inits list of command.
		 * @protected
 		 * @param {Object} scope Call context
		 */
		function initCommandList(scope) {
			var commandList = scope.$commands = new Terrasoft.Collection();
			var commandsCollection = scope.$commandsCollection = new Terrasoft.Collection();
			var mainParamCollection = scope.$mainParamCollection = new Terrasoft.Collection();
			var ajaxProvider = Terrasoft.AjaxProvider;
			var serviceCallback = function(response) {
				if (!instance || instance.isDestroyed) {
					return;
				}
				var list = commandList;
				var listCommands = commandsCollection;
				var listMainParam = mainParamCollection;
				var responseArray = response.GetCommandListResult;
				if (responseArray) {
					responseArray.forEach(function(item) {
						list.add("comm" + item.Id, item);
						if (item.HintType === ConfigurationConstants.CommandLineHintType.Command
								|| item.HintType === ConfigurationConstants.CommandLineHintType.Synonym) {
							var command = item.CommandCaption;
							var mainParam = item.MainParamCaption;
							if (!listCommands.contains(command)) {
								listCommands.add(command, {
									Code: item.Code,
									Synonym: item.HintType === ConfigurationConstants.CommandLineHintType.Synonym
								});
							}
							if (!listMainParam.contains(mainParam)) {
								listMainParam.add(mainParam, {
									SubjectName: item.SubjectName,
									ColumnName: item.ColumnName,
									ColumnTypeCode: item.ColumnTypeCode
								});
							}
						}
					});
				}
				loadAdditionalMacrosParamValues(scope.$commands);
			};
			var keyGenerator = function(ajaxProvider, methodName) {
				return {
					groupName: "CommandLineStorage",
					valueKey: methodName
				};
			};
			var requestFunction = function(callback, ajaxProvider, methodName, dataSend) {
				callServiceMethod(ajaxProvider, methodName, callback, dataSend);
			};
			storageUtilities.workRequestWithStorage(keyGenerator, requestFunction, serviceCallback, this, ajaxProvider,
				"GetCommandList", serviceCallback);
		}

		function loadAdditionalMacrosParamValues(commandList) {
			if (commandList && !commandList.isEmpty()) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					"rootSchemaName": "Macros",
					"clientESQCacheParameters": {"cacheItemName": "Macros_AdditionalMacrosParamValues"}
				});
				esq.addColumn("Id");
				esq.addColumn("AdditionalParamValue");
				esq.getEntityCollection(function(response) {
					if (response && response.success) {
						enrichCommandList(response.collection, commandList);
					}
				}, this);
			}
		}

		function enrichCommandList(macrosList, commandList) {
			commandList.each(function(command) {
				var macrosId = command.Id;
				var item = macrosList.find(macrosId);
				command.AdditionalParamValue = item && item.get("AdditionalParamValue") || "";
			}, this);
		}

		function getViewModel() {
			var ajaxProvider = this.$ajaxProvider;
			var commandList = this.$commands;
			var commandsCollection = this.$commandsCollection;
			var mainParamCollection = this.$mainParamCollection;
			var hintList = this.$hintList;
			var currentSchemaName = sandbox.publish("GetSectionSchemaName");
			if (!currentSchemaName) {
				currentSchemaName = sandbox.publish("GetCardSchemaName");
			}
			var viewModel = createViewModel();
			sandbox.subscribe("SetCommandLineValue", function(value) {
				if (Ext.isEmpty(value)) {
					viewModel.set("SaveQueryString", false);
					viewModel.clearData();
					return;
				}
				viewModel.set("selectedValue", {displayValue: value});
			});
			viewModel.schemaName = currentSchemaName;
			viewModel.getCommandList = function(filter) {
				var filteredCommandListByCaption = function(caption) {
					var canBeCommand = !this.$commandsCollection.filter(function(item, key) {
						return (key.toLowerCase().indexOf(caption.toLowerCase()) === 0) && !item.Synonym;
					}).isEmpty();
					var canBeMainParam = !this.$mainParamCollection.filter(function(item, key) {
						return key.toLowerCase().indexOf(filter.toLowerCase()) === 0;
					}).isEmpty();
					var needSynonyms = !(canBeCommand || canBeMainParam);
					var filteredList = this.$commands.filter(function(item) {
						if (item.Caption.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
							if (item.HintType === ConfigurationConstants.CommandLineHintType.Macros ||
								item.HintType === ConfigurationConstants.CommandLineHintType.Command) {
								return true;
							}
							if (item.HintType === ConfigurationConstants.CommandLineHintType.Synonym && needSynonyms) {
								return true;
							}
						}
						return false;
					});
					filteredList.sort("MainParamCaption", Terrasoft.OrderDirection.ASC);
					filteredList.sort(null, null, function(obj1) {
						if (obj1.SubjectName === schemaName) {
							return -1;
						} else {
							return 1;
						}
					});
					var newCaption = "";
					if (filteredList.isEmpty()) {
						filteredList = getDefaultCList(this.$commands, currentSchemaName);
						newCaption = filter;
					}
					filteredList.each(function(item, index) {
						if (index > topCount) {
							return false;
						}
						obj["comm" + item.Id] = {
							value: "comm" + item.Id,
							displayValue: newCaption ? item.Caption + " " + newCaption : item.Caption
						};
					});
					suggestString = "";
					if (!filteredList.isEmpty()) {
						newSuggestion = filteredList.getByIndex(0).Caption;
						if (newSuggestion.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
							suggestString = newSuggestion.substring(filter.length, newSuggestion.length);
						}
					}
					this.set("commandSelectionText", suggestString);
					this.get("commandList").clear();
					this.get("commandList").loadAll(obj);
				}.bind(this);
				var list = this.get("commandList");
				list.clear();
				var lastRequest, suggestString, newSuggestion;
				if (!filter) {
					return;
				}
				var obj = {};
				var selectItem = this.get("selectedItem");
				var schemaName = this.schemaName;
				if (!selectItem) {
					filteredCommandListByCaption(filter);
				} else {
					this.$hintList.clear();
					var viewModel = this;
					var hintText = (filter.substr(selectItem.Caption.length, filter.length - 1)).trim();
					var subjectName = "";
					var hideHint = selectItem.Code === "create" || !Ext.isEmpty(selectItem.AdditionalParamValue);
					if (selectItem.Code === "goto") {
						subjectName = selectItem.SubjectName + "Folder";
					} else if (selectItem.Code === "run") {
						subjectName = "runnableHint";
					} else {
						subjectName = selectItem.SubjectName;
					}
					if (!hideHint) {
						if (lastRequest) {
							ajaxProvider.abort(lastRequest);
						}
						lastRequest = callServiceMethod(ajaxProvider, "GetHintList", function(response) {
							if (!instance || instance.isDestroyed) {
								return;
							}
							var boxList = list;
							var hints = viewModel.$hintList;
							var hintArray = response.GetHintListResult;
							if (Ext.isEmpty(hintArray)) {
								viewModel.loadCommandListFromSelectItem(selectItem, filter);
								return;
							}
							obj[selectItem.Id] = {
								"value": selectItem.Id,
								"displayValue": selectItem.Caption
							};
							for (var i = 0; i < hintArray.length && i <= topCount; i++) {
								var uniqueKey = Terrasoft.generateGUID();
								var displayValue = selectItem.Caption + " " + hintArray[i].Key;
								var value = Terrasoft.deepClone(selectItem);
								value.AdditionalParamValue = hintArray[i].Key;
								var additionalParamValueId = hintArray[i].Value;
								try {
									var params = Terrasoft.deserialize(additionalParamValueId);
									value.AdditionalParamValueId = params.value;
									value.TypeId = params.typeId;
									value.SectionFilter = params.sectionFilter;
								} catch (e) {
									value.AdditionalParamValueId = additionalParamValueId;
								}
								hints.add("hint" + uniqueKey, value);
								obj["hint" + uniqueKey] = {
									value: "hint" + uniqueKey,
									displayValue: displayValue
								};
							}
							suggestString = "";
							if (hintArray.length > 0) {
								newSuggestion = selectItem.Caption + " " + hintArray[0].Key;
								if (newSuggestion.toLowerCase().indexOf(filter.toLowerCase()) === 0) {
									suggestString = newSuggestion.substring(filter.length, newSuggestion.length);
								}
							}
							var commandInsertValue = viewModel.get("commandInsertValue");
							if (commandInsertValue !== selectItem.Caption) {
								viewModel.set("commandSelectionText", suggestString);
							}
							boxList.clear();
							boxList.loadAll(obj);
						}, {"subjectName": subjectName, "hintText": hintText});
					} else {
						if (selectItem) {
							viewModel.loadCommandListFromSelectItem(selectItem, filter);
						}
					}
				}
			};
			viewModel.initCommandList = function() {
				if (this.$commands.isEmpty()) {
					initCommandList(this);
				}
			}
			viewModel.executeCommand = function(input) {
				this.set("SaveQueryString", false);
				if (!input) {
					return;
				}
				var suggestion = this.get("commandSelectionText");
				if (suggestion) {
					input += suggestion;
				}
				var inputArray = input.split(" ");
				var command, mainParam, valueId, columnName, tempList, subjectName, columnTypeCode, macros;
				var i = 0;
				var additionValue = "";
				var macrosText = "";
				var predicateFilterEntry = function(item) {
					return item.Caption.toLowerCase().indexOf(macrosText.toLowerCase()) === 0;
				};
				var predicateFilterMatch = function(item) {
					return item.Caption.toLowerCase() === macrosText.toLowerCase();
				};
				while (i < inputArray.length) {
					while (!macros && inputArray.length > i) {
						macrosText += " " + inputArray[i++];
						macrosText = macrosText.trim();
						tempList = this.$commands.filter(predicateFilterEntry);
						if (tempList.getCount() === 1) {
							var selectedItem = tempList.getByIndex(0);
							if (selectedItem.Caption.toLowerCase() === macrosText.toLowerCase()) {
								macros = tempList.getByIndex(0);
							}
						}
					}
					while (inputArray.length > i) {
						additionValue += inputArray[i++] + " ";
					}
					additionValue = additionValue.trim();
					if (!macros && inputArray.length === i && !tempList.isEmpty()) {
						tempList = this.$commands.filter(predicateFilterMatch);
						if (tempList.getCount() === 1) {
							macros = tempList.getByIndex(0);
						}
					}
				}
				if (macros) {
					columnName = macros.ColumnName;
					columnTypeCode = macros.ColumnTypeCode;
					command = macros.Code;
					mainParam = macros.SubjectName;
					var addValue;
					if (macros.HintType === ConfigurationConstants.CommandLineHintType.Macros &&
						macros.AdditionalParamValue) {
						switch (command) {
							case "search":
							case "goto":
								addValue = macros.AdditionalParamValue.split(";");
								valueId = addValue[0];
								additionValue = addValue[2] || addValue[1];
								break;
							case "startbp":
								addValue = macros.AdditionalParamValue.split(";");
								valueId = addValue[0];
								additionValue = addValue[1];
								var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
									rootSchemaName: "VwSysProcess"
								});
								esq.addColumn("Id", "Id");
								esq.addColumn("Name", "Name");
								esq.filters.add("recordId", Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Id", valueId));
								esq.getEntityCollection(function(result) {
									if (instance.isDestroyed) {
										return;
									}
									if (!result.collection.isEmpty()) {
										var entities = result.collection.getItems();
										valueId = entities[0].values.Name;
										executeCommand(command, macros.SubjectName, {
											value: additionValue,
											valueId: valueId,
											columnName: columnName,
											columnTypeCode: columnTypeCode
										});
									}
								}, this);
								return;
							default:
								additionValue = macros.AdditionalParamValue;
								break;
						}
					} else if (additionValue && command !== "create") {
						tempList = this.$hintList.filter(function(item) {
							return additionValue === item.AdditionalParamValue;
						});
						if (tempList.getCount() === 1) {
							var item = tempList.getByIndex(0);
							valueId = item.AdditionalParamValueId;
							var typeId = item.TypeId;
							executeCommand(command, mainParam, {
								value: item.SectionFilter || additionValue,
								valueId: valueId,
								columnName: columnName,
								columnTypeCode: columnTypeCode,
								typeId: typeId
							});
							this.clearData();
							return;
						} else {
							subjectName = macros.SubjectName;
							if (command === "goto") {
								subjectName = subjectName + "Folder";
							}
							var viewModel = this;
							callServiceMethod(ajaxProvider, "GetHintList", function(response) {
								if (!instance || instance.isDestroyed) {
									return;
								}
								var hintArray = response.GetHintListResult;
								var config = {
									value: additionValue,
									columnName: columnName,
									columnTypeCode: columnTypeCode
								};
								if (hintArray.length === 1) {
									var value = hintArray[0].Value;
									try {
										var params = Terrasoft.deserialize(value);
										config.valueId = params.value;
										config.typeId = params.typeId;
									} catch (e) {
										config.valueId = value;
									}
								}
								executeCommand(command, mainParam, config);
								viewModel.clearData();
							}, {
								"subjectName": subjectName,
								"hintText": additionValue
							});
							return;
						}
					}
					executeCommand(command, mainParam, {
						value: additionValue,
						valueId: valueId,
						columnName: columnName,
						columnTypeCode: columnTypeCode
					});
				} else {
					var searchSchemaName = "Contact";
					var searchColumnName = "Name";
					if (currentSchemaName) {
						var tempCommandList = this.$commands.filter(function(item) {
							return (item.SubjectName === currentSchemaName);
						});
						if (!tempCommandList.isEmpty()) {
							searchSchemaName = currentSchemaName;
							searchColumnName = tempCommandList.getByIndex(0).ColumnName;
						}
					}
					var isGlobalSearch = getIsGlobalSearchEnabled();
					var commandName = isGlobalSearch ? "globalSearch" : "search";
					executeCommand(commandName, searchSchemaName, {
						value: input.trim(),
						valueId: "",
						columnName: searchColumnName,
						columnTypeCode: "",
						noSchema: true
					}, this);
				}
				this.clearData();
			};
			return viewModel;
		}

		function render(renderTo) {
			var container = this.renderTo = renderTo;
			if (!container.dom) {
				return;
			}
			var viewModel = this.getViewModel();
			var viewConfig = createViewConfig();
			var view = Ext.create(viewConfig.className || "Terrasoft.Container", viewConfig);
			view.render(container);
			view.bind(viewModel);
			performanceCounterManager.setTimeStamp("loadAdditionalModulesComplete");
		}

		var instance = Ext.define("CommandLineModule", {
			init: init,
			render: render,
			getViewModel: getViewModel
		});
		return instance;
	}

	return createConstructor;
});


