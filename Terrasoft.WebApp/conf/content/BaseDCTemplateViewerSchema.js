Terrasoft.configuration.Structures["BaseDCTemplateViewerSchema"] = {innerHierarchyStack: ["BaseDCTemplateViewerSchema"]};
define('BaseDCTemplateViewerSchemaStructure', ['BaseDCTemplateViewerSchemaResources'], function(resources) {return {schemaUId:'6d2f3d59-cf4f-413b-a479-2b3c42693ef0',schemaCaption: "BaseDCTemplateViewerSchema", parentSchemaName: "", schemaName:'BaseDCTemplateViewerSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseDCTemplateViewerSchema", ["ServiceHelper", "DCTemplateReplicaRepository", "ContainerListGenerator",
	"ContainerList", "PreviewReplicaViewModel",	"css!BaseDCTemplateViewerSchema"], function(ServiceHelper) {
	return {
		messages: {

			/**
			 * @message EntityInitialized
			 * Master's entity initialized event.
			 */
			"EntityInitialized": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetColumnsValues
			 * Requests the values of columns from target object.
			 */
			"GetColumnsValues": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetReplicaRepository
			 * Requests the instance of replica repository from master page.
			 */
			"GetReplicaRepository": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {

			/**
			 * Selected replica subject.
			 */
			"Subject": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Selected replica preheader.
			 */
			"PreHeader": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Selected replica sender email.
			 */
			"SenderEmail": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Selected replica sender name.
			 */
			"SenderName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Collection of replica headers.
			 */
			"ReplicaHeadersCollection": {
				dataValueType: this.Terrasoft.DataValueType.BaseViewModelCollection,
				isCollection: true,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Replica item with default headers.
			 */
			"DefaultHeaders": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": this.Ext.create("Terrasoft.BaseViewModel")
			},

			/**
			 * Contains content of displayed template.
			 */
			"TemplateBody": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates ToggleListButton visibility.
			 */
			"ToggleListButtonVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Indicates replica existence for selected bulk email.
			 */
			"HasReplica": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Left list container visibility.
			 */
			"LeftContainerVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Master column name.
			 */
			"MasterColumnName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "Id"
			},

			/**
			 * Replica collection.
			 */
			"ReplicaCollection": {
				columnPath: "ReplicaCollection",
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				isCollection: true,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Indicates that the collection of replicas is loading.
			 */
			"IsReplicaCollectionLoading": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Indicates that the template is empty.
			 */
			"IsTemplateEmpty": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/**
			 * Active item identifier.
			 */
			"ActiveItemId": {
				dataValueType: this.Terrasoft.DataValueType.GUID,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Source master column name.
			 */
			"SourceMasterColumnName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "SourceEntityPrimaryColumnValue"
			},

			/**
			 * Indicates if wizard feature enabled.
			 */
			"IsWizardMode": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
			}
		},

		methods: {

			// region Methods: Protected

			/**
			 * Returns class name of replica's row view model.
			 * @protected
			 * @return {String}
			 */
			getRowViewModelClassName: function() {
				return "Terrasoft.BaseModel";
			},

			/**
			 * Creates item view model.
			 * @param {Object} item Item data values.
			 * @return {Terrasoft.BaseModel} Item view model.
			 */
			createItemViewModel: function(item) {
				var rowViewModelClassName = this.getRowViewModelClassName();
				return this.Ext.create(rowViewModelClassName, {
					values: {
						Id: item.Id,
						Name: item.Name,
						Mask: item.Mask
					}
				});
			},

			/**
			 * Loads replicas content data and sets into TemplateBody attribute.
			 * @protected
			 * @param {Guid} replicaId Replica identifier.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context in which the callback function will be called.
			 */
			loadReplicaContent: function(replicaId, callback, scope) {
				var replicaModel = this.$ReplicaCollection.get(replicaId);
				if (replicaModel.$Content) {
					this.set("TemplateBody", replicaModel.$Content);
					callback.call(scope);
					return;
				}
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "DCReplica"
				});
				esq.addColumn("Content");
				esq.getEntity(replicaId, function(response) {
					var content = response.success && response.entity.get("Content") || "";
					this.set("TemplateBody", content);
					replicaModel.$Content = content;
					callback.call(scope);
				}, this);
			},

			/**
			 * Indicates master record new operation state.
			 * @protected
			 * @return {Boolean} Master record new operation state.
			 */
			isNewMasterRecord: function() {
				var operation = this.getMasterColumnValueByName("Operation");
				return operation === this.Terrasoft.ConfigurationEnums.CardOperation.ADD;
			},

			/**
			 * Indicates master record copy operation state.
			 * @protected
			 * @return {Boolean} Master record copy operation state.
			 */
			isCopyMasterRecord: function() {
				var operation = this.getMasterColumnValueByName("Operation");
				return operation === this.Terrasoft.ConfigurationEnums.CardOperation.COPY;
			},

			/**
			 * Gets replica headers collection from service and fills view model headers attributes.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for callback function.
			 */
			initReplicaHeaders: function(callback, scope) {
				this.$ReplicaHeadersCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				var recordId = this.getRecordIdForRepository();
				var serviceContract = { BulkEmailId: recordId };
				ServiceHelper.callService("BulkEmailTemplateService", "GetBulkEmailReplicaHeaders",
					function (response) {
						this.$DefaultHeaders = this.mapHeadersResponseToViewModel(response.DefaultHeaders);
						var headers = response.Headers;
						Terrasoft.each(headers, function(replicaHeaders) {
							var viewModelItem = this.mapHeadersResponseToViewModel(replicaHeaders);
							this.$ReplicaHeadersCollection.add(viewModelItem.$ReplicaId, viewModelItem)
						}, this);
						callback.call(scope);
					}, serviceContract, this);
			},

			/**
			 * Maps service response to headers view model.
			 * @protected
			 * @param {Object} bulkEmailHeaders Represents replica headers.
			 */
			mapHeadersResponseToViewModel: function(bulkEmailHeaders) {
				var replicaHeadersViewModel = Ext.create("Terrasoft.BaseViewModel");
				replicaHeadersViewModel.$Subject = bulkEmailHeaders.Subject;
				replicaHeadersViewModel.$SenderEmail = bulkEmailHeaders.SenderEmail;
				replicaHeadersViewModel.$SenderName = bulkEmailHeaders.SenderName;
				replicaHeadersViewModel.$PreHeader = bulkEmailHeaders.Preheader;
				replicaHeadersViewModel.$ReplicaId = bulkEmailHeaders.ReplicaId;
				return replicaHeadersViewModel;
			},

			/**
			 * Fills collection of replicas view models from array with replicas data.
			 * @protected
			 * @param {Array} replicaItems Array containing the data of each replica.
			 */
			fillReplicaCollection: function(replicaItems) {
				var viewModelCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				if (this.Ext.isArray(replicaItems)) {
					var hasItems = replicaItems.length > 0;
					this.$HasReplica = hasItems;
					this.$IsTemplateEmpty = !hasItems;
					this.Terrasoft.each(replicaItems, function(item) {
						var viewModel = this.createItemViewModel(item);
						viewModelCollection.add(item.Id, viewModel);
					}, this);
				}
				this.$ActiveItemId = null;
				this.$ReplicaCollection.clear();
				this.$ReplicaCollection.loadAll(viewModelCollection);
			},

			/**
			 * Returns column value from page by name.
			 * @protected
			 * @param {String} columnName Column name.
			 * @return {Object} Column value.
			 */
			getMasterColumnValueByName: function(columnName) {
				var columnValuesObj = this.sandbox.publish("GetColumnsValues", [columnName], [this.sandbox.id]);
				return columnValuesObj[columnName];
			},

			/**
			 * Calls replica repository method to load replicas.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			loadReplicasFromRepository: function(callback, scope) {
				if (this.isNewMasterRecord()) {
					this.Ext.callback(callback, scope);
					return;
				}
				this.$ReplicaRepository.loadAll(callback, scope);
			},

			/**
			 * Loads replicas data.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution context.
			 */
			loadReplicas: function(callback, scope) {
				this.$IsReplicaCollectionLoading = true;
				this.loadReplicasFromRepository(function(response) {
					if (response) {
						this.fillReplicaCollection(response);
					}
					this.$IsReplicaCollectionLoading = false;
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Loads template body from bulk email when replica collection is empty.
			 * @protected
			 */
			loadTemplateContentFromBulkEmail: function() {
				this.$ActiveItemId = null;
				this.set("TemplateBody", this.getMasterColumnValueByName("TemplateBody"));
				this.$IsTemplateEmpty = false;
				this.setHeaders();
			},

			/**
			 * Initializes detail items visibility.
			 * @protected
			 */
			initDetailItemsVisibility: function() {
				var replicaItems = this.$ReplicaCollection;
				var hasMoreThanOneItem = replicaItems.getCount() > 1;
				this.$LeftContainerVisible = hasMoreThanOneItem;
				this.$ToggleListButtonVisible = hasMoreThanOneItem;
			},

			/**
			 * Select first replica item.
			 * @protected
			 */
			selectFirstReplicaItem: function() {
				var replicaItems = this.$ReplicaCollection;
				var firstItem = replicaItems.first();
				if (firstItem) {
					this.onItemClick(firstItem.$Id);
				} else if (!this.$HasReplica) {
					this.loadTemplateContentFromBulkEmail();
				}
			},

			/**
			 * Handles entity initialization.
			 * @protected
			 */
			onEntityInitialized: function() {
				this.initReplicaRepository();
				this.loadModuleData(this.selectFirstReplicaItem, this);
			},

			/**
			 * Returns record unique identifier to init replica repository.
			 * @protected
			 * @returns {String} Record unique identifier.
			 */
			getRecordIdForRepository: function() {
				if (this.isCopyMasterRecord()) {
					return this.getMasterColumnValueByName(this.$SourceMasterColumnName);
				}
				return this.getMasterColumnValueByName(this.$MasterColumnName);
			},

			/**
			 * Inits properties after load replicas.
			 * @protected
			 */
			afterReplicasLoaded: function() {
				this.initDetailItemsVisibility();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.selectFirstReplicaItem();
			},

			/**
			 * Subscribes on sandbox events.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				var sandbox = this.sandbox;
				sandbox.subscribe("EntityInitialized", this.onEntityInitialized, this, [sandbox.id]);
			},

			/**
			 * Initializes replica repository for loading list of replica.
			 * @protected
			 */
			initReplicaRepository: function() {
				var sandbox = this.sandbox;
				var repository = sandbox.publish("GetReplicaRepository", [], [sandbox.id]);
				if (!repository) {
					repository = Ext.create("Terrasoft.DCTemplateReplicaRepository");
					var recordId = this.getRecordIdForRepository();
					repository.init(recordId);
				}
				this.$ReplicaRepository = repository;
			},

			/**
			 * Sets view model header properties by replica id.
			 * @protected
			 * @param {Guid} replicaId Replica item identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			setHeaders: function(replicaId, callback, scope) {
				var activeReplicaItem = this.$ReplicaHeadersCollection.contains(replicaId)
					? this.$ReplicaHeadersCollection.get(replicaId)
					: this.$DefaultHeaders;
				this.$Subject = activeReplicaItem.$Subject;
				this.$SenderEmail = activeReplicaItem.$SenderEmail;
				this.$SenderName = activeReplicaItem.$SenderName;
				this.$PreHeader = activeReplicaItem.$PreHeader;
				if (callback) {
					callback.call(scope);
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				this.$ReplicaCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.$IsWizardMode = Terrasoft.Features.getIsEnabled("MarketingContentBuilderWizard");
				this.callParent([function() {
					this.subscribeSandboxEvents();
					this.initReplicaRepository();
					this.loadModuleData(callback, scope);
				}, this]);
			},

			/**
			 * Loads replicas and headers data.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			loadModuleData: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						this.loadReplicas(next, this);
					},
					function(next) {
						this.initReplicaHeaders(next, this);
					},
					function(next) {
						this.afterReplicasLoaded();
						next();
					},
					function() {
						if(callback) {
							callback.call(scope);
						}
					},
				this);
			},

			/**
			 * Handles click event on replica item.
			 * @param {Guid} itemId Selected item identifier.
			 */
			onItemClick: function(itemId) {
				if (itemId === this.$ActiveItemId) {
					return;
				}
				this.$ActiveItemId = itemId;
				this.showBodyMask();
				this.loadReplicaContent(itemId, function() {
					this.setHeaders(itemId, this.hideBodyMask, this);
				}, this);

			},

			/**
			 * Handles toggle list button click event.
			 */
			onToggleListButtonClick: function() {
				var newLeftContainerVisible = !this.$LeftContainerVisible;
				this.$LeftContainerVisible = newLeftContainerVisible;
				// TODO: Remove after fix bugs in ContainerList.
				if (newLeftContainerVisible) {
					var itemId = this.$ActiveItemId;
					this.$ActiveItemId = null;
					this.$ActiveItemId = itemId;
				}
			},

			/**
			 * Returns tools visibility.
			 * @return {Boolean} True if control group tools should be visible, otherwise false.
			 */
			getToolsVisible: function() {
				return !this.get("IsViewerControlGroupCollapsed");
			},

			/**
			 * Generates config for icons of toggle list button.
			 * @return {Object} Toggle list button image config.
			 */
			getToggleListButtonImageConfig: function() {
				return this.getResourceImageConfig("Resources.Images.ToggleListButtonImage");
			},

			/**
			 * Handles a change of control group collapsing state.
			 * @param {Boolean} isCollapsed True if control group is collapsed, otherwise false.
			 */
			onViewerControlGroupCollapsedChanged: function(isCollapsed) {
				this.set("IsViewerControlGroupCollapsed", isCollapsed);
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "BaseDCTemplateViewerControlGroup",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {
						"bindTo": "Resources.Strings.Title"
					},
					"items": [],
					"tools": [],
					"controlConfig": {
						"collapsedchanged": {
							"bindTo": "onViewerControlGroupCollapsedChanged"
						},
						"collapsed": {
							"bindTo": "IsViewerControlGroupCollapsed"
						},
						"classes": ["detail", "base-dc-template-viewer-control-group"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "OuterContainer",
				"parentName": "BaseDCTemplateViewerControlGroup",
				"values": {
					"id": "BaseDCTemplateViewerOuterContainer",
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": []
				},
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "InnerContainer",
				"parentName": "OuterContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["base-dc-template-viewer-inner-container"]
					},
					"visible": {
						"bindTo": "IsTemplateEmpty",
						"bindConfig": {
							"converter": "invertBooleanValue"
						}
					},
					"items": []
				},
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "ToggleListButton",
				"parentName": "InnerContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"wrapperClass": ["toggle-list-button"]
					},
					"click": {
						"bindTo": "onToggleListButtonClick"
					},
					"imageConfig": {
						"bindTo": "getToggleListButtonImageConfig"
					},
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"pressedClass": "toggle-list-button-pressed",
					"pressed": {
						"bindTo": "LeftContainerVisible"
					},
					"markerValue": "ToggleListButton",
					"visible": {
						"bindTo": "ToggleListButtonVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "LeftContainer",
				"parentName": "InnerContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["base-dc-template-viewer-left-container"]
					},
					"visible": {
						"bindTo": "LeftContainerVisible"
					},
					"items": []
				},
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "RightContainer",
				"parentName": "InnerContainer",
				"values": {
					"id": "BaseDCTemplateViewerRightContainer",
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["base-dc-template-viewer-right-container"]
					},
					"items": []
				},
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "EmailHeadersContainer",
				"parentName": "RightContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": "$IsWizardMode"
				}
			},
			{
				"operation": "insert",
				"name": "EmailHeadersGridLayout",
				"parentName": "EmailHeadersContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SenderName",
				"parentName": "EmailHeadersGridLayout",
				"propertyName": "items",
				"values": {
					"caption":  "SenderName",
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": "$SenderName",
					"controlConfig": {
						"enabled": false
					},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 11,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "SenderEmail",
				"parentName": "EmailHeadersGridLayout",
				"propertyName": "items",
				"values": {
					"caption": "SenderEmail",
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": "$SenderEmail",
					"controlConfig": {
						"enabled": false
					},
					"layout": {
						"column": 11,
						"row": 0,
						"colSpan": 11,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "Subject",
				"parentName": "EmailHeadersGridLayout",
				"propertyName": "items",
				"values": {
					"caption": "Subject",
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": "$Subject",
					"controlConfig": {
						"enabled": false
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreHeader",
				"parentName": "EmailHeadersGridLayout",
				"propertyName": "items",
				"values": {
					"caption": "PreHeader",
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": "$PreHeader",
					"controlConfig": {
						"enabled": false
					},
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 22,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "TemplateHtml",
				"parentName": "RightContainer",
				"propertyName": "items",
				"values": {
					"generator": function() {
						return {
							"className": "Terrasoft.IframeControl",
							"wrapClass": ["template-html-iframe"],
							"iframeContent": {
								"bindTo": "TemplateBody"
							},
							"fitHeightToContent": true
						};
					}
				}
			},
			{
				"operation": "insert",
				"name": "ReplicasContainerList",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"values": {
					"idProperty": "Id",
					"rowCssSelector": ".replica-item",
					"itemType": this.Terrasoft.ViewItemType.GRID,
					"collection": {
						"bindTo": "ReplicaCollection"
					},
					"generator": "ContainerListGenerator.generatePartial",
					"maskVisible": {
						"bindTo": "IsReplicaCollectionLoading"
					},
					"maskTimeout": 100,
					"selectableRowCss": "replica-item",
					"classes": {
						"wrapClassName": ["replica-container-list"]
					},
					"itemPrefix": "View",
					"dataItemIdPrefix": "replica-item",
					"isAsync": false,
					"activeItem": {
						"bindTo": "ActiveItemId"
					},
					"onItemClick": {
						"bindTo": "onItemClick"
					},
					"defaultItemConfig": {
						"className": "Terrasoft.Container",
						"id": "replica-item-view",
						"selectors": {
							"wrapEl": "#replica-item-view"
						},
						"classes": {
							"wrapClassName": ["replica-item-wrapper-container"]
						},
						"items": [{
							"className": "Terrasoft.Label",
							"classes": {
								"labelClass": ["label-wrap"]
							},
							"caption": {
								"bindTo": "Name"
							},
							"markerValue": {
								"bindTo": "Name"
							}
						}]
					}
				}
			}
		] /**SCHEMA_DIFF*/
	};
});


