Terrasoft.configuration.Structures["ServiceEnums"] = {innerHierarchyStack: ["ServiceEnums"]};
define("ServiceEnums", ["ServiceEnumsResources"], function(resources) {

	/**
	 * ServiceParameterType
	 * @type {{BODY: number, URL_SEGMENT: number, QUERY_STRING: number, HTTP_HEADER: number, COOKIE: number}}
	 */
	Terrasoft.services.enums.ServiceParameterTypeCaption = {};
	Terrasoft.services.enums.ServiceParameterTypeCaption[Terrasoft.services.enums.ServiceParameterType.BODY] =
		resources.localizableStrings.ParameterTypeBodyText;
	Terrasoft.services.enums.ServiceParameterTypeCaption[Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT] =
		resources.localizableStrings.ParameterTypeUrlSegmentText;
	Terrasoft.services.enums.ServiceParameterTypeCaption[Terrasoft.services.enums.ServiceParameterType.QUERY_STRING] =
		resources.localizableStrings.ParameterTypeQueryStringText;
	Terrasoft.services.enums.ServiceParameterTypeCaption[Terrasoft.services.enums.ServiceParameterType.HTTP_HEADER] =
		resources.localizableStrings.ParameterTypeHttpHeaderStringText;
	Terrasoft.services.enums.ServiceParameterTypeCaption[Terrasoft.services.enums.ServiceParameterType.COOKIE] =
		resources.localizableStrings.ParameterTypeCookieStringText;

	/**
	 * Service data value type captions.
	 * @type {Enum}
	 */
	Terrasoft.services.enums.DataValueTypeCaption = {
		Text: resources.localizableStrings.DataValueTypeNameText,
		Integer: resources.localizableStrings.DataValueTypeNameInteger,
		Float: resources.localizableStrings.DataValueTypeNameFloat,
		Boolean: resources.localizableStrings.DataValueTypeNameBoolean,
		DateTime: resources.localizableStrings.DataValueTypeNameDateTime,
		Guid: resources.localizableStrings.DataValueTypeNameGuid,
		Date: resources.localizableStrings.DataValueTypeNameDate,
		Time: resources.localizableStrings.DataValueTypeNameTime,
		Object: resources.localizableStrings.DataValueTypeNameObject
	};

	/**
	 * Authorization type captions.
	 * @type {Enum}
	 */
	Terrasoft.services.enums.AuthTypeCaption = {};
	Terrasoft.services.enums.AuthTypeCaption[Terrasoft.services.enums.AuthType.None] =
		resources.localizableStrings.AuthTypeNameNone;
	Terrasoft.services.enums.AuthTypeCaption[Terrasoft.services.enums.AuthType.Basic] =
		resources.localizableStrings.AuthTypeNameBasic;
	Terrasoft.services.enums.AuthTypeCaption[Terrasoft.services.enums.AuthType.Digest] =
		resources.localizableStrings.AuthTypeNameDigest;
	Terrasoft.services.enums.AuthTypeCaption[Terrasoft.services.enums.AuthType.OAuth20] =
		resources.localizableStrings.AuthTypeNameOauth20;

	/**
	 * OAuth20 Credentials location captions.
	 * @type {Enum}
	 */
	const serviceEnums = Terrasoft.services.enums;
	serviceEnums.CredentialsLocationCaption = {};
	serviceEnums.CredentialsLocationCaption[Terrasoft.services.enums
			.CredentialsLocation.BASIC_HEADER] =
		resources.localizableStrings.OAuth20CredentialsLocationBasicHeader;
	serviceEnums.CredentialsLocationCaption[Terrasoft.services.enums
			.CredentialsLocation.REQUEST_BODY] =
		resources.localizableStrings.OAuth20CredentialsLocationMessageBody;
	serviceEnums.CredentialsLocationCaption[Terrasoft.services.enums
			.CredentialsLocation.QUERY_STRING] =
		resources.localizableStrings.OAuth20CredentialsLocationQueryString;
});


