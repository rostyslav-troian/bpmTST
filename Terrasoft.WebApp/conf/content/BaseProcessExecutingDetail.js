Terrasoft.configuration.Structures["BaseProcessExecutingDetail"] = {innerHierarchyStack: ["BaseProcessExecutingDetail"], structureParent: "BaseGridDetailV2"};
define('BaseProcessExecutingDetailStructure', ['BaseProcessExecutingDetailResources'], function(resources) {return {schemaUId:'71054c1c-6f53-429a-8f1b-46c434111db8',schemaCaption: "BaseProcessExecutingDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseProcessExecutingDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class Terrasoft.BaseProcessExecutingDetail
 * @extends Terrasoft.BaseGridDetailV2
 */
define("BaseProcessExecutingDetail", ["terrasoft", "LocalizableHelper", "BaseProcessExecutingDetailResources",
	"ProcessModuleUtilities", "ModalBox", "ProcessExecutingDetailGridRowViewModel", "DataManagerGridUtilities",
	"css!BaseProcessExecutingDetailCSS", "EmptyGridMessageConfigBuilder"
], function(Terrasoft, LocalizableHelper, resources, ProcessModuleUtilities, ModalBox) {
	return {
		mixins: {
			DataManagerGridUtilities: "Terrasoft.DataManagerGridUtilities"
		},
		attributes: {
			/**
			 * Reference schema uId.
			 * @private
			 * @type {String}
			 */
			"ReferenceSchemaUId": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Process runner id.
			 * @private
			 * @type {String}
			 */
			"ProcessRunnerId": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Academy url.
			 * @private
			 * @type {String}
			 */
			"AcademyUrl": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Academy help id.
			 * @private
			 * @type {Number}
			 */
			"HelpId": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 6000
			}
		},
		methods: {

			/**
			 * Position offset for record, that will move record up in list after sort function call.
			 * @private
			 * @type {Number}
			 */
			_nextUpRecordPositionOffset: -1.5,

			/**
			 * Position offset for record, that will move record down in list after sort function call.
			 * @private
			 * @type {Number}
			 */
			_nextDownRecordPositionOffset: 1.5,

			/**
			 * Opens process in process designer.
			 * @private
			 */
			_openProcessInDesigner: function() {
				var activeRow = this.getActiveRow();
				var sysSchemaUId = activeRow.get("SysSchemaUId");
				ProcessModuleUtilities.showProcessSchemaDesigner(sysSchemaUId);
			},

			/**
			 * Adds record arrow button handlers for every record.
			 * @private
			 * @param records {Terrasoft.Collection} Records collection.
			 */
			_applyRecordButtonsHandlers: function(records) {
				records.each(function(record) {
					record.getIsRecordUpButtonVisible = this.getIsRecordUpButtonVisible;
					record.getIsRecordDownButtonVisible = this.getIsRecordDownButtonVisible;
				}, this);
			},

			/**
			 * Initializes help url.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			_initHelpUrl: function(callback, scope) {
				Terrasoft.AcademyUtilities.getUrl({
					scope: this,
					contextHelpId: this.get("HelpId"),
					callback: function(url) {
						this.set("AcademyUrl", url);
						Ext.callback(callback, scope);
					}
				});
			},

			/**
			 * Initializes reference schema uId.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			_initReferenceSchemaUId: function(callback, scope) {
				var manager = this.getProcessRunnerManager();
				Terrasoft.chain(
					function(next) {
						manager.initialize(null, next, this);
					},
					function(next) {
						var processRunnerId = this.get("ProcessRunnerId");
						var managerItem = manager.findItem(processRunnerId);
						managerItem.getSysModuleEntityManagerItem(next, this);
					},
					function(next, entityModuleItem) {
						this.set("ReferenceSchemaUId", entityModuleItem.entitySchemaUId);
						callback.call(scope);
					},
					this
				);
			},

			/**
			 * Initializes process runner id.
			 * @private
			 */
			_initProcessRunnerId: function() {
				var lookup = Terrasoft.first(this.get("DefaultValues"));
				this.set("ProcessRunnerId", lookup.value);
			},

			/**
			 * Removes records that are not in current detail.
			 * @private
			 * @param records {Terrasoft.Collection} Records collection.
			 * @return {Terrasoft.Collection} Collection of records in current detail.
			 */
			_filterRecordsByProcessRunnerId: function(collection) {
				var processRunnerId = this.get("ProcessRunnerId");
				return collection.filterByFn(function(item) {
					var processSettingsManagerItem = this._toProcessSettingsManagerItem(item);
					var currentProcessRunnerId = processSettingsManagerItem.getProcessRunnerId();
					return currentProcessRunnerId === processRunnerId;
				}, this);
			},

			/**
			 * Selects data manager items collection into process settings manager items.
			 * @private
			 * @param {Terrasoft.Collection} collection Data manager items collection.
			 * @return {Terrasoft.Collection} Process settings manager items collection.
			 */
			_toProcessSettingsManagerItem: function(item) {
				var managerItemPath = Ext.String.format("Terrasoft.{0}", this.getManagerItemName());
				return Ext.create(managerItemPath, {
					dataManagerItem: item
				});
			},

			/**
			 * Returns manager config.
			 * @private
			 */
			_getManagerConfig: function() {
				var isActiveVersionColumnPath = "[VwProcessLib:VersionParentUId:SysSchemaUId].IsActiveVersion";
				var processActualVersionFilter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, isActiveVersionColumnPath, 1);
				return {
					filters: processActualVersionFilter
				};
			},

			/**
			 * Removes currently active record.
			 * @private
			 */
			_deleteRecord: function() {
				var activeRow = this.getActiveRow();
				var manager = this.getManager();
				manager.remove(activeRow.get("Id"));
				this.deselectRows();
				this.reloadGridData();
			},

			/**
			 * Changes active row record position by value.
			 * @private
			 * @param amount {Number} Position offset.
			 */
			_changeActiveRowPositionBy: function(amount) {
				var activeRow = this.getActiveRow();
				var positionColumnName = this.getPositionColumnName();
				var currentPosition = activeRow.get(positionColumnName);
				activeRow.set(positionColumnName, currentPosition + amount);
				this.reloadGridData();
			},

			/**
			 * Opens process properties in module popup.
			 * @private
			 * @param managerItemId {*|String} Record id that invoked popup.
			 */
			_openPropertiesPopup: function(managerItemId) {
				managerItemId = managerItemId || "";
				var viewModelConfig = this._getPropertiesPopupConfig();
				var modalBoxConfig = this._getPropertiesModalBoxConfig(viewModelConfig.IsParameterRequired);
				var modalBoxContainer = ModalBox.show(modalBoxConfig, this._onPropertiesPopupClosed, this);
				modalBoxContainer.on("keydown", this._onPopertiesPopupKeyDown, this);
				var initMaskId = Terrasoft.Mask.show({
					selector: Ext.String.format("#{0}", modalBoxContainer.id),
					timeout: 0
				});
				var baseConfig = {
					InvokerId: managerItemId,
					InitMaskId: initMaskId
				};
				Ext.apply(baseConfig, viewModelConfig);
				var popupModuleName = this.getPopupModuleName();
				this.sandbox.loadModule(popupModuleName, {
					renderTo: modalBoxContainer,
					instanceConfig: {
						parameters: {
							viewModelConfig: baseConfig
						}
					}
				});
			},

			/**
			 * Returns properties popup view model config.
			 * @private
			 * @return {Object}
			 */
			_getPropertiesPopupConfig: function() {
				return {
					IsParameterRequired: this.getIsParameterRequired(),
					ManagerName: this.getManagerName(),
					FilterConfig: {
						processRunnerId: this.get("ProcessRunnerId"),
						referenceSchemaUId: this.get("ReferenceSchemaUId")
					}
				};
			},

			/**
			 * On key down event handler for properties popup.
			 * @private
			 * @param {Object} event Key down event.
			 * @return {Boolean} Handle result.
			 */
			_onPopertiesPopupKeyDown: function(event) {
				if (event.keyCode === event.ESC) {
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
			},

			/**
			 * Returns process properties modal box config.
			 * @protected
			 * @virtual
			 * @param {Boolean} isParameterRequired Is parameter required in process properties.
			 * @return {Object} Modal box config.
			 */
			_getPropertiesModalBoxConfig: function(isParameterRequired) {
				return isParameterRequired
					? this._getBasePropertiesModalBoxConfig(450, 280)
					: this._getBasePropertiesModalBoxConfig(450, 335);
			},

			/**
			 * Returns base process properties modal box config.
			 * @private
			 * @param {Number} width Modal box width.
			 * @param {Number} height Modal box height.
			 * @return {Object} Modal box config.
			 */
			_getBasePropertiesModalBoxConfig: function(width, height) {
				return {
					widthPixels: width,
					heightPixels: height,
					boxClasses: ["process-setting-modal-box"]
				};
			},

			/**
			 * Sorts items by current position. Also redistributes positions in accordance with progression by 1.
			 * @private
			 * @param records {Terrasoft.Collection} Records collection.
			 * @return {Terrasoft.Collection} Sorted records collection.
			 */
			_sortRecordsByPosition: function(records) {
				var positionColumnName = this.getPositionColumnName();
				var positionIterator = 1;
				records.sortByFn(function(item1, item2) {
					return item1.get(positionColumnName) - item2.get(positionColumnName);
				}, this);
				records.each(function(item, index, length) {
					item.set(positionColumnName, positionIterator++);
					item.set("PositionTag", this._getRecordPositionTag(index, length));
				}, this);
				records = records.selectKeyValue(function(item) {
					return {
						key: item.get("Id"),
						value: item
					};
				}, this);
				return records;
			},

			/**
			 * Returns record position tag according to its index in collection.
			 * @private
			 * @param recordIndex {Number} Records index in collection.
			 * @param recordsCount {Number} Records collection size.
			 * @return {String} Record position tag.
			 */
			_getRecordPositionTag: function(recordIndex, recordsCount) {
				var positionTag = "regular";
				if (recordsCount === 1) {
					positionTag = "single";
				} else {
					positionTag = recordIndex === 0 ? "first" : positionTag;
					positionTag = recordIndex === recordsCount - 1 ? "last" : positionTag;
				}
				return positionTag;
			},

			/**
			 * On properties popup close handler.
			 * @private
			 */
			_onPropertiesPopupClosed: function(managerItemId) {
				var manager = this.getManager();
				if (managerItemId) {
					var processRunnerId = this.get("ProcessRunnerId");
					var managerItem = manager.findItem(managerItemId);
					managerItem.setProcessRunnerId(processRunnerId);
				}
				this.reloadGridData();
			},

			/**
			 * Opens process properties in module popup.
			 * @private
			 */
			_openRecordProperties: function() {
				var activeItem = this.getActiveRow();
				this._openPropertiesPopup(activeItem.get("Id"));
			},

			/**
			 * Moves active row record up in list by one position.
			 * @private
			 */
			_moveRecordUp: function() {
				this._changeActiveRowPositionBy(this._nextUpRecordPositionOffset);
			},

			/**
			 * Moves active row record down in list by one position.
			 * @private
			 */
			_moveRecordDown: function() {
				this._changeActiveRowPositionBy(this._nextDownRecordPositionOffset);
			},

			/**
			 * @inheritdoc GridUtilitiesV2#initSortActionItems
			 * @override
			 */
			initSortActionItems: Terrasoft.emptyFn,

			/**
			 * @inheritdoc GridUtilitiesV2#sortColumn
			 * @override
			 */
			sortColumn: Terrasoft.emptyFn,

			/**
			 * @inheritdoc GridUtilitiesV2#addColumnLink
			 * @override
			 */
			addColumnLink: Terrasoft.emptyFn,

			/**
			 * Returns manager name.
			 * @abstract
			 */
			getManagerName: Terrasoft.abstractFn,

			/**
			 * Returns manager item name.
			 * @abstract
			 */
			getManagerItemName: Terrasoft.abstractFn,

			/**
			 * Returns reference schema config.
			 * @abstract
			 */
			getProcessRunnerManager: Terrasoft.abstractFn,

			/**
			 * Returns is process running with parameters only.
			 * @abstract
			 */
			getIsParameterRequired: Terrasoft.abstractFn,

			/**
			 * @inheritdoc BaseGridDetailV2#init
			 * @override
			 */
			init: function(callback, scope) {
				this._initProcessRunnerId();
				this.callParent([function() {
					Terrasoft.chain(
						function(next) {
							var manager = this.getManager();
							var config = this._getManagerConfig();
							manager.initialize(config, next, this);
						},
						function(next) {
							this._initReferenceSchemaUId(next, this);
						},
						function(next) {
							this._initHelpUrl(next, this);
						},
						function() {
							this.loadGridData();
							callback.call(scope);
						},
						this
					);
				}, this]);
			},

			/**
			 * @inheritdoc DataManagerGridUtilities#filterRecordsCollection
			 * @override
			 */
			filterRecordsCollection: function(records) {
				records = this._filterRecordsByProcessRunnerId(records);
				return records;
			},

			/**
			 * @inheritdoc DataManagerGridUtilities#prepareRecordsCollection
			 * @override
			 */
			prepareRecordsCollection: function(records) {
				records = this._sortRecordsByPosition(records);
				this._applyRecordButtonsHandlers(records);
				return records;
			},

			/**
			 * @inheritdoc GridUtilitiesV2#addRecord
			 * @override
			 */
			addRecord: function() {
				this._openPropertiesPopup();
			},

			/**
			 * @inheritdoc GridUtilitiesV2#loadGridData
			 * @override
			 */
			loadGridData: function() {
				this.mixins.DataManagerGridUtilities.loadGridData.call(this);
			},

			/**
			 * @inheritdoc GridUtilitiesV2#loadMore
			 * @override
			 */
			loadMore: function() {
				this.mixins.DataManagerGridUtilities.loadMore.call(this);
			},

			/**
			 * @inheritdoc GridUtilitiesV2#getGridRowViewModelClassName
			 * @override
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.ProcessExecutingDetailGridRowViewModel";
			},

			/**
			 * @inheritdoc GridUtilitiesV2#onActiveRowAction
			 * @override
			 */
			onActiveRowAction: function(tag) {
				switch (tag) {
					case "openProcessInDesigner":
						this._openProcessInDesigner();
						break;
					case "moveRecordUp":
						this._moveRecordUp();
						break;
					case "moveRecordDown":
						this._moveRecordDown();
						break;
					case "deleteRecord":
						this._deleteRecord();
						return;
					case "openRecordProperties":
						this._openRecordProperties();
						break;
					default:
						break;
				}
			},

			/**
			 * Returns record position column.
			 * @protected
			 */
			getPositionColumnName: function() {
				return "Position";
			},

			/**
			 * Returns popup modal box module name.
			 * @protected
			 */
			getPopupModuleName: function() {
				return "ProcessSettingsModule";
			},

			/**
			 * Returns manager instance.
			 * @protected
			 * @return {Object} Object manager.
			 */
			getManager: function() {
				var managerName = this.getManagerName();
				return Terrasoft[managerName];
			},

			/**
			 * @inheritdoc BaseDetailV2#initDetailOptions
			 * @override
			 */
			initDetailOptions: function() {
				this.set("IsDetailCollapsed", false);
				this.set("RowCount", 20);
			},

			/**
			 * @inheritdoc BaseDetailV2#getToolsVisible
			 * @override
			 */
			getToolsVisible: function() {
				return false;
			},

			/**
			 * Returns if record move up button is visible.
			 * @param positionTag {String} Record`s position tag.
			 * @return {boolean} Visibility flag.
			 */
			getIsRecordUpButtonVisible: function(positionTag) {
				var tags = ["single", "first"];
				return !Terrasoft.contains(tags, positionTag);
			},

			/**
			 * Returns if record move down button is visible.
			 * @param positionTag {String} Record`s position tag.
			 * @return {boolean} Visibility flag.
			 */
			getIsRecordDownButtonVisible: function(positionTag) {
				var tags = ["single", "last"];
				return !Terrasoft.contains(tags, positionTag);
			},

			/**
			 * Returns empty message config for grid.
			 * @param {Object} config Empty message config.
			 */
			getEmptyMessageConfig: function(config) {
				var academyUrl = this.get("AcademyUrl");
				var newConfig = Terrasoft.EmptyGridMessageConfigBuilder.getDefaultWizardSectionConfig(academyUrl);
				Ext.apply(config, newConfig);
			}
		},
		diff: [
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"getEmptyMessageConfig": {"bindTo": "getEmptyMessageConfig"},
					"activeRowActions": [
						{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"caption": resources.localizableStrings.OpenProcessButtonCaption,
							"tag": "openProcessInDesigner"
						},
						{
							"className": "Terrasoft.Button",
							"caption": resources.localizableStrings.ProcessPropertiesButtonCaption,
							"tag": "openRecordProperties"
						},
						{
							"className": "Terrasoft.Button",
							"caption": resources.localizableStrings.DeleteProcessButtonCaption,
							"tag": "deleteRecord"
						},
						{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"hint": LocalizableHelper.localizableStrings.UpButtonHint,
							"imageConfig": LocalizableHelper.localizableImages.Up,
							"tag": "moveRecordUp",
							"visible": {
								"bindTo": "PositionTag",
								"bindConfig": {
									"converter": "getIsRecordUpButtonVisible"
								}
							}
						},
						{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"hint": LocalizableHelper.localizableStrings.DownButtonHint,
							"imageConfig": LocalizableHelper.localizableImages.Down,
							"tag": "moveRecordDown",
							"visible": {
								"bindTo": "PositionTag",
								"bindConfig": {
									"converter": "getIsRecordDownButtonVisible"
								}
							}
						}
					],
					"listedZebra": true,
					"activeRowAction": {bindTo: "onActiveRowAction"}
				}
			},
			{
				"operation": "merge",
				"name": "AddRecordButton",
				"values": {
					"visible": true
				}
			}
		]
	};
});


