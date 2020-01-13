Terrasoft.configuration.Structures["SspMiniPageListener"] = {innerHierarchyStack: ["SspMiniPageListener"]};
define("SspMiniPageListener", ["MiniPageListener", "SspMiniPageContainerViewModel"], function() {
	
	/**
	 * Overrides MiniPage container module view model class name in {@link Terrasoft.MiniPageListener}.
	 */
	Ext.apply(Terrasoft.MiniPageListener, {
		viewModelClass: "Terrasoft.SspMiniPageContainerViewModel",
	});

	return {
		init: Ext.emptyFn
	};
});
 

