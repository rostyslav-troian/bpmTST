/*
 * css! loader plugin
 * Allows for loading stylesheets with the "css!" syntax.
 *
 * External stylesheets supported.
 * 
 * "!" suffix skips load checking
 *
 */
define(["./normalize", "./text"], function(normalize, textLoader) {
	if (typeof window === "undefined") {
		return {
			load: function(n, r, load) {
				load();
			}
		};
	}

	var head = document.getElementsByTagName("head")[0];

	//main api object
	var cssAPI = {
		pluginBuilder: "./css-builder"
	};

	//<style> tag creation
	var stylesheet = document.createElement("style");
	stylesheet.type = "text/css";
	head.appendChild(stylesheet);

	function appendCss(stylesheet, css) {
		if (stylesheet.styleSheet) {
			stylesheet.styleSheet.cssText += css;
		} else {
			stylesheet.appendChild(document.createTextNode(css));
		}
	}

	function isEmptyObject(object) {
		return Boolean(!object || Object.keys(object).length === 0);
	}

	function isFunction(value) {
		return Boolean(value && typeof value === "function");
	}

	cssAPI.inject = function(css, href) {
		if (href) {
			var newSS = document.createElement("style");
			newSS.type = "text/css";
			newSS.setAttribute("href", href);
			appendCss(newSS, css);
			head.appendChild(newSS);
		} else {
			appendCss(stylesheet, css);
		}
	};

	cssAPI.inspect = function() {
		if (stylesheet.styleSheet) {
			return stylesheet.styleSheet.cssText;
		} else if (stylesheet.innerHTML) {
			return stylesheet.innerHTML;
		}
	};

	var instantCallbacks = {};
	cssAPI.normalize = function(name, normalize) {
		var instantCallback;
		if (name.substr(name.length - 1, 1) === "!") {
			instantCallback = true;
		}
		if (instantCallback) {
			name = name.substr(0, name.length - 1);
		}
		if (name.substr(name.length - 4, 4) === ".css") {
			name = name.substr(0, name.length - 4);
		}

		name = normalize(name);

		if (instantCallback) {
			instantCallbacks[name] = instantCallback;
		}

		return name;
	};

	cssAPI.modifyUrlForRtl = function(fileUrl) {
		var terrasoft = window.Terrasoft;
		var isRightToLeft = terrasoft && terrasoft.Resources && terrasoft.Resources.CultureSettings
			&& terrasoft.Resources.CultureSettings.isRightToLeft;

		// TODO #CRM-32869 Remove isCoreResource check
		var isCoreResource = fileUrl.indexOf("/Resources/ui/") > -1
			|| fileUrl.indexOf("/core/hash/Fonts/") > -1 || fileUrl.indexOf("/core/hash/stylesheet/") > -1;
		if (isRightToLeft && !isCoreResource) {
			fileUrl = fileUrl.replace(".css", "-rtl.css");
		}
		return fileUrl;
	};

	cssAPI.toCssUrl = function(cssId, req, config) {
		var fileUrl;
		var terrasoft = window.Terrasoft;
		if (terrasoft && terrasoft.useStaticFileContent && config && !isEmptyObject(config.bundles) &&
				isFunction(terrasoft.checkTerrasoftModuleInBundles)) {
			cssId = cssId.replace(/^.*(\\|\/|\u003a)/, "");
			if (terrasoft.checkTerrasoftModuleInBundles(cssId)) {
				if (terrasoft.configurationContentHash) {
					cssId = cssId + "?hash=" + terrasoft.configurationContentHash;
				}
				fileUrl = [terrasoft.workspaceBaseUrl,
					terrasoft.app.config.staticFileContent.schemasRuntimePath, cssId].join("/");
			} else {
				fileUrl = req.toUrl(cssId);
			}
		} else {
			fileUrl = req.toUrl(cssId);
		}
		return fileUrl;
	};

	cssAPI.load = function(cssId, req, load, config, parse) {
		var instantCallback = instantCallbacks[cssId];
		if (instantCallback) {
			delete instantCallbacks[cssId];
		}
		var fileUrl = cssId;
		var hasCssExtension = fileUrl.substr(fileUrl.length - 4, 4) === ".css";
		if (!hasCssExtension && !parse) {
			fileUrl += ".css";
		}
		fileUrl = cssAPI.toCssUrl(fileUrl, req, config);
		if (window.Terrasoft && window.Terrasoft.useStaticFileContent) {
			fileUrl = cssAPI.modifyUrlForRtl(fileUrl);
		}
		if (parse) {
			textLoader.get(fileUrl, function(css) {
				var pathName = window.location.pathname.split("/");
				pathName.pop();
				pathName = pathName.join("/") + "/";

				//make file url absolute
				fileUrl = normalize.convertURIBase(fileUrl, pathName, "/");
				if (!normalize.isAbsoluteURI(fileUrl)) {
					fileUrl = "/" + fileUrl;
				}

				css = normalize(css, fileUrl, pathName);

				if (parse) {
					css = parse(css);
				}

				cssAPI.inject(css, fileUrl);

				if (!instantCallback) {
					load(cssAPI);
				}
			});
			if (instantCallback) {
				load(cssAPI);
			}
		} else {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = fileUrl;
			head.appendChild(link);

			//only instant callback due to onload not being reliable
			load(cssAPI);
		}
	};

	return cssAPI;
});
