define(['module', 'text', 'less-parser'], function(module, textLoader, lessParser) {
	'use strict';

	var lessLoader,
		hasLocation = typeof location !== 'undefined' && location.href,
		defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/:/, ''),
		defaultHostName = hasLocation && location.hostname,
		defaultPort = hasLocation && (location.port || undefined),
		buildMap = [],
		masterConfig = (module.config && module.config()) || {},
		head = document && document.getElementsByTagName('head')[0],
		extension = ".less";


	lessLoader = {
		version: '0.0.1',

		/*parseImports: function(source) {
			var importRegEx = /@import\s*'(.*)'\s*;|@import\s*"(.*)"\s*;/g,
				result,
				urls = [],
				lastIndex = 0;
			while (result = importRegEx.exec(source)) {
				urls.push(result[1] || result[2]);
				lastIndex = importRegEx.lastIndex;
			}
			if (urls.length > 0) {
				return {
					"deps": urls,
					"less": source.substring(lastIndex)
				};
			} else {
				return {"less": source};
			}
		},*/

		injectCSS: function(css, href) {
			var newSS = document.createElement('style');
			newSS.type = 'text/css';
			newSS.setAttribute("href", href);
			if (newSS.styleSheet) {
				newSS.styleSheet.cssText = css;
			} else {
				newSS.appendChild(document.createTextNode(css));
			}
			head.appendChild(newSS);
		},

		process: function(name, less, url, onLoad) {
			var nameParts = url.split("/");
			nameParts.pop();
			nameParts.push("");
			var optionValue = nameParts.join("/");
			var options = {
				rootFileInfo: {
					rootpath: optionValue,
					currentDirectory: optionValue,
					entryPath: optionValue
				}
			};
			lessParser.render(less, options, function(err, output) {
				if (err) {
					throw err;
				}
				lessLoader.finishLoad(name, output.css, url, onLoad);
			});
		},

		finishLoad: function(name, content, url, onLoad) {
			if (masterConfig.isBuild) {
				buildMap[name] = content;
			}
			lessLoader.injectCSS(content, url);
			onLoad(content);
		},

		load: function(name, req, onLoad, config) {
			// Do not bother with the work if a build and text will
			// not be inlined.
			if (config.isBuild && !config.inlineText) {
				onLoad();
				return;
			}

			masterConfig.isBuild = config.isBuild;

			var fileName = name + extension,
				url = req.toUrl(fileName),
				useXhr = (masterConfig.useXhr) || textLoader.useXhr;

			//Load the text. Use XHR if possible and in a browser.
			if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
				textLoader.get(url, function(less) {
					lessLoader.process(name, less, url, onLoad);
				}, function(err) {
					if (onLoad.error) {
						onLoad.error(err);
					}
				});
			} else {
				//Need to fetch the resource across domains. Assume
				//the resource has been optimized into a JS module. Fetch
				//by the module name + extension, but do not include the
				//!strip part to avoid file system issues.
				req([fileName], function(content) {
					lessLoader.finishLoad(fileName, content, url, onLoad);
				});
			}
		},

		write: textLoader.write,
		writeFile: textLoader.writeFile
	};

	return lessLoader;
});
