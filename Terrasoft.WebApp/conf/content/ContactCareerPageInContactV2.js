Terrasoft.configuration.Structures["ContactCareerPageInContactV2"] = {innerHierarchyStack: ["ContactCareerPageInContactV2"], structureParent: "BasePageV2"};
define('ContactCareerPageInContactV2Structure', ['ContactCareerPageInContactV2Resources'], function(resources) {return {schemaUId:'70dde563-70ee-4002-8ee5-13c3e7fae3cc',schemaCaption: "ContactCareerPageInContactV2", parentSchemaName: "BasePageV2", schemaName:'ContactCareerPageInContactV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactCareerPageInContactV2", [], function() {
	return {
		entitySchemaName: "ContactCareer",
		attributes: {
			"JobTitle": {
				name: "JobTitle",
				dataValueType: Terrasoft.DataValueType.TEXT,
				dependencies: [
					{
						columns: ["Job"],
						methodName: "onJobChange"
					}
				]
			},
			"DueDate": {
				name: "DueDate",
				dataValueType: Terrasoft.DataValueType.DATE,
				dependencies: [
					{
						columns: ["Current"],
						methodName: "onCurrentChange"
					}
				]
			}
		},
		methods: {

			/**
			 * ############# ######## ## #########
			 * @protected
			 * @overridden
			 */
			getDefaultValues: function() {
				var defValues = this.callParent(arguments);
				defValues.push({
					name: "Current",
					value: true
				},
				{
					name: "Primary",
					value: true
				});
				return defValues;
			},

			/**
			 * ############# ######## #### "###### ######## #########" ### ######### ######## #### "#########"
			 * @protected
			 * @virtual
			 */
			onJobChange: function() {
				var job = this.get("Job");
				if (!Ext.isEmpty(job)) {
					this.set("JobTitle", job.displayValue);
				}
			},

			/**
			 * ############# ######## #### "##########" ### ######### ######## #### "#######"
			 * @protected
			 * @virtual
			 */
			onCurrentChange: function() {
				var dueDate = this.get("Current") ? null : new Date();
				this.set("DueDate", dueDate);
			},

			/**
			 * ########## ######## ###### #############.
			 * #### ############ ############ ########, ####### ######### # ############# ########## #######.
			 * ##### ########## callback-#######.
			 * @protected
			 * @overridden
			 * @param {Function} callback callback-#######
			 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######
			 */
			asyncValidate: function(callback, scope) {
				this.callParent([function(result) {
					if (!result.success) {
						callback.call(scope, result);
						return;
					}
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					if (dueDate !== null) {
						if (startDate > dueDate) {
							this.showInformationDialog(this.get("Resources.Strings.WarningWrongDate"));
							this.hideBodyMask();
							return;
						}
					}
					callback.call(scope, result);
				}, this]);
			},

			/**
			 * ###### ###### # ##, ######### #### ## # ####### ######## #########
			 * # ########## "#######", "########" ##### ######
			 * @protected
			 * @virtual
			 * @param {String} contactId ############# ########
			 * @param {Function} callback callback-#######
			 * @param {Object} scope ######## ########## ####### callback
			 * @param {Object} result ##### #######
			 */
			getContactCareerCollection: function(contactId, callback, scope, result) {
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ContactCareer"});
				select.addColumn("Id");
				select.addColumn("Contact");
				select.addColumn("Account");
				select.addColumn("Job");
				select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
					"Id", this.get("Id")));
				select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Contact", contactId));
				select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Current", true));
				select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Primary", true));
				select.getEntityCollection(function(response) {
					this.onGetSelectResult(response, callback, scope, result);
				}, this);
			},

			/**
			 * ######## ####### # ########## ####### # ##,
			 * ######## #### ######### ### ####, ##### ######## ############
			 * ######## ## ######### ###### # ######### "#######" ##########
			 * @protected
			 * @virtual
			 * @param {Object} response ####### ########## # ########## #######
			 * @param {Function} callback callback-#######
			 * @param {Object} scope ######## ########## ####### callback
			 * @param {Object} result ##### #######
			 */
			onGetSelectResult: function(response, callback, scope, result) {
				var entityCollection = response.collection;
				var buttonsConfig = {
					buttons: [
						this.Terrasoft.MessageBoxButtons.YES.returnCode,
						this.Terrasoft.MessageBoxButtons.NO.returnCode
					],
					defaultButton: 0
				};
				if (entityCollection.getCount() > 0) {
					var message = this.get("Resources.Strings.ChangeContactJob");
					var oldContact = entityCollection.getItems()[0].get("Contact").displayValue;
					var oldAccount =  entityCollection.getItems()[0].get("Account").displayValue;
					var oldJob = entityCollection.getItems()[0].get("Job");
					var oldJobTitle = "";
					if (oldJob) {
						oldJobTitle = oldJob.displayValue;
					}
					this.showInformationDialog(Ext.String.format(message, oldContact, oldAccount, oldJobTitle),
							function(returnCode) {
								this.getSelectedButton(returnCode, callback, scope, result, entityCollection);
							}, buttonsConfig);
				} else {
					callback.call(scope, result);
				}
			},

			/**
			 * ######## ##### ############ ## ###### # #### #########
			 * @protected
			 * @virtual
			 * @param {String} returnCode ##### ############ ## ###### ## #### #########
			 * @param {Function} callback callback-#######
			 * @param {Object} scope ######## ########## ####### callback
			 * @param {Object} result ##### #######
			 * @param {Object} entityCollection ####### ########## # ########## #######
			 */
			getSelectedButton: function(returnCode, callback, scope, result, entityCollection) {
				if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.onAnswerYes(entityCollection, returnCode, callback, scope, result);
				} else {
					this.onAnswerNo(entityCollection, returnCode, callback, scope, result);
				}
			},

			/**
			 * ######### ######### ###### ###### (######),
			 * ############# ## ####### "#######" = "####",
			 * # ##### #### ##########
			 * @protected
			 * @virtual
			 * @param {Object} entityCollection ####### ########## # ########## #######
			 * @param {String} returnCode ##### ############ ## ###### ## #### #########
			 * @param {Function} callback callback-#######
			 * @param {Object} scope ######## ########## ####### callback
			 * @param {Object} result ##### #######
			 */
			onAnswerNo: function(entityCollection, returnCode, callback, scope, result) {
				var oldContactCareer = entityCollection.getItems()[0].get("Id");
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "ContactCareer"
				});
				update.filters.add("ContactIdFilter",
						update.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id", oldContactCareer));
				update.setParameterValue("Current", false, this.Terrasoft.DataValueType.BOOLEAN);
				update.setParameterValue("DueDate", new Date(), this.Terrasoft.DataValueType.DATE);
				update.execute(function() {
					callback.call(scope, result);
				});
			},

			/**
			 * ######### ######### ###### ###### (######),
			 * ############# ## ####### "########" = "####"
			 * @protected
			 * @virtual
			 * @param {Object} entityCollection ####### ########## # ########## #######
			 * @param {String} returnCode ##### ############ ## ###### ## #### #########
			 * @param {Function} callback callback-#######
			 * @param {Object} scope ######## ########## ####### callback
			 * @param {Object} result ##### #######
			 */
			onAnswerYes: function(entityCollection, returnCode, callback, scope, result) {
				var oldContactCareer = entityCollection.getByIndex(0).get("Id");
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "ContactCareer"
				});
				update.filters.addItem(update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Id", oldContactCareer));
				update.setParameterValue("Primary", false, this.Terrasoft.DataValueType.BOOLEAN);
				update.execute(function() {
					callback.call(scope, result);
				});
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Contact",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Contact",
					"enabled": false,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "Account",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Account",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "Primary",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Primary",
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "insert",
				"name": "Current",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Current",
					"layout": {
						"column": 18,
						"row": 1,
						"colSpan": 6
					}
				}
			},

			{
				"operation": "insert",
				"name": "Job",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Job",
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"name": "JobTitle",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "JobTitle",
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "Department",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Department",
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "DecisionRole",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "DecisionRole",
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {
						"column": 12,
						"row": 3,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "StartDate",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "StartDate",
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "DueDate",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "DueDate",
					"layout": {
						"column": 12,
						"row": 4,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "JobChangeReason",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "JobChangeReason",
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 12
					},
					"contentType": Terrasoft.ContentType.ENUM
				}
			},
			{
				"operation": "insert",
				"name": "Description",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"bindTo": "Description",
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.LONG_TEXT
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


