Terrasoft.configuration.Structures["RuleRelationLookupEditPageV2"] = {innerHierarchyStack: ["RuleRelationLookupEditPageV2"], structureParent: "BaseModulePageV2"};
define('RuleRelationLookupEditPageV2Structure', ['RuleRelationLookupEditPageV2Resources'], function(resources) {return {schemaUId:'bad8f2d6-ab7c-4d6b-9e89-4d8a5cc1c5af',schemaCaption: "Edit page - Connection rules", parentSchemaName: "BaseModulePageV2", schemaName:'RuleRelationLookupEditPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("RuleRelationLookupEditPageV2", ["RuleRelationLookupEditPageV2Resources", "EntityStructureHelper"],
	function(resources, EntityStructureHelper) {
		return {
			entitySchemaName: "RuleRelation",
			details: /**SCHEMA_DETAILS*/{
				ActionsInRule: {
					schemaName: "FieldForceActionsInRuleDetailV2",
					entitySchemaName: "FieldForceActionsInRule",
					filter: {
						masterColumn: "Id",
						detailColumn: "FieldForceRule"
					}
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {
				"SchemaUIdFrom": {
					caption: {bindTo: "Resources.Strings.ObjectCaption"},
					referenceSchemaName: "SysModule",
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isLookup: true,
					enabled: false

				},
				"ColumnUIdFrom": {
					caption: {bindTo: "Resources.Strings.ColumnCaption"},
					referenceSchemaName: "SysModule",
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isLookup: true
				},
				"SchemaUIdTo": {
					caption: {bindTo: "Resources.Strings.ObjectCaption"},
					referenceSchemaName: "SysModule",
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isLookup: true

				},
				"ColumnUIdTo": {
					caption: {bindTo: "Resources.Strings.ColumnCaption"},
					referenceSchemaName: "SysModule",
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isLookup: true
				},
				"ColumnUIdFromControlEnabled": false,
				"ColumnUIdToControlEnabled": false
			},
			methods: {
				/**
				 * ######## ###### #### ###### "########".
				 * @inheritdoc BasePageV2#initActionButtonMenu
				 * @overridden
				 */
				initActionButtonMenu: Terrasoft.emptyFn,
				/**
				 * ######## ###### #### ###### "###".
				 * @inheritdoc BasePageV2#initActionButtonMenu
				 * @overridden
				 */
				initViewOptionsButtonMenu: Terrasoft.emptyFn,

				/**
				 * ############## ######### ######## ######.
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("SchemaList", this.Ext.create("Terrasoft.Collection"));
					this.set("SchemaColumnList", this.Ext.create("Terrasoft.Collection"));
					this.set("DependentSchemaList", this.Ext.create("Terrasoft.Collection"));
					this.set("DependentSchemaColumnList", this.Ext.create("Terrasoft.Collection"));
					this.initEntityStructureHelper();
				},

				/**
				 * ########## ######### ########.
				 * @protected
				 * @virtual
				 */
				getHeader: function() {
					return this.get("Resources.Strings.HeaderCaption");
				},

				/**
				 * ###### ######## ########### ## ######### #### ######## ####### ## ##############.
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.setValues();
				},

				/**
				 * ############# EntityStructureHelper.
				 */
				initEntityStructureHelper: function() {
					var params = this.sandbox.publish("StructureExplorerInfo", null, [this.sandbox.id]);
					if (this.Ext.isEmpty(params)) {
						params = {
							summaryColumnsOnly: false,
							useBackwards: true,
							firstColumnsOnly: false
						};
					}
					params.sa = this.sandbox;
					EntityStructureHelper.init(params);
				},

				/**
				 * ######### # ####### ######## ####### ## #####.
				 * @param {String} schemaNameAttribute ### ##### ### ###### #######
				 * @param {String} entitySchemaColumnUIdAttribute ### #######
				 * @param {String} setAttributeName ### ######### # ####### ###########
				 */
				setColumnItem: function(schemaNameAttribute, entitySchemaColumnUIdAttribute, setAttributeName) {
					var schemaName = this.get(schemaNameAttribute);
					var entitySchemaColumnUId = this.get(entitySchemaColumnUIdAttribute);
					if (this.Ext.isEmpty(entitySchemaColumnUId) || this.Ext.isEmpty(schemaName)) {
						return;
					}
					EntityStructureHelper.getItems({referenceSchemaName: schemaName}, function(items) {
						var item = items[entitySchemaColumnUId];
						if (!item) {
							return;
						}
						this.set(setAttributeName, item);
					}, false, this);
				},

				/**
				 * ######### # ############# ###### #######.
				 * @param {String} attribute ### #########
				 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######
				 */
				setTextColumnItems: function(attribute, list) {
					if (this.Ext.isEmpty(attribute)) {
						return;
					}
					var fromSchemaName = this.get(attribute);
					if (this.Ext.isEmpty(fromSchemaName)) {
						return;
					}
					EntityStructureHelper.getItems({referenceSchemaName: fromSchemaName}, function(items) {
						var textItems = {};
						Terrasoft.each(items, function(item) {
							if (item.dataValueType === Terrasoft.DataValueType.TEXT) {
								textItems[item.value] = item;
							}
						});
						list.loadAll(textItems);
					}, false, this);
				},

				/**
				 * ############# ######## ########## # ######## ####### ######### #####.
				 */
				initColumnUIdFromValue: function() {
					this.setColumnItem("fromSchemaName", "EntitySchemaColumnUId", "ColumnUIdFromValue");
				},

				/**
				 * ############# ######## ########## # ######## # ####### #########.
				 */
				initColumnUIdToValue: function() {
					this.setColumnItem("toSchemaName", "EntitySchemaSearchColumnUId", "ColumnUIdToValue");
				},

				/**
				 * ############# ######## ###########.
				 */
				setValues: function() {
					this.setSchemaControlValue(
						"EntitySchemaUId",
						"SchemaUIdFromValue",
						"fromSchemaName",
						function() {
							this.set("ColumnUIdFromControlEnabled", true);
							this.initColumnUIdFromValue();
						});
					this.setSchemaControlValue(
						"EntitySchemaSearchUId",
						"SchemaUIdToValue",
						"toSchemaName",
						function() {
							this.set("ColumnUIdToControlEnabled", true);
							this.initColumnUIdToValue();
						});
				},

				/**
				 * ############# ######## ### ##########.
				 * @param {String} column
				 * @param {String} itemProperty
				 * @param {String} schemaNameProperty
				 * @param {function} callback ####### ######### ######. ########## # ####### ########## ########
				 */
				setSchemaControlValue: function(column, itemProperty, schemaNameProperty, callback) {
					var columnValue = this.get(column);
					if (!columnValue) {
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysSchema"
					});
					esq.isDistinct = true;
					esq.addColumn("Name");
					esq.addColumn("Caption");
					esq.filters.add("UId", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "UId", columnValue));
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						if (!result.collection.isEmpty()) {
							var firstItem = result.collection.getByIndex(0);
							var itemCaption = firstItem.get("Caption");
							var schemaName = firstItem.get("Name");
							this.set(itemProperty, {
								displayValue: itemCaption,
								value: columnValue
							});
							this.set(schemaNameProperty, schemaName);
							callback.call(this);
						}
					}, this);
				},

				/**
				 * ######### ######### ######### ### #####. ########## ## ##### ## ########## "######".
				 * @param {String} filter ##### ## ######## ##### ############# #####
				 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######
				 */
				setDestinationSchemaList: function(filter, list) {
					if (this.Ext.isEmpty(list)) {
						return;
					}
					list.clear();
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "RuleRelationSections",
						isDistinct: true
					});
					esq.addColumn("SectionSchemaUId", "UId");
					esq.addColumn("[SysSchema:UId:SectionSchemaUId].Name", "Name");
					esq.addColumn("[SysSchema:UId:SectionSchemaUId].Caption", "Caption");
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						var collection = result.collection;
						var columns = {};
						if (!collection.isEmpty()) {
							collection.each(function(item) {
								var itemUId = item.get("UId");
								var itemName = item.get("Caption");
								if (!list.contains(itemUId)) {
									columns[itemUId] = {
										displayValue: itemName,
										value: itemUId
									};
								}
							});
						}
						list.loadAll(columns);
					}, this);
				},

				/**
				 * ######### ######### ######### ### #####. ########## ## ##### ## ########## "###### ####### ###########".
				 * @param {String} filter ##### ## ######## ##### ############# #####
				 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######
				 */
				setFromSchemaList: function(filter, list) {
					if (this.Ext.isEmpty(list)) {
						return;
					}
					list.clear();
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "RuleRelationSections",
						isDistinct: true
					});
					esq.addColumn("SectionSchemaUId", "UId");
					esq.addColumn("[SysSchema:UId:SectionSchemaUId].Name", "Name");
					esq.addColumn("[SysSchema:UId:SectionSchemaUId].Caption", "Caption");
					filter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Name", "ACTIVITY");
					esq.filters.addItem(filter);
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						var collection = result.collection;
						var columns = {};
						if (!collection.isEmpty()) {
							collection.each(function(item) {
								var itemUId = item.get("UId");
								var itemName = item.get("Caption");
								if (!list.contains(itemUId)) {
									columns[itemUId] = {
										displayValue: itemName,
										value: itemUId
									};
								}
							});
						}
						list.loadAll(columns);
					}, this);
				},

				/**
				 * ########## ####### ## ######### # ######## ####### #########.
				 * @param {String} filter ##### ## ######## ##### ############# #####
				 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######
				 */
				setColumnList: function(filter, list) {
					if (this.Ext.isEmpty(list)) {
						return;
					}
					list.clear();
					this.setTextColumnItems("fromSchemaName", list);
				},

				/**
				 * ########## ####### ## ######### # ######## ### #####.
				 * @param {String} filter ##### ## ######## ##### ############# #####
				 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######
				 */
				setDependentColumnList: function(filter, list) {
					if (this.Ext.isEmpty(list)) {
						return;
					}
					list.clear();
					this.setTextColumnItems("toSchemaName", list);
				},

				/**
				 * ########## ###### ####### ## ########## ####### ### #####.
				 * @param {Object} item ##### ######
				 */
				changeSchemaFrom: function(item) {
					if (this.Ext.isEmpty(item)) {
						return;
					}
					this.set("ColumnUIdFromValue", null);
					this.set("EntitySchemaUId", item.value);
					this.set("ColumnUIdFromControlEnabled", true);
					this.getSchemaNameByUId(item.value, function(schemaName) {
						this.set("fromSchemaName", schemaName);
					});
				},

				/**
				 * ########## ###### ####### ## ########## ####### # ####### ###########.
				 * @param {Object} item ##### ######
				 */
				changeSchemaTo: function(item) {
					if (this.Ext.isEmpty(item)) {
						return;
					}
					this.set("ColumnUIdToValue", null);
					this.set("EntitySchemaSearchUId", item.value);
					this.set("ColumnUIdToControlEnabled", true);
					this.getSchemaNameByUId(item.value, function(schemaName) {
						this.set("toSchemaName", schemaName);
					}, this);
				},

				/**
				 * ########## ###### ####### ## ########## ####### ### #####.
				 * @param {Object} item ##### ######
				 */
				changeColumnFrom: function(item) {
					if (!this.Ext.isEmpty(item)) {
						this.set("EntitySchemaColumnUId", item.value);
					} else {
						this.set("EntitySchemaColumnUId", null);
					}
				},

				/**
				 * ########## ###### ####### ## ########## ####### # ####### ###########.
				 * @param {Object} item ##### ######
				 */
				changeColumnTo: function(item) {
					if (!this.Ext.isEmpty(item)){
						this.set("EntitySchemaSearchColumnUId", item.value);
					} else {
						this.set("EntitySchemaSearchColumnUId", null);
					}
				},

				/**
				 * ######## ######## ##### ## UId'# # ########## ########## # callback
				 * @param {String} uid
				 * @param {function} callback ####### ######### ######. ########## # ####### ########## ######## #####
				 * @param {Object} scope
				 */
				getSchemaNameByUId: function(uid, callback, scope) {
					Terrasoft.EntitySchemaManager.initialize(function() {
						var items = Terrasoft.EntitySchemaManager.getItems();
						var itemObject = items
							.filterByFn(function(item) {
								return item.uId === uid;
							});
						if (this.Ext.isEmpty(itemObject)) {
							return;
						}
						var item = itemObject.getByIndex(0);
						if (this.Ext.isEmpty(item)) {
							return;
						}
						callback.call(scope || this, item.name);
					}, this);
				}
			},
			messages: {
				/**
				 * @message GetEntitySchema
				 * ########## ######### GetEntitySchema.
				 */
				"GetEntitySchema": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message StructureExplorerInfo
				 * ########## ######### StructureExplorerInfo.
				 */
				"StructureExplorerInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "Tabs"
				},
				{
					"operation": "remove",
					"name": "TabsContainer"
				},
				{
					"operation": "remove",
					"name": "ViewOptionsButton"
				},
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 0
						}
					}
				},
				{
					"operation": "insert",
					"name": "Description",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 1
						}
					}
				},
				{
					"operation": "insert",
					"name": "Rule",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 2
						}
					}
				},
				{
					"operation": "insert",
					"name": "ObjectFromControlGroup",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {bindTo: "Resources.Strings.ObjectFromCaption"},
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 4
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ObjectFromControlGroup",
					"propertyName": "items",
					"name": "ObjectFromLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ObjectToControlGroup",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {bindTo: "Resources.Strings.ObjectToCaption"},
						"layout": {
							"colSpan": 24,
							"column": 0,
							"row": 5
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ObjectToControlGroup",
					"propertyName": "items",
					"name": "ObjectToLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SchemaUIdFromControl",
					"parentName": "ObjectFromLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"bindTo": "SchemaUIdFrom",
						"enabled": true,
						"isRequired": true,
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {"bindTo": "setFromSchemaList"},
							"value": {
								"bindTo": "SchemaUIdFromValue"
							},
							"change": {"bindTo": "changeSchemaFrom"},
							"list": {"bindTo": "SchemaList"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ColumnUIdFromControl",
					"parentName": "ObjectFromLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"bindTo": "ColumnUIdFrom",
						"enabled": {"bindTo": "ColumnUIdFromControlEnabled"},
						"isRequired": true,
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {"bindTo": "setColumnList"},
							"list": {"bindTo": "SchemaColumnList"},
							"change": {"bindTo": "changeColumnFrom"},
							"value": {
								"bindTo": "ColumnUIdFromValue"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "SchemaUIdToControl",
					"parentName": "ObjectToLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"bindTo": "SchemaUIdTo",
						"enabled": true,
						"isRequired": true,
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {"bindTo": "setDestinationSchemaList"},
							"value": {
								"bindTo": "SchemaUIdToValue"
							},
							"change": {"bindTo": "changeSchemaTo"},
							"list": {"bindTo": "DependentSchemaList"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ColumnUIdToControl",
					"parentName": "ObjectToLayout",
					"propertyName": "items",
					"values": {
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"bindTo": "ColumnUIdTo",
						"enabled": {"bindTo": "ColumnUIdToControlEnabled"},
						"isRequired": true,
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {"bindTo": "setDependentColumnList"},
							"list": {"bindTo": "DependentSchemaColumnList"},
							"change": {"bindTo": "changeColumnTo"},
							"value": {
								"bindTo": "ColumnUIdToValue"
							}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


