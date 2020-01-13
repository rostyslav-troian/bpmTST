Terrasoft.configuration.Structures["ContentSeparatorElementViewModel"] = {innerHierarchyStack: ["ContentSeparatorElementViewModel"]};
define("ContentSeparatorElementViewModel", ["ContentHTMLElementViewModel"], function() {
	Ext.define("Terrasoft.ContentBuilder.ContentSeparatorElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentSeparatorElementViewModel",

		/**
		 * Content element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentSeparatorElement",

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#initDefaultStyles
		 * @overridden
		 */
		initDefaultStyles: function() {
			this.$Styles = this.$Styles || {};
			if (_.isUndefined(this.$Styles["padding-left"])) {
				this.$Styles["padding-left"] = "0px";
			}
			if (_.isUndefined(this.$Styles["padding-right"])) {
				this.$Styles["padding-right"] = "0px";
			}
			if (_.isUndefined(this.$Styles["padding-top"])) {
				this.$Styles["padding-top"] = "0px";
			}
			if (_.isUndefined(this.$Styles["padding-bottom"])) {
				this.$Styles["padding-bottom"] = "0px";
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"thickness": "$Thickness",
				"style": "$Style",
				"color": "$Color"
			});
			return config;
		}
	});
});


