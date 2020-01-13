Terrasoft.configuration.Structures["DynamicBlockPropertiesPage"] = {innerHierarchyStack: ["DynamicBlockPropertiesPage"]};
define('DynamicBlockPropertiesPageStructure', ['DynamicBlockPropertiesPageResources'], function(resources) {return {schemaUId:'5e736bd0-ebbb-48ab-b819-2529fabe2cf7',schemaCaption: "DynamicBlockPropertiesPage", parentSchemaName: "", schemaName:'DynamicBlockPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page to manage segments of selected dynamic block.
 */
define("DynamicBlockPropertiesPage", ["DynamicBlockPropertiesPageResources", "ModalBox",
		"SegmentContainerListItemViewModel", "AttributeContainerListItemViewModel", "ObservableContainerList",
		"DynamicContentAttributeLookupModule"],
		function(resources, ModalBox) {
	return {
		messages: {
			/**
			 * @message ActiveDynamicContentItemChanged
			 * Receives config of actual dynamic content item.
			 */
			"ActiveDynamicContentItemChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetDynamicContentItemConfig
			 * Gets actual dynamic content item config.
			 */
			"GetDynamicBlockConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message DynamicBlockAdd
			 * Publishes message to add new segment for selected dynamic block.
			 */
			"DynamicBlockAdd": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message GetAvailableDcAttributes
			 * Receives attributeId and returns list of available DCAttributes.
			 */
			"GetAvailableDcAttributes": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message DynamicBlockUpdatePriority
			 * Acts on segment priority changes.
			 */
			"DynamicBlockUpdatePriority": {
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message DynamicBlocksUpdate
			 * Publishes message to apply changes of segments.
			 */
			"DynamicBlocksUpdate": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message DynamicBlockDelete
			 * Acts on segment remove action.
			 */
			"DynamicBlockDelete": {
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message SelectRuleCancel
			 * Reacts on create dynamic block action cancellation.
			 */
			"SelectRuleCancel": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message DCAttributeSelected
			 * Reacts on segment attribute selected action.
			 */
			"DCAttributeSelected": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},

			/**
			 * @message ActiveBlockChanged
			 * Publishes message with new selected segment.
			 */
			"ActiveBlockChanged": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		properties: {
			/**
			 * Page sandbox unique identifier.
			 * @type {String}
			 */
			sandboxId: "DynamicBlockPropertiesPage",

			/**
			 * Max available replicas count limit.
			 * @type {Number}
			 */
			maxReplicasCount: 30,

			/**
			 * Parameter to calculate predictive replicas count for new group.
			 * @type {Number}
			 */
			minBlockCountForNewGroup: 2,
			
			/**
			 * Maximum value of the dynamic block priority.
			 * @type {Number}
			 */
			maxBlockPriority: 999
		},
		attributes: {
			/**
			 * Segments' viewmodel items collection.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			"SegmentsCollection": {
				"dataValueType": Terrasoft.core.enums.DataValueType.COLLECTION,
				"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Attributes collection of the sheet.
			 * @type {Array}
			 */
			"DCAttributesCollection": {
				"dataValueType": Terrasoft.core.enums.DataValueType.COLLECTION,
				"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Selected group on sheet.
			 * @type {Terrasoft.DynamicContentBlockGroupViewModel}
			 */
			"SelectedGroup": {
				"dataValueType": Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT,
				"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			// #region Methods: Private

			/**
			 * Subscribes on sandbox messages.
			 * @private
			 */
			_subscribeOnMessages: function() {
				var attributeLookupModuleId = this._getAttributeLookupModuleId();
				this.sandbox.subscribe("GetAvailableDcAttributes", this.getAvailableAttributes, this);
				this.sandbox.subscribe("ActiveDynamicContentItemChanged", this.onDynamicContentItemChanged,
					this, [this.sandboxId]);
				this.sandbox.subscribe("SelectRuleCancel", this.closeModalBox,
					this, [attributeLookupModuleId]);
				this.sandbox.subscribe("DCAttributeSelected", this.onDCAttributeSelected,
					this, [attributeLookupModuleId]);
				this.sandbox.subscribe("DynamicBlockUpdatePriority", this.onSegmentPriorityChange,
					this, ["SegmentContainerListItemViewModel"]);
			},

			/**
			 * Returns attribute lookup module sandbox id.
			 * @private
			 */
			_getAttributeLookupModuleId: function() {
				return this.sandbox.id + "_" + this.sandboxId + "_DynamicContentAttributeLookupModule";
			},

			/**
			 * Initializes collection of segments' view models.
			 * @private
			 */
			_initSegmentCollection: function() {
				this.$SegmentsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				var emptyCollection = Ext.create("Terrasoft.Collection");
				var collection = this.$SelectedGroup ? this.$SelectedGroup.$Items : emptyCollection;
				this._setSegmentsCollection(collection);
			},

			/**
			 * Inits DCAttributesCollection with items collection.
			 * @private
			 * @param {Terrasoft.Collection} items Attributes' models.
			 */
			_setDcAttributeCollection: function(items) {
				var collection = Ext.create("Terrasoft.Collection");
				Terrasoft.each(items, function(el) {
					collection.add(el.Index, el);
				});
				this.$DCAttributesCollection = collection;
			},

			/**
			 * Returns config for new dynamic block.
			 * @private
			 * @param {Number} attrIndex Index of created dynamic block attribute.
			 * @param {Boolean} isDefault Is new dynamic block default.
			 * @returns {Object} Config of new dynamic block.
			 */
			_prepareNewSegmentConfig: function(attrIndex, isDefault) {
				var attributes = isDefault ? [] : [attrIndex];
				var priority = isDefault ? this.maxBlockPriority : 1;
				var caption = isDefault
					? resources.localizableStrings.DefaultSegmentCaption
					: this._getAttributeCaption(attributes);
				return {
						IsDefault: isDefault,
						Attributes: attributes,
						Caption: caption,
						Priority: priority
					};
			},

			/**
			 * Returns segment caption as binded attributes caption.
			 * @private
			 * @param {Terrasoft.DynamicContentBlockViewModel} segment Current segment.
			 * @returns {String} Segment name.
			 */
			_getSegmentCaption: function(segment) {
				if (segment.$IsDefault) {
					return resources.localizableStrings.DefaultSegmentCaption;
				}
				return this._getAttributeCaption(segment.$Attributes);
			},

			/**
			 * Returns attributes joined caption.
			 * @private
			 * @param {Array} indexes Collection of atrtributes' indexes.
			 * @returns {String} Segment name.
			 */
			_getAttributeCaption: function(indexes) {
				var captions = [];
				Terrasoft.each(indexes, function(index) {
					var attrViewModel = this.$DCAttributesCollection.get(index);
					if (attrViewModel) {
						captions.push(attrViewModel.Caption);
					}
				}, this);
				var caption = captions.join(" + ");
				return caption ? caption : resources.localizableStrings.AttributeNotSelectedCaption;
			},

			/**
			 * Flag for add default content button visibility.
			 * @private
			 * @returns {Boolean} Button visibility.
			 */
			_isAddDefaultSegmentButtonVisible: function() {
				if (this.$SelectedGroup && !this.$SelectedGroup.$Items.isEmpty()) {
					var defaultItem = this.$SelectedGroup.$Items.findByFn(function(el) {
						return el.$IsDefault;
					});
					return !defaultItem;
				}
				return false;
			},

			/**
			 * Creates segment item view model for container list based on group's block view model.
			 * @private
			 * @param {Terrasoft.DynamicContentBlockViewModel} item Source block view model.
			 * @returns {Terrasoft.SegmentContainerListItemViewModel} Segment view model.
			 */
			_segmentToListItemViewModel: function(item) {
				var caption = this._getSegmentCaption(item);
				var viewModelItem = this.Ext.create("Terrasoft.SegmentContainerListItemViewModel", {
					values: {
						Id: item.$Id,
						Selected: item.$IsActive !== false,
						Caption: caption,
						Priority: item.$Priority,
						Attribute: {
							value: item.$Attributes[0],
							displayValue: caption
						},
						IsTop: false,
						IsLast: false
					}
				});
				viewModelItem.setSource(item);
				viewModelItem.initSandbox(this.sandbox);
				return viewModelItem;
			},

			/**
			 * Reload current segments collection with new sorted by priority items.
			 * @private
			 * @param {Terrasoft.Collection} items Group's blocks.
			 */
			_setSegmentsCollection: function(items) {
				var viewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(items, function(item) {
					var viewModelItem = this._segmentToListItemViewModel(item);
					viewModelCollection.add(item.$Id, viewModelItem);
				}, this);
				this.sortSegmentsByPriority(viewModelCollection);
				this.$SegmentsCollection.clear();
				this.$SegmentsCollection.loadAll(viewModelCollection);
			},

			/**
			 * Returns next segment by priority.
			 * @private
			 * @param {Terrasoft.SegmentContainerListItemViewModel} segment Segment to start from.
			 * @param {Boolean} isPriorityUp True when segment with bigger priority required.
			 * @return {Terrasoft.SegmentContainerListItemViewModel} Next segment by priority.
			 */
			_getNextByPriority: function(segment, isPriorityUp) {
				var items = this.$SegmentsCollection.filterByFn(function(el) {
					return !el.source.$IsDefault;
				});
				items.sort("$Priority");
				var index = items.indexOf(segment);
				if (isPriorityUp) {
					index = index - 1;
				} else {
					index = index + 1;
				}
				var target = items.getByIndex(index);
				return this.$SegmentsCollection.get(target.$Id);
			},

			/**
			 * Returns list of objects with required properties.
			 * @private
			 * @param {Array[Terrasoft.SegmentContainerListItemViewModel]} items List of segments.
			 * @param {Array[String]} properties List of required properties.
			 * @return {Array[Object]} List of objects with properties.
			 */
			_getItemsProperties: function(items, properties) {
				var result = [];
				Terrasoft.each(items, function(item) {
					var block = {
						id: item.$Id,
						data: {}
					};
					Terrasoft.each(properties, function(propName) {
						block.data[propName] = item.get(propName);
					});
					result.push(block);
				});
				return result;
			},

			// #endregion

			// #region Methods: Protected

			/**
			 * Returns validation result based on boolean validation result.
			 * @protected
			 * @param {Boolean} isValid Validaion bool result.
			 * @param {String} message Error message.
			 * @returns {Object} Validation result.
			 */
			getValidationResult: function(isValid, message) {
				return {
					isValid: isValid,
					message: message
				};
			},

			/**
			 * Validates attributes collection content to be not empty.
			 * @protected
			 * @returns {Boolean} Validation result.
			 */
			validateIsEmptyAttributesCollection: function() {
				return !this.$DCAttributesCollection.isEmpty();
			},

			/**
			 * Validates attributes collection to contain item that are not in use in current group.
			 * @protected
			 * @returns {Boolean} Validation result.
			 */
			validateAvailableAttributes: function() {
				var attributesInUse = [];
				var inUse = true;
				if (this.$SelectedGroup) {
					Terrasoft.each(this.$SelectedGroup.$Items, function(block) {
						attributesInUse = Ext.Array.merge(attributesInUse, block.$Attributes);
					}, this);
				}
				Terrasoft.each(this.$DCAttributesCollection, function(attr) {
					inUse = Ext.Array.contains(attributesInUse, attr.Index);
					return inUse;
				}, this);
				return !inUse;
			},

			/**
			 * Shifts segment priority.
			 * @protected
			 * @param {String} id Segment identifier.
			 * @param {Boolean} isPriorityUp True when segment priority shifts up.
			 * @return {Array[Terrasoft.SegmentContainerListItemViewModel]} Changed segments.
			 */
			shiftSegmentPriority: function(id, isPriorityUp) {
				var source = this.$SegmentsCollection.get(id);
				var target = this._getNextByPriority(source, isPriorityUp);
				var sourcePriority = source.$Priority;
				source.$Priority = target.$Priority;
				target.$Priority = sourcePriority;
				return [source, target];
			},

			//#endregion

			//#region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				var config = this.sandbox.publish("GetDynamicBlockConfig", null, [this.sandboxId]);
				var isGroup = config.item && config.item.$ItemType === "blockgroup";
				this.$SelectedGroup = isGroup ? config.item : null;
				this._setDcAttributeCollection(config.dcAttributes);
				this._initSegmentCollection();
				this._subscribeOnMessages();
			},

			/**
			 * Adds new dynamic block for current group.
			 * @public
			 * @param {Number} attrIndex Index of created dynamic block attribute.
			 * @param {Boolean} isDefault Is new dynamic block default.
			 */
			addDynamicBlock: function(attrIndex, isDefault) {
				var config = this._prepareNewSegmentConfig(attrIndex, isDefault);
				this.sandbox.publish("DynamicBlockAdd", config, [this.sandboxId]);
			},

			/**
			 * Returns available attributes for current dynamic block in group.
			 * @public
			 * @param {Number} selectedIndex Current dynamic block attribute index.
			 * @returns {Terrasoft.Collection} Available attributes.
			 */
			getAvailableAttributes: function(selectedIndex) {
				var attributesInUse = [];
				if (this.$SelectedGroup) {
					Terrasoft.each(this.$SelectedGroup.$Items, function(item) {
						attributesInUse = Ext.Array.merge(attributesInUse, item.$Attributes);
					}, this);
				}
				if (selectedIndex) {
					Ext.Array.remove(attributesInUse, selectedIndex);
				}
				var availableAttributes = this.$DCAttributesCollection.filterByFn(function(el) {
					return !Ext.Array.contains(attributesInUse, el.Index);
				});
				return availableAttributes;
			},

			/**
			 * Shows modal box with attribute selection for new dynamic block.
			 * @public
			 */
			showRulesLookup: function() {
				var moduleId = this._getAttributeLookupModuleId();
				var modalBoxContainer = ModalBox.show({
					heightPixels: 350,
					widthPixels: 500,
					boxClasses: ["dc-modal-box"]
				}, function() {
					this.sandbox.unloadModule(moduleId, modalBoxContainer.id);
				}, this);
				this.sandbox.loadModule("DynamicContentAttributeLookupModule", {
					renderTo: modalBoxContainer.id,
					id: moduleId,
					keepAlive: false,
					parameters: {
						viewModelConfig: {
							SelectedItem: null
						}
					}
				});
			},

			/**
			 * Validates add new dynamic block action.
			 * @public
			 * @returns {Object} Validation result.
			 */
			validateAddDynamicBlockAction: function() {
				if (!this.validateIsEmptyAttributesCollection()) {
					return this.getValidationResult(false, this.get("Resources.Strings.AddRuleBeforeCreateSegment"));
				}
				if (!this.validateAvailableAttributes()) {
					return this.getValidationResult(false, this.get("Resources.Strings.NoAvailableRuleMessage"));
				}
				return this.getValidationResult(true);
			},

			/**
			 * Sorts current segments collection by its priopity property.
			 * @public
			 * @param {Terrasoft.BaseViewModelCollection} collection Segments collection.
			 */
			sortSegmentsByPriority: function(collection) {
				if (collection && !collection.isEmpty()) {
					collection.sort("$Priority", Terrasoft.OrderDirection.ASC);
					var top = collection.first();
					var last = collection
						.filterByFn(function(el) {
							return !el.source.$IsDefault;
						})
						.last();
					Terrasoft.each(collection, function(item) {
						item.$IsTop = item === top;
						item.$IsLast = item === last;
					});
					collection.fireEvent("sorted", collection);
				}
			},

			/**
			 * Handler on selected content item changed.
			 * Reloads segments collection.
			 * @public
			 * @param {Terrasoft.BaseContentBlockViewModel} item New selected content item.
			 */
			onDynamicContentItemChanged: function(item) {
				var isGroup = item && item.$ItemType === "blockgroup";
				this.$SelectedGroup = isGroup ? item : null;
				var emptyCollection = Ext.create("Terrasoft.Collection");
				var collection = isGroup ? item.$Items : emptyCollection;
				this._setSegmentsCollection(collection);
			},

			/**
			 * Handler on attribute lookup item selected.
			 * Provides add new segment action.
			 * @public
			 * @param {Object} item New selected attribute item.
			 */
			onDCAttributeSelected: function(item) {
				ModalBox.close();
				this.addDynamicBlock(item.Index, false);
			},

			/**
			 * Handler on change segments priority.
			 * Publishes changes and reloads segments collection with new values.
			 * @public
			 * @param {Object} config Priority changes config object.
			 */
			onSegmentPriorityChange: function(config) {
				var segments = this.shiftSegmentPriority(config.id, config.isPriorityUp);
				var changes = this._getItemsProperties(segments, ["Priority"]);
				this.sandbox.publish("DynamicBlocksUpdate", changes)
					? this.sortSegmentsByPriority(this.$SegmentsCollection)
					: this.shiftSegmentPriority(config.id, !config.isPriorityUp);
			},

			/**
			 * Handler on cancel select attribute.
			 * Closes modal box.
			 * @public
			 */
			closeModalBox: function() {
				ModalBox.close();
			},

			/**
			 * Handler on add default segment button clicked.
			 * Provides action to add default segment.
			 * @public
			 */
			onAddDefaultSegmentClick: function() {
				this.addDynamicBlock(null, true);
			},

			/**
			 * Handler on add new segment button clicked.
			 * Provides action to add new segment with validation.
			 * @public
			 */
			onAddSegmentClick: function() {
				var result = this.validateAddDynamicBlockAction();
				if (result.isValid) {
					this.showRulesLookup();
				} else {
					this.showInformationDialog(result.message);
				}
			},

			/**
			 * Sends new selected segment item id.
			 * @public
			 * @param {Terrasoft.SegmentContainerListItemViewModel} item Current selected segment.
			 */
			onSelectedItemChanged: function(item) {
				if (item) {
					this.sandbox.publish("ActiveBlockChanged", item.id, [this.sandboxId]);
				}
			}

			// #endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PropertiesPageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"backgroundColor": {
						"bindTo": "Color"
					},
					"wrapClass": ["dc-properties-container"],
					"markerValue": {
						"bindTo": "PropertiesContainerMarkerValue"
					}
				}
			},
			{
				"operation": "insert",
				"name": "SegmentsContainer",
				"parentName": "PropertiesPageContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["segments-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SegmentsLabel",
				"parentName": "SegmentsContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.SegmentSettingsLabel",
					"classes": {
						"labelClass": ["t-title-label-dc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SegmentsContainerList",
				"parentName": "SegmentsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ObservableContainerList",
					"collection": "$SegmentsCollection",
					"classes": {"wrapClassName": ["segments-container-list"]},
					"idProperty": "Id",
					"itemSelectedAlways": true,
					"rowCssSelector": ".segment-item-container.selectable",
					"onSelectedItemChanged": "$onSelectedItemChanged",
					"itemSortPropertyName": "Priority",
					"defaultItemConfig": {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["segment-item-container"]
						},
						items: [{
							className: "Terrasoft.Label",
							caption: "$Caption"
						}]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SegmentsSettingsDelimiter",
				"propertyName": "items",
				"parentName": "SegmentsContainer",
				"values": {
					"classes": {"wrapClassName": ["settings-delimiter"]},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "SegmentsCollection",
						"bindConfig": {converter: "isNotEmptyValue"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SegmentsContainerLayout",
				"propertyName": "items",
				"parentName": "SegmentsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "AddSegmentButton",
				"parentName": "SegmentsContainerLayout",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": "$Resources.Images.AddButtonIcon",
					"caption": "$Resources.Strings.AddSegmentButtonCaption",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": "$onAddSegmentClick",
					"classes": {
						wrapperClass: ["add-button-control"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddDefaultSegmentContainer",
				"propertyName": "items",
				"parentName": "SegmentsContainerLayout",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo":"SegmentsCollection",
						"bindConfig": {"converter": "_isAddDefaultSegmentButtonVisible"}
					},
					"classes": {
						wrapClassName: ["default-segment-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddDefaultSegmentButton",
				"parentName": "AddDefaultSegmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": "$Resources.Images.AddButtonIcon",
					"caption": "$Resources.Strings.AddDefaultSegmentButtonCaption",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": "$onAddDefaultSegmentClick",
					"classes": {
						wrapperClass: ["add-button-control"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddDefaultSegmentInfoButton",
				"parentName": "AddDefaultSegmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.DefaultSegmentHint",
					"behaviour": {
						"displayEvent": Terrasoft.controls.TipEnums.displayEvent.HOVER
							| Terrasoft.controls.TipEnums.displayEvent.CLICK
					},
					"tools": []
				}
			}
		]
	};
});


