Terrasoft.isDebug = true;
Terrasoft.DataValueTypeRange = {};
Terrasoft.DataValueTypeRange.INTEGER = {};
Terrasoft.DataValueTypeRange.INTEGER.minValue = -2147483648;
Terrasoft.DataValueTypeRange.INTEGER.maxValue = 2147483647;

define(["ext-base", "terrasoft", "DTStageVM", "DTStagesVM", "DTStages", "DTStageElement", "less!DTStageElement"],
		function(Ext) {
	var dcmSchemaDesignerViewModel = null;

	return {
		init: function() {
			dcmSchemaDesignerViewModel = Ext.create("Terrasoft.DTStagesVM", {
				values: {
					Name: "Stage"
				}
			});
			var stage = dcmSchemaDesignerViewModel.createItem();
			dcmSchemaDesignerViewModel.insertItem(stage);
			stage = dcmSchemaDesignerViewModel.createItem();
			dcmSchemaDesignerViewModel.insertItem(stage);
		},

		render: function(renderTo) {
			var dcmSchemaDesignTimeView = Ext.create("Terrasoft.Container", {
				items: [
					{
						className: "Terrasoft.DTStages",
						viewModelItems: {
							bindTo: "ViewModelItems"
						},
						reorderableIndex: {
							bindTo: "ReorderableIndex"
						},
						classes: {
							wrapClassName: ["dcm-stage-container"]
						},
						dropGroupName: "dcm-stages",
						onDragEnter: {
							bindTo: "onDragOver"
						},
						onDragOver: {
							bindTo: "onDragOver"
						},
						onDragDrop: {
							bindTo: "onDragDrop"
						},
						onDragOut: {
							bindTo: "onDragOut"
						}
					}
				]
			});
			dcmSchemaDesignTimeView.render(renderTo);
			dcmSchemaDesignTimeView.bind(dcmSchemaDesignerViewModel);
		}
	};
});
