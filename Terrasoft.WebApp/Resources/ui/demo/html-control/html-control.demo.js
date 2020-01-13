define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.HtmlControlModel", {
		extend: "Terrasoft.BaseViewModel",
		columns: {
			HtmlConfig: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "HtmlConfig",
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		/**
		 * Execute model initialization.
		 */
		init: function() {
			var styleHtml = "<style>" +
					".together {" +
						"display: flex" +
					"}" +
					".extendedLabel {" +
						"font-size: 12pt;" +
						"background-color: #e6fdde;" +
						"width: 100px;" +
						"margin-right: 3px;" +
						"padding-left: 5px;" +
						"height: 24px" +
					"}" +
					".prefix {" +
						"color: #ccc" +
					"}" +
					"</style>";
			var lableHtml = "<div class=\"together\"><p class=\"extendedLabel\"><span class=\"prefix\">от</span> 21</p>" +
					"<p class=\"extendedLabel\"><span class=\"prefix\">до</span> 65</p></div>";
			var html = styleHtml + lableHtml;
			this.set("HtmlConfig", html);
		}
	});

	return {
		"render": function(renderTo) {
			var model = Ext.create("Terrasoft.HtmlControlModel");
			model.init();
			var htmlControlBinding = Ext.create("Terrasoft.HtmlControl", {
				renderTo: renderTo,
				htmlContent: {
					bindTo: "HtmlConfig"
				}
			});
			htmlControlBinding.bind(model);

			var htmlControl = Ext.create("Terrasoft.HtmlControl", {
				renderTo: renderTo,
				html: "<a id=\"bingclass\" href=\"http://www.bing.com\">Bing</a>",
				selectors: {
					wrapEl: "#bingclass"
				}
			});
		}
	};
});
