define("BusinessRuleCaseDesignerContainerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IfCaption: "If",
		ThenCaption: "Then",
		AddConditionButtonCaption: "Add condition",
		AddActionButtonCaption: "Add action"
	};
	var localizableImages = {
		IfIcon: {
			source: 3,
			params: {
				schemaName: "BusinessRuleCaseDesignerContainer",
				resourceItemName: "IfIcon",
				hash: "3c9aaf749a2f59db08addad3518ac73c",
				resourceItemExtension: ".svg"
			}
		},
		ThenIcon: {
			source: 3,
			params: {
				schemaName: "BusinessRuleCaseDesignerContainer",
				resourceItemName: "ThenIcon",
				hash: "b143cc9003a3762f96096e37d9651bf7",
				resourceItemExtension: ".svg"
			}
		},
		AddIcon: {
			source: 3,
			params: {
				schemaName: "BusinessRuleCaseDesignerContainer",
				resourceItemName: "AddIcon",
				hash: "7ac7e72f0fb5f03d8fad2d72ba7fbd24",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});