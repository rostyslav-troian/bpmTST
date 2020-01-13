Terrasoft.configuration.Structures["CallMessagePublisherPage"] = {innerHierarchyStack: ["CallMessagePublisherPage"], structureParent: "BaseMessagePublisherPage"};
define('CallMessagePublisherPageStructure', ['CallMessagePublisherPageResources'], function(resources) {return {schemaUId:'08c66ae3-9ee1-40c9-b31f-a584a9812cbf',schemaCaption: "CallMessagePublisherPage", parentSchemaName: "BaseMessagePublisherPage", schemaName:'CallMessagePublisherPage',parentSchemaUId:'6b7d0022-f128-4c6e-8372-ce9d8819fbfa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CallMessagePublisherPage", ["ConfigurationConstants", "LookupQuickAddMixin",
		"css!CallMessagePublisherModule"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "Activity",
			mixins: {
				LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin"
			},
			attributes: {
				"EntitiesList": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"CallDirectionsList": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},
				"Contact": {
					"lookupListConfig": {
						"columns": ["Account"]
					}
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.setDefaultValues();
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#onLookupDataLoaded
				 * @overridden
				 */
				onLookupDataLoaded: function(config) {
					this.callParent(arguments);
					config.isLookupEdit = true;
					this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getServiceConfig
				 * @overridden
				 */
				getServiceConfig: function() {
					return {
						className: "Terrasoft.Configuration.CallMessagePublisher"
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onPublished
				 * @overridden
				 */
				onPublished: function() {
					this.callParent(arguments);
					this.set("Body", null);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishMaskCaption
				 * @overridden
				 */
				getPublishMaskCaption: function() {
					return this.get("Resources.Strings.PublishMaskCaption");
				},

				/**
				 * Forms query that select call direction categories list.
				 * @param {Object} filter Call directions filter.
				 * @param {Object} list Collection of call directions.
				 * @protected
				 */
				prepareCallDirectionsList: function(filter, list) {
					if (!list) {
						return;
					}
					list.clear();
					this.getCallDirections(list);
				},

				/**
				 * Forms prepared EntitySchemaQuery of call directions.
				 * @protected
				 * @return Terrasoft.EntitySchemaQuery Query that select case category of the service item.
				 */
				getCallDirectionQuery: function() {
					var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CallDirection"
					});
					query.addColumn("Name");
					var callDirectionFilter = this.getCallDirectionFilter(query);
					query.filters.add("callDirectionFilter", callDirectionFilter);
					return query;
				},

				/**
				 * Forms prepared filter for call directions query.
				 * @param {Object} query Call directions query.
				 * @protected
				 * @return Terrasoft.EntitySchemaQuery Query that select case category of the service item.
				 */
				getCallDirectionFilter: function(query) {
					if (!query) {
						return null;
					}
					var notDefinedDirection = -1;
					return query.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
						"Code", notDefinedDirection);
				},

				/**
				 * Forms collection of call directions.
				 * @param {Object} list Collection of call directions.
				 * @protected
				 */
				getCallDirections: function(list) {
					var query = this.getCallDirectionQuery();
					query.getEntityCollection(function(result) {
						this.getCallDirectionsHandler(result, list);
					}, this);
				},

				/**
				 * Handles EntitySchemaQuery getEntityCollection method for getCallDirections.
				 * @param {Object} result Callback result of getEntityCollection query.
				 * @param{Object} list Collection of call directions.
				 * @protected
				 */
				getCallDirectionsHandler: function(result, list) {
					if (result.success) {
						var self = this;
						var collection = {};
						var items = result.collection.getItems();
						items.forEach(function(item) {
							self.addCallDirectionToCollection(item, collection);
						});
						list.loadAll(collection);
					}
				},

				/**
				 * Adds call direction item to collection.
				 * @param {Object} item Call direction item, {Object} collection Collection of call directions.
				 * @protected
				 */
				addCallDirectionToCollection: function(item, collection) {
					var id = item.get("Id");
					var name = item.get("Name");
					collection[id] = {
						value: id,
						displayValue: name
					};
				},

				/**
				 * Sets default values for CallMessagePublisherPage.
				 * @protected
				 */
				setDefaultValues: function() {
					this.set("CallDirectionsList", this.Ext.create("Terrasoft.Collection"));
					this.setDefaultContact();
					this.setDefaultCallDirection();
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onDashboardRealoaded
				 * @overridden
				 */
				onDashboardRealoaded: function() {
					this.setDefaultValues();
				},

				/**
				 * Get contact value from additional information config.
				 * @param {Object} config Additional contact information.
				 * @private
				 * @return {Object} Contact value.
				 */
				getContactLookupValue: function(config) {
					var result = this.Ext.isObject(config) ? {
						Account: config.Account,
						displayValue: config.displayValue,
						value: config.value
					} : null;
					return result;
				},

				/**
				 * Sets default contact for CallMessagePublisherPage.
				 * @protected
				 */
				setDefaultContact: function() {
					var config = this.getListenerRecordData();
					if (!config) {
						return;
					}
					var additionalInfo = config.additionalInfo;
					var contact = this.getContactLookupValue(additionalInfo && additionalInfo.contact);
					this.set("Contact", contact);
				},

				/**
				 * Sets default CallDirection for CallMessagePublisherPage.
				 * @protected
				 */
				setDefaultCallDirection: function() {
					var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CallDirection"
					});
					query.addColumn("Name");
					var recordId = ConfigurationConstants.Activity.ActivityCallDirection.Incoming;
					query.getEntity(recordId, function(result) {
						this.setDefaultCallDirectionQueryHandler(result);
					}, this);
				},

				/**
				 * Handles query for setDefaultCallDirection.
				 * @param {Object} result Callback result of getEntityCollection query.
				 * @protected
				 */
				setDefaultCallDirectionQueryHandler: function(result) {
					if (result.success) {
						var id = result.entity.get("Id");
						var name = result.entity.get("Name");
						var defaultCallDirection = {
							value: id,
							displayValue: name
						};
						this.set("CallDirection", defaultCallDirection);
					}
				},

				/**
				 * Forms object for set in publish data.
				 * @param {String} itemName name of item.
				 * @param {String} itemValue value of item.
				 * @protected
				 * @return {Object} Publish data item - item for publish data.
				 */
				getPublishDataItem: function(itemName, itemValue) {
					if (!itemName || !itemValue) {
						return;
					}
					return {"Key": itemName, "Value": itemValue};
				},

				/**
				 * Gets Relation Schema for publish data.
				 * @protected
				 * @return {Object} Publish data item - item for publish data.
				 */
				getRelationSchemaForPublishData: function() {
					var config = this.getListenerRecordData();
					if (!config || !config.relationColumnName || !config.relationSchemaRecordId) {
						return null;
					}
					var relationColumnValueName = config.relationColumnName + "Id";
					var relationSchemaRecordId = config.relationSchemaRecordId;
					return this.getPublishDataItem(relationColumnValueName, relationSchemaRecordId);
				},

				/**
				 * Gets contact for publish data.
				 * @protected
				 * @return {Object} Publish data item - item for publish data.
				 */
				getContactForPublishData: function() {
					var contact = this.get("Contact");
					if (!contact || !contact.value) {
						return null;
					}
					var contactValue = contact.value;
					return this.getPublishDataItem("ContactId", contactValue);
				},

				/**
				 * Gets account for publish data.
				 * @protected
				 * @return {Object} Publish data item - item for publish data.
				 */
				getAccountForPublishData: function() {
					var contact = this.get("Contact");
					if (!contact || !contact.Account || !contact.Account.value) {
						return null;
					}
					return this.getPublishDataItem("AccountId", contact.Account.value);
				},

				/**
				 * Gets call direction for publish data.
				 * @protected
				 * @return {Object} Publish data item - item for publish data.
				 */
				getCallDirectionToPublishData: function() {
					var callDirection = this.get("CallDirection");
					if (!callDirection || !callDirection.value) {
						return null;
					}
					return this.getPublishDataItem("CallDirectionId", callDirection.value);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onNewCardSaved
				 * @overridden
				 */
				onNewCardSaved: function() {
					if (!this.get("Body")) {
						return;
					}
					this.publishMessage();
				},

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishData
				 * @overridden
				 */
				getPublishData: function() {
					var publishData = [];
					var contact = this.getContactForPublishData();
					if (contact) {
						publishData.push(contact);
					}
					var account = this.getAccountForPublishData();
					if (account) {
						publishData.push(account);
					}
					var relationSchema = this.getRelationSchemaForPublishData();
					if (relationSchema) {
						var isContainRelationSchema = publishData.some(function(item) {
							if (item.Key === relationSchema.Key) {
								return true;
							}
						}, this);
						if (!isContainRelationSchema) {
							publishData.push(relationSchema);
						}
					}
					var callDirection = this.getCallDirectionToPublishData();
					if (callDirection) {
						publishData.push(callDirection);
					}
					var callCategory = ConfigurationConstants.Activity.ActivityCategory.Call;
					publishData.push(this.getPublishDataItem("ActivityCategoryId", callCategory));
					var body = this.get("Body");
					publishData.push(this.getPublishDataItem("Body", body));
					publishData.push(this.getPublishDataItem("DetailedResult", body));
					var title = this.getCombinedTitle();
					publishData.push(this.getPublishDataItem("Title", title));
					publishData.push(this.getPublishDataItem("ResultId",
						ConfigurationConstants.Activity.ActivityResult.Completed));
					publishData.push(this.getPublishDataItem("StatusId",
						ConfigurationConstants.Activity.Status.Done));
					return publishData;
				},

				/**
				 * Forms combined title for CallMessage activity.
				 * @protected
				 * @return {String} combined title.
				 */
				getCombinedTitle: function() {
					var contact = this.get("Contact");
					var callDirection = this.get("CallDirection");
					var directionMessage;
					var undefinedCallDirectionMessage;
					if (callDirection.value === ConfigurationConstants.Activity.ActivityCallDirection.Incoming) {
						directionMessage = this.get("Resources.Strings.IncomingCallString");
						undefinedCallDirectionMessage = this.get("Resources.Strings.UndefinedIncomingCallString");
					} else if (callDirection.value ===
						ConfigurationConstants.Activity.ActivityCallDirection.Outgoing) {
						directionMessage = this.get("Resources.Strings.OutgoingCallString");
						undefinedCallDirectionMessage = this.get("Resources.Strings.UndefinedOutgoingCallString");
					}
					if (!contact) {
						return undefinedCallDirectionMessage;
					}
					return  this.Ext.String.format("{0} {1}", directionMessage, contact.displayValue);
				},

				/**
				 * Forms string without html tags.
				 * @param body Incoming string.
				 * @protected
				 * @return {String} string without html tags.
				 * @deprecated
				 */
				getClearBody: function(body) {
					if (typeof(body) === "string") {
						return body.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n\n/g, "\n");
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "LayoutContainer",
					"name": "MainGridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 11
						},
						"labelConfig": {
							"classes": ["call-message-contact"]
						},
						"bindTo": "Contact"
					}
				},
				{
					"operation": "insert",
					"name": "CallDirection",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 15,
							"row": 0,
							"colSpan": 9
						},
						"labelConfig": {
							"classes": ["call-direction-message-contact"]
						},
						"bindTo": "CallDirection",
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {
								"bindTo": "prepareCallDirectionsList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"name": "CallMessagePublisherEdit",
					"values": {
						"bindTo": "Body",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 2
						},
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"placeholder": {
								"bindTo": "Resources.Strings.WriteCommentHint"
							},
							"classes": ["call-message-publisher-edit"]
						},
						"markerValue": "CallMessagePublisherEdit"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


