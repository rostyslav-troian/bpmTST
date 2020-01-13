Terrasoft.configuration.Structures["ContentBlockGroupViewModel"] = {innerHierarchyStack: ["ContentBlockGroupViewModel"]};
define("ContentBlockGroupViewModel", ["BaseContentBlockViewModel", "ContentMjBlockViewModel"], function() {

	/**
	 * Class for ContentBlockGroupViewModel.
	 */
	Ext.define("Terrasoft.controls.ContentBlockGroupViewModel", {
		extend: "Terrasoft.controls.BaseContentBlockViewModel",
		alternateClassName: "Terrasoft.ContentBlockGroupViewModel",

		/**
		 * Name of the view class.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentBlockGroup",

		/**
		 * @inheritDoc BaseContentSerializableViewModelMixin#childItemTypes
		 */
		childItemTypes: {
			mjblock: "Terrasoft.ContentMjBlockViewModel"
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			if (Ext.isEmpty(config.Items)) {
				var childItems = [{
					ItemType: "mjblock",
					Items: [{
							ItemType: "section",
							Styles: {
								direction: "ltr"
							}
					}]
				}];
				changedConfig = Terrasoft.deepClone(config);
				changedConfig.Items = childItems;
			}
			return changedConfig;
		},

		/**
		 * Generates configuration object of element view.
		 * @return {Object} Configuration object of element view.
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"isSelectable": true,
				"selected": "$Selected",
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
			var block = this.getActiveBlock();
			if (block.$ItemType === "block") {
				config.push({
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					markerValue: "block-edit-button",
					imageConfig: "$Resources.Images.ContentBlockEdit",
					classes: {wrapperClass: "content-block-edit-button"},
					click: "$onEditButtonClick",
					visible: Terrasoft.Features.getIsEnabled("ContentBlockDesigner")
				});
			}
			return config;
		},

		/**
		 * Returns current active block.
		 * @public
		 * @virtual
		 * @return {Terrasoft.ContentBlockViewModel} Active content block.
		 */
		getActiveBlock: function() {
			return this.$Items.first();
		}

	});

	return Terrasoft.ContentBlockGroupViewModel;
});


