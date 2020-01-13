Terrasoft.configuration.Structures["DesignTimeEnums"] = {innerHierarchyStack: ["DesignTimeEnums"]};
define("DesignTimeEnums", ["ext-base", "terrasoft", "DesignTimeEnumsResources"],
	function() {
		Ext.ns("Terrasoft.DesignTimeEnums");

		/**
		 * @enum {String}
		 * Base schemas unique identifiers.
		 */
		Terrasoft.DesignTimeEnums.BaseSchemaUId = {
			/**
			 * Base object
			 */
			BASE_ENTITY: "1bab9dcf-17d5-49f8-9536-8e0064f1dce0",
			/**
			 * Base folder
			 */
			BASE_FOLDER: "d602bf96-d029-4b07-9755-63c8f5cb5ed5",
			/**
			 * Base file
			 */
			BASE_FILE: "556c5867-60a7-4456-aae1-a57a122bef70",
			/**
			 * File detail
			 */
			FILE_DETAIL: "0c43958a-a409-47bc-a3cb-9bc32451a45a",
			/**
			 * Base lookup
			 */
			BASE_LOOKUP: "11ab4bcb-9b23-4b6d-9c86-520fae925d75",
			/**
			 * Base item in folder
			 */
			BASE_ITEM_IN_FOLDER: "4f63bafb-e9e7-4082-b92e-66b97c14017c",
			/**
			 * Base tag
			 */
			BASE_TAG: "9e3f203c-e905-4de5-9468-335b193f2439",
			/**
			 * Base item in tag
			 */
			BASE_ITEM_IN_TAG: "5894a2b0-51d5-419a-82bb-238674634270",
			/**
			 * Base section schema
			 */
			BASE_SECTION: "7912fb69-4fee-429f-8b23-93943c35d66d",
			/**
			 * Base data view schema
			 */
			BASE_DATA_VIEW: "22e2cf10-98b4-4c3c-bc28-346238e15c21",
			/**
			 * Base module page schema
			 */
			BASE_MODULE_PAGE: "d62293c0-7f14-44b1-b547-735fb40499cd",
			/**
			 * Base section page schema
			 */
			BASE_SECTION_PAGE: "d7862464-6710-4c5c-b896-e8187803dd6e",
			/**
			 * Base page schema
			 */
			BASE_PAGE: "d3cc497c-f286-4f13-99c1-751c468733c0",
			/**
			 * Base mini page schema
			 */
			BASE_MINI_PAGE: "8e06a577-08e4-424e-bd89-798a34e1b928",
			/**
			 * Base grid detail schema
			 */
			BASE_GRID_DETAIL: "01eb38ee-668a-42f0-999d-c2534f979089",
			/**
			 * Section module schema
			 */
			SECTION_MODULE_SCHEMA: "df58589e-26a6-44d1-b8d4-edf1734d02b4",
			/**
			 * Base approval
			 */
			BASE_VISA: "5fa90d0d-64eb-4f52-8d3d-c51fa6443b66",
			/**
			 * Visa detail
			 */
			VISA_DETAIL: "98aea892-0cc5-4484-97a0-23e5927fc70e",
			/**
			 * Base visa page schema.
			 */
			VISA_PAGE: "66e3a5b3-f004-4335-a4e9-5ba255c8a319",
			/**
			 * Grid page
			 */
			BASE_PAGE_SIMPLE_PROCESS_TEMPLATE: "5826ff24-46c6-4169-9223-2aaad9ec2e18",
			/**
			 * Tabbed page with area on top
			 */
			BASE_PAGE_PROCESS_TEMPLATE: "21620f25-166f-42f1-8b4d-224a959040a3",
			/**
			 * Tabbed page with right area
			 */
			BASE_PAGE_RIGHT_CONTAINER_PROCESS_TEMPLATE: "476a99c1-0d73-4443-93ea-a0fcce318bf0",
			/**
			 * Tabbed page with left area
			 */
			BASE_PAGE_LEFT_CONTAINER_PROCESS_TEMPLATE: "0fc280ad-cec2-41a2-94f6-bf153a37291f"
		};

		/**
		 * @enum
		 * SysModuleFolderMode identifiers.
		 */
		Terrasoft.DesignTimeEnums.SysModuleFolderMode = {
			/**
			 * Multi folder entry identifier.
			 */
			MULTI_FOLDER_ENTRY: "b659d704-3955-e011-981f-00155d043204",
			/**
			 * Single folder entry identifier.
			 */
			SINGLE_FOLDER_ENTRY: "c6e5c331-3955-e011-981f-00155d043204",
			/**
			 * None folder entry identifier.
			 */
			NONE: "a24a734d-3955-e011-981f-00155d043204"
		};

		/**
		 * @enum
		 * Wizard URL
		 */
		Terrasoft.DesignTimeEnums.WizardUrl = {
			/**
			 * Detail wizard URL.
			 */
			DETAIL_WIZARD_URL: "/NUI/ViewModule.aspx?vm=DetailWizard#",
			/**
			 * Section wizard URL.
			 */
			SECTION_WIZARD_URL: "/Nui/ViewModule.aspx?vm=SectionWizard#",
			/**
			 * Section page wizard URL.
			 */
			SECTION_PAGE_WIZARD_URL: "/Nui/ViewModule.aspx?vm=SectionPageWizard#",
			/**
			 * Section minipage wizard URL.
			 */
			SECTION_MINIPAGE_WIZARD_URL: "/Nui/ViewModule.aspx?vm=SectionMiniPageWizard#"
		};

		/**
		 * @enum
		 * Default icons id.
		 */
		Terrasoft.DesignTimeEnums.DefaultIcon = {
			/**
			 * Section default icon id.
			 */
			SECTION_DEFAULT_ICON_ID: "026742d9-390c-4778-bc46-9fa85c42677a"
		};

		/**
		 * @enum
		 * SysModule column sizes
		 */
		Terrasoft.DesignTimeEnums.SysModuleColumnSizes = {
			/**
			 * Max entity schema name suffix.
			 */
			MAX_ENTITY_SCHEMA_NAME_SUFFIX: 16,
			/**
			 * Max SysModule caption size.
			 */
			MAX_CAPTION_SIZE: 50
		};

		/**
		 * @enum
		 * Entity schema column sizes
		 */
		Terrasoft.DesignTimeEnums.EntitySchemaColumnSizes = {
			/**
			 * Max Entity schema column caption size.
			 */
			MAX_CAPTION_SIZE: 50,
			/**
			 * Entity schema column id suffix size.
			 */
			ENTITY_SCHEMA_COLUMN_ID_SUFFIX_SIZE: 2
		};
	}
);


