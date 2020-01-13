Terrasoft.configuration.Structures["SysModuleEntitySelectSinglePageModalBox"] = {innerHierarchyStack: ["SysModuleEntitySelectSinglePageModalBox"], structureParent: "BaseModalBoxPage"};
define('SysModuleEntitySelectSinglePageModalBoxStructure', ['SysModuleEntitySelectSinglePageModalBoxResources'], function(resources) {return {schemaUId:'7e23d098-7c95-4be0-8ada-3bde0db7ca74',schemaCaption: "SysModuleEntitySelectSinglePageModalBox", parentSchemaName: "BaseModalBoxPage", schemaName:'SysModuleEntitySelectSinglePageModalBox',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysModuleEntitySelectSinglePageModalBox", ["css!SysModuleEntitySelectSinglePageModalBoxCSS"], function() {
	return {
		messages: {
			/**
			 * @message PushModuleResponse
			 */
			"PushModuleResponse": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Page selected
			 */
			"PageSelected": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Type
			 */
			"Type": {
				"dataValueType": Terrasoft.DataValueType.ENUM,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true
			},

			"TypeList": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"isCollection": true
			},

			"HeaderCaption": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},

			"WarningMessage": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},

			"ControlLabelCaption": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},

			"ActionCode": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			}
		},
		methods: {

			/**
			 * Returns modal box config.
			 * @return {Object}
			 */
			getModuleInfo: function() {
				return this.get("moduleInfo");
			},

			/**
			 * Returns modal box header.
			 * @return {String}
			 */
			getHeader: function() {
				return this.get("HeaderCaption");
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.set("TypeList", new this.Terrasoft.Collection());
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#onRender.
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				var moduleInfo = this.getModuleInfo();
				var boxSizes = moduleInfo.modalBoxSize;
				var width = boxSizes.width;
				var height = boxSizes.height;
				this.set("ActionCode", moduleInfo.actionCode);
				this.set("HeaderCaption", moduleInfo.headerCaption);
				this.set("WarningMessage", moduleInfo.warningMessage);
				this.set("ControlLabelCaption", moduleInfo.controlLabelCaption);
				this.updateSize(width, height);
				this.hideBodyMask();
			},

			/**
			 * Handler save button by click.
			 * @protected
			 */
			onOkButtonClick: function() {
				if (this.validate()) {
					var type = this.get("Type");
					this.sandbox.publish("PushModuleResponse", {
						"actionCode": this.get("ActionCode"),
						"recordId": type.value
					}, [this.sandbox.id]);
					this.set("PageSelected", true);
					this.close();
				}
			},

			/**
			 * @inheritDoc Terrasoft.ModalBoxSchemaModule#close.
			 * @overridden
			 */
			close: function() {
				if (!this.get("PageSelected")) {
					this.sandbox.publish("PushModuleResponse", {
						"actionCode": this.get("ActionCode")
					}, [this.sandbox.id]);
				}
				this.callParent(arguments);
			},

			/**
			 * Method validate viewModel changes.
			 * @protected
			 * @return {Boolean}
			 */
			validate: function() {
				var type = this.get("Type");
				var isValid = true;
				if (!type || !type.value) {
					isValid = false;
				}
				return isValid;
			},

			/**
			 * Method prepared list for Type column.
			 * @protected
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list Collection.
			 */
			prepareTypeList: function(filter, list) {
				var moduleInfo = this.getModuleInfo();
				var listItems = {};
				if (moduleInfo && moduleInfo.collection) {
					moduleInfo.collection.each(function(item) {
						var id = item.get("Id");
						var type = item.get("Type");
						var caption = item.get("PreviousTypeLink");
						if (type && type.displayValue) {
							caption = type.displayValue;
						}
						listItems[id] = {
							"value": id,
							"displayValue": caption
						};
					}, this);
				}
				list.clear();
				list.loadAll(listItems);
			},

			/**
			 * Returns info image config.
			 * @protected
			 * @return {Object}
			 */
			getInfoButtonImageConfig: function() {
				var image = this.get("Resources.Images.InfoIcon");
				var imageUrl = this.Terrasoft.ImageUrlBuilder.getUrl(image);
				return {
					"source": this.Terrasoft.ImageSources.URL,
					"url": imageUrl
				};
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["modal-box-card-content-wrap", "select-single-page-modal-box"]
				}
			}, {
				"operation": "insert",
				"name": "WarningMessageContainer",
				"propertyName": "items",
				"parentName": "CardContentWrapper",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["warning-message-container"],
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "InfoButton",
				"parentName": "WarningMessageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
					"imageConfig": {"bindTo": "getInfoButtonImageConfig"}
				}
			}, {
				"operation": "insert",
				"parentName": "WarningMessageContainer",
				"propertyName": "items",
				"name": "WarningMessage",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "WarningMessage"}
				}
			}, {
				"operation": "insert",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"name": "Type",
				"values": {
					"bindTo": "Type",
					"labelConfig": {
						"caption": {"bindTo": "ControlLabelCaption"}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "prepareTypeList"},
						"list": { "bindTo": "TypeList" },
						"tag": "Type"
					}
				}
			}, {
				"operation": "insert",
				"name": "ButtonContainer",
				"propertyName": "items",
				"parentName": "CardContentWrapper",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["button-container"],
					"items": []
				}
			}, {
				"operation": "insert",
				"name": "SaveButton",
				"parentName": "ButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"click": {"bindTo": "onOkButtonClick"},
					"caption": {"bindTo": "Resources.Strings.AcceptButtonCaption"},
					"classes": {"textClass": ["tap-panel-box"]}
				}
			},
			{
				"operation": "insert",
				"name": "CancelButton",
				"parentName": "ButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
					"click": {"bindTo": "close"},
					"caption": {"bindTo": "Resources.Strings.CancelBoxButtonCaption"},
					"classes": {"textClass": ["tap-panel-box"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


