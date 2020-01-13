Terrasoft.configuration.Structures["BaseProcessMiniEditPage"] = {innerHierarchyStack: ["BaseProcessMiniEditPage"]};
define('BaseProcessMiniEditPageStructure', ['BaseProcessMiniEditPageResources'], function(resources) {return {schemaUId:'da1f5a7f-0c58-4745-981b-f3772a5f00bc',schemaCaption: "BaseProcessMiniEditPage", parentSchemaName: "", schemaName:'BaseProcessMiniEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseProcessMiniEditPage", ["BaseProcessMiniEditPageResources"], function() {
	return {
		attributes: {
			/**
			 * Item identifier.
			 * @type {Terrasoft.dataValueType.GUID}
			 */
			"Id": {
				"dataValueType": this.Terrasoft.DataValueType.GUID,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Flag that indicates whether SaveButton is enabled or not.
			 */
			"ShowSaveButton": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		messages: {
			/**
			 * @message GetItemEditInfo
			 * Get item properties.
			 */
			"GetItemEditInfo": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message SaveItemInfo
			 * Save item properties.
			 */
			"SaveItemInfo": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message DiscardItemInfoChanges
			 * Discard item properties.
			 */
			"DiscardItemInfoChanges": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message SaveItem
			 * Message for save item from parent module.
			 */
			"SaveItem": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message DiscardItem
			 * Message for discard item from parent module.
			 */
			"DiscardItem": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function() {
				this.initilizeFields();
				this.subscribeMessages();
				this.callParent(arguments);
			},

			/**
			 * On mapping value change event handler. Activates save button.
			 * @protected
			 */
			onMappingValueChanged: function() {
				this.set("ShowSaveButton", true);
			},

			/**
			 * Initializes fields.
			 * @protected
			 */
			initilizeFields: function() {
				var sandbox = this.sandbox;
				var itemEditInfo = sandbox.publish("GetItemEditInfo", null, [sandbox.id]) || {};
				this.Terrasoft.each(itemEditInfo, function(itemValue, itemName) {
					this.set(itemName, itemValue, {
						silent: true
					});
				}, this);
			},

			/**
			 * Subscribes messages.
			 * @private
			 */
			subscribeMessages: function() {
				const sandbox = this.sandbox;
				sandbox.subscribe("SaveItem", this._saveItem, this, [sandbox.id]);
				sandbox.subscribe("DiscardItem", this._discardItem, this, [sandbox.id]);
			},

			/**
			 * Handles a click on the "Save" button.
			 * @protected
			 */
			onSaveClick: function() {
				this._saveItem();
			},

			/**
			 * Returns hint text for the Save button.
			 * @protected
			 * @returns {String} save button hint.
			 */
			getSaveButtonHint: function() {
				return undefined;
			},

			/**
			 * Determines whether to show save button or not.
			 * @returns {Boolean}
			 */
			getShowSaveButton: function() {
				return this.get("ShowSaveButton") && this.get("IsEditable");
			},

			/**
			 * Saves item.
			 * @private
			 * @return {Boolean} Parameter saved.
			 */
			_saveItem: function() {
				var isValid = this.validate();
				if (!isValid) {
					return false;
				}
				var itemInfo = this.generateItemInfo();
				var sandbox = this.sandbox;
				sandbox.publish("SaveItemInfo", itemInfo, [sandbox.id]);
				return true;
			},

			/**
			 * Returns item info.
			 * @protected
			 * @return {Object} Item info.
			 */
			generateItemInfo: function() {
				var columns = this.columns;
				var itemInfo = {
					IsValid: true
				};
				this.Terrasoft.each(columns, function(columnValue, columnName) {
					itemInfo[columnName] = this.get(columnName);
				}, this);
				return itemInfo;
			},

			/**
			 * Discards changes.
			 * @private
			 */
			_discardItem: function () {
				var sandbox = this.sandbox;
				sandbox.publish("DiscardItemInfoChanges", this.getIdPropertyName(), [sandbox.id]);
			},

			/**
			 * Fires message "DiscardItemInfoChanges" into base page when discard button clicked.
			 * @protected
			 */
			onDiscardChangesClick: function() {
				this._discardItem();
			},

			/**
			 * Executes system name validation.
			 * @protected
			 * @param {String} value Parameter name.
			 * @return {Object} Validation info.
			 */
			nameValidator: function(value) {
				var message = "";
				var reqExp = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
				if (!reqExp.test(value)) {
					message = this.get("Resources.Strings.WrongItemNameMessage");
				}
				return {
					invalidMessage: message
				};
			},

			/**
			 * Executes duplicate value validation info.
			 * @protected
			 * @param {String} value Changed value.
			 * @param {Object} attribute Attribute.
			 * @param {String} attribute.name Attribute name.
			 * @return {Object} Validation info.
			 */
			duplicateValueValidator: function(value, attribute) {
				var message = "";
				var attributeName = attribute.name;
				var items = this.get("ParentCollection");
				var filteredItems = items.filterByFn(function(item) {
					return item.get(attributeName) === value;
				}, this);
				var item = filteredItems.getByIndex(0);
				var idPropertyName = this.getIdPropertyName();
				if (item && (item.get(idPropertyName) !== this.get(idPropertyName))) {
					message = this.get("Resources.Strings.DuplicateItemCodeMessage");
				}
				return {
					invalidMessage: message
				};
			},

			/**
			 * Returns name of identifier property.
			 * @protected
			 * @return {String} Name of identifier property.
			 */
			getIdPropertyName: function() {
				return "Id";
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"name": "ProcessMiniEditPage",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ProcessMiniEditPageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["processminieditpage-edit-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ControlsContainer",
				"parentName": "ProcessMiniEditPageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["processminieditpage-edit-container-controls"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Controls",
				"parentName": "ControlsContainer",
				"propertyName": "items",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Actions",
				"parentName": "ProcessMiniEditPageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["actions-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Actions",
				"propertyName": "items",
				"name": "DiscardChangesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.CancelButtonCaption"
					},
					"click": {
						"bindTo": "onDiscardChangesClick"
					},
					"styles": {
						"textStyle": {
							"margin-left": "10px"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Actions",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {
						"bindTo": "Resources.Strings.SaveButtonCaption"
					},
					"click": {
						"bindTo": "onSaveClick"
					},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"enabled": {
						"bindTo": "getShowSaveButton"
					},
					"tag": "save",
					"hint": {
						"bindTo": "getSaveButtonHint"
					},
					"markerValue": "SaveButton"
				}
			}
		] /**SCHEMA_DIFF*/
	};
});


