Terrasoft.configuration.Structures["WebPageModule"] = {innerHierarchyStack: ["WebPageModule"]};
define("WebPageModule", ["WebPageModuleResources", "BaseWidgetModule"], function(resources) {
	/**
	 * A class that generates a configuration for the presentation of a Web page module.
	 */
	Ext.define("Terrasoft.configuration.WebPageViewConfig", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.WebPageViewConfig",

		/**
		 * Generates the configuration module view a Web page.
		 * @protected
		 * @param {Object} config A configuration object.
		 * @return {Object[]} Returns the configuration module view a Web page.
		 */
		generate: function(config) {
			var id = Terrasoft.Component.generateId();
			var iframeHtml = this.getIframeParams(config, id);
			var result = {
				"name": id,
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					wrapClassName: ["WebPage-module-wraper"]
				},
				"items": [
					{
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"html": iframeHtml,
						"selectors": {
							"wrapEl": "#" + id + "Container"
						}
					}
				]
			};
			return result;
		},

		/**
		 * Returns the parameters of the IFrame.
		 * @private
		 * @param {Object} config A configuration object.
		 * @param {String} id The ID of the container IFrame.
		 * @return {Object} The parameters IFrame.
		 */
		getIframeParams: function(config, id) {
			const encodedUrl = Terrasoft.utils.string.encodeHtml(config.url);
			if (Ext.isEmpty(config.url) || !Terrasoft.isUrl(encodedUrl)) {
				return "";
			}
			const iframeStyle = config.style ? "style='" + Terrasoft.utils.string.encodeHtml(config.style) + "'" : "";
			const iframeHtml = "<iframe id = '" + id + "-webpage-widget' " +
				"class = 'webpage-widget' src='" + encodedUrl +
				"' width='100%' height='100%' " + iframeStyle +
				" ></iframe>";
			return iframeHtml;
		}

	});

	Ext.define("Terrasoft.configuration.WebPageViewModel", {
		extend: "Terrasoft.model.BaseModel",
		alternateClassName: "Terrasoft.WebPageViewModel",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		onRender: Ext.emptyFn,

		/**
		 * @inheritdoc Terrasoft.core.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		},

		/**
		 * Init model the resource values of the resource object.
		 * @protected
		 * @param {Object} resourcesObj A resource object.
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
		 * Init the initial values of the model.
		 * @protected
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		init: function(callback, scope) {
			callback.call(scope);
		}

	});

	Ext.define("Terrasoft.configuration.WebPageModule", {
		extend: "Terrasoft.configuration.BaseWidgetModule",
		alternateClassName: "Terrasoft.WebPageModule",

		/**
		 * @inheritdoc Terrasoft.core.BaseModule#viewModelClassName
		 * @override
		 */
		viewModelClassName: "Terrasoft.WebPageViewModel",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseWidgetModule#viewConfigClassName
		 * @override
		 */
		viewConfigClassName: "Terrasoft.WebPageViewConfig",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseWidgetModule#initConfig
		 * @override
		 */
		initConfig: function() {
			this.callParent(["GetWebPageConfig", this.sandbox]);
		},

		/**
		 * Subscribes to messages of the parent module.
		 * @protected
		 */
		subscribeMessages: function() {
			this.sandbox.subscribe("GenerateWebPage", this.onGenerateWebPage, this, [this.sandbox.id]);
		},

		/**
		 * A method of processing messages to generate a web page.
		 * @protected
		 */
		onGenerateWebPage: function() {
			var viewModel = this.viewModel;
			this.moduleConfig = null;
			this.initConfig();
			viewModel.loadFromColumnValues(this.moduleConfig);
			var view = this.view;
			if (view && !view.destroyed) {
				view.destroy();
			}
			this.initViewConfig(function() {
				var renderTo = Ext.get(viewModel.renderTo);
				if (renderTo) {
					this.render(renderTo);
				}
			}, this);
		}
	});

	return Terrasoft.WebPageModule;
});


