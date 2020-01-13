Terrasoft.configuration.Structures["MobileActivityGridPageViewV2"] = {innerHierarchyStack: ["MobileActivityGridPageViewV2"]};
Terrasoft.Configuration.ActivityGridModeTypes = {
	List: "tslist",
	Schedule: "tsschedule"
};

Terrasoft.Configuration.ActivitySchedulePeriods = {
	Day: 1,
	Week: 2
};

Ext.define("Terrasoft.configuration.view.ActivityGridPage", {
	alternateClassName: "ActivityGridPage.View",
	extend: "Terrasoft.view.BaseGridPage.View",
	xtype: "activitygridpage",

	config: {

		id: "ActivityGridPage",

		grid: {
			xtype: Terrasoft.Configuration.ActivityGridModeTypes.Schedule,
			isFirePhantomItemEvents: true
		},

		ownerButton: false,

		refreshButton: false,

		periodSegmentedButton: false

	},

	/**
	 * Right filter container.
	 * @protected
	 * @type {Ext.Container}
	 */
	filterPanelRightContainer: null,

	/**
	 * @private
	 */
	getFilterPanelRightContainer: function() {
		if (!this.filterPanelRightContainer) {
			this.filterPanelRightContainer = Ext.create("Ext.Container", {
				layout: "hbox",
				docked: "right"
			});
			var filterPanel = this.getFilterPanel();
			filterPanel.add(this.filterPanelRightContainer);
		}
		return this.filterPanelRightContainer;
	},

	/**
	 * @private
	 */
	getActionStatusButton: function() {
		var actionsContaner = this.getActionsContainer();
		return actionsContaner.getComponent("actionStatus");
	},

	/**
	 * @protected
	 * @overridden
	 */
	applyGrid: function(newConfig) {
		if (!this.initializedByController) {
			return newConfig;
		}
		if (newConfig.xtype === Terrasoft.Configuration.ActivityGridModeTypes.Schedule) {
			newConfig.listeners = {
				scope: this,
				initialize: function(el) {
					this.fireEvent("initializegrid", el);
				}
			};
			newConfig.columnsBindingConfig = Ext.apply({}, newConfig.columnsBindingConfig, {
				title: this.getActivityTitle.bind(this)
			});
		}
		return this.callParent(arguments);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyOwnerButton: function(newButton) {
		if (!newButton) {
			return false;
		}
		var config = {
			cls: "x-activity-grid-owner-button",
			iconCls: "",
			markerValue: "owner-button"
		};
		return Ext.factory(config, "Ext.Button", this.getOwnerButton());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateOwnerButton: function(newButton, oldButton) {
		if (newButton) {
			this.setOwnerButtonImage(null);
			var filterPanelRightContainer = this.getFilterPanelRightContainer();
			filterPanelRightContainer.insert(0, newButton);
		}
		if (oldButton) {
			Ext.destroy(oldButton);
		}
	},

	/* @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyRefreshButton: function(value) {
		if (!value) {
			return false;
		}
		var config = {
			docked: "right",
			cls: "x-activity-grid-refresh-button",
			iconCls: "x-refresh-white-icon"
		};
		return Ext.factory(config, "Ext.Button", this.getRefreshButton());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateRefreshButton: function(newButton, oldButton) {
		if (oldButton) {
			Ext.destroy(oldButton);
		}
		if (newButton) {
			var navigationPanel = this.getNavigationPanel();
			navigationPanel.addButton(newButton);
		}
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyPeriodSegmentedButton: function(newValue, oldValue) {
		if (!newValue) {
			return false;
		}
		var config = {
			cls: "cf-activity-period-segmented-button",
			items: [
				{
					text: Terrasoft.LocalizableStrings.ActivityGridPageViewSchedulePeriodDay,
					itemId: Terrasoft.Configuration.ActivitySchedulePeriods.Day,
					markerValue: "day"
				},
				{
					text: Terrasoft.LocalizableStrings.ActivityGridPageViewSchedulePeriodWeek,
					itemId: Terrasoft.Configuration.ActivitySchedulePeriods.Week,
					markerValue: "week"
				}
			]
		};
		return Ext.factory(config, "Ext.SegmentedButton", oldValue);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updatePeriodSegmentedButton: function(newSegmentedButton, oldSegmentedButton) {
		if (newSegmentedButton) {
			var filterPanelRightContainer = this.getFilterPanelRightContainer();
			filterPanelRightContainer.insert(0, newSegmentedButton);
		}
		if (oldSegmentedButton) {
			Ext.destroy(oldSegmentedButton);
		}
	},

	/**
	 * @protected
	 * @virtual
	 */
	getActivityTitle: function(record) {
		var title = record.get("Title");
		var accountName = record.get("Account.Name");
		if (!Ext.isEmpty(accountName)) {
			title = Ext.String.format("{0}: {1}", accountName, title);
		}
		return title;
	},

	createTodayButton: function() {
		return Ext.create("Ext.Button", {
			text: Terrasoft.LocalizableStrings.ActivityGridPageViewTodayCaption,
			markerValue: "today",
			cls: "x-button-primary-blue"
		});
	},

	setOwnerButtonImage: function(image) {
		var ownerButton = this.getOwnerButton();
		if (image) {
			ownerButton.removeCls("x-owner-default-image");
		} else {
			ownerButton.addCls("x-owner-default-image");
			image = Terrasoft.Configuration.getDefaultOwnerImage();
		}
		ownerButton.setIcon(image);
	},

	updateOwnerButtonPosition: function() {
		var ownerButton = this.getOwnerButton();
		if (!ownerButton) {
			return;
		}
		var filterPanelRightContainer = this.getFilterPanelRightContainer();
		filterPanelRightContainer.insert(0, ownerButton);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	isStateButtonDisabled: function() {
		return false;
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionsButtonTap: function() {
		this.callParent(arguments);
		var actionStatusButton = this.getActionStatusButton();
		if (actionStatusButton) {
			actionStatusButton.hide();
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionsPickerHide: function() {
		this.callParent(arguments);
		var actionStatusButton = this.getActionStatusButton();
		if (actionStatusButton) {
			actionStatusButton.show();
		}
	}

}, function() {
	Terrasoft.util.writeStyles(
		"#ActivityGridPage .x-navigation-panel .x-title.cf-multi-modes:after {",
		Terrasoft.util.getImageStyleByImageId("MobileActivityGridPageViewV2IconArrowDown"),
		"}"
	);
	if (!Terrasoft.ApplicationUtils.isOnlineMode()) {
		Terrasoft.util.writeStyles(
			".x-navigation-panel.x-toolbar .x-button.x-activity-grid-owner-button.x-button-pressing {",
			"opacity: 1 !important;",
			"}"
		);
	}
});


