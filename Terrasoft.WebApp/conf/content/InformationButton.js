Terrasoft.configuration.Structures["InformationButton"] = {innerHierarchyStack: ["InformationButton"]};
define("InformationButton", ["ext-base", "terrasoft", "InformationButtonResources", "css!InformationButton"],
		function(Ext, Terrasoft, resources) {
	/**
	 * @class Terrasoft.controls.InformationButton
	 * InformationButton class.
	 */
	Ext.define("Terrasoft.controls.InformationButton", {
		extend: "Terrasoft.Button",
		alternateClassName: "Terrasoft.InformationButton",

		/**
		 * @inheritdoc Terrasoft.Button#prefix
		 * @type {String}
		 */
		prefix: "t-information-btn t-btn",

		/**
		 * @inheritdoc Terrasoft.Button#style
		 * @type {Terrasoft.controls.ButtonEnums.style}
		 */
		style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,

		/**
		 * @inheritdoc Terrasoft.Button#iconAlign
		 * @type {Terrasoft.controls.ButtonEnums.iconAlign}
		 */
		iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,

		init: function() {
			this.callParent(arguments);
			this.imageConfig = this.imageConfig || this.getDefaultImageConfig();
		},

		/**
		 * Returns default image configuration.
		 * @return {Object}
		 */
		getDefaultImageConfig: function() {
			return resources.localizableImages.DefaultIcon;
		}
	});
});



