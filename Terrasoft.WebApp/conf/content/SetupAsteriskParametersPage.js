Terrasoft.configuration.Structures["SetupAsteriskParametersPage"] = {innerHierarchyStack: ["SetupAsteriskParametersPage"], structureParent: "BaseSetupTelephonyParametersPage"};
define('SetupAsteriskParametersPageStructure', ['SetupAsteriskParametersPageResources'], function(resources) {return {schemaUId:'cda981d0-b42a-4a92-a4f4-36b6380dea24',schemaCaption: "Asterisk parameters setup page", parentSchemaName: "BaseSetupTelephonyParametersPage", schemaName:'SetupAsteriskParametersPage',parentSchemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetupAsteriskParametersPage", ["terrasoft", "SetupCallCenterUtilities"],
	function(Terrasoft) {
		return {
			attributes: {

				/**
				 * #####.
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
				 * ########## ###### ############ ########## #########.
				 * ##### - ######## ######### #####, ######## - ######### ###########.
				 * @protected
				 * @overridden
				 * @returns {Object} ###### ############ ########## #########.
				 */
				getConnectionParamsConfig: function() {
					var baseConnectionParams = this.callParent();
					return Ext.merge(baseConnectionParams, {
						"Extension": "ExtensionName"
					});
				}

			},
			diff: [
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


