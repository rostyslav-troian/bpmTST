Terrasoft.configuration.Structures["BlacklistEditPage"] = {innerHierarchyStack: ["BlacklistEditPage"], structureParent: "BaseLookupPage"};
define('BlacklistEditPageStructure', ['BlacklistEditPageResources'], function(resources) {return {schemaUId:'1754b74b-ec6e-4c9a-ab8c-311c91b16e82',schemaCaption: "Blacklist of email addresses and domains for case registration", parentSchemaName: "BaseLookupPage", schemaName:'BlacklistEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BlacklistEditPage", ["EmailHelper", "JunkFilterConstants"],
		function(EmailHelper) {
			return {
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				entitySchemaName: "Blacklist",
				attributes: {

					/**
					 * TypeOfFieldId column dependency.
					 */
					"TypeOfFieldId": {
						dependencies: [{
							columns: ["Name"],
							methodName: "onNameChange"
						}]
					}
				},
				diff: [],
				methods: {

					/**
					 * Handles the change event of 'Name' column.
					 */
					onNameChange: function() {
						var recordId = "";
						var name = this.get("Name");
						if (EmailHelper.isEmailAddress(name)) {
							recordId = Terrasoft.JunkFilterConstants.junkFilterTypeOfField.Email;
						}
						else if (EmailHelper.isEmailDomain(name)) {
							recordId = Terrasoft.JunkFilterConstants.junkFilterTypeOfField.Domain;
						}
						else if (EmailHelper.isEmailLogin(name)){
							recordId = Terrasoft.JunkFilterConstants.junkFilterTypeOfField.Entry;
						}
						if (!this.Ext.isEmpty(recordId)) {
							this.setTypeOfField(recordId);
						}
					},

					/**
					 * Sets type of field.
					 * @protected
					 */
					setTypeOfField: function(recordId) {
						var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "JunkFilterTypeOfField"
						});
						query.addColumn("Name");
						query.getEntity(recordId, function(result) {
							this.setTypeOfFieldQueryHandler(result);
						}, this);
					},

					/**
					 * Handles query for setTypeOfField.
					 * @param {Object} result Callback result of getEntityCollection query.
					 * @protected
					 */
					setTypeOfFieldQueryHandler: function(result) {
						if (result.success) {
							var id = result.entity.get("Id");
							var name = result.entity.get("Name");
							var typeOfField = {
								value: id,
								displayValue: name
							};
							this.set("TypeOfField", typeOfField);
						}
					},

					/**
					 * Handles responce of asyncValidate for setTypeOfField.
					 * @param {Object} responce Responce of asyncValidate.
					 * @param {Function} callback callback function.
					 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
					 * @protected
					 */
					responceValidate: function(response, callback, scope) {
						if (!this.validateResponse(response)) {
							return;
						}
						Terrasoft.chain(
								function(next) {
									this.validateName(function(response) {
										if (this.validateResponse(response)) {
											next();
										}
									}, this);
								},
								function(next) {
									callback.call(scope, response);
									next();
								}, this);
					},

					/**
					 * @inheritDoc BasePageV2#asyncValidate
					 * @overridden
					 */
					asyncValidate: function(callback, scope) {
						this.callParent([function(response) {
							this.responceValidate(response, callback, scope);
						}, this]);
					},

					/**
					 * Validate that name column value is email or domain
					 * @private
					 * @param {Function} callback callback function.
					 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
					 * @param {Object} result Callback result of emailDomainValidate function.
					 * @param {String} name Name column value.
					 */
					emailDomainValidate: function(callback, scope, result, name) {
						if (!EmailHelper.isEmailAddress(name) && !EmailHelper.isEmailDomain(name)
								&& !EmailHelper.isEmailLogin(name)) {
							result = {
								message: this.get("Resources.Strings.WrongEmailOrDomainMessage"),
								success: false
							};
							callback.call(scope, result);
							return false;
						}
						return true;
					},

					/**
					 * Validate name column value.
					 * @private
					 * @param {Function} callback callback function.
					 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
					 */
					validateName: function(callback, scope) {
						if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Name)) {
							callback.call(scope, {success: true});
						} else {
							var result = {success: true};
							var name = this.changedValues.Name;
							if (!this.emailDomainValidate(callback, scope, result, name)) {
								return;
							}
							this.nameHasDuplicatesValidate(callback, scope, result, name);
						}
					},

					/**
					 * Validate that name column value has no duplicates.
					 * @private
					 * @param {Function} callback callback function.
					 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
					 * @param {Object} result Callback result of nameHasDuplicatesValidate function.
					 * @param {String} name Name column value.
					 */
					nameHasDuplicatesValidate: function(callback, scope, result, name) {
						var id = this.get("Id");
						var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "Blacklist"
						});
						query.addColumn("Id");
						var duplicatesFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Name", name);
						var notSelfFilter = query.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
								"Id", id);
						var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filterGroup.addItem(notSelfFilter);
						filterGroup.addItem(duplicatesFilter);
						query.filters.addItem(filterGroup);
						query.getEntityCollection(function(resultQuery) {
							this.getHasDuplicatesHandler(callback, scope, result, resultQuery);
						}, this);
					},

					/**
					 * Handles entitySchemaQuery.getEntityCollection getHasDuplicates query response.
					 * @private
					 * @param {Function} callback callback function.
					 * @param {Terrasoft.BaseSchemaViewModel} scope callback scope.
					 * @param {Object} result Callback result of getEntityCollection function.
					 * @param {String} resultQuery entitySchemaQuery result.
					 */
					getHasDuplicatesHandler: function(callback, scope, result, resultQuery) {
						if (resultQuery.success) {
							if (resultQuery.collection.collection.length > 0) {
								result = {
									message: this.get("Resources.Strings.NameIsDuplicateMessage"),
									success: false
								};
							}
							callback.call(scope, result);
						}
					}
				}
			};
		});


