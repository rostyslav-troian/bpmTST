Terrasoft.configuration.Structures["ReportStorage"] = {innerHierarchyStack: ["ReportStorage"]};
define("ReportStorage", [], function() {
	Ext.define("Terrasoft.configuration.ReportStorage", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ReportStorage",
		
		singleton: true,
		
		/**
		 * Key of the local store.
		 * @private
		 * @type String
		 */
		_storeName: "ReportStorage",
		
		/**
		 * Key of the report download timeout id.
		 * @private
		 * @type String
		 */
		_timeoutId: "timeoutId",
		
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
		 * Returns report download timeout id.
		 * @param {Guid} reportTaskId Report generation task id.
		 * @return {Object} Report download timeout id.
		 */
		getReportTimeoutId: function(reportTaskId) {
			return this._localStore.getItem(Ext.String.format("{0}_{1}", reportTaskId, this._timeoutId));
		},
		
		/**
		 * Save report download timeout id.
		 * @param {Guid} reportTaskId Report generation task id.
		 * @param {Number} id Report download timeout id.
		 */
		setReportTimeoutId: function(id, reportTaskId) {
			this._localStore.setItem(Ext.String.format("{0}_{1}", reportTaskId, this._timeoutId), id);
		}
	});
	return {};
});

