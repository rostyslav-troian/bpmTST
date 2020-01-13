Terrasoft.configuration.Structures["SysProcessUserTaskPage"] = {innerHierarchyStack: ["SysProcessUserTaskPage"], structureParent: "BaseModulePageV2"};
define('SysProcessUserTaskPageStructure', ['SysProcessUserTaskPageResources'], function(resources) {return {schemaUId:'59503201-2a14-43f0-8d21-c7c17a9cc141',schemaCaption: "Section edit page schema - \"Process user tasks\"", parentSchemaName: "BaseModulePageV2", schemaName:'SysProcessUserTaskPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysProcessUserTaskPage", ["SysProcessUserTaskPageResources", "GeneralDetails"],
function(resources) {
	return {
		entitySchemaName: "SysProcessUserTask",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ImageContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["image-edit-container"],
					"layout": {"column": 0, "row": 0, "rowSpan": 3, "colSpan": 3},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageContainer",
				"propertyName": "items",
				"name": "Photo",
				"values": {
					"getSrcMethod": "getSrcMethod",
					"onPhotoChange": "onImageChange",
					"readonly": false,
					"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultImage),
					"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
				}
			},
			{
				"operation": "insert",
				"name": "Caption",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 21
					},
					"bindTo": "Caption",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SysUserTaskSchema",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareSysUserTaskSchemaList"
						}
					},
					"layout": {
						"column": 3,
						"row": 1,
						"colSpan": 21
					}
				}
			},
			{
				"operation": "insert",
				"name": "QuickModelEditPageSchema",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareQuickModelEditPageSchemaList"
						}
					},
					"layout": {
						"column": 3,
						"row": 2,
						"colSpan": 21
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		attributes: {
			"SysUserTaskSchema": {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				caption: resources.localizableStrings.SysProcessUserTaskSchemaCaption,
				isLookup: true,
				referenceSchemaName: "VwSysSchemaInfo"
			},
			/**
			 * ###### #######, ############ ### ###### ######## ## ###########
			 */
			"SysUserTaskSchemaList": {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true,
				value: Ext.create("Terrasoft.Collection")
			},
			"QuickModelEditPageSchema": {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				caption: resources.localizableStrings.QuickModelPageSchemaCaption,
				isLookup: true,
				referenceSchemaName: "VwSysSchemaInfo"
			},
			/**
			 * ###### #######, ############ ### ###### ######## ## ###########
			 */
			"QuickModelEditPageSchemaList": {
				dataValueType: Terrasoft.DataValueType.ENUM,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true,
				value: Ext.create("Terrasoft.Collection")
			}
		},
		methods: {
			/**
			 * @overridden
			 */
			onEntityInitialized: function() {
				if (this.isEditMode()) {
					var sysUserTaskSchemaUId = this.get("SysUserTaskSchemaUId");
					var quickModelEditPageSchemaUId = this.get("QuickModelEditPageSchemaUId");
					if (this.Terrasoft.isGUID(sysUserTaskSchemaUId)) {
						//TODO ######## ###### ## Workspc-#
						this.loadLookupDisplayValue("SysUserTaskSchema", sysUserTaskSchemaUId);
					}
					if (this.Terrasoft.isGUID(sysUserTaskSchemaUId)) {
						//TODO ######## ###### ## Workspc-#
						this.loadLookupDisplayValue("QuickModelEditPageSchema", quickModelEditPageSchemaUId);
					}
				}
				this.callParent(arguments);
			},
			/**
			 * TODO
			 * @returns {*}
			 */
			getSrcMethod: function() {
				var primaryImageColumnValue = this.get(this.primaryImageColumnName);
				if (primaryImageColumnValue) {
					return this.getSchemaImageUrl(primaryImageColumnValue);
				}
				return this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultImage);
			},
			/**
			 * TODO
			 * @param image
			 */
			onImageChange: function(image) {
				if (!image) {
					this.set(this.primaryImageColumnName, null);
					return;
				}
				this.Terrasoft.ImageApi.upload({
					file: image,
					onComplete: this.onImageUploaded,
					onError: this.Terrasoft.emptyFn,
					scope: this
				});
			},
			/**
			 * TODO
			 * @param imageId
			 */
			onImageUploaded: function(imageId) {
				var imageData = {
					value: imageId,
					displayValue: "SysImage"
				};
				this.set(this.primaryImageColumnName, imageData);
			},
			/**
			 * ########## ####### ########## ###### ### ########### ###### #### ################ ########
			 * @filter {Object} ###### ### ########## ######
			 * @list {Terrasoft.Collection} ###### ### ########### ######
			 * @protected
			 */
			onPrepareSysUserTaskSchemaList: function(filter, list) {
				list.clear();
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwSysSchemaInfo"
				});
				esq.addColumn("Id");
				esq.addColumn("Caption");
				esq.filters.add("SysWorkspace", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value));
				esq.filters.add("ManagerName", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "ManagerName", "ProcessUserTaskSchemaManager"));
