define("DataSourceViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewColumnCaption: "\u041D\u043E\u0432\u0430\u044F \u043A\u043E\u043B\u043E\u043D\u043A\u0430",
		ExistingColumnsCaption: "\u0421\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
		Caption: ""
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "DataSourceViewModel",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		DataModelMenuImage: {
			source: 3,
			params: {
				schemaName: "DataSourceViewModel",
				resourceItemName: "DataModelMenuImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});