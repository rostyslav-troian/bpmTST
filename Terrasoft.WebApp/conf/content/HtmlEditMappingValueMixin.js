Terrasoft.configuration.Structures["HtmlEditMappingValueMixin"] = {innerHierarchyStack: ["HtmlEditMappingValueMixin"]};
define("HtmlEditMappingValueMixin", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.mixins.HtmlEditMappingValueMixin", {
		alternateClassName: "Terrasoft.HtmlEditMappingValueMixin",

		/**
		 * Initialize mixin. Subscribes on change events by attributes config.
		 */
		init: function() {
			var attributesConfig = this.getAttributesConfig();
			if (attributesConfig == null) {
				return;
			}
			this.attributesConfig = attributesConfig;
			Terrasoft.each(attributesConfig, function(attributeConfig, attributeName) {
				this.on("change:" + attributeName, this.onAttributeChange.bind(this, attributeName));
				this.on("change:" + attributeConfig.displayAttributeName, this.onDisplayAttributeChange.bind(this, attributeName));
			}, this);
		},

		/**
		 * Returns attributes config. Like this:
		 * 	{
		 * 		attributeName: {
		 * 			displayAttributeName: [DisplayAttributeName],
		 * 			enabledAttributeName: [EnabledAttributeName]
		 * 		}
		 * 	}
		 * @virtual
		 * @return {Object}
		 */
		getAttributesConfig: Terrasoft.emptyFn,

		/**
		 * Returns attribute config by name.
		 * @param {String} name Attribute name.
		 * @return {Object}
		 */
		getAttributeConfigByName: function(name) {
			return this.attributesConfig[name];
		},

		/**
		 * Attribute change event handler. If value is mapping value, sets false to
		 * 'enabledAttribute', and to display value to 'displayAttribute'. If vlaue is not mapping,
		 * sets to 'enabledAttribute' true.
		 * @private
		 * @param {String} attributeName CHanged attribute name.
		 */
		onAttributeChange: function(attributeName) {
			var attributeConfig = this.getAttributeConfigByName(attributeName);
			var attributeValue = this.get(attributeName);
			var isMapping = Terrasoft.ProcessSchemaDesignerUtilities.getIsMappingParameterValue(attributeValue);
			this.set(attributeConfig.enabledAttributeName, !isMapping);
			var displayValue = "";
			if (attributeValue) {
				displayValue = attributeValue.displayValue || attributeValue.value;
			}
			this.set(attributeConfig.displayAttributeName, displayValue);
		},

		/**
		 * Sets attribute value to constant value when 'enabledAttribute' is true.
		 * @private
		 * @param {String} attributeName CHanged attribute name.
		 */
		onDisplayAttributeChange: function(attributeName) {
			var attributeConfig = this.getAttributeConfigByName(attributeName);
			var isEnabled = this.get(attributeConfig.enabledAttributeName);
			if (isEnabled) {
				var displayValue = this.get(attributeConfig.displayAttributeName);
				var attributeValue = {
					value: displayValue,
					displayValue: displayValue,
					source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue
				};
				this.set(attributeName, attributeValue);
			}
		}
	});
	return Terrasoft.HtmlEditMappingValueMixin;
});


