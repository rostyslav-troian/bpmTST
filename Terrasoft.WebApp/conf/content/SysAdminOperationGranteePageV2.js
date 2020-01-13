Terrasoft.configuration.Structures["SysAdminOperationGranteePageV2"] = {innerHierarchyStack: ["SysAdminOperationGranteePageV2"], structureParent: "BasePageV2"};
define('SysAdminOperationGranteePageV2Structure', ['SysAdminOperationGranteePageV2Resources'], function(resources) {return {schemaUId:'17cd90cd-7037-4cd9-9d7c-5aa206329576',schemaCaption: "Detail card schema - \"Operations permissions\" section list", parentSchemaName: "BasePageV2", schemaName:'SysAdminOperationGranteePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminOperationGranteePageV2",
	["BusinessRuleModule", "SysAdminOperationGranteePageV2Resources"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "SysAdminOperationGrantee",
			rules: {
				"Position": {
					"DisablePositionRule": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Id"
								},
								"comparisonType": this.Terrasoft.ComparisonType.IS_NULL
							}
						]
					}
				},
				"SysAdminUnit": {
					"DisableAbminUnitRule": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Id"
								},
								"comparisonType": this.Terrasoft.ComparisonType.IS_NULL
							}
						]
					}
				}
			},
			methods: {
				/**
				 * ######### ######### # ############# ###### # ##.
				 * @inheritdoc BasePageV2#save
				 * @overridden
				 */
				save: function(args) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "SetAdminOperationGrantee",
						"data": {
							"canExecute": this.get("CanExecute"),
							"adminUnitIds": [this.get("SysAdminUnit").value],
							"adminOperationId": this.get("SysAdminOperation").value
						}
					};
					this.callService(config, function(response) {
						if (response && response.SetAdminOperationGranteeResult) {
							var result = this.Ext.decode(response.SetAdminOperationGranteeResult);
							if (result && !this.Ext.isEmpty(result)) {
								this.changedValues = null;
								if (result.Success) {
									if (this.Ext.isFunction(args.callback)) {
										args.callback.call(args.scope);
									}
								} else {
									this.showInformationDialog(result.ExMessage, function() {
										this.onDiscardChangesClick();
										if (this.Ext.isFunction(args.callback)) {
											args.callback.call(args.scope);
										}
									});
								}
							}
						}
					}, this);
				}
			}
		};
	});


