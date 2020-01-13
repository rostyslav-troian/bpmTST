Terrasoft.configuration.Structures["DataSourcePropertiesPage"] = {innerHierarchyStack: ["DataSourcePropertiesPage"], structureParent: "BaseModalBoxPage"};
define('DataSourcePropertiesPageStructure', ['DataSourcePropertiesPageResources'], function(resources) {return {schemaUId:'cb16eef6-7837-4d4e-bcf2-8b3f672a1afc',schemaCaption: "DataSourcePropertiesPage", parentSchemaName: "BaseModalBoxPage", schemaName:'DataSourcePropertiesPage',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseModalBoxPage
 */
define("DataSourcePropertiesPage", [
	"ProcessSchemaUserTaskUtilities",
	"NewColumnGridLayoutEditItemModel",
	"css!DataSourcePropertiesPageCss",
	"css!BaseModalBoxPageCss"
], function() {
	return {
		messages: {
			SaveDataModel: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			PageSchema: {
				type: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			DataSourceCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				isRequired: true
			},
			DataSourceSchema: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isRequired: true
			},
			PageSchemaParameter: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isRequired: true
			},
			DataSourceSchemaList: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			DataModelCollection: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			PrimaryColumnBindTo: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			PackageUId: {
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			IsAddMode: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			NewParameter: {
				dataValueType: Terrasoft.DataValueType.LOOKUP
			}
		},
		properties: {
			modelBoxClass: "data-source-properties-page-modal-box"
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getNamePrefix: function(name) {
				const schemaNamePrefix = Terrasoft.ClientUnitSchemaManager.schemaNamePrefix;
				const normalizedName = Ext.String.capitalize(name.toLowerCase());
				return schemaNamePrefix ? (schemaNamePrefix + normalizedName) : normalizedName;
			},

			/**
			 * @private
			 */
			_generateParameterName: function() {
				const name = this.$DataSourceSchema.name;
				const list = this.$PageSchema.columns.mapArray(function(parameter) {
					return parameter.name.toLowerCase();
				}, this);
				var prefix = this._getNamePrefix(name);
				return Terrasoft.getUniqueValue(list, prefix);
			},

			/**
			 * @private
			 */
			_generateParameterCaption: function() {
				let caption = this.$DataSourceSchema.displayValue;
				const captions = this.$PageSchema.columns.mapArray(function(parameter) {
					return parameter.caption.toString().toLowerCase();
				}, this);
				if (Terrasoft.contains(captions, caption.toLowerCase())) {
					caption = Terrasoft.getUniqueValue(captions, caption + " ");
				}
				caption += this.get("Resources.Strings.NewParameterSuffix");
				return caption;
			},

			/**
			 * @private
			 */
			_subscribeOnChange: function() {
				this.on("change:DataSourceSchema", this._onDataSourceSchemaChanged, this);
			},

			/**
			 * @private
			 */
			_onDataSourceSchemaChanged: function(model, value) {
				const dataModels = this.$Designer.$DataModels;
				let caption = value && value.displayValue;
				var captions = dataModels.mapArray(function(model) {
					return model.$Caption.toLowerCase();
				});
				if (caption && Terrasoft.contains(captions, caption.toLowerCase())) {
					caption = Terrasoft.getUniqueValue(captions, caption + " ");
				}
				this.$DataSourceCaption = caption;
				let parameter = null;
				if (value) {
					parameter = {
						value: Terrasoft.generateGUID(),
						name: this._generateParameterName(),
						displayValue: this._generateParameterCaption()
					};
				}
				this.$PageSchemaParameter = parameter;
				this.$NewPageSchemaParameter = parameter;
			},

			/**
			 * @private
			 */
			_createPageParameter: function() {
				let displayValue = this.$PageSchemaParameter.displayValue;
				displayValue = displayValue.replace(this.get("Resources.Strings.NewParameterSuffix"), "");
				const parameter = new Terrasoft.ClientUnitSchemaParameter({
					uId: this.$PageSchemaParameter.value,
					caption: new Terrasoft.LocalizableString(displayValue),
					name: this.$PageSchemaParameter.name,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					status: Terrasoft.ModificationStatus.NEW,
					referenceSchemaUId: this.$DataSourceSchema.value
				});
				this.$PageSchema.parameters.add(parameter.uId, parameter);
				return parameter;
			},

			/**
			 * @private
			 */
			_addPageParameterToExistingDraggableItems: function(parameter) {
				var collection = Ext.create("Terrasoft.Collection");
				collection.add(parameter.uId, parameter);
				var parametersDataModel = this.$DataModels.get("Parameters");
				var existingModelDraggableItems = parametersDataModel.get("ExistingModelDraggableItems");
				this.$Designer.loadColumnsCollection(existingModelDraggableItems, collection,
					"Terrasoft.ExistingColumnGridLayoutEditItemModel", parametersDataModel);
			},

			/**
			 * @private
			 */
			_saveBindToPageParameter: function() {
				if (!this.$PageSchema.parameters.contains(this.$PageSchemaParameter.value)) {
					const parameter = this._createPageParameter();
					this._addPageParameterToExistingDraggableItems(parameter);
				}
			},

			/**
			 * @private
			 */
			_getReferenceSchemaList: function() {
				var list = new Terrasoft.Collection();
				Terrasoft.EntitySchemaManager
					.filterByFn(function(item) {
						return !item.getExtendParent();
					})
					.each(function(item) {
						var uid = item.getUId();
						var listItem = {
							value: uid,
							name: item.getName(),
							displayValue: item.getCaption()
						};
						list.add(uid, listItem);
					});
				return list.sort("displayValue");
			},

			/**
			 * @private
			 */
			_getPageSchemaParameterList: function() {
				const list = new Terrasoft.Collection();
				const parameter = this.$NewPageSchemaParameter;
				this.$PageSchema.parameters.each(function(parameter) {
					if (Terrasoft.ProcessModuleUtilities.isSystemParameter(parameter.name)) {
						return;
					}
					if (parameter.dataValueType !== Terrasoft.DataValueType.LOOKUP) {
						return;
					}
					if (this.$DataSourceSchema && this.$DataSourceSchema.value !== parameter.referenceSchemaUId) {
						return;
					}
					list.add(parameter.uId, {
						value: parameter.uId,
						name: parameter.name,
						displayValue: parameter.caption.toString()
					});
				}, this);
				if (parameter) {
					list.addIfNotExists(parameter.value, parameter);
				}
				list.sort("displayValue");
				return list;
			},

			/**
			 * @private
			 */
			_initExistingDataSource: function() {
				const dataSource = this.$DataModels.get(this.$DataModelName);
				const dataModelsConfig = this.$Designer.$Schema.dataModels || {};
				const dataModelConfig = dataModelsConfig[this.$DataModelName];
				const bindTo = dataModelConfig.primaryColumnValue.bindTo;
				const parameter = this.$PageSchema.parameters.findByPath("name", bindTo);
				const dataSourceSchema = dataSource.get("Schema");
				this.set("DataSourceSchema", {
					name: dataSourceSchema.name,
					value: dataSource.get("EntitySchemaUId"),
					displayValue: dataSourceSchema.caption.toString()
				});
				this.set("DataSourceCaption", dataSource.get("Caption"));
				this.set("PageSchemaParameter", {
					name: parameter.name,
					value: parameter.uId,
					displayValue: (parameter.caption || parameter.name).toString()
				});
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.hideBodyMask();
					this.$DataModelName = this.$moduleInfo.DataModelName;
					this.$IsAddMode = Ext.isEmpty(this.$DataModelName);
					this.$Designer = this.$moduleInfo.Designer;
					this.$PageSchema = this.$Designer.$PageSchema;
					this.$PackageUId = this.$Designer.getPackageUId();
					this.$DataModels = this.$Designer.$DataModels;
					if (!this.$IsAddMode) {
						this._initExistingDataSource();
					}
					this._subscribeOnChange();
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseModalBoxPage#getModalBoxInitialConfig
			 * @override
			 */
			getModalBoxInitialConfig: function() {
				return {
					modalBoxConfig: {
						boxClasses: [this.modelBoxClass]
					}
				};
			},

			/**
			 * Returns modal box header.
			 * @return {String}
			 */
			getHeader: function() {
				return this.get("Resources.Strings.PageTitle");
			},

			/**
			 * @private
			 */
			_save: function(callback, scope) {
				var maskId = Terrasoft.Mask.show({selector: "." + this.modelBoxClass});
				Terrasoft.require([this.$DataSourceSchema.name], function(schema) {
					Terrasoft.EntitySchemaManager.forceGetPackageSchema({
						schemaUId: this.$DataSourceSchema.value,
						packageUId: this.$Designer.getPackageUId()
					}, function(designSchema) {
						this._saveBindToPageParameter();
						const dataModelsNames = this.$DataModels.mapArrayByAttr("Name");
						const uniqueName = Terrasoft.getUniqueValue(dataModelsNames, designSchema.name);
						this.sandbox.publish("SaveDataModel", {
							name: this.$IsAddMode ? uniqueName : this.$DataModelName,
							entitySchemaName: designSchema.name,
							designSchema: designSchema,
							schema: schema,
							bindTo: this.$PageSchemaParameter.name,
							caption: this.$DataSourceCaption
						}, [this.sandbox.id]);
						Terrasoft.Mask.hide(maskId);
						Ext.callback(callback, scope);
					}, this);
				}, this);
			},

			/**
			 * Closes properties page.
			 * @protected
			 */
			close: function() {
				this.destroyModule();
			},

			/**
			 * Handler for SaveButton click.
			 */
			onSaveButtonClick: function() {
				if (this.validate()) {
					this._save(function() {
						this.close();
					}, this);
				}
			},

			/**
			 * @protected
			 */
			prepareDataSourceSchemaList: function(filter, list) {
				if (list) {
					list.clear();
					list.loadAll(this._getReferenceSchemaList());
				}
			},

			/**
			 * @protected
			 */
			preparePageSchemaParameterList: function(filter, list) {
				if (list) {
					list.clear();
					list.loadAll(this._getPageSchemaParameterList());
				}
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["datasource-properties-page"]
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"name": "CardContentLayout",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [
						{
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"name": "DataSourceSchema",
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {"caption": {"bindTo": "Resources.Strings.DataSourceSchema"}},
							"controlConfig": {
								"prepareList": {"bindTo": "prepareDataSourceSchemaList"},
								"focused": true
							},
							"enabled": {"bindTo": "IsAddMode"}
						},
						{
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"name": "DataSourceCaption",
							"layout": {"column": 0, "row": 1, "colSpan": 24},
							"labelConfig": {"caption": {"bindTo": "Resources.Strings.DataSourceCaption"}}
						},
						{
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"name": "PageSchemaParameter",
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 2, "colSpan": 24},
							"labelConfig": {"caption": {"bindTo": "Resources.Strings.PrimaryColumnBindTo"}},
							"controlConfig": {"prepareList": {"bindTo": "preparePageSchemaParameterList"}}
						}
					]
				}
			},
			{
				"operation": "insert",
				"parentName": "CardContentWrapper",
				"propertyName": "items",
				"name": "BottomButtonsWrapper",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["bottom-buttons-wrapper"],
					"items": [
						{
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"name": "SaveDataSource",
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"click": {"bindTo": "onSaveButtonClick"},
							"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
							"classes": {"textClass": "right-button"}
						},
						{
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"name": "CancelDataSource",
							"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
							"click": {"bindTo": "close"},
							"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
							"classes": {"textClass": "right-button"}
						}
					]
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


