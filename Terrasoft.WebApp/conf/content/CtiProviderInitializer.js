Terrasoft.configuration.Structures["CtiProviderInitializer"] = {innerHierarchyStack: ["CtiProviderInitializer"]};
define("CtiProviderInitializer", ["ext-base", "CtiProviderInitializerResources", "core-base", "terrasoft"],
	function(Ext, resources, core, Terrasoft) {
		return {
			/**
			 * ############ ########### ### cti-########## #########.
			 * @protected
			 * @param {Terrasoft.BaseCtiProvider} ctiProvider cti-#########
			 * @param {String} ctiProviderName ######## ###### cti-##########.
			 * @param {Function} callback ####### ######### ######.
			 */
			initCustomCtiProvider: function(ctiProvider, ctiProviderName, callback) {
				callback(ctiProvider);
			},

			/**
			 * ############## cti-######### # ######## ####### ######### ######.
			 * @param {String} ctiProviderName ######## ###### cti-##########.
			 * @param {Function} callback ####### ######### ######.
			 */
			initializeCtiProvider: function(ctiProviderName, callback) {
				var ctiProvider = Terrasoft[ctiProviderName];
				if (Ext.isEmpty(ctiProvider)) {
					require([ctiProviderName], function() {
						ctiProvider = Terrasoft[ctiProviderName];
						this.initCustomCtiProvider(ctiProvider, ctiProviderName, callback);
					}.bind(this));
				} else {
					this.initCustomCtiProvider(ctiProvider, ctiProviderName, callback);
				}
			}
		};
	}
);


