Terrasoft.configuration.Structures["MobilePhoneCallLogPage"] = {innerHierarchyStack: ["MobilePhoneCallLogPage"]};
/* globals Contact: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "MobilePhoneCallLogPage.Controller",
	viewXType: "mobilephonecalllogpageview"
};

Ext.define("MobilePhoneCallLogPage.View", {
	extend: "Terrasoft.view.BaseConfigurationPage",
	xtype: "mobilephonecalllogpageview",

	config: {

		id: "MobilePhoneCallLogPage",

		cls: "x-callphonelogpage",

		scrollable: "vertical",

		pageType: Terrasoft.PageTypes.Custom,

		pageId: "MobilePhoneCallLogPage",

		navigationPanel: {
			showMenuOnSwipe: false,
			backButton: false
		},

		items: [
			{
				xtype: "container",
				id: "MobilePhoneCallLogPageForm",
				items: [
					{
						xtype: "container",
						cls: "x-callphonelogpage-info-container",
						items: [
							{
								xtype: "label",
								id: "MobilePhoneCallLogPageUserInfo"
							},
							{
								xtype: "label",
								id: "MobilePhoneCallLogPageCallInfo"
							},
							{
								xtype: "label",
								id: "MobilePhoneCallLogPageReceipientInfo"
							}
						]
					},
					{
						xtype: "tstextarea",
						cls: "x-callphonelogpage-detailed-result",
						id: "MobilePhoneCallLogPageDetailedResult",
						markerValue: "MobilePhoneCallLogPageDetailedResult"
					},
					{
						xtype: "tstoggle",
						id: "MobilePhoneCallLogPagePlanActivityToggle",
						hidden: true
					},
					{
						xtype: "container",
						layout: "hbox",
						id: "MobilePhoneCallLogPageButtonsContainer",
						items: [
							{
								xtype: "button",
								id: "MobilePhoneCallLogPage_cancelButton",
								cls: "x-button-secondary x-callphonelogpage-button"
							},
							{
								xtype: "button",
								id: "MobilePhoneCallLogPage_saveButton",
								cls: "x-button-primary x-callphonelogpage-button"
							}
						]
					}
				]
			}
		],

		record: null

	},

	/**
	 * Initializes view with items.
	 * @private
	 */
	initialize: function() {
		this.callParent(arguments);
		var navigationPanel = this.getNavigationPanel();
		navigationPanel.setTitle(Terrasoft.LocalizableStrings.MobilePhoneCallLogPageTitle);
		var detailedResult = Ext.getCmp("MobilePhoneCallLogPageDetailedResult");
		detailedResult.setPlaceHolder(Terrasoft.LocalizableStrings.MobilePhoneCallLogPageDetailResultPlaceholder);
		detailedResult.element.on("tap", this.onDetailedResultTap, this);
		var planActivityToggle = Ext.getCmp("MobilePhoneCallLogPagePlanActivityToggle");
		planActivityToggle.setLabel(Terrasoft.LocalizableStrings.MobilePhoneCallLogPageArrangeNextActivity);
		var cancelButton = Ext.getCmp("MobilePhoneCallLogPage_cancelButton");
		cancelButton.setText(Terrasoft.LocalizableStrings.MobilePhoneCallLogPageCancelButtonCaption);
		var saveButton = Ext.getCmp("MobilePhoneCallLogPage_saveButton");
		saveButton.setText(Terrasoft.LocalizableStrings.MobilePhoneCallLogPageSaveButtonCaption);
	},

	/**
	 * Calls when user taps on detail result field.
	 * @private
	 */
	onDetailedResultTap: function() {
		var detailedResult = Ext.getCmp("MobilePhoneCallLogPageDetailedResult");
		setTimeout(function() {
			detailedResult.focus();
		}, 250);
	}

});

