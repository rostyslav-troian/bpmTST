define("testAsyncModuleResources", function() {
	return {};
});

define("testAsyncModule", ["sandbox", "testAsyncModuleResources"], function(sandbox) {
	window.moduleLoadCount++;
	return {
		isAsync: true,
		init: function(callback) {
			window.synchronizeArray.push(callback);
		},
		destroy: function() {
			window.synchronizeArray.push("unload" + sandbox.id);
		}
	};
});
