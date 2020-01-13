Terrasoft.configuration.Structures["PageTypeSettingsPage"] = {innerHierarchyStack: ["PageTypeSettingsPage"], structureParent: "BaseModalBoxPage"};
define('PageTypeSettingsPageStructure', ['PageTypeSettingsPageResources'], function(resources) {return {schemaUId:'1da14e1c-fce4-4294-bbe9-c3def0a3b27c',schemaCaption: "PageTypeSettingsPage", parentSchemaName: "BaseModalBoxPage", schemaName:'PageTypeSettingsPage',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseModalBoxPage
 */
define("PageTypeSettingsPage", ["css!PageTypeSettingsPageCss", "css!BaseModalBoxPageCss", "LookupQuickAddMixin"
], function() {
	return {
		mixins: {
			LookupQuickAddMixin: "Terrasoft.configuration.mixins.LookupQuickAddMixin"
		},
		messages: {
			"SavePageTypeSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * @alias $SettingsModel
			 */
			SettingsModel: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			EntitySchema: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * @alias $TypeColumn
			 */
			TypeColumn: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				onChange: "onTypeColumnChange"
			},
			Type: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				onChange: "onTypeChange"
			},
			/**
			 * @alias $Columns
			 */
			Columns: {
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			TypeList: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			IsTypeColumnFocused: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			IsTypeValueFocused: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			SchemaCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				size: 250
			}
		},
		properties: {
			modelBoxClass: "page-type-settings-page-modal-box",
			width: 460,
			height: 330
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_initColumns: function(callback, scope) {
				this.$SettingsModel.getEntitySchemaLookupColumns(function(columns) {
					this.$Columns = columns;
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			_loadTypeValueListFromDB: function(typeColumn, callback, scope) {
				const schemaUId = typeColumn.column.referenceSchemaUId;
				Terrasoft.EntitySchemaManager.getInstanceByUId(schemaUId, function(referenceSchema) {
					var esq = new Terrasoft.EntitySchemaQuery({rootSchema: referenceSchema});
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Caption");
					esq.execute(function(response) {
						var collection = new Terrasoft.Collection();
						response.collection.each(function(item) {
							const id = item.get("Id");
							const caption = item.get("Caption");
							collection.add(id, {
								value: id,
								displayValue: caption
							});
						}, this);
						Ext.callback(callback, scope, [collection]);
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			_getTypeValueList: function(typeColumn, callback, scope) {
				if (this.$SettingsModel.getIsNewTypeEntitySchema(typeColumn)) {
					this.$SettingsModel.loadTypeValueListFromDataManager(typeColumn, callback, scope);
				} else {
					this._loadTypeValueListFromDB(typeColumn, callback, scope);
				}
			},

			/**
			 * @private
			 */
			_updatePageName: function() {
				var type = this.get("Type");
				var caption = this.$SettingsModel.generateEntitySchemaCaption(type);
				this.set("SchemaCaption", caption);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					const moduleInfo = this.get("moduleInfo");
					this.set("SettingsModel", moduleInfo.settingsModel);
					this.set("EntitySchema", moduleInfo.entitySchema);
					const typeColumn = moduleInfo.typeColumn;
					Terrasoft.chain(
						function(next) {
							this._initColumns(next, this);
						},
						function(next) {
							if (typeColumn) {
								this.$TypeColumn = this.$Columns.get(typeColumn.value);
							}
							this.set("IsTypeColumnFocused", this.isEmptyValue(typeColumn));
							this.set("IsTypeValueFocused", this.isNotEmptyValue(typeColumn));
							if (moduleInfo.schemaCaption) {
								this.set("SchemaCaption", moduleInfo.schemaCaption);
							} else {
								this._updatePageName();
							}
							this.mixins.LookupQuickAddMixin.init.call(this, next, this);
						},
						function() {
							Ext.callback(callback, scope);
						}, this
					);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseModalBoxPage#getModalBoxInitialConfig
			 * @override
			 */
			getModalBoxInitialConfig: function() {
				return {
					modalBoxConfig: {
						boxClasses: ["page-type-settings-page-modal-box"]
					},
					initialSize: {
						width: this.width,
						height: this.height
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.LookupQuickAddMixin#isSilentCreation
			 * @override
			 */
			isSilentCreation: function() {
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.LookupQuickAddMixin#onLookupDataLoaded
			 * @override
			 */
			onLookupDataLoaded: function(config) {
				this.callParent(arguments);
				if (config.columnName === "Type") {
					config.isLookupEdit = true;
					this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
				}
			},

			/**
			 * @inheritdoc Terrasoft.LookupQuickAddMixin#tryCreateEntityOrOpenCard
			 * @override
			 */
			tryCreateEntityOrOpenCard: function(searchValue, columnName) {
				if (columnName === "Type") {
					const canAdd = this.$SettingsModel.checkCanAddNewType(searchValue);
					if (!canAdd) {
						this.set(columnName, null);
						return;
					}
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.LookupQuickAddMixin#onLookupChange
			 * @override
			 */
			onLookupChange: function(newValue, columnName) {
				if (columnName !== "Type") {
					return this.callParent(arguments);
				}
				if (newValue && newValue.isNewValue && this.$SettingsModel.getIsNewTypeEntitySchema(this.$TypeColumn)) {
					const displayValue = newValue.displayValue;
					const canAdd = this.$SettingsModel.checkCanAddNewType(displayValue);
					if (canAdd) {
						const config = {
							displayValue: displayValue,
							typeColumn: this.$TypeColumn
						};
						this.$SettingsModel.addTypeRecordToDataManager(config, function(value) {
							this.set(columnName, value);
						}, this);
					} else {
						this.set(columnName, null);
					}
				} else {
					this.callParent([Terrasoft.deepClone(newValue), columnName]);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#loadLookupData
			 * @override
			 */
			loadLookupData: function(filterValue, list, columnName, isLookupEdit, callback, scope) {
				if (columnName !== "Type") {
					return this.callParent(arguments);
				}
				if (this.$SettingsModel.getIsNewTypeEntitySchema(this.$TypeColumn)) {
					const config = {
						typeColumn: this.$TypeColumn,
						filterValue: filterValue,
						uniqueTypeValues: true,
						currentType: this.get(columnName)
					};
					this.$SettingsModel.getTypeRecordsFromDataManager(config, function(collection) {
						list.clear();
						const objects = {};
						this.onLookupDataLoaded({
							collection: collection,
							filterValue: filterValue,
							objects: objects,
							columnName: columnName,
							isLookupEdit: isLookupEdit
						});
						list.reloadAll(objects);
					}, this);
				} else {
					if (!Ext.isFunction(callback)) {
						callback = null;
					}
					this.callParent([filterValue, list, columnName, isLookupEdit, callback, scope]);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
			 * @override
			 */
			getLookupQuery: function(filterValue, columnName) {
				const esq = this.callParent(arguments);
				if (columnName === "Type") {
					this.$SettingsModel.addUsedTypesFilter(esq);
				}
				return esq;
			},

			/**
			 * @protected
			 */
			onTypeColumnChange: function(model, typeColumn) {
				let list = this.get("TypeList");
				if (!list) {
					list = new Terrasoft.Collection();
					this.set("TypeList", list);
				}
				list.clear();
				const typeColumnUId = typeColumn && typeColumn.value;
				const oldTypeColumn = this.get("OldTypeColumn");
				const oldTypeColumnUId = oldTypeColumn && oldTypeColumn.value;
				if (!typeColumn || (typeColumnUId !== oldTypeColumnUId)) {
					this.set("Type", null);
				}
				this.set("OldTypeColumn", typeColumn);
				if (typeColumn) {
					const typeEntitySchema = Terrasoft.EntitySchemaManager.getItem(typeColumn.column.referenceSchemaUId);
					this.columns.Type.referenceSchemaName = typeEntitySchema.name;
					this._getTypeValueList(typeColumn, function(collection) {
						list.loadAll(collection);
					}, this);
				}
			},

			/**
			 * @protected
			 */
			onTypeChange: function() {
				this._updatePageName();
			},

			/**
			 * @protected
			 */
			getTypeValueLabelCaption: function() {
				const typeDisplayValue = this.$TypeColumn ? this.$TypeColumn.displayValue : "...";
				const template = this.get("Resources.Strings.TypeValueCaption");
				const caption = Ext.String.format(template, typeDisplayValue);
				return caption;
			},

			/**
			 * Handler for SaveButton click.
			 */
			onSaveButtonClick: function() {
				if (this.validate()) {
					this.sandbox.publish("SavePageTypeSettings", {
						typeColumn: this.get("TypeColumn"),
						typeValue: this.get("Type"),
						schemaCaption: this.get("SchemaCaption")
					}, [this.sandbox.id]);
					this.close();
				}
			},

			/**
			 * Closes properties page.
			 * @protected
			 */
			close: function() {
				this.destroyModule();
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"wrapClass": ["page-type-settings-page"]
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
							"name": "TypeColumn",
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {
								"caption": {"bindTo": "Resources.Strings.TypeColumnCaption"}
							},
							"controlConfig": {
								"prepareList": {"bindTo": "onPrepareList"},
								"list": {"bindTo": "Columns"},
								"focused": {"bindTo": "IsTypeColumnFocused"}
							}
						},
						{
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"name": "Type",
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 1, "colSpan": 24},
							"labelConfig": {
								"caption": {"bindTo": "getTypeValueLabelCaption"}
							},
							"enabled": {
								"bindTo": "TypeColumn",
								"bindConfig": {"converter": "isNotEmptyValue"}
							},
							"controlConfig": {
								"list": {"bindTo": "TypeList"},
								"focused": {"bindTo": "IsTypeValueFocused"},
								"enableLocalFilter": false,
								"change": {"bindTo": "onLookupChange"}
							}
						},
						{
							"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
							"name": "SchemaCaption",
							"contentType": Terrasoft.ContentType.SHORT_TEXT,
							"layout": {"column": 0, "row": 2, "colSpan": 24},
							"labelConfig": {
								"caption": {"bindTo": "Resources.Strings.SchemaCaptionColumnCaption"}
							}
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
							"name": "ContinueButton",
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"click": {"bindTo": "onSaveButtonClick"},
							"caption": {"bindTo": "Resources.Strings.ContinueButtonCaption"},
							"classes": {"textClass": "right-button"}
						},
						{
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"name": "CancelButton",
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


