define("ServiceEnumsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DataValueTypeNameText: "Text",
		DataValueTypeNameInteger: "Integer",
		DataValueTypeNameFloat: "Decimal",
		DataValueTypeNameBoolean: "Boolean",
		DataValueTypeNameDateTime: "Date\/Time",
		DataValueTypeNameGuid: "Unique identifier",
		DataValueTypeNameDate: "Date",
		DataValueTypeNameTime: "Time",
		DataValueTypeNameObject: "Object",
		ParameterTypeUndefinedText: "Undefined",
		ParameterTypeBodyText: "Body parameter",
		ParameterTypeUrlSegmentText: "Method address parameter",
		ParameterTypeQueryStringText: "Query parameter",
		ParameterTypeHttpHeaderStringText: "Header parameter",
		ParameterTypeCookieStringText: "Cookies parameter",
		AuthTypeNameNone: "None",
		AuthTypeNameBasic: "Basic",
		AuthTypeNameDigest: "Digest",
		AuthTypeNameOauth20: "OAuth 2.0",
		OAuth20CredentialsLocationBasicHeader: "As Basic auth header",
		OAuth20CredentialsLocationMessageBody: "In request body",
		OAuth20CredentialsLocationQueryString: "In query string as a GET request"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});