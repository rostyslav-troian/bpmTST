Terrasoft.configuration.Structures["OperatorQueues"] = {innerHierarchyStack: ["OperatorQueues"]};
define('OperatorQueuesStructure', ['OperatorQueuesResources'], function(resources) {return {schemaUId:'805ed22e-6d19-441e-8dab-4526ca1968cf',schemaCaption: "Schema - Agent queues", parentSchemaName: "", schemaName:'OperatorQueues',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OperatorQueues", ["terrasoft", "ModuleUtils"], function(Terrasoft, ModuleUtils) {
		return {
			attributes: {
				/**
				 * Queues collection.
				 * @private
				 * @type {Terrasoft.Collection}
				 */
				"Queues": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Active queue tab name.
				 * @private
				 * @type {String}
				 */
				"ActiveQueueTabName": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": null
				}

			},
			methods: {

				//region Methods: Private

				/**
				 * Creates and sets queues collection instance.
				 * @private
				 */
				initCollections: function() {
					this.set("Queues", Ext.create("Terrasoft.BaseViewModelCollection"));
				},

				/**
				 * Loads queues collection items from database.
				 * @private
				 * @param {Function} callback Callback function.
				 */
				loadQueues: function(callback) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Queue"
					});
					esq.isDistinct = true;
					esq.addColumn("QueueEntitySchema");
					esq.addColumn("[SysSchema:UId:QueueEntitySchema].Name", "EntitySchemaName");
					esq.addColumn("[QueueObject:EntitySchemaUId:QueueEntitySchema].IsClosedQueue", "IsClosedQueue");
					this.appendOperatorFilters(esq);
					this.addQueueInProgressFilters(esq);
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							callback();
						}
						callback(result.collection);
					});
				},

				//endregion

				//region Methods: Protected

				/**
				 * Adds queue items state filters to queues query. Queue items in "in progress" state selected by default.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Queue items query instance.
				 */
				addQueueInProgressFilters: function(esq) {
					var filters = esq.filters;
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Status.IsInitial", false));
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Status.IsFinal", false));
				},

				/**
				 * Adds queue items operator filters to queues query. Queues with current user added to "Operators" detail
				 * with "Active" flag set or queues with items where current user set as operator will be loaded by default.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Queue items query instance.
				 */
				appendOperatorFilters: function(esq) {
					var currentUserContactId = this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value;
					var queueOperatorFilterGroup = this.Ext.create("Terrasoft.FilterGroup");
					queueOperatorFilterGroup.addItem(esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[QueueOperator:Queue].Operator", currentUserContactId));
					queueOperatorFilterGroup.addItem(esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[QueueOperator:Queue].Active", true));
					var operatorsFilterGroup = this.Ext.create("Terrasoft.FilterGroup", {
						logicalOperation: this.Terrasoft.LogicalOperatorType.OR
					});
					operatorsFilterGroup.addItem(queueOperatorFilterGroup);
					operatorsFilterGroup.addItem(esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[QueueItem:Queue].Operator", currentUserContactId));
					esq.filters.addItem(operatorsFilterGroup);
				},

				/**
				 * Returns queue tab name.
				 * @protected
				 * @param {String} tabId Queue tab unique identifier.
				 * @return {String} Queue tab name.
				 */
				getQueueTabName: function(tabId) {
					return Ext.isEmpty(tabId) ? null : "OperatorQueue_" + tabId;
				},

				/**
				 * Returns queue tab caption.
				 * When queue entity has registered section, then section module caption will be used as tab caption.
				 * When queue entity hasn't registered section, then queue entity caption will be used as tab caption.
				 * Queue entity name will be used as tab caption otherwise.
				 * @protected
				 * @param {String} schemaName Queue item entity name.
				 * @param {Object} queueEntitySchema Queue item entity schema object.
				 * @return {String} Queue tab caption.
				 */
				getTabCaption: function(schemaName, queueEntitySchema) {
					var schemaConfig = ModuleUtils.getModuleStructureByName(schemaName);
					var entityDisplayValue = queueEntitySchema && queueEntitySchema.displayValue;
					var caption = (schemaConfig && schemaConfig.moduleCaption) || entityDisplayValue;
					caption = caption || schemaName;
					return caption;
				},

				/**
				 * Saves active queue tab entity scheam UId to profile and loads queue module for current tab
				 * on queue active tab change.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} activeTab Current active tab.
				 */
				queueTabChange: function(activeTab) {
					var entitySchemaUId = activeTab.get("EntitySchemaUId");
					var entitySchemaName = activeTab.get("EntitySchemaName");
					var isClosedQueue = activeTab.get("IsClosedQueue");
					var loadModuleCallback = function() {
						this.sandbox.loadModule("QueueModule", {
							renderTo: "operatorQueueEntityContainer",
							parameters: {
								EntitySchemaUId: entitySchemaUId,
								EntitySchemaName: entitySchemaName,
								IsClosedQueue: isClosedQueue
							}
						});
					}.bind(this);
					var profile = this.get("Profile");
					if (profile.activeEntitySchemaUId !== entitySchemaUId) {
						profile.activeEntitySchemaUId = entitySchemaUId;
						this.saveProfileData(loadModuleCallback);
					} else {
						loadModuleCallback.call();
					}
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					return this.name;
				},

				/**
				 * Creates queue tab items.
				 * @param {Terrasoft.BaseViewModelCollection} collection Queue items collection.
				 */
				createQueuesTabs: function(collection) {
					var activeQueueTabName = null;
					if (!collection) {
						return;
					}
					var profile = this.get("Profile");
					var savedActiveEntitySchemaUId = profile.activeEntitySchemaUId;
					var queues = this.get("Queues");
					queues.clear();
					collection.each(function(item) {
						var queueEntitySchema = item.get("QueueEntitySchema");
						var queueEntitySchemaName = item.get("EntitySchemaName");
						var isClosedQueue = item.get("IsClosedQueue");
						if (queueEntitySchema) {
							var queueUId = queueEntitySchema.value;
							var queueCaption = this.getTabCaption(queueEntitySchemaName, queueEntitySchema);
							var name = this.getQueueTabName(queueUId);
							queues.add(queueUId, Ext.create("Terrasoft.BaseViewModel", {
								values: {
									Id: queueUId,
									Caption: queueCaption,
									Name: name,
									EntitySchemaUId: queueUId,
									EntitySchemaName: queueEntitySchemaName,
									IsClosedQueue: isClosedQueue
								}
							}));
							if (queueUId === savedActiveEntitySchemaUId) {
								activeQueueTabName = this.getQueueTabName(savedActiveEntitySchemaUId);
							} else if (Ext.isEmpty(activeQueueTabName)) {
								activeQueueTabName = name;
							}
						}
					}, this);
					this.set("ActiveQueueTabName", activeQueueTabName);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					this.initCollections();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#onRender
				 * @override
				 */
				onRender: function(callParentOnRender) {
					if (callParentOnRender) {
						this.callParent(arguments);
						return;
					}
					this.loadQueues(function(collection) {
						this.createQueuesTabs(collection);
						this.onRender(true);
					}.bind(this));
				},

				/**
				 * Saves user provile data.
				 * @param {Function} callback Callback function.
				 */
				saveProfileData: function(callback) {
					var profile = this.get("Profile");
					var profileKey = this.getProfileKey();
					Terrasoft.utils.saveUserProfile(profileKey, profile, false, callback);
				}

				//endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "operatorQueueTabPanel",
					"propertyName": "items",
					"values": {
						"id": "operatorQueueTabPanel",
						"itemType": Terrasoft.ViewItemType.TAB_PANEL,
						"selectors": {
							"wrapEl": "#operatorQueueTabPanel"
						},
						"classes": {
							"wrapClassName": ["operatorQueueTabPanel"]
						},
						"collection": {"bindTo": "Queues"},
						"activeTabName": {"bindTo": "ActiveQueueTabName"},
						"activeTabChange": {"bindTo": "queueTabChange"},
						"tabs": []
					}
				},
				{
					"operation": "insert",
					"parentName": "leftContainer",
					"name": "operatorQueueEntityContainer",
					"propertyName": "items",
					"values": {
						"id": "operatorQueueEntityContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				}

				//endregion
			]
		};
	}
);


