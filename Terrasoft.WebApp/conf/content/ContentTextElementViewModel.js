Terrasoft.configuration.Structures["ContentTextElementViewModel"] = {innerHierarchyStack: ["ContentTextElementViewModel"]};
define("ContentTextElementViewModel", ["ContentTextElementViewModelResources", "ContentElementBaseViewModel",
		"InlineCodeTextEdit", "ckeditor-base"], function(resources) {
	Ext.define("Terrasoft.ContentBuilder.ContentTextElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentTextElementViewModel",

		/**
		 * Content element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentTextElement",

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
			this.on("change:SelectedText", this.onSelectedTextChanged, this);
		},

		/**
		 * Handler for macrobuttonclicked event.
		 * @protected
		 * @virtual
		 */
		onMacroButtonClicked: function() {
			this.fireEvent("change", this, {
				event: "macrobuttonclicked",
				arguments: arguments
			});
		},

		/**
		 * Handles macros button click.
		 * @protected
		 * @param {Object} event Event info object.
		 */
		onEmailTemplateLinkClicked: function() {
			this.fireEvent("change", this, {
				event: "emailtemplatelinkclicked"
			});
		},

		/**
		 * Handler for SelectedText change event.
		 * @protected
		 * @virtual
		 */
		onSelectedTextChanged: function() {
			this.fireEvent("change", this, {
				event: "selectedtextchanged",
				deprecatedEvent: "selectedtextсhanged",
				arguments: arguments
			});
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"items": [{
					"className": "Terrasoft.InlineCodeTextEdit",
					"value": "$Content",
					"placeholder": "$Resources.Strings.Placeholder",
					"macrobuttonclicked": "$onMacroButtonClicked",
					"emailtemplatelinkclicked": "$onEmailTemplateLinkClicked",
					"selectedText": "$SelectedText"
				}],
				"align": "$Align"
			});
			return config;
		}
	});
});


