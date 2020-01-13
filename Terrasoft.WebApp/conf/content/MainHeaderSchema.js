Terrasoft.configuration.Structures["MainHeaderSchema"] = {innerHierarchyStack: ["MainHeaderSchemaNUI", "MainHeaderSchemaEmailMining", "MainHeaderSchemaCTIBase", "MainHeaderSchema"]};
define('MainHeaderSchemaNUIStructure', ['MainHeaderSchemaNUIResources'], function(resources) {return {schemaUId:'52446ecf-4b3e-41ce-8962-e48c63d583f8',schemaCaption: "MainHeaderSchema", parentSchemaName: "", schemaName:'MainHeaderSchemaNUI',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MainHeaderSchemaEmailMiningStructure', ['MainHeaderSchemaEmailMiningResources'], function(resources) {return {schemaUId:'330b80dd-98a1-4bc3-bea1-51a6cf42d7b2',schemaCaption: "MainHeaderSchema", parentSchemaName: "MainHeaderSchemaNUI", schemaName:'MainHeaderSchemaEmailMining',parentSchemaUId:'52446ecf-4b3e-41ce-8962-e48c63d583f8',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"MainHeaderSchemaNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MainHeaderSchemaCTIBaseStructure', ['MainHeaderSchemaCTIBaseResources'], function(resources) {return {schemaUId:'73565bea-1d59-43b3-b768-c5c49217e66f',schemaCaption: "MainHeaderSchema", parentSchemaName: "MainHeaderSchemaEmailMining", schemaName:'MainHeaderSchemaCTIBase',parentSchemaUId:'330b80dd-98a1-4bc3-bea1-51a6cf42d7b2',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"MainHeaderSchemaEmailMining",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MainHeaderSchemaStructure', ['MainHeaderSchemaResources'], function(resources) {return {schemaUId:'3693e993-1c10-40eb-b471-223aea3eae68',schemaCaption: "MainHeaderSchema", parentSchemaName: "MainHeaderSchemaCTIBase", schemaName:'MainHeaderSchema',parentSchemaUId:'73565bea-1d59-43b3-b768-c5c49217e66f',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"MainHeaderSchemaCTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('MainHeaderSchemaNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("MainHeaderSchemaNUI", ["IconHelper", "ConfigurationConstants", "css!MainHeaderCSS",
	"CheckModuleDestroyMixin", "MainMenuUtilities"
], function(iconHelper, ConfigurationConstants) {
	return {
		attributes: {
			/**
			 * Main header caption.
			 * @private
			 * @type {String}
			 */
			"HeaderCaption": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Page header caption.
			 * @private
			 * @type {String}
			 */
			"PageHeaderCaption": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Header caption marker value.
			 * @private
			 * @type {String}
			 */
			"HeaderCaptionMarkerValue": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Name of current active view.
			 * @private
			 * @type {String}
			 */
			"ActiveViewName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Section buttons view collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			"ViewButtons": {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				value: this.Ext.create("Terrasoft.Collection")
			},

			/**
			 * Is main menu flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsMainMenu": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is main header caption visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsCaptionVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Is command line visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsCommandLineVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is current user type is SSP flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsSSP": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: (this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP)
			},

			/**
			 * Is context help visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsContextHelpVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is system designer button visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsSystemDesignerVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is user photo visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsUserPhotoVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Is logo visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsLogoVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Is main header panel visible flag.
			 * @private
			 * @type {Boolean}
			 */
			"IsMainHeaderVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Current user photo id.
			 * @private
			 * @type {String}
			 */
			"ContactPhotoId": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Loaded module name.
			 * @private
			 * @type {String}
			 */
			"ModuleName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},

			/**
			 * Profile button menu collection.
			 * @private
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"ProfileMenuCollection": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				value: this.Ext.create("Terrasoft.BaseViewModelCollection")
			},

			/**
			 * Configuration version.
			 */
			"ConfigurationVersion": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Show configuration version.
			 */
			"ShowConfigurationVersion": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Show configuration version.
			 */
			"ShowJSUnitTestsButton": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		messages: {
			/**
			 * @message SelectedSideBarItemChanged
			 * Change selection of current section in sections menu of left panel.
			 * @param {String} Section structure(E.c. "SectionModuleV2/AccountPageV2/" or "DashboardsModule/").
			 */
			"SelectedSideBarItemChanged": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ContextHelpModuleLoaded
			 * Notify about the ContextHelpModule is loaded.
			 */
			"ContextHelpModuleLoaded": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			/**
			 * @class CheckModuleDestroyMixin Implements publish and show CanBeDestroy message.
			 */
			CheckModuleDestroyMixin: "Terrasoft.CheckModuleDestroyMixin"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([
					Terrasoft.chain(
						this._initShowConfigurationVersion,
						function() {
							this._initConfigurationVersion();
							this.subscribeSandboxEvents();
							if (this.Ext.isEmpty(this.get("HeaderCaption"))) {
								this.sandbox.publish("NeedHeaderCaption");
							}
							var contactPhotoId = this.Terrasoft.SysValue.CURRENT_USER_CONTACT.primaryImageValue;
							this.set("ContactPhotoId", contactPhotoId);
							this._initShowJSUnitTestsButton();
							this.Ext.callback(callback, scope || this);
						},
						this
					)
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				this.loadCommandModule();
				this.loadContextHelpModule();
			},

			/**
			 * Subscribes for sandbox events.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("InitDataViews", function() {
					this.onInitDataViews(arguments);
					this.fixHeaderWidth();
				}, this);
				this.sandbox.subscribe("ChangeHeaderCaption", function(args) {
					this.set("HeaderCaption", args.caption);
					this.set("HeaderCaptionMarkerValue", args.markerValue || args.caption);
					this.set("ModuleName", args.moduleName ? args.moduleName : "");
					if (args.dataViews) {
						this.setButtons(args);
					}
					this.fixHeaderWidth();
					if (args.hidePageCaption) {
						Terrasoft.utils.dom.setAttributeToBody("is-card-opened", false);
					}
				}, this);
				this.sandbox.subscribe("UpdatePageHeaderCaption", function(args) {
					if (args.hasOwnProperty("pageHeaderCaption")) {
						this.set("PageHeaderCaption", args.pageHeaderCaption ||
							this.get("Resources.Strings.DefaultPageHeaderCaption"));
					}
				}, this);
			},

			/**
			 * Loads command line module.
			 * @private
			 */
			loadCommandModule: function() {
				var commandLineContainer = this.Ext.getCmp("header-command-line-container");
				if (commandLineContainer && commandLineContainer.rendered) {
					this.sandbox.loadModule("CommandLineModule", {
						renderTo: "header-command-line-container"
					});
				}
			},

			/**
			 * Loads profile button menu items.
			 * @protected
			 */
			loadProfileButtonMenu: function() {
				var profileMenuCollection = this.get("ProfileMenuCollection");
				profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: "profile-menu-item",
						Caption: this.get("Resources.Strings.ProfileMenuItemCaption"),
						Click: {
							bindTo: "onProfileMenuItemClick"
						},
						canExecute: {
							bindTo: "canBeDestroyed"
						},
						MarkerValue: this.get("Resources.Strings.ProfileMenuItemCaption"),
						ImageConfig: this.get("Resources.Images.YourProfileIcon")
					}
				}));
				profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: "separator-profil-menu-item",
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}
				}));
				profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: "exit-menu-item",
						Caption: this.get("Resources.Strings.ExitMenuItemCaption"),
						Click: {
							bindTo: "onExitMenuItemClick"
						},
						canExecute: {
							bindTo: "canBeDestroyed"
						},
						MarkerValue: this.get("Resources.Strings.ExitMenuItemCaption")
					}
				}));
			},

			/**
			 * Loads module of context help button.
			 * @private
			 */
			loadContextHelpModule: function() {
				var contextHelpContainer = this.Ext.getCmp("header-context-help-container");
				if (contextHelpContainer && contextHelpContainer.rendered) {
					var contextHelpModuleId = this.sandbox.loadModule("ContextHelpModule", {
						renderTo: "header-context-help-container"
					});
					var currentConfig;
					this.sandbox.subscribe("InitContextHelp", function(config) {
						currentConfig = config;
						this.sandbox.publish("ChangeContextHelpId", config, [contextHelpModuleId]);
					}, this);
					this.sandbox.subscribe("GetContextHelpId", function() {
						return currentConfig;
					}, this, [contextHelpModuleId]);
					this.sandbox.publish("ContextHelpModuleLoaded");
				}
			},

			/**
			 * Unloads command line module.
			 * @private
			 */
			unloadCommandModule: function() {
				this.sandbox.unloadModule("CommandLineModule");
			},

			/**
			 * Unloads module of context help button.
			 * @private
			 */
			unloadContextHelpModule: function() {
				this.sandbox.unloadModule("ContextHelpModule");
			},

			/**
			 * Reloads command line module.
			 * @private
			 */
			reloadCommandModule: function() {
				this.unloadCommandModule();
				this.loadCommandModule();
			},

			/**
			 * Reloads module of context help button.
			 * @private
			 */
			reloadContextHelpModule: function() {
				this.unloadContextHelpModule();
				this.loadContextHelpModule();
			},

			/**
			 * Returns View buttons visible flag.
			 * @return {boolean} View buttons visible flag.
			 */
			getIsButtonsVisible: function() {
				return (this.get("ViewButtons").getCount() > 1);
			},

			/**
			 * todo #CRM-21525.
			 * Change caption container width.
			 * @private
			 */
			fixHeaderWidth: function() {
				var captionContainer = this.Ext.get("caption");
				if (!captionContainer) {
					return;
				}
				var viewButtonsVisible = this.getIsButtonsVisible();
				if (viewButtonsVisible) {
					captionContainer.removeCls("fix-width");
				} else {
					captionContainer.addCls("fix-width");
				}
			},

			/**
			 * Change main header panel state.
			 * @private
			 * @param {Object[]} config Main header panel config.
			 */
			onInitDataViews: function(config) {
				var conf = (config && config[0].settings) ? config[0].settings : config[0];
				if (conf.hideMainHeader) {
					Terrasoft.utils.dom.setAttributeToBody("is-main-header-visible", false);
				}
				if (conf.hidePageCaption) {
					Terrasoft.utils.dom.setAttributeToBody("is-card-opened", false);
				}
				if (conf.dataViews) {
					this.setButtons(conf);
				} else {
					this.set("ViewButtons", new this.Terrasoft.Collection());
					this.setSettings(conf);
				}
				if (!this.Ext.isEmpty(conf.caption)) {
					this.set("HeaderCaption", conf.caption);
				}
				this.set("HeaderCaptionMarkerValue", conf.markerValue || conf.caption || "");
				this.set("ModuleName", conf.moduleName || "");
			},

			/**
			 * Sets view buttons.
			 * @param {Object} config Main header panel config.
			 */
			setButtons: function(config) {
				var buttons = new this.Terrasoft.Collection();
				var buttonsContainer = this.Ext.getCmp("button-switch");
				if (buttonsContainer) {
					this.clearContainerItems("button-switch");
					config.dataViews.each(function(item) {
						var bConfig = item.icon
							? this.createViewIconButtonConfig(item)
							: this.createButtonConfig(item);
						if (item.markerValue) {
							bConfig.markerValue = item.markerValue;
						}
						if (item.active) {
							this.set("ActiveViewName", item.name);
						}
						Ext.apply(bConfig, {
							canExecute: {
								bindTo: "canBeDestroyed"
							}
						});
						buttons.add(bConfig);
						buttonsContainer.add(bConfig);
					}, this);
					this.set("ViewButtons", buttons);
					this.setSettings(config);
					buttonsContainer.bind(this);
					this.setPressedViewButtons(this.get("ActiveViewName"));
				}
			},

			/**
			 * Handles profile menu item click.
			 * @private
			 */
			onProfileMenuItemClick: function() {
				this.sandbox.publish("PushHistoryState", {hash: "UserProfile"});
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
			onExitMenuItemClick: function() {
				Terrasoft.MainMenuUtilities.logout();
			},

			/**
			 * Handles logo click.
			 * @private
			 */
			onLogoClick: function() {
				this.openHomePage();
			},

			/**
			 * Open home page.
			 * @protected
			 */
			openHomePage: function() {
				var isPortalUser = this.get("IsSSP");
				if (isPortalUser) {
					var defaultPortalHomeModule = ConfigurationConstants.DefaultPortalHomeModule;
					this.sandbox.publish("SelectedSideBarItemChanged", defaultPortalHomeModule,
						["sectionMenuModule"]);
					this.sandbox.publish("PushHistoryState", {hash: defaultPortalHomeModule});
				} else {
					var defaultIntroPageName = Terrasoft.configuration.defaultIntroPageName;
					if (defaultIntroPageName) {
						var defaultHomeModule = ConfigurationConstants.DefaultHomeModule;
						var hash = this.Terrasoft.combinePath(defaultHomeModule, defaultIntroPageName);
						this.sandbox.publish("PushHistoryState", {hash: hash});
					}
				}
			},

			/**
			 * Handles system designer button click.
			 * @private
			 */
			onSystemDesignerClick: function() {
				var historyStateHash = this.sandbox.publish("GetHistoryState").hash.historyState;
				var systemDesignerHash = "IntroPage/SystemDesigner";
				if (historyStateHash !== systemDesignerHash) {
					Terrasoft.Mask.show();
					this.sandbox.publish("PushHistoryState", {
						hash: systemDesignerHash
					});
				}
			},

			/**
			 * Handler dev button click.
			 * @private
			 */
			onDevButtonClick: function() {
				var url = Terrasoft.workspaceBaseUrl + "/Dev";
				window.open(url);
			},

			/**
			 * Handler open javascript debug test page button click.
			 * @private
			 */
			openDebugUnitTestPage: function() {
				var url = Terrasoft.workspaceBaseUrl + "/TestTools/Tests.Debug.aspx";
				window.open(url);
			},

			/**
			 * Handler open javascript coverage test page button click.
			 * @private
			 */
			openCoverUnitTestPage: function() {
				var url = Terrasoft.workspaceBaseUrl + "/TestTools/Tests.Debug.Coverage.aspx";
				window.open(url);
			},

			/**
			 * Handles section caption click.
			 * @private
			 */
			onCaptionClick: function() {
				this.updateSection();
			},

			/**
			 * Updates section.
			 * @private
			 */
			updateSection: function() {
				this.sandbox.publish("UpdateSection", null, [this.get("ModuleName") + "_UpdateSection"]);
			},

			/**
			 * Resets filters and updates section.
			 * @private
			 */
			resetSection: function() {
				this.sandbox.publish("ResetSection", null, [this.get("ModuleName") + "_ResetSection"]);
			},

			/**
			 * Handles view button click.
			 * @private
			 */
			onViewButtonClick: function() {
				var tag = arguments[3];
				this.setPressedViewButtons(tag);
				var viewConfig = {
					tag: tag,
					moduleName: this.get("ModuleName")
				};
				this.sandbox.publish("ChangeDataView", viewConfig, [this.sandbox.id + "_" + viewConfig.moduleName]);
			},

			/**
			 * Change view buttons style.
			 * @private
			 * @param {String} viewName View name.
			 */
			setPressedViewButtons: function(viewName) {
				var buttons = this.get("ViewButtons");
				var items = buttons.getItems();
				var isPressed = false;
				this.Terrasoft.each(items, function(item) {
					if (item.tag === viewName) {
						isPressed = true;
						this.set(item.tag + "Active", true);
					} else {
						this.set(item.tag + "Active", false);
					}
				}, this);
				if (!isPressed && items.length > 0) {
					this.set(items[0].tag + "Active", true);
				}
			},

			/**
			 * Sets main header visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setMainHeaderVisible: function(config) {
				var mainHeader = this.Ext.get("mainHeader");
				var centerPanelContainer = this.Ext.get("centerPanelContainer");
				if (!mainHeader && !centerPanelContainer) {
					return;
				}
				if (config.hasOwnProperty("isMainHeaderVisible")) {
					mainHeader.setVisible(config.isMainHeaderVisible);
					centerPanelContainer.addCls("center-panel-no-padding-top");
				} else {
					mainHeader.setVisible(true);
					centerPanelContainer.removeCls("center-panel-no-padding-top");
				}
			},

			/**
			 * Sets main header visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setUserPhotoVisible: function(config) {
				if (config.hasOwnProperty("isUserPhotoVisible")) {
					this.set("IsUserPhotoVisible", config.isUserPhotoVisible);
				} else {
					this.set("IsUserPhotoVisible", true);
				}
			},

			/**
			 * Sets caption visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setCaptionVisible: function(config) {
				if (config.hasOwnProperty("isCaptionVisible")) {
					this.set("IsCaptionVisible", config.isCaptionVisible);
				} else {
					this.set("IsCaptionVisible", true);
				}
			},

			/**
			 * Sets is main menu flag and logo visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setIsMainMenuAndLogoVisible: function(config) {
				var logoVisible = true;
				if (config.hasOwnProperty("isMainMenu")) {
					this.set("IsMainMenu", config.isMainMenu);
					logoVisible = false;
					this.set("IsLogoVisible", logoVisible);
				} else {
					this.set("IsMainMenu", false);
					this.set("IsLogoVisible", logoVisible);
				}
				if (config.hasOwnProperty("isLogoVisible")) {
					this.set("IsLogoVisible", config.isLogoVisible);
				} else {
					this.set("IsLogoVisible", logoVisible);
				}
			},

			/**
			 * Sets main header panel state by config.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setSettings: function(config) {
				this.setMainHeaderVisible(config);
				this.setCaptionVisible(config);
				this.setIsMainMenuAndLogoVisible(config);
				this.commandLineVisible(config);
				this.contextHelpVisible(config);
				this.setSystemDesignerVisible(config);
				this.setUserPhotoVisible(config);
			},

			/**
			 * Sets command line visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			commandLineVisible: function(config) {
				var isCommandLineVisible = !this.get("IsSSP");
				if (isCommandLineVisible && config.hasOwnProperty("isCommandLineVisible")) {
					isCommandLineVisible = config.isCommandLineVisible;
				}
				if (this.get("IsCommandLineVisible") !== isCommandLineVisible) {
					this.set("IsCommandLineVisible", isCommandLineVisible);
					this.reloadCommandModule();
				}
			},

			/**
			 * Sets context help visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			contextHelpVisible: function(config) {
				var isContextHelpVisible = !this.get("IsSSP");
				if (isContextHelpVisible && config.hasOwnProperty("isContextHelpVisible")) {
					isContextHelpVisible = config.isContextHelpVisible;
				}
				if (this.get("IsContextHelpVisible") !== isContextHelpVisible) {
					this.set("IsContextHelpVisible", isContextHelpVisible);
					this.reloadContextHelpModule();
				}
			},

			/**
			 * Sets system designer button visible flag.
			 * @private
			 * @param {Object} config Main header panel config.
			 */
			setSystemDesignerVisible: function(config) {
				var isSystemDesignerVisible = !this.get("IsSSP");
				if (config.hasOwnProperty("isSystemDesignerVisible")) {
					isSystemDesignerVisible = config.isSystemDesignerVisible;
				}
				this.Terrasoft.SysSettings.querySysSettings(["BuildType"], function(sysSettings) {
					var buildType = sysSettings.BuildType;
					if (buildType && (buildType.value === ConfigurationConstants.BuildType.Public)) {
						isSystemDesignerVisible = false;
					}
					this.set("IsSystemDesignerVisible", isSystemDesignerVisible);
				}, this);
			},

			/**
			 * Clears main header caption.
			 * @private
			 */
			clearHeader: function() {
				var mainHeader = this.Ext.get("mainHeader");
				if (mainHeader && !mainHeader.isVisible()) {
					mainHeader.setVisible(true);
				}
				this.set("HeaderCaption", "");
				this.set("HeaderCaptionMarkerValue", "");
			},

			/**
			 * todo #CRM-21525.
			 * Clears and re-render container.
			 * @param {String} containerId Containers id.
			 * @param {Boolean} needRerender Is need render flag.
			 */
			clearContainerItems: function(containerId, needRerender) {
				var container = this.Ext.getCmp(containerId);
				if (container && container.getWrapEl()) {
					if (container.getWrapEl()) {
						container.items.each(function(item) {
							container.remove(item);
							item.destroy();
						}, this);
					}
				}
				if (needRerender) {
					container.reRender();
				}
			},

			/**
			 * Creates view button config.
			 * @private
			 * @param {Object} config View config.
			 * @return {Object} View button config.
			 */
			createViewIconButtonConfig: function(config) {
				var buttonConfig = iconHelper.createIconButtonConfig(config);
				buttonConfig.imageConfig = {
					source: Terrasoft.ImageSources.URL,
					url: Terrasoft.ImageUrlBuilder.getUrl(config.icon)
				};
				return buttonConfig;
			},

			/**
			 * Creates button config.
			 * @private
			 * @param {Object} config Config
			 * @return {Object} Button config.
			 */
			createButtonConfig: function(config) {
				var buttonConfig = {
					caption: config.caption ? config.caption : config.name,
					tag: [config.name, config.caption],
					markerValue: [config.name, config.caption],
					hint: config.hint,
					className: "Terrasoft.Button",
					style: this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
					pressed: {bindTo: config.name + "Active"},
					click: {bindTo: config.func ? config.func : "onViewButtonClick"},
					classes: {
						textClass: ["view-no-images-class"],
						pressedClass: ["pressed-button-view"]
					},
					menu: {
						items: {
							bindTo: "ProfileMenuCollection"
						},
						ulClass: "profile-menu"
					}
				};
				return buttonConfig;
			},

			/**
			 * Gets contact photo config.
			 * @private
			 * @return {Object} Photo config.
			 */
			getContactPhoto: function() {
				var photoId = this.get("ContactPhotoId");
				if (this.Terrasoft.isEmptyGUID(photoId)) {
					return this.get("Resources.Images.ContactEmptyPhoto");
				}
				var photoConfig = {
					source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: "SysImage",
						columnName: "Data",
						primaryColumnValue: photoId
					}
				};
				return {
					source: this.Terrasoft.ImageSources.URL,
					url: this.Terrasoft.ImageUrlBuilder.getUrl(photoConfig)
				};
			},

			/**
			 * Returns logo configuration.
			 * @param {String} logoName Logo name.
			 * @return {Object} Logo configuration.
			 */
			getLogoImageConfig: function(logoName) {
				var config = {
					params: {
						r: logoName
					},
					source: this.Terrasoft.ImageSources.SYS_SETTING
				};
				return this.Terrasoft.ImageUrlBuilder.getUrl(config);
			},

			/**
			 * @private
			 */
			_initConfigurationVersion: function() {
				let version = Terrasoft.productVersion;
				if (Terrasoft.isDebug) {
					version += " Debug";
				}
				this.set("ConfigurationVersion", version);
			},

			/**
			 * @private
			 */
			_initShowConfigurationVersion: function(callback, scope) {
				Terrasoft.SysSettings.querySysSettingsItem("ShowConfigurationVersion", function(value) {
					this.$ShowConfigurationVersion = value;
					callback.call(scope);
				}, this);
			},

			/**
			 * @private
			 */
			_initShowJSUnitTestsButton: function() {
				if (Terrasoft.isDebug) {
					var ciServerUrl = "//tsbuild-app/img/icons/teamcity.svg";
					this._callIfUrlExists(ciServerUrl, function(show) {
						this.set("ShowJSUnitTestsButton", show);
					}, this);
				}
			},

			/**
			 * @private
			 */
			_callIfUrlExists: function(url, callback, scope) {
				var img = new Image();
				img.onload = function() {
					scope.Ext.callback(callback, scope, [true]);
				};
				img.onerror = function() {
					scope.Ext.callback(callback, scope, [false]);
				};
				img.src = url;
			}

		},
		diff: [
			//main header
			{
				"operation": "insert",
				"name": "MainHeaderContainer",
				"values": {
					"id": "mainHeaderContainer",
					"selectors": {"wrapEl": "#mainHeaderContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-header", "fixed"],
					"items": [],
					"tips": []
				}
			},
			//left header
			{
				"operation": "insert",
				"name": "LeftHeaderContainer",
				"parentName": "MainHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "left-header-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-header-container-class"],
					"items": []
				}
			},
			//main header menu logo
			{
				"operation": "insert",
				"name": "MenuLogoImageContainer",
				"parentName": "LeftHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "main-header-menu-logo-image-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-header-menu-logo-image-container-class"],
					"items": [],
					"visible": {"bindTo": "IsMainMenu"}
				}
			},
			{
				"operation": "insert",
				"name": "MenuLogoImage",
				"parentName": "MenuLogoImageContainer",
				"propertyName": "items",
				"values": {
					"id": "menuLogoImage",
					"selectors": {
						wrapEl: "#menuLogoImage"
					},
					"getSrcMethod": "getLogoImageConfig",
					"tag": "MenuLogoImage",
					"readonly": true,
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
					"classes": {
						"wrapClass": ["main-header-menu-logo-image"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "MenuLogoConfigurationVersionLabel",
				"parentName": "MenuLogoImageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelClass": ["configuration-version-label"],
					"caption": {"bindTo": "ConfigurationVersion"},
					"visible": {"bindTo": "ShowConfigurationVersion"}
				}
			},
			{
				"operation": "insert",
				"name": "MainHeaderCaption",
				"parentName": "LeftHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "caption",
					"selectors": {wrapEl: "#caption"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["caption-class"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CaptionValue",
				"parentName": "MainHeaderCaption",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["header-section-caption-class", "cursor-pointer"]
					},
					"caption": {"bindTo": "HeaderCaption"},
					"markerValue": {
						"bindTo": "HeaderCaptionMarkerValue"
					},
					"visible": {
						"bindTo": "IsCaptionVisible"
					},
					"click": {
						"bindTo": "onCaptionClick"
					}
				}
			},
			// button switch
			{
				"operation": "insert",
				"name": "ViewButtonsContainer",
				"parentName": "LeftHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "button-switch",
					"selectors": {wrapEl: "#button-switch"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["button-class"],
					"items": [],
					"visible": {
						"bindTo": "getIsButtonsVisible"
					}
				}
			},
			//right header
			{
				"operation": "insert",
				"name": "RightHeaderContainer",
				"parentName": "MainHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "right-header-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["right-header-container-class"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PageHeaderContainer",
				"parentName": "RightHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "PageHeaderContainer",
					"selectors": {"wrapEl": "#PageHeaderContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["page-header-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PageHeaderCaption",
				"parentName": "PageHeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "PageHeaderCaption"},
					"markerValue": {
						"bindTo": "HeaderCaptionMarkerValue"
					}
				}
			},
			// header right image
			{
				"operation": "insert",
				"name": "RightButtonsContainer",
				"parentName": "RightHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "header-right-image-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["context-right-image-class"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "InnerRightButtonsContainer",
				"parentName": "RightButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["inner-context-right-image-class"],
					"items": []
				}
			},
			// main header image
			{
				"operation": "insert",
				"name": "UserProfileContainer",
				"parentName": "InnerRightButtonsContainer",
				"propertyName": "items",
				"values": {
					"id": "main-header-image-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-header-image-container-class"],
					"items": [],
					"visible": {"bindTo": "IsUserPhotoVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "UserProfileButton",
				"parentName": "UserProfileContainer",
				"propertyName": "items",
				"values": {
					"id": "profile-user-button",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"selectors": {
						wrapEl: "#profile-user-button"
					},
					"classes": {
						"wrapperClass": ["photo-icon-wrapper"],
						"imageClass": ["photo-icon"],
						"markerClass": ["profile-photo-btn-marker-class"]
					},
					"hint": {"bindTo": "Resources.Strings.ProfileImageButtonHintCaption"},
					"controlConfig": {
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
						"imageConfig": {
							"bindTo": "getContactPhoto"
						},
						"menu": {
							"items": {
								"bindTo": "ProfileMenuCollection"
							},
							"ulClass": "profile-menu"
						}
					},
					"markerValue": "userProfileButton"
				}
			},
			//system designer
			{
				"operation": "insert",
				"name": "SystemDesignerContainer",
				"parentName": "InnerRightButtonsContainer",
				"propertyName": "items",
				"values": {
					"id": "header-system-designer-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["context-system-designer-class"],
					"items": [],
					"visible": {"bindTo": "IsSystemDesignerVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "SystemDesignerButton",
				"parentName": "SystemDesignerContainer",
				"propertyName": "items",
				"values": {
					"id": "view-button-system-designer",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"selectors": {
						"wrapEl": "#view-button-system-designer"
					},
					"classes": {
						"wrapperClass": ["system-designer-button"],
						"pressedClass": ["pressed-button-view"],
						"imageClass": ["system-designer-image", "view-images-class"]
					},
					"hint": {"bindTo": "Resources.Strings.SystemDesignerCaption"},
					"tips": [],
					"click": {
						"bindTo": "onSystemDesignerClick"
					},
					"canExecute": {
						"bindTo": "canBeDestroyed"
					},
					"imageConfig": {"bindTo": "Resources.Images.SystemDesignerIcon"},
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
					"markerValue": "system-designer",
					"tag": "system-designer"
				}
			},
			{
				"operation": "insert",
				"parentName": "SystemDesignerButton",
				"propertyName": "tips",
				"name": "system-designer-tip",
				"values": {
					"content": {"bindTo": "Resources.Strings.SystemDesignerTip"},
					"contextIdList": ["0", "IntroPage"],
					"behaviour": {
						"displayEvent": this.Terrasoft.controls.TipEnums.displayEvent.NONE
					}
				}
			},
			// context help
			{
				"operation": "insert",
				"name": "ContextHelpContainer",
				"parentName": "InnerRightButtonsContainer",
				"propertyName": "items",
				"values": {
					"id": "header-context-help-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["context-help-class"],
					"items": [],
					"visible": {"bindTo": "IsContextHelpVisible"}
				}
			},
			// dev
			{
				"operation": "insert",
				"name": "DevButtonContainer",
				"parentName": "InnerRightButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["context-system-designer-class"],
					"items": [],
					"visible": Terrasoft.isDebug
				}
			},
			{
				"operation": "insert",
				"name": "DevButton",
				"parentName": "DevButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"wrapperClass": ["system-designer-button"],
						"pressedClass": ["pressed-button-view"],
						"imageClass": ["dev-button-image", "view-images-class"]
					},
					"hint": {
						"bindTo": "Resources.Strings.DevButtonCaption"
					},
					"click": {
						"bindTo": "onDevButtonClick"
					},
					"imageConfig": {
						"bindTo": "Resources.Images.DevButtonIcon"
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				}
			},
			{
				"operation": "insert",
				"name": "JSUnitTestsButton",
				"parentName": "DevButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"wrapperClass": ["system-designer-button"],
						"pressedClass": ["pressed-button-view"],
						"imageClass": ["dev-button-image", "view-images-class"],
						"markerClass": ["js-unit-tests-btn-marker-class"]
					},
					"hint": {
						"bindTo": "Resources.Strings.JSUnitTestsButtonCaption"
					},
					"controlConfig": {
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
						"imageConfig": {
							"bindTo": "Resources.Images.JSUnitTestsButtonIcon"
						},
						"menu": {
							"items": [{
								"caption": {"bindTo": "Resources.Strings.OpenDebugUnitTestPageCaption"},
								"click": {"bindTo": "openDebugUnitTestPage"}
							}, {
								"caption": {"bindTo": "Resources.Strings.OpenCoverUnitTestPageCaption"},
								"click": {"bindTo": "openCoverUnitTestPage"}
							}],
							"ulClass": "profile-menu"
						}
					},
					"visible": {"bindTo": "ShowJSUnitTestsButton"}
				}
			},
			//header command line
			{
				"operation": "insert",
				"name": "CommandLineContainer",
				"parentName": "RightHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "header-command-line-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["command-line-class"],
					"items": [],
					"visible": {"bindTo": "IsCommandLineVisible"}
				}
			},
			//main header logo
			{
				"operation": "insert",
				"name": "RightLogoContainer",
				"parentName": "RightHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "main-header-logo-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-header-logo-container-class"],
					"visible": {"bindTo": "IsLogoVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "logoImage",
				"parentName": "RightLogoContainer",
				"propertyName": "items",
				"values": {
					"id": "logoImage",
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"selectors": {
						"wrapEl": "#logoImage"
					},
					"hint": {"bindTo": "Resources.Strings.LogoHint"},
					"className": "Terrasoft.ImageView",
					"imageSrc": {"bindTo": "getLogoImageConfig"},
					"tag": "HeaderLogoImage",
					"click": {"bindTo": "onLogoClick"},
					"canExecute": {
						"bindTo": "canBeDestroyed"
					},
					"classes": {
						"wrapClass": ["main-header-logo-image", "cursor-pointer"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "LogonConfigurationVersionLabel",
				"parentName": "RightLogoContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"labelClass": ["configuration-version-label"],
					"caption": {"bindTo": "ConfigurationVersion"}
				}
			}
		]
	};
});

define('MainHeaderSchemaEmailMiningResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("MainHeaderSchemaEmailMining", [],
	function() {
		return {
			messages: {
				/**
				 * Update contact enrichment page visibility.
				 */
				"ContactEnrichmentPageVisibilityChanged": {
					"mode": Terrasoft.MessageMode.PTP,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			attributes: {

				/**
				 * Signs that contact enrichment page is visible.
				 * @type {Boolean}
				 */
				"ContactEnrichmentPageVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Signs that contact enrichment page is visible.
				 * @type {Boolean}
				 */
				"ContactEnrichmentModuleContainerId": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": "ContactEnrichmentModuleContainer"
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeServerChannelEvents();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
				 * @overridden
				 */
				destroy: function() {
					this.unsubscribeServerChannelEvents();
					this.callParent(arguments);
				},

				/**
				 * Removes viewmodel subscription to server messages.
				 * @protected
				 */
				unsubscribeServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
				},

				/**
				 * Subscribes viewmodel to server messages.
				 * @protected
				 */
				subscribeServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
				},

				/**
				 * Server message handler. Show enrichment error message to console, if occurred one.
				 * @protected
				 * @param {Object} scope Message scope.
				 * @param {Object} message Server messsage.
				 */
				onServerChannelMessage: function(scope, message) {
					if (message && message.Header && message.Header.Sender !== "EmailEnrichmentError") {
						return;
					}
					var receivedMessage = this.Ext.decode(message.Body);
					this.log(Ext.String.format("Global enrichment error: {0};",
							receivedMessage.errorText));
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("ContactEnrichmentPageVisibilityChanged",
						this.onContactEnrichmentPageVisibilityChanged.bind(this));
				},

				/**
				 * Handles changing contact enrichment page visibility.
				 * @protected
				 * @virtual
				 * @param {Object} tag Enrichment arguments.
				 * @param {Boolean} tag.isVisible Sign that contact enrichment page is visible or not.
				 * @param {String} tag.contactId Contact identifier.
				 * @param {String} tag.contactName Contact name.
				 * @param {String} tag.enrchTextDataId Enrichment text data identifier.
				 * @param {String} tag.source Source item for web analytics.
				 */
				onContactEnrichmentPageVisibilityChanged: function(tag) {
					var args = Ext.decode(tag);
					var showEnrichmentPage = args.isVisible;
					this.set("ContactEnrichmentPageVisible", showEnrichmentPage);
					if (!showEnrichmentPage) {
						return;
					}
					this.sandbox.loadModule("BaseSchemaModuleV2", {
						renderTo: this.get("ContactEnrichmentModuleContainerId"),
						instanceConfig: {
							parameters: {
								viewModelConfig: {
									ContactId: args.contactId,
									ContactName: args.contactName,
									EnrchTextDataId: args.enrchTextDataId,
									EnrchEmailDataId: args.enrchEmailDataId,
									CallerSource: args.source
								}
							},
							schemaName: "ContactEnrichmentSchema",
							isSchemaConfigInitialized: true,
							useHistoryState: false
						}
					});
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "ContactEnrichmentModuleContainer",
					"parentName": "communicationPanelContent",
					"propertyName": "items",
					"values": {
						"id": "ContactEnrichmentModuleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "ContactEnrichmentPageVisible"
						},
						"items": []
					}
				}
			]
		};
	});

