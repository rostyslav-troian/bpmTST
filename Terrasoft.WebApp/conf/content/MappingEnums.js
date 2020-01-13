Terrasoft.configuration.Structures["MappingEnums"] = {innerHierarchyStack: ["MappingEnums"]};
define("MappingEnums", [], function() {

	Ext.ns("Terrasoft.MappingEnums");

	/**
	 * Mapping type.
	 * @enum
	 */
	Terrasoft.MappingEnums.MappingType = {
		ALL: 0,
		PROCESS_ELEMENT_PARAMETERS: 1,
		PROCESS_PARAMETERS: 2,
		LOOKUP: 4,
		SYSTEM_SETTINGS: 8,
		SYSTEM_VARIABLES: 16,
		FUNCTIONS: 32,
		DATE_TIME: 64
	};

	/**
	 * Mapping type unions.
	 * @enum
	 */
	Terrasoft.MappingEnums.MappingUnion = {
		PROCESS_AND_ELEMENT_PARAMETERS: Terrasoft.MappingEnums.MappingType.PROCESS_PARAMETERS |
			Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS
	};

	/**
	 * Designer type.
	 * @enum
	 */
	Terrasoft.MappingEnums.DesignerType = {
		PROCESS_DESIGNER: "Process",
		DCM_DESIGNER: "Dcm"
	};

});


