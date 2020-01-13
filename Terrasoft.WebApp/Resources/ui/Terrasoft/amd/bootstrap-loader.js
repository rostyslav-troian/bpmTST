/**
 * Prepares current page to loading a bootstrap module (that should be specified in 'data-loadbootstrap' attribute)
 * and loads this module.
 */
(function() {
	var baseUrl = "../";
	var coreResourcesPath;
	var cacheBustingQueryString;

	/**
	 * Returns script HTML-element of bootstrap loader.
	 */
	function getBootstrapLoaderScriptElement() {
		var script = document.querySelector("script[data-loadbootstrap]");
		if (!script) {
			throw "Please specify 'data-loadbootstrap' attribute!";
		}
		return script;
	}

	/**
	 * Returns URL of the endpoint that should be used for loading of additional client scripts from the server.
	 */
	function getClientScriptEndpointUrl() {
		var defaultEndpointMethod = "GenerateLoginScripts";
		var script = getBootstrapLoaderScriptElement();
		var endpointMethod = script.getAttribute("data-clientscriptendpoint") || defaultEndpointMethod;
		return baseUrl + 'ServiceModel/ClientScriptService.svc/' + endpointMethod;
	}

	/**
	 * Builds query string with a unique file version identifier to tell the browser that a new version of the file is available.
	 * @param {String} cacheBustingQueryParam Value of the parameter to be used in the cache busting string.
	 */
	function buildCacheBustingQueryString(cacheBustingQueryParam) {
		return "v=" + cacheBustingQueryParam;
	}

	/**
	 * Appends 'script' tag for JS-file with specified source URL to current position in HTML.
	 * @param {String} url URL of script source file.
	 * @param {String} customCacheBustingQueryParam Value of the parameter to be used in the cache busting string instead of default value.
	 * @return {HTMLScriptElement} Script element.
	 */
	function appendScriptWithUrl(url, customCacheBustingQueryParam) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url + "?" + (customCacheBustingQueryParam
			? buildCacheBustingQueryString(customCacheBustingQueryParam)
			: cacheBustingQueryString);
		document.head.appendChild(script);
		return script;
	}

	/**
	 * Appends 'link' tag for CSS-file with specified source URL to current position in HTML.
	 * @param {String} url URL of CSS source file.
	 */
	function appendCssLinkWithUrl(url) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url + "?" + cacheBustingQueryString;
		document.head.appendChild(link);
		return link;
	}

	/**
	 * Waits for loading of specified HTML elements and calls callback function after it.
	 * @param {Array} elements Array of loading HTML elements.
	 * @param {Function} callback The function to be called after finishing loading.
	 */
	function onLoadAll(elements, callback) {
		var elementsToLoad = elements.length;
		if (!elementsToLoad) {
			callback();
		}
		elements.forEach(function(element) {
			element.onload = function() {
				elementsToLoad--;
				if (elementsToLoad === 0) {
					callback();
					return;
				}
			}
		});
	}

	/**
	 * Builds full path of core resource file.
	 * @param {String} resourceRelativePath Relative path of core resource file.
	 */
	function buildCoreResourceUrl(resourceRelativePath) {
		return coreResourcesPath + resourceRelativePath;
	}

	/**
	 * Receives URL of bootstrap file to load.
	 */
	function getLoadBootstrapUrl() {
		var script = getBootstrapLoaderScriptElement();
		var bootstrapModulesPath = "Terrasoft/amd/";
		return buildCoreResourceUrl(bootstrapModulesPath + script.getAttribute("data-loadbootstrap"));
	}

	/**
	 * Configures RequireJs by initial modules before loading bootstrap module.
	 */
	function configureRequireJs() {
		var requirePathsConfig = {
			"configuration-loader": "Terrasoft/amd/configuration-loader",
			"configuration-bootstraps": "Terrasoft/amd/configuration-bootstraps",
			"require-config": "Terrasoft/amd/require-config",
			"require-url-config": "Terrasoft/amd/require-url-config",
			"core-base": "Terrasoft/amd/core-base",
			"bootstrap": "Terrasoft/amd/bootstrap",
			"performanceLogger": "Terrasoft/amd/performanceLogger",
			"performancecountermanager": "Terrasoft/amd/performancecountermanager",
			"jQuery": "jQuery/jQuery",
			"jQuery-easing": "jQueryEasing/jQuery-easing",
			"jsrender": "jsrender/jsrender",
			"ts-common-all": "ts-diagram-module/min/ts-common-all",
			"ts-diagram": "ts-diagram-module/min/ts-diagram",
			"process-schema-diagram": "Terrasoft/designers/process-schema-designer/process-schema-diagram",
			"process-schema-diagram-5x": "Terrasoft/designers/process-schema-designer/process-schema-diagram-5x",
			"ckeditor-base": "CKEditor/ckeditor",
			"html2canvas": "html2canvas/html2canvas",
			"classList-shim": "normalize/classList-shim",
			"pathSeg-polyfill": "normalize/pathSeg-polyfill",
			"login-view-utils": "Terrasoft/amd/login-view-utils",
			"chartjs": "Chartjs/Chart.bundle.min",
			"chartjs-label": "Chartjs/chartjs-plugin-labels",
			"chartjs-defaults": "Chartjs/chartjs-defaults",
			"chartjs-funnel": "Chartjs/chart.funnel",
			"chartjs-gauge": "Chartjs/Gauge"
		};
		Object.keys(requirePathsConfig).forEach(function(key) {
			requirePathsConfig[key] = buildCoreResourceUrl(requirePathsConfig[key]);
		});
		requirePathsConfig["loadbootstrap"] = getLoadBootstrapUrl();
		requirejs.config({
			paths: requirePathsConfig,
			shim: {
				"jQuery-easing": { "deps": ["jQuery"] },
				"ts-common-all": { "deps": ["jQuery-easing"] },
				"ts-diagram": { "deps": ["ts-common-all", "jsrender"] },
				"process-schema-diagram": { "deps": ["ts-diagram"] },
				"process-schema-diagram-5x": { "deps": ["process-schema-diagram"] },
				"loadbootstrap": { "deps": ["classList-shim", "pathSeg-polyfill", "jQuery"] },
				"chartjs-label": { "deps": ["chartjs"] },
				"chartjs-defaults": { "deps": ["chartjs-label"] },
				"chartjs-funnel": { "deps": ["chartjs"] },
				"chartjs-gauge": { "deps": ["chartjs"] }
			},
			urlArgs: cacheBustingQueryString,
			baseUrl: baseUrl
		});
	}

	appendScriptWithUrl(getClientScriptEndpointUrl(), Date.now().toString()).onload = function() {
		if (!window.Terrasoft) {
			throw "The global object 'Terrasoft' is not initialized yet, the page can not be loaded."
		}
		cacheBustingQueryString = buildCacheBustingQueryString(Terrasoft.coreVersion || "0.0.0.0");
		coreResourcesPath = Terrasoft.coreModulesPath || "";
		onLoadAll([
			appendCssLinkWithUrl(baseUrl + buildCoreResourceUrl("combined/all-combined.css")),
			appendScriptWithUrl(baseUrl + buildCoreResourceUrl("combined/all-combined.js"))
		], function() {
			appendScriptWithUrl(baseUrl + buildCoreResourceUrl("requirejs/require.js")).onload = function() {
				configureRequireJs();
				require(["loadbootstrap"], function() { });
			};
		});
	};
})();
