Terrasoft.configuration.Structures["ContentBuilderImageElementViewModel"] = {innerHierarchyStack: ["ContentBuilderImageElementViewModel"]};
define("ContentBuilderImageElementViewModel", ["ContentBuilderImageElementViewModelResources",
		"ContentBuilderElementViewModel", "ContentBuilderConstants"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderImageElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderImageElementViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderImageElementViewModel",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "ImageConfig", "Align"],

		columns: {
			"ClassName": {
				value: "Terrasoft.ContentBuilderElement"
			},
			"ItemType": {
				value: Terrasoft.ContentBuilderBodyItemType.mjimage.value
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
			"Align": {
				value: Terrasoft.Align.CENTER
			},
			"GroupName": {
				value: [Terrasoft.ContentBuilder.constants.ElementDropGroup]
			},
			"ImageConfig": {
				value: {
					source: Terrasoft.ImageSources.URL,
					url: resources.localizableStrings.DefaultImageBase64
				}
			}
		}
	});
});


