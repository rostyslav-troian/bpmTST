Terrasoft.configuration.Structures["ContextHelpSchema"] = {innerHierarchyStack: ["ContextHelpSchema"]};
define('ContextHelpSchemaStructure', ['ContextHelpSchemaResources'], function(resources) {return {schemaUId:'f0d4a38d-f8f5-44a4-87d5-c0d5407f20db',schemaCaption: "ContextHelpSchema", parentSchemaName: "", schemaName:'ContextHelpSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContextHelpSchema", ["AcademyUtilities", "ContextHelpSchemaResources", "ContextTipManager", "RightUtilities",
	"HoverMenuButton"], function(AcademyUtilities, resources, ContextTipManager, RightUtilities) {
	return {
		messages: {
			/**
			 * Message to get current history state.
			 */
			"GetHistoryState": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		attributes: {
			/**
			 * System setting name for support request email.
			 * @protected
			 * @type {String}
			 */
			supportEmailSetting: {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "SupportEmailDef"
			},

			/**
			 * System setting name for improving page request email.
			 * @protected
			 * @type {String}
			 */
			feedbackEmailSetting: {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: "ImproveEmailDef"
			},

			/**
			 * Context help section ID.
			 * @protected
			 * @type {Number}
			 */
			contextHelpId: {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				value: 0
			},

			/**
			 * Regulates context help displaying.
			 * @protected
			 * @type {Boolean}
			 */
			enableContextHelp: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Visibility of "show tips" menu item of context help button.
			 * @protected
			 * @type {Boolean}
			 */
			IsShowTipsMenuItemVisible: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Visibility of "Grant access to support" menu item of context help button.
			 * @protected
			 * @type {Boolean}
			 */
			CanAddExternalAccess: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},

		methods: {
			/**
			 * Inits ContextTipManager.
			 * @private
			 */
			initTipManager: function() {
				this.ContextTipManager = ContextTipManager;
			},

			/**
			 * Inits AcademyUtilities.
			 * @private
			 */
			initAcademyUtilities: function() {
				this.AcademyUtilities = AcademyUtilities;
			},

			/**
			 * Creates EntitySchemaQuery instance.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			createEntitySchemaQuery: function() {
				return this.Ext.create("Terrasoft.EntitySchemaQuery", {
					"rootSchemaName": "VwSysSchemaInfo"
				});
			},

			/**
			 * Sets context help configurations.
			 * @private
			 * @param {Object|Number} config Context help config or ID.
			 * @param {Number} config.contextHelpId ID.
			 * @param {String} config.contextHelpCode Code.
			 * @param {String} config.product Product edition.
			 */
			setContextHelp: function(config) {
				var contextHelpId = null;
				if (this.Ext.isNumber(config)) {
					contextHelpId = config;
				} else if (this.Ext.isObject(config)) {
					if (config.contextHelpId) {
						contextHelpId = config.contextHelpId;
					}
					if (config.contextHelpCode) {
						this.set("contextHelpCode", config.contextHelpCode);
					}
					if (config.product) {
						this.set("productEdition", config.product);
					}
				}
				this.set("contextHelpId", contextHelpId);
				this.onContextChanged();
				return true;
			},

			/**
			 * Returns query filter for schema name.
			 * @param {String} schemaName Schema name.
			 * @return {Terrasoft.FilterGroup}
			 */
			getSchemaFilters: function(schemaName) {
				var filters = this.Ext.create("Terrasoft.FilterGroup");
				filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Name",
					schemaName
				));
				return filters;
			},

			/**
			 * Inits context help configurations
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback function context
			 */
			init: function(callback, scope) {
				this.initTipManager();
				this.initAcademyUtilities();
				this.ContextTipManager.on("toolClick", this.onToolClick, this);
				this.ContextTipManager.on("groupChanged", this.onTipsGroupChanged, this);
				const contextModeTools = this.getContextModeTools();
				this.ContextTipManager.setTools(contextModeTools);
				this.callParent([
					function() {
						const sysSettingsNameArray = ["EnableContextHelp"];
						this.Terrasoft.SysSettings.querySysSettings(sysSettingsNameArray, function(values) {
							const enableContextHelp = values.EnableContextHelp;
							if (enableContextHelp) {
								this.sandbox.subscribe("ChangeContextHelpId", function(config) {
									return this.setContextHelp(config);
								}, this, [this.sandbox.id]);
								const config = this.sandbox.publish("GetContextHelpId", null, [this.sandbox.id]);
								this.setContextHelp(config);
								this._initCanAddExternalAccess(function() {
									if (callback) {
										callback.call(scope);
									}
								});
							}
						}, this);
					}, this
				]);
			},

			/**
			 * Initializes CanAddExternalAccess attribute.
			 * @callback {Function} Callback function.
			 * @private
			 */
			_initCanAddExternalAccess: function(callback) {
				RightUtilities.getSchemaOperationRightLevel("ExternalAccess", function(rightLevel) {
					this.set("CanAddExternalAccess", RightUtilities.canAppendSchemaData(rightLevel));
					callback.call(this);
				}, this);
			},


			/**
			 * Returns array of tools for context tips mode.
			 * @protected
			 * @return {Object[]}
			 */
			getContextModeTools: function() {
				return [
					{
						tag: "help",
						classes: {
							wrapperClass: ["context-tips-mode-tool"]
						},
						imageConfig: resources.localizableImages.Help
					},
					{
						tag: "support",
						classes: {
							wrapperClass: ["context-tips-mode-tool"]
						},
						imageConfig: resources.localizableImages.Support
					},
					{
						tag: "feedback",
						classes: {
							wrapperClass: ["context-tips-mode-tool"]
						},
						imageConfig: resources.localizableImages.Feedback
					},
					{
						tag: "close",
						classes: {
							wrapperClass: ["context-tips-mode-tool"]
						},
						imageConfig: resources.localizableImages.CloseIcon
					}
				];
			},

			/**
			 * Gets mailto parameters to form letter accroding to mail action type.
			 * @param {String} tag Mail action type
			 * @return {Object}
			 */
			getMailtoParams: function(tag) {
				var params = {};
				switch (tag) {
					case "support":
						params.mailSetting = this.get("supportEmailSetting");
						params.subjectLocString = this.get("Resources.Strings.SupportSubject");
						params.messageTpl = this.get("Resources.Strings.SupportEmailBodyTemplate");
						break;
					case "feedback":
						params.mailSetting = this.get("feedbackEmailSetting");
						params.subjectLocString = this.get("Resources.Strings.FeedbackSubject");
						params.messageTpl = this.get("Resources.Strings.FeedbackEmailBodyTemplate");
						break;
				}
				return params;
			},
			/**
			 * Handler for click on tool item in context tips mode.
			 * @param {String} tag Tag value of tool.
			 */
			onToolClick: function(tag) {
				switch (tag) {
					case "help":
						this.openAcademy();
						break;
					case "support":
						this.callMailTo(tag);
						break;
					case "feedback":
						this.callMailTo(tag);
						break;
					case "close":
						this.ContextTipManager.hideActiveGroup();
						break;
				}
			},

			/**
			 * Handler for groupChanged event on TipManager.
			 * @param {String} groupId Id of group which is changed.
			 * @param {Boolean} isItemsAdded True if items is added to group, false if items removed.
			 */
			onTipsGroupChanged: function(groupId, isItemsAdded) {
				var tipContextId = this.getCurrentTipContextId();
				if (groupId !== tipContextId) {
					return;
				}
				var tipsMenuItemVisible = this.get("IsShowTipsMenuItemVisible");
				if (tipsMenuItemVisible !== isItemsAdded) {
					this.onContextChanged();
				}
			},

			/**
			 * Handles changing of tips context id.
			 * @protected
			 */
			onContextChanged: function() {
				var tipContextId = this.getCurrentTipContextId();
				var tipsMenuItemVisible = this.get("IsShowTipsMenuItemVisible");
				var tipsCount = this.ContextTipManager.getTipsCount(tipContextId);
				if (!tipsMenuItemVisible && tipsCount > 0) {
					this.set("IsShowTipsMenuItemVisible", true);
				} else if (tipsMenuItemVisible && tipsCount === 0) {
					this.set("IsShowTipsMenuItemVisible", false);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.ContextTipManager.un("toolClick", this.onToolClick, this);
				this.ContextTipManager.un("groupChanged", this.onTipsGroupChanged, this);
				this.callParent(arguments);
			},

			/**
			 * Returns current tips context id.
			 * @protected
			 * @return {String}
			 */
			getCurrentTipContextId: function() {
				var contextHelpId = this.get("contextHelpId");
				var contextHelpCode = this.get("contextHelpCode");
				if (this.Ext.isNumber(contextHelpId)) {
					contextHelpId = contextHelpId.toString();
				}
				return contextHelpCode || contextHelpId;
			},

			/**
			 * Shows registered tips for current context if any exist and returns true otherwise returns false.
			 * @protected
			 * @return {Boolean} True if any tip registered in current context.
			 */
			tryShowTips: function() {
				var tipContextId = this.getCurrentTipContextId();
				var tipsToShow = this.ContextTipManager.getTipsCount(tipContextId);
				if (tipsToShow > 0) {
					this.ContextTipManager.displayGroup(tipContextId, 2);
					return true;
				}
				return false;
			},

			/**
			 * Gets email parameters from system settings and history state.
			 * @protected
			 * @param {String} mailActionType Type of mail action to be performed
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback function context
			 */
			getEmailParameters: function(mailActionType, callback, scope) {
				var params = this.getMailtoParams(mailActionType);
				var mailSetting = params.mailSetting;
				var sysSettingsNameArray = [
					"ProductName",
					"ProductEdition",
					"ConfigurationVersion",
					"PrimaryCulture",
					"CustomerId",
					mailSetting
				];
				var parameters = {};
				this.Terrasoft.SysSettings.querySysSettings(sysSettingsNameArray,
						function(values) {
							if (values) {
								parameters = {
									ProductEdition: values.ProductEdition || "",
									ProductName: values.ProductName || "",
									CustomerID: values.CustomerId || "",
									Version: values.ConfigurationVersion || "",
									Localization: values.PrimaryCulture && values.PrimaryCulture.displayValue || "",
									To: values[mailSetting] || ""
								};
							}
							callback.call(scope, parameters);
						}, this);
			},

			/**
			 * Gets page url parameters
			 * @protected
			 * @return {Object}
			 */
			getUrlParameters: function(callback) {
				var parameters = {};
				var historyStateInfo = this.sandbox.publish("GetHistoryState");
				var hasState = historyStateInfo && historyStateInfo.hash;
				var schemaName = "";
				if (hasState) {
					var hash = historyStateInfo.hash;
					var state = historyStateInfo.state;
					var moduleName = hash.moduleName || "";
					schemaName = state && state.schemaName || hash.entityName || "";
					parameters.Page = moduleName + "_" + schemaName;
				}
				parameters.Host = window.location.hostname;
				var query = this.createEntitySchemaQuery();
				query.addColumn("Caption");
				query.filters.addItem(this.getSchemaFilters(schemaName));
				query.getEntityCollection(function(response) {
					if (response.success && !response.collection.isEmpty()) {
						var item = response.collection.getByIndex(0);
						parameters.PageCaption = item.values.Caption;
					}
					callback(parameters);
				}, this);
			},

			/**
			 * Prepares parameters to form mailto request
			 * @protected
			 * @param {String} mailActionType Type of mail action to be performed
			 * @param {Function} callback Callback function
			 * @param {Object} scope Callback function contex
			 * @return {Object}
			 */
			prepareEmailConfig: function(mailActionType, callback, scope) {
				this.getEmailParameters(mailActionType, function(parameters) {
					this.getUrlParameters(function(urlParameters) {
						var mailConfig = {};
						var params = scope.getMailtoParams(mailActionType);
						var subjectLocString = params.subjectLocString;
						var messageTpl = params.messageTpl;
						var product = encodeURIComponent(this.Ext.String.format("{0} {1}",
							this.Ext.util.Format.htmlDecode(parameters.ProductName) || "",
							parameters.ProductEdition || ""));
						mailConfig.subject = this.Ext.String.format("subject={0} {1}",
							encodeURIComponent(subjectLocString),
							product);
						mailConfig.body = this.Ext.String.format(messageTpl,
							encodeURIComponent(urlParameters.Host),
							encodeURIComponent(parameters.CustomerID),
							product,
							encodeURIComponent(parameters.Version),
							encodeURIComponent(parameters.Localization),
							encodeURIComponent(urlParameters.PageCaption || urlParameters.Page));
						mailConfig.mailTo = this.Ext.String.format("mailto:{0}",
							parameters.To || ""
						);
						callback.call(scope, mailConfig);
					}, this);
				}, this);
			},

			/**
			 * Creates email for customer support
			 * @param {String} mailActionType Type of mail action to be performed
			 */
			callMailTo: function(mailActionType) {
				this.prepareEmailConfig(mailActionType, function(emailConfig) {
					var mailTo = this.Ext.String.format("{0}?{1}&{2}",
							emailConfig.mailTo,
							emailConfig.subject,
							emailConfig.body);
					window.open(mailTo, "_self");
				}, this);
			},

			/**
			 * Display context tips is any registered for current context, otherwise opens academy help.
			 */
			linkClick: function() {
				if (this.tryShowTips()) {
					return;
				}
				this.openAcademy();
			},

			/**
			 * Opens academy help according to current contextHelpId and contextHelpCode
			 */
			openAcademy: function() {
				var contextHelpId = this.get("contextHelpId");
				var contextHelpCode = this.get("contextHelpCode");
				var config = {
					callback: function(url) {
						window.open(url);
					},
					scope: this,
					contextHelpId: contextHelpId,
					contextHelpCode: contextHelpCode
				};
				this.AcademyUtilities.getUrl(config);
			},

			/**
			 * Opens card for new external access.
			 */
			addExternalAccess: function() {
				const entitySchemaName = "ExternalAccess";
				const miniPageSandboxIds = this.getMiniPagesSandboxId(entitySchemaName);
				this.sandbox.subscribe("CardModuleResponse", function(response) {
					if (response && response.success) {
						this.showInformationDialog(this.get("Resources.Strings.ExternalAccessGrantedMessage"));
					}
				}, this, miniPageSandboxIds);
				this.openAddMiniPage({
					entitySchemaName: "ExternalAccess"
				});
			}
		},

		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "HelpButtonContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"id": "context-help-container",
					"selectors": {
						"el": "#context-help-container",
						"wrapEl": "#context-help-container"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HelpButton",
				"parentName": "HelpButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"className": "Terrasoft.HoverMenuButton",
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"classes": {
						"wrapperClass": "help-button",
						"imageClass": "help-button-image"
					},
					"markerValue": "ContextHelpButton",
					"imageConfig": {"bindTo": "Resources.Images.HelpIcon"},
					"menu": [],
					"menuConfig": {
						"alignType": "tr-br?",
						"offset": [4, 6],
						"ulClass": "context-help-menu"
					}
				}
			},
			{
				"operation": "insert",
				"name": "showTipsMenuItem",
				"parentName": "HelpButton",
				"propertyName": "menu",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ShowTips"},
					"markerValue": {"bindTo": "Resources.Strings.ShowTips"},
					"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
					"imageConfig": resources.localizableImages.Tips,
					"click": {"bindTo": "tryShowTips"},
					"visible": {"bindTo": "IsShowTipsMenuItemVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "goToHelpMenuItem",
				"parentName": "HelpButton",
				"propertyName": "menu",
				"values": {
					"caption": {"bindTo": "Resources.Strings.GoToHelp"},
					"markerValue": {"bindTo": "Resources.Strings.GoToHelp"},
					"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
					"click": {"bindTo": "openAcademy"},
					"imageConfig": resources.localizableImages.Help
				}
			},
			{
				"operation": "insert",
				"name": "askSupportMenuItem",
				"parentName": "HelpButton",
				"propertyName": "menu",
				"values": {
					"caption": {"bindTo": "Resources.Strings.AskSupport"},
					"markerValue": {"bindTo": "Resources.Strings.AskSupport"},
					"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
					"click": {"bindTo": "callMailTo"},
					"tag": "support",
					"imageConfig": resources.localizableImages.Support
				}
			},
			{
				"operation": "insert",
				"name": "addExternalAccessMenuItem",
				"parentName": "HelpButton",
				"propertyName": "menu",
				"values": {
					"caption": {"bindTo": "Resources.Strings.AddExternalAccess"},
					"markerValue": {"bindTo": "Resources.Strings.AddExternalAccess"},
					"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
					"click": {"bindTo": "addExternalAccess"},
					"tag": "addExternalAccess",
					"imageConfig": resources.localizableImages.ExternalAccess,
					"visible": "$CanAddExternalAccess"
				}
			},
			{
				"operation": "insert",
				"name": "helpToImproveMenuItem",
				"parentName": "HelpButton",
				"propertyName": "menu",
				"values": {
					"caption": {"bindTo": "Resources.Strings.HelpToImprove"},
					"markerValue": {"bindTo": "Resources.Strings.HelpToImprove"},
					"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
					"click": {"bindTo": "callMailTo"},
					"tag": "feedback",
					"imageConfig": resources.localizableImages.Feedback
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