// TODO ######## ###### ## ## QuickModel #########
//				esq.filters.add("NotQuickModel", Terrasoft.createColumnFilterWithParameter(
//					Terrasoft.ComparisonType.EQUAL, "[SysProcessUserTask:SysUserTaskSchemaUId:Id].IsQuickModel",
//					false));
				esq.getEntityCollection(function(response) {
					var collection = response.collection;
					var rows = {};
					if (collection && collection.collection.length > 0) {
						Terrasoft.each(collection.collection.items, function(item) {
							var listValue = {
								value: item.values.Id,
								displayValue: item.values.Caption
							};
							rows[item.values.Id] = listValue;
						}, this);
					}
					var sortedList = Ext.create("Terrasoft.Collection");
					sortedList.loadAll(rows);
					sortedList.sort("displayValue", Terrasoft.OrderDirection.ASC);
					list.loadAll(sortedList);
				}, this);
			},
			/**
			 * ########## ####### ########## ###### ### ########### ###### #### ####### ##############
			 * @filter {Object} ###### ### ########## ######
			 * @list {Terrasoft.Collection} ###### ### ########### ######
			 * @protected
			 */
			onPrepareQuickModelEditPageSchemaList: function(filter, list) {
				list.clear();
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwSysSchemaInfo"
				});
				esq.addColumn("Id");
				esq.addColumn("Caption");
				esq.filters.add("SysWorkspace", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value));
				esq.filters.add("ManagerName", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "ManagerName", "ClientUnitSchemaManager"));
				esq.getEntityCollection(function(response) {
					var collection = response.collection;
					var rows = {};
					if (collection && collection.collection.length > 0) {
						Terrasoft.each(collection.collection.items, function(item) {
							var listValue = {
								value: item.values.Id,
								displayValue: item.values.Caption
							};
							rows[item.values.Id] = listValue;
						}, this);
					}
					var sortedList = Ext.create("Terrasoft.Collection");
					sortedList.loadAll(rows);
					sortedList.sort("displayValue", Terrasoft.OrderDirection.ASC);
					list.loadAll(sortedList);
				}, this);
			},
			/**
			 * @overridden
			 */
			saveEntityInChain: function(next) {
				this.set("IsQuickModel", true);
				this.set("SysUserTaskSchemaUId", this.get("SysUserTaskSchema").value);
				this.set("QuickModelEditPageSchemaUId", this.get("QuickModelEditPageSchema").value);
				var saveEntity = function() {
					this.saveEntity(function(response) {
						if (this.validateResponse(response)) {
							this.cardSaveResponse = response;
							next();
						}
					}, this);
				};
				if (!this.Terrasoft.isGUID(this.primaryColumnValue)) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysProcessUserTask"
					});
					esq.addColumn("Id");
					esq.filters.add("SysUserTaskSchemaUId", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "SysUserTaskSchemaUId", this.get("SysUserTaskSchema").value));
					esq.getEntityCollection(function(response) {
						var entities = response.collection;
						if (entities.getCount() === 0) {
							saveEntity.call(this);
							return;
						}
						var entity = response.collection.getByIndex(0);
						this.primaryColumnValue = entity.get("Id");
						this.set("Id", this.primaryColumnValue);
						this.isNew = false;
						saveEntity.call(this);
					});
				} else {
					saveEntity.call(this);
				}
			}
		},
		rules: {},
		userCode: {}
	};
});


