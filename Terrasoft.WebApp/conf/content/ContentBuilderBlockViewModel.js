Terrasoft.configuration.Structures["ContentBuilderBlockViewModel"] = {innerHierarchyStack: ["ContentBuilderBlockViewModel"]};
define("ContentBuilderBlockViewModel", ["ContentBuilderBlockViewModelResources", "ContentBuilderConstants",
		"ContentBuilderElementViewModel"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderBlockViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderBlockViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderBlockViewModel",

		columns: {
			"ClassName": {
				value: "Terrasoft.ContentBuilderBlock"
			},
			"ItemType": {
				value: Terrasoft.ContentBuilderBodyItemType.mjblock.value
			},
			"Caption": {
				value: resources.localizableStrings.Caption
			},
			"Icon": {
				value: {
					source: Terrasoft.ImageSources.URL,
					url: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.Icon)
				}
			},
			"GroupName": {
				value: ["ContentBlank"]
			}
		}
	});
});