define('MainHeaderSchemaCTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("MainHeaderSchemaCTIBase", ["CtiConstants"],
		function(CtiConstants) {
			return {
				attributes: {
					/**
					 * ####### ### ######### #########.
					 * @private
					 * @type {String}
					 */
					"AgentState": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * Current agent state display value.
					 * @private
					 * @type {String}
					 */
					"AgentStateDisplayValue": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: ""
					},

					/**
					 * ######### ######### #########.
					 * @private
					 * @type {Terrasoft.Collection}
					 */
					"AgentStates": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
						value: null
					}
				},
				methods: {

					/**
					 * @inheritdoc Terasoft.MainHeaderSchemaViewModel#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						var ctiModel = Terrasoft.CtiModel;
						if (ctiModel && ctiModel.get("IsConnected")) {
							this.onCtiPanelConnected();
						}
						this.sandbox.subscribe("AgentStateChanged", function(stateCode) {
							this.set("AgentState", stateCode);
						}, this);
						this.sandbox.subscribe("CtiPanelConnected", this.onCtiPanelConnected, this);
						this.on("change:AgentState", this.onAgentStateChanged, this);
					},

					/**
					 * ########## ############ ###### ######### ######### ### ###### #######.
					 * @private
					 * @return {Object} ############ ###########.
					 */
					getOperatorStatusProfileIcon: function() {
						var stateCode = this.get("AgentState");
						return this.getProfileMenuStatusIcon(stateCode);
					},

					/**
					 * ############ ########## # cti #######.
					 * @private
					 */
					onCtiPanelConnected: function() {
						this.executeAgentStateQuery(function(result) {
							var agentStates = this.getAgentStates(result);
							this.set("AgentStates", agentStates);
							var ctiModel = Terrasoft.CtiModel;
							if (ctiModel) {
								var stateCode = ctiModel.get("AgentState");
								this.set("AgentState", stateCode);
								this.set("AgentStateDisplayValue", this.getAgentStateDisplayValue(stateCode));
							}
							this.generateAgentStateMenuItems(agentStates, this.loadProfileButtonMenu);
						});
					},

					/**
					 * ######### ###### # ## ## ####### ######### #########.
					 * @param {Function} callback ####### ######### ######.
					 * @private
					 */
					executeAgentStateQuery: function(callback) {
						var cacheKey = "SysMsgUserState_ProfileMenuStatuses";
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SysMsgUserState",
							clientESQCacheParameters: {
								cacheItemName: cacheKey
							},
							serverESQCacheParameters: {
								cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
								cacheGroup: "SysMsgUserState",
								cacheItemName: cacheKey
							}
						});
						esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
						esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
						esq.addColumn("Code", "Code");
						esq.addColumn("Icon", "Icon");
						esq.addColumn("IsDisplayOnly", "IsDisplayOnly");
						esq.addColumn("[SysMsgUserStateReason:SysMsgUserState].Code", "StateReasonCode");
						esq.addColumn("[SysMsgUserStateReason:SysMsgUserState].Name", "StateReasonName");
						esq.filters.add("filterSysMsgUserState", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[SysMsgUserStateInLib:SysMsgUserState].SysMsgLib",
								Terrasoft.SysValue.CTI.sysMsgLibId));
						esq.getEntityCollection(callback, this);
					},

					/**
					 * ########## ############ ########### ###### #### ######### #########.
					 * @param {Object} image ######, # ####### ########### ########### ## #### ######.
					 * @param {String} image.value ############# ###########.
					 * @return {Object} ############ ###########.
					 */
					getAgentStateIconConfig: function(image) {
						var iconId = image && image.value;
						if (Ext.isEmpty(iconId) || this.Terrasoft.isEmptyGUID(iconId)) {
							iconId = CtiConstants.DefaultSysMsgUserStateIconId;
						}
						var iconConfig = {
							source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
							params: {
								schemaName: "SysMsgUserStateIcon",
								columnName: "Image",
								primaryColumnValue: iconId
							}
						};
						return {
							source: Terrasoft.ImageSources.URL,
							url: Terrasoft.ImageUrlBuilder.getUrl(iconConfig)
						};
					},

					/**
					 * ######### ######### ######### ######### ## ########## ####### ####### # ##.
					 * @param {Object} agentStatesQueryResult ######### ####### # ## ## ####### ######### #########.
					 * @returns {Terrasoft.Collection} ######### ######### #########.
					 * @private
					 */
					getAgentStates: function(agentStatesQueryResult) {
						var agentStates = new Terrasoft.Collection();
						agentStatesQueryResult.collection.each(function(item) {
							var valueCode = item.get("Code");
							var agentState = agentStates.find(valueCode);
							if (!agentState) {
								agentState = {
									value: item.get("Id"),
									displayValue: item.get("Name"),
									code: valueCode,
									iconConfig: this.getAgentStateIconConfig(item.get("Icon")),
									isDisplayOnly: item.get("IsDisplayOnly"),
									reasons: null
								};
								agentStates.add(valueCode, agentState);
							}
							var stateReasonCode = item.get("StateReasonCode");
							if (Ext.isEmpty(stateReasonCode)) {
								return;
							}
							var stateReasonName = item.get("StateReasonName");
							agentState.reasons = agentState.reasons || new Terrasoft.Collection();
							agentState.reasons.add(stateReasonCode, {
								code: stateReasonCode,
								displayValue: stateReasonName
							});
						}, this);
						return agentStates;
					},

					/**
					 * Returns agent state display value by code.
					 * @private
					 * @param {String} stateCode Code of the agent state.
					 * @return {String}
					 */
					getAgentStateDisplayValue: function(stateCode) {
						var agentStates = this.get("AgentStates");
						if (Ext.isEmpty(agentStates)) {
							return "";
						}
						var agentState = agentStates.find(stateCode);
						var agentStateDisplayValue = Ext.isEmpty(agentState) ? "" : agentState.displayValue;
						return agentStateDisplayValue;
					},

					/**
					 * ######### ######### ###### ######### ######### #########.
					 * @param {String} stateCode ### ######### #########.
					 * @param {Terrasoft.Collection} reasons ####### ######### #########.
					 * @return {Terrasoft.BaseViewModelCollection} ######### ###### ######### #########.
					 * @private
					 */
					getAgentStateReasons: function(stateCode, reasons) {
						var reasonCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
						reasons.each(function(reason) {
							reasonCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Caption: reason.displayValue,
									Tag: stateCode + "/" + reason.code,
									Click: {bindTo: "onOperatorStatusReasonChange"}
								}
							}));
						}, this);
						return reasonCollection;
					},

					/**
					 * ######### ###### #### ######### ######### # #### ###### #######.
					 * @param {Terrasoft.Collection} agentStates ######### ######### #########.
					 * @param {Function} callback ####### ######### ######.
					 * @private
					 */
					generateAgentStateMenuItems: function(agentStates, callback) {
						var profileMenuCollection = this.get("ProfileMenuCollection");
						profileMenuCollection.clear();
						agentStates.each(function(item) {
							if (item.isDisplayOnly) {
								return true;
							}
							var hasReasons = !this.Ext.isEmpty(item.reasons);
							var menuItem = this.Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Caption: item.displayValue,
									MarkerValue: item.displayValue,
									Tag: item.code,
									ImageConfig: this.getProfileMenuStatusIcon(item.code),
									Click: hasReasons ? null : {bindTo: "onOperatorStatusChange"},
									Items: hasReasons ? this.getAgentStateReasons(item.code, item.reasons) : null
								}
							});
							profileMenuCollection.addItem(menuItem);
						}, this);
						profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Type: "Terrasoft.MenuSeparator",
								Caption: ""
							}
						}));
						callback.call(this);
					},

					/**
					 * ########## ############ ###### #### ######### #########.
					 * @private
					 * @param {String} stateCode ### c######## #########.
					 * @return {Object} ############ ###########.
					 */
					getProfileMenuStatusIcon: function(stateCode) {
						var agentStates = this.get("AgentStates");
						var agentState = agentStates && agentStates.find(stateCode);
						return agentState && agentState.iconConfig;
					},

					/**
					 * ############# ######### #########.
					 * @param {Object} tag ################# ######.
					 * @private
					 */
					onOperatorStatusChange: function(tag) {
						var ctiModel = Terrasoft.CtiModel;
						ctiModel.setAgentState(tag);
					},

					/**
					 * ############# ######### ######### # ####### ######### #########.
					 * @param {Object} tag ################# ######.
					 * @private
					 */
					onOperatorStatusReasonChange: function(tag) {
						var tagParams = tag.split("/");
						var agentState = tagParams[0];
						var agentStateReasonCode = tagParams[1];
						var ctiModel = Terrasoft.CtiModel;
						ctiModel.setAgentState(agentState, agentStateReasonCode);
					},

					/**
					 * Handler of the agent state attribute change event.
					 * @param {Backbone.Model} model Model.
					 * @param {String} stateCode Agent state code.
					 * @private
					 */
					onAgentStateChanged: function(model, stateCode) {
						this.set("AgentStateDisplayValue", this.getAgentStateDisplayValue(stateCode));
					}
				},
				diff: [
					{
						"operation": "insert",
						"name": "operatorStatusIcon",
						"parentName": "UserProfileContainer",
						"propertyName": "items",
						"values": {
							"id": "view-button-operatorStatusIcon",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"selectors": {
								wrapEl: "#view-button-operatorStatusIcon"
							},
							"classes": {
								"wrapperClass": ["operator-status-icon-wrapper"],
								"pressedClass": ["pressed-button-view"],
								"imageClass": ["operator-status-icon", "view-images-class"]
							},
							"hint": {"bindTo": "AgentStateDisplayValue"},
							"tips": [],
							"click": {"bindTo": "onViewButtonClick"},
							"imageConfig": {"bindTo": "getOperatorStatusProfileIcon"},
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							"markerValue": {"bindTo": "AgentState"},
							"tag": "operatorStatusIcon"
						}
					}
				]
			};
		});

