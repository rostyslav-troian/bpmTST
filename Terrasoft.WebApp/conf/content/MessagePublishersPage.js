Terrasoft.configuration.Structures["MessagePublishersPage"] = {innerHierarchyStack: ["MessagePublishersPage"]};
define('MessagePublishersPageStructure', ['MessagePublishersPageResources'], function(resources) {return {schemaUId:'b9ff6164-3a14-4e68-935a-fac23a2d052c',schemaCaption: "Page schema - Message publishers", parentSchemaName: "", schemaName:'MessagePublishersPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MessagePublishersPage", [],
		function() {
			return {
				messages: {
					/**
					 * @message EntityInitialized
					 * Starts after the object is initialized and inform subscribers
					 * about the completion of initialization of the entity.
					 */
					"EntityInitialized": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				attributes: {
					/**
					 * Message publisher collection.
					 */
					"MessagePublishers": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION
					}
				},
				methods: {

					/**
					 * Initializes a collection.
					 * @private
					 * @param {String} collectionName.
					 */
					initCollection: function(collectionName) {
						var collection = this.get(collectionName);
						if (!collection) {
							collection = this.Ext.create("Terrasoft.Collection");
							this.set(collectionName, collection);
						} else {
							collection.clear();
						}
					},

					/**
					 * Do actions that required after page had been rendered.
					 * @protected
					 * @virtual
					 */
					onRender: function() {
						this.callParent(arguments);
						var messagePublishers = this.get("MessagePublishers");
						var publishers = messagePublishers.collection;
						if (publishers.length === 1) {
							var firstItem = publishers.items[0];
							var tag = firstItem.visibilityAttribute;
							this.set(tag, true);
							var buttonElement = this.getButtonExtElement(tag);
							buttonElement.addCls("t-btn-pressed");
						}
					},

					/**
					 * Fills the collection of message publishers for the current section.
					 * @private
					 * @param {Function} callback The callback function.
					 * @param {Object} scope The context of the callback function.
					 */
					initPublishers: function(callback, scope) {
						var recordInfo = this.getRecordInfo();
						var esq = this.getPublisherEsq(recordInfo.sectionId);
						esq.getEntityCollection(function(result) {
							if (!result.success) {
								return;
							}
							var messagePublishers = {};
							var items = result.collection.getItems();
							this.Terrasoft.each(items, function(item) {
								var primaryColumnValue = item.get("MessagePublisherId");
								var name = item.get("Name");
								var description = item.get("Description");
								var moduleName = item.get("ModuleName");
								var image = item.get("Image");
								var imageId = image ? image.value : null;
								messagePublishers[primaryColumnValue] = {
									code: name,
									caption: description,
									containerId: "moduleContainer_" + primaryColumnValue,
									moduleName: moduleName,
									visibilityAttribute: moduleName,
									imageId: imageId
								};
							}, this);
							this.get("MessagePublishers").loadAll(messagePublishers);
							if (callback) {
								callback.call(scope || this);
							}
						}, this);
					},

					/**
					 * Returns esq-request to fetch message publishers for the current section.
					 * @private
					 * @param {Object} sectionId Id of current section.
					 * @return {Terrasoft.EntitySchemaQuery} esq-request.
					 */
					getPublisherEsq: function(sectionId) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "MessagePublisherBySection"
						});
						esq.addColumn("MessagePublisher.Name", "Name");
						esq.addColumn("MessagePublisher.Id", "MessagePublisherId");
						esq.addColumn("MessagePublisher.Description", "Description");
						esq.addColumn("MessagePublisher.ClassName", "ModuleName");
						esq.addColumn("MessagePublisher.Image", "Image");
						esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Section", sectionId));
						return esq;
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.initCollection("MessagePublishers");
							this.initPublishers(callback, scope);
						}, this]);
					},

					/**
					 * Displays the entry field for the selected message publisher.
					 * @protected
					 * @virtual
					 */
					onPublisherButtonClick: function() {
						var messagePublishers = this.get("MessagePublishers");
						if (arguments && arguments.length) {
							var tag = arguments[arguments.length - 1];
							var isActive = this.get(tag);
							messagePublishers.each(function(item) {
								this.set(item.visibilityAttribute, false);
								var buttonElement = this.getButtonExtElement(item.visibilityAttribute);
								buttonElement.removeCls("t-btn-pressed");
							}, this);
							if (!isActive) {
								var buttonElement = this.getButtonExtElement(tag);
								buttonElement.addCls("t-btn-pressed");
								this.set(tag, true);
							}
						}
					},

					/**
					 * Returns button Ext element.
					 * @param {String} tag Button tag.
					 * @protected
					 * @return {Object} button Button Ext element.
					 */
					getButtonExtElement: function(tag) {
						return this.Ext.get(tag + "-wrapperEl");
					},

					/**
					 * Returns information about the current record.
					 * @protected
					 * @virtual
					 * @return {Object} info information about the current record.
					 */
					getRecordInfo: function() {
						var info = this.sandbox.publish("GetRecordInfo", null, [this.sandbox.id]);
						this.set("RecordInfoConfig", info);
						return info;
					}
				}
			};
		});


