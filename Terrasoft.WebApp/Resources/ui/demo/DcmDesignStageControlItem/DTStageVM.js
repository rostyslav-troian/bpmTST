define("DTStageVM", ["ext-base", "terrasoft", "base-view-model", "reorderable-container-view-model-mixin", "DTStage",
	"DTStageElementVM"], function(Ext, Terrasoft) {
		/**
		 * Design time stage view model.
		 */
		return Ext.define("Terrasoft.DTStageVM", {
			extend: "Terrasoft.BaseViewModel",

			mixins: {
				ReorderableContainerVMMixin: "Terrasoft.ReorderableContainerVMMixin",
				ReorderableItemVMMixin: "Terrasoft.ReorderableItemVMMixin"
			},

			columns: {
				/**
				 * Stage add button style.
				 * @type {String}
				 */
				AddButtonStyle: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
					value: Terrasoft.enums.DTStage.AddButtonStyle.INNER_ARROW
				},

				/**
				 * Stage wrap custom class name.
				 * @type {String}
				 */
				StageClassName: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},

				/**
				 * Stage header color.
				 * @type {String}
				 */
				StageColor: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
					value: null
				},

				AddStageButtonImageConfig: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				},

				AddButtonMenuItems: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
				},

				DefaultAddItemUId: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.GUID
				},

				NewItemCaption: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				}
			},

			// TODO: CRM-25663
			itemsCount: 0,

			parentViewModel: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.mixins.ReorderableItemVMMixin.preInit.call(this);
				this.mixins.ReorderableContainerVMMixin.preInit.call(this);
				this.initEvents();
				var stageItem = this.createStageItem();
				this.addItem(stageItem);
				var stageItem2 = this.createStageItem();
				this.addItem(stageItem2);
				this.initStageColumns();
				this.set("DefaultAddItemUId", "1340899d-e279-4fb3-9ffb-5a0af786db88");
				this.initAddButtonMenuItems();
			},

			initEvents: function() {
				this.on("change:DefaultAddItemUId", this.onDefaultAddItemUIdChange, this);
			},

			onDefaultAddItemUIdChange: function() {
				var defaultAddItemUId = this.get("DefaultAddItemUId");
				var managerItem = this.getDcmSchemaElementManagerItemByUId(defaultAddItemUId);
				this.set("AddStageButtonImageConfig", managerItem.imageConfig);
			},

			initAddButtonMenuItems: function() {
				var addButtonMenuItems = Ext.create("Terrasoft.BaseViewModelCollection");
				this.set("AddButtonMenuItems", addButtonMenuItems);
				this.fillAddButtonMenuItems(addButtonMenuItems);
			},

			onAddButtonMenuItemClick: function(uId) {
				this.set("DefaultAddItemUId", uId);
			},

			fillAddButtonMenuItems: function(addButtonMenuItems) {
				addButtonMenuItems.clear();
				var items = this.getDcmSchemaElementManagerItems();
				Terrasoft.each(items, function(managerItem) {
					var taskMenuItem = Ext.create("Terrasoft.BaseViewModel", {
						values: {
							Id: managerItem.uId,
							Tag: managerItem.uId,
							Caption: managerItem.caption,
							ImageConfig: managerItem.imageConfig,
							Click: {
								bindTo: "onAddButtonMenuItemClick"
							}
						}
					});
					addButtonMenuItems.add(taskMenuItem);
				}, this);
			},

			getDcmSchemaElementManagerItemByUId: function(uId) {
				var foundItem = null;
				var items = this.getDcmSchemaElementManagerItems();
				Terrasoft.each(items, function(managerItem) {
					if (managerItem.uId === uId) {
						foundItem = managerItem;
						return false;
					}
					return true;
				}, this);
				return foundItem;
			},

			getDcmSchemaElementManagerItems: function() {
				return [
					{
						uId: "1340899d-e279-4fb3-9ffb-5a0af786db88",
						caption: "Activity",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "http://files.vector-images.com/clipart/flag_1.gif"
						}
					},
					{
						uId: "04912d5d-2421-4427-8632-b5675ddfba83",
						caption: "Email",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "http://flagsystem.ua/var/media/images/store/products/image_577.png"
						}
					},
					{
						uId: "fdad57a7-6adf-4b1b-a378-dbdbbaeb52e6",
						caption: "SubProcess",
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "http://www.iconsearch.ru/uploads/icons/crystalclear/128x128/flag.png"
						}
					}
				];
			},

			onAddNewStageItem: function() {
				var defaultAddItemUId = this.get("DefaultAddItemUId");
				var managerItem = this.getDcmSchemaElementManagerItemByUId(defaultAddItemUId);
				var newItemCaption = managerItem.caption + ": " + this.get("NewItemCaption");
				var stageItem = this.createStageItem(newItemCaption);
				this.addItem(stageItem);
				this.set("NewItemCaption", "");
			},

			initStageColumns: function() {
				var name = this.get("Name");
				this.set("StageClassName", name);
			},

			/**
			 * Creates stage item with default Name and Id properties.
			 * @return {Terrasoft.DTStageElementVM} Stage item.
			 */
			createStageItem: function(caption) {
				var name = this.get("Name");
				var itemsCount = this.itemsCount++;
				var itemName = caption ? caption : name + "_Item_" + itemsCount;
				// TODO: CRM-25663
				return Ext.create("Terrasoft.DTStageElementVM", {
					values: {
						Id: name + "_Item_" + itemsCount,//Terrasoft.generateGUID(),
						Name: itemName
					}
				});
			},

			/**
			 * Set stage add button style handler. Sets passed style to current stage.
			 */
			onSetStageAddButtonStyle: function() {
				var addButtonStyle = Array.prototype.pop.call(arguments);
				this.set("AddButtonStyle", addButtonStyle);
			},

			/**
			 * Adds new item to stage.
			 */
			onAddStageItem: function() {
				var stageItem = this.createStageItem();
				this.addItem(stageItem);
			},

			onAddButtonClick: function(tag) {
				var parentViewModel = this.parentViewModel;
				var index = parentViewModel.indexOf(tag);
				var stage = parentViewModel.createItem();
				parentViewModel.insertItem(stage, ++index);
			},

			/**
			 * Returns module view configuration.
			 * @protected
			 * @return {Object} Module view configuration.
			 */
			getViewConfig: function() {
				return {
					className: "Terrasoft.DTStage",
					groupName: "dcm-stages",
					tag: this.get("Id"),
					id: this.get("Id"),
					headerColorWarpClassName: this.get("StageClassName"),
					addButtonClick: {
						bindTo: "onAddButtonClick"
					},
					addButtonStyle: {
						bindTo: "AddButtonStyle"
					},
					headerColor: {
						bindTo: "StageColor"
					},
					classes: {
						wrapClassName: ["dcm-stage-wrap"]
					},
					tools: [
						{
							className: "Terrasoft.Label",
							caption: {
								bindTo: "Name"
							}
						}
					],
					items: [
						{
							className: "Terrasoft.Button",
							caption: "Arrow",
							tag: Terrasoft.enums.DTStage.AddButtonStyle.INNER_ARROW,
							click: {
								bindTo: "onSetStageAddButtonStyle"
							}
						},
						{
							className: "Terrasoft.Button",
							caption: "Button",
							tag: Terrasoft.enums.DTStage.AddButtonStyle.INNER_ROUNDED,
							click: {
								bindTo: "onSetStageAddButtonStyle"
							}
						},
						{
							className: "Terrasoft.Button",
							caption: "InnerButton",
							tag: Terrasoft.enums.DTStage.AddButtonStyle.OUTER_ROUNDED,
							click: {
								bindTo: "onSetStageAddButtonStyle"
							}
						},
						{
							className: "Terrasoft.ColorButton",
							value: {
								bindTo: "StageColor"
							}
						},
						{
							className: "Terrasoft.Button",
							caption: "Add item",
							click: {
								bindTo: "onAddStageItem"
							}
						},
						{
							className: "Terrasoft.ReorderableContainer",
							tag: this.get("Id"),
							align: Terrasoft.enums.ReorderableContainer.Align.VERTICAL,
							dropGroupName: "dcm-stage-items",
							groupName: "dcm-stage-items",
							classes: {
								wrapClassName: ["dcm-stage-items"]
							},
							viewModelItems: {
								bindTo: "ViewModelItems"
							},
							reorderableIndex: {
								bindTo: "ReorderableIndex"
							},
							onDragEnter: {
								bindTo: "onDragOver"
							},
							onDragOver: {
								bindTo: "onDragOver"
							},
							onDragDrop: {
								bindTo: "onDragDrop"
							},
							onDragOut: {
								bindTo: "onDragOut"
							}
						},
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["add-dcm-stage-item"]
							},
							items: [
								{
									className: "Terrasoft.Button",
									style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
									imageConfig: {
										bindTo: "AddStageButtonImageConfig"
									},
									tag: "addStageItem",
									menu: {
										tag: "addItemMenu",
										ulClass: "add-button-menu",
										items: {
											bindTo: "AddButtonMenuItems"
										}
									}
								},
								{
									className: "Terrasoft.TextEdit",
									enterkeypressed: {
										bindTo: "onAddNewStageItem"
									},
									value: {
										bindTo: "NewItemCaption"
									}
								}
							]
						}
					]
				};
			},

			/**
			 * Clears reorderable index.
			 * @private
			 */
			clearReorderableIndex: function() {
				this.mixins.ReorderableContainerVMMixin.clearReorderableIndex.call(this);
				var viewModelCollection = this.parentCollection;
				if (viewModelCollection) {
					viewModelCollection.each(function(viewModel) {
						viewModel.set("ReorderableIndex", null);
					}, this);
				}
			},

			/**
			 * Finds items collection by key.
			 * @protected
			 * @param {String} key Item id.
			 * @return {Terrasoft.BaseViewModelCollection|null}
			 */
			findViewModeCollectionByKey: function(key) {
				var result = this.mixins.ReorderableContainerVMMixin.findViewModeCollectionByKey.call(this);
				if (!result) {
					var viewModelCollection = this.parentCollection;
					viewModelCollection.each(function(viewModel) {
						var collection = viewModel.get("ViewModelItems");
						if (collection.contains(key)) {
							result = collection;
							return false;
						}
					}, this);
				}
				return result;
			}
		});
	}
);

