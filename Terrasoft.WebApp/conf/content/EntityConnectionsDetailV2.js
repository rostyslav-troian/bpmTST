Terrasoft.configuration.Structures["EntityConnectionsDetailV2"] = {innerHierarchyStack: ["EntityConnectionsDetailV2"], structureParent: "BaseDetailV2"};
define('EntityConnectionsDetailV2Structure', ['EntityConnectionsDetailV2Resources'], function(resources) {return {schemaUId:'83e92bfd-9773-4516-a159-744723282dc4',schemaCaption: "Detail - Object connections", parentSchemaName: "BaseDetailV2", schemaName:'EntityConnectionsDetailV2',parentSchemaUId:'3052ff9d-521d-4a6d-ba92-04a2261e1ea8',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EntityConnectionsDetailV2", ["terrasoft", "EntityConnectionsDetailV2Resources", "EntityConnectionViewModel",
		"ConfigurationItemGenerator", "BaseDetailV2", "EntityConnectionLinksUtilities"],
	function(Terrasoft) {
		return {
			attributes: {

				/**
				 * ####### "###### #########".
				 */
				IsDataLoaded: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * ########## ## ####### ### ########## ##### ######.
				 */
				EntityInfo: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Page tips.
				 */
				PageTips: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * ########## # ######. ######## ### ##### # ####### ##########.
				 */
				DetailInfo: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * ########### ########## ##### ## #########.
				 * @type {Terrasoft.OrderDirection} [SortDirection=Terrasoft.OrderDirection.ASC]
				 */
				SortDirection: Terrasoft.OrderDirection.ASC

			},
			messages: {

				/**
				 * @message GetEntityInfo
				 * ######## ########## # ####### ### ######## ########## ########## #### #####.
				 */
				"GetEntityInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetPageTips
				 * Getting page tips to modify entity connection detail tips.
				 */
				"GetPageTips": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message EntityInitialized
				 * ######### ### ############# ######## #######. ###### ### ###### ######## ###### # ######## #####.
				 */
				"EntityInitialized": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetColumnsValues
				 * ########### # ######## ####### ######## ########## #######.
				 */
				"GetColumnsValues": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message LookupInfo
				 * ### ###### LookupUtilities. ######### ######## ######.
				 */
				"LookupInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ResultSelectedRows
				 * ### ###### LookupUtilities. ######## ###### ## ######.
				 */
				"ResultSelectedRows": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateCardProperty
				 * ############# ######## ######## ##############.
				 */
				"UpdateCardProperty": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetLookupQueryFilters
				 * ######## ####### ########## #######.
				 */
				"GetLookupQueryFilters": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetLookupListConfig
				 * ######## ########## # ########## ########## #######.
				 */
				"GetLookupListConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message EntityColumnChanged
				 * ######### ## ######### ######## ####### ####### ########.
				 */
				"EntityColumnChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetLookupValuePairs
				 * ########## ########## # ######### ## #########, ############ # ##### ###### ########## #######.
				 */
				"GetLookupValuePairs": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			mixins: {
				EntityConnectionLinksUtilities: Terrasoft.EntityConnectionLinksUtilities
			},
			methods: {

				/**
				 * Returns default item config.
				 * @private
				 * @param {String} columnName Column name.
				 * @param {Terrasoft.DataValueType} dataValueType Column dataValueType.
				 * @return {Object} Default item config.
				 */
				getDefaultItemConfig: function(columnName, dataValueType) {
					dataValueType = dataValueType || Terrasoft.DataValueType.LOOKUP;
					var defaultItemConfig = {
						itemType: Terrasoft.ViewItemType.MODEL_ITEM,
						dataValueType: dataValueType,
						name: columnName,
						caption: {bindTo: "Caption"},
						markerValue: {bindTo: "MarkerValue"}
					};
					switch (dataValueType) {
						case Terrasoft.DataValueType.LOOKUP:
							defaultItemConfig.controlConfig = {
								value: {bindTo: "Value"},
								list: {bindTo: "ValuesList"},
								href: {bindTo: "getHref"},
								linkclick: {bindTo: "onLinkClick"},
								linkmouseover: {bindTo: "linkMouseOver"},
								tag: {
									columnName: "Value",
									referenceSchemaName: columnName
								},
								showValueAsLink: true,
								hasClearIcon: true
							};
							break;
						default:
							defaultItemConfig.controlConfig = {
								value: {bindTo: "Value"}
							};
							break;
					}
					return defaultItemConfig;
				},

				/**
				 * Create instance of View Generator.
				 * @protected
				 * @return {Terrasoft.ViewGenerator}
				 */
				createViewGeneratorInstance: function() {
					return Ext.create("Terrasoft.ViewGenerator");
				},

				/**
				 * Append tip to column.
				 * @private
				 * @param {Object} itemConfig Entity connection item config.
				 * @param {String} columnName Entity connection column name.
				 */
				appendTip: function(itemConfig, columnName) {
					var pageTips = this.get("PageTips");
					if (pageTips && pageTips[columnName]) {
						this.Ext.merge(itemConfig, {
							tip: {
								content: pageTips[columnName]
							}
						});
					}
				},

				/**
				 * Generates item view config.
				 * @param {Object} itemConfig Item config.
				 * @param {Terrasoft.EntityConnectionViewModel} item Entity connection model item.
				 */
				getItemViewConfig: function(itemConfig, item) {
					var columnName = item.get("ColumnName");
					var itemViewConfig = this.get("ItemViewConfig") || [];
					if (itemViewConfig && itemViewConfig[columnName]) {
						itemConfig.config = itemViewConfig[columnName];
						return;
					}
					var dataValueType = item.get("DataValueType");
					var defaultItemConfig = this.getDefaultItemConfig(columnName, dataValueType);
					var viewGenerator = this.createViewGeneratorInstance();
					this.appendTip(defaultItemConfig, columnName);
					var editConfig = viewGenerator.generatePartial(
						{
							itemType: Terrasoft.ViewItemType.CONTAINER,
							wrapClass: ["control-width-15", "detail-edit-container-user-class"],
							items: [defaultItemConfig]
						},
						{
							schemaName: "EntityConnectionsDetailV2",
							viewModelClass: Ext.ClassManager.get("Terrasoft.EntityConnectionViewModel"),
							schema: {}
						}
					);
					itemConfig.config = editConfig[0];
					itemViewConfig[columnName] = editConfig[0];
					this.set("ItemViewConfig", itemViewConfig);
				},

				/**
				 * ############ ####### ######### ######## ####### ####### ########.
				 * @param {Object} changed
				 * @param {Text} changed.columnName ######## #######.
				 * @param {Object} changed.columnValue ######## #######.
				 */
				onEntityColumnChanged: function(changed) {
					var gridData = this.get("Collection");
					var filterResult = gridData.filterByFn(function(item) {
						return item.get("ColumnName") === changed.columnName;
					}, this);
					filterResult.each(function(item) {
						item.set("Value", changed.columnValue);
					}, this);
				},

				/**
				 * ######### ###### # ###### ############# ####### ##### #######.
				 * @private
				 * @param {Terrasoft.BaseViewModelCollection} inputCollection (optional)
				 * ######### ### ########## #######.
				 */
				loadColumnValues: function(inputCollection) {
					var collection = inputCollection || this.get("Collection");
					var columnValues = this.getColumnValues(inputCollection);
					collection.each(function(item) {
						var columnName = item.get("ColumnName");
						var columnValue = columnValues[columnName];
						item.set("Value", columnValue);
					}, this);
				},

				/**
				 * ######## ######## ###### ######## #######. ######## ####### ###### #### ######### ##
				 * ############### #########.
				 * @private
				 * @return {Object} ######## ####### #######.
				 */
				getColumnValues: function(inputCollection) {
					var sandbox = this.sandbox;
					var gridData = inputCollection || this.get("Collection");
					var linkColumnNames = [];
					gridData.each(function(gridItem) {
						var columnName = gridItem.get("ColumnName");
						linkColumnNames.push(columnName);
					}, this);
					return sandbox.publish("GetColumnsValues", linkColumnNames, [sandbox.id]);
				},

				/**
				 * ########## ####### ############ #######.
				 * @param {Object} entityInfo ########## # #######. ###, ######### # ######### #######.
				 * @private
				 */
				onEntityInitialized: function(entityInfo) {
					this.set("EntityInfo", entityInfo);
					if (this.get("IsDataLoaded")) {
						this.loadColumnValues();
					} else {
						var collection = this.get("Collection");
						this.loadEntityConnections(collection);
					}
				},

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						var sandbox = this.sandbox;
						var messageTags = [sandbox.id];
						var entityInfo = sandbox.publish("GetEntityInfo", null, messageTags);
						var pageTips = sandbox.publish("GetPageTips", null, messageTags);
						var detailInfo = this.getDetailInfo();
						this.set("PageTips", pageTips);
						this.set("EntityInfo", entityInfo);
						this.set("DetailInfo", detailInfo);
						this.onDetailCollapsedChanged(false);
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var sandbox = this.sandbox;
					var messageTags = [sandbox.id];
					sandbox.subscribe("EntityInitialized", this.onEntityInitialized, this, messageTags);
					sandbox.subscribe("EntityColumnChanged", this.onEntityColumnChanged, this, messageTags);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#onDetailCollapsedChanged
				 * @overridden
				 */
				onDetailCollapsedChanged: function(isCollapsed) {
					this.callParent(arguments);
					if (!isCollapsed && !this.get("IsDataLoaded") && this.get("EntityInfo")) {
						var collection = this.get("Collection");
						this.loadEntityConnections(collection);
					}
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "Detail",
					"values": {
						caption: {bindTo: "Resources.Strings.Caption"}
					}
				},
				{
					"operation": "insert",
					"name": "CommunicationsContainer",
					"parentName": "Detail",
					"propertyName": "items",
					"values": {
						generator: "ConfigurationItemGenerator.generateContainerList",
						idProperty: "Id",
						collection: "Collection",
						observableRowNumber: 10,
						onGetItemConfig: "getItemViewConfig"
					}
				},
				{
					"operation": "insert",
					"name": "AddButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						visible: {bindTo: "getToolsVisible"},
						itemType: Terrasoft.ViewItemType.BUTTON,
						caption: {bindTo: "Resources.Strings.AddButtonCaption"},
						controlConfig: {
							menu: {
								items: {bindTo: "ToolsMenuItems"}
							}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


