(function() {
	const isVueLogin = location.search.match(/vue=1/);
	if (isVueLogin) {
		const publicPath = Terrasoft.loaderBaseUrl + "/core/hash/dist/";
		requirejs.config({
			paths: {
				"login-vue": publicPath + "login-vue"
			}
		});
		// TODO : fix it
		window.__webpack_public_path__ = publicPath;
		require(["login-vue"]);
		return;
	}
	if (typeof Ext !== "undefined") {
		define("ext-base", [], function() {
			return Ext;
		});
		define("core-modules", [], function() {
			return false;
		});
	} else {
		requirejs.config({
			paths: {
				"ext-base": "../../ExtJs/extjs-base-debug",
				"login-view-utils": Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/login-view-utils'
			},
			shim: {
				"ext-base": {
					exports: "Ext"
				}
			}
		});
	}

	require(["core-modules", "core-base"], function(coreModules, core) {
		const configurationModulesConfig = {};
		const requireBaseUrl = Terrasoft.loaderBaseUrl;
		core.setScope("login");
		core.init(coreModules, configurationModulesConfig, requireBaseUrl);
		Terrasoft.configuration = Terrasoft.configuration || {};
		Terrasoft.configuration.RootSchemaDescriptors = {
			loginModule: {
				"path": Terrasoft.loginModulePath,
				"less": ["loginModule"]
			}
		};
		core.setModuleDescriptors(Terrasoft.configuration.RootSchemaDescriptors);
		core.loadModule("loginModule");
	});
})();
