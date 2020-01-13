Terrasoft.configuration.Structures["GlobalSearchStorage"] = {innerHierarchyStack: ["GlobalSearchStorage"]};
/**
 * @class Terrasoft.configuration.GlobalSearchStorage
 * Class that provides the ability to retrieve and save global search states.
 */
define("GlobalSearchStorage", [], function() {
	Ext.define("Terrasoft.configuration.GlobalSearchStorage", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.GlobalSearchStorage",

		singleton: true,

		/**
		 * Key of the local store.
		 * @private
		 * @type String
		 */
		_storeName: "GlobalSearch",

		/**
		 * Key of the search params.
		 * @private
		 * @type String
		 */
		_searchParamsKey: "SearchParams",

		/**
		 * Local store instance.
		 * @private
		 * @type Terrasoft.LocalStore
		 */
		_localStore: null,

		/**
		 * @override
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 */
		constructor: function() {
			this.callParent(arguments);
			this._localStore = Ext.create("Terrasoft.LocalStore", {
				storeName: this._storeName,
				isCache: true
			});
		},

		/**
		 * Returns search config of the global search.
		 * @return {Object} Search config of the global search.
		 */
		getSearchConfig: function() {
			return this._localStore.getItem(this._searchParamsKey);
		},

		/**
		 * Save
		 * @param {Object} searchParams
		 */
		setSearchConfig: function(searchParams) {
			this._localStore.setItem(this._searchParamsKey, searchParams);
		}
	});
	return {};
});


