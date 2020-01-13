Terrasoft.configuration.Structures["ContentBlockDesigner"] = {innerHierarchyStack: ["ContentBlockDesigner"]};
define('ContentBlockDesignerStructure', ['ContentBlockDesignerResources'], function(resources) {return {schemaUId:'299c4dcf-6680-4a3a-84cf-cfc0ceb5da4a',schemaCaption: "ContentBlockDesigner", parentSchemaName: "", schemaName:'ContentBlockDesigner',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentBlockDesigner", ["css!ContentBlockDesignerCSS", "GridLayoutEditItemModel", "ContainerList",
	"ViewModelSchemaDesignerItem", "ContentBlockElementItemViewModel", "ContentElementManager",
	"ContentBlockToolItemViewModel", "ContentBlockElementGroupsHelper"], function() {
	return {
		messages: {
			"CloseContentBlockDesigner": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Collection of view model elements (Terrasoft.ContentBlockElementItemViewModel).
			 * @type {Terrasoft.Collection}
			 */
			Elements: {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				value: null
			},
			/**
			 * Collection of view model tools (Terrasoft.ContentBlockToolItemViewModel).
			 * @type {Terrasoft.Collection}
			 */
			Tools: {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				value: null
			},
			/**
			 * Selection items.
			 * @type {Object}
			 */
			Selection: {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				value: null
			},
			/**
			 * Initial config.
			 * @type {Object}
			 */
			InitialConfig: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Indicates if allows items intersection.
			 * @type {Boolean}
			 */
			AllowItemsIntersection: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			/**
			 * Selected items array.
			 * @type {Array}
			 */
			SelectedElements: {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				value: [],
				onChange: "_updateGroupActions"
			},
			/**
			 * Indicates if elements can be grouped.
			 * @type {Boolean}
			 */
			CanGroup: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Indicates if elements can be ungrouped.
			 * @type {Boolean}
			 */
			CanUngroup: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		properties: {
			/**
			 * Content element manager.
			 * @type {Terrasoft.ContentElementManager}
			 */
			contentElementManager: null,

			/**
			 * @private
			 */
			_contentBlockElementGroupsHelper: this.Ext.create("Terrasoft.ContentBlockElementGroupsHelper")
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getContentBuilderConfig: function() {
				let config;
				if (Ext.isEmpty(this.$InitialConfig.ItemType)) {
					config = {
						ItemType: "block",
						Items: []
					};
				} else {
					config = Ext.clone(this.$InitialConfig);
					config.Items = [];
				}
				this.$Elements.each(function(viewModel) {
					const itemConfig = viewModel.getConfig();
					config.Items.push(itemConfig);
				}, this);
				return config;
			},

			/**
			 * @private
			 */
			_initTools: function() {
				this.$Tools = new Terrasoft.BaseViewModelCollection();
				const items = this.contentElementManager.getItems();
				items.each(function(item) {
					const config = item.DesignTimeConfig;
					const itemViewModel = new Terrasoft.ContentBlockToolItemViewModel({
						DefaultConfig: item.DefaultConfig,
						values: {
							Id: item.Type,
							Caption: config.Caption,
							Icon: config.Icon,
							Size: config.Size
						}
					});
					this._subscribeItemEvents(itemViewModel);
					this.$Tools.add(item.Type, itemViewModel);
				}, this);

			},

			/**
			 * @private
			 */
			_subscribeItemEvents: function(itemViewModel) {
				itemViewModel.on("toolDragOver", this.onToolItemDragOver, this);
				itemViewModel.on("toolDragDrop", this.onToolDragDrop, this);
			},

			/**
			 * @private
			 */
			_initElements: function() {
				this.$Elements = this.Ext.create("Terrasoft.BaseViewModelCollection");
				const managerItems = this.contentElementManager.getItems();
				const config = this.$InitialConfig;
				const items = config && config.Items || [];
				items.forEach(function(item) {
					const managerItem = managerItems.get(item.ItemType);
					const designTimeConfig = managerItem.DesignTimeConfig;
					const values = {
						Caption: designTimeConfig.Caption,
						Icon: designTimeConfig.Icon,
						Type: item.ItemType,
						ColSpan: item.ColSpan,
						RowSpan: item.RowSpan || 1,
						Column: item.Column,
						Row: item.Row,
						GroupName: item.GroupName
					};
					if (item.GroupName) {
						this._contentBlockElementGroupsHelper.initElementGroup(item.GroupName);
					}
					this._addElement({
						InitialConfig: Ext.clone(item),
						Values: values
					});
				}, this);
				this.set("AllowItemsIntersection", false);
			},

			/**
			 * @private
			 */
			_addElement: function(config) {
				const id = Terrasoft.generateGUID();
				config.Values.Id = id;
				const viewModel = new Terrasoft.ContentBlockElementItemViewModel({
					InitialConfig: config.InitialConfig || {},
					values: config.Values
				});
				this.$Elements.add(id, viewModel);
			},

			/**
			 * @private
			 */
			_updateGroupActions: function() {
				this.$CanGroup = this.$SelectedElements.length > 1;
				this.$CanUngroup = this._canUngroup(this.$SelectedElements, this.$Elements);
			},

			/**
			 * @private
			 */
			_canUngroup: function(selectedElements, elements) {
				return selectedElements.length > 0 && Boolean(elements.firstOrDefault(function(item) {
					return Terrasoft.contains(selectedElements, item.$Id) && Boolean(item.$GroupName);
				}, this));
			},

			/**
			 * @private
			 */
			_revertItemMove: function(item, oldPosition) {
				if (item.$IsNew) {
					this.$Elements.remove(item);
				} else {
					item.$Row = oldPosition.row;
					item.$Column = oldPosition.column;
					item.$ColSpan = oldPosition.colSpan;
					item.$RowSpan = oldPosition.rowSpan;
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * Handler for SaveButton click.
			 */
			onSaveClick: function() {
				let config = this._getContentBuilderConfig();
				if (Ext.isEmpty(config.Items)) {
					config = this.contentElementManager.getDefaultBlockConfig();
				}
				this.sandbox.publish("CloseContentBlockDesigner", config);
			},

			/**
			 * Handler for CloseButton click.
			 */
			onCloseClick: function() {
				this.sandbox.publish("CloseContentBlockDesigner");
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.contentElementManager = new Terrasoft.ContentElementManager();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this._initTools();
					this._initElements();
					this.$Elements.on("changed", this._updateGroupActions, this);
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.$Elements.un("changed", this._updateGroupActions, this);
				this.callParent(arguments);
			},

			/**
			 * Handler of the click on the remove button of the grid element.
			 * @param {String} actionName Name of action.
			 * @param {String} itemId Unique id of grid element.
			 */
			onRemoveItemClick: function(actionName, itemId) {
				this.$Elements.removeByKey(itemId);
			},

			/**
			 *  Handler for event tool item drag over.
			 */
			onToolItemDragOver: function(itemViewModel, position) {
				this.$Selection = null;
				this.$Selection = position;
			},

			/**
			 * Adds item to collection.
			 * @param {Terrasoft.ContentBlockToolItemViewModel}toolItem Tools item view model.
			 */
			onToolDragDrop: function(toolItem) {
				const position = this.$Selection;
				const size = toolItem.$Size;
				const values = {
					Caption: toolItem.$Caption,
					Icon: toolItem.$Icon,
					ColSpan: size.ColSpan,
					RowSpan: size.RowSpan,
					Column: position.column,
					Row: position.row,
					Type: toolItem.$Id,
					IsNew: true
				};
				this._addElement({
					InitialConfig: Ext.clone(toolItem.DefaultConfig),
					Values: values
				});
			},

			/**
			 * Handler for event element move or resize.
			 * @param {String} id Item id.
			 * @param {Object} oldPosition Position and size of item before move.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope.
			 */
			onItemPositionChanged: function(id, oldPosition, callback, scope) {
				this._contentBlockElementGroupsHelper.validateGroupIntersection(id, this.$Elements, function(valid) {
					const item = this.$Elements.get(id);
					if (!valid) {
						this._revertItemMove(item, oldPosition);
					}
					item.$IsNew = false;
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Groups selected elements.
			 */
			groupElements: function() {
				this._contentBlockElementGroupsHelper.groupElements(this.$SelectedElements, this.$Elements);
			},

			/**
			 * Ungroups selected elements.
			 */
			ungroupElements: function() {
				this._contentBlockElementGroupsHelper.ungroupElements(this.$SelectedElements, this.$Elements);
				this._updateGroupActions();
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Header",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "DesignerCaption",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["t-designer-caption"]
					},
					"caption": {"bindTo": "Resources.Strings.DesignerCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"click": {"bindTo": "onSaveClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "onCloseClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "close-icon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["close-btn-user-class"]},
					"click": {"bindTo": "onCloseClick"}
				}
			},
			{
				"operation": "insert",
				"name": "Center",
				"index": 1,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["center-container"],
					"id": "centerContainer",
					"selectors": {"wrapEl": "#centerContainer"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Center",
				"name": "LeftPanel",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-panel-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftPanel",
				"propertyName": "items",
				"name": "BlockElements",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "Resources.Strings.BlockElementsCaption"},
					"imageConfig": {"bindTo": "Resources.Images.BlockElementsImage"},
					"classes": {
						"wrapperClass": ["block-elements"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftPanel",
				"name": "ToolsItemsList",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"collection": {"bindTo": "Tools"},
					"classes": {"wrapClassName": ["tools-items-list"]},
					"idProperty": "Id",
					"itemPrefix": "Tools",
					"defaultItemConfig": {
						"id": "type-item",
						"className": "Terrasoft.Container",
						"items": [
							{
								"className": "Terrasoft.ViewModelSchemaDesignerItem",
								"draggableGroupNames": "GridLayoutEdit",
								"dragCopy": false,
								"content": {
									"bindTo": "Caption"
								},
								"dragDrop": {
									"bindTo": "onDragDrop"
								},
								"dragOver": {
									"bindTo": "onDragOver"
								},
								"imageConfig": {
									"bindTo": "Icon"
								},
								"classes": {"wrapClassName": ["draggable-item"]}
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Center",
				"name": "RightPanel",
				"propertyName": "items",
				"values": {
					"id": "RightPanelContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["right-panel-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RightPanel",
				"name": "Grid",
				"propertyName": "items",
				"values": {
					"id": "GroupTools",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["grid-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "Grid",
				"name": "GridTools",
				"propertyName": "items",
				"values": {
					"id": "GroupTools",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["grid-tools-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "GridTools",
				"propertyName": "items",
				"name": "Group",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": "$Resources.Strings.GroupButtonCaption",
					"imageConfig": "$Resources.Images.GroupElements",
					"enabled": "$CanGroup",
					"click": "$groupElements"
				}
			},
			{
				"operation": "insert",
				"parentName": "GridTools",
				"propertyName": "items",
				"name": "Ungroup",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {"wrapperClass": ["content-block-ungroup-btn"]},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": "$Resources.Strings.UngroupButtonCaption",
					"imageConfig": "$Resources.Images.UngroupElements",
					"enabled": "$CanUngroup",
					"click": "$ungroupElements"
				}
			},
			{
				"operation": "insert",
				"parentName": "GridTools",
				"propertyName": "items",
				"name": "GroupInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.GroupButtonInfoText",
					"controlConfig": {
						"classes": {
							"wrapperClass": ["content-block-group-info-button"]
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Grid",
				"name": "GridLayoutEdit",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT_EDIT,
					"id": "GridLayoutEdit",
					"items": {"bindTo": "Elements"},
					"minRows": 1,
					"columns": 24,
					"useManualSelection": false,
					"groupName": "BlockDesigner",
					"selection": {"bindTo": "Selection"},
					"itemActions": [{
						"className": "Terrasoft.Button",
						"markerValue": "GridLayoutEditRemoveButton",
						"imageConfig": {"bindTo": "getRemoveButtonImage"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "removeModelItem"
					}],
					"itemActionClick": {"bindTo": "onRemoveItemClick"},
					"itemPositionChanged": "$onItemPositionChanged",
					"autoHeight": true,
					"autoWidth": false,
					"multipleSelection": true,
					"allowItemsIntersection": {"bindTo": "AllowItemsIntersection"},
					"markerValue": "GridLayoutEdit",
					"selectors": {"wrapEl": "#GridLayoutEdit"},
					"tag": "GridLayoutEdit",
					"selectedItems": "$SelectedElements",
					"itemBindingConfig": {
						"itemId": {"bindTo": "Id"},
						"markerValue": {"bindTo": "Caption"},
						"content": {"bindTo": "Caption"},
						"column": {"bindTo": "Column"},
						"colSpan": {"bindTo": "ColSpan"},
						"row": {"bindTo": "Row"},
						"rowSpan": {"bindTo": "RowSpan"},
						"imageConfig": {"bindTo": "Icon"},
						"groupName": "$GroupName"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


