Terrasoft.configuration.Structures["BpmonlineCloudIntegrationEnums"] = {innerHierarchyStack: ["BpmonlineCloudIntegrationEnums"]};
define("BpmonlineCloudIntegrationEnums", function() {
	Ext.ns("Terrasoft.BpmonlineCloudIntegration.enums");

	Terrasoft.BpmonlineCloudIntegration.enums.ResponseCode = {
		SERVICE_UNAVAILABLE: -1,
		SUCCESS: 0,
		INVALID_API_KEY: 101,
		UNREACHABLE_RESOURCE: 105,
		INVALID_AUTH_KEY: 110,
		GETTING_DOMAINS_ERROR: 111,
		ADDING_DOMAIN_ERROR: 112
	};

	Terrasoft.BpmonlineCloudIntegration.enums.SenderDomainStatus = {
		ACTIVE: "active"
	};

	Terrasoft.BpmonlineCloudIntegration.enums.Service = {
		CloudEmailService: "CloudEmailService"
	};
});


