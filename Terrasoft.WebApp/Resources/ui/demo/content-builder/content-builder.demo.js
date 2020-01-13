Terrasoft.isDebug = true;
Terrasoft.DataValueTypeRange = {};
Terrasoft.DataValueTypeRange.INTEGER = {};
Terrasoft.DataValueTypeRange.INTEGER.minValue = -2147483648;
Terrasoft.DataValueTypeRange.INTEGER.maxValue = 2147483647;

define(["ext-base", "terrasoft", "draggable-container", "droppable", "grid-layout"],
	function(Ext, Terrasoft) {

		Ext.define("Terrasoft.ContentBlockPreview", {
			extend: "Terrasoft.DraggableContainer",

			dragActionsCode: 1,

			dragCopy: true,

			/**
    * The object of the template parameters for the element in the grid.
    * @protected
    * @type {Object}
    */
			tplConfig: {
				classes: {
					wrapClasses: ["content-block-preview-wrap"],
					htmlClasses: ["content-block-preview-html"]
				}
			},

			/**
			 * @inheritdoc Terrasoft.component#tpl
			 * @overridden
			 */
			tpl: [
				/* jshint ignore:start */
				'<div id="{id}-content-block-preview-wrap" class="{wrapClasses}">',
				'<div class="{htmlClasses}">{content}</div>',
				'</div>'
				/* jshint ignore:end */
			],

			moveUnder: null,

			showDropZoneHint: true,

			content: "",

			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
					"ondragover",
					"ondragdrop"
				);
			},

			/**
    * Applies the parameters of the control template.
    * @protected
    * @param {Object} tplData The object of the  parameters of control's rendering template.
    * @param {String} configNodeName The name of the property of the configuration template object.
    */
			applyTplConfigProperties: function(tplData, configNodeName) {
				Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
					tplData[propertyName] = propertyValue;
				}, this);
			},

			/**
    * Applies the control's template classes.
    * @protected
    * @param {Object} tplData The parameter object of the control's rendering template.
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
					wrapEl: Ext.String.format("#{0}-content-block-preview-wrap", this.id)
				};
				var tplData = this.callParent(arguments);
				this.applyTplClasses(tplData);
				tplData.content = this.content;
				return tplData;
			},

			getGroupName: function() {
				return ["ContentBlank"];
			},

			/**
    * Returns the object of additional parameters for initializing the drag element.
    * @protected
    * @return {Object} The object of additional parameters for initializing the drag element.
    */
			getDraggableElementDefaultConfig: function() {
				return {
					isTarget: true,
					instance: this,
					tag: this.tag
				};
			},

			getDraggableConfig: function() {
				var draggableConfig = {};
				draggableConfig[Terrasoft.DragAction.MOVE] = {
					handlers: {
						onDragOver: "onDragOver",
						onDragDrop: "onDragDrop"
					}
				};
				return draggableConfig;
			},

			onDragOver: function(event, crossedBlocks) {
				var crossedBlock = crossedBlocks[0];
				if (!crossedBlock.droppableInstance) {
					this.fireEvent("ondragover", crossedBlock.config.tag);
				}
			},

			onDragDrop: function() {
				this.reRender();
				this.fireEvent("ondragdrop");
			}

		});

		Ext.define("Terrasoft.ContentElementModel", {
			extend: "Terrasoft.BaseViewModel",

			invertConverter: function(value) {
				return !value;
			},

			/**
			 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
			 * @overridden
			 */
			getViewConfig: function() {
				return {
					"className": "Terrasoft.BaseContentElement",
					"selected": {bindTo: "Selected"},
					"items": [{
						className: "Terrasoft.Label",
						caption: {bindTo: "Text"},
						visible: {
							bindTo: "Selected",
							bindConfig: {converter: "invertConverter"}
						}
					}, {
						className: "Terrasoft.MemoEdit",
						value: {bindTo: "Text"},
						visible: {bindTo: "Selected"}
					}],
					tools: [{
						className: "Terrasoft.Button",
						caption: "ok",
						style: Terrasoft.controls.ButtonEnums.style.GREEN,
						click: {bindTo: "okClick"}
					}]
				};
			},

			init: function() {
				this.set("Selected", false);
			},

			okClick: function() {
				this.set("Selected", false);
			}

		});

		Ext.define("Terrasoft.ContentBlockModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ClassName: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "ClassName",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				Content: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Content",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				Id: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Id",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				}
			},

			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
					"ondragover",
					"ondragdrop"
				);
			},

			onDragOver: function() {
				this.fireEvent("change", this, {
					event: "ondragover",
					arguments: arguments
				});
			},

			onDragDrop: function() {
				this.fireEvent("change", this, {
					event: "ondragdrop",
					arguments: arguments
				});
			},

			init: function() {
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				collection.on("itemChanged", this.onItemChanged, this);
				this.set("Selected", false);
				this.on("change:Selected", this.onSelectedChanged, this);
				this.set("collection", collection);
				var tag = this.get("SourceTagName");
				this.addItem(tag + "_FirstItem");
				this.addItem(tag + "_SecondItem");
			},

			onSelectedChanged: function(itemId) {
				if ((!Ext.isString(itemId) || Ext.isEmpty(itemId)) && this.get("Selected")) {
					return;
				}
				var collection = this.get("collection");
				collection.each(function(contentItem) {
					if (contentItem.get("Id") !== itemId) {
						contentItem.set("Selected", false);
					}
				}, this);
			},

			onItemChanged: function(item) {
				if (!item.get("Selected")) {
					return;
				}
				this.set("Selected", true);
				var itemId = item.get("Id");
				this.onSelectedChanged(itemId);
			},

			addItem: function(text) {
				var collection = this.get("collection");
				var id = Terrasoft.generateGUID();
				var count = collection.getCount();
				var newItem = Ext.create("Terrasoft.ContentElementModel", {
					values: {
						Column: (count % 2) * 12,
						Id: id,
						Row: Math.round((count + 1) / 2) - 1,
						Text: text,
						ColSpan: 12,
						RowSpan: 1
					}
				});
				newItem.init();
				collection.add(id, newItem);
			},

			/**
    * Generates an element view configuration object.
    * @return {Object} View configuration object.
    */
			getViewConfig: function() {
				var id = this.get("Id");
				return {
					"className": "Terrasoft.ContentBlock",
					"items": {bindTo: "collection"},
					"selected": {bindTo: "Selected"},
					"tag": id,
					"id": id,
					"ondragover": {bindTo: "onDragOver"},
					"ondragdrop": {bindTo: "onDragDrop"},
					"groupName": ["ContentBlank"],
					"tools": [
						{
							className: "Terrasoft.Button",
							id: id + "dragg-el",
							style: Terrasoft.controls.ButtonEnums.style.GREY,
							imageConfig: {
								source: Terrasoft.ImageSources.URL,
								url: "./resources/demo/content-builder/images/icon-move.png"
							}
						}, {
							className: "Terrasoft.Button",
							id: id + "dragg-el0",
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							caption: "+"
						}, {
							className: "Terrasoft.Button",
							id: id + "dragg-el1",
							style: Terrasoft.controls.ButtonEnums.style.RED,
							caption: "X"
						}
					],
					"getDraggableConfig": function() {
						var draggableConfig = {};
						draggableConfig[Terrasoft.DragAction.MOVE] = {
							autoGenerateDraggableElement: false,
							elementId: this.id + "dragg-el-wrapperEl",
							handlers: {
								b4StartDrag: "b4StartDrag",
								onDragEnter: "onDragEnter",
								onDragDrop: "onDragDrop"
							}
						};
						draggableConfig[Terrasoft.DragAction.RESIZE_BOTTOM] = {
							handlers: {
								b4StartDrag: "b4ResizeBottomStartDrag",
								onDrag: Terrasoft.emptyFn,
								onDragDrop: "reRender",
								onInvalidDrop: "reRender"
							}
						};
						return draggableConfig;
					}
				};
			}
		});

		Ext.define("Terrasoft.ContentSheetModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ReorderableIndex: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "ReorderableIndex",
					dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
				},
				ViewModelItems: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "ViewModelItems",
					dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
				},
				Selected: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Selected",
					dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
				},
				Placeholder: {
					type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Placeholder",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				}
			},
			indexOf: function(key) {
				var viewModelItems = this.get("ViewModelItems");
				var viewModelItemsKeys = viewModelItems.getKeys();
				return viewModelItemsKeys.indexOf(key);
			},
			addItem: function(viewModelItem) {
				var viewModelItemId = viewModelItem.get("Id");
				var viewModelItems = this.get("ViewModelItems");
				var itemIndex = this.indexOf(viewModelItemId);
				var reorderableIndex = this.get("ReorderableIndex");
				if (!Ext.isEmpty(reorderableIndex)) {
					viewModelItems.removeByKey(viewModelItemId);
					if (itemIndex === -1 || (reorderableIndex <= itemIndex)) {
						reorderableIndex += 1;
					}
					viewModelItems.insert(reorderableIndex, viewModelItemId, viewModelItem);
				} else if (itemIndex === -1) {
					viewModelItems.add(viewModelItemId, viewModelItem);
				} else {
					return false;
				}
				this.set("ReorderableIndex", null);
				return true;
			},
			onPreviewDragOver: function(overItemTag) {
				this.set("ReorderableIndex", null);
				var indexOf = this.indexOf(overItemTag);
				this.set("ReorderableIndex", indexOf);
			},
			onPreviewDragDrop: function(tag) {
				var viewModelItem = Ext.create("Terrasoft.ContentBlockModel", {
					values: {
						Id: Terrasoft.generateGUID(),
						SourceTagName: tag
					}
				});
				viewModelItem.init();
				this.addItem(viewModelItem);
			},
			onItemDragOver: function(overItemTag) {
				this.set("ReorderableIndex", null);
				var indexOf = this.indexOf(overItemTag);
				this.set("ReorderableIndex", indexOf);
			},
			onItemDragDrop: function(itemId) {
				var viewModelItems = this.get("ViewModelItems");
				var viewModelItem = viewModelItems.get(itemId);
				this.addItem(viewModelItem);
			},
			init: function() {
				var items = Ext.create("Terrasoft.BaseViewModelCollection");
				items.on("itemChanged", this.itemChanged, this);
				this.set("ViewModelItems", items);
			},
			itemChanged: function(item, config) {
				if (config.event) {
					switch (config.event) {
						case "ondragover":
							this.onItemDragOver.apply(this, config.arguments);
							break;
						case "ondragdrop":
							this.onItemDragDrop.apply(this, config.arguments);
							break;
					}
				} else {
					if (!item.get("Selected")) {
						return;
					}
					var itemId = item.get("Id");
					var collection = this.get("ViewModelItems");
					collection.each(function(contentItem) {
						if (contentItem.get("Id") !== itemId) {
							contentItem.set("Selected", false);
						}
					}, this);
				}
			},
			onEditClick: function() {
				var selected = this.get("Selected");
				this.set("Selected", !selected);
			}
		});

		return {
			contentSheetModel: null,

			init: function() {
				this.contentSheetModel = Ext.create("Terrasoft.ContentSheetModel", {
					values: {
						Placeholder: "Перетащите блок"
					}
				});
				this.contentSheetModel.init();
			},

			"render": function(renderTo) {

				var generateContentBlockPreviewConfig = function(name) {
					var content = "<div style='color: #d3d3d3;'>A mostly-internal function to generate " +
						"callbacks collection, returning the desired result — either identity, an arbitrary callback, a " +
						"property matcheror a property accessor.</div>";
					return {
						className: "Terrasoft.ContentBlockPreview",
						content: name + " " + content + " ",
						tag: name,
						ondragover: {bindTo: "onPreviewDragOver"},
						ondragdrop: {bindTo: "onPreviewDragDrop"}
					};
				};
				var generateContentBlockPreview = function() {
					var result = [];
					for (var i = 0; i < 20; i++) {
						result.push(generateContentBlockPreviewConfig("block" + i));
					}
					return result;
				};
				var contentSheet = {
					className: "Terrasoft.ContentSheet",
					viewModelItems: {bindTo: "ViewModelItems"},
					selected: {bindTo: "Selected"},
					reorderableIndex: {bindTo: "ReorderableIndex"},
					placeholder: {bindTo: "Placeholder"},
					getGroupName: function() {
						return "ContentBlank";
					}
				};
				var gridLayout = Ext.create("Terrasoft.GridLayout", {
					id: "grid-layout-0",
					items: [
						{
							row: 0,
							rowSpan: 1,
							column: 0,
							colSpan: 6,
							item: {
								className: "Terrasoft.Container",
								id: "blockLibraryContainer",
								styles: {
									wrapStyle: {
										border: "1px solid silver",
										height: "600px",
										padding: "3px",
										"overflow-y": "scroll"
									}
								},
								items: generateContentBlockPreview()
							}
						}, {
							row: 0,
							rowSpan: 1,
							column: 6,
							colSpan: 18,
							item: {
								className: "Terrasoft.Container",
								id: "sheetContainer",
								styles: {
									wrapStyle: {
										height: "800px",
										padding: "3px",
										"margin-left": "40px"
									}
								},
								items: contentSheet
							}
						}
					]
				});

				gridLayout.bind(this.contentSheetModel);
				gridLayout.render(renderTo);
			}
		};
	});
