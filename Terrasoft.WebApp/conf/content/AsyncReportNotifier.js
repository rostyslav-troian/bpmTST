Terrasoft.configuration.Structures["AsyncReportNotifier"] = {innerHierarchyStack: ["AsyncReportNotifier"]};
define("AsyncReportNotifier", ["PrintReportUtilitiesResources", "DesktopPopupNotification", 
	"MaskHelper", "ReportStorage"],
		function(resources, DesktopPopupNotification) {

	Ext.define("Terrasoft.AsyncReportNotifier", {
		extend: "Terrasoft.BaseModule",
		Ext: null,
		sandbox: null,
		Terrasoft: null,
		
		//region Methods: Private
		
		/**
		 * @private
		 */
		_showErrorNotification: function(msgBody) {
			const popupConfig = DesktopPopupNotification.createConfig();
			const body = Ext.String.format(resources.localizableStrings.AsynGenerationErrorPopupBodyTpl,
					msgBody.reportName);
			DesktopPopupNotification.show(Ext.apply(popupConfig, {
				title: resources.localizableStrings.AsynGenerationPopupTitle,
				body: body,
				icon: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.AsynGenerationPopupIcon)
			}));
		},
		
		//endregion
		
		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseModule#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onNotifyMessageReceived, this);
		},
		
		/**
		 * @inheritdoc Terrasoft.BaseModule#onDestroy
		 * @override
		 */
		onDestroy: function() {
			Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.onNotifyMessageReceived, this);
			this.callParent(arguments);
		},

		/**
		 * Handles the message of generate report process finish.
		 * @param {Terrasoft.ServerChannel} channel Channel messaging server.
		 * @param {Object} message Channel message.
		 */
		onNotifyMessageReceived: function(channel, message) {
			if (message.Header && message.Header.Sender === "AsyncReportNotifier") {
				const msgBody = message.Body || {};
				clearTimeout(Terrasoft.ReportStorage.getReportTimeoutId(msgBody.taskId));
				Terrasoft.MaskHelper.hideBodyMask();
				if (!document.hasFocus()) {
					this.error("Could not download report in unfocussed browser tab.");
					return;
				}
				if (!msgBody.success) {
					this._showErrorNotification(msgBody);
					return;
				}
				const href = Ext.String.format("../rest/{0}/{1}/{2}",
						msgBody.serviceName,
						msgBody.methodName,
						msgBody.taskId);
				Terrasoft.download(href, msgBody.reportName);
			}
		}

		//endregion

	});

	return Terrasoft.AsyncReportNotifier;
});


