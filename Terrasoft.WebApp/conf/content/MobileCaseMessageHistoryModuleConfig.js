Terrasoft.configuration.Structures["MobileCaseMessageHistoryModuleConfig"] = {innerHierarchyStack: ["MobileCaseMessageHistoryModuleConfig"]};
Terrasoft.configuration.MessageNotifierId = Terrasoft.configuration.MessageNotifierId || {};
Terrasoft.configuration.MessageNotifierId.Local = "ed501edb-8ebf-4c76-a35d-6f23be243043";

Terrasoft.sdk.Module.setChangeModes("VwMobileCaseMessageHistory", [Terrasoft.ChangeModes.Read]);

Terrasoft.sdk.GridPage.setImageColumn("VwMobileCaseMessageHistory", "OwnerPhoto.PreviewData",
	"MobileImageListDefaultContactPhoto");

Terrasoft.sdk.GridPage.addColumns("VwMobileCaseMessageHistory", ["MessageNotifier.Id", "MessageNotifier.Description"]);

Terrasoft.sdk.GridPage.setSubtitleColumns("VwMobileCaseMessageHistory", ["CreatedOn", {
		name: "MessageNotifier.Description",
		convertFunction: function(values) {
			var notifierId = values["MessageNotifier.Id"];
			return (notifierId === Terrasoft.configuration.MessageNotifierId.Local) ?
				Terrasoft.LS.SystemInfoNotifierDescriptiion: values["MessageNotifier.Description"];
		}
	},
	{
		name: "Recepient",
		convertFunction: function(values) {
			var recepient = values.Recepient;
			return (!Ext.isEmpty(recepient)) ? Ext.String.format("{0}: {1}", Terrasoft.LS.RecepientPrefix, recepient) : "";
		}
	}
]);

Terrasoft.sdk.GridPage.setGroupColumns("VwMobileCaseMessageHistory", [
	{
		name: "Message",
		isMultiline: true,
		convertFunction: function(values) {
			var message = Ext.htmlDecode(values.Message);
			var text = Terrasoft.String.getTextFromHtml(message);
			return text.replace(/\n/g, "<br>");
		}
	}
]);

Terrasoft.sdk.GridPage.setOrderByColumns("VwMobileCaseMessageHistory", {
	column: "CreatedOn",
	orderType: Terrasoft.OrderTypes.DESC
});

Terrasoft.sdk.GridPage.setSearchColumns("VwMobileCaseMessageHistory", []);

Terrasoft.sdk.RecordPage.configureColumn("VwMobileCaseMessageHistory", "primaryColumnSet", "Message", {
	isMultiline: true,
	customPreviewConfig: {
		htmlEncode: false
	}
});


