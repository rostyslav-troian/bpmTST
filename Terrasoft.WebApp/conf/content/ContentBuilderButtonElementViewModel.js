Terrasoft.configuration.Structures["ContentBuilderButtonElementViewModel"] = {innerHierarchyStack: ["ContentBuilderButtonElementViewModel"]};
define("ContentBuilderButtonElementViewModel", ["ContentBuilderButtonElementViewModelResources",
		"ContentBuilderElementViewModel", "ContentBuilderConstants"],
	function(resources) {

	/**
	 * @class Terrasoft.controls.ContentBuilderButtonElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderButtonElementViewModel", {
		extend: "Terrasoft.ContentBuilderElementViewModel",
		alternateClassName: "Terrasoft.ContentBuilderButtonElementViewModel",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Styles", "WrapperStyles", "Align",
			"HtmlText", "PlainText"],

		columns: {
			"ClassName": {
				value: "Terrasoft.ContentBuilderElement"
			},
			"ItemType": {
				value: Terrasoft.ContentBuilderBodyItemType.mjbutton.value
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
			"HtmlText": {
				value:
					"<strong>Call to action</strong>"
			},
			"PlainText": {
				value: "Call to action"
			},
			"Styles": {
				value: { "background-color": "#e3e3e3" }
			}
		}
	});
});


