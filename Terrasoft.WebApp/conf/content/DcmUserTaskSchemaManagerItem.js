Terrasoft.configuration.Structures["DcmUserTaskSchemaManagerItem"] = {innerHierarchyStack: ["DcmUserTaskSchemaManagerItem"]};
define("DcmUserTaskSchemaManagerItem", ["ext-base", "terrasoft", "DcmProcessUserTaskSchema"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.manager.DcmUserTaskSchemaManagerItem
	 * Class for the dcm schema user task manager item.
	 */
	Ext.define("Terrasoft.manager.DcmUserTaskSchemaManagerItem", {

		extend: "Terrasoft.ProcessUserTaskSchemaManagerItem",

		alternateClassName: "Terrasoft.DcmUserTaskSchemaManagerItem",

		/**
		 * @inheritdoc Terrasoft.ProcessUserTaskSchemaManagerItem#instanceClassName.
		 * @overridden
		 */
		instanceClassName: "Terrasoft.DcmProcessUserTaskSchema"

	});

	return Terrasoft.DcmUserTaskSchemaManagerItem;

});


