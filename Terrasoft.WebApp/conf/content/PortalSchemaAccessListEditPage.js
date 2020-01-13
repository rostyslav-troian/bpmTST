Terrasoft.configuration.Structures["PortalSchemaAccessListEditPage"] = {innerHierarchyStack: ["PortalSchemaAccessListEditPage"], structureParent: "BaseLookupPage"};
define('PortalSchemaAccessListEditPageStructure', ['PortalSchemaAccessListEditPageResources'], function(resources) {return {schemaUId:'1dd42ce3-4438-4735-b90b-188add7de976',schemaCaption: "PortalSchemaAccessListEditPage", parentSchemaName: "BaseLookupPage", schemaName:'PortalSchemaAccessListEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalSchemaAccessListEditPage", ["PortalSchemaAccessListEditPageResources"],
	function() {
		return {
			entitySchemaName: "PortalSchemaAccessList",
			attributes: {
				"SysEntitySchema": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isLookup: true,
					lookupListConfig: {
						columns: ["UId", "Caption", "Name"],
						filter: function() {
							return this.getSysEntitySchemaFilter();
						}
					},
					referenceSchema: {
						name: "VwSysSchemaInfo",
						primaryColumnName: "Name",
						primaryDisplayColumnName: "Caption"
					},
					referenceSchemaName: "VwSysSchemaInfo"
				},
				"SysEntitySchemaUId": {
					dependencies: [{
						columns: ["SysEntitySchema"],
						methodName: "onSysEntitySchemaChanged"
					}]
				},
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "Name"
				},
				"IsDetailVisible": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},
				"IsAddMode": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			details: /**SCHEMA_DETAILS*/{
				"PortalSchemaAccessListDetail": {
					"schemaName": "PortalSchemaAccessListDetail",
					"entitySchemaName": "PortalColumnAccessList",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "PortalSchemaList"
					}
				}
			}/**SCHEMA_DETAILS*/,
			messages: {
				"UpdatePageHeaderCaption": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			diff: [
				{
				"operation": "remove",
				"name": "Name"
				},
				{
					"operation": "remove",
					"name": "Description"
				},
				{
					"operation": "insert",
					"name": "PortalSchemaAccessListTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.PortalAccessColumnsTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "PortalSchemaAccessListTab",
					"propertyName": "items",
					"name": "PortalSchemaAccessListDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "IsDetailVisible"}
					}
				}
			],

			methods: {

				/**
				 * Returns SysEntitySchema filter.
				 * @protected
				 * @returns {Terrasoft.FilterGroup} Filter group
				 */
				getSysEntitySchemaFilter: function(){
					var filters = this.Ext.create("Terrasoft.FilterGroup");
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"SysWorkspace",
							this.Terrasoft.SysValue.CURRENT_WORKSPACE.value
					));
					filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"ManagerName",
							"EntitySchemaManager"
					));
					return filters;
				},

				/**
				 * On SysEntitySchema field change handler.
				 * @protected
				 */
				onSysEntitySchemaChanged: function() {
					var schema = this.get("SysEntitySchema");
					var uid = schema.UId;
					var name = schema.Name;
					this.set("SchemaUId", uid);
					this.set("AccessEntitySchemaName", name);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.setPageCaptionHeader();
					var entitySchemaName = this.get("AccessEntitySchemaName");
					this.Terrasoft.require([entitySchemaName], function(){
						this.set("IsDetailVisible", true);
					}, this);
				},

				/**
				 * @inheritDoc BasePageV2#initActionButtonMenu
				 * @overridden
				 */
				initActionButtonMenu: function() {
					this.set("ActionsButtonVisible", false);
				},

				/**
				 * Set page caption.
				 * @protected
				 * @virtual
				 */
				setPageCaptionHeader: function() {
					var selectQuery = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysSchema"
					});
					selectQuery.addColumn("Caption");
					selectQuery.filters.add("SysSchemaCaptionFilter",
							selectQuery.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"UId", this.get("SchemaUId")));
					selectQuery.getEntityCollection(function(response) {
						if (response && response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var entitySchema = collection.getByIndex(0);
								var entitySchemaCaption = entitySchema.get("Caption");
								this.sandbox.publish("UpdatePageHeaderCaption", {
									pageHeaderCaption: entitySchemaCaption
								});
							}
						}
					}, this);
				}
			}
		};
	});


