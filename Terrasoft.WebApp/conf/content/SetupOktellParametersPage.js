Terrasoft.configuration.Structures["SetupOktellParametersPage"] = {innerHierarchyStack: ["SetupOktellParametersPage"], structureParent: "BaseSetupTelephonyParametersPage"};
define('SetupOktellParametersPageStructure', ['SetupOktellParametersPageResources'], function(resources) {return {schemaUId:'2e0ec7fd-beda-4997-933d-cd6995f3e482',schemaCaption: "Oktell parameters setup page", parentSchemaName: "BaseSetupTelephonyParametersPage", schemaName:'SetupOktellParametersPage',parentSchemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetupOktellParametersPage", ["terrasoft", "SetupCallCenterUtilities"],
	function(Terrasoft, SetupCallCenterUtilities) {
		return {
			attributes: {

				/**
				 * ##### ####### Oktell.
				 * @type {String}
				 */
				"OktellServerAddress": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				},

				/**
				 * #####.
				 * @type {String}
				 */
				"Login": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				},

				/**
				 * ######.
				 * @type {String}
				 */
				"Password": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				},

				/**
				 * #######, ############ ######### ## ############# #######.
				 * @type {Boolean}
				 */
				"IsSipAutoAnswerHeaderSupported": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {

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
						"OktellServerAddress": "url",
						"Login": "login",
						"Password": "password",
						"IsSipAutoAnswerHeaderSupported": "isSipAutoAnswerHeaderSupported"
					});
				}
			},
			diff: [
				{
					"operation": "insert",
					"index": 1,
					"parentName": "controlsContainerBottom",
					"propertyName": "items",
					"name": "IsSipAutoAnswerHeaderSupported",
					"values": {
						"hint": "Resources.Strings.IsSipAutoAnswerHeaderSupportedHint",
						"generator": "SetupCallCenterUtilities.generateBottomCheckBoxControl"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "OktellServerAddress",
					"values": {
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "Login",
					"values": {
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "Password",
					"values": {
						"protect": true,
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				}
			]
		};
	});


