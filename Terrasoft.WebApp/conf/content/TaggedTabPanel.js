Terrasoft.configuration.Structures["TaggedTabPanel"] = {innerHierarchyStack: ["TaggedTabPanel"]};
define("TaggedTabPanel", ["terrasoft", "ext-base"], function(Terrasoft, Ext) {

	/**
	 *  Class for working with tabs.
	 */
	Ext.define("Terrasoft.configuration.TaggedTabPanel", {

		extend: "Terrasoft.TabPanel",

		alternateClassName: "Terrasoft.TaggedTabPanel",

		/**
		 * @inheritdoc Terrasoft.controls.TabPanel#onTabClick
		 * @override
		 */
		onTabClick: function() {
			var oldActiveTabName = this.activeTabName;
			this.callParent(arguments);
			if (this.activeTabName === oldActiveTabName) {
				this.toggleCollapsed();
			}
		}
	});

	return Ext.create("Terrasoft.TaggedTabPanel");
});


