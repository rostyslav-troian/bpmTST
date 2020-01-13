Terrasoft.configuration.Structures["DynamicContentBuilderMixin"] = {innerHierarchyStack: ["DynamicContentBuilderMixin"]};
define("DynamicContentBuilderMixin", ["DynamicContentBuilderMixinResources",
		"DynamicContentEnums", "DynamicContentReplicaBuilder",
		"DynamicContentBuilderHelper", "DynamicContentValidator", "DynamicContentBlockViewModel",
		"DynamicContentBlockGroupViewModel", "DynamicContentMjBlockViewModel"],
	function(resources, DynamicContentEnums, ReplicaBuilder) {
		Ext.define("Terrasoft.configuration.mixins.DynamicContentBuilderMixin", {
			alternateClassName: "Terrasoft.DynamicContentBuilderMixin",

			consts: {

				/**
				 * Root schema name for rule filters.
				 * @type {String}
				 */
				rootSchemaNameForFilter: "Contact",

				/**
				 * Maximum allowed number of dynamic content blocks.
				 * @type {Number}
				 */
				dynamicBlocksLimit: 30
			},

			/**
			 * Dynamic content builder messages.
			 * @private
			 */
			dynamicContentBuilderMessages: {

				/**
				 * @message ActiveDynamicContentItemChanged
				 * Publishes properties of active dynamic content item.
				 */
				"ActiveDynamicContentItemChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetDynamicBlockConfig
				 * Returns dynamic content item config.
				 */
				"GetDynamicBlockConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message DynamicBlockAdd
				 * Adds new block to selected group.
				 */
				"DynamicBlockAdd": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				/**
				 * @message DynamicBlocksUpdate
				 * Applies changes of segments to blocks.
				 */
				"DynamicBlocksUpdate": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ActiveBlockChanged
				 * Switches active block in selected group.
				 */
				"ActiveBlockChanged": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				/**
				 * @message DynamicBlockDelete
				 * Deletes block from selected group.
				 */
				"DynamicBlockDelete": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				/**
				 * @message GetDCAttributes
				 * Returns dynamic content attributes.
				 */
				"GetDCAttributes": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message DCAttributeAdd
				 * Adds new attribute to the list.
				 */
				"DCAttributeAdd": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				/**
				 * @message DCAttributeUpdated
				 * Applies changes to attribute.
				 */
				"DCAttributeUpdated": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message DCAttributeDelete
				 * Deletes attribute from the list.
				 */
				"DCAttributeDelete": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},
				/**
				 * @message DCAttributeDeleted
				 * Publishes properties of active dynamic content item.
				 */
				"DCAttributeDeleted": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			//region Methods: Private

			/**
			 * Registers event subscriptions.
			 * @private
			 */
			_registerDCBuilderMessages: function() {
				this.sandbox.registerMessages(this.dynamicContentBuilderMessages);
			},

			/**
			 * Destroys event subscriptions.
			 * @private
			 */
			_unRegisterDCBuilderMessages: function() {
				var messages = this.Terrasoft.keys(this.dynamicContentBuilderMessages);
				this.sandbox.unRegisterMessages(messages);
			},

			/**
			 * Subscribes messages handlers.
			 * @private
			 */
			_subscribeDCBuilderMessages: function() {
				this.sandbox.subscribe("GetDCAttributes", this.onGetDCAttributes, this);
				this.sandbox.subscribe("DCAttributeAdd", this.onDCAttributeAdd, this);
				this.sandbox.subscribe("DCAttributeUpdated", this.onDCAttributeChange, this);
				this.sandbox.subscribe("DCAttributeDelete", this.onDCAttributeDelete, this);
				this.sandbox.subscribe("GetDynamicBlockConfig", this.onGetDynamicContentItemConfig,
					this, ["DynamicBlockPropertiesPage"]);
				this.sandbox.subscribe("DynamicBlockAdd", this.onDynamicBlockAdd,
					this, ["DynamicBlockPropertiesPage"]);
				this.sandbox.subscribe("ActiveBlockChanged", this.onActiveBlockChange,
					this, ["DynamicBlockPropertiesPage"]);
				this.sandbox.subscribe("DynamicBlocksUpdate", this.onDynamicBlocksUpdate, this);
				this.sandbox.subscribe("DynamicBlockDelete", this.onDynamicBlockDelete,
					this, ["SegmentContainerListItemViewModel"]);
			},

			/**
			 * Shows question message box to approve attribute deleting.
			 * @private
			 * @param {Object} attribute DCAttribute model item to delete.
			 */
			_showDeleteAttributeQuestion: function(attribute) {
				var config = {
					caption: resources.localizableStrings.AttributeDeleteWarning,
					buttons: ["ok", "cancel"],
					handler: function (result) {
						if (result === "ok") {
							this.removeDCAttribute(attribute);
						}
					},
					scope: this
				};
				Terrasoft.utils.showMessage(config);
			},

			/**
			 * Shows message box with attribute delete error message.
			 * @private
			 */
			_showDeleteAttributeException: function() {
				var config = {
					caption: resources.localizableStrings.AttributeUsedInBlockException,
					buttons: ["ok"]
				};
				Terrasoft.utils.showMessage(config);
			},

			/**
			 * Creates empty filter.
			 * @private
			 * @returns {String} Serialized filter value.
			 */
			_createEmptyFilter: function() {
				var filterGroup = Ext.create("Terrasoft.FilterGroup", {
					rootSchemaName: this.consts.rootSchemaNameForFilter,
					key: ""
				});
				return filterGroup.serialize({ serializeFilterManagerInfo: true });
			},

			//endregion

			//region Methods: Protected

			/**
			 * Subscribes to group events.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} items Content items collection.
			 */
			subscribeDCItemsCollectionEvents: function(items) {
				items.on("itemChanged", this.onItemChanged, this);
			},

			/**
			 * Unsubscribes from group events.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} items Content items collection.
			 */
			unsubscribeDCItemsCollectionEvents: function(items) {
				items.un("itemChanged", this.onItemChanged, this);
			},

			/**
			 * Handler 'itemChanged' event of Terrasoft.Collection collection.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item Collection changed item.
			 * @param {Object} config Event parameters.
			 */
			onItemChanged: function(item, config) {
				/*eslint-disable spellcheck/spell-checker*/
				switch (config.event) {
					case "dynamicblockchanged":
						var block = config.arguments;
						this.onActiveBlockChange(block.Id, block.GroupId);
						break;
					default:
				}
				/*eslint-enable spellcheck/spell-checker*/
			},

			/**
			 * Handles request for dynamic content attributes.
			 * @protected
			 * @returns {Array[Object]} List of dynamic content attributes.
			 */
			onGetDCAttributes: function() {
				return this.$Attributes;
			},

			/**
			 * Handles request for adding of new content attributes.
			 * @protected
			 * @returns {Object} New dynamic content attribute.
			 */
			onDCAttributeAdd: function() {
				var nextIndex = this.getNextAttributeIndex();
				var newAttr = {
					Caption: resources.localizableStrings.DCAttributeNamePreffix + nextIndex,
					Value: this._createEmptyFilter(),
					Index: nextIndex,
					TypeId: DynamicContentEnums.DCAttributeTypes.FILTER,
					Id: Terrasoft.generateGUID()
				};
				this.$Attributes.push(newAttr);
				return newAttr;
			},

			/**
			 * Returns index for new attribute.
			 * @protected
			 * @returns {Number} Index for new attribute.
			 */
			getNextAttributeIndex: function() {
				var result = 1;
				if (Ext.isEmpty(this.$Attributes)) {
					return result;
				}
				var indexes = Ext.Array.map(this.$Attributes, function(item) {
					return item.Index;
				});
				var max = Ext.Array.max(indexes);
				result = max + 1;
				return result;
			},

			/**
			 * Handles dynamic content attribute changes.
			 * @protected
			 * @param {Object} attribute Attribute instance for update.
			 */
			onDCAttributeChange: function(attribute) {
				Terrasoft.each(this.$Items, function(group) {
					if (group.$ItemType === "blockgroup") {
						var block = group.$Items.findByFn(function(el) {
							return el.$Attributes.indexOf(attribute.Index) !== -1;
						});
						if (block) {
							block.set("Caption", attribute.Caption);
							var activeBlock = group.getActiveBlock();
							if (activeBlock && activeBlock.$Id !== block.$Id) {
								var isActive = activeBlock.get("IsActive") ? null : true;
								activeBlock.set("IsActive", isActive);
							}
						}
					}
				}, this);
			},

			/**
			 * Returns result of attribute using validation.
			 * @protected
			 * @param {Number} attrIndex Index of the attribute.
			 * @returns {Boolean} Result of validation.
			 */
			validateAttributeUsings: function(attrIndex) {
				var result = true;
				Terrasoft.each(this.$Items, function(item) {
					if (item.$ItemType === "blockgroup") {
						Terrasoft.each(item.$Items, function(segment) {
							result = !Ext.Array.contains(segment.$Attributes, attrIndex);
							return result;
						}, this);
						return result;
					}
				}, this);
				return result;
			},

			/**
			 * Returns count of replicas for current template.
			 * @protected
			 * @param {Object} templateJson Dynamic template config (JSON).
			 * @returns {Number} Count of replicas.
			 */
			calculateReplicasCount: function(templateJson) {
				var replicaMasks = ReplicaBuilder.generateReplicaMasks(templateJson);
				return replicaMasks.length;
			},

			/**
			 * Handles request for attribute deletion.
			 * @protected
			 * @param {Object} attribute Attribute instance for delete.
			 */
			onDCAttributeDelete: function(attribute) {
				var notInUse = this.validateAttributeUsings(attribute.Index);
				if (notInUse) {
					this._showDeleteAttributeQuestion(attribute);
				} else {
					this._showDeleteAttributeException();
				}
			},

			/**
			 * Removes attribute from list.
			 * @protected
			 * @param {Object} attribute Attribute instance for delete.
			 */
			removeDCAttribute: function(attribute) {
				var deleteResult = Ext.Array.remove(this.$Attributes, attribute);
				if (!Ext.Array.contains(deleteResult, attribute)) {
					this.sandbox.publish("DCAttributeDeleted", attribute);
				}
			},

			/**
			 * Handles request for dynamic content element.
			 * @protected
			 * @returns {Object} Instance of content element with the list of attributes.
			 */
			onGetDynamicContentItemConfig: function() {
				var item = this.getSelectedItem(this.$Items);
				return {
					item: item,
					dcAttributes: this.$Attributes
				};
			},

			/**
			 * Handles dynamic content elements changes.
			 * @protected
			 * @param {Array[Object]} config Index of the attribute.
			 * @returns {Boolean} Result of update operation.
			 */
			onDynamicBlocksUpdate: function(config) {
				var selectedGroup = this.getSelectedItem(this.$Items);
				if (!selectedGroup || selectedGroup.$ItemType !== "blockgroup") {
					return false;
				}
				if (!Ext.isArray(config)) {
					config = [config];
				}
				Terrasoft.each(config, function(item) {
					var block = selectedGroup.$Items.get(item.id);
					block.setProperties(item.data);
				});
				return true;
			},

			/**
			 * Handles request for dynamic content element deletion.
			 * @protected
			 * @param {String} blockId Identifier of block for delete.
			 * @returns {Boolean} Result of delete operation.
			 */
			onDynamicBlockDelete: function(blockId) {
				var selectedGroup = this.getSelectedItem(this.$Items);
				if (!selectedGroup || selectedGroup.$ItemType !== "blockgroup") {
					return false;
				}
				selectedGroup.$Items.removeByKey(blockId);
				if (selectedGroup.$Items.isEmpty()) {
					return this.deleteGroup(selectedGroup.$Id);
				}
				if (selectedGroup.$Items.getCount() === 1 && selectedGroup.hasDefaultSegment()) {
					return this.replaceGroupWithBlock(selectedGroup);
				}
				this.reIndexBlocks();
				return !selectedGroup.$Items.contains(blockId);
			},

			/**
			 * Replaces group with the last block inside of it.
			 * @protected
			 * @param {Terrasoft.DynamicContentBlockGroupViewModel} group Group instance for delete.
			 * @returns {Boolean} Result of operation.
			 */
			replaceGroupWithBlock: function(group) {
				var clone;
				var block = group.$Items.first();
				if (this.isMjmlConfig()) {
					var blockConfig = block.serializeViewModel();
					clone = this.createItemViewModel(blockConfig);
				} else {
					clone = this.cloneContentElement(block);
				}
				clone.set("Caption", null);
				var groupId = group.$Id;
				var index = this.$Items.getKeys().indexOf(groupId);
				this.$Items.removeByKey(groupId);
				this.$Items.insert(index, clone.$Id, clone);
				this.reIndexGroups();
				this.reIndexBlocks();
				clone.set("Selected", true);
				return true;
			},

			/**
			 * Deletes group with content blocks.
			 * @protected
			 * @param {String} groupId Identifier of group for delete.
			 * @returns {Boolean} Result of operation.
			 */
			deleteGroup: function(groupId) {
				this.onItemRemove(groupId);
				this.reIndexGroups();
				this.reIndexBlocks();
				return true;
			},

			/**
			 * Creates new group of content blocks.
			 * @protected
			 * @param {Terrasoft.DynamicContentBlockViewModel} block Content block view model.
			 * @return {Terrasoft.DynamicContentBlockGroupViewModel} New block group view model.
			 */
			createGroup: function(block) {
				var blockConfig;
				var config = {
					ItemType: "blockgroup",
					Items: []
				};
				if (this.isMjmlConfig()) {
					var serializedBlock = block.serializeViewModel();
					serializedBlock.Id = block.$Id;
					config.Items.push(serializedBlock);
					return this.createItemViewModel(config);
				}
				var helper = this.createContentBuilderHelper();
				blockConfig = helper.toJSON(block);
				config.Items = [blockConfig];
				return helper.toViewModel(config);
			},

			/**
			 * Replaces block with new group of content blocks.
			 * @protected
			 * @param {Terrasoft.DynamicContentBlockViewModel} block Content block view model.
			 * @param {Object} config Config for dynamic block instance.
			 */
			replaceBlockWithGroup: function(block, config) {
				var clone;
				if (this.isMjmlConfig()) {
					var itemConfig = block.serializeViewModel();
					clone = this.createItemViewModel(itemConfig);
				} else {
					clone = this.cloneContentElement(block);
				}
				var blockId = block.$Id;
				clone.setProperties(config);
				var group = this.createGroup(clone);
				var index = this.$Items.getKeys().indexOf(blockId);
				this.$Items.removeByKey(blockId);
				this.$Items.insert(index, group.$Id, group);
				group.set("Selected", true);
			},

			/**
			 * Transforms content block to dynamic content block.
			 * @protected
			 * @param {Terrasoft.DynamicContentBlockViewModel} block Content block view model.
			 * @param {Object} config Config for dynamic block instance.
			 */
			convertBlockToDynamic: function(block, config) {
				this.replaceBlockWithGroup(block, config);
				this.reIndexGroups();
				this.reIndexBlocks();
			},

			/**
			 * Sets content block in group properties.
			 * @protected
			 * @param {Terrasoft.ContentBlockViewModel} block Block config.
			 */
			initDCBlockInGroup: function(block) {
				block.set("IsActive", true);
			},

			/**
			 * Adds block to group of content blocks.
			 * @protected
			 * @param {Terrasoft.DynamicContentBlockViewModel} selectedItem Source block view model.
			 * @param {Object} config Config for dynamic block instance.
			 */
			addBlockToGroup: function(selectedItem, config) {
				var activeBlock = selectedItem.getActiveBlock();
				var newBlock = null;
				if (activeBlock) {
					if (this.isMjmlConfig()) {
						var newBlockConfig = activeBlock.serializeViewModel();
						newBlock = this.createItemViewModel(newBlockConfig);
					} else {
						newBlock = this.cloneContentElement(activeBlock);
						newBlock.$Id = Terrasoft.generateGUID();
					}
					newBlock.set("GroupId", selectedItem.$Id);
					newBlock.setProperties(config);
					selectedItem.addBlock(newBlock);
					this.$SelectedContentItem = newBlock;
					this.reIndexBlocks();
				}
			},

			/**
			 * Creates dynamic content block.
			 * @protected
			 * @param {Object} config Config for dynamic block instance.
			 * @return {Terrasoft.DynamicContentBlockGroupViewModel} New content block view model.
			 */
			onDynamicBlockAdd: function(config) {
				var selectedItem = this.getSelectedItem(this.$Items);
				if (!selectedItem || !config) {
					return;
				}
				if (this.isDynamicBlocksLimitReached()) {
					this.showBlocksLimitReachedDialog();
					return;
				}
				switch (selectedItem.$ItemType) {
					case "block":
					case "mjblock":
						this.convertBlockToDynamic(selectedItem, config);
						break;
					case "blockgroup":
						this.addBlockToGroup(selectedItem, config);
						break;
					default:
						var message = Ext.String.format("Unexpected type {0} to create dynamic block",
							selectedItem.$ItemType);
						throw new Terrasoft.UnsupportedTypeException({
							message: message
						});
				}
			},

			/**
			 * Switches active content block in group.
			 * @protected
			 * @param {String} blockId Identifier of the block.
			 * @param {String} groupId Identifier of the block group.
			 */
			onActiveBlockChange: function(blockId, groupId) {
				var selectedGroup;
				if (groupId) {
					selectedGroup = this.$Items.get(groupId);
					selectedGroup && selectedGroup.set("Selected", true);
				} else {
					selectedGroup = this.$Items.findByFn(function(item) {
						return item.$ItemType === "blockgroup" && item.$Selected === true;
					});
				}
				if (!blockId || !selectedGroup) {
					return;
				}
				var activeblock = selectedGroup.setActiveBlock(blockId);
				this.set("SelectedContentItem", activeblock);
			},

			/**
			 * Generates new indexes for content blocks.
			 * @protected
			 */
			reIndexBlocks: function() {
				var i = 0;
				Terrasoft.each(this.$Items, function(item) {
					if (item.$ItemType === "blockgroup") {
						Terrasoft.each(item.$Items, function(block) {
							block.$Index = Math.pow(2, i);
							i++;
						}, this);
					}
				}, this);
			},

			/**
			 * Generates new indexes for content block groups.
			 * @protected
			 */
			reIndexGroups: function() {
				var i = 0;
				Terrasoft.each(this.$Items, function(item) {
					if (item.$ItemType === "blockgroup") {
						item.$Index = i;
						i++;
					}
				}, this);
			},

			/**
			 * Returns replica mask of active blocks.
			 * @protected
			 * @return {Number} Replica mask.
			 */
			getActiveReplicaMask: function() {
				return this.Terrasoft.reduce(this.$Items.getItems(), function(mask, block) {
					if (block.$ItemType === "blockgroup") {
						mask += block.getActiveBlock().$Index;
					}
					return mask;
				}, 0);
			},

			/**
			 * Handler for dynamic content item copy event.
			 * @protected
			 */
			onDCItemCopy: function() {
				this.reIndexGroups();
				this.reIndexBlocks();
			},

			//endregion

			//region Methods: Public

			/**
			 * Initializes dynamic content subscriptions.
			 * @public
			 */
			initDCBuilderMixin: function() {
				this._registerDCBuilderMessages();
				this._subscribeDCBuilderMessages();
				this.initDCAttributes();
			},

			/**
			 * Initializes dynamic content rules.
			 * @public
			 */
			initDCAttributes: function() {
				if (!this.$Attributes) {
					this.$Attributes = [];
				}
			},

			/**
			 * Creates instance of Terrasoft.DynamicContentBuilderHelper.
			 * @public
			 * @virtual
			 * @returns {Terrasoft.DynamicContentBuilderHelper} Instance of Terrasoft.DynamicContentBuilderHelper.
			 */
			createContentBuilderHelper: function() {
				return Ext.create("Terrasoft.DynamicContentBuilderHelper", {
					sandbox: this.sandbox,
					isMjmlConfig: this.isMjmlConfig()
				});
			},

			/**
			 * Publishes properties of active dynamic content item.
			 * @public
			 */
			publishDynamicContentItemConfig: function() {
				var item = this.getSelectedItem(this.$Items);
				if (item) {
					this.sandbox.publish("ActiveDynamicContentItemChanged", item, ["DynamicBlockPropertiesPage"]);
				}
			},

			/**
			 * Shows message about dynamic blocks limit.
			 * @public
			 */
			showBlocksLimitReachedDialog: function() {
				var message = Ext.String.format(resources.localizableStrings.BlocksLimitWarning,
					this.consts.dynamicBlocksLimit);
				this.showInformationDialog(message);
			},

			/**
			 * Checkes number of dynamic blocks on sheet.
			 * @public
			 * @param {Number} numberToAdd Number of dynamic blocks that will be added.
			 * @returns {Boolean} True when dynamic blocks limit is reached.
			 */
			isDynamicBlocksLimitReached: function(numberToAdd) {
				var blocksCount = numberToAdd || 1;
				Terrasoft.each(this.$Items, function(item) {
					if (item.$ItemType === "blockgroup") {
						blocksCount += item.$Items.getCount();
					}
				}, this);
				return blocksCount > this.consts.dynamicBlocksLimit;
			},

			/**
			 * Cleans registered subscriptions.
			 * @public
			 */
			destroy: function() {
				this._unRegisterDCBuilderMessages();
			},

			/**
			 * @inheritdoc BaseContentItemViewModel#extendChildrenItemTypes
			 */
			extendChildrenItemTypes: function() {
				Ext.apply(this.childItemTypes, {
					block: "Terrasoft.DynamicContentBlockViewModel",
					blockgroup: "Terrasoft.DynamicContentBlockGroupViewModel",
					mjblock: "Terrasoft.DynamicContentMjBlockViewModel"
				});
			}

			//endregion

		});
	});


