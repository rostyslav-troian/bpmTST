Terrasoft.configuration.Structures["ContentNavbarLinkViewModel"] = {innerHierarchyStack: ["ContentNavbarLinkViewModel"]};
define("ContentNavbarLinkViewModel", ["ContentNavbarLinkViewModelResources", "ckeditor-base", "InlineCodeTextEdit",
		"BaseContentItemViewModel", "ContentBuilderConstants"],
	function(resources) {
	Ext.define("Terrasoft.ContentBuilder.ContentNavbarLinkViewModel", {
		extend: "Terrasoft.BaseContentItemViewModel",
		alternateClassName: "Terrasoft.ContentNavbarLinkViewModel",

		/**
		 * View model element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentNavbarLink",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles", "HtmlText", "Url"],

		/**
		 * Inits styles with default values.
		 * @protected
		 */
		_initDefaultStyles: function() {
			this.$Styles = this.$Styles || {};
			if (_.isUndefined(this.$Styles["padding-left"])) {
				this.$Styles["padding-left"] = "10px";
			}
			if (_.isUndefined(this.$Styles["padding-right"])) {
				this.$Styles["padding-right"] = "10px";
			}
			if (_.isUndefined(this.$Styles["padding-top"])) {
				this.$Styles["padding-top"] = "15px";
			}
			if (_.isUndefined(this.$Styles["padding-bottom"])) {
				this.$Styles["padding-bottom"] = "15px";
			}
		},

		/**
		 * Initializes model with resources.
		 * @protected
		 * @virtual
		 * @param {Object} resourcesObj Resources object.
		 */
		initResourcesValues: function(resourcesObj) {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			if (Ext.isEmpty(changedConfig.HtmlText)) {
				changedConfig.HtmlText = "Link";
			}
			changedConfig.Styles = Ext.apply({
				"font-family": Terrasoft.FontSet.ARIAL,
				"font-size": "13px",
				"color": "#000000",
				"line-height": "22px"
			}, config.Styles);
			return changedConfig;
		},

		/**
		 * Generates configuration object of link view.
		 * @return {Object} Configuration object of link view.
		 */
		getViewConfig: function() {
			this._initDefaultStyles();
			return {
				"className": this.className,
				"tag": this.$Id,
				"id": this.$Id,
				"wrapStyle": "$Styles",
				"selected": "$Selected",
				"items": [{
					"className": "Terrasoft.InlineTextEdit",
					"value": "$HtmlText",
					"markerValue": "HtmlText",
					"ckeditorDefaultConfig": {
						"allowedContent": true,
						"removeButtons":
							"Font," +
							"FontSize," +
							"JustifyCenter," +
							"JustifyLeft," +
							"JustifyRight," +
							"Link," +
							"JustifyBlock," +
							"NumberedList," +
							"BulletedList," +
							"Indent," +
							"Outdent," +
							"bpmonlinesource," +
							"bpmonlinemacros," +
							"indentpanel," +
							"lineheight," +
							"lineheightpanel," +
							"letterspacing," +
							"letterspacingpanel"
					}
				}]
			};
		},

		/**
		 * Returns config object of view model edit page.
		 * @protected
		 * @override
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function() {
			var config = {
				ItemType: this.$ItemType,
				Styles: this.$Styles,
				Url: this.$Url,
				ElementInfo: {
					Type: this.$ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentNavbarLinkPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				}
			};
			return config;
		}

	});
});


