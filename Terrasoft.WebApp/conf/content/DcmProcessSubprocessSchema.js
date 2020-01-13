Terrasoft.configuration.Structures["DcmProcessSubprocessSchema"] = {innerHierarchyStack: ["DcmProcessSubprocessSchema"]};
define("DcmProcessSubprocessSchema", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.manager.DcmProcessSubprocessSchema
	 */
	Ext.define("Terrasoft.manager.DcmProcessSubprocessSchema", {
		extend: "Terrasoft.ProcessSubprocessSchema",
		alternateClassName: "Terrasoft.DcmProcessSubprocessSchema",

		/**
		 * @inheritdoc Terrasoft.manager.ProcessSubprocessSchema#editPageSchemaName
		 * @overridden
		 */
		editPageSchemaName: "DcmSubProcessPropertiesPage",

		/**
		 * Dcm small image name.
		 * @protected
		 * @type {String}
		 */
		dcmSmallImageName: "dcm_subprocess_small.svg"

	});
	return Terrasoft.manager.DcmProcessSubprocessSchema;
});


