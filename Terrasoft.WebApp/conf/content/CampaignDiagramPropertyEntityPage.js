Terrasoft.configuration.Structures["CampaignDiagramPropertyEntityPage"] = {innerHierarchyStack: ["CampaignDiagramPropertyEntityPage"], structureParent: "CampaignDiagramPropertyBasePage"};
define('CampaignDiagramPropertyEntityPageStructure', ['CampaignDiagramPropertyEntityPageResources'], function(resources) {return {schemaUId:'3c811c21-97f5-46b9-bc3c-8c4b9bd6741b',schemaCaption: "CampaignDiagramPropertyEntityPage", parentSchemaName: "CampaignDiagramPropertyBasePage", schemaName:'CampaignDiagramPropertyEntityPage',parentSchemaUId:'0f24dae0-9f13-4c0d-9d7e-5ca645f2dcc8',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignDiagramPropertyEntityPage", ["terrasoft", "CampaignDiagramPropertyEntityPageResources",
			"LookupUtilities", "CampaignEnums", "NetworkUtilities"],
		function(Terrasoft, resources, LookupUtilities, CampaignEnums, NetworkUtilities) {
			return {
				attributes: {
					/**
					 * ###### ########.
					 */
					"DiagramElementImage": {
						dataValueType: Terrasoft.DataValueType.IMAGELOOKUP,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * ######### ######.
					 */
					"DiagramElementLookup": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * #### ############ ##### ########### ########.
					 */
					"IsExtendedMode": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: true
					},

					/**
					 * ######## ########.
					 */
					"CampaignDiagramPropertyDescription": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				methods: {
					/**
					 * ########## ######### ##### ############ ### ######### ########.
					 * @protected
					 * @return {Array} ######### #####.
					 */
					getUsedColumns: function() {
						return null;
					},

					/**
					 * ########## ######### ########, ### ########### #### Entity.
					 * @protected
					 * @return {Terrasoft.FiltersGroup || null} ######### ########.
					 */
					getCustomLookupFilters: function() {
						return null;
					},

					/**
					 * ######### ###### ## ####### ########.
					 * @overridden
					 * @return {Terrasoft.EntitySchemaQuery}
					 */
					getEntitySchemaQuery: function() {
						var entitySchemaQuery = this.callParent(arguments);
						var removeColumns = [];
						var usedColumns = this.getUsedColumns();
						if (usedColumns) {
							entitySchemaQuery.columns.eachKey(function(key) {
								if (usedColumns.indexOf(key) === -1) {
									removeColumns.push(key);
								}
							}, this);
							Terrasoft.each(removeColumns, function(key) {
								entitySchemaQuery.columns.removeByKey(key);
							}, this);
						}
						return entitySchemaQuery;
					},

					/**
					 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
					 */
					getLookupQuery: function(filterValue, columnName) {
						if (columnName !== "DiagramElementLookup") {
							return this.callParent(arguments);
						}
						var referenceSchemaName = this.get("DiagramElementSchemaName");
						var entitySchemaQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: referenceSchemaName,
							rowCount: 1
						});
						entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
						entitySchemaQuery.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN,
							"displayValue");
						var lookupComparisonType = this.getLookupComparisonType();
						var lookupFilter = entitySchemaQuery.createPrimaryDisplayColumnFilterWithParameter(
								lookupComparisonType, filterValue, this.Terrasoft.DataValueType.TEXT);
						entitySchemaQuery.filters.add("LookupFilter", lookupFilter);
						lookupFilter.isEnabled = !!filterValue;
						var filters = this.getCustomLookupFilters();
						if (filters) {
							entitySchemaQuery.filters.add(this.getCustomLookupFilters());
						}
						return entitySchemaQuery;
					},

					/**
					 * ############## ######### ########### ####.
					 * @protected
					 */
					getDiagramLookupConfig: function() {
						var config = {
							entitySchemaName: this.get("DiagramElementSchemaName"),
							multiSelect: false
						};
						var filters = this.getCustomLookupFilters();
						if (filters) {
							config.filters = filters;
						}
						return config;
					},

					/**
					 * ######### ######## ########## ####### # #### DiagramElementLookup.
					 * @protected
					 */
					loadDiagramElementSchemaLookup: function() {
						var self = this;
						var config = this.getDiagramLookupConfig();
						LookupUtilities.Open(this.sandbox, config, function(args) {
							var collection = args.selectedRows;
							if (collection.getCount() > 0) {
								var selectedItem = collection.getItems()[0];
								self.set("DiagramElementLookup", selectedItem);
								this.loadEntity(selectedItem.value, null, this);
							}
						}, this, null, false, false);
					},

					/**
					 * Returns page icon URL.
					 * @protected
					 * @return {String} Page icon URL..
					 */
					getPageIconSrc: function() {
						return this.get("DiagramElementPageIconUrl");
					},

					/**
					 * ######### ######## ########## ####### # #### DiagramElementLookup.
					 * @protected
					 */
					loadDiagramEntity: function(callback, scope) {
						var recordId = this.get("DiagramElementRecordId");
						if (recordId) {
							this.loadEntity(recordId, function(entity) {
								var config = this.formLookupConfig(entity);
								this.set("DiagramElementLookup", config);
								callback.call(scope);
							}, this);
						} else {
							callback.call(scope);
						}
					},

					/**
					 * Forms diagram element lookup config.
					 * @protected
					 * @virtual
					 * @param {Terrasoft.BaseViewModel} entity Entity.
					 * @returns {Object} Diagram element lookup config.
					 */
					formLookupConfig: function(entity) {
						return {
							value: entity.get(entity.primaryColumnName),
							displayValue: entity.get(entity.primaryDisplayColumnName)
						};
					},

					/**
					 * Sets page view mode.
					 * @protected
					 */
					setPageMode: function() {
					},

					/**
					 * ############## ######### ######## ######.
					 * @protected
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.on("change:DiagramElementCaption",
									this.onDiagramElementChanged, this);
							this.on("change:DiagramElementLookup",
									this.onDiagramElementChanged, this);
							this.setPageMode();
							this.loadDiagramEntity(function() {
								callback.call(scope);
							}, this);
						}, this]);
					},

					/**
					 * ############# ######## null ### ##### ########.
					 * @protected
					 */
					clearEntityColumns: function() {
						Terrasoft.each(this.columns, function(column, columnName) {
							if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
								this.set(columnName, null);
							}
						}, this);
					},

					/**
					 * ########## ####### ########## ##### DiagramElementCaption # DiagramElementLookup.
					 * @protected
					 */
					onDiagramElementChanged: function() {
						var recordId = this.get("DiagramElementLookup") ? this.get("DiagramElementLookup").value : null;
						var config = {
							elementId: this.get("DiagramElementId"),
							addInfo: {RecordId: recordId},
							labelText: this.get("DiagramElementCaption")
						};
						if (!recordId) {
							this.clearEntityColumns();
						}
						this.sandbox.publish("UpdateDiagramElement", config);
					},

					/**
					 * ######## ######## ###########
					 * @protected
					 * @param {String} columnName ### #######
					 */
					getLinkUrl: function(columnName) {
						if (columnName !== "DiagramElementLookup") {
							return this.callParent(arguments);
						}

						var referenceSchemaName = this.get("DiagramElementSchemaName");
						var column = this.get("DiagramElementLookup");
						if (column) {
							var typeAttr = NetworkUtilities.getTypeColumn(referenceSchemaName);
							var typeUId;
							if (typeAttr && column[typeAttr.path]) {
								typeUId = column[typeAttr.path].value;
							}
							if (referenceSchemaName === "ContactFolder") {
								return {};
							}
							var url = NetworkUtilities.getEntityUrl(referenceSchemaName, column.value, typeUId);
							return {
								url: "ViewModule.aspx#" + url,
								caption: column.displayValue
							};
						}
						return {};
					}
				},
				messages: {
					"UpdateDiagramElement": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"CardChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},

				mixins: {
					LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin"
				},

				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "NotSelectedLabel"
					},
					{
						"operation": "remove",
						"name": "NotSelectedImage"
					},
					{
						"operation": "insert",
						"name": "Header",
						"parentName": "CampaignDiagramPropertyContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["header"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Column-1",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["column-1"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Column-2",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["column-2"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "DiagramElementImage",
						"parentName": "Column-1",
						"propertyName": "items",
						"values": {
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getPageIconSrc",
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"classes": {
								"wrapClass": ["page-icon-wrap"]
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "DiagramElementPageTypeCaption",
						"parentName": "Column-2",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "DiagramElementPageTypeCaption"
							},
							"classes": {
								"labelClass": ["label-type"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "DiagramElementCaption",
						"parentName": "Column-2",
						"propertyName": "items",
						"values": {
							"labelConfig": {
								"visible": false
							}
						}
					},
					{
						"operation": "insert",
						"name": "CampaignDiagramPropertyEntityMainContainer",
						"parentName": "CampaignDiagramPropertyContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["main"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CampaignDiagramPropertyDescriptionContainer",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["description-container"],
							"items": [
								{
									"itemType": Terrasoft.ViewItemType.LABEL,
									"classes": {
										"labelClass": [
											"description-label"
										],
										"wrapClass": [
											"description-wrap"
										]
									},
									"caption": {
										"bindTo": "CampaignDiagramPropertyDescription"
									}
								}
							]
						}
					},
					{
						"operation": "insert",
						"name": "DiagramElementLookup",
						"parentName": "CampaignDiagramPropertyEntityMainContainer",
						"propertyName": "items",
						"values": {
							"bindTo": "DiagramElementLookup",
							"dataValueType": Terrasoft.DataValueType.LOOKUP,
							"caption": {
								"bindTo": "DiagramElementPageTypeCaption"
							},
							"controlConfig": {
								"loadVocabulary": {
									"bindTo": "loadDiagramElementSchemaLookup"
								},
								"tag": "DiagramElementLookup"
							},
							"visible": {
								"bindTo": "IsExtendedMode"
							},
							"markerValue": {"bindTo": "DiagramElementPageTypeCaption"},
							"enabled": {"bindTo": "IsStatusEnabled"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


