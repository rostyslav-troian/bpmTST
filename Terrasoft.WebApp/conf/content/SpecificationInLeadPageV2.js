Terrasoft.configuration.Structures["SpecificationInLeadPageV2"] = {innerHierarchyStack: ["SpecificationInLeadPageV2"], structureParent: "SpecificationInObjectPageV2"};
define('SpecificationInLeadPageV2Structure', ['SpecificationInLeadPageV2Resources'], function(resources) {return {schemaUId:'78b8b27d-d685-4b67-8c30-530bb3a72912',schemaCaption: "Need feature page", parentSchemaName: "SpecificationInObjectPageV2", schemaName:'SpecificationInLeadPageV2',parentSchemaUId:'fcf8882b-12d3-4d00-8197-f0a76d8d02eb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SpecificationInLeadPageV2", [],
	function() {
		return {
			entitySchemaName: "SpecificationInLead",
			methods: {
				/**
				 * ######### ######### ######### ##############.
				 * ######## ############ ############## ### ########.
				 * @protected
				 * @virtual
				 * @param callback ####### ######### ###### ### ########### #########
				 * @param scope ######## ##########
				 */
				validateSpecification:  function(callback, scope) {
					var result = {
						success: true
					};
					var lead = this.get("Lead");
					var specification = this.get("Specification");
					if (this.Ext.isEmpty(lead) || this.Ext.isEmpty(specification)) {
						result.message = this.get("Resources.Strings.CantCheckSpecificationError");
						result.success = false;
						callback.call(scope || this, result);
						return;
					}
					if (this.isNewMode() || this.changedValues.Specification) {
						var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SpecificationInLead"
						});
						select.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "IdCOUNT");
						select.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Lead", lead.value));
						select.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Specification", specification.value));
						select.getEntityCollection(function(response) {
							if (response.success) {
								if (response.collection.getCount() < 1) {
									result.message = this.get("Resources.Strings.CantCheckSpecificationError");
									result.success = false;
								} else {
									var selectResult  =  response.collection.getByIndex(0);
									var specificationsCount = selectResult.get("IdCOUNT");
									if (specificationsCount > 0) {
										result.message = this.get("Resources.Strings.SpecificationExists");
										result.success = false;
									}
								}
							} else {
								result.message = this.get("Resources.Strings.CantCheckSpecificationError");
								result.success = false;
							}
							callback.call(scope || this, result);
						}, this);
					} else {
						callback.call(scope || this, result);
					}
				},

				/**
				 * ######### ########### ######### ########
				 * @protected
				 * @override
				 * @param callback ####### ######### ######
				 * @param scope ######## ##########
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						Terrasoft.chain(
							function(next) {
								this.validateSpecification(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							function(next) {
								callback.call(scope, response);
								next();
							}, this);
					}, this]);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Lead",
					"values": {
						"bindTo": "Lead",
						"layout": { "column": 0, "row": 0, "colSpan": 12 },
						"enabled": false,
						"controlConfig": {
							"enableRightIcon": false
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


