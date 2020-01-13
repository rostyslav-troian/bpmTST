Terrasoft.configuration.Structures["SetupTapiParametersPage"] = {innerHierarchyStack: ["SetupTapiParametersPage"], structureParent: "BaseSetupTelephonyParametersPage"};
define('SetupTapiParametersPageStructure', ['SetupTapiParametersPageResources'], function(resources) {return {schemaUId:'3f68851f-a693-4644-b360-e363d4a36214',schemaCaption: "TAPI parameters setup page", parentSchemaName: "BaseSetupTelephonyParametersPage", schemaName:'SetupTapiParametersPage',parentSchemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetupTapiParametersPage", ["terrasoft", "SetupCallCenterUtilities"],
	function(Terrasoft, SetupCallCenterUtilities) {
		return {
			attributes: {

				/**
				 * ### ##### TAPI.
				 * @type {String}
				 */
				"Line": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				}
			},
			methods: {

				/**
				 * ########## ###### ############ ########## #########.
				 * ##### - ######## ######### #####, ######## - ######### ###########.
				 * @private
				 * @returns {Object} ###### ############ ########## #########.
				 */
				getConnectionParamsConfig: function() {
					var baseConnectionParams = this.callParent();
					return Ext.merge(baseConnectionParams, {
						"Line": "Line"
					});
				}
			},
			diff: [
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "Line",
					"values": {
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				}
			]
		};
	});


