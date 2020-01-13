define("BusinessRuleCaseDesignerViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddConditionButtonCaption: "Add condition",
		AddActionButtonCaption: "Add action",
		InvalidConditonAndActionCountMessage: "Add condition and action for the business rule",
		InvalidConditionFiltrationActionMessage: "If filtration action is selected, condition must be empty"
	};
	var localizableImages = {
		AddIconEnabled: {
			source: 3,
			params: {
				schemaName: "BusinessRuleCaseDesignerViewModel",
				resourceItemName: "AddIconEnabled",
				hash: "7ac7e72f0fb5f03d8fad2d72ba7fbd24",
				resourceItemExtension: ".svg"
			}
		},
		AddIconDisabled: {
			source: 3,
			params: {
				schemaName: "BusinessRuleCaseDesignerViewModel",
				resourceItemName: "AddIconDisabled",
				hash: "c972714ae7ecb9372079b1030f98b2c9",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});