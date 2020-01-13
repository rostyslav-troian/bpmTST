Terrasoft.configuration.Structures["MobilePortalMessagePublisherPage"] = {innerHierarchyStack: ["MobilePortalMessagePublisherPage"]};
Terrasoft.PageCache.addItem("PortalMessagePublisherPage", {
	controllerName: "Terrasoft.configuration.controller.PortalMessagePublisherPage",
	pageSchemaName: "PortalMessagePublisherPage",
	viewXClass: "Terrasoft.configuration.view.PortalMessagePublisherPage"
});

/**
 * @class Terrasoft.configuration.view.PortalMessagePublisherPage
 */
Ext.define("Terrasoft.configuration.view.PortalMessagePublisherPage", {
	extend: "Terrasoft.view.BasePage",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "PortalMessagePublisherPage",

		/**
		 * @inheritdoc
		 */
		scrollable: "vertical",

		/**
		 * @inheritdoc
		 */
		navigationPanel: {
			backButton: true
		},

		/**
		 * @cfg {Object} messageComponent Publication button.
		 */
		messageComponent: {
			xtype: "tstextarea",
			cls: "cf-portal-message",
			minRows: 5
		},

		/**
		 * @cfg {Object} publishButton Publication button.
		 */
		publishButton: {
			xtype: "button",
			cls: "cf-portal-message-publish-button"
		}

	},

	/**
	 * @cfg-applier
	 * @protected
	 * @virtual
	 */
	applyMessageComponent: function(config) {
		config.placeHolder = config.label = Terrasoft.LS["PortalMessagePublisherPage.MessagePlaceHolder"];
		return Ext.factory(config);
	},

	/**
	 * @cfg-updater
	 * @protected
	 * @virtual
	 */
	updateMessageComponent: function(component) {
		this.add(component);
	},

	/**
	 * @cfg-applier
	 * @protected
	 * @virtual
	 */
	applyPublishButton: function(config) {
		config.text = Terrasoft.LS["PortalMessagePublisherPage.PublishButton.Text"];
		var navigationPanel = this.getNavigationPanel();
		return navigationPanel.addButton(config);
	}

});

/**
 * @class Terrasoft.configuration.controller.PortalMessagePublisherPage
 */
Ext.define("Terrasoft.configuration.controller.PortalMessagePublisherPage", {
	extend: "Terrasoft.controller.BasePage",

	config: {

		/**
		 * @inheritdoc
		 */
		refs: {
			view: "#PortalMessagePublisherPage"
		}

	},

	/**
	 * @private
	 */
	record: null,

	/**
	 * @private
	 */
	entitySchemaUId: null,

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function(view) {
		this.callParent(arguments);
		this.initializeNavigationTitle();
		var publishButton = view.getPublishButton();
		publishButton.on("tap", this.onPublishButtonTap, this);
		var messageComponent = view.getMessageComponent();
		messageComponent.on("painted", this.onMessageComponentPainted, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getTitle: function() {
		return Terrasoft.LS["PortalMessagePublisherPage.Title"];
	},

	/**
	 * Called when publication button has been tapped.
	 * @param {Ext.Button} button Instance of component.
	 * @inheritdoc
	 * @protected
	 * @virtual
	 */
	onPublishButtonTap: function(button) {
		Terrasoft.Mask.show();
		button.setDisabled(true);
		this.publish(function() {
			Terrasoft.Mask.hide();
			button.setDisabled(false);
			Terrasoft.Router.back();
		}, function(exception) {
			Terrasoft.Mask.hide();
			button.setDisabled(false);
			exception = Ext.create("Terrasoft.Exception", {
				message: Terrasoft.LS["PortalMessagePublisherPage.PublicationError"],
				innerException: exception
			});
			Terrasoft.MessageBox.showException(exception);
		});
	},

	/**
	 * Called when message component has been painted.
	 * @inheritdoc
	 * @protected
	 * @virtual
	 */
	onMessageComponentPainted: function() {
		var view = this.getView();
		var messageComponent = view.getMessageComponent();
		messageComponent.focus();
	},

	/**
	 * Publishes message.
	 * @protected
	 * @param {Function} success Callback function.
	 * @param {Function} failure Callback function.
	 */
	publish: function(success, failure) {
		var data = this.getPublishData();
		Terrasoft.ServiceHelper.issueRequest({
			serviceName: "MessagePublisherService",
			methodName: this.getServiceMethodName(),
			data: {
				className: "Terrasoft.Configuration.PortalMessagePublisher",
				fieldsData: data
			},
			success: function(response) {
				if (response.PublishMessageResult.success === true) {
					Ext.callback(success, this);
				} else {
					var exception = Ext.create("Terrasoft.Exception", {
						message: Ext.JSON.encode(response.PublishMessageResult.errorInfo)
					});
					Ext.callback(failure, this, [exception]);
				}
			},
			failure: failure,
			scope: this
		});
	},

	/**
	 * Returns data for request to service.
	 * @return {Object} Data for request to service.
	 */
	getPublishData: function() {
		var view = this.getView();
		var messageComponent = view.getMessageComponent();
		return [
			{Key: "EntitySchemaUId", Value: this.entitySchemaUId},
			{Key: "EntityId", Value: this.record.getId()},
			{Key: "Id", Value: Terrasoft.util.genGuid()},
			{Key: "Message", Value: messageComponent.getValue()}
		];
	},

	/**
	 * Returns method of service.
	 * @return {String} Method name.
	 */
	getServiceMethodName: function() {
		return Terrasoft.Features.getIsEnabled("HandleMessagePublishingExceptions")
			? "PublishMessage" : "Publish";
	},

	/**
	 * @inheritdoc
	 */
	pageLoadComplete: function() {
		this.callParent(arguments);
		var pageHistoryItem = this.getPageHistoryItem();
		var config = pageHistoryItem.getRawConfig();
		this.record = config.record;
		this.entitySchemaUId = config.entitySchemaUId;
	}

});


