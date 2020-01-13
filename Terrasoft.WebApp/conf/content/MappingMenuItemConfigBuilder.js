Terrasoft.configuration.Structures["MappingMenuItemConfigBuilder"] = {innerHierarchyStack: ["MappingMenuItemConfigBuilder"]};
define("MappingMenuItemConfigBuilder", ["SysSchemaUIdEnums", "MappingEnums"],
		function() {
	return Ext.define("Terrasoft.configuration.MappingMenuItemConfigBuilder", {
		extend: "Terrasoft.ObjectBuilder",
		alternateClassName: "Terrasoft.MappingMenuItemConfigBuilder",

		/**
		 * @inheritdoc Terrasoft.ObjectBuilder#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.start().object();
		},

		/**
		 * Adds caption to menu item.
		 * @param {String} caption Menu item caption.
		 */
		addCaption: function(caption) {
			this.add("Caption", caption);
		},

		/**
		 * Adds tag to menu item.
		 * @param {String} tag Menu item tag.
		 */
		addTag: function(tag) {
			this.add("Tag", tag);
		},

		/**
		 * Adds bind to method on onClick event.
		 * @param {String} onClick Method name to bind on.
		 */
		addOnClick: function(onClick) {
			this.start().object("Click");
			this.add("bindTo", onClick);
			this.end();
		},

		/**
		 * Adds icon to menu item.
		 * @param {Object} icon Localizable image.
		 */
		addIcon: function(icon) {
			var imageConfig = this.getIconConfig(icon);
			this.add("ImageConfig", imageConfig);
		},

		/**
		 * Adds marker value to menu item.
		 * @param {String} markerValue Menu item marker value.
		 */
		addMarkerValue: function(markerValue) {
			this.add("MarkerValue", markerValue);
		},

		/**
		 * Sets availability binding.
		 * @param {String} attribute Attribute.
		 */
		addAvailability: function(attribute) {
			this.start().object("Enabled");
			this.add("bindTo", attribute);
			this.end();
		},

		/**
		 * Returns image config from localizable image.
		 * @private
		 * @param {Object} icon Localizable image.
		 * @return {Object} Image config.
		 */
		getIconConfig: function(icon) {
			if (icon) {
				return {
					source: Terrasoft.ImageSources.URL,
					url: Terrasoft.ImageUrlBuilder.getUrl(icon)
				};
			}
		},

		/**
		 * @inheritdoc Terrasoft.ObjectBuilder#getResult
		 * @overridden
		 */
		getResult: function() {
			this.end();
			return this.callParent(arguments);
		}

	});
});


