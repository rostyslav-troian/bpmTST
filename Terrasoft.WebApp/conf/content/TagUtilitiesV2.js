Terrasoft.configuration.Structures["TagUtilitiesV2"] = {innerHierarchyStack: ["TagUtilitiesV2"]};
define("TagUtilitiesV2", ["terrasoft", "MaskHelper", "ModalBox", "TagConstantsV2"],
	function(Terrasoft, MaskHelper, ModalBox, TagConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.TagUtilities
		 * ######, ########### ###### ###### ##### # ######## # ######### ##############.
		 */
		Ext.define("Terrasoft.configuration.mixins.TagUtilities", {
			alternateClassName: "Terrasoft.TagUtilities",

			modalBoxContainer: null,

			/**
			 * ######## ##### ##### #######
			 * @Type {string}
			 */
			tagSchemaName: null,

			/**
			 * ######## ##### ##### # ###### #######
			 * @Type {string}
			 */
			inTagSchemaName: null,

			modalBoxSize: {
				minHeight: "1",
				minWidth: "1",
				maxHeight: "100",
				maxWidth: "100"
			},

			/**
			 * ########## ############# ######### # ######### ####.
			 * @protected
			 * @return {Object}
			 */
			getFixedHeaderContainer: function() {
				return ModalBox.getFixedBox();
			},

			/**
			 * ########## ######## ######### # ######### ####.
			 * @protected
			 * @return {Object}
			 */
			getGridContainer: function() {
				return this.modalBoxContainer;
			},

			/**
			 * ########## ###### ## ###### ##### (### ######) # ## ######### #####.
			 * @private
			 * @return {Terrasoft.FilterGroup}
			 */
			getCurrentUserAndTypesFilter: function() {
				var filterGroup = new this.Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				var innerFilterGroupCreatedBy = new this.Terrasoft.createFilterGroup();
				innerFilterGroupCreatedBy.add("CurrentUser", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Tag.CreatedBy", this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
				innerFilterGroupCreatedBy.add("PrivateType", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Tag.Type", TagConstants.TagType.Private));
				var innerFilterGroupOtherTypes = new this.Terrasoft.createFilterGroup();
				var types = [TagConstants.TagType.Corporate, TagConstants.TagType.Public];
				innerFilterGroupOtherTypes.add("OtherTypes", this.Terrasoft.createColumnInFilterWithParameters(
					"Tag.Type", types));
				filterGroup.addItem(innerFilterGroupCreatedBy);
				filterGroup.addItem(innerFilterGroupOtherTypes);
				return filterGroup;
			},

			/**
			 * ######### ####### #### # ############ # #########.
			 * @public
			 */
			updateSize: function() {
				ModalBox.updateSizeByContent();
			},

			/**
			 * ############## ######### #### ### ######## #### ###### #####.
			 * @private
			 */
			prepareModalBox: function() {
				this.modalBoxContainer = ModalBox.show(this.modalBoxSize);
				ModalBox.setSize(1, 1);
			},

			/**
			 * ######### ######### #### Lookup-# # ######### ######.
			 * @public
			 */
			closeModalBox: function() {
				if (this.modalBoxContainer) {
					ModalBox.close();
					this.modalBoxContainer = null;
				}
			},

			/**
			 * ######### id ############ ###### #####.
			 * @protected
			 * @param {object} sandbox
			 * @return {string} id ######
			 */
			getTagModulePageId: function(sandbox) {
				return sandbox.id + "_TagModule";
			},

			/**
			 * ######### ###### #####
			 * @protected
			 * @param {object} config ###### ######
			 */
			openTagModule: function(config) {
				var scope = config.scope;
				var sandbox = config.sandbox || scope.sandbox;
				var tagModulePageId = this.getTagModulePageId(sandbox);
				this.prepareModalBox();
				var tagModuleConfig = {
					renderTo: this.getGridContainer(),
					id: tagModulePageId,
					parameters: {
						TagSchemaName: config.entityTagSchemaName,
						InTagSchemaName: config.entityInTagSchemaName,
						RecordId: config.entityRecordId
					}
				};
				sandbox.loadModule("TagModule", tagModuleConfig);
			},

			/**
			 * ######### ######### ###### ##### (########## ##### ## ######).
			 * @protected
			 * @param {string} recordId - ############# ######
			 */
			reloadTagCount: function(recordId) {
				if (recordId) {
					this.initTagButtonCaption(recordId);
				} else {
					this.initTagButtonCaption();
				}
			},

			/**
			 * Initializes section tag properties.
			 * @protected
			 * @param {String} schemaName Section schema name.
			 */
			initTags: function(schemaName) {
				if (this.get("UseTagModule")) {
					this.on("change:TagButtonVisible", this.initTagButtonCaption.bind(this, null));
					this.checkSchemaExists((this.inTagSchemaName || (schemaName + "InTag")), function(schemaName) {
						var tagSchemaExists = (schemaName !== null);
						this.set("TagButtonVisible", tagSchemaExists);
					});
				} else {
					this.set("TagButtonVisible", false);
				}
			},

			/**
			 * ############### ###### #####.
			 * @protected
			 */
			initTagButton: function() {
				if (this.get("UseTagModule") && this.get("TagButtonVisible")) {
					Terrasoft.delay(this.initTagButtonCaption, this, 1000);
				}
			},

			/**
			 * ############## ######### ###### (########## ##### # ######).
			 * @protected
			 * @param {String} primaryColumnValue  ############# ######
			 */
			initTagButtonCaption: function(primaryColumnValue) {
				if (!this.destroyed && this.get("TagButtonVisible")) {
					var recordId = null;
					if (!primaryColumnValue) {
						recordId = this.getCurrentRecordId();
					} else {
						recordId = primaryColumnValue;
					}
					if (recordId && recordId !== null && !this.Ext.isArray(recordId)) {
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: (this.inTagSchemaName) || (this.entitySchemaName + "InTag")
						});
						esq.addColumn("Tag");
						var filter = this.getCurrentUserAndTypesFilter();
						var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
						filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Entity", recordId));
						filterGroup.addItem(filter);
						esq.filters.add(filterGroup);
						esq.getEntityCollection(function(result) {
							if (result.success) {
								var collection = result.collection;
								if (collection) {
									if (collection.getCount() > 0) {
										this.set("TagButtonCaption", collection.getCount());
									} else {
										this.set("TagButtonCaption", "");
									}
								}
							}
						}, this);
					} else {
						this.set("TagButtonCaption", "");
					}
				}
			},

			/**
			 * ######### ####### ####### ### ###### #####.
			 * @protected
			 * @param {string} name ######## #######
			 * @param {Function} callback #######-callback
			 */
			checkSchemaExists: function(name, callback) {
				this.Terrasoft.EntitySchemaManager.initialize(function() {
					var item = this.Terrasoft.EntitySchemaManager.getItems()
						.filterByFn(function(item) {
							return item.name === name;
						})
						.first();
					callback.call(this, (item && item.name) || null);
				}, this);
			},

			/**
			 * ########## ###### "###".
			 * @protected
			 */
			onTagButtonClick: function() {
				this.showTagModule();
			},

			/**
			 * ######### ######, #### ### ########,
			 * # ########## ####### # ###### # ############# ####### ###### #####.
			 * @protected
			 */
			saveCardAndLoadTagsFromSection: function() {
				if (this.isChanged()) {
					var config = {
						callback: this.publishSectionMessage,
						isSilent: true,
						callBaseSilentSavedActions: true
					};
					this.save(config);
				} else {
					this.publishSectionMessage();
				}
			},

			/**
			 * ########## ######### # ###### # ############# ####### ###### #####.
			 * @protected
			 */
			publishSectionMessage: function() {
				this.sandbox.publish("CardChanged", {
					key: "CanShowTags",
					value: true
				}, [this.sandbox.id]);
			},

			/**
			 * ######### ########## ###### ##### ######### ###### #####.
			 * @protected
			 */
			saveCardAndLoadTags: function() {
				if (this.isChanged()) {
					var config = {
						callback: this.showTagModule,
						isSilent: true,
						callBaseSilentSavedActions: true
					};
					this.save(config);
				} else {
					this.showTagModule();
				}
			},

			/**
			 * ########## ###### #####.
			 * @protected
			 */
			showTagModule: function() {
				var config = {
					scope: this,
					sandbox: this.sandbox,
					entityTagSchemaName: (this.tagSchemaName) || (this.entitySchemaName + "Tag"),
					entityInTagSchemaName: (this.inTagSchemaName) || (this.entitySchemaName + "InTag"),
					entityRecordId: this.getCurrentRecordId()
				};
				this.openTagModule(config);
			},

			/**
			 * ########## ############# ####### ######## ######.
			 * @virtual
			 * @protected
			 */
			getCurrentRecordId: this.Terrasoft.emptyFn
		});
	}
);


