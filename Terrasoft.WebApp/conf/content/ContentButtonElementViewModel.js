Terrasoft.configuration.Structures["ContentButtonElementViewModel"] = {innerHierarchyStack: ["ContentButtonElementViewModel"]};
define("ContentButtonElementViewModel", [
	"ContentButtonElementViewModelResources",
	"ContentElementBaseViewModel",
	"ckeditor-base",
	"InlineCodeTextEdit"
], function() {
	Ext.define("Terrasoft.ContentBuilder.ContentButtonElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentButtonElementViewModel",

		/**
		 * View model element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentButtonElement",

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.on("change:HtmlText", this._onHtmlTextChanged, this);
		},

		/**
		 * @private
		 */
		_onHtmlTextChanged: function(model, value) {
			this.$PlainText = this._getPlainText(value);
		},

		/**
		 * @private
		 */
		_getPlainText: function(htmlText) {
			const temp = document.createElement("div");
			temp.innerHTML = htmlText;
			const plainText = temp.textContent || temp.innerText || "";
			Ext.removeNode(temp);
			return plainText;
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"markerValue": "$PlainText",
				"align": "$Align",
				"padding": "$Padding",
				"items": [{
					"className": "Terrasoft.InlineTextEdit",
					"value": "$HtmlText",
					"markerValue": "HtmlText",
					"ckeditorDefaultConfig": {
						"allowedContent": true,
						"removeButtons":
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
							"lineheight," +
							"indentpanel"
					}
				}]
			});
			return config;
		}

	});
});


