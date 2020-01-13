Terrasoft.configuration.Structures["DcmElementSchemaManager"] = {innerHierarchyStack: ["DcmElementSchemaManager"]};
define("DcmElementSchemaManager", ["ext-base", "terrasoft", "DcmUserTaskSchemaManager",
	"DcmSchemaElement", "DcmProcessSubprocessSchema"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.manager.DcmElementSchemaManager
	 * DCM flow element schema manager.
	 */
	Ext.define("Terrasoft.manager.DcmElementSchemaManager", {

		extend: "Terrasoft.BaseProcessFlowElementSchemaManager",

		alternateClassName: "Terrasoft.DcmElementSchemaManager",

		singleton: true,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
		 * @overridden
		 */
		managerName: "DcmElementSchemaManager",

		/**
		 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#userTaskSchemaManagerName
		 * @overridden
		 */
		userTaskSchemaManagerName: "DcmUserTaskSchemaManager",

		/**
		 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#notImplementedElementsFeatureCode
		 * @overridden
		 */
		notImplementedElementsFeatureCode: "DcmNotImplementedElements",

		/**
		 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#notImplementedElementNames
		 * @protected
		 * @overridden
		 */
		notImplementedElementNames: [],

		/**
		 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#coreElementClassNames
		 * @protected
		 * @overridden
		 */
		coreElementClassNames: [
			{
				itemType: "Terrasoft.DcmProcessSubprocessSchema",
				initialConfig: {
					isValid: false
				}
			}
		]

	});
	return Terrasoft.DcmElementSchemaManager;
});


