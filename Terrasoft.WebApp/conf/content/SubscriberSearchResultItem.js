Terrasoft.configuration.Structures["SubscriberSearchResultItem"] = {innerHierarchyStack: ["SubscriberSearchResultItem"]};
define('SubscriberSearchResultItemStructure', ['SubscriberSearchResultItemResources'], function(resources) {return {schemaUId:'4619e417-2904-479a-9cfe-024854c40b99',schemaCaption: "Found subscriber schema", parentSchemaName: "", schemaName:'SubscriberSearchResultItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SubscriberSearchResultItem", ["terrasoft", "CtiConstants", "NetworkUtilities"],
	function(Terrasoft, CtiConstants, NetworkUtilities) {
		return {
			attributes: {

				/**
				 * ############# ########.
				 * @private
				 * @type {String}
				 */
				"Id": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ### ########.
				 * @private
				 * @type {String}
				 */
				"Type": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ### ########.
				 * @private
				 * @type {String}
				 */
				"Name": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ############# #### ########.
				 * @private
				 * @type {String}
				 */
				"Photo": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ########### ########.
				 * @private
				 * @type {String}
				 */
				"Department": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ########## ########.
				 * @private
				 * @type {String}
				 */
				"AccountName": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ######### ########.
				 * @private
				 * @type {String}
				 */
				"Job": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ### ###########, ##### ####### ############### ### ##########.
				 * @private
				 * @type {String}
				 */
				"AccountType": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ##### ########.
				 * @private
				 * @type {String}
				 */
				"City": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ######### ####### ####### ##### ########.
				 * @private
				 * @type {Terrasoft.Collection}
				 */
				"SubscriberCommunications": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * ###### CTI ######.
				 * @private
				 * @type {Terrasoft.CtiModel}
				 */
				"CtiModel": {
					"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				}

			},
			methods: {

				//region Methods: Private

				/**
				 * ###### ############ ######## ######### ####### ####### ##### ######## ### ###### ########## ######.
				 * @private
				 * @param {Object} item ####### ######### ####### ####### ##### ########.
				 */
				getCommunicationPanelViewConfig: function(item) {
					var ctiModel = this.get("CtiModel");
					var panelView = ctiModel.communicationPanelView;
					var view = ctiModel.get(panelView);
					item.config = Terrasoft.deepClone(view);
				},

				/**
				 * Returns schema name by type.
				 * @private
				 * @return {String} Schema name.
				 */
				getTypeSchemaName: function() {
					var subscriberType = this.get("Type");
					var ctiModel = this.get("CtiModel");
					return (!this.Ext.isEmpty(subscriberType) && !this.Ext.isEmpty(ctiModel))
						? ctiModel.getEntitySchemaNameBySubscriberType(subscriberType)
						: null;
				},

				//endregion

				//region Methods: Protected

				/**
				 * ########## ############ ########### # #### ######## ### ####### ###########.
				 * @protected
				 * @returns {Object} ############ ###########.
				 */
				getPhoto: function() {
					var subscriberType = this.get("Type");
					var photoId = this.get("Photo");
					if (subscriberType === CtiConstants.SubscriberTypes.Account) {
						return this.get("Resources.Images.AccountIdentifiedPhoto");
					}
					if (Ext.isEmpty(photoId) || this.Terrasoft.isEmptyGUID(photoId)) {
						return this.get("Resources.Images.ContactEmptyPhotoWhite");
					}
					var photoConfig =  {
						source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
						params: {
							schemaName: "SysImage",
							columnName: "Data",
							primaryColumnValue: photoId
						}
					};
					return {
						source: Terrasoft.ImageSources.URL,
						url: Terrasoft.ImageUrlBuilder.getUrl(photoConfig)
					};
				},

				/**
				 * ##########, ######## ## ####### #######, # ########### ## ### #######.
				 * @protected
				 * @param {String} captionValue ######## #######.
				 * @return {Boolean} ####### #####.
				 */
				getIsDataLabelVisible: function(captionValue) {
					return !Ext.isEmpty(captionValue);
				},

				/**
				 * Indicates 'Account' data label is visible.
				 * @protected
				 * @param {String} captionValue Data label value.
				 * @return {Boolean}
				 */
				getIsAccountDataLabelVisible: function(captionValue) {
					if (!this.getIsDataLabelVisible(captionValue)) {
						return false;
					}
					return this.get("Type") !== CtiConstants.SubscriberTypes.Employee;
				},

				/**
				 * ########## ####### # ######## ########## ######## ### ###########.
				 * @protected
				 */
				onNameClick: function() {
					var schemaName = this.getTypeSchemaName();
					if (schemaName) {
						var hash = NetworkUtilities.getEntityUrl(schemaName, this.get("Id"));
						this.sandbox.publish("PushHistoryState", {hash: hash});
					}
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.MiniPageUtilities#linkMouseOver
				 * @overridden
				 */
				linkMouseOver: function(options) {
					if (options && options.targetId) {
						var entitySchemaName = this.getTypeSchemaName();
						var config = {
							columnName: "Id",
							targetId: options.targetId,
							entitySchemaName: entitySchemaName
						};
						this.openMiniPage(config);
					}
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "SubscriberSearchResultItemContainer",
					"values": {
						"id": "SubscriberSearchResultItemContainer",
						"selectors": {"wrapEl": "#SubscriberSearchResultItemContainer"},
						"markerValue": {"bindTo": "Name"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["subscriber-search-result-item-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Photo",
					"parentName": "SubscriberSearchResultItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "getPhoto"},
						"classes": {"wrapperClass": ["subscriber-photo"]},
						"markerValue": "Photo",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "SubscriberDataContainer",
					"parentName": "SubscriberSearchResultItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["subscriber-data-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"classes": {"hyperlinkClass": ["subscriber-name"]},
						"markerValue": {"bindTo": "Name"},
						"caption": {"bindTo": "Name"},
						"click": {"bindTo": "onNameClick"},
						"linkMouseOver": {bindTo: "linkMouseOver"}
					}
				},
				{
					"operation": "insert",
					"name": "AccountName",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["subscriber-data"]},
						"markerValue": {"bindTo": "AccountName"},
						"caption": {"bindTo": "AccountName"},
						"visible": {
							"bindTo": "AccountName",
							"bindConfig": {"converter": "getIsAccountDataLabelVisible"}
						},
						"hint": {"bindTo": "AccountName"}
					}
				},
				{
					"operation": "insert",
					"name": "Department",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["subscriber-data"]},
						"markerValue": {"bindTo": "Department"},
						"caption": {"bindTo": "Department"},
						"visible": {
							"bindTo": "Department",
							"bindConfig": {"converter": "getIsDataLabelVisible"}
						},
						"hint": {"bindTo": "Department"}
					}
				},
				{
					"operation": "insert",
					"name": "Job",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["subscriber-data"]},
						"markerValue": {"bindTo": "Job"},
						"caption": {"bindTo": "Job"},
						"visible": {
							"bindTo": "Job",
							"bindConfig": {"converter": "getIsDataLabelVisible"}
						},
						"hint": {"bindTo": "Job"}
					}
				},
				{
					"operation": "insert",
					"name": "AccountType",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["subscriber-data"]},
						"markerValue": {"bindTo": "AccountType"},
						"caption": {"bindTo": "AccountType"},
						"visible": {
							"bindTo": "AccountType",
							"bindConfig": {"converter": "getIsDataLabelVisible"}
						},
						"hint": {"bindTo": "AccountType"}
					}
				},
				{
					"operation": "insert",
					"name": "City",
					"parentName": "SubscriberDataContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["subscriber-data"]},
						"markerValue": {"bindTo": "City"},
						"caption": {"bindTo": "City"},
						"visible": {
							"bindTo": "City",
							"bindConfig": {"converter": "getIsDataLabelVisible"}
						},
						"hint": {"bindTo": "City"}
					}
				},
				{
					"operation": "insert",
					"name": "CommunicationItemsListContainer",
					"parentName": "SubscriberSearchResultItemContainer",
					"propertyName": "items",
					"values": {
						"id": "CommunicationItemsListContainer",
						"itemType": Terrasoft.ViewItemType.GRID,
						"markerValue": "CommunicationItemsListContainer",
						"selectors": {"wrapEl": "#CommunicationItemsListContainer"},
						"idProperty": "Id",
						"collection": {"bindTo": "SubscriberCommunications"},
						"onGetItemConfig": {"bindTo": "getCommunicationPanelViewConfig"},
						"classes": {"wrapClassName": ["communications-control-group"]},
						"generator": "CtiContainerListGenerator.generatePartial"
					}
				}
			]
		};
	});


