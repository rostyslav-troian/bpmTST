Terrasoft.configuration.Structures["BaseFilterViewModel"] = {innerHierarchyStack: ["BaseFilterViewModel"]};
define("BaseFilterViewModel", ["CheckModuleDestroyMixin"], function() {
	/**
	 * @class Terrasoft.configuration.BaseFilterViewModel
	 * ####### ##### ###### #######.
	 */
	Ext.define("Terrasoft.configuration.BaseFilterViewModel", {
		alternateClassName: "Terrasoft.BaseFilterViewModel",
		extend: "Terrasoft.BaseViewModel",
		mixins: [
			/**
			 * @class CheckModuleDestroyMixin Implements publish and show CanBeDestroy message.
			 */
			"Terrasoft.CheckModuleDestroyMixin"
		],

		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * The schema name with which the filter works.
		 * @type {Object}
		 */
		entitySchema: null,

		/**
		 * The schema name of the folder with which the filter works.
		 * @type {Object}
		 */
		folderEntitySchema: null,

		/**
		 * ##### ####### ############## ####### # ###### # ####### ######## ######.
		 * @type {Object}
		 */
		inFolderEntitySchema: null,

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @virtual
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * ####### ######### #######.
				 * @param {String} filterType ### ###### ############# #######.
				 * @param {Boolean} suspendUpdate #### ######### ######## #########.
				 */
				"filterChanged",
				/**
				 * @event
				 * ####### ######### ############ #######.
				 * @param {String} filterType ### ###### ############# #######.
				 * @param {String} filterName ######## #######.
				 * @param {Object} outResult ######, #### ##### ####### ########### ######.
				 */
				"getFilterValue",
				/**
				 * @event
				 * ####### ####### ############ #######.
				 * @param {String} filterType ### ###### ############# #######.
				 * @param {Object} config ############ #######, ####### ##### ########## ###### ######.
				 */
				"clearFilterValue"
			);
		},

		/**
		 * Get current filters list.
		 * @virtual
		 * @return {Terrasoft.BaseFilter} List of current filters.
		 */
		getFilterState: function() {
			return this.get("Filters");
		},

		/**
		 * Set new filters value.
		 * @virtual
		 */
		setFilterState: function(value) {
			this.set("Filters", value);
		}
	});
});


