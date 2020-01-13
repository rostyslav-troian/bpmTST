Terrasoft.configuration.Structures["DcmProcessUserTaskSchema"] = {innerHierarchyStack: ["DcmProcessUserTaskSchema"]};
define("DcmProcessUserTaskSchema", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	/**
	 * @class Terrasoft.manager.DcmProcessUserTaskSchema
	 */
	Ext.define("Terrasoft.manager.DcmProcessUserTaskSchema", {

		extend: "Terrasoft.ProcessUserTaskSchema",

		alternateClassName: "Terrasoft.DcmProcessUserTaskSchema",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.manager.ProcessUserTaskSchema#taskSchemaManagerName
		 * @overridden
		 */
		taskSchemaManagerName: "DcmUserTaskSchemaManager",

		/**
		 * @inheritdoc Terrasoft.manager.ProcessUserTaskSchema#taskSchemaManagerName
		 * @overridden
		 */
		elementManagerName: "DcmElementSchemaManager",

		/**
		 * Dcm small image name.
		 * @protected
		 * @type {String}
		 */
		dcmSmallImageName: "DcmSmallSvgImage.svg"

		//endregion

	});

	return Terrasoft.DcmProcessUserTaskSchema;

});


