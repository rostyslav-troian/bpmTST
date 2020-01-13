Terrasoft.configuration.Structures["MiniPageEntityConnectionsUtils"] = {innerHierarchyStack: ["MiniPageEntityConnectionsUtils"]};
define("MiniPageEntityConnectionsUtils", ["NetworkUtilities", "EntityConnectionLinksResourceUtilities",
	"MiniPageResourceUtilities", "MiniPageViewGenerator", "CallExtendedMenu", "EmailExtendedMenu"],
		function(NetworkUtilities, entityConnectionResources, miniPageResources) {
			Ext.define("Terrasoft.configuration.mixins.MiniPageEntityConnectionsUtils", {
				alternateClassName: "Terrasoft.MiniPageEntityConnectionsUtils",

				/**
				 * Inits entity connections.
				 * @protected
				 */
				initEntityConnections: function() {
					this.updateModeForEntityConnections();
					this.updateEntityConnectionsVisibility();
					this.setEntityConnectionMenuItems();
					this.fillEmailExtendedMenuButtonCollections(["Contact", "Account"],
							this.processEntityConnectionCommunications, this);
					this.fillCallExtendedMenuButtonCollections(["Contact", "Account"],
							this.processEntityConnectionCommunications, this);
				},

				/**
				 * Processes entity connection communications.
				 * @protected
				 * @param  {String} connectionName Connection name.
				 * @param  {String} propertyName Property name.
				 */
				processEntityConnectionCommunications: function(connectionName, propertyName) {
					var entityConnection = this.getEntityConnectionItem("EntityConnectionsList", propertyName);
					if (entityConnection) {
						var columnName = entityConnection.get("ColumnName");
						var collectionName = connectionName + columnName + "ExtendedMenu";
						var collectionVisibility = connectionName + columnName + "ExtendedMenuButtonVisible";
						if (this.get(columnName) && this.get(collectionName) && this.get(collectionVisibility)) {
							this.bindEntityConnectionCommunications(entityConnection, connectionName, columnName);
						}
					}
				},

				/**
				 * Calls after entity column changed.
				 * @private
				 * @param {String} columnName Column name.
				 * @param {Object} columnValue Column value.
				 */
				entityColumnChanged: function(columnName, columnValue) {
					var entityConnectionItem = this.getEntityConnectionItem("EntityConnectionsList", columnName);
					if (entityConnectionItem) {
						entityConnectionItem.set("Value", columnValue);
						this.setConnectionItemVisibility(columnName, !this.Ext.isEmpty(columnValue));
						this.setMenuItemVisibility(columnName, this.Ext.isEmpty(columnValue));
					}
				},

				/**
				 * Sets mini page mode attribute to entity connection items.
				 * @private
				 */
				updateModeForEntityConnections: function() {
					this.forEachEntityConnection(function(item) {
						item.set("Mode", this.get("Mode"));
					}, this);
				},

				/**
				 * Bind entity connection communication to ContainerList item.
				 * @private
				 * @param  {Terrasoft.EntityConnectionViewModel} item ContainerList item.
				 * @param  {String} connectionName Connection name.
				 * @param  {String} columnName Column name.
				 */
				bindEntityConnectionCommunications: function(item, connectionName, columnName) {
					var collectionName = connectionName + columnName + "ExtendedMenu";
					var collectionVisibility = connectionName + columnName + "ExtendedMenuButtonVisible";
					var menuAfterClickFunction = connectionName + this.suffixMenuItemAfterClick;
					item.suffixMenuItemAfterClick = this.suffixMenuItemAfterClick;
					item.onButtonMenuItemClick = this.onButtonMenuItemClick;
					item.openEmailCardWithValues = this.openEmailCardWithValues.bind(this);
					item.openCard = this.openCard;
					item.set(menuAfterClickFunction, this.get(menuAfterClickFunction));
					item.set(collectionName, this.get(collectionName));
					item.set(collectionVisibility, this.get(collectionVisibility));
				},

				/**
				 * Bind entity connection methods.
				 * @private
				 * @param {Object} item Entity connection item.
				 */
				bindEntityConnectionMethods: function(item) {
					item.close = this.close.bind(this);
					item.adjustMiniPagePosition = this.adjustMiniPagePosition;
					item.isViewMode = this.isViewMode;
					item.isNotViewMode = this.isNotViewMode;
					item.clearEntityConnection = this.clearEntityConnection.bind(this);
					item.getEntityConnectionItem = this.getEntityConnectionItem;
					item.setEntityConnection = this.setEntityConnection.bind(this);
					item.onPrepareEntityConnectionList = this.onPrepareEntityConnectionList;
					item.getItemsQuery = this.getItemsQuery;
					item.getLookupQueryFilters = this.getLookupQueryFilters.bind(this);
					item.processEntityCollection = this.processEntityCollection.bind(this);
					item.getLookupListConfig = this.getLookupListConfig.bind(this);
					item.set("EntityConnectionMenuItems", this.get("EntityConnectionMenuItems"));
				},

				/**
				 * Generates configuration of the element view.
				 * @private
				 * @param {Object} itemConfig Link to the configuration element of ContainerList.
				 * @param {Terrasoft.EntityConnectionViewModel} item Entity connection ViewModel item.
				 */
				getEntityConnectionViewConfig: function(itemConfig, item) {
					this.bindEntityConnectionMethods(item);
					var columnName = item.get("ColumnName");
					if (columnName) {
						item.set("ConnectionVisibility", !this.Ext.isEmpty(item.get("Value")));
						var itemViewConfig = this.get("ItemViewConfig") || [];
						if (itemViewConfig && itemViewConfig[columnName]) {
							itemConfig.config = itemViewConfig[columnName];
							return;
						}
						var viewGenerator = this.Ext.create("Terrasoft.MiniPageViewGenerator");
						var entityConnectionItemConfig = this.getEntityConnectionItemConfig(columnName);
						var entityConnectionConfig = viewGenerator.generatePartial(
							{
								"itemType": this.Terrasoft.ViewItemType.CONTAINER,
								"name": "EntityConnections",
								"items": entityConnectionItemConfig,
								"visible": {"bindTo": "ConnectionVisibility"},
								"tag": columnName
							},
							{
								"schemaName": "ActivityMiniPage",
								"viewModelClass": this.Ext.ClassManager.get("Terrasoft.ActivityMiniPageActivityViewModel"),
								"schema": {}
							}
						);
						itemConfig.config = entityConnectionConfig[0];
						itemViewConfig[columnName] = entityConnectionConfig[0];
						this.set("ItemViewConfig", itemViewConfig);
					}
				},

				/**
				 * Returns an instance of the entity connection configuration element.
				 * @protected
				 * @param {String} columnName Entity connection name.
				 * @return {Object} Instance of the entity connection configuration element.
				 */
				getEntityConnectionItemConfig: function(columnName) {
					var entityConnectionName = this.getEntityConnectionName(columnName);
					var entityConnectionItem = [];
					entityConnectionItem.push(this.getEntityConnectionImage(columnName));
					entityConnectionItem.push(this.getEntityConnectionHyperlink(columnName, entityConnectionName));
					entityConnectionItem.push(this.getEntityConnectionModelItem(columnName));
					if (this.hasCommunications(columnName)) {
						entityConnectionItem.push(this.getEntityConnectionCommunications(columnName));
					}
					return entityConnectionItem;
				},

				/**
				 * Returns entity connection image config.
				 * @private
				 * @param {String} columnName Entity connection column name.
				 * @return {Object} Entity connection image config.
				 */
				getEntityConnectionImage: function(columnName) {
					return {
						"name": columnName + "Image",
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"imageConfig": this.getEntityConnectionImageConfig(columnName),
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							wrapperClass: ["entity-connection-image-wrap"]
						},
						"markerValue": columnName + "Image",
						"tag": columnName
					};
				},

				/**
				 * Returns entity connection hyperlink config.
				 * @private
				 * @param {String} columnName Entity connection column name.
				 * @param {String} entityConnectionName Entity connection name.
				 * @return {Object} Entity connection hyperlink config.
				 */
				getEntityConnectionHyperlink: function(columnName, entityConnectionName) {
					return {
						"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
						"caption": entityConnectionName,
						"href": this.getEntityConnectionHref(columnName),
						"markerValue": columnName,
						"target": this.Terrasoft.controls.HyperlinkEnums.target.SELF,
						"classes": {"hyperlinkClass": ["entity-connection-hyperlink"]},
						"click": {"bindTo": "close"},
						"afterrender": {"bindTo": "adjustMiniPagePosition"},
						"afterrerender": {"bindTo": "adjustMiniPagePosition"},
						"visible": {
							"bindTo": "isViewMode"
						}
					};
				},

				/**
				 * Returns entity connection ModelItem config.
				 * @private
				 * @param {String} columnName Entity connection column name.
				 * @return {Object} Entity connection ModelItem config.
				 */
				getEntityConnectionModelItem: function(columnName) {
					return {
						"itemType": this.Terrasoft.ViewItemType.MODEL_ITEM,
						"dataValueType": this.Terrasoft.DataValueType.ENUM,
						"name": columnName,
						"caption": {"bindTo": "Caption"},
						"markerValue": {"bindTo": "MarkerValue"},
						"labelConfig": {"visible": false},
						"wrapClass": ["entity-connection-lookup"],
						"controlConfig": {
							"value": {"bindTo": "Value"},
							"list": {"bindTo": "ValuesList"},
							"tag": columnName,
							"showValueAsLink": false,
							"hasClearIcon": true,
							"cleariconclick": {"bindTo": "clearEntityConnection"},
							"focused": {
								"bindTo": "IsItemFocused"
							},
							"prepareList": {
								"bindTo": "onPrepareEntityConnectionList"
							},
							"change": {
								"bindTo": "setEntityConnection"
							},
							"enableLocalFilter": false
						},
						"visible": {
							"bindTo": "isNotViewMode"
						}
					};
				},

				/**
				 * Returns entity connection communications container config.
				 * @private
				 * @param {String} columnName Entity connection column name.
				 * @return {Object} Entity connection communications container config.
				 */
				getEntityConnectionCommunications: function(columnName) {
					return {
						"name": "EntityConnectionButtonsContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["entity-connection-buttons-container"],
						"items": [
							{
								"name": columnName + "Call",
								"itemType": this.Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"markerValue": columnName + "CallButton",
								"classes": {"wrapperClass": ["entity-connection-call-wrap"]},
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": columnName
								}
							},
							{
								"name": columnName + "Email",
								"itemType": this.Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"markerValue": columnName + "EmailButton",
								"classes": {"wrapperClass": ["entity-connection-email-wrap"]},
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": columnName
								}
							}
						],
						"visible": {
							"bindTo": "isViewMode"
						}
					};
				},

				/**
				 * Returns true if current entity connection have communications.
				 * @protected
				 * @param {String} columnName Entity communication column name.
				 * @return {Boolean} True if current entity connection have communications.
				 */
				hasCommunications: function(columnName) {
					return (columnName === "Contact" || columnName === "Account");
				},

				/**
				 * Returns entity connection image config.
				 * @private
				 * @param  {String} columnName Current column name.
				 * @return {Object} Entity connection image config.
				 */
				getEntityConnectionImageConfig: function(columnName) {
					var resourceName = columnName + "ExistIcon";
					var image = entityConnectionResources.resources.localizableImages[resourceName] ||
							entityConnectionResources.resources.localizableImages.DefaultIcon;
					return image;
				},

				/**
				 * Returns entity connection href.
				 * @private
				 * @param  {String} columnName Current column name.
				 * @return {String} Entity connection href.
				 */
				getEntityConnectionHref: function(columnName) {
					var relativeUrl = "";
					var column = this.getColumnByName(columnName);
					var entity = this.get(columnName);
					if (column && column.referenceSchemaName && entity) {
						var typeColumn = NetworkUtilities.getTypeColumn(columnName);
						if (Ext.isEmpty(typeColumn)) {
							typeColumn = NetworkUtilities.getTypeColumn(column.referenceSchemaName);
						}
						var typePath = typeColumn ? typeColumn.path : null;
						var typeId = typePath && entity[typePath] ? entity[typePath].value : null;
						relativeUrl = NetworkUtilities.getEntityUrl(column.referenceSchemaName, entity.value, typeId);
					}
					return this.Terrasoft.combinePath(
						this.Terrasoft.workspaceBaseUrl, "Nui", "ViewModule.aspx#" + relativeUrl);
				},

				/**
				 * Returns entity connection name.
				 * @private
				 * @param  {String} columnName Current column name.
				 * @return {String} Entity connection name.
				 */
				getEntityConnectionName: function(columnName) {
					return this.get(columnName) ? this.get(columnName).displayValue : "";
				},

				/**
				 * Loads data to entity connection model.
				 * @private
				 * @param {Terrasoft.BaseViewModelCollection} inputCollection Input collection.
				 */
				loadColumnValues: function(inputCollection) {
					inputCollection.each(function(item) {
						var columnName = item.get("ColumnName");
						if (this.get(columnName)) {
							var columnValue = this.get(columnName);
							item.set("Value", columnValue);
						}
					}, this);
				},

				/**
				 * Updates entity connections from EntityConnectionsList.
				 * @private
				 */
				updateEntityConnections: function() {
					this.forEachEntityConnection(function(entityConnection) {
						var connectionValue = entityConnection.get("Value");
						var connectionName = entityConnection.get("ColumnName");
						if (connectionValue) {
							var connection = this.get(connectionName);
							connection.value = connectionValue.value;
							connection.displayValue = connectionValue.displayValue;
						} else {
							this.set(connectionName, null);
						}
					}, this);
				},

				/**
				 * Sets entity connection.
				 * @private
				 * @param {Object} entityConnection Entity connection.
				 * @param {Object} columnName Column name.
				 */
				setEntityConnection: function(entityConnection, columnName) {
					if (entityConnection && columnName) {
						this.set(columnName, entityConnection);
					}
				},

				/**
				 * Updates EntityConnectionVisibility property.
				 * @private
				 */
				updateEntityConnectionsVisibility: function() {
					var visible = false;
					this.forEachEntityConnection(function(connection) {
						if (!visible && connection.get("Value") && connection.get("Value").value) {
							visible = true;
						}
					}, this);
					this.set("EntityConnectionsVisibility", visible);
				},

				/**
				 * Execute handler function for each entity connection.
				 * @private
				 * @param {Function} handler Handler function.
				 * @param {Object} scope Execution context.
				 */
				forEachEntityConnection: function(handler, scope) {
					var entityConnectionsList = this.get("EntityConnectionsList");
					if (entityConnectionsList && entityConnectionsList.getItems) {
						this.Terrasoft.each(entityConnectionsList.getItems(), function(entityConnection) {
							handler.call(this, entityConnection);
						}, scope);
					}
				},

				/**
				 * Returns collection item from collection with name collectionName by column name.
				 * @private
				 * @param {String} collectionName Collection name.
				 * @param {String} columnName Column name.
				 * @return {Object} Collection item.
				 */
				getEntityConnectionItem: function(collectionName, columnName) {
					var entityConnectionsList = this.get(collectionName);
					if (entityConnectionsList && entityConnectionsList.getItems) {
						return entityConnectionsList.getItems().filter(function(item) {
							return (item.get("ColumnName") === columnName) || (item.get("Tag") === columnName);
						})[0];
					}
				},

				/**
				 * Sets entity connection menu items.
				 * @private
				 */
				setEntityConnectionMenuItems: function() {
					var entityConnectionMenuItems = this.get("EntityConnectionMenuItems");
					entityConnectionMenuItems.clear();
					this.forEachEntityConnection(function(entityConnection) {
						var columnName = entityConnection.get("ColumnName");
						entityConnectionMenuItems.addItem(this.getButtonMenuItem({
							"Caption": entityConnection.get("Caption"),
							"Click": {"bindTo": "addEntityConnection"},
							"Visible": this.getEntityConnectionMenuItemVisibility(columnName),
							"Tag": columnName,
							"ImageConfig": this.getEntityConnectionImageConfig(columnName)
						}));
					}, this);
				},

				/**
				 * Returns entity connection menu  visibility.
				 * @private
				 * @param {String} columnName Column name
				 * @return {Boolean} Entity connection menu visibility.
				 */
				getEntityConnectionMenuItemVisibility: function(columnName) {
					var entityConnection = this.getEntityConnectionItem("EntityConnectionsList", columnName);
					return entityConnection ? !entityConnection.get("ConnectionVisibility") : false;
				},

				/**
				 * Clears entity connection.
				 * @private
				 * @param {String} columnName Column name.
				 */
				clearEntityConnection: function(columnName) {
					this.setMenuItemVisibility(columnName, true);
					this.setConnectionItemVisibility(columnName, false);
					this.set(columnName, null);
				},

				/**
				 * Sets menu item visibility.
				 * @param {String} columnName Column name.
				 * @param {Boolean} value Visibility value.
				 */
				setMenuItemVisibility: function(columnName, value) {
					var menuItem = this.getEntityConnectionItem("EntityConnectionMenuItems", columnName);
					menuItem.set("Visible", value);
				},

				/**
				 * Sets connection item visibility.
				 * @param {String} columnName Column name.
				 * @param {Boolean} value Visibility value.
				 */
				setConnectionItemVisibility: function(columnName, value) {
					var item = this.getEntityConnectionItem("EntityConnectionsList", columnName);
					item.set("ConnectionVisibility", value);
					item.set("IsItemFocused", value);
					if (!value) {
						item = null;
					}
				},

				/**
				 * Adds entity connection.
				 * @private
				 * @param {String} columnName Column name.
				 */
				addEntityConnection: function(columnName) {
					this.setConnectionItemVisibility(columnName, true);
					this.setMenuItemVisibility(columnName, false);
					this.adjustMiniPagePosition();
				},

				/**
				 * Calls when prepare listview for control.
				 * @param {String} inputString Input string.
				 * @param {Object} list Entity connections list.
				 */
				onPrepareEntityConnectionList: function(inputString, list) {
					var itemsQuery = this.getItemsQuery(inputString);
					itemsQuery.getEntityCollection(function(result) {
						this.processEntityCollection(result, inputString, this, list);
					}, this);
				},

				/**
				 * Processes entity collection.
				 * @private
				 * @param {Object} result Query result.
				 * @param {String} inputString Input string.
				 * @param {Object} item Current entity connection item.
				 * @param {Object} list Listview list.
				 */
				processEntityCollection: function(result, inputString, item, list) {
					list.clear();
					if (!result || !result.success) {
						return;
					}
					var collection = result.collection;
					var columns = {};
					if (collection && !collection.isEmpty()) {
						collection.each(function(item) {
							var itemId = item.get("Id");
							if (!list.contains(itemId)) {
								columns[itemId] = item.model.attributes;
								columns[itemId].value = itemId;
							}
						}, this);
					}
					list.loadAll(columns);
				},

				/**
				 * Returns query for fetching entities.
				 * @private
				 * @param {String} inputString Input string.
				 * @return {Terrasoft.EntitySchemaQuery} Query for fetching entities.
				 */
				getItemsQuery: function(inputString) {
					var currentColumnName = this.get("ColumnName");
					var referenceSchema = this.values.ReferenceSchema;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: referenceSchema.name
					});
					esq.addColumn("Id");
					esq.rowCount = 15;
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
					var lookupListConfig = this.getLookupListConfig(currentColumnName);
					if (lookupListConfig) {
						this.Terrasoft.each(lookupListConfig.columns, function(column) {
							if (!esq.columns.contains(column)) {
								esq.addColumn(column);
							}
						}, this);
					}
					if (inputString.length !== 0) {
						esq.filters.add("startFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.CONTAIN, referenceSchema.primaryDisplayColumnName,
							inputString));
					}
					esq.filters.addItem(this.getLookupQueryFilters(currentColumnName));
					return esq;
				}
			});
		}
);


