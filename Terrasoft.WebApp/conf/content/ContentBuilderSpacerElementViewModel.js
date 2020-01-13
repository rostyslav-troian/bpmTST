Terrasoft.configuration.Structures["ContentBuilderSpacerElementViewModel"] = {innerHierarchyStack: ["ContentBuilderSpacerElementViewModel"]};
define("ContentBuilderSpacerElementViewModel", ["ContentBuilderSpacerElementViewModelResources",
		"ContentBuilderElementViewModel", "ContentBuilderConstants"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderSpacerElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderSpacerElementViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderSpacerElementViewModel",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType"],

		columns: {
			"ClassName": {
				value: "Terrasoft.ContentBuilderElement"
			},
			"ItemType": {
				value: Terrasoft.ContentBuilderBodyItemType.spacer.value
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
				value: [Terrasoft.ContentBuilder.constants.ElementDropGroup]
			}
		}
	});
});


