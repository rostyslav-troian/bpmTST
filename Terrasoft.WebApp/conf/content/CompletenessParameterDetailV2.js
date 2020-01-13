Terrasoft.configuration.Structures["CompletenessParameterDetailV2"] = {innerHierarchyStack: ["CompletenessParameterDetailV2"], structureParent: "BaseGridDetailV2"};
define('CompletenessParameterDetailV2Structure', ['CompletenessParameterDetailV2Resources'], function(resources) {return {schemaUId:'ea83dd48-f719-433d-9633-04891c5a3242',schemaCaption: "Detail - Data entry compliance", parentSchemaName: "BaseGridDetailV2", schemaName:'CompletenessParameterDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CompletenessParameterDetailV2", ["CompletenessParameterDetailV2Resources", "BusinessRulesApplierV2",
		"ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities", "SchemaBuilderV2",
		"CompletenessParameter", "css!CompletenessCSSV2"
	],
	function(resources, BusinessRulesApplierV2) {

		Ext.define("Terrasoft.configuration.CompletenessParameterGridRowViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.CompletenessParameterGridRowViewModel",

			Ext: null,

			Terrasoft: null,

			sandbox: null,

			entitySchemaName: "CompletenessParameter",

			columns: {
				"Attribute": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				}
			},

			attributes: {
				AttributeCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				FilteredAttributeCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				}
			},

			/**
			 * ############# ######.
			 * @protected
			 */
			init: function() {
				this.set("AttributeList", new Terrasoft.Collection());
				var attributeId = this.get("AttributeId");
				var attributeCollection = this.get("AttributeCollection");
				if (attributeCollection && attributeCollection.contains(attributeId)) {
					this.set("Attribute", attributeCollection.get(attributeId));
				}
				this.addColumnValidator("Percentage", this.validatePercentage);
				this.on("change:Attribute", this.onAttributeChanged, this);
			},

			/**
			 * ######### ######### ### ######### #######.
			 * @protected
			 * @param {String} columnName ### ####### ### #########.
			 * @param {Function} validatorFn ####### #########.
			 */
			addColumnValidator: function(columnName, validatorFn) {
				var columnValidationConfig = this.validationConfig[columnName] || (this.validationConfig[columnName] = []);
				columnValidationConfig.push(validatorFn);
			},

			/**
			 * ########## #### "####### ########## #######".
			 * @protected
			 * @param {Number} columnValue ######## #### "####### ########## #######".
			 */
			validatePercentage: function(columnValue) {
				var maxPercentage = this.get("MaxPercentage") || 0;
				var invalidMessage;
				if (columnValue < 0) {
					invalidMessage = resources.localizableStrings.PercentageMoreLessZeroMessage;
				}
				if (columnValue > 100) {
					invalidMessage = resources.localizableStrings.PercentageMoreThenHundredMessage;
				} else if (maxPercentage !== 0 && columnValue > maxPercentage) {
					invalidMessage = this.Ext.String.format(resources.localizableStrings.PercentageMoreLessValidMessage,
						maxPercentage);
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			},

			/**
			 * ########## ### ######### ########.
			 * @protected
			 */
			onAttributeChanged: function() {
				var oldAttributeId = this.get("AttributeId");
				var attribute = this.get("Attribute");
				if (attribute) {
					var attributeCollection = this.get("AttributeCollection");
					var filteredAttributeCollection = this.get("FilteredAttributeCollection");
					filteredAttributeCollection.removeByKey(attribute.value);
					if (oldAttributeId) {
						filteredAttributeCollection.add(attributeCollection.get(oldAttributeId));
					}
					this.set("Name", attribute.displayValue);
					this.set("AttributeId", attribute.value);
					this.set("IsColumn", attribute.isColumn);
					this.set("IsDetail", attribute.isDetail);
					this.set("ColumnName", attribute.columnName);
					this.set("DetailEntityName", attribute.detailEntityName);
					this.set("DetailColumn", attribute.detailColumn);
					this.set("MasterColumn", attribute.masterColumn);
					this.set("TypeColumn", attribute.typeColumn);
					this.set("TypeValue", attribute.typeValue);
				} else {
					this.set("Name", null);
					this.set("AttributeId", null);
					this.set("IsColumn", null);
					this.set("IsDetail", null);
					this.set("ColumnName", null);
					this.set("DetailEntityName", null);
					this.set("DetailColumn", null);
					this.set("MasterColumn", null);
					this.set("TypeColumn", null);
					this.set("TypeValue", null);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#loadLookupData
			 * @overridden
			 */
			loadLookupData: function(filterValue, list) {
				var filteredCollection = this.get("FilteredAttributeCollection");
				list.clear();
				list.loadAll(filteredCollection);
			},

			/**
			 * ############# ########.
			 * @protected
			 */
			initEntity: function(callback, scope) {
				this.Ext.apply(this.columns, this.entitySchema.columns);
				this.set("FilteredAttributeCollection", scope.get("FilteredAttributeCollection"));
				this.set("AttributeCollection", scope.get("AttributeCollection"));
				this.set("Completeness", {
					value: scope.get("MasterRecordId")
				});
				this.isNew = true;
				var totalPercentage = scope.get("TotalPercentage");
				var percentage = 100 - totalPercentage;
				percentage = percentage < 0 ? 0 : percentage;
				this.set("Percentage", percentage);
				this.init();
				callback.call(scope || this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#hideBodyMask
			 * @overridden
			 */
			hideBodyMask: Terrasoft.emptyFn
		});

		return {
			entitySchemaName: "CompletenessParameter",
			mixins: {
				ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
			},
			messages: {
				/**
				 * @message SaveDetail
				 * Detail saving message.
				 */
				"SaveDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DetailSaved
				 * Returns detail saving result.
				 */
				"DetailSaved": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ValidateDetail
				 * ########## ############# ############### ######## ######
				 */
				"ValidateDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DetailValidated
				 * Returns detail validation result.
				 */
				"DetailValidated": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetMasterRecordInfo
				 * Receives master record information.
				 */
				"GetMasterRecordInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetTotalPercentage
				 * ###### ##### ########## ########## #######
				 * @param {String} ##### ########## ########## #######
				 */
				"GetTotalPercentage": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				IsEditable: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},
				LocalCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				AttributeCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				FilteredAttributeCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				AttributeTypesCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				TotalValue: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 0
				},
				Attribute: {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					name: "Attribute",
					caption: resources.localizableStrings.AttributeColumnCaption,
					isRequired: true
				},
				UseGeneratedProfile: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "remove",
				"name": "ActionsButton"
			}, {
				"operation": "remove",
				"name": "ToolsButton"
			}, {
				"operation": "merge",
				"name": "Detail",
				"values": {
					"classes": {
						"wrapClass": ["detail", "grid-detail", "completeness-parameter-detail"]
					}
				}
			}, {
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {
						bindTo: "generateActiveRowControlsConfig"
					},
					"changeRow": {
						bindTo: "changeRow"
					},
					"unSelectRow": {
						bindTo: "unSelectRow"
					},
					"onGridClick": {
						bindTo: "onGridClick"
					},
					"initActiveRowKeyMap": {
						bindTo: "initActiveRowKeyMap"
					},
					"activeRowAction": {
						bindTo: "onActiveRowAction"
					},
					"activeRowActions": [{
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "save",
						"markerValue": "save",
						"imageConfig": resources.localizableImages.SaveIcon
					}, {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"tag": "remove",
						"markerValue": "remove",
						"imageConfig": resources.localizableImages.RemoveIcon
					}],
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [{
							"name": "AttributeListedGridColumn",
							"bindTo": "Attribute",
							"type": Terrasoft.GridCellType.LOOKUP,
							"position": {
								"column": 1,
								"colSpan": 16
							}
						}, {
							"name": "PercentageListedGridColumn",
							"bindTo": "Percentage",
							"type": Terrasoft.GridCellType.TEXT,
							"position": {
								"column": 16,
								"colSpan": 8
							}
						}]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {
							"columns": 24,
							"rows": 1
						},
						"items": [{
							"name": "AttributeTiledGridColumn",
							"bindTo": "Attribute",
							"type": Terrasoft.GridCellType.LOOKUP,
							"position": {
								"row": 1,
								"column": 1,
								"colSpan": 16
							}
						}, {
							"name": "PercentageTiledGridColumn",
							"bindTo": "Percentage",
							"type": Terrasoft.GridCellType.TEXT,
							"position": {
								"row": 1,
								"column": 16,
								"colSpan": 8
							}
						}]
					}
				}
			}, {
				"operation": "insert",
				"name": "TotalContainer",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["total-container"]
					},
					"items": [],
					"visible": {
						"bindTo": "getToolsVisible"
					}
				}
			}, {
				"operation": "insert",
				"name": "TotalCaption",
				"parentName": "TotalContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						bindTo: "Resources.Strings.TotalCaption"
					},
					"classes": {
						"labelClass": ["total-caption"]
					}
				}
			}, {
				"operation": "insert",
				"name": "TotalValue",
				"parentName": "TotalContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						bindTo: "TotalPercentageCaption"
					},
					"classes": {
						"labelClass": ["total-value"]
					}
				}
			}] /**SCHEMA_DIFF*/ ,
			methods: {
				/**
				 * ####### ######## ##### ### ####### # ######.
				 * @type {Number}
				 */
				typesSelectCount: 0,

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#initData
				 * @overridden
				 */
				initData: function(callback, scope) {
					this.showBodyMask({
						timeout: 0
					});
					this.set("RowCount", 100);
					this.set("AttributeCollectionLoaded", false);
					this.set("AttributeCollection", new Terrasoft.Collection());
					this.set("AttributeTypesCollection", new Terrasoft.Collection());
					this.set("FilteredAttributeCollection", new Terrasoft.Collection());
					this.set("LocalCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));

					var masterRecordInfo = this.sandbox.publish("GetMasterRecordInfo", null, [this.sandbox.id]);
					var schemaName = masterRecordInfo.entitySchemaName;
					var typeColumnValue = masterRecordInfo.typeColumnValue;
					this.callParent([function() {
						var cardSchemaName = this.getCardSchemaName(schemaName, typeColumnValue);
						if (cardSchemaName) {
							this.generateAttributeList(cardSchemaName, callback, scope);
						} else {
							this.set("AttributeCollectionLoaded", false);
							callback.call(scope);
						}
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					if (this.get("AttributeCollectionLoaded")) {
						var localCollection = this.get("LocalCollection");
						localCollection.clear();
						this.hideBodyMask();
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#onActiveRowChange
				 * @overridden
				 */
				onActiveRowChange: function() {
					this.callParent(arguments);
					this.filterCollection(this.$ActiveRow);
				},

				/**
				 * ######### ######### ########## ## ### ############ # #######.
				 * @protected
				 * @param  {Guid} activeRow ############# ######### ###### # #######.
				 */
				filterCollection: function(activeRow) {
					var attributes = this.get("FilteredAttributeCollection");
					attributes.clear();
					attributes.loadAll(this.get("AttributeCollection"));
					var items = this.getGridData();
					var localData = this.get("LocalCollection");
					items.each(function(item) {
						if (localData.contains(item.get("Id"))) {
							var localItem = localData.get(item.get("Id"));
							if (localItem && !localItem.isDeleted && localItem.get("Id") !== activeRow) {
								attributes.removeByKey(item.get("AttributeId"));
							} else if (localItem.get("Id") !== activeRow) {
								attributes.removeByKey(item.get("AttributeId"));
							}
						} else if (item.get("Id") !== activeRow) {
							attributes.removeByKey(item.get("AttributeId"));
						}
					}, this);
					localData.each(function(item) {
						if (item.isNew && !item.isDeleted && item.get("Id") !== activeRow) {
							attributes.removeByKey(item.get("AttributeId"));
						}
					}, this);
				},

				/**
				 * ########## ###### ##### # ####### #####.
				 * @protected
				 * @param {String} schemaName ######## #####.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ######## ####### ######### ######.
				 */
				generateAttributeList: function(schemaName, callback, scope) {
					var schemaBuilder = this.Ext.create("Terrasoft.configuration.SchemaBuilder");
					var config = {
						schemaName: schemaName,
						entitySchemaName: "",
						profileKey: ""
					};
					schemaBuilder.build(config, function(viewModelClass, viewConfig) {
						this.schemaBuilderCallback(viewModelClass, viewConfig, callback, scope);
					}, this);
				},

				/**
				 * Fills compliance attributes collection with card information.
				 * @protected
				 * @param {Object} viewModelClass Card viewModel class.
				 * @param {Object} viewConfig Card view configuration.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				schemaBuilderCallback: function(viewModelClass, viewConfig, callback, scope) {
					var flatViewConfig = this.flatten(viewConfig);
					var columns = viewModelClass.prototype.entitySchema.columns;
					this.addFields(columns, flatViewConfig);
					var modules = viewModelClass.prototype.modules;
					this.addModulesFields(columns, modules);
					var details = viewModelClass.prototype.details;
					this.addDetails(details, flatViewConfig, callback, scope);
				},

				/**
				 * Adds column information to compliance attributes.
				 * @private
				 * @param {Object} column Entity schema column.
				 * @param {String} column.uId Column unique identifier.
				 * @param {String} column.name Column name.
				 * @param {String} column.caption Column caption.
				 * @param {Object} column.referenceSchema Column reference schema.
				 */
				addColumnToAttributes: function(column) {
					var attributeCollection = this.get("AttributeCollection");
					if (!attributeCollection.contains(column.uId)) {
						var name = column.name;
						if (column.referenceSchema) {
							name += "Id";
						}
						attributeCollection.add(column.uId, {
							value: column.uId,
							displayValue: column.caption,
							columnName: name,
							isColumn: true,
							isDetail: false
						});
					}
				},

				/**
				 * Adds fields from card modules.
				 * @protected
				 * @param {Array} columns Entity schema columns.
				 * @param {Array} modules Card modules.
				 */
				addModulesFields: function(columns, modules) {
					Terrasoft.each(modules, function(moduleConfig) {
						var masterColumn = this.findMasterColumn(moduleConfig, columns);
						if (!masterColumn) {
							return;
						}
						this.addColumnToAttributes(masterColumn);
					}, this);
				},

				/**
				 * Finds module master column.
				 * @private
				 * @param {Object} moduleConfig Card module configuration.
				 * @param {Array} columns Entity schema columns.
				 * @return {Object}
				 */
				findMasterColumn: function(moduleConfig, columns) {
					var masterColumnName = this.findModuleMasterColumnName(moduleConfig);
					if (!masterColumnName) {
						return null;
					}
					var foundColumns = Terrasoft.where(columns, {
						name: masterColumnName
					});
					return foundColumns[0];
				},

				/**
				 * Finds module master column name.
				 * @private
				 * @param {Object} moduleConfig Card module configuration.
				 * @return {Object}
				 */
				findModuleMasterColumnName: function(moduleConfig) {
					var config = moduleConfig.config;
					if (!config || !config.parameters || !config.parameters.viewModelConfig) {
						return null;
					}
					return config.parameters.viewModelConfig.masterColumnName;
				},

				/**
				 * Adds card fields to compliance attributes.
				 * @param {Array} columns Entity schema columns.
				 * @param {Object} viewConfig Card view configuration.
				 */
				addFields: function(columns, viewConfig) {
					Object.getOwnPropertyNames(columns).forEach(function(columnName) {
						var column = columns[columnName];
						if (column.dataValueType !== Terrasoft.DataValueType.BOOLEAN) {
							if (this.fieldExistOnView(viewConfig, columnName)) {
								this.addColumnToAttributes(column);
							}
						}
					}, this);
				},

				/**
				 * Adds details to compliance attributes.
				 * @param {Object} details Card details.
				 * @param {Object} moduleConfig Card module configuration.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				addDetails: function(details, viewConfig, callback, scope) {
					var detailsOnPage = [];
					Object.getOwnPropertyNames(details).forEach(function(detailName) {
						if (this.fieldExistOnView(viewConfig, detailName)) {
							if (details[detailName].filter) {
								detailsOnPage.push(details[detailName]);
							}
						}
					}, this);
					this.loadTypesForTypedDetails(detailsOnPage, function() {
						this.selectFromSysDetail(detailsOnPage, callback, scope);
					}, this);
				},

				/**
				 * ######## ############ ##### ### #######.
				 * @param  {Array} details  ######### #######.
				 * @param  {Function} callback ####### ######### ######.
				 * @param  {Object} scope ######## ##########.
				 */
				loadTypesForTypedDetails: function(details, callback, scope) {
					details.forEach(function(item) {
						if (item.completeness &&  item.completeness.isTyped) {
							this.typesSelectCount++;
							var config = {
								detail: item,
								callback: callback,
								scope: scope
							};
							this.loadTypedDetail(config);
						}
					}, this);
					if (this.typesSelectCount === 0) {
						callback.call(scope);
					}
				},

				/**
				 * ######### #### ### ######.
				 * @param  {Object} config:
				 * @param  {Object} config.detail ###### ### ########.
				 * @param  {Function} config.callback ####### ######### ######.
				 * @param  {Object} config.scope ######## ##########.
				 */
				loadTypedDetail: function(config) {
					var typesCollection = this.get("AttributeTypesCollection");
					var completeness = config.detail.completeness;
					var selectTypeDetail = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: completeness.typeSchemaName
					});
					selectTypeDetail.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					selectTypeDetail.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
					selectTypeDetail.getEntityCollection(function(response) {
						this.typesSelectCount--;
						if (response.success === true) {
							typesCollection.add(completeness.typeSchemaName, response.collection);
						}
						if (this.typesSelectCount === 0) {
							config.callback.call(config.scope);
						}
					}, this);
				},

				/**
				 * ######### ####### ######### ## ##########
				 * @param  {string} viewConfig [description]
				 * @param  {[type]} fieldName  [description]
				 * @return {[type]}            [description]
				 */
				fieldExistOnView: function(viewConfig, fieldName) {
					var res = Object.getOwnPropertyNames(viewConfig).some(function(propValue) {
						return viewConfig[propValue] === fieldName;
					});
					return res;
				},

				/**
				 * ############### ########### ###### # #######.
				 * @protected
				 * @param  {Object} data ########### ######.
				 * @return {Object}      ####### ######.
				 */
				flatten: function(data) {
					var result = {};

					function recurse(cur, prop) {
						if (Object(cur) !== cur) {
							result[prop] = cur;
						} else if (Array.isArray(cur)) {
							for (var i = 0, l = cur.length; i < l; i++) {
								recurse(cur[i], prop ? prop + "." + i : i.toString());
							}
							if (l === 0) {
								result[prop] = [];
							}
						} else {
							var isEmpty = true;
							for (var p in cur) {
								isEmpty = false;
								recurse(cur[p], prop ? prop + "." + p : p);
							}
							if (isEmpty) {
								result[prop] = {};
							}
						}
					}
					recurse(data, "");
					return result;
				},

				/**
				 * ###### ######### ## #######.
				 * @protected
				 * @param  {Object}   details  ###### ####### ## ########.
				 * @param  {Function} callback ####### ######### ######.
				 * @param  {Object}   scope    ######## ####### ######### ######.
				 */
				selectFromSysDetail: function(details, callback, scope) {
					var detailSchemaNames = [];
					var entitySchemaNames = [];
					details.forEach(function(item) {
						if (!item.entitySchemaName) {
							detailSchemaNames.push(item.schemaName);
						} else {
							entitySchemaNames.push(item.entitySchemaName);
						}
					}, this);
					var selectSysDetail = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysDetail"
					});
					selectSysDetail.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					selectSysDetail.addColumn("Caption");
					selectSysDetail.addColumn("DetailSchemaUId");
					selectSysDetail.addColumn("EntitySchemaUId");
					selectSysDetail.addColumn("[SysSchema:UId:EntitySchemaUId].Name", "EntitySchemaName");
					selectSysDetail.addColumn("[SysSchema:UId:DetailSchemaUId].Name", "DetailSchemaName");
					var filterGroup = this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					filterGroup.addItem(selectSysDetail.createColumnInFilterWithParameters(
						"[SysSchema:UId:DetailSchemaUId].Name",
						detailSchemaNames));
					filterGroup.addItem(selectSysDetail.createColumnInFilterWithParameters(
						"[SysSchema:UId:EntitySchemaUId].Name",
						entitySchemaNames));
					selectSysDetail.filters.add(filterGroup);
					selectSysDetail.getEntityCollection(function(response) {
						if (response.success === true) {
							var attributeCollection = this.get("AttributeCollection");
							response.collection.each(function(item) {
								if (!this.containsDetailName(item.get("DetailSchemaName"), attributeCollection)) {
									var detail = this.findInArrayByPropertyValue(details, "schemaName",
										item.get("DetailSchemaName"));
									if (!detail) {
										this.findInArrayByPropertyValue(details, "entitySchemaName",
											item.get("EntitySchemaName"));
									}
									if (detail) {
										var filter = detail.filter;
										var completeness = detail.completeness;
										var masterColumn = filter.masterColumn;
										masterColumn = masterColumn !== "Id" ? masterColumn + "Id" : masterColumn;
										if (completeness && completeness.isTyped) {
											var allTypesCollection = this.get("AttributeTypesCollection");
											var types = allTypesCollection.get(completeness.typeSchemaName);
											types.each(function(typeItem) {
												var formatString = resources.localizableStrings.TypedDetailName;
												attributeCollection.add(typeItem.get("Id"), {
													value: typeItem.get("Id"),
													displayValue: this.Ext.String.format(formatString, item.get("Caption"), typeItem.get("displayValue")),
													detailEntityName: item.get("EntitySchemaName"),
													detailSchemaName: item.get("DetailSchemaName"),
													detailColumn: filter.detailColumn + "Id",
													masterColumn: masterColumn,
													typeColumn: completeness.typeColumn + "Id",
													typeValue: typeItem.get("Id"),
													isDetail: true,
													isColumn: false
												});
											}, this);
										} else {
											var formatString = resources.localizableStrings.DetailName;
											attributeCollection.add(item.get("Id"), {
												value: item.get("Id"),
												displayValue: this.Ext.String.format(formatString, item.get("Caption")),
												detailEntityName: item.get("EntitySchemaName"),
												detailSchemaName: item.get("DetailSchemaName"),
												detailColumn: filter.detailColumn + "Id",
												masterColumn: masterColumn,
												typeColumn: completeness ? completeness.typeColumn + "Id" : null,
												typeValue: completeness ? completeness.typeValue : null,
												isDetail: true,
												isColumn: false
											});
										}
									}
								}
							}, this);
							callback.call(scope);
							this.get("FilteredAttributeCollection").loadAll(attributeCollection);
							this.set("AttributeCollectionLoaded", true);
							this.loadGridData();
						}
					}, this);
				},

				/**
				 * ######### ######## ## ######### ######### ###### # ########## ######### ######.
				 * @param  {String} detailSchemaName ######## ##### ######.
				 * @param  {Terrasoft.Collection} collection ######### #########.
				 * @return {Boolean} ######## ## ######### ######### ###### # ########## ######### ######.
				 */
				containsDetailName: function(detailSchemaName, collection) {
					var result = false;
					collection.each(function(item) {
						if (item.detailSchemaName === detailSchemaName) {
							result = true;
							return;
						}
					}, this);
					return result;
				},

				/**
				 * ########## ####### ####### ## ######## ######## ########.
				 * @protected
				 * @param  {Array} array     ######.
				 * @param  {String} property ######## ########.
				 * @param  {Object} value    ########.
				 * @return {Object}          ####### #######.
				 */
				findInArrayByPropertyValue: function(array, property, value) {
					return this.Ext.Array.findBy(array, function(item) {
						return item[property] === value;
					});
				},

				/**
				 * Returns card schema.
				 * @param  {String} entitySchemaName Entity schema name.
				 * @param  {String} typeId Type indentifier.
				 * @return {String}
				 */
				getCardSchemaName: function(entitySchemaName, typeId) {
					var entityStructure = this.getModuleStructure(entitySchemaName);
					if (this.Ext.isEmpty(entityStructure)) {
						return null;
					}
					var pages = entityStructure.pages;
					if (typeId && pages) {
						for (var i = pages.length - 1; i >= 0; i--) {
							var page = pages[i];
							if (page.UId === typeId) {
								return page.cardSchema;
							}
						}
					} else {
						return entityStructure.cardSchema;
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#createViewModel
				 * @overridden
				 */
				createViewModel: function(config) {
					this.callParent(arguments);
					var viewModel = config.viewModel;
					viewModel.set("FilteredAttributeCollection", this.get("FilteredAttributeCollection"));
					viewModel.set("AttributeCollection", this.get("AttributeCollection"));
					viewModel.init();
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#createNewRow
				 * @overridden
				 */
				createNewRow: function() {
					this.mixins.ConfigurationGridUtilities.createNewRow.apply(this, arguments);
					this.setMaxPercentage(this.getActiveRow());
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#initEditableGridRowViewModel
				 * @overridden
				 */
				initEditableGridRowViewModel: function(callback, scope) {
					callback.call(scope);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#sortGrid
				 * @overridden
				 */
				sortGrid: function(tag) {
					this.changeSorting.call(this, {
						tag: tag
					});
					this.deselectRows();
					this.sortGridData();
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#sortColumn
				 * @overridden
				 */
				sortColumn: function(index) {
					this.changeSorting.call(this, {
						index: index
					});
					this.deselectRows();
					this.sortGridData();
				},

				/**
				 * ######### ########## ######### ######.
				 * @protected
				 */
				sortGridData: function() {
					var tempGridDataCollection = new this.Terrasoft.Collection();
					var gridData = this.getGridData();
					tempGridDataCollection.loadAll(gridData);
					tempGridDataCollection.sortDirection = gridData.sortDirection;
					gridData.clear();
					gridData.loadAll(tempGridDataCollection);
					gridData.sortDirection = tempGridDataCollection.sortDirection;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#changeSorting
				 * @overridden
				 */
				changeSorting: function(config) {
					var gridData = this.getGridData();
					var orderedColumnName = config.tag;
					var index = config.index;
					var columns = [{
						name: "Name"
					}, {
						name: "Percentage"
					}];
					if (this.Ext.isEmpty(orderedColumnName)) {
						switch (index) {
							default:
							case "0":
								orderedColumnName = columns[0].name;
								break;
							case "1":
								orderedColumnName = columns[1].name;
								break;
						}
					}
					var sortDirection = this.getColumnSortDirection(gridData.sortDirection);
					gridData.sortDirection = sortDirection;
					gridData.sort(null, sortDirection, function(item1, item2) {
						var comparer = 0;
						var value1 = item1.get(orderedColumnName);
						var value2 = item2.get(orderedColumnName);
						if (value1 < value2) {
							comparer = -1;
						} else if (value1 > value2) {
							comparer = 1;
						}
						return comparer;
					});
					for (var i = 0; i < columns.length; i++) {
						var column = columns[i];
						var columnName = column.name;
						if (orderedColumnName === columnName) {
							column.orderDirection = sortDirection;
							column.orderPosition = 1;
							this.set("SortColumnIndex", i);
							this.set("GridSortDirection", column.orderDirection);
						} else {
							column.orderDirection = "";
							column.orderPosition = "";
						}
						var caption;
						caption = this.getColumnCaption(
							caption, column.orderDirection
						);
						this.set(this.name + columnName + "_SortedColumnCaption", caption);
					}
					gridData.each(function(item, index) {
						gridData.collection.keys[index] = item.get("Id");
					});
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilities#getEditableGridRowViewModelClassName
				 * @overridden
				 */
				getEditableGridRowViewModelClassName: function() {
					return "Terrasoft.CompletenessParameterGridRowViewModel";
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#generateActiveRowControlsConfig
				 * @overridden
				 */
				generateActiveRowControlsConfig: function(id, columnsConfig, rowConfig) {
					this.columnsConfig = columnsConfig;
					var gridLayoutItems = [];
					var currentColumnIndex = 0;
					this.Terrasoft.each(columnsConfig, function(columnConfig) {
						var columnName = columnConfig.key[0].name.bindTo;
						var column = this.entitySchema.getColumnByName(columnName);
						if (!column) {
							column = this.columns[columnName];
						}
						var cellConfig = this.getCellControlsConfig(column);
						cellConfig = this.Ext.apply({
							layout: {
								colSpan: columnConfig.cols,
								column: currentColumnIndex,
								row: 0,
								rowSpan: 1
							}
						}, cellConfig);
						gridLayoutItems.push(cellConfig);
						currentColumnIndex += columnConfig.cols;
					}, this);
					var gridData = this.getGridData();
					var activeRow = gridData.get(id);
					var rowClass = {
						prototype: activeRow
					};
					BusinessRulesApplierV2.applyRules(rowClass, gridLayoutItems);
					var viewGenerator = this.Ext.create("Terrasoft.ViewGenerator");
					viewGenerator.viewModelClass = this;
					var gridLayoutConfig = viewGenerator.generateGridLayout({
						name: this.name,
						items: gridLayoutItems
					});
					rowConfig.push(gridLayoutConfig);
				},

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					var sandbox = this.sandbox;
					sandbox.subscribe("SaveDetail", this.save, this, [sandbox.id]);
					sandbox.subscribe("ValidateDetail", this.validateDetail, this, [sandbox.id]);
					sandbox.subscribe("GetTotalPercentage", function() {
						var gridData = this.getGridData();
						var totalValue = 0;
						this.Terrasoft.each(gridData.getItems(), function(item) {
							totalValue += item.get("Percentage");
						}, this);
						return totalValue;
					}, this, [sandbox.id]);
				},

				/**
				 * ######### ######### ######.
				 * @protected
				 * @return {Boolean} ########## true #### ###### ###### #########.
				 */
				validateDetail: function() {
					var gridData = this.getGridData();
					var result = true;
					gridData.each(function(item) {
						var isChanged = !this.Terrasoft.isEmptyObject(item.oldChangedValues);
						if (isChanged && !item.validate()) {
							result = false;
							return false;
						}
					}, this);
					var activeRow = this.getActiveRow();
					if (result && activeRow) {
						result = activeRow.validate();
						if (result) {
							this.onActiveRowSave(activeRow.get("Id"));
						}
					}
					this.sandbox.publish("DetailValidated", {
						success: result
					}, [this.sandbox.id]);
					return result;
				},

				/**
				 * ######### ###### ### ########## ########.
				 * @protected
				 * @return {Terrasoft.InsertQuery} ########## ###### ## ##########.
				 */
				getSaveQuery: function(item) {
					var itemId = item.get("Id");
					var query = null;
					if (item.isDeleted && !item.isNew) {
						query = item.getDeleteQuery();
						query.enablePrimaryColumnFilter(itemId);
						return query;
					} else if (item.isNew && !item.isDeleted) {
						query = item.getInsertQuery();
					} else if (!item.isNew && !item.isDeleted) {
						query = item.getUpdateQuery();
						query.enablePrimaryColumnFilter(itemId);
					}
					if (!query) {
						return null;
					}
					var columnValues = query.columnValues;
					columnValues.clear();
					for (var columnName in item.changedValues) {
						if (item.changedValues.hasOwnProperty(columnName)) {
							var column = item.columns[columnName];
							if (!column || column.type !== this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
								continue;
							}
							var columnPath = column.columnPath;
							if (!item.entitySchema.isColumnExist(columnPath)) {
								continue;
							}
							var columnValue = item.get(columnName);
							if (column.isLookup && columnValue) {
								columnValue = columnValue.value;
							}
							columnValues.setParameterValue(columnPath, columnValue, item.getColumnDataType(columnName));
						}
					}
					return query;
				},

				/**
				 * ######### ##### ######## ## #########/##########/########.
				 * @protected
				 * @return {Array} ###### ########.
				 */
				getSaveItemsQueries: function() {
					var collection = this.get("LocalCollection");
					var saveQueries = [];
					collection.each(function(item) {
						var isChanged = item.oldChangedValues || item.isDeleted;
						if (isChanged) {
							item.changedValues = this.Terrasoft.deepClone(item.oldChangedValues);
							item.isNew = item.oldIsNew;
							var query = this.getSaveQuery(item);
							if (query) {
								saveQueries.push(query);
							}
						}
					}, this);
					return saveQueries;
				},

				/**
				 * ######### ######### ######. ########### ### ####### ## ###### ######### ########, ####### ########
				 * ######.
				 * @protected
				 * @return {Boolean} True #### ########## ###### #######, ### ### ######### ### ##########.
				 */
				save: function() {
					var queries = this.getSaveItemsQueries();
					if (Ext.isEmpty(queries)) {
						this.publishSaveResponse({
							success: true
						});
						return true;
					}
					var batchQuery = Ext.create("Terrasoft.BatchQuery");
					this.Terrasoft.each(queries, function(query) {
						batchQuery.add(query);
					}, this);
					batchQuery.execute(this.onSaved, this);
					return true;
				},

				/**
				 * ########## ####### "##### ########## ######".
				 * @protected
				 * @param {Object} response ######## ##### # ########### ##########.
				 */
				onSaved: function(response) {
					var message = response.ResponseStatus && response.ResponseStatus.Message;
					if (response.success && !message) {
						var collection = this.get("LocalCollection");
						collection.each(function(item) {
							item.oldChangedValues = null;
							item.oldIsNew = false;
							item.isNew = false;
							item.changedValues = null;
						}, this);
						collection.clear();
						this.publishSaveResponse(response);
					} else {
						this.publishSaveResponse({
							success: false,
							message: this.getErrorMessage(message)
						});
					}
				},

				/**
				 * ######### ######### # ######.
				 * @param {String} message #########.
				 * @protected
				 * @return {String} ###### ######### # ######.
				 */
				getErrorMessage: function(message) {
					var messageTemplate = this.get("Resources.Strings.ErrorTemplate");
					return this.Ext.String.format(messageTemplate,
						this.get("Resources.Strings.Caption") + (message ? ":" + message : ""));
				},

				/**
				 * ######### ######### # ### ### ###### #########.
				 * @param {Object} config ######### #########/
				 * @protected
				 */
				publishSaveResponse: function(config) {
					this.sandbox.publish("DetailSaved", config, [this.sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
				 * @overridden
				 */
				initDetailOptions: function() {
					this.callParent(arguments);
					this.set("IsDetailCollapsed", false);
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
				 * @overridden
				 */
				saveRowChanges: function(row, callback, scope) {
					scope = scope || this;
					callback = callback || this.Terrasoft.emptyFn;
					if (row && row.changedValues) {
						delete row.changedValues.AttributeList;
						delete row.changedValues.AttributeCollection;
						delete row.changedValues.FilteredAttributeCollection;
					}
					if (row && this.getIsRowChanged(row)) {
						if (!row.validate()) {
							return false;
						}
						var localData = this.get("LocalCollection");
						var rowId = row.get("Id");
						localData.removeByKey(rowId);
						var clonedChangedValues = this.Terrasoft.deepClone(row.changedValues);
						row.oldChangedValues = this.Ext.isEmpty(row.oldChangedValues) ? clonedChangedValues :
							this.Ext.apply(row.oldChangedValues, clonedChangedValues);
						row.oldIsNew = row.oldIsNew ? true : row.isNew;
						localData.add(rowId, row);
						this.fireDetailChanged({
							action: "save",
							rows: [rowId]
						});
						row.isNew = false;
						row.changedValues = null;
						this.calculateTotalValue();
					}
					callback.call(scope);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#onDeleteAccept
				 * @overridden
				 */
				onDeleteAccept: function() {
					var selectedItems = this.getSelectedItems();
					var gridData = this.getGridData();
					var localData = this.get("LocalCollection");
					this.Terrasoft.each(selectedItems, function(selectedItem) {
						var item = gridData.get(selectedItem);
						item.isDeleted = true;
						localData.removeByKey(selectedItem);
						localData.add(selectedItem, item);
					}, this);
					this.removeGridRecords(selectedItems);
					this.onDeleted({
						Success: true,
						DeletedItems: selectedItems
					});
					this.onDataChanged();
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilites#onDataChanged
				 * @overridden
				 */
				onDataChanged: function() {
					this.callParent(arguments);
					this.calculateTotalValue();
					this.filterCollection();
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
				 * @overridden
				 */
				focusActiveRowControl: function() {
					this.mixins.ConfigurationGridUtilities.focusActiveRowControl.apply(this, arguments);
					var activeRow = this.getActiveRow();
					if (activeRow && activeRow.validate()) {
						this.setMaxPercentage(activeRow);
					}
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#addRow
				 * @overridden
				 */
				addRow: function() {
					var activeRow = this.getActiveRow();
					if (activeRow) {
						if (!activeRow.validate()) {
							return;
						}
						this.saveRowChanges(activeRow.get("Id"));
					}
					var totalValue = 0;
					var gridData = this.getGridData();
					this.Terrasoft.each(gridData.getItems(), function(item) {
						totalValue += item.get("Percentage");
					}, this);
					if (totalValue >= 100) {
						var warningMessage = this.get("Resources.Strings.TotalPercentageMoreThenHundredMessage");
						this.Terrasoft.showInformation(warningMessage);
						return;
					}
					this.mixins.ConfigurationGridUtilities.addRow.apply(this, arguments);
				},

				/**
				 * @inheritdoc Terrasoft.ConfigurationGridUtilities#setDefaultFocus
				 * @overridden
				 */
				setDefaultFocus: function() {
					this.focusActiveRowControl("Attribute");
				},

				/**
				 * ############# ############ ########## ######## ### #####.
				 * @param {Object} row ###### #######.
				 * @protected
				 */
				setMaxPercentage: function(row) {
					if (!this.Ext.isEmpty(row)) {
						var totalPercentage = this.get("TotalPercentage") || 0;
						var percentage = row.get("Percentage") || 0;
						var maxPercentage = 0;
						if (row.isNew) {
							maxPercentage = 100 - totalPercentage;
						} else {
							maxPercentage = 100 - totalPercentage + percentage;
						}
						maxPercentage = maxPercentage < 0 ? 0 : maxPercentage;
						row.set("MaxPercentage", maxPercentage);
					}
				},

				/**
				 * ############ ##### ######### ## #### #######.
				 * @protected
				 */
				calculateTotalValue: function() {
					var gridData = this.getGridData();
					var totalValue = 0;
					this.Terrasoft.each(gridData.getItems(), function(item) {
						totalValue += item.get("Percentage");
					}, this);
					var percentageCaption = this.get("Resources.Strings.PercentageCaption");
					this.set("TotalPercentage", totalValue);
					this.set("TotalPercentageCaption", this.Ext.String.format(percentageCaption, totalValue));
				}
			}
		};
	}
);


