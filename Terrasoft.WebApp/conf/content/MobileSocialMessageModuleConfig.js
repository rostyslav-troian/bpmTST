Terrasoft.configuration.Structures["MobileSocialMessageModuleConfig"] = {innerHierarchyStack: ["MobileSocialMessageModuleConfig"]};
Terrasoft.sdk.GridPage.setPrimaryColumn("SocialMessage", "CreatedBy");

Terrasoft.sdk.GridPage.setGroupColumns("SocialMessage", [
	{
		name: "Message",
		isMultiline: true
	}
]);

Terrasoft.sdk.RecordPage.setTitle("SocialMessage", "update", "SocialMessageRecordPageTitle");

Terrasoft.sdk.RecordPage.setTitle("SocialMessage", "create", "SocialMessageRecordPageTitle");

Terrasoft.sdk.RecordPage.addColumnSet("SocialMessage", {
	name: "primaryColumnSet",
	isPrimary: true,
	position: 0
});

Terrasoft.sdk.RecordPage.addColumn("SocialMessage", {
	name: "Message",
	isMultiline: true,
	placeHolder: "SocialMessageSearchPlaceholder",
	customEditConfig: {
		xtype: "cfsocialmessagehtmlfield",
		tags: {
			"@": {
				modelName: "Contact",
				urlTpl: "Nui/ViewModule.aspx#CardModuleV2/ContactPageV2/edit/{0}"
			},
			"$": {
				modelName: "Account",
				urlTpl: "Nui/ViewModule.aspx#CardModuleV2/AccountPageV2/edit/{0}"
			}
		},
		requiredSymbol: ""
	}
}, "primaryColumnSet");

Terrasoft.sdk.Module.addFilter("SocialMessage", Ext.create("Terrasoft.Filter", {
	type: Terrasoft.FilterTypes.Group,
	subfilters: [
		{
			property: "Parent",
			isNot: true,
			compareType: Terrasoft.ComparisonTypes.NotEqual,
			value: null
		},
		{
			type: Terrasoft.FilterTypes.Group,
			logicalOperation: Terrasoft.FilterLogicalOperations.Or,
			subfilters: [
				{
					property: "EntityId",
					value: Terrasoft.CurrentUserInfo.contactId
				},
				{
					type: Terrasoft.FilterTypes.Group,
					logicalOperation: Terrasoft.FilterLogicalOperations.And,
					subfilters: [
						{
							modelName: "VwSocialSubscription",
							operation: Terrasoft.FilterOperations.Any,
							assocProperty: "SocialMessage",
							property: "SysAdminUnit",
							value: Terrasoft.CurrentUserInfo.userId
						},
						{
							type: Terrasoft.FilterTypes.Group,
							isNot: true,
							subfilters: [
								{
									modelName: "VwSocialUnsubscription",
									operation: Terrasoft.FilterOperations.Any,
									assocProperty: "SocialMessage",
									property: "SysAdminUnit",
									value: Terrasoft.CurrentUserInfo.userId
								}
							]
						}
					]
				}
			]
		}
	]
}));

Terrasoft.sdk.GridPage.setImageColumn("SocialMessage", "CreatedBy.Photo.PreviewData",
	"MobileImageListDefaultContactPhoto");

Terrasoft.sdk.GridPage.setOrderByColumns("SocialMessage", {
	column: "CreatedOn",
	orderType: Terrasoft.OrderTypes.DESC
});

Terrasoft.sdk.GridPage.addColumns("SocialMessage",
	["EntityId", "EntitySchemaUId", "Message", "LikeCount", "CommentCount", "CreatedOn", "CreatedBy"]);

Terrasoft.sdk.GridPage.setSearchPlaceholder("SocialMessage",
	Terrasoft.LocalizableStrings.SocialMessageSearchPlaceholder);

Terrasoft.sdk.Actions.add("SocialMessage", {
	name: "Edit",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionEdit"
});

Terrasoft.sdk.Actions.add("SocialMessage", {
	name: "Delete",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	actionClassName: "Terrasoft.ActionDelete"
});

Terrasoft.sdk.Actions.add("SocialMessage", {
	name: "DeleteComment",
	isVisibleInGrid: true,
	isDisplayTitle: true,
	useInComment: true,
	autoNavigation: false,
	actionClassName: "Terrasoft.ActionDelete"
});


