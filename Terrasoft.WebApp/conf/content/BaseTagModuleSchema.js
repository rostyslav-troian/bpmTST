Terrasoft.configuration.Structures["BaseTagModuleSchema"] = {innerHierarchyStack: ["BaseTagModuleSchema"]};
define('BaseTagModuleSchemaStructure', ['BaseTagModuleSchemaResources'], function(resources) {return {schemaUId:'8f6bf564-5698-4904-b94a-6586f2b41e05',schemaCaption: "BaseTagModuleSchema", parentSchemaName: "", schemaName:'BaseTagModuleSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseTagModuleSchema", [
	"BaseTagModuleSchemaResources", "RightUtilities", "TagConstantsV2", "ModalBox",
	"MaskHelper", "TagModuleSchemaHelper", "css!TagModuleSchemaStyles", "QueryCancellationMixin"
], function(resources, RightUtilities, TagConstants, ModalBox, MaskHelper) {
	return {
		mixins: {
			QueryCancellationMixin: "Terrasoft.QueryCancellationMixin",
			TagModuleSchemaHelper: "Terrasoft.TagModuleSchemaHelper"
		},
		attributes: {
			
			/**
			 * Entity schema query cancelation query key.
			 * @protected
			 */
			"CancelationQueryKey": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "prepareTagListCancelationKey"
			},
			
			/**
			 * ######## ####### ##### #######
			 */
			"TagSchemaName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ######## ########## #### # #### ###### #####
			 */
			"EntityTagValue": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isLookup: true
			},
			/**
			 * ######### ####### ##### # ###### #######
			 */
			"InTagSchemaName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ###### ##### #######
			 */
			"TagList": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ###### ##### ###### #######
			 */
			"InTagList": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ##### ######### ############## ######
			 */
			"CanManageCorporateTags": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ##### ######### ########## ######
			 */
			"CanManagePublicTags": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * ######### #### ##### #####
			 */
			"IsTagInputVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		messages: {
			"TagChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Shows a mask on the tag content container.
			 * @private
			 */
			_showBodyMask: function() {
				this._maskId = MaskHelper.showBodyMask({
					selector: ".general-tag-content-container"
				});
			},

			/**
			 * Hides a mask on the tag content container.
			 * @private
			 */
			_hideBodyMask: function() {
				MaskHelper.hideBodyMask({ maskId: this._maskId});
			},
			
			/**
			 * @private
			 */
			_getTagListCallback: function (result, list, filter, columnName) {
				const viewModelCollection = result.collection;
				const objects = {};
				if (!viewModelCollection.isEmpty()) {
					viewModelCollection.each(function (item) {
						const type = item.get("Type");
						const itemId = item.get("value");
						const itemName = item.get("displayValue");
						const itemTypeId = type && type.value;
						const imageConfig = this.getImageConfigForExistsRecord(itemTypeId);
						if (!list.contains(itemId)) {
							objects[itemId] = {
								value: itemId,
								displayValue: itemName,
								imageConfig: imageConfig,
								TagTypeId: itemTypeId
							};
						}
					}, this);
				}
				var config = {
					collection: viewModelCollection,
					filterValue: filter,
					objects: objects,
					columnName: columnName,
					isLookupEdit: true
				};
				this.onLookupDataLoaded(config);
				list.loadAll(objects);
			},
			
			/**
			 * @private
			 */
			_applyTagListFilters: function (esq, filter) {
				const filterGroup = Terrasoft.createFilterGroup();
				const lookupComparisonType = this.getLookupComparisonType();
				const lookupFilter = esq.createPrimaryDisplayColumnFilterWithParameter(
					lookupComparisonType, filter, Terrasoft.DataValueType.TEXT);
				filterGroup.addItem(lookupFilter);
				const tagTypesFilterGroup = this.getTagTypesFilter();
				if (Terrasoft.CurrentUser.userType !== Terrasoft.UserType.SSP) {
					this.addPublicTagFilter(tagTypesFilterGroup);
				}
				filterGroup.addItem(tagTypesFilterGroup);
				esq.filters.add(filterGroup);
			},

			// endregion

			init: function(callback, scope) {
				this.initCollections();
				this.callParent([
					function() {
						Terrasoft.chain(
								this.initCanManageCorporateAndPublicTags,
								function() {
									Ext.callback(callback, scope || this);
								},
								this
						);
					}, this
				]);
			},

			/**
			 * ############## ######### ##### ########## ######.
			 * @protected
			 * @virtual
			 */
			onRender: function() {
				this.callParent(arguments);
				ModalBox.updateSizeByContent();
				this.set("IsTagInputVisible", true);
			},

			/**
			 * ######### ######### ##### ####### ### ######
			 * @protected
			 * @param {string} filter ######### # ######## #### ######## ### ######
			 * @param {Terrasoft.Collection} list ######### ########### # ######## #### ########
			 * @param {string} columnName ######## #######
			 */
			prepareTagList: function(filter, list, columnName) {
				if (Ext.isEmpty(list)) {
					return;
				}
				list.clear();
				var entityTagSchemaName = this.get("TagSchemaName");
				if (Ext.isEmpty(entityTagSchemaName)) {
					throw new Terrasoft.NullOrEmptyException({
						message: resources.localizableStrings.EntityTagSchemaIsEmptyMessage
					});
				} else {
					const esq = this.getEntityTagQuery(entityTagSchemaName);
					filter = filter.trim();
					this._applyTagListFilters(esq, filter);
					esq.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						this._getTagListCallback(result, list, filter, columnName);
					}, this);
					this.registerSentQuery(this.$CancelationQueryKey, esq);
				}
			},

			/**
			 * ######### ####### ### ######## ##### ###### # ########## ######.
			 * @private
			 * @param {string} value ####### ########
			 * @param {string} typeId ### ####
			 * @return {object} ###### ###### ######## ########### ######
			 */
			getNewListItemConfig: function(value, typeId) {
				var newValText = null;
				switch (typeId) {
					case TagConstants.TagType.Private:
						newValText = this.Ext.String.format(resources.localizableStrings.AddNewPrivateTagCaption, value);
						return {
							value: TagConstants.TagType.Private,
							displayValue: newValText,
							imageConfig: resources.localizableImages.CreateNewPrivateTagIcon,
							TagTypeId: typeId,
							customHtml: "<div id=\"menu-separator-header\" class=\"menu-separator-create-new-tag\"></div>" +
							"<div data-value=\"" +
							TagConstants.TagType.Private + "\" class=\"listview-new-item\" data-item-marker=\"" +
							newValText + "\">" + newValText + "</div>"
						};
					case TagConstants.TagType.Corporate:
						newValText = this.Ext.String.format(resources.localizableStrings.AddNewCorporateTagCaption, value);
						return {
							value: TagConstants.TagType.Corporate,
							displayValue: newValText,
							imageConfig: resources.localizableImages.CreateNewCorporateTagIcon,
							TagTypeId: typeId,
							customHtml: "<div data-value=\"" +
							TagConstants.TagType.Corporate + "\" class=\"listview-new-item\" data-item-marker=\"" +
							newValText + "\">" + newValText + "</div>"
						};
					case TagConstants.TagType.Public:
						newValText = this.Ext.String.format(resources.localizableStrings.AddNewPublicTagCaption, value);
						return {
							value: TagConstants.TagType.Public,
							displayValue: newValText,
							imageConfig: resources.localizableImages.CreateNewPublicTagIcon,
							TagTypeId: typeId,
							customHtml: "<div data-value=\"" +
							TagConstants.TagType.Public + "\" class=\"listview-new-item\" data-item-marker=\"" +
							newValText + "\">" + newValText + "</div>"
						};
					default:
						newValText = this.Ext.String.format(resources.localizableStrings.TipMessageTemplate, value);
						return {
							value: this.Terrasoft.GUID_EMPTY,
							displayValue: newValText,
							TagTypeId: typeId,
							customHtml: "<div data-value=\"" +
							this.Terrasoft.GUID_EMPTY + "\" class=\"listview-new-item\">" + newValText + "</div>"
						};
				}
			},

			/**
			 * ######### # ########## ###### ### lookup ####### "####### %#########_########%".
			 * @overridden
			 * @param {Object} config
			 * @param {Terrasoft.Collection} collection ######### ######## ### ######### ###########.
			 * @param {String} filterValue ###### ### primaryDisplayColumn.
			 * @param {Object} objects ####### ####### ##### ######## # list.
			 * @param {String} columnName ### ####### ViewModel.
			 * @param {Boolean} isLookupEdit lookup ### combobox.
			 */
			onLookupDataLoaded: function(config) {
				if (config.isLookupEdit && this.isNotEmpty(config.filterValue.trim())) {
					this.setValueToLookupInfoCache(config.columnName, "filterValue", config.filterValue);
					this.setValueToLookupInfoCache("TagType", "Private", TagConstants.TagType.Private);
					config.objects[TagConstants.TagType.Private] =
							this.getNewListItemConfig(config.filterValue, TagConstants.TagType.Private);
					if (this.get("CanManageCorporateTags")) {
						this.setValueToLookupInfoCache("TagType", "Corporate", TagConstants.TagType.Corporate);
						config.objects[TagConstants.TagType.Corporate] =
								this.getNewListItemConfig(config.filterValue, TagConstants.TagType.Corporate);
					}
					if (this.get("CanManagePublicTags")) {
						this.setValueToLookupInfoCache("TagType", "Public", TagConstants.TagType.Public);
						config.objects[TagConstants.TagType.Public] =
								this.getNewListItemConfig(config.filterValue, TagConstants.TagType.Public);
					}
				}
			},

			/**
			 * ######### ####### #### # ##.
			 * @protected
			 * @virtual
			 * @param {String} name ######## ####.
			 * @param {String} type ### ####.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ########.
			 */
			checkTagExists: function(name, type, callback, scope) {
				this._showBodyMask();
				const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.get("TagSchemaName")
				});
				select.addColumn("Name");
				select.addColumn("Type");
				const filterGroup = this.Terrasoft.createFilterGroup();
				filterGroup.add("NameFilter", this.Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Name", name));
				filterGroup.add("TypeFilter", this.Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Type", type));
				if (type === TagConstants.TagType.Private) {
					filterGroup.add("UserFilter", this.Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CreatedBy",
						Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
				}
				select.filters.add(filterGroup);
				select.getEntityCollection(function(result) {
					this._hideBodyMask();
					if (!result.success) {
						return;
					}
					if (result.collection.isEmpty()) {
						Ext.callback(callback, scope);
					} else {
						this.set("EntityTagValue", null);
						this.showInformationDialog(
							resources.localizableStrings.TagAlreadyExistsMessage);
					}
				}, this);
			},

			/**
			 * ######### ##### ### # ######.
			 * @protected
			 * @overridden
			 * @param {Object} args #########.
			 * @param {String} columnName ### ####.
			 */
			loadEntityTagVocabulary: function(args, columnName) {
				var selectedTag = this.get(columnName);
				if (this.isNotEmpty(selectedTag)) {
					this.addNewTagInEntity(selectedTag);
				} else if (args && this.isNotEmpty(args.searchValue.trim())) {
					this.tryFindOrCreateNewTag(args.searchValue, columnName);
				}
			},

			/**
			 * ######### ##### ### # ######.
			 * @abstract
			 * @param {object} selectedTag ######### ###
			 */
			addNewTagInEntity: Terrasoft.emptyFn,

			/**
			 * ######### ##### ##### ## ######### ### ####### ##### ###.
			 * @private
			 * @param {string} searchValue ######## ####
			 * @param {string} columnName ######## #######
			 */
			tryFindOrCreateNewTag: function(searchValue, columnName) {
				var entityTagList = this.get("TagList");
				var foundedItem = null;
				if (!this.Ext.isEmpty(entityTagList) && !this.Ext.isEmpty(searchValue)) {
					entityTagList.each(function(item) {
						if (item.displayValue && item.displayValue === searchValue &&
								item.displayValue !== item.value && foundedItem === null) {
							foundedItem = item;
							return false;
						}
					}, this);
					if (foundedItem !== null) {
						var isExisting = this.isExistSameTag(foundedItem.displayValue, foundedItem.TagTypeId);
						if (!isExisting.isExistsInEntityInTagList) {
							this.set("EntityTagValue", foundedItem);
						} else {
							this.set("EntityTagValue", null);
						}
					} else {
						this.tryCreateEntityOrOpenCard(searchValue.trim(), columnName,
								{TagTypeId: TagConstants.TagType.Private});
					}
				}
			},

			/**
			 * ######### ###### # ########## ######(### ######### ######## ### ##########)
			 * #### #### ##### ## ##########.
			 * @protected
			 * @overridden
			 * @param {String} searchValue ######### #####.
			 * @param {String} columnName ### ####.
			 * @param {Object} additionalColumns ############## #######
			 */
			tryCreateEntityOrOpenCard: function(searchValue, columnName, additionalColumns) {
				var refSchemaName = this.getLookupEntitySchemaName({}, columnName);
				var canAdd = this.tryGetValueFromLookupInfoCache(refSchemaName + "Schema", "canAdd");
				var currentEntitySchema = this.tryGetValueFromLookupInfoCache(refSchemaName + "Schema", "entitySchema");
				var entitySchema = currentEntitySchema.success ? currentEntitySchema.value : {};
				if (!canAdd.success) {
					var checkCanAddCallback = function() {
						this.tryCreateEntityOrOpenCard(searchValue, columnName, additionalColumns);
					};
					this.checkCanAddToLookupSchema(refSchemaName, checkCanAddCallback);
				} else if (canAdd.success) {
					var createEntityConfig = {
						entitySchema: entitySchema,
						columnName: columnName,
						displayColumnValue: searchValue,
						valuePairsFromFilters: new this.Terrasoft.Collection(),
						additionalColumns: additionalColumns
					};
					this.createEntitySilently(createEntityConfig);
				}
			},

			/**
			 * ########## ######## ##### ########### ####.
			 * @protected
			 * @overridden
			 * @return {String} ######## ##### ########### ####.
			 */
			getLookupEntitySchemaName: function() {
				return this.get("TagSchemaName");
			},

			/**
			 * ####### ###### # #######, ######## ####### ### ###########, ### ######## ########.
			 * @protected
			 * @overridden
			 * @param {Object} config ###### # ###########
			 * @param {String} config.entitySchema ###### ########### ####.
			 * @param {String} config.columnName ######## ####### # ####### ##### ########## ########### ########.
			 * @param {String} config.displayColumnValue ######## ####### ### ########### ##### ######.
			 * @param {String} config.valuePairsFromFilters ######## ## ######### ######## ####.
			 * @param {Object} config.additionalColumns ############## ####### ### ##########
			 */
			createEntitySilently: function(config) {
				this.checkTagExists(config.displayColumnValue, config.additionalColumns.TagTypeId, function() {
					this._showBodyMask();
					var primaryColumnValue = Terrasoft.generateGUID();
					config.primaryColumnValue = primaryColumnValue;
					var insert = this.getInsertQueryForLookupEntity(config);
					insert.setParameterValue("Type", config.additionalColumns.TagTypeId, Terrasoft.DataValueType.GUID);
					insert.execute(function(result) {
						this._hideBodyMask();
						if (result.success) {
							var resultCollection = new Terrasoft.Collection();
							var resObj = {
								value: primaryColumnValue,
								displayValue: config.displayColumnValue,
								TagTypeId: config.additionalColumns.TagTypeId,
								imageConfig: this.getImageConfigForExistsRecord(config.additionalColumns.TagTypeId)
							};
							resultCollection.add(resObj);
							this.onLookupResult({
								columnName: config.columnName,
								selectedRows: resultCollection
							});
						} else if (result.errorInfo) {
							this.set(config.columnName, null);
							this.showInformationDialog(result.errorInfo.message);
						}
					}, this);
				}, this);
			},

			/**
			 * ############# ######### # ########### ######## # ############### #### ######.
			 * @protected
			 * @param {Object} args #########.
			 */
			onLookupResult: function(args) {
				var columnName = args.columnName;
				var selectedRows = args.selectedRows;
				if (!selectedRows.isEmpty()) {
					this.set(columnName, selectedRows.getByIndex(0));
				}
			},

			/**
			 * ######### ############# #### # ###### ######## #####.
			 * @virtual
			 * @param {string} searchValue ### ####
			 * @param {string} typeTag ### ####
			 */
			isExistSameTag: function(searchValue, typeTag) {
				var result = {
					isExistsInEntityTagList: false,
					isExistsInEntityInTagList: false
				};
				if (!this.Ext.isEmpty(searchValue)) {
					var tagList = this.get("TagList");
					if (!this.Ext.isEmpty(tagList)) {
						tagList.each(function(item) {
							if (item.displayValue === searchValue && item.TagTypeId !== item.value &&
									item.TagTypeId === typeTag) {
								result.isExistsInEntityTagList = true;
								return false;
							}
						}, this);
					}
					var inTagList = this.get("InTagList");
					if (!this.Ext.isEmpty(inTagList)) {
						inTagList.each(function(item) {
							if (item.values.Caption === searchValue && item.values.TagTypeId === typeTag) {
								result.isExistsInEntityInTagList = true;
								return false;
							}
						}, this);
					}
				}
				return result;
			},

			/**
			 * ######### ############# #########.
			 * @private
			 */
			initCollections: function() {
				this.initCollection("InTagList");
				this.initCollection("TagList");
			},

			/**
			 * ############## ######### # ######### ######.
			 * @private
			 * @param {string} collectionName ### #########
			 */
			initCollection: function(collectionName) {
				var collection = this.Ext.create("Terrasoft.Collection");
				this.set(collectionName, collection);
			},

			/**
			 * ########## ################ ############ ######.
			 * @protected
			 * @param {Object} itemConfig ############ ########
			 * @param {Terrasoft.BaseViewModel} item ###### ####### #########
			 */
			getItemViewConfig: function(itemConfig, item) {
				var tagItemConfig = {
					Id: item.get("Id"),
					Caption: item.get("Caption"),
					TagTypeId: item.get("TagTypeId"),
					ImageConfig: resources.localizableImages.RemoveTagFromEntityIcon
				};
				itemConfig.config = this.getTagItemViewConfig(tagItemConfig);
			},

			/**
			 * ### ###### ######## "####### ..." # LookupEdit - ######## ####### ##### ###### ###
			 * ######### ######## ##############.
			 * @overriden
			 */
			onLookupChange: function(newValue, columnName) {
				this.callParent(arguments);
				var filterValue = this.tryGetValueFromLookupInfoCache(columnName, "filterValue");
				if (newValue && newValue.value && ((newValue.value === TagConstants.TagType.Private) ||
						(newValue.value === TagConstants.TagType.Corporate) ||
						(newValue.value === TagConstants.TagType.Public)) && !this.get(columnName) &&
						filterValue.success && !this.Ext.isEmpty(filterValue.value) && newValue.TagTypeId) {
					this.tryCreateEntityOrOpenCard(filterValue.value.trim(), columnName,
							{TagTypeId: newValue.TagTypeId});
					this.setValueToLookupInfoCache(columnName, "filterValue", null);
				} else if (!this.Ext.isEmpty(newValue)) {
					this.addNewTagInEntity(newValue);
				}
			},

			/**
			 * ########## ###### #######.
			 * @protected
			 */
			onCloseButtonClick: function() {
				ModalBox.close();
			},

			/**
			 * ######### ######## ####### #### ## ######## ########## ############## # ########## ######.
			 * @private
			 */
			initCanManageCorporateAndPublicTags: function(callback, scope) {
				var operations = ["CanManageCorporateTags", "CanManagePublicTags"];
				RightUtilities.checkCanExecuteOperations(operations, function(result) {
					Terrasoft.each(result, function(operationRight, operationName) {
						this.set(operationName, operationRight);
					}, this);
					Ext.callback(callback, scope || this);
				}, this);
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "EntityTagsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["general-tag-content-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TagsHeaderContainer",
				"parentName": "EntityTagsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": true,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TagsHeaderLabel",
				"parentName": "TagsHeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["tags-header-label"]
					},
					"caption": {"bindTo": "Resources.Strings.TagsHeaderLabelCaption"},
					"visible": true
				}
			},
			{
				"operation": "insert",
				"name": "CloseTagModuleButton",
				"parentName": "TagsHeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": {"bindTo": "onCloseButtonClick"},
					"classes": {"wrapperClass": ["close-tag-button"]},
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"visible": true,
					"markerValue": "close-icon"
				}
			},
			{
				"operation": "insert",
				"name": "TagSelectionContainer",
				"parentName": "EntityTagsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": true,
					"classes": {
						"wrapClassName": ["outer-tag-selection-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TagSelectionEditContainer",
				"parentName": "TagSelectionContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["tag-selection-control"]
					},
					"visible": true,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "EntityTagValue",
				"parentName": "TagSelectionEditContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "EntityTagValue",
					"contentType": Terrasoft.ContentType.LOOKUP,
					"labelConfig": {"visible": false},
					"hasClearIcon": false,
					"enableRightIcon": true,
					"rightIconConfig": resources.localizableImages.LookupRightIcon,
					"controlConfig": {
						"placeholder": {"bindTo": "Resources.Strings.PlaceholderText"},
						"classes": ["placeholderOpacity"],
						"list": {"bindTo": "TagList"},
						"prepareList": {"bindTo": "prepareTagList"},
						"loadVocabulary": {"bindTo": "loadEntityTagVocabulary"}
					},
					"minSearchCharsCount": 1,
					"focused": {
						"bindTo": "IsTagInputVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "CurrentEntityTagsContainer",
				"parentName": "EntityTagsContainer",
				"propertyName": "items",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "InTagList",
					"dataItemIdPrefix": "entity-in-tag-item",
					"observableRowNumber": 1,
					"maskVisible": false,
					"onGetItemConfig": "getItemViewConfig",
					"classes": {
						"wrapClassName": ["entity-tags-container-list"]
					},
					"isAsync": false
				}
			}
		]
	};
});


