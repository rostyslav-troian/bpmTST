Terrasoft.configuration.Structures["ImageListConfigurationGenerator"] = {innerHierarchyStack: ["ImageListConfigurationGenerator"]};
define("ImageListConfigurationGenerator", ["ContainerList", "BaseModule"], function() {

	/**
	 * @class Terrasoft.configuration.ImageListConfigurationGenerator
	 * ##### ########## ################ #########
	 */
	Ext.define("Terrasoft.configuration.ImageListConfigurationGenerator", {
		alternateClassName: "Terrasoft.ImageListConfigurationGenerator",
		extend: "Terrasoft.BaseModule",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * ########## ############ ########## ContainerList.
		 * @protected
		 * @param {Object} config ############, ####### ######## ######## ### ######### ContainerList.
		 * @returns {Object} ############ ########## ContainerList.
		 */
		generateContainerList: function(config) {
			var id = this.elementsPrefix ? this.elementsPrefix + config.name + "ContainerList"
				: config.name + "ContainerList";
			var container = {
				className: "Terrasoft.ContainerList",
				id: id,
				selectors: {wrapEl: "#" + id},
				idProperty: config.idProperty,
				isAsync: false,
				collection: {bindTo: config.collection},
				observableRowNumber: config.observableRowNumber,
				onGetItemConfig: {bindTo: config.onGetItemConfig},
				visible: {"bindTo": config.visible},
				itemsRendered: {"bindTo": config.itemsRendered}
			};
			if (!Ext.isEmpty(config.wrapClassName)) {
				container.classes = {
					wrapClassName: config.wrapClassName
				};
			}
			return container;
		}
	});

	return Ext.create("Terrasoft.ImageListConfigurationGenerator");
});


