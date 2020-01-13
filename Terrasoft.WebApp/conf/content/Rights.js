Terrasoft.configuration.Structures["Rights"] = {innerHierarchyStack: ["Rights"]};
define("Rights", ["ext-base", "RightsResources", "LookupUtilities", "RightUtilities",
		"MaskHelper", "ViewGeneratorV2", "BaseModule"],
		function(Ext, resources, LookupUtilities, RightUtilities, MaskHelper) {

	/**
	 * @class Terrasoft.configuration.RightsViewConfig
	 * ##### ############ ############ ############# ###### ####.
	 */
	Ext.define("Terrasoft.configuration.RightsViewConfig", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.RightsViewConfig",

		/**
		 * ########## ############ ############# ###### ### ###### ####.
		 * @protected
		 * @virtual
		 * @return {Object[]} ########## ############ ############# ###### ### ###### ####.
		 */
		getGridConfig: function(gridName) {
			var result = {
				"itemType": Terrasoft.ViewItemType.GRID,
				"name": gridName + "Grid",
				"type": "listed",
				"primaryColumnName": "Id",
				"markerValue": "RightsGrid",
				"primaryDisplayColumnName": "SysAdminUnit",
				"columnsConfig": [{
					"cols": 12,
					"key": [{
						"name": {"bindTo": "SysAdminUnitType"},
						"type": Terrasoft.GridKeyType.ICON16LISTED
					}, {
						"name": {"bindTo": "SysAdminUnit"}
					}]
				}, {
					"cols": 12,
					"key": [{
						"name": {
							"bindTo": "getRecordRightLevel"
						}
					}]
				}],
				"collection": {"bindTo": gridName + "GridData"},
				"activeRow": {"bindTo": gridName + "ActiveRow"},
				"isEmpty": {"bindTo": gridName + "GridEmpty"},
				"tag": gridName,
				"isEmptyCaption": resources.localizableStrings.GridEmptyCaption,
				"isLoading": {"bindTo": gridName + "GridLoading"},
				"selectRow": {"bindTo": "activeRowChanged"},
				"useListedLookupImages": true,
				"activeRowAction": {"bindTo": "onActiveRowAction"},
				"activeRowActions": [{
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"tag": "accessLevel-" + gridName,
					"visible": {
						"bindTo": "CurrentRecordRightLevel",
						"bindConfig": {"converter": "canChangeCurrentRightConverter"}
					},
					"caption": resources.localizableStrings.AccessLevelButtonCaption,
					"menu": {
						"items": [{
							"caption": resources.localizableStrings.AllowRightCaption,
							"tag": "change-" + gridName + "-allow"
						}, {
							"caption": resources.localizableStrings.AllowAndGrantRightCaption,
							"tag": "change-" + gridName + "-allowAndGrant"
						}, {
							"caption": resources.localizableStrings.DenyRightCaption,
							"tag": "change-" + gridName + "-deny",
							"visible": {"bindTo": "useDenyRights"}
						}]
					}
				}, {
					"className": "Terrasoft.Button",
					"visible": {
						"bindTo": "CurrentRecordRightLevel",
						"bindConfig": {"converter": "canChangeCurrentRightConverter"}
					},
					"tag": "delete-" + gridName,
					"caption": resources.localizableStrings.DeleteButtonCaption,
					"style": Terrasoft.controls.ButtonEnums.style.GREY
				}]
			};
			return result;
		},

		/**
		 * ########## ############ ############# ###### ####.
		 * @return {Object[]} ########## ############ ############# ###### ####.
		 */
		generate: function() {
			return {
				"name": "rights",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["rights-page", "schema-wrap"],
				"items": [{
					"name": "serviceContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["rights-service-cntnr"],
					"items": [{
						"name": "AddButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.AddButtonCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": {"wrapperClass": ["rights-service-btn", "rights-add-btn"]},
						"menu": [{
							"caption": {"bindTo": "Resources.Strings.AddReadRightCaption"},
							"click": {"bindTo": "addClick"},
							"enabled": {
								"bindTo": "CurrentRecordRightLevel",
								"bindConfig": {"converter": "isSchemaRecordCanChangeReadRightConverter"}
							},
							"tag": "read"
						}, {
							"caption": {"bindTo": "Resources.Strings.AddEditRightCaption"},
							"click": {"bindTo": "addClick"},
							"enabled": {
								"bindTo": "CurrentRecordRightLevel",
								"bindConfig": {"converter": "isSchemaRecordCanChangeEditRightConverter"}
							},
							"tag": "edit"
						}, {
							"caption": {"bindTo": "Resources.Strings.AddDeleteRightCaption"},
							"click": {"bindTo": "addClick"},
							"enabled": {
								"bindTo": "CurrentRecordRightLevel",
								"bindConfig": {"converter": "isSchemaRecordCanChangeDeleteRightConverter"}
							},
							"tag": "delete"
						}]
					}, {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"name": "SaveButton",
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"click": {"bindTo": "saveClick"},
						"enabled": {
							"bindTo": "CurrentRecordRightLevel",
							"bindConfig": {"converter": "isSchemaRecordCanChangeAnyRightConverter"}
						},
						"classes": {"textClass": ["rights-service-btn", "rights-save-btn"]}
					}, {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"name": "CancelButton",
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"click": {"bindTo": "cancelClick"},
						"classes": {"textClass": ["rights-service-btn", "rights-cancel-btn"]}
					}, {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"name": "DownButton",
						"caption": {"bindTo": "Resources.Strings.DownButtonCaption"},
						"click": {"bindTo": "downClick"},
						"enabled": {"bindTo": "canManagePosition"},
						"classes": {"textClass": ["rights-move-btn"]}
					}, {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"name": "UpButton",
						"caption": {"bindTo": "Resources.Strings.UpButtonCaption"},
						"click": {"bindTo": "upClick"},
						"enabled": {"bindTo": "canManagePosition"},
						"classes": {"textClass": ["rights-service-btn", "rights-move-btn"]}
					}]
				}, {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"name": "ReadGroup",
					"collapsed": false,
					"caption": {"bindTo": "Resources.Strings.ReadLabel"},
					"classes": {"wrapContainerClass": "rights-unit-cntnr"},
					"items": [this.getGridConfig("read")]
				}, {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"name": "EditGroup",
					"collapsed": false,
					"caption": {"bindTo": "Resources.Strings.EditLabel"},
					"classes": {"wrapContainerClass": "rights-unit-cntnr"},
					"items": [this.getGridConfig("edit")]
				}, {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"name": "DeleteGroup",
					"collapsed": false,
					"caption": {"bindTo": "Resources.Strings.DeleteLabel"},
					"classes": {"wrapContainerClass": "rights-unit-cntnr"},
					"items": [this.getGridConfig("delete")]
				}]
			};
		}
	});

	/**
	 * @class Terrasoft.configuration.EntityRecordRight
	 * ##### ############## ##### ###### # ####### #### #######.
	 */
	Ext.define("Terrasoft.configuration.EntityRecordRight", {
		alternateClassName: "Terrasoft.EntityRecordRight",
		extend: "Terrasoft.BaseViewModel",

		Ext: null,

		/**
		 * @type {String}
		 */
		id: null,

		/**
		 * ######## ##### ####### ### ###### #############.
		 * @type {String}
		 */
		entitySchemaName: "Terrasoft.RecordRightEntitySchema",

		/**
		 * @inheritDo# Terrasoft.model.BaseModel#columns
		 */
		columns: {
			SysAdminUnitType: {
				name: "SysAdminUnitType",
				columnPath: "SysAdminUnitType",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				referenceSchemaName: "SysAdminUnitType"
			},
			getRecordRightLevel: {
				name: "getRecordRightLevel",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}

		},

		mixins: {
			rightsUtilities: "Terrasoft.RightUtilitiesMixin"
		},

		/**
		 * ############## ##### ###### #############.
		 * @inheritDo# Terrasoft.model.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.entitySchema = this.entitySchema || this.Ext.create(this.entitySchemaName);
			Ext.apply(this.columns, this.entitySchema.columns);
		},

		/**
		 * #########, ##### ## ######## ##### ## ###### # ######## ####### ####### ##.
		 * @protected
		 * @virtual
		 * @param {Number} value ##### ####### ## ###### ### ############.
		 * @return {Boolean} ########## true, #### #### ##### ## ########### #### ### ####### ######,
		 * false # ######## ######.
		 */
		canChangeCurrentRightConverter: function(value) {
			var currentOperation = this.get("Operation");
			switch (currentOperation) {
				case Terrasoft.RightsEnums.operationTypes.read:
					return this.isSchemaRecordCanChangeReadRightConverter(value);
				case Terrasoft.RightsEnums.operationTypes.edit:
					return this.isSchemaRecordCanChangeEditRightConverter(value);
				case Terrasoft.RightsEnums.operationTypes["delete"]:
					return this.isSchemaRecordCanChangeDeleteRightConverter(value);
				default:
					return false;
			}
		},

		/**
		 * ####### ######## ### ######## ###### #######.
		 * @protected
		 * @virtual
		 * @return {String} ########## ######## ### ######## ###### #######.
		 */
		getRecordRightLevel: function() {
			var rightLevelValue = this.get("RightLevel");
			var rightLevels = Terrasoft.RightsEnums.rightLevels;
			var result = null;
			Terrasoft.each(rightLevels, function(rightLevel) {
				if (rightLevel.Value === rightLevelValue) {
					result = rightLevel;
					return false;
				}
			}, this);
			return result && result.Name;
		}
	});

	/**
	 * @class Terrasoft.configuration.RecordRightEntitySchema
	 * ##### ############## ##### ##### ####### #####.
	 */
	Ext.define("Terrasoft.configuration.RecordRightEntitySchema", {
		alternateClassName: "Terrasoft.RecordRightEntitySchema",
		extend: "Terrasoft.BaseEntitySchema",
		columns: {
			Id: {
				name: "Id",
				columnPath: "Id",
				dataValueType: Terrasoft.DataValueType.GUID,
				visible: false
			},
			SysAdminUnit: {
				name: "SysAdminUnit",
				columnPath: "SysAdminUnit",
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			RightLevel: {
				name: "RightLevel",
				columnPath: "RightLevel",
				dataValueType: Terrasoft.DataValueType.INTEGER
			},
			Operation: {
				name: "Operation",
				columnPath: "Operation",
				dataValueType: Terrasoft.DataValueType.INTEGER
			},
			Position: {
				name: "Position",
				columnPath: "Position",
				dataValueType: Terrasoft.DataValueType.INTEGER
			}
		}
	});

	/**
	 * @class Terrasoft.configuration.EntityRecordRightsViewModel
	 * ##### ############## ##### ###### ############# ###### ####.
	 */
	Ext.define("Terrasoft.configuration.EntityRecordRightsViewModel", {
		alternateClassName: "Terrasoft.EntityRecordRightsViewModel",
		extend: "Terrasoft.BaseViewModel",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		mixins: {
			rightsUtilities: "Terrasoft.RightUtilitiesMixin"
		},

		columns: {
			readActiveRow: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "readActiveRow",
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			editActiveRow: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "editActiveRow",
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			deleteActiveRow: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "deleteActiveRow",
				dataValueType: Terrasoft.DataValueType.LOOKUP
			},
			readGridData: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "readGridData",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isCollection: true
			},
			editGridData: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "editGridData",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isCollection: true
			},
			deleteGridData: {
				type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
				name: "deleteGridData",
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isCollection: true
			}
		},

		/**
		 * #########, ##### ## # ######## ####### ######## ##### ####### ## ######.
		 * @protected
		 * @virtual
		 * @param {Number} value ####### ##### #######.
		 * @return {Boolean} ########## true #### ##### ######## #### ###-##,
		 * false # ######## ######.
		 */
		isSchemaRecordCanChangeAnyRightConverter: function(value) {
			return this.isSchemaRecordCanChangeReadRightConverter(value) ||
				this.isSchemaRecordCanChangeEditRightConverter(value) ||
				this.isSchemaRecordCanChangeDeleteRightConverter(value);
		},

		/**
		 * ########## ####### ###### ###### #######. ######## ####### ####### ### ######.
		 * @protected
		 * @virtual
		 * @param {String} operation ######## ########.
		 * @param {String} newRight ######## ###### ###### #######.
		 * @param {String} activeRecordId ########## ############# ######.
		 */
		accessLevelClick: function(operation, newRight, activeRecordId) {
			var viewModelItems = this.get(operation + "GridData");
			var item = viewModelItems.get(activeRecordId);
			item.set("RightLevel", Terrasoft.RightsEnums.rightLevels[newRight].Value);
		},

		/**
		 * ########## ####### ## ###### ########## ##### ######.
		 * @protected
		 * @virtual
		 * @param {String} operation ######## ########.
		 */
		addClick: function(operation) {
			var lookUpConfig = {
				columns: ["SysAdminUnitTypeValue"],
				entitySchemaName: "SysAdminUnit",
				columnName: operation
			};
			LookupUtilities.Open(this.sandbox, lookUpConfig, this.onAddRecordSelected, this);
		},

		/**
		 * ########## ###### ##### ###### ## ###########.
		 * @protected
		 * @virtual
		 * @param {Object} args ######### ###### ###### ###########.
		 */
		onAddRecordSelected: function(args) {
			var operation = args.columnName;
			var selectedUnit = args.selectedRows.getByIndex(0);
			if (!selectedUnit) {
				return;
			}
			var item = {
				Id: Terrasoft.utils.generateGUID(),
				Operation: Terrasoft.RightsEnums.operationTypes[operation],
				Position: 0,
				RightLevel: Terrasoft.RightsEnums.rightLevels.allow.Value,
				SysAdminUnit: selectedUnit,
				SysAdminUnitType: Terrasoft.RightsEnums.sysAdminUnitType[selectedUnit.SysAdminUnitTypeValue]
			};
			var viewModelItems = this.get(operation + "GridData");
			viewModelItems.each(function(item) {
				var position = item.get("Position") + 1;
				item.set("Position", position);
			});
			var viewModelItem = this.createViewModelItem(item, true);
			viewModelItems.insert(0, viewModelItem.get("Id"), viewModelItem);
			this.refreshGridData(viewModelItems, operation);
		},

		/**
		 * ########## ####### ## ###### ##########.
		 * @protected
		 * @virtual
		 */
		saveClick: function() {
			var resultCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
			resultCollection.loadAll(this.get("deletedItems"));
			resultCollection.loadAll(this.get("readGridData"));
			resultCollection.loadAll(this.get("editGridData"));
			resultCollection.loadAll(this.get("deleteGridData"));
			var changedRights = [];
			resultCollection.each(function(item) {
				var changedValues = item.changedValues || (item.isNew && item.values) || {};
				if (!Ext.Object.isEmpty(changedValues) || item.isDeleted) {
					var saveConfig = Terrasoft.deepClone(changedValues);
					Ext.apply(saveConfig, {
						isNew: item.isNew,
						isDeleted: item.isDeleted,
						Id: item.get("Id"),
						SysAdminUnit: item.get("SysAdminUnit"),
						Operation: item.get("Operation")
					});
					if (item.isNew) {
						Ext.apply(saveConfig, {
							RightLevel: item.get("RightLevel"),
							Position: item.get("Position")
						});
					}
					changedRights.push(saveConfig);
				}
			}, this);
			if (changedRights.length) {
				RightUtilities.applyChanges({
					"recordRights": changedRights,
					"record": {
						entitySchemaName: this.get("entitySchemaName"),
						primaryColumnValue: this.get("primaryColumnValue")
					}
				}, this.onChangesApplied, this);
			} else {
				this.closePage();
			}
		},

		/**
		 * Save rights settings response handler.
		 * @param {Object|null} responseObject Server response.
		 * @param {Boolean} success Response status.
		 */
		onChangesApplied: function(responseObject, success) {
			if (success) {
				this.closePage();
			} else {
				Terrasoft.showInformation(this.get("Resources.Strings.SaveError"));
			}
		},

		/**
		 * ########## ####### ## ###### ######## ######.
		 * @protected
		 * @virtual
		 * @param {String} rightType ######## ########.
		 * @param {String} activeRecordId ########## ############# ######.
		 */
		deleteClick: function(rightType, activeRecordId) {
			var viewModelItems = this.get(rightType + "GridData");
			var item = viewModelItems.get(activeRecordId);
			viewModelItems.removeByKey(activeRecordId);
			this.set(rightType + "GridEmpty", viewModelItems.isEmpty());
			var startPosition = item.get("Position");
			var changedItems = viewModelItems.filterByFn(function(filteredItem) {
				return filteredItem.get("Position") > startPosition;
			}, this);
			changedItems.each(function(changedItem) {
				var newPosition = (changedItem.get("Position")) - 1;
				changedItem.set("Position", newPosition);
			}, this);
			if (!item.isNew) {
				var deletedItems = this.get("deletedItems");
				item.isDeleted = true;
				deletedItems.add(item.get("Id"), item);
			}
		},

		/**
		 * Cancel button handler.
		 * @protected
		 * @virtual
		 */
		cancelClick: function() {
			this.closePage();
		},

		/**
		 * Close module page.
		 * @private
		 */
		closePage: function() {
			this.sandbox.publish("BackHistoryState");
		},

		/**
		 * ####### ######### ###### # ########## ########, # ####### ## #########.
		 * @protected
		 * @virtual
		 * @return {Terrasoft.RightsEnums.operationTypes} ########## ########, # ####### ## ######### ######### #####.
		 */
		getActiveOperation: function() {
			var readActiveRow = this.get("readActiveRow");
			var editActiveRow = this.get("editActiveRow");
			var deleteActiveRow = this.get("deleteActiveRow");
			return (editActiveRow && Terrasoft.RightsEnums.operationTypes.edit) ||
				(deleteActiveRow && Terrasoft.RightsEnums.operationTypes["delete"]) ||
				(readActiveRow && Terrasoft.RightsEnums.operationTypes.read);
		},

		/**
		 * #######, ##### ## ######## ######### ######## # ######## ####### ## ######.
		 * @protected
		 * @virtual
		 * @param {Number} value ##### ## ######.
		 * @return {Boolean} ########## true #### ##### ###### ##### # ######### ########,
		 * false # ######### ######.
		 */
		canChangeCurrentRightConverter: function(value) {
			var currentOperation = this.getActiveOperation();
			switch (currentOperation) {
				case Terrasoft.RightsEnums.operationTypes.read:
					return this.isSchemaRecordCanChangeReadRightConverter(value);
				case Terrasoft.RightsEnums.operationTypes.edit:
					return this.isSchemaRecordCanChangeEditRightConverter(value);
				case Terrasoft.RightsEnums.operationTypes["delete"]:
					return this.isSchemaRecordCanChangeDeleteRightConverter(value);
				default:
					return false;
			}
		},

		/**
		 * #######, ##### ## ######## ####### ########## #####.
		 * @protected
		 * @virtual
		 * @return {Boolean} ########## true #### ##### ###### ####### ########## #####,
		 * false # ######### ######.
		 */
		canManagePosition: function() {
			var currentRecordRightLevel = this.get("CurrentRecordRightLevel");
			return this.canChangeCurrentRightConverter(currentRecordRightLevel) && this.get("useDenyRights");
		},

		/**
		 * ####### ########## ######### ## #######.
		 * @protected
		 * @virtual
		 */
		sortByPositionFn: function(o1, o2) {
			var property1 = o1.get("Position");
			var property2 = o2.get("Position");
			if (property1 === property2) {
				return 0;
			}
			return (property1 < property2) ? -1 : 1;
		},

		/**
		 * ########## ####### ## ###### "#####".
		 * @protected
		 * @virtual
		 */
		upClick: function() {
			var activeOperation = this.getActiveOperation();
			var operationName = Ext.Object.getKey(Terrasoft.RightsEnums.operationTypes, activeOperation);
			var activeRow = this.get(operationName + "ActiveRow");
			var viewModelItems = this.get(operationName + "GridData");
			var item = viewModelItems.get(activeRow);
			var currentItemPosition = item.get("Position");
			if (currentItemPosition === 0) {
				return;
			}
			currentItemPosition--;
			viewModelItems.each(function(item) {
				var position = item.get("Position");
				if (position === currentItemPosition) {
					item.set("Position", ++position);
					return false;
				}
			}, this);
			item.set("Position", currentItemPosition);
			viewModelItems.sortByFn(this.sortByPositionFn);
			this.refreshGridData(viewModelItems);
		},

		/**
		 * ########## ####### ## ###### "####".
		 * @protected
		 * @virtual
		 */
		downClick: function() {
			var activeOperation = this.getActiveOperation();
			var operationName = Ext.Object.getKey(Terrasoft.RightsEnums.operationTypes, activeOperation);
			var activeRow = this.get(operationName + "ActiveRow");
			var viewModelItems = this.get(operationName + "GridData");
			var item = viewModelItems.get(activeRow);
			var currentItemPosition = item.get("Position");
			if (currentItemPosition === (viewModelItems.getCount() - 1)) {
				return;
			}
			currentItemPosition++;
			viewModelItems.each(function(item) {
				var position = item.get("Position");
				if (position === currentItemPosition) {
					item.set("Position", --position);
					return false;
				}
			}, this);
			item.set("Position", currentItemPosition);
			viewModelItems.sortByFn(this.sortByPositionFn);
			this.refreshGridData(viewModelItems);
		},

		/**
		 * ########## ####### ###### # #######.
		 * @protected
		 * @virtual
		 * @param {String} tag ### ####### ######.
		 * @param {String} activeRecordId ############# ######### ######.
		 */
		onActiveRowAction: function(tag, activeRecordId) {
			if (!tag) {
				return;
			}
			var actionConfig = tag.split("-");
			var method = actionConfig[0];
			var rightType = actionConfig[1];
			switch (method) {
				case "change":
					var operation = actionConfig[2];
					this.accessLevelClick(rightType, operation, activeRecordId);
					break;
				case "delete":
					this.deleteClick(rightType, activeRecordId);
					break;
			}
		},

		/**
		 * ########## ############\############## ######.
		 * @protected
		 * @virtual
		 */
		onCollapsedChanged: Terrasoft.emptyFn,

		/**
		 * ########## ######### ########## ######.
		 * @protected
		 * @virtual
		 * @param {String} id ############# ##### ######### ######.
		 * @param {String} operation ######## ######## ######### ######.
		 */
		activeRowChanged: function(id, operation) {
			var rights = ["read", "edit", "delete"];
			Ext.Array.remove(rights, operation);
			rights.forEach(function(right) {
				this.set(right + "ActiveRow", null);
			}, this);
		},

		/**
		 * ####### ######### ####### ####.
		 * @protected
		 * @virtual
		 * @param {Object} item ###### ########.
		 * @param {Boolean} isNew #######, ######## ## ###### ##### ### ### #########.
		 * @return {Terrasoft.EntityRecordRight} ########## ######### ####### ####.
		 */
		createViewModelItem: function(item, isNew) {
			if (!item.IsNew && !Terrasoft.isGUID(item.Id)) {
				item.Id = item.Id.substring(item.Id.indexOf("{") + 1, item.Id.lastIndexOf("}"));
			}
			var rightLevel = this.get("CurrentRecordRightLevel");
			var useDenyRights = this.get("useDenyRights");
			Ext.apply(item, {
				CurrentRecordRightLevel: rightLevel,
				useDenyRights: useDenyRights
			});
			var viewModelItem = this.Ext.create("Terrasoft.EntityRecordRight", {
				Ext: this.Ext,
				id: item.Id,
				isNew: isNew,
				values: item
			});
			return viewModelItem;
		},

		/**
		 * Returns page caption.
		 * @protected
		 * @virtual
		 * @return {String}
		 */
		getPageCaption: function() {
			var value = this.get("primaryDisplayColumnValue") || this.get("entitySchema").caption;
			return this.get("Resources.Strings.RightsCaption") + value;
		},

		/**
		 * ########## ############# #######.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.Collection} gridData ######### ######### #######.
		 * @param {String} operation ######## ######## ######.
		 */
		refreshGridData: function(gridData, operation) {
			var tempCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
			tempCollection.loadAll(gridData);
			if (!gridData.isEmpty()) {
				gridData.clear();
			}
			if (operation) {
				this.set(operation + "GridEmpty", tempCollection.isEmpty());
			}
			gridData.loadAll(tempCollection);
		},

		/**
		 * ########## ######## ###### # ###### #############.
		 * @protected
		 * @virtual
		 * param {Function} callback ####### ######### ######.
		 * param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
		 */
		loadData: function(callback, scope) {
			var entitySchemaName = this.get("entitySchemaName");
			var primaryColumnValue = this.get("primaryColumnValue");
			RightUtilities.getRecordRights({
				"tableName": this.getRightsEntitySchemaName(),
				"recordId": primaryColumnValue
			}, function(recordRightsResponse) {
				RightUtilities.getUseDenyRecordRights({
					"schemaName": entitySchemaName
				}, function(useDenyRecord) {
					this.set("useDenyRights", useDenyRecord);
					RightUtilities.getSchemaRecordRightLevel(entitySchemaName, primaryColumnValue,
						function(rightLevel) {
						this.set("CurrentRecordRightLevel", rightLevel);
						var readRights = this.get("readGridData");
						var editRights = this.get("editGridData");
						var deleteRights = this.get("deleteGridData");
						Terrasoft.each(recordRightsResponse, function(recordRight) {
							var viewModelItem = this.createViewModelItem(recordRight, false);
							var primaryValue = viewModelItem.get("Id");
							switch (recordRight.Operation) {
								case Terrasoft.RightsEnums.operationTypes.read:
									readRights.add(primaryValue, viewModelItem);
									break;
								case Terrasoft.RightsEnums.operationTypes.edit:
									editRights.add(primaryValue, viewModelItem);
									break;
								case Terrasoft.RightsEnums.operationTypes["delete"]:
									deleteRights.add(primaryValue, viewModelItem);
									break;
							}
						}, this);
						this.set("readGridEmpty", readRights.isEmpty());
						this.set("editGridEmpty", editRights.isEmpty());
						this.set("deleteGridEmpty", deleteRights.isEmpty());
						callback.call(scope);
					}, this);
				}, this);
			}, this);
		},

		/**
		 * ########## ### ##### #### ### ####### #####.
		 * @protected
		 * @virtual
		 * @return {String} ########## ### ##### #### ### ####### #####.
		 */
		getRightsEntitySchemaName: function() {
			var entitySchemaName = this.get("entitySchemaName");
			return (entitySchemaName.indexOf("Sys") === 0) ?
				entitySchemaName + "Right" :
				"Sys" + entitySchemaName + "Right";
		},

		/**
		 * Initialiazes view model.
		 * @protected
		 * @virtual
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		init: function(callback, scope) {
			this.initResourcesValues(resources);
			this.set("readGridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			this.set("editGridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			this.set("deleteGridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			this.set("deletedItems", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			this.initEntitySchema(function() {
				this.loadData(function() {
					this.initPageCaption();
					callback.call(scope || this);
				}, this);
			}, this);
		},

		/**
		 * Initializes entity schema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		initEntitySchema: function(callback, scope) {
			Terrasoft.require([this.get("entitySchemaName")], function(entitySchema) {
				this.set("entitySchema", entitySchema);
				callback.call(scope);
			}, this);
		},

		/**
		 * ############## ###### ########## ######## ## ####### ########.
		 * @protected
		 * @virtual
		 * @param {Object} resourcesObj ###### ########.
		 */
		initResourcesValues: function(resourcesObj) {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * Initialize page caption.
		 * @protected
		 * @virtual
		 */
		initPageCaption: function() {
			this.sandbox.publish("InitDataViews", {
				hideMainHeader: true,
				markerValue: this.getPageCaption()
			});
			
			this.sandbox.publish("UpdatePageHeaderCaption", {
				pageHeaderCaption: this.getPageCaption()
			});
		},

		onRender: Terrasoft.emptyFn
	});

	/**
	 * @class Terrasoft.configuration.Rights
	 * ##### ############## ##### ###### ####.
	 */
	Ext.define("Terrasoft.configuration.Rights", {
		alternateClassName: "Terrasoft.Rights",
		extend: "Terrasoft.BaseModule",
		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * ####### ############# ######.
		 * @type {Boolean}
		 */
		isAsync: true,

		/**
		 * ###### ############# ######.
		 * @type {Terrasoft.Component}
		 */
		view: null,

		/**
		 * ##### ###### #############.
		 * @type {Terrasoft.BaseModel}
		 */
		viewModelClass: null,

		/**
		 * ###### ###### ############# ######.
		 * @type {Terrasoft.BaseModel}
		 */
		viewModel: null,

		/**
		 * ###### ############ ############# ######.
		 * @type {Object}
		 */
		viewConfig: null,

		/**
		 * ###### ############ ######.
		 * @type {Object}
		 */
		moduleConfig: null,

		/**
		 * ### ##### ########## #############.
		 * @type {String}
		 */
		viewGeneratorClass: "Terrasoft.ViewGenerator",

		/**
		 * ### ##### ########## ############ ############# ######.
		 * @type {String}
		 */
		viewConfigClassName: "Terrasoft.RightsViewConfig",

		/**
		 * ### ###### ###### ############# ### ######.
		 * @type {String}
		 */
		viewModelClassName: "Terrasoft.EntityRecordRightsViewModel",

		/**
		 * ####### ######### ###### Terrasoft.ViewGenerator.
		 * @return {Terrasoft.ViewGenerator} ########## ###### Terrasoft.ViewGenerator.
		 */
		createViewGenerator: function() {
			return this.Ext.create(this.viewGeneratorClass);
		},

		/**
		 * ####### ############ ############# ######.
		 * @protected
		 * @virtual
		 * param {Object} config ###### ############.
		 * param {Function} callback ####### ######### ######.
		 * param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
		 * @return {Object[]} ########## ############ ############# ######.
		 */
		buildView: function(config, callback, scope) {
			var viewGenerator = this.createViewGenerator();
			var viewClass = this.Ext.create(this.viewConfigClassName);
			var schema = {
				viewConfig: [viewClass.generate(config)]
			};
			var viewConfig = Ext.apply({
				schema: schema
			}, config);
			viewGenerator.generate(viewConfig, callback, scope);
		},

		/**
		 * ############## ###### ############ ############# ######.
		 * @protected
		 * @abstract
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		initViewConfig: function(callback, scope) {
			var generatorConfig = Terrasoft.deepClone(this.moduleConfig);
			generatorConfig.viewModelClass = this.viewModelClass;
			this.buildView(generatorConfig, function(view) {
				this.viewConfig = view[0];
				callback.call(scope);
			}, this);
		},

		/**
		 * ######## ######### ####### # ####### #########, #### ### ############# ###### ########## ## ########.
		 * @protected
		 * @virtual
		 */
		initHistoryState: function() {
			var state = this.sandbox.publish("GetHistoryState");
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId !== this.sandbox.id) {
				var newState = this.Terrasoft.deepClone(currentState);
				newState.moduleId = this.sandbox.id;
				this.sandbox.publish("PushHistoryState", {
					stateObj: newState,
					pageTitle: null,
					hash: currentHash.historyState,
					silent: true
				});
			}
		},

		/**
		 * ############## ##### ###### ############# ######.
		 * @protected
		 * @abstract
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		initViewModelClass: function(callback, scope) {
			this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
			callback.call(scope);
		},

		/**
		 * ############## ###### ############ ######.
		 * @protected
		 * @virtual
		 */
		initConfig: function() {
			var sandbox = this.sandbox;
			this.moduleConfig = sandbox.publish("GetRecordInfo", null, [sandbox.id]);
		},

		/**
		 * ####### ############# ### ########## ######.
		 * @protected
		 * @virtual
		 * @return {Terrasoft.Component} ########## ######### ############# ### ########## ######.
		 */
		createView: function() {
			var viewConfig = Terrasoft.deepClone(this.viewConfig);
			var containerClassName = viewConfig.className || "Terrasoft.Container";
			return this.Ext.create(containerClassName, viewConfig);
		},

		/**
		 * ####### ###### ############# ### ########## ######.
		 * @protected
		 * @virtual
		 * @return {Terrasoft.BaseModel} ########## ######### ###### ############# ### ########## ######.
		 */
		createViewModel: function() {
			return this.Ext.create(this.viewModelClass, this.getViewModelConfig());
		},

		/**
		 * ########## ######### ### ######## ###### ############# ######.
		 * @protected
		 * @virtual
		 * @return {Object} ########## ######### ### ######## ###### ############# ######.
		 */
		getViewModelConfig: function() {
			return {
				Ext: this.Ext,
				sandbox: this.sandbox,
				Terrasoft: this.Terrasoft,
				values: Ext.apply({}, this.moduleConfig)
			};
		},

		/**
		 * ############## ######### ######## ######.
		 * @protected
		 * @virtual
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		init: function(callback, scope) {
			callback = callback || Ext.emptyFn;
			if (this.viewModel) {
				callback.call(scope);
				return;
			}
			this.initHistoryState();
			this.initConfig();
			this.initViewModelClass(function() {
				if (this.destroyed) {
					return;
				}
				this.initViewConfig(function() {
					if (this.destroyed) {
						return;
					}
					var viewModel = this.viewModel = this.createViewModel();
					viewModel.init(function() {
						if (!this.destroyed) {
							callback.call(scope);
						}
					}, this);
				}, this);
			}, this);
		},

		/**
		 * ######### ######### ######.
		 * @protected
		 * @virtual
		 * @param {Object} renderTo ######### ###### ## Ext.Element # ####### ##### ########### ####### ##########.
		 */
		render: function(renderTo) {
			var viewModel = this.viewModel;
			var view = this.view;
			if (!view || view.destroyed) {
				view = this.view = this.createView();
				view.bind(viewModel);
				view.render(renderTo);
			} else {
				view.reRender(0, renderTo);
			}
			viewModel.renderTo = renderTo.id;
			viewModel.onRender();
			MaskHelper.HideBodyMask();
		},

		/**
		 * ####### ### ######## ## ####### # ########## ######.
		 * @overridden
		 * @param {Object} config ######### ########### ######.
		 */
		destroy: function(config) {
			if (config.keepAlive !== true) {
				this.callParent(arguments);
			}
		}

	});

	return Terrasoft.Rights;
});


