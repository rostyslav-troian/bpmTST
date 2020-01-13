define(["ext-base", "terrasoft", "draggable-container", "button", "messagebox", "commonutils", "textedit", "grid"],
		function(Ext, Terrasoft) {
	Ext.define("Terrasoft.GridLayoutEditModel", {
		extend: "Terrasoft.BaseViewModel",
		columns: {
			Columns: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Columns",
				dataValueType: Terrasoft.core.enums.DataValueType.NUMBER
			},
			Rows: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Rows",
				dataValueType: Terrasoft.DataValueType.NUMBER
			},
			Selection: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Selection"
			},
			SelectedItems: {
				type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "SelectedItems"
			},
			BindCollection: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				caption: "Rows",
				dataValueType: Terrasoft.DataValueType.COLLECTION
			}
		},
		addItem: function(caption) {
			var itemConfig = this.get("Seleсtion");
			if (!itemConfig) {
				return;
			}
			itemConfig.itemId = Terrasoft.generateGUID();
			itemConfig.content = caption || "Content";
			itemConfig.dragActionsCode = 511;
			itemConfig.imageConfig = {
				source: Terrasoft.ImageSources.URL,
				url: "./resources/demo/grid-layout-edit/icon_boolean.png"
			};
			var collection = this.get("BindCollection");
			collection.add(itemConfig.itemId, Ext.create("Terrasoft.GridLayoutEditItemModel", {
				values: itemConfig
			}));
			return itemConfig.itemId;
		},
		removeItem: function() {
			var selectedItems = this.get("SelectedItems");
			var collection = this.get("BindCollection");
			Terrasoft.each(selectedItems, function(itemId) {
				collection.removeByKey(itemId);
			}, this);
		},
		clearItems: function() {
			var collection = this.get("BindCollection");
			collection.clear();
		},
		onItemActionClick: function(actionName, itemId) {
			var collection = this.get("BindCollection");
			switch (actionName) {
				case "remove":
					collection.removeByKey(itemId);
					break;
				case "edit":
					var item = collection.find(itemId);
					if (item) {
						var controlConfig = {
							text: {
								dataValueType: Terrasoft.DataValueType.TEXT,
								caption: "Content",
								value: item.get("content")
							}
						};
						Terrasoft.utils.inputBox(
							Ext.String.format("Item '{0}' setting", item.get("content")),
							function(buttonCode, controlData) {
								if (buttonCode === "ok") {
									item.set("content", controlData.text.value);
								}
							},
							["ok", "cancel"],
							this,
							controlConfig,
							{defaultButton: 0}
						);
					}
					break;
				case "addColumnCallback":
					var item = collection.find(itemId);
					if (item) {
						var controlConfig = {
							text: {
								dataValueType: Terrasoft.DataValueType.TEXT,
								caption: "Content",
								value: item.get("content")
							}
						};
						Terrasoft.utils.inputBox(
							Ext.String.format("Item '{0}' setting", item.get("content")),
							function(buttonCode, controlData) {
								if (buttonCode === "ok") {
									item.set("content", controlData.text.value);
								} else {
									collection.removeByKey(itemId);
								}
							},
							["ok", "cancel"],
							this,
							controlConfig,
							{defaultButton: 0}
						);
					}
					break;
			}
		}
	});
	Ext.define("Terrasoft.GridLayoutEditItemModel", {
		extend: "Terrasoft.BaseViewModel",
		columns: {
			itemId: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.GUID
			},
			column: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.NUMBER
			},
			colSpan: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.NUMBER
			},
			row: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.NUMBER
			},
			rowSpan: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.NUMBER
			},
			imageConfig: {
				type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		}
	});
	var getIntersectionPosition = function(cells) {
		var cellEl = Ext.get(cells[0].id);
		return {
			row: parseInt(cellEl.getAttribute("data-row-index"), 10),
			column: parseInt(cellEl.getAttribute("data-column-index"), 10)
		};
	};
	var showDropHint = function(model, intersection) {
		var gridLayoutEditSelection = model.get("Seleсtion");
		if (!gridLayoutEditSelection || gridLayoutEditSelection.row !== intersection.row ||
				gridLayoutEditSelection.rowSpan !== intersection.rowSpan ||
				gridLayoutEditSelection.column !== intersection.column ||
				gridLayoutEditSelection.colSpan !== intersection.colSpan) {
			model.set("Seleсtion", null);
			model.set("Seleсtion", intersection);
		}
	};
	Ext.define("Terrasoft.ViewModelSchemaDesignerItem", {
		extend: "Terrasoft.DraggableContainer",
		alternateClassName: "Terrasoft.ViewModelSchemaDesignerItem",
		dragActionsCode: 1,

		/**
   * The identifier of the element.
   * @type {String}
   */
		itemId: null,

		/**
   * Configuration of the element picture
   * @type {Object}
   */
		imageConfig: null,

		/**
   * The content of the element.
   * @type {String}
   */
		content: null,

		/**
   * The flag of displaying of the delete button.
   * @type {Boolean}
   */
		isRemoveButtonVisible: false,

		/**
   * A sign of using the item.
   * @type {Boolean}
   */
		isUsed: false,

		/**
   * The object of the element's template parameters in the grid.
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
			'<div id="{id}-view-model-schema-designer-item-wrap" data-used="{isUsed}" class="{wrapClasses}">',
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
					'<div class="view-model-schema-designer-item-content-right-image"></div>',
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
   * Applies the settings for the control template.
   * @protected
   * @param {Object} tplData Parameter object of the control's rendering template.
   * @param {String} configNodeName  The name of the object property of the configuration template.
   */
		applyTplConfigProperties: function(tplData, configNodeName) {
			Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
				tplData[propertyName] = propertyValue;
			}, this);
		},

		/**
   * Applies the control's template classes.
   * @protected
   * @param {Object} tplData Parameter object of the control's rendering template.
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
			var tplData = this.callParent(arguments);
			this.applyTplClasses(tplData);
			tplData.hasContent = !!this.content;
			tplData.isRemoveButtonVisible = this.isRemoveButtonVisible;
			tplData.isUsed = this.isUsed;
			tplData.hasIcon = !!this.imageConfig;
			if (this.imageConfig) {
				tplData.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
			}
			tplData.content = Terrasoft.encodeHtml(this.content);
			return tplData;
		},

		/**
   * The click handler for the action element.
   * @protected
   * @param {String} tag Tag of the action.
   * @param {String} itemId Element Id.
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
			this.addEvents(
				/**
     * @event beforeColumnChange
     * Works before the column changes.
     */
				"itemActionClick",
				/**
     * @event
     * An incorrect drag and drop event.
     */
				"invalidDrop",
				/**
     * @event
     * Drag-and-drop event above insertion area.
     */
				"dragOver",
				/**
     * @event
     * Drag-and-drop event.
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
				content: {
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
				}
			};
			Ext.apply(itemBindConfig, bindConfig);
			return itemBindConfig;
		},

		/**
   * Set the value of the item ID.
   * @param {Number} value The index of the string.
   */
		setItemId: function(value) {
			if (this.itemId === value) {
				return;
			}
			this.itemId = value;
		},

		/**
   * Sets the content value.
   * @param {Number} value String Id.
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
   * Sets the display of the delete button.
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
   * Sets the image settings object.
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
		* Sets the image settings object.
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
		}
	});
	var gridLayoutEdit1Model = Ext.create("Terrasoft.GridLayoutEditModel", {
		values: {
			Rows: 8,
			Columns: 24,
			BindCollection: new Terrasoft.BaseViewModelCollection()
		}
	});
	var gridLayoutEdit2Model = Ext.create("Terrasoft.GridLayoutEditModel", {
		values: {
			Rows: 8,
			Columns: 24,
			BindCollection: new Terrasoft.BaseViewModelCollection()
		}
	});
	return {
		"render": function(renderTo) {
			var gridLayoutEdit1 = Ext.create("Terrasoft.GridLayoutEdit", {
				items: {
					bindTo: "BindCollection"
				},
				selection: {
					bindTo: "Seleсtion"
				},
				selectedItems: {
					bindTo: "SelectedItems"
				},
				useManualSelection: true,
				autoHeight: true,
				minRows: 6,
				columns: 24,
				itemActions: [
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: "edit",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/grid-layout-edit/icon_Edit.png"
						}
					},
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						tag: "remove",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/grid-layout-edit/CancelButtonImage.png"
						}
					}
				],
				allowItemsIntersection: false,
				changePositionForIntersectedItems: true,
				getGroupName: function() {
					return "GridLayoutEdit1Demo";
				},
				itemActionClick: {
					bindTo: "onItemActionClick"
				}
			});
			var gridLayoutEdit2 = Ext.create("Terrasoft.GridLayoutEdit", {
				items: {
					bindTo: "BindCollection"
				},
				selection: {
					bindTo: "Seleсtion"
				},
				selectedItems: {
					bindTo: "SelectedItems"
				},
				useManualSelection: true,
				rows: 6,
				columns: 24,
				itemActions: [
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.GREY,
						tag: "edit",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/grid-layout-edit/icon_Edit.png"
						}
					},
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.RED,
						tag: "remove",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/grid-layout-edit/CancelButtonImage.png"
						}
					}
				],
				allowItemsIntersection: false,
				changePositionForIntersectedItems: true,
				getGroupName: function() {
					return "GridLayoutEdit2Demo";
				},
				itemActionClick: {
					bindTo: "onItemActionClick"
				}
			});
			var getDesignerItems = function() {
				var items = [];
				for(var i = 1; i <= 6; i++) {
					for (var j = 1; j <= 6; j++) {
						items.push(getDesignItemConfig({
							id: Ext.String.format("designItem{0}{1}", i, j),
							caption: Ext.String.format("Item: {0}x{1}", i, j),
							rowSpan: i,
							colSpan: j
						}));
					}
				}
				return items;
			};
			var getDesignItemConfig = function(config) {
				var result = {
					className: "Terrasoft.ViewModelSchemaDesignerItem",
					"id": config.id,
					"selectors": {
						"wrapEl": "#" + config.id
					},
					content: config.caption,
					getGroupName: function() {
						return ["GridLayoutEdit1Demo", "GridLayoutEdit2Demo"];
					},
					getDraggableConfig: function() {
						var draggableConfig = {};
						draggableConfig[Terrasoft.DragAction.MOVE] = {
							handlers: {
								onDragDrop: function(event, cells) {
									var droppableInstance = cells[0].droppableInstance;
									if (droppableInstance) {
										droppableInstance.model.onItemActionClick("addColumnCallback",
												droppableInstance.model.addItem(config.caption));
									}
									this.reRender();
								},
								onDragOver: function(event, cells) {
									Ext.dd.DragDropManager.dragCurrent.resetConstraints();
									var intersectionPosition = getIntersectionPosition(cells);
									var intersection = {
										column: intersectionPosition.column,
										row: intersectionPosition.row,
										rowSpan: config.rowSpan,
										colSpan: config.colSpan
									};
									var droppableInstance = cells[0].droppableInstance;
									if (droppableInstance) {
										showDropHint(droppableInstance.model, intersection);
									}
								}
							}
						};
						return draggableConfig;
					}
				};
				return result;
			};
			Ext.create("Terrasoft.Container", {
				"id": "elementsContainer",
				"selectors": {
					"wrapEl": "#elementsContainer"
				},
				renderTo: renderTo,
				styles: {
					wrapStyles: {
						position: "fixed",
						left: "11%",
						top: "12px",
						"overflow-y": "scroll",
						height: "500px",
						border: "1px solid #b4c1d2",
						width: "290px"
					}
				},
				items: getDesignerItems()
			});
			Ext.create("Terrasoft.Container", {
				styles: {
					wrapStyles: {
						"padding-left": "300px",
						width: "calc(100%-300px)",
						height: "100%"
					}
				},
				renderTo: renderTo,
				items: [
					{
						className: "Terrasoft.Container",
						"id": "gridLayoutEdit1Container",
						"selectors": {
							"wrapEl": "#gridLayoutEdit1Container"
						},
						styles: {
							wrapStyles: {
								padding: "3px",
								margin: "3px"
							}
						},
						items: [
							{
								className: "Terrasoft.Container",
								"id": "gridLayoutEdit1ToolsContainer",
								"selectors": {
									"wrapEl": "#gridLayoutEdit1ToolsContainer"
								},
								styles: {
									wrapStyles: {
										padding: "3px",
										"margin-bottom": "3px"
									}
								},
								items: [
									{
										className: "Terrasoft.Button",
										caption: "+",
										style: Terrasoft.controls.ButtonEnums.style.BLUE,
										onClick: function() {
											gridLayoutEdit1Model.addItem();
										}
									}
								]
							}
						]
					},
					{
						className: "Terrasoft.Container",
						"id": "gridLayoutEdit2Container",
						"selectors": {
							"wrapEl": "#gridLayoutEdit2Container"
						},
						styles: {
							wrapStyles: {
								padding: "3px",
								margin: "3px"
							}
						},
						items: [
							{
								className: "Terrasoft.Container",
								"id": "gridLayoutEdit2ToolsContainer",
								"selectors": {
									"wrapEl": "#gridLayoutEdit2ToolsContainer"
								},
								styles: {
									wrapStyles: {
										padding: "3px",
										"margin-bottom": "3px"
									}
								},
								items: [
									{
										className: "Terrasoft.Button",
										caption: "+",
										style: Terrasoft.controls.ButtonEnums.style.BLUE,
										onClick: function() {
											gridLayoutEdit2Model.addItem();
										}
									}
								]
							}
						]

					}
				]
			});
			gridLayoutEdit1.bind(gridLayoutEdit1Model);
			gridLayoutEdit1.render(Ext.get("gridLayoutEdit1Container"));
			gridLayoutEdit2.bind(gridLayoutEdit2Model);
			gridLayoutEdit2.render(Ext.get("gridLayoutEdit2Container"));
		}
	};
});