﻿Terrasoft.configuration.Structures["LeftPanelClientWorkplaceMenu"] = {innerHierarchyStack: ["LeftPanelClientWorkplaceMenu"]};
define("LeftPanelClientWorkplaceMenu", ["LeftPanelClientWorkplaceMenuResources", "MaskHelper", "ServiceHelper",
	"RightUtilities", "profile!clientWorkplaceMenuProfile", "css!LeftPanelTopMenuModule", "ViewGeneratorV2"],
	function(resources, MaskHelper, ServiceHelper, RightUtilities, clientWorkplaceMenuProfile) {

		Ext.define("Terrasoft.configuration.WorkplaceMenuViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.WorkplaceMenuViewModel",
			mixins: {
				TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities"
			},

			reloadMenu: function(workplaces, workplaceId) {
				var control = Ext.getCmp("menu-workplace-button");
				if (!control) {
					return;
				}
				var menuItems = [];
				Terrasoft.each(workplaces, function(item) {
					if (item.hide) {
						return;
					}
					var menuItemConfig = {
						caption: item.name,
						tag: item.workplaceId,
						markerValue: item.name,
						click: {
							bindTo: "menuItemClick"
						}
					};
					menuItems.push(menuItemConfig);
					if (workplaceId === item.workplaceId) {
						control.caption = item.name;
					}
				}, this);
				if (workplaceId === undefined) {
					control.caption = workplaces[0].name;
				}
				var menu = Ext.create("Terrasoft.Menu", {
					items: menuItems,
					markerValue: "TopWorkplaceMenu"
				});
				menu.bind(this);
				control.menu = menu;
				control.reRender();
			},
			loadMenu: function(workplaces, workplaceId) {
				var collection = this.get("WorkplaceCollection");
				if (!collection.isEmpty()) {
					collection.clear();
				}
				Terrasoft.each(workplaces, function(item) {
					if (item.hide) {
						return;
					}
					collection.addItem(Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: Terrasoft.generateGUID(),
							Caption: item.name,
							MarkerValue: item.name,
							Tag: item.workplaceId,
							Click: {bindTo: "menuItemClick"}
						}
					}));
					if (workplaceId === item.workplaceId) {
						this.set("TopWorkplaceMenuCaption", item.name);
					}
				}, this);
			},
			loadMenuItems: function(workplaceId) {
				var workplaces =
						Terrasoft.deepClone(Terrasoft.configuration.WorkplacesStructure.Workplaces);
				if (workplaces.length > 0) {
					workplaces.sort(function(a, b) {
						if (a.name < b.name) {
							return -1;
						}
						if (a.name > b.name) {
							return 1;
						}
						return 0;
					});
					this.loadMenu(workplaces, workplaceId);
				}
			},
			menuItemClick: function(tag) {
				if (this.get("selectedWorkplaceId") === tag) {
					return;
				}
				this.loadMenuItems(tag);
				var dataSend = {
					workplaceId: tag
				};
				Terrasoft.utils.saveUserProfile("clientWorkplaceMenuProfile", dataSend);
				ServiceHelper.callService("WorkplaceService", "SetWorkplaceCache", Terrasoft.emptyFn, dataSend, this);
				this.load(tag);
				this.set("selectedWorkplaceId", tag);
			},
			load: function(tag) {
				var workplaceItem = this.getWorkplaceData(tag);
				if (workplaceItem) {
					var sandbox = this.get("Sandbox");
					sandbox.subscribe("GetWorkplaceInfo", function() {
						return workplaceItem;
					});
					sandbox.loadModule(workplaceItem.loaderName);
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
				} else {
					workplaceItem = {loaderName: "BaseWorkplaceLoader"};
				}
				return workplaceItem;
			},
			addHighlight: function() {
				this.set("TopWorkplaceMenuButtonStyle", "highlighted");
			},
			removeHighlight: function() {
				this.set("TopWorkplaceMenuButtonStyle", Terrasoft.controls.ButtonEnums.style.TRANSPARENT);
			}
		});

		function createConstructor(context) {
			var container;
			var viewModel;
			var Ext = context.Ext;
			var sandbox = context.sandbox;
			var Terrasoft = context.Terrasoft;
			var profile = clientWorkplaceMenuProfile;

			/**
			 * Returns tip view.
			 * @param {Object} config Configuration to generate tip view.
			 * @return {Object}
			 */
			function generateTip(config) {
				var viewGenerator = Ext.create("Terrasoft.ViewGenerator");
				var tip = viewGenerator.generatePartial(Ext.merge({
					itemType: Terrasoft.ViewItemType.TIP
				}, config), {
					schemaName: "LeftPanelClientWorkplaceMenu",
					schema: {},
					viewModelClass: Ext.ClassManager.get("Terrasoft.WorkplaceMenuViewModel")
				})[0];
				return tip;
			}

			var getViewConfig = function() {
				var workplaceMenuTip = generateTip({
					content: resources.localizableStrings.WorkplaceMenuTip,
					className: "Terrasoft.ContextTip",
					contextIdList: ["0", "IntroPage"],
					behaviour: {
						displayEvent: Terrasoft.TipDisplayEvent.NONE
					}
				});
				var topMenuContainer = {
					className: "Terrasoft.Container",
					id: "top-menu-workplace-button-container",
					selectors: {
						wrapEl: "#top-menu-workplace-button-container"
					},
					classes: {
						wrapClassName: ["top-menu-workplace-button-container-wrapEl"]
					},
					items: getTopMenuConfig("Default"),
					tips: [workplaceMenuTip]
				};
				return topMenuContainer;
			};

			function getTopMenuConfig() {
				var menuConfig = {
						id: "menu-workplace-button",
						selectors: {
							wrapEl: "#menu-workplace-button"
						},
						tag: "TopWorkplaceMenu",
						markerValue: "TopWorkplaceMenu",
						className: "Terrasoft.Button",
						style: {
							bindTo: "TopWorkplaceMenuButtonStyle"
						},
						caption: {
							bindTo: "TopWorkplaceMenuCaption"
						},
						menu: {
							items: {
								bindTo: "WorkplaceCollection"
							}
						},
						prepareMenu: {bindTo: "addHighlight"},
						hideMenu: {bindTo: "removeHighlight"}
					};
				return [menuConfig];
			}

			var getViewModel = function(context) {
				return Ext.create("Terrasoft.WorkplaceMenuViewModel", {
					values: {
						selectedWorkplaceId: null,
						TopWorkplaceMenuCaption: "",
						WorkplaceCollection: Ext.create("Terrasoft.BaseViewModelCollection"),
						TopWorkplaceMenuButtonStyle: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						Sandbox: context.sandbox
					}
				});
			};
			var loadMenu = function() {
				var workplaceId;
				var workplaces = Terrasoft.configuration.WorkplacesStructure.Workplaces;
				if (profile && profile.workplaceId) {
					var isInWorkplace = workplaces.some(function(item) {
						return item.workplaceId === profile.workplaceId;
					});
					if (isInWorkplace) {
						workplaceId = profile.workplaceId;
					} else if (workplaces.length) {
						profile.workplaceId = workplaces[0].workplaceId;
						workplaceId = profile.workplaceId;
					}
				} else if (workplaces.length) {
					workplaceId = profile.workplaceId = workplaces[0].workplaceId;
				}
				if (workplaceId != null) {
					viewModel.loadMenuItems(workplaceId);
				}
				viewModel.load(workplaceId);
			};
			var generate = function() {
				var view = Ext.create("Terrasoft.Container", getViewConfig());
				viewModel = getViewModel(context);
				view.bind(viewModel);
				view.render(container);
				sandbox.subscribe("RefreshWorkplace", function() {
					ServiceHelper.callService("WorkplaceService", "RefreshWorkplace", function(response) {
						Terrasoft.configuration.WorkplacesStructure = JSON.parse(response.RefreshWorkplaceResult);
						loadMenu();
					}, null, this);
				});
				loadMenu();
				sandbox.subscribe("ChangeCurrentWorkplace", function(args) {
					viewModel.menuItemClick(args);
				});
			};

			function render(renderTo) {
				container = renderTo;
				generate();
			}

			return Ext.define("LeftPanelClientWorkplaceMenu", {
				render: render
			});
		}

		return createConstructor;
	});


