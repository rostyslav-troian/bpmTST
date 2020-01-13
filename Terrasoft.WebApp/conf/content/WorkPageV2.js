Terrasoft.configuration.Structures["WorkPageV2"] = {innerHierarchyStack: ["WorkPageV2"], structureParent: "BaseProjectPageV2"};
define('WorkPageV2Structure', ['WorkPageV2Resources'], function(resources) {return {schemaUId:'3b38dd9b-80bb-4119-bced-aab0b59a32d5',schemaCaption: "Project task edit page", parentSchemaName: "BaseProjectPageV2", schemaName:'WorkPageV2',parentSchemaUId:'d681419c-2c25-421b-826e-d7a48c49bdbb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WorkPageV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "Project",
			messages: {
				"UpdateDetailResource": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			details: /**SCHEMA_DETAILS*/{
				"ResourceElement": {
					"schemaName": "WorkResourceElementDetailV2",
					"filter": {
						"detailColumn": "Project",
						"masterColumn": "Id"
					},
					subscriber: function() {
						this.sandbox.publish("UpdateDetailResource", {});
					}
				},
				"Activities": {
					"schemaName": "ActivityDetailV2",
					"filter": {
						"detailColumn": "Project",
						"masterColumn": "Id"
					},
					defaultValues: {
						Account: { masterColumn: "Account" },
						Contact: { masterColumn: "Contact" }
					},
					subscriber: function() {
						this.updateDetail({ "detail": "ResourceElement" });
					}

				}
			}, /**SCHEMA_DETAILS*/
			methods: {
				/**
				 * @override
				 */
				getHeader: function() {
					return this.get("Resources.Strings.WorkCaption");
				},

				/**
				 * ######### ###### "#######"
				 * @protected
				 * @overridden
				 */
				onProjectLaborPlanCalculated: function() {
					this.callParent(arguments);
					this.updateDetail({ "detail": "ResourceElement" });
				},

				/**
				 * ######### ###### "#######"
				 * @protected
				 * @overridden
				 */
				onProjectCollectionActualWorkCalculated: function() {
					this.callParent(arguments);
					this.updateDetail({ "detail": "ResourceElement" });
				},

				/**
				 * ########## ###### "#######". ########## ####### ## ########## ########
				 * @protected
				 * @overridden
				 */
				onCloseClick: function() {
					var updateConfig = {
						primaryColumnValue: this.get(this.primaryColumnName)
					};
					this.sandbox.publish("UpdateDetail", updateConfig, [this.sandbox.id]);
					this.sandbox.publish("BackHistoryState");
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "LinksControlBlock",
					"propertyName": "items",
					"name": "ParentProject",
					"values": {
						"layout": { "column": 0, "row": 0 },
						"enabled": false
					}
				},
				{
					"operation": "merge",
					"name": "Account",
					"values": {
						"enabled": false
					}
				},
				{
					"operation": "merge",
					"name": "Contact",
					"values": {
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "ResourceElement",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "HistoryTab",
					"propertyName": "items",
					"name": "Activities",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"Type": {
					"BindParameterRequiredTypeToProjectEntryType": {
						"ruleType": 0,
						"property": 2,
						"conditions": [
							{
								"leftExpression": {
									"type": 1,
									"attribute": "ProjectEntryType"
								},
								"comparisonType": 3,
								"rightExpression": {
									"type": 0,
									"value": "6b4928d7-456a-4acd-a863-3361d46b7649"
								}
							}
						]
					}
				},
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": 1,
						"autocomplete": true,
						"baseAttributePatch": "Account",
						"comparisonType": 3,
						"type": 1,
						"attribute": "Account"
					}
				}
			}
		};
	});


