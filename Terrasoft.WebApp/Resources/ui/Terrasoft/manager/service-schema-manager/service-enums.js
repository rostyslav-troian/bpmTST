
Ext.ns("Terrasoft.services.enums");

/**
 * ServiceContentType
 * @type {{JSON: number, XML: number}}
 */
Terrasoft.services.enums.ServiceContentType = {
	UNDEFINED: 0,
	JSON: 1,
	XML: 2
};

/**
 * HttpMethodType
 * @type {{GET: number, POST: number, PUT: number, PATCH: number, DELETE: number}}
 */
Terrasoft.services.enums.HttpMethodType = {
	UNDEFINED: 0,
	GET: 1,
	POST: 2,
	PUT: 3,
	PATCH: 4,
	DELETE: 5
};

/**
 * ServiceParameterSource
 * @type {{CONST: number, SYS_SETTING: number}}
 */
Terrasoft.services.enums.ServiceParameterValueSource = {
	UNDEFINED: 0,
	CONST: 1,
	SYS_SETTING: 2
};

/**
 * ServiceParameterType
 * @type {{BODY: number, URL_SEGMENT: number, QUERY_STRING: number, HTTP_HEADER: number, COOKIE: number}}
 */
Terrasoft.services.enums.ServiceParameterType = {
	UNDEFINED: 0,
	BODY: 1,
	URL_SEGMENT: 2,
	QUERY_STRING: 3,
	HTTP_HEADER: 4,
	COOKIE: 5
};

/**
 * ParameterSource
 * @type {{CONST: number, SYS_SETTING: number}}
 */
Terrasoft.services.enums.ServiceType = {
	UNDEFINED: 0,
	REST: 1,
	SOAP: 2
};

/**
 * Service data value type names.
 * @type {Enum}
 */
Terrasoft.services.enums.DataValueTypeName = {
	Text: "Text",
	Integer: "Integer",
	Float: "Float",
	Boolean: "Boolean",
	DateTime: "DateTime",
	Guid: "Guid",
	Date: "Date",
	Time: "Time",
	Object: "Object"
};

/**
 * Service authentification type.
 * @type {Enum}
 */
Terrasoft.services.enums.AuthType = {
	None: 0,
	Basic: 1,
	Digest: 2,
	OAuth20: 3
};
/**
 * OAuth20 Credentials location enum.
 * @type {Enum}
 */
Terrasoft.services.enums.CredentialsLocation = {
	REQUEST_BODY: 1,
	BASIC_HEADER: 2,
	QUERY_STRING: 3
};
