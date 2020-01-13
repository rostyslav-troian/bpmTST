Terrasoft.configuration.Structures["TooltipUtilities"] = {innerHierarchyStack: ["TooltipUtilities"]};
define("TooltipUtilities", ["TooltipUtilitiesResources", "AcademyUtilities", "InformationButton",
		"ContextTip", "css!TooltipUtilities"],
	function(resources, AcademyUtilities) {
	/**
	 * @class Terrasoft.configuration.mixins.TooltipUtilities
	 * Contains utility methods used by tooltips.
	 */
	Ext.define("Terrasoft.configuration.mixins.TooltipUtilities", {
		alternateClassName: "Terrasoft.TooltipUtilities",

		/**
		 * Returns image configuration for close tip button.
		 * @return {Object}
		 */
		getCloseTipButtonImageConfig: function() {
			return resources.localizableImages.CloseTipButtonImage;
		},

		/**
		 * Event handler of close tip button click.
		 * @protected
		 * @virtual
		 */
		closeTipButtonClick: function() {
			var tooltipVisibilityPropertyName = arguments[3];
			this.set(tooltipVisibilityPropertyName, false);
		},

		/**
		 * Show tip on label click.
		 * @protected
		 * @param {String} tooltipVisibilityPropertyName Attribute name to which tip visibility is bound.
		 * @virtual
		 */
		showTipOnLabelClick: function(tooltipVisibilityPropertyName) {
			this.set(tooltipVisibilityPropertyName, true);
		},

		/**
		 * Handler for click event on tooltip content.
		 * @virtual
		 * @param {Array} linkAttributes Attributes to create context help link.
		 * @return {Boolean} False, if click event was handled, and need to be stopped.
		 */
		onTipLinkClick: function(linkAttributes) {
			var contextHelpId = linkAttributes ? linkAttributes["data-context-help-id"] : null;
			var contextHelpCode = linkAttributes ? linkAttributes["data-context-help-code"] : null;
			if (contextHelpId || contextHelpCode) {
				var getUrlConfig = {
					callback: function(url) {
						url = url ? url : linkAttributes.href;
						window.open(url, "_blank");
					},
					scope: this,
					contextHelpId: contextHelpId,
					contextHelpCode: contextHelpCode
				};
				AcademyUtilities.getUrl(getUrlConfig);
				return false;
			}
		}

	});
	return Terrasoft.TooltipUtilities;
});


