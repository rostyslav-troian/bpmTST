Terrasoft.configuration.Structures["LeftPanelUtilitiesV2"] = {innerHierarchyStack: ["LeftPanelUtilitiesV2"]};
define("LeftPanelUtilitiesV2", ["ext-base", "terrasoft", "ConfigurationConstants", "profile!LeftPanelCollapsed"],
	function(Ext, Terrasoft, ConfigurationConstants, profile) {
	/**
	 * @class Terrasoft.configuration.LeftPanelUtilities
	 * ############### ##### ###### # ##### ####### ####### ##########
	 */
	Ext.define("Terrasoft.configuration.LeftPanelUtilitiesV2", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.LeftPanelUtilitiesV2",

		/**
		 * ####### ############# #######.
		 * @private
		 * @type {Boolean}
		 */
		useProfile: true,

		/**
		 * ########### ######.
		 * @returns {Terrasoft.configuration.LeftPanelUtilities} ########## ######### ######### ######.
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event
				 * ####### ######### ########### ##### ######.
				 */
				"collapsedChanged"
			);
			return this;
		},

		/**
		 * ############# ######### ########### # ######### #########.
		 * @public
		 */
		initCollapsedState: function() {
			var defaultCollapsed = this.getDefaultCollapsed();
			this.setCollapsed(defaultCollapsed);
		},

		/**
		 * ########## ######### ######## ########### ##### ######.
		 * @protected
		 * @return {Boolean} ######### ######## ########### ##### ######.
		 */
		getDefaultCollapsed: function() {
			if (this.useProfile) {
				if (profile !== null) {
					return profile;
				} else {
					return true;
				}
			} else {
				return true;
			}
		},

		/**
		 * ########## ####### ######## ########### ##### ######.
		 * @public
		 * @return {Boolean} ####### ######## ########### ##### ######.
		 */
		getCollapsed: function() {
			var body = Ext.getBody();
			return body.hasCls("left-panel-collapsed");
		},

		/**
		 * ######## ######## ########### ##### ###### ## ########.
		 * @public
		 */
		changeCollapsed: function() {
			var collapsed = this.getCollapsed();
			this.setCollapsed(!collapsed);
		},

		/**
		 * ######## ######## ########### ##### ######.
		 * @param {Boolean} collapsed ####### ###########.
		 * @public
		 */
		setCollapsed: function(collapsed) {
			var body = Ext.getBody();
			var internalCollapsed = this.getCollapsed();
			if (collapsed) {
				body.addCls("left-panel-collapsed");
			} else {
				body.removeCls("left-panel-collapsed");
			}
			if (internalCollapsed !== collapsed) {
				this.fireEvent("collapsedChanged", collapsed);
			}
			if (this.useProfile) {
				Terrasoft.utils.saveUserProfile("LeftPanelCollapsed", collapsed, false);
			}
		}

	});
	return Ext.create(Terrasoft.configuration.LeftPanelUtilitiesV2);
});


