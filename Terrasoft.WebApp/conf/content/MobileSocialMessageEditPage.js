Terrasoft.configuration.Structures["MobileSocialMessageEditPage"] = {innerHierarchyStack: ["MobileSocialMessageEditPage"]};
/* globals SocialMessage: false */
/* globals SocialMessageEditPage: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "SocialMessageEditPage.Controller",
	viewXType: "socialmessageeditpageview"
};

Ext.define("Terrasoft.configuration.view.SocialMessageEditPage", {
	alternateClassName: "SocialMessageEditPage.View",
	extend: "Terrasoft.view.BaseEditPage",

	xtype: "socialmessageeditpageview",
	config: {
		id: "SocialMessageEditPage",

		channelCombobox: {
			xtype: "tscombobox",
			id: "SocialMessageEditPageChannel",
			cls: "cf-social-channel-combobox",
			placeHolder: Terrasoft.LocalizableStrings.SocialMessageEditPageSocialChannelPlaceHolder,
			modelName: "SocialChannel",
			markerValue: "SocialChannel",
			columnsConfig: ["Id", "Name"],
			pickerTitle: Terrasoft.LocalizableStrings.SocialMessageEditPageSocialChannelPickerTitle,
			defaultPickerConfig: {
				popup: true,
				toolbar: {
					clearButton: false
				}
			},
			docked: "top",
			hidden: true
		},

		ownerImage: false

	},

	/**
	 * @private
	 */
	addOwnerImage: function() {
		var ownerImage = this.getOwnerImage();
		this.add(ownerImage);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 * @overridden
	 */
	applySaveButton: function(config) {
		config.text = Terrasoft.LocalizableStrings.SocialMessageEditPageSaveButtonCaption;
		var navigationPanel = this.getNavigationPanel();
		return navigationPanel.addButton(config);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyChannelCombobox: function(config) {
		return this.add(config);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyOwnerImage: function(newImage) {
		if (!newImage) {
			return false;
		}
		var config = {
			cls: "cf-social-message-edit-owner-image",
			iconCls: "",
			markerValue: "social-message-owner-image",
			docked: "left"
		};
		return Ext.factory(config, "Ext.Button", this.getOwnerImage());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateOwnerImage: function(newImage, oldImage) {
		if (newImage) {
			this.setUserImage(null);
			this.addOwnerImage();
		}
		if (oldImage) {
			Ext.destroy(oldImage);
		}
	},

	setUserImage: function(image) {
		var userImage = this.getOwnerImage();
		var defaultImageCls = "cf-social-message-owner-default-image";
		if (image) {
			userImage.removeCls(defaultImageCls);
		} else {
			userImage.addCls(defaultImageCls);
			image = Terrasoft.Configuration.getDefaultOwnerImage();
		}
		userImage.setIcon(image);
	}

});

Ext.define("Terrasoft.configuration.controller.SocialMessageEditPage", {
	alternateClassName: "SocialMessageEditPage.Controller",
	extend: "Terrasoft.controller.BaseEditPage",

	statics: {
		Model: SocialMessage
	},
	config: {
		refs: {
			view: "#SocialMessageEditPage",
			socialMessageChannel: "#SocialMessageEditPageChannel"
		}
	},

	/**
	 * @private
	 */
	initSocialMessageChannel: function() {
		var socialMessageChannel = this.getSocialMessageChannel();
		var socialMessageChannelPicker = socialMessageChannel.getPicker();
		socialMessageChannelPicker.on("itemtap", this.onSocialChannelPickerItemTap, this);
	},

	/**
	 * @private
	 */
	initializeOwnerImage: function() {
		var view = this.getView();
		view.setOwnerImage(true);
		this.setViewOwnerImage();
	},

	/**
	 * @private
	 */
	getMessageField: function() {
		return this.getFieldByColumnName("Message", this.record);
	},

	/**
	 * Sets current user image on page.
	 * @private
	 */
	setViewOwnerImage: function() {
		Terrasoft.Configuration.getCurrentUserImage({
			cancellationId: this.getCancellationId("setViewOwnerImage"),
			callback: function(image) {
				var view = this.getView();
				var imageUrl = Terrasoft.util.formatUrlForBackgroundImage(image);
				view.setUserImage(imageUrl);
			},
			scope: this
		});
	},

	/**
	 * @private
	 */
	isEntitySet: function() {
		var entityId = this.record.get("EntityId");
		return entityId && !Terrasoft.util.isEmptyGuid(entityId);
	},

	/**
	 * @private
	 */
	checkRequiredFields: function() {
		var socialMessageChannel = this.getSocialMessageChannel();
		socialMessageChannel.setIsValid(this.isEntitySet(),
			Terrasoft.LocalizableStrings["Sys.RequirementRule.message"]);
	},

	/**
	 * Adds new contact's mentions to SocialMention store.
	 * @private
	 */
	addMentionsToStore: function() {
		var messageField = this.getMessageField();
		var mentions = messageField.getMentions();
		var socialMentionStore = this.record.SocialMentionAssocStore;
		for (var i = 0, ln = mentions.length; i < ln; i++) {
			var mention = mentions[i];
			if (mention.modelName === "Contact") {
				socialMentionStore.add({Contact: mention.recordId});
			}
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function() {
		this.callParent(arguments);
		this.initSocialMessageChannel();
		this.initializeOwnerImage();
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeQueryConfig: function() {
		this.callParent(arguments);
		var queryConfig = this.getQueryConfig();
		var associationsConfig = queryConfig.getAssociationsConfig();
		var assocQueryConfig = Ext.create("Terrasoft.QueryConfig");
		assocQueryConfig.setModelName("SocialMention");
		assocQueryConfig.addColumn("SocialMessage");
		assocQueryConfig.addColumn("Contact");
		associationsConfig.add("SocialMentionAssociation", assocQueryConfig);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onSaveButtonTap: function() {
		var messageField = this.getMessageField();
		this.record.set("Message", messageField.getValue());
		this.checkRequiredFields();
		this.addMentionsToStore();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onBeforeDataSave: function() {
		var detailConfig = this.getDetailConfig();
		var isDetail = Boolean(detailConfig);
		if (isDetail) {
			var parentRecord = detailConfig.parentRecord;
			this.record.set("EntityId", parentRecord.getId());
			this.record.set("EntitySchemaUId", Terrasoft.Configuration.getSysSchemaUIdByName(parentRecord.modelName));
		}
		if (this.record.phantom && !this.isEntitySet()) {
			Terrasoft.Mask.hide();
			var view = this.getView();
			var saveButton = view.getSaveButton();
			saveButton.setDisabled(false);
			return;
		}
		this.callParent(arguments);
	},

	/**
	 * @protected
	 * @virtual
	 */
	onSocialChannelPickerItemTap: function(listComponent, index, target, pickerRecord) {
		this.record.set("EntityId", pickerRecord.getId());
		this.record.set("EntitySchemaUId", Terrasoft.Configuration.SysSchemasUIds.SocialChannel);
		this.checkRequiredFields();
	},

	/**
	 * @protected
	 * @overridden
	 */
	changeListenersOnRecordEvents: function(record, unsubscribe) {
		if (!unsubscribe) {
			record.on("columnpropertychanged", this.recordColumnPropertyChange, this);
		}
	},

	/**
	 * @protected
	 * @overridden
	 */
	loadRecord: function() {
		this.callParent(arguments);
		var recordId = this.recordId;
		var isInsertOperation = !recordId || Terrasoft.util.isEmptyGuid(recordId);
		var isDetail = Boolean(this.getDetailConfig());
		var socialMessageChannel = this.getSocialMessageChannel();
		socialMessageChannel.setHidden(!isInsertOperation || isDetail);
		if (isInsertOperation) {
			socialMessageChannel.setIsValid(false, Terrasoft.LocalizableStrings["Sys.RequirementRule.message"]);
		}
		var messageField = this.getMessageField();
		if (messageField && isInsertOperation && !Terrasoft.util.isWindowsPlatform()) {
			setTimeout(function() {
				messageField.focus(true);
			}, 500);
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onLoadRecord: function(loadedRecord) {
		this.callParent([loadedRecord, function() {
			var socialMessageChannel = this.getSocialMessageChannel();
			socialMessageChannel.setValue(loadedRecord.get("EntityId"));
			var messageField = this.getMessageField();
			messageField.setValue(loadedRecord.get("Message"));
		}]);
	},

	/**
	 * Handles successfull saving data in hybrid mode.
	 * @protected
	 * @virtual
	 */
	onDataSavedSuccessfullyInHybridMode: function() {
		var useOptimisticEditing = this.useOptimisticEditing();
		var isCancelable = !useOptimisticEditing;
		var queryConfigForSave = this.getQueryConfigForSave();
		queryConfigForSave.setAutoSetProxy(false);
		queryConfigForSave.setIsLogged(false);
		this.record.setProxy("tssql");
		this.record.save({
			isCancelable: isCancelable,
			queryConfig: queryConfigForSave,
			success: this.onDataSavedSuccessfully,
			afterRequest: this.onDataSavingRequestSend,
			failure: this.onDataSavingFailed
		}, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	createPageOperationConfig: function() {
		var operationConfig = this.callParent(arguments);
		if (operationConfig && Terrasoft.Features.getIsEnabled("UseHybridModeInMobileFeed") &&
				!Terrasoft.Configuration.isFeedInHybridMode()) {
			operationConfig.isModified = true;
		}
		return operationConfig;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	doSaveData: function() {
		if (!Terrasoft.Configuration.isFeedInHybridMode()) {
			this.callParent(arguments);
			return;
		}
		var useOptimisticEditing = this.useOptimisticEditing();
		var isCancelable = !useOptimisticEditing;
		var queryConfigForSave = this.getQueryConfigForSave();
		queryConfigForSave.setAutoSetProxy(false);
		var config = {
			isCancelable: isCancelable,
			queryConfig: queryConfigForSave,
			success: this.onDataSavedSuccessfullyInHybridMode,
			failure: this.onDataSavingFailed
		};
		this.record.setProxy("odata");
		this.record.save(config, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	completeDataSaving: function(operation) {
		var args = arguments;
		var callbackFn = function() {
			SocialMessageEditPage.Controller.superclass.completeDataSaving.apply(this, args);
		}.bind(this);
		var socialMessageRecord = null;
		if (operation) {
			var records = operation.getRecords();
			socialMessageRecord = records[0];
		}
		if (!socialMessageRecord) {
			callbackFn();
			return;
		}
		Terrasoft.Configuration.setCreatedByForCurrentUser({
			cancellationId: this.getCancellationId("setCreatedByForCurrentUser"),
			record: socialMessageRecord,
			callback: callbackFn,
			scope: this
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	shouldOpenPreviewPageOnSave: function() {
		return !this.getIsInsertOperation();
	}

});


