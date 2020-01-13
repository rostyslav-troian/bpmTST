Ext.ns("Terrasoft.core");

/** @enum Terrasoft.core.enums.SysValue
 *  Current user environment variables which initialized in ViewModule.aspx.
 */
if (!Terrasoft.core.enums.SysValue) {
	Terrasoft.core.enums.SysValue = {
		/**
		 * Current user.
		 */
		CURRENT_USER: {
			value: "1B4B9325-66CC-DF11-9B2A-001D60E938C6",
			displayValue: "Demo_ru"
		},

		/**
		 * Contact of curent user.
		 */
		CURRENT_USER_CONTACT: {
			value: "DAD159F3-6C2D-446A-98D2-0F4D26662BBE",
			displayValue: "Мирный Евгений"
		},

		/**
		 * Current user timezone offset in minutes
		 */
		CURRENT_USER_TIMEZONE_OFFSET: 0,

		/**
		 * Current user timezone code
		 */
		CURRENT_USER_TIMEZONE_CODE: "UTC",

		/**
		 * Account of current user.
		 */
		CURRENT_USER_ACCOUNT: {
			value: "E308B781-3C5B-4ECB-89EF-5C1ED4DA488E",
			displayValue: "Ваша компания"
		},

		/**
		 * Current workspace.
		 */
		CURRENT_WORKSPACE: {
			value: "0C039963-C53D-E111-851E-00155D04C01D",
			displayValue: "TSBpm"
		},

		/**
		 * Current maintainer.
		 */
		CURRENT_MAINTAINER: {
			value: "Terrasoft",
			displayValue: "Terrasoft"
		},

		/**
		 * Current display precision for money data value type.
		 */
		CURRENT_MONEY_DISPLAY_PRECISION: 2,

		/**
		 * Current user culture.
		 */
		CURRENT_USER_CULTURE: {
			displayValue: "ru-RU"
		},

		/**
		 * Primary culture.
		 */
		PRIMARY_CULTURE: {
			displayValue: "ru-RU"
		},

		/**
		 * Maximum entity schema name and column name length.
		 */
		MAX_ENTITY_SCHEMA_NAME_LENGTH: 30
	};
}

/**
 * Alias for {@link Terrasoft.core.enums.SysValue}
 * @member Terrasoft
 * @inheritdoc Terrasoft.core.enums.SysValue
 */
Terrasoft.SysValue = Terrasoft.core.enums.SysValue;
