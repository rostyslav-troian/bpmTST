Terrasoft.configuration.Structures["LocalDuplicateSearchPage"] = {innerHierarchyStack: ["LocalDuplicateSearchPage"]};
define("LocalDuplicateSearchPage", ["ext-base", "sandbox", "LocalDuplicateSearchPageViewModel",
		"LocalDuplicateSearchPageView", "MaskHelper"], function(Ext, sandbox, LocalDuplicateSearchPageViewModel,
		LocalDuplicateSearchPageView, MaskHelper) {
	return {
		viewModel: null,
		view: null,
		init: function() {
			var historyState = sandbox.publish("GetHistoryState");
			var config = sandbox.publish("GetDuplicateSearchConfig", null, [sandbox.id]);
			var state = config || historyState.state;
			var viewModelConfig = LocalDuplicateSearchPageViewModel.generate(sandbox, state.entitySchemaName);
			var viewConfig = LocalDuplicateSearchPageView.generate(state.entitySchemaName);
			this.view = Ext.create("Terrasoft.Container", viewConfig);
			var viewModel = this.viewModel = Ext.create("Terrasoft.LocalDuplicatesViewModel", viewModelConfig);
			viewModel.load(state);
		},
		render: function(renderTo) {
			var view = this.view;
			var viewModel = this.viewModel;
			view.bind(viewModel);
			MaskHelper.HideBodyMask();
			view.render(renderTo);
		}
	};
});


