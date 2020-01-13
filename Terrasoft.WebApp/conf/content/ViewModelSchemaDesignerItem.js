Terrasoft.configuration.Structures["ViewModelSchemaDesignerItem"] = {innerHierarchyStack: ["ViewModelSchemaDesignerItem"]};
define("ViewModelSchemaDesignerItem", [], function() {

	Ext.define("Terrasoft.ViewModelSchemaDesignerItem", {
		extend: "Terrasoft.controls.DraggableContainer",
		alternateClassName: "Terrasoft.controls.ViewModelSchemaDesignerItem",

		mixins: {
			menuMixin: "Terrasoft.MenuMixin",
			rightIcon: "Terrasoft.RightIcon"
		},

		dragActionsCode: 1,

		/**
		 * Item id.
		 * @type {String}
		 */
		itemId: null,

		/**
		 * Item image configuration.
		 * @public
		 * @type {Object}
		 */
		imageConfig: null,

		/**
		 * Item content.
		 * @type {String}
		 */
		content: null,

		/**
		 * Indicates if delete button is visible.
		 * @type {Boolean}
		 */
		isRemoveButtonVisible: false,

		/**
		 * Indicates if the item is used.
		 * @type {Boolean}
		 */
		isUsed: false,

		/**
		 * Indicates if the item is required.
		 * @type {Boolean}
		 */
		isRequired: false,

		/**
		 * An array of groups to which you can drag element.
		 * @protected
		 * @type {String[]}
		 */
		draggableGroupNames: null,

		/**
		 * @inheritdoc Terrasoft.Draggable#grabbedClassName
		 * @overridden
		 */
		grabbedClassName: "grabbed",

		/**
		 * @inheritdoc Terrasoft.Draggable#dragCopy
		 * @overridden
		 */
		dragCopy: true,

		/**
		 * @inheritdoc Terrasoft.Draggable#showDropOverZoneHint
		 * @override
		 */
		showDropOverZoneHint: true,

		/**
		 * @inheritdoc Terrasoft.RightIcon#enableRightIcon
		 * @override
		 */
		enableRightIcon: false,

		/**
		 * @inheritdoc Terrasoft.RightIcon#rightIconClasses
		 * @override
		 */
		rightIconClasses: ["view-model-schema-designer-item-right-icon"],

		/**
		 * Template parameters object in the grid.
		 * @protected
		 * @type {Object}
		 */
		tplConfig: {
			classes: {
				wrapClasses: ["view-model-schema-designer-item-wrap"],
				elClasses: ["view-model-schema-designer-item-el"],
				contentWrapClasses: ["view-model-schema-designer-item-content-wrap"],
				textWrapClasses: ["view-model-schema-designer-item-content-text-wrap"],
				imageWrapClasses: ["view-model-schema-designer-item-content-image-wrap"],
				imageClasses: ["view-model-schema-designer-item-content-image"],
				actionsWrapClasses: ["view-model-schema-designer-item-actions-wrap"]
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @overridden
		 */
		tpl: [
			/* jshint ignore:start */
			'<div id="{id}-view-model-schema-designer-item-wrap" data-used="{isUsed}" data-required="{isRequired}"' +
			'		class="{wrapClasses}">',
			'<div id="{id}-view-model-schema-designer-item-el" class="{elClasses}">',
			'<div id="{id}-view-model-schema-designer-item-content" class="{contentWrapClasses}">',
			'<tpl if="hasIcon">',
			'<div class="{imageWrapClasses}">',
			'<img class="{imageClasses}" src="{imageUrl}"/>',
			'</div>',
			'</tpl>',
			'<tpl if="hasContent">',
			'<div class="{textWrapClasses}">',
			'{content}',
			'</div>',
			'</tpl>',
			'</div>',
			'{%this.renderRightIcon(out, values)%}',
			'</div>',
			'<tpl if="isRemoveButtonVisible">',
			'<div class="{actionsWrapClasses}">',
			'{%this.renderItems(out, values)%}',
			'</div>',
			'</tpl>',
			'</div>'
			/* jshint ignore:end */
		],

		/**
		 * Applies the template configuration of control element.
		 * @protected
		 * @param {Object} tplData An object configuration of template of control element.
		 * @param {String} configNodeName Configuration node name.
		 */
		applyTplConfigProperties: function(tplData, configNodeName) {
			Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
				tplData[propertyName] = propertyValue;
			}, this);
		},

		/**
		 * Applies the template classes of control element.
		 * @protected
		 * @param {Object} tplData An object configuration of template of control element.
		 */
		applyTplClasses: function(tplData) {
			this.applyTplConfigProperties(tplData, "classes");
		},

		/**
		 * @inheritdoc Terrasoft.component#getTplData
		 * @overridden
		 */
		getTplData: function() {
			this.selectors = {
				wrapEl: Ext.String.format("#{0}-view-model-schema-designer-item-wrap", this.id)
			};
			if (this.useRightIcon()) {
				this.selectors.rightIconEl = "#" + this.id + "-right-icon";
				this.selectors.rightIconWrapperEl = "#" + this.id + "-right-icon-wrapper";
			}
			var tplData = this.callParent(arguments);
			this.applyTplClasses(tplData);
			tplData.hasContent = !!this.content;
			tplData.isRemoveButtonVisible = this.isRemoveButtonVisible;
			tplData.isUsed = this.isUsed;
			tplData.isRequired = this.isRequired;
			tplData.hasIcon = !!this.imageConfig;
			tplData.renderRightIcon = this.renderRightIcon;
			if (this.imageConfig) {
				tplData.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
			}
			tplData.content = Terrasoft.encodeHtml(this.content);
			return tplData;
		},

		/**
		 * Handler of action item click.
		 * @protected
		 * @param {String} tag Tag of action.
		 * @param {String} itemId Item id.
		 */
		onActionItemClick: function(tag, itemId) {
			this.fireEvent("itemActionClick", tag, itemId);
		},

		/**
		 * @inheritdoc Terrasoft.component#init
		 * @overridden
		 */
		init: function() {
			var self = this;
			function actionHandler() {
				self.onActionItemClick(this.tag, self.itemId);
			}
			this.items = [{
				className: "Terrasoft.Button",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				tag: "remove",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: "./resources/demo/grid-layout-edit/CancelButtonImage.png"
				},
				onClick: actionHandler
			}
			];
			this.callParent(arguments);
			this.mixins.rightIcon.init.apply(this, arguments);
			this.mixins.menuMixin.init.call(this);
			this.addEvents(
				/**
				 * @event beforeColumnChange
				 * Is triggered before column is changed.
				 */
				"itemActionClick",
				/**
				 * @event invalidDrop
				 * Invalid drop event.
				 */
				"invalidDrop",
				/**
				 * @event dragOver
				 * Drag over event.
				 */
				"dragOver",
				/**
				 * @event dragDrop
				 * Drag and drop event.
				 */
				"dragDrop"
			);
		},

		/**
		 * @inheritdoc Terrasoft.component#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var itemBindConfig = {
				draggableGroupNames: {
					changeMethod: "setDraggableGroupNames"
				},
				itemId: {
					changeMethod: "setItemId"
				},
				content: {
					changeMethod: "setContent"
				},
				imageConfig: {
					changeMethod: "setImageConfig"
				},
				isRemoveButtonVisible: {
					changeMethod: "setRemoveButtonVisible"
				},
				isUsed: {
					changeMethod: "setIsUsed"
				},
				isRequired: {
					changeMethod: "setIsRequired"
				}
			};
			Ext.apply(itemBindConfig, bindConfig);
			var rightIconConfig = this.mixins.rightIcon.getBindConfig();
			Ext.apply(itemBindConfig, rightIconConfig);
			return itemBindConfig;
		},

		/**
		 * @private
		 */
		_getDroppableContainer: function(cells) {
			var droppableCell = _.find(cells, function(cell) {
				return cell.droppableInstance;
			}, this);
			return droppableCell && droppableCell.droppableInstance;
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
		 * @overridden
		 */
		getDraggableConfig: function() {
			var draggableConfig = {};
			draggableConfig[Terrasoft.DragAction.MOVE] = {
				handlers: {
					onDragDrop: function(event, cells) {
						var droppableInstance = this._getDroppableContainer(cells);
						if (!droppableInstance) {
							return;
						}
						var info = {layoutName: droppableInstance.tag};
						this.fireEvent("dragDrop", this, info);
						this.reRender();
					},
					onDragOver: function(event, cells) {
						Ext.dd.DragDropManager.dragCurrent.resetConstraints();
						var droppableInstance = this._getDroppableContainer(cells);
						if (!droppableInstance) {
							return;
						}
						var intersectionPosition = this.getIntersectionPosition(cells);
						var intersection = {
							column: intersectionPosition.column,
							row: intersectionPosition.row,
							layoutName: droppableInstance.tag
						};
						this.fireEvent("dragOver", this, intersection);
					},
					onInvalidDrop: function() {
						this.fireEvent("invalidDrop", this);
						this.reRender();
					}
				}
			};
			return draggableConfig;
		},

		/**
		 * Sets draggable group names.
		 * @param {String[]} value Group lists.
		 */
		setDraggableGroupNames: function(value) {
			if (this.draggableGroupNames === value) {
				return;
			}
			this.draggableGroupNames = value;
			this.safeRerender();
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getGroupName
		 * @overridden
		 */
		getGroupName: function() {
			return this.draggableGroupNames;
		},

		/**
		 * Returns the position in the grid to start inserting.
		 * @protected
		 * @virtual
		 * @param {Array} cells Cells on which there is an element.
		 * @return {{row: Number, column: Number}} The position on the grid for the start of the insertion.
		 */
		getIntersectionPosition: function(cells) {
			var cellEl = Ext.get(cells[0].id);
			return {
				row: parseInt(cellEl.getAttribute("data-row-index"), 10),
				column: parseInt(cellEl.getAttribute("data-column-index"), 10)
			};
		},

		/**
		 * Sets the item id.
		 * @param {Number} value String index.
		 */
		setItemId: function(value) {
			if (this.itemId === value) {
				return;
			}
			this.itemId = value;
		},

		/**
		 * Sets the content value.
		 * @param {Number} value String index.
		 */
		setContent: function(value) {
			if (this.content === value) {
				return;
			}
			this.content = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * Sets the remove button visibility.
		 * @param {Boolean} value Value.
		 */
		setRemoveButtonVisible: function(value) {
			if (this.isRemoveButtonVisible === value) {
				return;
			}
			this.isRemoveButtonVisible = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * Sets the image configuration.
		 * @param {Object} value Value.
		 */
		setImageConfig: function(value) {
			if (this.imageConfig === value) {
				return;
			}
			this.imageConfig = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * Sets the object image settings.
		 * @param {Boolean} value Value.
		 */
		setIsUsed: function(value) {
			if (this.isUsed === value) {
				return;
			}
			this.isUsed = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * Sets the object image settings.
		 * @param {Boolean} value Value.
		 */
		setIsRequired: function(value) {
			if (this.isRequired === value) {
				return;
			}
			this.isRequired = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * @inheritdoc Terrasoft.MenuMixin#onMenuItemsChange
		 * @override
		 */
		onMenuItemsChange: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.Component#bind
		 * @override
		 */
		bind: function() {
			this.callParent(arguments);
			this.mixins.menuMixin.bindMenu.call(this, this.model);
		},


		/**
		 * @inheritdoc Terrasoft.DraggableContainer#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this.removeMenu(true);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.RightIcon#onRightIconClick
		 * @override
		 */
		onRightIconClick: function() {
			if (!this.enabled) {
				return;
			}
			if (this.menu) {
				this.showMenu(this.rightIconWrapperEl);
			}
		},


		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			if (this.useRightIcon()) {
				this.initRightIconEvents();
				this.on("rightIconClick", this.onRightIconClick, this);
			}
		}

	});

	return Terrasoft.ViewModelSchemaDesignerItem;

});


