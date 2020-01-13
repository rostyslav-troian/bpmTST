define("MobileDetailDesignerModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddDetailButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u044C",
		AddDetailLabelCaption: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u044C",
		ConfigureControlGroupButtonCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C",
		RemoveControlGroupButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		AddGridLayoutItemButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0443",
		RemoveGridLayoutItemButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0443"
	};
	var localizableImages = {
		MoveUpButtonImage: {
			source: 3,
			params: {
				schemaName: "MobileDetailDesignerModule",
				resourceItemName: "MoveUpButtonImage",
				hash: "eb1f9fd18ef6ffa338ffba77770fd4dc",
				resourceItemExtension: ".png"
			}
		},
		MoveDownButtonImage: {
			source: 3,
			params: {
				schemaName: "MobileDetailDesignerModule",
				resourceItemName: "MoveDownButtonImage",
				hash: "f153bce1fae18e7c3ca7297e51e192e4",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});