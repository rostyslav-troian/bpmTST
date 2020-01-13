Terrasoft.configuration.Structures["DuplicatesMergeViewConfigV2"] = {innerHierarchyStack: ["DuplicatesMergeViewConfigV2"]};
define("DuplicatesMergeViewConfigV2", ["DuplicatesMergeViewConfigV2Resources", "MultilineLabel", "css!MultilineLabel",
		"css!DuplicatesMergeViewConfigV2"],
	function(resources) {
		Ext.define("Terrasoft.configuration.DuplicatesMergeViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.DuplicatesMergeViewConfig",

			viewModelClass: null,

			/**
			 * Index of row to display headers.
			 */
			captionHeadersRowIndex: 0,

			/**
			 * Index of row to display groups.
			 */
			groupsRowIndex: 1,

			/**
			 * Number of columns in grid layout.
			 */
			gridColumnsNumber: 48,

			/**
			 * Returns the view configuration of the module.
			 * @param {Object} config Configuration.
			 * @returns {Object} The view configuration of the module.
			 */
			generate: function(config) {
				return [
					{
						"name": "ModuleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: ["duplicates-merge-container"]},
						"items": [
							{
								"name": "HeaderContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["header"],
								"items": [
									{
										"name": "HeaderLabel",
										"itemType": Terrasoft.ViewItemType.LABEL,
										"classes": {"labelClass": ["header-label"]},
										"caption": {"bindTo": "MergeModuleCaption"}
									},
									{
										"name": "CloseButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
										"imageConfig": resources.localizableImages.CloseIcon,
										"classes": {"wrapperClass": ["close-btn"]},
										"click": {"bindTo": "onCancelButtonClick"}
									},
									{
										"name": "DescriptionContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"classes": {
											wrapClassName: ["description"]
										},
										"items": [
											{
												"name": "DescriptionLabel",
												"itemType": Terrasoft.ViewItemType.LABEL,
												"className": "Terrasoft.MultilineLabel",
												"contentVisible": true,
												"classes": {
													"labelClass": [
														"description-label",
														"right-padding"
													]
												},
												"caption": {"bindTo": "MergeModuleDescription"}
											},
											{
												"name": "DescriptionLink",
												"itemType": Terrasoft.ViewItemType.LABEL,
												"className": "Terrasoft.MultilineLabel",
												"contentVisible": true,
												"classes": {"labelClass": ["description-label"]},
												"caption": {"bindTo": "MergeModuleDescriptionLink"}
											}
										]
									}
								]
							},
							{
								"name": "ContentContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["content"],
								"items": [
									{
										"name": "ContentLayout",
										"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
										"items": this.generateContentItems(config),
										"controlConfig" : {
											"maxColumnsCount" : 48,
											"equalColumnsCount" : 48
										}
									}
								]
							},
							{
								"name": "FooterContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["footer"],
								"items": [
									{
										"name": "CancelButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
										"caption": resources.localizableStrings.CancelButtonCaption,
										"click": {"bindTo": "onCancelButtonClick"}
									},
									{
										"name": "MergeButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": Terrasoft.controls.ButtonEnums.style.GREEN,
										"caption": resources.localizableStrings.MergeButtonCaption,
										"click": {"bindTo": "onMergeButtonClick"}
									}
								]
							}
						]
					}
				];
			},

			/**
			 * Generates items for content block.
			 * @param {Object} config Config for generating items.
			 * @returns {Array} Items.
			 */
			generateContentItems: function(config) {
				const rows = config.rows;
				const columns = config.columns;
				const primaryColumnName = config.primaryColumnName;
				const columnsCount = config.columnsCount;
				const items = [];
				let columnIndex = 0;
				for (var columnName in columns) {
					const column = columns[columnName];
					const caption = this.generateCaption(columnName, column.caption, columnIndex, columnsCount);
					items.push(caption);
					this.setColumnRadioGroup({
						rows: rows,
						items: items,
						columnName: columnName,
						columnIndex: columnIndex,
						columnsCount: columnsCount,
						primaryColumnName: primaryColumnName,
						dataValueType: column.dataValueType
					});
					columnIndex++;
				}
				return items;
			},

			/**
			 * Sets radio group for the column to the items.
			 * @param {Object} config Configuration object.
			 * @param {Array} config.items View config items collection.
			 * @param {Array} config.rows Column rows data.
			 * @param {String} config.columnName Column name.
			 * @param {Number} config.columnIndex Column index position.
			 * @param {Number} config.columnsCount Count of the columns.
			 * @param {String} config.primaryColumnName Primary column name.
			 * @param {String} config.dataValueType Column data value type.
			 * @private
			 */
			setColumnRadioGroup: function(config) {
				const rows = config.rows;
				const items = config.items;
				const columnName = config.columnName;
				const columnIndex = config.columnIndex;
				const columnsCount = config.columnsCount;
				const primaryColumnName = config.primaryColumnName;
				for (let i = 0; i < rows.length; i++) {
					const row = rows[i];
					const primaryColumnValue = row[primaryColumnName];
					const value = row[columnName];
					const imgConfig = (config.dataValueType === Terrasoft.DataValueType.IMAGELOOKUP && value)
						? {
							imgUrl: Terrasoft.ImageUrlBuilder.getUrl({
								source: Terrasoft.ImageSources.SYS_IMAGE,
								params: {
									primaryColumnValue: value
								}
							})
						} : null;
					var group = this.generateRadioGroup(columnName, columnIndex, columnsCount, i,
						primaryColumnValue, value, imgConfig);
					items.push(group);
				}
			},

			/**
			 * Generates config of the radio buttons group.
			 * @param {String} name Name of the group.
			 * @param {Number} itemIndex Index number of the item.
			 * @param {Number} itemsCount Total items count.
			 * @param {Number} rowIndex Index number of the row.
			 * @param {String} value Value.
			 * @param {String} caption Caption.
			 * @param {Object} [imgConfig] Img config.
			 * @param {String} [imgConfig.imgUrl] Img url.
			 * @returns {Object} Config of the radio buttons group.
			 */
			generateRadioGroup: function(name, itemIndex, itemsCount, rowIndex, value, caption, imgConfig) {
				const layout = this.getLayout(this.groupsRowIndex + rowIndex, itemIndex, itemsCount);
				let groupName = name + "RadioGroup" + rowIndex;
				const isOdd = (rowIndex % 2) !== 0;
				if (isOdd) {
					groupName += "-odd";
				}
				return {
					"name": groupName,
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"value": {"bindTo": name},
					"layout": layout,
					"items": [this.generateRadioButton(value, caption, imgConfig)]
				};
			},

			/**
			 *
			 * @param {String} name Name of the caption.
			 * @param {String} caption Caption.
			 * @param {Number} itemIndex Index number of the item.
			 * @param {Number} itemsCount Total items count.
			 * @returns {Object}
			 */
			generateCaption: function(name, caption, itemIndex, itemsCount) {
				return {
					"name": name + "HeaderContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["column-header"],
					"layout": this.getLayout(this.captionHeadersRowIndex, itemIndex, itemsCount),
					"items": [
						{
							"name": name + "ColumnHeader",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": caption,
							"hint": caption
						}
					]
				};
			},

			/**
			 * Generates layout config.
			 * @param {Number} rowIndex Index number of the row.
			 * @param {Number} itemIndex Index number of the item.
			 * @param {Number} itemsCount Total items count.
			 * @returns {Object} Layout config.
			 */
			getLayout: function(rowIndex, itemIndex, itemsCount) {
				var colSpan = Math.floor(this.gridColumnsNumber / itemsCount);
				var column = colSpan * itemIndex;
				return {"column": column, "row": rowIndex, "colSpan": colSpan};
			},

			/**
			 * Generates config of the radio button.
			 * @param {String} value Value.
			 * @param {String} caption Caption.
			 * @param {Object} [imgConfig] Img config.
			 * @param {String} [imgConfig.imgUrl] Img url.
			 * @returns {Object} Config of the radio button.
			 */
			generateRadioButton: function(value, caption, imgConfig) {
				const config = {
					"name": Terrasoft.generateGUID(),
					"caption": caption || " ",
					"value": value,
					"visible": !Ext.isEmpty(caption)
				};
				if (imgConfig && imgConfig.imgUrl) {
					config.caption = " ";
					config.styles = {
						labelStyle: {
							"background-image": "url('" + imgConfig.imgUrl + "')"
						}
					};
				}
				return config;
			}
		});
	});


