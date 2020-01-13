Terrasoft.configuration.Structures["ContentBuilderSeparatorElementViewModel"] = {innerHierarchyStack: ["ContentBuilderSeparatorElementViewModel"]};
define("ContentBuilderSeparatorElementViewModel", ["ContentBuilderSeparatorElementViewModelResources",
		"ContentBuilderElementViewModel", "ContentBuilderConstants"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderSeparatorElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderSeparatorElementViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderSeparatorElementViewModel",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles", "Thickness", "Color", "Width", "Style"],

		columns: {
			"ClassName": {
				value: "Terrasoft.ContentBuilderElement"
			},
			"ItemType": {
				value: Terrasoft.ContentBuilderBodyItemType.mjdivider.value
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
			"Color": {
				value: "#BBBBBB"},
			"Thickness": {
				value: "2px"
			},
			"Width": {
				value: Terrasoft.emptyString
			},
			"Style": {
				value: "Solid"
			},
			"Styles": {
				value: {
					"padding-top": "10px",
					"padding-bottom": "10px",
					"padding-left": "23px",
					"padding-right": "23px"
				}
			}
		}

	});
});


