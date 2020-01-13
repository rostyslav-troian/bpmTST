Terrasoft.configuration.Structures["ContentNavbarElementViewModel"] = {innerHierarchyStack: ["ContentNavbarElementViewModel"]};
define("ContentNavbarElementViewModel", ["ContentNavbarElementViewModelResources", "ContentElementBaseViewModel",
		"ContentNavbarLinkViewModel"], function(resources) {
	Ext.define("Terrasoft.ContentBuilder.ContentNavbarElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentNavbarElementViewModel",

		/**
		 * View model element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentNavbarElement",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles", "IsHamburger", "IconStyles"],

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableChildrenCollectionSource
		 * @override
		 */
		serializableChildrenCollectionSource: "Items",

		childItemTypes: {
			navbarlink: "Terrasoft.ContentNavbarLinkViewModel"
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
			if (Ext.isEmpty(changedConfig.Items)) {
				changedConfig.Items = [{
					ItemType: "navbarlink"
				},{
					ItemType: "navbarlink"
				}];
			}
			changedConfig.Styles = config.Styles || {
				"text-align": Terrasoft.Align.CENTER
			};
			changedConfig.IconStyles = config.IconStyles || {
				"text-align": Terrasoft.Align.CENTER
			};
			return changedConfig;
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#initDefaultStyles
		 * @overridden
		 */
		initDefaultStyles: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"items": "$Items",
				"elementSelectedChange": "$onElementSelected"
			});
			return config;
		},

		/**
		 * Returns config object of view model edit page.
		 * @protected
		 * @override
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function() {
			var config =  {
				ItemType: this.$ItemType,
				Styles: this.$Styles,
				IsHamburger: this.$IsHamburger,
				IconStyles: this.$IconStyles,
				Items: [],
				ElementInfo: {
					Type: this.$ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentNavbarPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				}
			};
			Terrasoft.each(this.$Items, function(item) {
				config.Items.push(this.getItemEditConfig(item));
			}, this);
			return config;
		},

		/**
		 * Returns config object of navbar item edit.
		 * @protected
		 * @virtual
		 * @returns {Object} Navbar item edit config.
		 */
		getItemEditConfig: function(item) {
			return {
				Id: item.$Id,
				ItemType: item.$ItemType
			};
		},

		/**
		 * Element click handler.
		 * @protected
		 */
		onElementSelected: function(elementId) {
			this.fireEvent("change", this, {
				event: "elementSelected",
				arguments: {
					id: elementId
				}
			});
		}

	});
});


