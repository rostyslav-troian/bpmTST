Terrasoft.configuration.Structures["BaseSchemaViewModel"] = {innerHierarchyStack: ["BaseSchemaViewModel"]};
define("BaseSchemaViewModel", ["NetworkUtilities", "GoogleTagManagerUtilities", "BaseSchemaViewModelResources",
	"ModuleUtils", "HistoryStateUtilities", "RightUtilities", "TooltipUtilities", "MiniPageUtilities",
	"MultiLookupUtilitiesMixin", "LookupQuickAddMixin", "PageUtilities", "MaskHelper", "ConfigurationServiceProvider"
], function(NetworkUtilities, GoogleTagManagerUtilities, resources) {
	var localizableStrings = resources.localizableStrings;

	/**
	 * The configuration base class of the view model.
	 */
	Ext.define("Terrasoft.configuration.BaseSchemaViewModel", {
		extend: "Terrasoft.model.BaseViewModel",
		alternateClassName: "Terrasoft.BaseSchemaViewModel",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * Body mask id.
		 * @type {String}
		 */
		bodyMaskId: "",

		/**
		 * ViewModel rendering container name.
		 */
		renderTo: "",

		/**
		 * The name of the presentation model method that will be called after clicking on the Actions menu button.
		 */
		actionsClickMethodName: "onCardAction",

		/**
		 * Default module name.
		 * @private
		 */
		defaultModuleName: "BaseSchemaModuleV2",

		/**
		 * The name of the property of the column in which the event handler of the value change is set.
		 * @type {String}
		 */
		columnChangeHandlerPropertyName: "onChange",

		/**
		 * Show or hide empty model items.
		 * @protected
		 * @type {Boolean}
		 */
		hideEmptyModelItems: false,

		/**
		 * Used messages.
		 * @protected
		 */
		messages: {
			/**
			 * @message LookupInfo
			 * For the work of LookupUtilities.
			 */
			"LookupInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ResultSelectedRows
			 * For the work of LookupUtilities.
			 */
			"ResultSelectedRows": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		/**
		 *
		 */
		mixins: {
			/**
			 * Mixin, implementing work with HistoryState.
			 */
			HistoryStateUtilities: "Terrasoft.HistoryStateUtilities",

			/**
			 * Mixin implementing the basic with rights.
			 */
			RightUtilitiesMixin: "Terrasoft.RightUtilitiesMixin",

			/**
			 * Mixin, used for work with tooltips.
			 */
			TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities",

			/**
			 * Mixin, used for Mini Pages
			 */
			MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities",

			/**
			 * Mixin, used for multi lookup.
			 */
			MultiLookupUtilitiesMixin: "Terrasoft.MultiLookupUtilitiesMixin",

			/**
			 * Mixin, used for lookup quick add.
			 */
			LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin",

			/**
			 * Mixin, used for work with pages.
			 */
			PageUtilities: "Terrasoft.PageUtilities"
		},

		/**
		 * Creates an instance of the schema.
		 */
		constructor: function() {
			this.callParent(arguments);
			this.registerMessages();
		},

		/**
		 * Returns model item enabled flag.
		 * @protected
		 * @return {Boolean} Model item enabled flag.
		 */
		isModelItemEnabled: function() {
			return true;
		},

		/**
		 * Open selection page from the directory or trying to add a record.
		 * @protected
		 * @param {Object} args Params.
		 * @param {Object} columnName Column name.
		 */
		loadVocabulary: function(args, columnName) {
			var multiLookupColumns = this.getMultiLookupColumns(columnName);
			var config = (Ext.isEmpty(multiLookupColumns))
				? this.getLookupPageConfig(args, columnName)
				: this.getMultiLookupPageConfig(args, columnName);
			this.openLookup(config, this.onLookupResult, this);
		},

		/**
		 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupPageConfig
		 * @override
		 * @deprecated 7.8 Use mixin's method.
		 */
		getLookupPageConfig: function() {
			return this.mixins.LookupQuickAddMixin.getLookupPageConfig.apply(this, arguments);
		},

		/**
		 * Event of selecting values from directory.
		 * @protected
		 * @param {Object} args The result of the selection of the module directory.
		 * @param {Terrasoft.Collection} args.selectedRows Collection of selected records.
		 * @param {String} args.columnName Column name which the selection was carried out.
		 */
		onLookupResult: function(args) {
			var columnName = args.columnName;
			var selectedRows = args.selectedRows;
			if (!selectedRows.isEmpty()) {
				this.set(columnName, selectedRows.getByIndex(0));
			}
		},

		/**
		 * Initializes LookupQuickAddMixin.
		 * @protected
		 * @param {Function} next The callback function.
		 * @param {Object} scope The scope of callback.
		 */
		initLookupQuickAddMixin: function(next, scope) {
			this.mixins.LookupQuickAddMixin.init.call(this, next, scope);
		},

		/**
		 * Initialize subscribe for model attributes events.
		 * @protected
		 */
		subscribeForColumnEvents: function() {
			this.Terrasoft.each(this.columns, function(columnConfig, columnName) {
				if (columnConfig.hasOwnProperty(this.columnChangeHandlerPropertyName)) {
					var handlerName = columnConfig[this.columnChangeHandlerPropertyName];
					var handler = this[handlerName];
					this.validateHandler(handler);
					this.subscribeOnColumnChange(columnName, handler);
				}
			}, this);
		},

		/**
		 * Validates event handler.
		 * @protected
		 * @param {Function} handler event handler.
		 */
		validateHandler: function(handler) {
			if (!handler) {
				throw new Terrasoft.NullOrEmptyException();
			}
			if (!this.Ext.isFunction(handler)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
		},

		/**
		 * Initialize profile column with value in view model.
		 * @protected
		 * @param {Function} callback callback function.
		 * @param {Object} scope callback context.
		 */
		initializeProfile: function(callback, scope) {
			this.requireProfile(function(profile) {
				var profileColumnName = this.getProfileColumnName();
				this.set(profileColumnName, profile);
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * Loads current schema profile.
		 * @protected
		 * @param {Function} callback callback function.
		 * @param {Object} scope callback context.
		 * @param {String} [key] Custom profile key.
		 */
		requireProfile: function(callback, scope, key) {
			var profileKey = key || this.getProfileKey();
			this.Terrasoft.require(["profile!" + profileKey], function(profile) {
				if (this.destroyed !== true) {
					Ext.callback(callback, scope, [profile]);
				}
			}, this);
		},

		/**
		 * Add validator for specified column.
		 * @protected
		 * @param {String} columnName Column name for validation.
		 * @param {Function} validatorFn validation function.
		 */
		addColumnValidator: function(columnName, validatorFn) {
			var config = this.validationConfig[columnName] = this.validationConfig[columnName] || [];
			config.push(validatorFn);
		},

		/**
		 * Validate column by length.
		 * @protected
		 * @param {String} value Value for validate.
		 * @param {Object} column Model column.
		 * @return {Object} Validate response.
		 */
		columnLengthValidator: function(value, column) {
			if (!Ext.isEmpty(value)) {
				var maxLength = column.size;
				if (value.length > maxLength) {
					var message = localizableStrings.WrongCaptionLengthMessage;
					return {
						invalidMessage: Ext.String.format(message, maxLength)
					};
				}
			}
			return {};
		},

		/**
		 * Initialize user validators.
		 * @protected
		 */
		setValidationConfig: Terrasoft.emptyFn,

		/**
		 * Returns a ViewModel container ID.
		 * @protected
		 * @virtual
		 * @return {String} ViewModel container ID.
		 */
		getSchemaViewModelContainerId: Terrasoft.emptyFn,

		/**
		 * Calls when restoring module.
		 * @protected
		 * @param {Function} callback Callback to call.
		 * @param {Object} scope Scope to invoke callback with.
		 */
		initOnRestored: function(callback, scope) {
			Ext.callback(callback, scope);
		},

		/**
		 * Returns profile key.
		 * @return {string} Profile key.
		 */
		getProfileKey: function() {
			return "";
		},

		/**
		 * Sets body attribute 'custom-mask' with specified value.
		 * @private
		 * @param {String} value Value of the body attribute.
		 */
		_setCustomMaskBodyAttribute: function(value) {
			Terrasoft.utils.dom.setAttributeToBody("custom-mask", value);
		},

		/**
		 * Shows mask.
		 * @protected
		 * @param {Object} config Params for showing mask.
		 */
		showBodyMask: function(config) {
			if (config && config.isCustomMask === true) {
				this._setCustomMaskBodyAttribute("visible");
			}
			return Terrasoft.MaskHelper.showBodyMask(config);
		},

		/**
		 * Removes mask by mask identifier.
		 * @protected
		 * @param {Object} config Mask config.
		 */
		hideBodyMask: function(config) {
			if (config && config.isCustomMask === true) {
				this._setCustomMaskBodyAttribute("none");
			}
			Terrasoft.MaskHelper.hideBodyMask(config);
		},

		/**
		 * Updates body mask caption.
		 * @protected
		 * @param {Object} config Mask config.
		 */
		updateBodyMaskCaption: function(config) {
			if (config && config.maskId && config.caption) {
				Terrasoft.MaskHelper.updateBodyMaskCaption(config.maskId, config.caption);
			}
		},

		/**
		 * Returns current schema edit pages from Terrasoft.configuration.EntityStructure by entitySchemaName.
		 * @return {Terrasoft.BaseViewModelCollection}
		 */
		getEditPagesCollection: function() {
			return this.getEditPagesCollectionByName(this.entitySchemaName);
		},

		/**
		 * Returns current schema edit pages from Terrasoft.configuration.EntityStructure by entitySchemaName.
		 * @param {String} entitySchemaName Name of the entity to get edit pages for.
		 * @return {Terrasoft.BaseViewModelCollection}
		 */
		getEditPagesCollectionByName: function(entitySchemaName) {
			const structure = this.getEntityStructure(entitySchemaName);
			if (!structure || Ext.isEmpty(structure.pages)) {
				return new Terrasoft.BaseViewModelCollection();
			}
			const pages = Terrasoft.ModuleUtils.getPages(structure);
			var collection = new Terrasoft.BaseViewModelCollection();
			Terrasoft.each(pages, function(editPage) {
				const typeUId = editPage.UId || Terrasoft.GUID_EMPTY;
				if (collection.contains(typeUId)) {
					const messageTemplate = resources.localizableStrings.DuplicateEditPageMessageTemplate;
					const message = Ext.String.format(messageTemplate, typeUId);
					this.log(message, Terrasoft.LogMessageType.WARNING);
					return;
				}
				const miniPageModes = editPage.miniPageModes && editPage.miniPageModes.split(";");
				const pageItem = new Terrasoft.BaseViewModel({
					values: {
						Id: typeUId,
						Caption: editPage.caption,
						Click: {bindTo: "addRecord"},
						Tag: typeUId,
						MiniPage: {
							schemaName: editPage.miniPageSchema,
							hasAddMiniPage: editPage.hasAddMiniPage,
							miniPageModes: miniPageModes
						},
						SchemaName: editPage.cardSchema
					}
				});
				collection.add(typeUId, pageItem);
			}, this);
			return collection;
		},

		/**
		 * Add to cache (attribute EditPages) current schema edit pages.
		 * @protected
		 */
		initEditPages: function() {
			var collection = this.getEditPagesCollection();
			this.set("EditPages", collection);
		},

		/**
		 * Returns cached value current schema edit pages. Init edit pages if cache is empty
		 * @protected
		 * @return {Terrasoft.BaseViewModelCollection}
		 */
		getEditPages: function() {
			if (!this.get("EditPages")) {
				this.initEditPages();
			}
			return this.get("EditPages");
		},

		/**
		 * Checks if current schema has edit pages.
		 * @protected
		 * @return {Terrasoft.BaseViewModel | null} Edit pages for current entity schema.
		 */
		hasEditPages: function() {
			var editPages = this.getEditPages();
			if (editPages.getCount() > 1) {
				return editPages;
			}
			return null;
		},

		/**
		 * Clears the values of the columns of the schema by setting null. Clears the parameter of changed values.
		 * @protected
		 */
		clearEntity: function() {
			Terrasoft.each(this.columns, function(column, columnName) {
				if ((column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) && !column.isCollection) {
					this.setColumnValue(columnName, null, {preventValidation: true});
				}
			}, this);
			this.changedValues = {};
		},

		/**
		 * Initializes the column of the schema responsible for storing the name of the type column.
		 * @protected
		 */
		initTypeColumnName: function() {
			var typeColumnName = null;
			var entityStructure = this.getEntityStructure(this.entitySchemaName);
			if (entityStructure) {
				Terrasoft.each(entityStructure.pages, function(editPage) {
					if (editPage.typeColumnName) {
						typeColumnName = editPage.typeColumnName;
					}
					return false;
				}, this);
			}
			this.set("TypeColumnName", typeColumnName);
		},

		/**
		 * Gets the name of the entity edit page.
		 * @param {String} typeUId The value of the type column.
		 * @return {String} Returns the name of the entity edit page.
		 */
		getEditPageSchemaName: function(typeUId) {
			var editPages = this.get("EditPages");
			var editPage = null;
			if (editPages.contains(typeUId)) {
				editPage = editPages.get(typeUId);
				return editPage.get("SchemaName");
			}
			if (this.getPagesItems()) {
				var items = this.getPagesItems();
				var id = items.length > 0 ? items[0].get("Id") : null;
				editPage = editPages.get(id);
				return editPage.get("SchemaName");
			}
			var editPageNotFoundExceptionMessage = resources.localizableStrings.EditPageNotFoundExceptionMessage;
			throw new Terrasoft.ItemNotFoundException({message: editPageNotFoundExceptionMessage});
		},

		/**
		 * Return edit pages.
		 * @return {Array} Edit pages.
		 */
		getPagesItems: function() {
			var editPages = this.get("EditPages");
			return editPages.collection && editPages.collection.items;
		},

		/**
		 * The method returns an object by its name.
		 * @param {String} entitySchemaName The name of the object.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		getEntitySchemaByName: function(entitySchemaName, callback, scope) {
			scope = scope || this;
			this.sandbox.requireModuleDescriptors(["force!" + entitySchemaName], function() {
				Terrasoft.require([entitySchemaName], callback, scope);
			}, scope);
		},

		/**
		 * Returns entity schema by name from the server.
		 * @param {String} entitySchemaName Entity schema name.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		forceGetEntitySchemaByName: function(entitySchemaName, callback, scope) {
			require.undef(entitySchemaName);
			this.getEntitySchemaByName(entitySchemaName, callback, scope);
		},
		/**
		 * Extends the configuration of the module messages, messages described in the diagram.
		 * @protected
		 */
		registerMessages: function() {
			this.sandbox.registerMessages(this.messages);
		},

		/**
		 * Opens the directory in the modal window.
		 * @protected
		 * @param {Object} config The configuration of the lookup.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		openLookup: function(config, callback, scope) {
			Terrasoft.LookupUtilities.open({
				"lookupConfig": config,
				"sandbox": this.sandbox,
				"keepAlive": config.keepAlive,
				"lookupModuleId": config.lookupModuleId,
				"lookupPageName": config.lookupPageName
			}, callback, scope);
		},

		/**
		 * Returns type column value.
		 */
		getTypeColumnValue: function(row) {
			var typeColumnValue;
			var typeColumnName = this.get("TypeColumnName");
			if (typeColumnName) {
				typeColumnValue = (row.get(typeColumnName) && row.get(typeColumnName).value);
			}
			return typeColumnValue || this.Terrasoft.GUID_EMPTY;
		},

		/**
		 * The method calls the web service method with the specified parameters.
		 * @deprecated
		 * @param {Object} config An object that contains the service name, method name, data.
		 * @param {Object} config.data Data of the query.
		 * @param {Boolean} config.encodeData A sign that you need to convert the data into Json.
		 * @param {String} config.serviceName Service name.
		 * @param {String} config.methodName Method name of the call service.
		 * @param {Number} config.timeout Query timeout.
		 * @param {Function} callback The callback function.
		 * @param {Object} callback.responseObject The request object.
		 * @param {Object} callback.response Server response.
		 * @param {Object} scope The scope of callback function.
		 */
		callService: function(config, callback, scope) {
			return Terrasoft.ConfigurationServiceProvider.callService.call(this, config, callback, scope);
		},

		/**
		 * Gets the icon configuration of the "Close" button.
		 * @return {Object}
		 */
		getCloseButtonImageConfig: function() {
			return this.getResourceImageConfig("Resources.Images.CloseButtonImage");
		},

		/**
		 * Gets the icon configuration of the Back button.
		 * @return {Object}
		 */
		getBackButtonImageConfig: function() {
			return this.getResourceImageConfig("Resources.Images.BackButtonImage");
		},

		/**
		 * Gets the icon configuration of the "Settings" button in the selected registry line.
		 * @return {Object}
		 */
		getActiveRowSettingsButtonImageConfig: function() {
			return this.getResourceImageConfig("Resources.Images.SettingsButtonImage");
		},

		/**
		 * Generates a link configuration for an image in resources.
		 * @param {String} resourceName Resource name
		 * @return {Object}
		 */
		getResourceImageConfig: function(resourceName) {
			return {
				source: this.Terrasoft.ImageSources.URL,
				url: this.Terrasoft.ImageUrlBuilder.getUrl(this.get(resourceName))
			};
		},

		/**
		 * Adds a sub-query that calculates the number of active entry points by process.
		 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query object.
		 */
		addProcessEntryPointColumn: function(esq) {
			var expressionConfig = {
				columnPath: "[EntryPoint:EntityId].Id",
				parentCollection: this,
				aggregationType: Terrasoft.AggregationType.COUNT
			};
			var column = Ext.create("Terrasoft.SubQueryExpression", expressionConfig);
			var filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "IsActive", true);
			column.subFilters.addItem(filter);
			var esqColumn = esq.addColumn("EntryPointsCount");
			esqColumn.expression = column;
		},

		/**
		 * @deprecated
		 */
		startSectionDesigner: function() {
			window.console.log("Method startSectionDesigner is deprecated");
		},

		/**
		 * @obsolete
		 */
		getActionsMenuItem: function(config) {
			var message = this.Ext.String.format(this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"getActionsMenuItem", "getButtonMenuItem");
			var schemaName = this.name;
			if (schemaName) {
				message = schemaName + ": " + message;
			}
			this.log(message, this.Terrasoft.LogMessageType.WARNING);
			return this.getButtonMenuItem(config);
		},

		/**
		 * Creates an instance of the drop-down menu button.
		 * @param {Object} config Default menu item config.
		 * @return {Terrasoft.BaseViewModel}
		 */
		getButtonMenuItem: function(config) {
			return Ext.create("Terrasoft.BaseViewModel", {
				values: Ext.apply({}, config, {
					Id: Terrasoft.generateGUID(),
					Caption: "",
					Click: (config.Type === "Terrasoft.MenuSeparator") ? null : {bindTo: this.actionsClickMethodName},
					MarkerValue: config.Caption
				})
			});
		},

		/**
		 * Creates an instance of the separator of the drop-down menu of the button.
		 * @param {Object} config Default menu item config.
		 * @return {Terrasoft.BaseViewModel}
		 */
		getButtonMenuSeparator: function(config) {
			return this.Ext.create("Terrasoft.BaseViewModel", {
				values: this.Ext.apply({}, config, {
					Id: this.Terrasoft.generateGUID(),
					Caption: "",
					Type: "Terrasoft.MenuSeparator"
				})
			});
		},

		/**
		 * Handles the folding or unfolding of the part.
		 * @protected
		 * @param {Boolean} isCollapsed The value of the component's curvature.
		 * @param {String} controlId The identifier of the control in which the part is loaded.
		 */
		onCollapsedChanged: function(isCollapsed, controlId) {
			var profile = this.getProfile();
			var profileKey = this.getProfileKey();
			if (this.Terrasoft.isEmptyObject(profile)) {
				profile = {key: profileKey};
				this.set("Profile", profile);
			}
			var profileControlGroups = profile.controlGroups = profile.controlGroups || {};
			profileControlGroups[controlId] = {isCollapsed: isCollapsed};
			this.Terrasoft.utils.saveUserProfile(profileKey, profile, false);
		},

		/**
		 * Returns the profile of the current schema.
		 * @return {Object}
		 */
		getProfile: function() {
			var profileColumnName = this.getProfileColumnName();
			return this.get(profileColumnName);
		},

		/**
		 * Returns the name of the column in which the profile of the current schema is stored.
		 * @return {Object}
		 */
		getProfileColumnName: function() {
			return "Profile";
		},

		/**
		 * The handler for clicking on the header of the logical column.
		 * @protected
		 */
		invertColumnValue: function(columnName) {
			if (columnName) {
				var currentValue = this.get(columnName);
				this.set(columnName, !currentValue);
			}
		},

		/**
		 * Event of focusing editing element.
		 * @protected
		 */
		onItemFocused: function() {
			this.set("ShowSaveButton", true);
			this.set("ShowDiscardButton", true);
			this.set("IsChanged", true, {silent: true});
		},

		/**
		 * @inheritdoc Terrasoft.core.BaseObject#destroy
		 * @override
		 */
		destroy: function() {
			this.unsubscribeForColumnEvents();
			if (this.messages) {
				var messages = this.Terrasoft.keys(this.messages);
				this.sandbox.unRegisterMessages(messages);
			}
			this.callParent(arguments);
		},

		/**
		 * Unsubscribe handlers from event model attributes.
		 * @protected
		 */
		unsubscribeForColumnEvents: function() {
			this.Terrasoft.each(this.columns, function(columnConfig, columnName) {
				if (columnConfig.hasOwnProperty(this.columnChangeHandlerPropertyName)) {
					var handlerName = columnConfig[this.columnChangeHandlerPropertyName];
					var handler = this[handlerName];
					this.validateHandler(handler);
					this.unsubscribeOnColumnChange(columnName, handler);
				}
			}, this);
		},

		/**
		 * Returns module structure section code.
		 * @protected
		 * @return {String}
		 */
		getSectionCode: function() {
			return this.entitySchemaName;
		},

		/**
		 * Returns section structure.
		 * @protected
		 * @param {String} moduleName Object name.
		 * @return {Object} Section structure.
		 */
		getModuleStructure: function(moduleName) {
			moduleName = moduleName || this.getSectionCode();
			return Terrasoft.ModuleUtils.getModuleStructureByName(moduleName);
		},

		/**
		 * Returns information about the schema of the data object for the current entity.
		 * @protected
		 * @param {String} entitySchemaName Entity schema name.
		 * @return {Object}
		 */
		getEntityStructure: function(entitySchemaName) {
			entitySchemaName = entitySchemaName || this.getSectionCode();
			return Terrasoft.ModuleUtils.getEntityStructureByName(entitySchemaName);
		},

		/**
		 * Get link url.
		 * @protected
		 * @param {String} columnName Column name.
		 * @return {Object}
		 */
		getLinkUrl: function(columnName) {
			this.updateColumnReferenceSchemaByMultiLookupValue(columnName);
			var column = this.getColumnByName(columnName);
			var columnValue = this.get(columnName);
			if (!column) {
				return {};
			}
			var referenceSchemaName = column.referenceSchemaName;
			var entitySchemaConfig = this.getModuleStructure(referenceSchemaName);
			if (columnValue && entitySchemaConfig) {
				var typeAttr = NetworkUtilities.getTypeColumn(referenceSchemaName);
				var typeUId;
				if (typeAttr && columnValue[typeAttr.path]) {
					typeUId = columnValue[typeAttr.path].value;
				}
				var url = NetworkUtilities.getEntityUrl(referenceSchemaName, columnValue.value, typeUId);
				return {
					url: "ViewModule.aspx#" + url,
					caption: columnValue.displayValue
				};
			}
			return {};
		},

		/**
		 * Element link click event handler.
		 * @param {String} url Hyperlink.
		 * @param {String} columnName Column name.
		 * @return {Boolean} The sign - to cancel or not the DOM link click event handler.
		 */
		onLinkClick: function(url, columnName) {
			var config = this.getLinkConfig(columnName);
			if (config.isSimpleUrl) {
				return true;
			}
			this.openCardInChain(config);
			return false;
		},

		/**
		 * Gets link config for open card.
		 * @protected
		 * @param {String} columnName Column name.
		 * @return {Object} Link config for open card.
		 */
		getLinkConfig: function(columnName) {
			var column = this.getColumnByName(columnName);
			var columnValue = this.get(columnName);
			if (!column) {
				return {isSimpleUrl: true};
			}
			var entitySchemaName = column.referenceSchemaName;
			var cardSchema = column.cardSchemaName || this.getCardSchemaName(entitySchemaName, columnName);
			return {
				schemaName: cardSchema,
				id: columnValue.value,
				operation: Terrasoft.ConfigurationEnums.CardOperation.EDIT,
				renderTo: "centerPanel",
				isLinkClick: true
			};
		},

		/**
		 * Event of changing value in LookupEdit.
		 */
		onLookupChange: function(newValue, columnName) {
			this.mixins.LookupQuickAddMixin.onLookupChange.call(this, newValue, columnName);
		},

		/**
		 * Opens card in chain.
		 * @protected
		 * @param {Object} config Card configuration information
		 */
		openCardInChain: function(config) {
			this.showBodyMask();
			var historyState = this.sandbox.publish("GetHistoryState");
			var stateObj = config.stateObj || {
				isSeparateMode: config.isSeparateMode || true,
				schemaName: config.schemaName,
				entitySchemaName: config.entitySchemaName,
				operation: config.action || config.operation,
				primaryColumnValue: config.id,
				valuePairs: config.defaultValues,
				isInChain: true
			};
			this.sandbox.publish("PushHistoryState", {
				hash: historyState.hash.historyState,
				silent: config.silent,
				stateObj: stateObj
			});
			var moduleName = config.moduleName || "CardModuleV2";
			var moduleParams = {
				renderTo: config.renderTo || this.renderTo,
				id: config.moduleId,
				keepAlive: (config.keepAlive !== false)
			};
			var instanceConfig = config.instanceConfig;
			if (instanceConfig) {
				this.Ext.apply(moduleParams, {
					instanceConfig: instanceConfig
				});
			}
			this.sandbox.loadModule(moduleName, moduleParams);
		},

		/**
		 * Gets Google tag manager data.
		 * @protected
		 * @return {Object}
		 */
		getGoogleTagManagerData: function() {
			var sandbox = this.sandbox;
			return {
				virtualUrl: this.Terrasoft.workspaceBaseUrl + "/" + sandbox.id,
				schemaName: this.name,
				moduleName: sandbox.moduleName
			};
		},

		/**
		 * Initializes Google tag manager.
		 * @protected
		 * @param {Function} callback Callback.
		 * @param {Object} scope Callback execution scope.
		 */
		initGoogleTagManager: function(callback, scope) {
			if (Terrasoft.isCurrentUserSsp()) {
				this.set("IsGoogleTagManagerEnabled", false);
				Ext.callback(callback, scope, [false]);
			} else {
				Terrasoft.SysSettings.querySysSettings(["UseGoogleTagManager"], function(settings) {
					const useGoogleTagManager = settings.UseGoogleTagManager;
					this.set("IsGoogleTagManagerEnabled", useGoogleTagManager);
					Ext.callback(callback, scope, [useGoogleTagManager]);
				}, this);
			}
		},

		/**
		 * Sends Google tag manager data.
		 * @protected
		 */
		sendGoogleTagManagerData: function() {
			var isGoogleTagManagerEnabled = this.get("IsGoogleTagManagerEnabled");
			if (!isGoogleTagManagerEnabled) {
				return;
			}
			var data = this.getGoogleTagManagerData();
			GoogleTagManagerUtilities.actionModule(data);
		},

		/**
		 * Loads module.
		 * @param {Object} config Module config.
		 * @param {String} config.moduleName Name of module to load.
		 * @param {String} config.containerId Container id for render module.
		 * @param {String} config.moduleId (optional) Module id.
		 * @param {Object} config.instanceConfig (optional) Module instance config arguments.
		 * @param {String} [config.name] Module name.
		 */
		loadModule: function(config) {
			var moduleConfig = this.getModuleConfig(config);
			if (!moduleConfig) {
				return;
			}
			var moduleName = moduleConfig.moduleName || this.defaultModuleName;
			var moduleId = moduleConfig.moduleId || this.getModuleId(moduleConfig.moduleName || config.name);
			var moduleParams = {
				renderTo: config.containerId,
				id: moduleId
			};
			if (Ext.isDefined(moduleConfig.reload)) {
				moduleParams.reload = moduleConfig.reload;
			}
			var instanceConfig = this.getModuleInstanceConfig(moduleConfig);
			if (instanceConfig) {
				this.Ext.apply(moduleParams, {
					instanceConfig: instanceConfig
				});
			}
			this.sandbox.loadModule(moduleName, moduleParams);
		},

		/**
		 * Returns module instance config.
		 * @protected
		 * @param {Object} moduleConfig Load module config.
		 * @return {Object} Module instance config.
		 */
		getModuleInstanceConfig: function(moduleConfig) {
			var config = Terrasoft.deepClone(moduleConfig.config || moduleConfig.instanceConfig);
			this._applyViewModelValues(config);
			return config;
		},

		/**
		 * Returns module Id.
		 * @param {String} moduleName Module name.
		 * @return {string} Module id.
		 */
		getModuleId: function(moduleName) {
			return this.sandbox.id + "_module_" + moduleName;
		},

		/**
		 * Returns feature enabled state.
		 * @param {String} code Feature code.
		 * @return {Boolean} Is feature enabled.
		 */
		getIsFeatureEnabled: function(code) {
			return Terrasoft.Features.getIsEnabled(code);
		},

		/**
		 * Returns feature disabled state.
		 * @param {String} code Feature code.
		 * @return {Boolean} Is feature enabled.
		 */
		getIsFeatureDisabled: function(code) {
			return !this.getIsFeatureEnabled(code);
		},

		/**
		 * Performs actions that are required after view was rendered.
		 */
		onRender: Terrasoft.emptyFn,

		/**
		 * Returns true if the passed value is empty, false otherwise.
		 * @protected
		 * @param {Mixed} value Expected value.
		 * @return {Boolean} Check value is empty.
		 */
		isEmpty: function(value) {
			if (Ext.isEmpty(value)) {
				return true;
			}
			if (Ext.isObject(value)) {
				return Ext.Object.isEmpty(value);
			}
			return false;
		},

		/**
		 * Returns true if the passed value is not empty, false otherwise.
		 * @protected
		 * @param {Mixed} value Expected value.
		 * @return {Boolean} Check value is not empty.
		 */
		isNotEmpty: function(value) {
			return !this.isEmpty(value);
		},

		// region Methods: Private

		/**
		 * Returns module config.
		 * @private
		 * @param {Object} config Configuration object.
		 * @return {Object}
		 */
		getModuleConfig: function(config) {
			var moduleConfig = config;
			if (this.Ext.isEmpty(config.moduleName)) {
				moduleConfig = this.modules[config.name];
				if (moduleConfig && moduleConfig.hasOwnProperty("alias")) {
					moduleConfig = this.modules[moduleConfig.alias];
				}
			}
			return moduleConfig;
		},

		/**
		 * Applies view model method value.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {String} key Key.
		 * @param {String} value Value.
		 * @return {Boolean}
		 */
		_applyMethodValue: function(config, key, value) {
			var isValueApplied = false;
			var methodName = value.getValueMethod;
			if (methodName && Ext.isFunction(this[methodName])) {
				var getValueMethod = this[methodName];
				config[key] = getValueMethod.call(this);
				isValueApplied = true;
			}
			return isValueApplied;
		},

		/**
		 * Applies view model attribute value.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {String} key Key.
		 * @param {String} value Value.
		 * @return {Boolean}
		 */
		_applyAttributeValue: function(config, key, value) {
			var isValueApplied = false;
			var attributeName = value.attributeValue;
			if (attributeName && this.hasAttribute(attributeName)) {
				config[key] = this.get(attributeName);
				isValueApplied = true;
			}
			return isValueApplied;
		},

		/**
		 * Applies view model property value.
		 * @private
		 * @param {Object} config Configuration object.
		 * @param {String} key Key.
		 * @param {String} value Value.
		 * @return {Boolean}
		 */
		_applyPropertyValue: function(config, key, value) {
			var isValueApplied = false;
			var propertyName = value.propertyValue;
			if (propertyName && Ext.isDefined(this[propertyName])) {
				config[key] = this[propertyName];
				isValueApplied = true;
			}
			return isValueApplied;
		},

		/**
		 * Applies view model values.
		 * @private
		 * @param {Object} config Configuration object.
		 */
		_applyViewModelValues: function(config) {
			Terrasoft.each(config, function(value, key) {
				var isValueApplied = this._applyMethodValue(config, key, value) ||
					this._applyAttributeValue(config, key, value) ||
					this._applyPropertyValue(config, key, value);
				if (!isValueApplied && Ext.isObject(config[key])) {
					this._applyViewModelValues(config[key]);
				}
			}, this);
		},

		/**
		 * Returns array of modules ids.
		 * @private
		 * @return {String[]} Array of modules ids.
		 */
		getModuleIds: function() {
			var moduleNames = this.Ext.Object.getKeys(this.modules);
			var modulesIds = [];
			Terrasoft.each(this.modules, function(module) {
				if (module.moduleId) {
					modulesIds.push(module.moduleId);
				}
			}, this);
			return moduleNames.map(this.getModuleId, this).concat(modulesIds);
		},

		//endregion

		// region Methods: Public

		/**
		 * Initializes the view model.
		 * @public
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback.
		 */
		init: function(callback, scope) {
			Terrasoft.chain(
				this.initializeProfile,
				this.initGoogleTagManager,
				function() {
					this.initLookupQuickAddMixin();
					this.initTypeColumnName();
					this.setValidationConfig();
					this.subscribeForColumnEvents();
					this.sendGoogleTagManagerData();
					Ext.callback(callback, scope);
				}, this);
		}

		//endregion
	});

	return Terrasoft.BaseSchemaViewModel;
});


