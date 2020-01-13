Terrasoft.configuration.Structures["OperatorSingleWindowPage"] = {innerHierarchyStack: ["OperatorSingleWindowPage"]};
define('OperatorSingleWindowPageStructure', ['OperatorSingleWindowPageResources'], function(resources) {return {schemaUId:'b09d02eb-31bd-48de-8bb3-905b10d4e991',schemaCaption: "Agent desktop page", parentSchemaName: "", schemaName:'OperatorSingleWindowPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OperatorSingleWindowPage", ["terrasoft", "MaskHelper", "SocialChannel", "ContextHelpMixin",
	"css!OperatorSingleWindowCSS"],
	function(Terrasoft, MaskHelper, SocialChannel) {
		return {
			messages: {

				/**
				 * @message InitDataViews
				 * ######## ######## ####### # #######.
				 * @param {String} ######### #######.
				 */
				"InitDataViews": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message RerenderModule
				 * ######### ############# ###### ######.
				 * @return {Boolean} ######### ###### ######.
				 */
				"RerenderModule": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetRecordInfo
				 * ######### # ######### ############ ########## ### ########### ##### ESN.
				 * @return {Object} ############ ### ##### ESN.
				 */
				"GetRecordInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message InitContextHelp
				 * Message about context help parameters.
				 * @return {Object} Context help parameters.
				 */
				"InitContextHelp": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SelectedSideBarItemChanged
				 * Modifies the selection of the current section in the menu of sections in the left panel.
				 * @param {String} Structure of section (e.g. "SectionModuleV2/AccountPageV2/" or
				 * "OperatorSingleWindow/").
				 */
				"SelectedSideBarItemChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message NeedHeaderCaption
				 * Initiates the generation of event ChangeHeaderCaption.
				 */
				"NeedHeaderCaption": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				/**
				 * Mixin of context help.
				 */
				ContextHelpMixin: "Terrasoft.ContextHelpMixin"
			},
			attributes: {

				/**
				 * ############# ######, ####### ####### ########## # ##### ESN.
				 * @type {String}
				 */
				"SocialChannelId": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": ""
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * ######### ###### # ######### ####### ####.
				 * @param {String} moduleName ######## ######, ####### ##### ########.
				 * @param {String} containerName ######## ##########, # ####### ##### ######## ######.
				 * @protected
				 * @virtual
				 */
				loadModule: function(moduleName, containerName) {
					var sandbox = this.sandbox;
					var moduleId = this.getLoadedModuleId(moduleName);
					sandbox.loadModule(moduleName, {
						renderTo: containerName,
						reload: true,
						id: moduleId
					});
				},

				/**
				 * Loads content of Single Window.
				 * @protected
				 * @virtual
				 */
				loadContent: function() {
					this.loadModule("ESNFeedModule", "centerContainer");
					this.loadModule("SectionDashboardsModule", "rightContainer");
					this.loadModule("OperatorQueuesModule", "leftContainer");
				},

				/**
				 * Initializes page header.
				 * @protected
				 * @virtual
				 */
				initHeader: function() {
					var pageCaption = this.get("Resources.Strings.HeaderCaption");
					this.sandbox.publish("InitDataViews", {caption: pageCaption});
				},

				/**
				 * Subscription to events.
				 * @protected
				 * @virtual
				 */
				subscribeOnMessages: function() {
					this.sandbox.subscribe("GetRecordInfo", function() {
						var channelId = this.get("SocialChannelId");
						var esnConfig = {
							channelId: channelId,
							entitySchemaName: SocialChannel.name,
							entitySchemaUId: SocialChannel.uId
						};
						return Ext.isEmpty(channelId) ? null : esnConfig;
					}, this, [this.getLoadedModuleId("ESNFeedModule")]);

					this.sandbox.subscribe("NeedHeaderCaption", function() {
						var pageCaption = this.get("Resources.Strings.HeaderCaption");
						this.sandbox.publish("InitDataViews", {
							caption: pageCaption,
							dataViews: new this.Terrasoft.Collection()
						});
					}, this);

				},

				/**
				 * Returns the identifier of the loaded module.
				 * @protected
				 * @param {String} moduleName The name of the module.
				 * @return {String} The identifier loadable module.
				 */
				getLoadedModuleId: function(moduleName) {
					return this.sandbox.id + "SingleWindow_" + moduleName;
				},

				/**
				 * @inheritdoc Terrasoft.ContextHelpMixin#initContextHelp
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1072);
					this.mixins.ContextHelpMixin.initContextHelp.apply(this, arguments);
				},

				/**
				 * @inheritdoc Terrasoft.ContextHelpMixin#getContextHelpId
				 * @overridden
				 */
				getContextHelpId: function() {
					return this.get("ContextHelpId");
				},

				/**
				 * @inheritdoc Terrasoft.ContextHelpMixin#getContextHelpCode
				 * @overridden
				 */
				getContextHelpCode: function() {
					return this.name;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initContextHelp();
				},

				//endregion

				/**
				 * Changes selected section menu item to the current section.
				 * @protected
				 */
				changeSelectedSideBarMenu: function() {
					var moduleConfig = this.getModuleStructure("OperatorSingleWindow");
					if (moduleConfig) {
						var sectionSchema = moduleConfig.sectionSchema;
						var config = moduleConfig.sectionModule + "/";
						if (sectionSchema) {
							config += sectionSchema + "/";
						}
						this.sandbox.publish("SelectedSideBarItemChanged", config, ["sectionMenuModule"]);
					}
				},

				//region Methods: Public

				/**
				 * Performs actions that are required after page displaying.
				 * @overridden
				 */
				onRender: function() {
					this.callParent(arguments);
					this.changeSelectedSideBarMenu();
					this.initHeader();
					this.subscribeOnMessages();
					this.Terrasoft.SysSettings.querySysSettingsItem("OperatorSingleWindowSocialChannel",
						function(sysSetting) {
							var sysSettingValue = sysSetting ? sysSetting.value : null;
							var isSocialChannelSet = (!Ext.isEmpty(sysSettingValue) &&
								!this.Terrasoft.isEmptyGUID(sysSettingValue));
							var socialChannelId = isSocialChannelSet ? sysSettingValue : null;
							this.set("SocialChannelId", socialChannelId);
							this.loadContent();
							MaskHelper.HideBodyMask();
						}, this);
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "leftContainer",
					"propertyName": "items",
					"values": {
						"id": "leftContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#leftContainer"
						},
						"classes": {
							"wrapClassName": ["operator-window-left-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "centerContainer",
					"propertyName": "items",
					"values": {
						"id": "centerContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#centerContainer"
						},
						"classes": {
							"wrapClassName": ["operator-window-center-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "rightContainer",
					"propertyName": "items",
					"values": {
						"id": "rightContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#rightContainer"
						},
						"classes": {
							"wrapClassName": ["operator-window-right-container"]
						},
						"items": []
					}
				}
			]
		};
	});