define("MainHeaderSchema", ["PortalClientConstants"], function(PortalConstants) {
	return {
		attributes: {
			/**
			 * Binding attribute for "Company profile" menu item visibility.
			 */
			"canGoToSspAccountPage": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			"OrganizationId": {
				"dataValueType": this.Terrasoft.DataValueType.GUID,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},

		methods: {
			/**
			 * @inheritDoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function() {
				this.initAttributes();
				this.callParent(arguments);
			},

			/**
			 * Initialize schema attributes.
			 */
			initAttributes: function() {
				if (this.getIsFeatureEnabled("PortalUserManagementV2")) {
					this.initCanGoToSspAccountPage();
				}
			},

			/**
			 * Set up canGoToSspAccountPage attribute.
			 */
			initCanGoToSspAccountPage: function() {
				if (!Terrasoft.isCurrentUserSsp() || !Terrasoft.SysValue.CURRENT_USER_ACCOUNT.value) {
					this.set("canGoToSspAccountPage", false);
					return;
				}
				const serviceConfig = {serviceName: "SspUserManagementService", methodName: "GetSspAccountInfo"};
				this.callService(serviceConfig, this.switchCanGoToSspAccountPage, this);
			},

			/**
			 * @inheritdoc Terrasoft.MainHeaderSchema#loadProfileButtonMenu
			 * @override
			 */
			loadProfileButtonMenu: function() {
				this.callParent(arguments);
				if (Terrasoft.isCurrentUserSsp() && this.getIsFeatureEnabled("SSPUserContactPage")) {
					this.addExtendedUserProfileButtonMenu();
					this.changeProfileIcon();
				}
				if (this.getIsFeatureEnabled("PortalUserManagementV2") && Terrasoft.isCurrentUserSsp()) {
					this.addSspAccountButtonsToProfileButtonMenu();
				}
				if (Terrasoft.isCurrentUserSsp()) {
					this.changeExitIcon();
				}
			},

			/**
			 * Change User profile button icon to portal user profile icon.
			 * @protected
			 */
			changeProfileIcon: function() {
				const profileMenuCollection = this.get("ProfileMenuCollection");
				const userProfile = profileMenuCollection.findByFn(function(item) {
					return item.$Id === "profile-menu-item";
				});
				if (userProfile) {
					profileMenuCollection.remove(userProfile);
					profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: "profile-menu-item",
							Caption: this.get("Resources.Strings.SspProfileCaption"),
							Click: {
								bindTo: "onProfileMenuItemClick"
							},
							ImageConfig: this.get("Resources.Images.SspProfileIcon"),
							MarkerValue: this.get("Resources.Strings.SspProfileCaption")
						}
					}), 0);
				}
			},

			/**
			 * Change Exit button icon to portal exit icon.
			 * @protected
			 */
			changeExitIcon: function() {
				const profileMenuCollection = this.get("ProfileMenuCollection");
				const exit = profileMenuCollection.findByFn(function(item) {
					return item.$Id === "exit-menu-item";
				});
				if (exit) {
					profileMenuCollection.remove(exit);
					profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: "exit-menu-item",
							Caption: this.get("Resources.Strings.ExitMenuItemCaption"),
							Click: {
								bindTo: "onExitMenuItemClick"
							},
							ImageConfig: this.get("Resources.Images.SspExitButton"),
							MarkerValue: this.get("Resources.Strings.ExitMenuItemCaption")
						}
					}));
				}
			},

			/**
			 * Add menu item for open SSP account page to profile menu button.
			 * @protected
			 */
			addSspAccountButtonsToProfileButtonMenu: function() {
				const profileMenuCollection = this.get("ProfileMenuCollection");
				profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Id: "company-profile-menu-item",
						Caption: this.get("Resources.Strings.CompanyProfileCaption"),
						Click: {
							bindTo: "onGoToSspAccountPageMenuItemClick"
						},
						ImageConfig: this.get("Resources.Images.CompanyProfileIcon"),
						Visible: {
							bindTo: "canGoToSspAccountPage"
						},
						MarkerValue: this.get("Resources.Strings.CompanyProfileCaption")
					}
				}), 1);
			},

			/**
			 * Forward user to SSP account profile.
			 * @protected
			 */
			onGoToSspAccountPageMenuItemClick: function() {
				const path = this.Terrasoft.combinePath("CardModuleV2",
					PortalConstants.DesignerPagesName.OrganizationPageSchema,
					"edit", this.get("OrganizationId"));
				const historyStateConfig = {hash: path};
				this.sandbox.publish("PushHistoryState", historyStateConfig);
			},

			/**
			 * Switch visibility of "Company profile" menu item based on service response.
			 * @protected
			 * @param {Object} response SspUserManagementService/GetSspAccountInfo service response.
			 */
			switchCanGoToSspAccountPage: function(response) {
				const result = response && response.GetSspAccountInfoResult;
				if (result && result.success && result.SspAccountId && !Terrasoft.isEmptyGUID(result.SspAccountId)) {
					this.set("canGoToSspAccountPage", true);
					this.set("OrganizationId", result.SspAccountId);
				}
			},

			/**
			 * Add menu item for open SSP account page to profile menu button.
			 * @protected
			 */
			addExtendedUserProfileButtonMenu: function() {
				const profileMenuCollection = this.get("ProfileMenuCollection");
				const pmi = profileMenuCollection.filter(function(item) {
					return item.$Id === "profile-menu-item";
				});
				if (pmi && pmi.getCount() > 0) {
					profileMenuCollection.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: "extended-user-profile-menu-item",
							Caption: this.get("Resources.Strings.ExtendedUserProfileCaption"),
							ImageConfig: this.get("Resources.Images.UserSettingsIcon"),
							Click: {
								bindTo: "openSettingsProfile"
							}
						}
					}), 1);
				}
			},

			/**
			 * Forward user to SSP account profile.
			 * @protected
			 */
			openSettingsProfile: function() {
				this.onProfileMenuItemClick(true);
			},

			/**
			 * Open page which is related with user contact.
			 * @protected
			 */
			openUserProfilePage: function() {
				const path = this.Terrasoft.combinePath("CardModuleV2",
					PortalConstants.DesignerPagesName.ProfileContactPageSchema, "edit",
					Terrasoft.SysValue.CURRENT_USER_CONTACT.value);
				const historyStateConfig = {hash: path};
				this.sandbox.publish("PushHistoryState", historyStateConfig);
			},

			/**
			 * @inheritdoc Terrasoft.MainHeaderSchema#onProfileMenuItemClick.
			 * @override
			 */
			onProfileMenuItemClick: function(callParent) {
				if (this.getIsFeatureEnabled("SSPUserContactPage") && this.Terrasoft.isCurrentUserSsp() &&
					!callParent) {
					this.openUserProfilePage();
				} else {
					this.callParent(arguments);
				}
			}
		}
	};
});


