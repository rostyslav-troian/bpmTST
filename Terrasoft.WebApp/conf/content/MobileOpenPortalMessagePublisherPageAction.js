Terrasoft.configuration.Structures["MobileOpenPortalMessagePublisherPageAction"] = {innerHierarchyStack: ["MobileOpenPortalMessagePublisherPageAction"]};
/**
 * @class Terrasoft.configuration.action.OpenPortalMessagePublisherPage
 */
Ext.define("Terrasoft.configuration.action.OpenPortalMessagePublisherPage", {
	alternateClassName: "Terrasoft.configuration.OpenPortalMessagePublisherPageAction",
	extend: "Terrasoft.ActionBase",

	config: {

		/**
		 * @cfg {String} entitySchemaUId UId of schema.
		 */
		entitySchemaUId: null,

		/**
		 * @inheritdoc
		 */
		useMask: false

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	execute: function(record) {
		this.callParent(arguments);
		Terrasoft.util.openCachedPage("PortalMessagePublisherPage", {
			entitySchemaUId: this.getEntitySchemaUId(),
			record: record
		});
		this.executionEnd(true);
	}

});


