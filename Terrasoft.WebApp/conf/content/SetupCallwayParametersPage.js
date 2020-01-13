Terrasoft.configuration.Structures["SetupCallwayParametersPage"] = {innerHierarchyStack: ["SetupCallwayParametersPage"], structureParent: "BaseSetupTelephonyParametersPage"};
define('SetupCallwayParametersPageStructure', ['SetupCallwayParametersPageResources'], function(resources) {return {schemaUId:'8c5e45fc-5afd-4ba6-9751-e0654dd46e71',schemaCaption: "CallWay parameters setup page", parentSchemaName: "BaseSetupTelephonyParametersPage", schemaName:'SetupCallwayParametersPage',parentSchemaUId:'22849db5-f5d9-4326-8fbc-af1f1888a90e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetupCallwayParametersPage", ["terrasoft", "SetupCallCenterUtilities"],
	function(Terrasoft, SetupCallCenterUtilities) {
		return {
			attributes: {

				/**
				 * ########## ##### #########.
				 * @type {String}
				 */
				"OperatorId": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"value": ""
				},

				/**
				 * #######, ############ ############ ## ########## ###### CallWay.
				 * @type {Boolean}
				 */
				"IsCallwayClient": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				},

				/**
				 * ####### ########## ######.
				 * @type {String}
				 */
				"RoutingRule": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
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
						"OperatorId": "operatorId",
						"IsCallwayClient": "isCallwayClient",
						"RoutingRule": "routingRule"
					});
				}
			},
			diff: [
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "OperatorId",
					"values": {
						"isRequired": true,
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				},
				{
					"operation": "insert",
					"index": 0,
					"parentName": "controlsContainerBottom",
					"propertyName": "items",
					"name": "IsCallwayClient",
					"values": {
						"generator": "SetupCallCenterUtilities.generateBottomCheckBoxControl"
					}
				},
				{
					"operation": "insert",
					"parentName": "controlsContainer",
					"propertyName": "items",
					"name": "RoutingRule",
					"values": {
						"generator": "SetupCallCenterUtilities.generateTextEdit"
					}
				}
			]
		};
	});


