Terrasoft.configuration.Structures["QueueItemSectionViewHelper"] = {innerHierarchyStack: ["QueueItemSectionViewHelper"]};
define("QueueItemSectionViewHelper", ["terrasoft", "QueueItemSectionViewHelperResources"],
		function(Terrasoft, resources) {
	Ext.define("Terrasoft.configuration.QueueItemSectionViewHelper", {
		singleton: true,
		alternateClassName: "Terrasoft.QueueItemSectionViewHelper",

		/**
		 * Creates a generator function for fixed filter checkbox container.
		 * @param {Object} config The container config.
		 * @param {String} config.name The name of the container.
		 * @param {String} [config.caption] The caption of the checkbox.
		 * @param {String} [config.checked] The checkbox 'checked' event handler name.
		 * @param {String} [config.labelButtonClick] The label button 'click' event handler name.
		 * @return {Object}
		 */
		getFixedFilterCheckboxGenerator: function(config) {
			var imageConfig = resources.localizableImages.FixedFilterCheckboxImage;
			var imageUrl = Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
			var wrapStyle = imageUrl ? {"background-image": "url(" + imageUrl + ")"} : null;
			var editName = config.name + "Edit";
			return {
				className: "Terrasoft.Container",
				id: config.name + "Container",
				selectors: {wrapEl: "#" + config.name + "Container"},
				classes: {
					wrapClassName: ["filters-container-wrapClass fixed-filter-checkbox-container"]
				},
				visible: Ext.isDefined(config.visible) ? config.visible : true,
				items: [
					{
						id: editName,
						markerValue: editName,
						className: "Terrasoft.CheckBoxEdit",
						styles: {wrapStyle: wrapStyle},
						checked: config.checked
					},
					{
						id: config.name + "LabelButton",
						className: "Terrasoft.Button",
						caption: config.caption,
						markerValue: config.name + "LabelButton",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						click: config.labelButtonClick
					}
				]
			};
		}
	});
	return Terrasoft.configuration.QueueItemSectionViewHelper;
});


