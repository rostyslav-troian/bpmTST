Terrasoft.configuration.Structures["BaseIntroPageSchema"] = {innerHierarchyStack: ["BaseIntroPageSchemaUIv2", "BaseIntroPageSchema"]};
define('BaseIntroPageSchemaUIv2Structure', ['BaseIntroPageSchemaUIv2Resources'], function(resources) {return {schemaUId:'965b3e29-c42b-456f-90e0-8733809d280d',schemaCaption: "Main page base schema", parentSchemaName: "", schemaName:'BaseIntroPageSchemaUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseIntroPageSchemaStructure', ['BaseIntroPageSchemaResources'], function(resources) {return {schemaUId:'4286ddd1-2409-44ea-a299-9a86f882eeba',schemaCaption: "Main page base schema", parentSchemaName: "BaseIntroPageSchemaUIv2", schemaName:'BaseIntroPageSchema',parentSchemaUId:'965b3e29-c42b-456f-90e0-8733809d280d',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseIntroPageSchemaUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseIntroPageSchemaUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseIntroPageSchemaUIv2", ["BaseIntroPageSchemaResources", "MainMenuTileGenerator", "AcademyUtilities"],
	function(resources, MainMenuTileGenerator) {
		return {
			attributes: {
				"LmsUrl": {
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				"IsAcademyBannerVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				"IsMobilePannerVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				"IsSdkPanelVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				"IsGettingStartedPanelVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				"IsComunityPanelVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				"IsSocialAccountsPanelVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				"IntroPageWidgetUrl": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},

				"IsWidgetOnIntroPageVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				"MarketPlaceIframeSource": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},

				"IsMarketPlaceIframeVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				"ContentBody": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				}
			},
			messages: {
				/**
				 * @message SelectedSideBarItemChanged
				 * Modifies the selection of the current section in the menu of sections in the left panel.
				 * @param {String} Structure of section (E.g. "SectionModuleV2/AccountPageV2/" or "DashboardsModule/").
				 */
				"SelectedSideBarItemChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {
				/**
				 * Gets feature UseNewWidgetMarketPlace state.
				 * @public
				 * @returns {Object|Boolean|*|boolean}
				 */
				getIsMarketPlacePanelVisible: function() {
					return !this.getIsFeatureEnabled("UseNewWidgetMarketPlace");
				},

				/**
				 * Navigate by specified hash.
				 * @protected
				 * @param {Ext.EventObjectImpl} event Event.
				 * @param {String} tag Navigate tag.
				 */
				onNavigateTo: function(event, tag) {
					this.showBodyMask();
					this.sandbox.publish("SelectedSideBarItemChanged", tag, ["sectionMenuModule"]);
					this.sandbox.publish("PushHistoryState", {hash: tag});
					return false;
				},

				/**
				 * Navigates to academy site.
				 * @protected
				 */
				navigateToAcademy: function() {
					var path = this.get("LmsUrl");
					if (path) {
						window.open(path);
					}
				},

				/**
				 * Navigates to marketplace site.
				 * @protected
				 */
				navigateToMarketplace: function() {
					var link = this.get("Resources.Strings.MarketplaceUrl");
					window.open(link);
				},

				/**
				 * Navigates to getting started site.
				 * @protected
				 */
				navigateToGettingStarted: function() {
					var link = this.get("Resources.Strings.GettingStartedUrl");
					window.open(link);
				},

				/**
				 * Navigates to community site.
				 * @protected
				 */
				CommunityClick: function() {
					var communityLink = this.get("Resources.Strings.CommunityUrl");
					window.open(communityLink);
				},

				/**
				 * Navigates to SDK site.
				 * @protected
				 */
				SdkClick: function() {
					Terrasoft.SysSettings.querySysSettingsItem("ConfigurationVersion", function(configurationVersion) {
						var parameters = [];
						parameters.push("product=" + encodeURIComponent("SDK"));
						if (configurationVersion) {
							parameters.push("ver=" + encodeURIComponent(configurationVersion));
						}
						var path = this.get("LmsUrl") + "/documents/?" + parameters.join("&");
						window.open(path);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onRender
				 * @override
				 */
				onRender: function() {
					var isMarketPlacePanelVisible = this.getIsMarketPlacePanelVisible();
					if (!this.getIsMarketPlacePanelVisible()) {
						this._marketPlaceIframeConfigure();
					}
					var sdkContainer = this.Ext.get("sdk-container-el");
					var gettingStartedContainer = this.Ext.get("gettingStarted-container-el");
					var communityContainer = this.Ext.get("community-container-el");
					var marketplaceContainer = isMarketPlacePanelVisible ?
							this.Ext.get("marketplace-container-el") :
							null;
					var academyContainer = this.Ext.get("academy-container-el");
					if (this.isNotEmpty(sdkContainer)) {
						sdkContainer.on("click", this.SdkClick, this);
					}
					if (this.isNotEmpty(gettingStartedContainer)) {
						gettingStartedContainer.on("click", this.navigateToGettingStarted, this);
					}
					if (this.isNotEmpty(communityContainer)) {
						communityContainer.on("click", this.CommunityClick, this);
					}
					if (isMarketPlacePanelVisible && this.isNotEmpty(marketplaceContainer)) {
						marketplaceContainer.on("click", this.navigateToMarketplace, this);
					}
					if (this.isNotEmpty(academyContainer)) {
						academyContainer.on("click", this.navigateToAcademy, this);
					}
					Terrasoft.defer(function() {
						this._initLmsDocumentations();
						this._initWidget();
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function() {
					this.setEmptyIframeContent();
					this.callParent(arguments);
				},

				/**
				 * @protected
				 * Show empty container for reserved area for iframe
				 */
				setEmptyIframeContent: function() {

					if (!this.getIsMarketPlacePanelVisible()) {

						var emptyContent = "<html style=\"hight: 100%;  overflow: hidden;\" ></html>";
						this.set("ContentBody", emptyContent);

						this.set("IsMarketPlaceIframeVisible", true);

					}
				},

				/**
				 * @private
				 */
				_initWidget: function() {
					Terrasoft.SysSettings.querySysSettings(["ShowWidgetOnIntroPage", "IntroPageWidgetUrl"],
						function(items) {
						var widgetUrl = items.IntroPageWidgetUrl;
						var isWidgetVisible = items.ShowWidgetOnIntroPage || false;
						if (!isWidgetVisible || this.Ext.isEmpty(widgetUrl)) {
							this.set("IsWidgetOnIntroPageVisible", false);
							return;
						}
						this.set("IsWidgetOnIntroPageVisible", true);
						this.set("IntroPageWidgetUrl", widgetUrl);
					}, this);
				},

				/**
				 * @private
				 */
				_onGetAcademyUrlCallback: function(lmsUrl) {
					this.sandbox.publish("SelectedSideBarItemChanged", "", ["sectionMenuModule"]);
					this.set("LmsUrl", lmsUrl);
				},

				/**
				 * @private
				 */
				_initLmsDocumentations: function() {
					var sysSettingsNameArray = ["UseLMSDocumentation"];
					Terrasoft.SysSettings.querySysSettings(sysSettingsNameArray, function(values) {
						this.set("UseLMSDocumentation", values.UseLMSDocumentation);
						if (values.UseLMSDocumentation === false) {
							this.set("IsAcademyBannerVisible", false);
						}
						Terrasoft.AcademyUtilities.getUrl({
							scope: this,
							contextHelpCode: this.name,
							callback: this._onGetAcademyUrlCallback
						});
					}, this);
				},

				/**
				 * @private
				 */
				_marketPlaceIframeConfigure: function() {
					var config = {
						serviceName: "MarketPlaceUrlService",
						methodName: "GetUrlMarketPlace",
						data: {
							productCode: this.name
						}
					};
					this.callService(config, function(response) {
						var source = (response && response.GetUrlMarketPlaceResult) || "";
						this.set("MarketPlaceIframeSource", source);
						if (Ext.isEmpty(source)) {
							this.set("IsMarketPlaceIframeVisible", false);
						} else {
							this.set("IsMarketPlaceIframeVisible", true);
						}
					}, this);
				},

				/**
				 * @private
				 * @deprecated
				 */
				_initPageLinks: function() {
					const rightContainer = Ext.get("right-container");
					if (!rightContainer) {
						return;
					}
					const schemaName = this.schemaName || this.name || "";
					const cacheKey = schemaName + "IntroPageLookup";
					var select = new Terrasoft.EntitySchemaQuery({
						rootSchemaName: "IntroPageLookup",
						clientESQCacheParameters: {
							cacheItemName: cacheKey
						},
						serverESQCacheParameters: {
							cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
							cacheGroup: "ApplicationMainMenu",
							cacheItemName: cacheKey
						}
					});
					select.addColumn("VideoUrl");
					select.addColumn("VideoCaption");
					select.filters.addItem(Terrasoft.createColumnFilterWithParameter("CodePage", schemaName));
					select.execute(function(response) {
						this.preparePageLinks(response);
					}, this);
				},

				/**
				 * Gets links from lookup.
				 * @deprecated
				 * @param {Object} response Response from server.
				 */
				preparePageLinks: function(response) {
					const row = response.collection.first();
					const videoUrl = row && row.get("VideoUrl");
					const videoCaption = row && row.get("VideoCaption");
					const videoPanel = Ext.get("VideoPanel");
					var playlist = [];
					if (videoUrl && videoUrl.length > 0) {
						playlist.push({
							videoUrl: videoUrl,
							caption: videoCaption
						});
					} else if (videoPanel) {
						var links = videoPanel.select(".video-link").elements;
						playlist = links.map(function(link) {
							return {
								videoUrl: link.href,
								caption: link.text
							};
						}, this);
					}
					if (playlist.length === 0) {
						return;
					}
					const videoPanelConfig = MainMenuTileGenerator.generateVideoPanel({
						playBtnIcon: resources.localizableImages.playBtn,
						activePlayBtnIcon: resources.localizableImages.playBtnActive,
						playlist: playlist
					});
					const videoPanelEl = Ext.create("Terrasoft.Container", videoPanelConfig);
					if (videoPanel) {
						videoPanel.remove();
					}
					const rightContainer = Ext.get("right-container");
					videoPanelEl.render(rightContainer, 0);
				}
			},

			diff: [
				{
					"operation": "insert",
					"name": "MainContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"id": "main-container",
						"classes": {
							"wrapClassName": ["main-container", "x-unselectable"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LeftContainer",
					"propertyName": "items",
					"parentName": "MainContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						id: "left-container",
						"classes": {
							"wrapClassName": ["left-container", "main-container-panel"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "RightContainer",
					"propertyName": "items",
					"parentName": "MainContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"id": "right-container",
						"classes": {
							"wrapClassName": ["right-container", "main-container-panel"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "VideoPanel",
					"propertyName": "items",
					"parentName": "RightContainer",
					"values": {
						"generator": "MainMenuTileGenerator.generateVideoPanel",
						"loadVideo": false,
						"playlist": []
					}
				},
				{
					"operation": "insert",
					"name": "WidgetContainerWrap",
					"propertyName": "items",
					"parentName": "RightContainer",
					"values": {
						"id": "widget-container",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "WidgetContainer",
					"propertyName": "items",
					"parentName": "WidgetContainerWrap",
					"values": {
						"itemType": Terrasoft.ViewItemType.EXTERNAL_WIDGET,
						"iframeSrc": {"bindTo": "IntroPageWidgetUrl"},
						"visible": {"bindTo": "IsWidgetOnIntroPageVisible"},
						"classes": {
							"wrapClassName": ["widget-container"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "LinksIframeContainer",
					"propertyName": "items",
					"parentName": "RightContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						id: "links-iframe-container",
						"classes": {
							"wrapClassName": ["links-iframe-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LinksContainer",
					"propertyName": "items",
					"parentName": "RightContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						id: "links-container",
						"classes": {
							"wrapClassName": ["links-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "marketPalceIframe",
					"propertyName": "items",
					"parentName": "LinksIframeContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.IFRAMECONTROL,
						"src": {"bindTo": "MarketPlaceIframeSource"},
						"iframeContent": {"bindTo": "ContentBody"},
						"visible": {"bindTo": "IsMarketPlaceIframeVisible"},
						"wrapClass": ["t-iframe marketpalce-iframe"]
					}
				},
				{
					"operation": "insert",
					"name": "TerrasoftAccountsLinksPanel",
					"propertyName": "items",
					"parentName": "LinksContainer",
					"values": {
						"generator": "MainMenuTileGenerator.generateTerrasoftAccountsLinks",
						"IsSdkPanelVisible": {"bindTo": "IsSdkPanelVisible"},
						"IsSocialAccountsPanelVisible": {"bindTo": "IsSocialAccountsPanelVisible"},
						"sdkIcon": resources.localizableImages.SdkIcon,
						"sdkCaption": resources.localizableStrings.SdkCaption,
						"isGettingStartedVisible": {"bindTo": "IsGettingStartedPanelVisible"},
						"gettingStartedCaption": {"bindTo": "Resources.Strings.GettingStartedCaption"},
						"gettingStartedLabel": resources.localizableStrings.GettingStartedLabel,
						"gettingStartedIcon": resources.localizableImages.GettingStartedIcon,
						"IsComunityPanelVisible": {"bindTo": "IsComunityPanelVisible"},
						"communityCaption": {"bindTo": "Resources.Strings.CommunityCaption"},
						"communityLabel": resources.localizableStrings.CommunityLabel,
						"communityIcon": resources.localizableImages.CommunityIcon,
						"isMarketplacePanelVisible": {"bindTo": "getIsMarketPlacePanelVisible"},
						"marketplaceCaption": {"bindTo": "Resources.Strings.MarketplaceCaption"},
						"marketplaceLabel": resources.localizableStrings.MarketplaceLabel,
						"marketplaceIcon": resources.localizableImages.MarketplaceIcon,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"socialAccountsCaption": {"bindTo": "Resources.Strings.SocialAccountsCaption"},
						"isAcademyVisible": {bindTo: "IsAcademyBannerVisible"},
						"academyIcon": resources.localizableImages.AcademyBanner,
						"academyCaption": {"bindTo": "Resources.Strings.AcademyCaption"},
						"academyLabel": resources.localizableStrings.BannerCaption,
						"socialAccounts": []
					}
				},
				{
					"operation": "insert",
					"name": "MobileAppLinksPanel",
					"propertyName": "items",
					"parentName": "LinksContainer",
					"values": {
						"visible": {"bindTo": "IsMobilePannerVisible"},
						"caption": {"bindTo": "Resources.Strings.MobileAppCaption"},
						"androidLabel": resources.localizableStrings.AndroidLabel,
						"iosLabel": resources.localizableStrings.IosLabel,
						"windowsLabel": resources.localizableStrings.WindowsLabel,
						"androidUrl": resources.localizableStrings.AndroidUrl,
						"iosUrl": resources.localizableStrings.IosUrl,
						"windowsUrl": resources.localizableStrings.WindowsUrl,
						"androidIcon": resources.localizableImages.AndroidIcon,
						"iosIcon": resources.localizableImages.IosIcon,
						"windowsIcon": resources.localizableImages.WindowsIcon,
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"generator": "MainMenuTileGenerator.generateMobileAppBaner",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "LinkedIn",
					"propertyName": "socialAccounts",
					"parentName": "TerrasoftAccountsLinksPanel",
					"values": {
						"icon": resources.localizableImages.LinkedinIcon,
						"href": resources.localizableStrings.LinkedInUrl,
						"markerValue": "LinkedIn"
					}
				},
				{
					"operation": "insert",
					"name": "Twitter",
					"propertyName": "socialAccounts",
					"parentName": "TerrasoftAccountsLinksPanel",
					"values": {
						"icon": resources.localizableImages.TwitterIcon,
						"href": resources.localizableStrings.TwitterUrl,
						"markerValue": "Twitter"
					}
				},
				{
					"operation": "insert",
					"name": "Facebook",
					"propertyName": "socialAccounts",
					"parentName": "TerrasoftAccountsLinksPanel",
					"values": {
						"icon": resources.localizableImages.FacebookIcon,
						"href": resources.localizableStrings.FacebookUrl,
						"markerValue": "Facebook"
					}
				},
				{
					"operation": "insert",
					"name": "Youtube",
					"propertyName": "socialAccounts",
					"parentName": "TerrasoftAccountsLinksPanel",
					"values": {
						"icon": resources.localizableImages.YoutubeIcon,
						"href": resources.localizableStrings.YoutubeUrl,
						"markerValue": "Youtube"
					}
				}
			]
		};
	});

define("BaseIntroPageSchema", ["GoogleTagManagerMeasurementsUtilities"], function() {
	return {

		mixins: {
			GoogleTagManagerMeasurementsUtilities: Terrasoft.GoogleTagManagerMeasurementsUtilities
		},

		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseIntroPageSchema#init
			 * @override
			 */
			init: function() {
				this.startGoogleTagManagerMeasurements();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseIntroPageSchema#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.stopGoogleTagManagerMeasurements();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#sendGoogleTagManagerData
			 * @override
			 */
			sendGoogleTagManagerData: this.Terrasoft.emptyFn

			//endregion

		}
	};
});


