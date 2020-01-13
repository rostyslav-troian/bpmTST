Terrasoft.configuration.Structures["ContentBuilderNavbarElementViewModel"] = {innerHierarchyStack: ["ContentBuilderNavbarElementViewModel"]};
define("ContentBuilderNavbarElementViewModel", ["ContentBuilderNavbarElementViewModelResources",
		"ContentBuilderElementViewModel", "ContentBuilderConstants"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderNavbarElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderNavbarElementViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderNavbarElementViewModel",

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
				value: Terrasoft.ContentBuilderBodyItemType.navbar.value
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
			},
			"Items": {
				value: new Terrasoft.BaseViewModelCollection()
			}
		}
	});
});


