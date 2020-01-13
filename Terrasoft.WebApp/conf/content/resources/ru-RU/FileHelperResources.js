define("FileHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FileSizeMetrics: "Kb",
		AddFileButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B"
	};
	var localizableImages = {
		DocIcon: {
			source: 3,
			params: {
				schemaName: "FileHelper",
				resourceItemName: "DocIcon",
				hash: "06c676a2ca97a49deae28507f5eeaf12",
				resourceItemExtension: ".png"
			}
		},
		PdfIcon: {
			source: 3,
			params: {
				schemaName: "FileHelper",
				resourceItemName: "PdfIcon",
				hash: "1073eaad17933ebc133ce8ff3ae9a999",
				resourceItemExtension: ".png"
			}
		},
		PptIcon: {
			source: 3,
			params: {
				schemaName: "FileHelper",
				resourceItemName: "PptIcon",
				hash: "7fdcdbfecb0fe64a9538cd005b0d1ae0",
				resourceItemExtension: ".png"
			}
		},
		AllIcon: {
			source: 3,
			params: {
				schemaName: "FileHelper",
				resourceItemName: "AllIcon",
				hash: "f399b351d07c6a83fafad80e50c68e1e",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});