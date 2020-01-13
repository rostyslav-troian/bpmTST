Terrasoft.configuration.Structures["ActionsDashboardUtils"] = {innerHierarchyStack: ["ActionsDashboardUtils"]};
define("ActionsDashboardUtils", [
	"ActionsDashboardUtilsResources",
	"MaskHelper"
], function(Resources) {

	Ext.define("Terrasoft.manager.ActionsDashboardUtils", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.ActionsDashboardUtils",
		singleton: true,

		/**
		 * @private
		 * @type {String}
		 */
		_maskId: null,

		/**
		 * @private
		 * @type {String}
		 */
		_dcmMaskHtml: null,

		/**
		 * @private
		 * @type {String}
		 */
		_dcmCollapsedMaskHtml: null,

		/**
		 * @private
		 * @type {String}
		 */
		_maskHtml: null,

		/**
		 * @private
		 * @type String
		 */
		_collapsedMaskHtml: null,

		/**
		 * Creates an singleton instance of the ActionsDashboardUtils.
		 */
		constructor: function() {
			this.callParent(arguments);
			this._dcmMaskHtml = decodeURI(Resources.localizableStrings["DcmMaskHtmlBase64"]);
			this._dcmCollapsedMaskHtml = decodeURI(Resources.localizableStrings["DcmCollapsedMaskHtmlBase64"]);
			this._maskHtml = decodeURI(Resources.localizableStrings["MaskHtmlBase64"]);
			this._collapsedMaskHtml = decodeURI(Resources.localizableStrings["CollapsedMaskHtmlBase64"]);
		},

		/**
		 * Returns actions dashboard profile key by entity schema name.
		 * @param {String} entitySchemaName Entity schema name.
		 * @return {String}
		 */
		getProfileKeyByEntity: function(entitySchemaName) {
			return Ext.String.format("ActionsDashboard_{0}", entitySchemaName);
		},

		/**
		 * Returns actions dashboard tap panel collapsed state for section page by entity schema name.
		 * @param {String} entitySchemaName Entity schema name.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		getTabPanelCollapsed: function(entitySchemaName, callback, scope) {
			var profileKey = this.getProfileKeyByEntity(entitySchemaName);
			Terrasoft.require(["profile!" + profileKey], function(profile) {
				var tabCollapsed = Boolean(profile.tabCollapsed);
				Ext.callback(callback, scope, [tabCollapsed]);
			}, this);
		},

		/**
		 * @private
		 */
		_getMaskHtml: function(config) {
			if (config.hasAnyDcm) {
				return config.collapsed ? this._dcmCollapsedMaskHtml : this._dcmMaskHtml;
			}
			return config.collapsed ? this._collapsedMaskHtml : this._maskHtml;
		},

		/**
		 * Shows ActionsDashboard loading mask.
		 * @param {Object} config Mask config {@link Terrasoft.controls.Mask#show}.
		 */
		showMask: function(config) {
			this.hideMask();
			const parent = Ext.select(config.selector).elements[0];
			const html = this._getMaskHtml(config);
			Ext.DomHelper.insertHtml("afterBegin", parent, html);
		},

		/**
		 * Hides ActionsDashboard loading mask.
		 */
		hideMask: function() {
			const masks = document.querySelectorAll("#DcmActionsDashboardMask");
			Terrasoft.each(masks, function(el) {
				Ext.removeNode(el);
			}, this);
		}

	});

	return Terrasoft.ActionsDashboardUtils;
});


