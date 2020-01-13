/*globals Class, JooseX*/
Class("Terrasoft.Tests.ContentManager", {// jshint ignore:line

	isa: Siesta.Content.Manager.Browser.ExtJSCore,

	methods: {

		getDefineDeps: function(text) {
			var defineRe = /define\(".*?\[([\s\S]*?)\]/;
			var deps = defineRe.exec(text);
			return deps && deps[1];
		},

		getRequireDeps: function(text) {
			var requireRe = /require\(\[([\s\S]*?)]/;
			var requireDeps = requireRe.exec(text);
			return requireDeps && requireDeps[1];
		},

		processDependencie: function(depsString, testClassName, text) {
			if (!depsString || !testClassName) {
				return text;
			}
			var depsArray = depsString.split(",");
			var pluginClassName = "siestacover!" + testClassName;
			var resourcesSuffix = "Resources";
			var needReplace = false;
			for (var i = 0; i <= depsArray.length - 1; i++) {
				var depsItem = depsArray[i];
				if (depsItem.indexOf(testClassName) > -1 && depsItem.indexOf(resourcesSuffix) === -1
						&& depsItem.indexOf(pluginClassName) === -1) {
					depsArray[i] = depsItem.replace(testClassName, pluginClassName);
					needReplace = true;
				}
			}
			if (needReplace) {
				var newDeps = depsArray.join(",");
				text = text.replace(depsString, newDeps);
			}
			return text;
		}
	},

	override: {

		getTestClassName: function(url) {
			var testUrlRe = /.*\/(\w*?)(_\w*)?_Tests.js/;
			var testUrlMatch = testUrlRe.exec(url);
			return testUrlMatch && testUrlMatch[1];
		},

		getDeps: function(text) {
			var defineDeps = this.getDefineDeps(text);
			var requireDeps = this.getRequireDeps(text);
			return {
				defineDeps: defineDeps,
				requireDeps: requireDeps
			};
		},

		processDeps: function(text, testClassName) {
			// todo: think about the condition, it looks rather strange, it is possible to delete
			/*var useSchemaCover = text.indexOf("SchemaTestsHelper.initTestsSchema(") > -1;
			if (useSchemaCover && !this.harness.enableCodeCoverage) {
				return text;
			}*/
			var deps = this.getDeps(text);
			if (Ext.isObject(deps)) {
				if (deps.defineDeps) {
					text = this.processDependencie(deps.defineDeps, testClassName, text);
				}
				if (deps.requireDeps) {
					text = this.processDependencie(deps.requireDeps, testClassName, text);
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
						text = me.processDeps(text, testClassName);
					}
					onsuccess(text);
				});
			} catch (e) {
				onerror(e);
			}
		}
	}
});