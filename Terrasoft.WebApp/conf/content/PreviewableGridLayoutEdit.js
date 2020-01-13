Terrasoft.configuration.Structures["PreviewableGridLayoutEdit"] = {innerHierarchyStack: ["PreviewableGridLayoutEdit"]};
define("PreviewableGridLayoutEdit", ["PreviewableGridLayoutEditResources",
		"PreviewableGridLayoutEditItem"], function() {

	/**
	 * Class of control element which changes grid element settings.
	 * @class Terrasoft.controls.GridLayoutEdit
	 */
	Ext.define("Terrasoft.controls.PreviewableGridLayoutEdit", {
		extend: "Terrasoft.GridLayoutEdit",
		alternateClassName: "Terrasoft.PreviewableGridLayouEdit",

		//region Methods: Public

		/**
		 * @inheritdoc Terrasoft.component#init
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"previewReady"
			);
		}

		//endregion

	});

	return Terrasoft.PreviewableGridLayouEdit;

});


