define("BaseSupplyPaymentItemPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PercentageIncorrect: "Invalid percentage value (0% - 100%)",
		DelayNegative: "Deferment cannot be negative",
		TagButtonHint: "",
		TabControlScrollLeftHint: "Scroll left",
		TabControlScrollRightHint: "Scroll right",
		FieldsGroupCollapseButtonHint: "Collapse\/expand",
		FieldLockHint: "Non-editable field",
		ClearButtonHint: "Clear value"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseSupplyPaymentItemPageV2",
				resourceItemName: "TagButtonIcon"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseSupplyPaymentItemPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseSupplyPaymentItemPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseSupplyPaymentItemPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});