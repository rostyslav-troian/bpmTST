Terrasoft.configuration.Structures["EmployeeCareerPage"] = {innerHierarchyStack: ["EmployeeCareerPage"], structureParent: "BasePageV2"};
define('EmployeeCareerPageStructure', ['EmployeeCareerPageResources'], function(resources) {return {schemaUId:'65ba8eac-36cc-429d-b1ff-a55ff566998a',schemaCaption: "EmployeeCareerPage", parentSchemaName: "BasePageV2", schemaName:'EmployeeCareerPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmployeeCareerPage", ["ViewModelColumnValidator"], function() {
	return {
		entitySchemaName: "EmployeeCareer",
		attributes: {

			/**
			 * Organization structure unit.
			 */
			"OrgStructureUnit": {
				"lookupConfig": {
					"hierarchical": true
				}
			}

		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("DueDate", this.validateDueDate);
				this.addColumnValidator("ProbationDueDate", this.validateProbationDueDate);
			},

			/**
			 * Creates validator.
			 * @protected
			 * @return {Object}
			 */
			createValidator: function() {
				return this.Ext.create("Terrasoft.ViewModelColumnValidator");
			},

			/**
			 * Validates due date.
			 * @protected
			 * @return {Object} Validation information.
			 */
			validateDueDate: function() {
				var validator = this.createValidator();
				return validator.validateDates(this, "DueDate", "StartDate",
					this.get("Resources.Strings.DateIsLessThanDateMessageTemplate"));
			},

			/**
			 * Validates probation due date.
			 * @protected
			 * @return {Object} Validation information.
			 */
			validateProbationDueDate: function() {
				var validator = this.createValidator();
				return validator.validateDates(this, "ProbationDueDate", "StartDate",
					this.get("Resources.Strings.DateIsLessThanDateMessageTemplate"));
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "actions"
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "Account",
				"values": {
					layout: { row: 0, column: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "OrgStructureUnit",
				"values": {
					layout: { row: 0, column: 12, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "EmployeeJob",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					layout: { row: 1, column: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "FullJobTitle",
				"values": {
					layout: { row: 1, column: 12, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "StartDate",
				"values": {
					layout: { row: 2, column: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "DueDate",
				"values": {
					layout: { row: 2, column: 12, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ProbationDueDate",
				"values": {
					layout: { row: 3, column: 0, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ReasonForDismissal",
				"values": {
					layout: { row: 3, column: 12, colSpan: 12 }
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "IsCurrent",
				"values": {
					layout: { row: 4, column: 0, colSpan: 12 }
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


