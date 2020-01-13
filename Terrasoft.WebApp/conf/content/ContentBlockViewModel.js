Terrasoft.configuration.Structures["ContentBlockViewModel"] = {innerHierarchyStack: ["ContentBlockViewModel"]};
define("ContentBlockViewModel", ["ContentBlockViewModelResources", "BaseContentBlockViewModel"], function() {

	/**
	 * @class Terrasoft.controls.ContentBlockViewModel
	 */
	Ext.define("Terrasoft.ContentBlockViewModel", {
		extend: "Terrasoft.BaseContentBlockViewModel",

		/**
		 * Name of the view class.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.controls.ContentBlock",

		/**
		 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
		 * @override
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"isSelectable": this.checkIsSelectable(),
				"selected": "$Selected",
				"elementSelectedChange": "$onElementSelected",
				"groupName": ["ContentBlank"],
				"getDraggableConfig": this.getDraggableConfig,
				"ondragover": "$onDragOver",
				"ondragdrop": "$onDragDrop",
				"oninvaliddrop": "$onInvalidDrop",
				"tools": this.getToolsConfig()
			});
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getToolsConfig
		 * @override
		 */
		getToolsConfig: function() {
			var config = this.callParent();
			config.push({
				className: "Terrasoft.Button",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				markerValue: "block-edit-button",
				imageConfig: "$Resources.Images.ContentBlockEdit",
				classes: {wrapperClass: "content-block-edit-button"},
				click: "$onEditButtonClick",
				visible: Terrasoft.Features.getIsEnabled("ContentBlockDesigner")
			});
			return config;
		}

	});

	return Terrasoft.ContentBlockViewModel;
});