Ext.define("MobilePhoneCallLogPage.Controller", {
	extend: "Terrasoft.controller.BaseConfigurationPage",

	statics: {
		Model: Contact
	},

	config: {

		refs: {
			view: "#MobilePhoneCallLogPage",
			receipientInfoLabel: "#MobilePhoneCallLogPageReceipientInfo",
			callInfoLabel: "#MobilePhoneCallLogPageCallInfo",
			saveButton: "#MobilePhoneCallLogPage_saveButton",
			cancelButton: "#MobilePhoneCallLogPage_cancelButton",
			arrangeActivityToggle: "#MobilePhoneCallLogPagePlanActivityToggle",
			detailedResultTextArea: "#MobilePhoneCallLogPageDetailedResult",
			userInfoLabel: "#MobilePhoneCallLogPageUserInfo"
		}

	},

	/**
	 * @private
	 */
	record: null,

	/**
	 * @private
	 */
	callStartDate: null,

	/**
	 * @private
	 */
	callFinishDate: null,

	/**
	 * @private
	 */
	receipient: null,

	/**
	 * @private
	 */
	duration: 0,

	/**
	 * @private
	 */
	activityLinkColumnNames: null,

	/**
	 * Returns call duration as formatted text.
	 * @private
	 */
	getCallDuration: function() {
		var diff = this.callFinishDate - this.callStartDate;
		var msec = diff / 1000;
		var min = Math.ceil(msec / 60);
		if (min > 30) {
			min = 30;
		}
		this.duration = min;
		var formatTpl = "{0} {1}";
		var minutesText = Ext.String.format(formatTpl,
			min, Terrasoft.LocalizableStrings.MobilePhoneCallLogPageMinutesText);
		return minutesText;
	},

	/**
	 * Updates call info label.
	 * @private
	 */
	updateCallInfo: function() {
		var callInfoLabel = this.getCallInfoLabel();
		var dateFormat = Terrasoft.Date.getDateTimeFormat();
		var startDate = Ext.Date.format(this.callStartDate, dateFormat);
		var info = (this.callFinishDate) ?
			Ext.String.format("{0} {1} {2}", startDate,
				Terrasoft.LocalizableStrings.MobilePhoneCallLogPageCallInfoSeparator, this.getCallDuration()) :
					startDate;
		callInfoLabel.setHtml(info);
	},

	/**
	 * Handler that works when app changes its state (pause\resume).
	 * @private
	 */
	onAppChangeState: function() {
		if (!this.callFinishDate) {
			this.callFinishDate = new Date();
			this.updateCallInfo();
		}
	},

	/**
	 * @private
	 */
	back: function() {
		Terrasoft.Router.back();
	},

/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function() {
		this.callParent(arguments);
		var historyItem = Terrasoft.PageHistory.getItemByPosition(Terrasoft.PagePositions.Current);
		var data = historyItem.getDefaultRecordData();
		this.record = data.record;
		this.activityLinkColumnNames = data.activityLinkColumnNames;
		this.callStartDate = data.start;
		var userInfoLabel = this.getUserInfoLabel();
		var outgoingCallText = Terrasoft.LocalizableStrings.MobilePhoneCallLogPageOutgoingCall;
		userInfoLabel.setHtml(outgoingCallText + ": " + Terrasoft.CurrentUserInfo.contactName);
		var receipientInfoLabel = this.getReceipientInfoLabel();
		var primaryDisplayColumnName = this.record.self.PrimaryDisplayColumnName;
		this.receipient = this.record.get(primaryDisplayColumnName);
		receipientInfoLabel.setHtml(this.receipient);
		this.updateCallInfo();
		var onAppChangeStateBinded = Ext.bind(this.onAppChangeState, this);
		Terrasoft.DocumentEventManager.subscribe("resume", onAppChangeStateBinded, false);
		Terrasoft.DocumentEventManager.subscribe("pause", onAppChangeStateBinded, false);
		var saveButton = this.getSaveButton();
		saveButton.on("tap", this.onSaveButtonButtonTap, this);
		var cancelButton = this.getCancelButton();
		cancelButton.on("tap", this.onCancelButtonTap, this);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getActions: function() {
		return [];
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onViewTouch: function() {
		this.callParent(arguments);
		this.onAppChangeState();
	},

	/**
	 * Calls when user taps 'Save' button.
	 * @protected
	 * @virtual
	 */
	onSaveButtonButtonTap: function() {
		var modelConfig = Terrasoft.ApplicationConfig.getModelConfig("Activity");
		var requiredModels = modelConfig.RequiredModels;
		Terrasoft.StructureLoader.loadModels({
			modelNames: requiredModels,
			success: function() {
				this.createCallActivity(function() {
					var arrangeActivityToggle = this.getArrangeActivityToggle();
					var toArrange = arrangeActivityToggle.getValue();
					var record = this.record;
					this.back();
					if (toArrange) {
						setTimeout(function() {
							var config = {
								defaultRecordData: {}
							};
							if (Ext.isString(this.activityLinkColumnNames)) {
								config.defaultRecordData[this.activityLinkColumnNames] = record;
							} else {
								for (var i = 0, ln = this.activityLinkColumnNames.length; i < ln; i++) {
									var linkColumnNameConfig = this.activityLinkColumnNames[i];
									var columnName = linkColumnNameConfig.activityColumnName;
									var columnValue = record.get(linkColumnNameConfig.parentColumnName);
									config.defaultRecordData[columnName] = columnValue;
								}
							}
							Terrasoft.util.openEditPage("Activity", config);
						}.bind(this), 500);
					}
				}.bind(this));
			},
			scope: this
		});
	},

	/**
	 * Calls when user taps 'Cancel' button.
	 * @protected
	 * @virtual
	 */
	onCancelButtonTap: function() {
		this.back();
	},

	/**
	 * Creates phone call activity.
	 * @protected
	 * @virtual
	 */
	createCallActivity: function(callback) {
		var title = Terrasoft.LocalizableStrings.MobilePhoneCallLogPageActivityTitle;
		var detailedResult = this.getDetailedResultTextArea();
		var detailedResultText = detailedResult.getValue();
		if (!Ext.isEmpty(detailedResultText)) {
			title += ": " + detailedResultText;
		}
		var record = this.record;
		var dueDate = new Date(this.callStartDate);
		dueDate.setMinutes(dueDate.getMinutes() + this.duration);
		var model = Ext.ClassManager.get("Activity");
		var handleException = function(exception) {
			Terrasoft.MessageBox.showException(exception);
		}.bind(this);
		model.createWithDefaultValues(function(activityRecord) {
			activityRecord.set("Title", title);
			activityRecord.set("StartDate", this.callStartDate);
			activityRecord.set("DueDate", dueDate);
			activityRecord.set("ActivityCategory", Terrasoft.Configuration.ActivityCategory.Call);
			activityRecord.set("Status", Terrasoft.Configuration.ActivityStatus.Finished);
			activityRecord.set("Result", Terrasoft.Configuration.ActivityResult.Call.Completed);
			activityRecord.set("DetailedResult", detailedResultText);
			activityRecord.set("ShowInScheduler", false);
			activityRecord.set("CallDirection", Terrasoft.CallDirectionId.Outgoing);
			var linkColumnNames = this.activityLinkColumnNames;
			if (Ext.isString(linkColumnNames)) {
				activityRecord.set(linkColumnNames, this.record);
			} else {
				for (var i = 0, ln = linkColumnNames.length; i < ln; i++) {
					var linkColumnNameConfig = linkColumnNames[i];
					var columnName = linkColumnNameConfig.activityColumnName;
					var parentColumnName = linkColumnNameConfig.parentColumnName;
					var columnValue = (parentColumnName === record.self.PrimaryColumnName) ?
						record : record.get(parentColumnName);
					activityRecord.set(columnName, columnValue);
				}
			}
			var queryConfigColumns = Object.keys(activityRecord.modified);
			activityRecord.save({
				isCancelable: false,
				queryConfig: Ext.create("Terrasoft.QueryConfig", {
					modelName: "Activity",
					columns: queryConfigColumns
				}),
				failure: handleException
			}, this);
			Ext.callback(callback, this);
		}, handleException, this);
	}

});


