Ext.ns("Terrasoft.router");

/**
 * A provider class for working with a IE and Edge.
 */
Ext.define("Terrasoft.router.IeFamilyHistoryNavigationProvider", {
	extend: "Terrasoft.HistoryNavigationProvider",
	alternateClassName: "Terrasoft.IeFamilyHistoryNavigationProvider",

	/**
	 * Last browser hash.
	 * @private
	 * @type {String}
	 */
	_lastHash: null,

	/**
	 * @override Terrasoft.BaseNavigationProvider#init
	 * @inheritdoc
	 */
	init: function() {
		this.callParent(arguments);
		this.subscribe(this.context, "hashchange", this.onHashChange, this);
	},

	/**
	 * Handler of the hashchange window event.
	 * @protected
	 */
	onHashChange: function() {
		if (this.getHash() === this._lastHash) {
			return;
		}
		this.doStateChanged();
	},

	/**
	 * @override Terrasoft.BaseNavigationProvider#doStateChanged
	 * @inheritdoc
	 */
	doStateChanged: function() {
		this.callParent(arguments);
		this._lastHash = this.getHash();
	}
});
