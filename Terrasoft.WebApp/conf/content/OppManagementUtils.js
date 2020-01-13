Terrasoft.configuration.Structures["OppManagementUtils"] = {innerHierarchyStack: ["OppManagementUtils"]};
define("OppManagementUtils", ["OppManagementUtilsResources", "Activity", "ControlGridModule"], function(resources) {
	/**
	 * ########## ############# #####.
	 * @return {Object}
	 */
	function generateGridViewConfig(name) {
		return {
			"itemType": Terrasoft.ViewItemType.GRID,
			"className": "Terrasoft.ControlGrid",
			"primaryColumnName": "Id",
			"tag": name,
			"listedZebra": true,
			"collection": { "bindTo": name + "Collection" },
			"activeRow": { "bindTo": name + "ActiveRow" },
			"selectedRows": { "bindTo": name + "SelectedRows" },
			"type": "listed",
			"linkClick": { "bindTo": "linkClicked" },
			"applyControlConfig": { "bindTo": "onApplyControlConfig" },
			"controlColumnName": "Actions",
			"listedConfig": {
				"name": name + "DataGridListedConfig",
				"items": [
					{
						"name": name + "ActivitiesTitleColumn",
						"caption": Terrasoft.Activity.columns.Title.caption,
						"bindTo": "Title",
						"position": { "column": 0, "colSpan": 14 },
						"type": Terrasoft.GridCellType.TEXT
					},
					{
						"name": name + "ActivitiesStartDateColumn",
						"caption": Terrasoft.Activity.columns.StartDate.caption,
						"bindTo": "StartDate",
						"position": { "column": 0, "colSpan": 6 },
						"type": Terrasoft.GridCellType.TEXT
					},
					{
						"name": name + "ActivitiesButtonColumn",
						"bindTo": "Actions",
						"caption": resources.localizableStrings.Actions,
						"position": { "column": 0, "colSpan": 4 },
						"type": Terrasoft.GridCellType.TEXT
					}
				]
			},
			"tiledConfig": {
				"name": name + "DataGridTiledConfig",
				"grid": {
					"columns": 24,
					"rows": 3
				},
				"items": []
			}
		};
	}
	return {
		generateGridViewConfig: generateGridViewConfig
	};
});


