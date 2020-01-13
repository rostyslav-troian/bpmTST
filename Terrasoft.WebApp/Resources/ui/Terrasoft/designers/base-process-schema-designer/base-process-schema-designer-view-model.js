/**
 */
Ext.define("Terrasoft.Designers.BaseProcessSchemaDesignerViewModel", {
	extend: "Terrasoft.model.BaseViewModel",
	alternateClassName: "Terrasoft.BaseProcessSchemaDesignerViewModel",

	mixins: {
		BaseSchemaDesignerStorageMixin: "Terrasoft.BaseSchemaDesignerStorageMixin",
		BaseProcessSchemaDesignerValidationMixin: "Terrasoft.BaseProcessSchemaDesignerValidationMixin"
	},

	//region Properties: Private

	/**
	 * Flags to prevent save unsaved data to local storage.
	 * @private
	 * @type {Boolean}
	 */
	preventSaveToStorage: false,

	//endregion

	//region Properties: Protected

	/**
	 * Designer instance identifier.
	 * @protected
	 * @type {String}
	 */
	id: null,

	/**
	 * Designer execution sandbox.
	 * @protected
	 * @type {Object}
	 */
	sandbox: null,

	/**
	 * The container identifier to download the module edit process item properties.
	 * @protected
	 * @type {String}
	 */
	propertiesContainerId: null,

	/**
	 * Context help code.
	 * @protected
	 * @type {String}
	 */
	contextHelpCode: null,

	/**
	 * Local storage property name for process schema identifier.
	 * @protected
	 * @type {String}
	 */
	storageLocationHref: null,

	/**
	 * Local storage property name for process schema metadata.
	 * @protected
	 * @type {String}
	 */
	storageSchemaMetadata: null,

	/**
	 * Local storage property name for process schema resources.
	 * @protected
	 * @type {String}
	 */
	storageSchemaResources: null,

	/**
	 * Local storage property name for selected item name.
	 * @protected
	 * @type {String}
	 */
	storageLoadedPropertiesItemName: null,

	/**
	 * SchemaManager.
	 * @abstract
	 * @protected
	 * @type {Terrasoft.manager.BaseSchemaManager}
	 */
	schemaManager: null,

	/**
	 * URL prefix after hash.
	 * @protected
	 * @type {String}
	 */
	urlHashPrefix: "case",

	/**
	 * Schema package UId before it has been changed from process schema properties page.
	 * @protected
	 * @type {String}
	 */
	initialSchemaPackageUId: null,

	//endregion

	//region Properties: Public

	/**
	 * @inheritdoc Terrasoft.model.BaseModel#columns
	 */
	columns: {
		/**
		 * A collection of diagram elements.
		 */
		Items: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.COLLECTION
		},
		/**
		 * The process identifier is being edited in the designer.
		 */
		SchemaUId: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.GUID
		},
		/**
		 * The Package identifier.
		 */
		PackageUId: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.GUID
		},
		/**
		 * Schema.
		 */
		Schema: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
		},
		/**
		 * Schema manager item.
		 */
		SchemaManagerItem: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
		},
		/**
		 * Schema caption.
		 */
		SchemaCaption: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			name: "SchemaCaption",
			caption: Terrasoft.Resources.SchemaDesigner.ProcessCaptionColumnCaption,
			isRequired: true,
			size: 250
		},
		/**
		 * Name of the loaded item page in the properties pane.
		 */
		LoadedPropertiesItemName: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING,
			value: null
		},
		/**
		 * The module name is an editable properties of the process element.
		 */
		PropertiesEditModule: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING
		},
		/**
		 * ID of the last clicked process element.
		 */
		LastSelectedItemUId: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING,
			value: null
		},
		/**
		 * Indicates whether process schema is changed.
		 */
		IsSchemaChanged: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Indicates whether LoadStoragePanel is visible.
		 */
		IsLoadStoragePanelVisible: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Indicates whether message panel is visible.
		 */
		IsMessagePanelVisible: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Value of SearchTextEdit control.
		 */
		SearchTextEditValue: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING
		},
		/**
		 * Indicates whether SearchTextEdit control is visible.
		 */
		IsSearchVisible: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Items found during the search.
		 */
		FoundItems: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.COLLECTION
		},
		/**
		 * Index of selected search item.
		 */
		SearchItemIndex: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.INTEGER
		},
		/**
		 * The value of the element name or code, which are looking for.
		 */
		SearchValue: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING
		},
		/**
		 * Search information, which shows selected index and how many elements found.
		 */
		SearchInfo: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING
		},
		/**
		 * Indicates whether search is started or not.
		 */
		IsSearchStarted: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Indicates whether items is found or not.
		 */
		IsItemsFound: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: false
		},
		/**
		 * Source schema identifier of copy schema. This schema deactivated after saving copy schema.
		 */
		CopySourceSchemaId: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.STRING
		},
		/**
		 * Gets or sets the value indicates whether is active version menu item should be enabled.
		 */
		IsActiveVersionMenuItemEnabled: {
			type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.DataValueType.BOOLEAN,
			value: true
		}
	},

	//endregion

	//region Methods: Private

	/**
	 * Returns current process schema.
	 * @private
	 * @return {Terrasoft.ProcessSchema} Process schema.
	 */
	onGetSchema: function() {
		return this.get("Schema");
	},

	/**
	 * Returns current schema manager item.
	 * @private
	 * @return {Terrasoft.ProcessSchemaManagerItem} Process schema.
	 */
	onGetSchemaManagerItem: function() {
		return this.get("SchemaManagerItem");
	},

	/**
	 * Returns Id of module properties.
	 * @private
	 * @param {String} elementName Loaded element name.
	 * @return {String} Id.
	 */
	getPropertiesModuleId: function(elementName) {
		return this.id + "-properties-module-" + elementName;
	},

	/**
	 * Initializes hot-keys.
	 * @private
	 */
	addHotkeys: function() {
		var doc = Ext.getDoc();
		doc.on("keydown", this.onKeyDown, this);
	},

	/**
	 * Removes hot-keys listeners.
	 * @private
	 */
	removeHotkeys: function() {
		var doc = Ext.getDoc();
		doc.un("keydown", this.onKeyDown, this);
	},

	/**
	 * Hides/displays the page settings.
	 * @private
	 * @param {Boolean} isVisible Display page feature.
	 */
	setVisiblePropertyPage: function(isVisible) {
		if (this.get("IsShowPropertyPage") === isVisible) {
			return;
		}
		this.set("IsShowPropertyPage", isVisible);
		if (isVisible) {
			var renderToId = this.propertiesContainerId;
			this.sandbox.publish("ReRenderPropertiesPage", renderToId);
		}
	},

	/**
	 * Shows error message and close window.
	 * @private
	 * @param {String} errorMessage Error message.
	 * @param {Object} config Configuration object.
	 * @param {Boolean} config.doCloseWindow Flag that indicates whether designer need to close or not.
	 */
	showErrorMessage: function(errorMessage, config) {
		Terrasoft.Mask.clearMasks("body");
		Terrasoft.showErrorMessage(errorMessage, function() {
			if (!config || config.doCloseWindow !== false) {
				window.close();
			}
		}, this);
	},

	/**
	 * Determines whether the current schema can be edit.
	 * @private
	 * @param {String} packageUId UId of the package.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	getCanEditSchema: function(packageUId, callback, scope) {
		Terrasoft.BaseSchemaDesignerUtilities.getIsPackageForeign(packageUId, function(result, errorMessage) {
			if (errorMessage) {
				this.showErrorMessage(errorMessage);
				return;
			}
			callback.call(scope, {
				canEditPackageSchema: !result.isPackageForeign,
				sysPackage: result.sysPackage
			});
		}, this);
	},

	/**
	 * Validates view model of the current schema.
	 * @private
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	validateSchemaViewModel: function(callback, scope) {
		var canUseProcessVersions = this.getCanUseProcessVersions();
		if (!canUseProcessVersions) {
			this.validateViewModel(function(isValid, shouldSaveProcess) {
				callback.call(scope, {
					isValid: isValid,
					shouldSaveProcess: shouldSaveProcess,
					canEditPackageSchema: true
				});
			}, scope);
			return;
		}
		this.getNeedCreateNewVersionSchema(function(result) {
			this.validateViewModel(function(isValid, shouldSaveProcess) {
				var config = Ext.apply({
					isValid: isValid,
					shouldSaveProcess: shouldSaveProcess
				}, result);
				callback.call(scope, config);
			}, this);
		}, this);
	},

	/**
	 * Shows user message about server error of save process.
	 * @private
	 * @param response
	 */
	showSaveResponseErrorMessage: function(response) {
		var message = this.get("Schema").validatorMessage;
		if (!message) {
			var validatorInfo = this.getValidatorDetailInfo();
			message = validatorInfo.message;
		}
		var caption = response.errorInfo ? response.errorInfo.message : response.statusText;
		Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({caption: caption, message: message});
	},

	/**
	 * Shows the loading mask, saves the current schema and then hides the mask.
	 * @private
	 * @param {Object} chainConfig Config object.
	 * @param {Function} chainCallback Callback function.
	 * @param {Object} chainScope Callback function context.
	 */
	internalSaveSchema: function(chainConfig, chainCallback, chainScope) {
		var maskId = Terrasoft.Mask.show({
			caption: Terrasoft.Resources.SchemaDesigner.SavingMaskCaption,
			timeout: 0
		});
		Terrasoft.chain(
			function(next) {
				this.saveProcess(next, this);
			},
			function(next, response) {
				if (response.success) {
					chainConfig.hasErrors = response.hasErrors;
					this.onAfterSaveProcessSuccess(next, this);
				} else {
					Terrasoft.Mask.hide(maskId);
					this.showSaveResponseErrorMessage(response);
				}
			},
			function(next) {
				var validatorInfo = this.getValidatorDetailInfo(chainConfig.hasErrors);
				this.onAfterSchemaSaved(validatorInfo, chainConfig.isValid, next, this);
			},
			function(next, validatorDetails, isValidData) {
				Terrasoft.Mask.hide(maskId);
				chainCallback.call(chainScope, validatorDetails, isValidData);
			},
			this
		);
	},

	/**
	 * Saves the current schema.
	 * @private
	 * @param {Object} config Config object.
	 * @param {Boolean} config.shouldSaveProcess Indicates whether the current schema is needed to save.
	 * @param {Boolean} config.isValid Indicates whether the current schema is valid.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	saveSchema: function(config, callback, scope) {
		if (!config.shouldSaveProcess) {
			return;
		}
		var schema = this.get("Schema");
		config = Ext.apply({
			sourceSchema: schema
		}, config);
		if (this.getShouldSaveNewVersionWhenPackageChange()) {
			this.schemaManager.getNewSchemaVersion(config, function(managerItem) {
				schema.name = managerItem.instance.name;
				schema.version = managerItem.instance.version;
				this.sandbox.publish("SchemaPropertiesChanged", {
					name: schema.name,
					version: schema.version
				});
				this.internalSaveSchema(config, callback, scope);
			}, this);
			return;
		}
		this.internalSaveSchema(config, callback, scope);
	},

	/**
	 * Returns whether schema is new or not.
	 * @private
	 * @return {Boolean}
	 */
	_getIsNew: function() {
		var managerItem = this.get("SchemaManagerItem");
		var isNew = managerItem && managerItem.isNew();
		return isNew;
	},

	/**
	 * Determines whether a new version of the current schema is needed.
	 * @private
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	getNeedCreateNewVersionSchema: function(callback, scope) {
		if (this._getIsNew()) {
			callback.call(scope, {
				canEditPackageSchema: true
			});
			return;
		}
		var schema = this.get("Schema");
		this.getCanEditSchema(schema.packageUId, function(config) {
			var result = Ext.apply({}, config);
			if (!config.canEditPackageSchema) {
				callback.call(scope, result);
				return;
			}
			Terrasoft.BaseSchemaDesignerUtilities.getRunningProcessCountBySysSchemaUId(schema.uId,
				function(runningProcess, errorMessage) {
					if (errorMessage) {
						this.showErrorMessage(errorMessage);
						return;
					}
					result.hasRunningProcess = runningProcess && runningProcess > 0;
					callback.call(scope, result);
				}, this);
		}, this);
	},

	/**
	 * Shows and hides properties page loading mask to show that page is already loaded.
	 * @private
	 * @param {Number} duration Showing mask duration in ms.
	 */
	blinkPropertiesPageMask: function(duration) {
		var maskId = Terrasoft.Mask.show({
			selector: "#" + this.propertiesContainerId,
			clearMasks: true,
			opacity: 0,
			timeout: 0
		});
		setTimeout(function() {
			Terrasoft.Mask.hide(maskId);
		}, duration);
	},

	/**
	 * Saves process/element properties.
	 * @private
	 * @protected
	 */
	saveElementProperties: function() {
		return this.sandbox.publish("SaveElementProperties");
	},

	/**
	 * Loaded lazy load parameter values.
	 * @param {Terrasoft.ProcessUserTaskSchema} element Flow element.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Execution context.|
	 * @private
	 */
	loadElementLazyParameters: function(element, callback, scope) {
		if (element.hasLazyParameters && !element.getNotLoadedLazyParameters().isEmpty()) {
			var bodyMaskId = Terrasoft.Mask.show({
				timeout: 0
			});
			element.loadLazyParameters(function() {
				Terrasoft.Mask.hide(bodyMaskId);
				callback.call(scope);
			}, this);
		} else {
			callback.call(scope);
		}
	},

	/**
	 * Loads properties page for item by key.
	 * @private
	 * @param {String} key Designer element name.
	 */
	loadPropertiesPage: function(key) {
		if (!this.get("IsShowPropertyPage")) {
			return;
		}
		var element = this.findItemByKey(key);
		Terrasoft.chain(
			function(next) {
				this.loadElementLazyParameters(element, next, this);
			},
			function() {
				var lastSelectedItemUId = this.get("LastSelectedItemUId");
				this.set("LastSelectedItemUId", element.uId);
				if (lastSelectedItemUId != null) {
					return;
				}
				if (this.get("LoadedPropertiesItemName") === key) {
					this.set("LastSelectedItemUId", null);
					this.blinkPropertiesPageMask(100);
					return;
				}
				var maskId = this.maskId = this.loadPropertiesPageMask(element);
				element.getEditPageSchemaName(function(editPageSchemaName) {
					this.loadElementProperties({
						elementName: key,
						propertiesEditSchema: editPageSchemaName,
						renderTo: this.propertiesContainerId,
						maskId: maskId
					});
				}, this);
			},
			this
		);
	},

	/**
	 * Loads element properties page.
	 * @private
	 * @param {Object} config Configuration object.
	 * @param {String} config.elementName Element name.
	 * @param {String} config.propertiesEditSchema Edit page schema name.
	 * @param {String} config.renderTo Render container Id.
	 * @param {String} config.maskId Loading mask Id.
	 */
	loadElementProperties: function(config) {
		var loadedPropertiesItemName = this.get("LoadedPropertiesItemName");
		var elementName = config.elementName;
		if (loadedPropertiesItemName !== null && loadedPropertiesItemName !== elementName) {
			this.saveElementProperties();
		}
		this.set("LoadedPropertiesItemName", elementName);
		var moduleId = this.getPropertiesModuleId(elementName);
		var sandbox = this.sandbox;
		var propertiesEditModule = this.get("PropertiesEditModule");
		var requiredDescriptors = [propertiesEditModule].concat(config.propertiesEditSchema);
		sandbox.requireModuleDescriptors(requiredDescriptors, function() {
			sandbox.loadModule(propertiesEditModule, {
				id: moduleId,
				renderTo: config.renderTo,
				instanceConfig: {
					tag: elementName,
					schemaName: config.propertiesEditSchema,
					maskId: config.maskId
				}
			});
		}, this);
	},

	/**
	 * Returns current process interpreter validator detail info message.
	 * @private
	 * @return {String} Interpreter validator detail info message.
	 */
	getValidatorDetailInfo: function(hasErrors) {
		var result = {
			hasErrors: hasErrors
		};
		var schema = this.get("Schema");
		var validatorInfo = schema.validatorInfo;
		if (validatorInfo && validatorInfo.length > 0) {
			var validatorInfoString = validatorInfo.join(", ");
			var template = hasErrors
				? Terrasoft.Resources.SchemaDesigner.ErrorMessages
				: Terrasoft.Resources.SchemaDesigner.RequireCompilationMessage;
			result.message = Ext.String.format(template, validatorInfoString);
		}
		return result;
	},

	/**
	 * Replaces browser url with schemaUId.
	 * @private
	 */
	replaceUrlWithCurrentSchemaUId: function() {
		var schemaUId = this.get("SchemaUId");
		history.replaceState({}, document.title, "#" + this.urlHashPrefix + "/" + schemaUId);
	},

	/**
	 * Indicates if new schema is in adding mode by parsing url.
	 * @private
	 * @return {Boolean}
	 */
	getIsSchemaAddMode: function() {
		var regexp = new RegExp("(#" + this.urlHashPrefix + "\/.{8}-.{4}-.{4}-.{4}-.{12})");
		return !regexp.test(window.location.hash);
	},

	/**
	 * Deactivates schema by schema identifier.
	 * @private
	 * @param {String} schemaId Schema identifier.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	deactivateSchema: function(schemaId, callback, scope) {
		Terrasoft.SysUserPropertyHelper.setProperty({
			schemaId: schemaId,
			propertyName: "Enabled",
			propertyValue: false,
			managerName: this.schemaManager.managerName
		}, callback, scope);
	},

	/**
	 * Saves process schema and execute callback on success.
	 * @private
	 * @param {Function} callback Execute callback function with required module.
	 * @param {Object} callback.response Response object.
	 * @param {Object} scope Execution context.
	 */
	saveProcess: function(callback, scope) {
		var item = this.get("SchemaManagerItem");
		item.setStatus(Terrasoft.ModificationStatus.UPDATED);
		item.save({}, function(response) {
			if (response.success) {
				this.schemaManager.onItemOutdated({
					status: Terrasoft.ModificationStatus.UPDATED,
					uId: item.uId,
					name: item.name,
					caption: item.caption
				});
			}
			callback.call(scope, response);
		}, this);
	},

	/**
	 * Determines whether the current item is changed.
	 * @private
	 * @param {Object} changes Change data object.
	 * @return {Boolean} True when item is changed; otherwise - False.
	 */
	getItemIsChanged: function(changes) {
		var objectKeys = Ext.Object.getKeys(changes);
		return !(objectKeys.length === 1 && objectKeys[0] === "isActiveVersion");
	},

	/**
	 * Handles change element of the collection. When you change the title generates itemCaptionChanged event.
	 * @protected
	 * @param {Object} changes Change data object.
	 * @param {Terrasoft.manager.BaseProcessSchemaElement|Terrasoft.manager.BaseProcessSchema} item Schema item.
	 */
	onItemChanged: function(changes, item) {
		var schema = this.get("Schema");
		if (changes.hasOwnProperty("isValid")) {
			if (item !== schema) {
				this.fireEvent("itemIsValidChanged", item);
			}
			return;
		}
		this.hideMessagePanel();
		if (this.getItemIsChanged(changes)) {
			this.set("IsSchemaChanged", true);
		}
		if (this.get("IsLoadStoragePanelVisible")) {
			this.clearSchemaStorageInfo();
		}
		if (changes.hasOwnProperty("caption") && item !== schema) {
			this.fireEvent("itemCaptionChanged", item);
		}
		if (item !== schema) {
			schema.fireEvent("changed", {}, schema);
		}
	},

	/**
	 * Returns display value. If caption not sets, returns name.
	 * @private
	 * @return {String} Display value.
	 */
	getSchemaDisplayValue: function() {
		var schema = this.get("Schema");
		return schema.getDisplayValue();
	},

	/**
	 * @private
	 */
	_onSaveVersionClick: function(validationResult, callback, scope) {
		if (validationResult.saveAsNewVersion) {
			this.saveNewSchemaVersion(validationResult, callback, scope);
			return;
		}
		if (validationResult.isDelivered || (validationResult.canEditPackageSchema && validationResult.hasRunningProcess)) {
			this.saveSchema(validationResult, function(validatorDetails, isValidData) {
				this.saveProcessSchemaResponse(validatorDetails, isValidData);
				Ext.callback(callback, scope, [validatorDetails, isValidData]);
			}, this);
		}
	},

	/**
	 * @private
	 */
	_loadSaveSchemaVersionMessageBox: function(renderTo, viewModelConfig) {
		var moduleName = "BaseSchemaModuleV2";
		var schemaName = "SaveSchemaVersionMessageBox";
		var moduleId = this.sandbox.id + "_" + schemaName;
		var config = {
			id: moduleId,
			renderTo: renderTo,
			instanceConfig: {
				schemaName: schemaName,
				isSchemaConfigInitialized: true,
				useHistoryState: false,
				generateViewContainerId: false,
				parameters: {
					viewModelConfig: viewModelConfig
				}
			}
		};
		this.sandbox.loadModule(moduleName, config);
		return moduleId;
	},

	/**
	 * @protected
	 */
	getSaveSchemaVersionMessageBoxTitle: function() {
		return Terrasoft.Resources.SchemaDesigner.SavingProcess;
	},

	/**
	 * @protected
	 */
	getSaveSchemaVersionMessageBoxMessage: function(validationResult) {
		var message;
		if (validationResult.isDelivered) {
			message = Terrasoft.Resources.SchemaDesigner.SchemaWasExported;
		} else {
			if (validationResult.canEditPackageSchema) {
				message = Terrasoft.Resources.SchemaDesigner.ExistsRunningProcessQuestion;
			} else {
				message = Terrasoft.Resources.SchemaDesigner.SchemaCreatesInForeighnMaintainerQuestion;
			}
		}
		return message;
	},

	/**
	 * Shows confirmation dialog if schema is needed to save as a new version.
	 * @private
	 * @param {Object} validationResult Schema validation result.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	showSaveNewSchemaVersionConfirmationDialog: function(validationResult, callback, scope) {
		validationResult.isDelivered = this.getIsDelivered();
		var viewModelConfig = {
			Title: this.getSaveSchemaVersionMessageBoxTitle(),
			Message: this.getSaveSchemaVersionMessageBoxMessage(validationResult),
			IsForceSaveNewVersion: !validationResult.canEditPackageSchema
		};
		this.requireModule("ModalBox", function(modalBox) {
			var container = modalBox.show({widthPixels: 550, heightPixels: 200});
			var renderTo = container.id;
			var moduleId = this._loadSaveSchemaVersionMessageBox(renderTo, viewModelConfig);
			this.sandbox.subscribe("OnSaveVersionClick", function(saveAsNewVersion) {
				validationResult.saveAsNewVersion = saveAsNewVersion;
				this._onSaveVersionClick(validationResult, callback, scope);
			}, this, [moduleId]);
		}, this);
	},

	/**
	 * Shows confirmation dialog whether it is needed to set current schema as actual version.
	 * @private
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	showIsNeedSetActualSchemaVersionConfirmationMessage: function(callback, scope) {
		var schemaDesignerResources = Terrasoft.Resources.SchemaDesigner;
		var message = schemaDesignerResources.NeedSetActualSchemaVersionConfirmationMessage;
		var caption = this.getSchemaDisplayValue();
		message = Ext.String.format(message, caption);
		this.showConfirmationDialog(message, function(returnCode) {
			if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
				var schemaUId = this.get("SchemaUId");
				this._setIsActualVersionByUId(schemaUId, callback, scope);
			} else {
				Ext.callback(callback, scope);
			}
		}, [Terrasoft.MessageBoxButtons.YES.returnCode, Terrasoft.MessageBoxButtons.NO.returnCode], null);
	},

	/**
	 * Gets the value indicates whether should save schema new version when package changed.
	 * @private
	 */
	getShouldSaveNewVersionWhenPackageChange: function() {
		var canUseProcessVersions = this.getCanUseProcessVersions();
		if (!canUseProcessVersions) {
			return false;
		}
		var schema = this.get("Schema");
		var isNotNewItem = !this._getIsNew();
		var packageChanged = this.initialSchemaPackageUId !== schema.packageUId;
		var isChildSchema = schema.version !== 0;
		return isNotNewItem && packageChanged && isChildSchema;
	},

	/**
	 * Gets the value indicates whether schema is delivered.
	 * @private
	 */
	getIsDelivered: function() {
		var canUseProcessVersions = this.getCanUseProcessVersions();
		if (!canUseProcessVersions) {
			return false;
		}
		var schema = this.get("Schema");
		return schema.getPropertyValue("isDelivered");
	},

	/**
	 * Close current designer window without save unsaved changes to local store.
	 * @private
	 */
	closeSchemaDesigner: function() {
		this.preventSaveToStorage = true;
		window.close();
	},

	/**
	 * Saves schema.
	 * @private
	 * @param {Boolean} [isForce] Optional flag that indicates when to save schema without any dialogs.
	 */
	_save: function(isForce) {
		this.clearSchemaStorageInfo();
		this.hideMessagePanel();
		this.fireEvent("focusDesigner", this);
		this.saveElementProperties();
		this.validateSchemaViewModel(function(result) {
			if (!result.shouldSaveProcess) {
				return;
			}
			if (!isForce && this.getIsDelivered()) {
				this.showSaveNewSchemaVersionConfirmationDialog(result);
				return;
			}
			if (result.canEditPackageSchema && (isForce || !result.hasRunningProcess)) {
				this.saveSchema(result, function(validatorDetails, isValidData) {
					this.saveProcessSchemaResponse(validatorDetails, isValidData);
				}, this);
				return;
			}
			this.showSaveNewSchemaVersionConfirmationDialog(result);
		}, this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.model.BaseViewModel#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event initialized
			 * Event initialization is complete, the view model.
			 * @param {Terrasoft.ProcessSchemaDesignerViewModel} this View model.
			 */
			"initialized",
			/**
			 * @event itemschanged
			 * Change event collection process elements.
			 * @param {Object} args Options change collection items.
			 * @param {String} args.action Type of change add/remove.
			 * @param {Object} args.item Add/remove element.
			 */
			"itemschanged",
			/**
			 * @event itemCaptionChanged
			 * Event title change process element.
			 * @param {Object} item The element that has changed the title.
			 */
			"itemCaptionChanged",
			/**
			 * @event itemIsValidChanged
			 * Event change process element valid state.
			 * @param {Object} item The element that has changed the title.
			 */
			"itemIsValidChanged",
			/**
			 * @event clearSelection
			 * Clear diagram item selection.
			 */
			"clearSelection",
			/**
			 * @event itemSelected
			 * Event item selected.
			 * @param {String} itemName Selected item name.
			 */
			"itemSelected",
			/**
			 * @event focusDesigner
			 * Move current focus to designer.
			 */
			"focusDesigner",
			/**
			 * @event highlightItems
			 * Highlight items on diagram.
			 */
			"updateItemsHighlighter"
		);
	},

	/**
	 * Init schema instance.
	 */
	init: function() {
		this.mixins.BaseSchemaDesignerStorageMixin.init.call(this);
		var schemaUId = this.get("SchemaUId");
		if (schemaUId) {
			this.tryEditSchema(schemaUId);
		} else {
			schemaUId = Terrasoft.generateGUID();
			this.set("SchemaUId", schemaUId);
			this.createSchema(schemaUId);
		}
		this.setValidationConfig();
	},

	/**
	 * Creates new schema with schemaUId.
	 * @protected
	 * @param {String} schemaUId Schema identifier.
	 */
	createSchema: function(schemaUId) {
		this.getPackageUId(function(packageUId) {
			this.schemaManager.createSchemaInstance(schemaUId, packageUId, function(schema, managerItem, errorMessage) {
				if (errorMessage) {
					this.showErrorMessage(errorMessage);
				} else {
					this.set("SchemaManagerItem", managerItem);
					this.onSchemaLoaded(schema);
				}
			}, this);
		}, this);
	},

	/**
	 * Schema instance get handler execute callback.
	 * @param {Terrasoft.BaseSchema} schema Schema instance.
	 * @param {Function} callback Execute callback function.
	 * @param {Terrasoft.manager.BaseProcessSchema} callback.schema Schema instance.
	 * @param {Object} scope Execution context.
	 */
	onAfterGetSchemaInstance: function(schema, callback, scope) {
		this._initIsActualVersionMenuItem(schema, () => callback.call(scope, schema), this);
	},

	/**
	 * Returns schema instance by uid.
	 * @protected
	 * @param {String} schemaUId Schema unique identifier.
	 * @param {Function} callback Callback function.
	 * @param {Terrasoft.manager.BaseProcessSchema} callback.schema Schema instance.
	 * @param {Object} scope Callback function context.
	 */
	getSchemaInstance: function(schemaUId, callback, scope) {
		Terrasoft.chain(
			function(next) {
				this.schemaManager.getSchemaInstance(schemaUId, next, this);
			},
			function(next, schema, managerItem, errorMessage) {
				if (errorMessage) {
					this.showErrorMessage(errorMessage);
					return;
				}
				this.set("SchemaManagerItem", managerItem);
				this.onAfterGetSchemaInstance(schema, callback, scope);
			}, this
		);
	},

	/**
	 * Edits existing schema by UId.
	 * @protected
	 * @param {String} schemaUId Schema identifier.
	 */
	tryEditSchema: function(schemaUId) {
		this.getSchemaInstance(schemaUId, function(schema) {
			this.getCanEditSchema(schema.packageUId, function(config) {
				if (config.canEditPackageSchema) {
					this.editSchema(schema);
				} else {
					this.copySchema(schema);
				}
			}, this);
		}, this);
	},

	/**
	 * Edits existing schema by UId.
	 * @protected
	 * @param {Terrasoft.manager.BaseProcessSchema} schema Schema instance.
	 */
	editSchema: function(schema) {
		Terrasoft.chain(
			function(next) {
				this.schemaManager.getCanEditSchema(schema.uId, next, this);
			},
			function(next, success, lockMessage, errorMessage) {
				if (errorMessage) {
					this.showErrorMessage(errorMessage);
				} else if (!success) {
					var message = lockMessage ||
						Terrasoft.Resources.SchemaDesigner.PackageElementEditWithoutLockMessage;
					Terrasoft.showInformation(message, next, this);
				} else {
					next();
				}
			},
			function() {
				this.onSchemaLoaded(schema);
			}, this
		);
	},

	/**
	 * Sets actual schema version property.
	 * @protected
	 * @param {Boolean} value value to set.
	 */
	setIsActiveVersion: function(value) {
		this._setIsActualVersionMenuItemVisibility(value);
		const schema = this.get("Schema");
		schema.setPropertyValue("isActiveVersion", value);
		schema.setIsActualVersion(value);
		this.sandbox.publish("SchemaPropertiesChanged", {
			"isActualVersion": value
		});
	},

	/**
	 * Sets actual schema version.
	 * @protected
	 * @param {String} schemaUId UId of the schema.
	 */
	setIsActualVersionByUId: function(schemaUId) {
		this._setIsActualVersionByUId(schemaUId, Ext.emptyFn, this);
	},

	/**
	 * Creates copy of schema.
	 * @protected
	 * @param {Terrasoft.manager.BaseProcessSchema} schema Schema instance.
	 */
	copySchema: function(schema) {
		Terrasoft.chain(
			function(next) {
				this.schemaManager.initialize(next, this);
			},
			function(next) {
				this.schemaManager.getSchemaInstance(schema.uId, next, this);
			},
			function(next, schemaInstance, managerItem, errorMessage) {
				if (errorMessage) {
					this.showErrorMessage(errorMessage);
				} else {
					this.set("CopySourceSchemaId", managerItem.id);
					this.copySchemaInstance(schemaInstance);
				}
			}, this
		);
	},

	/**
	 * Creates copy of schema.
	 * @protected
	 * @param {Terrasoft.manager.BaseProcessSchema} sourceSchema Source schema instance.
	 */
	copySchemaInstance: function(sourceSchema) {
		var manager = this.schemaManager;
		var managerItem = manager.copySchema(sourceSchema);
		var schema = managerItem.instance;
		var namePrefix = manager.schemaNamePrefix + schema.name;
		schema.name = manager.generateItemUniqueName(namePrefix);
		this.set("SchemaUId", schema.uId);
		this.set("SchemaManagerItem", managerItem);
		this.getPackageUId(function(packageUId) {
			schema.packageUId = packageUId;
			this.onSchemaLoaded(schema);
		}, this);
	},

	/**
	 * Requires module.
	 * @protected
	 * @param {String} moduleName Module name.
	 * @param {Function} callback Execute callback function.
	 * @param {Function} callback.module Required module.
	 * @param {Object} scope Callback function scope.
	 */
	requireModule: function(moduleName, callback, scope) {
		var module = this[moduleName];
		if (module) {
			callback.call(scope, module);
		} else {
			this.sandbox.requireModuleDescriptors([moduleName], function() {
				var self = this;
				require([moduleName], function(requiredModule) {
					self[moduleName] = requiredModule;
					callback.call(scope, requiredModule);
				});
			}, this);
		}
	},

	/**
	 * Requires module ProcessModuleUtilities.
	 * @protected
	 * @param {Function} callback Execute callback function.
	 * @param {Function} callback.module ProcessModuleUtilities module.
	 * @param {Object} scope Callback function scope.
	 */
	getProcessModuleUtilities: function(callback, scope) {
		this.requireModule("ProcessModuleUtilities", callback, scope);
	},

	/**
	 * Loads element properties page mask, if element is Email it loads global mask.
	 * @protected
	 */
	loadPropertiesPageMask: function() {
		var propertiesContainerSelector = "#" + this.propertiesContainerId;
		return Terrasoft.Mask.show({
			selector: propertiesContainerSelector,
			opacity: 0.5,
			showHidden: true,
			clearMasks: true
		});
	},

	/**
	 * Returns element key value.
	 * @protected
	 * @param  {Terrasoft.BaseProcessSchemaElement} item Schema element.
	 * @return {String}
	 */
	getItemKey: function(item) {
		return item.uId;
	},

	/**
	 * Returns schema item by key for properties edit page and clear LastSelectedItemUId property.
	 * If LastSelectedItemUId is not empty, loads edit page for new item.
	 * @param {String} key Designer item key.
	 * @return {Terrasoft.BaseProcessSchemaElement|null} Schema item.
	 */
	getPropertiesPageData: function(key) {
		var lastSelectedItemUId = this.get("LastSelectedItemUId");
		var lastSelectedItem = this.findItemByUId(lastSelectedItemUId);
		var lastSelectedItemKey = lastSelectedItem && this.getItemKey(lastSelectedItem);
		this.set("LastSelectedItemUId", null);
		if (!Ext.isEmpty(lastSelectedItemKey, true) && key !== lastSelectedItemKey) {
			this.set("LoadedPropertiesItemName", null);
			this.loadPropertiesPage(lastSelectedItemKey);
			return null;
		}
		return this.findItemByKey(key);
	},

	/**
	 * Returns identifier of package.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	getPackageUId: function(callback, scope) {
		var packageUId = this.get("PackageUId");
		if (packageUId) {
			callback.call(scope, packageUId);
		} else {
			Terrasoft.PackageManager.getCurrentPackageUId(callback, scope);
		}
	},

	/**
	 * Registers an event for the module properties and subscribe to them.
	 * @protected
	 */
	onSandboxInitialized: function() {
		var sandbox = this.sandbox;
		sandbox.registerMessages({
			"GetSchema": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"GetSchemaManagerItem": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"PropertiesPageCaptionChanged": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"GetProcessSchema": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"OnSaveVersionClick": {
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
				"mode": Terrasoft.MessageMode.PTP
			},
			"DiagramPageCaptionChanged": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},
			"SchemaPropertiesChanged": {
				"direction": Terrasoft.MessageDirectionType.PUBLISH,
				"mode": Terrasoft.MessageMode.PTP
			}
		});
		sandbox.subscribe("GetSchema", this.onGetSchema, this);
		sandbox.subscribe("GetSchemaManagerItem", this.onGetSchemaManagerItem, this);
		sandbox.subscribe("PropertiesPageCaptionChanged", this.onPropertiesPageCaptionChanged, this);
		// TODO #CRM-25721 Obsolete, use "GetSchema" message
		sandbox.subscribe("GetProcessSchema", this.onGetSchema, this);
	},

	/**
	 * Sets diagram process caption.
	 * @param {String} caption Process caption.
	 * @protected
	 */
	onPropertiesPageCaptionChanged: function(caption) {
		this.set("SchemaCaption", caption);
	},

	/** Initializes schema caption
	 * @protected
	 * @param {Terrasoft.BaseProcessSchema} schema Schema instance
	 */
	initializeSchemaCaption: function(schema) {
		this.set("SchemaCaption", schema.caption.getValue());
	},

	/**
	 * Loads view model items from process schema.
	 * @protected
	 * @param {Terrasoft.BaseProcessSchema} schema Schema.
	 */
	loadItems: function(schema) {
		schema.subscribeOnChangedEvent(this.onItemChanged, this);
		schema.on("parameterAdded", this.onParameterAdded, this);
		schema.on("parameterRemoved", this.onParameterRemoved, this);
		this.initializeSchemaCaption(schema);
		this.set("Schema", schema);
	},

	/**
	 * Finds the item of the schema by ID.
	 * @param {String} uId Item identifier.
	 * @return {Terrasoft.BaseProcessSchemaElement}
	 */
	findItemByUId: function(uId) {
		var schema = this.get("Schema");
		if (schema.uId === uId) {
			return schema;
		}
		return schema.findItemByUId(uId);
	},

	/**
	 * Finds the item of the schema by key.
	 * @protected
	 * @param {String} key Key of item in collection.
	 * @return {Terrasoft.BaseProcessSchemaElement}
	 */
	findItemByKey: function(key) {
		return this.findItemByUId(key);
	},

	/**
	 * Loads properties page for schema.
	 * @protected
	 */
	loadSchemaPropertiesPage: function() {
		var schema = this.get("Schema");
		var key = this.getItemKey(schema);
		this.loadPropertiesPage(key);
	},

	/**
	 * Hides properties page.
	 * @abstract
	 */
	onHidePropertyPage: Terrasoft.abstractFn,

	/**
	 * The event handler added parameter.
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 */
	onParameterAdded: function(parameter) {
		this.onItemChanged({}, parameter);
		parameter.on("changed", this.onItemChanged, this);
	},

	/**
	 * The event handler removed parameter.
	 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
	 */
	onParameterRemoved: function(parameter) {
		this.onItemChanged({}, parameter);
		parameter.un("changed", this.onItemChanged, this);
	},

	/**
	 * Handler for load storage button click.
	 * @protected
	 */
	onLoadStorageClick: function() {
		var maskId = Terrasoft.Mask.show({
			timeout: 0
		});
		setTimeout(function() {
			this.loadSchemaFromStorage(function() {
				this.clearSchemaStorageInfo();
				Terrasoft.Mask.hide(maskId);
			}, this);
		}.bind(this), 0);
	},

	/**
	 * Hides and clears message panel.
	 */
	hideMessagePanel: function() {
		this.set("IsMessagePanelVisible", false);
		this.set("MessagePanelMessage", null);
	},

	/**
	 * Handler for discard storage button click.
	 * @protected
	 */
	onDiscardStorageClick: function() {
		this.clearSchemaStorageInfo();
	},

	/**
	 * Clears schema from local storage.
	 * @protected
	 */
	clearSchemaStorageInfo: function() {
		this.mixins.BaseSchemaDesignerStorageMixin.clearSchemaStorageInfo.call(this);
	},

	/**
	 * Processor CPU events. It fills the Items collection of the elements of the process.
	 * @protected
	 * @param {Terrasoft.BaseProcessSchema} schema Schema instance.
	 */
	onSchemaLoaded: function(schema) {
		this.loadItems(schema);
		this.on("change:SchemaCaption", this.onSchemaCaptionChange, this);
		this.onSandboxInitialized();
		this.addHotkeys();
		this.loadSchemaPropertiesPage();
		Ext.EventManager.on(window, "beforeunload", this.onBeforeUnload.bind(this), this);
		this.mixins.BaseSchemaDesignerStorageMixin.initLocalStorageSchema.call(this);
		this.fireEvent("initialized", this);
		this.initialSchemaPackageUId = schema.packageUId;
	},

	/**
	 * Handler for before page unload event.
	 * @protected
	 */
	onBeforeUnload: function() {
		if (this.preventSaveToStorage) {
			return;
		}
		Terrasoft.Mask.show({
			timeout: 0
		});
		this.fireEvent("focusDesigner", this);
		this.saveElementProperties();
		var schema = this.get("Schema");
		if (schema.clearLazyParametersValues) {
			schema.clearLazyParametersValues();
		}
		this.saveSchemaToStorage();
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.removeHotkeys();
		var schema = this.get("Schema");
		if (schema && !schema.destroyed) {
			schema.destroy();
		}
		Ext.EventManager.un(window, "beforeunload", this.onBeforeUnload, this);
		this.callParent(arguments);
	},

	/**
	 * Key down event handler.
	 * @param {Object} event Event object.
	 * @return {Boolean}
	 */
	onKeyDown: function(event) {
		if (event.ctrlKey && !event.altKey && event.keyCode === event.S) {
			event.preventDefault();
			this.save();
			return false;
		}
		if (event.keyCode === event.F1) {
			event.preventDefault();
			this.onHelpClick();
			return false;
		}
		if (event.ctrlKey && event.keyCode === event.M) {
			event.preventDefault();
			this.onOpenMetaDataClick();
			return false;
		}
	},

	/**
	 * Handler for help button click. Opens academy online help in new window.
	 */
	onHelpClick: function() {
		this.requireModule("AcademyUtilities", function(utils) {
			Terrasoft.BaseSchemaDesignerUtilities.openHelp(utils, this.contextHelpCode);
		}, this);
	},

	/**
	 * Handler for feed button click.
	 */
	onESNFeedClick: function() {
		this.clearSelection();
		this.setVisiblePropertyPage(true);
		this.loadElementProperties({
			elementName: "_feed_",
			propertiesEditSchema: "ProcessDesignerESNFeedPropertiesPage",
			renderTo: this.propertiesContainerId
		});
	},

	/**
	 * Publish message to update schema name on opened schema properties page.
	 * @private
	 */
	_updateProcessPropertiesPageSchemaName: function() {
		var schema = this.get("Schema");
		this.sandbox.publish("SchemaPropertiesChanged", {
			name: schema.name
		});
	},

	_initIsActualVersionMenuItem: function(schema, callback, scope){
		this._setIsActualVersionMenuItemVisibility(true);
		this.schemaManager.getIsActualVersion(schema, function(isActualVersion) {
			this._setIsActualVersionMenuItemVisibility(isActualVersion);
			schema.setIsActualVersion(isActualVersion);
			Ext.callback(callback, scope, [isActualVersion]);
		}, this);
	},

	/**
	 * Sets actualizing menu item enabled state depends on actual state of the schema.
	 * @private
	 * @param {Boolean} isActiveSchema Value to set.
	 */
	_setIsActualVersionMenuItemVisibility: function(isActiveSchema) {
		this.set("IsActiveVersionMenuItemEnabled", isActiveSchema);
	},

	/**
	 * Sets actual schema version.
	 * @private
	 * @param {String} schemaUId UId of the schema.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	_setIsActualVersionByUId: function(schemaUId, callback, scope) {
		const maskId = Terrasoft.Mask.show({
			showHidden: true
		});
		Terrasoft.chain(
			function(next) {
				this.schemaManager.setIsActualVersionByUId(schemaUId, next, this);
			},
			function(next, success) {
				var schemaDesignerResources = Terrasoft.Resources.SchemaDesigner;
				if (success) {
					this.setIsActiveVersion(true);
					this.showMessagePanel(schemaDesignerResources.ActualizeSchemaResultMessage, next, this);
				} else {
					this.showErrorMessage(schemaDesignerResources.ActualSchemaSetErrorMessage);
				}
				next();
			},
			function() {
				Terrasoft.Mask.hide(maskId);
				Ext.callback(callback, scope);
			}, this);
	},

	/**
	 * Handler for after successful save of schema.
	 * @protected
	 */
	onAfterSaveProcessSuccess: function(callback, scope) {
		this.set("IsSchemaChanged", false);
		var isSchemaAddMode = this.getIsSchemaAddMode();
		var copySourceSchemaId = this.get("CopySourceSchemaId");
		if (isSchemaAddMode || copySourceSchemaId) {
			this.replaceUrlWithCurrentSchemaUId();
		}
		if (isSchemaAddMode) {
			this._updateProcessPropertiesPageSchemaName();
		}
		if (copySourceSchemaId) {
			this.set("CopySourceSchemaId", null);
			this.deactivateSchema(copySourceSchemaId, callback, scope);
		} else {
			callback.call(scope);
		}
	},

	/**
	 * Shows save confirmation dialog if schema changed otherwise calls default action.
	 * @protected
	 * @param {String} message Confirmation message.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The context of the callback function.
	 */
	showSaveConfirmationDialog: function(message, callback, scope) {
		var isNew = this._getIsNew();
		if (this.get("IsSchemaChanged") || isNew) {
			var buttons = Terrasoft.MessageBoxButtons;
			this.showConfirmationDialog(message, function(returnCode) {
				if (returnCode === buttons.SAVE.returnCode) {
					this.validateAndSave(callback, scope);
					return;
				}
				if (!isNew && returnCode === buttons.CANCEL.returnCode) {
					callback.call(scope, null, true);
				}
			}, [buttons.SAVE, buttons.CANCEL], {defaultButton: 0});
		} else {
			callback.call(scope);
		}
	},

	/**
	 * Validates and saves schema.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {Object} callback.publishInfo.
	 * @param {Boolean} callback.isSaveCanceled Flag that indicates save.
	 * @param {Object} scope The context of the callback function.
	 */
	validateAndSave: function(callback, scope) {
		this.validateSchemaViewModel(function(result) {
			var isSaveCanceled = !result.shouldSaveProcess;
			if (isSaveCanceled) {
				callback.call(scope, null, isSaveCanceled);
				return;
			}
			if (this.getIsDelivered()) {
				this.showSaveNewSchemaVersionConfirmationDialog(result, function(validatorDetails) {
					callback.call(scope, validatorDetails);
				}, this);
				return;
			}
			if (result.canEditPackageSchema && !result.hasRunningProcess) {
				this.saveSchema(result, function(validatorDetails, isValidData) {
					this.saveProcessSchemaResponse(validatorDetails, isValidData);
					callback.call(scope, validatorDetails);
				}, this);
				return;
			}
			this.showSaveNewSchemaVersionConfirmationDialog(result, function(validatorDetails) {
				callback.call(scope, validatorDetails);
			}, this);
		}, this);
	},

	/**
	 * Save process handler. If server validation fail, shows message.
	 * @protected
	 */
	saveProcessSchemaResponse: function() {
		var message = Terrasoft.Resources.SchemaDesigner.SchemaSavedMessage;
		this.showMessagePanel(message);
	},

	/**
	 * @protected
	 */
	showMessagePanel: function(message) {
		this.set("MessagePanelMessage", message);
		this.set("IsMessagePanelVisible", true);
	},

	/**
	 * Schema save handler execute callback.
	 * @protected
	 * @param {Object} validatorInfo Process validation info.
	 * @param {Boolean} validatorInfo.hasErrors Back end validation result.
	 * @param {Boolean} validatorInfo.message Validation text.
	 * @param {String} isValid Front end validation result.
	 * @param {Function} callback Execute callback function with required module.
	 * @param {Object} [callback.publishInfo] (optional) Publish information.
	 * @param {Object} [callback.isValid] (optional) Publish information.
	 * @param {Object} scope Execution context.
	 */
	onAfterSchemaSaved: function(validatorInfo, isValid, callback, scope) {
		const schema = this.get("Schema");
		this.initialSchemaPackageUId = schema.packageUId;
		this._initIsActualVersionMenuItem(schema, function(isActualVersion) {
			this.sandbox.publish("SchemaPropertiesChanged", {
				"isActualVersion": isActualVersion
			});
			callback.call(scope, validatorInfo, isValid);
		} , this);
	},

	/**
	 * Saves schema.
	 */
	save: function() {
		this._save();
	},

	/**
	 * Returns style for Save button depends on whether has schema changes or not.
	 * @return {Terrasoft.controls.ButtonEnums.style}
	 */
	getSaveButtonStyle: function() {
		return Terrasoft.isDebug && !this.get("IsSchemaChanged")
			? Terrasoft.controls.ButtonEnums.style.GREY
			: Terrasoft.controls.ButtonEnums.style.GREEN;
	},

	/**
	 * Returns hint for Save button depends on whether has schema changes or not.
	 * @return {String}
	 */
	getSaveButtonHint: function() {
		return this.get("IsSchemaChanged")
			? Terrasoft.Resources.SchemaDesigner.SaveButtonHint
			: Terrasoft.Resources.SchemaDesigner.AlreadySavedButtonHint;
	},

	/**
	 * Saves schema forcebly without any dialogs.
	 */
	forceSave: function() {
		this._save(true);
	},

	/**
	 * Close schema designer.
	 * @protected
	 */
	close: function() {
		if (this.get("IsSchemaChanged")) {
			var message = Terrasoft.Resources.SchemaDesigner.CloseUnsavedSchemaConfirmation;
			this.showConfirmationDialog(message, function(returnCode) {
				if (returnCode === "yes") {
					this.closeSchemaDesigner();
				}
			}, ["yes", "no"]);
		} else {
			this.closeSchemaDesigner();
		}
	},

	/**
	 * Creates and saves a new schema version.
	 * @protected
	 * @param {Object} config Settings which is needed for creation of a new schema version.
	 * @param {Terrasoft.manager.BaseProcessSchema} config.sourceSchema Source schema instance.
	 * @param {Terrasoft.BaseSchemaManagerItem} config.sourceManagerItem Source schema manager item.
	 * @param {Object} config.sysPackage Package info.
	 * @param {Boolean} config.shouldSaveProcess Flag that indicates whether should save process or not.
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	saveNewSchemaVersion: function(config, callback, scope) {
		if (!config.shouldSaveProcess) {
			return;
		}
		var schemaManagerItem = null;
		const sourceSchema = this.get("Schema");
		config = Ext.apply({
			sourceSchema: sourceSchema,
			sourceManagerItem: this.get("SchemaManagerItem")
		}, config);
		Terrasoft.chain(
			function(next) {
				if (sourceSchema.getAllLazyPropertiesAreLoaded()) {
					next();
				} else {
					const bodyMaskId = Terrasoft.Mask.show({timeout: 0});
					sourceSchema.loadAllLazyProperties(function() {
						Terrasoft.Mask.hide(bodyMaskId);
						next();
					}, this);
				}
			},
			function(next) {
				this.schemaManager.getNewSchemaVersion(config, next, this);
			},
			function(next, managerItem, errorMessage) {
				if (errorMessage) {
					this.showErrorMessage(errorMessage);
					return;
				}
				schemaManagerItem = managerItem;
				var schema = schemaManagerItem.instance;
				this.set("SchemaUId", schema.uId);
				this.set("Schema", schema);
				this.set("SchemaManagerItem", schemaManagerItem);
				this.saveSchema(config, next, this);
			},
			function(next, validationInfo, isValidData) {
				this._setIsActualVersionMenuItemVisibility(false);
				this.clearSchemaItems();
				this.onSchemaLoaded(this.get("Schema"));
				this.replaceUrlWithCurrentSchemaUId();
				if ((validationInfo && validationInfo.hasErrors) || !isValidData) {
					next(validationInfo, isValidData);
				} else {
					this.showIsNeedSetActualSchemaVersionConfirmationMessage(function() {
						next(validationInfo, isValidData);
					});
				}
			},
			function(next, validationInfo, isValidData) {
				this.saveProcessSchemaResponse(validationInfo, isValidData);
				Ext.callback(callback, scope, [validationInfo, isValidData]);
			}, this);
	},

	/**
	 * Determines whether the functionality of the versioning schema is enabled.
	 * @protected
	 * @return {Boolean} True, if functionality is enabled; otherwise - False.
	 */
	getCanUseProcessVersions: function() {
		return this.schemaManager.getCanUseProcessVersions();
	},

	/**
	 * Shows error message.
	 * @protected
	 * @param {Object} response Response from server.
	 */
	showResponseErrorMessage: function(response) {
		var errorMessage = response.errorInfo
			? response.errorInfo.toString()
			: response.statusText;
		this.showErrorMessage(errorMessage, {
			doCloseWindow: false
		});
	},

	/**
	 * Shows property page.
	 */
	onShowPropertyPage: function() {
		this.clearSelection();
		this.setVisiblePropertyPage(true);
		this.loadSchemaPropertiesPage();
	},

	/**
	 * Title change event process handler. Sets a new value in the process diagram.
	 * @protected
	 * @param {Object} model View model.
	 * @param {String} caption Caption.
	 */
	onSchemaCaptionChange: function(model, caption) {
		var schema = this.get("Schema");
		schema.setLocalizableStringPropertyValue("caption", caption);
		this.sandbox.publish("DiagramPageCaptionChanged", caption);
	},

	/**
	 * Opens schema metadata page, if schema is modified shows save dialog.
	 */
	onOpenMetaDataClick: function() {
		var schema = this.get("Schema");
		var template = Terrasoft.Resources.ProcessSchemaDesigner.Messages.SaveMetaDataConfirmationMessage;
		var message = Ext.String.format(template, schema.typeCaption);
		this.showSaveConfirmationDialog(message, function() {
			Terrasoft.BaseSchemaDesignerUtilities.openMetaData(schema);
		}, this);
	},

	/**
	 * Exports schema meta data.
	 */
	onExportSchemaClick: function() {
		var schema = this.get("Schema");
		var template = Terrasoft.Resources.ProcessSchemaDesigner.Messages.SaveMetaDataConfirmationMessage;
		var message = Ext.String.format(template, schema.typeCaption);
		this.showSaveConfirmationDialog(message, function() {
			this.preventSaveToStorage = true;
			Terrasoft.BaseSchemaDesignerUtilities.exportMetaData(schema);
			schema.setPropertyValue("isDelivered", true);
			this.preventSaveToStorage = false;
		}, this);
	},

	/**
	 * Clears schema items. Prepare for load new items instead of current.
	 * @abstract
	 */
	clearSchemaItems: Terrasoft.abstractFn,

	/**
	 * Selects schema item by key.
	 * @abstract
	 * @param {String} key Item key.
	 */
	selectItem: Terrasoft.abstractFn,

	/**
	 * Clears current selection.
	 * @abstract
	 */
	clearSelection: Terrasoft.abstractFn,

	/**
	 * Sets viewModel validation config.
	 * @protected
	 */
	setValidationConfig: function() {
		this.addColumnValidator("SchemaCaption", this.schemaCaptionValidator);
		this.addColumnValidator("Schema", this.validateSchema);
	},

	/**
	 * Validates BaseProcessSchemaDesignerViewModel class.
	 * @param {Function} callback Validation callback function.
	 * @param {Boolean} callback.isValid Validation result.
	 * @param {Boolean} callback.doSave Whether to save the schema.
	 * @param {Object} scope Callback function execution context.
	 */
	validateViewModel: function(callback, scope) {
		this.validateSubProcessSchema(function() {
			var isValid = this.validate();
			if (isValid) {
				callback.call(scope, isValid, true);
			} else {
				var message = this.getValidationMessage();
				this.showValidationMessage(message, function(doSave) {
					callback.call(scope, isValid, doSave);
				}, scope);
			}
		}, this);
	}

	//endregion

});
