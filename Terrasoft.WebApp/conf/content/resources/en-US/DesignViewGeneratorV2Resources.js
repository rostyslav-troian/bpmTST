define("DesignViewGeneratorV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Change: "Edit",
		Remove: "Delete",
		ChangeWidth: "Change width",
		ChangeHeight: "Change height",
		SortCurrentTab: "Organize current tab",
		CustomizeTab: "Set up tabs",
		ExistingColumn: "Existing column",
		NewColumn: "New column",
		ConfigurationButtonCaption: "Set",
		PlusButtonCaption: "\u002B",
		MinusButtonCaption: "-",
		String: "String",
		Integer: "Integer",
		Fractional: "Decimal",
		Date: "Date",
		Directory: "Lookup",
		Logical: "Boolean",
		Stretch: "Autofit width",
		Detail: "Detail:",
		ModuleCaption: "Module: ",
		ElementPrefix: "Element: "
	};
	var localizableImages = {
		Settings: {
			source: 3,
			params: {
				schemaName: "DesignViewGeneratorV2",
				resourceItemName: "Settings",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		RemoveIcon: {
			source: 3,
			params: {
				schemaName: "DesignViewGeneratorV2",
				resourceItemName: "RemoveIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});