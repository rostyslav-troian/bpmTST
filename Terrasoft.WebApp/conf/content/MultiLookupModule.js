Terrasoft.configuration.Structures["MultiLookupModule"] = {innerHierarchyStack: ["MultiLookupModule"]};
define("MultiLookupModule", ["LookupPage", "LookupPageViewGenerator", "LookupUtilities", "css!LookupPageCSS"],
	function(LookupPage, LookupPageViewGenerator) {

		/**
		 * @class Terrasoft.configuration.MultiLookupModule
		 * ##### ###### ######## ###### ######## ## ########## ############.
		 */
		return Ext.define("Terrasoft.configuration.MultiLookupModule", {
			alternateClassName: "Terrasoft.MultiLookupModule",
			extend: "Terrasoft.LookupPage",

			//region Fields: Private

			/**
			 * Grid elements classes
			 * @private
			 * @type {String[]}
			 */
			gridWrapClasses: ["multi-lookup-control"],

			//endregion

			//region Methods: Protected

			/**
			 * ########## ##### ############ ###########.
			 * @protected
			 * @overridden
			 * @return {Object} ##### ############ ###########.
			 */
			getLookupInfo: function() {
				var lookupsInfo = this.sandbox.publish("LookupInfo", null, [this.sandbox.id]);
				return lookupsInfo && lookupsInfo.multiLookupConfig;
			},

			//endregion

			//region Methods: Private

			/**
			 * ############ ######### ######## #######.
			 * @private
			 * @param {Object} activeTab ######## #######.
			 */
			onTabChanged: function(activeTab) {
				var lookupsInfo = this.get("LookupsInfo");
				Terrasoft.each(lookupsInfo, function(lookupInfo) {
					if (activeTab.get("Name") !== lookupInfo.entitySchemaName) {
						return true;
					}
					this.lookupInfo = lookupInfo;
					this.getSchemaAndProfile(lookupInfo.lookupPostfix, function(entitySchema, profile) {
						this.isClearGridData = true;
						this.set("gridProfile", profile);
						this.entitySchema = entitySchema;
						this.initLoadedColumns();
						var searchColumn = this.get("searchColumn");
						if (!entitySchema.columns[searchColumn.value]) {
							this.set("searchColumn", {
								value: this.entitySchema.primaryDisplayColumn.name,
								displayValue: this.entitySchema.primaryDisplayColumn.caption
							});
							this.set("searchData", "");
						}
						this.set("LookupInfo", this.lookupInfo);
						this.load(profile, function() {
							this.updateTabContent(this.lookupInfo);
						}.bind(this));
					});
				}, this);
			},

			_getCaptionFromManager: function(schemaName) {
				if(schemaName) {
					var schema = this.Terrasoft.EntitySchemaManager.findItemByName(schemaName);
					if(schema) {
						return schema.caption;
					}
				}
				return null;
			},

			_getCaptionFromStructure: function(schemaName) {
				if(schemaName) {
					var schemaConfig = this.Terrasoft.configuration.ModuleStructure[schemaName];
					if(schemaConfig) {
						return schemaConfig.moduleCaption;
					}
				}
				return null;
			},

			/**
			 * ########## ################ ###### ###### #######.
			 * @private
			 * @return {Object} ################ ###### ###### #######.
			 */
			getMultiLookupTabPanelConfig: function() {
				return {
					className: "Terrasoft.TabPanel",
					selectors: {
						wrapEl: "#multiLookupTabPanel"
					},
					classes: {
						wrapClass: ["multiLookupTabPanel"]
					},
					tabs: {
						bindTo: "LookupTabsCollection"
					},
					activeTabName: {
						bindTo: "ActiveLookupTabName"
					},
					activeTabChange: {
						bindTo: "onTabChanged"
					},
					markerValue: "multiLookupTabPanel"
				};
			},

			/**
			 * ########## ######### #######.
			 * @private
			 * @param {Object} lookupInfo ################ ###### ########## ###########.
			 * @param {String} lookupInfo.caption ######### ###########.
			 * @param {String} lookupInfo.columnName ######## ####### ########### ####.
			 * @param {Object} lookupInfo.columnValue ################ ###### ######## ####### ########### ####.
			 * @param {String} lookupInfo.entitySchemaName ######## ##### ###########.
			 * @param {Object} lookupInfo.filters #######, ########## ## ########## ####.
			 * @param {String} lookupInfo.multiLookupColumnName ######## ####### ################# ####.
			 * @param {Boolean} lookupInfo.multiSelect ####### ######## ## ########## ################.
			 * @param {String} lookupInfo.searchValue ######## ########### #### ### ######.
			 * @return {String} ######### #######.
			 */
			getTabCaption: function(lookupInfo) {
				var caption = lookupInfo.caption;
				return caption || this._getCaptionFromStructure(lookupInfo.entitySchemaName)
					|| this._getCaptionFromManager(lookupInfo.entitySchemaName);
			},

			/**
			 * ######### ######### #######.
			 * @private
			 * @param {Function} callback ####### ######### ######.
			 * @param {Terrasoft.Collection} callback.collection ######### ############.
			 */
			loadLookups: function(callback) {
				var lookupsInfo = this.lookupsInfo
					? this.lookupsInfo
					: this.getLookupInfo();
				this.viewModel.set("LookupsInfo", lookupsInfo);
				var tabCollection = Ext.create("Terrasoft.Collection");
				Terrasoft.each(lookupsInfo, function(lookupInfo, index) {
					tabCollection.add(lookupInfo.entitySchemaName, {
						Id: index,
						Name: lookupInfo.entitySchemaName,
						Caption: this.getTabCaption(lookupInfo)
					});
				}, this);
				callback(tabCollection);
			},

			/**
			 * ####### ####### ############.
			 * @private
			 * @param {Terrasoft.Collection} collection ######### #######.
			 */
			createLookupsTabs: function(collection) {
				var lookups = Ext.create("Terrasoft.BaseViewModelCollection");
				var activeLookupTabName;
				collection.each(function(item) {
					var tabId = item.Id;
					var tabName = item.Name;
					lookups.add(tabId, Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: tabId,
							Caption: item.Caption,
							Name: tabName
						}
					}));
					if (Ext.isEmpty(activeLookupTabName)) {
						activeLookupTabName = tabName;
					}
				});
				this.viewModel.set({
					"LookupTabsCollection": lookups,
					"ActiveLookupTabName": activeLookupTabName
				});
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.LookupPage#renderLookupView
			 * @overridden
			 */
			renderLookupView: function(schema, profile) {
				var config = this.getLookupConfig(schema, profile);
				config.gridWrapClasses = this.gridWrapClasses;
				this.loadLookups(function(collection) {
					this.createLookupsTabs(collection);
					var viewModel = this.viewModel;
					viewModel.getSchemaAndProfile = this.getSchemaAndProfile;
					viewModel.requireModuleDescriptors = this.requireModuleDescriptors;
					viewModel.requireProfile = this.requireProfile;
					viewModel.actualizeProfile = this.actualizeProfile;
					viewModel.generateViewModel = this.generateViewModel;
					viewModel.renderLookupView = this.renderLookupView;
					viewModel.loadLookups = this.loadLookups;
					viewModel.createLookupsTabs = this.createLookupsTabs;
					viewModel.getMultiLookupTabPanelConfig = this.getMultiLookupTabPanelConfig;
					viewModel.getTabCaption = this.getTabCaption;
					viewModel.onTabChanged = this.onTabChanged;
					viewModel.loadViewModel = this.loadViewModel;
					var topPanelConfig = LookupPageViewGenerator.generateFixed(config);
					topPanelConfig.items.push(this.getMultiLookupTabPanelConfig());
					this.renderLookupControls(config, topPanelConfig);
				}.bind(this));
			}

			//endregion

		});
	});


