Terrasoft.configuration.Structures["LeftPanelTopMenuModule"] = {innerHierarchyStack: ["LeftPanelTopMenuModule"]};
define("LeftPanelTopMenuModule", ["LeftPanelTopMenuModuleResources", "LookupUtilities",
	"ConfigurationConstants", "LeftPanelUtilitiesV2", "HoverMenuButton",
	"CheckModuleDestroyMixin", "ProcessEntryPointUtilities", "MaskHelper", "ProcessModuleUtilities", "ServiceHelper", 
	"MainMenuUtilities"
], function(resources, LookupUtilities, ConfigurationConstants, LeftPanelUtilities) {
	function createConstructor(context) {
		var Ext = context.Ext;
		var sandbox = context.sandbox;
		var Terrasoft = context.Terrasoft;

		/**
		 * Left panel top menu module view model.
		 */
		Ext.define("Terrasoft.LeftPanelTopMenuModuleViewModel", {
			extend: "Terrasoft.BaseViewModel",
			mixins: [
				"Terrasoft.CheckModuleDestroyMixin"
			],
			Ext: null,
			Terrasoft: null,
			sandbox: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.loadMenu();
				this.setSystemDesignerVisible();
				LeftPanelUtilities.on("collapsedChanged", this.onSideBarCollapsedChanged, this);
				this.set("Collapsed", LeftPanelUtilities.getCollapsed());
				callback.call(scope);
			},

			/**
			 * Sets based on the configuration of the property is responsible for the display panel buttons "System Designer".
			 * Responsible for showing and hiding "System Designer" button on the toolbar.
			 * @private
			 */
			setSystemDesignerVisible: function() {
				var isSystemDesignerVisible = !this.get("IsSSP");
				Terrasoft.SysSettings.querySysSettings(["BuildType"], function(sysSettings) {
					var buildType = sysSettings.BuildType;
					if (buildType && (buildType.value === ConfigurationConstants.BuildType.Public)) {
						isSystemDesignerVisible = false;
					}
					this.set("IsSystemDesignerVisible", isSystemDesignerVisible);
				}, this);
			},

			/**
			 * Returns main menu item config.
			 * @param {Object} entity Main menu lookup value.
			 * @return {Object} Main menu item config.
			 */
			getConfigMenuItem: function(entity) {
				var uId = entity.get("IntroPageUId");
				var name = entity.get("Name");
				var tag = entity.get("Tag");
				return {
					Id: uId,
					Caption: name,
					Tag: tag,
					Class: "menu-item",
					Click: {bindTo: "goToIntroPageFromMenu"},
					canExecute: {bindTo: "canBeDestroyed"}
				};
			},

			/**
			 * Fills the collection of the main menu items.
			 * @protected
			 */
			loadItemsMainMenu: function() {
				var cacheKey = "ApplicationMainMenu_TopPanel_Items";
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ApplicationMainMenu",
					isDistinct: true,
					clientESQCacheParameters: {
						cacheItemName: cacheKey
					},
					serverESQCacheParameters: {
						cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: "ApplicationMainMenu",
						cacheItemName: cacheKey
					}
				});
				esq.addColumn("Id");
				esq.addColumn("IntroPageUId");
				esq.addColumn("Name");
				esq.addColumn("[SysSchema:UId:IntroPageUId].Name", "Tag");
				esq.getEntityCollection(function(result) {
					if (!result.success) {
						return;
					}
					var menuCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var entities = result.collection;
					var mainMenuConfig = {
						Id: "menu-menu-item",
						Tag: "MainMenu",
						Caption: resources.localizableStrings.mainManuMenuItemCaption,
						Visible: {
							bindTo: "IsSSP",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						}
					};
					var entitiesCount = entities.getCount();
					if (entitiesCount === 0) {
						mainMenuConfig.Class = "menu-item";
						mainMenuConfig.Click = {bindTo: "goToFromMenu"};
						menuCollection.add(mainMenuConfig.Id, this.Ext.create("Terrasoft.BaseViewModel", {
							values: mainMenuConfig
						}));
					} else if (entitiesCount === 1) {
						entities.each(function(entity) {
							var menuItem = this.getConfigMenuItem(entity);
							menuItem.Caption = mainMenuConfig.Caption;
							menuCollection.add(menuItem.Id, this.Ext.create("Terrasoft.BaseViewModel", {
								values: menuItem
							}));
						}, this);
					} else {
						mainMenuConfig.Type = "Terrasoft.MenuSeparator";
						menuCollection.add(mainMenuConfig.Id, this.Ext.create("Terrasoft.BaseViewModel", {
							values: mainMenuConfig
						}));
						entities.each(function(entity) {
							var menuItem = this.getConfigMenuItem(entity);
							menuCollection.add(menuItem.Id, this.Ext.create("Terrasoft.BaseViewModel", {
								values: menuItem
							}));
						}, this);
						var id = "end-menu-menu-item";
						menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: id,
								Type: "Terrasoft.MenuSeparator"
							}
						}));
					}
					var mainMenuItems = this.get("MainMenuItems");
					menuCollection.loadAll(mainMenuItems);
					mainMenuItems.clear();
					mainMenuItems.loadAll(menuCollection);
				}, this);
			},

			/**
			 * Loads quick add menu items.
			 * @protected
			 */
			loadItemsQuickAddMenu: function() {
				var collection = this.get("quickAddMenu");
				collection.clear();
				var quickItems = Terrasoft.configuration.QuickAddMenu.QuickAddMenu;
				Terrasoft.each(quickItems, function(item) {
					var id = item.itemId;
					collection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
						values: this.getItemQuickAddMenuConfig(id, item)
					}));
				}, this);
			},

			/**
			 * Gets config of the quick add menu item.
			 * @private
			 * @param {String} id Item id name.
			 * @param {Object} item
			 * @return {Object} Config of the quick add menu item.
			 */
			getItemQuickAddMenuConfig: function(id, item) {
				var config = item.hasAddMiniPage ? {} : {
					canExecute: {"bindTo": "canBeDestroyed"}
				};
				this.Ext.apply(config, {
					Id: id,
					Caption: item.name,
					Click: {bindTo: "processQuickMenuClick"},
					ModuleName: item.ModuleName,
					Tag: id,
					TypeColumnName: item.TypeColumnName,
					TypeColumnValue: item.TypeColumnValue,
					EditPageName: item.EditPageName,
					EntitySchemaName: item.EntitySchemaName,
					MiniPage: {
						schemaName: item.miniPageSchema,
						hasAddMiniPage: item.hasAddMiniPage
					}
				});
				return config;
			},

			/**
			 * Processes quick add menu item click.
			 * @protected
			 * @param {String} tag Tag value of quick add menu item.
			 */
			processQuickMenuClick: function(tag) {
				var collection = this.get("quickAddMenu");
				var quickMenuItem = collection.get(tag);
				var moduleName = quickMenuItem.get("ModuleName") || "SysModuleEditManageModule";
				require([moduleName], function(module) {
					if (module) {
						module.Run({
							sandbox: sandbox,
							item: quickMenuItem
						});
					}
				});
			},

			/**
			 * Returns query for reading available for running processes.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} The Query to EntitySchema.
			 **/
			_getRunProcessESQ: function() {
				var filters = [];
				filters.push(Terrasoft.createExistsFilter("[RunButtonProcessList:SysSchemaUId:UId].Id"));
				var esq;
				if (Terrasoft.ProcessEntryPointUtilities.getCanRunProcessFromSection()) {
					esq = Terrasoft.ProcessModuleUtilities.createRunProcessESQ(filters);
				} else {
					esq = Terrasoft.ProcessModuleUtilities.createRunProcessSelect(filters);
				}
				return esq;
			},

			/**
			 * Return menu item view model.
			 * @private
			 * @param {Object} modelConfig Configuration object.
			 **/
			_createMenuItem: function(modelConfig) {
				return this.Ext.create("Terrasoft.BaseViewModel", {
					values: modelConfig
				});
			},

			/**
			 * Fills caption to "Run process" menu.
			 * @private
			 * @param {Terrasoft.Collection} startProcessMenuItems Menu items collection.
			 */
			_fillCaptionMenuItem: function(startProcessMenuItems) {
				var id = "caption-runprocess-menu-item";
				var modelConfig = {
					Id: id,
					Type: "Terrasoft.MenuSeparator",
					Caption: resources.localizableStrings.RunProcessButtonMenuCaption
				};
				startProcessMenuItems.add(id, this._createMenuItem(modelConfig));
			},

			/**
			 * Fills process record item to "Run process" menu.
			 * @private
			 * @param {Terrasoft.Collection} startProcessMenuItems Menu items collection.
			 * @param {String} id Item id.
			 * @param {String} caption Item caption.
			 */
			_fillRunProcessMenuItem: function(startProcessMenuItems, id, caption) {
				var modelConfig = {
					Id: id,
					Caption: caption,
					Click: {bindTo: "runProcess"},
					canExecute: {bindTo: "canBeDestroyed"},
					Tag: id,
					MarkerValue: caption
				};
				startProcessMenuItems.add(id, this._createMenuItem(modelConfig));
			},

			/**
			 * Fills separator to "Run process" menu.
			 * @private
			 * @param {Terrasoft.Collection} startProcessMenuItems Menu items collection.
			 */
			_fillSeparatorMenuItem: function(startProcessMenuItems) {
				var id = "separator-runprocess-menu-item";
				var modelConfig = {
					Id: id,
					Type: "Terrasoft.MenuSeparator"
				};
				startProcessMenuItems.add(id, this._createMenuItem(modelConfig));
			},

			/**
			 * Fills "open process page" item to "Run process" menu.
			 * @private
			 * @param {Terrasoft.Collection} startProcessMenuItems Menu items collection.
			 */
			_fillOpenProcessPageMenuItem: function(startProcessMenuItems) {
				var id = "open-process-page";
				var modelConfig = {
					Id: id,
					Caption: resources.localizableStrings.AnotherProcessMenuItemCaption,
					Click: {bindTo: "openProcessPage"},
					Tag: id
				};
				startProcessMenuItems.add(id, this._createMenuItem(modelConfig));
			},

			/**
			 * Returned clear startProcessMenu collection.
			 * @private
			 * @return {Terrasoft.Collection} Start process menu items.
			 */
			_getClearedStartProcessMenuItems: function() {
				var startProcessMenuItems = this.get("startProcessMenu");
				startProcessMenuItems.clear();
				return startProcessMenuItems;
			},

			/**
			 * Fills the collection menus global business process start button.
			 */
			loadItemsStartProcessMenu: function() {
				var esq = this._getRunProcessESQ();
				esq.getEntityCollection(function(result) {
					if (result.success) {
						var startProcessMenuItems = this._getClearedStartProcessMenuItems();
						var entities = result.collection;
						if (!entities.isEmpty()) {
							this._fillCaptionMenuItem(startProcessMenuItems);
							var idColumnName = "Id";
							var captionColumnName = "Caption";
							entities.each(function(entity) {
								var id = entity.get(idColumnName);
								var caption = entity.get(captionColumnName);
								this._fillRunProcessMenuItem(startProcessMenuItems, id, caption);
							}, this);
							this._fillSeparatorMenuItem(startProcessMenuItems);
							this._fillOpenProcessPageMenuItem(startProcessMenuItems);
						}
						this.sandbox.publish("LoadedItemsStartProcessMenu");
					} else {
						throw new Terrasoft.QueryExecutionException();
					}
				}, this);
			},

			/**
			 * Returns view config.
			 * @return {Object} View config.
			 */
			getViewConfig: function() {
				var view = {
					id: "side-bar-top-menu-module-container",
					selectors: {
						wrapEl: "#side-bar-top-menu-module-container"
					},
					classes: {
						wrapClassName: ["top-menu-module-container"]
					},
					items: this.getTopMenuConfig()
				};
				return view;
			},

			/**
			 * Returns menu object.
			 * @return {Object}
			 */
			loadMenu: function() {
				this.loadItemsStartProcessMenu();
				this.sandbox.subscribe("ResetStartProcessMenuItems", function() {
					this.loadItemsStartProcessMenu();
				}, this);
				this.loadItemsQuickAddMenu();
				var menuCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var id = "process-menu-item";
				menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: id,
						Tag: "ProcessExecute",
						Caption: resources.localizableStrings.processMenuItemCaption,
						Click: {bindTo: "openProcessPage"},
						Visible: {
							bindTo: "IsSSP",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						}
					}
				}));
				id = "collapse-menu-item";
				menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: id,
						Tag: "CollapseMenu",
						Caption: this.getCollapseSideBarMenuItemCaptionConfig(),
						Click: {bindTo: "collapseSideBar"}
					}
				}));
				var workplaceMenu = this.getWorkplaceMenu();
				if (workplaceMenu.getCount() > 0) {
					menuCollection.loadAll(workplaceMenu);
				}
				id = "system-designer-menu-item";
				menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: id,
						Tag: "IntroPage/SystemDesigner",
						Caption: resources.localizableStrings.systemDesignerMenuItemCaption,
						Click: {bindTo: "goToFromMenu"},
						Visible: {bindTo: "IsSystemDesignerVisible"},
						canExecute: {bindTo: "canBeDestroyed"}
					}
				}));
				id = "profile-menu-item";
				menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: id,
						Tag: "UserProfile",
						Caption: resources.localizableStrings.userProfileMenuItemCaption,
						Click: {bindTo: "goToFromMenu"},
						canExecute: {bindTo: "canBeDestroyed"}
					}
				}));
				id = "exit-menu-item";
				menuCollection.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: id,
						Tag: "Exit",
						ClassName: "Terrasoft.MenuItem",
						Caption: resources.localizableStrings.exitMenuItemCaption,
						Click: {bindTo: "exitClick"},
						canExecute: {bindTo: "canBeDestroyed"}
					}
				}));
				var mainMenuItems = this.get("MainMenuItems");
				mainMenuItems.loadAll(menuCollection);
				this.loadItemsMainMenu();
			},

			/**
			 * Returns collection of workplace models for workplace menu.
			 * @return {Terrasoft.BaseViewModelCollection} Workplace models collection.
			 */
			getWorkplaceMenu: function() {
				var workplaceMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var workplaces = Terrasoft.deepClone(
					Terrasoft.configuration.WorkplacesStructure.Workplaces);
				if (workplaces.length > 0) {
					var id = "separator-top-menu-item";
					workplaceMenuItems.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: id,
							Type: "Terrasoft.MenuSeparator",
							Caption: resources.localizableStrings.workPlaceMenuItemCaption
						}
					}));
					workplaces.sort(function(a, b) {
						if (a.name < b.name) {
							return -1;
						}
						if (a.name > b.name) {
							return 1;
						}
						return 0;
					});
					Terrasoft.each(workplaces, function(item) {
						if (item.hide) {
							return;
						}
						var menuItemConfig = {
							Caption: item.name,
							Tag: item.workplaceId,
							Click: {
								bindTo: "workPlaceMenuItemClick"
							},
							Id: "workspace-" + Terrasoft.formatGUID(item.workplaceId, "N") + "-menu-item"
						};
						workplaceMenuItems.add(this.Ext.create("Terrasoft.BaseViewModel", {
							values: menuItemConfig
						}));
					}, this);
					id = "separator-botom-menu-item";
					workplaceMenuItems.add(id, this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: id,
							Type: "Terrasoft.MenuSeparator"
						}
					}));
				}
				return workplaceMenuItems;
			},

			/**
			 * Returns the top menu configuration.
			 * @return {Object}
			 */
			getTopMenuConfig: function() {
				var menuConfig = [
					{
						id: "collapse-button",
						tag: "CollapseMenu",
						className: "Terrasoft.HoverMenuButton",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						classes: {
							imageClass: ["button-image-size"],
							wrapperClass: ["collapse-button-wrapperEl"]
						},
						imageConfig: resources.localizableImages.collapseIconSvg,
						click: {
							bindTo: "collapseSideBar"
						},
						hint: this.getCollapseSideBarMenuItemCaptionConfig(),
						markerValue: this.getCollapseSideBarMenuItemCaptionConfig()
					},
					{
						id: "menu-button",
						tag: "MainMenu",
						className: "Terrasoft.HoverMenuButton",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						hint: {bindTo: "getMenuButtonHint"},
						markerValue: resources.localizableStrings.MenuButtonHint,
						classes: {
							imageClass: ["button-image-size"],
							wrapperClass: ["menu-button-wrapperEl"]
						},
						imageConfig: resources.localizableImages.menuIconSvg,
						menu: {
							items: {bindTo: "MainMenuItems"},
							"alignType": "tr?",
							"ulClass": "position-fixed"
						},
						delayedShowEnabled: {
							bindTo: "Collapsed"
						},
						showDelay: this.get("ShowDelay"),
						hideDelay: this.get("HideDelay")
					},
					{
						id: "menu-startprocess-button",
						tag: "StartProcessMenu",
						className: "Terrasoft.HoverMenuButton",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						hint: {bindTo: "getStartProcessMenuButtonHint"},
						markerValue: resources.localizableStrings.StartProcessButtonHint,
						classes: {
							imageClass: ["button-image-size"],
							wrapperClass: ["menu-startprocess-button-wrapperEl"]
						},
						imageConfig: resources.localizableImages.processIconSvg,
						menu: {
							items: {bindTo: "startProcessMenu"},
							"alignType": "tr?",
							"ulClass": "position-fixed"
						},
						click: {
							bindTo: "startProcessMenuButtonClick"
						},
						visible: {
							bindTo: "IsSSP",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						},
						delayedShowEnabled: {
							bindTo: "Collapsed"
						},
						showDelay: this.get("ShowDelay"),
						hideDelay: this.get("HideDelay")
					},
					{
						id: "menu-quickadd-button",
						tag: "quickAddMenu",
						className: "Terrasoft.HoverMenuButton",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						classes: {
							imageClass: ["button-image-size"],
							wrapperClass: ["menu-quickadd-button-wrapperEl"]
						},
						hint: {
							bindTo: "getQuickAddHint"
						},
						markerValue: resources.localizableStrings.AddButtonHint,
						imageConfig: resources.localizableImages.quickaddIconSvg,
						menu: {
							items: {bindTo: "quickAddMenu"},
							"alignType": "tr?",
							"ulClass": "position-fixed"
						},
						visible: {
							bindTo: "IsSSP",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						},
						delayedShowEnabled: {
							bindTo: "Collapsed"
						},
						showDelay: this.get("ShowDelay"),
						hideDelay: this.get("HideDelay")
					}
				];
				return menuConfig;
			},

			/**
			 * Handles start process button click.
			 * @protected
			 * @return {boolean} Returns false for preventing default click handler.
			 */
			startProcessMenuButtonClick: function() {
				var startProcessMenu = this.get("startProcessMenu");
				if (startProcessMenu.getCount() > 0) {
					return false;
				}
				this.openProcessPage();
			},

			/**
			 * Returns quick add menu button hint.
			 * @return {String} Quick add menu button hint text.
			 */
			getQuickAddHint: function() {
				return this.getHint(resources.localizableStrings.AddButtonHint);
			},

			/**
			 * Returns start process menu button hint.
			 * @return {String} Start process menu button hint text.
			 */
			getStartProcessMenuButtonHint: function() {
				return this.getHint(resources.localizableStrings.StartProcessButtonHint);
			},

			/**
			 * Returns menu button hint.
			 * @return {String} Menu button hint text.
			 */
			getMenuButtonHint: function() {
				return this.getHint(resources.localizableStrings.MenuButtonHint);
			},

			/**
			 * Returns hint text.
			 * When left panel state is collapsed, returns null.
			 * @param {String} hint Hint text.
			 * @return {String|null} Hint text.
			 */
			getHint: function(hint) {
				var collapsed = this.get("Collapsed");
				if (!collapsed) {
					return hint;
				}
				return null;
			},

			/**
			 * Returns the configuration of the switching element collapsed left panel.
			 * @return {Object}
			 */
			getCollapseSideBarMenuItemCaptionConfig: function() {
				return {
					bindTo: "Collapsed",
					bindConfig: {
						converter: this.getCollapseSideBarMenuItemCaption
					}
				};
			},

			/**
			 * Run the business process from the list of global processes start button.
			 * @param {Object} tag UId business Process diagrams.
			 */
			runProcess: function(tag) {
				Terrasoft.ProcessModuleUtilities.executeProcess({
					sysProcessId: tag
				});
			},

			goTo: function() {
				var tag = arguments[3];
				var currentModule = this.sandbox.publish("GetHistoryState").hash.historyState;
				if (currentModule !== tag) {
					Terrasoft.MaskHelper.ShowBodyMask();
					this.sandbox.publish("PushHistoryState", {hash: tag});
				}
			},

			/**
			 * @deprecated
			 */
			replaceWindowLocation: function(location) {
				window.location.replace(location);
			},

			/**
			 * Handles exit menu item click.
			 * @private
			 */
			exitClick: function() {
				Terrasoft.MainMenuUtilities.logout();
			},

			goToFromMenu: function(tag) {
				var currentHistoryState = this.sandbox.publish("GetHistoryState").hash.historyState;
				if (currentHistoryState !== tag) {
					Terrasoft.Mask.show();
					this.sandbox.publish("PushHistoryState", {hash: tag});
				}
			},

			goToIntroPageFromMenu: function(tag) {
				var currentHistoryState = this.sandbox.publish("GetHistoryState").hash.historyState;
				if (currentHistoryState !== tag) {
					var hash = "IntroPage/" + tag;
					this.sandbox.publish("PushHistoryState", {hash: hash});
				}
			},

			openProcessPage: function() {
				var vwSysProcessFilters = Terrasoft.createFilterGroup();
				vwSysProcessFilters.name = "vwSysProcessFiler";
				var sysWorkspaceFilter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value);
				vwSysProcessFilters.addItem(sysWorkspaceFilter);
				var businessProcessTagFilter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "TagProperty",
					ConfigurationConstants.SysProcess.BusinessProcessTag);
				vwSysProcessFilters.addItem(businessProcessTagFilter);
				var isMaxVersionFilter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IsMaxVersion", true);
				vwSysProcessFilters.addItem(isMaxVersionFilter);
				var config = {
					entitySchemaName: "VwSysProcess",
					isRunProcessPage: true,
					captionLookup: resources.localizableStrings.processLookupCaption,
					multiSelect: false,
					columnName: "Caption",
					filters: vwSysProcessFilters,
					hideActions: true
				};
				var handler = function(args) {
					var activeItems = args.selectedRows.getItems();
					if (!this.Ext.isEmpty(activeItems)) {
						Terrasoft.ProcessModuleUtilities.executeProcess({
							sysProcessId: activeItems[0].Id
						});
					}
				};
				LookupUtilities.Open(this.sandbox, config, handler, this, null, false, false);
			},

			collapseSideBar: function() {
				LeftPanelUtilities.changeCollapsed();
			},

			showESN: function() {
				var esnHash = "SectionModuleV2/ESNFeedSectionV2/";
				var currentModule = this.sandbox.publish("GetHistoryState").hash.historyState;
				if (currentModule !== esnHash) {
					Terrasoft.MaskHelper.ShowBodyMask();
					this.sandbox.publish("PushHistoryState", {hash: esnHash});
				}
			},

			/**
			 * Returns the text for the switching element folding left panel.
			 * @param {Boolean} isCollapsed Collapsed flag.
			 * @return {String} The text for the switching element folding left panel.
			 */
			getCollapseSideBarMenuItemCaption: function(isCollapsed) {
				if (this.Ext.isEmpty(isCollapsed)) {
					isCollapsed = LeftPanelUtilities.getDefaultCollapsed();
				}
				if (isCollapsed) {
					return resources.localizableStrings.expandSideBarMenuItemCaption;
				} else {
					return resources.localizableStrings.collapseSideBarMenuItemCaption;
				}
			},

			workPlaceMenuItemClick: function(tag) {
				var workplaceItem = this.getWorkplaceData(tag);
				if (workplaceItem) {
					this.sandbox.publish("ChangeCurrentWorkplace", tag);
				}
			},

			getWorkplaceData: function(workplaceId) {
				var workplaces = Terrasoft.configuration.WorkplacesStructure.Workplaces;
				var workplaceItem = null;
				if (workplaces.length > 0) {
					Terrasoft.each(workplaces, function(item) {
						if (item.workplaceId === workplaceId) {
							workplaceItem = item;
						}
					}, this);
				}
				return workplaceItem;
			},

			/**
			 * Handler of the changes Hide left panel.
			 * @param {Boolean} isCollapsed Collapsed attribute.
			 */
			onSideBarCollapsedChanged: function(isCollapsed) {
				this.sandbox.publish("ChangeSideBarCollapsed", isCollapsed);
				this.set("Collapsed", isCollapsed);
				this.sandbox.publish("ChangeGridUtilitiesContainerSize");
			}

		});

		Ext.define("Terrasoft.configuration.LeftPanelTopMenuModule", {
			extend: "Terrasoft.BaseModule",
			isAsync: false,
			viewModel: null,
			viewModelClassName: "Terrasoft.LeftPanelTopMenuModuleViewModel",

			render: function(renderTo) {
				this.generate(renderTo);
			},

			init: function(callback, scope) {
				var viewModel = this.viewModel = this.getViewModel();
				callback = callback || Ext.emptyFn;
				scope = scope || this;
				viewModel.init(function() {
					callback.call(scope);
				}, this);
			},

			getViewModel: function() {
				return Ext.create(this.viewModelClassName, {
					Terrasoft: Terrasoft,
					Ext: Ext,
					sandbox: sandbox,
					values: {
						Collapsed: false,
						quickAddMenu: Ext.create("Terrasoft.BaseViewModelCollection"),
						startProcessMenu: Ext.create("Terrasoft.BaseViewModelCollection"),
						MainMenuItems: Ext.create("Terrasoft.BaseViewModelCollection"),
						IsSystemDesignerVisible: true,
						IsSSP: Terrasoft.isCurrentUserSsp(),
						ShowDelay: 0,
						HideDelay: 20
					}
				});
			},

			generate: function(container) {
				var viewModel = this.viewModel;
				var view = this.view;
				if (!Ext.isEmpty(viewModel) && !Ext.isEmpty(view)) {
					view.destroy();
				}
				var viewConfig = viewModel.getViewConfig();
				view = Ext.create("Terrasoft.Container", Terrasoft.deepClone(viewConfig));
				view.bind(viewModel);
				view.render(container);
				Terrasoft.MaskHelper.HideBodyMask();
			}
		});

		return Terrasoft.configuration.LeftPanelTopMenuModule;
	}

	return createConstructor;
});


