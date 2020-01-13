Terrasoft.configuration.Structures["SubscriberCommunicationItem"] = {innerHierarchyStack: ["SubscriberCommunicationItem"]};
define('SubscriberCommunicationItemStructure', ['SubscriberCommunicationItemResources'], function(resources) {return {schemaUId:'937de656-e201-4b71-9fbc-db96ecbfe9ab',schemaCaption: "Communication option type schema for the found object", parentSchemaName: "", schemaName:'SubscriberCommunicationItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SubscriberCommunicationItem", ["terrasoft"],
	function(Terrasoft) {
		return {
			attributes: {

				/**
				 * ############# ######## #####.
				 * @private
				 * @type {String}
				 */
				"Id": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ### ######## #####.
				 * @private
				 * @type {String}
				 */
				"Type": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ##### ########.
				 * @private
				 * @type {String}
				 */
				"Number": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * ############# ########.
				 * @private
				 * @type {String}
				 */
				"SubscriberId": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
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
				},

				/**
				 * Sign that indicates is connection to telephony server available.
				 * @private
				 * @type {Boolean}
				 */
				"IsTelephonyAvailable": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": true
				}

			},
			methods: {

				/**
				 * ######### ###### ## ####### ######## #####.
				 * @protected
				 */
				makeCall: function() {
					var ctiModel = this.get("CtiModel");
					var number = this.get("Number");
					var entitySchemaName = ctiModel.getEntitySchemaNameBySubscriberType(this.get("Type"));
					var subscriberInfo = {
						number: number,
						customerId: this.get("SubscriberId"),
						entitySchemaName: entitySchemaName
					};
					ctiModel.set("AdvisedIdentifiedSubscriberInfo", subscriberInfo);
					ctiModel.callByNumber(number);
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "CommunicationContainer",
					"values": {
						"id": "CommunicationContainer",
						"selectors": {"wrapEl": "#CommunicationContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"markerValue": {"bindTo": "Type"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CommunicationTypeLabel",
					"parentName": "CommunicationContainer",
					"propertyName": "items",
					"values": {
						"id": "CommunicationTypeLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["label-caption"]},
						"markerValue": {"bindTo": "Type"},
						"caption": {"bindTo": "Type"}
					}
				},
				{
					"operation": "insert",
					"name": "Number",
					"parentName": "CommunicationContainer",
					"propertyName": "items",
					"values": {
						"id": "Number",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {"labelClass": ["communication-number"]},
						"markerValue": {"bindTo": "Number"},
						"caption": {"bindTo": "Number"}
					}
				},
				{
					"operation": "insert",
					"name": "CallButton",
					"parentName": "CommunicationContainer",
					"propertyName": "items",
					"values": {
						"enabled": {"bindTo": "IsTelephonyAvailable"},
						"id": "CallButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.MakeCallButtonIcon"},
						"classes": {"wrapperClass": "communication-call-button"},
						"markerValue": {"bindTo": "Number"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"click": {"bindTo": "makeCall"}
					}
				}
			]
		};
	});


