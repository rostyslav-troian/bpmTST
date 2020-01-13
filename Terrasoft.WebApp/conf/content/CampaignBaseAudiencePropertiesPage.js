Terrasoft.configuration.Structures["CampaignBaseAudiencePropertiesPage"] = {innerHierarchyStack: ["CampaignBaseAudiencePropertiesPage"], structureParent: "BaseCampaignSchemaElementPage"};
define('CampaignBaseAudiencePropertiesPageStructure', ['CampaignBaseAudiencePropertiesPageResources'], function(resources) {return {schemaUId:'17fd5389-0014-4c8d-942a-b1b2315915f7',schemaCaption: "CampaignBaseAudiencePropertiesPage", parentSchemaName: "BaseCampaignSchemaElementPage", schemaName:'CampaignBaseAudiencePropertiesPage',parentSchemaUId:'13b73e23-fb4d-41fb-850b-0f4ae4c3e9f1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Schema of campaign base audience properties page.
 */
define("CampaignBaseAudiencePropertiesPage", ["LookupUtilities",
		"MarketingEnums", "DropdownLookupMixin"],
	function(LookupUtilities, MarketingEnums) {
		return {
			messages: {},
			mixins: {
				CampaignElementMixin: "Terrasoft.CampaignElementMixin",
				dropdownLookupMixin: "Terrasoft.DropdownLookupMixin"
			},
			attributes: {
				/**
				 * Folder linked to current element.
				 */
				"Folder": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"isLookup": true,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"referenceSchemaName": "ContactFolder"
				},

				/**
				 * Collection of folders to display.
				 */
				"FolderCollection": {
					"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.initAcademyUrl(this.onAcademyUrlInitialized, this);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
				 * @override
				 */
				initParameters: function(element) {
					if (!Ext.isEmpty(element.folderId)) {
						var config = {
							serviceName: "CampaignService",
							methodName: "GetContactFolderInfo",
							data: {
								folderId: element.folderId
							}
						};
						this.callService(config, function(response) {
							var folderInfo = response.GetContactFolderInfoResult;
							if (folderInfo) {
								var folderItem = {
									Id: folderInfo.Id,
									displayValue: folderInfo.DisplayValue
								};
								this.set("Folder", folderItem);
							}
						}, this);
					}
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#saveValues
				 * @override
				 */
				saveValues: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					var folderId = null;
					if (!Ext.isEmpty(this.get("Folder"))) {
						folderId = this.get("Folder").Id;
					}
					element.folderId = folderId;
				},

				/**
				 * Loads entity to init selected ContactFolder property
				 * @return void
				 */
				loadContactFolderSchemaLookup: function() {
					var self = this;
					var config = this.getFolderLookupConfig();
					LookupUtilities.Open(this.sandbox, config, function(args) {
						var collection = args.selectedRows;
						if (collection.getCount() > 0) {
							var selectedItem = collection.getItems()[0];
							self.set("Folder", selectedItem);
						}
					}, this, null, false, false);
				},

				/**
				 * Gets ContactFolder lookup config
				 * @protected
				 * @return {object}
				 */
				getFolderLookupConfig: function() {
					var config = this.getLookupConfig();
					config.entitySchemaName = "ContactFolder";
					var filters = this.getCustomLookupFilters();
					if (filters) {
						config.filters = filters;
					}
					return config;
				},

				/**
				 * Inits custom lookup filters
				 * to not select CampaignFilters folder and its children.
				 * @private
				 * @return {Terrasoft.FilterGroup} custom FilterGroup
				 */
				getCustomLookupFilters: function() {
					var filters = Terrasoft.createFilterGroup();
					filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
					filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL, "Parent", MarketingEnums.ContactFolder.CAMPAIGN_FILTERS));
					filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL, "Id", MarketingEnums.ContactFolder.CAMPAIGN_FILTERS));
					return filters;
				},

				/**
				 * Loads data to init source collection of ContactFolder to display.
				 * @private
				 * @param {string} filterParameter text to search.
				 * @param {Terrasoft.Collection} list collection of items to display.
				 * @param {string} columnName Name of root schema for Folder lookup.
				 */
				prepareFolderList: function(filterParameter, list, columnName) {
					if (list && list instanceof Terrasoft.Collection) {
						list.clear();
					}
					var filters = this.getCustomLookupFilters();
					this.prepareLookupList(filters, filterParameter, columnName,
						"FolderCollection", this);
				},

				/**
				 * Sets Folder lookup selected value as dropdown list item.
				 * @param {object} selectedItem Selected ContactFolder lookup item.
				 */
				onLookupChange: function(selectedItem) {
					this.set("Folder", selectedItem);
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "insert",
					"name": "ContentContainer",
					"propertyName": "items",
					"parentName": "EditorsContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FolderLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 22
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.FolderText"
						},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "Folder",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.LOOKUP,
						"isRequired": true,
						"controlConfig": {
							"loadVocabulary": {
								"bindTo": "loadContactFolderSchemaLookup"
							},
							"prepareList": {
								"bindTo": "prepareFolderList"
							},
							"list": {
								"bindTo": "FolderCollection"
							},
							"tag": "ContactFolder"
						},
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"]
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


