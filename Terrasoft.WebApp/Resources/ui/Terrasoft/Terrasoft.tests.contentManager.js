/*globals Class, JooseX*/
Class("Terrasoft.Tests.ContentManager", {// jshint ignore:line

	isa: Siesta.Content.Manager.Browser.ExtJSCore,

	has: {
		defineRe: /define\(".*?\[([\s\S]*?)\]/,
		requireRe: /require\(\[([\s\S]*?)\]/,
		commentRe: /\/\/coverage:(\s*)(.*)/
	},

	override: {

		getTestClassName: function(url) {
			var testUrlRegExp = /.*\/(.*?)(.ui.tests|.unit.tests).js/;
			var testUrlMatch = testUrlRegExp.exec(url);
			return testUrlMatch && testUrlMatch[1];
		},

		execRegularExpression: function(text, re, groupIndex, options) {
			var result = re.exec(text);
			if (result && options) {
				options.index = result ? result.index : re.lastIndex;
			}
			re.lastIndex = 0;
			return (result && groupIndex !== undefined) ? result[groupIndex] : result;
		},

		getDependencies: function(text, options) {
			return (this.execRegularExpression(text, this.commentRe, 2, options)) ||
				this.execRegularExpression(text, this.defineRe, 1) ||
				this.execRegularExpression(text, this.requireRe, 0);
		},

		replaceFromIndex: function(source, startIndex, what, newValue) {
			var start = source.indexOf(what, startIndex) + what.length;
			var secondPart = source.substring(start);
			return source.substring(0, start) + secondPart.replace(what, newValue);
		},

		processDependencies: function(text, testClassName) {
			var options = {index: -1};
			var dependencies = this.getDependencies(text, options);
			if (dependencies) {
				var pluginClassName = "siestacover!" + testClassName;
				if (dependencies.indexOf(testClassName) > -1 && dependencies.indexOf(pluginClassName) === -1) {
					var replaceRe = new RegExp(dependencies.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
					var newDependencies = dependencies.replace(testClassName, pluginClassName);
					if (options.index > 0) {
						text = this.replaceFromIndex(text, options.index, dependencies, newDependencies);
					} else {
						text = text.replace(replaceRe, newDependencies);
					}
				}
			}
			return text;
		},

		load: function(url, onsuccess, onerror) {
			var enableCoverage = this.harness.enableCodeCoverage;
			var testClassName = this.getTestClassName(url);
			if (!enableCoverage || Ext.isEmpty(testClassName)) {
				this.SUPERARG(arguments);
				return;
			}
			var req = new JooseX.SimpleRequest();
			try {
				if (enableCoverage) {
					url += "?timestamp=" + Ext.encode(new Date());
				}
				var me = this;
				req.getText(url, true, function(success, text) {
					if (!success) {
						onerror(this + " not found");
						return;
					}
					if (enableCoverage && testClassName) {
						text = me.processDependencies(text, testClassName);
					}
					onsuccess(text);
				});
			} catch (e) {
				onerror(e);
			}
		}
	}
});
Class("Terrasoft.Tests.ServerSideInstrumentationContentManager", {
	isa: Siesta.Content.Manager.Browser.ExtJSCore,
	override: {
		getLogicalUnitContent: function(path) {
			return window[path] || this.SUPERARG(arguments);
		}
	}
});
