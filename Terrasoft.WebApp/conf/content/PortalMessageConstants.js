Terrasoft.configuration.Structures["PortalMessageConstants"] = {innerHierarchyStack: ["PortalMessageConstants"]};
define("PortalMessageConstants", [], function() {
    var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
    var messageNotifier = {
        Portal: "0c61da8a-7a29-42c0-9877-08d5fef15f28"
    };

    var sysSchemaUId = {
        PortalMessageFile: "55C1FE71-17A1-4BD2-A4B2-7799CCAAC996"
    };

    var portalMessageType = {
        Complain: "553c9baf-b24c-4c07-b385-a4f4a86fcf42",
        Comment: "d00c02b1-f740-409d-9f04-d921f2aaae3e"
    };

    var caseSchemaUId = "117d32f9-8275-4534-8411-1c66115ce9cd";
    
	var urlPortalTemplate = {
		FileUrlTemplate:  "<a href='" + workspaceBaseUrl + "/rest/PortalFileService/GetActivityFile/{0}/{1}'>{2}</a>"
	};

	var portalServicePath = {
		portalServicePath: "../rest/PortalFileService/GetActivityFile/{0}"
	};

	var systemServicePath = {
		systemServicePath: "../rest/FileService/GetFile/{0}"
	};

	var activityFileSchemaUid = {
		activityFileSchemaUid: "080c9917-7ec9-42e5-86ff-75a683d4f124"
	};

    return {
        MessageNotifier: messageNotifier,
        SysSchemaUId: sysSchemaUId,
        PortalMessageType: portalMessageType,
        CaseSchemaUId: caseSchemaUId,
		UrlPortalTemplate: urlPortalTemplate,
		PortalServicePath: portalServicePath,
		SystemServicePath: systemServicePath,
		ActivityFileSchemaUid: activityFileSchemaUid
    };
});


