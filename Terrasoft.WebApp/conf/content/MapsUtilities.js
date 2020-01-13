Terrasoft.configuration.Structures["MapsUtilities"] = {innerHierarchyStack: ["MapsUtilities"]};
define("MapsUtilities", ["MapsHelper"], function(MapsHelper) {
	Ext.define("Terrasoft.configuration.MapsUtilities", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.MapsUtilities",

		singleton: true,

		/**
		 * Opens OSM maps module.
		 * @param {Object} config Configuration object.
		 * @param {Object} config.scope Execution context.
		 * @param {Object} config.sandbox Sandbox instance.
		 * @param {Object} config.renderTo Id or element where to render maps.
		 * @param {Boolean} config.keepAlive Keep alive chain module.
		 * @param {Array} config.mapsConfig Config for showing objects on the map.
		 * @param {String} config.mapsModuleSandboxId Maps module sandbox id.
		 * @param {Function} config.afterRender After render function callback.
		 */
		open: function(config) {
			var scope = config.scope;
			var sandbox = config.sandbox || scope.sandbox;
			var renderTo = config.renderTo;
			var mapsConfig = config.mapsConfig;
			var afterRenderFunction = config.afterRender;
			var mapsModuleSandboxId = config.mapsModuleSandboxId || (sandbox.id + "_MapsModule");
			var keepAlive = config.keepAlive;
			if (Ext.isEmpty(renderTo)) {
				mapsModuleSandboxId += Terrasoft.generateGUID();
				keepAlive = true;
				mapsConfig.isModalBox = true;
			} else {
				mapsConfig.renderTo = renderTo;
			}
			MapsHelper.showMask();
			if (Ext.isFunction(afterRenderFunction)) {
				sandbox.subscribe("AfterRenderMap", function() {
					afterRenderFunction.call(scope);
				}, [mapsModuleSandboxId]);
			}
			sandbox.subscribe("GetMapsConfig", function() {
				return mapsConfig;
			}, [mapsModuleSandboxId]);
			sandbox.loadModule("OsmMapsModule", {
				id: mapsModuleSandboxId,
				keepAlive: keepAlive
			});
		}
	});
	return Terrasoft.MapsUtilities;
});


