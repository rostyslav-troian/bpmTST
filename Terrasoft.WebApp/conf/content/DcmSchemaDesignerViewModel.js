Terrasoft.configuration.Structures["DcmSchemaDesignerViewModel"] = {innerHierarchyStack: ["DcmSchemaDesignerViewModel"]};
define("DcmSchemaDesignerViewModel", ["ext-base", "ProcessModuleUtilities", "DcmSchemaDesignerViewModelResources",
		"DcmSchemaManager", "DcmStageViewModel"],
	function(Ext, ProcessModuleUtilities, resources) {

		Ext.define("Terrasoft.DcmSchemaDesignerViewModel", {
			extend: "Terrasoft.BaseProcessSchemaDesignerViewModel",
			alternateClassName: "Terrasoft.Designers.DcmSchemaDesignerViewModel",

			mixins: {
				ReorderableContainerVMMixin: "Terrasoft.ReorderableContainerVMMixin"
			},

			//region Properties: Protected

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#contextHelpCode
			 * @override
			 */
			contextHelpCode: "DcmSchemaDesigner",

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageLocationHref
			 * @override
			 */
			storageLocationHref: "DcmSchemaLocationHref",

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#ProcessSchemaMetaData
			 * @override
			 */
			storageSchemaMetadata: "DcmSchemaMetaData",

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageSchemaResources
			 * @override
			 */
			storageSchemaResources: "DcmSchemaResources",

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#storageLoadedPropertiesItemName
			 * @override
			 */
			storageLoadedPropertiesItemName: "DcmSchemaLoadedPropertiesItemName",

			/**
			 * Local storage property name for stage column UId.
			 * @protected
			 * @type {String}
			 */
			storageLoadedPropertiesStageColumnUId: "DcmSchemaLoadedPropertiesStageColumnUId",

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#schemaManager
			 * @override
			 */
			schemaManager: Terrasoft.DcmSchemaManager,

			/*
			 * Selected item ID.
			 * @type {String}
			 */
			selectedItemId: null,

			//endregion

			//region Methods: Private

			/**
			 * Handles on designer empty space click, loads specified properties page.
			 * @private
			 * @param {Object} event Event object.
			 */
			onDesignerClick: function(event) {
				this.loadPropertiesPageByClick(event);
			},

			/**
			 * Loads empty properties page.
			 * @private
			 */
			loadEmptyPropertiesPage: function() {
				this.clearSelection();
				if (!this.get("IsShowPropertyPage")) {
					return;
				}
				this.set("LastSelectedItemUId", null);
				this.loadElementProperties({
					elementName: "_empty_",
					propertiesEditSchema: "EmptyPropertiesPage",
					isReadonly: true,
					renderTo: this.propertiesContainerId
				});
			},

			/**
			 * Loads specified properties page.
			 * @private
			 * @param {Object} event Event object.
			 */
			loadPropertiesPageByClick: function(event) {
				if (Terrasoft.utils.dom.hasClassName(event.target, "load-dcm-properties-page-on-click")) {
					this.loadSchemaPropertiesPage();
				}
			},

			/**
			 * Handles on designer empty space click, loads specified properties page.
			 * @private
			 * @param {Object} event Event object.
			 */
			onDesignerDblClick: function(event) {
				this.set("IsShowPropertyPage", true);
				this.loadPropertiesPageByClick(event);
			},

			/**
			 * Sets selected item.
			 * @private
			 * @param {String} uId Element identifier.
			 */
			setSelectedItem: function(uId) {
				var oldSelectedItemId = this.selectedItemId;
				var viewModel = this.findViewModel(oldSelectedItemId);
				if (viewModel) {
					viewModel.setSelected(false);
				}
				if (uId) {
					viewModel = this.findViewModel(uId);
					if (viewModel) {
						viewModel.setSelected(true);
					}
				}
				this.selectedItemId = uId;
				this.actualizeStagesColor();
			},

			/**
			 * Subscribes for ViewModelItems collection events.
			 * @private
			 */
			subscribeOnCollectionEvents: function() {
				var items = this.get("ViewModelItems");
				items.on("add", this.actualizeStages, this);
				items.on("remove", this.actualizeStages, this);
				items.on("move", this.actualizeStages, this);
				items.on("dataLoaded", this.actualizeStages, this);
			},

			/**
			 * Actualize stages color. Calls actualizeStagesColor for each stage.
			 * @private
			 */
			actualizeStagesColor: function() {
				var isExistSelectedStage = this.getIsExistSelectedStage();
				var items = this.get("ViewModelItems");
				items.each(function(stageViewModel) {
					stageViewModel.actualizeColor(isExistSelectedStage);
				}, this);
			},

			/**
			 * Returns flag that indicates the existence of the selected stage.
			 * @private
			 * @return {Boolean}
			 */
			getIsExistSelectedStage: function() {
				var selectedItemId = this.selectedItemId;
				var items = this.get("ViewModelItems");
				return !!selectedItemId && items.contains(selectedItemId);
			},

			/**
			 * Checks if elements can be removed, shows message if negotiate.
			 * @private
			 * @param {String[]} elements Array with elements names.
			 * @return {Boolean}
			 */
			checkCanRemoveElements: function(elements) {
				var schema = this.get("Schema");
				var config = schema.canRemoveElements(elements);
				var canRemove = config.canRemove;
				var message = config.validationInfo;
				if (!canRemove) {
					Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
						caption: Terrasoft.Resources.ProcessSchemaDesigner.Messages.InvalidRemoveElement,
						message: message
					});
				}
				return canRemove;
			},

			/**
			 * Sets 'isValidExecuted' property value to 'true' for all schema items. Shows not valid red indicator.
			 * @private
			 */
			setIsValidateExecutedOnSave: function() {
				var schema = this.get("Schema");
				schema.stages.each(function(stage) {
					stage.setPropertyValue("isValidateExecuted", true);
					stage.elements.each(function(element) {
						element.setPropertyValue("isValidateExecuted", true);
						element.processFlowElement.setPropertyValue("isValidateExecuted", true);
					}, this);
				});
			},

			/**
			 * Moves and actualizes stage.
			 * @private
			 * @param {Object} moveData Stage move data, see {@link #getMoveData}.
			 */
			moveStage: function(moveData) {
				this.move(moveData);
				var stageViewModel = moveData.item;
				var parentStageUId = moveData.parentStageUId;
				stageViewModel.setParentStageUId(parentStageUId);
			},

			/**
			 * Handles 'UP' key down, selects previous element in stage.
			 * @private
			 */
			onUpKeyDownSelectElement: function() {
				var element = this.findElementViewModel(this.selectedItemId);
				var collection = element.parentCollection;
				var index = collection.indexOf(element) - 1;
				var itemId;
				if (index >= 0) {
					element = collection.getByIndex(index);
					itemId = element.get("Id");
				} else {
					var schemaElement = element.getSchemaElement();
					itemId = schemaElement.containerUId;
				}
				this.onItemSelected(itemId);
			},

			/**
			 * Handles 'DOWN' key pressed, selects next element in stage.
			 * @private
			 */
			onDownKeySelectElement: function() {
				var item, itemId;
				var stage = this.findSelectedStageViewModel();
				if (stage) {
					var elements = stage.get("ViewModelItems");
					item = elements.first();
					itemId = item.get("Id");
					this.onItemSelected(itemId);
				} else {
					var element = this.findElementViewModel(this.selectedItemId);
					var collection = element.parentCollection;
					var index = collection.indexOf(element) + 1;
					item = collection.findByIndex(index);
					if (item) {
						itemId = item.get("Id");
						this.onItemSelected(itemId);
					}
				}
			},

			/**
			 * Returns DCM settings ID.
			 * @private
			 * @param {String}  schemaUId Schema UID.
			 * return {String|null}
			 */
			findDcmSettingsId: function(schemaUId) {
				var manager = Terrasoft.SysDcmSchemaInSettingsManager;
				var dcmSchemaInSettingsItem = manager.findItemBySysDcmSchemaUId(schemaUId);
				return dcmSchemaInSettingsItem && dcmSchemaInSettingsItem.getSysDcmSettings();
			},

			/**
			 * Returns DCM settings ID.
			 * @private
			 */
			onGetDcmSettingId: function() {
				return this.get("DcmSettingsId");
			},

			/**
			 * Init Dcm settings.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 */
			initDcmSettings: function(callback, scope) {
				var dcmSettingsId = this.get("DcmSettingsId");
				if (dcmSettingsId) {
					var select = this.getDcmSettingsEsq();
					select.getEntity(dcmSettingsId, function(result) {
						var entity = result.entity;
						if (entity) {
							this.set("StageColumnUId", entity.get("StageColumnUId"));
							this.set("EntitySchemaUId", entity.get("SysEntitySchemaUId"));
						}
						callback.call(scope);
					}, this);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * Returns EntitySchemaQuery for schema SysDcmSettings.
			 * @private
			 * @returns {Terrasoft.EntitySchemaQuery}
			 */
			getDcmSettingsEsq: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysDcmSettings"
				});
				esq.addColumn("StageColumnUId");
				esq.addColumn("SysModuleEntity.SysEntitySchemaUId", "SysEntitySchemaUId");
				return esq;
			},

			/**
			 * Validates schema filters.
			 * @private
			 * @param {Object} config Arguments config.
			 * @param {Boolean} config.isValid Validation flag.
			 * @param {Boolean} config.doSave Flag that indicates needs to save schema.
			 * @param {Function} callback The callback function.
			 * @param {Boolean} callback.isValid Validation flag.
			 * @param {Boolean} callback.doSave Flag that indicates needs to save schema.
			 * @param {Object} scope The scope for the callback.
			 */
			validateFilters: function(config, callback, scope) {
				var isValid = config.isValid;
				var doSave = config.doSave;
				var schema = this.get("Schema");
				if (!isValid) {
					callback.call(scope, isValid, doSave);
					return;
				}
				var validationConfig = {
					schemaUId: schema.uId,
					filters: schema.filters,
					stageColumnUId: schema.stageColumnUId,
					dcmSettingsId: this.get("DcmSettingsId"),
					copySourceSchemaId: this.get("CopySourceSchemaId"),
					saveMode: true
				};
				this.schemaManager.validateFilters(validationConfig, function(isValidFilters, message) {
					this.isValid = isValidFilters;
					if (isValidFilters) {
						callback.call(scope, isValidFilters, doSave);
					} else {
						schema.addValidationResult(schema.validationInfo, schema, [{
							validationType: Terrasoft.ValidationType.ERROR,
							message: message
						}]);
						this.showSchemaValidationMessageBox(message, function() {
							callback.call(scope, false, false);
						}, this);
					}
				}, this);
			},

			/**
			 * Returns confirmation message for remove element dialog.
			 * @private
			 * @param {String} elementUId DcmSchemaElement identifier.
			 * @param {Terrasoft.DcmSchemaElement[]} dependentElements Dependent DcmSchema elements.
			 * @return {String}
			 */
			getRemoveElementConfirmationMessage: function(elementUId, dependentElements) {
				var elementViewModel = this.findElementViewModel(elementUId);
				var dependentElementsCaptions = dependentElements.map(function(dependentElement) {
					var dependentElementViewModel = this.findElementViewModel(dependentElement.uId);
					return Terrasoft.getFormattedString("\"{0}\"", dependentElementViewModel.get("Caption"));
				}, this);
				var messageTemplate = resources.localizableStrings.RemoveDcmSchemaElementMessage;
				var elementCaption = elementViewModel.get("Caption");
				return Terrasoft.getFormattedString(messageTemplate,
					elementCaption, dependentElementsCaptions.join(", "));
			},

			/**
			 * Returns dependent elements for element with passed identifier.
			 * @private
			 * @param {String} elementUId Element identifier.
			 */
			findDependentElements: function(elementUId) {
				var schema = this.get("Schema");
				return schema.findDependentElements(elementUId);
			},

			/**
			 * Calls web service for refresh data in opened cases tab on section wizard.
			 * @private
			 */
			reloadCasesSectionWizard: function() {
				if (Terrasoft.ServerChannel.isOpened) {
					Terrasoft.ServerChannel.broadcastMessage({
						event: "ReloadSectionWizardCaseSettings",
						dcmSettingsId: this.get("DcmSettingsId")
					});
				}
			},

			/**
			 * Returns used stage records.
			 * @private
			 * @return {Array} used stage records.
			 */
			getSchemaLookupRecords: function() {
				var records = [];
				var dcmSchema = this.get("Schema");
				dcmSchema.stages.each(function(stage) {
					if (stage.stageRecordId) {
						records.push(stage.stageRecordId);
					}
				}, this);
				return records;
			},

			/**
			 * Removed unused dataManagerItems.
			 * @private
			 * @param {String} entitySchemaName entitySchema name.
			 */
			removeUnusedDataManagerItems: function(entitySchemaName) {
				var schemaStageRecords = this.getSchemaLookupRecords();
				var unusedRecords = [];
				var dataManagerItems = Terrasoft.DataManager.getEntitySchemaData(entitySchemaName);
				dataManagerItems.each(function(item) {
					var itemId = item.id;
					if (!Ext.Array.contains(schemaStageRecords, itemId)) {
						if (item.getIsNew()) {
							unusedRecords.push(itemId);
						} else {
							if (item.getIsChanged()) {
								item.discard();
							}
						}
					}
				}, this);
				unusedRecords.forEach(function(id) {
					dataManagerItems.removeByKey(id);
				});
			},

			/**
			 * Saves SysDcmSchemaInSettings manager items.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			saveSysDcmSchemaInSettings: function(callback, scope) {
				var schema = this.get("Schema");
				var manager = Terrasoft.SysDcmSchemaInSettingsManager;
				Terrasoft.chain(
					function(next) {
						var item = manager.findItemBySysDcmSchemaUId(schema.uId);
						if (!item) {
							var settingsId = this.get("DcmSettingsId");
							manager.createSysDcmSchemaInSettingsItem(schema.uId, settingsId, next, this);
						} else {
							next();
						}
					},
					function() {
						var packageUId = schema.getPackageUId();
						manager.saveAndUpdateSchemaData(packageUId, callback, scope);
					}, this
				);
			},

			/**
			 * Saves lookup data for stage column reference schema.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			saveStageLookupData: function(callback, scope) {
				var schema = this.get("Schema");
				Terrasoft.chain(
					function(next) {
						this.getDcmStageColumnReferenceSchema(schema, next, this);
					},
					function(next, stageEntitySchema) {
						this.removeUnusedDataManagerItems(stageEntitySchema.name);
						var config = {
							entitySchemaNames: [stageEntitySchema.name],
							packageUId: schema.getPackageUId(),
							updateAll: true,
							packageSchemaDataNameTemplate: "{0}_Dcm_Data"
						};
						Terrasoft.DataManager.saveAndUpdatePackageSchemaData(config, next, this);
					},
					function(next, response) {
						if (!response.success) {
							this.showResponseErrorMessage(response);
						}
						callback.call(scope);
					}, this
				);
			},

			/**
			 * Saves SysDcmSettings manager items changes.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			saveSysDcmSettings: function(callback, scope) {
				var schema = this.get("Schema");
				var packageUId = schema.getPackageUId();
				Terrasoft.SysDcmSettingsManager.saveAndUpdateSchemaData(packageUId, callback, scope);
			},

			/**
			 * Deactivates cases with empty filters.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			deactivateCasesWithEmptyFilters: function(callback, scope) {
				var schema = this.get("Schema");
				var dcmSettingsId = this.get("DcmSettingsId");
				var esq = Terrasoft.DcmSchemaManager.getEnabledDcmSchemasEsq(schema.uId);
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"[SysDcmSchemaInSettings:SysDcmSchemaUId:UId].SysDcmSettings.Id", dcmSettingsId));
				esq.filters.addItem(esq.createColumnIsNullFilter("Filters"));
				esq.getEntityCollection(function(response) {
					var enabledSchemas = response.collection;
					if (enabledSchemas.getCount()) {
						var schemaUIds = enabledSchemas.getItems().map(function(item) {
							return item.get("UId");
						}, this);
						Terrasoft.DcmSchemaManager.setEnabled({items: schemaUIds, enabled: false}, callback, scope);
					} else {
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * Deactivates cases if needed.
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			deactivateCasesIfNeeded: function(callback, scope) {
				var schema = this.get("Schema");
				if (schema.filters) {
					this.deactivateCasesWithEmptyFilters(callback, scope);
				} else {
					callback.call(scope);
				}
			},

			/**
			 * Update stage caption if caption changed in lookup.
			 * @private
			 * @param {Terrasoft.Designers.DcmSchemaStage} stage Dcm schema stage.
			 * @param {Terrasoft.Collection} dataManagerItems collection dataManagerItem for current reference entitySchema.
			 * @param {String} entitySchemaPrimaryDisplayColumnName primary display column name.
			 * for current reference entitySchema.
			 */
			actualizeStageCaption: function(stage, dataManagerItems, entitySchemaPrimaryDisplayColumnName) {
				var stageRecordId = stage.stageRecordId;
				var dataManagerItem = stageRecordId ? dataManagerItems.find(stageRecordId) : null;
				if (dataManagerItem) {
					var recordCaption = dataManagerItem.getColumnValue(entitySchemaPrimaryDisplayColumnName);
					var currentStageCaption = stage.caption.getValue();
					if (recordCaption !== currentStageCaption) {
						var stageCaption = stage.caption;
						stageCaption.setValue(recordCaption);
						stage.setPropertyValue("caption", stageCaption);
					}
				} else {
					stage.setPropertyValue("stageRecordId", null);
					stage.setPropertyValue("isValid", false);
				}
			},

			/**
			 * Update schema stages caption.
			 * @private
			 * @param {Terrasoft.Designers.DcmSchema} dcmSchema Dcm schema instance.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			actualizeDcmSchemaStagesCaption: function(dcmSchema, callback, scope) {
				this.getDcmStageColumnReferenceSchema(dcmSchema, function(entitySchema) {
					if (!entitySchema) {
						callback.call(scope, dcmSchema);
						return;
					}
					var entitySchemaName = entitySchema.name;
					var selectConfig = {
						entitySchemaName: entitySchemaName,
						addToStore: true
					};
					Terrasoft.DataManager.select(selectConfig, function() {
						var dataManagerItems = Terrasoft.DataManager.getEntitySchemaData(entitySchemaName);
						var stages = dcmSchema.stages;
						var entitySchemaPrimaryDisplayColumnName = entitySchema.primaryDisplayColumn.name;
						stages.each(function(stage) {
							this.actualizeStageCaption(stage, dataManagerItems, entitySchemaPrimaryDisplayColumnName);
						}, this);
						callback.call(scope, dcmSchema);
					}, this);
				}, this);
			},

			/**
			 * Navigates to the first invalid element, opens edit page.
			 * @private
			 */
			selectInvalidElementAfterSave: function() {
				var lastSelectedItemUId = this.get("LastSelectedItemUId");
				if (lastSelectedItemUId) {
					var lastSelectedItem = this.findItemByUId(lastSelectedItemUId);
					if (lastSelectedItem && !lastSelectedItem.isValid) {
						return;
					}
				}
				var schema = this.get("Schema");
				var results = schema.getValidationResults();
				var itemUId = results[0].uId;
				this.set("IsShowPropertyPage", true);
				this.onItemSelected(itemUId);
			},

			/**
			 * Returns flag indicating that stored in stage stage column ID is valid.
			 * @private
			 * @return {Boolean}
			 */
			getIsValidStorageStageColumnUId: function() {
				var storageStageColumnUId = this.localStore.getItem(this.storageLoadedPropertiesStageColumnUId);
				var dcmSettingsId = this.get("DcmSettingsId");
				var dcmSettingsItem = Terrasoft.SysDcmSettingsManager.getItem(dcmSettingsId);
				var stageColumnUId = dcmSettingsItem.getStageColumnUId();
				return storageStageColumnUId && storageStageColumnUId === stageColumnUId;
			},

			/**
			 * Saves stage column identifier for local storage.
			 * @private
			 */
			saveStageColumnUIdToStorage: function() {
				var schema = this.get("Schema");
				this.localStore.setItem(this.storageLoadedPropertiesStageColumnUId, schema.stageColumnUId);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.mixins.ReorderableContainerVMMixin.preInit.call(this);
				this.subscribeOnCollectionEvents();
				this.on("beforeItemMove", this.onBeforeStageMove, this);
			},

			/**
			 * Before item move event handler. If stage moves into group or alternate stage moves out of group,
			 * asks user confirmation.
			 * @param {Object} sender Event sender.
			 * @param {Object} moveData Stage move data, see {@link #getMoveData}.
			 * @return {Boolean} True to continue move, False to cancel.
			 */
			onBeforeStageMove: function(sender, moveData) {
				if (moveData.isMoveInGroup || moveData.isMoveStageGroup) {
					return true;
				}
				var messageTemplate;
				var dragStageCaption = moveData.item.get("Caption");
				var parentStageCaption = "";
				moveData.parentStageUId = null;
				if (moveData.targetStageIsAlternative === true) {
					var parentStage = moveData.targetStageViewModel.getParentStage();
					parentStageCaption = parentStage.getDisplayValue();
					messageTemplate = resources.localizableStrings.AddStageToGroupMessage;
					moveData.parentStageUId = parentStage.uId;
				} else {
					messageTemplate = resources.localizableStrings.RemoveStageFromGroupMessage;
				}
				var message = Terrasoft.getFormattedString(messageTemplate, dragStageCaption, parentStageCaption);
				var buttons = Terrasoft.MessageBoxButtons;
				this.showConfirmationDialog(message, function(returnCode) {
					if (returnCode === buttons.YES.returnCode) {
						this.moveStage(moveData);
					}
				}, [buttons.YES, buttons.NO], {defaultButton: 0});
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#getReorderableIndex.
			 * Calculate reorderable index include hidden stages.
			 * @override
			 */
			getReorderableIndex: function() {
				var reorderableIndex =
					this.mixins.ReorderableContainerVMMixin.getReorderableIndex.apply(this, arguments);
				var stages = this.get("ViewModelItems");
				for (var i = 0; i <= reorderableIndex; i++) {
					var stageViewModel = stages.getByIndex(i);
					var isStageVisible = stageViewModel.get("Visible");
					if (isStageVisible === false) {
						reorderableIndex++;
					}
				}
				return reorderableIndex;
			},

			/**
			 * Complements moveData by draggable stage data. Such as dragStageIsAlternative, dragStageParentStageUId,
			 * dragStageIsParent.
			 * @param {Object} moveData Move data.
			 */
			applyDragStageMoveData: function(moveData) {
				var dragStageViewModel = moveData.item;
				Ext.apply(moveData, {
					dragStageIsAlternative: dragStageViewModel.getIsAlternative(),
					dragStageParentStageUId: dragStageViewModel.getParentStageUId(),
					dragStageIsParent: dragStageViewModel.getIsParent()
				});
			},

			/**
			 * Complements moveData by target stage data. Such as targetStageViewModel, targetStageIsAlternative,
			 * targetStageParentStageUId, targetStageIsLastInGroup.
			 * @param {Object} moveData Move data.
			 */
			applyTargetStageMoveData: function(moveData) {
				var targetIndex = moveData.targetIndex;
				var targetStageViewModel = null;
				var targetStageIsAlternative = false;
				var targetStageParentStageUId = null;
				var targetStageIsLastInGroup = false;
				if (targetIndex > 0) {
					if (moveData.sourceIndex > targetIndex) {
						targetIndex--;
					}
					targetStageViewModel = moveData.targetCollection.getByIndex(targetIndex);
					targetStageIsAlternative = targetStageViewModel.getIsAlternative();
					targetStageParentStageUId = targetStageViewModel.getParentStageUId();
					targetStageIsLastInGroup = targetStageViewModel.getIsLastStageInGroup();
				}
				Ext.apply(moveData, {
					targetStageViewModel: targetStageViewModel,
					targetStageIsAlternative: targetStageIsAlternative,
					targetStageParentStageUId: targetStageParentStageUId,
					targetStageIsLastInGroup: targetStageIsLastInGroup
				});
			},

			/**
			 * Complements moveData by such properties as isMoveInGroup, isMoveStageGroup.
			 * @param {Object} moveData Move data.
			 */
			applyGroupMoveData: function(moveData) {
				var isMoveInGroup = (moveData.dragStageParentStageUId === moveData.targetStageParentStageUId);
				var dragStageIsParent = moveData.dragStageIsParent;
				var targetStageIsLastInGroup = moveData.targetStageIsLastInGroup;
				var targetStageIsAlternative = moveData.targetStageIsAlternative;
				if (!isMoveInGroup && dragStageIsParent && targetStageIsAlternative && !targetStageIsLastInGroup) {
					moveData.cancel = true;
					return moveData;
				}
				if (targetStageIsAlternative === true && !isMoveInGroup) {
					isMoveInGroup = targetStageIsLastInGroup ? true : isMoveInGroup;
				}
				var isMoveStageGroup = dragStageIsParent;
				Ext.apply(moveData, {
					isMoveInGroup: isMoveInGroup,
					isMoveStageGroup: isMoveStageGroup
				});
			},

			/**
			 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#getMoveData
			 * Complements moveData by draggable stage data, target stage data.
			 * @override
			 */
			getMoveData: function() {
				var moveData = this.mixins.ReorderableContainerVMMixin.getMoveData.apply(this, arguments);
				if (moveData.cancel !== true) {
					this.applyDragStageMoveData(moveData);
					this.applyTargetStageMoveData(moveData);
					this.applyGroupMoveData(moveData);
				}
				var items = this.get("ViewModelItems");
				items.each(function(stageViewModel) {
					stageViewModel.set("Visible", true);
				}, this);
				return moveData;
			},

			/**
			 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#getDragOverData
			 * Disable drop in group of stages if dragged other group.
			 * @override
			 */
			getDragOverData: function(dragItemId, dragOverItemId) {
				var dragOverData = this.mixins.ReorderableContainerVMMixin.getDragOverData.apply(this, arguments);
				if (dragOverItemId) {
					var stages = this.get("ViewModelItems");
					var dragStageViewModel = stages.get(dragItemId);
					var targetStageViewModel = stages.get(dragOverItemId);
					var isMoveStageGroup = dragStageViewModel.getIsParent();
					var isTargetStageAlternative = targetStageViewModel.getIsAlternative();
					var isTargetStageParentOfGroup = targetStageViewModel.getIsParent();
					if (isMoveStageGroup && isTargetStageAlternative && !isTargetStageParentOfGroup) {
						dragOverData.isValid = false;
					}
				}
				return dragOverData;
			},

			/**
			 * @inheritdoc Terrasoft.model.BaseViewModel#getColumns
			 * @override
			 */
			getModelColumns: function() {
				var baseColumns = this.callParent(arguments);
				return Ext.apply(baseColumns, {
					SchemaCaption: {
						caption: resources.localizableStrings.DcmCaptionColumnCaption
					},
					DefaultItemClassName: {
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
						value: "Terrasoft.DcmStageViewModel"
					},
					DefaultStageCaption: {
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
						value: resources.localizableStrings.DefaultStageCaption
					},
					EntitySchemaUId: {
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.core.enums.DataValueType.GUID
					},
					StageColumnUId: {
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.core.enums.DataValueType.GUID
					},
					DcmSettingsId: {
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.core.enums.DataValueType.GUID
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onHidePropertyPage
			 * @override
			 */
			onHidePropertyPage: function() {
				this.saveElementProperties();
				this.set("LoadedPropertiesItemName", null);
				this.setVisiblePropertyPage(false);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#schemaManager
			 * @override
			 */
			getProcessModuleUtilities: function(callback, scope) {
				callback.call(scope, ProcessModuleUtilities);
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#loadItems
			 * @override
			 */
			loadItems: function(schema) {
				this.callParent(arguments);
				var collection = Ext.create("Terrasoft.Collection");
				schema.stages.each(function(stage) {
					var stageViewModel = this.createDcmStageViewModel(stage);
					collection.add(stage.uId, stageViewModel);
					stage.on("changed", this.onItemChanged, this);
				}, this);
				var items = this.get("ViewModelItems");
				items.loadAll(collection);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onItemChanged
			 * Rebuilds ViewModelItems in accordance with the stages of the schema.
			 * @override
			 */
			onItemChanged: function(changeData) {
				this.callParent(arguments);
				if (changeData.eventName !== "moveStage") {
					return;
				}
				var items = this.get("ViewModelItems");
				items.move(changeData.fromIndex, changeData.toIndex);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#clearSchemaItems
			 * @override
			 */
			clearSchemaItems: function() {
				var items = this.get("ViewModelItems");
				items.clear();
			},

			/**
			 * Creates and returns Dcm schema stage view model.
			 * @protected
			 * @param {Terrasoft.Designers.DcmSchemaStage} dcmStage Dcm schema stage.
			 * @return {Terrasoft.Designers.DcmStageViewModel} Dcm schema stage view model.
			 */
			createDcmStageViewModel: function(dcmStage) {
				var items = this.get("ViewModelItems");
				var schema = this.get("Schema");
				var stageViewModel = items.createItem({
					Id: dcmStage.uId,
					Schema: schema
				});
				stageViewModel.parentViewModel = this;
				return stageViewModel;
			},

			/**
			 * Creates and returns dcm schema stage. Also adds stage to schema.
			 * @protected
			 * @param {Object} config Stage config.
			 * @param {Number} index Stage position index.
			 * @return {Terrasoft.Designers.DcmSchemaStage}
			 */
			createDcmSchemaStage: function(config, index) {
				var stage = Ext.create("Terrasoft.DcmSchemaStage", config);
				var schema = this.get("Schema");
				schema.addStage(stage, index);
				return stage;
			},

			/**
			 * Handles item selected.
			 * @protected
			 * @param {String} uId Element identifier.
			 */
			onItemSelected: function(uId) {
				this.hideMessagePanel();
				this.setSelectedItem(uId);
				this.loadPropertiesPage(uId);
			},

			/**
			 * @inheritdoc Terrasoft.ReorderableContainerVMMixin#onDragDrop
			 * @override
			 */
			onDragDrop: function(dropItemId) {
				this.mixins.ReorderableContainerVMMixin.onDragDrop.call(this, dropItemId);
				this.onItemSelected(dropItemId);
			},

			/**
			 * Handles element double click.
			 * @protected
			 * @param {String} uId Element identifier.
			 */
			onElementDblClick: function(uId) {
				this.set("IsShowPropertyPage", true);
				this.loadPropertiesPage(uId);
			},

			/**
			 * Handles element remove button click.
			 * @protected
			 * @param {String} uId Element identifier.
			 */
			onElementRemoveButtonClick: function(uId) {
				var schema = this.get("Schema");
				var element = schema.flowElements.get(uId);
				var elements = [element.name];
				if (!this.checkCanRemoveElements(elements)) {
					return;
				}
				var dependentElements = this.findDependentElements(uId);
				if (dependentElements.length !== 0) {
					var removeElementMessage = this.getRemoveElementConfirmationMessage(uId, dependentElements);
					var messageBoxButtons = Terrasoft.MessageBoxButtons;
					this.showConfirmationDialog(removeElementMessage, function(returnCode) {
						if (returnCode === messageBoxButtons.YES.returnCode) {
							this.removeDcmSchemaElement(uId);
						}
					}, [messageBoxButtons.YES, messageBoxButtons.NO], {defaultButton: 0});
				} else {
					this.removeDcmSchemaElement(uId);
				}
			},

			/**
			 * Removes DcmSchemaElement.
			 * @protected
			 * @param {String} uId Element identifier.
			 */
			removeDcmSchemaElement: function(uId) {
				var dependentElements = this.findDependentElements(uId);
				dependentElements.forEach(function(dependentElement) {
					dependentElement.setDefaultTransition();
				}, this);
				var schema = this.get("Schema");
				var elementViewModel = this.findElementViewModel(uId);
				var parentCollection = elementViewModel.parentCollection;
				var removedElementIndex = parentCollection.indexOf(elementViewModel);
				parentCollection.remove(elementViewModel);
				schema.remove(uId);
				var nextSelectedElement = parentCollection.findByIndex(removedElementIndex) || parentCollection.last();
				if (nextSelectedElement) {
					var nextSelectedElementUId = nextSelectedElement.get("Id");
					this.onItemSelected(nextSelectedElementUId);
				} else {
					this.loadEmptyPropertiesPage();
				}
			},

			/**
			 * Removes stage.
			 * @protected
			 * @param {String} uId Stage identifier.
			 */
			removeStage: function(uId) {
				var schema = this.get("Schema");
				var stage = schema.stages.get(uId);
				var elements = stage.elements.getItems().map(function(element) {
					return element.name;
				});
				if (!this.checkCanRemoveElements(elements)) {
					return;
				}
				var items = this.get("ViewModelItems");
				items.removeByKey(uId);
				schema.clearAlternativeStages(uId);
				stage.elements.each(function(element) {
					schema.remove(element.uId);
				});
				schema.remove(uId);
				this.clearSelection();
				this.actualizeStages();
				this.loadEmptyPropertiesPage();
			},

			/**
			 * Handles stage double click.
			 * @protected
			 * @param {String} uId Element identifier.
			 */
			onStageDblClick: function(uId) {
				this.onElementDblClick(uId);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#save
			 * @override
			 */
			save: function() {
				this.setIsValidateExecutedOnSave();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#tryEditSchema
			 * @override
			 */
			tryEditSchema: function(schemaUId) {
				var dcmSettingsId = this.findDcmSettingsId(schemaUId);
				if (dcmSettingsId) {
					this.set("DcmSettingsId", dcmSettingsId);
					this.callParent(arguments);
				} else {
					var errorMessage = resources.localizableStrings.DcmSettingsIdNotFoundMessage;
					this.showErrorMessage(errorMessage);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaDesignerStorageMixin#initSchema
			 * @override
			 */
			initSchema: function(schema, callback, scope) {
				this.mixins.BaseSchemaDesignerStorageMixin.initSchema.call(this, schema, function() {
					schema.initEntitySchema(callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaDesignerStorageMixin#getIsLoadStoragePanelVisible
			 * @override
			 */
			getIsLoadStoragePanelVisible: function() {
				var mixin = this.mixins.BaseSchemaDesignerStorageMixin;
				var isLoadStoragePanelVisible = mixin.getIsLoadStoragePanelVisible.call(this);
				isLoadStoragePanelVisible = isLoadStoragePanelVisible && this.getIsValidStorageStageColumnUId();
				return isLoadStoragePanelVisible;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaDesignerStorageMixin#saveSchemaToStorage
			 * @override
			 */
			saveSchemaToStorage: function() {
				this.mixins.BaseSchemaDesignerStorageMixin.saveSchemaToStorage.call(this);
				if (!this.get("IsSchemaChanged")) {
					return;
				}
				this.saveStageColumnUIdToStorage();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaDesignerStorageMixin#clearSchemaStorageInfo
			 * @override
			 */
			clearSchemaStorageInfo: function() {
				this.callParent(arguments);
				var store = this.localStore;
				store.removeItem(this.storageLoadedPropertiesStageColumnUId);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
			 * @override
			 */
			onSchemaLoaded: function(schema) {
				var entitySchemaUId = this.get("EntitySchemaUId");
				if (entitySchemaUId) {
					schema.entitySchemaUId = entitySchemaUId;
				}
				var stageColumnUId = this.get("StageColumnUId");
				if (stageColumnUId) {
					schema.stageColumnUId = stageColumnUId;
				}
				var parentMethod = this.getParentMethod(this, arguments);
				this.initSchema(schema, parentMethod, this);
			},

			/**
			 * @protected
			 */
			getSaveSchemaVersionMessageBoxTitle: function() {
				return resources.localizableStrings.SavingCase;
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#init.
			 * @override
			 */
			init: function() {
				var parentMethod = this.getParentMethod(this);
				this.initDcmSettings(function() {
					parentMethod();
					var doc = Ext.getDoc();
					doc.on("click", this.onDesignerClick, this);
					doc.on("dblclick", this.onDesignerDblClick, this);
				}, this);
			},

			/**
			 * Actualize stages add button style. Calls actualizeAddButtonStyle for each stage
			 * and pass isLastStage flag.
			 */
			actualizeStages: function() {
				var items = this.get("ViewModelItems");
				items.each(function(stageViewModel, index, length) {
					var isLastStage = index === (length - 1);
					stageViewModel.actualizeStage(isLastStage);
				}, this);
			},

			/**
			 * Creates dcm schema stage view model. Also create dcm schema stage and adds it to dcm schema.
			 * Created view model adds to collection.
			 * @param {Object} [config] Stage config.
			 * @param {Number} [index] Insert index.
			 */
			createStage: function(config, index) {
				var items = this.get("ViewModelItems");
				var propertyIndex = items.generateItemPropertyValueIndex("Name", "Stage");
				var stageId = Terrasoft.generateGUID();
				var defaultStageCaption = this.get("DefaultStageCaption");
				var defaultStageConfig = {
					uId: stageId,
					name: "Stage" + propertyIndex,
					caption: defaultStageCaption + " " + propertyIndex,
					isValid: false,
					isValidateExecuted: false
				};
				var stageConfig = Ext.apply({}, config);
				Ext.applyIf(stageConfig, defaultStageConfig);
				var stage = this.createDcmSchemaStage(stageConfig, index);
				var stageViewModel = this.createDcmStageViewModel(stage);
				items.add(stageId, stageViewModel, index);
				this.onItemSelected(stageId);
			},

			/**
			 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#move
			 * @override
			 */
			move: function(moveData) {
				var insertIndex = moveData.targetIndex;
				var schema = this.get("Schema");
				if (moveData.isMoveStageGroup) {
					schema.moveStageGroup(moveData.itemId, insertIndex);
				} else {
					schema.moveStage(moveData.itemId, insertIndex);
				}
				return insertIndex;
			},

			/**
			 * @inheritdoc Terrasoft.mixins.ReorderableContainerVMMixin#getViewModelItems
			 * Returns ViewModelItems filtered by the "Visible" property.
			 * @override
			 */
			getViewModelItems: function() {
				var viewModelItems = this.mixins.ReorderableContainerVMMixin.getViewModelItems.apply(this, arguments);
				return viewModelItems.filterByFn(function(stageViewModel) {
					return stageViewModel.get("Visible");
				});
			},

			/**
			 * Hides alternative stages for parent stage.
			 * @param {Terrasoft.Designers.DcmStageViewModel} parentStageViewModel Parent stage view model.
			 */
			hideChildGroupItems: function(parentStageViewModel) {
				if (parentStageViewModel.getIsParent() !== true) {
					return;
				}
				var parentStageUId = parentStageViewModel.getParentStageUId();
				var items = this.get("ViewModelItems");
				items.each(function(stageViewModel) {
					if (stageViewModel.getIsChildStage(parentStageUId)) {
						stageViewModel.set("Visible", false);
					}
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#findItemByUId
			 * @override
			 */
			findItemByUId: function(uId) {
				var schema = this.get("Schema");
				return schema.findItemByUId(uId) || schema.stages.find(uId) || schema;
			},

			/**
			 * Finds view model by uId.
			 * @param {String} uId Item ID.
			 * @return {null|Terrasoft.Designers.DcmStageElementViewModel|Terrasoft.Designers.DcmStageViewModel}
			 */
			findViewModel: function(uId) {
				var stagesViewModel = this.get("ViewModelItems");
				var stageViewModel = stagesViewModel.find(uId);
				if (!stageViewModel) {
					stageViewModel = this.findElementViewModel(uId);
				}
				return stageViewModel;
			},

			/**
			 * Finds element view model by uId.
			 * @param {String} uId Element ID.
			 * @return {null|Terrasoft.Designers.DcmStageElementViewModel}
			 */
			findElementViewModel: function(uId) {
				var schema = this.get("Schema");
				var element = schema.findItemByUId(uId);
				if (!element) {
					return null;
				}
				var stageUId = element.containerUId;
				var stagesViewModel = this.get("ViewModelItems");
				var stageViewModel = stagesViewModel.get(stageUId);
				var elementsViewModel = stageViewModel.get("ViewModelItems");
				return elementsViewModel.find(uId);
			},

			/**
			 * Finds selected stage view model.
			 * @return {undefined|Terrasoft.Designers.DcmStageViewModel}
			 */
			findSelectedStageViewModel: function() {
				var stages = this.get("ViewModelItems");
				return stages.filterByFn(function(stage) {
					return stage.get("Selected") === true;
				}, this).first();
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#selectItem
			 * @override
			 */
			selectItem: function(key) {
				this.setSelectedItem(key);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#clearSelection
			 * @override
			 */
			clearSelection: function() {
				this.setSelectedItem(null);
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onAfterSchemaSaved
			 * @override
			 */
			onAfterSchemaSaved: function(publishInfo, isValid, callback, scope) {
				Terrasoft.chain(
					this.saveSysDcmSchemaInSettings,
					this.saveSysDcmSettings,
					this.deactivateCasesIfNeeded,
					this.saveStageLookupData,
					function() {
						this.reloadCasesSectionWizard();
						callback.call(scope, publishInfo, isValid);
					}, this
				);
			},

			/**
			 * @inheritdoc Terrasoft.core.mixins.BaseProcessSchemaDesignerValidationMixin#showSchemaValidationMessageBox
			 * @override
			 * Prevent to save not valid schema.
			 */
			showSchemaValidationMessageBox: function(validationMessage, callback, scope) {
				var schema = this.get("Schema");
				var template = Terrasoft.Resources.ProcessSchemaDesigner.Messages.SchemaValidationMessageCaption;
				var typeCaption = schema.typeCaption.toLowerCase();
				var caption = Ext.String.format(template, typeCaption);
				Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
					caption: caption,
					message: validationMessage,
					buttons: [
						Terrasoft.MessageBoxButtons.OK
					],
					handler: function() {
						this.selectInvalidElementAfterSave();
						var doSave = false;
						callback.call(scope, doSave);
					},
					scope: this
				});
			},

			/**
			 * Update stage caption if caption changed in lookup.
			 * @protected
			 * @param {Terrasoft.Designers.DcmSchema} dcmSchema Dcm schema .
			 * @param {Function} callback Execute callback function.
			 * @param {Object} scope Execution context.
			 */
			getDcmStageColumnReferenceSchema: function(dcmSchema, callback, scope) {
				var entitySchemaUId = dcmSchema.entitySchemaUId;
				if (!entitySchemaUId) {
					callback.call(scope, null);
					return;
				}
				var config = {
					schemaUId: entitySchemaUId,
					packageUId: dcmSchema.getPackageUId()
				};
				Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(schema) {
					var column = schema.columns.find(dcmSchema.stageColumnUId);
					config.schemaUId = column.referenceSchemaUId;
					Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(entitySchema) {
						callback.call(scope, entitySchema);
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onAfterGetSchemaInstance
			 * @override
			 */
			onAfterGetSchemaInstance: function(dcmSchema, callback, scope) {
				this.actualizeDcmSchemaStagesCaption(dcmSchema, callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onKeyDown
			 * @override
			 */
			onKeyDown: function(event) {
				this.callParent([event]);
				var defaultResponse = true;
				var isBodyElement = Terrasoft.utils.dom.getIsBodyElement(event.target);
				var selectedItemId = this.selectedItemId;
				if (isBodyElement && selectedItemId) {
					var selectedStage = this.findSelectedStageViewModel();
					if (event.keyCode === event.DELETE && !selectedStage) {
						defaultResponse = false;
						this.onElementRemoveButtonClick(selectedItemId);
					}
					if (event.keyCode === event.UP && !selectedStage) {
						defaultResponse = false;
						this.onUpKeyDownSelectElement();
					}
					if (event.keyCode === event.DOWN) {
						defaultResponse = false;
						this.onDownKeySelectElement();
					}
				}
				if (!defaultResponse) {
					event.preventDefault();
				}
				return defaultResponse;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				const doc = Ext.getDoc();
				doc.un("click", this.onDesignerClick, this);
				doc.un("dblclick", this.onDesignerDblClick, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#loadSchemaPropertiesPage
			 * @override
			 */
			loadSchemaPropertiesPage: function() {
				this.clearSelection();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSandboxInitialized
			 * @override
			 */
			onSandboxInitialized: function() {
				this.callParent();
				var sandbox = this.sandbox;
				sandbox.registerMessages({
					"GetDcmSettingId": {
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
						mode: Terrasoft.MessageMode.PTP
					}
				});
				sandbox.subscribe("GetDcmSettingId", this.onGetDcmSettingId, this);
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#validateViewModel
			 * @override
			 */
			validateViewModel: function(callback, scope) {
				this.callParent([function(isValid, doSave) {
					this.validateFilters({
						isValid: isValid,
						doSave: doSave
					}, callback, scope);
				}, this]);
			}

			//endregion

		});
		return Terrasoft.Designers.DcmSchemaDesignerViewModel;
	}
);


