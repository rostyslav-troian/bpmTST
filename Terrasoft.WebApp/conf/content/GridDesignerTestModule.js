Terrasoft.configuration.Structures["GridDesignerTestModule"] = {innerHierarchyStack: ["GridDesignerTestModule"]};
define('GridDesignerTestModuleStructure', ['GridDesignerTestModuleResources'], function(resources) {return {schemaUId:'48efdf8d-995e-492e-941f-869c2ae98a30',schemaCaption: "List designer module", parentSchemaName: "", schemaName:'GridDesignerTestModule',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class GridDesignerTestModule
 * @public
 * Grid designer module (for testing, for demonstration).
 */
/* jshint ignore:start */
define("GridDesignerTestModule", ["terrasoft", "GridDesignerTestModuleResources", "GridDesigner", "ProfileProvider",
		"EntityStructureHelperMixin"],
	function(Terrasoft) {
		return {
			attributes: {},
			messages: {

				/**
				 * @message PushHistoryState
				 * Notification that history state was modified.
				 */
				"PushHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message OnDesignerSaved
				 * Notification that designer was saved.
				 */
				"OnDesignerSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			mixins: {
				EntityStructureHelper: "Terrasoft.EntityStructureHelperMixin"
			},
			methods: {

				/**
				 * Grid designer initialization.
				 * @protected
				 * @virtual
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				init: function(callback, scope) {
					this.callParent([
						function() {
							this.entitySchemaName = "Contact";
							callback.call(scope);
						},
						this
					]);
				},

				/**
				 * Loads the grid settings from the profile for designer.
				 * @protected
				 * @virtual
				 */
				loadGridSettings: function(config) {
					var callback = config.callback;
					var scope = config.scope;
					var profileKey = this.entitySchemaName + "GridSettings";
					Terrasoft.ProfileProvider.load({
						profileKey: profileKey,
						success: function(profile) {
							this.decompressProfile(profile, function(gridSettings) {
								Ext.callback(callback, scope,
									[(!Ext.isEmpty(profile.entitySchemaName)) ? gridSettings : null]);
							});
						},
						failure: function() {
							Ext.callback(callback, scope);
						},
						scope: this
					});
				},

				/**
				 * Saves grid settings into the profile.
				 * @protected
				 * @virtual
				 */
				saveGridSettings: function(config) {
					var profileKey = this.entitySchemaName + "GridSettings";
					var profileData = this.compressProfile(config.profile);
					console.info(JSON.stringify(profileData));
					var profile = Ext.encode(profileData);
					Terrasoft.ProfileProvider.save({
						key: profileKey,
						profile: profile,
						success: config.success,
						failure: config.failure,
						isDef: config.isDefault,
						scope: config.scope
					});
				},

				/**
				 * Shows grid designer.
				 * @protected
				 * @virtual
				 */
				showGridDesigner: function() {
					this.loadGridSettings({
						callback: function(profile) {
							if (!profile) {
								profile = {
									entitySchemaName: this.entitySchemaName,
									gridType: Terrasoft.GridDesignerEnums.GridType.Vertical
								};
							}
							var gridDesignerId =  this.sandbox.id + "GridDesignerModule";
							var params = this.sandbox.publish("GetHistoryState");
							this.sandbox.publish("PushHistoryState", {
								hash: params.hash.historyState,
								"stateObj": {
									"designerSchemaName": "GridDesigner",
									"gridSettings": profile
								},
								silent: true
							});
							this.sandbox.loadModule("ConfigurationModuleV2", {
								renderTo: "centerPanel",
								id: gridDesignerId,
								keepAlive: true
							});
							this.sandbox.subscribe("OnDesignerSaved", function(config) {
								this.saveGridSettings({
									profile: config,
									isDefault: true
								});
							}, this);
						},
						scope: this
					});
				},

				/**
				 * Returns optimized version grid element settings, taking into account the
				 * registry type.
				 * @private
				 */
				compressProfile: function(designerConfig) {
					var gridType = designerConfig.gridType;
					if (gridType === Terrasoft.GridDesignerEnums.GridType.Vertical ||
						gridType === Terrasoft.GridDesignerEnums.GridType.Mobile) {
						delete designerConfig.columns;
						var items = designerConfig.items;
						for (var i = 0, ln = items.length; i < ln; i++) {
							var item = items[i];
							delete item.column;
							delete item.colSpan;
							delete item.rowSpan;
							delete item.content;
						}
					}
					return designerConfig;
				},

				/**
				 * Returns the designer settings with the necessary set of the grid elements properties,
				 * taking into account the registry type.
				 * @private
				 */
				decompressProfile: function(designerConfig, callback) {
					var items = designerConfig.items;
					if (!items || items.length === 0) {
						callback.call(this, designerConfig);
						return;
					}
					var gridType = designerConfig.gridType;
					if (gridType === Terrasoft.GridDesignerEnums.GridType.Vertical ||
						gridType === Terrasoft.GridDesignerEnums.GridType.Mobile) {
						designerConfig.columns = 1;
					}
					var processedItems = 0;
					var self = this;
					var entitySchemaName = designerConfig.entitySchemaName;
					for (var i = 0, count = items.length; i < count; i++) {
						var item = items[i];
						if (gridType === Terrasoft.GridDesignerEnums.GridType.Vertical ||
							gridType === Terrasoft.GridDesignerEnums.GridType.Mobile) {
							item.column = 0;
							item.colSpan = 1;
							item.rowSpan = 1;
						}
						var columnName = item.columnName;
						this.getColumnCaption({
							entitySchemaName: entitySchemaName,
							columnName: columnName,
							key: i,
							callback: function(columnInfo) {
								if (columnInfo) {
									var columnItem = items[columnInfo.key];
									columnItem.content = columnInfo.columnCaption;
								}
								processedItems++;
								if (processedItems === count) {
									callback.call(self, designerConfig);
								}
							}
						});
					}
				},

				/**
				 * Returns the column caption, both simple and compound.
				 * @private
				 */
				getColumnCaption: function(config) {
					var serviceParameter = {
						schemaName: config.entitySchemaName,
						columnPath: config.columnName,
						key: config.key
					};
					var callback = config.callback;
					this.getColumnPathCaption(Ext.JSON.encode([serviceParameter]), function(response) {
						callback.call(this, (response) ? response[0] : null);
					}, this);
				}

			},
			diff: [
				{
					"operation": "insert",
					"name": "GridDesignerModuleContainer",
					"values": {
						"id": "GridDesignerModuleContainer",
						"selectors": {
							"wrapEl": "#GridDesignerModuleContainer"
						},
						"classes": {
							"textClass": "center-panel"
						},
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "GridDesignerModuleContainerHeaderContainer",
					"parentName": "GridDesignerModuleContainerContainer",
					"propertyName": "items",
					"values": {
						"id": "GridDesignerModuleContainerHeaderContainer",
						"selectors": {
							"wrapEl": "#GridDesignerModuleContainerHeaderContainer"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GridDesignerModuleContainerHeaderContainer",
					"propertyName": "items",
					"name": "ShowGridDesignerButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.ShowGridDesignerButtonCaption"
						},
						"classes": {
							"textClass": "actions-button-margin-right"
						},
						"click": {
							"bindTo": "showGridDesigner"
						},
						"style": "green",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 2
						}
					}
				}
			]
		};
	});
/* jshint ignore:end */


