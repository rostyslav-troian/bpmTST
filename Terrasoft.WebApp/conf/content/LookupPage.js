Terrasoft.configuration.Structures["LookupPage"] = {innerHierarchyStack: ["LookupPage"]};
define("LookupPage", ["MaskHelper", "LookupPageViewGenerator", "LookupPageViewModelGenerator", "ColumnUtilities",
		"LookupPageViewModel", "css!LookupPageCSS"],
	function(MaskHelper, LookupPageViewGenerator, LookupPageViewModelGenerator) {

		return Ext.define("Terrasoft.configuration.LookupPage", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.LookupPage",

			Ext: null,

			sandbox: null,

			Terrasoft: null,

			/**
			 * ####### ####, ### ###### ############### ##########
			 * @private
			 * @type {Boolean}
			 */
			isAsync: true,

			/**
			 * ###### Lookup-#
			 * @private
			 * @type {Object}
			 */
			lookupInfo: null,

			/**
			 * ###### ## ViewModel LookupPage-#
			 * ################ ##### ##########
			 * @private
			 * @type {Object}
			 */
			viewModel: null,

			/**
			 * ###### ## ######### # ####### ##### ######### ModalBox.
			 * ################ ##### ##########
			 * @private
			 * @type {Object}
			 */
			renderContainer: null,

			/**
			 * ####, ####### ##### ######## #### ###### ### ######### ## CardProcessModule.
			 * @private
			 * @type {Boolean}
			 */
			processModuleFlag: false,

			/**
			 * @property {Object} parameters #########, ############ ### ######## ######.
			 * @property {Number} parameters.index ###### ######## ################# #######, ####### ##########
			 * ############ ### #### ###### ## ###########. ############ # ### ###### ######## ### #################
			 * ####.
			 * @type {Object}
			 */
			parameters: null,

			/**
			 * ####### ######### #####.
			 */
			constructor: function() {
				this.callParent(arguments);
				var sandbox = this.sandbox;
				sandbox.registerMessages({
					"LookupInfo": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"ResultSelectedRows": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"GetHistoryState": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"ReplaceHistoryState": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.BROADCAST
					},
					"BackHistoryState": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.BROADCAST
					},
					"PushHistoryState": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.BROADCAST
					},
					"CardModuleEntityInfo": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"MacrosInfo": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"GridSettingsInfo": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"GridSettingsChanged": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"CardProccessModuleInfo": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"CardModuleResponse": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"OpenCard": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"getCardInfo": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"GetGridSettingsInfo": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"UpdateDetail": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.PTP
					},
					"GetLookupRenderConfig": {
						"direction": Terrasoft.MessageDirectionType.PUBLISH,
						"mode": Terrasoft.MessageMode.PTP
					},
					"HistoryStateChanged": {
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
						"mode": Terrasoft.MessageMode.BROADCAST
					}
				});
			},

			/**
			 * ########## ##### ############ ###########.
			 * @protected
			 * @virtual
			 * @return {Object} ##### ############ ###########.
			 */
			getLookupInfo: function() {
				return this.sandbox.publish("LookupInfo", null, [this.sandbox.id]);
			},

			/**
			 * ############# ######### ######## ######,
			 * # ########### ## ########## ########## ######### 'CardProccessModuleInfo'
			 * ###### ################ ### ###### # ######### #### ### # centerPanel.
			 * @private
			 */
			init: function(callback, scope) {
				if (this.viewModel) {
					Ext.callback(callback, scope);
					return;
				}
				const lookupInfo = this.getLookupInfo();
				if (this.Ext.isArray(lookupInfo)) {
					let configIndex = 0;
					const parameters = this.parameters;
					if (!this.Ext.isEmpty(parameters)) {
						configIndex = parameters.index;
					}
					this.lookupInfo = lookupInfo[configIndex];
					this.lookupsInfo = lookupInfo;
				} else {
					this.lookupInfo = lookupInfo;
				}
				this.processModuleFlag = this.sandbox.publish("CardProccessModuleInfo", null, [this.sandbox.id]);
				this.initHistoryState();
				this.requireModuleDescriptors()
					.then(function() {
						return this.requireProfile(this.lookupInfo.lookupPostfix);
					}.bind(this))
					.then(function(config) {
						const entitySchema = config.entitySchema;
						const profile = config.profile;
						const fixedProfile = config.fixedProfile;
						const lookupInfo = this.lookupInfo;
						if (this.isDestroyed) {
							return;
						}
						const primaryDisplayColumn = entitySchema.primaryDisplayColumn;
						if (primaryDisplayColumn) {
							lookupInfo.searchColumn = {
								value: primaryDisplayColumn.name,
								displayValue: primaryDisplayColumn.caption
							};
						}
						lookupInfo.entitySchema = entitySchema;
						lookupInfo.gridProfile = fixedProfile;
						const viewModel = this.viewModel = this.generateViewModel();
						viewModel.lookupInfo = lookupInfo;
						viewModel.set("Profile", profile);
						viewModel.load(fixedProfile, callback, scope);
					}.bind(this));
			},

			/**
			 * @deprecated
			 * @private
			 * @param {String} lookupPostfix
			 * @param {Function} callback
			 */
			getSchemaAndProfile: function(lookupPostfix, callback) {
				this.requireModuleDescriptors()
					.then(function() {
						return this.requireProfile(this.lookupInfo.lookupPostfix);
					}.bind(this))
					.then(function(config) {
						Ext.callback(callback, this, [config.entitySchema, config.fixedProfile]);
					}.bind(this));
			},

			/**
			 * @protected
			 * @return {Promise<any>}
			 */
			requireModuleDescriptors: function() {
				return new Promise(function(resolve) {
					this.sandbox.requireModuleDescriptors([this.lookupInfo.entitySchemaName], resolve, this);
				}.bind(this));
			},

			/**
			 * @protected
			 * @return {Promise<{entitySchema: Object, profile: Object, fixedProfile: Object}>}
			 */
			requireProfile: function(lookupPostfix) {
				return new Promise(function(resolve) {
					lookupPostfix = this.Ext.isEmpty(lookupPostfix) ? Terrasoft.emptyString : lookupPostfix;
					const entitySchemaName = this.lookupInfo.entitySchemaName;
					const columnsSettingsProfileKey = Ext.String.format("GridSettings_{0}", entitySchemaName);
					let profileKey = Ext.String.format("profile!{0}{1}", columnsSettingsProfileKey, lookupPostfix);
					require([entitySchemaName, profileKey], function(entitySchema, profile) {
						const fixedProfile = this.actualizeProfile(entitySchema, profile);
						resolve({
							entitySchema: entitySchema,
							profile: profile,
							fixedProfile: fixedProfile
						});
					}.bind(this));
				}.bind(this));
			},

			/**
			 * ######### ######### ###### # #########.
			 * @protected
			 * @param {Object} renderTo ######### # ####### ##### ######### ######.
			 */
			render: function(renderTo) {
				this.renderContainer = renderTo.id;
				this.renderLookupView(this.lookupInfo.entitySchema, this.lookupInfo.gridProfile);
			},

			/**
			 * Renders lookup top panel and grid.
			 * @protected
			 * @param {Object} config Lookup config.
			 * @param {Object} topPanelConfig top panel lookpu config.
			 */
			renderLookupControls: function(config, topPanelConfig) {
				var fixedView = this.Ext.create(topPanelConfig.className || "Terrasoft.Container", topPanelConfig);
				fixedView.bind(this.viewModel);
				var renderTo = this.lookupInfo.fixedHeaderContainer ||
						Terrasoft.LookupUtilities.getFixedHeaderContainer();
				if (!renderTo) {
					Terrasoft.LookupUtilities.prepareModalBox();
					renderTo = Terrasoft.LookupUtilities.getFixedHeaderContainer();
				}
				fixedView.render(renderTo);
				var gridViewConfig = LookupPageViewGenerator.generateGrid(config);
				var gridView = this.Ext.create(gridViewConfig.className || "Terrasoft.Container", gridViewConfig);
				gridView.bind(this.viewModel);
				gridView.render(this.lookupInfo.gridContainer ||
					Terrasoft.LookupUtilities.getGridContainer());
				if (this.processModuleFlag) {
					this.loadCommandLine();
				}
				MaskHelper.HideBodyMask();
			},

			/**
			 * ########## ################ ###### ########## ###########.
			 * @protected
			 * @param {Terrasoft.EntitySchema} schema ##### #######.
			 * @param {Object} profile ######### #######.
			 * @return {Object} ################ ###### ########## ###########.
			 */
			getLookupConfig: function(schema, profile) {
				var config = {};
				config.actionsMenuConfig = LookupPageViewGenerator.getActionsMenuConfig(schema.name);
				config.captionConfig = schema.columns[schema.primaryDisplayColumnName].caption;
				config.entitySchema = schema;
				config.isRunProcessPage = this.lookupInfo.isRunProcessPage;
				config.columnsSettingsProfile = profile;
				this.Ext.apply(config, this.lookupInfo);
				return config;
			},

			/**
			 * ######### ######### ########### # ############ ## ###### # ########## #######.
			 * ### ######### ############## ## ### ####, ### ############ # modalBox.
			 * @protected
			 * @param {Terrasoft.EntitySchema} schema ##### #######.
			 * @param {Object} profile ######### #######.
			 */
			renderLookupView: function(schema, profile) {
				var config = this.getLookupConfig(schema, profile);
				var topPanelConfig = LookupPageViewGenerator.generateFixed(config);
				this.renderLookupControls(config, topPanelConfig);
			},

			generateViewModel: function() {
				var viewModelConfig = LookupPageViewModelGenerator.generate(this.lookupInfo);
				if (!this.lookupInfo.columnValue && this.lookupInfo.searchValue) {
					viewModelConfig.values.searchData = this.lookupInfo.searchValue;
					viewModelConfig.values.previousSearchData = this.lookupInfo.searchValue;
				}
				var viewModel = this.Ext.create("Terrasoft.LookupPageViewModel", viewModelConfig);
				viewModel.Ext = this.Ext;
				viewModel.sandbox = this.sandbox;
				viewModel.Terrasoft = this.Terrasoft;
				if (this.lookupInfo.updateViewModel) {
					this.lookupInfo.updateViewModel.call(viewModel);
				}
				viewModel.initCaptionLookup();
				viewModel.initHasActions();
				viewModel.initLoadedColumns();
				if (!this.Ext.isEmpty(this.lookupInfo.filterObjectPath)) {
					viewModel.updateFilterByFilterObjectPath(this.lookupInfo.filters, this.lookupInfo.filterObjectPath);
				}
				if (this.lookupInfo.hideActions) {
					viewModel.set("hasActions", false);
				}
				return viewModel;
			},

			initHistoryState: function() {
				if (!this.processModuleFlag) {
					return;
				}
				var state = this.sandbox.publish("GetHistoryState");
				var currentHash = state.hash;
				var currentState = state.state || {};
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
			},

			/**
			 * ############# ##### ## ###### ###### ##### #########
			 * @private
			 */
			loadCommandLine: function() {
				var commandLineContainer = this.Ext.get("module-command-line");
				if (!this.lookupInfo.commandLineEnabled || this.Ext.isEmpty(commandLineContainer)) {
					return;
				}
				this.sandbox.loadModule("CommandLineModule", {
					renderTo: commandLineContainer
				});
			},

			/**
			 * Actualizes lookup profile.
			 * @param {Object} entitySchema Entity schema.
			 * @param {Object} profile Lookup profile.
			 * @return {Object} Actualized profile.
			 */
			actualizeProfile: function(entitySchema, profile) {
				var entityColumns = entitySchema.columns;
				profile = this.Terrasoft.ColumnUtilities.updateProfileColumnCaptions({
					profile: profile,
					entityColumns: entityColumns
				});
				if (profile.listedConfig) {
					var viewGenerator = this.Ext.create("Terrasoft.ViewGenerator");
					viewGenerator.viewModelClass = this;
					this.entitySchema = entitySchema;
					this.columns = entityColumns;
					var newProfile = {
						listedConfig: this.Ext.decode(profile.listedConfig),
						tiledConfig: this.Ext.decode(profile.tiledConfig),
						isTiled: profile.type === "tiled",
						type: profile.type,
						key: profile.key
					};
					viewGenerator.actualizeGridConfig(newProfile);
					this.clearLinks(newProfile);
					return {
						isTiled: newProfile.isTiled,
						key: newProfile.key,
						listedColumnsConfig: this.Ext.encode(newProfile.listedConfig.columnsConfig),
						captionsConfig: this.Ext.encode(newProfile.listedConfig.captionsConfig),
						tiledColumnsConfig: this.Ext.encode(newProfile.tiledConfig.columnsConfig),
						type: newProfile.type
					};
				}
				return profile;
			},

			clearLinks: function(profile) {
				Terrasoft.each(profile.listedConfig.columnsConfig, function(item) {
					if (item.hasOwnProperty("link")) {
						delete item.link;
					}
				}, this);
				Terrasoft.each(profile.tiledConfig.columnsConfig, function(rowItem) {
					Terrasoft.each(rowItem, function(item) {
						if (item.hasOwnProperty("link")) {
							delete item.link;
						}
					}, this);
				}, this);
			}

		});
	});


