Terrasoft.configuration.Structures["MobilePhoneCallLogUtils"] = {innerHierarchyStack: ["MobilePhoneCallLogUtils"]};
Ext.define("Terrasoft.PhoneCallLogUtils", {
	singleton: true,

	/**
	 * @private
	 */
	pageName: "MobilePhoneCallLogPage",

	/**
	 * Opens page for phone call logging.
	 * @param {Object} config Configuration object:
	 * @param {String\Object} config.activityLinkColumnNames Columns name or array of object with column names, linking object with activity.
	 * @param {Terrasoft.model.BaseModel} config.record Record.
	 */
	openPage: function(config) {
		var pageData = {
			controllerName: "MobilePhoneCallLogPage.Controller",
			pageSchemaName: "MobilePhoneCallLogPage.View",
			viewXType: "mobilephonecalllogpageview"
		};
		Terrasoft.PageCache.addItem(this.pageName, pageData);
		var pageConfig = {
			pageSchemaName: this.pageName,
			defaultRecordData: {
				activityLinkColumnNames: config.activityLinkColumnNames,
				record: config.record,
				start: new Date()
			}
		};
		var mainPageController = Terrasoft.util.getMainController();
		setTimeout(function() {
			Terrasoft.Router.route("record", mainPageController, [pageConfig]);
		}.bind(this), 1000);
	}

});


