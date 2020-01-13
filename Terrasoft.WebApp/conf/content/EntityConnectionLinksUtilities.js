Terrasoft.configuration.Structures["EntityConnectionLinksUtilities"] = {innerHierarchyStack: ["EntityConnectionLinksUtilities"]};
define("EntityConnectionLinksUtilities", ["EntityConnectionLinksResourceUtilities", "EntityConnectionViewModel"],
	function(EntityConnectionLinksResourceUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.EntityConnectionLinksUtilities
		 * Entity connection lookup columns mixin.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.EntityConnectionLinksUtilities", {
			extend: "Terrasoft.core.BaseObject",
			alternateClassName: "Terrasoft.EntityConnectionLinksUtilities",

			//region Methods: Private

			/**
			 * Returns entity connection schema.
			 * @private
			 * @return {Object}
			 */
			getEntityConnectionSchema: function() {
				return this.get("EntityConnectionSchema") || this.entitySchema;
			},

			/**
			 * Processes entity connections response.
			 * @private
			 * @param  {Object} collection Entity connections collection.
			 * @return {Terrasoft.BaseViewModelCollection} Processed entity connections collection.
			 */
			processEntityConnectionsResponse: function(collection) {
				this.loadColumnValues(collection);
				var sortDirection = this.get("SortDirection");
				collection.sort(null, sortDirection, this.sortEntityConnections);
				return collection;
			},

			/**
			 * Initializes view model instance.
			 * @private
			 * @param {Object} config View model config.
			 * @param {Object} config.rawData Column values.
			 * @param {Object} config.rowConfig Column types.
			 * @param {Object} config.viewModel View model.
			 */
			createEntityConnectionViewModel: function(config) {
				var entityConnectionViewModelConfig = this.getEntityConnectionViewModelConfig(config);
				var viewModel = this.Ext.create("Terrasoft.EntityConnectionViewModel", entityConnectionViewModelConfig);
				config.viewModel = viewModel;
			},

			/**
			 * Returns view model config.
			 * @private
			 * @param {Object} config View model config.
			 * @param {Object} config.rawData Column values.
			 * @param {Object} config.rowConfig Column types.
			 * @return {Object} View model config.
			 */
			getEntityConnectionViewModelConfig: function(config) {
				var sysSchemaName = config.rawData.SysSchemaName;
				var entitySchema = require(sysSchemaName);
				var columnUId = config.rawData.ColumnUId;
				var columnArray = this.Ext.Object.getValues(entitySchema.columns);
				var findResult = this.Terrasoft.findItem(columnArray, {uId: columnUId});
				var column = findResult && findResult.item;
				var marker = this.Ext.String.format("{0} {1}", column.name, column.caption);
				var viewModelConfig = {
					entitySchema: this.entitySchema,
					rowConfig: config.rowConfig,
					values: config.rawData,
					isNew: false,
					isDeleted: false
				};
				this.Ext.apply(viewModelConfig, {
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox
				});
				this.Ext.apply(viewModelConfig.values, {
					Caption: column.caption,
					ReferenceSchema: column.referenceSchema,
					MarkerValue: marker,
					ColumnName: column.name,
					DataValueType: column.dataValueType,
					ValuesList: this.Ext.create("Terrasoft.Collection")
				});
				return viewModelConfig;
			},

			/**
			 * Returns entity schema query for getting entity connections.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query for getting entity connections.
			 */
			getEntityConnectionQuery: function() {
				return this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "EntityConnection"
				});
			},

			/**
			 * Sets client cache parameters for entity schema query.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			setClientESQCacheParameters: function(esq) {
				var entityInfo = this.get("EntityInfo");
				var columnsKeys = esq.columns.getKeys();
				var entitySchemaName = entityInfo ? entityInfo.entitySchemaName : this.entitySchemaName;
				var cacheItemName = this.Ext.String.format("{0}_{1}_{2}", this.Terrasoft.SysValue.CURRENT_WORKSPACE.value,
					entitySchemaName, columnsKeys.join(""));
				this.Ext.apply(esq, {
					clientESQCacheParameters: {
						cacheItemName: cacheItemName
					}
				});
			},

			/**
			 * Add columns to entity schema query for getting entity connections.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addEntityConnectionsColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("SysEntitySchemaUId");
				esq.addColumn("[VwSysSchemaInWorkspace:UId:SysEntitySchemaUId].Name", "SysSchemaName");
				esq.addColumn("ColumnUId");
				esq.addColumn("Position");
			},

			/**
			 * Add filters to entity schema query for getting entity connections.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 * @param {Terrasoft.EntitySchema} entitySchema Entity schema.
			 */
			_addEntityConnectionsFilters: function(esq, entitySchema) {
				var entitySchemaFilter = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"[VwSysSchemaInWorkspace:UId:SysEntitySchemaUId].Name", entitySchema.name);
				esq.filters.add("EntitySchema", entitySchemaFilter);
				var sysWorkspaceFilter = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"[VwSysSchemaInWorkspace:UId:SysEntitySchemaUId].SysWorkspace",
					this.Terrasoft.SysValue.CURRENT_WORKSPACE.value);
				esq.filters.add("SysWorkspace", sysWorkspaceFilter);
				var columns = entitySchema.columns;
				var columnUIds = [];
				this.Terrasoft.each(columns, function(column) {
					columnUIds.push(column.uId);
				}, this);
				var columnUIdsFilter = this.Terrasoft.createColumnInFilterWithParameters("ColumnUId", columnUIds);
				esq.filters.add("ColumnUIds", columnUIdsFilter);
			},

			/**
			 * Fills an array entity relationships.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} entities Collection of entity connections.
			 * @param {Object[]} relationColumnNames An array of connection column names.
			 */
			fillEntityConnectionColumnsList: function(entities, relationColumnNames) {
				var entitySchema = this.getEntityConnectionSchema();
				entities.each(function(item) {
					var entityColumn;
					try {
						entityColumn = entitySchema.getColumnByUId(item.get("ColumnUId"));
					} catch (e) {
						this.error(e);
						return;
					}
					var columnName = entityColumn.name;
					if (!(columnName === "Contact" || columnName === "Account")) {
						relationColumnNames.push(columnName);
					}
				}, this);
			},

			/**
			 * Sorts entity connection columns.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} entities Entity connection columns.
			 */
			sortEntityConnectionColumns: function(entities) {
				var entitySchema = this.getEntityConnectionSchema();
				entities.sortByFn(function(elA, elB) {
					var aColumnUId = elA.get("ColumnUId");
					var bColumnUId = elB.get("ColumnUId");
					var entityColumnA = null;
					var entityColumnB = null;
					if (!this.Ext.isEmpty(aColumnUId) && !this.Ext.isEmpty(bColumnUId)) {
						try {
							entityColumnA = entitySchema.getColumnByUId(elA.get("ColumnUId"));
							entityColumnB = entitySchema.getColumnByUId(elB.get("ColumnUId"));
						} catch (e) {
							this.error(e);
							return;
						}
					} else {
						return;
					}
					if (entityColumnA.caption === entityColumnB.caption) {
						return 0;
					}
					return (entityColumnA.caption < entityColumnB.caption) ? -1 : 1;
				}.bind(this));
			},

			/**
			 * Callback for requiring schema during load entity connections.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} collection Collection to be loaded.
			 * @param {Function} callback loadEntityConnection callback.
			 * @param {Object} scope loadEntityConnection scope.
			 * @param {Terrasoft.EntitySchema} entitySchema Connection entity schema.
			 */
			_onLoadEntityConnectionsRequire: function(collection, callback, scope, entitySchema) {
				collection.clear();
				var esq = this.getEntityConnectionQuery();
				this.Ext.apply(esq, {
					rowViewModelClassName: "Terrasoft.EntityConnectionViewModel"
				});
				this.addEntityConnectionsColumns(esq);
				this._addEntityConnectionsFilters(esq, entitySchema);
				this.setClientESQCacheParameters(esq);
				esq.on("createviewmodel", this.createEntityConnectionViewModel, this);
				esq.getEntityCollection(function(response) {
					if (response.success) {
						var entityCollection = response.collection;
						this.processEntityConnectionsResponse(entityCollection);
						collection.loadAll(entityCollection);
						this.set("IsDataLoaded", true);
					}
					this.Ext.callback(callback, scope);
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Loads entity connection columns.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			loadEntityConnectionColumns: function(callback, scope) {
				var entitySchema = this.getEntityConnectionSchema();
				var esq = this.getEntityConnectionQuery();
				esq.addColumn("ColumnUId");
				esq.filters.addItem(esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "SysEntitySchemaUId", entitySchema.uId));
				this.setClientESQCacheParameters(esq);
				esq.getEntityCollection(function(result) {
					var relationColumnNames = [];
					if (result.success) {
						var entities = result.collection;
						this.addAdditionalConnectionColumns(entities);
						this.sortEntityConnectionColumns(entities);
						this.fillEntityConnectionColumnsList(entities, relationColumnNames);
						relationColumnNames.unshift("Contact", "Account");
					}
					this.set("EntityConnectionColumnList", relationColumnNames);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Sort entity connections.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} connection1 First connection.
			 * @param {Terrasoft.BaseViewModel} connection2 Second connection.
			 * @return {Boolean}
			 */
			sortEntityConnections: function(connection1, connection2) {
				var position1 = connection1.get("Position");
				var position2 = connection2.get("Position");
				if (position1 === position2) {
					var caption1 = connection1.get("Caption");
					var caption2 = connection2.get("Caption");
					return caption1.localeCompare(caption2);
				}
				return (position1 > position2);
			},

			/**
			 * Returns menu of connections type buttons.
			 * @protected
			 * @param {Object} column Connection column.
			 * @return {Terrasoft.BaseViewModel} View model menu item.
			 */
			generateRelationMenuItemConfig: function(column) {
				var imageConfig = this.getRelationImageConfig(column.name);
				var config = {
					"click": {"bindTo": "onRelationMenuItemClick"},
					"caption": column.caption,
					"imageConfig": imageConfig,
					"tag": column.name,
					"visible": {
						"bindTo": column.name,
						"bindConfig": {
							"converter": "isEmptyColumnValue"
						}
					},
					"markerValue": column.caption
				};
				return config;
			},

			/**
			 * Creates an object parameters panel with link buttons and adds it to the view element.
			 * @protected
			 * @param {Array|*} viewConfigItems An array with view elements.
			 */
			createEntityConnectionPanelConfig: function(viewConfigItems) {
				var relationColumnNames = this.get("EntityConnectionColumnList");
				if (this.Ext.isEmpty(relationColumnNames)) {
					return;
				}
				var panel = this.generateEntityConnectionPanelConfig(relationColumnNames);
				viewConfigItems.push(panel);
				if (Terrasoft.Features.getIsEnabled("ShowLinkedColumnsIcons")) {
					var linkedIconsPanel = this.generateLinkedIconsPanelConfig(relationColumnNames);
					viewConfigItems.push(linkedIconsPanel);
				}
			},

			/**
			 * Generates container config for link columns icons.
			 * @protected
			 * @param {String[]} relationColumnNames An array of connection column names.
			 * @return {Object} Container config for link columns icons.
			 */
			generateLinkedIconsPanelConfig: function(relationColumnNames) {
				var items = [];
				var connectionsCaption = {
					className: "Terrasoft.Label",
					caption: EntityConnectionLinksResourceUtilities.resources.localizableStrings
						.ConnectionsCaptionLocalizableString,
					visible: {"bindTo": "isAnyRelationColumnFilled"},
					labelClass: "connection-caption-label"
				};
				items.push(connectionsCaption);
				this.Terrasoft.each(relationColumnNames, function(columnName) {
					var relationItemConfig = this.generateLinkedConnectionButtonConfig(columnName);
					items.push(relationItemConfig);
				}, this);
				var panelContainerConfig = {
					"className": "Terrasoft.Container",
					"classes": {"wrapClassName": ["entity-linked-icons-container"]},
					"markerValue": "EntityLinkedIconsContainer",
					"items": items
				};
				return panelContainerConfig;
			},

			/**
			 * Creates an object with container and links button parameters.
			 * @protected
			 * @param {String[]} relationColumnNames An array of connection column names.
			 * @return {Object} Control parameters.
			 */
			generateEntityConnectionPanelConfig: function(relationColumnNames) {
				var items = [];
				var relationMenuItems = [];
				var lookupEditConfig = {
					"cleariconclick": {bindTo: "clearColumn"},
					"href": {bindTo: "getHref"},
					"linkclick": {bindTo: "onLinkClick"},
					"linkmouseover": {bindTo: "linkMouseOver"},
					"showValueAsLink": true,
					"hasClearIcon": true
				};
				this.Terrasoft.each(relationColumnNames, function(columnName) {
					var editConfig = this.Terrasoft.deepClone(lookupEditConfig);
					Ext.apply(editConfig, {
						"value": {bindTo: columnName},
						"markerValue": columnName
					});
					var column = this.getEntityConnectionSchema().getColumnByName(columnName);
					var relationItemConfig = this.generateEntityConnectionButtonConfig(column);
					var lookupConfig = this.createEditContainerConfig(column.name, editConfig);
					var relationMenuItemConfig = this.generateRelationMenuItemConfig(column);
					var ext = this.Ext;
					if (!ext.isEmpty(relationItemConfig) && !ext.isEmpty(lookupConfig)) {
						var relationLookupItems = [];
						relationLookupItems.push(relationItemConfig);
						relationLookupItems.push(lookupConfig);
						items.push({
							"className": "Terrasoft.Container",
							"classes": {"wrapClassName": ["entity-item-relation-container"]},
							"markerValue": "EntityRelationContainer",
							"items": relationLookupItems,
							"visible": {"bindTo": "isColumnFilled"},
							"tag": column.name
						});
						relationMenuItems.push(relationMenuItemConfig);
					}
				}, this);
				var relationsButtonConfig = {
					"className": "Terrasoft.Button",
					"imageConfig": {
						"bindTo": "CurrentColumnName",
						"bindConfig": {"converter": "getRelationButtonImageConfig"}
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"menu": {
						"items": relationMenuItems
					},
					markerValue: "relationMenuItems"
				};
				var lookupAllEditConfig = {
					"value": {bindTo: "CurrentColumnValue"},
					"change": {bindTo: "onColumnValueChange"},
					"placeholder": {
						"bindTo": "CurrentColumnName",
						"bindConfig": {
							"converter": "getPlaceholder"
						}
					},
					"markerValue": {"bindTo": "CurrentColumnName"},
					"hasClearIcon": false
				};
				lookupAllEditConfig = this.createEditContainerConfig(null, lookupAllEditConfig);
				var relationItems = [];
				relationItems.push(relationsButtonConfig);
				relationItems.push(lookupAllEditConfig);
				items.push({
					"className": "Terrasoft.Container",
					"classes": {"wrapClassName": ["entity-item-relation-container"]},
					"markerValue": "EntityRelationContainer",
					"visible": {"bindTo": "IsAddNewRelationVisible"},
					"items": relationItems
				});
				var additionalContainerItemsConfig = this.generateAdditionalRelationItemsConfig();
				if (!Ext.isEmpty(additionalContainerItemsConfig)) {
					items.push(additionalContainerItemsConfig);
				}
				var panelContainerConfig = {
					"className": "Terrasoft.Container",
					"classes": {"wrapClassName": ["entity-relation-container"]},
					"markerValue": "EntityAllRelationContainer",
					"items": items
				};
				return panelContainerConfig;
			},

			/**
			 * Generates button config for linked column.
			 * @protected
			 * @param {Object} columnName linked column name.
			 * @return {Object} Button config for linked column.
			 */
			generateLinkedConnectionButtonConfig: function(columnName) {
				return {
					"className": "Terrasoft.Button",
					"imageConfig": {"bindTo": "getRelationButtonImageConfig"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"classes": {
						"imageClass": ["linked-relation-button"],
						"wrapperClass": ["linked-relation-button-wrapper"]
					},
					"visible": {"bindTo": "isColumnFilled"},
					"click": {"bindTo": "onLinkedRelationButtonClick"},
					"markerValue": "LinkedRelationButton" + " " + columnName,
					"tag": columnName
				};
			},

			/**
			 * Creates an object with connection parameters for the specified column.
			 * @protected
			 * @param {Object} column Connection object.
			 * @return {Object} Options to create a button.
			 */
			generateEntityConnectionButtonConfig: function(column) {
				var schemaName = column.referenceSchemaName;
				return {
					"className": "Terrasoft.Button",
					"imageConfig": {"bindTo": "getRelationButtonImageConfig"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"visible": true,
					"markerValue": "EntityRelationButton" + " " + schemaName + " " + column.name,
					"tag": column.name
				};
			},

			/**
			 * Adds additional relation columns, that aren't present in the EntityConnection.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.BaseViewModelCollection} entities Collection of the entity relations view models.
			 */
			addAdditionalConnectionColumns: Terrasoft.emptyFn,

			/**
			 * Creates an object with options for additional items.
			 * @protected
			 * @virtual
			 */
			generateAdditionalRelationItemsConfig: Terrasoft.emptyFn,

			/**
			 * Returns object config with lookup edit parameters.
			 * @protected
			 * @return {Object}
			 */
			createEditContainerConfig: function(columnName, lookupConfig) {
				var items = {
					className: "Terrasoft.LookupEdit",
					markerValue: {bindTo: "getEditContainerMarkerValue"},
					loadVocabulary: {bindTo: "loadVocabulary"},
					list: {
						bindTo: "CurrentRelationItemsList"
					},
					prepareList: {
						bindTo: "onPrepareRelationLookupList"
					},
					tag: columnName
				};
				Ext.apply(items, lookupConfig);
				var config = {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["control-wrap"]
					},
					items: [
						items
					]
				};
				return config;
			},

			/**
			 * Returns object config with button icon parameters.
			 * @param {String} columnName Column name.
			 * @return {Object}
			 */
			getRelationImageConfig: function(columnName) {
				var resourceName = columnName + "ExistIcon";
				var image = EntityConnectionLinksResourceUtilities.resources.localizableImages[resourceName] ||
					EntityConnectionLinksResourceUtilities.resources.localizableImages.DefaultIcon;
				return image;
			},

			/**
			 * Loads entity connections to @collection.
			 * @protected
			 * @param  {Terrasoft.BaseViewModelCollection} collection Fields collection.
			 * @param  {Function} callback Callback function.
			 * @param  {Object} scope Execution context.
			 */
			loadEntityConnections: function(collection, callback, scope) {
				var entityInfo = this.get("EntityInfo");
				var entitySchemaName = entityInfo ? entityInfo.entitySchemaName : this.entitySchemaName;
				var requireCallback = this._onLoadEntityConnectionsRequire.bind(this, collection, callback, scope);
				Terrasoft.require([entitySchemaName], requireCallback);
			}

			//endregion

		});
	});


