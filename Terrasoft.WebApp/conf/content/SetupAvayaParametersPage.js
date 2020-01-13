Terrasoft.configuration.Structures["SetupAvayaParametersPage"] = {innerHierarchyStack: ["SetupAvayaParametersPage"], structureParent: "BaseSetupTelephonyParametersPage"};
define('SetupAvayaParametersPageStructure', ['SetupAvayaParametersPageResources'], function(resources) {return {schemaUId:'a129c2c1-275b-450b-b077-d85097207acf',schemaCaption: "Avaya parameters setup page", parentSchemaName: "BaseSetupTelephonyParametersPage", schemaName:'SetupAvayaParametersPage',parentSchemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetupAvayaParametersPage", ["terrasoft", "SetupCallCenterUtilities"],
	function(Terrasoft, SetupCallCenterUtilities) {
		return {
			attributes: {

				/**
				 * Agent Id.
				 * @type {String}
				 */
				"AgentId": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Agent password.
				 * @type {String}
				 */
				"AgentPassword": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Extension.
				 * @type {String}
				 */
				"Extension": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSetupTelephonyParametersPage#init.
				 * @overridden
				 */
				init: function(callback, scope) {
					this.set("PasswordColumnName", "AgentPassword");
					this.callParent(arguments);
				},

				/**
				 * ########## ###### ############ ########## #########.
				 * ##### - ######## ######### #####, ######## - ######### ###########.
				 * @protected
				 * @overridden
				 * @returns {Object} ###### ############ ########## #########.
				 */
				getConnectionParamsConfig: function() {
					var baseConnectionParams = this.callParent();
					return Ext.merge(baseConnectionParams, {
						"AgentId": "AgentId",
						"AgentPassword": "AgentPassword",
						"Extension": "Extension"
					});
				}
			},
			diff: [
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "AgentId",
					"values": {
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "AgentManagementCaution",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.AgentManagementCautionMessage"},
						"visible": {
							bindTo: 'AgentId',
							bindConfig: {
								converter: function(value) {
									return Ext.isEmpty(value);
								}
							}
						},
						"classes": {"labelClass": ["control-caution-label"]}
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "AgentPassword",
					"values": {
						"protect": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "Extension",
					"values": {
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				}
			]
		};
	});


