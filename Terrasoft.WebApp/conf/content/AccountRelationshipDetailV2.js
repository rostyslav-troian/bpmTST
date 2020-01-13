Terrasoft.configuration.Structures["AccountRelationshipDetailV2"] = {innerHierarchyStack: ["AccountRelationshipDetailV2"], structureParent: "BaseRelationshipDetailV2"};
define('AccountRelationshipDetailV2Structure', ['AccountRelationshipDetailV2Resources'], function(resources) {return {schemaUId:'440a5fea-b24d-42b3-8426-bf56b6e91494',schemaCaption: "Detail scema - AccountRelationship v2", parentSchemaName: "BaseRelationshipDetailV2", schemaName:'AccountRelationshipDetailV2',parentSchemaUId:'b35710d8-6967-4d7f-8b00-626793d2c446',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountRelationshipDetailV2", ["ConfigurationDiagramGenerator", "RelationshipDiagramViewModel",
	"RelationshipDiagram", "LookupQuickAddMixin", "css!AccountRelationshipDetailCss"
], function() {

	var relationshipMode = {
		Datagrid: "datagrid",
		Relationship: "relationship"
	};

	return {
		entitySchemaName: "VwAccountRelationship",
		mixins: {
			// TODO : #CRM-23901
			RelationshipDiagramViewModel: "Terrasoft.RelationshipDiagramViewModel",
			LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin"
		},
		messages: {
			/**
			 * @message UpdateRelationshipDiagram
			 * ############# ######### ############.
			 */
			"UpdateRelationshipDiagram": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * ############# ##### ########### ############.
			 * @protected
			 */
			initMode: function() {
				var profile = this.getProfile();
				var mode = !this.Ext.isEmpty(profile.Mode) ? profile.Mode : this.setDefaultMode();
				if (mode) {
					this.changeDetailMode(mode);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#onLookupDataLoaded
			 * @overridden
			 */
			onLookupDataLoaded: function(config) {
				this.callParent(arguments);
				var isComplicatedFiltersExists = false;
				var cacheObject = {
					filters: new Terrasoft.Collection(),
					isComplicatedFiltersExists: isComplicatedFiltersExists
				};
				this.setValueToLookupInfoCache(config.columnName, "lookupFiltersInfo", cacheObject);
				var refSchemaName = this.getLookupEntitySchemaName({}, config.columnName);
				var preventSchemaNames = this.getPreventQuickAddSchemaNames();
				if (config.isLookupEdit && !Ext.isEmpty(config.filterValue) &&
						!isComplicatedFiltersExists && preventSchemaNames.indexOf(refSchemaName) === -1) {
					this.setValueToLookupInfoCache(config.columnName, "filterValue", config.filterValue);
					config.objects[Terrasoft.GUID_EMPTY] = this.getNewListItemConfig(config.filterValue);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLookupChange
			 * @overridden
			 */
			onLookupChange: function(newValue, columnName) {
				this.callParent(arguments);
				this.mixins.LookupQuickAddMixin.onLookupChange.call(this, newValue, columnName);
				this.mixins.RelationshipDiagramViewModel.onLookupChange.call(this, newValue, columnName);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getLookupQuery
			 * @overridden
			 */
			getLookupQuery: function(filterValue, columnName) {
				var esq = this.callParent(arguments);
				var lookupColumn = this.columns[columnName];
				var lookupListConfig = lookupColumn.lookupListConfig;
				if (!lookupListConfig) {
					return esq;
				}
				this.Terrasoft.each(lookupListConfig.columns, function(column) {
					if (!esq.columns.contains(column)) {
						esq.addColumn(column);
					}
				}, this);
				var filterGroup = this.getLookupQueryFilters(columnName);
				esq.filters.addItem(filterGroup);
				var columns = esq.columns;
				if (lookupListConfig.orders) {
					var orders = lookupListConfig.orders;
					this.Terrasoft.each(orders, function(order) {
						var orderColumnPath = order.columnPath;
						if (!columns.contains(orderColumnPath)) {
							esq.addColumn(orderColumnPath);
						}
						var sortedColumn = columns.get(orderColumnPath);
						var direction = order.direction;
						sortedColumn.orderDirection = direction ? direction : this.Terrasoft.OrderDirection.ASC;
						var position = order.position;
						sortedColumn.orderPosition = position ? position : 1;
						this.shiftColumnsOrderPosition(columns, sortedColumn);
					}, this);
				}
				return esq;
			},

			/**
			 * ######### #######, ####### ############# ## ########## ####.
			 * @protected
			 * @param {String} columnName ######## #######.
			 * @return {Terrasoft.FilterGroup} ########## ###### ########.
			 */
			getLookupQueryFilters: function(columnName) {
				var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				var column = this.columns[columnName];
				var lookupListConfig = column.lookupListConfig;
				if (lookupListConfig) {
					var filterArray = lookupListConfig.filters;
					this.Terrasoft.each(filterArray, function(item) {
						var filter;
						if (this.Ext.isObject(item) && this.Ext.isFunction(item.method)) {
							filter = item.method.call(this, item.argument);
						}
						if (this.Ext.isFunction(item)) {
							filter = item.call(this);
						}
						if (this.Ext.isEmpty(filter)) {
							throw new this.Terrasoft.InvalidFormatException({
								message: this.Ext.String.format(
									this.get("Resources.Strings.ColumnFilterInvalidFormatException"), columnName)
							});
						}
						filterGroup.addItem(filter);
					}, this);
					if (lookupListConfig.filter) {
						var filterItem = lookupListConfig.filter.call(this);
						if (filterItem) {
							filterGroup.addItem(filterItem);
						}
					}
				}
				return filterGroup;
			},

			/**
			 * ######### ######## ######## ### ####### ##### ######### ######
			 * ### ######## ######## #### #### ## #### ######## #######.
			 * @protected
			 * @return {Array} ######### ######## ########.
			 */
			getForceAddSchemaNames: function() {
				return ["Account"];
			},

			/**
			* ########## ############# ###### ########
			* @protected
			* @return {String} ########## ############# ###### ########
			*/
			getCardModuleSandboxId: function() {
				return this.sandbox.id + "_CardModuleV2";
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#initData
			 * @overridden
			 */
			initData: function(callback, scope) {
				this.callParent([
					function() {
						this.mixins.RelationshipDiagramViewModel.init.call(this);
						callback.call(scope);
						this.initMode();
					},
					this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("UpdateRelationshipDiagram", function() {
					var isNotCollapsed = !this.get("IsDetailCollapsed");
					var isRelationshipMode = this.get("Mode") === relationshipMode.Relationship;
					if (isNotCollapsed && isRelationshipMode) {
						this.loadRelationship();
					}
				}, this, [this.getCardModuleSandboxId()]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#loadGridData
			 * @overridden
			 */
			loadGridData: function() {
				if (this.get("Mode") === relationshipMode.Datagrid) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#updateDetail
			 * @overridden
			 */
			updateDetail: function() {
				this.callParent(arguments);
				if (!this.get("IsDetailCollapsed") && this.get("Mode") === relationshipMode.Relationship) {
					this.loadRelationship();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#onDetailCollapsedChanged
			 * @overridden
			 */
			onDetailCollapsedChanged: function(isCollapsed) {
				this.callParent(arguments);
				if (!isCollapsed && this.get("Mode") === relationshipMode.Relationship) {
					this.loadRelationship();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#getToolsVisible
			 * @overridden
			 */
			getToolsVisible: function() {
				var toolsVisible = this.callParent(arguments);
				var dataGridVisible = this.getDataGridVisible();
				return toolsVisible && dataGridVisible;
			},

			/**
			 * ########## ######## ########### ###### #######.
			 * @protected
			 * @return {Boolean} ######## ########### ###### #######.
			 */
			getModeButtonsVisible: function() {
				return !this.get("IsDetailCollapsed");
			},

			/**
			 * ########## ######## ########### ###### ############.
			 * @protected
			 * @return {Boolean} ######## ########### ###### ############.
			 */
			getRelationshipDataVisible: function() {
				return (this.get("Mode") === relationshipMode.Relationship);
			},

			/**
			 * ########## ######## ########### ####### ######.
			 * @protected
			 * @return {Boolean} ######## ########### ####### ######.
			 */
			getDataGridVisible: function() {
				return (this.get("Mode") === relationshipMode.Datagrid);
			},

			/**
			 * ########## ######## ####### ###### ###### #########.
			 * @protected
			 * @return {Boolean} ######## ####### ###### ###### #########.
			 */
			getRelationshipButtonPressed: function() {
				return (this.get("Mode") === relationshipMode.Relationship);
			},

			/**
			 * ########## ######## ####### ###### ###### ######.
			 * @protected
			 * @return {Boolean} ######## ####### ###### ###### ######.
			 */
			getDataGridButtonPressed: function() {
				return (this.get("Mode") === relationshipMode.Datagrid);
			},

			/**
			 * ######### ####### ##### ########### # #######.
			 * @protected
			 */
			saveModeToProfile: function() {
				var profile = this.getProfile();
				var key = this.getProfileKey();
				if (profile && key) {
					profile.Mode = this.get("Mode");
					this.set(this.getProfileColumnName(), profile);
					this.Terrasoft.utils.saveUserProfile(key, profile, false);
				}
			},

			/**
			 * ######## ##### ######.
			 * @protected
			 * @param {String} mode ##### #####.
			 */
			changeDetailMode: function(mode) {
				if (mode === this.get("Mode")) {
					return;
				}
				var isDataGridMode = (mode === relationshipMode.Datagrid);
				this.set("Mode", mode);
				this.saveModeToProfile();
				this.deselectRows();
				if (isDataGridMode) {
					this.reloadGridData();
				} else if (!this.get("IsDetailCollapsed")) {
					this.loadRelationship();
				}
			},

			/**
			 * ############# ##### ########### ###### ############.
			 * @protected
			 */
			setRelationshipMode: function() {
				this.changeDetailMode(relationshipMode.Relationship);
			},

			/**
			 * ############# ##### #######.
			 * @protected
			 */
			setDataGridMode: function() {
				this.changeDetailMode(relationshipMode.Datagrid);
			},

			/**
			 * ############# ##### ## #########.
			 * @protected
			 */
			setDefaultMode: function() {
				this.setRelationshipMode();
			},

			/**
			 * ########## ######## #######.
			 * @protected
			 * @param {String} mode #####.
			 * @return {String} ######## #######.
			 */
			getDetailMarkerValue: function(mode) {
				var caption = this.get("Resources.Strings.Caption");
				return this.Ext.String.format("{0} {1}", caption, mode);
			},

			/**
			 * Returns the name of the schema object reference field.
			 * @protected
			 * @return {String} Name the schema object reference field.
			 */
			getLookupEntitySchemaName: function() {
				return "Account";
			}
		},

		diff: /**SCHEMA_DIFF*/ [{
			"operation": "merge",
			"name": "Detail",
			"values": {
				"classes": {
					"wrapClass": ["account-relationship", "detail", "grid-detail"]
				},
				"markerValue": {
					"bindTo": "Mode",
					"bindConfig": {
						"converter": "getDetailMarkerValue"
					}
				}
			}
		}, {
			"operation": "merge",
			"name": "DataGrid",
			"values": {
				"visible": {
					"bindTo": "getDataGridVisible"
				}
			}
		}, {
			"operation": "insert",
			"name": "RelationshipDataContainer",
			"parentName": "Detail",
			"propertyName": "items",
			"values": {
				"id": "RelationshipDataContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"visible": {
					"bindTo": "getRelationshipDataVisible"
				},
				"items": []
			}
		}, {
			"operation": "insert",
			"name": "RelationshipDiagram",
			"parentName": "RelationshipDataContainer",
			"propertyName": "items",
			"values": {
				generator: "ConfigurationDiagramGenerator.generateDiagram",
				className: "Terrasoft.RelationshipDiagram",
				items: "Nodes",
				afterrender: {
					bindTo: "onAfterRender"
				}
			}
		}, {
			"operation": "insert",
			"name": "RelationshipModeButton",
			"parentName": "Detail",
			"propertyName": "tools",
			"values": {
				"itemType": this.Terrasoft.ViewItemType.BUTTON,
				"hint": {"bindTo": "Resources.Strings.DiagramViewButtonHint"},
				"click": {
					"bindTo": "setRelationshipMode"
				},
				"visible": {
					"bindTo": "getModeButtonsVisible"
				},
				"pressed": {
					"bindTo": "getRelationshipButtonPressed"
				},
				"classes": {
					"wrapperClass": ["relationship-mode-button"],
					"pressedClass": ["mode-button-pressed"]
				},
				"controlConfig": {
					"imageConfig": {
						"bindTo": "Resources.Images.RelationshipViewIcon"
					}
				},
				"markerValue": relationshipMode.Relationship
			}
		}, {
			"operation": "insert",
			"name": "DataGridModeButton",
			"parentName": "Detail",
			"propertyName": "tools",
			"values": {
				"itemType": this.Terrasoft.ViewItemType.BUTTON,
				"hint": {"bindTo": "Resources.Strings.ListViewButtonHint"},
				"click": {
					"bindTo": "setDataGridMode"
				},
				"visible": {
					"bindTo": "getModeButtonsVisible"
				},
				"pressed": {
					"bindTo": "getDataGridButtonPressed"
				},
				"classes": {
					"wrapperClass": ["datagrid-mode-button", "disable-left-margin"],
					"pressedClass": ["mode-button-pressed"]
				},
				"controlConfig": {
					"imageConfig": {
						"bindTo": "Resources.Images.DataGridViewIcon"
					}
				},
				"markerValue": relationshipMode.Datagrid
			}
		}] /**SCHEMA_DIFF*/
	};
});


