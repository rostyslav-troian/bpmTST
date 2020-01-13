Terrasoft.configuration.Structures["TagModuleSchemaHelper"] = {innerHierarchyStack: ["TagModuleSchemaHelper"]};
define("TagModuleSchemaHelper", ["TagModuleSchemaHelperResources", "TagConstantsV2", "ViewUtilities"],
	function(resources, TagConstants, ViewUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.TagModuleSchemaHelper
		 * ######, ########### ###### ###### #####.
		 */
		Ext.define("Terrasoft.configuration.mixins.TagModuleSchemaHelper", {
			alternateClassName: "Terrasoft.TagModuleSchemaHelper",

			/**
			 * ########## ###### ## ####### ##### # ########## ######.
			 * @protected
			 * @param {string} entityInTagSchemaName ######## ####### #######
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getEntityInTagQuery: function(entityInTagSchemaName) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: entityInTagSchemaName
				});
				esq.addColumn("Id");
				esq.addColumn("Tag");
				esq.addColumn("Tag.Type", "Type");
				esq.addColumn("Entity");
				return esq;
			},

			/**
			 * ########## ###### ## ####### #### ##### #######.
			 * @protected
			 * @param {string} entityTagSchemaName ######## ####### #######
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getEntityTagQuery: function(entityTagSchemaName) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: entityTagSchemaName
				});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
				esq.addColumn("Type");
				return esq;
			},

			/**
			 * ######### # ###### ## ####### ##### ####### ###### ## ### ########### # ######.
			 * @protected
			 * @param {Terrasoft.Collection} collection ######### ####### #############.
			 * @param {String} columnName ######## ####### # ############### ####.
			 * @return {Terrasoft.FilterGroup} ###### ### ###### ###### #####, ####### ## #### ####### #####.
			 */
			getFilterByExistsTag: function(collection, columnName) {
				var filter = null;
				var entityTagCollection = [];
				columnName = columnName || "TagId";
				collection.each(function(item) {
					var tagId = item.get(columnName);
					if (!this.Ext.isEmpty(tagId)) {
						entityTagCollection.push(tagId);
					}
				}, this);
				if (entityTagCollection.length) {
					filter = this.Terrasoft.createColumnInFilterWithParameters("Id", entityTagCollection);
					filter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
				}
				return filter;
			},

			/**
			 * ########## ###### ## ###### ##### (### ######) # ## ######### #####.
			 * @protected
			 * @return {Terrasoft.FilterGroup}
			 */
			getTagTypesFilter: function(prefixColumnName) {
				if (!prefixColumnName) {
					prefixColumnName = "";
				}
				var filterGroup = new this.Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				this.addPrivateTagFilter(filterGroup, prefixColumnName);
				this.addCorporateTagFilter(filterGroup, prefixColumnName);
				return filterGroup;
			},

			/**
			 * ######### # ######## ####### ##### ###### ## ####### #### # ## ###### ####### ####.
			 * @private
			 * @param {Terrasoft.FilterGroup} filterGroup ###### ######## ## #####.
			 * @param {String} prefixColumnName ### ####### ### ####### ## ######### ########.
			 */
			addPrivateTagFilter: function(filterGroup, prefixColumnName) {
				if (!prefixColumnName) {
					prefixColumnName = "";
				}
				var privateTagFilterGroup = new this.Terrasoft.createFilterGroup();
				privateTagFilterGroup.add("CurrentUser", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, prefixColumnName + "CreatedBy",
					this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
				privateTagFilterGroup.add("PrivateType", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, prefixColumnName + "Type", TagConstants.TagType.Private));
				filterGroup.addItem(privateTagFilterGroup);
			},

			/**
			 * ######### # ######## ####### ##### ###### ## ############## ####.
			 * @private
			 * @param {Terrasoft.FilterGroup} filterGroup ###### ######## ## #####.
			 * @param {String} prefixColumnName ### ####### ### ####### ## ######### ########.
			 */
			addCorporateTagFilter: function(filterGroup, prefixColumnName) {
				if (!prefixColumnName) {
					prefixColumnName = "";
				}
				var corporateTagFilterGroup = new this.Terrasoft.createFilterGroup();
				corporateTagFilterGroup.add("CorporateType", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, prefixColumnName + "Type", TagConstants.TagType.Corporate));
				filterGroup.addItem(corporateTagFilterGroup);
			},

			/**
			 * ######### # ######## ####### ##### ###### ## ########## ####.
			 * @protected
			 * @param {Terrasoft.FilterGroup} filterGroup ###### ######## ## #####.
			 * @param {String} prefixColumnName ### ####### ### ####### ## ######### ########.
			 */
			addPublicTagFilter: function(filterGroup, prefixColumnName) {
				if (!prefixColumnName) {
					prefixColumnName = "";
				}
				var publicTagFilterGroup = new this.Terrasoft.createFilterGroup();
				publicTagFilterGroup.add("PublicType", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, prefixColumnName + "Type", TagConstants.TagType.Public));
				filterGroup.addItem(publicTagFilterGroup);
			},

			/**
			 * ########## ###### ########### ### ############ ####### ## ####.
			 * @protected
			 * @param {string} typeId ### ####
			 * @return {*}
			 */
			getImageConfigForExistsRecord: function(typeId) {
				switch (typeId) {
					case TagConstants.TagType.Private:
						return resources.localizableImages.ExistsPrivateTagIcon;
					case TagConstants.TagType.Corporate:
						return resources.localizableImages.ExistsCorporateTagIcon;
					case TagConstants.TagType.Public:
						return resources.localizableImages.ExistsPublicTagIcon;
					default:
						return null;
				}
			},

			/**
			 * ########## ##### ### ##### # ########### ## #### ####.
			 * @protected
			 * @param {string} typeId ############# ####
			 * @return {string}
			 */
			getTagItemContainerBorderStyle: function(typeId) {
				switch (typeId) {
					case TagConstants.TagType.Private:
						return "private-tag";
					case TagConstants.TagType.Corporate:
						return "corporate-tag";
					case TagConstants.TagType.Public:
						return "public-tag";
					default:
						return "";
				}
			},

			/**
			 * ########## ##### ####### #### ### ############ #####.
			 * @protected
			 * @param {Object} item ####### #######
			 * @param {string} recordId ############# ######
			 * @param {string} entityInTagSchemaName ######## ##### ##### # ######
			 * @return {Terrasoft.TagItemViewModel}
			 */
			getTagItem: function(item, recordId, entityInTagSchemaName) {
				var viewModelItem = Ext.create("Terrasoft.TagItemViewModel", {
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox,
					values: {
						Id: item.get("Id"),
						Caption: item.get("Tag").displayValue,
						TagId: item.get("Tag").value,
						TagTypeId: item.get("Type").value,
						RecordId: recordId,
						InTagSchemaName: entityInTagSchemaName
					}
				});
				viewModelItem.init();
				return viewModelItem;
			},

			/**
			 * ########## ##### ####### #### ### ##### #####.
			 * @param {string} newId ############# ##### ###### #####
			 * @param {Object} selectedTag ######### # ########### ###
			 * @param {string} recordId ############# ###### # ####### ############# ###
			 * @param {string} entityInTagSchemaName ######## ####### ##### # ######
			 * @return {Terrasoft.TagItemViewModel}
			 */
			getNewTagItem: function(newId, selectedTag, recordId, entityInTagSchemaName) {
				var newItemViewModel = Ext.create("Terrasoft.TagItemViewModel", {
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox,
					values: {
						Id: newId,
						Caption: selectedTag.displayValue,
						TagId: selectedTag.value,
						TagTypeId: selectedTag.TagTypeId,
						RecordId: recordId,
						InTagSchemaName: entityInTagSchemaName
					}
				});
				newItemViewModel.init();
				return newItemViewModel;
			},

			/**
			 * ########## ###### ############# ######## ####.
			 * @param {Object} config ######
			 * @return {*|Object}
			 */
			getTagItemViewConfig: function(config) {
				var containerStyles = [];
				var tagContainerStyle = this.getTagItemContainerBorderStyle(config.TagTypeId);
				if (!Ext.isEmpty(tagContainerStyle)) {
					containerStyles.push(tagContainerStyle);
				}
				var itemConfig = ViewUtilities.getContainerConfig("tag-item-view", containerStyles);
				var buttonConfig = {
					id: "tag-button-item-" + config.Id,
					className: "Terrasoft.Button",
					style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"classes": {
						"wrapperClass": ["tag-button"],
						"imageClass": ["tag-image-close"]
					},
					caption: {bindTo: "Caption"},
					imageConfig: config.ImageConfig,
					imageClick: {bindTo: "onRemoveTagFromEntityImageClick"},
					iconAlign: this.Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
					click: {bindTo: "onTagItemButtonClick"},
					tag: config.Id,
					markerValue: config.Caption
				};
				itemConfig.items.push(buttonConfig);
				return itemConfig;
			}
		});

	});


