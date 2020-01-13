Terrasoft.configuration.Structures["BaseGeneratorV2"] = {innerHierarchyStack: ["BaseGeneratorV2"]};
define("BaseGeneratorV2", ["ext-base"], function(Ext) {
	/**
	 * Base generator.
	 */
	var baseGenerator = Ext.define("Terrasoft.configuration.BaseGenerator", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.BaseGenerator",

		/**
		 * ### ############ #####.
		 * @protected
		 * @type {String}
		 */
		schemaName: "",

		/**
		 * ### ############ #####.
		 * @protected
		 * @type {Terrasoft.SchemaType}
		 */
		schemaType: null,

		/**
		 * ############ ########## #####.
		 * @protected
		 * @type {Object}
		 */
		generateConfig: null,

		/**
		 * ########## ### ####### ###### c ########## #######.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ######## ############# #####.
		 * @return {String} ########## ############### ### ####### ######.
		 */
		getTabsCollectionName: function(config) {
			return config.collection && config.collection.bindTo;
		},

		/**
		 * ############## ########## ######### ##########.
		 * @protected
		 * @virtual
		 * @param {Object} config ############ ########## #####.
		 */
		init: function(config) {
			var schema = config.schema;
			this.generateConfig = config;
			this.schemaName = config.schemaName || (schema && schema.schemaName) || "";
			this.schemaType = config.schemaType || (schema && schema.type);
		},

		/**
		 * ####### ########## ######### ##########.
		 * @protected
		 * @virtual
		 */
		clear: function() {
			this.generateConfig = null;
			this.schemaName = null;
			this.schemaType = null;
		},

		/**
		 * ####### ##### #########.
		 * @param {Object} config ############ ########## #####.
		 * @param {Function} callback #######-callback.
		 * @param {Object} scope ######## ########## ####### callback.
		 */
		generate: function(config, callback, scope) {
			this.init(config);
			callback.call(scope || this);
		}

	});
	return baseGenerator;
});


