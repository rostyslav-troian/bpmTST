Terrasoft.configuration.Structures["PageDesignerButtonsContainer"] = {innerHierarchyStack: ["PageDesignerButtonsContainer"]};
define("PageDesignerButtonsContainer", ["ext-base", "terrasoft", "PageDesignerButtonsContainerResources",
	"DesignTimeReorderableContainer"
], function(Ext, Terrasoft, resources) {

	Ext.define("Terrasoft.PageDesignerButtonsContainer", {
		extend: "Terrasoft.DesignTimeReorderableContainer",

		/**
		 * @inheritDoc Terrasoft.Reorderable#reorderableElCls
		 * @protected
		 */
		reorderableElCls: "page-designer-button-reorderable-position",

		/**
		 * @inheritdoc Terrasoft.Reorderable#zeroElClassName
		 * @override
		 */
		zeroElClassName: "page-designer-button-reorderable-zero-element",

		/**
		 * @inheritdoc Terrasoft.Draggable#showDropOverZoneHint
		 * @override
		 */
		showDropOverZoneHint: true,

		// region Methods: Private

		/**
		 * @private
		 */
		_getButtonToolItems: function() {
			return [
				{
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": resources.localizableImages.Remove,
					"click": {"bindTo": "onRemoveClick"}
				}
			];
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Reorderable#getItemConfig
		 * @override
		 */
		getItemConfig: function(viewModelItem) {
			return {
				"className": "Terrasoft.PageDesignerButton",
				"id": viewModelItem.get("Name"),
				"markerValue": viewModelItem.get("Tag"),
				"classes": {"wrapClassName": ["button-reordable-item"]},
				"ondragenter": {"bindTo": "onDragEnter"},
				"ondragdrop": {"bindTo": "onDragDrop"},
				"ondragout": {"bindTo": "onDragOut"},
				"ondblclick": {"bindTo": "onEditClick"},
				"onselect": {"bindTo": "onSelect"},
				"selected": {"bindTo": "Selected"},
				"groupName": "ProcessActionButtons_ReorderableContainer",
				"items": [
					{
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": ["page-designer-btn-wrapper"]},
						"items": [{
							"className": "Terrasoft.Button",
							"caption": {"bindTo": "Caption"},
							"style": {"bindTo": "Style"},
							"enabled": {"bindTo": "Enabled"}
						}]
					},
					{
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": ["tools-container"]},
						"items": this._getButtonToolItems()
					}
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"mousedown"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @protected
		 */
		initDomEvents: function() {
			var wrapEl = this.getWrapEl();
			wrapEl.on("mousedown", this.onMouseDown, this);
		},

		/**
		 * Event handler of mouse down.
		 * @protected
		 */
		onMouseDown: function() {
			this.fireEvent("mousedown");
		}

		// endregion

	});

	return Terrasoft.PageDesignerButtonsContainer;
});


