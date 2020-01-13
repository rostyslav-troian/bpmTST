Terrasoft.configuration.Structures["ContentMjHeroViewModel"] = {innerHierarchyStack: ["ContentMjHeroViewModel"]};
define("ContentMjHeroViewModel", ["ContentMjHeroViewModelResources", "ContentColumnViewModel"],
		function(resources) {

		/**
		 * Class for ContentMjHeroViewModel.
		 */
		Ext.define("Terrasoft.controls.ContentMjHeroViewModel", {
			extend: "Terrasoft.controls.ContentColumnViewModel",
			alternateClassName: "Terrasoft.ContentMjHeroViewModel",

			/**
			 * Name of the view class.
			 * @protected
			 * @type {String}
			 */
			className: "Terrasoft.ContentMjHero",

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
			 * @override
			 */
			serializableSlicePropertiesCollection: ["ItemType", "Styles", "WrapperStyles"],

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @overridden
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
				changedConfig.Styles = config.Styles || {
					"vertical-align": "top"
				};
				changedConfig.WrapperStyles = config.WrapperStyles || {
					"height": "360px",
					"background-repeat": "no-repeat",
					"background-size": "cover",
					"background-position": "center center"
				};
				return changedConfig;
			},

			/**
			 * Returns config object of view model edit page.
			 * @protected
			 * @override
			 * @param {Boolean} withElementInfo Defines if config is extended with properties page info.
			 * @returns {Object} Full edit page config.
			 */
			getEditConfig: function(withElementInfo) {
				var config = this.callParent(arguments);
				if (withElementInfo) {
					config.ElementInfo = {
						Type: config.ItemType,
						DesignTimeConfig: {
							Caption: resources.localizableStrings.PropertiesPageCaption
						},
						Settings: {
							schemaName: "ContentMjHeroPropertiesPage",
							panelIcon: resources.localizableImages.PropertiesPageIcon,
							contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
						}
					};
				}
				return config;
			}

		});
	}
);


