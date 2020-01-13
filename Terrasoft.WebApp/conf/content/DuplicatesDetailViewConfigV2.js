Terrasoft.configuration.Structures["DuplicatesDetailViewConfigV2"] = {innerHierarchyStack: ["DuplicatesDetailViewConfigV2"]};
define("DuplicatesDetailViewConfigV2", ["DuplicatesDetailViewConfigV2Resources", "MultilineLabel",
		"css!DeduplicationModuleCSS", "css!MultilineLabel", "css!DetailModuleV2"],
	function(resources) {
		Ext.define("Terrasoft.configuration.DuplicatesDetailViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.DuplicatesDetailViewConfig",

			viewModelClass: null,

			/**
			 * Returns the view configuration of the module.
			 * @param {Object} config Configuration.
			 * @returns {Object} The view configuration of the module.
			 */
			generate: function(config) {
				var instanceId = this.instanceId;
				var listedConfig = JSON.parse(config.gridConfig);
				return [
					{
						"name": instanceId + "ModuleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: ["detail duplicates-detail"]},
						"markerValue": {"bindTo": "Caption"},
						"items": [
							{
								"name": instanceId + "ControlsContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"classes": {wrapClassName: ["duplicates-controls-container"]},
								"items": [
									{
										"name": instanceId + "LabelContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"classes": {wrapClassName: ["left-container-wrapClass"]},
										"items": [
											{
												"name": instanceId + "Label",
												"itemType": Terrasoft.ViewItemType.LABEL,
												"caption": {"bindTo": "Caption"},
												"classes": {
													"labelClass": ["t-label duplicates-header-label"]
												}
											}
										]
									},
									{
										"name": instanceId + "SelectAllLabelContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"classes": {wrapClassName: ["left-container-wrapClass"]},
										"items": [
											{
												"name": instanceId + "SelectAllLabel",
												"className": "Terrasoft.MultilineLabel",
												"contentVisible": true,
												"itemType": Terrasoft.ViewItemType.LABEL,
												"caption": {"bindTo": "SelectAllCaption"},
												"click": {"bindTo": "onSelectAllClick"},
												"markerValue": "SelectAll",
												"classes": {
													"labelClass": ["t-label duplicates-header-label"]
												}
											}
										]
									},
									{
										"name": instanceId + "ButtonsContainer",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"classes": {
											wrapClassName: [
												"right-container-wrapClass ts-controlgroup-tools duplicates-detail-buttons"
											]
										},
										"items": [
											{
												"name": instanceId + "MergeButton",
												"itemType": Terrasoft.ViewItemType.BUTTON,
												"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
												"caption": {"bindTo": "MergeButtonCaption"},
												"enabled": {"bindTo": "IsMergeButtonEnabled"},
												"click": {"bindTo": "onMergeButtonClick"},
												"markerValue": "MergeButton",
												"classes": {
													"wrapperClass": "right-container-wrapClass",
													"textClass": "t-btn-style-transparent actions-button-margin-right"
												},
												"tips": [
													{
														"name": instanceId + "MergeButtonTip",
														"content": resources.localizableStrings.MergeButtonHint
													}
												]
											},
											{
												"name": instanceId + "NotDoublesButton",
												"itemType": Terrasoft.ViewItemType.BUTTON,
												"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
												"caption": resources.localizableStrings.NotDoublesButtonCaption,
												"click": {"bindTo": "onNotDoublesButtonClick"},
												"enabled": {
													"bindTo": "SelectedRowsCount",
													"bindConfig": {
														"converter": function(selectedRowsCount) {
															if (Terrasoft.Features.getIsDisabled("BulkESDeduplication")) {
																return true;
															}
															return parseInt(selectedRowsCount) > 0;
														}
													}
												},
												"markerValue": "NotDoublesButton",
												"classes": {
													"wrapperClass": "right-container-wrapClass",
													"textClass": "t-btn-style-transparent"
												},
												"tips": [
													{
														"name": instanceId + "NotDoublesButtonTip",
														"content": resources.localizableStrings.NotDoublesButtonHint
													}
												]
											}
										]
									}
								]
							},
							{
								"name": instanceId + "GridContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"classes": {
									"wrapClassName": ["grid-dataview-container-wrapClass"]
								},
								"items": [
									{
										"name": instanceId + "DataGrid",
										"itemType": Terrasoft.ViewItemType.GRID,
										"collection": {"bindTo": "GridData"},
										"selectedRows": {"bindTo": "SelectedRows"},
										"selectRow": {"bindTo": "onSelectRow"},
										"unSelectRow": {"bindTo": "onUnSelectRow"},
										"linkClick": {"bindTo": "linkClicked"},
										"type": "listed",
										"multiSelect": true,
										"listedZebra": true,
										"safeBind": true,
										"primaryDisplayColumnName": "Name",
										"listedConfig": {
											"name": instanceId + "DataGridTiledConfig",
											"captionsConfig": listedConfig.captionsConfig,
											"columnsConfig": listedConfig.columnsConfig,
											"items": listedConfig.items
										}
									}
								]
							}
						]
					}
				];
			}
		});
	});


