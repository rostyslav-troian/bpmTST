Terrasoft.configuration.Structures["LandingObjectDefaultsPageV2"] = {innerHierarchyStack: ["LandingObjectDefaultsPageV2"], structureParent: "BasePageV2"};
define('LandingObjectDefaultsPageV2Structure', ['LandingObjectDefaultsPageV2Resources'], function(resources) {return {schemaUId:'8f31d4c4-3c71-4b95-a692-d90653c21450',schemaCaption: "LandingObjectDefaultsPageV2", parentSchemaName: "BasePageV2", schemaName:'LandingObjectDefaultsPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LandingObjectDefaultsPageV2", [], function() {
	return {
		entitySchemaName: "LandingObjectDefaults",
		attributes: {
			/**
			 * List of available columns.
			 */
			"ObjectColumns": {
				"dataValueType": this.Terrasoft.DataValueType.ENUM,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true
			},
			/**
			 * Currently selected column.
			 */
			"ObjectConfigurableColumn": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"caption": {"bindTo": "Resources.Strings.ColumnNameCaption"},
				"isRequired": true
			},
			/**
			 * Landing's object schema Uid.
			 */
			"Landing": {
				"lookupListConfig": {
					"columns": ["Type.SchemaUid"]
				}
			},
			/**
			 * Is columns have been loaded.
			 */
			"ColumnsLoaded": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Configurable column's schema name.
			 */
			"ConfigurableColumnSchemaName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		properties: {
			/**
			 * Landing's object schema.
			 */
			objectSchema: null,
			/**
			 * The names for value attributes.
			 */
			markupAttributeNames: [
				"BooleanValue",
				"DateTimeValue",
				"DateValue",
				"IntegerValue",
				"FloatValue",
				"TextValue",
				"LookupValue"
			]
		},
		methods: {

			/**
			 * @inheritdoc BasePageV2#initActionButtonMenu.
			 * @overridden
			 */
			initActionButtonMenu: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getPageHeaderCaption.
			 * @overridden
			 */
			getPageHeaderCaption: function() {
				return this.get("Resources.Strings.PageCaption");
			},

			/**
			 * Object column change handler.
			 * @param {Object} item Item of the dropdown list.
			 * @private
			 */
			onConfigurableColumnChanged: function(item) {
				this.updateMarkupVisibility(true);
				if (!(item && item.value)) {
					return;
				}
				this.set("ColumnUId", item.value);
				this.set("ColumnCaption", item.displayValue);
				this.clearUnusedAttributes();
				var column = this.getObjectConfigurableColumn();
				if (column.dataValueType === this.Terrasoft.DataValueType.LOOKUP) {
					this.onConfigurableColumnSchemaLoaded(column.referenceSchemaName);
				} else {
					this.updateMarkupVisibility();
				}
			},

			/**
			 * Lookup column change handler.
			 * @private
			 */
			onLookupColumnChanged: function() {
				var guidValue = this.getConfigurableColumnValue();
				if (!this.Terrasoft.isGUID(guidValue)) {
					guidValue = this.Terrasoft.GUID_EMPTY;
				}
				this.set("GuidValue", guidValue);
			},

			/**
			 * Calls when configurable column schema loaded.
			 * @param {Terrasoft.manager.EntitySchemaManagerItem} schema Schema item.
			 * @private
			 */
			onConfigurableColumnSchemaLoaded: function(schemaName) {
				this.set("ConfigurableColumnSchemaName", schemaName);
				var guidValue = this.get("GuidValue");
				if (this.Terrasoft.isGUID(guidValue) && !this.Terrasoft.isEmptyGUID(guidValue)) {
					this.loadLookupDisplayValue("LookupValue", guidValue, this.updateMarkupVisibility, this);
				} else {
					this.updateMarkupVisibility();
				}
			},

			/**
			 * Used to retrieve name of attribute associated with given value type.
			 * @throws {Terrasoft.NotImplementedException} if given column.dataValueType not implemented.
			 * @return {String} Attribute name.
			 * @protected
			 */
			getCurrentValueAttributeName: function() {
				var column = this.getObjectConfigurableColumn();
				var dataValueTypeEnum = this.Terrasoft.DataValueType;
				switch(column.dataValueType) {
					case dataValueTypeEnum.GUID:
					case dataValueTypeEnum.TEXT:
						return "TextValue";
					case dataValueTypeEnum.INTEGER:
						return "IntegerValue";
					case dataValueTypeEnum.FLOAT:
					case dataValueTypeEnum.MONEY:
						return "FloatValue";
					case dataValueTypeEnum.DATE_TIME:
						return "DateTimeValue";
					case dataValueTypeEnum.LOOKUP:
						return "LookupValue";
					case dataValueTypeEnum.BOOLEAN:
						return "BooleanValue";
					default:
						throw new this.Terrasoft.NotImplementedException();
				}
			},

			/**
			 * Performs cleanup of unused columns.
			 * @protected
			 */
			clearUnusedAttributes: function() {
				var markupAttributeName = this.getCurrentValueAttributeName();
				var markupAttributeNames = this.getMarkupAttributeNames();
				this.Terrasoft.each(markupAttributeNames, function(attribute) {
					if (markupAttributeName !== attribute) {
						this.set(attribute, null);
					}
				}, this);
			},

			/**
			 * Calculates is attribute control is visible
			 * by attribute name and selected column value type.
			 * @param attributeName Attribute name.
			 * @return {boolean} Is attribute visible.
			 * @private
			 */
			getIsAttributeVisible: function(attributeName) {
				var currentAttributeName = this.getCurrentValueAttributeName();
				return currentAttributeName === attributeName;
			},

			/**
			 * Sets the visibility of the value field for selected object field.
			 * @param {Boolean} [isHideAll] Hides all value attributes.
			 * @protected
			 */
			updateMarkupVisibility: function(isHideAll) {
				var markupAttributeNames = this.getMarkupAttributeNames();
				this.Terrasoft.each(markupAttributeNames, function(attributeName) {
					var isVisible = isHideAll ? false : this.getIsAttributeVisible(attributeName);
					this.set(attributeName + "Visible", isVisible);
				}, this);
			},

			/**
			 * Returns the names of attributes.
			 * @protected
			 * @return {Array}
			 */
			getMarkupAttributeNames: function() {
				return this.markupAttributeNames;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getLookupPageConfig
			 * @overridden
			 */
			getLookupPageConfig: function() {
				var schemaName = this.get("ConfigurableColumnSchemaName");
				return {
					entitySchemaName: schemaName,
					multiSelect: false,
					columnName: "LookupValue"
				};
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getLookupQuery
			 * @overridden
			 */
			getLookupQuery: function(filterValue, columnName) {
				if (columnName !== "LookupValue") {
					return this.callParent(arguments);
				}
				var objectConfigurableColumn = this.getObjectConfigurableColumn();
				var referenceSchemaName = objectConfigurableColumn.name;
				var entitySchemaQuery = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: referenceSchemaName,
					rowCount: 1
				});
				entitySchemaQuery.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				entitySchemaQuery.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN,
					"displayValue");
				return entitySchemaQuery;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#save
			 * @overridden
			 */
			save: function() {
				var validationResult = this.validateConfigurableColumnValue();
				if (validationResult) {
					this.setDisplayValue();
					this.callParent(arguments);
				}
			},

			/**
			 * Sets display value.
			 */
			setDisplayValue: function() {
				var value = this.getConfigurableColumnDisplayValue();
				this.set("DisplayValue", value);
			},

			/**
			 * Used to obtaining configurable column value.
			 * @return {String || null} Column value.
			 * @private
			 */
			getConfigurableColumnValue: function(config) {
				config = this.Ext.apply({}, config);
				var column = this.getObjectConfigurableColumn();
				var markupAttributeName = this.getCurrentValueAttributeName();
				var value = this.get(markupAttributeName);
				if (column.dataValueType === this.Terrasoft.DataValueType.LOOKUP && value) {
					if (config.displayValue) {
						value = value.displayValue;
					} else {
						value = value.value;
					}
				} else {
					value = value ? this.Terrasoft.getTypedStringValue(value, column.dataValueType) : null;
				}
				return value;
			},

			/**
			 * Used to obtaining configurable column display value.
			 * @return {String || null} Column display value.
			 * @private
			 */
			getConfigurableColumnDisplayValue: function() {
				var config = {
					displayValue: true
				};
				return this.getConfigurableColumnValue(config);
			},

			/**
			 * Performs validation for the selected column.
			 * @return {Boolean} Validation result: true - if valid, false - if invalid.
			 * @protected
			 */
			validateConfigurableColumnValue: function() {
				var resultObject = {
					success: this.validate(),
					message: this.getValidationMessage()
				};
				var value = this.getConfigurableColumnValue();
				if (this.Ext.isEmpty(value) && resultObject.success) {
					this.setConfigurableColumnInvalid(resultObject);
				}
				return this.validateResponse(resultObject);
			},

			/**
			 * Sets configurable column to invalid state.
			 * @param {Object} resultObject Validation result object.
			 * @private
			 */
			setConfigurableColumnInvalid: function(resultObject) {
				var message = this.get("Resources.Strings.ConfigurableColumnValueMessage");
				resultObject.success = false;
				resultObject.message = message;
				var info = {
					invalidMessage: message,
					isValid: false
				};
				var markupAttributeName = this.getCurrentValueAttributeName();
				this.validationInfo.set(markupAttributeName, info);
			},

			/**
			 * @inheritDoc BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				var landing = this.get("Landing");
				var objectSchemaUid = landing["Type.SchemaUid"].value;
				this.Terrasoft.EntitySchemaManager.getInstanceByUId(objectSchemaUid, this.onObjectSchemaLoad, this);
			},

			/**
			 * Calls when object schema was load.
			 * @param {Terrasoft.EntitySchema} objectSchema Object schema.
			 * @private
			 */
			onObjectSchemaLoad: function(objectSchema) {
				this.Terrasoft.require([objectSchema.name], function(entitySchema) {
					if(entitySchema && entitySchema.columns) {
						this.objectSchema = entitySchema;
					}
					this.initializeObjectColumns(this.onObjectSchemaColumnsLoad, this);
				}, this);
			},

			/**
			 * Calls when object schema columns were load.
			 * @private
			 */
			onObjectSchemaColumnsLoad: function() {
				this.set("ColumnsLoaded", true);
				var columnUid = this.get("ColumnUId");
				var itemDisplayValue = this.get("ColumnCaption");
				if (columnUid) {
					var objectConfigurableColumn = this.getListValue(columnUid, itemDisplayValue);
					this.set("ObjectConfigurableColumn", objectConfigurableColumn);
				}
			},

			/**
			 * Used to retrieve the dropdown list item.
			 * @param {String} value Value.
			 * @param {String} displayValue Display value.
			 * @return {Object} dropdown list item.
			 * @private
			 */
			getListValue: function(value, displayValue) {
				return {
					value: value,
					displayValue: displayValue
				};
			},

			/**
			 * Prepare dropdown list.
			 * @param {String} filter Columns filter.
			 * @param {Terrasoft.Collection} list Columns collection.
			 * @private
			 */
			prepareObjectColumns: function(filter, list) {
				this.reloadObjectColumnsList(list);
			},

			/**
			 * Reloads collection of the dropdown list items.
			 * @param {Terrasoft.Collection} list Columns collection.
			 * @private
			 */
			reloadObjectColumnsList: function(list) {
				var availableColumns = this.get("ObjectColumns");
				if ((list instanceof this.Terrasoft.Collection) && !this.Ext.isEmpty(availableColumns)) {
					list.clear();
					list.loadAll(availableColumns);
				}
			},

			/**
			 * Used to retrieve the object column object.
			 * @return {Object} Column object.
			 * @throws {Terrasoft.NullOrEmptyException} if column not found.
			 * @private
			 */
			getObjectConfigurableColumn: function() {
				var columnUId = this.get("ColumnUId");
				var column = this.objectSchema.getColumnByUId(columnUId);
				if (!column) {
					throw new this.Terrasoft.NullOrEmptyException();
				}
				return column;
			},

			/**
			 * Used to retrieve the ESQ which retrieves already existing values.
			 * @return {Terrasoft.EntitySchemaQuery}
			 * @private
			 */
			getExistingValuesEsq: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					"rootSchemaName": this.entitySchemaName
				});
				esq.addColumn("ColumnUId");
				esq.filters.add(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Landing", this.get("Landing").value));
				return esq;
			},

			/**
			 * Initializes dropdown list of the available columns of the Object.
			 * @param {Function} [callback] The callback function.
			 * @param {Object} [scope] Execution context.
			 * @throws {Terrasoft.QueryExecutionException} if response isn't success.
			 * @protected
			 */
			initializeObjectColumns: function(callback, scope) {
				var esq = this.getExistingValuesEsq();
				esq.getEntityCollection(function(response) {
					if (response && response.success) {
						this.processColumns(response);
					} else {
						throw new this.Terrasoft.QueryExecutionException();
					}
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Process retrieved columns.
			 * @param {Object} response Esq response.
			 * @protected
			 */
			processColumns: function(response) {
				var items = [];
				this.Terrasoft.each(this.objectSchema.columns, function(column) {
					var checkColumnConditions = this.checkColumnConditions(column, response);
					if (checkColumnConditions) {
						items.push(this.getListValue(column.uId, column.caption));
					}
				}, this);
				this.sortColumns(items);
				this.set("ObjectColumns", this.convertArrayToObject(items));
			},

			/**
			 * Checks if column needs to append to list.
			 * @param {Object} column EntitySchema column.
			 * @param {Object} response Esq response.
			 * @return {Boolean} true if column needs to append, false otherwise.
			 * @private
			 */
			checkColumnConditions: function(column, response) {
				var currentUId = this.get("ColumnUId");
				var usageCondition = column.usageType === this.Terrasoft.EntitySchemaColumnUsageType.General;
				var containsInDbCondition = this.containsColumnUId(response.collection, column.uId);
				var editModeCondition = currentUId === column.uId && this.isEditMode();
				return usageCondition && (!containsInDbCondition || editModeCondition);
			},

			/**
			 * Sorts columns.
			 * @param {Array} items Columns to sort.
			 * @protected
			 */
			sortColumns: function(items) {
				items.sort(function(a, b) {
					return a.displayValue.localeCompare(b.displayValue);
				});
			},

			/**
			 * Converts Array to object.
			 * @param {Array} array Array to convert.
			 * @return {Object}
			 * @private
			 */
			convertArrayToObject: function(array) {
				var object = {};
				this.Terrasoft.each(array, function(element) {
					object[element.value] = element;
				}, this);
				return object;
			},

			/**
			 * Checks whether the collection contains the element with given uId.
			 * @param {Terrasoft.Collection} collection Column collection
			 * @param {Object} columnUid Column uid.
			 * @return {boolean}
			 * @private
			 */
			containsColumnUId: function(collection, columnUid) {
				var result = false;
				collection.each(function(item) {
					if (item.values.ColumnUId === columnUid) {
						result = true;
					}
				}, this);
				return result;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"name": "Name",
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"visible": {"bindTo": "ColumnsLoaded"},
					"bindTo": "ObjectConfigurableColumn",
					"layout": {"column": 0, "row": 1, "colSpan": 10},
					"dataValueType": this.Terrasoft.DataValueType.ENUM,
					"labelConfig": {
						"caption": {"bindTo": "Resources.Strings.ColumnNameCaption"}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"change": {
							"bindTo": "onConfigurableColumnChanged"
						},
						"prepareList": {
							"bindTo": "prepareObjectColumns"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "ValueContainer",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 0, "row": 2, "colSpan": 10},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "TextValue",
				"values": {
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"isRequired": true,
					"visible": {
						"bindTo": "TextValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "IntegerValue",
				"values": {
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"isRequired": true,
					"visible": {
						"bindTo": "IntegerValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "FloatValue",
				"values": {
					"dataValueType": this.Terrasoft.DataValueType.FLOAT,
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"controlConfig": {
						decimalPrecision: 2
					},
					"isRequired": true,
					"visible": {
						"bindTo": "FloatValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "BooleanValue",
				"values": {
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"visible": {
						"bindTo": "BooleanValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "DateTimeValue",
				"values": {
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"isRequired": true,
					"visible": {
						"bindTo": "DateTimeValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "DateValue",
				"values": {
					"bindTo": "DateTimeValue",
					"dataValueType": this.Terrasoft.DataValueType.DATE,
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"isRequired": true,
					"visible": {
						"bindTo": "DateValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "LookupValue",
				"values": {
					"bindTo": "LookupValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.ColumnValueCaption"
						}
					},
					"isRequired": true,
					"visible": {
						"bindTo": "LookupValueVisible"
					},
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"controlConfig": {
						"change": {
							"bindTo": "onLookupColumnChanged"
						},
						"prepareList": {
							"bindTo": "prepareLookupValueList"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "ViewOptionsButton",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


