Terrasoft.configuration.Structures["DCClickHeatmapSchema"] = {innerHierarchyStack: ["DCClickHeatmapSchema"], structureParent: "BaseDCTemplateViewerSchema"};
define('DCClickHeatmapSchemaStructure', ['DCClickHeatmapSchemaResources'], function(resources) {return {schemaUId:'0eba45a5-382c-4328-b0d6-a8f66014df74',schemaCaption: "Click heatmap detail schema", parentSchemaName: "BaseDCTemplateViewerSchema", schemaName:'DCClickHeatmapSchema',parentSchemaUId:'6d2f3d59-cf4f-413b-a479-2b3c42693ef0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DCClickHeatmapSchema", ["css!DCClickHeatmapCSS", "BulkEmailClicksMap", "BaseClickHeatmapRowViewModel"],
	function() {
		return {
			messages: {

				/**
				 * @message GetClicksMapConfig
				 * Returns click maps config.
				 */
				"GetClicksMapConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},

			methods: {

				// region Methods: Private

				/**
				 * Returns selected replica item.
				 * @private
				 * @return {Terrasoft.BaseViewModel} Selected replica item.
				 */
				_getSelectedReplicaItem: function() {
					var collection = this.$ReplicaCollection;
					return collection.get(this.$ActiveItemId);
				},

				// endregion

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#getRowViewModelClassName
				 * @override
				 */
				getRowViewModelClassName: function() {
					return "Terrasoft.BaseClickHeatmapRowViewModel";
				},

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#loadTemplateContentFromBulkEmail
				 * @override
				 */
				loadTemplateContentFromBulkEmail: function() {
					this.showBodyMask();
					this.callParent();
					this.getLinksData(function() {
						this.loadReplicaContentModule();
						this.hideBodyMask();
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#loadReplicaContent
				 * @override
				 */
				loadReplicaContent: function(replicaId, callback, scope) {
					this.callParent([replicaId, function() {
						this.getLinksData(function() {
							this.loadReplicaContentModule();
							this.Ext.callback(callback, scope);
						}, this);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#loadReplicasFromRepository
				 * @override
				 */
				loadReplicasFromRepository: function(callback, scope) {
					this.$ReplicaRepository.loadSent(callback, scope);
				},

				/**
				 * Returns EntitySchemaQuery for BulkEmailHyperlink table.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery for BulkEmailHyperlink table.
				 */
				getHyperlinkClicksEsq: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "BulkEmailHyperlink"
					});
					esq.addColumn("Caption");
					esq.addColumn("Url");
					esq.addColumn("BpmTrackId");
					var clicksCountColumn = esq.addColumn("ClicksCount");
					clicksCountColumn.orderPosition = 1;
					clicksCountColumn.orderDirection = this.Terrasoft.OrderDirection.DESC;
					esq.filters.addItem(esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"BulkEmail",
						this.getMasterColumnValueByName(this.get("MasterColumnName"))));
					if (this.$HasReplica) {
						var selectedItem = this._getSelectedReplicaItem();
						var maskIndex = selectedItem.get("Mask");
						esq.filters.addItem(esq.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"BpmReplicaMask",
							maskIndex));
					}
					return esq;
				},

				/**
				 * Gets the data from the BulkEmailHyperlink table and then calls the callback function.
				 * @protected
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The context in which the callback function will be called.
				 */
				getHyperlinksClicksData: function(callback, scope) {
					var esq = this.getHyperlinkClicksEsq();
					esq.getEntityCollection(callback, scope);
				},

				/**
				 * Builds links data and sets in LinksData attribute.
				 * @protected
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The context in which the callback function will be called.
				 */
				getLinksData: function(callback, scope) {
					var linksData = [];
					this.getHyperlinksClicksData(function(response) {
						if (response && response.success) {
							response.collection.each(function(item) {
								var linkDto = {};
								linkDto.TrackId = item.get("BpmTrackId") === 0 ? undefined : item.get("BpmTrackId");
								linkDto.Url = item.get("Url");
								linkDto.ClicksCount = item.get("ClicksCount");
								linksData.push(linkDto);
							});
						}
						this.set("LinksData", linksData);
						this.Ext.callback(callback, scope, [linksData]);
					}, this);
				},

				/**
				 * Returns identifier for ClicksMapModule.
				 * @protected
				 * @return {String} ClicksMapModule identifier.
				 */
				getClicksMapModuleId: function() {
					return this.sandbox.id + "_ClicksMapModule";
				},

				/**
				 * Loads ReplicaContentModule.
				 * @protected
				 */
				loadReplicaContentModule: function() {
					var clicksMapModuleId = this.getClicksMapModuleId();
					this.sandbox.loadModule("BulkEmailClicksMap", {
						renderTo: "DCClickHeatmapRightContainer",
						id: clicksMapModuleId
					});
				},

				/**
				 * Subscribes on sandbox events.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					this.callParent();
					this.sandbox.subscribe("GetClicksMapConfig", function() {
						return {
							htmlText: this.get("TemplateBody"),
							linksData: this.get("LinksData")
						};
					}, this, [this.getClicksMapModuleId()]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData.
				 * @override
				 */
				getGoogleTagManagerData: function() {
					var data = this.callParent(arguments);
					var actionTag = this.$LastActionTag;
					if (!this.Ext.isEmpty(actionTag)) {
						this.Ext.apply(data, {
							action: actionTag
						});
					}
					return data;
				},

				/**
				 * Loads replica recipient count data.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution context.
				 */
				getRecipientCountData: function(callback, scope) {
					this.callService({
						serviceName: "BulkEmailTemplateService",
						methodName: "GetDcReplicasRecipientCount",
						data: {
							replicaIds: this.$ReplicaCollection.getKeys()
						}
					}, function(response) {
						var replicas = response && response.replicas;
						this.Ext.callback(callback, scope, [replicas]);
					}, this);
				},

				/**
				 * Sets replica recipient count data to replica items.
				 * @protected
				 * @param {Array} replicaDataCollection Replica data collection.
				 */
				setRecipientCountData: function(replicaDataCollection) {
					if (!this.Ext.isArray(replicaDataCollection)) {
						return;
					}
					var replicaCollection = this.$ReplicaCollection;
					var allRecipientCount =
						this.Terrasoft.reduce(replicaDataCollection, function(recipientCount, replicaData) {
							return recipientCount + replicaData.RecipientCount;
						}, 0, this);
					this.Terrasoft.each(replicaDataCollection, function(replicaData) {
						var replicaItem = replicaCollection.find(replicaData.Id);
						if (!replicaItem) {
							return;
						}
						var recipientCount = replicaData.RecipientCount;
						var replicaPercent = recipientCount / allRecipientCount * 100;
						if (Math.floor(replicaPercent) !== replicaPercent) {
							replicaPercent = Number(replicaPercent.toFixed(2));
						}
						replicaItem.set("RecipientCount", recipientCount);
						replicaItem.set("ReplicaPercent", replicaPercent);
						replicaItem.set("ReplicaRecipientInfoTextVisible", true);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					if (this.getMasterColumnValueByName("IsAnalysisVisible")) {
						this.callParent(arguments);
					}
				},

				// endregion

				// region Methods: Public

				/**
				 * Handles calculate recipients button click event.
				 */
				onCalculateRecipientsButtonClick: function() {
					this.$LastActionTag = "CalculateRecipients";
					this.sendGoogleTagManagerData();
					this.showBodyMask();
					this.getRecipientCountData(function(replicaDataCollection) {
						this.setRecipientCountData(replicaDataCollection);
						this.hideBodyMask();
					}, this);
				},

				/**
				 * Returns calculate recipients button visible value.
				 * @return {Boolean}
				 */
				getCalculateRecipientsButtonVisible: function() {
					var replicaCollection = this.$ReplicaCollection;
					return (replicaCollection && replicaCollection.getCount() > 1 && this.getToolsVisible());
				}

				// endregion

			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "merge",
					"name": "OuterContainer",
					"values": {
						"id": "DCClickHeatmapOuterContainer"
					}
				},
				{
					"operation": "merge",
					"name": "RightContainer",
					"values": {
						"id": "DCClickHeatmapRightContainer"
					}
				},
				{
					"operation": "insert",
					"name": "CalculateRecipientsButton",
					"parentName": "BaseDCTemplateViewerControlGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.CalculateRecipientsButtonCaption"
						},
						"click": {
							"bindTo": "onCalculateRecipientsButtonClick"
						},
						"visible": {
							"bindTo": "getCalculateRecipientsButtonVisible"
						}
					}
				},
				{
					"operation": "remove",
					"name": "TemplateHtml"
				},
				{
					"operation": "merge",
					"name": "ReplicasContainerList",
					"values": {
						"dataItemIdPrefix": "heatmap-replica-item",
						"defaultItemConfig": {
							"className": "Terrasoft.Container",
							"id": "heatmap-replica-item-view",
							"selectors": {
								"wrapEl": "#heatmap-replica-item-view"
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
							}, {
								"className": "Terrasoft.Label",
								"classes": {
									"labelClass": ["label-wrap", "replica-recipient-count-info-label"]
								},
								"visible": {
									"bindTo": "ReplicaRecipientInfoTextVisible"
								},
								"caption": {
									"bindTo": "getReplicaRecipientInfoText"
								},
								"markerValue": {
									"bindTo": "getReplicaRecipientInfoText"
								}
							}]
						}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


