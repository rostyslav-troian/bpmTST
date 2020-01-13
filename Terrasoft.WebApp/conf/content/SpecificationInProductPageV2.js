Terrasoft.configuration.Structures["SpecificationInProductPageV2"] = {innerHierarchyStack: ["SpecificationInProductPageV2"], structureParent: "SpecificationInObjectPageV2"};
define('SpecificationInProductPageV2Structure', ['SpecificationInProductPageV2Resources'], function(resources) {return {schemaUId:'d04cb0a6-5f4b-4b16-8c00-43ea8065c6a1',schemaCaption: "Specification in product", parentSchemaName: "SpecificationInObjectPageV2", schemaName:'SpecificationInProductPageV2',parentSchemaUId:'fcf8882b-12d3-4d00-8197-f0a76d8d02eb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// D9 Team
define("SpecificationInProductPageV2", ["SpecificationConstants"],
	function(SpecificationConstants) {
		return {
			entitySchemaName: "SpecificationInProduct",
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.on("change:Specification", this.clearSpecificationValue, this);
				},

				/**
				 * Clears specification value for list type.
				 */
				clearSpecificationValue: function() {
					const specificationTypeId = this.$Specification && this.$Specification.Type &&
						this.$Specification.Type.value;
					if (specificationTypeId === SpecificationConstants.SpecificationTypes.ListType
						|| this.isEmpty(specificationTypeId)) {
						this.set("ListItemValue", null);
					}
				},
				
				/**
				 * ######### ######### ######### ##############.
				 * ######## ############ ############## ### ########.
				 * @protected
				 * @virtual
				 * @param {Function} callback ####### ######### ###### ### ########### #########
				 * @param {Object} scope ######## ##########
				 */
				validateSpecification:  function(callback, scope) {
					var result = {
						success: true
					};
					var product = this.get("Product");
					var specification = this.get("Specification");
					if (this.Ext.isEmpty(product) || this.Ext.isEmpty(specification)) {
						result.message = this.get("Resources.Strings.CantCheckSpecificationError");
						result.success = false;
						callback.call(scope || this, result);
						return;
					}
					if (this.isNewMode() || this.changedValues.Specification) {
						var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "SpecificationInProduct"
						});
						select.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "IdCOUNT");
						select.filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Product", product.value));
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
				 * @param {Function} callback ####### ######### ######
				 * @param {Object} scope ######## ##########
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
					"name": "Product",
					"values": {
						"bindTo": "Product",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"enabled": false,
						"controlConfig": {
							"enableRightIcon": false
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


