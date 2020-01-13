define("ParameterDataSourceViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewColumnCaption: "New parameter",
		ExistingColumnsCaption: "Existing parameters",
		Caption: "Page parameters"
	};
	var localizableImages = {
		DataModelImage: {
			source: 3,
			params: {
				schemaName: "ParameterDataSourceViewModel",
				resourceItemName: "DataModelImage",
				hash: "a465b42219ca05e901f1a7700ddb346e",
				resourceItemExtension: ".svg"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "ParameterDataSourceViewModel",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		DataModelMenuImage: {
			source: 3,
			params: {
				schemaName: "ParameterDataSourceViewModel",
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