define('testDefinedModule', ['sandbox'], function(sandbox) {
	window.moduleLoadCount++;
	return {
		init: function() {
			window.synchronizeArray.push(sandbox.id);
		}
	};
});