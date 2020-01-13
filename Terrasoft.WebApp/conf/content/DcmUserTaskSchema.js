Terrasoft.configuration.Structures["DcmUserTaskSchema"] = {innerHierarchyStack: ["DcmUserTaskSchema"]};
define("DcmUserTaskSchema", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	/**
	 * @class Terrasoft.manager.DcmUserTaskSchema
	 */
	Ext.define("Terrasoft.manager.DcmUserTaskSchema", {

		extend: "Terrasoft.UserTaskSchema",

		alternateClassName: "Terrasoft.DcmUserTaskSchema",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.manager.UserTaskSchema#editPageSchemaUIdPropertyName.
		 * @overridden
		 */
		editPageSchemaUIdPropertyName: "dcmParametersEditPageSchemaV2UId"

		//endregion

	});

	return Terrasoft.DcmUserTaskSchema;

});



