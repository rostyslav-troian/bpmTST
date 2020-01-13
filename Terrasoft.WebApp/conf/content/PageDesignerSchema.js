Terrasoft.configuration.Structures["PageDesignerSchema"] = {innerHierarchyStack: ["PageDesignerSchema"], structureParent: "ViewModelSchemaDesignerSchema"};
define('PageDesignerSchemaStructure', ['PageDesignerSchemaResources'], function(resources) {return {schemaUId:'bf6bfbcc-6f1c-4b12-b3fb-688bfa992267',schemaCaption: "PageDesignerSchema", parentSchemaName: "ViewModelSchemaDesignerSchema", schemaName:'PageDesignerSchema',parentSchemaUId:'f6a3d8d0-3407-4b93-9b69-24bb7d4998c1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ViewModelSchemaDesignerSchema
 */
define("PageDesignerSchema", ["ModalBox", "PageDesignerButtonItemModel", "css!ElementPropertiesModule"
], function(ModalBox) {
	return {
		messages: {
			"GetDesignSchema": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"SaveButtonConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * Page header caption.
			 * @type {String}
			 */
			"PageHeaderCaption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ""
			},
			/**
			 * Collection of process action buttons.
			 */
			"ProcessActionButtons": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Current editing designed schema element.
			 */
			"ActionLayoutItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * Flag that indicates whether current editing button is new or not.
			 */
			"IsNewButton": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Button reorderable index.
			 */
			"ButtonReorderableIndex": {
				dataValueType: Terrasoft.DataValueType.INTEGER
			},
			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#createEntityDataModel
			 * @override
			 */
			"SupportParametersDataModel": {
				value: true
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_updateHeader: function() {
				var schema = this.$PageSchema;
				if (schema) {
					this.$PageHeaderCaption = schema.caption && schema.caption.getValue() || schema.name;
				}
			},

			/**
			 * @private
			 */
			_subscribeSchemaChanged: function() {
				this.$PageSchema.on("changed", this._updateHeader, this);
			},

			/**
			 * @private
			 */
			_initProcessActionButtons: function(callback, scope) {
				var container = this.getSchemaViewItem("ProcessActionButtons");
				var items = this.$ProcessActionButtons = new Terrasoft.BaseViewModelCollection();
				if (!container) {
					Ext.callback(callback, scope);
					return;
				}
				var buttons = Terrasoft.filter(container.items, {itemType: Terrasoft.ViewItemType.BUTTON});
				Terrasoft.each(buttons, function(config) {
					var visible = this._getButtonConfigVisible(config);
					if (visible) {
						var modelValues = this._getButtonModelValues(config);
						var model = this._createButtonModel(modelValues);
						items.add(config.name, model);
					}
				}, this);
				items.on("move", this.onMoveButton, this);
				var parameter = this.$PageSchema.findParameterByName("Buttons");
				if (parameter) {
					this._applyButtonsParameterInfo(parameter);
				}
				Ext.callback(callback, scope);
			},

			/**
			 * @private
			 */
			_applyButtonsParameterInfo: function(parameter) {
				var value = Terrasoft.decode(parameter.getValue() || "{}");
				var parameterButtons = value && value.$values || [];
				parameterButtons.forEach(function(info) {
					var button = this.$ProcessActionButtons.findByFn(function(item) {
						return item.$Tag === info.Tag.value;
					}, this);
					if (button) {
						button.$Caption = info.Caption ? info.Caption.value : "";
						button.$PerformClosePage = !!info.PerformClosePage && info.PerformClosePage.value === "True";
						button.$PerformSaveData = !!info.PerformSaveData && info.PerformSaveData.value === "True";
						button.$GenerateSignal = info.GenerateSignal ? info.GenerateSignal.value : "";
					}
				}, this);
			},

			/**
			 * @private
			 */
			_createButtonModel: function(modelValues) {
				var model = new Terrasoft.PageDesignerButtonItemModel({
					designSchema: this,
					values: modelValues,
					methods: {
						"onEditClick": this._onEditPageDesignerButtonItemModel,
						"onRemoveClick": this._onRemovePageDesignerButtonItemModel,
						"onSelect": this._onSelectPageDesignerButtonItemModel
					}
				});
				return model;
			},

			/**
			 * @private
			 */
			_getButtonModelValues: function(config) {
				var values = {};
				var properties = ["Id", "Name", "Tag", "Caption", "Style", "Enabled"];
				properties.forEach(function(property) {
					values[property] = this._getButtonConfigProperty(config, property);
				}, this);
				return values;
			},

			/**
			 * @private
			 */
			_getButtonConfigCaption: function(config) {
				var captionResourcesName = this.getCaptionResourcesName(config.name);
				var noCaptionResourceName = "Resources.Strings.NoCaptionButtonCaption";
				return this.get(captionResourcesName) || config.caption || this.get(noCaptionResourceName);
			},

			/**
			 * @private
			 */
			_getButtonConfigEnabled: function(config) {
				var isEnabledBoolean = Ext.isDefined(config.enabled) && Ext.isBoolean(config.enabled);
				return isEnabledBoolean ? config.enabled : true;
			},

			/**
			 * @private
			 */
			_getButtonConfigVisible: function(config) {
				var isVisibleBoolean = Ext.isDefined(config.visible) && Ext.isBoolean(config.visible);
				return isVisibleBoolean ? config.visible : true;
			},

			/**
			 * @private
			 */
			_getButtonConfigStyle: function(config) {
				return config.style || Terrasoft.controls.ButtonEnums.style.DEFAULT;
			},

			/**
			 * @private
			 */
			_getButtonConfigProperty: function(config, property) {
				var result;
				switch (property) {
					case "Id":
						result = config.id || Terrasoft.generateGUID();
						break;
					case "Name":
						result = config.name;
						break;
					case "Tag":
						result = config.tag || config.name;
						break;
					case "Caption":
						result = this._getButtonConfigCaption(config);
						break;
					case "Style":
						result = this._getButtonConfigStyle(config);
						break;
					case "Enabled":
						result = this._getButtonConfigEnabled(config);
						break;
					default:
						throw new Terrasoft.UnsupportedTypeException();
				}
				return result;
			},

			/**
			 * @private
			 */
			_onEditPageDesignerButtonItemModel: function() {
				this.designSchema.$ActionLayoutItem = this;
				this.designSchema.$IsNewButton = false;
				this.designSchema._loadButtonPropertiesPage();
			},

			/**
			 * @private
			 */
			_onRemovePageDesignerButtonItemModel: function() {
				var diff = [{
					"operation": "remove",
					"name": this.$Name
				}];
				var designSchema = this.designSchema;
				var actionButtons = designSchema.$ProcessActionButtons;
				actionButtons.remove(this);
				designSchema.onSchemaChanged(diff);
			},

			/**
			 * @private
			 */
			_insertButtonModel: function(item) {
				var autoBindColumns = Terrasoft.filterObject(item.columns, {"autoBind": true});
				var values = _.mapObject(autoBindColumns, function(column, columnName) {
					return item.get(columnName);
				}, this);
				var model = this._createButtonModel(values);
				this.$ProcessActionButtons.add(item.$Name, model);
				model.onSelect();
			},

			/**
			 * @private
			 */
			_insertButton: function() {
				var item = this.$ActionLayoutItem;
				this._insertButtonModel(item);
				var diff = {
					"operation": "insert",
					"parentName": "ProcessActionButtons",
					"propertyName": "items",
					"name": item.$Name,
					"index": this.$ProcessActionButtons.getCount(),
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"id": item.$Id,
						"style": item.$Style,
						"tag": item.$Tag,
						"caption": {"bindTo": "getProcessActionButtonCaption"},
						"click": {"bindTo": "onProcessActionButtonClick"},
						"enabled": item.$Enabled
					}
				};
				this.onSchemaChanged([diff]);
			},

			/**
			 * @private
			 */
			_mergeButton: function() {
				var item = this.$ActionLayoutItem;
				var diff = {
					"operation": "merge",
					"name": item.$Name,
					"values": {
						"id": item.$Id,
						"style": item.$Style,
						"tag": item.$Tag,
						"caption": {"bindTo": "getProcessActionButtonCaption"},
						"click": {"bindTo": "onProcessActionButtonClick"},
						"enabled": item.$Enabled
					}
				};
				this.onSchemaChanged([diff]);
			},

			/**
			 * @private
			 */
			_onSelectPageDesignerButtonItemModel: function() {
				Terrasoft.each(this.designSchema.$ProcessActionButtons, function(button) {
					button.$Selected = button.$Name === this.$Name;
				}, this);
			},

			/**
			 * @private
			 */
			_loadButtonPropertiesPage: function() {
				var sandbox = this.sandbox;
				var moduleId = this.getButtonModuleId();
				var modalBoxClass = "button-properties-page";
				var modalBoxConfig = {
					widthPixels: 356,
					heightPixels: 550,
					boxClasses: ["base-element-properties-page", modalBoxClass]
				};
				var maskId = Terrasoft.Mask.show();
				var modalBox = this.getModalBox();
				var renderTo = modalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId);
				}, this);
				Terrasoft.Mask.hide(maskId);
				maskId = Terrasoft.Mask.show({selector: "#" + renderTo.id});
				var config = {
					id: moduleId,
					renderTo: renderTo.id,
					instanceConfig: {
						schemaName: "ButtonPropertiesPage",
						maskId: maskId
					}
				};
				sandbox.loadModule("ElementPropertiesModule", config);
			},

			/**
			 * @private
			 */
			_createButtonDraggableItem: function() {
				return new Terrasoft.SchemaButtonDesignToolItem({
					designItemClassName: "Terrasoft.PageDesignerButtonItemModel",
					caption: this.get("Resources.Strings.NewElementButtonCaption"),
					values: {
						Name: "Button",
						draggableGroupNames: ["ProcessActionButtons_ReorderableContainer"]
					},
					sandbox: {id: this.sandbox.id}
				});
			},

			/**
			 * @private
			 */
			_addButtonToDesignSchema: function(item) {
				this.$ActionLayoutItem = item.createDesignItem(this);
				this.$IsNewButton = true;
				this._loadButtonPropertiesPage();
			},

			/**
			 * @private
			 */
			_createButtonsParameter: function() {
				var parameter = new Terrasoft.ClientUnitSchemaParameter({
					name: "Buttons",
					caption: new Terrasoft.LocalizableString(this.get("Resources.Strings.ButtonsParameterCaption")),
					dataValueType: Terrasoft.DataValueType.LOCALIZABLE_PARAMETER_VALUES_LIST
				});
				this.$PageSchema.parameters.add(parameter.uId, parameter);
				return parameter;
			},

			/**
			 * @private
			 */
			_saveButtonsParameter: function() {
				var parameter = this.$PageSchema.findParameterByName("Buttons");
				if (!parameter) {
					parameter = this._createButtonsParameter();
				}
				var values = this.$ProcessActionButtons.mapArray(function(item) {
					return {
						ItemUId: item.$Id,
						Id: {
							value: item.$Id
						},
						Name: {
							value: item.$Name
						},
						Tag: {
							value: item.$Tag
						},
						Caption: {
							isLczValue: true,
							value: item.$Caption
						},
						PerformClosePage: {
							value: item.$PerformClosePage ? "True" : "False"
						},
						PerformSaveData: {
							value: item.$PerformSaveData ? "True" : "False"
						},
						GenerateSignal: {
							value: item.$GenerateSignal || ""
						}
					};
				}, this);
				parameter.setLocalizableParameterValues(values);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					if (!this.canDesignSchema()) {
						Ext.callback(callback, scope);
						return;
					}
					this.sandbox.subscribe("GetDesignSchema", function() {
						return this;
					}, this);
					this._updateHeader();
					this.$IsSeparateMode = true;
					this._subscribeSchemaChanged();
					this.initNewElementDraggableItems();
					this.initElements(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#createEntityDataModel
			 * @override
			 */
			createEntityDataModel: function() {
				var viewModel = this.callParent(arguments);
				viewModel.set("IsDataModelMenuVisible", true);
				return viewModel;
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#canDesignSchema
			 * @override
			 */
			canDesignSchema: function() {
				return this.callParent(arguments) || this.isReadOnly;
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#canRemoveTab
			 * @override
			 */
			canRemoveTab: function(tabName) {
				return Boolean(tabName) && this.$TabsCollection.getCount() > 0;
			},

			/**
			 * Returns module identifier for button properties page.
			 * @protected
			 * @return {String}
			 */
			getButtonModuleId: function() {
				return this.sandbox.id + "_button";
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SaveButtonConfig", this.onSaveButtonConfig, this, [this.getButtonModuleId()]);
			},

			/**
			 * @inheritdoc BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				var schema = this.$PageSchema;
				if (schema) {
					schema.un("changed", this._updateHeader, this);
				}
				var buttons = this.$ProcessActionButtons;
				if (buttons) {
					buttons.un("move", this.onMoveButton, this);
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#saveDesignData
			 * @override
			 */
			saveDesignData: function() {
				this._saveButtonsParameter();
				this.callParent(arguments);
			},

			/**
			 * Handler for SaveButtonConfig message.
			 * @protected
			 */
			onSaveButtonConfig: function() {
				if (this.$IsNewButton) {
					this._insertButton();
				} else {
					this._mergeButton();
				}
			},

			/**
			 * Handler for move button of ProcessActionButtons collection.
			 * @protected
			 * @param {Number} positionFrom Position move from.
			 * @param {Number} positionTo Position move to.
			 * @param {String} key Item key.
			 */
			onMoveButton: function(positionFrom, positionTo, key) {
				if (positionFrom === positionTo) {
					return;
				}
				var diff = {
					"operation": "move",
					"name": key,
					"parentName": "ProcessActionButtons",
					"propertyName": "items",
					"index": positionTo
				};
				this.onSchemaChanged([diff]);
			},

			/**
			 * Init collection of new elements for drag and drop.
			 * @protected
			 */
			initNewElementDraggableItems: function() {
				var collection = new Terrasoft.BaseViewModelCollection();
				var buttonItem = this._createButtonDraggableItem();
				collection.add(Terrasoft.generateGUID(), buttonItem);
				collection.on("itemChanged", this.onElementDraggableItemChanged, this);
				var dataModel = this.$DataModels.get("Elements");
				dataModel.set("NewElementDraggableItems", collection);
			},

			/**
			 * Draggable item change event handler.
			 * @protected
			 * @param {Terrasoft.SchemaDesignToolItem} item Draggable item.
			 * @param {Object} config Event config.
			 */
			onElementDraggableItemChanged: function(item, config) {
				if (config.operation === "DragDrop") {
					this._addButtonToDesignSchema(item);
				}
			},

			/**
			 * Init designed schema view elements.
			 * @protected
			 */
			initElements: function(callback, scope) {
				this._initProcessActionButtons(callback, scope);
			},

			/**
			 * Handler for ProcessActionButtons mouse down event. Clears buttons selection.
			 * @protected
			 */
			onProcessActionButtonsMouseDown: function() {
				this.$ProcessActionButtons.each(function(button) {
					button.$Selected = false;
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.ViewModelSchemaDesignerSchema#getDetailEntitySchema
			 * @override
			 */
			getDetailEntitySchema: function() {
				return this.get("PageSchema");
			},

			// endregion

			// region Methods: Public

			/**
			 * Handler change header.
			 * @param {String} caption Caption
			 */
			onHeaderChange: function(caption) {
				this.$PageSchema.setLocalizableStringPropertyValue("caption", caption);
				var stepCaption = this.get("Resources.Strings.PageDesignerStepCaption");
				document.title = Ext.String.format("{0}: {1}", caption, stepCaption);
			},

			/**
			 * Return ModalBox instance.
			 * @return {Terrasoft.ModalBox}
			 */
			getModalBox: function() {
				return ModalBox;
			}

			// endregion

		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		infoDiff: [],
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "DesignContainer",
				"name": "MainHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "mainHeaderContainer",
					"selectors": {"wrapEl": "#mainHeaderContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["main-header", "fixed"],
					"items": [],
					"tips": []
				}
			},
			{
				"operation": "insert",
				"name": "RightHeaderContainer",
				"parentName": "MainHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "right-header-container",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["right-header-container-class"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PageHeaderContainer",
				"parentName": "RightHeaderContainer",
				"propertyName": "items",
				"values": {
					"id": "PageHeaderContainer",
					"selectors": {"wrapEl": "#PageHeaderContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["page-header-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PageHeaderCaption",
				"parentName": "PageHeaderContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"itemType": Terrasoft.ViewItemType.TEXT,
					"markerValue": "PageHeaderCaption",
					"change": {"bindTo": "onHeaderChange"},
					"controlConfig": {"className": "Terrasoft.TextEdit"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


