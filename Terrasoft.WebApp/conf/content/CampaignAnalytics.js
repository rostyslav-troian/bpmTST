Terrasoft.configuration.Structures["CampaignAnalytics"] = {innerHierarchyStack: ["CampaignAnalytics"]};
define("CampaignAnalytics", ["MarketingEnums", "SimpleIndicatorModule", "HighchartsWrapper"],
	function(MarketingEnums) {
		var CampaignAnalyticsClass = Ext.define("Terrasoft.configuration.mixins.CampaignAnalytics", {

			alternateClassName: "Terrasoft.CampaignAnalytics",

			/**
			 * ########## ######.
			 */
			indicators: {},

			/**
			 * ########## ####### ######### ###### ###########.
			 * @private
			 */
			loadIndicatorsModules: function() {
				var indicators = {
					TargetTotal: {},
					TargetAchieve: {},
					TargetRemain: {}
				};
				Terrasoft.each(indicators, function(item, key) {
					var moduleId = this.sandbox.id + "_IndicatorModule_" + key;
					if (this.indicators[moduleId]) {
						this.sandbox.publish("GenerateIndicator", null, [moduleId]);
						return;
					}
					this.sandbox.loadModule("SimpleIndicatorModule", {
						renderTo: "CampaignIndicator" + key,
						id: moduleId
					});
					this.indicators[moduleId] = true;
					this.sandbox.subscribe("GetIndicatorConfig", function() {
						return this.Ext.apply(item, {
							caption: this.getIndicatorCaption(key),
							value: this.getIndicatorValue(key),
							imageConfig: this.getIndicatorImage(key),
							displayTotalAmount: false,
							fontStyle: "default-indicator-font-size",
							format: {
								textDecorator: "{0}",
								thousandSeparator: Terrasoft.Resources.CultureSettings.thousandSeparator,
								dateFormat: Terrasoft.Resources.CultureSettings.dateFormat,
								type: Terrasoft.DataValueType.TEXT
							},
							style: this.getIndicatorStyle(key)
						});
					}, this, [moduleId]);
				}, this);
			},

			/**
			 * ######### ########## ###### "#########".
			 * @private
			 */
			loadIndicatorsContent: function() {
				if (!this.get("IsEntityInitialized")) {
					return;
				}
				this.loadIndicatorsModules();
			},

			/**
			 * ########## ######### ##########.
			 * @private
			 * @param {String} indicatorName ### ########## (TargetTotal | TargetAchieve | TargetRemain).
			 * @return {String} ########## ######### ##########.
			 */
			getIndicatorCaption: function(indicatorName) {
				var indicatorCaption = this.get("Resources.Strings.IndicatorCaptionFor" + indicatorName);
				var targetTotal = this.get("TargetTotal");
				var targetPercent = this.get("TargetPercent");
				var targetRemain = this.get("TargetRemain");
				var status = this.get("CampaignStatus");
				var campaignStatus = !this.Ext.isEmpty(status) ? status.value : null;
				if ((targetPercent > 0) && (targetRemain <= 0) && (targetTotal > 0) &&
					(campaignStatus !== MarketingEnums.CampaignStatus.PLANNED)) {
					if (indicatorName === "TargetRemain") {
						indicatorCaption = this.get("Resources.Strings.IndicatorCaptionForTargetAchieved");
					}
				}
				return indicatorCaption;
			},

			/**
			 * ########## ######## ##########.
			 * @private
			 * @param {String} valueKey #### ########.
			 * @return {String} ########## ######### ##########.
			 */
			getIndicatorValue: function(valueKey) {
				var indicatorValue = this.get(valueKey) || 0;
				var targetRemain = this.get("TargetRemain");
				if (targetRemain <= 0) {
					if (valueKey === "TargetRemain") {
						indicatorValue = 0;
					}
				}
				return indicatorValue;
			},

			/**
			 * ########## ######## ########, #### ### #####.
			 * @private
			 * @param {String} indicatorName ### ########## (TargetTotal | TargetAchieve | TargetRemain).
			 * @return {String} ########## ######## ########.
			 */
			getIndicatorImage: function(indicatorName) {
				var indicatorImage = "";
				var targetTotal = this.get("TargetTotal");
				var targetPercent = this.get("TargetPercent");
				var targetRemain = this.get("TargetRemain");
				var status = this.get("CampaignStatus");
				var campaignStatus = !this.Ext.isEmpty(status) ? status.value : null;
				if ((targetPercent > 0) && (targetRemain <= 0) && (targetTotal > 0) &&
					(campaignStatus !== MarketingEnums.CampaignStatus.PLANNED)) {
					if (indicatorName === "TargetRemain") {
						indicatorImage = "IndicatorTargetAchievedImage";
					}
				}
				return indicatorImage;
			},

			/**
			 * ###### ######## ##### ##########.
			 * @private
			 * @param {String} indicatorName ### ########## (TargetTotal | TargetAchieve | TargetRemain).
			 * @return {String} ########## ##### ##########.
			 */
			getIndicatorStyle: function(indicatorName) {
				var targetPercent = this.get("TargetPercent");
				var status = this.get("CampaignStatus");
				var campaignStatus = !this.Ext.isEmpty(status) ? status.value : null;
				if (indicatorName === "TargetTotal") {
					return "widget-blue";
				} else if (indicatorName === "TargetAchieve") {
					if (targetPercent === 0) {
						return "widget-gray";
					} else if (campaignStatus === MarketingEnums.CampaignStatus.PLANNED) {
						return "widget-gray";
					} else {
						return "widget-orange";
					}
				} else {
					if (targetPercent === 0) {
						return "widget-gray";
					} else if (campaignStatus === MarketingEnums.CampaignStatus.PLANNED) {
						return "widget-gray";
					} else {
						return "widget-dark-orange";
					}
				}
			}

		});
		return CampaignAnalyticsClass;
	});


