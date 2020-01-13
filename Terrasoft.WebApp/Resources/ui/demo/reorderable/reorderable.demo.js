Terrasoft.DataValueTypeRange = {};
Terrasoft.DataValueTypeRange.INTEGER = {};
Terrasoft.DataValueTypeRange.INTEGER.minValue = -2147483648;
Terrasoft.DataValueTypeRange.INTEGER.maxValue = 2147483647;

define(["ext-base", "terrasoft", "draggable", "droppable", "grid-layout", "label"],
	function(Ext, Terrasoft) {

		// region Creating a container with the ability to change the position of elements
		Ext.define("Terrasoft.ReorderableContainer", {
			extend: "Terrasoft.Container",
			styles: {
				wrapStyles: {
					width: "600px",
					height: "800px",
					padding: "3px",
					border: "1px solid silver",
					"overflow-y": "scroll"
				}
			},

			mixins: {
				reorderable: "Terrasoft.Reorderable",
				droppable: "Terrasoft.Droppable"
			},

			// region Connecting the Droppable mixiin functionality
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterRender.apply(this, arguments);
				this.mixins.reorderable.onAfterRender.apply(this, arguments);
			},
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.droppable.onAfterReRender.apply(this, arguments);
				this.mixins.reorderable.onAfterReRender.apply(this, arguments);
			},
			onDestroy: function() {
				this.mixins.droppable.onDestroy.apply(this, arguments);
				this.mixins.reorderable.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},
			//endregion

			// region Connecting the Mixin functionality Reinderable
			getBindConfig: function() {
				var reorderableBindConfig = this.mixins.reorderable.getBindConfig.apply(this, arguments);
				var parentBindConfig = Ext.apply(reorderableBindConfig, this.callParent(arguments));
				return Ext.apply(parentBindConfig, {});
			},
			getItemConfig: function(viewModelItem) {
				var self = this;
				return {
					className: "Terrasoft.ReorderableItem",
					caption: {
						bindTo: "Caption"
					},
					id: viewModelItem.get("Id"),
					ondragenter: {
						bindTo: "onDragEnter"
					},
					ondragdrop: {
						bindTo: "onDragDrop"
					},
					ondragout: {
						bindTo: "onDragOut"
					},
					getGroupName: function() {
						return [self.getGroupName()];
					}
				}
			},
			subscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.subscribeForCollectionEvents.apply(this, arguments);
			},
			unSubscribeForCollectionEvents: function() {
				this.callParent(arguments);
				this.mixins.reorderable.unSubscribeForCollectionEvents.apply(this, arguments);
			}
			//endregion

		});
		//endregion

		// region Creating an element with the Draggable capabilities
		Ext.define("Terrasoft.ReorderableItem", {
			extend: "Terrasoft.Label",
			mixins: {
				draggable: "Terrasoft.Draggable"
			},
			// region Connecting the Dragxable Mixin functionality
			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
					"ondragenter",
					"ondragout",
					"ondragdrop"
				);
			},
			dragActionsCode: 1,
			dragCopy: false,
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.draggable.onAfterRender.apply(this, arguments);
			},
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.draggable.onAfterReRender.apply(this, arguments);
			},
			onDestroy: function() {
				this.mixins.draggable.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},
			getDraggableConfig: function() {
				var draggableConfig = {};
				draggableConfig[Terrasoft.DragAction.MOVE] = {
					handlers: {
						onDragOver: "onDragEnter",
						onDragOut: "onDragOut",
						onDragDrop: "onDragDrop"
					}
				};
				return draggableConfig;
			},
			onDragEnter: function(event, crossedBlocks) {
				Terrasoft.each(crossedBlocks, function(crossedBlock) {
					if (!crossedBlock.droppableInstance) {
						this.fireEvent("ondragenter", crossedBlock.id);
						return false;
					}
				}, this);
			},
			onDragOut: function() {
				this.fireEvent("ondragout");
			},
			onDragDrop: function() {
				this.reRender();
				this.fireEvent("ondragdrop");
			},
			getDraggableElementDefaultConfig: function() {
				return {
					isTarget: true,
					instance: this,
					tag: this.tag
				};
			}
			// endregion
		});
		//endregion

		// region Create a container model with the ability to change the position of elements
		Ext.define("Terrasoft.ReorderableModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ReorderableIndex: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "ReorderableIndex",
					dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
				},
				ViewModelItems: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "ViewModelItems",
					dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
				}
			}
		});
		//endregion

		// region Create a container item model with the ability to change the position
		Ext.define("Terrasoft.ReorderableItemModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ReorderableModel: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "ReorderableModel",
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				},
				Caption: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "Caption",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				Id: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "Id",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				}
			},
			onDragEnter: function(crossedItemId) {
				var reorderableModel = this.get("ReorderableModel");
				reorderableModel.set("ReorderableIndex", null);
				var parentCollection = this.parentCollection;
				var parentCollectionKeys = parentCollection.getKeys();
				var indexOf = parentCollectionKeys.indexOf(crossedItemId);
				if (indexOf === -1) {
					indexOf = crossedItemId ? -1 : null;
				}
				reorderableModel.set("ReorderableIndex", indexOf);
			},
			onDragOut: function() {
				var reorderableModel = this.get("ReorderableModel");
				reorderableModel.set("ReorderableIndex", null);
			},
			onDragDrop: function() {
				var reorderableModel = this.get("ReorderableModel");
				var reorderableIndex = reorderableModel.get("ReorderableIndex");
				reorderableModel.set("ReorderableIndex", null);
				var viewModelItems = this.parentCollection;
				var viewModelItemId = this.get("Id");
				var viewModelItemsKeys = viewModelItems.getKeys();
				var itemIndex = viewModelItemsKeys.indexOf(viewModelItemId);
				if (!Ext.isEmpty(reorderableIndex)) {
					viewModelItems.removeByKey(viewModelItemId);
					if (itemIndex === -1 || (reorderableIndex <= itemIndex)) {
						reorderableIndex += 1;
					}
					viewModelItems.insert(reorderableIndex, viewModelItemId, this);
				} else if (itemIndex === -1) {
					viewModelItems.add(viewModelItemId, this);
				} else {
					return false;
				}
				this.set("ReorderableIndex", null);
				return true;
			}
		});
		//endregion

		return {

			render: function(renderTo) {
				var reorderableModel = Ext.create("Terrasoft.ReorderableModel", {
					values: {
						ViewModelItems: Ext.create("Terrasoft.BaseViewModelCollection")
					}
				});
				var reorderableContainer = {
					className: "Terrasoft.ReorderableContainer",
					viewModelItems: {bindTo: "ViewModelItems"},
					reorderableIndex: {bindTo: "ReorderableIndex"},
					getGroupName: function() {
						return "ReorderableContainer";
					}
				};
				var gridLayout = Ext.create("Terrasoft.GridLayout", {
					id: "grid-layout-0",
					items: [
						{
							row: 0,
							rowSpan: 1,
							column: 0,
							colSpan: 23,
							item: {
								className: "Terrasoft.Container",
								id: "ReorderableContainerDemo",
								items: [
									reorderableContainer
								]
							}
						}
					]
				});
				gridLayout.bind(reorderableModel);
				gridLayout.render(renderTo);
				(function initReorderableModelItems()  {
					var collection = reorderableModel.get("ViewModelItems");
					for (var i = 0; i < 20; i++) {
						var id = Terrasoft.generateGUID();
						collection.add(id, Ext.create("Terrasoft.ReorderableItemModel", {
							values: {
								ReorderableModel: reorderableModel,
								Caption: "ReorderableItem #" + i,
								Id: id
							}
						}));
					}
				})();
			}

		};

	});
