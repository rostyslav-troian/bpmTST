define("DataSourceViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewColumnCaption: "New column",
		ExistingColumnsCaption: "Existing columns",
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